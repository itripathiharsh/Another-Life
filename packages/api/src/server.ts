// Zero-dependency HTTP API (Stage 4). Contract per plan §43-44, §106-107:
// /api/v1 prefix, player-facing views (§80), structured errors (§107).
// Auth + idempotency keys deferred (single-player local API).

import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http';
import { SessionError } from '../../simulation/src/index';
import { LifeService } from './service';
import { StoreError } from './store';

const BODY_LIMIT_BYTES = 1024 * 1024;

let requestCounter = 0;

interface ApiErrorBody {
  code: string;
  message: string;
  request_id: string;
}

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': Buffer.byteLength(payload),
    ...corsHeaders(),
  });
  res.end(payload);
}

function corsHeaders(): Record<string, string> {
  return {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,POST,DELETE,OPTIONS',
    'access-control-allow-headers': 'content-type',
  };
}

function sendError(res: ServerResponse, status: number, code: string, message: string): void {
  const body: ApiErrorBody = {
    code,
    message,
    request_id: `req_${requestCounter}`,
  };
  sendJson(res, status, body);
}

function statusForCode(code: string): number {
  if (code === 'not-found') return 404;
  if (code === 'unknown-event' || code === 'ineligible-choice' || code === 'life-ended') {
    return 409;
  }
  return 400;
}

function readBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    req.on('data', (chunk: Buffer) => {
      size += chunk.length;
      if (size > BODY_LIMIT_BYTES) {
        reject(new SessionError('bad-body', 'Request body too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      if (chunks.length === 0) {
        resolve(undefined);
        return;
      }
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf-8')) as unknown);
      } catch {
        reject(new SessionError('bad-body', 'Request body must be valid JSON'));
      }
    });
    req.on('error', () => {
      reject(new SessionError('bad-body', 'Failed to read request body'));
    });
  });
}

function asRecord(value: unknown): Record<string, unknown> {
  if (typeof value !== 'object' || value === null) {
    throw new SessionError('bad-body', 'Request body must be a JSON object');
  }
  return value as Record<string, unknown>;
}

export function createApiServer(service: LifeService): Server {
  return createServer((req, res) => {
    void handleRequest(service, req, res).catch(() => {
      if (!res.headersSent) {
        sendError(res, 500, 'internal', 'Unexpected server error');
      }
    });
  });
}

async function handleRequest(
  service: LifeService,
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  requestCounter += 1;
  const method = req.method ?? 'GET';

  // CORS preflight (browsers block cross-origin fetch without this).
  if (method === 'OPTIONS') {
    res.writeHead(204, corsHeaders());
    res.end();
    return;
  }

  const url = new URL(req.url ?? '/', 'http://localhost');
  const parts = url.pathname.split('/').filter((p) => p.length > 0);

  try {
    // GET /api/v1/historical-context?date=&locationId=
    if (method === 'GET' && parts.join('/') === 'api/v1/historical-context') {
      const date = url.searchParams.get('date') ?? '';
      const locationId = url.searchParams.get('locationId') ?? '';
      sendJson(res, 200, service.historicalContext(date, locationId));
      return;
    }

    // POST /api/v1/lives
    if (method === 'POST' && parts.join('/') === 'api/v1/lives') {
      const body = asRecord(await readBody(req));
      const view = service.createLife({
        seed: typeof body['seed'] === 'number' ? body['seed'] : undefined,
        name: typeof body['name'] === 'string' ? body['name'] : '',
        birthDate: typeof body['birthDate'] === 'string' ? body['birthDate'] : undefined,
        locationId: typeof body['locationId'] === 'string' ? body['locationId'] : undefined,
        classId: typeof body['classId'] === 'string' ? body['classId'] : undefined,
      });
      sendJson(res, 201, view);
      return;
    }

    // GET /api/v1/lives
    if (method === 'GET' && parts.join('/') === 'api/v1/lives') {
      sendJson(res, 200, { lives: service.listLives() });
      return;
    }

    // /api/v1/lives/:id...
    if (parts.length >= 3 && parts[0] === 'api' && parts[1] === 'v1' && parts[2] === 'lives') {
      const id = parts[3] ?? '';
      const rest = parts.slice(4);

      if (method === 'GET' && rest.length === 0) {
        sendJson(res, 200, service.getLife(id));
        return;
      }
      if (method === 'DELETE' && rest.length === 0) {
        service.deleteLife(id);
        sendJson(res, 200, { deleted: id });
        return;
      }
      if (method === 'GET' && rest.length === 1 && rest[0] === 'save') {
        const raw = service.exportSave(id);
        res.writeHead(200, {
          'content-type': 'application/json; charset=utf-8',
          ...corsHeaders(),
        });
        res.end(raw);
        return;
      }
      if (method === 'POST' && rest.length === 1 && rest[0] === 'advance') {
        const body = asRecord(await readBody(req));
        sendJson(res, 200, service.advanceLife(id, body['years']));
        return;
      }
      if (
        method === 'POST' && rest.length === 3 && rest[0] === 'events' && rest[2] === 'choices'
      ) {
        const eventId = rest[1] ?? '';
        const body = asRecord(await readBody(req));
        if (typeof body['choiceId'] !== 'string') {
          throw new SessionError('bad-body', 'choiceId is required');
        }
        sendJson(res, 200, service.resolveChoice(id, eventId, body['choiceId'] as string));
        return;
      }
      if (method === 'POST' && rest.length === 2 && rest[0] === 'properties' && rest[1] === 'buy') {
        const body = asRecord(await readBody(req));
        const prop = {
          id: String(body['id'] ?? `prop_${Date.now()}`),
          name: String(body['name'] ?? 'Property Deed'),
          type: (body['type'] as 'residence' | 'commercial' | 'farmland') ?? 'residence',
          cost: Number(body['cost'] ?? 100),
          annualYield: Number(body['annualYield'] ?? 10),
        };
        sendJson(res, 200, service.buyProperty(id, prop));
        return;
      }
      if (method === 'POST' && rest.length === 1 && rest[0] === 'marry') {
        const body = asRecord(await readBody(req));
        const partnerName = String(body['partnerName'] ?? 'Spouse');
        sendJson(res, 200, service.marryPartner(id, partnerName));
        return;
      }
      if (method === 'POST' && rest.length === 1 && rest[0] === 'children') {
        const body = asRecord(await readBody(req));
        const childName = String(body['childName'] ?? 'Child');
        sendJson(res, 200, service.haveChild(id, childName));
        return;
      }
      if (method === 'POST' && rest.length === 1 && rest[0] === 'heir') {
        sendJson(res, 200, service.playAsHeir(id));
        return;
      }
    }

    sendError(res, 404, 'not-found', `No route ${method} ${url.pathname}`);
  } catch (err) {
    if (err instanceof SessionError || err instanceof StoreError) {
      sendError(res, statusForCode(err.code), err.code, err.message);
      return;
    }
    throw err;
  }
}

export function startApiServer(service: LifeService, port: number): Promise<{
  server: Server;
  port: number;
}> {
  const server = createApiServer(service);
  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => {
      const address = server.address();
      const actual = typeof address === 'object' && address ? address.port : port;
      resolve({ server, port: actual });
    });
  });
}

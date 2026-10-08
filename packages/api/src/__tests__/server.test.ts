import { rmSync } from 'node:fs';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { startApiServer } from '../server';
import { LifeService } from '../service';
import { FileSaveStore } from '../store';

const DIR = join(process.cwd(), '.cache', 'api-test-saves', 'server');

let base = '';
let server: { close: (cb?: () => void) => void } | undefined;

beforeAll(async () => {
  rmSync(DIR, { recursive: true, force: true });
  const service = new LifeService(new FileSaveStore(DIR));
  const started = await startApiServer(service, 0);
  server = started.server;
  base = `http://127.0.0.1:${started.port}/api/v1`;
});

afterAll(async () => {
  await new Promise<void>((resolve) => {
    server?.close(() => resolve());
  });
});

async function post(path: string, body: unknown): Promise<{ status: number; json: unknown }> {
  const res = await fetch(`${base}${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  return { status: res.status, json: await res.json() as unknown };
}

async function get(path: string): Promise<{ status: number; json: unknown }> {
  const res = await fetch(`${base}${path}`);
  return { status: res.status, json: await res.json() as unknown };
}

function view(json: unknown): Record<string, unknown> {
  return json as Record<string, unknown>;
}

describe('HTTP contract (Stage 4)', () => {
  it('creates, reads, advances, chooses, saves, and deletes a life', async () => {
    const created = await post('/lives', { seed: 19460301, name: 'Http Person' });
    expect(created.status).toBe(201);
    const id = view(created.json)['id'] as string;
    expect(typeof id).toBe('string');

    const listed = await get('/lives');
    expect(listed.status).toBe(200);
    expect((view(listed.json)['lives'] as string[])).toContain(id);

    const read = await get(`/lives/${id}`);
    expect(read.status).toBe(200);
    expect(view(view(read.json)['player'])['age']).toBe(0);

    const advanced = await post(`/lives/${id}/advance`, { years: 10 });
    expect(advanced.status).toBe(200);
    const pending = view(advanced.json)['pending'] as { eventId: string; choices: { id: string }[] }[];
    expect(pending[0]?.eventId).toBe('evt.childhood_illness');
    const choiceId = pending[0]?.choices[0]?.id as string;

    const resolved = await post(`/lives/${id}/events/evt.childhood_illness/choices`, { choiceId });
    expect(resolved.status).toBe(200);
    expect(typeof view(resolved.json)['success']).toBe('boolean');

    const saved = await get(`/lives/${id}/save`);
    expect(saved.status).toBe(200);
    expect(view(saved.json)['schemaVersion']).toBe(1);

    const ctx = await get('/historical-context?date=1946-06-15&locationId=location.lucknow');
    expect(ctx.status).toBe(200);
    expect(view(view(ctx.json)['political'])['id']).toBe('political.british_raj');

    const deleted = await fetch(`${base}/lives/${id}`, { method: 'DELETE' });
    expect(deleted.status).toBe(200);
    const gone = await get(`/lives/${id}`);
    expect(gone.status).toBe(404);
  });

  it('returns structured errors: 400 body, 404 missing, 409 resolved-twice', async () => {
    const badCreate = await post('/lives', {});
    expect(badCreate.status).toBe(400);
    expect(view(badCreate.json)['code']).toBe('bad-body');

    const missing = await get('/lives/life_missing');
    expect(missing.status).toBe(404);
    expect(view(missing.json)['code']).toBe('not-found');

    const created = await post('/lives', { seed: 5, name: 'Http Person' });
    const id = view(created.json)['id'] as string;
    await post(`/lives/${id}/advance`, { years: 10 });
    const pending = (view((await get(`/lives/${id}`)).json)['pending'] as {
      eventId: string; choices: { id: string }[];
    }[]);
    const first = pending[0];
    if (first) {
      await post(`/lives/${id}/events/${first.eventId}/choices`, {
        choiceId: first.choices[0]?.id,
      });
      const twice = await post(`/lives/${id}/events/${first.eventId}/choices`, {
        choiceId: first.choices[0]?.id,
      });
      expect(twice.status).toBe(409);
    }

    const badAdvance = await post(`/lives/${id}/advance`, { years: 0 });
    expect(badAdvance.status).toBe(400);

    const noRoute = await get('/nope');
    expect(noRoute.status).toBe(404);
  });
});

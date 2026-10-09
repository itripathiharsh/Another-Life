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

  it('prevents duplicate mutations with idempotency key', async () => {
    const created = await post('/lives', { seed: 99, name: 'Idempotency Test' });
    const id = view(created.json)['id'] as string;

    // Advance with idempotency header
    const res1 = await fetch(`${base}/lives/${id}/advance`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'idempotency-key': 'op-advance-1',
      },
      body: JSON.stringify({ years: 1 }),
    });
    expect(res1.status).toBe(200);
    const json1 = (await res1.json()) as Record<string, unknown>;
    const ageAfterFirst = view(json1['player'])['age'];

    // Repeat with identical idempotency header
    const res2 = await fetch(`${base}/lives/${id}/advance`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'idempotency-key': 'op-advance-1',
      },
      body: JSON.stringify({ years: 1 }),
    });
    expect(res2.status).toBe(200);
    const json2 = (await res2.json()) as Record<string, unknown>;
    const ageAfterSecond = view(json2['player'])['age'];

    // Idempotent: Age did not advance a second time!
    expect(ageAfterSecond).toBe(ageAfterFirst);
  });

  it('handles career application, health activities, and relationships via HTTP', async () => {
    const created = await post('/lives', { seed: 77, name: 'Full Feature Test' });
    const id = view(created.json)['id'] as string;

    // Advance to adulthood, resolving events along the way
    while ((view((await get(`/lives/${id}`)).json)['player'] as { age: number }).age < 18) {
      const adv = await post(`/lives/${id}/advance`, { years: 5 });
      const pending = (view(adv.json)['pending'] as { eventId: string; choices: { id: string }[] }[])[0];
      if (pending && pending.choices[0]) {
        await post(`/lives/${id}/events/${pending.eventId}/choices`, { choiceId: pending.choices[0].id });
      }
    }

    // Career application
    const careerRes = await post(`/lives/${id}/career/apply`, {
      occupationId: 'occupation.government_clerk',
      yearlyIncome: 180,
    });
    expect(careerRes.status).toBe(200);
    expect(view(view(careerRes.json)['player'])['occupationId']).toBe('occupation.government_clerk');

    // Health activity
    const healthRes = await post(`/lives/${id}/health/activity`, {
      activityType: 'exercise',
    });
    expect(healthRes.status).toBe(200);
    expect(typeof view(view(healthRes.json)['player'])['health']).toBe('number');

    // Relationship interaction
    const relRes = await post(`/lives/${id}/relationships/rel.friend/interact`, {
      action: 'spend_time',
    });
    expect(relRes.status).toBe(200);

    // List saves returns metadata
    const listRes = await get('/lives');
    expect(listRes.status).toBe(200);
    const saves = view(listRes.json)['saves'] as { id: string; name: string }[];
    expect(saves.some((s) => s.id === id && s.name === 'Full Feature Test')).toBe(true);
  });
});


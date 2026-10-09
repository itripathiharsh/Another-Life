import { rmSync } from 'node:fs';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { startApiServer } from '../../../packages/api/src/server';
import { LifeService } from '../../../packages/api/src/service';
import { FileSaveStore } from '../../../packages/api/src/store';

const TEST_DIR = join(process.cwd(), '.cache', 'frontend-e2e-saves');

let server: { close: (cb?: () => void) => void } | undefined;
let apiBase = '';

beforeAll(async () => {
  rmSync(TEST_DIR, { recursive: true, force: true });
  const store = new FileSaveStore(TEST_DIR);
  const service = new LifeService(store);
  const started = await startApiServer(service, 0);
  server = started.server;
  apiBase = `http://127.0.0.1:${started.port}/api/v1`;
});

afterAll(async () => {
  await new Promise<void>((resolve) => {
    server?.close(() => resolve());
  });
  rmSync(TEST_DIR, { recursive: true, force: true });
});

async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${apiBase}${path}`, {
    ...options,
    headers: {
      'content-type': 'application/json',
      ...(options.headers ?? {}),
    },
  });
  const data = (await res.json()) as T;
  if (!res.ok) {
    const err = data as { code?: string; message?: string };
    throw new Error(`${err.code ?? 'ERROR'}: ${err.message ?? res.statusText}`);
  }
  return data;
}

describe('LegacyLife — Frontend & End-to-End System Integration Suite', () => {
  it('Phase A & B: Multi-Save management, atomic persistence, and isolated deletion', async () => {
    // 1. Create Life A (Lucknow 1946)
    const lifeA = await apiRequest<{ id: string; player: { name: string; locationId: string } }>('/lives', {
      method: 'POST',
      body: JSON.stringify({ seed: 1001, name: 'Devendra Sharma', locationId: 'location.lucknow' }),
    });
    expect(lifeA.id).toBeDefined();
    expect(lifeA.player.name).toBe('Devendra Sharma');

    // 2. Create Life B (London 1850)
    const lifeB = await apiRequest<{ id: string; player: { name: string; locationId: string } }>('/lives', {
      method: 'POST',
      body: JSON.stringify({ seed: 2002, name: 'Oliver Pendelton', locationId: 'location.london' }),
    });
    expect(lifeB.id).toBeDefined();
    expect(lifeB.player.name).toBe('Oliver Pendelton');

    // 3. Verify both exist in save inventory
    const savesList = await apiRequest<{ lives: string[]; saves: { id: string; name: string }[] }>('/lives');
    expect(savesList.lives).toContain(lifeA.id);
    expect(savesList.lives).toContain(lifeB.id);
    expect(savesList.saves.some((s) => s.id === lifeA.id && s.name === 'Devendra Sharma')).toBe(true);
    expect(savesList.saves.some((s) => s.id === lifeB.id && s.name === 'Oliver Pendelton')).toBe(true);

    // 4. Delete Life A only
    const delRes = await apiRequest<{ deleted: string }>(`/lives/${lifeA.id}`, { method: 'DELETE' });
    expect(delRes.deleted).toBe(lifeA.id);

    // 5. Verify Life A is gone, but Life B remains intact
    const postDelList = await apiRequest<{ lives: string[] }>('/lives');
    expect(postDelList.lives).not.toContain(lifeA.id);
    expect(postDelList.lives).toContain(lifeB.id);

    const reloadedB = await apiRequest<{ id: string; player: { name: string } }>(`/lives/${lifeB.id}`);
    expect(reloadedB.player.name).toBe('Oliver Pendelton');
  });

  it('Phase C & D: Real Career applications and Health activities', async () => {
    // Create new Victorian character
    const life = await apiRequest<{ id: string }>('/lives', {
      method: 'POST',
      body: JSON.stringify({ seed: 3003, name: 'Arthur Pendelton', locationId: 'location.london' }),
    });
    const id = life.id;

    // Advance to age 18, resolving any childhood events
    let currentAge = 0;
    while (currentAge < 18) {
      const adv = await apiRequest<{
        player: { age: number };
        pending: { eventId: string; choices: { id: string }[] }[];
      }>(`/lives/${id}/advance`, {
        method: 'POST',
        body: JSON.stringify({ years: 5 }),
      });
      currentAge = adv.player.age;
      if (adv.pending.length > 0 && adv.pending[0]!.choices.length > 0) {
        await apiRequest(`/lives/${id}/events/${adv.pending[0]!.eventId}/choices`, {
          method: 'POST',
          body: JSON.stringify({ choiceId: adv.pending[0]!.choices[0]!.id }),
        });
      }
    }

    // Apply for career: Commercial Clerk
    const careerRes = await apiRequest<{
      player: { occupationId: string; wealth: number };
      timeline: string[];
    }>(`/lives/${id}/career/apply`, {
      method: 'POST',
      body: JSON.stringify({
        occupationId: 'occupation.commercial_clerk',
        yearlyIncome: 140,
      }),
    });
    expect(careerRes.player.occupationId).toBe('occupation.commercial_clerk');
    expect(careerRes.timeline.some((t) => t.includes('commercial clerk'))).toBe(true);

    // Health action: Exercise
    const healthRes = await apiRequest<{
      player: { health: number };
      timeline: string[];
    }>(`/lives/${id}/health/activity`, {
      method: 'POST',
      body: JSON.stringify({ activityType: 'exercise' }),
    });
    expect(typeof healthRes.player.health).toBe('number');
    expect(healthRes.timeline.some((t) => t.includes('physical conditioning and exercise'))).toBe(true);
  });

  it('Phase E: Real applied consequences and failure handling in event choices', async () => {
    const life = await apiRequest<{ id: string }>('/lives', {
      method: 'POST',
      body: JSON.stringify({ seed: 4004, name: 'Ravi Kumar', locationId: 'location.lucknow' }),
    });
    const id = life.id;

    // Advance 4 years to hit childhood fever event
    const adv = await apiRequest<{
      pending: { eventId: string; choices: { id: string }[] }[];
    }>(`/lives/${id}/advance`, {
      method: 'POST',
      body: JSON.stringify({ years: 4 }),
    });
    expect(adv.pending.length).toBeGreaterThan(0);
    const event = adv.pending[0]!;

    // Resolve choice and check authoritative applied consequences
    const choiceRes = await apiRequest<{
      success: boolean;
      roll: number;
      finalProbability: number;
      appliedConsequences: { property: string; op: string; value: unknown }[];
    }>(`/lives/${id}/events/${event.eventId}/choices`, {
      method: 'POST',
      body: JSON.stringify({ choiceId: event.choices[0]!.id }),
    });

    expect(typeof choiceRes.success).toBe('boolean');
    expect(typeof choiceRes.roll).toBe('number');
    expect(typeof choiceRes.finalProbability).toBe('number');
    expect(Array.isArray(choiceRes.appliedConsequences)).toBe(true);
    expect(choiceRes.appliedConsequences.length).toBeGreaterThan(0);
  });

  it('Phase F & G: Historical context resolution, divergences, and persistent relationships', async () => {
    // 1. Resolve historical context for Lucknow on Independence Day 1947
    const ctxLucknow = await apiRequest<{
      political?: { id: string; name: string };
      activeEvents: { id: string; name: string }[];
      activeLaws: { id: string; name: string }[];
    }>('/historical-context?date=1947-08-15&locationId=location.lucknow');

    expect(ctxLucknow.political?.id).toBe('political.dominion_india');
    expect(ctxLucknow.activeEvents.length).toBeGreaterThan(0);
    expect(ctxLucknow.activeLaws.length).toBeGreaterThan(0);

    // 2. Resolve historical context for London in 1850
    const ctxLondon = await apiRequest<{
      political?: { id: string; name: string };
    }>('/historical-context?date=1850-05-01&locationId=location.london');
    expect(ctxLondon.political?.id).toBe('political.victorian_uk');

    // 3. Persistent relationship interaction
    const life = await apiRequest<{ id: string }>('/lives', {
      method: 'POST',
      body: JSON.stringify({ seed: 5005, name: 'Sunil Verma', locationId: 'location.lucknow' }),
    });
    const id = life.id;

    const relRes = await apiRequest<{
      player: { wealth: number };
      timeline: string[];
    }>(`/lives/${id}/relationships/rel.friend/interact`, {
      method: 'POST',
      body: JSON.stringify({ action: 'spend_time' }),
    });

    expect(relRes.timeline.some((t) => t.includes('[relationship] Spent quality time'))).toBe(true);
  });

  it('Phase H & Lineage: Full life journey, timeline preservation, death, legacy, and heirloom', async () => {
    const life = await apiRequest<{ id: string }>('/lives', {
      method: 'POST',
      body: JSON.stringify({ seed: 6006, name: 'Harish Chandra', locationId: 'location.lucknow' }),
    });
    const ancestorId = life.id;

    // Advance character through a complete lifespan until mortality is reached
    for (let i = 0; i < 30; i++) {
      const adv = await apiRequest<{
        status: string;
        stopped: string;
        pending: { eventId: string; choices: { id: string }[] }[];
      }>(`/lives/${ancestorId}/advance`, {
        method: 'POST',
        body: JSON.stringify({ years: 10 }),
      });

      if (adv.stopped === 'dead' || adv.status === 'dead') break;

      if (adv.pending.length > 0 && adv.pending[0]!.choices.length > 0) {
        await apiRequest(`/lives/${ancestorId}/events/${adv.pending[0]!.eventId}/choices`, {
          method: 'POST',
          body: JSON.stringify({ choiceId: adv.pending[0]!.choices[0]!.id }),
        });
      }
    }

    // Verify deceased state and complete chronological timeline preserved (No truncation!)
    const deceasedLife = await apiRequest<{
      status: string;
      timeline: string[];
      player: { age: number };
      legacy?: { summary: string; dimensions: { family: number } };
    }>(`/lives/${ancestorId}`);

    expect(deceasedLife.status).toBe('dead');
    expect(deceasedLife.timeline.length).toBeGreaterThan(10);
    // Check birth-year world notes are preserved
    expect(deceasedLife.timeline.some((t) => t.includes('1946-03-01: [world]'))).toBe(true);
    expect(deceasedLife.legacy).toBeDefined();

    // Now transition to heir
    const heirRes = await apiRequest<{
      id: string;
      ancestorId?: string;
      generation?: number;
      player: { name: string; age: number; wealth: number };
    }>(`/lives/${ancestorId}/heir`, { method: 'POST' });

    const heirId = heirRes.id;

    // Critical assertion: Heir ID MUST NOT be ancestor ID!
    expect(heirId).not.toBe(ancestorId);
    expect(heirRes.ancestorId).toBe(ancestorId);
    expect(heirRes.generation).toBe(2);

    // Critical assertion: Ancestor save MUST still exist in store!
    const ancestorReloaded = await apiRequest<{
      id: string;
      status: string;
      descendantId?: string;
      player: { name: string };
    }>(`/lives/${ancestorId}`);
    expect(ancestorReloaded.id).toBe(ancestorId);
    expect(ancestorReloaded.status).toBe('dead');
    expect(ancestorReloaded.player.name).toBe('Harish Chandra');
    expect(ancestorReloaded.descendantId).toBe(heirId);

    // Heir can advance independently
    const heirAdv = await apiRequest<{ player: { age: number } }>(`/lives/${heirId}/advance`, {
      method: 'POST',
      body: JSON.stringify({ years: 2 }),
    });
    expect(heirAdv.player.age).toBeGreaterThanOrEqual(heirRes.player.age + 1);

    // Ancestor remains intact and unchanged
    const ancestorCheck = await apiRequest<{ id: string; status: string }>(`/lives/${ancestorId}`);
    expect(ancestorCheck.id).toBe(ancestorId);
    expect(ancestorCheck.status).toBe('dead');
  });
});

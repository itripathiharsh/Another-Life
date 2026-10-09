import { beforeEach, describe, expect, it } from 'vitest';
import { api, setOfflineMode } from '../lib/api';

describe('LegacyLife — 100% Offline Standalone APK Mode', () => {
  beforeEach(() => {
    // Explicitly lock into 100% offline standalone mode (no backend, no server, no fetch)
    setOfflineMode(true);
  });

  it('runs complete lifecycle 100% standalone and offline without any backend server', async () => {
    // 1. Create a life offline (Lucknow 1946)
    const life = await api.createLife({
      seed: 8888,
      name: 'Offline Citizen',
      locationId: 'location.lucknow',
    });
    expect(life.id).toBeDefined();
    expect(life.player.name).toBe('Offline Citizen');
    expect(life.player.age).toBe(0);

    const lifeId = life.id;

    // 2. List lives from local offline storage
    const list = await api.listLives();
    expect(list.lives).toContain(lifeId);
    expect(list.saves.some((s) => s.id === lifeId && s.name === 'Offline Citizen')).toBe(true);

    // 3. Load life offline
    const loaded = await api.getLife(lifeId);
    expect(loaded.id).toBe(lifeId);
    expect(loaded.player.name).toBe('Offline Citizen');

    // 4. Resolve historical context offline (Lucknow 1947)
    const ctx = await api.historicalContext('1947-08-15', 'location.lucknow');
    expect(ctx.political?.id).toBe('political.dominion_india');
    expect(ctx.activeEvents.length).toBeGreaterThan(0);
    expect(ctx.activeLaws.length).toBeGreaterThan(0);

    // 5. Advance time offline until childhood illness event triggers
    let age = 0;
    while (age < 4) {
      const adv = await api.advance(lifeId, 1);
      age = adv.player.age;
    }

    const midLife = await api.getLife(lifeId);
    expect(midLife.pending.length).toBeGreaterThan(0);
    const event = midLife.pending[0]!;

    // 6. Resolve event choice offline
    const resolved = await api.resolveChoice(lifeId, event.eventId, event.choices[0]!.id);
    expect(typeof resolved.success).toBe('boolean');
    expect(typeof resolved.roll).toBe('number');
    expect(typeof resolved.finalProbability).toBe('number');
    expect(Array.isArray(resolved.appliedConsequences)).toBe(true);
    expect(resolved.appliedConsequences!.length).toBeGreaterThan(0);

    // 7. Advance to legal adulthood (age 18) offline
    while (age < 18) {
      const adv = await api.advance(lifeId, 5);
      age = adv.player.age;
      if (adv.pending.length > 0 && adv.pending[0]!.choices.length > 0) {
        await api.resolveChoice(lifeId, adv.pending[0]!.eventId, adv.pending[0]!.choices[0]!.id);
      }
    }

    // 8. Apply for career offline (Government Clerk)
    const careerLife = await api.applyJob(lifeId, 'occupation.government_clerk', 180);
    expect(careerLife.player.occupationId).toBe('occupation.government_clerk');
    expect(careerLife.timeline?.some((t) => t.includes('government clerk'))).toBe(true);

    // 9. Perform health activity offline (Exercise)
    const healthLife = await api.performHealthActivity(lifeId, 'exercise');
    expect(typeof healthLife.player.health).toBe('number');
    expect(healthLife.message).toContain('exercise');

    // 10. Perform social relationship interaction offline
    const relLife = await api.interactRelationship(lifeId, 'rel.friend', 'spend_time');
    expect(relLife.message).toContain('quality time');

    // Advance 2 years so character earns salary
    await api.advance(lifeId, 2);

    // 11. Acquire property deed offline
    const propLife = await api.buyProperty(lifeId, {
      id: 'prop_home',
      name: 'Ancestral Havelī',
      type: 'residence',
      cost: 50,
      annualYield: 5,
    });
    expect(propLife.player.properties?.some((p) => p.id === 'prop_home')).toBe(true);

    // 12. Marry and have child offline
    const marriedLife = await api.marryPartner(lifeId, 'Devika Sharma');
    expect(marriedLife.familyMembers.some((m) => m.relation === 'spouse')).toBe(true);

    const parentLife = await api.haveChild(lifeId, 'Anil Sharma');
    expect(parentLife.familyMembers.some((m) => m.name === 'Anil Sharma')).toBe(true);

    // 13. Advance through full life stages until natural mortality offline
    for (let i = 0; i < 25; i++) {
      const adv = await api.advance(lifeId, 5);
      if (adv.status === 'dead' || adv.stopped === 'dead') break;
      if (adv.pending.length > 0 && adv.pending[0]!.choices.length > 0) {
        await api.resolveChoice(lifeId, adv.pending[0]!.eventId, adv.pending[0]!.choices[0]!.id);
      }
    }

    const deceased = await api.getLife(lifeId);
    expect(deceased.status).toBe('dead');
    expect(deceased.legacy).toBeDefined();
    expect(deceased.legacy?.dimensions.family).toBeGreaterThan(0);

    // 14. Heir succession offline
    const heir = await api.playAsHeir(lifeId);
    expect(heir.id).not.toBe(lifeId);
    expect(heir.ancestorId).toBe(lifeId);
    expect(heir.generation).toBe(2);

    // Verify ancestor save remains intact offline
    const ancestorReloaded = await api.getLife(lifeId);
    expect(ancestorReloaded.id).toBe(lifeId);
    expect(ancestorReloaded.status).toBe('dead');

    // 15. Export save snapshot offline
    const exportedJson = await api.exportSave(lifeId);
    expect(typeof exportedJson).toBe('string');
    const parsed = JSON.parse(exportedJson);
    expect(parsed.schemaVersion).toBe(1);
    expect(parsed.status).toBe('dead');

    // 16. Import save snapshot offline
    const importedLife = await api.importSave(exportedJson);
    expect(importedLife.id).toBeDefined();
    expect(importedLife.player.name).toBe('Offline Citizen');

    // 17. Delete life offline
    const delRes = await api.deleteLife(heir.id);
    expect(delRes.deleted).toBe(heir.id);

    const postDelList = await api.listLives();
    expect(postDelList.lives).not.toContain(heir.id);
    expect(postDelList.lives).toContain(lifeId);
  });

  it('seamlessly auto-falls back to offline mode if network is unavailable', async () => {
    // Start with offline mode disabled
    setOfflineMode(false);

    // Call api.createLife with no server running on port 3001
    // It must catch the connection refusal, auto-activate offline mode, and succeed!
    const life = await api.createLife({
      seed: 9999,
      name: 'Resilient Explorer',
      locationId: 'location.london',
    });

    expect(life.id).toBeDefined();
    expect(life.player.name).toBe('Resilient Explorer');

    // Verify it is now in offline mode
    const loaded = await api.getLife(life.id);
    expect(loaded.player.name).toBe('Resilient Explorer');
  });
});


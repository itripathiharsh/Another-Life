import { rmSync } from 'node:fs';
import { join } from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';
import { SessionError } from '../../../simulation/src/index';
import { LifeService } from '../service';
import { FileSaveStore } from '../store';

const DIR = join(process.cwd(), '.cache', 'api-test-saves', 'service');

function freshService(): LifeService {
  rmSync(DIR, { recursive: true, force: true });
  return new LifeService(new FileSaveStore(DIR));
}

describe('LifeService (Stage 4)', () => {
  let service: LifeService;
  beforeEach(() => {
    service = freshService();
  });

  it('creates a life at birth and lists it', () => {
    const view = service.createLife({ seed: 19460301, name: 'Api Person' });
    expect(view.player.age).toBe(0);
    expect(view.status).toBe('active');
    expect(view.pending).toEqual([]);
    expect(service.listLives()).toContain(view.id);
  });

  it('validates creation input', () => {
    expect(() => service.createLife({ name: '   ' })).toThrowError(SessionError);
    expect(() => service.createLife({ name: 'X', birthDate: 'not-a-date' }))
      .toThrowError(SessionError);
    expect(() => service.createLife({ name: 'X', locationId: 'location.atlantis' }))
      .toThrowError(SessionError);
  });

  it('advance pauses at choices; resolve continues the life', () => {
    const created = service.createLife({ seed: 19460301, name: 'Api Person' });
    const advanced = service.advanceLife(created.id, 10);
    expect(advanced.stopped).toBe('choice');
    expect(advanced.pending[0]?.eventId).toBe('evt.childhood_illness');
    expect(advanced.player.age).toBe(4);

    const wealthBefore = advanced.player.wealth;
    const resolved = service.resolveChoice(
      created.id, 'evt.childhood_illness', 'evt.childhood_illness.doctor',
    );
    expect(typeof resolved.success).toBe('boolean');
    expect(resolved.player.wealth).toBe(wealthBefore - 20);
    expect(resolved.timelineLength).toBeGreaterThan(advanced.timelineLength);
  });

  it('rejects bad advance input and unknown lives', () => {
    const created = service.createLife({ seed: 1, name: 'Api Person' });
    expect(() => service.advanceLife(created.id, 0)).toThrowError(SessionError);
    expect(() => service.advanceLife(created.id, 1.5)).toThrowError(SessionError);
    expect(() => service.getLife('life_missing')).toThrowError(SessionError);
    expect(() => service.resolveChoice(created.id, 'evt.nope', 'c')).toThrowError(SessionError);
  });

  it('plays a full life to death with a legacy', () => {
    const created = service.createLife({ seed: 19460301, name: 'Api Person' });
    let view = service.getLife(created.id);
    for (let i = 0; i < 200 && view.status === 'active'; i++) {
      const adv = service.advanceLife(created.id, 30);
      view = adv;
      for (const event of adv.pending) {
        const choice = event.choices[0];
        if (choice) {
          view = service.resolveChoice(created.id, event.eventId, choice.id);
        }
      }
      view = service.getLife(created.id);
    }
    expect(view.status).toBe('dead');
    expect(view.legacy?.summary).toContain('Api Person');
    expect(view.pending).toEqual([]);
  });

  it('persists across service instances (file store)', () => {
    const created = service.createLife({ seed: 42, name: 'Api Person' });
    service.advanceLife(created.id, 10);
    const reloaded = new LifeService(new FileSaveStore(DIR));
    const view = reloaded.getLife(created.id);
    expect(view.player.age).toBe(4);
    expect(view.pending[0]?.eventId).toBe('evt.childhood_illness');
  });

  it('exports versioned save snapshots', () => {
    const created = service.createLife({ seed: 42, name: 'Api Person' });
    const raw = service.exportSave(created.id);
    const parsed = JSON.parse(raw) as { schemaVersion: number; seed: number };
    expect(parsed.schemaVersion).toBe(1);
    expect(parsed.seed).toBe(42);
  });

  it('serves historical context and rejects unknown places', () => {
    const ctx = service.historicalContext('1946-06-15', 'location.lucknow');
    expect(ctx.political?.id).toBe('political.british_raj');
    expect(ctx.availableOccupations.length).toBeGreaterThan(0);
    expect(() => service.historicalContext('1950-06-01', 'location.nowhere'))
      .toThrowError(SessionError);
    expect(() => service.historicalContext('bad-date', 'location.lucknow'))
      .toThrowError(SessionError);
  });

  it('deletes lives', () => {
    const created = service.createLife({ seed: 1, name: 'Api Person' });
    service.deleteLife(created.id);
    expect(service.listLives()).not.toContain(created.id);
    expect(() => service.getLife(created.id)).toThrowError(SessionError);
  });

  it('supports creating a Victorian life and resolves Victorian historical context', () => {
    const created = service.createLife({
      seed: 18400501,
      name: 'Arthur Pendelton',
      birthDate: '1840-05-01',
      locationId: 'location.london',
      classId: 'class.victorian_middle',
    });
    expect(created.player.locationId).toBe('location.london');
    expect(created.player.occupationId).toBeUndefined();

    const ctx = service.historicalContext('1851-05-01', 'location.london');
    expect(ctx.political?.id).toBe('political.victorian_uk');
  });

  it('supports property purchase, marriage, children, and playing as heir', () => {
    const created = service.createLife({ seed: 19460301, name: 'Dynasty Patriarch' });
    const { session } = (service as any).load(created.id);
    session.player.age = 25;
    session.player.wealth = 600;
    (service as any).persist(created.id, session);

    // Buy property
    const withProp = service.buyProperty(created.id, {
      id: 'prop.shop',
      name: 'Aminabad Stall',
      type: 'commercial',
      cost: 200,
      annualYield: 30,
    });
    expect(withProp.player.wealth).toBe(400);
    expect(withProp.player.properties).toHaveLength(1);

    // Marry & have child
    const married = service.marryPartner(created.id, 'Priya');
    expect(married.familyMembers.some((m) => m.relation === 'spouse')).toBe(true);

    const withChild = service.haveChild(created.id, 'Vikram');
    expect(withChild.familyMembers.some((m) => m.name === 'Vikram')).toBe(true);

    // Kill character and play as heir
    const deadSession = (service as any).load(created.id).session;
    deadSession.status = 'dead';
    deadSession.player.alive = false;
    (service as any).persist(created.id, deadSession);

    const heir = service.playAsHeir(created.id);
    expect(heir.status).toBe('active');
    expect(heir.player.name).toBe('Vikram');
    expect(heir.player.wealth).toBe(Math.round(400 * 0.8));
    expect(heir.player.properties).toHaveLength(1);

    // REGRESSION TEST (A1): Heir MUST NOT overwrite ancestor!
    expect(heir.id).not.toBe(created.id);
    expect(heir.ancestorId).toBe(created.id);
    expect(heir.generation).toBe(2);

    // Ancestor save must remain fully preserved and intact on disk
    const ancestor = service.getLife(created.id);
    expect(ancestor.id).toBe(created.id);
    expect(ancestor.status).toBe('dead');
    expect(ancestor.descendantId).toBe(heir.id);
    expect(ancestor.player.name).toBe('Dynasty Patriarch');
    expect(ancestor.player.wealth).toBe(400); // Ancestor's historical wealth unmodified
    expect(service.listLives()).toContain(created.id);
    expect(service.listLives()).toContain(heir.id);

    // Mutating heir life independently does not affect ancestor
    const heirSession = (service as any).load(heir.id).session;
    heirSession.player.age = 21;
    (service as any).persist(heir.id, heirSession);

    service.buyProperty(heir.id, {
      id: 'prop.heir_land',
      name: 'Heir Estate',
      type: 'residence',
      cost: 100,
      annualYield: 15,
    });
    const ancestorAfter = service.getLife(created.id);
    expect(ancestorAfter.player.wealth).toBe(400);
    expect(ancestorAfter.player.properties).toHaveLength(1); // Still only original stall
  });

  it('supports career application and updates player occupation and salary', () => {
    const created = service.createLife({ seed: 19460301, name: 'Career Candidate' });
    const { session } = (service as any).load(created.id);
    session.player.age = 19;
    (service as any).persist(created.id, session);

    const updated = service.applyJob(created.id, 'occupation.teacher', 150);
    expect(updated.player.occupationId).toBe('occupation.teacher');
    expect(updated.timeline.some((t) => t.includes('Appointed to position of teacher'))).toBe(true);

    // Persisted properly
    const reloaded = service.getLife(created.id);
    expect(reloaded.player.occupationId).toBe('occupation.teacher');
  });

  it('supports real health activities with bounded stat and wealth effects', () => {
    const created = service.createLife({ seed: 19460301, name: 'Health Candidate' });
    const { session } = (service as any).load(created.id);
    session.player.health = 70;
    session.player.wealth = 100;
    (service as any).persist(created.id, session);

    // Exercise (+5 health)
    const exResult = service.performHealthActivity(created.id, 'exercise');
    expect(exResult.player.health).toBe(75);
    expect(exResult.message).toContain('+5 Health');

    // Doctor consultation (-15 wealth, +10 health)
    const docResult = service.performHealthActivity(created.id, 'consultation');
    expect(docResult.player.health).toBe(85);
    expect(docResult.player.wealth).toBe(85);
    expect(docResult.message).toContain('Consulted physician');

    // Reject consultation if wealth insufficient
    const poorSession = (service as any).load(created.id).session;
    poorSession.player.wealth = 5;
    (service as any).persist(created.id, poorSession);
    expect(() => service.performHealthActivity(created.id, 'consultation')).toThrowError(SessionError);
  });

  it('supports persistent relationship interactions', () => {
    const created = service.createLife({ seed: 19460301, name: 'Social Candidate' });
    const { session } = (service as any).load(created.id);
    session.player.wealth = 100;
    (service as any).persist(created.id, session);

    const rel = created.familyMembers[0] ?? { name: 'Mohan' };
    const res = service.interactRelationship(created.id, 'rel.friend', 'spend_time');
    expect(res.message).toContain('Spent quality time');
    expect(res.timeline.some((t) => t.includes('[relationship]'))).toBe(true);
  });

  it('lists detailed save summaries for real save management', () => {
    const lifeA = service.createLife({ seed: 101, name: 'Save Alpha' });
    const lifeB = service.createLife({ seed: 102, name: 'Save Beta' });

    const summaries = service.listLivesDetail();
    expect(summaries.length).toBeGreaterThanOrEqual(2);
    const alpha = summaries.find((s) => s.id === lifeA.id);
    const beta = summaries.find((s) => s.id === lifeB.id);

    expect(alpha?.name).toBe('Save Alpha');
    expect(alpha?.status).toBe('active');
    expect(beta?.name).toBe('Save Beta');
    expect(beta?.status).toBe('active');
  });

  it('preserves complete life timeline across many years without truncation', () => {
    const created = service.createLife({ seed: 19460301, name: 'Long Life Person' });
    // Advance multiple times
    for (let i = 0; i < 30 && service.getLife(created.id).status === 'active'; i++) {
      const adv = service.advanceLife(created.id, 1);
      if (adv.pending.length > 0) {
        const first = adv.pending[0]!;
        service.resolveChoice(created.id, first.eventId, first.choices[0]!.id);
      }
    }
    const life = service.getLife(created.id);
    expect(life.timeline.length).toBeGreaterThanOrEqual(25);
    // Earliest milestone (birth) remains in timeline!
    expect(life.timeline[0]).toContain('Born in');
  });
});


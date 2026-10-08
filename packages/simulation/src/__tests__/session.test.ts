import { describe, expect, it } from 'vitest';
import {
  LUCKNOW_LIFE_TEMPLATES,
  lucknowYearNotes,
} from '../../../content/src/index';
import {
  advanceSession,
  createSession,
  exportSessionSnapshot,
  importSessionSnapshot,
  pendingChoices,
  resolveSessionChoice,
  sessionLegacy,
  SessionError,
  type SessionLifeConfig,
  type SessionState,
} from '../index';

const LIFE: SessionLifeConfig = {
  name: 'Session Person',
  birthDate: '1946-03-01',
  locationId: 'location.lucknow',
  classId: 'class.middle',
  schoolStartAge: 6,
  schoolEndAge: 14,
  workStartAge: 18,
  occupationId: 'occupation.government_clerk',
  yearlyIncome: 180,
  yearlyExpenses: 120,
  friendName: 'Mohan',
};

function fresh(seed = 19460301): SessionState {
  return createSession(seed, LIFE);
}

/** Drive a session to completion, always taking the first pending choice. */
function playThrough(session: SessionState): SessionState {
  for (let i = 0; i < 200 && session.status === 'active'; i++) {
    const adv = advanceSession(session, LUCKNOW_LIFE_TEMPLATES, lucknowYearNotes, 30);
    if (adv.stopped === 'dead') break;
    if (adv.stopped === 'choice' && adv.pending.length > 0) {
      const first = adv.pending[0];
      const choice = first?.choices[0];
      if (first && choice) {
        resolveSessionChoice(session, LUCKNOW_LIFE_TEMPLATES, first.eventId, choice.id);
      }
    }
  }
  return session;
}

describe('interactive session (Stage 4)', () => {
  it('starts at birth, active, with no pending choices', () => {
    const s = fresh();
    expect(s.status).toBe('active');
    expect(s.player.age).toBe(0);
    expect(pendingChoices(s, LUCKNOW_LIFE_TEMPLATES)).toEqual([]);
  });

  it('advance pauses at the first choice point (childhood illness, age 4)', () => {
    const s = fresh();
    const adv = advanceSession(s, LUCKNOW_LIFE_TEMPLATES, lucknowYearNotes, 10);
    expect(adv.stopped).toBe('choice');
    expect(adv.pending[0]?.eventId).toBe('evt.childhood_illness');
    expect(s.player.age).toBe(4);
  });

  it('resolving a choice applies effects and play continues', () => {
    const s = fresh();
    advanceSession(s, LUCKNOW_LIFE_TEMPLATES, lucknowYearNotes, 10);
    const wealthBefore = s.player.wealth;
    const result = resolveSessionChoice(
      s, LUCKNOW_LIFE_TEMPLATES, 'evt.childhood_illness', 'evt.childhood_illness.doctor',
    );
    expect(typeof result.success).toBe('boolean');
    // treatment cost is paid either way
    expect(s.player.wealth).toBe(wealthBefore - 20);
    expect(s.history).toHaveLength(1);
  });

  it('rejects unknown events, ineligible choices, and post-death play', () => {
    const s = fresh();
    advanceSession(s, LUCKNOW_LIFE_TEMPLATES, lucknowYearNotes, 10);
    expect(() => resolveSessionChoice(s, LUCKNOW_LIFE_TEMPLATES, 'evt.nope', 'c'))
      .toThrowError(SessionError);
    expect(() => resolveSessionChoice(s, LUCKNOW_LIFE_TEMPLATES, 'evt.childhood_illness', 'c.nope'))
      .toThrowError(SessionError);
    expect(() => advanceSession(s, LUCKNOW_LIFE_TEMPLATES, lucknowYearNotes, 0))
      .toThrowError(SessionError);
    playThrough(s);
    expect(s.status).toBe('dead');
    expect(() => resolveSessionChoice(s, LUCKNOW_LIFE_TEMPLATES, 'evt.x', 'c'))
      .toThrowError(SessionError);
  });

  it('a full interactive life ends with a legacy', () => {
    const s = playThrough(fresh());
    expect(s.status).toBe('dead');
    expect(s.player.age).toBeGreaterThanOrEqual(50);
    const legacy = sessionLegacy(s);
    expect(legacy?.summary).toContain('Session Person');
    expect(pendingChoices(s, LUCKNOW_LIFE_TEMPLATES)).toEqual([]);
  });

  it('is deterministic: same seed + same choices → identical life', () => {
    const a = playThrough(fresh(555));
    const b = playThrough(fresh(555));
    expect(a.timeline).toEqual(b.timeline);
    expect(exportSessionSnapshot(a, 'lucknow-slice-v1')).toBe(
      exportSessionSnapshot(b, 'lucknow-slice-v1'),
    );
  });

  it('save/load round-trip continues identically', () => {
    const a = fresh(777);
    advanceSession(a, LUCKNOW_LIFE_TEMPLATES, lucknowYearNotes, 10);
    const restored = importSessionSnapshot(exportSessionSnapshot(a, 'lucknow-slice-v1'));
    const advA = advanceSession(a, LUCKNOW_LIFE_TEMPLATES, lucknowYearNotes, 5);
    const advB = advanceSession(restored, LUCKNOW_LIFE_TEMPLATES, lucknowYearNotes, 5);
    expect(advA).toEqual(advB);
    expect(a.timeline).toEqual(restored.timeline);
  });

  it('rejects saves with unknown schema versions', () => {
    const s = fresh();
    const bad = exportSessionSnapshot(s, 'lucknow-slice-v1').replace('"schemaVersion":1', '"schemaVersion":999');
    expect(() => importSessionSnapshot(bad)).toThrowError(SessionError);
  });

  it('allows property acquisition at age 18+ and yields passive income upon aging', async () => {
    const s = fresh();
    s.player.age = 22;
    s.player.wealth = 500;
    const { buyPropertySession } = await import('../session');
    buyPropertySession(s, {
      id: 'prop.orchard',
      name: 'Mango Orchard',
      type: 'farmland',
      cost: 300,
      annualYield: 45,
    });
    expect(s.player.wealth).toBe(200);
    expect(s.player.properties).toHaveLength(1);
    expect(s.player.properties?.[0]?.name).toBe('Mango Orchard');

    const wealthBefore = s.player.wealth;
    advanceSession(s, LUCKNOW_LIFE_TEMPLATES, lucknowYearNotes, 1);
    // Advance 1 year -> property yield +45 minus living expenses 20 = net +25
    expect(s.player.wealth).toBe(wealthBefore - 20 + 45);
  });

  it('allows marriage, childbearing, and playing as heir', async () => {
    const s = fresh();
    s.player.age = 24;
    s.player.wealth = 1000;
    const { marryPartnerSession, haveChildSession, createHeirSession } = await import('../session');

    marryPartnerSession(s, 'Kavita');
    expect(s.family.members.some((m) => m.relation === 'spouse' && m.name === 'Kavita')).toBe(true);

    haveChildSession(s, 'Rohan');
    expect(s.family.members.some((m) => m.relation === 'child' && m.name === 'Rohan')).toBe(true);

    // End life and play as heir
    s.status = 'dead';
    s.player.alive = false;
    const heir = createHeirSession(s);
    expect(heir.status).toBe('active');
    expect(heir.player.name).toBe('Rohan');
    expect(heir.player.wealth).toBe(800); // 80% of 1000
    expect(heir.timeline.some((t) => t.includes('Assumed household leadership'))).toBe(true);
  });
});

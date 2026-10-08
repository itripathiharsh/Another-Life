import { describe, expect, it } from 'vitest';
import {
  addChild,
  addDays,
  annualHealthDrift,
  applyEconomy,
  applyHealth,
  applyPlayerConsequence,
  agePlayer,
  contextFromPlayer,
  createDivergence,
  createEventRecord,
  createFamily,
  createPlayer,
  createRelationship,
  createRng,
  createSerializableRng,
  createSnapshot,
  computeLegacy,
  deserializeSnapshot,
  eligibleTemplates,
  evolveRelationship,
  gainEducation,
  hashSeed,
  isEligible,
  killPlayer,
  pick,
  randomInt,
  requirementPasses,
  resetInstanceCounter,
  resolveOutcome,
  serializeSnapshot,
  setOccupation,
  shouldDiverge,
  stageForAge,
  tick,
  triggerDue,
  yearsBetween,
  type CharacterState,
  type Choice,
} from '../index';

function testPlayer(overrides: Partial<CharacterState> = {}): CharacterState {
  return {
    id: 'player.test',
    name: 'Test Person',
    birthDate: '1946-03-01',
    age: 20,
    locationId: 'location.lucknow',
    classId: 'class.middle',
    health: 80,
    wealth: 500,
    educationYears: 8,
    occupationId: 'occupation.government_clerk',
    skills: {},
    traits: [],
    reputation: 10,
    alive: true,
    ...overrides,
  };
}

describe('rng (p6 §27.1)', () => {
  it('same seed → same sequence', () => {
    const a = createRng(42);
    const b = createRng(42);
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });

  it('different seeds diverge', () => {
    expect(createRng(1)()).not.toBe(createRng(2)());
  });

  it('serializable RNG matches createRng and survives save/load', () => {
    const plain = createRng(1234);
    const serial = createSerializableRng(1234);
    expect([serial.next(), serial.next()]).toEqual([plain(), plain()]);
    const saved = serial.getState();
    const v1 = serial.next();
    serial.setState(saved);
    expect(serial.next()).toBe(v1);
  });

  it('hashSeed is stable', () => {
    expect(hashSeed('lucknow-1946')).toBe(hashSeed('lucknow-1946'));
  });

  it('randomInt stays in bounds; pick handles empty', () => {
    const rng = createRng(9);
    for (let i = 0; i < 50; i++) {
      const n = randomInt(rng, 1, 6);
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(6);
    }
    expect(pick(rng, [])).toBeUndefined();
    expect(pick(rng, ['only'])).toBe('only');
  });
});

describe('player core (p6 §7-8)', () => {
  it('createPlayer sets sane defaults', () => {
    const p = createPlayer({
      id: 'p1', name: 'Ramu', birthDate: '1946-01-01',
      locationId: 'location.lucknow', classId: 'class.middle',
    });
    expect(p.age).toBe(0);
    expect(p.health).toBe(80);
    expect(p.alive).toBe(true);
    expect(p.occupationId).toBeUndefined();
  });

  it('stageForAge follows default bands', () => {
    expect(stageForAge(0)).toBe('birth');
    expect(stageForAge(3)).toBe('early_childhood');
    expect(stageForAge(8)).toBe('childhood');
    expect(stageForAge(15)).toBe('adolescence');
    expect(stageForAge(22)).toBe('early_adulthood');
    expect(stageForAge(40)).toBe('adulthood');
    expect(stageForAge(60)).toBe('later_adulthood');
    expect(stageForAge(70)).toBe('old_age');
  });

  it('agePlayer ages and declines health only after 50', () => {
    const young = agePlayer(testPlayer({ age: 20, health: 80 }), 5);
    expect(young.age).toBe(25);
    expect(young.health).toBe(80);
    const old = agePlayer(testPlayer({ age: 55, health: 70 }), 5);
    expect(old.age).toBe(60);
    expect(old.health).toBeLessThan(70);
  });

  it('agePlayer rejects backwards aging; killPlayer ends life', () => {
    expect(() => agePlayer(testPlayer(), -1)).toThrow();
    const dead = killPlayer(testPlayer());
    expect(dead.alive).toBe(false);
    expect(dead.health).toBe(0);
  });
});

describe('family/relationships (p6 §9-10)', () => {
  it('createRelationship starts neutral; evolve clamps + records memory', () => {
    const rel = createRelationship({ id: 'r1', type: 'friend', name: 'Mohan' });
    expect(rel.trust).toBe(50);
    const evolved = evolveRelationship(rel, { trust: 60, conflict: -10 }, 'helped_in_crisis');
    expect(evolved.trust).toBe(100);
    expect(evolved.conflict).toBe(0);
    expect(evolved.sharedHistory).toContain('helped_in_crisis');
  });

  it('addChild appends a child member', () => {
    const fam = addChild(createFamily(), {
      id: 'c1', name: 'Beti', birthYear: 1968, alive: true,
    });
    expect(fam.members).toHaveLength(1);
    expect(fam.members[0]?.relation).toBe('child');
  });
});

describe('systems: education/career/economy/health (p6 §11-12)', () => {
  it('gainEducation adds years + skill', () => {
    const p = gainEducation(testPlayer(), 4);
    expect(p.educationYears).toBe(12);
    expect(p.skills['literacy']).toBe(40);
  });

  it('setOccupation assigns job + experience', () => {
    const p = setOccupation(testPlayer(), { occupationId: 'occupation.teacher', income: 200 });
    expect(p.occupationId).toBe('occupation.teacher');
    expect(p.skills['occupation_skill']).toBe(5);
  });

  it('applyEconomy nets income-expenses and allows debt', () => {
    expect(applyEconomy(testPlayer({ wealth: 100 }), { income: 50, expenses: 30 }).wealth).toBe(120);
    expect(applyEconomy(testPlayer({ wealth: 10 }), { income: 0, expenses: 50 }).wealth).toBe(-40);
  });

  it('applyHealth clamps; annualHealthDrift punishes poor conditions', () => {
    expect(applyHealth(testPlayer({ health: 95 }), 10).health).toBe(100);
    expect(applyHealth(testPlayer({ health: 5 }), -10).health).toBe(0);
    const bad = annualHealthDrift(70, {
      age: 60, healthcareAccess: 'none', livingConditions: 'poor', occupationHazard: 2,
    });
    const good = annualHealthDrift(70, {
      age: 25, healthcareAccess: 'good', livingConditions: 'good', occupationHazard: 0,
    });
    expect(bad).toBeLessThan(70);
    expect(good).toBeGreaterThanOrEqual(70);
  });
});

describe('event engine (p4)', () => {
  it('requirementPasses handles all ops', () => {
    const ctx = contextFromPlayer(testPlayer(), '1966-06-01');
    expect(requirementPasses({ field: 'age', op: '>=', value: 18 }, ctx)).toBe(true);
    expect(requirementPasses({ field: 'age', op: '<', value: 18 }, ctx)).toBe(false);
    expect(requirementPasses({ field: 'occupationId', op: '==', value: 'occupation.government_clerk' }, ctx)).toBe(true);
    expect(requirementPasses({ field: 'locationId', op: 'includes', value: 'lucknow' }, ctx)).toBe(true);
    expect(requirementPasses({ field: 'no_such_field', op: '>=', value: 0 }, ctx)).toBe(false);
  });

  it('isEligible requires ALL requirements (never impossible events)', () => {
    const ctx = contextFromPlayer(testPlayer(), '1966-06-01');
    expect(isEligible([{ field: 'age', op: '>=', value: 18 }], ctx)).toBe(true);
    expect(
      isEligible(
        [{ field: 'age', op: '>=', value: 18 }, { field: 'wealth', op: '>=', value: 99999 }],
        ctx,
      ),
    ).toBe(false);
  });

  it('resolveOutcome is deterministic for same seed; clamps probability', () => {
    const a = resolveOutcome(50, 10, createRng(7));
    const b = resolveOutcome(50, 10, createRng(7));
    expect(a.roll).toBe(b.roll);
    expect(a.success).toBe(b.success);
    expect(a.finalProbability).toBe(60);
    expect(resolveOutcome(90, 50, createRng(1)).finalProbability).toBe(100);
    expect(resolveOutcome(10, -50, createRng(1)).finalProbability).toBe(0);
  });

  it('applyPlayerConsequence ADD/SET; ignores unknown keys', () => {
    const added = applyPlayerConsequence(testPlayer({ wealth: 100 }), {
      target: 'player', property: 'wealth', op: 'ADD', value: 50,
      timing: 'immediate', visibility: 'visible', source: 'test',
    });
    expect(added.wealth).toBe(150);
    const set = applyPlayerConsequence(testPlayer(), {
      target: 'player', property: 'reputation', op: 'SET', value: 42,
      timing: 'immediate', visibility: 'visible', source: 'test',
    });
    expect(set.reputation).toBe(42);
    const untouched = applyPlayerConsequence(testPlayer(), {
      target: 'player', property: 'name', op: 'SET', value: 'X',
      timing: 'immediate', visibility: 'visible', source: 'test',
    });
    expect(untouched.name).toBe('Test Person');
  });

  it('triggerDue respects condition + earliest/expiration', () => {
    const ctx = contextFromPlayer(testPlayer({ age: 30 }), '1976-06-01');
    expect(triggerDue({
      eventId: 'e', sourceEventId: 's', triggerCondition: 'age>=30',
      priority: 1, createdAt: '1966-01-01',
    }, ctx)).toBe(true);
    expect(triggerDue({
      eventId: 'e', sourceEventId: 's', triggerCondition: 'age>=30 AND wealth>=99999',
      priority: 1, createdAt: '1966-01-01',
    }, ctx)).toBe(false);
    expect(triggerDue({
      eventId: 'e', sourceEventId: 's', triggerCondition: 'age>=30',
      earliestDate: '1980-01-01', priority: 1, createdAt: '1966-01-01',
    }, ctx)).toBe(false);
    expect(triggerDue({
      eventId: 'e', sourceEventId: 's', triggerCondition: 'age>=18',
      expirationDate: '1970-01-01', priority: 1, createdAt: '1966-01-01',
    }, ctx)).toBe(false);
  });

  it('createEventRecord links causal parents', () => {
    resetInstanceCounter();
    const parent = createEventRecord({
      eventId: 'event.help_stranger', timestamp: '1960-01-01', locationId: 'location.lucknow',
    });
    const child = createEventRecord({
      eventId: 'event.stranger_returns', timestamp: '1965-01-01',
      locationId: 'location.lucknow', causalParentId: parent.instanceId,
    });
    expect(child.causalParentId).toBe(parent.instanceId);
    expect(child.instanceId).not.toBe(parent.instanceId);
  });

  it('choice eligibility flows through templates', () => {
    const choice: Choice = {
      id: 'c1', eventId: 'e1', title: 'Invest savings',
      requirements: [{ field: 'wealth', op: '>=', value: 100 }],
      baseProbability: 60, consequences: [],
    };
    const ctx = contextFromPlayer(testPlayer({ wealth: 500 }), '1966-01-01');
    expect(isEligible(choice.requirements, ctx)).toBe(true);
    const poor = contextFromPlayer(testPlayer({ wealth: 10 }), '1966-01-01');
    expect(isEligible(choice.requirements, poor)).toBe(false);
  });
});

describe('divergence (p4 §48-51)', () => {
  it('higher scopes need higher importance', () => {
    expect(shouldDiverge(50, 0)).toBe(true);
    expect(shouldDiverge(50, 5)).toBe(false);
    expect(shouldDiverge(96, 6)).toBe(true);
  });

  it('createDivergence stores the override pair', () => {
    const d = createDivergence({
      id: 'div.1', triggerEventId: 'event.x', date: '1962-11-01',
      scope: 2, originalState: 'baseline', newState: 'branch',
      cause: 'player action',
    });
    expect(d.scope).toBe(2);
    expect(d.originalState).not.toBe(d.newState);
  });
});

describe('legacy (p6 §28-29)', () => {
  it('derives multidimensional legacy from history, not one score', () => {
    const history = [
      { ...createEventRecord({ eventId: 'e1', timestamp: '1960-01-01', locationId: 'location.lucknow' }), outcome: 'success' as const },
    ];
    const leg = computeLegacy({
      player: testPlayer({ wealth: 5000 }),
      family: addChild(createFamily(), { id: 'c1', name: 'Beti', birthYear: 1968, alive: true }),
      history,
      relationshipCount: 4,
      divergenceCount: 1,
      death: { date: '2000-01-01', age: 54, cause: 'old_age', locationId: 'location.lucknow' },
    });
    expect(leg.dimensions.family).toBeGreaterThan(0);
    expect(leg.dimensions.historical).toBeGreaterThan(0);
    expect(leg.summary).toContain('Test Person');
    expect(leg.timelineHighlights).toHaveLength(1);
  });
});

describe('saves (p6 §27)', () => {
  it('JSON round-trip is lossless; bad versions rejected', () => {
    const snap = createSnapshot({
      seed: 1234, date: '1966-06-01', player: testPlayer(),
      family: createFamily(), relationships: [], scheduled: [],
      history: [], divergences: [], timeline: ['born 1946'],
    });
    const restored = deserializeSnapshot(serializeSnapshot(snap));
    expect(restored).toEqual(snap);
    expect(() => deserializeSnapshot(JSON.stringify({ ...snap, version: 999 }))).toThrow();
  });
});

describe('engine tick (p6 §18.2)', () => {
  it('addDays crosses month boundaries; yearsBetween floors', () => {
    expect(addDays('1947-08-14', 1)).toBe('1947-08-15');
    expect(addDays('1948-02-28', 1)).toBe('1948-02-29');
    expect(yearsBetween('1946-03-01', '1966-02-28')).toBe(19);
    expect(yearsBetween('1946-03-01', '1966-03-01')).toBe(20);
  });

  it('tick advances date, ages player, surfaces due scheduled', () => {
    const out = tick({
      date: '1965-12-31',
      player: testPlayer({ birthDate: '1946-03-01', age: 19 }),
      scheduled: [{
        eventId: 'event.review', sourceEventId: 'event.invest',
        triggerCondition: 'age>=20', priority: 1, createdAt: '1960-01-01',
      }],
    }, 70);
    expect(out.date).toBe('1966-03-11');
    expect(out.player.age).toBe(20);
    expect(out.dueScheduled).toHaveLength(1);
  });

  it('tick rejects non-positive steps; eligibleTemplates filters', () => {
    expect(() => tick({ date: '1966-01-01', player: testPlayer(), scheduled: [] }, 0)).toThrow();
    const ctx = contextFromPlayer(testPlayer({ age: 30 }), '1976-01-01');
    const kept = eligibleTemplates(
      [{ id: 'e1', title: 'T', description: 'D', requirements: [{ field: 'age', op: '>=', value: 18 }], choices: [] }],
      ctx,
    );
    expect(kept).toHaveLength(1);
  });
});

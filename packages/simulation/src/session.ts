// Interactive life session (Stage 4). Stepwise advance + pending choices,
// built on the same engine primitives and effect conventions (effects.ts)
// as the auto-run slice — but pauses at every choice point instead of
// auto-resolving. Fully serializable (rng state included) for save/load.

import { addYearsISO } from './engine';
import { applyConsequence, type EffectBundle } from './effects';
import {
  contextFromPlayer,
  createEventRecord,
  isEligible,
  resolveOutcome,
  resetInstanceCounter,
  triggerDue,
  type Choice,
  type Consequence,
  type EvalContext,
  type EventRecord,
  type ScheduledEvent,
  type SimEventTemplate,
} from './events';
import {
  createFamily,
  createRelationship,
  type FamilyRecord,
  type Relationship,
} from './family';
import {
  createDivergence,
  type DivergenceLevel,
  type DivergenceRecord,
} from './divergence';
import { computeLegacy, type DeathCause, type Legacy } from './legacy';
import {
  agePlayer,
  createPlayer,
  killPlayer,
  stageForAge,
  type CharacterState,
} from './player';
import { createSerializableRng } from './rng';
import { annualHealthDrift, applyEconomy, gainEducation, setOccupation } from './systems';

export const SESSION_SCHEMA_VERSION = 1;
export const ENGINE_VERSION = '0.4.0-stage4';

export interface SessionLifeConfig {
  name: string;
  birthDate: string;
  locationId: string;
  classId: string;
  schoolStartAge: number;
  schoolEndAge: number;
  workStartAge: number;
  occupationId: string;
  yearlyIncome: number;
  yearlyExpenses: number;
  friendName: string;
}

export interface SessionState {
  version: number;
  seed: number;
  rngState: number;
  lifespan: number;
  date: string;
  player: CharacterState;
  family: FamilyRecord;
  relationships: Relationship[];
  scheduled: ScheduledEvent[];
  history: EventRecord[];
  flags: Record<string, number>;
  firedIds: string[];
  timeline: string[];
  schooled: boolean;
  status: 'active' | 'dead';
  death: { date: string; age: number; cause: DeathCause } | undefined;
  life: SessionLifeConfig;
  ancestorId?: string;
  descendantId?: string;
  generation?: number;
  divergences?: DivergenceRecord[];
}

export class SessionError extends Error {
  readonly code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

export function createSession(seed: number, life: SessionLifeConfig): SessionState {
  resetInstanceCounter();
  const rng = createSerializableRng(seed);
  const lifespan = 55 + Math.floor(rng.next() * 20);
  const player = createPlayer({
    id: 'player.session',
    name: life.name,
    birthDate: life.birthDate,
    locationId: life.locationId,
    classId: life.classId,
  });
  const friend = createRelationship({ id: 'rel.friend', type: 'friend', name: life.friendName });
  const timeline = [
    `${life.birthDate} (age 0, birth): Born in ${life.locationId}`,
  ];
  return {
    version: SESSION_SCHEMA_VERSION,
    seed,
    rngState: rng.getState(),
    lifespan,
    date: life.birthDate,
    player,
    family: createFamily(),
    relationships: [friend],
    scheduled: [],
    history: [],
    flags: {},
    firedIds: [],
    timeline,
    schooled: false,
    status: 'active',
    death: undefined,
    life,
    generation: 1,
    divergences: [],
  };
}

function sessionContext(session: SessionState): EvalContext {
  return {
    ...contextFromPlayer(session.player, session.date),
    ...session.flags,
  } as EvalContext;
}

export interface PendingChoiceInfo {
  id: string;
  title: string;
  description?: string;
  baseProbability: number;
}

export interface PendingEvent {
  eventId: string;
  title: string;
  description: string;
  viaScheduled: boolean;
  choices: PendingChoiceInfo[];
}

/** All choice points currently awaiting the player (revalidated). */
export function pendingChoices(
  session: SessionState,
  templates: readonly SimEventTemplate[],
): PendingEvent[] {
  if (session.status !== 'active') return [];
  const ctx = sessionContext(session);
  const out: PendingEvent[] = [];
  const seen = new Set<string>();

  const collect = (template: SimEventTemplate, viaScheduled: boolean): void => {
    if (seen.has(template.id) || session.firedIds.includes(template.id)) return;
    const choices = template.choices
      .filter((ch) => isEligible(ch.requirements, ctx))
      .map((ch) => ({
        id: ch.id,
        title: ch.title,
        description: ch.description,
        baseProbability: ch.baseProbability,
      }));
    if (choices.length === 0) return;
    seen.add(template.id);
    out.push({
      eventId: template.id,
      title: template.title,
      description: template.description,
      viaScheduled,
      choices,
    });
  };

  for (const template of templates) {
    if (isEligible(template.requirements, ctx)) collect(template, false);
  }
  for (const s of session.scheduled) {
    if (!triggerDue(s, ctx)) continue;
    const template = templates.find((t) => t.id === s.eventId);
    if (template && isEligible(template.requirements, ctx)) collect(template, true);
  }
  return out;
}

export type AdvanceStop = 'choice' | 'dead' | 'ok';

export interface AdvanceResult {
  stopped: AdvanceStop;
  pending: PendingEvent[];
}

/**
 * Advance up to `years` life-years, pausing at the first choice point.
 * Yearly upkeep (aging, health drift, economy, school, work, history
 * notes) mirrors the slice runner. Expired/invalid scheduled items are
 * cancelled with a log line (p4 §53).
 */
export function advanceSession(
  session: SessionState,
  templates: readonly SimEventTemplate[],
  historicalNotes: (date: string, locationId: string) => string[],
  years: number,
): AdvanceResult {
  if (session.status !== 'active') {
    return { stopped: 'dead', pending: [] };
  }
  if (!Number.isInteger(years) || years < 1 || years > 120) {
    throw new SessionError('bad-advance', 'years must be an integer 1..120');
  }

  for (let step = 0; step < years; step++) {
    processYear(session, historicalNotes);
    if (session.status !== 'active') {
      return { stopped: 'dead', pending: [] };
    }
    // Cancel scheduled items that can never fire (revalidation, p4 §53).
    const kept: ScheduledEvent[] = [];
    for (const s of session.scheduled) {
      const template = templates.find((t) => t.id === s.eventId);
      if (!template) {
        session.timeline.push(
          `${session.date} (age ${session.player.age}): Scheduled ${s.eventId} has no template — dropped`,
        );
        continue;
      }
      if (s.expirationDate !== undefined && session.date > s.expirationDate) {
        session.timeline.push(
          `${session.date} (age ${session.player.age}): Scheduled ${s.eventId} expired — cancelled`,
        );
        continue;
      }
      kept.push(s);
    }
    session.scheduled = kept;

    const pending = pendingChoices(session, templates);
    if (pending.length > 0) {
      return { stopped: 'choice', pending };
    }
  }
  return { stopped: 'ok', pending: [] };
}

function processYear(
  session: SessionState,
  historicalNotes: (date: string, locationId: string) => string[],
): void {
  const life = session.life;
  const newAge = session.player.age + 1;
  const date = addYearsISO(life.birthDate, newAge);
  let player = agePlayer(session.player, 1);
  player = {
    ...player,
    health: annualHealthDrift(player.health, {
      age: player.age,
      healthcareAccess: player.age < 2 ? 'none' : 'basic',
      livingConditions: 'average',
      occupationHazard: 0,
    }),
  };
  const isDependentChild = !player.occupationId && newAge < life.workStartAge;
  const unempExpenses = isDependentChild ? 0 : 20;
  player = player.occupationId
    ? applyEconomy(player, { income: life.yearlyIncome, expenses: life.yearlyExpenses })
    : applyEconomy(player, { income: 0, expenses: unempExpenses });

  // Passive yields from owned properties, farmland and commercial stalls
  const propertyYield = (player.properties ?? []).reduce((sum, p) => sum + p.annualYield, 0);
  if (propertyYield > 0) {
    player = { ...player, wealth: player.wealth + propertyYield };
  }

  session.player = player;
  session.date = date;

  const log = (msg: string): void => {
    session.timeline.push(`${date} (age ${player.age}, ${stageForAge(player.age)}): ${msg}`);
  };

  if (propertyYield > 0) {
    log(`Collected +${propertyYield} coins in property yields and rents`);
  }

  if (newAge >= life.schoolStartAge && newAge < life.schoolEndAge) {
    if (!session.schooled) {
      log('Started school');
      session.schooled = true;
    }
    session.player = gainEducation(session.player, 1);
  }
  if (newAge === life.schoolEndAge && session.schooled) log('Left school');
  if (newAge === life.workStartAge) {
    session.player = setOccupation(session.player, {
      occupationId: life.occupationId,
      income: life.yearlyIncome,
    });
    log(`Started work as ${life.occupationId} (income ${life.yearlyIncome}/yr)`);
  }

  for (const note of historicalNotes(date, life.locationId)) {
    const tag = `[world] ${note}`;
    if (!session.timeline.some((line) => line.includes(tag))) {
      session.timeline.push(`${date}: ${tag}`);
    }
  }

  if (session.player.age >= session.lifespan || session.player.health <= 0) {
    const cause: DeathCause =
      session.player.health <= 0 && session.player.age < session.lifespan ? 'disease' : 'old_age';
    session.player = killPlayer(session.player);
    session.status = 'dead';
    session.death = { date, age: session.player.age, cause };
    log(`Died (${cause})`);
  }
}

export interface ChoiceResult {
  success: boolean;
  roll: number;
  finalProbability: number;
  pending: PendingEvent[];
  appliedConsequences: Consequence[];
}

/** Resolve one pending choice. Throws SessionError on unknown/ineligible. */
export function resolveSessionChoice(
  session: SessionState,
  templates: readonly SimEventTemplate[],
  eventId: string,
  choiceId: string,
): ChoiceResult {
  if (session.status !== 'active') {
    throw new SessionError('life-ended', 'This life has ended; no choices remain');
  }
  const pending = pendingChoices(session, templates);
  const event = pending.find((p) => p.eventId === eventId);
  if (!event) {
    throw new SessionError('unknown-event', `No pending event ${eventId}`);
  }
  const template = templates.find((t) => t.id === eventId);
  const choice: Choice | undefined = template?.choices.find((c) => c.id === choiceId);
  if (!choice || !event.choices.some((c) => c.id === choiceId)) {
    throw new SessionError('ineligible-choice', `Choice ${choiceId} is not available`);
  }

  const rng = createSerializableRng(session.seed);
  rng.setState(session.rngState);
  const outcome = resolveOutcome(choice.baseProbability, 0, () => rng.next());
  session.rngState = rng.getState();

  const record = createEventRecord({
    eventId,
    timestamp: session.date,
    locationId: session.player.locationId,
  });
  record.selectedChoiceId = choice.id;
  record.outcome = outcome.success ? 'success' : 'failure';
  const applicable = outcome.success
    ? choice.consequences
    : (choice.failureConsequences && choice.failureConsequences.length > 0)
      ? choice.failureConsequences
      : choice.consequences.filter(
        (c) => c.target === 'player' && c.property === 'wealth' && c.op === 'ADD' &&
          typeof c.value === 'number' && c.value < 0,
      );
  const bundle: EffectBundle = {
    player: session.player,
    family: session.family,
    relationships: session.relationships,
    flags: session.flags,
    scheduled: session.scheduled,
  };
  const sealed: string[] = [];
  for (const c of applicable) {
    if (c.timing === 'hidden') {
      sealed.push(`${session.date}: [hidden consequence sealed — source ${c.source}]`);
    }
    if (c.target === 'world' && (c.property === 'divergence' || c.property.startsWith('divergence:'))) {
      const scopeVal: DivergenceLevel = typeof c.value === 'number' && c.value >= 0 && c.value <= 6
        ? (c.value as DivergenceLevel)
        : 2;
      const div = createDivergence({
        id: `div.${Date.now()}.${session.divergences?.length ?? 0}`,
        triggerEventId: eventId,
        date: session.date,
        scope: scopeVal,
        originalState: 'Historical baseline course',
        newState: `Divergent timeline branch caused by "${choice.title}"`,
        cause: `Player choice in event ${eventId}`,
        affectedEntityIds: [session.player.locationId],
      });
      if (!session.divergences) session.divergences = [];
      session.divergences.push(div);
      sealed.push(`${session.date}: [divergence] Historical branch created: ${div.newState} (Scope L${div.scope})`);
    }
    applyConsequence(bundle, c, session.date);
    record.consequencesApplied.push(c);
  }
  session.player = bundle.player;
  session.family = bundle.family;
  session.relationships = bundle.relationships;
  session.scheduled = bundle.scheduled.filter((s) => s.eventId !== eventId);
  session.history.push(record);
  session.firedIds.push(eventId);
  session.timeline.push(
    `${session.date} (age ${session.player.age}): ` +
    `Event ${eventId} — chose "${choice.title}" → ${record.outcome} ` +
    `(roll ${outcome.roll.toFixed(1)} vs ${outcome.finalProbability})`,
  );
  for (const line of sealed) session.timeline.push(line);

  return {
    success: outcome.success,
    roll: outcome.roll,
    finalProbability: outcome.finalProbability,
    pending: pendingChoices(session, templates),
    appliedConsequences: applicable,
  };
}

/** Multidimensional legacy once the life has ended (undefined while alive). */
export function sessionLegacy(session: SessionState): Legacy | undefined {
  if (session.status !== 'dead' || !session.death) return undefined;
  return computeLegacy({
    player: session.player,
    family: session.family,
    history: session.history,
    relationshipCount: session.relationships.length,
    divergenceCount: session.divergences?.length ?? 0,
    death: { ...session.death, locationId: session.player.locationId },
  });
}

// --- Versioned snapshots (plan §40-41, p7 §68) ---

export interface SessionSnapshot extends SessionState {
  schemaVersion: number;
  engineVersion: string;
  contentVersion: string;
}

export function exportSessionSnapshot(
  session: SessionState,
  contentVersion: string,
): string {
  const snapshot: SessionSnapshot = {
    ...session,
    history: session.history.map((h) => ({ ...h, causalChildren: [...h.causalChildren] })),
    timeline: [...session.timeline],
    firedIds: [...session.firedIds],
    divergences: session.divergences ? [...session.divergences] : [],
    schemaVersion: SESSION_SCHEMA_VERSION,
    engineVersion: ENGINE_VERSION,
    contentVersion,
  };
  return JSON.stringify(snapshot);
}

export function importSessionSnapshot(json: string): SessionState {
  const parsed = JSON.parse(json) as SessionSnapshot;
  if (parsed.schemaVersion !== SESSION_SCHEMA_VERSION) {
    throw new SessionError(
      'bad-save-version',
      `Unsupported save schema ${String(parsed.schemaVersion)} (expected ${SESSION_SCHEMA_VERSION})`,
    );
  }
  const { schemaVersion: _sv, engineVersion: _ev, contentVersion: _cv, ...session } = parsed;
  void _sv;
  void _ev;
  void _cv;
  return session;
}

export function buyPropertySession(
  session: SessionState,
  prop: { id: string; name: string; type: 'residence' | 'commercial' | 'farmland'; cost: number; annualYield: number },
): SessionState {
  if (session.status !== 'active') throw new SessionError('life-ended', 'Character has passed away');
  if (session.player.age < 18) throw new SessionError('ineligible', 'Minors under age 18 cannot acquire property deeds');
  if (session.player.wealth < prop.cost) throw new SessionError('insufficient-wealth', 'Not enough coins to acquire property deed');

  const asset = {
    id: prop.id,
    name: prop.name,
    type: prop.type,
    value: prop.cost,
    annualYield: prop.annualYield,
    acquiredAge: session.player.age,
  };
  session.player = {
    ...session.player,
    wealth: session.player.wealth - prop.cost,
    properties: [...(session.player.properties ?? []), asset],
  };
  session.timeline.push(
    `${session.date} (age ${session.player.age}): Acquired ${prop.name} deed for ${prop.cost} coins (annual yield +${prop.annualYield}/yr)`,
  );
  return session;
}

export function marryPartnerSession(
  session: SessionState,
  partnerName: string,
): SessionState {
  if (session.status !== 'active') throw new SessionError('life-ended', 'Character has passed away');
  if (session.player.age < 18) throw new SessionError('ineligible', 'Cannot marry before legal adulthood (Age 18+)');
  if (session.family.members.some((m) => m.relation === 'spouse' && m.alive)) {
    throw new SessionError('already-married', 'Character is already married');
  }

  const birthYear = parseInt(session.date.slice(0, 4), 10) - Math.max(18, session.player.age - 1);
  const spouse = {
    id: `spouse.${Date.now()}`,
    relation: 'spouse' as const,
    name: partnerName,
    birthYear,
    alive: true,
  };
  session.family.members.push(spouse);
  session.relationships.push(createRelationship({ id: `rel.spouse.${Date.now()}`, type: 'spouse', name: partnerName }));
  session.timeline.push(`${session.date} (age ${session.player.age}): Married ${partnerName} in a celebrated community ceremony!`);
  session.player.reputation = Math.min(100, session.player.reputation + 10);
  return session;
}

export function haveChildSession(
  session: SessionState,
  childName: string,
): SessionState {
  if (session.status !== 'active') throw new SessionError('life-ended', 'Character has passed away');
  if (session.player.age < 18) throw new SessionError('ineligible', 'Cannot bear children before age 18');

  const birthYear = parseInt(session.date.slice(0, 4), 10);
  const child = {
    id: `child.${Date.now()}.${session.family.members.length}`,
    relation: 'child' as const,
    name: childName,
    birthYear,
    alive: true,
  };
  session.family.members.push(child);
  session.relationships.push(createRelationship({ id: `rel.child.${Date.now()}`, type: 'child', name: childName }));
  session.timeline.push(`${session.date} (age ${session.player.age}): Welcomed child ${childName} into the family!`);
  return session;
}

export function createHeirSession(
  session: SessionState,
  ancestorLifeId?: string,
): SessionState {
  if (session.status !== 'dead') throw new SessionError('life-active', 'Cannot play as heir while character is still living');

  const child = session.family.members.find((m) => m.relation === 'child' && m.alive);
  const sibling = session.family.members.find((m) => m.relation === 'sibling' && m.alive);
  const heirName = child?.name ?? sibling?.name ?? `${session.player.name} Jr.`;
  const currentYear = parseInt(session.date.slice(0, 4), 10);
  const heirBirthYear = child?.birthYear ?? (currentYear - 20);
  const heirAge = Math.max(1, currentYear - heirBirthYear);
  const inheritedWealth = Math.max(50, Math.round(session.player.wealth * 0.8));

  const newLifeConfig: SessionLifeConfig = {
    ...session.life,
    name: heirName,
    birthDate: `${heirBirthYear}-01-01`,
  };

  const newSession = createSession(session.seed + 1, newLifeConfig);
  newSession.ancestorId = ancestorLifeId ?? session.player.id;
  newSession.generation = (session.generation ?? 1) + 1;
  newSession.divergences = [...(session.divergences ?? [])];
  newSession.player.age = heirAge;
  newSession.player.wealth = inheritedWealth;
  newSession.player.properties = [...(session.player.properties ?? [])];
  newSession.date = session.date;
  newSession.timeline.push(
    `${session.date}: Assumed household leadership as heir to ${session.player.name} (inherited ${inheritedWealth} coins and family estate)`,
  );
  return newSession;
}

export function applyJobSession(
  session: SessionState,
  occupationId: string,
  yearlyIncome?: number,
): SessionState {
  if (session.status !== 'active') throw new SessionError('life-ended', 'Character has passed away');
  if (session.player.age < 14) throw new SessionError('ineligible', 'Cannot work before age 14');

  const income = yearlyIncome ?? (session.player.locationId.startsWith('location.victorian_') ? 120 : 180);
  session.player = {
    ...session.player,
    occupationId,
  };
  session.life.occupationId = occupationId;
  session.life.yearlyIncome = income;
  const occTitle = occupationId.replace(/^occupation\./, '').replace(/_/g, ' ');
  session.timeline.push(
    `${session.date} (age ${session.player.age}): Appointed to position of ${occTitle} (earning ${income} coins/yr)`,
  );
  return session;
}

export type HealthActivityType = 'exercise' | 'rest' | 'consultation' | 'medicine';

export function performHealthActivitySession(
  session: SessionState,
  activityType: HealthActivityType,
): { session: SessionState; healthDelta: number; wealthDelta: number; message: string } {
  if (session.status !== 'active') throw new SessionError('life-ended', 'Character has passed away');

  let healthDelta = 0;
  let wealthDelta = 0;
  let message = '';

  switch (activityType) {
    case 'exercise':
      healthDelta = Math.min(100 - session.player.health, 5);
      message = 'Completed physical conditioning and exercise (+5 Health)';
      break;
    case 'rest':
      healthDelta = Math.min(100 - session.player.health, 3);
      message = 'Took prolonged rest and restorative sleep (+3 Health)';
      break;
    case 'consultation': {
      const fee = 15;
      if (session.player.wealth < fee) {
        throw new SessionError('insufficient-wealth', `Cannot afford physician consultation fee of ${fee} coins`);
      }
      wealthDelta = -fee;
      healthDelta = Math.min(100 - session.player.health, 10);
      message = `Consulted physician. Received diagnosis and medical treatment (-${fee} coins, +10 Health)`;
      break;
    }
    case 'medicine': {
      const cost = 25;
      if (session.player.wealth < cost) {
        throw new SessionError('insufficient-wealth', `Cannot afford restorative medicine cost of ${cost} coins`);
      }
      wealthDelta = -cost;
      healthDelta = Math.min(100 - session.player.health, 15);
      message = `Purchased and took restorative medicine/tonics (-${cost} coins, +15 Health)`;
      break;
    }
    default:
      throw new SessionError('bad-activity', `Unknown health activity "${String(activityType)}"`);
  }

  session.player = {
    ...session.player,
    health: Math.min(100, Math.max(0, session.player.health + healthDelta)),
    wealth: Math.max(0, session.player.wealth + wealthDelta),
  };
  session.timeline.push(`${session.date} (age ${session.player.age}): [health] ${message}`);

  return { session, healthDelta, wealthDelta, message };
}

export type RelationshipAction = 'spend_time' | 'gift' | 'confide' | 'apologize';

export function interactRelationshipSession(
  session: SessionState,
  relId: string,
  action: RelationshipAction,
): { session: SessionState; relationship: Relationship; message: string } {
  if (session.status !== 'active') throw new SessionError('life-ended', 'Character has passed away');

  let rel = session.relationships.find((r) => r.id === relId || r.name.toLowerCase() === relId.toLowerCase());
  if (!rel) {
    const member = session.family.members.find((m) => m.id === relId || m.name.toLowerCase() === relId.toLowerCase());
    if (member) {
      rel = createRelationship({ id: member.id, type: member.relation as any, name: member.name });
      session.relationships.push(rel);
    } else {
      const relName = relId.includes('.') ? relId.split('.')[1]! : relId;
      rel = createRelationship({ id: relId, type: 'friend', name: relName });
      session.relationships.push(rel);
    }
  }

  let deltaTrust = 0;
  let deltaAffection = 0;
  let wealthDelta = 0;
  let desc = '';

  switch (action) {
    case 'spend_time':
      deltaTrust = 4;
      deltaAffection = 5;
      desc = `Spent quality time with ${rel.name} (+4 Trust, +5 Affection)`;
      break;
    case 'gift': {
      const giftCost = 10;
      if (session.player.wealth < giftCost) {
        throw new SessionError('insufficient-wealth', `Cannot afford a gift worth ${giftCost} coins`);
      }
      wealthDelta = -giftCost;
      deltaAffection = 8;
      deltaTrust = 4;
      desc = `Presented a thoughtful gift to ${rel.name} (-${giftCost} coins, +8 Affection, +4 Trust)`;
      break;
    }
    case 'confide':
      deltaTrust = 8;
      deltaAffection = 3;
      desc = `Confided personal matters to ${rel.name} (+8 Trust, +3 Affection)`;
      break;
    case 'apologize':
      deltaTrust = 5;
      deltaAffection = 5;
      rel.conflict = Math.max(0, rel.conflict - 10);
      desc = `Offered a sincere apology to ${rel.name}, easing conflict`;
      break;
    default:
      throw new SessionError('bad-action', `Unknown relationship action "${String(action)}"`);
  }

  session.player = {
    ...session.player,
    wealth: Math.max(0, session.player.wealth + wealthDelta),
  };
  rel.trust = Math.min(100, Math.max(0, rel.trust + deltaTrust));
  rel.affection = Math.min(100, Math.max(0, rel.affection + deltaAffection));
  session.timeline.push(`${session.date} (age ${session.player.age}): [relationship] ${desc}`);

  return { session, relationship: rel, message: desc };
}


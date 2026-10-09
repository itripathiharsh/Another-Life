// Event engine core (p4 §6, §10-23, §34-39, §53-56).
// Templates → eligibility (requirements) → choice → probability →
// consequences (immediate/hidden/delayed) → follow-ups → records.
// Deterministic: probability rolls consume the caller's RNG in order.

import type { CharacterState } from './player';
import type { Rng } from './rng';

export type RequirementOp = '>=' | '<=' | '==' | '!=' | '>' | '<' | 'includes';

export interface Requirement {
  /** Dot-free field on the eval context (age, wealth, health, ...). */
  field: string;
  op: RequirementOp;
  value: number | string;
}

export type ConsequenceTarget = 'player' | 'relationship' | 'world' | 'family';
export type ConsequenceOp = 'ADD' | 'SET';
export type ConsequenceTiming = 'immediate' | 'delayed' | 'hidden';
export type ConsequenceVisibility = 'visible' | 'hidden';

/** Consequence record shape (p4 §17): Target/Property/Op/Value/Timing/Visibility/Source. */
export interface Consequence {
  target: ConsequenceTarget;
  property: string;
  op: ConsequenceOp;
  value: number | string;
  timing: ConsequenceTiming;
  visibility: ConsequenceVisibility;
  /** For delayed: condition like "age>=30" evaluated at tick time. */
  delayCondition?: string;
  source: string;
  /** For relationship-targeted consequences. */
  relationshipId?: string;
}

export interface Choice {
  id: string;
  eventId: string;
  title: string;
  description?: string;
  requirements: Requirement[];
  /** Base success probability 0-100. Modifiers added at resolution. */
  baseProbability: number;
  consequences: Consequence[];
  failureConsequences?: Consequence[];
}


export interface SimEventTemplate {
  id: string;
  title: string;
  description: string;
  /** Hard eligibility — never present impossible events (p4 §40, §81). */
  requirements: Requirement[];
  choices: Choice[];
}

export interface EvalContext {
  age: number;
  wealth: number;
  health: number;
  educationYears: number;
  reputation: number;
  occupationId: string;
  locationId: string;
  classId: string;
  date: string;
  alive: boolean;
}

export function contextFromPlayer(
  state: CharacterState,
  date: string,
): EvalContext {
  return {
    age: state.age,
    wealth: state.wealth,
    health: state.health,
    educationYears: state.educationYears,
    reputation: state.reputation,
    occupationId: state.occupationId ?? '',
    locationId: state.locationId,
    classId: state.classId,
    date,
    alive: state.alive,
  };
}

function readField(ctx: EvalContext, field: string): number | string | undefined {
  return (ctx as unknown as Record<string, number | string | undefined>)[field];
}

export function requirementPasses(req: Requirement, ctx: EvalContext): boolean {
  const actual = readField(ctx, req.field);
  if (actual === undefined) return false;
  if (req.op === 'includes') {
    return String(actual).includes(String(req.value));
  }
  const a = Number(actual);
  const b = Number(req.value);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    if (req.op === '==') return actual === req.value;
    if (req.op === '!=') return actual !== req.value;
    return false;
  }
  switch (req.op) {
    case '>=': return a >= b;
    case '<=': return a <= b;
    case '==': return a === b;
    case '!=': return a !== b;
    case '>': return a > b;
    case '<': return a < b;
  }
}

/** An event/choice is eligible only if ALL requirements pass. */
export function isEligible(
  requirements: readonly Requirement[],
  ctx: EvalContext,
): boolean {
  return requirements.every((r) => requirementPasses(r, ctx));
}

export interface OutcomeResult {
  roll: number;
  success: boolean;
  finalProbability: number;
}

/**
 * Probability resolution (p4 §14-16):
 * Final = Base + Modifiers + Context, clamped 0-100; roll = rng()*100.
 */
export function resolveOutcome(
  baseProbability: number,
  modifiers: number,
  rng: Rng,
): OutcomeResult {
  const finalProbability = Math.min(100, Math.max(0, baseProbability + modifiers));
  const roll = rng() * 100;
  return { roll, success: roll < finalProbability, finalProbability };
}

const PLAYER_NUMERIC_KEYS = new Set(['wealth', 'health', 'reputation', 'educationYears', 'age']);

/** Apply an immediate player-targeted numeric consequence. Unknown keys are ignored. */
export function applyPlayerConsequence(
  state: CharacterState,
  consequence: Consequence,
): CharacterState {
  if (consequence.target !== 'player') return state;
  if (!PLAYER_NUMERIC_KEYS.has(consequence.property)) return state;
  const key = consequence.property as 'wealth' | 'health' | 'reputation' | 'educationYears' | 'age';
  const current = state[key];
  if (typeof current !== 'number' || typeof consequence.value !== 'number') return state;
  let next = consequence.op === 'ADD' ? current + consequence.value : consequence.value;
  if (key === 'health') next = Math.min(100, Math.max(0, Math.round(next)));
  return { ...state, [key]: next };
}

// --- Scheduled events (p4 §21, §53-56) ---

export interface ScheduledEvent {
  eventId: string;
  sourceEventId: string;
  /** Condition like "age>=30" or "date>=1950-01-26"; AND-joined supported. */
  triggerCondition: string;
  earliestDate?: string;
  expirationDate?: string;
  priority: number;
  createdAt: string;
}

function singleConditionPasses(cond: string, ctx: EvalContext): boolean {
  const m = cond.trim().match(/^(\w+)\s*(>=|<=|==|!=|>|<)\s*(.+)$/);
  if (!m) return false;
  const field = m[1] as string;
  const op = m[2] as RequirementOp;
  const raw = (m[3] as string).trim();
  const num = Number(raw);
  return requirementPasses({ field, op, value: Number.isNaN(num) ? raw : num }, ctx);
}

export function triggerDue(
  scheduled: ScheduledEvent,
  ctx: EvalContext,
): boolean {
  if (scheduled.earliestDate !== undefined && ctx.date < scheduled.earliestDate) return false;
  if (scheduled.expirationDate !== undefined && ctx.date > scheduled.expirationDate) {
    return false;
  }
  return scheduled.triggerCondition
    .split('AND')
    .every((part) => singleConditionPasses(part, ctx));
}

// --- Lifecycle records (p4 §6, §39) ---

export type EventLifecycleState =
  | 'created' | 'validated' | 'eligible' | 'selected' | 'presented'
  | 'resolved' | 'recorded' | 'ineligible' | 'suppressed' | 'cancelled';

export interface EventRecord {
  eventId: string;
  instanceId: string;
  timestamp: string;
  locationId: string;
  selectedChoiceId: string | undefined;
  outcome: 'success' | 'failure' | 'auto' | 'cancelled';
  consequencesApplied: Consequence[];
  causalParentId: string | undefined;
  causalChildren: string[];
}

let instanceCounter = 0;

export function createEventRecord(args: {
  eventId: string;
  timestamp: string;
  locationId: string;
  causalParentId?: string;
}): EventRecord {
  instanceCounter += 1;
  return {
    eventId: args.eventId,
    instanceId: `evt_${args.timestamp}_${instanceCounter}`,
    timestamp: args.timestamp,
    locationId: args.locationId,
    selectedChoiceId: undefined,
    outcome: 'auto',
    consequencesApplied: [],
    causalParentId: args.causalParentId,
    causalChildren: [],
  };
}

/** Reset instance counter — test-only hook for deterministic IDs. */
export function resetInstanceCounter(): void {
  instanceCounter = 0;
}

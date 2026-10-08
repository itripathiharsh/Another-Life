// Engine tick (p6 §18.2, p3 §36-37, p4 §96).
// Order: advance date → scheduled events due → aging → economy/health
// drift hooks → collect eligible templates. World/historical updates and
// presentation arrive in later stages; tick stays pure + deterministic.

import {
  contextFromPlayer,
  isEligible,
  triggerDue,
  type EvalContext,
  type ScheduledEvent,
  type SimEventTemplate,
} from './events';
import type { CharacterState } from './player';
import { agePlayer } from './player';

/** Add whole days to a YYYY-MM-DD string (UTC, deterministic). */
export function addDays(dateISO: string, days: number): string {
  const [y = 0, m = 1, d = 1] = dateISO.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  const pad = (n: number): string => String(n).padStart(2, '0');
  return `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}`;
}

/** Add whole years to a YYYY-MM-DD string, keeping month/day. */
export function addYearsISO(dateISO: string, years: number): string {
  const [y = 0, m = 1, d = 1] = dateISO.split('-').map(Number);
  const pad = (n: number): string => String(n).padStart(2, '0');
  return `${y + years}-${pad(m)}-${pad(d)}`;
}

/** Whole years elapsed between two YYYY-MM-DD dates (floor). */
export function yearsBetween(fromISO: string, toISO: string): number {
  const [fy = 0, fm = 1, fd = 1] = fromISO.split('-').map(Number);
  const [ty = 0, tm = 1, td = 1] = toISO.split('-').map(Number);
  let years = ty - fy;
  if (tm < fm || (tm === fm && td < fd)) years -= 1;
  return Math.max(0, years);
}

export interface TickInput {
  date: string;
  player: CharacterState;
  scheduled: ScheduledEvent[];
}

export interface TickResult {
  date: string;
  player: CharacterState;
  /** Scheduled events whose trigger is due on the new date. */
  dueScheduled: ScheduledEvent[];
  ctx: EvalContext;
}

/** Advance the clock by `days`, age the player, report due scheduled events. */
export function tick(input: TickInput, days: number): TickResult {
  if (days <= 0) throw new Error('Tick must advance a positive number of days');
  const date = addDays(input.date, days);
  const targetAge = yearsBetween(input.player.birthDate, date);
  const yearsToAdd = targetAge - input.player.age;
  const player = yearsToAdd > 0 ? agePlayer(input.player, yearsToAdd) : input.player;
  const ctx = contextFromPlayer(player, date);
  const dueScheduled = input.scheduled.filter((s) => triggerDue(s, ctx));
  return { date, player, dueScheduled, ctx };
}

/** Filter templates to those eligible right now. */
export function eligibleTemplates(
  templates: readonly SimEventTemplate[],
  ctx: EvalContext,
): SimEventTemplate[] {
  return templates.filter((t) => isEligible(t.requirements, ctx));
}

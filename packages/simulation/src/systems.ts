// Education / career / economy / health transitions (p6 §11.2-11.5, §12.2-12.4).
// Pure functions on CharacterState. No guaranteed success anywhere —
// callers combine these with event-engine probability (see events.ts).

import type { CharacterState } from './player';

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/** Complete school years. Returns updated state; skill gain is explicit. */
export function gainEducation(
  state: CharacterState,
  years: number,
  skillId = 'literacy',
  skillGain = 10,
): CharacterState {
  if (years < 0) throw new Error('Education years cannot be negative');
  return {
    ...state,
    educationYears: state.educationYears + years,
    skills: {
      ...state.skills,
      [skillId]: (state.skills[skillId] ?? 0) + skillGain * years,
    },
  };
}

export interface Employment {
  occupationId: string;
  income: number;
  skillId?: string;
  experienceGain?: number;
}

/** Take an occupation. Income is per-year; experience accrues to a skill. */
export function setOccupation(state: CharacterState, employment: Employment): CharacterState {
  const skillId = employment.skillId ?? 'occupation_skill';
  const gain = employment.experienceGain ?? 5;
  return {
    ...state,
    occupationId: employment.occupationId,
    skills: { ...state.skills, [skillId]: (state.skills[skillId] ?? 0) + gain },
  };
}

/** One economic tick: wealth += income - expenses. Wealth may go negative (= debt). */
export function applyEconomy(
  state: CharacterState,
  args: { income: number; expenses: number },
): CharacterState {
  return { ...state, wealth: state.wealth + args.income - args.expenses };
}

/** Direct health change, clamped 0-100. */
export function applyHealth(state: CharacterState, delta: number): CharacterState {
  return { ...state, health: clamp(state.health + delta, 0, 100) };
}

export interface HealthContext {
  age: number;
  healthcareAccess: 'none' | 'basic' | 'good';
  livingConditions: 'poor' | 'average' | 'good';
  occupationHazard: number;
}

/**
 * Annual health drift (p6 §12.2): age + conditions, no modern treatment
 * outside availability (p6 §12.3). Deterministic — no RNG here.
 */
export function annualHealthDrift(health: number, ctx: HealthContext): number {
  let next = health;
  if (ctx.age > 40) next -= (ctx.age - 40) * 0.1;
  if (ctx.healthcareAccess === 'none') next -= 2;
  else if (ctx.healthcareAccess === 'basic') next -= 1;
  if (ctx.livingConditions === 'poor') next -= 2;
  else if (ctx.livingConditions === 'good') next += 1;
  next -= ctx.occupationHazard;
  return clamp(Math.round(next), 0, 100);
}

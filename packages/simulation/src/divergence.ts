// Divergence (p4 §48-51, p6 §22, p3 §27-28).
// Alternate history only via Action → State Change → Threshold →
// Divergence → New State — never bare `random`.

export type DivergenceLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const DIVERGENCE_LEVEL_NAMES: Record<DivergenceLevel, string> = {
  0: 'personal',
  1: 'family',
  2: 'local',
  3: 'regional',
  4: 'political',
  5: 'national',
  6: 'global',
};

export interface DivergenceRecord {
  id: string;
  triggerEventId: string;
  date: string;
  /** Scope level L0-L6 (higher = rarer). */
  scope: DivergenceLevel;
  originalState: string;
  newState: string;
  cause: string;
  affectedEntityIds: string[];
}

/**
 * Threshold gate: importance (0-100) must meet the level's bar.
 * Bars rise with scope so L5/L6 stay rare.
 */
const LEVEL_BARS: Record<DivergenceLevel, number> = {
  0: 10,
  1: 25,
  2: 40,
  3: 55,
  4: 70,
  5: 85,
  6: 95,
};

export function shouldDiverge(importance: number, scope: DivergenceLevel): boolean {
  return importance >= (LEVEL_BARS[scope] ?? 100);
}

export function createDivergence(args: {
  id: string;
  triggerEventId: string;
  date: string;
  scope: DivergenceLevel;
  originalState: string;
  newState: string;
  cause: string;
  affectedEntityIds?: string[];
}): DivergenceRecord {
  return {
    id: args.id,
    triggerEventId: args.triggerEventId,
    date: args.date,
    scope: args.scope,
    originalState: args.originalState,
    newState: args.newState,
    cause: args.cause,
    affectedEntityIds: args.affectedEntityIds ?? [],
  };
}

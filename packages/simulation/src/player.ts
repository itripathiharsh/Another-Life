// Player / character state (p6 §6.3, §7.2-7.4, §8.1-8.3).
// Era-agnostic: locations, occupations, classes are string IDs resolved
// against data packs. Life-stage bands below are DEFAULTS — exact
// boundaries depend on historical context (p6 §8.1) via the overrides param.

export type LifeStage =
  | 'birth'
  | 'early_childhood'
  | 'childhood'
  | 'adolescence'
  | 'early_adulthood'
  | 'adulthood'
  | 'later_adulthood'
  | 'old_age'
  | 'dead';

export interface StageBands {
  earlyChildhood: number;
  childhood: number;
  adolescence: number;
  earlyAdulthood: number;
  adulthood: number;
  laterAdulthood: number;
  oldAge: number;
}

export const DEFAULT_STAGE_BANDS: StageBands = {
  earlyChildhood: 1,
  childhood: 5,
  adolescence: 12,
  earlyAdulthood: 18,
  adulthood: 30,
  laterAdulthood: 50,
  oldAge: 65,
};

export function stageForAge(age: number, bands: StageBands = DEFAULT_STAGE_BANDS): LifeStage {
  if (age < bands.earlyChildhood) return 'birth';
  if (age < bands.childhood) return 'early_childhood';
  if (age < bands.adolescence) return 'childhood';
  if (age < bands.earlyAdulthood) return 'adolescence';
  if (age < bands.adulthood) return 'early_adulthood';
  if (age < bands.laterAdulthood) return 'adulthood';
  if (age < bands.oldAge) return 'later_adulthood';
  return 'old_age';
}

export interface PropertyAsset {
  id: string;
  name: string;
  type: 'residence' | 'commercial' | 'farmland';
  value: number;
  annualYield: number;
  acquiredAge: number;
}

export interface CharacterState {
  id: string;
  name: string;
  birthDate: string;
  /** Age in whole years. */
  age: number;
  locationId: string;
  classId: string;
  health: number;
  wealth: number;
  /** Completed years of formal education. */
  educationYears: number;
  occupationId: string | undefined;
  skills: Record<string, number>;
  traits: string[];
  reputation: number;
  alive: boolean;
  properties?: PropertyAsset[];
}

export interface CreatePlayerInput {
  id: string;
  name: string;
  birthDate: string;
  locationId: string;
  classId: string;
  traits?: string[];
}

export function createPlayer(input: CreatePlayerInput): CharacterState {
  return {
    id: input.id,
    name: input.name,
    birthDate: input.birthDate,
    age: 0,
    locationId: input.locationId,
    classId: input.classId,
    health: 80,
    wealth: 0,
    educationYears: 0,
    occupationId: undefined,
    skills: {},
    traits: input.traits ?? [],
    reputation: 0,
    alive: true,
    properties: [],
  };
}

/** Age a character by whole years. Health declines slowly after 50 (p6 §12). */
export function agePlayer(state: CharacterState, years: number): CharacterState {
  if (years < 0) throw new Error('Cannot age backwards');
  const age = state.age + years;
  let health = state.health;
  if (age > 50) {
    health = Math.max(0, health - (age - Math.max(50, state.age)) * 1);
  }
  return { ...state, age, health };
}

export function killPlayer(state: CharacterState): CharacterState {
  return { ...state, alive: false, health: 0 };
}

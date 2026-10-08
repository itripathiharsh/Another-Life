// Stage 1 — Historical entity schemas (era/region-agnostic).
// Mirrors Phase 2.5 §17 + Phase 3 §§10-23. Engine types only — all era
// content lives in data packs. Every content item carries provenance.

import type { DateRange } from '../../shared/src/types';

export type Confidence = 'high' | 'medium' | 'low';

/** Provenance is mandatory — never invent history (Phase 3 §39-41). */
export interface Provenance {
  /** Human-readable source, e.g. "Indian Independence Act 1947". */
  source: string;
  sourceType?: string;
  confidence?: Confidence;
  datePrecision?: 'exact' | 'year' | 'approximate' | 'unknown';
  researchNote?: string;
  lastVerified?: string;
}

/** A social stratum with time-bounded validity (Phase 3 §20). */
export interface SocialClassEntity extends Provenance {
  id: string;
  name: string;
  range: DateRange;
  regionIds: string[];
  rights: string[];
  restrictions: string[];
  wealthRange?: string;
  commonOccupationIds: string[];
  educationAccess: string;
  politicalAccess: string;
  socialMobility: string[];
}

/** An occupation available in specific locations/periods (p7 §41, p3 §31). */
export interface OccupationEntity extends Provenance {
  id: string;
  name: string;
  range: DateRange;
  locationIds: string[];
  educationRequired: string;
  skillRequirements: string[];
  incomeRange: string;
  socialClassIds: string[];
  description: string;
}

/** A technology with discovery → adoption lifecycle (Phase 3 §18). */
export interface TechnologyEntity extends Provenance {
  id: string;
  name: string;
  category:
    | 'agriculture'
    | 'transport'
    | 'construction'
    | 'communication'
    | 'medicine'
    | 'manufacturing'
    | 'weapons'
    | 'energy'
    | 'other';
  discoveredDate: string;
  adoptionStart: string;
  adoptionEnd: string;
  regionIds: string[];
  prerequisites: string[];
  effects: string[];
}

/** A law in force for a political entity / regions (Phase 3 §19). */
export interface LawEntity extends Provenance {
  id: string;
  name: string;
  description: string;
  politicalEntityId: string;
  range: DateRange;
  affectedRegionIds: string[];
  affectedClassIds: string[];
  penalties: string;
}

/** A disease risk present in regions/periods (Phase 3 §21). */
export interface DiseaseEntity extends Provenance {
  id: string;
  name: string;
  range: DateRange;
  regionIds: string[];
  transmission: string;
  severity: string;
  mortality: string;
  riskFactors: string[];
  treatment: string;
  prevention: string;
}

/** A culture with time-bounded validity (Phase 3 §17.2). */
export interface CultureEntity extends Provenance {
  id: string;
  name: string;
  range: DateRange;
  regionIds: string[];
  languages: string[];
  customs: string[];
  familyStructure: string;
}

/** A religion with time-bounded validity (Phase 3 §17.1). */
export interface ReligionEntity extends Provenance {
  id: string;
  name: string;
  range: DateRange;
  regionIds: string[];
  beliefs: string[];
  practices: string[];
}

// Core historical entity model — mirrors the Phase 2.5 architecture spec (docs/phases/p2.5.md).
// ERA-AGNOSTIC BY DESIGN: every era/region-specific value lives in data packs, never in code.

/** Historical date as "YYYY-MM-DD". String form keeps comparisons and saves deterministic. */
export type DateISO = string;

/** Inclusive date range. Entities are time-aware (spec: valid_from / valid_until). */
export interface DateRange {
  from: DateISO;
  until: DateISO;
}

export type LocationType =
  | 'capital'
  | 'city'
  | 'town'
  | 'village'
  | 'port'
  | 'rural_region';

/** A physical place with a stable identity. Display names may change over time;
 *  political control is stored separately and is time-dependent (spec §8, §28). */
export interface LocationEntity {
  id: string; // stable id, e.g. "location.lucknow"
  name: string;
  type: LocationType;
  coordinates: { lat: number; lon: number };
  regionId: string;
  historicalNames?: { name: string; range: DateRange }[];
}

/** An organized political authority (empire, colony, dominion, republic, ...). */
export interface PoliticalEntity {
  id: string; // e.g. "political.british_raj"
  name: string;
  type: string;
  range: DateRange;
}

/** Who controls a location during a date range. Location identity and political
 *  control are separate systems (spec §28) — cities change hands, not identity. */
export interface PoliticalControlRecord {
  locationId: string;
  entityId: string;
  range: DateRange;
  /** Provenance: where this fact comes from. Required — never invent history. */
  source: string;
  confidence?: 'high' | 'medium' | 'low';
}

/** How mutable a historical event is by the player (spec §21–22). */
export type HistoricalStatus =
  | 'fixed'          // cannot be altered by the player
  | 'observable'     // happens regardless; player can experience it
  | 'influenceable'  // player can affect local/personal outcome if positioned
  | 'mutable'        // player can substantially alter the outcome
  | 'divergence_point'; // potential branch into alternate history

/** An event on the world timeline, independent of the player (spec §21). */
export interface HistoricalEventEntity {
  id: string; // e.g. "event.indian_independence"
  name: string;
  range: DateRange;
  locationIds: string[];
  politicalEntityIds: string[];
  status: HistoricalStatus;
  description: string;
  source: string;
  confidence?: 'high' | 'medium' | 'low';
}

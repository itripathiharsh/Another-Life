// Deterministic saves (p6 §27, p4 §76).
// Snapshot must contain everything needed to resume identically:
// world/date, player, family, relationships, scheduled, history,
// divergences, seed, timeline. JSON round-trip must be lossless.

import type { DivergenceRecord } from './divergence';
import type { EventRecord, ScheduledEvent } from './events';
import type { FamilyRecord, Relationship } from './family';
import type { CharacterState } from './player';

export const SAVE_VERSION = 1;

export interface SaveSnapshot {
  version: number;
  seed: number;
  date: string;
  player: CharacterState;
  family: FamilyRecord;
  relationships: Relationship[];
  scheduled: ScheduledEvent[];
  history: EventRecord[];
  divergences: DivergenceRecord[];
  timeline: string[];
}

export function createSnapshot(args: {
  seed: number;
  date: string;
  player: CharacterState;
  family: FamilyRecord;
  relationships: Relationship[];
  scheduled: ScheduledEvent[];
  history: EventRecord[];
  divergences: DivergenceRecord[];
  timeline: string[];
}): SaveSnapshot {
  return { version: SAVE_VERSION, ...args };
}

export function serializeSnapshot(snapshot: SaveSnapshot): string {
  return JSON.stringify(snapshot);
}

export function deserializeSnapshot(json: string): SaveSnapshot {
  const parsed = JSON.parse(json) as SaveSnapshot;
  if (parsed.version !== SAVE_VERSION) {
    throw new Error(`Unsupported save version ${String(parsed.version)} (expected ${SAVE_VERSION})`);
  }
  return parsed;
}

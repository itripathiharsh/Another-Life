// Death + legacy (p4 §97-98, p6 §28-29).
// Legacy is multidimensional, derived from actual event history —
// never a single arbitrary score.

import type { EventRecord } from './events';
import type { FamilyRecord } from './family';
import type { CharacterState } from './player';

export type DeathCause =
  | 'old_age' | 'disease' | 'accident' | 'violence'
  | 'war' | 'childbirth' | 'disaster' | 'unknown';

export interface DeathInfo {
  date: string;
  age: number;
  cause: DeathCause;
  locationId: string;
}

export interface LegacyDimensions {
  family: number;
  economic: number;
  social: number;
  institutional: number;
  historical: number;
}

export interface Legacy {
  dimensions: LegacyDimensions;
  summary: string;
  timelineHighlights: string[];
}

/**
 * Derive legacy from lived history: descendants, wealth, relationships,
 * mentorship/institutions (via event flags), historical footprint
 * (divergence count passed in by the caller).
 */
export function computeLegacy(args: {
  player: CharacterState;
  family: FamilyRecord;
  history: readonly EventRecord[];
  relationshipCount: number;
  divergenceCount: number;
  death: DeathInfo;
}): Legacy {
  const children = args.family.members.filter((m) => m.relation === 'child').length;
  const family = Math.min(100, children * 25 + args.relationshipCount * 2);
  const economic = Math.min(100, Math.max(0, Math.round(args.player.wealth / 100)));
  const social = Math.min(
    100,
    Math.round(args.player.reputation + args.relationshipCount * 3),
  );
  const majorEvents = args.history.filter((h) => h.outcome === 'success').length;
  const institutional = Math.min(100, majorEvents * 10);
  const historical = Math.min(100, args.divergenceCount * 34);

  const timelineHighlights = args.history
    .slice(-5)
    .map((h) => `${h.timestamp}: ${h.eventId} (${h.outcome})`);

  const summary =
    `${args.player.name} lived ${args.death.age} years and died of ${args.death.cause}. ` +
    `Left ${children} children, wealth ${args.player.wealth}, ` +
    `${args.history.length} recorded life events.`;

  return {
    dimensions: { family, economic, social, institutional, historical },
    summary,
    timelineHighlights,
  };
}

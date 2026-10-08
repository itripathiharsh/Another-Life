// Shared consequence interpreter (Stage 4).
// ONE implementation of the consequence conventions, used by both the
// auto-run slice (slice.ts) and interactive sessions (session.ts):
// - {target:'player', property:<numeric key>} → applied to CharacterState.
// - {target:'world', property:'flag:<name>'} → world flag, readable in
//   requirements/trigger conditions as field `<name>`.
// - {target:'world', property:'followup', value:<eventId>, timing:'delayed'}
//   → schedules that template when its delayCondition holds.
// - {target:'family', property:'add_child'|'add_spouse', value:<name>}.
// - {target:'relationship', property:<score key>} → evolves that bond
//   (hidden timing also records the source as shared-history memory).

import {
  addChild,
  evolveRelationship,
  type FamilyRecord,
  type Relationship,
  type RelationshipDeltas,
} from './family';
import {
  applyPlayerConsequence,
  type Consequence,
  type ScheduledEvent,
} from './events';
import type { CharacterState } from './player';

export interface EffectBundle {
  player: CharacterState;
  family: FamilyRecord;
  relationships: Relationship[];
  flags: Record<string, number>;
  scheduled: ScheduledEvent[];
}

const REL_SCORE_KEYS = new Set([
  'trust',
  'affection',
  'respect',
  'conflict',
  'loyalty',
  'familiarity',
  'dependency',
]);

export function applyConsequence(bundle: EffectBundle, c: Consequence, date: string): void {
  if (c.target === 'player') {
    bundle.player = applyPlayerConsequence(bundle.player, c);
    return;
  }
  if (c.target === 'world' && c.property.startsWith('flag:') && typeof c.value === 'number') {
    const name = c.property.slice('flag:'.length);
    bundle.flags[name] = c.op === 'ADD' ? (bundle.flags[name] ?? 0) + c.value : c.value;
    return;
  }
  if (
    c.target === 'world' && c.property === 'followup' && c.timing === 'delayed' &&
    typeof c.value === 'string'
  ) {
    bundle.scheduled.push({
      eventId: c.value,
      sourceEventId: c.source,
      triggerCondition: c.delayCondition ?? 'age>=0',
      priority: 1,
      createdAt: date,
    });
    return;
  }
  if (c.target === 'family' && typeof c.value === 'string') {
    if (c.property === 'add_child') {
      bundle.family = addChild(bundle.family, {
        id: `child.${bundle.family.members.length + 1}`,
        name: c.value,
        birthYear: Number(date.slice(0, 4)),
        alive: true,
      });
    } else if (c.property === 'add_spouse') {
      bundle.family = {
        ...bundle.family,
        members: [
          ...bundle.family.members,
          {
            id: 'spouse.1',
            relation: 'spouse',
            name: c.value,
            birthYear: Number(date.slice(0, 4)) - bundle.player.age + 22,
            alive: true,
          },
        ],
      };
    }
    return;
  }
  if (c.target === 'relationship' && c.relationshipId && REL_SCORE_KEYS.has(c.property)) {
    bundle.relationships = bundle.relationships.map((r) => {
      if (r.id !== c.relationshipId || typeof c.value !== 'number') return r;
      const key = c.property as
        | 'trust' | 'affection' | 'respect' | 'conflict'
        | 'loyalty' | 'familiarity' | 'dependency';
      const delta = c.op === 'ADD' ? c.value : c.value - r[key];
      const deltas = { [key]: delta } as RelationshipDeltas;
      return evolveRelationship(r, deltas, c.timing === 'hidden' ? c.source : undefined);
    });
  }
}

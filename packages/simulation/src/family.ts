// Family / relationships (p6 §9.1-9.4, §10.1-10.2).
// Relationship scores are 0-100. Evolution is choice/event-driven;
// time-apart decay is explicit so it stays deterministic and testable.

export type RelationshipType =
  | 'parent' | 'child' | 'sibling' | 'spouse' | 'partner' | 'friend'
  | 'colleague' | 'employer' | 'employee' | 'mentor' | 'student'
  | 'rival' | 'political_ally' | 'political_opponent' | 'community_member';

export interface Relationship {
  id: string;
  type: RelationshipType;
  name: string;
  trust: number;
  affection: number;
  respect: number;
  conflict: number;
  loyalty: number;
  familiarity: number;
  dependency: number;
  sharedHistory: string[];
}

export interface CreateRelationshipInput {
  id: string;
  type: RelationshipType;
  name: string;
}

export function createRelationship(input: CreateRelationshipInput): Relationship {
  return {
    id: input.id,
    type: input.type,
    name: input.name,
    trust: 50,
    affection: 50,
    respect: 50,
    conflict: 0,
    loyalty: 50,
    familiarity: 10,
    dependency: 0,
    sharedHistory: [],
  };
}

export type RelationshipDeltas = Partial<
  Pick<
    Relationship,
    'trust' | 'affection' | 'respect' | 'conflict' | 'loyalty' | 'familiarity' | 'dependency'
  >
>;

function clampScore(n: number): number {
  return Math.min(100, Math.max(0, Math.round(n)));
}

/** Apply deltas (e.g. from a choice outcome) + optionally append a memory flag. */
export function evolveRelationship(
  rel: Relationship,
  deltas: RelationshipDeltas,
  memoryFlag?: string,
): Relationship {
  const next: Relationship = {
    ...rel,
    trust: deltas.trust === undefined ? rel.trust : clampScore(rel.trust + deltas.trust),
    affection:
      deltas.affection === undefined ? rel.affection : clampScore(rel.affection + deltas.affection),
    respect: deltas.respect === undefined ? rel.respect : clampScore(rel.respect + deltas.respect),
    conflict:
      deltas.conflict === undefined ? rel.conflict : clampScore(rel.conflict + deltas.conflict),
    loyalty: deltas.loyalty === undefined ? rel.loyalty : clampScore(rel.loyalty + deltas.loyalty),
    familiarity:
      deltas.familiarity === undefined
        ? rel.familiarity
        : clampScore(rel.familiarity + deltas.familiarity),
    dependency:
      deltas.dependency === undefined
        ? rel.dependency
        : clampScore(rel.dependency + deltas.dependency),
    sharedHistory: memoryFlag ? [...rel.sharedHistory, memoryFlag] : rel.sharedHistory,
  };
  return next;
}

export interface FamilyMember {
  id: string;
  relation: 'parent' | 'sibling' | 'spouse' | 'child' | 'extended';
  name: string;
  birthYear: number;
  alive: boolean;
}

export interface FamilyRecord {
  members: FamilyMember[];
  wealth: number;
  reputation: number;
}

export function createFamily(members: FamilyMember[] = []): FamilyRecord {
  return { members, wealth: 0, reputation: 0 };
}

/** Register a birth: appends a child member. Returns a new record. */
export function addChild(
  family: FamilyRecord,
  child: Omit<FamilyMember, 'relation'>,
): FamilyRecord {
  return {
    ...family,
    members: [...family.members, { ...child, relation: 'child' }],
  };
}

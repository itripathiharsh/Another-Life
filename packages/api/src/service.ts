// Life service: CRUD + simulation driver over the file store (Stage 4).
// Every mutation auto-persists a versioned snapshot. All state stays
// inside the store dir (drive D). Player-facing views only (§80).

import {
  LUCKNOW_DATASET,
  LUCKNOW_LIFE_TEMPLATES,
  lucknowYearNotes,
  VICTORIAN_DATASET,
  VICTORIAN_LIFE_TEMPLATES,
  victorianYearNotes,
} from '../../content/src/index';
import {
  resolveHistoricalContext,
} from '../../historical/src/index';
import { assertValidDate } from '../../shared/src/index';
import {
  advanceSession,
  buyPropertySession,
  createHeirSession,
  createSession,
  exportSessionSnapshot,
  haveChildSession,
  importSessionSnapshot,
  marryPartnerSession,
  pendingChoices,
  resolveSessionChoice,
  sessionLegacy,
  SessionError,
  stageForAge,
  type Legacy,
  type PendingEvent,
  type SessionLifeConfig,
  type SessionState,
} from '../../simulation/src/index';
import { FileSaveStore } from './store';

export const CONTENT_SET_ID = 'lucknow-slice-v1';

export function isVictorianLocation(locId: string): boolean {
  return locId.startsWith('location.victorian_') || [
    'location.london',
    'location.manchester',
    'location.birmingham',
    'location.glasgow',
    'location.yorkshire',
  ].includes(locId);
}

export function datasetForLocation(locId: string) {
  return isVictorianLocation(locId) ? VICTORIAN_DATASET : LUCKNOW_DATASET;
}

export function templatesForLocation(locId: string) {
  return isVictorianLocation(locId) ? VICTORIAN_LIFE_TEMPLATES : LUCKNOW_LIFE_TEMPLATES;
}

export function yearNotesForLocation(locId: string) {
  return isVictorianLocation(locId) ? victorianYearNotes : lucknowYearNotes;
}

export interface CreateLifeInput {
  seed?: number;
  name: string;
  birthDate?: string;
  locationId?: string;
  classId?: string;
}

export interface PlayerView {
  id: string;
  name: string;
  age: number;
  stage: string;
  locationId: string;
  classId: string;
  health: number;
  wealth: number;
  educationYears: number;
  occupationId: string | undefined;
  reputation: number;
  alive: boolean;
  properties: import('../../simulation/src/index').PropertyAsset[];
}

export interface LifeView {
  id: string;
  date: string;
  status: 'active' | 'dead';
  player: PlayerView;
  familyMembers: { relation: string; name: string; alive: boolean }[];
  pending: PendingEvent[];
  timelineTail: string[];
  timelineLength: number;
  legacy: Legacy | undefined;
}

let idCounter = 0;

function newId(seed: number): string {
  idCounter += 1;
  return `life_${seed.toString(36)}_${Date.now().toString(36)}_${idCounter}`;
}

function toView(id: string, session: SessionState): LifeView {
  const p = session.player;
  return {
    id,
    date: session.date,
    status: session.status,
    player: {
      id: p.id,
      name: p.name,
      age: p.age,
      stage: p.alive ? stageForAge(p.age) : 'dead',
      locationId: p.locationId,
      classId: p.classId,
      health: p.health,
      wealth: p.wealth,
      educationYears: p.educationYears,
      occupationId: p.occupationId,
      reputation: p.reputation,
      alive: p.alive,
      properties: p.properties ?? [],
    },
    familyMembers: session.family.members.map((m) => ({
      relation: m.relation,
      name: m.name,
      alive: m.alive,
    })),
    pending: pendingChoices(session, templatesForLocation(p.locationId)),
    timelineTail: session.timeline.slice(-25),
    timelineLength: session.timeline.length,
    legacy: sessionLegacy(session),
  };
}

export class LifeService {
  private readonly store: FileSaveStore;

  constructor(store: FileSaveStore) {
    this.store = store;
  }

  private load(id: string): { session: SessionState } {
    let json: string;
    try {
      json = this.store.load(id);
    } catch (err) {
      // Normalize every store failure to the service error type so the
      // HTTP layer maps codes uniformly (never leak raw store errors).
      const code = (err as { code?: unknown } | null)?.code;
      const message = err instanceof Error ? err.message : String(err);
      throw new SessionError(typeof code === 'string' ? code : 'not-found', message);
    }
    try {
      return { session: importSessionSnapshot(json) };
    } catch (err) {
      if (err instanceof SessionError) throw err;
      throw new SessionError('bad-save-version', `Stored life "${id}" is unreadable`);
    }
  }

  private persist(id: string, session: SessionState): void {
    this.store.save(id, exportSessionSnapshot(session, CONTENT_SET_ID));
  }

  createLife(input: CreateLifeInput): LifeView {
    if (!input || typeof input.name !== 'string' || input.name.trim().length === 0) {
      throw new SessionError('bad-body', 'name is required');
    }
    const seed = input.seed === undefined
      ? Math.abs(Date.now() % 2147483647)
      : input.seed;
    if (!Number.isInteger(seed)) throw new SessionError('bad-body', 'seed must be an integer');
    const birthDate = input.birthDate ?? '1946-03-01';
    try {
      assertValidDate(birthDate);
    } catch {
      throw new SessionError('bad-date', `Invalid birthDate "${birthDate}" (expected YYYY-MM-DD)`);
    }
    const locationId = input.locationId ?? 'location.lucknow';
    const ds = datasetForLocation(locationId);
    if (!ds.locations.some((l) => l.id === locationId)) {
      throw new SessionError('bad-body', `Unknown location "${locationId}" (never invent places)`);
    }
    const isVic = isVictorianLocation(locationId);
    const life: SessionLifeConfig = {
      name: input.name.trim(),
      birthDate,
      locationId,
      classId: input.classId ?? (isVic ? 'class.victorian_middle' : 'class.middle'),
      schoolStartAge: 6,
      schoolEndAge: 14,
      workStartAge: 18,
      occupationId: isVic ? 'occupation.commercial_clerk' : 'occupation.government_clerk',
      yearlyIncome: isVic ? 100 : 180,
      yearlyExpenses: isVic ? 70 : 120,
      friendName: isVic ? 'Arthur' : 'Mohan',
    };
    const session = createSession(seed, life);
    // Birth-year history notes, same as the slice runner.
    const notesFn = yearNotesForLocation(locationId);
    for (const note of notesFn(birthDate, locationId)) {
      session.timeline.push(`${birthDate}: [world] ${note}`);
    }
    const id = newId(seed);
    this.persist(id, session);
    return toView(id, session);
  }

  getLife(id: string): LifeView {
    const { session } = this.load(id);
    return toView(id, session);
  }

  listLives(): string[] {
    return this.store.list();
  }

  deleteLife(id: string): void {
    try {
      this.store.remove(id);
    } catch (err) {
      const code = (err as { code?: unknown } | null)?.code;
      const message = err instanceof Error ? err.message : String(err);
      throw new SessionError(typeof code === 'string' ? code : 'not-found', message);
    }
  }

  advanceLife(id: string, years: unknown): LifeView & { stopped: string } {
    const { session } = this.load(id);
    if (!Number.isInteger(years)) {
      throw new SessionError('bad-advance', 'years must be an integer 1..120');
    }
    const templates = templatesForLocation(session.player.locationId);
    const notesFn = yearNotesForLocation(session.player.locationId);
    const result = advanceSession(session, templates, notesFn, years as number);
    this.persist(id, session);
    return { ...toView(id, session), stopped: result.stopped };
  }

  resolveChoice(id: string, eventId: string, choiceId: string): LifeView & {
    success: boolean;
    roll: number;
    finalProbability: number;
  } {
    const { session } = this.load(id);
    const templates = templatesForLocation(session.player.locationId);
    const result = resolveSessionChoice(session, templates, eventId, choiceId);
    this.persist(id, session);
    return { ...toView(id, session), ...result };
  }

  exportSave(id: string): string {
    return this.store.load(id);
  }

  historicalContext(date: string, locationId: string): {
    date: string;
    location: { id: string; name: string; type: string } | undefined;
    political: { id: string; name: string } | undefined;
    activeEvents: { id: string; name: string; status: string }[];
    availableOccupations: { id: string; name: string }[];
    activeLaws: { id: string; name: string }[];
  } {
    try {
      assertValidDate(date);
    } catch {
      throw new SessionError('bad-date', `Invalid date "${date}" (expected YYYY-MM-DD)`);
    }
    const ds = datasetForLocation(locationId);
    const ctx = resolveHistoricalContext(date, locationId, ds);
    if (!ctx) {
      throw new SessionError('not-found', `No historical context for ${locationId} at ${date}`);
    }
    return {
      date,
      location: { id: ctx.location.id, name: ctx.location.name, type: ctx.location.type },
      political: ctx.politicalEntity
        ? { id: ctx.politicalEntity.id, name: ctx.politicalEntity.name }
        : undefined,
      activeEvents: ctx.activeEvents.map((e) => ({ id: e.id, name: e.name, status: e.status })),
      availableOccupations: ctx.availableOccupations.map((o) => ({ id: o.id, name: o.name })),
      activeLaws: ctx.activeLaws.map((l) => ({ id: l.id, name: l.name })),
    };
  }

  buyProperty(
    id: string,
    prop: { id: string; name: string; type: 'residence' | 'commercial' | 'farmland'; cost: number; annualYield: number },
  ): LifeView {
    const { session } = this.load(id);
    buyPropertySession(session, prop);
    this.persist(id, session);
    return toView(id, session);
  }

  marryPartner(id: string, partnerName: string): LifeView {
    const { session } = this.load(id);
    marryPartnerSession(session, partnerName);
    this.persist(id, session);
    return toView(id, session);
  }

  haveChild(id: string, childName: string): LifeView {
    const { session } = this.load(id);
    haveChildSession(session, childName);
    this.persist(id, session);
    return toView(id, session);
  }

  playAsHeir(id: string): LifeView {
    const { session } = this.load(id);
    const heirSession = createHeirSession(session);
    this.persist(id, heirSession);
    return toView(id, heirSession);
  }
}

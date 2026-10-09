// Typed client for the Stage 4 API (GET/POST /api/v1/*).
// Base URL: NEXT_PUBLIC_API_URL (default http://127.0.0.1:3001).

const BASE = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://127.0.0.1:3001';

export interface PendingChoiceInfo {
  id: string;
  title: string;
  description?: string;
  baseProbability: number;
}

export interface PendingEvent {
  eventId: string;
  title: string;
  description: string;
  viaScheduled: boolean;
  choices: PendingChoiceInfo[];
}

export interface PropertyAsset {
  id: string;
  name: string;
  type: 'residence' | 'commercial' | 'farmland';
  value: number;
  annualYield: number;
  acquiredAge: number;
}

export interface Consequence {
  target: 'character' | 'household' | 'relationship' | 'world' | 'player' | 'family' | string;
  property: string;
  op: 'add' | 'set' | 'multiply' | 'ADD' | 'SET' | string;
  value: number | string;
  timing?: 'immediate' | 'delayed' | 'hidden' | string;
  visibility?: 'visible' | 'hidden' | string;
  source?: string;
  relationshipId?: string;
}

export interface DivergenceRecord {
  id: string;
  triggerEventId: string;
  date: string;
  scope: number;
  originalState: string;
  newState: string;
  cause: string;
  affectedEntityIds: string[];
  description?: string;
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

export interface SaveSummary {
  id: string;
  name: string;
  age: number;
  status: 'active' | 'dead';
  date: string;
  locationId: string;
  classId: string;
  occupationId?: string;
  wealth: number;
  generation: number;
  ancestorId?: string;
  descendantId?: string;
}

export interface HistoricalContextView {
  date: string;
  location: { id: string; name: string; type: string } | undefined;
  political: { id: string; name: string } | undefined;
  activeEvents: { id: string; name: string; status: string }[];
  availableOccupations: { id: string; name: string }[];
  activeLaws: { id: string; name: string }[];
}

export interface PlayerState {
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
  properties?: PropertyAsset[];
}

export interface LifeView {
  id: string;
  date: string;
  status: 'active' | 'dead';
  player: PlayerState;
  familyMembers: { relation: string; name: string; alive: boolean }[];
  pending: PendingEvent[];
  timeline?: string[];
  timelineTail: string[];
  timelineLength: number;
  legacy: Legacy | undefined;
  ancestorId?: string;
  descendantId?: string;
  generation?: number;
  divergences?: DivergenceRecord[];
  appliedConsequences?: Consequence[];
  stopped?: string;
  success?: boolean;
  roll?: number;
  finalProbability?: number;
  message?: string;
}

import { LifeService } from '../../../packages/api/src/service';
import { BrowserLocalStorageSaveStore } from './browser-store';

const localStore = new BrowserLocalStorageSaveStore();
const localService = new LifeService(localStore);

function initOfflineState(): boolean {
  if (process.env['NEXT_PUBLIC_OFFLINE'] === 'true') return true;
  if (typeof window !== 'undefined') {
    try {
      const persisted = window.localStorage.getItem('legacylife:offline');
      if (persisted !== null) return persisted === 'true';
      if (
        window.location.protocol === 'file:' ||
        window.location.protocol === 'capacitor:' ||
        (window as unknown as { Capacitor?: unknown }).Capacitor !== undefined
      ) {
        return true;
      }
    } catch {
      /* ignore storage access errors in sandboxed contexts */
    }
  }
  return false;
}

let isOfflineMode: boolean = initOfflineState();

export function setOfflineMode(enabled: boolean): void {
  isOfflineMode = enabled;
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem('legacylife:offline', enabled ? 'true' : 'false');
    } catch {
      /* ignore */
    }
  }
}

export function getIsOffline(): boolean {
  return isOfflineMode;
}

export class ApiError extends Error {
  readonly code: string;
  readonly status: number;
  constructor(code: string, status: number, message: string) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

async function wrapLocal<T>(fn: () => T | Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err: unknown) {
    if (err instanceof ApiError) throw err;
    const code = (err as { code?: string })?.code ?? 'unknown';
    const status =
      code === 'not-found'
        ? 404
        : code === 'life-ended' || code === 'ineligible-choice' || code === 'life-active'
        ? 409
        : 400;
    const message = err instanceof Error ? err.message : String(err);
    throw new ApiError(code, status, message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { 'content-type': 'application/json', ...(init?.headers ?? {}) },
  });
  const json = (await res.json()) as { code?: string; message?: string } & T;
  if (!res.ok) {
    throw new ApiError(
      typeof json.code === 'string' ? json.code : 'unknown',
      res.status,
      typeof json.message === 'string' ? json.message : `Request failed (${res.status})`,
    );
  }
  return json;
}

async function execute<T>(
  remoteRequest: () => Promise<T>,
  localFallback: () => T | Promise<T>,
): Promise<T> {
  if (isOfflineMode) {
    return wrapLocal(localFallback);
  }

  try {
    return await remoteRequest();
  } catch (err: unknown) {
    // If remote call failed due to network / connection refusal (backend is closed),
    // switch to offline mode and execute locally with zero disruption!
    if (
      err instanceof TypeError ||
      (err instanceof Error &&
        (err.message.includes('fetch') ||
          err.message.includes('network') ||
          err.message.includes('Failed') ||
          err.message.includes('ECONNREFUSED')))
    ) {
      setOfflineMode(true);
      return wrapLocal(localFallback);
    }
    // If backend returned an authoritative domain error (like 409 ineligible), rethrow it
    throw err;
  }
}


export const api = {
  createLife: (input: {
    seed?: number;
    name: string;
    birthDate?: string;
    locationId?: string;
    classId?: string;
  }): Promise<LifeView> =>
    execute(
      () =>
        request<LifeView>('/api/v1/lives', {
          method: 'POST',
          body: JSON.stringify(input),
        }),
      () => localService.createLife(input),
    ),

  getLife: (id: string): Promise<LifeView> =>
    execute(
      () => request<LifeView>(`/api/v1/lives/${encodeURIComponent(id)}`),
      () => localService.getLife(id),
    ),

  listLives: (): Promise<{ lives: string[]; saves: SaveSummary[] }> =>
    execute(
      () => request<{ lives: string[]; saves: SaveSummary[] }>('/api/v1/lives'),
      () => ({
        lives: localService.listLives(),
        saves: localService.listLivesDetail(),
      }),
    ),

  deleteLife: (id: string): Promise<{ deleted: string }> =>
    execute(
      () =>
        request<{ deleted: string }>(`/api/v1/lives/${encodeURIComponent(id)}`, {
          method: 'DELETE',
        }),
      () => {
        localService.deleteLife(id);
        return { deleted: id };
      },
    ),

  advance: (id: string, years: number, operationId?: string): Promise<LifeView> =>
    execute(
      () =>
        request<LifeView>(`/api/v1/lives/${encodeURIComponent(id)}/advance`, {
          method: 'POST',
          body: JSON.stringify({ years, operationId }),
        }),
      () => localService.advanceLife(id, years),
    ),

  resolveChoice: (id: string, eventId: string, choiceId: string, operationId?: string): Promise<LifeView> =>
    execute(
      () =>
        request<LifeView>(
          `/api/v1/lives/${encodeURIComponent(id)}/events/${encodeURIComponent(eventId)}/choices`,
          { method: 'POST', body: JSON.stringify({ choiceId, operationId }) },
        ),
      () => localService.resolveChoice(id, eventId, choiceId),
    ),

  buyProperty: (
    id: string,
    property: { id: string; name: string; type: 'residence' | 'commercial' | 'farmland'; cost: number; annualYield: number },
    operationId?: string,
  ): Promise<LifeView> =>
    execute(
      () =>
        request<LifeView>(`/api/v1/lives/${encodeURIComponent(id)}/properties/buy`, {
          method: 'POST',
          body: JSON.stringify({ ...property, operationId }),
        }),
      () => localService.buyProperty(id, property),
    ),

  marryPartner: (id: string, partnerName: string, operationId?: string): Promise<LifeView> =>
    execute(
      () =>
        request<LifeView>(`/api/v1/lives/${encodeURIComponent(id)}/marry`, {
          method: 'POST',
          body: JSON.stringify({ partnerName, operationId }),
        }),
      () => localService.marryPartner(id, partnerName),
    ),

  haveChild: (id: string, childName: string, operationId?: string): Promise<LifeView> =>
    execute(
      () =>
        request<LifeView>(`/api/v1/lives/${encodeURIComponent(id)}/children`, {
          method: 'POST',
          body: JSON.stringify({ childName, operationId }),
        }),
      () => localService.haveChild(id, childName),
    ),

  playAsHeir: (id: string): Promise<LifeView> =>
    execute(
      () =>
        request<LifeView>(`/api/v1/lives/${encodeURIComponent(id)}/heir`, {
          method: 'POST',
        }),
      () => localService.playAsHeir(id),
    ),

  applyJob: (id: string, occupationId: string, yearlyIncome?: number, operationId?: string): Promise<LifeView> =>
    execute(
      () =>
        request<LifeView>(`/api/v1/lives/${encodeURIComponent(id)}/career/apply`, {
          method: 'POST',
          body: JSON.stringify({ occupationId, yearlyIncome, operationId }),
        }),
      () => localService.applyJob(id, occupationId, yearlyIncome),
    ),

  performHealthActivity: (
    id: string,
    activityType: 'exercise' | 'rest' | 'consultation' | 'medicine',
    operationId?: string,
  ): Promise<LifeView & { message: string }> =>
    execute(
      () =>
        request<LifeView & { message: string }>(`/api/v1/lives/${encodeURIComponent(id)}/health/activity`, {
          method: 'POST',
          body: JSON.stringify({ activityType, operationId }),
        }),
      () => localService.performHealthActivity(id, activityType),
    ),

  interactRelationship: (
    id: string,
    relId: string,
    action: 'spend_time' | 'gift' | 'confide' | 'apologize',
    operationId?: string,
  ): Promise<LifeView & { message: string }> =>
    execute(
      () =>
        request<LifeView & { message: string }>(
          `/api/v1/lives/${encodeURIComponent(id)}/relationships/${encodeURIComponent(relId)}/interact`,
          {
            method: 'POST',
            body: JSON.stringify({ action, operationId }),
          },
        ),
      () => localService.interactRelationship(id, relId, action),
    ),

  historicalContext: (date: string, locationId: string): Promise<HistoricalContextView> =>
    execute(
      () =>
        request<HistoricalContextView>(
          `/api/v1/historical-context?date=${encodeURIComponent(date)}&locationId=${encodeURIComponent(locationId)}`,
        ),
      () => localService.historicalContext(date, locationId),
    ),

  exportSave: (id: string): Promise<string> =>
    execute(
      async () => {
        const res = await fetch(`${BASE}/api/v1/lives/${encodeURIComponent(id)}/save`);
        if (!res.ok) throw new ApiError('not-found', res.status, 'Save not found');
        return await res.text();
      },
      () => localService.exportSave(id),
    ),

  importSave: (snapshot: string | Record<string, unknown>): Promise<LifeView> =>
    execute(
      () =>
        request<LifeView>('/api/v1/lives/import', {
          method: 'POST',
          body: JSON.stringify({ snapshot }),
        }),
      () => localService.importSave(snapshot),
    ),
};



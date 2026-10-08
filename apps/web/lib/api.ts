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
  timelineTail: string[];
  timelineLength: number;
  legacy: { summary: string } | undefined;
  stopped?: string;
  success?: boolean;
  roll?: number;
  finalProbability?: number;
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

export const api = {
  createLife: (input: {
    seed?: number;
    name: string;
    birthDate?: string;
    locationId?: string;
    classId?: string;
  }): Promise<LifeView> => request<LifeView>('/api/v1/lives', {
    method: 'POST',
    body: JSON.stringify(input),
  }),

  getLife: (id: string): Promise<LifeView> =>
    request<LifeView>(`/api/v1/lives/${encodeURIComponent(id)}`),

  advance: (id: string, years: number): Promise<LifeView> =>
    request<LifeView>(`/api/v1/lives/${encodeURIComponent(id)}/advance`, {
      method: 'POST',
      body: JSON.stringify({ years }),
    }),

  resolveChoice: (id: string, eventId: string, choiceId: string): Promise<LifeView> =>
    request<LifeView>(
      `/api/v1/lives/${encodeURIComponent(id)}/events/${encodeURIComponent(eventId)}/choices`,
      { method: 'POST', body: JSON.stringify({ choiceId }) },
    ),

  buyProperty: (
    id: string,
    property: { id: string; name: string; type: 'residence' | 'commercial' | 'farmland'; cost: number; annualYield: number },
  ): Promise<LifeView> =>
    request<LifeView>(`/api/v1/lives/${encodeURIComponent(id)}/properties/buy`, {
      method: 'POST',
      body: JSON.stringify(property),
    }),

  marryPartner: (id: string, partnerName: string): Promise<LifeView> =>
    request<LifeView>(`/api/v1/lives/${encodeURIComponent(id)}/marry`, {
      method: 'POST',
      body: JSON.stringify({ partnerName }),
    }),

  haveChild: (id: string, childName: string): Promise<LifeView> =>
    request<LifeView>(`/api/v1/lives/${encodeURIComponent(id)}/children`, {
      method: 'POST',
      body: JSON.stringify({ childName }),
    }),

  playAsHeir: (id: string): Promise<LifeView> =>
    request<LifeView>(`/api/v1/lives/${encodeURIComponent(id)}/heir`, {
      method: 'POST',
    }),
};

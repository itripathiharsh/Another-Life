'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { ApiError, api, type LifeView } from '../lib/api';

const STORAGE_KEY = 'legacylife:lifeId';

export interface CreateLifeParams {
  name: string;
  birthDate?: string;
  locationId?: string;
  classId?: string;
}

interface LifeContextValue {
  view: LifeView | undefined;
  loading: boolean;
  error: string | undefined;
  createNewLife: (params: CreateLifeParams | string) => Promise<void>;
  advanceLife: (years?: number) => Promise<LifeView | undefined>;
  buyProperty: (property: { id: string; name: string; type: 'residence' | 'commercial' | 'farmland'; cost: number; annualYield: number }) => Promise<LifeView | undefined>;
  marryPartner: (partnerName: string) => Promise<LifeView | undefined>;
  haveChild: (childName: string) => Promise<LifeView | undefined>;
  playAsHeir: () => Promise<LifeView | undefined>;
  refresh: () => Promise<void>;
  forgetLife: () => void;
}

const LifeContext = createContext<LifeContextValue>({
  view: undefined,
  loading: true,
  error: undefined,
  createNewLife: async () => {},
  advanceLife: async () => undefined,
  buyProperty: async () => undefined,
  marryPartner: async () => undefined,
  haveChild: async () => undefined,
  playAsHeir: async () => undefined,
  refresh: async () => {},
  forgetLife: () => {},
});

export function useLife(): LifeContextValue {
  return useContext(LifeContext);
}

export function LifeProvider({ children }: { children: ReactNode }): JSX.Element {
  const [lifeId, setLifeId] = useState<string | undefined>(undefined);
  const [view, setView] = useState<LifeView | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) ?? undefined;
      setLifeId(stored);
      if (!stored) setLoading(false);
    } catch {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    if (!lifeId) return;
    setLoading(true);
    setError(undefined);
    try {
      setView(await api.getLife(lifeId));
    } catch (err) {
      setError(err instanceof ApiError ? `${err.code}: ${err.message}` : 'API unreachable');
      setView(undefined);
    } finally {
      setLoading(false);
    }
  }, [lifeId]);

  useEffect(() => {
    if (lifeId) void refresh();
  }, [lifeId, refresh]);

  const createNewLife = useCallback(async (params: CreateLifeParams | string) => {
    setLoading(true);
    setError(undefined);
    try {
      const input = typeof params === 'string' ? { name: params } : params;
      const created = await api.createLife(input);
      try {
        window.localStorage.setItem(STORAGE_KEY, created.id);
      } catch {
        /* private mode — keep in memory */
      }
      setLifeId(created.id);
      setView(created);
    } catch (err) {
      setError(err instanceof ApiError ? `${err.code}: ${err.message}` : 'API unreachable');
    } finally {
      setLoading(false);
    }
  }, []);

  const advanceLife = useCallback(async (years = 1) => {
    if (!lifeId) return undefined;
    setLoading(true);
    setError(undefined);
    try {
      const advanced = await api.advance(lifeId, years);
      setView(advanced);
      return advanced;
    } catch (err) {
      const msg = err instanceof ApiError ? `${err.code}: ${err.message}` : 'Failed to advance time';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [lifeId]);

  const buyProperty = useCallback(async (property: { id: string; name: string; type: 'residence' | 'commercial' | 'farmland'; cost: number; annualYield: number }) => {
    if (!lifeId) return undefined;
    setLoading(true);
    setError(undefined);
    try {
      const updated = await api.buyProperty(lifeId, property);
      setView(updated);
      return updated;
    } catch (err) {
      const msg = err instanceof ApiError ? `${err.code}: ${err.message}` : 'Failed to purchase property';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [lifeId]);

  const marryPartner = useCallback(async (partnerName: string) => {
    if (!lifeId) return undefined;
    setLoading(true);
    setError(undefined);
    try {
      const updated = await api.marryPartner(lifeId, partnerName);
      setView(updated);
      return updated;
    } catch (err) {
      const msg = err instanceof ApiError ? `${err.code}: ${err.message}` : 'Failed to marry partner';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [lifeId]);

  const haveChild = useCallback(async (childName: string) => {
    if (!lifeId) return undefined;
    setLoading(true);
    setError(undefined);
    try {
      const updated = await api.haveChild(lifeId, childName);
      setView(updated);
      return updated;
    } catch (err) {
      const msg = err instanceof ApiError ? `${err.code}: ${err.message}` : 'Failed to have child';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [lifeId]);

  const playAsHeir = useCallback(async () => {
    if (!lifeId) return undefined;
    setLoading(true);
    setError(undefined);
    try {
      const updated = await api.playAsHeir(lifeId);
      try {
        window.localStorage.setItem(STORAGE_KEY, updated.id);
      } catch {
        /* private mode */
      }
      setLifeId(updated.id);
      setView(updated);
      return updated;
    } catch (err) {
      const msg = err instanceof ApiError ? `${err.code}: ${err.message}` : 'Failed to inherit dynasty';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [lifeId]);

  const forgetLife = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setLifeId(undefined);
    setView(undefined);
  }, []);

  const value = useMemo(
    () => ({
      view,
      loading,
      error,
      createNewLife,
      advanceLife,
      buyProperty,
      marryPartner,
      haveChild,
      playAsHeir,
      refresh,
      forgetLife,
    }),
    [view, loading, error, createNewLife, advanceLife, buyProperty, marryPartner, haveChild, playAsHeir, refresh, forgetLife],
  );
  return <LifeContext.Provider value={value}>{children}</LifeContext.Provider>;
}

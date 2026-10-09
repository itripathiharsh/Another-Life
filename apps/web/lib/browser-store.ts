import { type SaveStore, StoreError } from '../../../packages/api/src/store-types';

/**
 * BrowserLocalStorageSaveStore
 *
 * Implements SaveStore interface for 100% offline standalone execution in mobile webview / APK.
 * Saves live persistently in window.localStorage across app restarts.
 * Gracefully uses an in-memory Map during SSR or headless environments without localStorage.
 */
export class BrowserLocalStorageSaveStore implements SaveStore {
  private readonly prefix: string;
  private readonly memoryFallback = new Map<string, string>();

  constructor(prefix = 'legacylife:save:') {
    this.prefix = prefix;
  }

  private hasStorage(): boolean {
    try {
      return (
        typeof window !== 'undefined' &&
        typeof window.localStorage !== 'undefined' &&
        window.localStorage !== null
      );
    } catch {
      return false;
    }
  }

  save(id: string, snapshotJson: string): void {
    if (typeof snapshotJson !== 'string' || snapshotJson.trim().length === 0) {
      throw new StoreError('bad-payload', `Cannot save empty snapshot for "${id}"`);
    }

    try {
      const parsed = JSON.parse(snapshotJson);
      if (typeof parsed !== 'object' || parsed === null || typeof parsed.schemaVersion !== 'number') {
        throw new Error('Snapshot must be an object with schemaVersion');
      }
    } catch (err) {
      throw new StoreError(
        'corrupted-save',
        `Cannot persist invalid snapshot for "${id}": ${(err as Error).message}`,
      );
    }

    if (this.hasStorage()) {
      try {
        window.localStorage.setItem(`${this.prefix}${id}`, snapshotJson);
      } catch (err) {
        throw new StoreError('io-error', `Failed to write save "${id}" to localStorage: ${(err as Error).message}`);
      }
    } else {
      this.memoryFallback.set(id, snapshotJson);
    }
  }

  load(id: string): string {
    let raw: string | null = null;
    if (this.hasStorage()) {
      try {
        raw = window.localStorage.getItem(`${this.prefix}${id}`);
      } catch {
        raw = null;
      }
    } else {
      raw = this.memoryFallback.get(id) ?? null;
    }

    if (!raw) {
      throw new StoreError('not-found', `No saved life "${id}"`);
    }

    try {
      JSON.parse(raw);
    } catch {
      throw new StoreError('corrupted-save', `Saved life "${id}" is corrupted or unreadable JSON`);
    }
    return raw;
  }

  exists(id: string): boolean {
    if (this.hasStorage()) {
      try {
        return window.localStorage.getItem(`${this.prefix}${id}`) !== null;
      } catch {
        return false;
      }
    }
    return this.memoryFallback.has(id);
  }

  list(): string[] {
    if (this.hasStorage()) {
      try {
        const keys: string[] = [];
        for (let i = 0; i < window.localStorage.length; i++) {
          const key = window.localStorage.key(i);
          if (key && key.startsWith(this.prefix)) {
            keys.push(key.slice(this.prefix.length));
          }
        }
        return keys.sort();
      } catch {
        return [];
      }
    }
    return Array.from(this.memoryFallback.keys()).sort();
  }

  remove(id: string): void {
    if (this.hasStorage()) {
      try {
        if (window.localStorage.getItem(`${this.prefix}${id}`) === null) {
          throw new StoreError('not-found', `No saved life "${id}"`);
        }
        window.localStorage.removeItem(`${this.prefix}${id}`);
      } catch (err) {
        if (err instanceof StoreError) throw err;
        throw new StoreError('io-error', `Failed to delete save "${id}": ${(err as Error).message}`);
      }
    } else {
      if (!this.memoryFallback.has(id)) {
        throw new StoreError('not-found', `No saved life "${id}"`);
      }
      this.memoryFallback.delete(id);
    }
  }
}

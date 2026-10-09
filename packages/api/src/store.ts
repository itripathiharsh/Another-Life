// File-based save store (Stage 4).
// DECISION: JSON files under the repo (drive D), not PostgreSQL. The plan
// names Postgres for production (§Backend/Database, §25); for the local
// headless API this gives deterministic versioned snapshots with zero ops,
// and snapshots already carry schema/engine/content versions (§40-41) so a
// later Postgres migration stays clean. Auth/multi-user deferred with it.

import {
  closeSync,
  existsSync,
  fsyncSync,
  mkdirSync,
  openSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  unlinkSync,
  writeSync,
} from 'node:fs';
import { join } from 'node:path';
import { type SaveStore, StoreError } from './store-types';

export { type SaveStore, StoreError };

function sanitizeId(id: string): string {
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(id)) {
    throw new StoreError('bad-id', `Invalid life id "${id}"`);
  }
  return id;
}

export class FileSaveStore implements SaveStore {
  private readonly dir: string;

  constructor(dir: string) {
    this.dir = dir;
    mkdirSync(dir, { recursive: true });
    this.cleanStaleTempFiles();
  }

  private cleanStaleTempFiles(): void {
    try {
      const files = readdirSync(this.dir);
      for (const f of files) {
        if (f.endsWith('.tmp')) {
          try {
            rmSync(join(this.dir, f), { force: true });
          } catch {
            /* ignore cleanup failure */
          }
        }
      }
    } catch {
      /* ignore */
    }
  }

  private pathFor(id: string): string {
    return join(this.dir, `${sanitizeId(id)}.json`);
  }

  save(id: string, snapshotJson: string): void {
    if (typeof snapshotJson !== 'string' || snapshotJson.trim().length === 0) {
      throw new StoreError('bad-payload', `Cannot save empty snapshot for "${id}"`);
    }
    try {
      const parsed = JSON.parse(snapshotJson);
      if (typeof parsed !== 'object' || parsed === null) {
        throw new Error('Snapshot must be an object');
      }
      if (typeof parsed.schemaVersion !== 'number') {
        throw new Error('Snapshot missing required schemaVersion');
      }
    } catch (err) {
      throw new StoreError(
        'corrupted-save',
        `Cannot persist invalid snapshot for "${id}": ${(err as Error).message}`,
      );
    }

    const targetPath = this.pathFor(id);
    const tmpPath = join(
      this.dir,
      `${sanitizeId(id)}.${Date.now()}.${Math.random().toString(36).slice(2)}.tmp`,
    );

    try {
      const fd = openSync(tmpPath, 'w');
      try {
        const buffer = Buffer.from(snapshotJson, 'utf-8');
        writeSync(fd, buffer, 0, buffer.length, 0);
        fsyncSync(fd);
      } finally {
        closeSync(fd);
      }
      renameSync(tmpPath, targetPath);
    } catch (err) {
      if (existsSync(tmpPath)) {
        try {
          unlinkSync(tmpPath);
        } catch {
          /* ignore */
        }
      }
      throw new StoreError('io-error', `Failed to atomically persist save "${id}": ${(err as Error).message}`);
    }
  }

  load(id: string): string {
    const filePath = this.pathFor(id);
    let raw: string;
    try {
      raw = readFileSync(filePath, 'utf-8');
    } catch {
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
    return existsSync(this.pathFor(id));
  }

  list(): string[] {
    this.cleanStaleTempFiles();
    try {
      return readdirSync(this.dir)
        .filter((f) => f.endsWith('.json'))
        .map((f) => f.slice(0, -'.json'.length))
        .sort();
    } catch {
      return [];
    }
  }

  remove(id: string): void {
    const filePath = this.pathFor(id);
    if (!existsSync(filePath)) {
      throw new StoreError('not-found', `No saved life "${id}"`);
    }
    try {
      rmSync(filePath, { force: true });
    } catch (err) {
      throw new StoreError('io-error', `Failed to remove saved life "${id}": ${(err as Error).message}`);
    }
  }
}


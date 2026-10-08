// File-based save store (Stage 4).
// DECISION: JSON files under the repo (drive D), not PostgreSQL. The plan
// names Postgres for production (§Backend/Database, §25); for the local
// headless API this gives deterministic versioned snapshots with zero ops,
// and snapshots already carry schema/engine/content versions (§40-41) so a
// later Postgres migration stays clean. Auth/multi-user deferred with it.

import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export class StoreError extends Error {
  readonly code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

function sanitizeId(id: string): string {
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(id)) {
    throw new StoreError('bad-id', `Invalid life id "${id}"`);
  }
  return id;
}

export class FileSaveStore {
  private readonly dir: string;

  constructor(dir: string) {
    this.dir = dir;
    mkdirSync(dir, { recursive: true });
  }

  private pathFor(id: string): string {
    return join(this.dir, `${sanitizeId(id)}.json`);
  }

  save(id: string, snapshotJson: string): void {
    writeFileSync(this.pathFor(id), snapshotJson, 'utf-8');
  }

  load(id: string): string {
    try {
      return readFileSync(this.pathFor(id), 'utf-8');
    } catch {
      throw new StoreError('not-found', `No saved life "${id}"`);
    }
  }

  exists(id: string): boolean {
    try {
      readFileSync(this.pathFor(id), 'utf-8');
      return true;
    } catch {
      return false;
    }
  }

  list(): string[] {
    return readdirSync(this.dir)
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.slice(0, -'.json'.length))
      .sort();
  }

  remove(id: string): void {
    try {
      rmSync(this.pathFor(id));
    } catch {
      throw new StoreError('not-found', `No saved life "${id}"`);
    }
  }
}

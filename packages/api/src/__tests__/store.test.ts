import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';
import { FileSaveStore, StoreError } from '../store';

const TEST_DIR = join(process.cwd(), '.cache', 'api-test-saves', 'store');

describe('FileSaveStore (Atomic Persistence & Data Safety)', () => {
  let store: FileSaveStore;

  beforeEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true });
    store = new FileSaveStore(TEST_DIR);
  });

  it('saves and loads a valid snapshot', () => {
    const payload = JSON.stringify({ schemaVersion: 1, test: true, data: [1, 2, 3] });
    store.save('life_1', payload);

    expect(store.exists('life_1')).toBe(true);
    expect(store.load('life_1')).toBe(payload);
    expect(store.list()).toEqual(['life_1']);
  });

  it('atomically creates the file without leaving temporary files behind', () => {
    const payload = JSON.stringify({ schemaVersion: 1, name: 'Atomic Test' });
    store.save('life_atomic', payload);

    const savedFile = join(TEST_DIR, 'life_atomic.json');
    expect(existsSync(savedFile)).toBe(true);
    expect(JSON.parse(readFileSync(savedFile, 'utf-8'))).toEqual({
      schemaVersion: 1,
      name: 'Atomic Test',
    });

    // Verify no .tmp files exist
    const files = store.list();
    expect(files).toEqual(['life_atomic']);
  });

  it('rejects invalid or empty payloads without corrupting previous save', () => {
    const validPayload = JSON.stringify({ schemaVersion: 1, valid: true });
    store.save('life_safe', validPayload);

    // Attempt saving bad JSON
    expect(() => store.save('life_safe', '{ bad-json')).toThrowError(StoreError);
    // Prior save remains 100% intact
    expect(store.load('life_safe')).toBe(validPayload);

    // Attempt saving empty string
    expect(() => store.save('life_safe', '')).toThrowError(StoreError);
    expect(store.load('life_safe')).toBe(validPayload);

    // Attempt saving object missing schemaVersion
    expect(() => store.save('life_safe', JSON.stringify({ missingVersion: true }))).toThrowError(StoreError);
    expect(store.load('life_safe')).toBe(validPayload);
  });

  it('detects and reports corrupted save files on disk', () => {
    const filePath = join(TEST_DIR, 'life_corrupt.json');
    writeFileSync(filePath, 'NOT_VALID_JSON{:::broken', 'utf-8');

    expect(() => store.load('life_corrupt')).toThrowError(StoreError);
    try {
      store.load('life_corrupt');
    } catch (err) {
      expect((err as StoreError).code).toBe('corrupted-save');
    }
  });

  it('cleans up abandoned temporary files safely', () => {
    const staleTmp = join(TEST_DIR, 'abandoned.12345.abc.tmp');
    writeFileSync(staleTmp, 'stale partial data', 'utf-8');
    expect(existsSync(staleTmp)).toBe(true);

    // Initializing store or calling list() cleans up stale .tmp files
    const newStore = new FileSaveStore(TEST_DIR);
    expect(existsSync(staleTmp)).toBe(false);
  });

  it('sanitizes life identifiers against path traversal', () => {
    expect(() => store.save('../escape', '{}')).toThrowError(StoreError);
    expect(() => store.load('../../etc/passwd')).toThrowError(StoreError);
    expect(() => store.exists('bad/id')).toThrowError(StoreError);
  });

  it('removes saved lives safely and errors on nonexistent removes', () => {
    const payload = JSON.stringify({ schemaVersion: 1 });
    store.save('life_del', payload);
    expect(store.exists('life_del')).toBe(true);

    store.remove('life_del');
    expect(store.exists('life_del')).toBe(false);
    expect(() => store.remove('life_del')).toThrowError(StoreError);
  });
});

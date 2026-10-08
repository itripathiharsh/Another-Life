import { describe, expect, it } from 'vitest';
import {
  LUCKNOW_REGION_CONTROL,
  LUCKNOW_REGION_POLITICAL_ENTITIES,
  resolvePoliticalControl,
} from '../index';

describe('resolvePoliticalControl (Lucknow seed 1945–1970)', () => {
  it('returns British Raj before independence', () => {
    const rec = resolvePoliticalControl('1946-06-15', 'location.lucknow', LUCKNOW_REGION_CONTROL);
    expect(rec?.entityId).toBe('political.british_raj');
  });

  it('switches to Dominion of India ON independence day (1947-08-15)', () => {
    const rec = resolvePoliticalControl('1947-08-15', 'location.lucknow', LUCKNOW_REGION_CONTROL);
    expect(rec?.entityId).toBe('political.dominion_india');
  });

  it('is still British Raj the day before (1947-08-14)', () => {
    const rec = resolvePoliticalControl('1947-08-14', 'location.lucknow', LUCKNOW_REGION_CONTROL);
    expect(rec?.entityId).toBe('political.british_raj');
  });

  it('switches to Republic of India on 1950-01-26', () => {
    const rec = resolvePoliticalControl('1950-01-26', 'location.lucknow', LUCKNOW_REGION_CONTROL);
    expect(rec?.entityId).toBe('political.republic_india');
  });

  it('is Dominion the day before Republic Day (1950-01-25)', () => {
    const rec = resolvePoliticalControl('1950-01-25', 'location.lucknow', LUCKNOW_REGION_CONTROL);
    expect(rec?.entityId).toBe('political.dominion_india');
  });

  it('resolves late-period dates within the MVP window', () => {
    const rec = resolvePoliticalControl('1965-08-15', 'location.lucknow', LUCKNOW_REGION_CONTROL);
    expect(rec?.entityId).toBe('political.republic_india');
  });

  it('returns undefined for dates outside the dataset (unsupported ≠ invented)', () => {
    expect(resolvePoliticalControl('1944-01-01', 'location.lucknow', LUCKNOW_REGION_CONTROL)).toBeUndefined();
    expect(resolvePoliticalControl('1971-01-01', 'location.lucknow', LUCKNOW_REGION_CONTROL)).toBeUndefined();
  });

  it('returns undefined for unknown locations', () => {
    expect(resolvePoliticalControl('1950-06-01', 'location.kyoto', LUCKNOW_REGION_CONTROL)).toBeUndefined();
  });

  it('every control record references a defined political entity (referential integrity)', () => {
    const ids = new Set(LUCKNOW_REGION_POLITICAL_ENTITIES.map((e) => e.id));
    for (const rec of LUCKNOW_REGION_CONTROL) {
      expect(ids.has(rec.entityId), `dangling entity ${rec.entityId}`).toBe(true);
      expect(rec.source.length, 'provenance required').toBeGreaterThan(0);
    }
  });

  it('is deterministic — same input, same output', () => {
    const a = resolvePoliticalControl('1947-08-15', 'location.lucknow', LUCKNOW_REGION_CONTROL);
    const b = resolvePoliticalControl('1947-08-15', 'location.lucknow', LUCKNOW_REGION_CONTROL);
    expect(a).toEqual(b);
  });
});

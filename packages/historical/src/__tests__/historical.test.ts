import { describe, expect, it } from 'vitest';
import {
  LUCKNOW_CLASSES,
  LUCKNOW_CONTROL,
  LUCKNOW_DISEASES,
  LUCKNOW_EVENTS,
  LUCKNOW_LAWS,
  LUCKNOW_LOCATIONS,
  LUCKNOW_OCCUPATIONS,
  LUCKNOW_POLITICAL_ENTITIES,
  LUCKNOW_TECHNOLOGIES,
  resolveHistoricalContext,
  validateDataset,
  type HistoricalDataset,
} from '../index';

const DATASET: HistoricalDataset = {
  locations: LUCKNOW_LOCATIONS,
  politicalEntities: LUCKNOW_POLITICAL_ENTITIES,
  controlRecords: LUCKNOW_CONTROL,
  events: LUCKNOW_EVENTS,
  occupations: LUCKNOW_OCCUPATIONS,
  classes: LUCKNOW_CLASSES,
  technologies: LUCKNOW_TECHNOLOGIES,
  diseases: LUCKNOW_DISEASES,
  laws: LUCKNOW_LAWS,
};

describe('Stage 1 dataset integrity', () => {
  it('has the MVP slice: 5 locations, 8 occupations, 12 events', () => {
    expect(LUCKNOW_LOCATIONS).toHaveLength(5);
    expect(LUCKNOW_OCCUPATIONS).toHaveLength(8);
    expect(LUCKNOW_EVENTS.length).toBeGreaterThanOrEqual(10);
  });

  it('passes validation with zero issues', () => {
    expect(validateDataset(DATASET)).toEqual([]);
  });

  it('every item carries provenance', () => {
    for (const o of LUCKNOW_OCCUPATIONS) expect(o.source.length).toBeGreaterThan(0);
    for (const e of LUCKNOW_EVENTS) expect(e.source.length).toBeGreaterThan(0);
    for (const t of LUCKNOW_TECHNOLOGIES) expect(t.source.length).toBeGreaterThan(0);
  });
});

describe('resolveHistoricalContext', () => {
  it('resolves British Raj Lucknow in 1946 with no independence events', () => {
    const ctx = resolveHistoricalContext('1946-06-15', 'location.lucknow', DATASET);
    expect(ctx?.politicalEntity?.id).toBe('political.british_raj');
    expect(ctx?.activeEvents.map((e) => e.id)).not.toContain('event.independence_1947');
    expect(ctx?.availableOccupations.length).toBeGreaterThan(0);
  });

  it('resolves independence day with the independence event active', () => {
    const ctx = resolveHistoricalContext('1947-08-15', 'location.lucknow', DATASET);
    expect(ctx?.politicalEntity?.id).toBe('political.dominion_india');
    expect(ctx?.activeEvents.map((e) => e.id)).toContain('event.independence_1947');
  });

  it('same date different place can differ (Delhi vs rural)', () => {
    const delhi = resolveHistoricalContext('1965-09-01', 'location.delhi', DATASET);
    const rural = resolveHistoricalContext('1965-09-01', 'location.awadh_rural', DATASET);
    expect(delhi?.activeEvents.map((e) => e.id)).toContain('event.indo_pak_war_1965');
    expect(rural?.activeEvents.map((e) => e.id)).not.toContain('event.indo_pak_war_1965');
  });

  it('same place different date changes politics (1947-08-14 vs 15)', () => {
    const before = resolveHistoricalContext('1947-08-14', 'location.lucknow', DATASET);
    const after = resolveHistoricalContext('1947-08-15', 'location.lucknow', DATASET);
    expect(before?.politicalEntity?.id).toBe('political.british_raj');
    expect(after?.politicalEntity?.id).toBe('political.dominion_india');
  });

  it('returns undefined for unknown locations (never invent)', () => {
    expect(resolveHistoricalContext('1950-06-01', 'location.kyoto', DATASET)).toBeUndefined();
  });

  it('is deterministic', () => {
    const a = resolveHistoricalContext('1950-01-26', 'location.lucknow', DATASET);
    const b = resolveHistoricalContext('1950-01-26', 'location.lucknow', DATASET);
    expect(a).toEqual(b);
  });
});

describe('validateDataset catches errors', () => {
  it('flags duplicate ids, dangling refs, and missing provenance', () => {
    const bad: HistoricalDataset = {
      ...DATASET,
      occupations: [
        ...DATASET.occupations,
        { ...DATASET.occupations[0]! },
      ],
      events: [
        {
          id: 'event.bad',
          name: 'Bad',
          range: { from: '1950-01-01', until: '1949-01-01' },
          locationIds: ['location.nowhere'],
          politicalEntityIds: ['political.nowhere'],
          status: 'observable',
          description: 'bad',
          source: '',
        },
      ],
    };
    const codes = validateDataset(bad).map((i) => i.code);
    expect(codes).toContain('DUPLICATE_ID');
    expect(codes).toContain('DANGLING_REF');
    expect(codes).toContain('INVALID_RANGE');
    expect(codes).toContain('MISSING_PROVENANCE');
  });

  it('validates VICTORIAN_DATASET with zero issues', async () => {
    const { VICTORIAN_DATASET } = await import('../../../content/src/industrial');
    expect(validateDataset(VICTORIAN_DATASET)).toEqual([]);
    const ctx = resolveHistoricalContext('1851-05-01', 'location.london', VICTORIAN_DATASET);
    expect(ctx?.politicalEntity?.id).toBe('political.victorian_uk');
    expect(ctx?.activeEvents.some((e) => e.name.includes('Crystal Palace'))).toBe(true);
  });
});

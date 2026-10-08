// Stage 1 — Dataset validation layer.
// Checks per Phase 2.5 §41-42 + Phase 3 §§39-43:
// duplicate IDs, invalid ranges, dangling references, missing provenance.

import { assertValidRange } from '../../shared/src/temporal';
import type { HistoricalDataset } from './context';

export type ValidationCode =
  | 'DUPLICATE_ID'
  | 'INVALID_RANGE'
  | 'DANGLING_REF'
  | 'MISSING_PROVENANCE';

export interface ValidationIssue {
  code: ValidationCode;
  message: string;
}

function hasProvenance(source: unknown): boolean {
  return typeof source === 'string' && source.length > 0;
}

export function validateDataset(dataset: HistoricalDataset): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const seen = new Map<string, string>();

  const registerId = (id: string, where: string): void => {
    const prev = seen.get(id);
    if (prev) {
      issues.push({
        code: 'DUPLICATE_ID',
        message: `Duplicate id "${id}" in ${where} (already seen in ${prev})`,
      });
    } else {
      seen.set(id, where);
    }
  };

  for (const l of dataset.locations) registerId(l.id, 'locations');
  for (const e of dataset.politicalEntities) {
    registerId(e.id, 'politicalEntities');
    try {
      assertValidRange(e.range);
    } catch (err) {
      issues.push({
        code: 'INVALID_RANGE',
        message: `politicalEntities/${e.id}: ${(err as Error).message}`,
      });
    }
  }

  const locationIds = new Set(dataset.locations.map((l) => l.id));
  const entityIds = new Set(dataset.politicalEntities.map((e) => e.id));
  const occupationIds = new Set(dataset.occupations.map((o) => o.id));
  void occupationIds;

  for (const r of dataset.controlRecords) {
    try {
      assertValidRange(r.range);
    } catch (err) {
      issues.push({
        code: 'INVALID_RANGE',
        message: `controlRecords/${r.locationId}+${r.entityId}: ${(err as Error).message}`,
      });
    }
    if (!locationIds.has(r.locationId)) {
      issues.push({
        code: 'DANGLING_REF',
        message: `controlRecords: unknown location "${r.locationId}"`,
      });
    }
    if (!entityIds.has(r.entityId)) {
      issues.push({
        code: 'DANGLING_REF',
        message: `controlRecords: unknown entity "${r.entityId}"`,
      });
    }
    if (!hasProvenance(r.source)) {
      issues.push({ code: 'MISSING_PROVENANCE', message: 'controlRecords: missing source' });
    }
  }

  for (const o of dataset.occupations) {
    registerId(o.id, 'occupations');
    try {
      assertValidRange(o.range);
    } catch (err) {
      issues.push({
        code: 'INVALID_RANGE',
        message: `occupations/${o.id}: ${(err as Error).message}`,
      });
    }
    for (const lid of o.locationIds) {
      if (!locationIds.has(lid)) {
        issues.push({ code: 'DANGLING_REF', message: `occupations/${o.id}: unknown location "${lid}"` });
      }
    }
    for (const cid of o.socialClassIds) {
      if (!dataset.classes.some((c) => c.id === cid)) {
        issues.push({ code: 'DANGLING_REF', message: `occupations/${o.id}: unknown class "${cid}"` });
      }
    }
    if (!hasProvenance(o.source)) {
      issues.push({ code: 'MISSING_PROVENANCE', message: `occupations/${o.id}: missing source` });
    }
  }

  for (const c of dataset.classes) {
    registerId(c.id, 'classes');
    try {
      assertValidRange(c.range);
    } catch (err) {
      issues.push({
        code: 'INVALID_RANGE',
        message: `classes/${c.id}: ${(err as Error).message}`,
      });
    }
    if (!hasProvenance(c.source)) {
      issues.push({ code: 'MISSING_PROVENANCE', message: `classes/${c.id}: missing source` });
    }
  }

  for (const t of dataset.technologies) {
    registerId(t.id, 'technologies');
    if (t.adoptionStart > t.adoptionEnd) {
      issues.push({
        code: 'INVALID_RANGE',
        message: `technologies/${t.id}: adoptionStart after adoptionEnd`,
      });
    }
    if (!hasProvenance(t.source)) {
      issues.push({ code: 'MISSING_PROVENANCE', message: `technologies/${t.id}: missing source` });
    }
  }

  for (const d of dataset.diseases) {
    registerId(d.id, 'diseases');
    try {
      assertValidRange(d.range);
    } catch (err) {
      issues.push({
        code: 'INVALID_RANGE',
        message: `diseases/${d.id}: ${(err as Error).message}`,
      });
    }
    if (!hasProvenance(d.source)) {
      issues.push({ code: 'MISSING_PROVENANCE', message: `diseases/${d.id}: missing source` });
    }
  }

  for (const l of dataset.laws) {
    registerId(l.id, 'laws');
    try {
      assertValidRange(l.range);
    } catch (err) {
      issues.push({
        code: 'INVALID_RANGE',
        message: `laws/${l.id}: ${(err as Error).message}`,
      });
    }
    if (!entityIds.has(l.politicalEntityId)) {
      issues.push({
        code: 'DANGLING_REF',
        message: `laws/${l.id}: unknown entity "${l.politicalEntityId}"`,
      });
    }
    if (!hasProvenance(l.source)) {
      issues.push({ code: 'MISSING_PROVENANCE', message: `laws/${l.id}: missing source` });
    }
  }

  for (const e of dataset.events) {
    registerId(e.id, 'events');
    try {
      assertValidRange(e.range);
    } catch (err) {
      issues.push({
        code: 'INVALID_RANGE',
        message: `events/${e.id}: ${(err as Error).message}`,
      });
    }
    for (const lid of e.locationIds) {
      if (!locationIds.has(lid)) {
        issues.push({ code: 'DANGLING_REF', message: `events/${e.id}: unknown location "${lid}"` });
      }
    }
    for (const pid of e.politicalEntityIds) {
      if (!entityIds.has(pid)) {
        issues.push({ code: 'DANGLING_REF', message: `events/${e.id}: unknown entity "${pid}"` });
      }
    }
    if (!hasProvenance(e.source)) {
      issues.push({ code: 'MISSING_PROVENANCE', message: `events/${e.id}: missing source` });
    }
  }

  return issues;
}

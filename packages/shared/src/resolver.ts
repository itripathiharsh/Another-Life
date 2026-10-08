import type { DateISO, PoliticalControlRecord } from './types';
import { assertValidDate, withinRange } from './temporal';

/**
 * Resolve which political entity controls a location at a given date.
 * Core building block of the Historical Context Resolver (Phase 2.5 §4).
 * Deterministic: same inputs → same output. Returns undefined when no record
 * covers the date (caller must treat that as "unsupported", never invent).
 */
export function resolvePoliticalControl(
  date: DateISO,
  locationId: string,
  records: readonly PoliticalControlRecord[],
): PoliticalControlRecord | undefined {
  assertValidDate(date);
  return records.find(
    (r) => r.locationId === locationId && withinRange(date, r.range),
  );
}

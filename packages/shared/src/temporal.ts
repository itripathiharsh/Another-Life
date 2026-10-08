import type { DateISO, DateRange } from './types';

/** ISO "YYYY-MM-DD" strings compare correctly lexicographically. */
export function withinRange(date: DateISO, range: DateRange): boolean {
  return range.from <= date && date <= range.until;
}

/** Validate basic ISO date shape. Throws on malformed input — bad data must fail loudly. */
export function assertValidDate(date: DateISO): void {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`Invalid DateISO: "${date}" (expected YYYY-MM-DD)`);
  }
  const [, m = 0, d = 0] = date.split('-').map(Number);
  if (m === undefined || d === undefined || m < 1 || m > 12 || d < 1 || d > 31) {
    throw new Error(`Invalid DateISO: "${date}" (month/day out of range)`);
  }
}

export function assertValidRange(range: DateRange): void {
  assertValidDate(range.from);
  assertValidDate(range.until);
  if (range.from > range.until) {
    throw new Error(`Invalid DateRange: from ${range.from} is after until ${range.until}`);
  }
}

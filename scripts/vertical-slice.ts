// Stage 3 proof runner: executes one full Lucknow 1946 life headlessly,
// prints the timeline, and writes docs/proofs/vertical-slice-1946.md.
// Run: npm run slice (tsx, D-drive cache). No UI — log output only.
// Content (dataset, templates, notes) comes from @legacylife/content.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  LUCKNOW_LIFE_TEMPLATES,
  lucknowYearNotes,
} from '../packages/content/src/index';
import { runLife } from '../packages/simulation/src/index';

const result = runLife({
  seed: 19460301,
  name: 'Slice Person',
  birthDate: '1946-03-01',
  locationId: 'location.lucknow',
  classId: 'class.middle',
  schoolStartAge: 6,
  schoolEndAge: 14,
  workStartAge: 18,
  occupationId: 'occupation.government_clerk',
  yearlyIncome: 180,
  yearlyExpenses: 120,
  templates: LUCKNOW_LIFE_TEMPLATES,
  historicalNotes: lucknowYearNotes,
  friendName: 'Mohan',
});

for (const line of result.timeline) console.log(line);
console.log(`\nDied age ${result.deathAge} (${result.cause}); events: ${result.eventCount}; wealth: ${result.finalWealth}`);
console.log(`Legacy: ${result.legacy.summary}`);

const md = [
  '# Vertical Slice Proof — Lucknow 1946 life (Stage 3)',
  '',
  `Seed 19460301 · deterministic (same seed → identical timeline, asserted in tests).`,
  `Died age ${result.deathAge} (${result.cause}) · ${result.eventCount} life events · final wealth ${result.finalWealth}.`,
  '',
  `Legacy: ${result.legacy.summary}`,
  '',
  `Dimensions: family ${result.legacy.dimensions.family}, economic ${result.legacy.dimensions.economic}, social ${result.legacy.dimensions.social}, institutional ${result.legacy.dimensions.institutional}, historical ${result.legacy.dimensions.historical}.`,
  '',
  '## Timeline',
  '',
  ...result.timeline.map((line) => `- ${line}`),
  '',
].join('\n');

mkdirSync(join(process.cwd(), 'docs', 'proofs'), { recursive: true });
writeFileSync(join(process.cwd(), 'docs', 'proofs', 'vertical-slice-1946.md'), md);
console.log('\nWrote docs/proofs/vertical-slice-1946.md');

// SEED DATA PACK — Lucknow region political control, 1945–1970 (MVP slice).
// This is DATA, not engine logic. Replaced/expanded by the full Stage 1 dataset.
//
// Provenance:
// - British Raj over the United Provinces until 14 Aug 1947.
// - Independence of India: 15 Aug 1947 (Dominion of India).
// - Constitution of India came into force: 26 Jan 1950 (Republic of India).

import type { PoliticalControlRecord, PoliticalEntity } from '../types';

export const LUCKNOW_REGION_POLITICAL_ENTITIES: PoliticalEntity[] = [
  {
    id: 'political.british_raj',
    name: 'British Raj (United Provinces)',
    type: 'colonial_administration',
    range: { from: '1858-11-01', until: '1947-08-14' },
  },
  {
    id: 'political.dominion_india',
    name: 'Dominion of India',
    type: 'dominion',
    range: { from: '1947-08-15', until: '1950-01-25' },
  },
  {
    id: 'political.republic_india',
    name: 'Republic of India',
    type: 'republic',
    range: { from: '1950-01-26', until: '2100-12-31' },
  },
];

export const LUCKNOW_REGION_CONTROL: PoliticalControlRecord[] = [
  {
    locationId: 'location.lucknow',
    entityId: 'political.british_raj',
    range: { from: '1945-01-01', until: '1947-08-14' },
    source: 'Indian Independence Act 1947; standard chronology',
    confidence: 'high',
  },
  {
    locationId: 'location.lucknow',
    entityId: 'political.dominion_india',
    range: { from: '1947-08-15', until: '1950-01-25' },
    source: 'Indian Independence Act 1947',
    confidence: 'high',
  },
  {
    locationId: 'location.lucknow',
    entityId: 'political.republic_india',
    range: { from: '1950-01-26', until: '1970-12-31' },
    source: 'Constitution of India, in force 26 January 1950',
    confidence: 'high',
  },
];

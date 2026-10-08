// DATA PACK — Lucknow region MVP slice, 1945–1970 (Stage 1).
// DATA, not engine logic. Every item carries provenance; uncertain items
// are marked medium/low confidence per Phase 3 §39-41.
// Scope per p7 §44: 5 locations, 8 occupations, 12 historical events,
// 5 classes, 10 technologies, 6 diseases, 5 laws.

import type {
  HistoricalEventEntity,
  LocationEntity,
  PoliticalControlRecord,
  PoliticalEntity,
} from '../../../shared/src/types';
import type {
  DiseaseEntity,
  LawEntity,
  OccupationEntity,
  SocialClassEntity,
  TechnologyEntity,
} from '../entities';

const WINDOW = { from: '1945-01-01', until: '1970-12-31' } as const;

export const LUCKNOW_LOCATIONS: LocationEntity[] = [
  {
    id: 'location.lucknow',
    name: 'Lucknow',
    type: 'city',
    coordinates: { lat: 26.85, lon: 80.95 },
    regionId: 'region.awadh',
  },
  {
    id: 'location.kanpur',
    name: 'Kanpur',
    type: 'city',
    coordinates: { lat: 26.45, lon: 80.33 },
    regionId: 'region.awadh',
  },
  {
    id: 'location.prayagraj',
    name: 'Prayagraj',
    type: 'city',
    coordinates: { lat: 25.45, lon: 81.85 },
    regionId: 'region.awadh',
    historicalNames: [
      { name: 'Allahabad', range: { from: '1858-01-01', until: '2018-10-15' } },
    ],
  },
  {
    id: 'location.delhi',
    name: 'Delhi',
    type: 'capital',
    coordinates: { lat: 28.61, lon: 77.21 },
    regionId: 'region.delhi',
  },
  {
    id: 'location.awadh_rural',
    name: 'Awadh Rural (Barabanki surrounds)',
    type: 'rural_region',
    coordinates: { lat: 26.9, lon: 81.2 },
    regionId: 'region.awadh',
  },
];

export const LUCKNOW_POLITICAL_ENTITIES: PoliticalEntity[] = [
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

function controlFor(locationId: string): PoliticalControlRecord[] {
  return [
    {
      locationId,
      entityId: 'political.british_raj',
      range: { from: WINDOW.from, until: '1947-08-14' },
      source: 'Indian Independence Act 1947; standard chronology',
      confidence: 'high',
    },
    {
      locationId,
      entityId: 'political.dominion_india',
      range: { from: '1947-08-15', until: '1950-01-25' },
      source: 'Indian Independence Act 1947',
      confidence: 'high',
    },
    {
      locationId,
      entityId: 'political.republic_india',
      range: { from: '1950-01-26', until: WINDOW.until },
      source: 'Constitution of India, in force 26 January 1950',
      confidence: 'high',
    },
  ];
}

export const LUCKNOW_CONTROL: PoliticalControlRecord[] = LUCKNOW_LOCATIONS.flatMap((l) =>
  controlFor(l.id),
);

export const LUCKNOW_CLASSES: SocialClassEntity[] = [
  {
    id: 'class.landed_elite', name: 'Landed elite / taluqdars', range: { ...WINDOW },
    regionIds: ['region.awadh'], rights: ['land ownership', 'local influence'],
    restrictions: ['declining revenue rights after 1952'], wealthRange: 'high',
    commonOccupationIds: ['occupation.small_business_owner'],
    educationAccess: 'private tutors, college', politicalAccess: 'high (declining after 1947)',
    socialMobility: ['marriage', 'politics'],
    source: 'p7 MVP content spec; UP zamindari abolition history', confidence: 'medium',
  },
  {
    id: 'class.professional', name: 'Professionals', range: { ...WINDOW },
    regionIds: ['region.awadh', 'region.delhi'], rights: ['college education', 'associations'],
    restrictions: [], wealthRange: 'upper-middle',
    commonOccupationIds: ['occupation.professional', 'occupation.teacher'],
    educationAccess: 'college', politicalAccess: 'medium-high',
    socialMobility: ['education', 'profession'],
    source: 'p7 MVP content spec; standard UP urban structure 1940s-60s', confidence: 'medium',
  },
  {
    id: 'class.middle', name: 'Middle (clerks, teachers, traders)', range: { ...WINDOW },
    regionIds: ['region.awadh', 'region.delhi'], rights: ['schooling', 'municipal jobs'],
    restrictions: [], wealthRange: 'middle',
    commonOccupationIds: ['occupation.government_clerk', 'occupation.teacher', 'occupation.shopkeeper'],
    educationAccess: 'school, some college', politicalAccess: 'medium',
    socialMobility: ['education', 'government service', 'trade'],
    source: 'p7 MVP content spec; standard UP urban structure 1940s-60s', confidence: 'medium',
  },
  {
    id: 'class.working', name: 'Working class', range: { ...WINDOW },
    regionIds: ['region.awadh', 'region.delhi'], rights: ['wage labour', 'unions (growing)'],
    restrictions: ['insecure income'], wealthRange: 'low-middle',
    commonOccupationIds: ['occupation.factory_worker', 'occupation.skilled_tradesperson'],
    educationAccess: 'primary school', politicalAccess: 'low-medium',
    socialMobility: ['trade union', 'skill training'],
    source: 'p7 MVP content spec; Kanpur industrial labour history', confidence: 'medium',
  },
  {
    id: 'class.peasantry', name: 'Peasantry / landless labour', range: { ...WINDOW },
    regionIds: ['region.awadh'], rights: ['tenancy (expanding after 1952)'],
    restrictions: ['debt', 'seasonal work'], wealthRange: 'low',
    commonOccupationIds: ['occupation.agricultural_worker'],
    educationAccess: 'limited', politicalAccess: 'low',
    socialMobility: ['land reform', 'migration to city'],
    source: 'UP Zamindari Abolition and Land Reforms Act 1950; p7 spec', confidence: 'medium',
  },
];

const OCC_PROVENANCE = {
  source: 'p7 MVP content spec §§15,41; standard occupational structure of UP towns 1940s-60s',
  confidence: 'medium' as const,
};

export const LUCKNOW_OCCUPATIONS: OccupationEntity[] = [
  {
    id: 'occupation.agricultural_worker', name: 'Agricultural worker',
    range: { ...WINDOW }, locationIds: ['location.awadh_rural'],
    educationRequired: 'none', skillRequirements: ['farming'],
    incomeRange: 'low, seasonal', socialClassIds: ['class.peasantry'],
    description: 'Tenant, sharecropper, or landless labourer in Awadh villages.',
    ...OCC_PROVENANCE,
  },
  {
    id: 'occupation.factory_worker', name: 'Factory worker',
    range: { ...WINDOW }, locationIds: ['location.kanpur', 'location.lucknow'],
    educationRequired: 'primary', skillRequirements: ['mill work'],
    incomeRange: 'low-middle, monthly wage', socialClassIds: ['class.working'],
    description: 'Textile, leather, or ordnance-factory worker (Kanpur industrial belt).',
    ...OCC_PROVENANCE,
  },
  {
    id: 'occupation.government_clerk', name: 'Government clerk',
    range: { ...WINDOW },
    locationIds: ['location.lucknow', 'location.prayagraj', 'location.delhi', 'location.kanpur'],
    educationRequired: 'matriculation', skillRequirements: ['literacy', 'bookkeeping'],
    incomeRange: 'middle, stable salary', socialClassIds: ['class.middle'],
    description: 'Babu in district courts, railways, post, or secretariat.',
    ...OCC_PROVENANCE,
  },
  {
    id: 'occupation.teacher', name: 'Teacher',
    range: { ...WINDOW },
    locationIds: ['location.lucknow', 'location.kanpur', 'location.prayagraj', 'location.awadh_rural'],
    educationRequired: 'intermediate / training', skillRequirements: ['literacy', 'teaching'],
    incomeRange: 'middle, modest salary', socialClassIds: ['class.middle', 'class.professional'],
    description: 'Primary or secondary school teacher.',
    ...OCC_PROVENANCE,
  },
  {
    id: 'occupation.shopkeeper', name: 'Shopkeeper',
    range: { ...WINDOW },
    locationIds: ['location.lucknow', 'location.kanpur', 'location.prayagraj', 'location.delhi'],
    educationRequired: 'basic literacy', skillRequirements: ['trade', 'credit management'],
    incomeRange: 'middle, variable', socialClassIds: ['class.middle'],
    description: 'Bazaar provisions, cloth, or grain trader.',
    ...OCC_PROVENANCE,
  },
  {
    id: 'occupation.skilled_tradesperson', name: 'Skilled tradesperson',
    range: { ...WINDOW },
    locationIds: ['location.lucknow', 'location.kanpur', 'location.awadh_rural'],
    educationRequired: 'apprenticeship', skillRequirements: ['masonry/carpentry/tailoring'],
    incomeRange: 'low-middle, piece rates', socialClassIds: ['class.working'],
    description: 'Mason, carpenter, tailor, or metalworker.',
    ...OCC_PROVENANCE,
  },
  {
    id: 'occupation.small_business_owner', name: 'Small business owner',
    range: { ...WINDOW },
    locationIds: ['location.lucknow', 'location.kanpur', 'location.delhi'],
    educationRequired: 'varied', skillRequirements: ['capital', 'management'],
    incomeRange: 'middle-high, variable', socialClassIds: ['class.middle', 'class.landed_elite'],
    description: 'Workshop, transport, or trading-firm owner.',
    ...OCC_PROVENANCE,
  },
  {
    id: 'occupation.professional', name: 'Doctor / lawyer / engineer',
    range: { ...WINDOW },
    locationIds: ['location.lucknow', 'location.delhi', 'location.prayagraj', 'location.kanpur'],
    educationRequired: 'college degree', skillRequirements: ['professional qualification'],
    incomeRange: 'upper-middle to high', socialClassIds: ['class.professional'],
    description: 'College-educated professional in city practice or service.',
    ...OCC_PROVENANCE,
  },
];

const TECH_PROVENANCE = {
  source: 'Standard technological history of India 1900-1970; p7 tech list',
  confidence: 'medium' as const,
};

export const LUCKNOW_TECHNOLOGIES: TechnologyEntity[] = [
  { id: 'tech.railways', name: 'Railways', category: 'transport', discoveredDate: '1853-04-16', adoptionStart: '1900-01-01', adoptionEnd: '2100-12-31', regionIds: ['region.awadh', 'region.delhi'], prerequisites: [], effects: ['migration', 'trade', 'job access'], ...TECH_PROVENANCE },
  { id: 'tech.radio', name: 'Radio broadcasting', category: 'communication', discoveredDate: '1927-01-01', adoptionStart: '1936-01-01', adoptionEnd: '2100-12-31', regionIds: ['region.awadh', 'region.delhi'], prerequisites: ['electricity'], effects: ['news spreads fast', 'event awareness'], ...TECH_PROVENANCE },
  { id: 'tech.print_press', name: 'Print press / newspapers', category: 'communication', discoveredDate: '1820-01-01', adoptionStart: '1900-01-01', adoptionEnd: '2100-12-31', regionIds: ['region.awadh', 'region.delhi'], prerequisites: [], effects: ['literacy matters', 'political awareness'], ...TECH_PROVENANCE },
  { id: 'tech.electric_light', name: 'Electric lighting', category: 'energy', discoveredDate: '1905-01-01', adoptionStart: '1930-01-01', adoptionEnd: '2100-12-31', regionIds: ['region.awadh', 'region.delhi'], prerequisites: [], effects: ['urban evening economy'], ...TECH_PROVENANCE },
  { id: 'tech.telephone', name: 'Telephone', category: 'communication', discoveredDate: '1882-01-01', adoptionStart: '1940-01-01', adoptionEnd: '2100-12-31', regionIds: ['region.delhi'], prerequisites: [], effects: ['elite/admin communication'], ...TECH_PROVENANCE },
  { id: 'tech.cinema', name: 'Cinema', category: 'other', discoveredDate: '1913-01-01', adoptionStart: '1940-01-01', adoptionEnd: '2100-12-31', regionIds: ['region.awadh', 'region.delhi'], prerequisites: [], effects: ['leisure', 'culture exposure'], ...TECH_PROVENANCE },
  { id: 'tech.motor_bus', name: 'Motor bus / truck', category: 'transport', discoveredDate: '1920-01-01', adoptionStart: '1945-01-01', adoptionEnd: '2100-12-31', regionIds: ['region.awadh', 'region.delhi'], prerequisites: [], effects: ['short migration', 'goods transport'], ...TECH_PROVENANCE },
  { id: 'tech.bicycle', name: 'Bicycle', category: 'transport', discoveredDate: '1890-01-01', adoptionStart: '1920-01-01', adoptionEnd: '2100-12-31', regionIds: ['region.awadh', 'region.delhi'], prerequisites: [], effects: ['commuting range'], ...TECH_PROVENANCE },
  { id: 'tech.antibiotics', name: 'Antibiotics (penicillin era)', category: 'medicine', discoveredDate: '1944-01-01', adoptionStart: '1948-01-01', adoptionEnd: '2100-12-31', regionIds: ['region.awadh', 'region.delhi'], prerequisites: [], effects: ['lower infection mortality'], ...TECH_PROVENANCE },
  { id: 'tech.tubewell', name: 'Tubewell irrigation', category: 'agriculture', discoveredDate: '1950-01-01', adoptionStart: '1960-01-01', adoptionEnd: '2100-12-31', regionIds: ['region.awadh'], prerequisites: [], effects: ['crop yields', 'rural income'], ...TECH_PROVENANCE },
];

const DISEASE_PROVENANCE = {
  source: 'Standard public-health history of India 1940s-60s; represent risks, not case counts',
  confidence: 'medium' as const,
};

export const LUCKNOW_DISEASES: DiseaseEntity[] = [
  { id: 'disease.smallpox', name: 'Smallpox', range: { ...WINDOW }, regionIds: ['region.awadh', 'region.delhi'], transmission: 'airborne/droplet', severity: 'high', mortality: 'high (pre-eradication)', riskFactors: ['crowding'], treatment: 'supportive; vaccination (expanding)', prevention: 'vaccination', ...DISEASE_PROVENANCE },
  { id: 'disease.cholera', name: 'Cholera', range: { ...WINDOW }, regionIds: ['region.awadh'], transmission: 'contaminated water', severity: 'high', mortality: 'medium-high without treatment', riskFactors: ['monsoon', 'poor sanitation'], treatment: 'rehydration', prevention: 'clean water', ...DISEASE_PROVENANCE },
  { id: 'disease.malaria', name: 'Malaria', range: { ...WINDOW }, regionIds: ['region.awadh'], transmission: 'mosquito', severity: 'medium', mortality: 'medium', riskFactors: ['stagnant water', 'monsoon'], treatment: 'quinine/chloroquine era drugs', prevention: 'mosquito control', ...DISEASE_PROVENANCE },
  { id: 'disease.tuberculosis', name: 'Tuberculosis', range: { ...WINDOW }, regionIds: ['region.awadh', 'region.delhi'], transmission: 'airborne', severity: 'medium-high', mortality: 'medium', riskFactors: ['crowding', 'malnutrition'], treatment: 'long rest/antibiotic era care', prevention: 'case finding', ...DISEASE_PROVENANCE },
  { id: 'disease.typhoid', name: 'Typhoid', range: { ...WINDOW }, regionIds: ['region.awadh'], transmission: 'contaminated food/water', severity: 'medium', mortality: 'medium', riskFactors: ['poor sanitation'], treatment: 'antibiotics (era-dependent)', prevention: 'clean food/water', ...DISEASE_PROVENANCE },
  { id: 'disease.influenza', name: 'Influenza', range: { ...WINDOW }, regionIds: ['region.awadh', 'region.delhi'], transmission: 'airborne', severity: 'low-medium', mortality: 'low (higher in famines/epidemics)', riskFactors: ['crowding', 'winter'], treatment: 'supportive', prevention: 'isolation/rest', ...DISEASE_PROVENANCE },
];

export const LUCKNOW_LAWS: LawEntity[] = [
  {
    id: 'law.independence_act_1947', name: 'Indian Independence Act 1947',
    description: 'Parliamentary act creating the Dominions of India and Pakistan.',
    politicalEntityId: 'political.dominion_india',
    range: { from: '1947-08-15', until: '1950-01-25' },
    affectedRegionIds: ['region.awadh', 'region.delhi'], affectedClassIds: [],
    penalties: 'constitutional — n/a',
    source: 'Indian Independence Act 1947', confidence: 'high',
  },
  {
    id: 'law.constitution_1950', name: 'Constitution of India (in force)',
    description: 'Republic constitution; fundamental rights and citizenship framework.',
    politicalEntityId: 'political.republic_india',
    range: { from: '1950-01-26', until: '2100-12-31' },
    affectedRegionIds: ['region.awadh', 'region.delhi'], affectedClassIds: [],
    penalties: 'per statute',
    source: 'Constitution of India, adopted 1949-11-26, in force 1950-01-26', confidence: 'high',
  },
  {
    id: 'law.zamindari_abolition_1950', name: 'UP Zamindari Abolition and Land Reforms Act 1950',
    description: 'Abolishes zamindari interests in UP; effective 1 July 1952.',
    politicalEntityId: 'political.republic_india',
    range: { from: '1952-07-01', until: '2100-12-31' },
    affectedRegionIds: ['region.awadh'], affectedClassIds: ['class.landed_elite', 'class.peasantry'],
    penalties: 'land vesting per act',
    source: 'UP Act I of 1951 (passed Dec 1950/Jan 1951; effective 1 July 1952)',
    confidence: 'high', datePrecision: 'year',
  },
  {
    id: 'law.hindu_marriage_1955', name: 'Hindu Marriage Act 1955',
    description: 'Codifies Hindu marriage law (monogamy, divorce provisions).',
    politicalEntityId: 'political.republic_india',
    range: { from: '1955-05-18', until: '2100-12-31' },
    affectedRegionIds: ['region.awadh', 'region.delhi'], affectedClassIds: [],
    penalties: 'per statute',
    source: 'Hindu Marriage Act 1955 (Act 25 of 1955)', confidence: 'high',
  },
  {
    id: 'law.factories_act_1948', name: 'Factories Act 1948',
    description: 'Regulates factory labour: hours, safety, leave.',
    politicalEntityId: 'political.dominion_india',
    range: { from: '1948-04-01', until: '2100-12-31' },
    affectedRegionIds: ['region.awadh'], affectedClassIds: ['class.working'],
    penalties: 'fines per statute',
    source: 'Factories Act 1948 (Act 63 of 1948)', confidence: 'high',
  },
];

const ALL_LOCATIONS = [
  'location.lucknow',
  'location.kanpur',
  'location.prayagraj',
  'location.delhi',
  'location.awadh_rural',
];

export const LUCKNOW_EVENTS: HistoricalEventEntity[] = [
  {
    id: 'event.ww2_end_1945', name: 'End of World War II',
    range: { from: '1945-05-08', until: '1945-09-02' },
    locationIds: ALL_LOCATIONS, politicalEntityIds: ['political.british_raj'],
    status: 'observable', description: 'War in Europe ends May 1945; Japan surrenders August-September 1945. Demobilisation, shortages, and political expectations rise in UP.',
    source: 'Standard WWII chronology', confidence: 'high',
  },
  {
    id: 'event.independence_1947', name: 'Independence of India',
    range: { from: '1947-08-15', until: '1947-08-15' },
    locationIds: ALL_LOCATIONS, politicalEntityIds: ['political.dominion_india'],
    status: 'fixed', description: 'Transfer of power; Dominion of India created. Celebrations alongside Partition turmoil elsewhere.',
    source: 'Indian Independence Act 1947', confidence: 'high',
  },
  {
    id: 'event.partition_effects_1947', name: 'Partition displacement reaches UP',
    range: { from: '1947-08-01', until: '1948-03-31' },
    locationIds: ['location.lucknow', 'location.kanpur', 'location.delhi', 'location.prayagraj'],
    politicalEntityIds: ['political.dominion_india'],
    status: 'observable', description: 'Refugee arrivals, housing pressure, and communal tension affect cities; effects vary by neighbourhood and occupation.',
    source: 'Standard Partition historiography; local effects vary — marked medium confidence',
    confidence: 'medium',
  },
  {
    id: 'event.gandhi_assassination_1948', name: 'Assassination of M. K. Gandhi',
    range: { from: '1948-01-30', until: '1948-01-30' },
    locationIds: ALL_LOCATIONS, politicalEntityIds: ['political.dominion_india'],
    status: 'fixed', description: 'National mourning; hartals and processions in UP towns.',
    source: 'Standard chronology: 30 January 1948', confidence: 'high',
  },
  {
    id: 'event.republic_day_1950', name: 'India becomes a republic',
    range: { from: '1950-01-26', until: '1950-01-26' },
    locationIds: ALL_LOCATIONS, politicalEntityIds: ['political.republic_india'],
    status: 'fixed', description: 'Constitution in force; Dominion becomes Republic.',
    source: 'Constitution of India, in force 26 January 1950', confidence: 'high',
  },
  {
    id: 'event.first_plan_1951', name: 'First Five-Year Plan begins',
    range: { from: '1951-04-01', until: '1956-03-31' },
    locationIds: ALL_LOCATIONS, politicalEntityIds: ['political.republic_india'],
    status: 'observable', description: 'Planning-era public works, irrigation, and community development reach districts unevenly.',
    source: 'First Five-Year Plan (1951-56)', confidence: 'high',
  },
  {
    id: 'event.first_general_election', name: 'First general election polling',
    range: { from: '1951-10-25', until: '1952-02-21' },
    locationIds: ALL_LOCATIONS, politicalEntityIds: ['political.republic_india'],
    status: 'observable', description: 'Universal-franchise polling in stages; campaign activity in cities and rural Awadh.',
    source: 'Election Commission: polling Oct 1951-Feb 1952', confidence: 'high',
  },
  {
    id: 'event.zamindari_abolition_effect', name: 'Zamindari abolition takes effect in UP',
    range: { from: '1952-07-01', until: '1954-12-31' },
    locationIds: ['location.awadh_rural', 'location.lucknow'],
    politicalEntityIds: ['political.republic_india'],
    status: 'influenceable', description: 'Tenure changes, compensation claims, and tenancy disputes reshape village hierarchy.',
    source: 'UP Zamindari Abolition effective 1 July 1952', confidence: 'medium',
  },
  {
    id: 'event.second_general_election_1957', name: 'Second general election',
    range: { from: '1957-02-24', until: '1957-03-14' },
    locationIds: ALL_LOCATIONS, politicalEntityIds: ['political.republic_india'],
    status: 'observable', description: 'Second Lok Sabha polls; local Congress and opposition campaigning.',
    source: 'Election Commission: Feb-Mar 1957', confidence: 'high',
  },
  {
    id: 'event.sino_indian_war_1962', name: 'Sino-Indian War',
    range: { from: '1962-10-20', until: '1962-11-21' },
    locationIds: ['location.delhi', 'location.lucknow', 'location.kanpur'],
    politicalEntityIds: ['political.republic_india'],
    status: 'observable', description: 'Border war; defence collections, price rises, and recruitment drives felt in cities.',
    source: 'Standard chronology Oct-Nov 1962', confidence: 'high',
  },
  {
    id: 'event.indo_pak_war_1965', name: 'Indo-Pakistani War of 1965',
    range: { from: '1965-08-05', until: '1965-09-23' },
    locationIds: ['location.delhi', 'location.lucknow', 'location.kanpur', 'location.prayagraj'],
    politicalEntityIds: ['political.republic_india'],
    status: 'observable', description: 'Blackouts, civil defence, and wartime shortages in north Indian cities.',
    source: 'Standard chronology Aug-Sep 1965', confidence: 'high',
  },
  {
    id: 'event.green_revolution_early', name: 'Early Green Revolution in UP',
    range: { from: '1966-01-01', until: '1970-12-31' },
    locationIds: ['location.awadh_rural', 'location.kanpur'],
    politicalEntityIds: ['political.republic_india'],
    status: 'influenceable', description: 'High-yield seeds, fertiliser, and tubewells spread unevenly; early adopters gain, others face debt risk.',
    source: 'Agricultural history: HYV spread from mid-1960s; local adoption varies — medium confidence',
    confidence: 'medium',
  },
];

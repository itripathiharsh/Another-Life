// Content pack: Victorian Industrial Britain (1840–1890).
// Multi-Era Expansion (Option C). Complete historical dataset,
// timeline history lookups, and life event templates.

import type {
  DateRange,
  HistoricalEventEntity,
  LocationEntity,
  PoliticalControlRecord,
  PoliticalEntity,
} from '../../shared/src/types';
import type {
  DiseaseEntity,
  HistoricalDataset,
  LawEntity,
  OccupationEntity,
  SocialClassEntity,
  TechnologyEntity,
} from '../../historical/src/index';
import { resolveHistoricalContext } from '../../historical/src/index';
import type { SimEventTemplate } from '../../simulation/src/events';

const WINDOW: DateRange = { from: '1840-01-01', until: '1890-12-31' };

export const VICTORIAN_LOCATIONS: LocationEntity[] = [
  {
    id: 'location.london',
    name: 'London',
    type: 'capital',
    coordinates: { lat: 51.5074, lon: -0.1278 },
    regionId: 'region.england',
  },
  {
    id: 'location.manchester',
    name: 'Manchester',
    type: 'city',
    coordinates: { lat: 53.4808, lon: -2.2426 },
    regionId: 'region.england',
  },
  {
    id: 'location.birmingham',
    name: 'Birmingham',
    type: 'city',
    coordinates: { lat: 52.4862, lon: -1.8904 },
    regionId: 'region.midlands',
  },
  {
    id: 'location.glasgow',
    name: 'Glasgow',
    type: 'city',
    coordinates: { lat: 55.8642, lon: -4.2518 },
    regionId: 'region.scotland',
  },
  {
    id: 'location.yorkshire',
    name: 'Yorkshire (Leeds & West Riding)',
    type: 'rural_region',
    coordinates: { lat: 53.8008, lon: -1.5491 },
    regionId: 'region.england',
  },
];

export const VICTORIAN_POLITICAL_ENTITIES: PoliticalEntity[] = [
  {
    id: 'political.victorian_uk',
    name: 'United Kingdom of Great Britain and Ireland (Victorian Era)',
    type: 'kingdom',
    range: { from: '1837-06-20', until: '1901-01-22' },
  },
];

function controlFor(locationId: string): PoliticalControlRecord[] {
  return [
    {
      locationId,
      entityId: 'political.victorian_uk',
      range: { from: WINDOW.from, until: WINDOW.until },
      source: 'Accession of Queen Victoria 1837; Act of Union 1800',
      confidence: 'high',
    },
  ];
}

export const VICTORIAN_CONTROL: PoliticalControlRecord[] = [
  ...controlFor('location.london'),
  ...controlFor('location.manchester'),
  ...controlFor('location.birmingham'),
  ...controlFor('location.glasgow'),
  ...controlFor('location.yorkshire'),
];

export const VICTORIAN_HISTORICAL_EVENTS: HistoricalEventEntity[] = [
  {
    id: 'evt.hist.mines_act_1842',
    name: 'Mines and Collieries Act 1842',
    range: { from: '1842-08-10', until: '1842-12-31' },
    locationIds: ['location.london', 'location.manchester', 'location.birmingham', 'location.glasgow', 'location.yorkshire'],
    politicalEntityIds: ['political.victorian_uk'],
    status: 'fixed',
    description: 'Parliament prohibits underground employment of women and boys under ten in all coal mines.',
    source: 'Statutes at Large 1842; Hansard',
    confidence: 'high',
  },
  {
    id: 'evt.hist.railway_mania',
    name: 'Railway Mania Speculative Boom',
    range: { from: '1845-01-01', until: '1847-12-31' },
    locationIds: ['location.london', 'location.manchester', 'location.birmingham', 'location.glasgow', 'location.yorkshire'],
    politicalEntityIds: ['political.victorian_uk'],
    status: 'fixed',
    description: 'Speculative frenzy grips British investors as thousands of miles of new rail lines are chartered.',
    source: 'Railway Regulation Acts; Financial Times Historical Archive',
    confidence: 'high',
  },
  {
    id: 'evt.hist.great_exhibition',
    name: 'The Great Exhibition of 1851 at Crystal Palace',
    range: { from: '1851-05-01', until: '1851-10-15' },
    locationIds: ['location.london'],
    politicalEntityIds: ['political.victorian_uk'],
    status: 'fixed',
    description: 'Prince Albert inaugurates the Crystal Palace exhibition showcasing industrial triumphs of the world.',
    source: 'Official Catalogue of the Great Exhibition 1851',
    confidence: 'high',
  },
  {
    id: 'evt.hist.broad_street_cholera',
    name: 'Broad Street Cholera Outbreak',
    range: { from: '1854-08-31', until: '1854-11-30' },
    locationIds: ['location.london'],
    politicalEntityIds: ['political.victorian_uk'],
    status: 'fixed',
    description: 'Dr. John Snow maps cholera clusters to the Broad Street pump handle, pioneering epidemiology.',
    source: 'Snow J. On the Mode of Communication of Cholera 1855',
    confidence: 'high',
  },
  {
    id: 'evt.hist.great_stink',
    name: 'The Great Stink & Thames Embankment Construction',
    range: { from: '1858-07-01', until: '1865-12-31' },
    locationIds: ['location.london'],
    politicalEntityIds: ['political.victorian_uk'],
    status: 'fixed',
    description: 'Intense summer heat causes untreated sewage in River Thames to overwhelm Parliament, prompting Bazalgette sewer construction.',
    source: 'Metropolitan Board of Works records; The Times July 1858',
    confidence: 'high',
  },
  {
    id: 'evt.hist.forster_act',
    name: 'Elementary Education Act 1870 (Forster Act)',
    range: { from: '1870-08-09', until: '1870-12-31' },
    locationIds: ['location.london', 'location.manchester', 'location.birmingham', 'location.glasgow', 'location.yorkshire'],
    politicalEntityIds: ['political.victorian_uk'],
    status: 'fixed',
    description: 'Creates framework for universal elementary schooling across England and Wales.',
    source: 'Elementary Education Act 1870 (33 & 34 Vict. c. 75)',
    confidence: 'high',
  },
  {
    id: 'evt.hist.matchgirls_strike',
    name: 'Bryant & May Matchgirls Strike',
    range: { from: '1888-07-02', until: '1888-08-01' },
    locationIds: ['location.london'],
    politicalEntityIds: ['political.victorian_uk'],
    status: 'fixed',
    description: 'Fourteen hundred women and girls strike against white phosphorus poisoning (phossy jaw) and starvation wages.',
    source: 'Besant A. The Link 1888; Trade Union Congress archives',
    confidence: 'high',
  },
];

export const VICTORIAN_OCCUPATIONS: OccupationEntity[] = [
  {
    id: 'occupation.mill_operative',
    name: 'Cotton Mill Operative',
    range: WINDOW,
    locationIds: ['location.manchester', 'location.yorkshire', 'location.glasgow'],
    educationRequired: 'none',
    skillRequirements: ['dexterity', 'machinery_handling'],
    incomeRange: '40-65 coins/year',
    socialClassIds: ['class.victorian_working'],
    description: 'Tends mechanical weaving looms and spinning mules in steam-powered textile mills.',
    source: '1851 Census of Great Britain; Engels Condition of the Working Class 1845',
    confidence: 'high',
  },
  {
    id: 'occupation.locomotive_stoker',
    name: 'Railway Locomotive Fireman / Stoker',
    range: { from: '1842-01-01', until: '1890-12-31' },
    locationIds: ['location.london', 'location.manchester', 'location.birmingham', 'location.glasgow', 'location.yorkshire'],
    educationRequired: 'basic_literacy',
    skillRequirements: ['stamina', 'steam_boiler_safety'],
    incomeRange: '65-95 coins/year',
    socialClassIds: ['class.victorian_working'],
    description: 'Shovels coal into steam engine furnaces powering passenger expresses and freight wagons.',
    source: 'Great Western Railway records; Railway Regulation Acts',
    confidence: 'high',
  },
  {
    id: 'occupation.commercial_clerk',
    name: 'City Commercial Clerk',
    range: WINDOW,
    locationIds: ['location.london', 'location.manchester', 'location.birmingham', 'location.glasgow'],
    educationRequired: 'secondary_school',
    skillRequirements: ['bookkeeping', 'calligraphy', 'arithmetic'],
    incomeRange: '90-140 coins/year',
    socialClassIds: ['class.victorian_middle'],
    description: 'Maintains double-entry ledgers, bills of exchange, and correspondence in merchant counting houses.',
    source: 'Booth Life and Labour of the People in London; Victorian clerk archives',
    confidence: 'high',
  },
  {
    id: 'occupation.schoolmaster',
    name: 'Board Schoolmaster',
    range: WINDOW,
    locationIds: ['location.london', 'location.manchester', 'location.birmingham', 'location.glasgow', 'location.yorkshire'],
    educationRequired: 'teacher_college',
    skillRequirements: ['instruction', 'latin', 'penmanship'],
    incomeRange: '80-120 coins/year',
    socialClassIds: ['class.victorian_middle'],
    description: 'Instructs parish and board pupils in reading, writing, scripture, and arithmetic.',
    source: 'Forster Education Act records 1870',
    confidence: 'high',
  },
  {
    id: 'occupation.solicitor',
    name: 'Victorian Solicitor & Attorney',
    range: WINDOW,
    locationIds: ['location.london', 'location.manchester', 'location.birmingham', 'location.glasgow'],
    educationRequired: 'legal_apprenticeship',
    skillRequirements: ['contracts', 'property_law', 'advocacy'],
    incomeRange: '250-500 coins/year',
    socialClassIds: ['class.victorian_professional'],
    description: 'Drafts wills, contracts, real estate conveyances, and corporate charters for prominent citizens.',
    source: 'Law Society Archives London; Solicitors Act 1843',
    confidence: 'high',
  },
  {
    id: 'occupation.mill_owner',
    name: 'Factory Proprietor & Mill Owner',
    range: WINDOW,
    locationIds: ['location.manchester', 'location.birmingham', 'location.glasgow', 'location.yorkshire'],
    educationRequired: 'commercial_patrimony',
    skillRequirements: ['capital_management', 'trade_negotiation'],
    incomeRange: '600-2000 coins/year',
    socialClassIds: ['class.victorian_industrialist'],
    description: 'Directs capital investments, exports, and industrial steam-driven enterprises.',
    source: 'Manchester Chamber of Commerce records 1850–1880',
    confidence: 'high',
  },
];

export const VICTORIAN_CLASSES: SocialClassEntity[] = [
  {
    id: 'class.victorian_working',
    name: 'Working Class (Artisans & Millhands)',
    range: WINDOW,
    regionIds: ['region.england', 'region.midlands', 'region.scotland'],
    rights: ['chartist_petition', 'trade_union_association_post_1871'],
    restrictions: ['property_franchise_limited_until_1867'],
    commonOccupationIds: ['occupation.mill_operative', 'occupation.locomotive_stoker'],
    educationAccess: 'ragged_schools_and_board_schools',
    politicalAccess: 'limited_franchise_reform_acts',
    socialMobility: ['guild_craftsmanship', 'clerking'],
    source: 'Parliamentary Reform Acts 1832/1867; British Labor History',
    confidence: 'high',
  },
  {
    id: 'class.victorian_middle',
    name: 'Middle Class (Clerks & Shopkeepers)',
    range: WINDOW,
    regionIds: ['region.england', 'region.midlands', 'region.scotland'],
    rights: ['full_parliamentary_vote', 'commercial_contract_freedom'],
    restrictions: ['gentleman_club_exclusion'],
    commonOccupationIds: ['occupation.commercial_clerk', 'occupation.schoolmaster'],
    educationAccess: 'grammar_schools_and_academies',
    politicalAccess: 'enfranchised_voters',
    socialMobility: ['partnership', 'civic_alderman'],
    source: 'Victorian Middle Class Studies; 1867 Reform Act',
    confidence: 'high',
  },
  {
    id: 'class.victorian_professional',
    name: 'Professional Class (Solicitors & Doctors)',
    range: WINDOW,
    regionIds: ['region.england', 'region.midlands', 'region.scotland'],
    rights: ['universal_property_franchise', 'magistracy_eligibility'],
    restrictions: ['titled_peerage_elevation_unlikely'],
    commonOccupationIds: ['occupation.solicitor', 'occupation.schoolmaster'],
    educationAccess: 'oxford_cambridge_london_university',
    politicalAccess: 'borough_councillors_and_mps',
    socialMobility: ['judiciary', 'fellowship'],
    source: 'Medical Act 1858; Law Society records',
    confidence: 'high',
  },
  {
    id: 'class.victorian_industrialist',
    name: 'Industrialist Elite & Gentry',
    range: WINDOW,
    regionIds: ['region.england', 'region.midlands', 'region.scotland'],
    rights: ['complete_franchise', 'house_of_commons_seat'],
    restrictions: ['none'],
    commonOccupationIds: ['occupation.mill_owner'],
    educationAccess: 'public_schools_eton_harrow_universities',
    politicalAccess: 'parliamentary_influence',
    socialMobility: ['knighthood', 'peerage'],
    source: 'Burke Landed Gentry; British Industrial History',
    confidence: 'high',
  },
];

export const VICTORIAN_TECHNOLOGIES: TechnologyEntity[] = [
  {
    id: 'tech.steam_railways',
    name: 'Intercity Steam Railway Network',
    category: 'transport',
    discoveredDate: '1830-09-15',
    adoptionStart: '1840-01-01',
    adoptionEnd: '1860-12-31',
    regionIds: ['region.england', 'region.midlands', 'region.scotland'],
    prerequisites: ['steam_engine'],
    effects: ['rapid_commodity_freight', 'commuter_suburbs'],
    source: 'Railway Mania records; Stephenson Locomotive heritage',
    confidence: 'high',
  },
  {
    id: 'tech.electric_telegraph',
    name: 'Cooke-Wheatstone Electric Telegraph',
    category: 'communication',
    discoveredDate: '1837-07-25',
    adoptionStart: '1845-01-01',
    adoptionEnd: '1870-12-31',
    regionIds: ['region.england', 'region.midlands', 'region.scotland'],
    prerequisites: ['battery', 'electromagnetism'],
    effects: ['instant_market_pricing', 'railway_signaling_safety'],
    source: 'Post Office Telecommunications archives',
    confidence: 'high',
  },
  {
    id: 'tech.bessemer_process',
    name: 'Bessemer Steel Conversion',
    category: 'manufacturing',
    discoveredDate: '1856-08-11',
    adoptionStart: '1860-01-01',
    adoptionEnd: '1885-12-31',
    regionIds: ['region.england', 'region.midlands', 'region.scotland'],
    prerequisites: ['blast_furnace'],
    effects: ['cheap_structural_steel', 'steel_ships'],
    source: 'Bessemer Patent 1856; British Iron and Steel Institute',
    confidence: 'high',
  },
];

export const VICTORIAN_DISEASES: DiseaseEntity[] = [
  {
    id: 'disease.cholera_victorian',
    name: 'Asiatic Cholera',
    range: { from: '1840-01-01', until: '1870-12-31' },
    regionIds: ['region.england', 'region.midlands', 'region.scotland'],
    transmission: 'contaminated_well_water',
    severity: 'severe',
    mortality: 'high',
    riskFactors: ['drinking_raw_well_water', 'lack_of_sewers'],
    treatment: 'hydration_rest',
    prevention: 'boiling_water_closed_sewerage',
    source: 'Dr. John Snow 1854 Broad Street Investigation; Registrar General records',
    confidence: 'high',
  },
  {
    id: 'disease.consumption_victorian',
    name: 'Consumption (Pulmonary Tuberculosis)',
    range: WINDOW,
    regionIds: ['region.england', 'region.midlands', 'region.scotland'],
    transmission: 'airborne_droplets',
    severity: 'chronic',
    mortality: 'high',
    riskFactors: ['crowded_tenements', 'cotton_mill_dust'],
    treatment: 'sanatorium_fresh_air',
    prevention: 'ventilation',
    source: 'Victorian Public Health Reports; Chadwick 1842 Report',
    confidence: 'high',
  },
];

export const VICTORIAN_LAWS: LawEntity[] = [
  {
    id: 'law.mines_act_1842',
    name: 'Mines and Collieries Act 1842',
    description: 'Prohibits all underground mine work for women and boys under 10.',
    politicalEntityId: 'political.victorian_uk',
    range: { from: '1842-08-10', until: '1890-12-31' },
    affectedRegionIds: ['region.england', 'region.midlands', 'region.scotland'],
    affectedClassIds: ['class.victorian_working'],
    penalties: 'Fines on colliery owners and supervisors',
    source: 'UK Parliament Statutes at Large 1842',
    confidence: 'high',
  },
  {
    id: 'law.factory_ten_hours_1847',
    name: 'Factories Act 1847 (Ten Hours Act)',
    description: 'Restricts work hours of women and young persons under 18 in textile mills to 10 hours per day.',
    politicalEntityId: 'political.victorian_uk',
    range: { from: '1847-06-08', until: '1890-12-31' },
    affectedRegionIds: ['region.england', 'region.midlands', 'region.scotland'],
    affectedClassIds: ['class.victorian_working'],
    penalties: 'Factory inspector citations and financial fines',
    source: 'Factory Acts Chronology; Hansard Debates 1847',
    confidence: 'high',
  },
  {
    id: 'law.forster_act_1870',
    name: 'Elementary Education Act 1870',
    description: 'Mandates creation of local school boards to establish elementary schooling nationwide.',
    politicalEntityId: 'political.victorian_uk',
    range: { from: '1870-08-09', until: '1890-12-31' },
    affectedRegionIds: ['region.england', 'region.midlands', 'region.scotland'],
    affectedClassIds: ['class.victorian_working', 'class.victorian_middle'],
    penalties: 'Civil inspection orders',
    source: 'Elementary Education Act 1870 (33 & 34 Vict. c. 75)',
    confidence: 'high',
  },
];

export const VICTORIAN_DATASET: HistoricalDataset = {
  locations: VICTORIAN_LOCATIONS,
  politicalEntities: VICTORIAN_POLITICAL_ENTITIES,
  controlRecords: VICTORIAN_CONTROL,
  events: VICTORIAN_HISTORICAL_EVENTS,
  occupations: VICTORIAN_OCCUPATIONS,
  classes: VICTORIAN_CLASSES,
  technologies: VICTORIAN_TECHNOLOGIES,
  diseases: VICTORIAN_DISEASES,
  laws: VICTORIAN_LAWS,
};

function addYearsLocal(dateISO: string, years: number): string {
  const [y = 0, m = 1, d = 1] = dateISO.split('-').map(Number);
  const pad = (n: number): string => String(n).padStart(2, '0');
  return `${y + years}-${pad(m)}-${pad(d)}`;
}

export function victorianYearNotes(date: string, locationId: string): string[] {
  const yearEnd = addYearsLocal(date, 1);
  const out: string[] = [];
  const ctx = resolveHistoricalContext(date, locationId, VICTORIAN_DATASET);
  if (ctx?.politicalEntity) out.push(`Crown: ${ctx.politicalEntity.name}`);
  for (const e of VICTORIAN_DATASET.events) {
    if (e.locationIds.includes(locationId) && e.range.from <= yearEnd && date <= e.range.until) {
      out.push(`Historical event: ${e.name} (${e.range.from})`);
    }
  }
  return out;
}

export const VICTORIAN_LIFE_TEMPLATES: SimEventTemplate[] = [
  {
    id: 'evt.vic.soot_cough',
    title: 'Factory Smoke & Winter Chill',
    description: 'Thick coal smog from industrial chimneys settles heavily over the city streets.',
    requirements: [
      { field: 'age', op: '>=', value: 4 },
      { field: 'age', op: '<=', value: 9 },
    ],
    choices: [
      {
        id: 'evt.vic.soot_cough.remedy',
        eventId: 'evt.vic.soot_cough',
        title: 'Purchase apothecary herbal syrup and warm coals',
        requirements: [],
        baseProbability: 80,
        consequences: [
          { target: 'player', property: 'wealth', op: 'ADD', value: -15, timing: 'immediate', visibility: 'visible', source: 'evt.vic.soot_cough' },
          { target: 'player', property: 'health', op: 'ADD', value: 12, timing: 'immediate', visibility: 'visible', source: 'evt.vic.soot_cough' },
        ],
      },
    ],
  },
  {
    id: 'evt.vic.ragged_school',
    title: 'Parish School Examination',
    description: 'The schoolmaster tests your recitation of arithmetic, grammar, and church catechism.',
    requirements: [
      { field: 'age', op: '>=', value: 8 },
      { field: 'age', op: '<=', value: 10 },
    ],
    choices: [
      {
        id: 'evt.vic.ragged_school.diligence',
        eventId: 'evt.vic.ragged_school',
        title: 'Recite verses flawlessly before the school board inspector',
        requirements: [],
        baseProbability: 85,
        consequences: [
          { target: 'player', property: 'reputation', op: 'ADD', value: 10, timing: 'immediate', visibility: 'visible', source: 'evt.vic.ragged_school' },
        ],
      },
    ],
  },
  {
    id: 'evt.vic.youth_foundry',
    title: 'Adolescent Craft Indenture',
    description: 'At age fifteen, an opportunity arises to enter a bonded apprenticeship or merchant counting house.',
    requirements: [
      { field: 'age', op: '>=', value: 15 },
      { field: 'age', op: '<=', value: 16 },
    ],
    choices: [
      {
        id: 'evt.vic.youth_foundry.clerk',
        eventId: 'evt.vic.youth_foundry',
        title: 'Enter counting house as junior ledger clerk',
        requirements: [],
        baseProbability: 85,
        consequences: [
          { target: 'player', property: 'wealth', op: 'ADD', value: 25, timing: 'immediate', visibility: 'visible', source: 'evt.vic.youth_foundry' },
          { target: 'player', property: 'reputation', op: 'ADD', value: 8, timing: 'immediate', visibility: 'visible', source: 'evt.vic.youth_foundry' },
        ],
      },
      {
        id: 'evt.vic.youth_foundry.mechanic',
        eventId: 'evt.vic.youth_foundry',
        title: 'Apprentice at the steam engine locomotive works',
        requirements: [],
        baseProbability: 80,
        consequences: [
          { target: 'player', property: 'wealth', op: 'ADD', value: 20, timing: 'immediate', visibility: 'visible', source: 'evt.vic.youth_foundry' },
          { target: 'world', property: 'flag:railway_craft', op: 'SET', value: 1, timing: 'immediate', visibility: 'hidden', source: 'evt.vic.youth_foundry' },
        ],
      },
    ],
  },
  {
    id: 'evt.vic.railway_mania',
    title: '1845 Railway Share Speculation',
    description: 'Speculative frenzy grips the exchange. Friends urge you to buy scrip in new rail lines.',
    requirements: [
      { field: 'age', op: '>=', value: 20 },
      { field: 'wealth', op: '>=', value: 50 },
    ],
    choices: [
      {
        id: 'evt.vic.railway_mania.speculate',
        eventId: 'evt.vic.railway_mania',
        title: 'Subscribe 50 coins for Great Northern Railway scrip',
        requirements: [{ field: 'wealth', op: '>=', value: 50 }],
        baseProbability: 60,
        consequences: [
          { target: 'player', property: 'wealth', op: 'ADD', value: 90, timing: 'immediate', visibility: 'visible', source: 'evt.vic.railway_mania' },
          { target: 'player', property: 'reputation', op: 'ADD', value: 12, timing: 'immediate', visibility: 'visible', source: 'evt.vic.railway_mania' },
        ],
      },
      {
        id: 'evt.vic.railway_mania.abstain',
        eventId: 'evt.vic.railway_mania',
        title: 'Decline cautiously and protect cash reserves',
        requirements: [],
        baseProbability: 95,
        consequences: [
          { target: 'player', property: 'reputation', op: 'ADD', value: 4, timing: 'immediate', visibility: 'visible', source: 'evt.vic.railway_mania' },
        ],
      },
    ],
  },
  {
    id: 'evt.vic.great_exhibition',
    title: '1851 Crystal Palace Great Exhibition',
    description: 'The monumental cast-iron and glass Crystal Palace in Hyde Park displays wondrous inventions.',
    requirements: [
      { field: 'age', op: '>=', value: 16 },
      { field: 'date', op: 'includes', value: '1851' },
    ],
    choices: [
      {
        id: 'evt.vic.great_exhibition.visit',
        eventId: 'evt.vic.great_exhibition',
        title: 'Take an excursion train to marvel at the industrial machinery',
        requirements: [],
        baseProbability: 90,
        consequences: [
          { target: 'player', property: 'wealth', op: 'ADD', value: -10, timing: 'immediate', visibility: 'visible', source: 'evt.vic.great_exhibition' },
          { target: 'player', property: 'reputation', op: 'ADD', value: 15, timing: 'immediate', visibility: 'visible', source: 'evt.vic.great_exhibition' },
        ],
      },
    ],
  },
  {
    id: 'evt.vic.broad_street',
    title: '1854 Broad Street Cholera Sanitary Alarm',
    description: 'A sudden outbreak strikes the district. Dr. Snow warns against unboiled municipal well pumps.',
    requirements: [
      { field: 'age', op: '>=', value: 18 },
      { field: 'date', op: 'includes', value: '1854' },
    ],
    choices: [
      {
        id: 'evt.vic.broad_street.boil',
        eventId: 'evt.vic.broad_street',
        title: 'Boil all household cistern water and distribute clean lime wash',
        requirements: [],
        baseProbability: 90,
        consequences: [
          { target: 'player', property: 'health', op: 'ADD', value: 15, timing: 'immediate', visibility: 'visible', source: 'evt.vic.broad_street' },
          { target: 'player', property: 'wealth', op: 'ADD', value: -12, timing: 'immediate', visibility: 'visible', source: 'evt.vic.broad_street' },
        ],
      },
    ],
  },
  {
    id: 'evt.vic.great_stink',
    title: '1858 The Great Stink of the Thames',
    description: 'Noxious river vapors permeate the Houses of Parliament. Lime-soaked curtains barely hold back the stench.',
    requirements: [
      { field: 'age', op: '>=', value: 20 },
      { field: 'date', op: 'includes', value: '1858' },
    ],
    choices: [
      {
        id: 'evt.vic.great_stink.sewer_bond',
        eventId: 'evt.vic.great_stink',
        title: 'Support the Metropolitan Board of Works sewer infrastructure loan',
        requirements: [],
        baseProbability: 85,
        consequences: [
          { target: 'player', property: 'wealth', op: 'ADD', value: -20, timing: 'immediate', visibility: 'visible', source: 'evt.vic.great_stink' },
          { target: 'player', property: 'reputation', op: 'ADD', value: 18, timing: 'immediate', visibility: 'visible', source: 'evt.vic.great_stink' },
        ],
      },
    ],
  },
  {
    id: 'evt.vic.marriage_proposal',
    title: 'Victorian Parlor Betrothal',
    description: 'With social respectability established, an honorable match is arranged amidst family tea.',
    requirements: [{ field: 'age', op: '>=', value: 23 }],
    choices: [
      {
        id: 'evt.vic.marriage_proposal.accept',
        eventId: 'evt.vic.marriage_proposal',
        title: 'Celebrate marriage in the parish church',
        requirements: [],
        baseProbability: 92,
        consequences: [
          { target: 'family', property: 'add_spouse', op: 'SET', value: 'Spouse', timing: 'immediate', visibility: 'visible', source: 'evt.vic.marriage_proposal' },
          { target: 'world', property: 'flag:married', op: 'SET', value: 1, timing: 'immediate', visibility: 'hidden', source: 'evt.vic.marriage_proposal' },
          { target: 'player', property: 'reputation', op: 'ADD', value: 15, timing: 'immediate', visibility: 'visible', source: 'evt.vic.marriage_proposal' },
        ],
      },
    ],
  },
  {
    id: 'evt.vic.first_child',
    title: 'Birth of a Victorian Heir',
    description: 'A new child is christened in the parish register, blessing your family home.',
    requirements: [
      { field: 'married', op: '==', value: 1 },
      { field: 'age', op: '>=', value: 25 },
    ],
    choices: [
      {
        id: 'evt.vic.first_child.welcome',
        eventId: 'evt.vic.first_child',
        title: 'Host a festive christening gathering for kith and kin',
        requirements: [],
        baseProbability: 95,
        consequences: [
          { target: 'family', property: 'add_child', op: 'SET', value: 'Child', timing: 'immediate', visibility: 'visible', source: 'evt.vic.first_child' },
          { target: 'player', property: 'wealth', op: 'ADD', value: -15, timing: 'immediate', visibility: 'visible', source: 'evt.vic.first_child' },
        ],
      },
    ],
  },
  {
    id: 'evt.vic.mill_share',
    title: 'Steam Engine Partnership',
    description: 'A commercial associate invites you to co-finance a steam-powered textile warehouse.',
    requirements: [
      { field: 'age', op: '>=', value: 28 },
      { field: 'wealth', op: '>=', value: 250 },
    ],
    choices: [
      {
        id: 'evt.vic.mill_share.invest',
        eventId: 'evt.vic.mill_share',
        title: 'Invest 250 coins into steam machinery shares',
        requirements: [],
        baseProbability: 70,
        consequences: [
          { target: 'player', property: 'wealth', op: 'ADD', value: 380, timing: 'immediate', visibility: 'visible', source: 'evt.vic.mill_share' },
          { target: 'player', property: 'reputation', op: 'ADD', value: 20, timing: 'immediate', visibility: 'visible', source: 'evt.vic.mill_share' },
        ],
      },
    ],
  },
  {
    id: 'evt.vic.matchgirls_relief',
    title: '1888 Matchgirls Solidarity Relief',
    description: 'The East End matchgirls strike draws nationwide attention against industrial abuses.',
    requirements: [
      { field: 'age', op: '>=', value: 22 },
      { field: 'date', op: 'includes', value: '1888' },
    ],
    choices: [
      {
        id: 'evt.vic.matchgirls_relief.donate',
        eventId: 'evt.vic.matchgirls_relief',
        title: 'Contribute coins to the strike hardship strike fund',
        requirements: [],
        baseProbability: 88,
        consequences: [
          { target: 'player', property: 'wealth', op: 'ADD', value: -25, timing: 'immediate', visibility: 'visible', source: 'evt.vic.matchgirls_relief' },
          { target: 'player', property: 'reputation', op: 'ADD', value: 16, timing: 'immediate', visibility: 'visible', source: 'evt.vic.matchgirls_relief' },
        ],
      },
    ],
  },
];

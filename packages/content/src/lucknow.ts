// Content registry, set "lucknow-slice-v1" (Stage 3/4).
// DATA only: assembled Lucknow dataset, life-event templates, and the
// year-window history lookup. Simulation types are imported type-only —
// no runtime cycle with @legacylife/simulation.

import type { SimEventTemplate } from '../../simulation/src/events';
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
  type HistoricalDataset,
} from '../../historical/src/index';

export const LUCKNOW_DATASET: HistoricalDataset = {
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

function addYearsLocal(dateISO: string, years: number): string {
  const [y = 0, m = 1, d = 1] = dateISO.split('-').map(Number);
  const pad = (n: number): string => String(n).padStart(2, '0');
  return `${y + years}-${pad(m)}-${pad(d)}`;
}

/** Notes for the whole life-year starting at `date` (yearly ticks would
 *  otherwise skip single-day events like 1947-08-15). */
export function lucknowYearNotes(date: string, locationId: string): string[] {
  const yearEnd = addYearsLocal(date, 1);
  const out: string[] = [];
  const ctx = resolveHistoricalContext(date, locationId, LUCKNOW_DATASET);
  if (ctx?.politicalEntity) out.push(`Control: ${ctx.politicalEntity.name}`);
  for (const e of LUCKNOW_DATASET.events) {
    if (e.locationIds.includes(locationId) && e.range.from <= yearEnd && date <= e.range.until) {
      out.push(`Historical event: ${e.name} (${e.range.from})`);
    }
  }
  return out;
}

export const LUCKNOW_LIFE_TEMPLATES: SimEventTemplate[] = [
  {
    id: 'evt.childhood_illness',
    title: 'Childhood fever',
    description: 'A seasonal fever keeps the child in bed.',
    requirements: [
      { field: 'age', op: '>=', value: 4 },
      { field: 'age', op: '<=', value: 10 },
    ],
    choices: [{
      id: 'evt.childhood_illness.doctor', eventId: 'evt.childhood_illness',
      title: 'See the doctor', requirements: [], baseProbability: 70,
      consequences: [
        { target: 'player', property: 'wealth', op: 'ADD', value: -20, timing: 'immediate', visibility: 'visible', source: 'evt.childhood_illness' },
        { target: 'player', property: 'health', op: 'ADD', value: 10, timing: 'immediate', visibility: 'visible', source: 'evt.childhood_illness' },
      ],
    }],
  },
  {
    id: 'evt.school_lesson',
    title: 'School Examination',
    description: 'The schoolmaster tests your class on reading, calligraphy, and arithmetic.',
    requirements: [
      { field: 'age', op: '>=', value: 8 },
      { field: 'age', op: '<=', value: 9 },
    ],
    choices: [
      {
        id: 'evt.school_lesson.study', eventId: 'evt.school_lesson',
        title: 'Study hard and excel', requirements: [], baseProbability: 80,
        consequences: [
          { target: 'player', property: 'reputation', op: 'ADD', value: 5, timing: 'immediate', visibility: 'visible', source: 'evt.school_lesson' },
        ],
      },
      {
        id: 'evt.school_lesson.play', eventId: 'evt.school_lesson',
        title: 'Play with classmates instead', requirements: [], baseProbability: 85,
        consequences: [
          { target: 'relationship', property: 'trust', op: 'ADD', value: 10, timing: 'hidden', visibility: 'hidden', source: 'evt.school_lesson', relationshipId: 'rel.friend' },
        ],
      },
    ],
  },
  {
    id: 'evt.partition_relief',
    title: '1947 Refugee Relief at Charbagh',
    description: 'Following Independence and Partition, trains arrive at Charbagh Railway Station bearing thousands of displaced families needing urgent aid.',
    requirements: [
      { field: 'date', op: 'includes', value: '1947' },
      { field: 'age', op: '>=', value: 8 },
    ],
    choices: [
      {
        id: 'evt.partition_relief.volunteer', eventId: 'evt.partition_relief',
        title: 'Volunteer with community relief society distributing food and clean water',
        requirements: [], baseProbability: 90,
        consequences: [
          { target: 'player', property: 'reputation', op: 'ADD', value: 15, timing: 'immediate', visibility: 'visible', source: 'evt.partition_relief' },
        ],
      },
      {
        id: 'evt.partition_relief.donate', eventId: 'evt.partition_relief',
        title: 'Contribute family savings to shelter funds',
        requirements: [{ field: 'wealth', op: '>=', value: 15 }], baseProbability: 95,
        consequences: [
          { target: 'player', property: 'wealth', op: 'ADD', value: -15, timing: 'immediate', visibility: 'visible', source: 'evt.partition_relief' },
          { target: 'player', property: 'reputation', op: 'ADD', value: 20, timing: 'immediate', visibility: 'visible', source: 'evt.partition_relief' },
        ],
      },
    ],
  },
  {
    id: 'evt.republic_day_1950',
    title: '1950 Republic Day Proclamation',
    description: 'On 26 January 1950, the Constitution of India takes effect. Bells ring across Lucknow and public grounds celebrate the sovereign Republic.',
    requirements: [
      { field: 'date', op: 'includes', value: '1950' },
      { field: 'age', op: '>=', value: 6 },
    ],
    choices: [
      {
        id: 'evt.republic_day_1950.attend', eventId: 'evt.republic_day_1950',
        title: 'Attend public parade and pledge civic commitment',
        requirements: [], baseProbability: 95,
        consequences: [
          { target: 'player', property: 'reputation', op: 'ADD', value: 10, timing: 'immediate', visibility: 'visible', source: 'evt.republic_day_1950' },
        ],
      },
    ],
  },
  {
    id: 'evt.general_election_1952',
    title: '1952 Historic First Lok Sabha General Election',
    description: 'Universal adult suffrage is exercised for the first time in Indian history. Polling booths open with pictorial ballot boxes across Awadh.',
    requirements: [
      { field: 'date', op: 'includes', value: '1952' },
      { field: 'age', op: '>=', value: 21 },
    ],
    choices: [
      {
        id: 'evt.general_election_1952.vote', eventId: 'evt.general_election_1952',
        title: 'Cast democratic ballot and guide elderly neighbours to the voting booth',
        requirements: [], baseProbability: 90,
        consequences: [
          { target: 'player', property: 'reputation', op: 'ADD', value: 12, timing: 'immediate', visibility: 'visible', source: 'evt.general_election_1952' },
        ],
      },
      {
        id: 'evt.general_election_1952.civic_literacy', eventId: 'evt.general_election_1952',
        title: 'Organise tea-stall civic literacy circle on candidate manifestos',
        requirements: [], baseProbability: 85,
        consequences: [
          { target: 'player', property: 'reputation', op: 'ADD', value: 18, timing: 'immediate', visibility: 'visible', source: 'evt.general_election_1952' },
          { target: 'player', property: 'wealth', op: 'ADD', value: -10, timing: 'immediate', visibility: 'visible', source: 'evt.general_election_1952' },
        ],
      },
    ],
  },
  {
    id: 'evt.aminabad_mushaira_1953',
    title: '1953 Aminabad Literary Mushaira',
    description: 'The storied cultural salons of Lucknow host an evening of exquisite Urdu and Hindi poetry under chandeliers.',
    requirements: [
      { field: 'date', op: 'includes', value: '1953' },
      { field: 'age', op: '>=', value: 14 },
    ],
    choices: [
      {
        id: 'evt.aminabad_mushaira_1953.recite', eventId: 'evt.aminabad_mushaira_1953',
        title: 'Recite classic nazms and engage the literati in conversation',
        requirements: [], baseProbability: 85,
        consequences: [
          { target: 'player', property: 'reputation', op: 'ADD', value: 14, timing: 'immediate', visibility: 'visible', source: 'evt.aminabad_mushaira_1953' },
        ],
      },
    ],
  },
  {
    id: 'evt.kumbh_mela_1954',
    title: '1954 Prayagraj Kumbh Mela Pilgrimage',
    description: 'Millions converge upon the holy Triveni Sangam in nearby Allahabad for the sacred bath.',
    requirements: [
      { field: 'date', op: 'includes', value: '1954' },
      { field: 'age', op: '>=', value: 18 },
    ],
    choices: [
      {
        id: 'evt.kumbh_mela_1954.volunteer', eventId: 'evt.kumbh_mela_1954',
        title: 'Volunteer with the Seva Samiti civil relief squad to manage crowd safety',
        requirements: [], baseProbability: 88,
        consequences: [
          { target: 'player', property: 'reputation', op: 'ADD', value: 16, timing: 'immediate', visibility: 'visible', source: 'evt.kumbh_mela_1954' },
          { target: 'player', property: 'health', op: 'ADD', value: 5, timing: 'immediate', visibility: 'visible', source: 'evt.kumbh_mela_1954' },
        ],
      },
    ],
  },
  {
    id: 'evt.youth_apprentice_choice',
    title: 'Adolescent Direction',
    description: 'At age 15, your family discusses whether you should assist a local craftsman or focus on scholarship.',
    requirements: [
      { field: 'age', op: '>=', value: 15 },
      { field: 'age', op: '<=', value: 16 },
    ],
    choices: [
      {
        id: 'evt.youth_apprentice_choice.trade', eventId: 'evt.youth_apprentice_choice',
        title: 'Apprentice at the trade workshop', requirements: [], baseProbability: 85,
        consequences: [
          { target: 'player', property: 'wealth', op: 'ADD', value: 15, timing: 'immediate', visibility: 'visible', source: 'evt.youth_apprentice_choice' },
          { target: 'world', property: 'flag:trade_experience', op: 'SET', value: 1, timing: 'immediate', visibility: 'hidden', source: 'evt.youth_apprentice_choice' },
        ],
      },
      {
        id: 'evt.youth_apprentice_choice.scholar', eventId: 'evt.youth_apprentice_choice',
        title: 'Continue scholarly studies', requirements: [], baseProbability: 80,
        consequences: [
          { target: 'player', property: 'reputation', op: 'ADD', value: 10, timing: 'immediate', visibility: 'visible', source: 'evt.youth_apprentice_choice' },
          { target: 'world', property: 'flag:scholar_path', op: 'SET', value: 1, timing: 'immediate', visibility: 'hidden', source: 'evt.youth_apprentice_choice' },
        ],
      },
    ],
  },
  {
    id: 'evt.help_friend',
    title: 'Friend asks for help',
    description: 'A friend needs money for his shop.',
    requirements: [{ field: 'age', op: '>=', value: 20 }],
    choices: [{
      id: 'evt.help_friend.help', eventId: 'evt.help_friend',
      title: 'Help with savings', requirements: [{ field: 'wealth', op: '>=', value: 50 }],
      baseProbability: 90,
      consequences: [
        { target: 'player', property: 'wealth', op: 'ADD', value: -50, timing: 'immediate', visibility: 'visible', source: 'evt.help_friend' },
        { target: 'relationship', property: 'trust', op: 'ADD', value: 20, timing: 'hidden', visibility: 'hidden', source: 'evt.help_friend', relationshipId: 'rel.friend' },
        { target: 'world', property: 'flag:helpedFriend', op: 'SET', value: 1, timing: 'immediate', visibility: 'hidden', source: 'evt.help_friend' },
      ],
    }],
  },
  {
    id: 'evt.invest',
    title: 'Investment opportunity',
    description: 'A relative proposes a joint trading venture.',
    requirements: [
      { field: 'age', op: '>=', value: 28 },
      { field: 'wealth', op: '>=', value: 200 },
    ],
    choices: [{
      id: 'evt.invest.invest', eventId: 'evt.invest',
      title: 'Invest savings', requirements: [], baseProbability: 60,
      consequences: [
        { target: 'player', property: 'wealth', op: 'ADD', value: -200, timing: 'immediate', visibility: 'visible', source: 'evt.invest' },
        { target: 'world', property: 'flag:invested', op: 'SET', value: 1, timing: 'immediate', visibility: 'hidden', source: 'evt.invest' },
        { target: 'world', property: 'followup', op: 'SET', value: 'evt.invest_review', timing: 'delayed', visibility: 'hidden', source: 'evt.invest', delayCondition: 'age>=30' },
      ],
    }],
  },
  {
    id: 'evt.invest_review',
    title: 'Investment matures',
    description: 'The venture returns its outcome.',
    requirements: [
      { field: 'invested', op: '==', value: 1 },
      { field: 'age', op: '>=', value: 30 },
    ],
    choices: [{
      id: 'evt.invest_review.collect', eventId: 'evt.invest_review',
      title: 'Collect returns', requirements: [], baseProbability: 55,
      consequences: [
        { target: 'player', property: 'wealth', op: 'ADD', value: 350, timing: 'immediate', visibility: 'visible', source: 'evt.invest_review' },
      ],
    }],
  },
  {
    id: 'evt.gomti_flood_1960',
    title: '1960 Gomti River Monsoon Flood',
    description: 'Torrents of torrential rain cause the Gomti River to burst its banks, threatening low-lying neighborhoods.',
    requirements: [
      { field: 'date', op: 'includes', value: '1960' },
      { field: 'age', op: '>=', value: 16 },
    ],
    choices: [
      {
        id: 'evt.gomti_flood_1960.sandbag', eventId: 'evt.gomti_flood_1960',
        title: 'Stack sandbags along the Daliganj embankment and safeguard neighborhood granaries',
        requirements: [], baseProbability: 85,
        consequences: [
          { target: 'player', property: 'reputation', op: 'ADD', value: 15, timing: 'immediate', visibility: 'visible', source: 'evt.gomti_flood_1960' },
        ],
      },
    ],
  },
  {
    id: 'evt.sino_indian_1962',
    title: '1962 Himalayan Border Crisis',
    description: 'Tensions flare on the northern frontier. Citizens throughout Uttar Pradesh rally to support the National Defence Fund.',
    requirements: [
      { field: 'date', op: 'includes', value: '1962' },
      { field: 'age', op: '>=', value: 18 },
    ],
    choices: [
      {
        id: 'evt.sino_indian_1962.donate', eventId: 'evt.sino_indian_1962',
        title: 'Donate coins and warm woollen blankets to the Defence Fund',
        requirements: [{ field: 'wealth', op: '>=', value: 25 }], baseProbability: 95,
        consequences: [
          { target: 'player', property: 'wealth', op: 'ADD', value: -25, timing: 'immediate', visibility: 'visible', source: 'evt.sino_indian_1962' },
          { target: 'player', property: 'reputation', op: 'ADD', value: 20, timing: 'immediate', visibility: 'visible', source: 'evt.sino_indian_1962' },
        ],
      },
      {
        id: 'evt.sino_indian_1962.civil_defense', eventId: 'evt.sino_indian_1962',
        title: 'Enrol in local Civil Defence auxiliary brigade',
        requirements: [], baseProbability: 85,
        consequences: [
          { target: 'player', property: 'reputation', op: 'ADD', value: 12, timing: 'immediate', visibility: 'visible', source: 'evt.sino_indian_1962' },
        ],
      },
    ],
  },
  {
    id: 'evt.war_hardship',
    title: '1965 Wartime Shortages & Blackouts',
    description: 'Conflict brings air-raid blackouts and rising food prices across the northern plains.',
    requirements: [{ field: 'date', op: 'includes', value: '1965' }],
    choices: [{
      id: 'evt.war_hardship.belt', eventId: 'evt.war_hardship',
      title: 'Tighten belt and volunteer as neighborhood blackout warden', requirements: [], baseProbability: 85,
      consequences: [
        { target: 'player', property: 'wealth', op: 'ADD', value: -30, timing: 'immediate', visibility: 'visible', source: 'evt.war_hardship' },
        { target: 'player', property: 'reputation', op: 'ADD', value: 15, timing: 'immediate', visibility: 'visible', source: 'evt.war_hardship' },
      ],
    }],
  },
  {
    id: 'evt.green_rev_1966',
    title: '1966 Green Revolution Agricultural Innovation',
    description: 'Agricultural research institutes introduce high-yielding wheat varieties and tube-well irrigation to boost regional harvests.',
    requirements: [
      { field: 'date', op: 'includes', value: '1966' },
      { field: 'age', op: '>=', value: 22 },
    ],
    choices: [
      {
        id: 'evt.green_rev_1966.adopt', eventId: 'evt.green_rev_1966',
        title: 'Co-finance modern seeds and canal water shares with local farmers',
        requirements: [{ field: 'wealth', op: '>=', value: 80 }], baseProbability: 75,
        consequences: [
          { target: 'player', property: 'wealth', op: 'ADD', value: 120, timing: 'immediate', visibility: 'visible', source: 'evt.green_rev_1966' },
          { target: 'player', property: 'reputation', op: 'ADD', value: 18, timing: 'immediate', visibility: 'visible', source: 'evt.green_rev_1966' },
        ],
      },
    ],
  },
  {
    id: 'evt.bank_national_1969',
    title: '1969 Bank Nationalisation & Commercial Account',
    description: 'Fourteen major commercial banks are nationalised, opening formal banking counters to common citizens and artisans in Hazratganj.',
    requirements: [
      { field: 'date', op: 'includes', value: '1969' },
      { field: 'age', op: '>=', value: 24 },
      { field: 'wealth', op: '>=', value: 60 },
    ],
    choices: [
      {
        id: 'evt.bank_national_1969.deposit', eventId: 'evt.bank_national_1969',
        title: 'Deposit savings into formal interest-bearing bank account',
        requirements: [], baseProbability: 95,
        consequences: [
          { target: 'player', property: 'reputation', op: 'ADD', value: 10, timing: 'immediate', visibility: 'visible', source: 'evt.bank_national_1969' },
          { target: 'player', property: 'wealth', op: 'ADD', value: 25, timing: 'immediate', visibility: 'visible', source: 'evt.bank_national_1969' },
        ],
      },
    ],
  },
  {
    id: 'evt.marriage',
    title: 'Marriage proposal',
    description: 'Family arranges a match.',
    requirements: [{ field: 'age', op: '>=', value: 24 }],
    choices: [{
      id: 'evt.marriage.marry', eventId: 'evt.marriage',
      title: 'Marry', requirements: [], baseProbability: 90,
      consequences: [
        { target: 'family', property: 'add_spouse', op: 'SET', value: 'Spouse', timing: 'immediate', visibility: 'visible', source: 'evt.marriage' },
        { target: 'world', property: 'flag:married', op: 'SET', value: 1, timing: 'immediate', visibility: 'hidden', source: 'evt.marriage' },
      ],
    }],
  },
  {
    id: 'evt.first_child',
    title: 'A child is born',
    description: 'The family grows.',
    requirements: [
      { field: 'married', op: '==', value: 1 },
      { field: 'age', op: '>=', value: 26 },
    ],
    choices: [{
      id: 'evt.first_child.welcome', eventId: 'evt.first_child',
      title: 'Welcome the child', requirements: [], baseProbability: 95,
      consequences: [
        { target: 'family', property: 'add_child', op: 'SET', value: 'Child', timing: 'immediate', visibility: 'visible', source: 'evt.first_child' },
      ],
    }],
  },
  {
    id: 'evt.friend_returns',
    title: 'Old friend returns the favour',
    description: 'The friend helped years ago now runs a thriving shop.',
    requirements: [
      { field: 'helpedFriend', op: '==', value: 1 },
      { field: 'age', op: '>=', value: 32 },
    ],
    choices: [{
      id: 'evt.friend_returns.accept', eventId: 'evt.friend_returns',
      title: 'Accept his help', requirements: [], baseProbability: 80,
      consequences: [
        { target: 'player', property: 'wealth', op: 'ADD', value: 300, timing: 'immediate', visibility: 'visible', source: 'evt.friend_returns' },
      ],
    }],
  },
];

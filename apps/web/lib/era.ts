export interface CityMetadata {
  id: string;
  name: string;
  tag: string;
  desc: string;
  pop: string;
  lang: string;
  country: string;
}

export interface CurrencyInfo {
  symbol: string;
  name: string;
  unit: string;
}

export interface EraInfo {
  eraTitle: string;
  eraSpan: string;
  governmentTitle: string;
  countryName: string;
}

export interface PropertyCatalogItem {
  id: string;
  name: string;
  type: 'residence' | 'commercial' | 'farmland';
  cost: number;
  annualYield: number;
  icon: string;
  description: string;
}

export interface FamilyKinshipProfile {
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  brotherName: string;
  peerName: string;
  mentorName: string;
  mentorRole: string;
  romanticPartnerName: string;
  childNamePool: string[];
}

export const ALL_CITY_METADATA: Record<string, CityMetadata> = {
  // Victorian Industrial Britain
  'location.london': {
    id: 'location.london',
    name: 'London, United Kingdom',
    country: 'United Kingdom',
    tag: 'Imperial Metropolis • Thames Docks, High Finance & Westminster',
    desc: 'The beating heart of the British Empire, renowned for the Houses of Parliament, Bank of England, crowded East End docks, and gaslit streets.',
    pop: '~2,600,000',
    lang: 'English (Cockney & Victorian Standard)',
  },
  'location.manchester': {
    id: 'location.manchester',
    name: 'Manchester, United Kingdom',
    country: 'United Kingdom',
    tag: '"Cottonopolis" • Steam-Powered Textile Mills & Canal Networks',
    desc: 'The global vanguard of the Industrial Revolution, humming with thousands of mechanical cotton looms, brick chimneys, and rail freight depots.',
    pop: '~390,000',
    lang: 'English (Lancashire)',
  },
  'location.birmingham': {
    id: 'location.birmingham',
    name: 'Birmingham, United Kingdom',
    country: 'United Kingdom',
    tag: '"Workshop of the World" • Iron Foundries, Gunsmiths & Steam Engines',
    desc: 'The premier metalworking center of Europe, producing steam engines, brassware, jewellery, and industrial tools in bustling workshops.',
    pop: '~250,000',
    lang: 'English (Midlands)',
  },
  'location.glasgow': {
    id: 'location.glasgow',
    name: 'Glasgow, Scotland',
    country: 'Scotland (United Kingdom)',
    tag: 'River Clyde Shipyards • Heavy Marine Engineering & Deep Collieries',
    desc: 'A powerhouse of naval architecture and heavy locomotive engineering along the River Clyde, celebrated for skilled shipwrights and iron works.',
    pop: '~340,000',
    lang: 'Scots & English',
  },
  'location.yorkshire': {
    id: 'location.yorkshire',
    name: 'Yorkshire, United Kingdom',
    country: 'United Kingdom',
    tag: 'Woolen Mills, Deep Coal Pits & Rugged Agrarian Moors',
    desc: 'A vast northern county balancing historic agricultural farms with intensive colliery mining basins and sprawling textile mills.',
    pop: '~620,000',
    lang: 'English (Yorkshire Dialect)',
  },

  // Post-War India (1945–1970)
  'location.lucknow': {
    id: 'location.lucknow',
    name: 'Lucknow, India',
    country: 'India',
    tag: 'Awadh Capital • Heritage, Courtly Arts & Civil Administration',
    desc: 'Celebrated for courtly etiquette, the grand Rumi Darwaza, flourishing chikan embroidery, and bustling riverfront bazaars along the Gomti.',
    pop: '~450,000',
    lang: 'Hindustani (Urdu & Hindi)',
  },
  'location.kanpur': {
    id: 'location.kanpur',
    name: 'Kanpur, India',
    country: 'India',
    tag: 'Industrial Hub • Textile Mills, Leather Tanneries & River Trade',
    desc: 'The vibrant manufacturing center of northern India, famous for cotton mills, leather craftsmanship, and bustling trade railheads along the Ganges.',
    pop: '~680,000',
    lang: 'Hindi & Hindustani',
  },
  'location.delhi': {
    id: 'location.delhi',
    name: 'Delhi, India',
    country: 'India',
    tag: 'National Capital • Seat of Parliament & Epochal History',
    desc: 'The ancient and modern capital, connecting the historic lanes of Chandni Chowk with the broad avenues of modern governmental ministries.',
    pop: '~950,000',
    lang: 'Hindustani, Hindi & English',
  },
  'location.prayagraj': {
    id: 'location.prayagraj',
    name: 'Prayagraj (Allahabad), India',
    country: 'India',
    tag: 'Confluence • High Court, Classical Literature & Sacred Traditions',
    desc: 'Home to the High Court of Judicature, premier universities, and the historic confluence of sacred rivers, revered for scholarship and civic debate.',
    pop: '~380,000',
    lang: 'Hindi & Sanskritized Hindi',
  },
  'location.awadh_rural': {
    id: 'location.awadh_rural',
    name: 'Awadh Rural, India',
    country: 'India',
    tag: 'Agrarian Countryside • Village Hamlets & Harvest Cooperatives',
    desc: 'Lush rural landscapes of sugarcane fields, mango orchards, village panchayats, and agrarian cooperative societies.',
    pop: '~120,000 (District Clusters)',
    lang: 'Awadhi & Hindi',
  },
};

export function isVictorianLocation(locationId?: string): boolean {
  if (!locationId) return false;
  const loc = locationId.toLowerCase();
  return (
    loc.includes('london') ||
    loc.includes('manchester') ||
    loc.includes('birmingham') ||
    loc.includes('glasgow') ||
    loc.includes('yorkshire') ||
    loc.includes('uk') ||
    loc.includes('britain') ||
    loc.includes('england')
  );
}

export function formatLocationFull(locationId?: string): string {
  if (!locationId) return 'Lucknow, India';
  const meta = ALL_CITY_METADATA[locationId];
  if (meta) return meta.name;

  const rawCity = locationId
    .replace(/^location\./, '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  if (isVictorianLocation(locationId)) {
    return `${rawCity}, United Kingdom`;
  }
  return `${rawCity}, India`;
}

export function getCountryForLocation(locationId?: string): string {
  if (!locationId) return 'India';
  const meta = ALL_CITY_METADATA[locationId];
  if (meta) return meta.country;
  return isVictorianLocation(locationId) ? 'United Kingdom' : 'India';
}

export function getCurrencyForLocation(locationId?: string): CurrencyInfo {
  if (isVictorianLocation(locationId)) {
    return {
      symbol: '£',
      name: 'Pounds (£) & Shillings',
      unit: '£',
    };
  }
  return {
    symbol: '₹',
    name: 'Rupees (₹) & Annas',
    unit: '₹',
  };
}

export function getEraInfo(locationId?: string, yearNum = 1946): EraInfo {
  if (isVictorianLocation(locationId) || yearNum < 1900) {
    return {
      eraTitle: 'Victorian Industrial Era',
      eraSpan: '1840 – 1890',
      governmentTitle: 'British Empire (Constitutional Monarchy & Parliament)',
      countryName: 'United Kingdom',
    };
  }

  // India
  if (yearNum < 1947) {
    return {
      eraTitle: 'British Raj Era',
      eraSpan: '1945 – 1947',
      governmentTitle: 'British India (Colonial Rule & Interim Council)',
      countryName: 'India',
    };
  }
  if (yearNum < 1950) {
    return {
      eraTitle: 'Dominion of India',
      eraSpan: '1947 – 1950',
      governmentTitle: 'Dominion of India (Constituent Assembly)',
      countryName: 'India',
    };
  }
  return {
    eraTitle: 'Republic of India',
    eraSpan: '1950 – 1970',
    governmentTitle: 'Democratic Republic of India',
    countryName: 'India',
  };
}

export function getPropertyCatalog(locationId?: string): PropertyCatalogItem[] {
  if (isVictorianLocation(locationId)) {
    return [
      {
        id: 'prop.townhouse',
        name: 'Georgian Townhouse Residence',
        type: 'residence',
        cost: 150,
        annualYield: 15,
        icon: '🏘️',
        description: 'A solid brick multi-story townhouse in the municipal borough. Generates rental income from tenants.',
      },
      {
        id: 'prop.market_stall',
        name: 'Market Hall Provisions Stall',
        type: 'commercial',
        cost: 300,
        annualYield: 35,
        icon: '🏪',
        description: 'A bustling market stall leasing groceries, dry goods, and coal in the municipal commercial market.',
      },
      {
        id: 'prop.farmland',
        name: 'Yorkshire Agrarian Farm Acreage',
        type: 'farmland',
        cost: 500,
        annualYield: 60,
        icon: '🌾',
        description: 'Fertile acreage producing wheat harvests, dairy stock, and seasonal farm produce.',
      },
      {
        id: 'prop.textile_loom',
        name: 'Steam Weaving Loom Workshop',
        type: 'commercial',
        cost: 800,
        annualYield: 110,
        icon: '🏭',
        description: 'Mechanised textile equipment and operative workstations yielding industrial trade returns.',
      },
      {
        id: 'prop.grand_haveli',
        name: 'Grand Country Manor Estate',
        type: 'residence',
        cost: 1400,
        annualYield: 200,
        icon: '🏛️',
        description: 'An expansive aristocratic manor with stone colonnades, private grounds, and tenant farms.',
      },
    ];
  }

  // Post-War India
  return [
    {
      id: 'prop.townhouse',
      name: 'Old Town Residence',
      type: 'residence',
      cost: 150,
      annualYield: 15,
      icon: '🏘️',
      description: 'A sturdy brick residence in the historic quarter. Generates rental income from lodgers.',
    },
    {
      id: 'prop.bazaar_shop',
      name: 'Bazaar Merchant Shop',
      type: 'commercial',
      cost: 300,
      annualYield: 35,
      icon: '🏪',
      description: 'A bustling commercial market stall leasing sundries and spices in the city bazaar.',
    },
    {
      id: 'prop.orchard',
      name: 'Productive Farmland & Orchard',
      type: 'farmland',
      cost: 500,
      annualYield: 60,
      icon: '🌾',
      description: 'Fertile acreage producing harvest revenue and seasonal grain profits.',
    },
    {
      id: 'prop.textile_loom',
      name: 'Handloom Textile Workshop',
      type: 'commercial',
      cost: 800,
      annualYield: 110,
      icon: '🏭',
      description: 'Artisan weaving handlooms and apprentice workstations yielding textile returns.',
    },
    {
      id: 'prop.grand_haveli',
      name: 'Grand Ancestral Haveli',
      type: 'residence',
      cost: 1400,
      annualYield: 200,
      icon: '🏛️',
      description: 'An expansive aristocratic courtyard mansion with arched colonnades and prime estate status.',
    },
  ];
}

export function getFamilyKinshipProfile(locationId?: string, playerSurname = 'Sharma'): FamilyKinshipProfile {
  if (isVictorianLocation(locationId)) {
    const surname = playerSurname.toLowerCase().includes('sharma') || playerSurname.toLowerCase().includes('prasad')
      ? 'Pendelton'
      : playerSurname;

    return {
      fatherName: `Edward ${surname}`,
      fatherOccupation: 'Master Artisan & Machine Fitter',
      motherName: `Eleanor ${surname}`,
      motherOccupation: 'Homemaker & Skilled Seamstress',
      brotherName: `William ${surname}`,
      peerName: 'Charles Higgins',
      mentorName: 'Master Thorne',
      mentorRole: 'Foundry Overseer & Guild Master',
      romanticPartnerName: 'Charlotte Sterling',
      childNamePool: ['George', 'Beatrice', 'Albert', 'Victoria', 'James', 'Emily', 'Henry', 'Rose'],
    };
  }

  // India
  return {
    fatherName: `Ram ${playerSurname}`,
    fatherOccupation: 'Artisan Craftsman & Clerk',
    motherName: `Sita ${playerSurname}`,
    motherOccupation: 'Homemaker & Caregiver',
    brotherName: `Mohan ${playerSurname}`,
    peerName: 'Ananya Sen',
    mentorName: 'Master Tiwari',
    mentorRole: 'Commercial Merchant',
    romanticPartnerName: 'Priya Devi',
    childNamePool: ['Arun', 'Tara', 'Dev', 'Kavya', 'Siddharth', 'Rani', 'Rohan', 'Leela'],
  };
}

# LegacyLife — Historical Era Specification
## Era 8: Industrial Revolution / Industrial Transformation
**Document status:** Authoritative design specification for the first implementation pass  
**Primary use:** Historical world generation, character simulation, event generation, choice design, and historical divergence  
**Scope:** c. 1760–1914, with regional contexts activated by date + location + political territory + social position  
**Design principle:** This is a simulation specification, not a generic history article.

---

# 0. Core Design Rule

LegacyLife must never instantiate “the Industrial Revolution” as one universal world.

The historical state is:

`BIRTH DATE + LOCATION + POLITICAL TERRITORY + SOCIAL CONTEXT + FAMILY = INITIAL WORLD`

A character born in Lancashire in 1810, Bengal in 1810, rural Qing China in 1810, New York in 1810, or Japan in 1810 must not receive the same institutions, occupations, technology, rights, risks, or opportunities.

The era therefore uses **regional historical contexts** rather than one global ruleset.

The recommended implementation boundary is approximately **1760–1914**. This is deliberately wider than the conventional “First Industrial Revolution” date range because LegacyLife needs enough time to represent:
- British industrialization and its social consequences
- continental European industrialization
- U.S. expansion and industrialization
- colonial South Asia and Southeast Asia
- late Qing China
- Meiji Japan
- the transition from steam/coal/iron systems toward electricity, chemicals, steel, mass production, modern communications, and imperial competition

The exact industrialization date is not a universal fact. Industrialization was gradual and geographically uneven. The engine must use **transition states**, not a single “industrial = true” switch.

---

# 1. ERA OVERVIEW

## 1.1 Era Identity

**Internal era ID:** `industrial_revolution`

**Human-readable name:** Industrial Revolution / Industrial Transformation

**Approximate global simulation window:** `1760-01-01` to `1914-07-28`

**Important note:** 1760 and 1914 are implementation boundaries, not claims that the Industrial Revolution began everywhere in 1760 or ended everywhere in 1914.

## 1.2 Geographic Scope

The era should support, at minimum:

### Core early industrial regions
- England / later Great Britain
- Scotland
- Wales
- Northern England
- Midlands
- London and major British ports
- Belgium
- Northern France
- German states / German Empire
- Netherlands

### United States and North America
- New England
- Mid-Atlantic
- Great Lakes / Midwest
- Southern states
- Appalachian regions
- Western territories and states
- Major Atlantic ports
- Mexico and selected Latin American contexts in later expansion

### South Asia
- Bengal
- Bombay Presidency / western India
- Madras Presidency / southern India
- Punjab
- United Provinces / north-central India
- princely states where data supports them
- major port cities
- Ceylon/Sri Lanka where appropriate

### East Asia
- Qing China
- treaty-port environments
- Japan before and during the Meiji transition
- Korea in late Joseon / early Japanese imperial context
- Taiwan after 1895 under Japanese rule

### Southeast Asia
- British Burma / Straits Settlements
- Dutch East Indies
- French Indochina
- Spanish/American Philippines depending on date

### Other useful expansion regions
- Russia
- Ottoman territories
- Australia
- Canada
- South Africa
- selected Caribbean plantation economies

MVP does **not** require all of these.

## 1.3 Why This Era Works for LegacyLife

This era creates unusually strong life-simulation gameplay because ordinary decisions interact with enormous structural changes.

A character can:
- be born into a rural family and move to a factory city
- become a miner, machinist, clerk, sailor, soldier, railway worker, artisan, merchant, teacher, engineer, physician, journalist, factory owner, farmer, or political organizer
- experience a technology changing their occupation during their lifetime
- migrate internally or internationally
- become richer through industrial opportunity
- lose livelihood through mechanization or market collapse
- be affected by empire without controlling imperial policy
- participate in labor organization or reform
- experience expanding education and literacy
- survive or die from historically common disease and workplace hazards
- witness railways, telegraphs, electricity, mass newspapers, steamships and modern factories appear
- influence history at a local level without automatically becoming a famous historical figure

The central fantasy is:

> **“I was born into a changing world. How much can I adapt to it, benefit from it, resist it, or change it?”**

---

# 2. TEMPORAL BREAKDOWN

The engine should not use only one period label. Use a hierarchy:

`Era → Macro Period → Regional Context → Local Context`

## 2.1 Period A — Early Industrial Transition
**Approximate:** 1760–1799

### Core areas
- Britain first
- parts of continental Europe remain predominantly agrarian
- Atlantic trade and empire strongly connected to British industrial growth

### Political situation
- Britain is a constitutional monarchy with Parliament
- European states vary from monarchies to republics/empires
- American Revolution creates the United States
- French Revolution begins in 1789

### Technology
- mechanized textile production
- improved steam engines
- water power
- canals
- improved iron production
- increasingly specialized machinery
- horse transport remains dominant for most people

### Economy
- agriculture remains central
- household and workshop production coexist with factories
- wage labor expands
- merchant capital and early industrial capital become increasingly important
- colonial trade supplies raw materials and markets

### Social change
- urban industrial communities begin expanding
- artisans face new competition
- class distinctions become increasingly tied to property and occupation
- child and female labor are common in many industrial settings

### Gameplay identity
This period should feel like **industrialization is emerging rather than fully established**.

---

## 2.2 Period B — Factory and Steam Expansion
**Approximate:** 1800–1839

### Key developments
- factory system expands
- cotton textiles dominate British industrialization
- coal and steam become increasingly important
- canals and roads expand
- steam navigation develops
- railways emerge by the 1820s
- industrial cities expand rapidly

### Britain
Important contexts include:
- Lancashire textile towns
- Yorkshire wool/textile communities
- Midlands manufacturing
- coal-mining regions
- London
- Liverpool
- Glasgow
- Manchester
- Birmingham
- Leeds
- Sheffield

### Social system
Industrial working class expands.
Middle-class commercial and professional groups gain wealth and influence.
Traditional landed elites remain powerful.

### Laws and reforms
Britain begins regulating factory labor. The 1802 Health and Morals of Apprentices Act and 1819 Cotton Mills Act are important examples; the 1833 Factory Act introduced a small inspectorate and restrictions on child labor. These reforms were imperfectly enforced. citeturn0search1turn0search0

### Gameplay identity
**Opportunity + exploitation + instability.**

---

## 2.3 Period C — Railway, Reform and Continental Industrialization
**Approximate:** 1840–1869

### Technology
- railways become major transport infrastructure
- telegraph
- steamships
- improved machine tools
- large-scale iron production
- photography
- expanding printing and newspapers
- modern banking and corporate organization in some regions

### Europe
Belgium industrializes early; France industrializes more gradually; German states develop rapidly, particularly after the Zollverein and later German unification. citeturn4search13turn2search0

### Britain
Industrialization becomes deeply embedded in the economy.
Factory regulation expands.
Urban public-health problems become politically important.

### United States
Industrialization is strong in the North and Northeast.
The Civil War becomes a major political, military, technological and economic rupture.
The U.S. remains regionally divided between industrializing North and heavily agricultural South before the war. citeturn4search0

### India
The first passenger railway opens in 1853 between Bombay and Thane. Railways connect ports and interior markets and are deeply linked to colonial commercial interests. citeturn2search5

### China
The First and Second Opium Wars and the Taiping Rebellion destabilize the Qing state. Treaty ports create distinctive environments where foreign institutions, trade and technology coexist with Qing institutions. citeturn4search11turn4search9

### Japan
Tokugawa rule ends in the Meiji Restoration of 1868.

### Gameplay identity
**Mobility + political upheaval + infrastructure expansion.**

---

## 2.4 Period D — High Industrialization and National Transformation
**Approximate:** 1870–1899

### Technology
- steel
- electrical systems
- telephones
- advanced telegraph networks
- industrial chemicals
- modern machine production
- improved rail networks
- large steamships
- refrigeration begins to matter
- bicycles and other new mobility technologies
- increasingly sophisticated firearms and artillery

### Society
- large industrial cities
- professional middle classes
- organized labor
- mass political movements
- expanding literacy
- national identities
- migration at unprecedented scale

### United States
Post-Civil War industrial expansion accelerates. Steel, oil, railroads, electrical power and mass production expand; immigration and internal migration transform cities. citeturn4search5turn0search13

### Japan
The Meiji state deliberately accelerates industrialization and centralization. Railways, shipbuilding, mines, factories, education and a modern military are developed. Japan becomes an industrializing power. citeturn2search0turn2search2

### China
Self-Strengthening efforts, treaty-port industrial activity, foreign concessions, internal conflict and reform movements coexist. Industrialization must be modeled as uneven and politically constrained rather than as a simple copy of Japan or Britain. citeturn2search3turn2search4

### Gameplay identity
**Industrial society + mass politics + empire + social mobility.**

---

## 2.5 Period E — Mass Industry, Imperial Competition and Pre-WWI World
**Approximate:** 1900–1914

### Technology
- widespread electric lighting in major cities
- telephone networks
- automobiles
- modern bicycles
- powered aviation begins
- advanced steel
- internal-combustion engines
- modern industrial chemistry
- radio experiments
- cinema
- increasingly modern medicine
- large industrial corporations

### Politics
- mass parties
- constitutional reform
- nationalism
- imperial competition
- labor movements
- socialist movements
- women's political activism
- anti-colonial movements
- constitutional and revolutionary movements

### Major conflicts
- Boxer crisis
- Russo-Japanese War
- Balkan tensions
- colonial wars and resistance
- Mexican Revolution from 1910
- European alliance system

### End boundary
1914 is a useful implementation boundary because World War I changes the simulation into a substantially different global context.

---

# 3. REGIONAL CONTEXTS

## 3.1 Britain

### Political entities
- Kingdom of Great Britain until 1801
- United Kingdom of Great Britain and Ireland from 1801
- Parliament
- Crown
- local government
- Poor Law institutions
- courts
- churches and voluntary organizations

### Key locations
- London
- Manchester
- Liverpool
- Birmingham
- Leeds
- Sheffield
- Glasgow
- Edinburgh
- Newcastle
- Cardiff
- Belfast
- Lancashire mill towns
- Yorkshire textile communities
- South Wales coalfields
- Scottish industrial belt

### Economy
- textiles
- coal
- iron and steel
- engineering
- shipping
- banking
- trade
- colonial commerce
- agriculture

### Social groups
- landed elite
- industrial capitalists
- merchants
- professionals
- middle classes
- skilled artisans
- factory workers
- miners
- domestic servants
- agricultural laborers
- paupers
- Irish migrants and other migrants

### Gameplay
Britain should be the most mature industrial context during the early game.

A player can move:
`rural laborer → apprentice → skilled worker → foreman → small business owner`

or:
`factory worker → union organizer → reform campaigner`

or:
`merchant → industrial investor → factory owner`

But wealth alone must not automatically create political power.

### Labor regulation
Industrial labor conditions change over time. The engine must update working-hour and child-labor constraints based on exact date and industry. Britain progressively introduced factory regulation; the 1844 Act introduced machinery-safety rules and restrictions, the 1847 Act established the ten-hour day for women and young people in covered factories, and later Acts expanded regulation. citeturn0search2turn0search4

---

## 3.2 Continental Europe

Do not create one “Europe” region.

### Belgium
- early continental industrialization
- coal
- iron
- textiles
- railways
- dense industrial regions
- early industrial cities

### France
- more regionally uneven industrialization
- Paris as political and cultural center
- Lyon silk industry
- coal and industrial regions
- strong state role in infrastructure
- revolutions and regime changes

### German states / German Empire
Before 1871:
- multiple states
- Prussia important
- Zollverein creates stronger economic integration

After 1871:
- German Empire
- rapid heavy industrialization
- Ruhr coal and steel
- railways
- chemicals
- engineering
- growing military-industrial capacity

### Austria-Hungary
- uneven industrialization
- Vienna and Bohemian industrial areas
- multinational empire
- strong regional differences

### Russia
- late and uneven industrialization
- state-driven infrastructure
- peasant majority
- St Petersburg/Moscow industrial centers
- railway expansion
- major social and political tensions

### Gameplay principle
Political borders and industrial borders must be separate data.

---

# 4. UNITED STATES

## 4.1 Time-dependent U.S. Context

### 1760s–1780s
- British colonies
- Atlantic economy
- slavery central in several colonies
- agrarian majority

### 1780s–1820s
- new republic
- territorial expansion
- early manufacturing
- canals
- textile mills
- slavery expands in the South
- Native nations face increasing territorial pressure

### 1830s–1860
- railways
- canals
- industrial Northeast
- mass migration
- westward expansion
- abolitionism
- sectional conflict
- slavery remains central to Southern economy

### 1861–1865
- Civil War
- military mobilization
- emancipation
- severe disruption
- massive mortality
- industrial and logistical advantages matter

### 1865–1900
- railroad expansion
- steel
- oil
- industrial corporations
- immigration
- urbanization
- labor conflict
- Western settlement
- Indigenous displacement and resistance
- segregation and racial violence
- political reform

The Library of Congress describes post-Civil War America as an industrial giant with expanding railroads, petroleum, steel and electrical power; industrial growth created wealthy industrialists, a growing middle class and a large blue-collar workforce. citeturn4search3turn4search5

## 4.2 Important U.S. playable contexts

### Northeast
- factory worker
- machinist
- engineer
- merchant
- immigrant
- industrialist
- journalist
- union organizer

### South
- plantation agriculture
- enslaved labor before abolition
- Civil War
- Reconstruction
- tenant farming/sharecropping
- racial restrictions after emancipation

### West
- farming
- ranching
- mining
- railroad construction
- military service
- settlement
- Indigenous resistance
- Chinese migrant labor
- frontier towns

The western simulation must not use a romantic “cowboy frontier” abstraction. Railroad expansion, migration, mining, agriculture, Indigenous dispossession, federal policy, violence and town formation must be represented together. citeturn0search9

---

# 5. COLONIAL SOUTH ASIA

## 5.1 Core rule

Do not model colonial India as simply “poor Britain.”

Colonial South Asia has its own:
- agrarian systems
- caste and community structures
- languages
- religions
- princely states
- colonial administration
- commercial networks
- artisans
- merchants
- industrial entrepreneurs
- famines
- resistance movements
- railways
- ports
- military recruitment

The economic effects of colonial rule are historically debated and varied by region and period. The game should model concrete mechanisms rather than using a single ideological “colonial score.”

## 5.2 Major contexts

### Bengal
- Calcutta/Kolkata
- riverine trade
- administration
- jute later
- education
- commerce
- zamindari structures
- intellectual and political activity

### Bombay region
- Mumbai/Bombay port
- cotton
- textile mills
- shipping
- merchant capital
- railway connectivity

### Madras region
- port economy
- agriculture
- textiles
- administration
- education

### Northern India
- agriculture
- military recruitment
- administrative centers
- major religious and cultural networks

### Punjab
- agriculture
- military recruitment
- canal irrigation later
- frontier politics

## 5.3 Railway system

Railways are a major gameplay system after 1853.

They should:
- reduce travel time
- enable migration
- connect markets
- create railway employment
- facilitate troop movement
- facilitate commodity movement
- create new towns
- change local economies
- sometimes accelerate epidemics
- change access to newspapers and ideas

Railway construction in India began with the Bombay–Thane passenger line in 1853; early lines linked major ports to interior markets and were connected to colonial commercial priorities. citeturn2search5

## 5.4 Player contexts

Possible:
- tenant farmer
- landholding cultivator
- artisan/weaver
- merchant
- railway worker
- clerk
- teacher
- soldier
- dock worker
- mill worker
- lawyer
- doctor
- civil servant
- journalist
- industrial entrepreneur
- religious scholar
- reformer

The system must support enormous differences between elite urban lives and rural subsistence lives.

---

# 6. LATE QING CHINA

## 6.1 Core rule

China must be modeled as:
`Qing imperial institutions + local society + foreign pressure + treaty-port systems + internal rebellion + uneven modernization`

It is incorrect to represent China as technologically frozen.

## 6.2 Major periods

### 1800–1838
- Qing imperial system
- Confucian bureaucracy
- agrarian and commercial economy
- large internal trade networks
- growing foreign trade pressure

### 1839–1842
First Opium War.
Consequences include treaty arrangements, foreign commercial privileges and cession of Hong Kong Island. citeturn4search11turn4search9

### 1850–1864
Taiping Rebellion.
This is a major survival and regional-displacement context.

A player in affected regions may experience:
- recruitment
- refugee movement
- food shortage
- destruction
- militia service
- death of family members
- displacement
- changing local authority

### 1856–1860
Second Opium War.

### 1860s–1890s
Self-Strengthening and regional modernization:
- arsenals
- shipyards
- military modernization
- schools
- telegraph
- mining
- limited industrial enterprises

Industrialization is uneven and politically fragmented. Economic historians identify important relationships between local fiscal capacity, war, and industrial investment; the game should therefore avoid treating the Qing government as a single perfectly centralized actor. citeturn2search3

### 1894–1895
First Sino-Japanese War.
Qing defeat produces major territorial and political consequences.

### 1899–1901
Boxer movement and international intervention. citeturn4search12

### 1901–1911
Late Qing reforms.

### 1911–1912
Xinhai Revolution and end of imperial rule. citeturn4search9

## 6.3 Treaty ports

Treaty ports need a distinct sub-location type.

A treaty port can contain:
- Chinese administration
- foreign concessions
- consulates
- foreign merchants
- missionaries
- Chinese merchants
- foreign courts/consular jurisdiction
- mixed neighborhoods
- modern firms
- modern schools
- newspapers
- rail/telegraph access depending on date

The player may have dramatically different rights depending on legal status and location.

---

# 7. JAPAN

## 7.1 1800–1853

Tokugawa political order.
- shogunate
- daimyo domains
- samurai
- peasants
- artisans
- merchants
- urban culture
- sophisticated commercial networks
- limited but meaningful foreign contacts

Do not portray Japan as completely isolated.

## 7.2 1853–1868

Foreign pressure and political crisis.
- Perry expedition
- unequal treaties
- anti-shogunate movements
- political conflict
- Boshin War

## 7.3 1868–1877

Meiji transformation.
- centralization
- abolition of domains
- class restructuring
- land-tax reform
- conscription
- state institutions
- industrial investment

The Meiji government abolished the domain system and created a centralized prefectural state; it also pursued railways, industry and military modernization. citeturn2search0turn2search2

## 7.4 1877–1894

- industrial expansion
- railways
- textile industry
- education
- modern military
- political organization
- constitutional government

Japan established a public school system in 1872; by 1900 school attendance was very high, particularly among boys. citeturn2search0

## 7.5 1894–1912

- First Sino-Japanese War
- imperial expansion
- industrial growth
- 1889 Constitution remains important
- Russo-Japanese War
- growing great-power status
- social tensions from industrialization

Meiji-era Japan lasted 1868–1912 and included rapid state centralization, industrialization, military reform and overseas expansion. citeturn4search1turn4search72

## 7.6 Japanese occupations

Possible careers:
- silk worker
- textile worker
- farmer
- merchant
- factory manager
- engineer
- civil servant
- soldier
- sailor
- teacher
- journalist
- entrepreneur
- political activist

---

# 8. WORLD MODEL

The simulation should represent the following entity hierarchy:

`World`
→ `Political Entities`
→ `Regions`
→ `Locations`
→ `Institutions`
→ `Families`
→ `Characters`

Cross-cutting systems:
- economy
- trade
- technology
- transportation
- communication
- law
- religion
- education
- health
- military
- social hierarchy
- migration
- historical events

## 8.1 PoliticalEntity

Fields:
- id
- name
- start_date
- end_date
- government_type
- ruler/leadership
- capital
- territory
- population estimate/range
- dominant institutions
- laws
- military structure
- taxation
- relations
- predecessor
- successor

## 8.2 Location

Fields:
- id
- name
- coordinates
- region
- political_entity_by_date
- urbanization_level
- population_range
- industries
- agriculture
- markets
- transport_links
- education_access
- health_conditions
- religious_profile
- languages
- major historical events

A location must be date-aware.

---

# 9. PLAYER CREATION

## 9.1 Birth Generation

Inputs:
- date
- location
- optional gender/sex setting according to game design
- optional player-selected family origin
- random seed

Engine derives:
- political entity
- legal system
- social structure
- technology level
- dominant occupations
- available education
- local economy
- religious/cultural context
- health risks
- family wealth
- migration possibilities
- relevant historical events

## 9.2 Family Generation

Family should be generated before the character's starting stats.

Fields:
- household size
- parents
- grandparents if alive
- siblings
- occupation(s)
- property
- debt
- social standing
- religion/culture
- local connections
- family reputation
- health
- political affiliation if relevant

## 9.3 Wealth Tiers

Use contextual wealth, not modern income brackets.

Suggested:
1. Destitute
2. Poor
3. Working
4. Modest
5. Comfortable
6. Affluent
7. Wealthy
8. Elite

These are relative to location and year.

A “comfortable” family in rural Bengal is not economically equivalent to a “comfortable” family in industrial Manchester.

## 9.4 Social Origin

Suggested generation categories:
- landless laborer
- peasant/cultivator
- artisan
- tenant farmer
- skilled worker
- merchant
- clerk
- professional
- minor official
- industrial capitalist
- landed elite
- aristocratic/royal household
- enslaved person where historically legal
- indentured/migrant labor context where applicable
- religious specialist
- military household

Do not expose these categories as universal global classes. Each region supplies its own valid set.

---

# 10. SOCIAL CLASSES AND LIFE PATHS

## 10.1 Britain

### Landed elite
- land ownership
- political influence
- estate management
- elite education
- military/officer access
- high marriage network value

### Industrial capitalist
- factory ownership
- investment
- access to credit
- employment of labor
- political influence dependent on period
- high wealth but business risk

### Professional middle class
- lawyers
- doctors
- engineers
- accountants
- teachers
- civil servants
- clergy

### Skilled artisan
- high practical skill
- apprenticeship
- vulnerability to mechanization
- potential to become supervisor/business owner

### Factory worker
- wage income
- dangerous work
- unemployment risk
- low political access early
- increasing collective organization later

### Agricultural laborer
- low wages
- seasonal employment
- rural dependency
- migration opportunity

### Domestic servant
- common employment path
- household dependence
- low autonomy
- potential social mobility through marriage/skills

---

## 10.2 U.S.

Additional classes:
- enslaved laborer before abolition
- free Black worker
- immigrant laborer
- small farmer
- homesteader/settler
- railroad worker
- miner
- rancher
- industrial worker
- industrialist

Race and legal status must be modeled as historically specific institutions, not as biological attributes.

---

## 10.3 South Asia

Potential contexts:
- peasant cultivator
- tenant
- landholder
- artisan/weaver
- merchant
- zamindar/landed intermediary where applicable
- colonial clerk
- soldier
- railway worker
- mill worker
- professional
- religious specialist
- princely-state official

Caste, community and religion should be represented only where relevant to the selected region and period.

---

## 10.4 Qing China

Potential contexts:
- peasant household
- tenant farmer
- merchant
- artisan
- scholar
- examination candidate
- official family
- military/militia
- treaty-port merchant
- dock worker
- factory worker
- missionary-associated worker
- overseas Chinese migrant

The civil examination system should be represented as a historical mobility mechanism until its abolition in 1905.

---

## 10.5 Japan

Potential contexts:
- samurai household before Meiji restructuring
- farmer
- artisan
- merchant
- village headman/local official
- industrial worker
- textile worker
- teacher
- soldier
- civil servant
- entrepreneur
- engineer

The engine must transition class rules after the Meiji reforms.

---

# 11. LIFE STAGES

The game should not use identical age thresholds everywhere.

## 11.1 Birth / Infancy

Generate:
- household
- birth order
- health
- feeding conditions
- local disease environment
- parental status
- inheritance expectations
- religious/cultural context

Infant survival should be probabilistic and strongly affected by:
- nutrition
- sanitation
- household wealth
- epidemic conditions
- maternal health
- local medical access

Do not use a single global mortality number.

## 11.2 Childhood

Possible activities:
- household labor
- schooling
- apprenticeship
- farm work
- factory work
- religious education
- street work
- family business
- domestic service

School availability must be date- and location-dependent.

In Britain, voluntary schooling existed before national systems; the 1870 Education Act expanded provision through school boards and compulsory attendance followed in 1880. citeturn0search10turn0search15

## 11.3 Adolescence

Core choices:
- work
- apprenticeship
- education
- migration
- military preparation
- family responsibilities
- marriage preparation

## 11.4 Adulthood

Systems:
- occupation
- marriage
- children
- property
- business
- political participation
- military service
- migration
- religious life
- community status

## 11.5 Old Age

Possible:
- retirement
- dependence on children
- property transfer
- continued work
- pension/poor relief where available
- social prestige
- illness
- legacy

---

# 12. GAME STATS

Do not copy modern BitLife-style stats wholesale.

## 12.1 Core stats

### Health
Represents physical condition and survival resilience.

Affected by:
- nutrition
- disease
- occupation
- injuries
- sanitation
- age
- medical access

Affects:
- survival
- work capacity
- military performance
- fertility
- recovery

### Wealth
Represents liquid resources and productive assets relative to local economy.

Affected by:
- wages
- property
- business
- inheritance
- debt
- disasters
- inflation/price changes
- unemployment

### Skill
Represents occupation-specific competence.

Affected by:
- apprenticeship
- schooling
- practice
- workplace
- technology

### Literacy
Represents ability to read/write in relevant languages/scripts.

Affected by:
- schooling
- family education
- occupation
- religion
- urban environment

### Reputation
Local/social standing.

Affected by:
- occupation
- family
- behavior
- achievements
- scandals
- political activity

### Influence
Ability to affect other people/institutions.

Influence should not be identical to wealth.

### Social Mobility
Not a stored character stat; derive it from:
- education
- wealth
- occupation
- family
- legal status
- social restrictions
- location

### Political Access
Date/location-dependent.

Examples:
- voting rights
- office eligibility
- court access
- patronage
- petitioning
- local office
- party membership

### Military Ability
Useful for soldiers, officers and militia contexts.

### Family Standing
Represents the social capital of the household.

## 12.2 Hidden stats

Useful hidden variables:
- disease exposure
- nutritional reserve
- injury severity
- debt burden
- employability
- political suspicion
- employer trust
- community trust
- migration readiness
- literacy trajectory
- technological adaptability

These need not all be visible.

---

# 13. ECONOMY

## 13.1 Economic model

The economy should be simplified but historically structured.

Use:
- local prices
- wage bands
- commodity availability
- employment demand
- land/property
- debt
- taxes
- trade access
- transport costs
- household consumption

Do not simulate every transaction.

## 13.2 Currency

Currency is region- and date-dependent.

Examples:
- British pound/shilling/pence
- U.S. dollar
- French franc
- German mark after 1871
- Japanese yen after Meiji monetary reform
- Chinese monetary systems including copper cash and silver-based transactions
- Indian rupee under colonial monetary arrangements

The player UI may normalize wealth into a **relative wealth score** while the simulation retains historical currency.

## 13.3 Household budget

Each household should have:
- income
- food expense
- housing
- clothing
- fuel
- transport
- taxes/rent
- debt service
- education
- medical/religious/community expenses
- savings

## 13.4 Economic shocks

Examples:
- harvest failure
- commodity price crash
- factory closure
- strike
- war
- blockade
- railway opening
- new machine
- financial panic
- epidemic
- flood
- drought
- famine
- inheritance
- land sale

## 13.5 Industrialization effect

Each location should have an industrialization index composed of:
- mechanization
- factory density
- coal/energy access
- transport connectivity
- financial capital
- skilled labor
- state support
- market access
- communications

This is a **simulation variable**, not a historical fact.

---

# 14. POLITICS AND POWER

## 14.1 Political structures

Supported forms:
- constitutional monarchy
- absolute/centralized monarchy
- empire
- republic
- colonial administration
- federated state
- princely state
- military administration
- city government
- local customary authority

## 14.2 Ordinary-player political interaction

A normal character should interact through:
- voting where eligible
- petitioning
- local office
- religious/community leadership
- journalism
- union organization
- political clubs
- patronage
- military service
- protest
- rebellion
- business influence
- philanthropy
- court cases

## 14.3 Political access

Never grant universal voting rights.

The engine evaluates:
`date + territory + legal status + sex/gender rule + property/class requirement + race/caste/community restrictions + local law`

Political systems changed substantially during the period.

---

# 15. WAR AND CONFLICT

## 15.1 Conflict types

- interstate war
- civil war
- rebellion
- colonial war
- local uprising
- labor violence
- banditry
- frontier conflict
- naval conflict
- revolutionary conflict

## 15.2 Military roles

- conscript
- volunteer
- militia
- enlisted soldier
- cavalry
- artillery
- engineer
- sailor
- officer
- military doctor
- quartermaster
- railway/logistics worker
- civilian laborer attached to military operations

## 15.3 Weapons progression

Do not give every character modern firearms.

Approximate progression:
- muzzle-loading firearms
- percussion systems
- breech-loading firearms
- repeating rifles
- machine guns
- modern artillery
- ironclad/steel warships
- early submarines

Availability is determined by:
`date + faction + wealth + military role + region`

## 15.4 War consequences

War can change:
- mortality
- food prices
- employment
- property
- migration
- family structure
- political legitimacy
- territory
- technology
- social mobility
- disability

## 15.5 Prison and captivity

Possible:
- prisoner of war
- political prisoner
- criminal imprisonment
- detention
- internment-like contexts in later period

Rules must depend on legal and political system.

---

# 16. RELIGION, CULTURE AND SOCIETY

The system should not assign one religion to an entire region.

Represent:
- household religion
- community religion
- local religious institutions
- conversion
- mixed households
- religious law/custom where relevant
- festivals
- dietary practices
- marriage norms
- burial/funeral practices

Possible major traditions include:
- Christianity and denominations
- Judaism
- Islam
- Hindu traditions
- Buddhism
- Confucian traditions
- Daoist traditions
- Shinto
- Sikh traditions
- local/Indigenous belief systems
- syncretic practices

## 16.1 Gameplay effects

Religion/culture can affect:
- marriage
- schooling
- community support
- occupation access
- social reputation
- migration
- political movements
- festivals
- charitable support
- conflict
- conversion decisions

Do not turn religion into a morality score.

---

# 17. TECHNOLOGY AND KNOWLEDGE

Technology must be date/location dependent.

## 17.1 Transportation

### Early
- walking
- horse
- carriage
- canal
- sailing ship

### Industrial expansion
- steam locomotive
- railway
- steamship
- improved roads
- urban tram systems

### Late period
- electric tram
- bicycle
- automobile
- early aircraft

## 17.2 Communication

- handwritten letters
- postal systems
- newspapers
- telegraph
- telephone
- mass printing
- photography
- early radio
- cinema

Communication should affect:
- rumor speed
- market information
- political mobilization
- family contact
- migration
- emergency response

## 17.3 Manufacturing

- hand tools
- water power
- steam power
- mechanized spinning/weaving
- machine tools
- iron
- steel
- electrical manufacturing
- chemical industry
- mass production

## 17.4 Agriculture

- animal traction
- crop rotation
- improved tools
- fertilizers
- mechanized threshing
- rail-linked commercial agriculture
- irrigation
- plantation systems

## 17.5 Medicine

Progress should be gradual:
- traditional remedies
- local healers
- surgery with limited anesthesia early
- vaccination
- anesthesia
- antiseptic practice
- germ theory
- professional hospitals
- improved public sanitation
- laboratory medicine

Do not give late-19th-century medicine to an 1800 character.

---

# 18. HEALTH, DISEASE AND SURVIVAL

## 18.1 Health model

Use three layers:

### Individual
- age
- genetics if implemented
- nutrition
- injury
- disease

### Household
- wealth
- crowding
- food security
- sanitation

### Environment
- water quality
- epidemic status
- climate
- urban density
- occupation

## 18.2 Disease categories

Examples:
- cholera
- tuberculosis
- smallpox
- typhus
- malaria
- dysentery
- influenza
- measles
- scarlet fever
- pneumonia
- occupational lung disease
- industrial injuries
- childbirth complications

Availability and prevalence vary by region and date.

## 18.3 Workplace hazards

Examples:
- mine collapse
- explosion
- machinery injury
- burns
- toxic exposure
- textile dust
- respiratory disease
- railway accidents
- ship accidents
- construction accidents

## 18.4 Public health

Later 19th-century cities can progressively unlock:
- clean water
- sewer systems
- garbage removal
- health boards
- vaccination programs
- hospitals
- sanitation laws

This should reduce certain risks without eliminating disease.

---

# 19. HISTORICAL EVENT CATALOGUE

Events must have machine-readable metadata.

Schema:

```text
Event ID
Name
Start Date
End Date
Location(s)
Political Entity
Event Type
Historical Cause
Historical Outcome
Affected Groups
Historical Importance
Player Relevance
Eligible Player Contexts
Possible Player Actions
Fixed Consequences
Branchable Consequences
Divergence Threshold
```

## 19.1 P0 global events

### American Revolution
**1775–1783**
- location: North America
- relevance: creation of United States
- player relevance: military, migration, trade, political identity

### French Revolution
**1789 onward**
- location: France
- relevance: political transformation
- player relevance: citizenship, military service, political violence, migration

### Napoleonic Wars
**1799–1815**
- Europe and wider world
- military mobilization
- trade disruption
- conscription
- political borders

### First Opium War
**1839–1842**
- Qing China / British Empire
- major treaty consequences
- foreign commercial expansion

### European Revolutions
**1848**
- France, German states, Austrian Empire and elsewhere
- political mobilization
- repression
- migration

### Taiping Rebellion
**1850–1864**
- China
- massive internal conflict
- displacement and mortality

### Indian Rebellion
**1857–1858**
- India
- major political and military transition
- direct Crown rule follows

### U.S. Civil War
**1861–1865**
- United States
- emancipation
- massive casualties
- political and economic transformation

### Meiji Restoration / Boshin transition
**1868–1869**
- Japan
- political restructuring

### Franco-Prussian War
**1870–1871**
- Europe
- German unification context

### Great Railroad expansion
**19th century**
- U.S., Europe, India and elsewhere
- not one event; model as infrastructure waves

### First Sino-Japanese War
**1894–1895**
- East Asia
- Qing defeat
- Japanese expansion

### Boxer movement / international intervention
**1899–1901**
- China
- foreign intervention
- political consequences

### Russo-Japanese War
**1904–1905**
- Japan/Russia/East Asia
- Japanese international status changes

### Xinhai Revolution
**1911–1912**
- China
- Qing collapse
- Republic established

### World War I outbreak
**1914**
- end boundary / transition event
- should hand off to a future WWI era module

---

# 20. HISTORICAL FIGURES

Historical figures should be **contextual anchors**, not a celebrity list.

Data:
- id
- name
- birth/death
- location
- role
- faction
- historical fixed events
- potential relationship types
- influence radius
- interaction eligibility
- divergence sensitivity

## 20.1 P0 figures

Britain:
- James Watt
- Richard Arkwright
- George Stephenson
- Robert Owen
- Isambard Kingdom Brunel
- Queen Victoria
- key reform figures such as Lord Shaftesbury

United States:
- George Washington
- Abraham Lincoln
- Frederick Douglass
- Andrew Carnegie
- John D. Rockefeller
- Thomas Edison
- Samuel Morse

India:
- Rammohun Roy
- Dadabhai Naoroji
- Jyotirao Phule
- Swami Vivekananda
- Bal Gangadhar Tilak
- selected major colonial officials depending on event

China:
- Lin Zexu
- Hong Xiuquan
- Empress Dowager Cixi
- Zeng Guofan
- Li Hongzhang
- Sun Yat-sen

Japan:
- Emperor Meiji
- Saigo Takamori
- Ito Hirobumi
- Iwasaki Yataro
- Fukuzawa Yukichi

## 20.2 Interaction rule

Historical figures should only appear as direct contacts when:
- player location is plausible
- date overlaps
- player status/reputation/institutional connection permits contact
- event context creates a plausible meeting

Otherwise they may exist in:
- newspapers
- public events
- political events
- books
- rumors
- historical summaries

---

# 21. RANDOM EVENTS

Random events should be generated from context.

## 21.1 Family

- birth
- death
- marriage proposal
- inheritance
- family dispute
- illness
- migration
- estrangement
- adoption/guardianship where historically plausible

## 21.2 Economic

- wage increase
- unemployment
- price rise
- factory closure
- new employer
- business opportunity
- debt crisis
- crop failure
- inheritance

## 21.3 Industrial

- machine introduction
- accident
- strike
- factory expansion
- apprenticeship opportunity
- new railway
- mining discovery
- technology training

## 21.4 Social

- community festival
- religious event
- social scandal
- local election
- charitable aid
- discrimination
- marriage negotiation
- neighborhood conflict

## 21.5 Political

- election
- reform act
- protest
- arrest
- censorship
- petition
- rebellion
- military recruitment

## 21.6 Environmental

- flood
- drought
- storm
- fire
- harvest failure
- epidemic

## 21.7 Discovery/opportunity

- scholarship
- apprenticeship
- patent opportunity
- new trade route
- railway job
- government post
- overseas migration

Randomness must be constrained by:
`date + location + class + occupation + current world state`

---

# 22. CHOICE DESIGN

Choices must emerge from systems.

## 22.1 Choice consequence layers

Every major choice can produce:
1. Immediate consequence
2. Delayed consequence
3. Hidden consequence
4. Personal consequence
5. Family consequence
6. Social consequence
7. Economic consequence
8. Historical consequence

Not every choice needs all eight.

## 22.2 Example: Factory worker, Manchester, 1847

**Event:** Your employer is asking workers to accept longer shifts despite new restrictions.

Choices:
A. Accept.
B. Refuse individually.
C. Discuss with coworkers.
D. Join a collective protest.
E. Leave and seek another employer.

Potential consequences:
- A: income preserved; health fatigue increases
- B: possible dismissal; reputation changes
- C: collective influence increases
- D: strike/arrest/unemployment risk; long-term labor organization potential
- E: migration/search cost; new employment opportunity

Historical law must determine whether the employer's action is legal in the exact industry/date.

## 22.3 Example: Indian artisan, 1870

A cheaper factory-produced textile shipment reaches the market.

Choices:
- reduce prices
- specialize in luxury goods
- migrate to city
- enter mill employment
- seek merchant partnership
- leave craft entirely

The event should emerge from actual market/technology state rather than be a generic “your career is obsolete” popup.

---

# 23. HISTORICAL DIVERGENCE

This is a core LegacyLife system.

## 23.1 Divergence levels

### Level 0 — Personal
Player changes:
- own job
- health
- marriage
- wealth
- skills

### Level 1 — Family
Player changes:
- inheritance
- family migration
- family business
- descendants
- reputation

### Level 2 — Local
Player changes:
- business
- local election
- community institution
- local strike
- local disaster response

### Level 3 — Regional
Requires:
- high influence
- relevant institution
- significant resources
- political/organizational role

Examples:
- regional labor movement
- major railway decision
- rebellion support
- business network

### Level 4 — National
Requires rare combination:
- political office
- major wealth
- military command
- national organization
- influential journalism
- major industrial position

### Level 5 — Historical
Requires exceptional circumstances.

Examples:
- changing a major battle
- preventing a political assassination
- materially altering a reform movement
- changing a major industrial invention's adoption

### Level 6 — Major Alternate Timeline
Extremely rare.

The game should not allow a random factory worker to single-handedly cancel the Industrial Revolution.

## 23.2 Divergence score

Suggested hidden variable:

`Divergence Potential = Influence × Access × Resources × Knowledge × Proximity × Timing`

This is a gameplay formula, not a historical claim.

## 23.3 Fixed vs branchable history

### Mostly fixed unless valid intervention
- major births/deaths of historical figures
- invention dates
- wars
- treaties
- regime changes

### More branchable
- local elections
- local strikes
- business outcomes
- individual migration
- local accidents
- small military engagements
- local political appointments

### Highly branchable only at high influence
- national policy
- major war outcome
- regime survival
- industrial adoption
- revolutionary success

## 23.4 Causal propagation

When a player changes history:
1. record the intervention
2. calculate direct consequence
3. update affected institutions
4. update regional state
5. update national state if threshold reached
6. recalculate dependent events
7. preserve unrelated historical events where possible
8. generate alternate timeline notes

---

# 24. DEATH AND LEGACY

## 24.1 Death causes

- infectious disease
- childbirth complications
- old age
- workplace accident
- war
- violence
- starvation
- environmental disaster
- occupational disease
- epidemic
- medical complications

Death probabilities must vary by:
- age
- region
- wealth
- occupation
- era
- epidemic status

## 24.2 Legacy screen

At death show:

### Life
- birth
- death
- lifespan
- major places lived

### Family
- spouse
- children
- descendants
- family wealth

### Work
- occupations
- businesses
- major skills

### Society
- reputation
- organizations
- community impact

### History
- historical events witnessed
- events influenced
- divergence level
- timeline changes

### Final statement
A generated historical summary such as:

> “Born into a textile-working family in Lancashire in 1829, you spent your early life in mill work, later became a foreman, helped organize a local workers' association, and moved your family to Liverpool. You never altered national history, but your descendants inherited a modest business and your local campaign contributed to a successful workplace reform.”

This is generated from actual state, not fiction disconnected from the simulation.

---

# 25. REPLAYABILITY

Replay value comes from combinations of:

`DATE × LOCATION × CLASS × FAMILY × OCCUPATION × TECHNOLOGY × POLITICS × EVENTS × PLAYER CHOICES`

Examples:
- British factory worker in 1810
- British engineer in 1880
- Bengal weaver in 1800
- Bombay mill worker in 1890
- Qing merchant in Shanghai in 1880
- Qing peasant during Taiping period
- Japanese samurai family in 1865
- Japanese textile worker in 1890
- American immigrant in New York in 1885
- American settler in the West in 1875
- German industrial worker in 1900
- Russian railway worker in 1905

Each produces a fundamentally different game.

---

# 26. COMPLETE GAMEPLAY EXAMPLES

## Example A — Manchester Factory Worker

### Setup
- birth: 1825
- location: Lancashire
- family: poor textile household
- wealth: poor
- education: low
- health: moderate

### Context
Industrial textile economy.
Factory employment common.
Child labor regulation exists but evolves through the period.

### Age 10
Choice:
- work full time
- attend available schooling
- apprentice elsewhere

### Age 15
Gets textile mill employment.

### Age 22
Machine injury.

Consequences:
- health down
- temporary unemployment
- employer compensation depends on date/law
- family finances damaged

### Age 25
Workers organize.

Choices:
- avoid conflict
- participate
- become organizer

### Long-term
If organizer:
- reputation among workers increases
- employer hostility possible
- political network develops

### Historical consequence
Potential local divergence only.

---

## Example B — Bengal Artisan

### Setup
- birth: 1840
- location: Bengal
- family: weaving household
- wealth: modest
- skill: high
- literacy: low

### Age 15
Imported manufactured cloth creates price pressure.

Choices:
- continue traditional craft
- specialize
- migrate to Calcutta
- seek merchant partnership
- enter another occupation

### Age 20
Railway access changes migration opportunity.

### Age 24
Moves to Calcutta.

Possible career:
- dock work
- clerkship if literacy improves
- mill employment
- trade

### Long-term
Family can transition from artisan production into urban wage work or commerce.

---

## Example C — Qing Merchant in Shanghai

### Setup
- birth: 1870
- location: Shanghai
- family: merchant
- legal context: treaty-port environment

### Age 18
Works with foreign-connected trading house.

### Event
Telegraph access expands.

Choices:
- invest
- remain traditional merchant
- learn foreign language
- enter shipping
- finance industrial venture

### Political crisis
Boxer period.

Consequences depend on:
- location
- foreign connections
- ethnicity/nationality
- political activity

### Long-term
Could become industrial investor, remain merchant, lose property, or migrate.

---

## Example D — Japanese Farmer During Meiji Transformation

### Setup
- birth: 1865
- rural Japan
- farmer household

### Childhood
New state schooling becomes available.

Choice:
- continue farm work
- attend school
- apprentice

### Adolescence
Conscription system becomes relevant.

### Age 20
Possible military service.

### Age 25
Railway connects region.

Choices:
- migrate
- remain farmer
- factory employment
- become merchant

### Long-term
Technology and education create social mobility that would have been less available under earlier institutions.

---

## Example E — American Industrial Immigrant

### Setup
- birth: 1875
- arrives in U.S. as teenager
- New York

### Initial state
- low wealth
- limited English
- strong family network

### Choices
- factory work
- apprenticeship
- street trade
- migration west
- union activity

### Event
Industrial strike.

Possible consequences:
- wage change
- dismissal
- arrest
- union reputation
- migration

### Long-term
Can become skilled worker, business owner, organizer or remain precarious.

---

# 27. DATA MODEL REQUIREMENTS

## 27.1 Era

```text
Era
- id
- name
- global_start
- global_end
- macro_periods
- supported_regions
- transition_rules
```

## 27.2 SubEra

```text
SubEra
- id
- era_id
- start
- end
- regional_overrides
- technology_state
- political_state
- economy_state
```

## 27.3 Region

```text
Region
- id
- name
- parent_region
- geographic_bounds
- valid_dates
- political_entities
- cultures
- religions
- languages
- industries
- agriculture
- hazards
```

## 27.4 Location

```text
Location
- id
- name
- region_id
- coordinates
- population_by_date
- urbanization_by_date
- industries_by_date
- transport_links
- institutions
- historical_events
```

## 27.5 PoliticalEntity

```text
PoliticalEntity
- id
- name
- government_type
- start
- end
- territory_by_date
- ruler
- laws
- taxation
- military
- diplomatic_relations
```

## 27.6 Faction

```text
Faction
- id
- name
- type
- ideology_or_goal
- members
- territory
- leaders
- rivals
- allies
- historical_constraints
```

## 27.7 SocialClass

```text
SocialClass
- id
- region
- start
- end
- wealth_range
- rights
- restrictions
- occupations
- education_access
- marriage_patterns
- political_access
- mobility_rules
```

## 27.8 Occupation

```text
Occupation
- id
- name
- valid_dates
- valid_regions
- required_skill
- required_literacy
- wage_range
- hazards
- prestige
- social_mobility
- technology_dependencies
```

## 27.9 HistoricalEvent

```text
HistoricalEvent
- id
- name
- start
- end
- locations
- participants
- causes
- fixed_outcomes
- branch_points
- affected_groups
- player_entry_conditions
- divergence_threshold
```

## 27.10 HistoricalFigure

```text
HistoricalFigure
- id
- name
- birth
- death
- roles
- locations
- factions
- fixed_events
- interaction_rules
- divergence_rules
```

## 27.11 Technology

```text
Technology
- id
- name
- invention_date
- adoption_start
- adoption_by_region
- required_infrastructure
- economic_effects
- occupational_effects
- military_effects
```

Important: invention date and adoption date are separate.

## 27.12 Religion

```text
Religion
- id
- region
- valid_dates
- institutions
- practices
- social_effects
- conversion_rules
```

## 27.13 Culture

```text
Culture
- id
- region
- dates
- languages
- family_patterns
- festivals
- marriage_norms
- social_norms
- food
- dress
- taboos
```

## 27.14 RandomEvent

```text
RandomEvent
- id
- category
- conditions
- probability_modifier
- choices
- consequences
- cooldown
```

## 27.15 Choice

```text
Choice
- id
- event_id
- requirements
- visible_text
- hidden_requirements
- immediate_effects
- delayed_effects
- social_effects
- family_effects
- historical_effects
```

## 27.16 Consequence

```text
Consequence
- type
- magnitude
- duration
- target
- trigger
- probability
- historical_divergence
```

## 27.17 CharacterState

```text
CharacterState
- age
- location
- political_entity
- family
- wealth
- health
- skill
- literacy
- reputation
- influence
- military_ability
- occupation
- education
- relationships
- legal_status
- religious_context
- cultural_context
- injuries
- diseases
- debt
- property
```

## 27.18 WorldState

```text
WorldState
- current_date
- political_entities
- wars
- economies
- technology_adoption
- transport_network
- communications_network
- epidemics
- disasters
- active_events
- divergence_state
```

## 27.19 Timeline

```text
Timeline
- baseline_history
- player_divergences
- modified_events
- causal_links
- regional_changes
- national_changes
- current_alternate_state
```

---

# 28. AGENT IMPLEMENTATION NOTES

## 28.1 MUST BE HISTORICALLY FIXED

Unless a valid divergence occurs:

- existence of political entities
- major historical dates
- major wars
- major revolutions
- historical births/deaths of important figures
- major technological invention dates
- broad legal institutions
- known territorial transfers
- major regime changes
- major infrastructure opening dates
- major historical event outcomes

The engine can still allow local uncertainty where historical records are incomplete.

## 28.2 CAN BE RANDOMIZED

- exact family
- exact household wealth within plausible band
- sibling count
- minor occupations
- minor illnesses
- local friendships
- marriage partner
- local employer
- minor business outcomes
- local weather
- individual migration decisions
- minor accidents
- personal reputation
- individual career success

## 28.3 CAN BE PLAYER-CHANGED

- career
- wealth
- marriage
- family
- business
- migration
- local reputation
- political participation
- community organization
- military choices
- some local events
- some regional events
- national events only with sufficient agency

## 28.4 REQUIRES FUTURE SYSTEM

- detailed global trade simulation
- full genealogical simulation
- realistic language acquisition
- detailed legal systems for every country
- full military simulation
- dynamic global commodity market
- complete colonial administration
- advanced alternate-history propagation
- procedural city generation
- detailed disease epidemiology
- full treaty/concession legal systems

---

# 29. HISTORICAL ACCURACY RULES FOR CODING AGENTS

1. Never infer a modern institution backward.
2. Never use a modern occupation name if the historical occupation did not exist.
3. Never make a technology available before plausible local adoption.
4. Never assume political rights from modern citizenship concepts.
5. Never assume every region industrialized at the same time.
6. Never assume industrialization equals urbanization in every location.
7. Never assume factory work is the default occupation.
8. Never collapse colonial societies into a single social class.
9. Never collapse China into one political/economic environment.
10. Never collapse Japan before and after 1868.
11. Never collapse the U.S. North, South and West into one economy.
12. Never use “Europe” as a political entity.
13. Never treat historical figures as freely available NPCs outside plausible contexts.
14. Never let the player alter a major event without an agency threshold.
15. Never use a single global mortality rate.
16. Never use a single global wage.
17. Never use a single global religion.
18. Never use a single global technology tree.
19. Always check exact date before applying a law.
20. When evidence is uncertain, preserve uncertainty instead of fabricating precision.

---

# 30. MVP RECOMMENDATION

The full era is far too large for a first implementation.

The vertical slice should target:

## 30.1 Minimum Map

### Britain
- Manchester
- Liverpool
- Birmingham
- London
- one Lancashire/Yorkshire rural location

### India
- Bombay
- Calcutta
- one rural Bengal location

### China
- Shanghai
- one inland Qing location

### Japan
- Tokyo
- one rural location

### United States
- New York
- one New England industrial location
- one Southern location
- one Western frontier location

Total: approximately **15 locations**.

## 30.2 MVP Date Window

Recommended:
**1830–1900**

Why:
- factory systems are meaningful
- railways emerge and expand
- Britain has mature industrial conflict
- U.S. industrialization becomes highly visible
- colonial India has railway expansion
- Qing China has major conflict and treaty-port transformation
- Meiji Japan creates a powerful industrial transformation
- enough replayability without implementing the entire 1760–1914 timeline

## 30.3 MVP Social Classes

At minimum:
- poor rural household
- agricultural household
- artisan/skilled worker
- factory worker
- merchant
- clerk/professional
- soldier
- industrial/business owner
- elite/landed household

Add regional variants.

## 30.4 MVP Careers

- farmer
- laborer
- artisan
- factory worker
- miner
- railway worker
- sailor
- soldier
- clerk
- teacher
- merchant
- engineer
- doctor
- journalist
- entrepreneur

Not all careers should be available in every location.

## 30.5 MVP Stats

Visible:
- Health
- Wealth
- Skill
- Literacy
- Reputation
- Influence

Hidden:
- disease exposure
- debt
- political suspicion
- employability
- social mobility potential

## 30.6 MVP Historical Events

At least:
- 1830s British factory reform
- 1848 European revolutions
- 1853 Indian railway opening
- 1857 Indian Rebellion
- 1850–1864 Taiping Rebellion
- 1861–1865 U.S. Civil War
- 1868 Meiji Restoration
- 1870s labor/industrial conflicts
- 1890s Japanese expansion / Sino-Japanese War
- 1899–1901 Boxer crisis

## 30.7 MVP Random Events

At least:
- job opportunity
- unemployment
- workplace accident
- illness
- family death
- marriage
- child birth
- migration opportunity
- strike
- harvest failure
- fire
- flood
- local political event
- military recruitment

## 30.8 MVP Historical Figures

Use 10–15 figures initially, only when relevant to the active region/date.

## 30.9 MVP Divergence

Only:
- personal
- family
- local

Allow regional divergence as a rare late-game outcome.

Do not implement full national alternate-history propagation in the first version.

---

# 31. CONTENT PRIORITY

## P0 — Required for MVP

### World
- date-aware location system
- political entity system
- basic regional contexts
- family generation

### Character
- health
- wealth
- skill
- literacy
- reputation
- influence
- occupation

### Economy
- wage bands
- household expenses
- employment
- property
- debt

### Society
- social origin
- marriage
- family
- education
- migration

### Technology
- factory
- steam
- railway
- telegraph
- basic industrial machinery

### History
- fixed event timeline
- event triggers
- local divergence

### UI
- historical context panel
- date
- location
- occupation
- family
- active historical event
- “why this happened” explanation

---

## P1 — Important

- detailed laws
- expanded labor movement
- political organizations
- treaty ports
- colonial institutions
- advanced military system
- disease system
- public health
- newspapers
- business ownership
- inheritance
- property ownership
- education institutions
- historical figure interactions

---

## P2 — Expansion

- full Europe
- Russia
- Ottoman Empire
- Southeast Asia
- Africa
- Latin America
- detailed imperial trade
- advanced industrial corporations
- detailed railway logistics
- sophisticated financial markets
- professional scientific careers
- early electrical networks

---

## P3 — Future

- full global 1760–1914 simulation
- procedural alternate history
- detailed language politics
- complete global trade model
- detailed individual military campaigns
- full city simulation
- fully simulated newspapers
- procedural invention system
- generational industrial dynasties
- global population simulation

---

# 32. UI / PLAYER INFORMATION RULES

The player should always understand the historical context without needing to read a history textbook.

Every major event should show:

**WHERE**
- city/region

**WHEN**
- exact date/year

**WHAT IS HAPPENING**
- short contextual explanation

**WHY IT MATTERS TO YOU**
- personalized explanation

**WHAT YOU CAN DO**
- available choices

Example:

> **Manchester, 1847**  
> Factory regulations have recently changed the working conditions of women and young workers. Your employer is changing shift arrangements.  
>  
> **Why it matters:** Your household depends on your wages.  
>  
> **Available choices:** Accept / refuse / organize with coworkers / seek another job.

This avoids historical events feeling like random popups.

---

# 33. SIMULATION RULES

## 33.1 Context engine

At character creation:

```text
Input:
birth_date
birth_location

Resolve:
political_entity
regional_context
sub_era
technology_state
economic_state
social_rules
legal_rules
religious_context
education_access
health_environment
historical_events
```

## 33.2 Event engine

For every event:

```text
Check date
Check location
Check political entity
Check social class
Check occupation
Check prerequisites
Check world state
Generate event
Generate choices
Apply consequences
Evaluate divergence
```

## 33.3 Historical event probability

Historical events should generally be deterministic when they are major known events.

Randomness should determine:
- whether the player's character is directly exposed
- where they are
- who they know
- what opportunity appears
- whether they survive an individual danger

Do not randomize whether the American Civil War “might happen” in a normal baseline timeline.

---

# 34. DESIGN PHILOSOPHY: HISTORY AS A SYSTEM

LegacyLife should not ask:

> “What happened in 1857?”

It should ask:

> “What does 1857 mean to THIS character?”

For example, the same historical event can produce:

### Rural farmer
- military recruitment
- food disruption
- fear
- migration

### Merchant
- supply disruption
- opportunity
- political risk

### Soldier
- direct combat
- promotion
- injury
- death

### Child
- family separation
- school disruption
- relocation

### Wealthy landholder
- property risk
- political negotiation
- militia involvement

This is the central design requirement for the entire era.

---

# 35. OPEN QUESTIONS

These should be resolved before final production implementation.

## Historical research questions
1. Which exact territories will be supported in MVP?
2. How much detail will be given to caste/community systems in South Asia?
3. How will slavery and racial/legal status be represented without flattening regional differences?
4. Which Qing legal institutions need detailed modeling?
5. How detailed should treaty-port extraterritoriality become?
6. How will gender-specific legal restrictions be represented across countries?
7. Which historical currency conversion model will be used?

## Product questions
1. Is the game globally open from the start or region-unlocked?
2. Can players intentionally choose a historical figure's location?
3. How much historical divergence is acceptable?
4. Should the game show real historical outcomes after death?
5. Should alternate-history timelines persist between generations?
6. Can a player's descendants inherit a changed world?
7. How much violence/disaster detail is appropriate for the target age rating?

## Technical questions
1. How granular should the location graph be?
2. How many historical events can the engine evaluate per turn?
3. How should causal divergence be stored?
4. How will historical data be versioned?
5. How will contradictory sources be represented?
6. How will uncertain dates be represented?
7. How will the engine prevent impossible technology combinations?

---

# 36. ERA IDENTITY

## Era Identity

**Industrial transformation under unequal conditions.**

The world changes from predominantly agrarian/local production toward machine production, fossil-fuel energy, mass transportation, mass communication, modern bureaucracy, industrial cities, global markets and increasingly centralized nation-states.

But the transformation is unequal.

Some characters experience:
- factories
- railways
- telegraphs
- education
- rising wages
- entrepreneurship

Others experience:
- displacement
- dangerous labor
- colonial extraction
- war
- famine
- disease
- discrimination
- loss of traditional occupations

The simulation must contain both.

---

# 37. PLAYER FANTASY

The player should feel:

> **“I am a person trying to survive and build a life while the world itself is being rebuilt.”**

Possible fantasies:
- survive factory life
- become an engineer
- build a business
- migrate to a city
- become a railway worker
- become wealthy
- remain a successful farmer
- join a labor movement
- become a soldier
- become a reformer
- build an industrial dynasty
- preserve a traditional craft
- become a journalist
- become a political actor
- change a local historical outcome
- eventually influence national history

---

# 38. CORE GAMEPLAY

The primary gameplay loop is:

```text
LIVE
↓
WORK
↓
EARN / LOSE
↓
LEARN
↓
FORM RELATIONSHIPS
↓
RESPOND TO HISTORICAL CHANGE
↓
MAKE CHOICES
↓
BUILD FAMILY / STATUS / WEALTH
↓
MOVE OR STAY
↓
ADAPT TO TECHNOLOGY / POLITICS / WAR
↓
INFLUENCE THE WORLD
↓
DIE
↓
LEAVE A LEGACY
```

The game is not primarily about winning.

It is about:
- survival
- adaptation
- relationships
- social mobility
- historical participation
- generational legacy

---

# 39. MAJOR SYSTEMS

Essential systems for the era:

1. Date-aware world generation
2. Date-aware political map
3. Location economy
4. Family generation
5. Occupation system
6. Education
7. Marriage/family
8. Health/disease
9. Technology adoption
10. Transportation
11. Historical event engine
12. Choice/consequence engine
13. Migration
14. Wealth/property
15. Social status
16. Historical divergence
17. Legacy/genealogy

---

# 40. HISTORICAL HOOK

The strongest hook is the contradiction at the center of industrialization:

> **The same machine that creates a fortune can destroy a livelihood.  
> The same railway that enables freedom can serve an empire.  
> The same factory that creates opportunity can create exploitation.  
> The same telegraph that spreads knowledge can accelerate political conflict.**

LegacyLife can turn these historical contradictions into meaningful personal choices.

---

# 41. MVP — FINAL RECOMMENDATION

Build **1830–1900** first.

Do not attempt 1760–1914 globally in version one.

Start with:
- 15 locations
- 5 major regional contexts
- 9 social-origin categories
- 15 careers
- 6 visible stats
- 5 hidden variables
- 10–12 major historical events
- 15 random-event categories
- 10–15 historical figures
- family + marriage + children
- basic migration
- basic education
- factory/railway/telegraph technology
- local historical divergence

The first playable experience should make a player feel:

> “I was born in a real historical place, at a real historical moment, and the world around me is changing whether I want it to or not.”

Only after that vertical slice works should the team expand backward toward 1760 or forward toward 1914.

---

# 42. RESEARCH / SOURCE BASIS

The specification should be maintained with a source registry in the eventual project repository.

Useful baseline references consulted for this specification include:

- UK Parliament, historical material on early and later Factory Acts and 19th-century education.
- Library of Congress, U.S. industrialization and railroad/West timelines.
- National Park Service, U.S. Civil War industry and economy.
- Smithsonian National Museum of Asian Art, Chinese historical timeline.
- U.S. Department of State Office of the Historian, Chinese Revolution of 1911.
- Cambridge Economic History material on railways and colonial India.
- OpenStax World History, Industrial Revolution and Meiji/India overview.
- Economic-history research on Qing fiscal decentralization and industrialization.
- Historical references on Meiji industrialization and state-building.

Important source discipline:
- primary/official sources should be preferred for exact legal dates and institutional facts;
- scholarly economic-history sources should be preferred for contested economic interpretation;
- general reference sources can provide orientation but should not be treated as the final authority for disputed claims;
- uncertainty must be represented explicitly in the data model.

---

# 43. FINAL IMPLEMENTATION PRINCIPLE

The coding agent must never ask:

> “What does the Industrial Revolution usually look like?”

It must ask:

> “What was true for this exact character, in this exact place, on this exact date?”

That is the authoritative rule for LegacyLife Era 8.

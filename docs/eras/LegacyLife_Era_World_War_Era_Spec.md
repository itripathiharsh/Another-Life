# LegacyLife — Historical Era Specification
## Era: World War Era
### World War I → Interwar World → World War II
**Document type:** Historical Simulation / Game Development Specification  
**Status:** Authoritative starting specification for AI coding agents  
**Recommended simulation window:** 1910–1948  
**Primary war windows:** 1914–1918 and 1939–1945  
**Interwar window:** 1919–1939  
**Postwar handoff:** 1945–1948, only for aftermath/legacy unless a later Cold War era is implemented separately.

---

# 0. PURPOSE AND CORE DESIGN RULE

LegacyLife is a choice-driven historical life simulator. The player does not enter an abstract “World War Era.” They enter a specific historical world determined by:

```text
BIRTH DATE
+
BIRTH LOCATION
+
POLITICAL TERRITORY
+
LEGAL STATUS
+
SOCIAL POSITION
+
FAMILY
=
HISTORICAL WORLD
```

The same year can create radically different lives.

A person born in:
- London in 1916
- Berlin in 1916
- Bombay in 1916
- Petrograd in 1916
- Shanghai in 1916
- Tokyo in 1916
- New York in 1916
- Cairo in 1916

must not receive the same political rights, economy, education, military obligations, risks, or relationship with the war.

Likewise, a person born in Warsaw in 1939, Paris in 1939, London in 1939, Delhi in 1939, Shanghai in 1939, Tokyo in 1939, New York in 1939, or Moscow in 1939 is entering completely different historical systems.

## Authoritative simulation rule

The coding agent must always resolve:

```text
EXACT DATE
→ POLITICAL ENTITY
→ LOCAL GOVERNMENT
→ LEGAL STATUS
→ SOCIAL CLASS / COMMUNITY
→ WAR STATUS
→ OCCUPATION
→ TECHNOLOGY
→ ECONOMIC CONDITIONS
→ ACTIVE HISTORICAL EVENTS
→ PLAYER OPTIONS
```

Never resolve “World War Era” from the year alone.

---

# 1. ERA OVERVIEW

## 1.1 Name

**Human name:** World War Era

**Internal ID:** `world_war_era`

## 1.2 Recommended date boundary

### Simulation start
**1910**

Reason:
- allows pre-WWI geopolitical tension
- Balkan crises
- arms races
- nationalism
- imperial politics
- suffrage movements
- migration
- colonial societies before wartime disruption

### Main boundary
**1914–1945**

### Optional aftermath
**1945–1948**

The 1945–1948 period should primarily represent:
- demobilization
- displacement
- occupation
- reconstruction
- decolonization pressures
- refugee/displaced-person experiences
- political reordering

Do not turn 1945 immediately into the Cold War era. That should be a future context.

## 1.3 Major macro-periods

```text
A. Prewar Crisis
1910–1914

B. First World War
1914–1918

C. Revolutionary / Postwar Transition
1917–1923

D. Relative Stabilization / Interwar Society
1924–1928

E. Great Depression and Political Radicalization
1929–1933

F. Authoritarian Expansion and Prewar Crisis
1933–1939

G. Second World War
1939–1945

H. Immediate Postwar Aftermath
1945–1948
```

These periods overlap by region.

For example:
- Russia experiences revolution in 1917 while the First World War is still active.
- China is affected by the war despite not having the same European home-front structure.
- Japan's experience during WWI is very different from its experience during WWII.
- India participates in both world wars while remaining under British colonial rule.
- the United States is neutral during part of each European war before becoming a belligerent.

---

# 2. WHY THIS ERA IS IDEAL FOR LEGACYLIFE

This era is one of the strongest possible contexts for a life simulator because historical forces penetrate ordinary life.

A player can experience:

- conscription
- military service
- battlefield injury
- civilian bombing
- rationing
- inflation
- unemployment
- refugee movement
- occupation
- political repression
- censorship
- propaganda
- technological change
- women's changing labor roles
- expanded voting rights in some states
- revolution
- fascism
- communism
- democracy
- colonial rule
- anti-colonial movements
- economic collapse
- mass migration
- scientific advances
- radio and cinema
- mechanized warfare
- genocide and persecution
- resistance
- collaboration
- survival
- postwar rebuilding

The era should not be presented as constant combat.

For most players, much of the game is:

> **Trying to live an ordinary life while governments, economies and wars increasingly make ordinary life impossible to separate from history.**

---

# 3. HISTORICAL ACCURACY PRINCIPLES

## 3.1 Do not treat the two World Wars as identical

WWI:
- mass mobilization
- trenches
- artillery
- machine guns
- chemical warfare
- naval blockade
- imperial mobilization
- rail-based logistics
- huge armies
- gradual mechanization

WWII:
- mechanized/mobile warfare
- strategic bombing
- aircraft carriers
- radar
- submarines
- tanks
- occupation regimes
- genocide
- mass displacement
- industrialized killing
- atomic weapons

The military technology and civilian experience must therefore evolve.

## 3.2 Do not treat “Europe” as one region

At minimum distinguish:
- Britain
- France
- Germany
- Austria-Hungary / successor states
- Russia / Soviet Russia / USSR
- Poland
- Balkans
- Italy
- Spain
- Scandinavia
- Benelux
- Baltic states

## 3.3 Do not treat colonies as extensions of European civilian life

Colonial subjects can experience:
- imperial military recruitment
- taxation
- wartime shortages
- censorship
- economic extraction
- political mobilization
- anti-colonial activism
- famine
- changing legal status
- racial hierarchy
- labor migration

India, Egypt, French North Africa, Southeast Asia and African colonies need separate contexts.

## 3.4 Do not treat neutrality as “nothing happens”

Neutral countries can experience:
- refugee flows
- shortages
- espionage
- censorship
- trade disruption
- inflation
- political tension
- arms trafficking
- humanitarian activity
- intelligence work

---

# 4. TEMPORAL BREAKDOWN

# 4.1 PREWAR CRISIS — 1910–1914

## Historical state

Europe remains dominated by empires and competing alliances.

Major powers include:
- British Empire
- French Republic / French Empire
- German Empire
- Russian Empire
- Austria-Hungary
- Ottoman Empire
- Italy
- Japan
- United States

Important tensions:
- Balkan nationalism
- imperial competition
- naval arms competition
- German-French rivalry
- Austro-Serbian/Russian tensions
- colonial competition
- alliance commitments

## Player experience

Possible lives:
- factory worker
- farmer
- merchant
- student
- soldier
- colonial subject
- immigrant
- political activist
- suffrage campaigner
- journalist
- aristocrat
- civil servant

## Gameplay identity

**A normal life under growing geopolitical pressure.**

Historical events should gradually alter:
- military readiness
- newspapers
- political speeches
- prices
- recruitment
- public anxiety

Do not immediately tell the player that world war is inevitable.

---

# 4.2 WORLD WAR I — 1914–1916

## Trigger

The Sarajevo assassination on 28 June 1914 becomes a major historical trigger, followed by the July Crisis and declarations of war.

The engine should treat the outbreak as historically constrained.

A baseline timeline should not randomly decide that WWI does not happen.

## Major fronts

- Western Front
- Eastern Front
- Italian Front
- Balkan Front
- Gallipoli
- Caucasus
- Middle Eastern fronts
- African campaigns
- naval war
- colonial theaters

## Military transformation

The war becomes a mass industrial conflict.

Important systems:
- trenches
- artillery
- machine guns
- barbed wire
- poison gas
- aircraft
- submarines
- tanks later
- rail logistics
- field hospitals
- telephones
- telegraph
- censorship

The International Encyclopedia of the First World War explicitly treats WWI as a global war involving non-European states and colonial resources, rather than only a Western European trench conflict. citeturn2search2

## Player experience

### Soldier
- recruitment
- training
- deployment
- leave
- combat
- wounds
- shell shock/psychological trauma should be represented carefully
- capture
- survival
- promotion
- death

### Civilian
- rationing
- labor shortages
- wartime employment
- family separation
- casualty notifications
- censorship
- air raids depending on location
- inflation

### Colonial subject
- recruitment
- overseas deployment
- wartime labor
- political awareness
- economic disruption
- unequal status

---

# 4.3 WORLD WAR I — TOTAL WAR / HOME FRONT — 1916–1918

The war increasingly becomes a whole-society system.

## Home-front systems

- rationing
- food production
- industrial production
- war bonds
- propaganda
- censorship
- women's employment
- conscription
- casualty lists
- disabled veterans
- refugees
- labor disputes
- strikes
- inflation
- black markets

## Technology

- tanks
- aircraft
- improved artillery coordination
- wireless communication
- anti-aircraft systems
- submarines
- poison gas
- improved medical evacuation

The 1918 Western Front was substantially more mobile than earlier trench warfare, reflecting technological and tactical development during the war. citeturn2search6

---

# 4.4 REVOLUTIONARY TRANSITION — 1917–1923

This period must be its own simulation state.

Major transformations:
- Russian Revolution
- Bolshevik takeover
- Russian Civil War
- collapse of empires
- Austro-Hungarian collapse
- Ottoman collapse
- creation/recreation of states
- Treaty of Versailles
- League of Nations
- border changes
- refugee movements

## Russia

Possible player experiences:
- soldier
- peasant
- worker
- revolutionary
- civil servant
- aristocrat
- refugee
- White/Red faction participant
- political prisoner
- civilian in famine/war conditions

The player can experience multiple successive governments during one lifetime.

This is essential.

---

# 4.5 INTERWAR STABILIZATION — 1924–1928

The game must not make the entire interwar period miserable.

Some locations experience:
- economic growth
- cultural experimentation
- consumer goods
- cinema
- radio
- automobiles
- aviation
- nightlife
- expanding education
- political participation
- new mass culture

But the same period contains:
- political violence
- unresolved territorial disputes
- authoritarian movements
- colonial inequality
- social conflict

## Gameplay identity

**Modernity mixed with unresolved trauma.**

---

# 4.6 GREAT DEPRESSION — 1929–1933

The stock-market crash and financial crisis become a global economic event.

The Great Depression was global and its origins are debated; the U.S. State Department notes that postwar financial instability, gold-standard rigidity, the 1929 U.S. crash, and financial difficulties in European economies interacted to deepen the crisis. citeturn2search1

## Player effects

- unemployment
- business failures
- bank failures
- lost savings
- home/land loss
- migration
- hunger
- political radicalization
- reduced marriage rates in some contexts
- delayed childbirth
- government relief
- labor organizing

The U.S. provides a useful benchmark: by 1932 about one in four workers was unemployed. citeturn1search10

Do not apply that exact number globally.

---

# 4.7 AUTHORITARIAN EXPANSION — 1933–1939

Major contexts:
- Nazi Germany
- Fascist Italy
- Stalinist USSR
- militarist Japan
- authoritarian regimes in parts of Europe
- democratic states under pressure

## Germany

After Hitler becomes Chancellor in 1933:
- one-party dictatorship
- political repression
- antisemitic legislation
- rearmament
- propaganda
- persecution
- concentration camps
- territorial expansion

The Nazi regime transformed Germany from a multiparty republic into a dictatorship and progressively excluded Jews and other targeted groups from civic life. citeturn0search1

## Japan

Important systems:
- military influence
- imperial expansion
- Manchuria
- China war
- state mobilization
- censorship
- political repression

Japan's 1931 seizure of Manchuria is a key pre-WWII divergence point. citeturn2search8

## Spain

Spanish Civil War:
- 1936–1939
- ideological polarization
- foreign intervention
- refugee movement
- military/civilian participation

## Gameplay identity

**Political choices become dangerous.**

A player may have to decide:
- conform
- resist
- stay silent
- flee
- organize
- hide
- collaborate
- assist targeted people
- join state organizations

Choices must carry realistic risk.

---

# 4.8 WORLD WAR II — 1939–1941

WWII begins in Europe with Germany's invasion of Poland on 1 September 1939. Germany then rapidly defeats/occupies Denmark, Norway, Belgium, the Netherlands, Luxembourg and France in 1940; Germany invades the Soviet Union in June 1941. citeturn0search0turn0search1

## Player systems

- mobilization
- occupation
- bombing
- evacuation
- rationing
- resistance
- collaboration
- military service
- industrial work
- refugee movement
- persecution
- imprisonment
- censorship

---

# 4.9 GLOBALIZATION OF WWII — 1941–1943

Key transition:
- Germany invades USSR
- Japan attacks Pearl Harbor
- U.S. enters war
- war becomes truly global

Japan's attacks extend across:
- Philippines
- Malaya
- Singapore
- Dutch East Indies
- Burma
- Pacific islands

The U.S. mobilizes its economy and population on a massive scale; millions serve in the armed forces and millions more work in defense industries. citeturn1search6

## Major theaters

### Europe
- Eastern Front
- Western Europe
- Mediterranean
- Balkans

### North Africa
- Egypt
- Libya
- Tunisia

### Asia
- China
- Burma
- India borderlands
- Southeast Asia

### Pacific
- Philippines
- Guadalcanal
- Midway
- New Guinea
- Pacific islands

---

# 4.10 HOLOCAUST / GENOCIDE AND PERSECUTION SYSTEM

This requires an explicit historical system, not a generic “bad event.”

The Holocaust was the systematic, state-sponsored persecution and murder of six million Jews by Nazi Germany and its allies and collaborators. Nazi policy escalated from persecution to genocide during the war. citeturn0search3

The simulation must represent:
- antisemitic laws
- exclusion
- confiscation
- forced identification
- ghettos
- deportation
- forced labor
- mass murder
- resistance
- hiding
- escape
- rescue
- survival
- postwar displacement

Other groups targeted by Nazi persecution and mass violence must also be represented where historically relevant.

## Critical gameplay rule

Do not gamify genocide as:
- a “fun choice”
- a reward
- a generic combat mission
- a score optimization system

Player agency should focus on:
- survival
- resistance
- escape
- hiding
- rescue
- documentation
- family protection
- moral risk

Historical atrocities must retain historical gravity.

---

# 4.11 WORLD WAR II — 1943–1945

Major turning points:
- Stalingrad
- Kursk
- North Africa
- Italy
- D-Day
- Soviet offensives
- liberation of occupied territories
- Warsaw Uprising
- fall of Berlin
- German surrender
- atomic bombings
- Soviet entry into war against Japan
- Japanese surrender

US Holocaust Memorial Museum's timeline records D-Day on 6 June 1944, the liberation of Paris in August, Soviet advances in 1944–45, German surrender in May 1945, the Hiroshima/Nagasaki bombings, Soviet entry against Japan, and Japan's formal surrender on 2 September 1945. citeturn0search0

---

# 4.12 IMMEDIATE POSTWAR — 1945–1948

Systems:
- demobilization
- rationing
- destroyed cities
- displaced persons
- refugees
- war crimes trials
- occupation zones
- reconstruction
- political realignment
- independence movements
- decolonization pressure

US Holocaust Memorial Museum notes that the end of WWII left millions displaced and created major humanitarian, housing, food, repatriation, denazification and justice problems. citeturn0search3

---

# 5. GEOGRAPHIC BREAKDOWN

The MVP should not attempt every country.

Use **historical context clusters**.

---

# 5.1 BRITAIN

## Political system

1910–1914:
- constitutional monarchy
- Parliament
- expanding suffrage
- empire

1914–1918:
- wartime government
- conscription from 1916
- wartime economic controls

Interwar:
- parliamentary democracy
- labor politics
- economic instability

1939–1945:
- wartime government
- conscription
- rationing
- bombing
- evacuation
- total-war economy

## Major cities
- London
- Manchester
- Birmingham
- Liverpool
- Glasgow
- Sheffield
- Cardiff
- Belfast
- Edinburgh

## Occupations
- soldier
- sailor
- factory worker
- miner
- engineer
- railway worker
- civil servant
- teacher
- nurse
- doctor
- clerk
- merchant
- journalist

## Risks
- wartime death
- bombing
- industrial accident
- unemployment
- inflation
- rationing

---

# 5.2 FRANCE

## WWI
- major Western Front
- occupation of northern/eastern areas
- trench warfare
- huge military mobilization
- civilian disruption

## Interwar
- reconstruction
- political instability
- cultural growth
- colonial empire
- economic fluctuations

## WWII
- defeat in 1940
- German occupation
- Vichy regime
- Free French
- Resistance
- collaboration
- liberation

Player contexts:
- Paris civilian
- rural farmer
- soldier
- resistance participant
- factory worker
- collaborator
- refugee
- Jewish French citizen / immigrant
- colonial soldier

---

# 5.3 GERMANY

## 1910–1918
German Empire.

## 1918–1933
- revolution
- Weimar Republic
- inflation
- political violence
- democratic institutions
- cultural experimentation
- Great Depression

## 1933–1945
- Nazi dictatorship
- rearmament
- persecution
- war
- occupation
- bombing
- forced labor
- total war
- collapse

## Player contexts

Possible:
- worker
- soldier
- civil servant
- business owner
- student
- Jewish citizen
- political dissident
- disabled person targeted by Nazi policy
- refugee
- forced laborer
- resistance participant

The engine must never assume that all Germans supported the regime.

---

# 5.4 RUSSIA / SOVIET UNION

## 1910–1917
Russian Empire.

Systems:
- monarchy
- peasantry
- industrial workers
- military
- political repression
- revolutionary movements

## 1917
- February Revolution
- Provisional Government
- October Revolution

## 1918–1921
Civil War.

Possible player factions:
- Red
- White
- nationalist/regional
- civilian
- peasant
- refugee

## 1920s
- Soviet consolidation
- NEP
- urbanization
- political control

## 1930s
- collectivization
- industrialization
- repression
- purges
- famine in affected regions
- state control

## WWII
- massive military mobilization
- Eastern Front
- occupation
- siege
- partisan activity
- evacuation
- enormous civilian and military losses

---

# 5.5 POLAND AND EASTERN EUROPE

Poland is particularly important because its political existence and borders change during the era.

Contexts:
- partitioned territories before/around WWI
- German/Austro-Hungarian/Russian control
- independence after WWI
- interwar Poland
- invasion and occupation in WWII
- Holocaust
- resistance
- postwar border changes

Other regions:
- Czechoslovakia
- Hungary
- Romania
- Yugoslavia
- Baltic states
- Balkans

These should use separate political entities.

---

# 5.6 ITALY

WWI:
- enters on Allied side in 1915
- major Alpine front
- high casualties

Interwar:
- economic/social unrest
- Fascist rise
- Mussolini dictatorship

WWII:
- Axis
- North Africa
- invasion of Greece
- Allied invasion
- 1943 regime collapse
- German occupation
- Italian Social Republic
- resistance
- liberation

---

# 5.7 UNITED STATES

## 1914–1917
Neutrality.

## 1917–1918
War participation.

The U.S. entered WWI in April 1917. citeturn1search4

## 1920s
- consumer economy
- mass production
- radio
- cinema
- automobiles
- cultural change
- immigration restriction

## 1929–1939
- Great Depression
- unemployment
- New Deal
- Dust Bowl
- labor organizing
- isolationist tendencies
- rising concern over fascism

## 1941–1945
- Pearl Harbor
- mobilization
- military service
- defense industries
- rationing
- women in industrial jobs
- Japanese American incarceration
- war production

The U.S. wartime economy created millions of jobs and dramatically increased industrial employment, while Japanese Americans were forcibly confined under wartime policy. citeturn1search6

---

# 5.8 JAPAN

## 1910s
- empire
- industrialization
- WWI participation
- expansion in Asia

## 1920s
- parliamentary tendencies
- urban modernity
- industrial growth

## 1930s
- militarization
- Manchuria
- war in China
- censorship
- political repression

## 1941–1945
- Pacific War
- mobilization
- bombing
- rationing
- military service
- civilian casualties
- atomic bombings

---

# 5.9 CHINA

China requires special treatment because the period contains:
- Republic of China
- warlordism
- Chinese Civil War
- Japanese invasion
- occupation
- resistance
- Nationalist government
- Communist movement

Important events:
- 1911 Revolution aftermath
- 1916 onward warlord period
- May Fourth movement, 1919
- Northern Expedition
- 1927 Nationalist-Communist split
- 1931 Manchurian crisis
- 1937 full-scale Sino-Japanese War
- WWII
- resumed civil war after 1945

---

# 5.10 INDIA

India remains under British rule throughout both World Wars.

Player systems:
- colonial legal status
- caste/community context
- religious identity
- military recruitment
- agricultural economy
- industrial labor
- nationalist politics
- censorship
- wartime shortages
- famine
- anti-colonial movements

Important events:
- WWI recruitment
- Rowlatt Act
- Jallianwala Bagh
- Non-Cooperation
- Civil Disobedience
- Government of India Act 1935
- WWII recruitment
- Quit India movement
- Bengal famine 1943
- Indian National Army
- independence approaching after WWII

Do not make independence happen early unless divergence is sufficiently powerful.

---

# 5.11 MIDDLE EAST / NORTH AFRICA

Important contexts:
- Ottoman Empire
- Arab provinces
- British/French mandates
- Egypt
- Palestine
- Iraq
- Syria
- Lebanon
- Arabia

Systems:
- imperial collapse
- nationalism
- mandate administration
- military service
- oil later becomes increasingly important
- migration
- political movements

---

# 5.12 AFRICA

The war experience is highly colonial and regional.

Possible contexts:
- British colonies
- French colonies
- Belgian Congo
- Portuguese colonies
- South Africa
- Ethiopia
- Italian East Africa

Player experiences:
- colonial soldier
- porter
- farmer
- mine worker
- clerk
- teacher
- merchant
- nationalist
- missionary-associated worker

Do not reduce African participation to “colonial troops.”

---

# 5.13 SOUTHEAST ASIA

Important contexts:
- British Burma/Malaya
- French Indochina
- Dutch East Indies
- Philippines
- Japanese occupation

WWII dramatically changes:
- colonial authority
- food systems
- labor
- military recruitment
- nationalist movements

---

# 6. HISTORICAL WORLD MODEL

## 6.1 Entity hierarchy

```text
World
 ├── Political Entities
 │    ├── Government
 │    ├── Military
 │    ├── Laws
 │    └── Factions
 │
 ├── Regions
 │    ├── Cities
 │    ├── Villages
 │    ├── Fronts
 │    └── Occupied Zones
 │
 ├── Institutions
 │    ├── Army
 │    ├── Police
 │    ├── Schools
 │    ├── Factories
 │    ├── Newspapers
 │    ├── Parties
 │    ├── Religious institutions
 │    └── Relief organizations
 │
 ├── Families
 │
 └── Characters
```

Cross-cutting:
- economy
- war
- migration
- disease
- technology
- propaganda
- communication
- law
- occupation

---

# 7. PLAYER CREATION

## 7.1 Inputs

### Auto Create
System chooses:
- date
- location
- family
- legal/social context

### Custom Life
Player chooses:
- birth date/year
- location

Optional:
- gender/sex
- difficulty
- family class
- historical knowledge mode

If the player chooses a date but not a location, the engine chooses location according to the selected world distribution.

## 7.2 Derived variables

The engine resolves:
- nationality/citizenship or colonial status
- legal rights
- social class
- family occupation
- religion/community
- language
- education access
- military obligations
- economic environment
- war status
- health environment
- political environment

## 7.3 Family

Generate:
- parents
- siblings
- household structure
- occupation
- income
- property
- debt
- political status
- social network
- community
- military connections
- migration history

---

# 8. SOCIAL CLASSES AND LIFE PATHS

Social class must be region-specific.

## 8.1 General categories

Possible:
- rural poor
- industrial worker
- skilled worker
- lower middle class
- professional middle class
- merchant
- small business owner
- wealthy industrialist
- landed elite
- aristocracy
- military family
- government official
- political elite
- colonial intermediary/elite
- refugee/displaced person
- enslaved/forced labor context where historically applicable

## 8.2 Class effects

Class influences:
- education
- housing
- food
- medical care
- military role
- political access
- marriage
- occupation
- migration
- survival
- legal resources

Class must never guarantee outcomes.

---

# 9. CHILDHOOD → ADULTHOOD → OLD AGE

# 9.1 Childhood

Possible:
- school
- work
- military cadet system where applicable
- family labor
- religious education
- refugee/displacement
- evacuation
- wartime separation

## 9.2 Adolescence

Key decisions:
- continue education
- work
- apprenticeship
- military service
- migration
- political activity

## 9.3 Adulthood

Systems:
- occupation
- marriage
- children
- military
- politics
- migration
- property
- wartime choices

## 9.4 Old age

Potential:
- pension
- family support
- veteran status
- disability
- property transfer
- refugee status
- political legacy

Age rules must vary by region and historical system.

---

# 10. GAME STATS

Use a compact system.

## 10.1 Health
Represents physical condition.

Affected by:
- disease
- nutrition
- war
- occupation
- injury
- age

Visible.

## 10.2 Wealth
Relative household economic security.

Affected by:
- wages
- inflation
- unemployment
- property
- business
- war
- inheritance

Visible.

## 10.3 Skill
Occupation-specific ability.

Visible.

## 10.4 Education
Represents formal and practical education.

Visible.

## 10.5 Reputation
Local/social standing.

Visible.

## 10.6 Influence
Ability to affect people/institutions.

Visible only after meaningful development.

## 10.7 Military Readiness
Represents fitness/training/relevant military capability.

Visible if military-relevant.

## 10.8 Political Access
Derived rather than directly assigned.

Depends on:
- citizenship
- legal status
- sex/gender restrictions
- class
- regime
- occupation
- location
- date

## 10.9 Survival Resilience
Hidden variable.

Affected by:
- health
- skills
- resources
- relationships
- local conditions

## 10.10 Trauma / Stress
Hidden or semi-visible.

Affected by:
- combat
- displacement
- bereavement
- persecution
- imprisonment
- bombing
- famine

It affects:
- sleep
- health
- decision-making
- relationships
- work

Do not reduce psychological trauma to a simplistic “sanity” score.

---

# 11. ECONOMY

## 11.1 Economic states

Each location has:

```text
EconomicState
- employment
- wages
- prices
- food availability
- housing
- industrial output
- agricultural output
- trade access
- inflation
- banking stability
- government controls
```

## 11.2 Major goods

Depending on region:
- grain
- coal
- steel
- textiles
- oil
- rubber
- tea
- coffee
- sugar
- cotton
- rice
- wheat
- meat
- fuel
- manufactured goods
- military equipment

## 11.3 Wartime economy

Possible controls:
- rationing
- price controls
- requisition
- war bonds
- compulsory labor
- industrial direction
- censorship
- export controls

## 11.4 Great Depression

Economic state can trigger:
- unemployment
- bank failures
- homelessness
- migration
- family stress
- political radicalization

The Depression should not be represented as a single “wealth -50” event.

---

# 12. POLITICS AND POWER

## 12.1 Government types

- constitutional monarchy
- parliamentary democracy
- republic
- empire
- colonial administration
- military dictatorship
- fascist dictatorship
- communist state
- authoritarian monarchy
- occupation government
- collaborationist government
- revolutionary government

## 12.2 Political participation

Possible:
- vote
- campaign
- join party
- protest
- publish
- petition
- organize labor
- run for local office
- civil service
- military service
- resistance
- underground organizing

## 12.3 Political repression

State may apply:
- censorship
- surveillance
- arrest
- imprisonment
- forced labor
- exile
- execution
- property confiscation

These are date, regime and legal-status dependent.

---

# 13. WAR AND CONFLICT

## 13.1 Conflict types

- interstate war
- civil war
- revolution
- occupation
- insurgency
- resistance
- colonial conflict
- ethnic/religious violence
- political repression

## 13.2 Military roles

- conscript
- volunteer
- infantry
- artillery
- cavalry
- tank crew
- pilot
- sailor
- submariner
- engineer
- medic
- nurse
- mechanic
- signals operator
- intelligence worker
- officer
- military administrator

## 13.3 Recruitment

Recruitment depends on:
- country
- date
- age
- sex/gender
- legal status
- physical health
- occupation
- conscription law

## 13.4 Combat

Do not make combat a turn-based tactical minigame by default.

A character's experience should be:
- deployment
- unit
- location
- exposure
- orders
- logistics
- random combat event
- injury
- survival
- capture

## 13.5 WWI combat

Important risks:
- artillery
- machine guns
- gas
- trench disease
- infection
- sniper fire
- bombardment
- shell shock
- starvation
- frostbite

## 13.6 WWII combat

Additional:
- tanks
- aircraft
- naval aviation
- strategic bombing
- submarines
- mechanized movement
- urban warfare
- partisan warfare

---

# 14. OCCUPATION SYSTEM

Occupation must be one of the core WWII systems.

When a location changes control:

```text
Location
→ Occupation State
→ New Authority
→ New Laws
→ Curfew
→ Censorship
→ Food Rules
→ Property Rules
→ Identity Rules
→ Military Presence
→ Resistance Pressure
```

Occupation can change a player's life without moving them.

## Example

A French shopkeeper remains in the same city.

Before occupation:
- normal business
- civilian law
- free movement

After occupation:
- curfew
- shortages
- military presence
- rationing
- censorship
- confiscation risk
- resistance recruitment

---

# 15. RELIGION, CULTURE AND SOCIETY

## 15.1 Relevant systems

- Christianity
- Judaism
- Islam
- Hindu traditions
- Buddhism
- Shinto
- Sikh traditions
- local/Indigenous traditions
- secularism
- political ideologies

## 15.2 Cultural systems

- family
- marriage
- gender roles
- mourning
- religious practice
- festivals
- language
- dress
- food
- community associations

## 15.3 Political ideology

Possible affiliations:
- liberalism
- conservatism
- socialism
- communism
- fascism
- nationalism
- anti-colonial nationalism
- pacifism

Ideology should be contextual, not a universal morality meter.

---

# 16. TECHNOLOGY AND KNOWLEDGE

## 16.1 Transportation

1910:
- railways
- steamships
- horse transport
- early automobiles
- early aircraft

1920s:
- cars
- buses
- commercial aviation
- improved rail

1930s:
- automobiles
- aircraft
- mechanized military transport

1940s:
- advanced aircraft
- radar-supported aviation
- aircraft carriers
- tanks
- rockets
- atomic weapons

## 16.2 Communication

- newspapers
- telegraph
- telephone
- radio
- cinema/newsreels
- propaganda broadcasts
- coded military communications

## 16.3 Medicine

Important progression:
- antisepsis
- anesthesia
- vaccination
- X-rays
- blood transfusion development
- antibiotics later in WWII
- surgery
- field medicine
- prosthetics
- public health

Do not apply antibiotics universally before their practical availability.

## 16.4 Weapons

WWI:
- rifles
- machine guns
- artillery
- poison gas
- early tanks
- aircraft
- submarines

WWII:
- improved tanks
- fighters
- bombers
- carriers
- submarines
- radar
- rockets
- atomic bombs

---

# 17. HEALTH, DISEASE AND SURVIVAL

## 17.1 Major risks

- influenza
- tuberculosis
- pneumonia
- typhus
- cholera
- malaria
- dysentery
- measles
- battlefield wounds
- industrial injuries
- childbirth
- malnutrition
- starvation
- cold
- heat
- bombing

## 17.2 1918 Influenza

The 1918 influenza pandemic must be a major historical event with regional variation.

Effects:
- mortality
- family loss
- workforce shortages
- school closure
- hospital overload
- social disruption

## 17.3 Medical system

Variables:
- doctor access
- hospital access
- medicine availability
- sanitation
- vaccination
- war-zone status
- wealth

---

# 18. HISTORICAL EVENTS

Every event uses:

```text
Event ID
Event Name
Start
End
Location
Political Entity
Cause
Historical Outcome
Affected Groups
Player Relevance
Player Entry Conditions
Fixed Outcomes
Branchable Outcomes
Divergence Threshold
Long-Term Consequences
```

---

# 18.1 P0 EVENTS

## WWI Outbreak
**1914**

Cause:
- alliance crisis
- Balkan tensions
- assassination
- mobilization
- diplomatic failure

Player relevance:
- recruitment
- migration
- wartime employment
- family separation

Fixed baseline:
- general war begins in Europe

Branchable:
- individual survival
- local military outcomes
- political career

---

## Gallipoli
**1915–1916**

Player contexts:
- Ottoman soldier
- Australian/New Zealand soldier
- British/French participant
- medical worker
- civilian

---

## Verdun
**1916**

Player contexts:
- French soldier
- German soldier
- nurse
- civilian support worker

---

## Somme
**1916**

Mass casualty event.

Player experience:
- enlistment
- combat
- injury
- death
- survivor's consequences

---

## U.S. Entry into WWI
**1917**

U.S. entered the war in April 1917. citeturn1search4

---

## Russian Revolution
**1917**

Major divergence system.

Potential changes:
- government
- land
- military
- family
- occupation
- political rights

---

## Armistice
**1918**

War ends in Western Europe.

---

## Paris Peace Conference / Versailles
**1919**

Creates postwar territorial and political framework.

---

## League of Nations
**1920**

Created after WWI to provide an international forum for resolving disputes. The U.S. did not join. citeturn1search2

---

## Prohibition / U.S. cultural conflict
**1920–1933**

Useful U.S. gameplay system:
- alcohol restrictions
- bootlegging
- law enforcement
- organized crime

---

## Great Depression
**1929 onward**

Global economic crisis.

---

## Rise of Hitler
**1933**

Germany transitions to Nazi dictatorship.

---

## Spanish Civil War
**1936–1939**

---

## Japanese invasion of China / Second Sino-Japanese War
**1937 onward**

---

## Munich Crisis
**1938**

---

## Germany invades Poland
**1939**

Start of WWII in Europe. citeturn0search4

---

## Fall of France
**1940**

---

## Battle of Britain
**1940**

---

## Operation Barbarossa
**1941**

Germany invades Soviet Union.

---

## Pearl Harbor
**7 December 1941**

U.S. enters WWII.

---

## Holocaust escalation
**1933–1945**

This is a multi-stage event system, not one popup.

---

## Stalingrad
**1942–1943**

---

## Midway
**1942**

---

## El Alamein
**1942**

---

## D-Day
**6 June 1944**

---

## Warsaw Uprising
**1944**

---

## Liberation of Paris
**1944**

---

## Fall of Berlin
**1945**

---

## Germany surrender
**May 1945**

---

## Hiroshima / Nagasaki
**August 1945**

---

## Japan surrender
**2 September 1945**

---

# 19. HISTORICAL FIGURES

Historical figures should be contextual NPCs.

## WWI

- Woodrow Wilson
- David Lloyd George
- Georges Clemenceau
- Kaiser Wilhelm II
- Nicholas II
- Vladimir Lenin
- Joseph Joffre
- Douglas Haig
- Mustafa Kemal Atatürk

## Interwar

- Franklin D. Roosevelt
- Benito Mussolini
- Adolf Hitler
- Joseph Stalin
- Winston Churchill
- Mahatma Gandhi
- Jawaharlal Nehru
- Chiang Kai-shek
- Sun Yat-sen
- Mustafa Kemal Atatürk

## WWII

- Winston Churchill
- Franklin D. Roosevelt
- Joseph Stalin
- Adolf Hitler
- Benito Mussolini
- Hirohito
- Hideki Tojo
- Charles de Gaulle
- Dwight Eisenhower
- George S. Patton
- Bernard Montgomery
- Erwin Rommel
- Georgy Zhukov
- Douglas MacArthur

## Humanitarian / intellectual / resistance figures

Where relevant:
- Albert Einstein
- Marie Curie
- Eleanor Roosevelt
- Raoul Wallenberg
- Oskar Schindler
- Dietrich Bonhoeffer
- selected resistance leaders
- selected anti-colonial leaders

Do not make every figure a direct NPC.

---

# 20. RANDOM EVENTS

Random events must be conditioned.

## 20.1 Family

- birth
- death
- marriage
- missing relative
- casualty notification
- refugee separation
- reunion
- inheritance

## 20.2 Economic

- unemployment
- wage increase
- inflation
- bank failure
- ration shortage
- black market opportunity
- business collapse
- government contract

## 20.3 Military

- conscription notice
- deployment
- leave
- injury
- promotion
- capture
- missing in action
- medal
- death notification

## 20.4 Civilian wartime

- air raid
- evacuation
- ration queue
- blackout
- shelter
- curfew
- property confiscation
- occupation checkpoint

## 20.5 Political

- election
- propaganda rally
- protest
- censorship
- arrest
- party recruitment
- political purge
- resistance contact

## 20.6 Refugee/displacement

- border crossing
- lost documents
- refugee camp
- family separation
- resettlement
- deportation
- repatriation

## 20.7 Health

- epidemic
- hospital shortage
- wounded relative
- influenza
- tuberculosis
- malnutrition

---

# 21. CHOICE DESIGN

Every major choice should be generated from actual context.

## Example: London 1940

**Event:** Air-raid sirens sound.

Choices:
1. Go to shelter.
2. Stay with elderly relative.
3. Help neighbors.
4. Continue working at essential job.
5. Ignore warning.

Possible consequences:
- injury
- relationship change
- work reputation
- family survival
- stress

The event should use actual local bombing risk.

---

# 21.1 Example: German Jewish family, 1938

**Event:** New restrictions are affecting employment and property.

Choices:
- attempt emigration
- seek sponsorship
- sell property
- remain
- seek help from contacts

Possible consequences:
- financial loss
- family separation
- escape opportunity
- increasing danger

The engine must recognize that options depend heavily on:
- country
- date
- documentation
- money
- destination
- family network

---

# 21.2 Example: Indian civilian, 1943

**Event:** Food availability deteriorates.

Choices:
- remain in village
- migrate to city
- sell property
- seek relief
- rely on family network
- enter military/industrial employment if eligible

Consequences:
- hunger
- displacement
- employment
- family separation

Do not reduce famine to “food stat -50.”

---

# 21.3 Example: U.S. worker, 1942

**Event:** Defense factory hiring expands.

Choices:
- remain in existing occupation
- enter aircraft factory
- join military
- move city
- encourage spouse to work

Consequences:
- wage
- relocation
- family stress
- wartime contribution
- injury risk

---

# 22. HISTORICAL DIVERGENCE

## 22.1 Levels

### Level 0 — Personal
- survive battle
- change career
- marry
- migrate

### Level 1 — Family
- save relatives
- preserve property
- family migration
- descendants

### Level 2 — Local
- save neighborhood
- organize relief
- local political outcome
- local resistance action

### Level 3 — Regional
- resistance network
- regional military logistics
- major political organization

### Level 4 — National
Requires extraordinary influence.

Examples:
- political office
- military command
- major industrial leadership
- major revolutionary role

### Level 5 — Historical
Extremely rare.

### Level 6 — Major Alternate Timeline
Only after accumulated causal changes.

---

# 22.2 Divergence calculation

Proposed gameplay variable:

```text
DivergencePotential =
Influence
× PoliticalAccess
× Resources
× Knowledge
× Proximity
× Timing
× Network
```

This is a game-design formula, not a historical equation.

## 22.3 Historical lock

The engine should distinguish:

### HARD LOCK
Events extremely difficult to change:
- broad existence of WWII
- Holocaust baseline under Nazi control
- major regime collapse once established
- major technological existence

### SOFT LOCK
Can change with major intervention:
- exact battle result
- local uprising outcome
- individual leader survival
- local election

### OPEN
Normally player-controlled:
- personal survival
- career
- family
- wealth
- relationships

---

# 23. DEATH AND LEGACY

## Death causes

- combat
- bombing
- disease
- starvation
- execution
- political repression
- accident
- old age
- childbirth
- workplace injury
- epidemic

## Legacy screen

```text
Birth
Death
Places lived
Occupations
Military service
Family
Wealth
Education
Relationships
Historical events experienced
People saved/lost
Political involvement
War involvement
Divergence
Descendants
```

Example:

> Born in Warsaw in 1920, you became a schoolteacher. During occupation you secretly helped two families obtain false documents. You survived the war, lost your brother, rebuilt your household, and later taught children in a city that had been transformed by the war.

The summary must be generated from actual simulation state.

---

# 24. REPLAYABILITY

The era has extremely high replayability because:

```text
DATE
×
LOCATION
×
REGIME
×
SOCIAL CLASS
×
FAMILY
×
WAR STATUS
×
OCCUPATION
×
IDEOLOGY
×
MIGRATION
×
HISTORICAL EVENTS
```

Example starts:

- British soldier, 1914
- German civilian, 1918
- Russian peasant, 1917
- French nurse, 1916
- American worker, 1932
- German Jewish teenager, 1933
- Japanese factory worker, 1937
- Chinese civilian, 1937
- Indian soldier, 1940
- Polish civilian, 1940
- French resistance member, 1942
- British child evacuated during Blitz
- Soviet factory worker, 1942
- American defense worker, 1943
- Japanese civilian, 1945
- displaced European person, 1945

---

# 25. DATA MODEL REQUIREMENTS

## 25.1 Era

```text
Era
- id
- name
- start
- end
- macro_periods
- regions
- global_rules
```

## 25.2 SubEra

```text
SubEra
- id
- era_id
- start
- end
- regional_overrides
- technology_state
- economic_state
- political_state
```

## 25.3 PoliticalEntity

```text
PoliticalEntity
- id
- name
- government_type
- start
- end
- territory
- capital
- ruler
- laws
- military
- allies
- enemies
- occupation_status
```

## 25.4 Region

```text
Region
- id
- name
- political_entity_by_date
- population
- urbanization
- industries
- agriculture
- culture
- religions
- languages
- hazards
```

## 25.5 Location

```text
Location
- id
- name
- coordinates
- region
- city_type
- population_by_date
- occupation_by_date
- industries
- transport
- military_presence
- historical_events
```

## 25.6 War

```text
War
- id
- name
- start
- end
- belligerents
- fronts
- objectives
- theaters
- major_battles
- civilian_effects
```

## 25.7 Front

```text
Front
- id
- war_id
- geography
- start
- end
- controlling_faction_by_date
- intensity
- civilian_risk
```

## 25.8 Occupation

```text
Occupation
- location
- occupying_power
- start
- end
- laws
- curfew
- rationing
- censorship
- property_rules
- identity_rules
- resistance_level
```

## 25.9 Faction

```text
Faction
- id
- name
- ideology
- leaders
- goals
- territory
- allies
- enemies
- recruitment
- historical_constraints
```

## 25.10 SocialClass

```text
SocialClass
- id
- region
- date_range
- wealth
- rights
- restrictions
- education
- occupations
- political_access
- military_access
- mobility
```

## 25.11 Occupation

```text
Occupation
- id
- name
- region
- date_range
- wage
- skill
- education
- hazards
- military_relevance
- social_status
```

## 25.12 HistoricalEvent

```text
HistoricalEvent
- id
- name
- start
- end
- locations
- actors
- causes
- fixed_outcomes
- branch_points
- player_entry_conditions
- consequences
```

## 25.13 HistoricalFigure

```text
HistoricalFigure
- id
- name
- birth
- death
- role
- faction
- locations
- fixed_events
- interaction_conditions
```

## 25.14 Technology

```text
Technology
- id
- name
- invention_date
- adoption_date_by_region
- availability
- occupation_effects
- military_effects
- civilian_effects
```

## 25.15 Law

```text
Law
- id
- name
- territory
- start
- end
- affected_groups
- rights
- restrictions
- enforcement
```

## 25.16 Disease

```text
Disease
- id
- name
- region
- date_range
- prevalence
- mortality
- transmission
- treatment
- risk_modifiers
```

## 25.17 RandomEvent

```text
RandomEvent
- id
- category
- date_conditions
- location_conditions
- class_conditions
- occupation_conditions
- war_conditions
- probability
- choices
```

## 25.18 Choice

```text
Choice
- id
- event_id
- requirements
- text
- immediate_effects
- delayed_effects
- hidden_effects
- family_effects
- social_effects
- historical_effects
```

## 25.19 CharacterState

```text
CharacterState
- age
- location
- nationality
- legal_status
- social_class
- wealth
- health
- education
- skill
- reputation
- influence
- military_status
- occupation
- relationships
- ideology
- religion
- trauma
- injuries
- diseases
- property
- debt
```

## 25.20 WorldState

```text
WorldState
- date
- political_map
- active_wars
- occupied_regions
- economic_conditions
- technology_adoption
- epidemics
- migration_flows
- active_historical_events
- censorship
- propaganda
- divergence_state
```

## 25.21 Timeline

```text
Timeline
- baseline_history
- player_interventions
- modified_events
- causal_links
- alternate_outcomes
- current_state
```

---

# 26. AGENT IMPLEMENTATION NOTES

# 26.1 MUST BE HISTORICALLY FIXED

Unless valid divergence occurs:

- major war start/end
- major treaty dates
- major regime changes
- major historical figures' birth/death
- major invasions
- major political revolutions
- Holocaust historical baseline
- atomic bomb development/use in baseline history
- major borders
- major technological availability
- major occupation changes
- major historical events

## 26.2 CAN BE RANDOMIZED

- family
- exact income
- sibling count
- minor occupation
- local friendships
- marriage
- employer
- minor illnesses
- minor accidents
- exact military assignment
- individual exposure to battles
- local business success

## 26.3 CAN BE PLAYER-CHANGED

- occupation
- wealth
- family
- migration
- political participation
- local resistance
- business
- relationships
- personal survival
- some local events
- some regional outcomes

## 26.4 REQUIRES FUTURE SYSTEM

- complete global military simulation
- full diplomatic AI
- global commodity market
- detailed intelligence network
- complete resistance network simulation
- full Holocaust survivor/DP genealogy
- full colonial administration
- realistic refugee logistics
- detailed battlefield simulation
- nuclear physics/weapon development simulation
- complete postwar geopolitical simulation

---

# 27. SPECIAL SYSTEM — MILITARY SERVICE

Military service should be its own state machine.

```text
Civilian
→ Eligible
→ Called/Volunteer
→ Training
→ Unit Assignment
→ Deployment
→ Leave
→ Combat
→ Wounded/Captured/Healthy
→ Transfer
→ Demobilization
→ Veteran
```

Possible outcomes:
- promotion
- injury
- disability
- medal
- capture
- death
- desertion
- trauma
- political radicalization
- veteran organization

---

# 28. SPECIAL SYSTEM — RATIONING

Rationing is not universal.

Inputs:
- country
- date
- city
- war status
- food supply
- class
- occupation

Possible states:
- none
- mild shortage
- rationing
- severe shortage
- famine

Player choices:
- queue legally
- grow food
- trade
- black market
- use connections
- relocate

Consequences:
- health
- wealth
- reputation
- legal risk

---

# 29. SPECIAL SYSTEM — PROPAGANDA AND INFORMATION

The information environment is a gameplay system.

Variables:
- censorship
- newspaper access
- radio access
- literacy
- government propaganda
- opposition media
- rumor
- foreign broadcasts

The player may have:
- incomplete information
- deliberately false information
- contradictory reports

Do not reveal historical outcomes before the character plausibly knows them.

This is critical.

A player may know from real-world history that Germany will lose WWII, but the character should not automatically know that.

---

# 30. SPECIAL SYSTEM — REFUGEES AND DISPLACEMENT

This is essential.

Represent:
- internal displacement
- refugees
- deportees
- prisoners
- displaced persons
- postwar migration

Variables:
- documentation
- nationality
- money
- family
- health
- border access
- political status
- destination availability

Player can:
- flee
- hide
- cross border
- seek aid
- stay
- reunite family
- resettle

---

# 31. SPECIAL SYSTEM — RESISTANCE

Resistance is not one occupation.

Types:
- intelligence
- sabotage
- propaganda
- smuggling
- escape assistance
- armed resistance
- hiding people
- underground journalism
- courier work

Requirements:
- location
- occupation
- contacts
- trust
- courage/risk tolerance
- resources

Risks:
- arrest
- torture
- execution
- family punishment
- property confiscation

Rewards:
- network
- reputation
- survival
- postwar political capital

---

# 32. SPECIAL SYSTEM — COLLABORATION

Where occupation exists, characters may:
- cooperate for survival
- work for occupying authorities
- trade
- inform
- administer local services
- actively support ideology

The system should avoid a simplistic binary “good/evil” stat.

Motives can include:
- survival
- ideology
- money
- coercion
- family protection
- ambition

Postwar consequences can include:
- imprisonment
- social stigma
- property loss
- execution in some historical contexts
- political rehabilitation

---

# 33. SPECIAL SYSTEM — WOMEN'S WORK AND SOCIAL CHANGE

Gender rules must be historical and region-specific.

WWI and WWII can change:
- factory employment
- nursing
- transport work
- clerical work
- agricultural labor
- military auxiliary roles
- political participation

Do not state that wars simply “gave women equality.”

Changes vary by country and often coexist with discrimination.

The player may experience:
- expanded employment
- wage differences
- family burden
- military auxiliary service
- postwar pressure to return to domestic roles

---

# 34. SPECIAL SYSTEM — CHILDREN

Children may experience:
- schooling
- evacuation
- family separation
- wartime labor
- refugee movement
- orphanhood
- propaganda
- rationing
- displacement

Children should not be treated as miniature soldiers.

Military recruitment of minors should only appear where historically documented and handled according to the exact context.

---

# 35. SPECIAL SYSTEM — COMMUNICATION

Communication networks should influence event knowledge.

### Level 0
Local rumor

### Level 1
Newspaper

### Level 2
Telegraph

### Level 3
Telephone

### Level 4
Radio

A character's access depends on:
- literacy
- location
- wealth
- occupation
- government restrictions

---

# 36. SPECIAL SYSTEM — TECHNOLOGICAL MODERNITY

A player born in 1910 can live through:
- horse transport
- automobiles
- aircraft
- radio
- television's early development
- antibiotics
- radar
- nuclear weapons

This makes generational change a central gameplay mechanic.

Technology should be represented as:

```text
Invented
→ Demonstrated
→ Military/industrial adoption
→ Urban availability
→ Mass consumer availability
```

These are different dates.

---

# 37. GAMEPLAY EXAMPLES

# Example 1 — British Soldier

## Setup
- born: 1895
- London
- working-class family

## 1914
War begins.

Choice:
- volunteer
- wait for conscription
- remain civilian

## 1916
If conscripted:
- training
- Western Front

Event:
artillery bombardment.

Choices:
- remain position
- seek cover
- assist wounded comrade

Possible:
- injury
- commendation
- death

## 1918
Survives.

Postwar:
- employment
- veteran status
- trauma
- family

---

# Example 2 — German Civilian

## Setup
- born 1905
- Berlin
- working-class family

## 1923
Hyperinflation.

Family savings collapse.

Choices:
- find work
- barter
- migrate
- sell property

## 1933
Nazi takeover.

Political choices:
- join state organization
- remain apolitical
- oppose
- assist targeted neighbors

Consequences depend on identity and visibility.

## 1939
War.

## 1944
Bombing and shortages.

## 1945
City destroyed.

Legacy:
- survival
- family
- reconstruction

---

# Example 3 — Jewish Teenager in Germany

## Setup
- born 1920
- Germany
- Jewish family

## 1933
Political exclusion begins.

Possible:
- school restrictions
- employment restrictions on family
- antisemitic violence

## 1938
Kristallnacht.

Family must decide:
- emigrate
- seek sponsorship
- hide assets
- stay
- separate family members

If unable to leave:
- escalating persecution
- forced displacement
- ghetto/deportation context depending on later location

This storyline must prioritize historical reality over conventional game “choice freedom.”

---

# Example 4 — Indian Soldier

## Setup
- born 1918
- Punjab
- agricultural family

## 1939
War begins.

Recruitment becomes available.

Choice:
- enlist
- remain farmer
- seek urban work

If enlisted:
- training
- overseas deployment
- combat
- family correspondence

1943:
possible famine/shortage effects on family.

1945:
demobilization.

Postwar:
- veteran status
- employment
- political awareness
- changing colonial system

---

# Example 5 — Japanese Civilian

## Setup
- born 1920
- Tokyo

## 1937
War with China expands.

Possible:
- school militarization
- family rationing
- propaganda

## 1941
Pacific War.

## 1944–45
- bombing
- shortages
- evacuation
- mobilization

## 1945
Atomic bomb events only affect characters in relevant locations.

Player in Tokyo must not receive Hiroshima-specific events.

---

# Example 6 — French Resistance Member

## Setup
- born 1918
- Lyon

## 1940
Occupation.

Choices:
- continue normal life
- collaborate
- resist
- flee

## 1942
Resistance contact.

Choice:
- courier
- propaganda
- intelligence
- hide people

Risk:
- arrest
- imprisonment
- death
- family retaliation

1944:
liberation.

Postwar:
- reputation
- political influence
- accusations
- trauma

---

# Example 7 — American Worker During Great Depression

## Setup
- born 1905
- Detroit
- auto worker

## 1929
Crash.

## 1930–1932
Factory layoffs.

Choices:
- move
- accept lower wage
- unionize
- temporary labor
- rely on family

## 1933+
New Deal programs.

## 1941
Defense production.

Career can transform from unemployment to highly paid wartime industrial work.

---

# 38. CONTENT PRIORITY

# P0 — REQUIRED FOR MVP

## Time
- 1914–1918
- 1929–1939
- 1939–1945

## Regions
- Britain
- France
- Germany
- Russia/USSR
- United States
- Japan
- China
- India
- Poland/Eastern Europe

## Systems
- war
- military service
- occupation
- rationing
- economic crisis
- migration
- health
- family
- political rights
- propaganda
- communication
- historical events
- local divergence

## Careers
- farmer
- factory worker
- clerk
- teacher
- nurse
- doctor
- soldier
- sailor
- engineer
- merchant
- journalist
- civil servant

## Major events
At least:
- WWI outbreak
- Gallipoli
- Somme
- Russian Revolution
- WWI end
- Versailles
- Great Depression
- Hitler's rise
- Spanish Civil War
- Japanese expansion in China
- WWII outbreak
- Fall of France
- Barbarossa
- Pearl Harbor
- Stalingrad
- D-Day
- Holocaust progression
- Germany surrender
- atomic bombings
- Japan surrender

---

# P1 — IMPORTANT

- detailed colonial systems
- resistance
- collaboration
- refugee system
- black market
- veteran system
- disability
- propaganda
- women's labor
- children's evacuation
- civil wars
- Chinese warlord era
- Spanish Civil War
- Middle Eastern mandates
- African colonial military participation

---

# P2 — EXPANSION

- Latin America
- Southeast Asia
- Africa in depth
- Balkans in depth
- Scandinavia
- Australia/New Zealand
- Canada
- detailed naval life
- intelligence agencies
- advanced diplomacy
- detailed industrial production

---

# P3 — FUTURE

- fully simulated global war logistics
- full battlefield tactical system
- complete intelligence networks
- procedural propaganda generation
- complete refugee logistics
- fully simulated genocide documentation/rescue networks
- full 1945–1955 Cold War transition
- nuclear arms race
- global decolonization simulation

---

# 39. MVP RECOMMENDATION

Do **not** build the whole World War Era first.

Build a vertical slice around:

## Date
**1938–1946**

Why:
- immediate prewar tension
- WWII
- occupation
- Holocaust/persecution
- resistance
- rationing
- bombing
- military service
- refugee movement
- liberation
- immediate aftermath

This gives the strongest demonstration of LegacyLife's core historical simulation.

## MVP map

### Europe
1. London
2. Paris
3. Berlin
4. Warsaw
5. Moscow
6. Rome

### Asia
7. Tokyo
8. Shanghai
9. Delhi
10. one rural Indian location

### North America
11. New York
12. Detroit

Total:
**12 core locations**

Later expand into:
- North Africa
- Middle East
- Southeast Asia
- Pacific
- Balkans
- Africa

---

# 40. MVP SOCIAL CLASSES

Minimum:
- rural poor
- working class
- skilled worker
- lower middle class
- professional
- merchant
- business owner
- military family
- political/elite family
- refugee/displaced person

Regional overrides required.

---

# 41. MVP STATS

Visible:
- Health
- Wealth
- Education
- Skill
- Reputation
- Influence

Conditional:
- Military readiness
- Political access

Hidden:
- Stress/trauma
- Survival resilience
- Legal risk
- Political suspicion

---

# 42. MVP DIVERGENCE

Only implement:

### Personal
Yes.

### Family
Yes.

### Local
Yes.

### Regional
Limited.

### National
Only special historical roles.

### Major alternate timeline
Not in MVP.

---

# 43. MVP UI

The player should always see:

```text
DATE
LOCATION
POLITICAL STATUS
OCCUPATION
FAMILY
HEALTH
WEALTH
EDUCATION
CURRENT HISTORICAL CONTEXT
ACTIVE RISK
AVAILABLE CHOICES
```

Example:

> **Warsaw — 1942**
>
> Occupied Poland  
> Food shortages are severe. Movement is restricted. Your family is trying to remain together.
>
> **Your current situation**
> Health: 61  
> Wealth: 22  
> Education: 67  
> Family: 4 people  
> Occupation: Teacher
>
> **Event**
> A contact offers you a chance to help someone obtain false papers.
>
> **Choices**
> Help / Refuse / Ask for more information / Report the contact

---

# 44. HISTORICAL INFORMATION DISCLOSURE

The game should separate:

### Character knowledge
What the player-character could plausibly know.

### Player knowledge
What the actual human player knows from history.

The game should avoid giving future historical outcomes away.

Example:

In 1939, a British player should not see:

> “Germany will surrender in 1945.”

Instead:

> “Germany has invaded Poland. The government has declared war.”

This preserves immersion.

---

# 45. HISTORICAL UNCERTAINTY

Where historians disagree, data should support:

```text
certainty:
- high
- medium
- disputed
- unknown

source_notes:
[]

alternative_interpretations:
[]
```

Do not fabricate exact casualty, income, mortality or public-opinion values where historical evidence is uncertain.

---

# 46. AGENT RULES FOR WORLD WAR ERA

1. Never treat WWII as one event.
2. Never treat WWI as only trench warfare.
3. Never treat the interwar period as a peaceful pause.
4. Never treat neutrality as irrelevance.
5. Never treat colonies as identical to metropolitan societies.
6. Never treat all civilians as politically identical.
7. Never give all countries the same rationing rules.
8. Never give all countries the same conscription rules.
9. Never give all people equal political rights.
10. Never give modern technology to characters before plausible adoption.
11. Never let the player know future events unless the UI explicitly provides historical meta mode.
12. Never make historical atrocities into reward systems.
13. Never allow a low-influence character to arbitrarily rewrite a major war.
14. Never make every historical figure interactable.
15. Never assume every soldier experiences the same war.
16. Never assume every civilian is safe from war.
17. Never assume every occupied territory has identical occupation rules.
18. Never collapse fascism, communism, democracy and monarchy into cosmetic labels.
19. Never use one global economic model.
20. Never use one global mortality rate.
21. Always resolve exact date and location before event generation.
22. Always evaluate legal status before political choices.
23. Always evaluate occupation status before civilian choices.
24. Always distinguish historical baseline from player-created divergence.

---

# 47. ERA DESIGN SUMMARY

# Era Identity

**The World War Era is the age in which global conflict, industrial society, ideology, mass politics and ordinary life become inseparable.**

A factory worker, soldier, farmer, student, refugee, nurse or shopkeeper can all be pulled into events far larger than themselves.

---

# Player Fantasy

> **“I am trying to live a human life while history becomes impossible to ignore.”**

The player should experience:
- fear
- uncertainty
- family loyalty
- ambition
- survival
- sacrifice
- adaptation
- moral pressure
- historical consequence

---

# Core Gameplay

```text
LIVE
↓
WORK / STUDY
↓
BUILD FAMILY
↓
BUILD WEALTH / SKILLS
↓
HISTORICAL CRISIS EMERGES
↓
ADAPT
↓
MAKE DIFFICULT CHOICES
↓
SURVIVE / LOSE / MIGRATE / FIGHT
↓
WORLD CHANGES
↓
REBUILD
↓
DIE
↓
LEAVE LEGACY
```

---

# Major Systems

Essential:

1. Date-aware world engine
2. Political/legal status
3. War engine
4. Occupation engine
5. Economy
6. Family
7. Military service
8. Migration/refugees
9. Health
10. Political participation
11. Propaganda/information
12. Technology
13. Historical events
14. Choice/consequence
15. Divergence
16. Legacy

---

# Historical Hook

The defining hook is:

> **History is not something happening in the background. History changes what your family can eat, where you can travel, whether you can work, whether you can vote, whether you must fight, whether your neighbors can survive, and whether your entire country still exists tomorrow.**

---

# MVP

Build:

**1938–1946**

with:
- 12 locations
- Europe + Asia + U.S.
- 10 social origins
- 12 careers
- 6 visible stats
- war
- occupation
- rationing
- propaganda
- military service
- migration
- health
- family
- 20+ major historical events
- 20+ random event templates
- 10 historical figures initially
- personal/family/local divergence

---

# Open Questions

## Historical
1. How much detail should be given to colonial legal systems?
2. Which exact African and Southeast Asian contexts are P0?
3. How should caste/community systems be modeled in India?
4. How granular should Holocaust persecution states be?
5. Which Chinese regions should be P0?
6. How should Japanese occupation systems be separated by territory?
7. How should Soviet political repression be represented without collapsing different periods into one rule?

## Product
1. What age rating is LegacyLife targeting?
2. How explicitly should atrocities be depicted?
3. Should the player be able to select historically persecuted identities?
4. Should “historical mode” reveal future outcomes?
5. Should alternate timelines persist into descendants?
6. Should a player be allowed to deliberately pursue a historical figure's career?
7. How much meta-historical information should the UI reveal?

## Technical
1. How will occupation change a location's rule set?
2. How will historical borders be versioned?
3. How will causal divergence propagate?
4. How will refugee movement be simulated?
5. How will event eligibility be indexed efficiently?
6. How will contradictory historical sources be represented?
7. How will sensitive historical events be content-reviewed?

---

# 48. SOURCE / RESEARCH BASIS

The historical baseline for this specification should be maintained in a source registry in the project repository.

Key research bases used:

- **International Encyclopedia of the First World War (1914–1918-online):** global/transnational framing of WWI, including colonial participation, home fronts, neutral societies, warfare and postwar consequences. citeturn2search2turn2search5turn2search6
- **U.S. Department of State, Office of the Historian:** U.S. entry into WWI, Fourteen Points, League of Nations, interwar diplomacy, Great Depression, U.S. foreign policy and WWII-related diplomacy. citeturn1search0turn1search2turn1search4turn2search0turn2search1
- **Library of Congress:** Great Depression, unemployment, New Deal, U.S. wartime mobilization, defense work, rationing and Japanese American incarceration. citeturn1search1turn1search6turn1search10
- **U.S. Holocaust Memorial Museum:** WWII chronology, Nazi dictatorship, persecution, Holocaust, occupation, resistance, liberation and displaced persons. citeturn0search0turn0search1turn0search3

## Source discipline

For implementation:
- official government/institutional sources should be preferred for exact laws, dates and formal institutions;
- peer-reviewed historical research should be preferred for contested interpretation;
- regional scholarship should be used for colonial and non-European contexts;
- no numerical value should be hard-coded merely because it “sounds historical”;
- uncertain historical information should remain explicitly uncertain.

---

# 49. FINAL IMPLEMENTATION PRINCIPLE

The coding agent must never ask:

> “What was World War II like?”

It must ask:

> **“What was this exact person's world, in this exact place, on this exact date, under this exact political and legal system?”**

That is the authoritative implementation rule for LegacyLife's World War Era.

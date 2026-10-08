# LegacyLife — Historical Era Specification
## Era: Cold War
### 1945–1991
**Document type:** Historical Simulation / Game Development Specification  
**Status:** Authoritative starting specification for AI coding agents  
**Scope:** Global Cold War with regional and domestic contexts  
**Primary simulation rule:** The Cold War is not one static geopolitical state.

---

# 0. PURPOSE

LegacyLife is a choice-driven historical life simulator.

The player does not enter a generic "Cold War world." The historical engine must determine the player's actual world from:

```text
BIRTH DATE
+
BIRTH LOCATION
+
POLITICAL ENTITY
+
CITIZENSHIP / LEGAL STATUS
+
SOCIAL CLASS
+
FAMILY
+
IDEOLOGICAL / RELIGIOUS CONTEXT
+
LOCAL ECONOMY
+
REGIONAL CONFLICT
=
HISTORICAL WORLD
```

A player born in:
- New York in 1947
- Moscow in 1947
- Delhi in 1947
- Beijing in 1947
- Berlin in 1947
- Cairo in 1947
- Havana in 1947
- Accra in 1947

must not receive the same political rights, economic system, education, media environment, military obligations, or risks.

Likewise, a player born in 1955 and a player born in 1985 are living in radically different Cold War worlds.

---

# 1. ERA OVERVIEW

## 1.1 Name

**Human name:** Cold War

**Internal ID:** `cold_war`

## 1.2 Recommended date range

**1945–1991**

Optional transition:
- 1991–1993 may be represented as a post-Cold-War aftermath context.
- It should not be merged into the Cold War itself.

## 1.3 Geographic scope

Global.

Core regions:

- United States and Canada
- USSR and Eastern Europe
- Western Europe
- divided Germany
- China
- Japan
- Korean Peninsula
- Vietnam / Southeast Asia
- India / South Asia
- Middle East
- Latin America / Caribbean
- Africa
- Afghanistan
- Cuba
- Israel / Arab states
- Yugoslavia
- Australia / New Zealand

## 1.4 Core historical idea

The Cold War is not primarily a conventional war.

It is a long confrontation involving:

- ideology
- nuclear deterrence
- military alliances
- proxy wars
- espionage
- propaganda
- economic competition
- technological competition
- space exploration
- decolonization
- revolution
- political repression
- diplomacy
- development
- domestic political conflict

The term "Cold War" therefore describes a system of competition rather than one continuous battlefield.

---

# 2. WHY THIS ERA IS IDEAL FOR LEGACYLIFE

This era is exceptionally suitable for LegacyLife because enormous geopolitical conflicts influence ordinary lives without requiring the player to be a soldier.

A player may experience:

- rationing
- migration
- ideological pressure
- compulsory military service
- nuclear anxiety
- civil defense
- espionage
- political surveillance
- censorship
- student protests
- labor unions
- economic shortages
- consumer prosperity
- planned economies
- capitalist markets
- communist states
- military dictatorships
- decolonization
- independence
- proxy wars
- revolutions
- refugee crises
- technological change
- television
- computers
- space exploration
- changing gender roles
- changing family structures

The central player fantasy is:

> **Build an ordinary life while the world is divided by ideologies, alliances, revolutions and the constant possibility of nuclear catastrophe.**

---

# 3. HISTORICAL ACCURACY RULES

## 3.1 Do not treat the Cold War as simply USA vs USSR

The two superpowers are central, but the global system also includes:

- China
- France
- Britain
- West Germany
- East Germany
- Japan
- India
- Yugoslavia
- Cuba
- Vietnam
- North Korea
- South Korea
- Israel
- Arab states
- newly independent African states
- Latin American governments and revolutionary movements

Countries frequently pursued their own interests.

## 3.2 Do not treat the "Third World" as politically homogeneous

Newly independent states could:
- join a U.S.-aligned alliance
- join a Soviet-aligned alliance
- remain non-aligned
- shift alignment
- accept aid from both blocs
- pursue regional interests
- fight neighboring states
- experience internal ideological conflicts

## 3.3 Do not treat non-alignment as neutrality

India's official foreign-policy tradition emphasized retaining freedom of judgment rather than joining either military bloc. The Indian Ministry of External Affairs describes this as avoiding entanglement in power politics while maintaining relations with both blocs. citeturn0search1

Academic scholarship likewise treats Indian non-alignment as an active strategy rather than passive neutrality. citeturn0search0turn0search10

## 3.4 Do not treat communism as one identical system

Distinguish:
- Soviet Stalinism
- post-Stalin USSR
- Maoist China
- Yugoslav socialism
- Cuban socialism
- Eastern European communist governments
- Vietnam
- North Korea

## 3.5 Do not treat capitalism as one identical system

Distinguish:
- U.S. liberal capitalism
- Western European welfare states
- Japan's developmental economy
- Latin American economies
- colonial/postcolonial economies

---

# 4. TEMPORAL BREAKDOWN

# 4.1 EARLY COLD WAR — 1945–1953

## Major conditions

- WWII aftermath
- occupation of Germany
- division of Europe
- Soviet consolidation in Eastern Europe
- creation of NATO
- Chinese Communist victory
- Korean War
- nuclear arms race
- decolonization

## Player identity

The player may be:
- WWII veteran
- displaced person
- refugee
- young student
- factory worker
- colonial subject
- newly independent citizen
- communist activist
- anti-communist activist
- government employee

## Gameplay identity

**A new world is being constructed after WWII.**

---

# 4.2 HIGH COLD WAR — 1953–1962

Important developments:
- Stalin's death
- Khrushchev era
- de-Stalinization
- Warsaw Pact
- Hungarian uprising
- Berlin tensions
- Sputnik
- U-2 incident
- Cuban Revolution
- Cuban Missile Crisis

The Cuban Missile Crisis is a core high-stakes diplomatic event.

Gameplay should emphasize:
- nuclear fear
- civil defense
- propaganda
- diplomacy
- intelligence

---

# 4.3 GLOBALIZATION OF THE COLD WAR — 1963–1975

Major contexts:
- Vietnam War
- Sino-Soviet split
- Cultural Revolution
- Arab-Israeli wars
- decolonization
- African independence
- Latin American revolutions
- civil rights
- 1968 protests
- Prague Spring
- détente

The Cold War increasingly becomes a global contest rather than only a European confrontation.

---

# 4.4 DÉTENTE — 1969–1979

Systems:
- arms-control diplomacy
- U.S.–USSR diplomacy
- trade
- cultural exchanges
- space cooperation
- proxy conflicts continuing despite superpower diplomacy

Important:
- SALT
- Helsinki process
- U.S.–China opening
- end of Vietnam War

The player should feel that the world may be becoming safer, while local conflicts continue.

---

# 4.5 NEW COLD WAR — 1979–1985

Major events:
- Iranian Revolution
- Soviet invasion of Afghanistan
- renewed arms competition
- Reagan administration
- Solidarity in Poland
- nuclear anxiety
- economic problems in USSR

Gameplay identity:

**The world feels tense again.**

---

# 4.6 LATE COLD WAR — 1985–1989

Mikhail Gorbachev's reforms:
- glasnost
- perestroika
- political liberalization
- economic reform attempts
- arms negotiations

Major developments:
- Chernobyl
- reform movements
- Eastern European political changes
- fall of Berlin Wall

Gameplay identity:

**A system that seemed permanent begins changing rapidly.**

---

# 4.7 COLLAPSE — 1989–1991

Major events:
- Eastern European communist governments collapse
- Berlin Wall falls
- German reunification
- Soviet republic independence movements
- Warsaw Pact dissolution
- Soviet Union dissolution

End condition:

```text
USSR ceases to exist
+
bipolar superpower system ends
=
Cold War ends
```

---

# 5. GEOGRAPHIC BREAKDOWN

# 5.1 UNITED STATES

## Political system

- federal republic
- presidential system
- two-party dominance
- democratic institutions

## Major cities

- Washington, D.C.
- New York
- Chicago
- Detroit
- Los Angeles
- San Francisco
- Boston
- Atlanta
- Houston
- Seattle

## Major player contexts

- factory worker
- office worker
- soldier
- student
- scientist
- journalist
- civil-rights activist
- politician
- businessman
- union worker
- suburban family
- immigrant family

## Major systems

- consumer economy
- suburbs
- television
- automobiles
- universities
- military-industrial economy
- civil rights
- anti-communism
- McCarthyism
- Vietnam
- nuclear civil defense

## Important distinction

The U.S. is not politically homogeneous.

Player experiences vary by:
- race
- region
- class
- religion
- political affiliation
- gender
- immigration status

The civil-rights struggle must be a major domestic system.

---

# 5.2 USSR

## Political system

Communist one-party state.

Major periods:
- Stalin's final years
- Khrushchev
- Brezhnev
- Andropov
- Chernenko
- Gorbachev

## Cities

- Moscow
- Leningrad
- Kyiv
- Minsk
- Tbilisi
- Baku
- Novosibirsk
- Vladivostok

## Player contexts

- factory worker
- collective farmer
- engineer
- scientist
- military officer
- party member
- teacher
- doctor
- dissident
- artist
- journalist
- student

## Systems

- planned economy
- state employment
- housing allocation
- shortages
- state media
- censorship
- party membership
- surveillance
- scientific prestige
- military service

---

# 5.3 EASTERN EUROPE

Major states:

- East Germany
- Poland
- Czechoslovakia
- Hungary
- Romania
- Bulgaria
- Yugoslavia
- Albania

Do not treat them as one country.

## Shared systems

- communist governments
- state industries
- party organizations
- censorship
- security services
- varying living standards
- Soviet influence

## Important differences

Yugoslavia:
- non-aligned socialist state
- Tito
- independent path from Moscow

Poland:
- Catholic Church
- Solidarity
- political unrest

Hungary:
- 1956 uprising
- later "Goulash Communism"

Czechoslovakia:
- Prague Spring
- 1968 invasion

Romania:
- Ceaușescu
- increasingly independent foreign policy
- severe late-period austerity

---

# 5.4 WESTERN EUROPE

Major states:
- UK
- France
- West Germany
- Italy
- Netherlands
- Belgium
- Scandinavia
- Austria
- Switzerland

Systems:
- parliamentary democracy
- welfare states
- NATO
- European integration
- consumer society
- decolonization
- immigration
- student movements

Major player experiences:
- reconstruction
- welfare expansion
- television
- automobile ownership
- university education
- labor unions
- protest movements

---

# 5.5 GERMANY

This requires a dedicated split.

## 1945–1949

Occupation zones.

## 1949 onward

### West Germany
- Federal Republic
- NATO
- social market economy
- economic recovery

### East Germany
- German Democratic Republic
- socialist state
- Warsaw Pact
- planned economy
- Stasi surveillance

## Berlin

Berlin is a special location entity.

States:
- occupied Berlin
- divided Berlin
- Berlin Wall era
- reunification

The Berlin Wall should change:
- travel
- family
- employment
- education
- escape risk
- political tension

---

# 5.6 CHINA

China cannot be modeled simply as "Soviet-aligned communist China."

## 1945–1949

Chinese Civil War.

## 1949–1956

Early PRC.

Systems:
- land reform
- collectivization
- Soviet influence
- political campaigns

## 1958–1961

Great Leap Forward.

Gameplay:
- state economic campaigns
- rural collectivization
- food shortages
- famine
- family disruption

## 1966–1976

Cultural Revolution.

Gameplay:
- political campaigns
- Red Guards
- school disruption
- persecution
- factional conflict
- ideological conformity

## 1978–1991

Reform era.

Systems:
- market reforms
- private enterprise
- migration to cities
- special economic zones
- rising inequality
- new consumer culture

China's Cold War path therefore needs a distinct timeline from the USSR.

---

# 5.7 JAPAN

Postwar Japan becomes:
- U.S.-aligned
- democratic
- highly industrialized
- economically transformative

Systems:
- reconstruction
- education
- export manufacturing
- urbanization
- consumer society
- corporate employment
- technological development

Player experiences:
- salaryman
- factory worker
- student
- farmer
- engineer
- entrepreneur

Important:
Japan's experience is primarily economic/social modernization rather than direct battlefield participation during most of the Cold War.

---

# 5.8 KOREAN PENINSULA

## North Korea
- communist state
- Kim Il Sung
- planned economy
- military mobilization
- political control

## South Korea
- authoritarian governments initially
- U.S. alliance
- industrialization
- later democratization

## Korean War

1950–1953.

This is a P0 regional war.

Player may experience:
- soldier
- civilian
- refugee
- family separation
- orphan
- nurse
- worker

---

# 5.9 INDIA

India is a core Cold War context.

## Political identity

- independent democratic republic
- non-aligned foreign policy
- parliamentary politics
- mixed economy

India's Ministry of External Affairs describes non-alignment as an effort to avoid entanglement in power blocs while maintaining relations with both. citeturn0search1

## Major phases

### 1947–1964
Nehru:
- non-alignment
- state-led development
- Panchsheel
- Bandung
- relations with USSR, USA and China

### 1964–1971
- political transition
- food challenges
- wars with Pakistan
- 1962 Sino-Indian War legacy

### 1971–1977
- Bangladesh war
- Indo-Soviet relationship
- Emergency

### 1977–1984
- Janata period
- return of Congress
- regional conflicts

### 1984–1991
- Rajiv Gandhi
- technology
- Punjab conflict
- Sri Lanka
- economic pressure
- 1991 economic crisis

## Player systems

- caste/community context
- religion
- rural/urban divide
- land ownership
- Green Revolution
- government employment
- public-sector employment
- private business
- education
- reservation policies
- elections
- political activism
- family structure
- migration
- wars with Pakistan
- China conflict

Do not treat India as simply "pro-US" or "pro-USSR."

Scholarship emphasizes that India's non-alignment involved active diplomacy and attempts to preserve strategic autonomy, while India also selectively aligned when national interests required it. citeturn0search3turn0search10

---

# 5.10 PAKISTAN AND SOUTH ASIA

Important:
- Pakistan
- Bangladesh
- Sri Lanka
- Nepal
- Afghanistan

Pakistan:
- U.S.-aligned alliances
- military governments
- wars with India
- relationship with China
- Afghan War

Bangladesh:
- independence 1971
- postwar political instability

Afghanistan:
- monarchy
- republic
- communist revolution
- Soviet invasion
- mujahideen conflict

---

# 5.11 MIDDLE EAST

Core contexts:

- Egypt
- Israel
- Syria
- Iraq
- Iran
- Jordan
- Lebanon
- Saudi Arabia
- Gulf states

Systems:
- Arab nationalism
- socialism
- monarchies
- military coups
- oil
- Arab-Israeli conflict
- Iranian Revolution
- superpower competition

Major wars:
- 1948 Arab-Israeli War
- 1956 Suez Crisis
- 1967 Six-Day War
- 1973 Yom Kippur War
- Iran-Iraq War
- Lebanon conflicts

---

# 5.12 LATIN AMERICA

Major contexts:
- Cuba
- Chile
- Argentina
- Brazil
- Nicaragua
- Mexico
- Central America

Systems:
- military dictatorships
- revolutionary movements
- U.S. intervention
- Soviet/Cuban support
- economic inequality
- student movements
- labor movements

## Cuba

1959 Cuban Revolution.

Later:
- communist state
- Soviet alliance
- Cuban Missile Crisis
- economic dependence
- international revolutionary activity

---

# 5.13 AFRICA

Africa is essential because decolonization transforms the Cold War.

Major contexts:
- Ghana
- Congo
- Algeria
- Angola
- Mozambique
- South Africa
- Ethiopia
- Somalia
- Kenya
- Tanzania

Systems:
- independence
- nation-building
- military coups
- civil wars
- socialism
- anti-colonial movements
- apartheid
- superpower aid
- proxy conflict

Do not represent Africa only through wars.

Many players should experience:
- school expansion
- urbanization
- civil service
- new national identity
- entrepreneurship
- family migration
- independence celebrations
- political parties

---

# 6. HISTORICAL WORLD MODEL

```text
Global Cold War
│
├── Superpowers
│   ├── United States
│   └── USSR
│
├── Major Communist States
│   ├── China
│   ├── Cuba
│   ├── Vietnam
│   ├── North Korea
│   └── Eastern Europe
│
├── Western Alliance
│   ├── NATO
│   ├── Japan
│   └── allied states
│
├── Non-Aligned / Developing States
│
├── Regional Conflicts
│
├── International Institutions
│   ├── UN
│   ├── IMF
│   ├── World Bank
│   └── regional institutions
│
└── Domestic Political Movements
    ├── civil rights
    ├── communist parties
    ├── anti-communist movements
    ├── nationalist movements
    ├── student movements
    ├── labor movements
    └── dissidents
```

---

# 7. PLAYER CREATION

## 7.1 Required inputs

### Auto Create

Generate:
- birth year
- birth location
- family
- social class

### Custom Life

Player chooses:
- birth date/year
- location

Optional:
- gender
- difficulty
- social origin

## 7.2 Derived context

The engine determines:
- nationality
- citizenship
- political system
- legal rights
- economic system
- religion
- language
- education access
- family structure
- military obligations
- political environment
- media environment
- technology access

---

# 8. SOCIAL CLASSES

Social class varies enormously.

## 8.1 Broad categories

- rural poor
- landless laborer
- peasant
- industrial worker
- skilled worker
- lower middle class
- professional
- civil servant
- military family
- merchant
- business owner
- wealthy elite
- political elite
- aristocratic remnants
- party elite
- dissident/intellectual
- refugee

## 8.2 Communist-state distinction

In communist states, wealth should not be the only status dimension.

Use:
- party membership
- occupation
- access to housing
- political trust
- education
- institutional rank

A low-income party official may have greater access to goods/services than a higher-income non-party citizen.

---

# 9. CHILDHOOD → ADULTHOOD → OLD AGE

# 9.1 Childhood

Possible:
- state school
- religious school
- private school
- rural school
- political education
- youth organization
- refugee childhood

## 9.2 Adolescence

Possible:
- university
- vocational school
- military preparation
- apprenticeship
- political activism
- student movement
- early employment

## 9.3 Adulthood

- employment
- marriage
- children
- military service
- political activity
- migration
- housing
- entrepreneurship

## 9.4 Old age

- pension
- family support
- state benefits
- veteran benefits
- property
- retirement
- health

---

# 10. GAME STATS

Use era-specific stats.

## 10.1 Health

Affected by:
- healthcare access
- nutrition
- disease
- pollution
- occupation
- war
- age

Visible.

## 10.2 Wealth

Represents economic security.

In planned economies, also track access.

Visible.

## 10.3 Education

Represents formal and practical education.

Visible.

## 10.4 Skill

Occupation-related ability.

Visible.

## 10.5 Reputation

Local/social standing.

Visible.

## 10.6 Influence

Ability to affect institutions or people.

Visible after development.

## 10.7 Political Trust

Especially important in authoritarian states.

Can represent:
- party trust
- state trust
- security suspicion

Partly hidden.

## 10.8 Access

Represents access to:
- housing
- goods
- jobs
- healthcare
- education
- foreign travel

Especially important in socialist economies.

## 10.9 Military Readiness

Conditional.

## 10.10 Stress

Affected by:
- political repression
- war
- poverty
- unemployment
- family problems
- nuclear fear

---

# 11. ECONOMY

## 11.1 Economic system types

### Capitalist
- wages
- private property
- markets
- unemployment
- investment

### Socialist planned
- state ownership
- planning
- assigned production
- state employment
- shortages
- rationing in some periods
- informal markets

### Mixed/developing
- public sector
- private sector
- agriculture
- state planning
- foreign aid

## 11.2 Economic indicators

Each region:

```text
employment
wages
prices
inflation
housing
food availability
industrial output
agricultural output
trade
consumer goods
government spending
economic growth
```

## 11.3 Consumer access

Do not equate nominal income with living standard.

Track:

```text
PurchasingPower
+
Availability
+
PoliticalAccess
+
Location
=
RealConsumption
```

---

# 12. POLITICS AND POWER

## 12.1 Government types

- liberal democracy
- social democracy
- communist one-party state
- military dictatorship
- monarchy
- revolutionary government
- authoritarian republic
- apartheid state
- colonial administration
- hybrid regime

## 12.2 Political participation

Possible:
- vote
- campaign
- join party
- protest
- unionize
- publish
- petition
- hold office
- join youth organization
- underground organizing
- dissident activity

## 12.3 Political repression

Possible:
- surveillance
- censorship
- interrogation
- arrest
- imprisonment
- dismissal
- blacklisting
- exile
- torture
- execution

The exact rules must be regime/date dependent.

---

# 13. WAR AND CONFLICT

## 13.1 Conflict categories

- interstate war
- civil war
- revolution
- insurgency
- coup
- border conflict
- proxy war
- terrorism
- political repression

## 13.2 Military roles

- conscript
- volunteer
- infantry
- artillery
- tank crew
- pilot
- sailor
- medic
- engineer
- intelligence
- special forces
- officer
- logistics
- communications

## 13.3 Core wars

P0:
- Greek Civil War
- Korean War
- Vietnam War
- Arab-Israeli wars
- Soviet invasion of Afghanistan
- Indo-Pakistani wars
- Sino-Indian War
- Sino-Soviet border conflict
- Cuban Missile Crisis as crisis state
- Cold War proxy conflicts

---

# 14. NUCLEAR SYSTEM

Nuclear weapons are one of the defining systems.

## 14.1 Player does not control nuclear strategy by default

The ordinary player experiences:
- nuclear drills
- shelters
- propaganda
- fear
- military service
- scientific work
- political activism
- peace movements

## 14.2 Strategic state

Global variables:

```text
NuclearArsenal
AlertLevel
ArmsRaceIntensity
DiplomaticTension
EarlyWarningStatus
ArmsControl
CrisisProbability
```

## 14.3 Nuclear crisis

A crisis should generate:

```text
Political tension
→ Military alert
→ Media coverage
→ Civil defense
→ Economic uncertainty
→ Diplomacy
→ Possible de-escalation
OR
→ catastrophic branch
```

The baseline history should strongly constrain nuclear-war outcomes.

---

# 15. ESPIONAGE

Espionage should be a specialized career path.

Roles:
- intelligence analyst
- diplomat
- courier
- agent
- code specialist
- scientist
- journalist
- informant

Mechanics:
- recruitment
- cover identity
- information
- surveillance
- counterintelligence
- betrayal
- arrest
- defection

Ordinary civilians may encounter espionage indirectly.

---

# 16. PROPAGANDA AND MEDIA

Media systems are central.

## Media types

- newspaper
- radio
- cinema
- television
- state television
- foreign broadcasts
- magazines
- underground publications

## Information state

```text
InformationAccess
StateCensorship
ForeignMediaAccess
Literacy
Rumor
PropagandaExposure
```

The character should not automatically know future history.

---

# 17. TECHNOLOGY

# 17.1 1945–1955

- radio
- telephone
- television emerging
- automobiles
- jet aircraft
- early computers
- nuclear technology

# 17.2 1955–1965

- transistor electronics
- television mass adoption
- commercial aviation
- satellites
- space technology
- early computers

# 17.3 1965–1975

- color television
- integrated circuits
- mainframes
- spaceflight
- household appliances
- improved medicine

# 17.4 1975–1985

- personal computing
- video games
- digital electronics
- satellites
- improved telecommunications

# 17.5 1985–1991

- PCs
- mobile communication beginnings
- digital networks
- consumer electronics
- early internet-related systems

Technology adoption must be regional.

A technology can be:

```text
Invented
→ military use
→ industrial use
→ elite access
→ urban access
→ mass adoption
```

---

# 18. SPACE RACE

Dedicated system.

Events:
- Sputnik
- Yuri Gagarin
- Apollo program
- Moon landing
- space stations

Player careers:
- engineer
- scientist
- astronaut
- technician
- journalist
- teacher

For ordinary players:
- television broadcasts
- school science
- national pride
- technology expectations

---

# 19. HEALTH AND MEDICINE

Major developments:
- antibiotics
- vaccination
- improved surgery
- blood transfusion
- public health
- contraception
- cardiac medicine
- cancer research
- organ transplantation
- mental health awareness

Risks:
- smoking
- industrial pollution
- occupational hazards
- war injuries
- infectious disease
- poor healthcare access
- environmental disasters

Healthcare differs by:
- country
- class
- urban/rural location
- insurance/state access

---

# 20. ENVIRONMENTAL EVENTS

Cold War life should include:
- industrial pollution
- smog
- pesticides
- nuclear contamination
- oil spills
- industrial disasters
- Chernobyl
- drought
- famine

Chernobyl should be a major late-Cold-War event.

Player consequences:
- evacuation
- health
- property loss
- mistrust
- information censorship

---

# 21. CULTURE AND SOCIETY

## Major cultural transformations

- rock music
- cinema
- television
- youth culture
- fashion
- sports
- mass advertising
- feminism
- civil rights
- counterculture
- religious revival
- secularization
- nationalism

## Family

Changing patterns:
- smaller families
- urbanization
- women's employment
- divorce
- changing marriage norms
- migration

These vary greatly by country.

---

# 22. RELIGION

Important systems:
- Christianity
- Catholicism
- Protestantism
- Eastern Orthodoxy
- Islam
- Hindu traditions
- Buddhism
- Judaism
- Sikhism
- secularism
- state atheism

Religious practice may be:
- protected
- restricted
- encouraged
- monitored
- suppressed

depending on regime and period.

---

# 23. HISTORICAL EVENTS

Every event should use:

```text
Event ID
Event Name
Start Date
End Date
Location
Political Entity
Cause
Historical Outcome
Actors
Affected Groups
Player Relevance
Entry Conditions
Fixed Outcomes
Branchable Outcomes
Divergence Threshold
Long-Term Consequences
```

---

# 23.1 P0 EVENT CATALOG

## Postwar division of Europe
1945–1949

Effects:
- occupation
- borders
- political systems
- migration

## Truman Doctrine
1947

Marks major U.S. commitment to containing communist expansion.

## Marshall Plan
1948 onward

Economic reconstruction system.

## Berlin Blockade and Airlift
1948–1949

Player experiences:
- Berlin civilian
- Allied worker
- refugee
- family separation

## NATO
1949

Alliance system.

## Chinese Communist Revolution
1949

Major geopolitical transformation.

## Korean War
1950–1953

Major proxy/limited war.

## Stalin's death
1953

Political transition in USSR.

## Hungarian Uprising
1956

Divergence point.

## Suez Crisis
1956

Important for:
- Egypt
- Britain
- France
- Israel
- U.S.
- USSR
- India / non-aligned diplomacy

## Sputnik
1957

Technology/culture event.

## Cuban Revolution
1959

Creates major Caribbean Cold War context.

## U-2 Crisis
1960

Espionage/diplomacy.

## Berlin Wall
1961

Major personal mobility event.

## Cuban Missile Crisis
1962

Core nuclear crisis.

## Sino-Soviet split
1960s

China must no longer be treated as a simple Soviet subordinate.

## Civil Rights Movement
1950s–1960s

Core U.S. domestic system.

## Vietnam War
1955–1975

Major long-running regional conflict.

## Six-Day War
1967

Middle East.

## Prague Spring
1968

Political reform and Soviet intervention.

## 1968 Global Protests
1968

Student/labor/cultural movements.

## Apollo 11
1969

Moon landing.

## Bangladesh Liberation War
1971

Major South Asian event.

## India–Pakistan War
1971

Regional conflict.

## Nixon visits China
1972

Major diplomatic realignment.

## Yom Kippur War
1973

Middle East / oil shock.

## Chilean Coup
1973

Latin American Cold War.

## Portuguese decolonization
1974–1975

African transition.

## Fall of Saigon
1975

Vietnam War ends.

## Iranian Revolution
1979

Major Middle Eastern transformation.

## Soviet invasion of Afghanistan
1979

Major late-Cold-War conflict.

## Solidarity in Poland
1980 onward

Political movement.

## Reagan era
1981 onward

Renewed U.S.–USSR competition.

## Chernobyl
1986

Environmental / political transparency crisis.

## INF Treaty
1987

Arms-control milestone.

## Berlin Wall falls
1989

Major divergence point.

## Eastern European revolutions
1989

Political transformation.

## German reunification
1990

Major political transformation.

## Soviet Union dissolution
1991

End of Cold War baseline.

---

# 24. HISTORICAL FIGURES

Figures should be contextual NPCs, not mandatory quest-givers.

## United States

- Harry Truman
- Dwight Eisenhower
- John F. Kennedy
- Lyndon B. Johnson
- Richard Nixon
- Jimmy Carter
- Ronald Reagan
- Martin Luther King Jr.
- Malcolm X
- Richard Nixon
- Henry Kissinger

## USSR

- Joseph Stalin
- Nikita Khrushchev
- Leonid Brezhnev
- Yuri Andropov
- Konstantin Chernenko
- Mikhail Gorbachev
- Yuri Gagarin

## China

- Mao Zedong
- Zhou Enlai
- Deng Xiaoping

## India

- Jawaharlal Nehru
- Sardar Patel
- Indira Gandhi
- Rajiv Gandhi
- V. K. Krishna Menon
- Morarji Desai

## Europe

- Winston Churchill
- Charles de Gaulle
- Konrad Adenauer
- Willy Brandt
- Margaret Thatcher
- Josip Broz Tito
- Lech Wałęsa
- Václav Havel

## Asia / Middle East

- Kim Il Sung
- Ho Chi Minh
- Fidel Castro
- Gamal Abdel Nasser
- Anwar Sadat
- Golda Meir
- Ayatollah Khomeini

The historical engine should fix major life dates and roles unless a valid divergence system changes later events.

---

# 25. RANDOM EVENTS

## Family

- marriage
- divorce
- childbirth
- death
- migration
- family political disagreement
- inheritance

## Economic

- promotion
- unemployment
- inflation
- shortage
- business opening
- business failure
- government job
- housing allocation

## Political

- election
- protest
- censorship
- arrest
- political recruitment
- surveillance
- party membership

## Military

- conscription
- deployment
- leave
- injury
- promotion
- capture
- death

## Cultural

- concert
- film
- sports event
- television purchase
- student movement
- fashion trend

## Technology

- first television
- first computer access
- telephone installation
- car ownership
- new factory machinery

## International

- crisis
- border closure
- refugee influx
- diplomatic tension
- war outbreak

---

# 26. CHOICE DESIGN

Every major choice should arise from the player's actual context.

Each choice can produce:

```text
Immediate
+
Delayed
+
Personal
+
Family
+
Economic
+
Political
+
Social
+
Historical
```

---

# 26.1 Example — U.S. student, 1968

Event:
University protests.

Choices:
- join protest
- attend classes
- organize debate
- join counter-protest
- avoid politics

Effects:
- reputation
- education
- police risk
- friendships
- career

---

# 26.2 Example — Soviet engineer, 1978

Event:
A colleague privately criticizes the government.

Choices:
- ignore
- discuss privately
- report
- defend colleague

Consequences:
- friendship
- political suspicion
- career
- surveillance risk

---

# 26.3 Example — Indian student, 1975

Event:
Emergency-era political restrictions.

Choices:
- remain politically inactive
- support government
- oppose government
- distribute underground material

Consequences:
- education
- arrest risk
- family consequences
- political reputation

---

# 26.4 Example — East German family, 1961

Event:
Berlin Wall construction changes movement.

Choices:
- remain
- attempt escape
- relocate legally
- seek help from relatives

Consequences:
- family separation
- arrest
- employment
- housing
- political suspicion

---

# 26.5 Example — Cuban citizen, 1962

Event:
Missile Crisis.

The player should experience:
- military mobilization
- uncertainty
- media
- fear
- shortages

The ordinary citizen should not control nuclear diplomacy.

---

# 27. HISTORICAL DIVERGENCE

## 27.1 Levels

### Level 0 — Personal
- career
- marriage
- migration
- education

### Level 1 — Family
- protect relatives
- political reputation
- inheritance
- family migration

### Level 2 — Local
- union
- protest
- local election
- local business

### Level 3 — Regional
- political movement
- resistance
- military influence
- regional organization

### Level 4 — National
Requires major influence.

### Level 5 — International
Requires extraordinary position:
- head of government
- senior military commander
- major diplomat
- intelligence leader
- major scientist
- major industrial leader

### Level 6 — Alternate Timeline

Extremely rare.

---

# 27.2 Divergence formula

Proposed gameplay model:

```text
DivergencePotential =
Influence
× Access
× Knowledge
× Resources
× Network
× Timing
× InstitutionalPower
```

This is a gameplay model, not a historical formula.

---

# 27.3 Historical locks

## HARD LOCK

Usually fixed:
- existence of nuclear weapons
- major superpower rivalry
- broad existence of NATO/Warsaw Pact
- Sputnik
- Apollo 11
- major Soviet collapse trajectory after sufficient divergence
- known historical figures' birth/death

## SOFT LOCK

Can change with major intervention:
- local elections
- individual leaders
- regional coups
- local battles
- political crises

## OPEN

Player-controlled:
- career
- family
- friendships
- wealth
- education
- local reputation

---

# 28. DEATH AND LEGACY

## Death causes

- disease
- old age
- accident
- war
- political execution
- terrorism
- industrial accident
- environmental disaster
- crime
- childbirth
- suicide where appropriate
- natural causes

Do not make political violence the default death mechanism.

## Legacy

```text
Birth
Death
Countries lived in
Cities lived in
Education
Career
Family
Wealth
Political involvement
Military service
Historical events experienced
Technology experienced
Relationships
Migration
Historical influence
Timeline divergence
```

---

# 29. REPLAYABILITY

Cold War replayability is extremely high.

Replay dimensions:

```text
DATE
×
COUNTRY
×
REGIME
×
CLASS
×
IDEOLOGY
×
FAMILY
×
CAREER
×
WAR
×
TECHNOLOGY
×
POLITICAL ACCESS
×
MIGRATION
```

Example starts:

- U.S. suburban child, 1955
- Soviet factory family, 1950
- Indian student, 1950
- East German child, 1960
- Chinese rural child, 1958
- Cuban teenager, 1960
- Vietnamese civilian, 1965
- Indian politician, 1975
- Polish worker, 1980
- Afghan civilian, 1980
- American engineer, 1985
- Soviet scientist, 1986
- East German student, 1988
- Romanian citizen, 1989

---

# 30. SPECIAL SYSTEM — IDEOLOGY

Ideology is not a simple morality meter.

Possible orientations:

- liberal democracy
- conservatism
- socialism
- communism
- nationalism
- anti-colonial nationalism
- religious conservatism
- social democracy
- pacifism
- revolutionary ideology

A character can have:
- political beliefs
- family beliefs
- public beliefs
- private beliefs

These may differ.

---

# 31. SPECIAL SYSTEM — POLITICAL REPRESSION

Repression varies by regime.

State actions:

```text
Monitoring
→ Warning
→ Job restriction
→ Censorship
→ Interrogation
→ Arrest
→ Imprisonment
→ Exile
→ Severe punishment
```

Factors:
- regime
- date
- ideology
- influence
- public visibility
- connections
- foreign attention

---

# 32. SPECIAL SYSTEM — ECONOMIC ACCESS

Especially important in socialist systems.

A player may have:

- money
- political access
- connections
- consumer availability

Example:

Two characters may have similar official income.

Character A:
- party member
- urban
- well connected

Character B:
- rural
- politically distrusted

Their access to:
- housing
- cars
- scarce goods
- travel
- education

can differ substantially.

---

# 33. SPECIAL SYSTEM — MIGRATION

Types:
- rural → urban
- country → country
- refugee
- exile
- political defector
- educational migration
- economic migration

Requirements:
- passport
- visa
- citizenship
- money
- political status
- family network
- destination policy

Migration rules must be date-specific.

---

# 34. SPECIAL SYSTEM — BORDER AND TRAVEL

Travel should vary by political system.

Possible:
- unrestricted domestic travel
- internal passport
- restricted border
- visa
- exit permit
- illegal crossing

Berlin is a special high-priority travel system.

---

# 35. SPECIAL SYSTEM — MILITARY SERVICE

State machine:

```text
Civilian
→ Eligible
→ Draft / Volunteer
→ Training
→ Deployment
→ Service
→ Wounded / Captured / Healthy
→ Demobilized
→ Veteran
```

Effects:
- career
- health
- trauma
- pension
- reputation
- political access

---

# 36. SPECIAL SYSTEM — CONSUMER CULTURE

Especially important in:
- United States
- Western Europe
- Japan
- later China

Goods:
- television
- refrigerator
- washing machine
- automobile
- radio
- stereo
- camera
- computer
- video game system

Purchasing these should depend on:
- income
- availability
- location
- political system
- year

---

# 37. SPECIAL SYSTEM — HOUSING

Housing is a major life system.

Possible states:
- family home
- apartment
- rented room
- government housing
- collective housing
- rural home
- refugee accommodation

Variables:
- size
- quality
- ownership
- location
- crowding
- access
- utilities

---

# 38. SPECIAL SYSTEM — EDUCATION

Education progression:

```text
Primary
→ Secondary
→ Vocational
→ University
→ Graduate / Professional
```

Access depends on:
- country
- class
- gender
- political status
- race/caste/community
- economic resources
- government policy

Education can unlock:
- careers
- political access
- migration
- scientific work

---

# 39. SPECIAL SYSTEM — WOMEN AND GENDER

Gender roles change substantially across the era.

Systems:
- workforce participation
- education
- marriage
- contraception
- divorce
- political participation
- professional careers

Do not treat the era as one continuous march toward equality.

Experiences differ by:
- country
- class
- religion
- political system
- decade

---

# 40. SPECIAL SYSTEM — CIVIL RIGHTS AND DISCRIMINATION

Especially important in:
- United States
- South Africa
- parts of Europe
- colonial/postcolonial states

Systems:
- legal segregation
- voting restrictions
- discrimination
- protest
- civil rights organizations
- policing
- reform laws

The player may experience these as:
- direct discrimination
- activism
- institutional employment barriers
- political organizing
- legal reform

---

# 41. SPECIAL SYSTEM — DECOLONIZATION

This must be one of the era's core systems.

Sequence:

```text
Colonial Rule
→ Nationalist Movement
→ Political Negotiation / Conflict
→ Independence
→ Nation Building
→ Cold War Alignment Pressure
```

Players may be:
- colonial official
- independence activist
- soldier
- teacher
- farmer
- politician
- journalist
- civil servant

Independence should change:
- citizenship
- laws
- currency
- institutions
- education
- military
- political identity

---

# 42. SPECIAL SYSTEM — INTERNATIONAL AID

Aid can come from:
- USA
- USSR
- China
- international institutions
- former colonial powers

Aid can affect:
- infrastructure
- education
- military
- food
- industrialization
- political alignment

The recipient government may accept aid without becoming fully aligned.

---

# 43. SPECIAL SYSTEM — PROXY WAR

A proxy war should be modeled as:

```text
Local conflict
+
External funding
+
Weapons
+
Advisers
+
Political ideology
+
Regional interests
=
Proxy conflict
```

The player should still experience a local war, not a superpower strategy screen.

---

# 44. SPECIAL SYSTEM — INTERNATIONAL ORGANIZATIONS

Institutions:
- United Nations
- IMF
- World Bank
- NATO
- Warsaw Pact
- Non-Aligned Movement
- regional organizations

Ordinary players may encounter them indirectly.

Elite players may:
- work in them
- lobby
- negotiate
- serve diplomatically

---

# 45. GAMEPLAY EXAMPLES

# Example 1 — American Child, 1955

Setup:
- suburban family
- middle class
- U.S.

Childhood:
- television
- school
- Cold War drills

Adolescence:
- music
- civil rights news
- university opportunity

1960s:
- Vietnam
- protests

Choice:
- enlist
- avoid military
- protest
- pursue education

Long-term:
- career
- family
- political identity

---

# Example 2 — Soviet Engineer, 1975

Setup:
- Moscow
- technical education
- state-employed

Life:
- apartment
- state workplace
- political expectations

Event:
colleague distributes banned material.

Choices:
- ignore
- report
- help
- confront

Effects:
- trust
- career
- surveillance
- friendship

1986:
Chernobyl changes information environment.

1989:
political system destabilizes.

1991:
USSR collapses.

Legacy:
career transition
property changes
family future

---

# Example 3 — Indian Student, 1962

Setup:
- Delhi
- middle-class family

Event:
Sino-Indian War.

Effects:
- national anxiety
- military recruitment
- political debate

Choice:
- volunteer
- continue studies
- join relief activity
- political activism

Later:
1965 war
1971 war
changing India-USSR relationship

---

# Example 4 — Chinese Rural Family, 1958

Setup:
- rural household

Event:
Great Leap Forward.

Systems:
- collectivization
- production targets
- food availability

Choices:
- comply
- conceal food
- migrate
- participate in communal work

Consequences:
- health
- family survival
- political reputation

The simulation must avoid reducing the famine to a single random event.

---

# Example 5 — East German Teenager, 1987

Setup:
- East Berlin

Systems:
- school
- youth organization
- restricted travel
- state media

1989:
Berlin Wall falls.

Player choices:
- join demonstrations
- remain cautious
- travel
- political organizing

1990:
German reunification.

Life changes:
- education
- currency
- career
- family
- travel

---

# Example 6 — Cuban Family, 1962

Setup:
- Havana

Event:
Cuban Missile Crisis.

Player experiences:
- military mobilization
- food uncertainty
- radio
- political pressure
- nuclear fear

The player cannot personally decide the superpower negotiations.

---

# Example 7 — Afghan Civilian, 1980

Setup:
- rural Afghanistan

1979:
Soviet invasion.

Choices:
- remain
- flee
- join armed movement
- relocate to city
- support government

Consequences:
- family separation
- injury
- refugee status
- political affiliation

---

# 46. DATA MODEL REQUIREMENTS

## Era

```text
Era
- id
- name
- start
- end
- sub_eras
- regions
- global_rules
```

## SubEra

```text
SubEra
- id
- era_id
- start
- end
- political_state
- economic_state
- technology_state
- conflict_state
```

## PoliticalEntity

```text
PoliticalEntity
- id
- name
- government_type
- ideology
- territory_by_date
- laws
- alliances
- enemies
- leadership
```

## Region

```text
Region
- id
- name
- political_entity_by_date
- population
- urbanization
- industries
- agriculture
- religions
- languages
- conflicts
```

## Location

```text
Location
- id
- name
- coordinates
- region
- population_by_date
- government
- economic_profile
- infrastructure
- military_presence
- media_environment
```

## Alliance

```text
Alliance
- id
- name
- members_by_date
- purpose
- military_obligations
- political_obligations
```

## Conflict

```text
Conflict
- id
- name
- start
- end
- region
- factions
- external_support
- civilian_risk
- player_roles
```

## Faction

```text
Faction
- id
- name
- ideology
- leaders
- objectives
- territory
- allies
- enemies
- recruitment
```

## SocialClass

```text
SocialClass
- id
- region
- date_range
- wealth
- access
- education
- rights
- restrictions
- occupations
- political_access
```

## Occupation

```text
Occupation
- id
- name
- region
- date_range
- wage
- education
- skill
- risk
- political_status
```

## Technology

```text
Technology
- id
- name
- invention_date
- adoption_by_region
- affordability
- availability
- effects
```

## Ideology

```text
Ideology
- id
- name
- compatible_regimes
- incompatible_regimes
- social_effects
- political_effects
```

## HistoricalEvent

```text
HistoricalEvent
- id
- name
- start
- end
- locations
- actors
- cause
- fixed_outcomes
- branch_points
- consequences
```

## HistoricalFigure

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
```

## RandomEvent

```text
RandomEvent
- id
- category
- conditions
- probability
- choices
- effects
```

## Choice

```text
Choice
- id
- event_id
- requirements
- immediate_effects
- delayed_effects
- hidden_effects
- family_effects
- political_effects
- historical_effects
```

## CharacterState

```text
CharacterState
- date
- age
- location
- citizenship
- political_status
- social_class
- wealth
- access
- health
- education
- skill
- reputation
- influence
- political_trust
- ideology
- religion
- occupation
- military_status
- relationships
- property
- stress
```

## WorldState

```text
WorldState
- date
- political_map
- alliances
- conflicts
- nuclear_tension
- economic_conditions
- technology_adoption
- migration
- political_repression
- media_environment
- active_events
- divergence_state
```

## Timeline

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

# 47. AGENT IMPLEMENTATION NOTES

# 47.1 MUST BE HISTORICALLY FIXED

Unless valid divergence occurs:

- major political leaders
- major war dates
- major treaties
- NATO creation
- Warsaw Pact creation
- Chinese Communist victory
- Korean War baseline
- Cuban Missile Crisis baseline
- Sputnik
- Apollo 11
- Berlin Wall
- Soviet invasion of Afghanistan
- Chernobyl
- Berlin Wall collapse
- Soviet dissolution
- major technological invention dates

## 47.2 CAN BE RANDOMIZED

- family
- siblings
- employer
- minor illness
- local friendship
- marriage
- local income
- housing quality
- minor political encounters
- local career path
- military assignment

## 47.3 CAN BE PLAYER-CHANGED

- career
- education
- family
- wealth
- migration
- local politics
- personal political activism
- local business
- relationships
- local reputation

## 47.4 REQUIRES FUTURE SYSTEM

- fully simulated global nuclear strategy
- complete intelligence networks
- detailed economic world model
- full proxy-war logistics
- complete global diplomacy
- complete decolonization model
- detailed international aid network
- complete 1991+ transition
- global environmental simulation

---

# 48. MVP RECOMMENDATION

Do not build 1945–1991 in full first.

Build a vertical slice:

## MVP window

**1958–1963**

Why?

It contains:
- high Cold War tension
- Berlin crisis
- Berlin Wall
- Cuban Revolution
- Cuban Missile Crisis
- nuclear fear
- space race
- U.S.–USSR rivalry
- China
- India
- decolonizing world

It demonstrates the unique Cold War gameplay without requiring the entire 46-year era.

---

# 49. MVP MAP

## Core locations

### United States
1. Washington, D.C.
2. New York
3. Detroit

### USSR
4. Moscow
5. Leningrad

### Europe
6. West Berlin
7. East Berlin
8. Paris
9. London

### Asia
10. Delhi
11. Beijing
12. Tokyo

### Middle East
13. Cairo

### Latin America
14. Havana

### Africa
15. Accra

Total:
**15 locations**

Later expand into:
- Warsaw
- Prague
- Budapest
- Seoul
- Pyongyang
- Saigon
- Kabul
- Tel Aviv
- Jerusalem
- Baghdad
- Tehran
- Santiago
- Buenos Aires
- Johannesburg
- Nairobi

---

# 50. MVP SOCIAL CLASSES

- rural poor
- urban working class
- skilled worker
- lower middle class
- professional
- civil servant
- student
- merchant/business owner
- military family
- political/party elite
- refugee/migrant

Regional overrides required.

---

# 51. MVP CAREERS

Minimum:

- farmer
- factory worker
- clerk
- teacher
- doctor
- nurse
- engineer
- journalist
- civil servant
- soldier
- police
- merchant
- business owner
- university student
- researcher

---

# 52. MVP STATS

Visible:
- Health
- Wealth
- Education
- Skill
- Reputation
- Influence
- Access

Conditional:
- Military readiness
- Political access

Hidden:
- Political trust
- Stress
- State suspicion
- Survival resilience

---

# 53. MVP HISTORICAL EVENTS

Minimum:

1. Great Leap Forward begins
2. U-2 incident
3. Cuban Revolution aftermath
4. Sputnik legacy
5. Berlin Crisis
6. Berlin Wall
7. Non-Aligned diplomacy
8. Sino-Soviet tensions
9. Nuclear arms race
10. Cuban Missile Crisis
11. early space-race milestones
12. regional Cold War conflicts

---

# 54. MVP DIVERGENCE

Implement:

### Personal
Full.

### Family
Full.

### Local
Full.

### Regional
Limited.

### National
Rare.

### International
Not MVP.

The player should not be able to personally "prevent the Cold War."

They can affect history only when:
- proximity
- role
- influence
- information
- network
- resources

make it plausible.

---

# 55. MVP UI

Always show:

```text
DATE
LOCATION
COUNTRY
POLITICAL SYSTEM
SOCIAL STATUS
OCCUPATION
FAMILY
HEALTH
WEALTH
EDUCATION
ACCESS
CURRENT WORLD TENSION
LOCAL RISK
CURRENT EVENT
CHOICES
```

Example:

> **Berlin — October 1961**
>
> East Berlin  
> Your family is separated by new border restrictions.
>
> Occupation: Electrical Technician  
> Health: 84  
> Wealth: 51  
> Education: 72  
> Political Trust: Unknown
>
> **Event**
> A relative in West Berlin asks you to help arrange a meeting.
>
> Choices:
> - Help
> - Refuse
> - Ask someone else
> - Report the request

---

# 56. INFORMATION MODEL

Separate:

## Character knowledge

What the character could plausibly know.

## Player knowledge

What the real-world player knows.

Example:

In October 1962, a player should not see:

> "The Cuban Missile Crisis will end peacefully."

Instead:

> "Reports indicate rapidly increasing tension between Washington and Moscow."

This is essential for immersion.

---

# 57. HISTORICAL UNCERTAINTY

Data should support:

```text
certainty:
- high
- medium
- disputed
- unknown

source_notes:
[]

interpretations:
[]
```

Never invent:
- exact public opinion
- exact income
- exact political support
- exact mortality
- exact technology adoption

unless supported.

---

# 58. CONTENT PRIORITY

# P0 — REQUIRED FOR MVP

## Systems
- date/location engine
- political regime
- economy
- family
- careers
- education
- ideology
- media
- political repression
- military
- nuclear tension
- historical events
- choice/consequence
- divergence

## Regions
- U.S.
- USSR
- divided Germany
- India
- China
- Japan
- Cuba
- Britain
- France

## Events
- Berlin
- Cuba
- Sputnik
- U-2
- nuclear crisis
- early non-alignment

---

# P1 — IMPORTANT

- Korean War
- Vietnam
- civil rights
- decolonization
- Middle East wars
- Sino-Soviet split
- African independence
- Latin American coups
- space race expansion
- espionage
- international aid
- consumer culture

---

# P2 — EXPANSION

- full African contexts
- Southeast Asia
- Afghanistan
- Iran
- Iraq
- Chile
- Argentina
- Poland
- Hungary
- Czechoslovakia
- Romania
- Yugoslavia
- detailed religious systems

---

# P3 — FUTURE

- complete global economic simulation
- complete nuclear strategy
- full intelligence simulation
- fully simulated UN
- complete proxy-war logistics
- detailed Cold War technological competition
- full 1991–2000 transition

---

# 59. ERA DESIGN SUMMARY

# Era Identity

**The Cold War is a world where peace and war coexist: the superpowers avoid direct total war while competing through politics, economics, technology, espionage, culture, alliances and regional conflicts.**

---

# Player Fantasy

> **"I want to build my own life in a world where politics can reach into my home, my career, my relationships and even my future."**

---

# Core Gameplay

```text
LIVE
↓
STUDY / WORK
↓
BUILD FAMILY
↓
BUILD WEALTH / SKILLS
↓
POLITICAL WORLD CHANGES
↓
ADAPT
↓
MAKE PERSONAL + POLITICAL CHOICES
↓
SURVIVE / PROSPER / MIGRATE / RESIST / PARTICIPATE
↓
WORLD CHANGES AGAIN
↓
TECHNOLOGY TRANSFORMS LIFE
↓
COLD WAR ENDS
↓
LEGACY
```

---

# Major Systems

1. Date-aware historical engine
2. Political regime system
3. Economic system
4. Ideology
5. Political access
6. Political repression
7. Family
8. Education
9. Career
10. Military service
11. Nuclear tension
12. Espionage
13. Media
14. Migration
15. Technology
16. Consumer culture
17. Regional conflict
18. Decolonization
19. Historical events
20. Historical divergence
21. Legacy

---

# Historical Hook

The defining hook is:

> **The Cold War makes politics personal without requiring the player to become a world leader.**

A normal person can experience:
- a wall separating their family
- a government deciding their career
- a war changing their education
- a television broadcasting a nuclear crisis
- a political opinion destroying a career
- a new technology changing their life
- independence transforming their citizenship
- a revolution changing their entire society

---

# MVP

Build:

**1958–1963**

with:
- 15 locations
- U.S., USSR, Europe, India, China, Japan, Cuba
- 11 social origins
- 15 careers
- 7 visible stats
- political access
- media
- ideology
- nuclear tension
- Berlin
- Cuban Missile Crisis
- space race
- historical events
- personal/family/local divergence

---

# OPEN QUESTIONS

## Historical

1. How granular should individual African countries be in P0?
2. How should caste and community systems in India be represented?
3. How detailed should the Chinese Great Leap Forward/Cultural Revolution systems be?
4. How should apartheid be represented without reducing South African life to apartheid alone?
5. How detailed should religious repression be in communist states?
6. How should the Israel/Palestine context be modeled across changing political borders?
7. How should Afghanistan's multiple Cold War phases be separated?

## Product

1. What age rating should LegacyLife target?
2. How explicitly should political repression be depicted?
3. Can players choose identities targeted by historical discrimination?
4. Should historical knowledge mode reveal future events?
5. Should alternate timelines persist through descendants?
6. Can a player become a national political leader?
7. How much real-world political ideology should be exposed in gameplay?

## Technical

1. How should political borders be versioned by date?
2. How should regime changes propagate into individual lives?
3. How should alliances affect ordinary characters?
4. How should media availability be simulated?
5. How should planned-economy access be represented?
6. How should nuclear tension affect event probabilities without becoming arbitrary?
7. How should proxy wars connect global and local world states?
8. How should divergent timelines remain internally consistent?

---

# 60. AGENT FINAL RULE

The coding agent must never ask:

> "What was the Cold War like?"

It must ask:

> **"What was this exact person's world, in this exact place, on this exact date, under this exact political, economic, legal and cultural system?"**

That is the authoritative implementation principle for LegacyLife's Cold War era.

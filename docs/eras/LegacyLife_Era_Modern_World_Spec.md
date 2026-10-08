# LegacyLife — Historical Era Specification
## Era: Modern World
### 1990s–2020s
**Internal ID:** `modern_world`  
**Document type:** Historical Simulation / Game Development Specification  
**Status:** Authoritative starting specification for AI coding agents

---

# 0. PURPOSE

LegacyLife is a choice-driven historical life simulator.

The Modern era must not be represented as a single "modern life" ruleset.

A person born in:
- New York in 1992
- Delhi in 1992
- Beijing in 1992
- Lagos in 1992
- Moscow in 1992
- Tokyo in 1992

may share broad global trends while experiencing radically different:
- political systems
- economic opportunities
- education
- healthcare
- family structures
- technology access
- internet access
- cultural norms
- migration opportunities
- media environments
- security risks

The same applies across time.

A child born in 1993, 2003, 2013 and 2023 must not receive the same technology, education, media or social environment.

The governing rule is:

```text
DATE
+
LOCATION
+
POLITICAL SYSTEM
+
ECONOMIC SYSTEM
+
SOCIAL CLASS
+
FAMILY
+
TECHNOLOGY ACCESS
+
CULTURAL CONTEXT
=
HISTORICAL WORLD
```

The Modern era is therefore primarily a simulation of **rapid global change**.

---

# 1. ERA OVERVIEW

## 1.1 Name

**Modern World — 1990s–2020s**

## 1.2 Recommended date boundary

Primary playable range:

**1 January 1990 – present-day historical cutoff**

The era should be divided internally rather than using one continuous ruleset.

Recommended sub-eras:

1. 1990–1994 — Post-Cold-War transition
2. 1995–1999 — Early Internet / Globalization
3. 2000–2006 — Digital Expansion
4. 2007–2012 — Smartphone / Social Media Transition
5. 2013–2019 — Platform Society
6. 2020–2022 — Pandemic Disruption
7. 2023–present — AI / Geopolitical / Digital Transformation

The exact "present" cutoff must be controlled by game version.

---

# 2. WHY THIS ERA IS UNIQUE

The defining feature is not simply "modern technology."

It is the speed at which ordinary life changes.

Within one lifetime a character may experience:

```text
Landline
→
Dial-up Internet
→
Broadband
→
Feature Phone
→
Smartphone
→
Social Media
→
Cloud Services
→
Streaming
→
Remote Work
→
Generative AI
```

Communication technology is particularly important. ITU records the transition from early digital cellular networks in the 1990s to 3G, 4G and 5G systems, with 3G specifications approved globally in 2000 and 4G/5G standards following later. citeturn0search4turn0search5

The Modern era should therefore feel like:

> **The world becoming increasingly connected, digitized, globalized and data-driven — while inequality, political instability, misinformation, conflict and social fragmentation continue.**

---

# 3. CORE DESIGN PRINCIPLES

## 3.1 Technology must be historically gated

A 1996 character cannot:
- use a smartphone
- order food through an app
- stream Netflix-like services
- video call through modern platforms
- use social-media feeds
- interact with generative AI

A 2025 character can plausibly encounter all of these, subject to location/access.

## 3.2 Geography matters

Technology availability is not identical worldwide.

Track:

```text
TechnologyAvailability
Infrastructure
Affordability
DigitalLiteracy
GovernmentRestrictions
Urbanization
Income
```

## 3.3 Internet access is not binary

Use:

```text
NoAccess
PublicAccess
SharedAccess
DialUp
Broadband
MobileData
SmartphoneInternet
HighSpeedMobile
AlwaysConnected
```

## 3.4 "Globalization" must be playable

The player should experience:
- outsourcing
- migration
- international education
- multinational companies
- global entertainment
- international travel
- remittances
- imported goods
- cross-border careers
- global crises

---

# 4. TEMPORAL BREAKDOWN

# 4.1 1990–1994 — POST-COLD-WAR TRANSITION

## Historical identity

Major features:
- Soviet Union dissolution
- emergence of new states
- post-socialist transitions
- Gulf War
- Yugoslav wars
- globalization accelerating
- personal computers becoming increasingly relevant

## Technology

- landline telephone
- fax
- CRT television
- VHS
- personal computers
- floppy disks
- early cellular phones
- early commercial Internet

## Economy

Different paths:
- Western market economies
- post-socialist transitions
- developing economies
- emerging markets

## Social identity

The world is transitioning from the Cold War order.

---

# 4.2 1995–1999 — EARLY INTERNET

## Core features

- World Wide Web expansion
- email
- web browsers
- search engines
- online forums
- instant messaging
- early e-commerce
- mobile phones

ITU describes the 1990s as the period in which the Internet became widely available and digital life began reshaping communication, work, learning and online communities. citeturn0search5

## Player experience

A typical character may:
- own a desktop
- use dial-up
- create an email account
- chat online
- discover web communities
- use cybercafés

But access remains unequal.

---

# 4.3 2000–2006 — DIGITAL EXPANSION

Major systems:
- broadband
- search engines
- online shopping
- online banking
- mobile phones
- SMS
- digital cameras
- MP3 players
- laptops
- early social networking

Important events:
- 9/11
- War on Terror
- Afghanistan War
- Iraq War
- dot-com aftermath
- China entering WTO
- globalization

## Player experience

The Internet becomes increasingly normal rather than experimental.

---

# 4.4 2007–2012 — SMARTPHONE TRANSITION

Major developments:
- smartphones
- app ecosystems
- social media
- mobile Internet
- YouTube
- Facebook-era social networking
- Twitter-era real-time communication
- cloud computing
- streaming beginning to replace physical media

The transition from desktop Internet to mobile Internet should be a major game milestone.

---

# 4.5 2013–2019 — PLATFORM SOCIETY

Core features:
- smartphones become mainstream
- social-media identity
- app economy
- ride-hailing
- food delivery
- streaming
- digital payments
- cloud software
- online freelancing
- influencer culture
- gig work
- algorithmic feeds

Technology becomes embedded in daily life.

A character can increasingly:
- find work online
- date online
- learn online
- shop online
- socialize online
- build a public identity
- create content
- run a business

---

# 4.6 2020–2022 — PANDEMIC DISRUPTION

COVID-19 must be treated as a world-state event rather than a random illness.

WHO records the outbreak's progression from the Wuhan cluster reported in late 2019, to the January 2020 public-health emergency, and the 11 March 2020 characterization as a pandemic. citeturn0search1turn0search3

## Major systems

- lockdowns
- travel restrictions
- school closures
- remote work
- remote education
- healthcare pressure
- unemployment
- business disruption
- supply shortages
- vaccination
- public-health rules
- misinformation
- mental/social disruption

## Important rule

The game must not assume all countries responded identically.

Create:

```text
PandemicPolicy
- restrictions
- school_policy
- workplace_policy
- travel_policy
- vaccination_policy
- healthcare_capacity
- public_compliance
- economic_support
```

---

# 4.7 2023–PRESENT — AI / DIGITAL TRANSFORMATION

Core systems:
- generative AI
- AI assistants
- remote/hybrid work
- creator economy
- short-form video
- advanced digital payments
- increasingly automated services
- cyber risks
- synthetic media
- AI-assisted education
- AI-assisted programming

This phase is intentionally open-ended because the period is contemporary and still evolving.

The game must avoid pretending that current events are already historically settled.

---

# 5. GEOGRAPHIC MODEL

The Modern era should use a global region model.

Minimum major regions:

1. United States & Canada
2. Western Europe
3. Eastern Europe & Russia
4. China
5. Japan & South Korea
6. South Asia
7. Southeast Asia
8. Middle East
9. North Africa
10. Sub-Saharan Africa
11. Latin America & Caribbean
12. Oceania

---

# 6. UNITED STATES & CANADA

## Political

- democratic institutions
- federal systems
- high media penetration
- strong private-sector economy

## Major trends

- globalization
- suburbanization continuing
- internet
- 9/11
- War on Terror
- financial crisis
- social media
- polarization
- remote work
- platform economy

## Player careers

- corporate employee
- service worker
- engineer
- software developer
- teacher
- healthcare worker
- entrepreneur
- freelancer
- creator
- government employee
- military
- researcher

## Risks

- healthcare cost
- student debt
- unemployment
- housing cost
- political polarization
- mass layoffs
- economic recessions

---

# 7. WESTERN EUROPE

Major systems:
- EU integration
- welfare states
- free movement within relevant EU frameworks
- euro adoption for participating countries
- immigration
- aging populations
- digitalization

Important events:
- Maastricht Treaty
- euro
- EU expansion
- 2008 financial crisis
- Brexit
- COVID-19

Player systems:
- education
- public healthcare
- migration
- professional mobility
- taxation
- welfare

---

# 8. EASTERN EUROPE & RUSSIA

## 1990s

Major transition:
- post-socialist economies
- privatization
- political instability
- changing institutions

## 2000s

- consolidation in Russia
- energy economy
- stronger state power
- economic growth followed by vulnerabilities

## 2010s

- increasing geopolitical tension
- sanctions
- political polarization
- migration

## 2020s

- war in Ukraine
- sanctions
- geopolitical fragmentation
- information warfare

The player experience varies heavily by country and date.

---

# 9. CHINA

China must be a dedicated simulation.

## 1990s

- rapid industrialization
- export growth
- urban migration
- rising living standards
- state-led development

## 2000s

- WTO integration
- manufacturing expansion
- major infrastructure
- urbanization

## 2010s

- smartphones
- platform economy
- digital payments
- e-commerce
- surveillance technology
- rising global influence

## 2020s

- COVID response
- property-sector issues
- technology competition
- geopolitical tension
- AI

## Important player systems

- household registration / hukou
- rural/urban divide
- education
- migration
- state employment
- private business
- digital payments
- platform restrictions
- government surveillance

Do not simply import U.S. Internet mechanics into China.

---

# 10. INDIA

India requires its own Modern-era model.

## 1990–1999

Core transformation:
- 1991 economic reforms
- liberalization
- private-sector expansion
- telecom development
- IT industry growth

## 2000–2009

- IT/BPO growth
- mobile expansion
- outsourcing
- urbanization
- private education
- expanding middle class

## 2010–2019

- smartphones
- cheap mobile data
- social media
- digital payments
- Aadhaar
- e-commerce
- startup ecosystem

## 2020–2022

- COVID lockdown
- migrant-worker disruption
- digital education
- telemedicine
- remote work
- vaccination
- UPI/digital payments expansion

## 2023+

- AI adoption
- digital public infrastructure
- startup ecosystem
- 5G
- creator economy
- growing global technology role

## Indian player systems

- family household
- caste/community context where historically relevant
- religion
- rural/urban location
- education
- government/private employment
- competitive exams
- migration
- remittances
- entrepreneurship
- digital payments
- smartphones
- internet access

The game must not assume one uniform "Indian middle class."

---

# 11. JAPAN & SOUTH KOREA

## Japan

Systems:
- aging population
- corporate employment
- advanced consumer technology
- economic stagnation after the boom
- anime/gaming culture
- high infrastructure

## South Korea

Systems:
- rapid economic development
- conglomerates
- education competition
- internet adoption
- smartphones
- K-pop
- gaming
- democratic transition

---

# 12. SOUTHEAST ASIA

Major contexts:
- Indonesia
- Malaysia
- Singapore
- Thailand
- Vietnam
- Philippines

Systems:
- industrialization
- migration
- manufacturing
- overseas workers
- urbanization
- smartphones
- social media

---

# 13. MIDDLE EAST & NORTH AFRICA

Major contexts:
- Gulf states
- Egypt
- Iran
- Iraq
- Israel/Palestinian territories
- Turkey
- Saudi Arabia
- UAE

Systems:
- oil economy
- migration
- authoritarianism/democracy variation
- religious identity
- war
- sanctions
- terrorism
- Arab Spring
- digital media

Major events:
- Gulf War
- Iraq War
- Arab Spring
- Syrian Civil War
- ISIS
- regional refugee crises

---

# 14. SUB-SAHARAN AFRICA

Do not treat Africa as one economy or society.

Core systems:
- postcolonial states
- democratization
- civil conflict in some states
- economic development
- mobile-phone leapfrogging
- mobile money
- urbanization
- migration
- entrepreneurship
- public health

Important distinction:

Some regions may skip traditional infrastructure stages.

For example:

```text
No widespread landline
→
Mobile phone
→
Mobile Internet
→
Digital payments
```

Technology progression must therefore not assume every region follows the U.S./Europe sequence.

---

# 15. LATIN AMERICA

Major systems:
- democratization
- inequality
- urbanization
- migration
- informal economy
- commodity cycles
- mobile adoption
- social media

Countries should be individually modeled where major differences matter:
- Brazil
- Mexico
- Argentina
- Chile
- Colombia
- Venezuela
- Cuba

---

# 16. HISTORICAL WORLD MODEL

```text
Global Modern World
│
├── States
│
├── International Organizations
│
├── Multinational Companies
│
├── Governments
│
├── Universities
│
├── Financial Institutions
│
├── NGOs
│
├── Religious Organizations
│
├── Media Organizations
│
├── Technology Platforms
│
├── Criminal Networks
│
├── Political Movements
│
├── Social Movements
│
└── Online Communities
```

The Modern era differs from previous eras because corporations, platforms and online communities can become major social institutions.

---

# 17. PLAYER CREATION

## 17.1 Required

- birth date
- birth location
- family
- sex/gender representation as appropriate to game design
- nationality/citizenship
- socioeconomic context

## 17.2 Optional

- religion
- ethnicity/cultural identity
- language
- family political orientation

These should never be randomly assigned in ways that contradict the selected location.

---

# 18. FAMILY MODEL

Modern life requires a more detailed family system.

Possible:
- nuclear family
- extended family
- single-parent household
- divorced parents
- blended family
- unmarried parents
- adopted child
- foster care
- grandparents as primary caregivers
- multigenerational household
- migrant family
- transnational family

Family can span countries through migration.

---

# 19. SOCIAL CLASS

Modern social class should not be one wealth number.

Track:

```text
Income
Wealth
Education
Occupation
Housing
SocialCapital
DigitalAccess
HealthcareAccess
GeographicMobility
JobSecurity
```

Broad categories:

- extreme poverty
- low income
- working class
- lower middle class
- middle class
- upper middle class
- affluent
- wealthy
- elite

Definitions vary by country.

---

# 20. CHILDHOOD

Modern childhood changes dramatically by decade.

## 1990s

- television
- outdoor play
- school
- desktop computers
- physical media

## 2000s

- Internet
- computer labs
- gaming
- SMS
- early social networks

## 2010s

- smartphones
- YouTube
- social media
- online games
- constant connectivity

## 2020s

- online learning
- smartphones
- short-form video
- AI tools
- pandemic legacy

---

# 21. EDUCATION

Education system must vary by country.

Stages:
- early childhood
- primary
- secondary
- vocational
- university
- postgraduate

Additional modern mechanics:
- standardized tests
- student loans
- scholarships
- online courses
- MOOCs
- coding bootcamps
- remote education
- AI-assisted learning

Education can affect:
- career
- income
- migration
- social status
- digital literacy

---

# 22. CAREERS

Modern careers must evolve over time.

## 1990s

- factory worker
- office clerk
- accountant
- teacher
- doctor
- engineer
- lawyer
- programmer
- journalist
- sales representative

## 2000s

Add:
- web developer
- IT support
- digital marketer
- BPO worker
- software engineer
- network administrator

## 2010s

Add:
- app developer
- data scientist
- UX designer
- social-media manager
- influencer
- content creator
- product manager
- cybersecurity analyst
- gig worker

## 2020s

Add:
- AI engineer
- ML engineer
- prompt/AI-oriented roles where historically appropriate
- creator
- remote consultant
- automation specialist

Do not allow future occupations before their technological/social prerequisites exist.

---

# 23. GAME STATS

## Core visible stats

### Health
Physical health.

### Mental Wellbeing
Stress, emotional state and psychological resilience.

### Wealth
Net financial/economic position.

### Education
Formal knowledge and credentials.

### Skill
Occupation-relevant ability.

### Reputation
Social/professional standing.

### Influence
Ability to affect people/institutions.

### Digital Literacy
Ability to use digital systems.

### Social Capital
Useful relationships and networks.

### Employability
Ability to obtain/retain work.

## Conditional stats

### Political Influence
Important for political careers.

### Military Ability
Only relevant for military contexts.

### Creator Reach
Relevant for media/content careers.

### Cybersecurity Awareness
Relevant to digital-risk systems.

---

# 24. ECONOMY

## 24.1 Core economic models

Support:

- developed market economy
- emerging market
- developing economy
- transition economy
- resource economy
- state-directed economy
- mixed economy
- informal economy

## 24.2 Player finances

Track:

```text
Cash
BankBalance
Debt
Assets
Property
Income
Expenses
Savings
Investments
Insurance
Taxes
```

## 24.3 Do not make money universal

A dollar-equivalent number is useful internally but should not imply equal purchasing power.

Use:

```text
LocalCurrency
PurchasingPower
CostOfLiving
IncomeLevel
ExchangeRate
```

---

# 25. HOUSING

Modern housing is a major life system.

Types:
- family home
- rented apartment
- dormitory
- shared apartment
- suburban house
- informal settlement
- government housing
- luxury apartment

Variables:
- ownership
- rent
- mortgage
- location
- size
- quality
- utilities
- internet
- commute

---

# 26. DIGITAL ACCESS

One of the defining Modern-era systems.

## Access progression

```text
None
→
Public Computer
→
Shared Computer
→
Home PC
→
Dial-up
→
Broadband
→
Feature Phone
→
Mobile Internet
→
Smartphone
→
Always Connected
```

Technology access depends on:
- year
- country
- urbanization
- wealth
- infrastructure

---

# 27. INTERNET MODEL

Internet should have:

```text
Access
Speed
Cost
Reliability
Censorship
Privacy
DigitalLiteracy
PlatformAvailability
```

## Regional restrictions

Some governments restrict:
- websites
- social platforms
- news
- messaging
- VPNs

The engine must make these date/location dependent.

---

# 28. SOCIAL MEDIA

Social media becomes a major social institution.

## Timeline

Early:
- forums
- chat rooms
- blogs
- instant messaging

Mid:
- social-network profiles
- photo sharing
- status updates

Later:
- algorithmic feeds
- influencers
- short-form video
- creator economy
- livestreaming

## Player mechanics

- create account
- follow people
- gain followers
- post
- receive comments
- build reputation
- go viral
- experience harassment
- lose privacy
- monetize audience

---

# 29. DIGITAL IDENTITY

A modern character should have:

```text
RealWorldIdentity
+
OnlineIdentity
```

Online identity may contain:
- username
- profiles
- photos
- posts
- followers
- reputation
- professional profile
- digital history

This creates a new form of legacy.

---

# 30. DIGITAL PRIVACY

Possible risks:
- data collection
- account compromise
- scams
- identity theft
- stalking
- doxxing
- surveillance
- targeted advertising
- data leaks

Privacy is partly hidden.

---

# 31. CYBERCRIME

Categories:
- phishing
- account theft
- malware
- identity theft
- financial fraud
- social engineering
- ransomware
- online harassment

Do not make cybercrime a generic hacking mini-game.

It should emerge from:
- digital access
- skill
- targets
- security
- opportunity

---

# 32. COMMUNICATION

Technology timeline:

```text
1990s:
Landline + fax + email + pager + early mobile

2000s:
SMS + email + web + feature phone

2010s:
Smartphone + messaging apps + social media + video calls

2020s:
Always-on messaging + video + AI assistants + platform ecosystems
```

The player's social network should evolve accordingly.

---

# 33. MEDIA

Media categories:
- newspaper
- radio
- television
- cable
- website
- blog
- podcast
- streaming
- social media
- short-form video

The player can experience information overload.

---

# 34. INFORMATION QUALITY

Modern information is not automatically accurate.

Track:

```text
SourceReliability
MisinformationExposure
MediaLiteracy
AlgorithmicExposure
PoliticalBias
SocialEchoChamber
```

A player may believe something that is false.

The system should distinguish:
- historical truth
- character belief
- player knowledge

---

# 35. GLOBALIZATION

Major mechanics:
- international companies
- outsourcing
- migration
- tourism
- international education
- remittances
- imported goods
- global entertainment
- global financial shocks

A financial crisis in one region can affect the player's employment elsewhere.

---

# 36. INTERNATIONAL TRAVEL

Modern travel is dramatically easier than previous eras but remains unequal.

Track:
- passport
- visa
- income
- citizenship
- travel restrictions
- airline availability
- destination policies

Travel types:
- tourism
- work
- education
- migration
- asylum
- business

---

# 37. POLITICS

Political systems:
- liberal democracy
- electoral democracy
- authoritarian state
- hybrid regime
- monarchy
- military government
- one-party state

Player participation:
- vote
- campaign
- protest
- donate
- volunteer
- join party
- run for office
- become journalist
- lobby
- organize online

---

# 38. POLITICAL POLARIZATION

Especially important from the 2010s onward.

Mechanics:
- ideological identity
- online communities
- political content
- protest
- family disagreement
- misinformation
- election cycles

Do not make polarization universal.

Intensity varies by:
- country
- year
- event
- platform
- social class

---

# 39. MAJOR POLITICAL EVENTS

P0:

- Soviet dissolution aftermath
- Yugoslav Wars
- Rwandan Genocide
- Gulf War
- 9/11
- Afghanistan War
- Iraq War
- Arab Spring
- global financial crisis
- major democratic transitions
- Brexit
- COVID-19
- Russia–Ukraine war

Each event should be represented according to location relevance.

---

# 40. HEALTHCARE

Modern healthcare varies dramatically.

Track:
- public/private system
- insurance
- access
- quality
- cost
- rural access
- specialist access
- medicine availability

Do not use U.S.-style healthcare assumptions globally.

---

# 41. HEALTH AND DISEASE

Possible:
- infectious diseases
- chronic disease
- cancer
- cardiovascular disease
- diabetes
- obesity
- respiratory disease
- HIV/AIDS
- mental-health conditions
- COVID-19

The model should use probability and healthcare access rather than making disease deterministic.

---

# 42. COVID-19 SYSTEM

COVID should be a global dynamic event.

Core variables:

```text
Cases
HospitalCapacity
Restrictions
SchoolClosures
WorkplaceClosures
TravelRestrictions
VaccinationRate
EconomicImpact
PublicCompliance
InformationQuality
```

Player experiences:
- illness
- quarantine
- remote work
- remote school
- unemployment
- business closure
- travel disruption
- family separation
- vaccination
- healthcare work

WHO's documented timeline shows that COVID rapidly moved from a localized outbreak into an international public-health emergency and then a pandemic in early 2020. citeturn0search1

---

# 43. REMOTE LIFE

Especially after 2020:

- remote work
- online school
- video meetings
- online shopping
- food delivery
- telemedicine
- digital banking
- digital entertainment

This should permanently affect some careers and lifestyles.

---

# 44. TRANSPORTATION

Technology progression:

1990s:
- cars
- buses
- rail
- conventional aviation

2000s:
- low-cost airlines
- GPS
- improved online booking

2010s:
- ride-hailing
- navigation apps
- electric vehicles emerging

2020s:
- EV growth
- advanced driver assistance
- micromobility
- delivery platforms

---

# 45. CONSUMER TECHNOLOGY

Progression:

```text
CRT TV
→
DVD
→
MP3 player
→
Digital camera
→
LCD/HDTV
→
Smartphone
→
Tablet
→
Streaming
→
Smart home
→
AI assistant
```

A character's possessions should tell the story of their era.

---

# 46. GAMING

Gaming is a major modern cultural system.

Progression:
- arcade
- 16-bit consoles
- PC gaming
- PlayStation/Xbox era
- online gaming
- mobile gaming
- esports
- livestreaming

Possible careers:
- developer
- streamer
- esports player
- content creator
- game journalist

---

# 47. CULTURE

Important:
- music
- cinema
- television
- anime
- gaming
- sports
- fashion
- celebrity culture
- internet memes
- creator culture

Culture should vary by region.

Do not assume Western culture is the global default.

---

# 48. RELIGION

Relevant traditions:
- Christianity
- Islam
- Hindu traditions
- Buddhism
- Judaism
- Sikhism
- other indigenous/local traditions
- secularism

Modern religious life may include:
- traditional practice
- online communities
- diaspora communities
- religious politics
- changing levels of observance

---

# 49. FAMILY AND RELATIONSHIPS

Modern relationships should support:

- dating
- arranged marriage
- love marriage
- online dating
- long-distance relationships
- cohabitation
- marriage
- divorce
- remarriage
- blended families
- single-parent households
- international relationships

Availability depends on:
- country
- religion
- class
- law
- year

---

# 50. ONLINE DATING

Timeline:

1990s:
- personal ads
- early chat

2000s:
- dating websites

2010s:
- smartphone dating apps

2020s:
- algorithmic matching
- video dating
- AI-assisted dating tools

Mechanics:
- profile
- compatibility
- messaging
- meeting
- ghosting
- scams
- relationships

---

# 51. LAW AND RIGHTS

Modern legal systems vary.

Track:
- voting age
- marriage age
- education rights
- property rights
- employment rights
- gender rights
- minority protections
- LGBTQ+ legal status
- privacy laws
- internet laws

The engine must be date-specific.

---

# 52. MIGRATION

Types:
- rural → city
- country → country
- education
- employment
- refugee
- asylum
- family reunification

Migration depends on:
- citizenship
- passport
- visa
- money
- education
- political conditions
- family network

---

# 53. WAR AND CONFLICT

Modern wars can include:

- conventional war
- civil war
- insurgency
- terrorism
- cyber conflict
- drone warfare
- sanctions
- information warfare

Player experiences:
- civilian
- refugee
- soldier
- journalist
- aid worker
- engineer
- government employee

---

# 54. MILITARY SERVICE

State machine:

```text
Civilian
→ Eligible
→ Draft / Volunteer
→ Training
→ Deployment
→ Service
→ Wounded / Captured / Healthy
→ Discharged
→ Veteran
```

Availability depends on country and period.

---

# 55. ENVIRONMENT

Major systems:
- climate change
- pollution
- extreme weather
- drought
- floods
- wildfires
- heatwaves
- water scarcity

The game should model environmental pressure as a regional variable, not a universal random disaster.

---

# 56. EDUCATIONAL TECHNOLOGY

Progression:

```text
Textbook
→
Computer Lab
→
CD-ROM
→
Web Research
→
Online Courses
→
Video Learning
→
Remote Classroom
→
AI-Assisted Learning
```

Digital literacy becomes increasingly important.

---

# 57. AI SYSTEM

For 2020s only.

Possible uses:
- AI assistant
- content generation
- coding assistance
- translation
- education
- image generation
- automation

Risks:
- misinformation
- deepfakes
- job displacement
- privacy
- bias
- overreliance

Do not project modern AI capabilities into earlier years.

---

# 58. HISTORICAL EVENTS

Every event:

```text
Event ID
Name
Start Date
End Date
Location
Actors
Historical Cause
Historical Outcome
Affected Groups
Player Relevance
Player Entry Conditions
Fixed Outcomes
Branchable Outcomes
Long-Term Consequences
```

---

# 59. MAJOR EVENT CATALOG

## 1991 — Soviet Union Dissolution
Effects:
- new states
- migration
- economic transition
- political restructuring

## 1991 — Indian Economic Reforms
Effects:
- liberalization
- private sector
- globalization

## 1991 — World Wide Web becomes publicly available
Effects:
- Internet expansion

## 1994 — Rwandan Genocide
Major regional historical event.

## 1990s — Balkan Wars
Major European conflict.

## 1990s — Globalization acceleration
Long-running background event.

## 1997 — Asian Financial Crisis
Regional/global economic effects.

## 2001 — September 11 attacks
Major global event.

## 2001 — Afghanistan War
Long-running conflict.

## 2003 — Iraq War
Major geopolitical event.

## 2004 — Indian Ocean tsunami
Major natural disaster.

## 2007–2008 — Global Financial Crisis
Major economic event.

## 2008 — Global recession
Effects:
- unemployment
- housing
- investment
- migration

## 2010–2012 — Arab Spring
Major political transformation.

## 2011 — Fukushima disaster
Technology/environment/energy event.

## 2010s — Smartphone/social media transformation
Long-running technological event.

## 2016 — Brexit referendum
Major political/economic event.

## 2020 — COVID-19 pandemic
Global event.

## 2020s — AI acceleration
Long-running technology transformation.

## 2022 — Russia's full-scale invasion of Ukraine
Major geopolitical event.

---

# 60. HISTORICAL FIGURES

Figures should be contextual NPCs.

Potential figures include:

## Politics
- Nelson Mandela
- Bill Clinton
- George W. Bush
- Barack Obama
- Donald Trump
- Vladimir Putin
- Mikhail Gorbachev
- Boris Yeltsin
- Xi Jinping
- Jiang Zemin
- Hu Jintao
- Narendra Modi
- Manmohan Singh
- A. P. J. Abdul Kalam
- Tony Blair
- Angela Merkel
- Emmanuel Macron

## Technology / business
- Tim Berners-Lee
- Steve Jobs
- Bill Gates
- Jeff Bezos
- Sergey Brin
- Larry Page
- Mark Zuckerberg
- Elon Musk

These figures should usually remain background/world-state actors rather than becoming mandatory player contacts.

---

# 61. RANDOM EVENTS

## Family
- birth
- marriage
- divorce
- illness
- death
- migration
- inheritance

## Career
- promotion
- layoff
- startup opportunity
- remote-work opportunity
- career change
- automation

## Digital
- new device
- viral post
- account hack
- scam
- data breach
- online friendship
- online conflict

## Economic
- inflation
- recession
- investment opportunity
- housing boom
- housing crash

## Social
- protest
- festival
- cultural event
- online community
- discrimination
- friendship

## Political
- election
- policy change
- protest
- government restriction
- scandal

## Health
- disease
- pandemic
- medical breakthrough
- healthcare access change

---

# 62. CHOICE DESIGN

Choices must emerge from the character's real environment.

Every significant choice should potentially affect:

```text
Immediate
Delayed
Personal
Family
Economic
Social
Digital
Political
Historical
```

---

# 62.1 Example — 1998 student

Event:
The family gets its first home computer.

Choices:
- learn programming
- use it for games
- explore the Internet
- ignore it

Long-term:
digital literacy
career options
social network

---

# 62.2 Example — 2008 worker

Event:
Company downsizing.

Choices:
- accept severance
- relocate
- retrain
- start a business

Effects:
- wealth
- debt
- career
- family
- migration

---

# 62.3 Example — 2016 teenager

Event:
A political argument spreads across social media.

Choices:
- post
- remain silent
- debate privately
- organize

Effects:
- online reputation
- friendships
- family conflict

---

# 62.4 Example — 2020 employee

Event:
Workplace closes due to pandemic restrictions.

Choices:
- work remotely
- seek new work
- rely on savings
- start online business

---

# 63. HISTORICAL DIVERGENCE

Modern history should allow divergence, but not unlimited control.

## Level 1 — Personal

- education
- career
- marriage
- migration

## Level 2 — Family

- family finances
- political relationships
- inheritance

## Level 3 — Local

- business
- local activism
- local politics
- community

## Level 4 — Regional

Requires substantial influence.

## Level 5 — National

Requires exceptional influence.

## Level 6 — Global

Extremely rare.

---

# 64. DIVERGENCE RULE

Use:

```text
DivergencePotential =
Influence
×
Resources
×
Knowledge
×
Network
×
InstitutionalAccess
×
Timing
```

This is a gameplay abstraction.

A random citizen should not be able to:
- prevent 9/11
- stop a major war
- change a national election alone
- invent a technology before its prerequisites
- prevent COVID

unless the simulation explicitly gives them a plausible causal pathway.

---

# 65. HISTORICAL LOCKS

## HARD LOCK

Usually fixed:
- major technology invention dates
- major historical events
- major wars
- global financial crisis
- COVID emergence
- major political transitions

## SOFT LOCK

Can branch under high influence:
- election results
- company outcomes
- local political outcomes
- regional events

## OPEN

Player controlled:
- career
- family
- education
- wealth
- relationships
- local reputation

---

# 66. DEATH AND LEGACY

## Death causes

- natural causes
- disease
- accident
- violence
- war
- terrorism
- environmental disaster
- pandemic
- occupational injury

## Legacy

Include:

```text
Birth
Death
Countries
Cities
Family
Education
Career
Wealth
Property
Relationships
Technology experienced
Online identity
Digital footprint
Political involvement
Major historical events
Major personal achievements
Historical influence
```

The Modern era should add:

### Digital Legacy

Possible:
- old photos
- social profiles
- posts
- professional reputation
- online communities
- digital assets

---

# 67. REPLAYABILITY

Replay dimensions:

```text
DECADE
×
COUNTRY
×
CITY/RURAL
×
CLASS
×
EDUCATION
×
CAREER
×
TECHNOLOGY ACCESS
×
POLITICAL SYSTEM
×
MIGRATION
×
ONLINE IDENTITY
×
FAMILY
×
HISTORICAL EVENTS
```

Example starts:

- American child, 1991
- Indian rural child, 1992
- Russian teenager, 1991
- Chinese urban child, 1998
- Nigerian student, 2000
- Japanese engineer, 2002
- Indian software developer, 2005
- American college student, 2007
- Chinese entrepreneur, 2012
- European university student, 2014
- Syrian refugee, 2015
- Indian startup founder, 2018
- U.S. remote worker, 2020
- healthcare worker, 2020
- teenager entering an AI-heavy world, 2024

---

# 68. DATA MODEL REQUIREMENTS

## Era

```text
Era
- id
- name
- start
- end
- sub_eras
- global_rules
```

## SubEra

```text
SubEra
- id
- start
- end
- technology_state
- economy_state
- politics_state
- culture_state
- major_events
```

## Country

```text
Country
- id
- name
- government_type_by_date
- currency_by_date
- laws_by_date
- economic_model_by_date
- internet_policy_by_date
- healthcare_model
- education_model
```

## Location

```text
Location
- id
- country
- urbanization
- population
- industries
- infrastructure
- cost_of_living
- technology_access
- risks
```

## Technology

```text
Technology
- id
- invention_date
- commercial_date
- adoption_by_region
- affordability
- prerequisites
- effects
```

## Platform

```text
Platform
- id
- launch_date
- shutdown_date
- region_availability
- user_base
- functionality
- monetization
- political_restrictions
```

## Occupation

```text
Occupation
- id
- availability_by_date
- region
- education_required
- income
- skill
- automation_risk
- remote_work_compatibility
```

## SocialClass

```text
SocialClass
- id
- country
- date_range
- income
- wealth
- education
- housing
- social_capital
- digital_access
```

## PoliticalSystem

```text
PoliticalSystem
- id
- country
- date_range
- government_type
- voting_rules
- civil_rights
- censorship
- surveillance
- political_participation
```

## HistoricalEvent

```text
HistoricalEvent
- id
- name
- start
- end
- location
- cause
- actors
- fixed_outcomes
- branch_points
- player_relevance
- consequences
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

## CharacterState

```text
CharacterState
- date
- age
- location
- citizenship
- family
- class
- health
- mental_wellbeing
- wealth
- education
- skill
- reputation
- influence
- digital_literacy
- social_capital
- employment
- technology_access
- political_identity
- religion
- online_identity
```

## DigitalIdentity

```text
DigitalIdentity
- usernames
- platforms
- followers
- posts
- reputation
- privacy
- contacts
- digital_assets
- security
```

## WorldState

```text
WorldState
- date
- political_map
- economic_conditions
- technology_adoption
- internet_access
- conflicts
- public_health
- climate_events
- migration
- platform_state
- major_events
```

## Timeline

```text
Timeline
- baseline_history
- player_interventions
- changed_events
- causal_links
- alternate_outcomes
- current_world_state
```

---

# 69. AGENT IMPLEMENTATION NOTES

# MUST BE HISTORICALLY FIXED

Unless valid divergence occurs:

- invention dates
- major wars
- major political transitions
- major economic crises
- major technology launches
- major pandemic chronology
- major international treaties
- existence of major countries

# CAN BE RANDOMIZED

- family
- siblings
- neighborhood
- school
- minor illnesses
- friendships
- employer
- local income
- minor economic events
- online encounters
- personal relationships

# CAN BE PLAYER-CHANGED

- education
- career
- wealth
- marriage
- children
- migration
- business
- political participation
- online identity
- local reputation

# REQUIRES FUTURE SYSTEM

- full global financial simulation
- complete social-media algorithm simulation
- complete AI labor-market simulation
- detailed global climate model
- complete cyberwar model
- complete global supply-chain simulation
- fully simulated international diplomacy
- complete city-level infrastructure model

---

# 70. MVP RECOMMENDATION

Do not attempt 1990–present in the first implementation.

Recommended vertical slice:

## MVP WINDOW

**2007–2012**

Why?

This period captures the transition from:

```text
Desktop Internet
→
Smartphone
→
Apps
→
Social Media
→
Always-connected life
```

It is also small enough to implement without requiring:
- COVID
- modern AI
- full geopolitical 2020s systems

---

# 71. MVP MAP

Minimum locations:

### United States
1. New York
2. San Francisco
3. Chicago

### India
4. Delhi
5. Mumbai
6. Bengaluru

### China
7. Beijing
8. Shanghai

### Europe
9. London
10. Berlin
11. Paris

### Japan / Korea
12. Tokyo
13. Seoul

### Middle East
14. Dubai
15. Cairo

### Africa
16. Lagos
17. Johannesburg

### Latin America
18. São Paulo
19. Mexico City

Total:

**19 locations**

This is enough to demonstrate:
- developed economy
- emerging economy
- developing economy
- high-tech economy
- authoritarian digital environment
- democratic environment
- migration
- globalization
- platform economy

---

# 72. MVP SOCIAL CLASSES

- extreme/low income
- working class
- lower middle class
- middle class
- upper middle class
- wealthy
- elite
- student-dependent household

---

# 73. MVP CAREERS

- farmer
- factory worker
- retail worker
- office clerk
- teacher
- doctor
- nurse
- engineer
- software developer
- IT support
- journalist
- accountant
- lawyer
- civil servant
- salesperson
- entrepreneur
- student
- freelancer
- military
- police

---

# 74. MVP STATS

Visible:

- Health
- Mental Wellbeing
- Wealth
- Education
- Skill
- Reputation
- Digital Literacy
- Social Capital

Conditional:

- Influence
- Political Access
- Creator Reach

---

# 75. MVP TECHNOLOGY

Required:

- desktop computer
- Internet
- email
- mobile phone
- SMS
- feature phone
- smartphone
- broadband
- early social media
- online shopping
- digital banking
- GPS/maps

---

# 76. MVP HISTORICAL EVENTS

Minimum:

1. 2007 smartphone transition
2. 2008 global financial crisis
3. social-media expansion
4. mobile Internet expansion
5. global recession
6. major regional political events
7. early app economy

---

# 77. MVP DIVERGENCE

Full:
- personal
- family
- career
- local

Limited:
- regional

Locked:
- global historical events

A player can become:
- successful entrepreneur
- influential journalist
- major creator
- political organizer

but cannot casually rewrite world history.

---

# 78. MVP UI

Always show:

```text
DATE
LOCATION
COUNTRY
SOCIAL CLASS
OCCUPATION
HEALTH
MENTAL WELLBEING
WEALTH
EDUCATION
DIGITAL LITERACY
SOCIAL CAPITAL
TECHNOLOGY ACCESS
CURRENT EVENT
CURRENT WORLD CONDITIONS
CHOICES
```

---

# 79. INFORMATION MODEL

Modern life requires two separate knowledge states.

## Character Knowledge

What the character plausibly knows.

## Player Knowledge

What the real-world player knows.

Example:

A character in 2007 should not see:

> "Smartphones will dominate society."

They should see:

> "A new generation of mobile devices is attracting attention."

---

# 80. HISTORICAL UNCERTAINTY

Use:

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

For contemporary events, uncertainty should be higher.

Do not present unresolved current events as settled history.

---

# 81. CONTENT PRIORITY

# P0 — REQUIRED FOR MVP

## Systems

- date/location engine
- family
- social class
- economy
- education
- career
- technology access
- Internet
- digital identity
- communication
- social media
- historical events
- choice/consequence
- personal divergence

## Regions

- U.S.
- India
- China
- UK/Western Europe
- Japan
- South Korea
- Middle East
- Africa
- Latin America

---

# P1 — IMPORTANT

- financial crisis
- migration
- globalization
- online dating
- digital payments
- gaming
- creator economy
- political polarization
- healthcare
- misinformation
- cybersecurity
- war/conflict

---

# P2 — EXPANSION

- COVID-19
- climate change
- remote work
- AI
- advanced cybercrime
- digital surveillance
- detailed international finance
- full global supply chains

---

# P3 — FUTURE

- full global economic simulation
- fully simulated social-media algorithms
- AI-driven labor-market simulation
- detailed climate migration
- complete digital-identity persistence
- fully simulated global geopolitical system

---

# 82. ERA DESIGN SUMMARY

# Era Identity

**The Modern era is the transformation from an increasingly connected physical world into an increasingly connected digital world.**

---

# Player Fantasy

> **"Live through the transformation of everyday life — from the pre-smartphone world to the Internet, social media, globalization, pandemic disruption and AI."**

---

# Core Gameplay

```text
LIVE
↓
GROW UP
↓
STUDY
↓
WORK
↓
BUILD RELATIONSHIPS
↓
ADOPT TECHNOLOGY
↓
BUILD DIGITAL IDENTITY
↓
RESPOND TO ECONOMIC / POLITICAL EVENTS
↓
MIGRATE / ADAPT / CREATE / INVEST
↓
TECHNOLOGY CHANGES AGAIN
↓
WORLD CHANGES
↓
LEGACY
```

---

# Major Systems

1. Date-aware historical engine
2. Geography
3. Political systems
4. Economy
5. Social class
6. Family
7. Education
8. Career
9. Technology adoption
10. Internet
11. Digital identity
12. Social media
13. Globalization
14. Migration
15. Healthcare
16. Political participation
17. Conflict
18. Pandemic
19. AI
20. Historical divergence
21. Digital legacy

---

# Historical Hook

The Modern era is uniquely suited to LegacyLife because a single character can experience several technological civilizations within one lifetime:

```text
No Internet
→
Dial-up
→
Broadband
→
Mobile
→
Smartphone
→
Social Media
→
Cloud
→
Remote Work
→
AI
```

ITU's historical record supports this broad communications transformation, including the transition from early digital mobile networks to globally interoperable 3G and later 4G/5G systems. citeturn0search4turn0search5

---

# MVP

Build:

**2007–2012**

with:
- 19 locations
- 9+ regions
- 8 social classes
- 20 careers
- 8 core stats
- Internet
- mobile phones
- smartphones
- social media
- digital identity
- globalization
- economic crisis
- personal/family/local divergence

---

# OPEN QUESTIONS

## Historical

1. What exact present-day cutoff should each game version use?
2. How should contemporary unresolved events be represented?
3. How granular should country-level Internet restrictions be?
4. How should caste, ethnicity and religion be represented without reducing people to demographic labels?
5. How should informal economies be modeled?
6. How should undocumented migrants be represented?
7. How should conflict zones be modeled without making violence the defining feature of civilian life?

## Product

1. What age rating should LegacyLife target?
2. Should players be able to experience real-world extremist/political organizations?
3. How much real-world political content should appear?
4. Should social-media content be procedurally generated?
5. Should online identity persist after death?
6. Should descendants inherit digital assets?
7. How should the game handle real-world living public figures?
8. How should current events be separated from historical events?

## Technical

1. How should technology adoption be geographically modeled?
2. How should platform availability change by date?
3. How should purchasing power be normalized?
4. How should social networks scale?
5. How should misinformation affect character beliefs?
6. How should digital identity be persisted?
7. How should AI availability be gated by date?
8. How should COVID policies vary by country and city?
9. How should alternate timelines alter technology adoption?
10. How should contemporary facts be versioned as they change?

---

# 83. AGENT FINAL RULE

The coding agent must never ask:

> "What is modern life?"

It must ask:

> **"What was this exact person's technological, political, economic, cultural and social world on this exact date, in this exact location?"**

The Modern era is not a static ruleset.

It is a **transition engine**.

The defining simulation principle is:

```text
TIME CHANGES TECHNOLOGY
+
LOCATION CHANGES ACCESS
+
CLASS CHANGES OPPORTUNITY
+
POLITICS CHANGES RIGHTS
+
CULTURE CHANGES NORMS
+
GLOBAL EVENTS CHANGE EVERYONE
=
MODERN LEGACY
```

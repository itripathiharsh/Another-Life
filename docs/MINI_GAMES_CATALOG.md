# LegacyLife — Comprehensive Mini-Games Catalog & Design Specification

> **Status:** Proposal & Design Specification  
> **Target Eras:** Post-War India (1945–1970) & Victorian Industrial Britain (1840–1890)  
> **Core Integration:** Available both on-demand (via Dashboard, Career, Economy, People, and Health tabs) AND triggered contextually during historical life dilemmas.  
> **Philosophy:** No shallow mobile gimmicks. Every mini-game is historically grounded, skill-based, emotionally resonant, and directly tied to character attributes, generational wealth, family relationships, and historical legacy.

---

## Architecture & Integration Model

```
┌────────────────────────────────────────────────────────────────────────┐
│                        LEGACYLIFE MINI-GAME HUB                        │
├───────────────────────────────────┬────────────────────────────────────┤
│         ON-DEMAND ACCESS          │        CONTEXTUAL TRIGGERS         │
│  • Career Tab: Workshop & Labor   │  • Historical Dilemmas & Choices   │
│  • Economy Tab: Market & Exchange │  • Epidemics & Wartime Crises      │
│  • People Tab: Parlour & Romance  │  • Court Trials & Legal Disputes   │
│  • Health Tab: Triage & Medicine  │  • Inheritance & Secret Strongboxes│
└───────────────────────────────────┴────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        SIMULATION ENGINE TIE-IN                        │
│  • Immediate Stats: Wealth (₹/£), Health, Intellect, Happiness, Karma  │
│  • Relationship Vectors: Affection, Respect, Trust, Conflict, Loyalty  │
│  • Career Track: Apprenticeship Mastery, Guild Licensing, Promotions   │
│  • World History & Flags: Historical Divergence, Police Records, Legacy│
└────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Commerce, Trade & Wealth (Economy Pillar)

### 01. The Merchant's Bargain (Bazaar & Port Market Haggling)
* **Setting & Lore:** 
  * *India (1945–1970):* The historic Aminabad and Chowk bazaars of Lucknow, navigating old family attar sellers, silver merchants, and silk traders.
  * *Victorian Britain (1840–1890):* London's Petticoat Lane and Covent Garden market stalls, dealing with shrewd cockney costermongers and antique brokers.
* **Core Gameplay:** 
  A 3-to-4 round turn-based negotiation duel. The seller has a hidden reserve price, greed rating, and impatience meter. The player chooses tactical responses each round:
  * *Inspect Flaw:* Spot loose stitching, tarnished metal, or chipped enamel to drop their reserve price.
  * *Flatter & Compliment:* Flatter their artisanal ancestry to reduce seller hostility.
  * *Brandish Ready Cash:* Offer prompt coin on the table to test their urgency.
  * *Feign Disinterest / Walk Away:* High-risk gamble that either forces a desperate discount or loses the item entirely.
* **Simulation Impact:** 
  * *Success:* 25%–50% discount on valuable property, family heirlooms, wedding jewelry, or workshop machinery; unlocks trader reputation perk.
  * *Failure:* Overpaying, seller insults lowering Charisma/Reputation, or getting blacklisted from that market stall for 2 years.

---

### 02. The Assayer's Scales (Precious Metals & Gemstone Counterfeit Testing)
* **Setting & Lore:** 
  * *India:* Sarafa Bazaar bullion vaults in Lucknow/Delhi, evaluating Mughal silver rupiyas, gold mohurs, and Kashmiri sapphires.
  * *Victorian Britain:* Hatton Garden gem dealers and Birmingham Jewellery Quarter assay offices testing hallmarked sovereigns and imported colonial diamonds.
* **Core Gameplay:** 
  An interactive deduction and measurement puzzle:
  1. *Balance Beam Weights:* Place standardized weights against raw bullion to detect clipped or shaved coins.
  2. *Touchstone Acid Test:* Drag the metal across a dark slate stone; apply nitric acid drops and match the streak color against purity charts (24k vs 18k vs brass-core lead).
  3. *Loupe Inspection:* Examine gemstone inclusions to differentiate natural river stones from paste-glass counterfeits.
* **Simulation Impact:**
  * *Success:* Discovering mispriced authentic bullion for massive investment yield; earning the "Master Assayer" license in banking/trade.
  * *Failure:* Purchasing fake lead-core gold bars, suffering major treasury loss, or being falsely indicted for circulating debased currency.

---

### 03. The Shareholder's Ticker (Early Stock & Commodity Speculation)
* **Setting & Lore:** 
  * *India:* Dalal Street (Bombay Native Share and Stock Brokers' Association, est. 1875/1950s) trading cotton bales, jute mills, and newly founded national industrial bonds.
  * *Victorian Britain:* The Royal Exchange and Capel Court during the 1845 "Railway Mania" and South American mining booms.
* **Core Gameplay:** 
  A fast-paced micro-market simulator between yearly ticks:
  * Read authentic telegraph dispatch fragments (e.g., *"Monsoon fails in Gujarat"*, *"Stephenson's locomotive beats rival line"*, *"Suez Canal shares purchased"*).
  * Allocate cash into high-risk equities (Railway charters, Tea plantations) or stable consols/gilt bonds.
  * Decide when to sell before speculative market bubbles burst (Panic of 1847, Post-War 1948 market shakeup).
* **Simulation Impact:**
  * Generational riches allowing early retirement into high aristocracy/landed gentry, or sudden financial ruin plunging the family into workhouses or moneylender debts.

---

### 04. The Caravan & Cargo Manifest (Logistics & Customs Smuggling)
* **Setting & Lore:** 
  * *India:* Long-haul truck and bullock transport along the Grand Trunk Road between Kanpur, Delhi, and Lucknow during post-war rationing.
  * *Victorian Britain:* East India Docks cargo lighters and Grand Union Canal barges moving coal, rum, textiles, and imported spices.
* **Core Gameplay:** 
  A spatial grid puzzle (inventory Tetris) with dynamic weight distribution and risk heatmaps:
  * Pack diverse cargo containers into the hold: heavy cast iron at the bottom, fragile glass in the center, perishable grain protected from moisture.
  * Optional: Hide high-margin contraband (tax-exempt salt, forbidden pamphlets, black-market penicillin) within hidden false-bottom bulkheads.
  * Navigate customs checkpoints by balancing inspector bribery against paperwork legitimacy.
* **Simulation Impact:**
  * Tripled commercial trade margins and shipping guild prestige vs cargo impoundment, heavy customs fines, and imprisonment for smuggling.

---

## 2. Craftsmanship, Labor & Science (Career Pillar)

### 05. The Handloom Weaver's Shuttle (Textile & Chikan Embroidery)
* **Setting & Lore:** 
  * *India:* Awadh Chikan artisans and Khadi handloom cooperatives in Chowk, weaving intricate shadow-work embroidery on fine muslin.
  * *Victorian Britain:* Lancashire cotton mills and Yorkshire woolen weavers operating water-frame and steam-powered power looms.
* **Core Gameplay:** 
  A rhythmic pattern-matching and tension-balance game:
  * A scrolling pattern sheet displays warp and weft rhythm cues.
  * Tap pedals and shuttle switches in rhythmic cadence to maintain perfect thread tension.
  * Missed beats cause broken thread snags, requiring rapid needle-darning minitasks before the cloth is ruined.
* **Simulation Impact:**
  * Weaving a "Masterwork Shawl" fetches royal/ministerial patronage, massive piece-rate income, and craft guild mastery. Poor quality causes wage docked fines, hand tendon fatigue (-Health), and loss of artisan apprenticeships.

---

### 06. The Stoker's Boiler Pressure (Steam Engine & Locomotive Regulation)
* **Setting & Lore:** 
  * *India:* Indian Railways steam locomotives (Northern Railway division) powering passenger trains between Lucknow, Kanpur, and Delhi.
  * *Victorian Britain:* Cornish beam engines pumping colliery floodwaters or Great Western Railway express locomotives designed by Brunel.
* **Core Gameplay:** 
  An intense multi-gauge equilibrium simulator:
  * Shovel coal into fireboxes to raise temperature.
  * Regulate cold water injector valves to avoid thermal shock.
  * Watch steam pressure PSI needles: keep needle within the green "Maximum Tractive Effort" band.
  * If pressure enters the red warning zone, manually pull safety release levers before catastrophic boiler rupture occurs.
* **Simulation Impact:**
  * Promoted to Chief Locomotive Engineer or Colliery Foreman. Critical failure causes boiler explosion, leading to permanent burns, blindness, or immediate death.

---

### 07. The Apothecary's Mortar (Herbal Compounding & Medicine)
* **Setting & Lore:** 
  * *India:* Traditional Unani (Hakim) and Ayurvedic (Vaidya) dispensaries compounding herbs (Ashwagandha, Tulsi, Neem, Camphor, Makardhwaj) during seasonal epidemics.
  * *Victorian Britain:* Victorian chemist shops and apothecary dispensaries blending tinctures, carbolic washes, sulfur salves, and laudanum syrups.
* **Core Gameplay:** 
  Recipe deduction and chemistry compounding:
  * Read patient symptom cards (fever, lung congestion, gangrene, cholera dehydration).
  * Select herbal and chemical reagents, measure precise drams and ounces using apothecary weights, grind in mortar with pestle, and boil over spirit burner.
  * Test pH/color shifts to avoid lethal toxic compound overdoses.
* **Simulation Impact:**
  * Successfully curable family members/townspeople earn the player revered "Community Healer" legacy and medical licenses; lethal blunders trigger malpractice trials and police investigations.

---

### 08. The Typesetter's Galley (Printing Press & Underground Broadsheet)
* **Setting & Lore:** 
  * *India:* Urdu and Hindi presses in Lucknow and Allahabad printing post-independence civic newspapers and political manifestos.
  * *Victorian Britain:* Fleet Street penny broadsheets and clandestine Chartist printing cellars publishing radical reform pamphlets.
* **Core Gameplay:** 
  A mirror-image typographic layout puzzle under a strict countdown:
  * Assemble metal type slugs into a composing stick in reverse (mirror-flipped letters).
  * Edit article headlines to fit column lines without awkward hyphenation.
  * Editorial decision: choose whether to censor inflammatory paragraphs when police censors inspect the press room, or smuggle out unedited copies under floorboards.
* **Simulation Impact:**
  * Elevates Intellect and Political Reputation; wins literary awards or triggers police press seizures, sedition trials, and underground resistance hero status.

---

## 3. Strategy, Parlour Leisure & Courtship (People Pillar)

### 09. Chausar / Pachisi (The Royal Cloth-Cross Board Game)
* **Setting & Lore:** 
  The ancient Indian strategic board game played across palaces, havelis, and veranda courtyards of North India for centuries.
* **Core Gameplay:** 
  A fully interactive turn-based board game played on an embroidered cloth cross with 4 players/pawns:
  * Throw 6 cowrie shells to determine move values (2, 3, 4, 6, 12, or the coveted 25).
  * Strategically move pawns around the outer perimeter: form pairs ("super-pawns") that cannot be captured, block opponent bottlenecks, and navigate safely to the inner castle (Charkoni).
  * High-stakes strategic choices: sacrifice a vanguard piece to eliminate an opponent's key runner.
* **Simulation Impact:**
  * Playable against family members, mentors, and rivals on demand. Greatly strengthens Affection and Respect; gambling wagers win or lose pocket money; reveals personality traits of family members.

---

### 10. The Grandmaster's Gambit (Victorian Parlour Chess & Draughts)
* **Setting & Lore:** 
  Gentlemen's clubs (like London's Simpson's-in-the-Strand), drawing rooms, and military academies of Victorian Britain.
* **Core Gameplay:** 
  Tactical chess endgame puzzles and draughts capture challenges:
  * The board is presented in historical configurations (e.g., The Immortal Game positions, Anderssen combinations, or Queen sacrifice mates).
  * Player has 3 turns to execute the winning tactical combination (fork, pin, discovered checkmate, or multi-jump draughts king capture).
* **Simulation Impact:**
  * Directly builds Intellect (+5 per win); earns membership in prestigious high-society gentleman's clubs; wins respect from academic mentors and aristocratic father-in-laws.

---

### 11. The Courting Suitor's Ghazal & Verse (Poetry & Love Letter Duel)
* **Setting & Lore:** 
  * *India:* Lucknow Baitbazi (poetic contest) and Mehfil gatherings where romantic suitors court through competitive recitation of classical Urdu sher (couplets).
  * *Victorian Britain:* High-society ballroom flirtation through Victorian flower language (Floriography) and composed sonnets in a lady's personal leather keepsake album.
* **Core Gameplay:** 
  Poetic meter, rhyme, and emotional rhetoric matching:
  * The love interest recites or writes an opening verse.
  * The player is presented with four potential counter-lines: must match the meter (Qafia and Radif), tonal nuance (subtle wit vs ardent passion vs respectful devotion), and avoid cultural taboos.
* **Simulation Impact:**
  * Successful courtship dramatically increases romance compatibility, unlocks marriage proposals, guarantees lower wedding costs, and elevates social standing.

---

### 12. The Billiard Room Wager (Angles, Spin & Parlour Stakes)
* **Setting & Lore:** 
  * *India:* Officer's mess and club billiard halls in the Cantonment of Lucknow/Delhi.
  * *Victorian Britain:* West End London gentleman's clubs and East End tavern poolrooms.
* **Core Gameplay:** 
  A 2D top-down physics cue-ball shot game:
  * Adjust cue stick aim trajectory, power meter, and ball english (topspin/backspin).
  * Execute pocket shots, bank rebounds, and 3-cushion caroms to beat local hustlers.
* **Simulation Impact:**
  * Earns instant gambling cash or accumulates debt; builds camaraderie with military and merchant peers; excessive play can trigger the "Gambling Vice" trait.

---

## 4. Politics, Law & Civic Governance (World Pillar)

### 13. The Panchayat & Juror's Verdict (Witness Cross-Examination & Trial)
* **Setting & Lore:** 
  * *India:* Village Panchayat council under the banyan tree or Lucknow District Court assessing agrarian land disputes and theft accusations.
  * *Victorian Britain:* Old Bailey Crown Court criminal trials where the player sits as a sworn juryman on cases of grand larceny or workhouse negligence.
* **Core Gameplay:** 
  A courtroom deduction and witness cross-examination puzzle:
  * Review the indictment charges and listen to three witness testimonies.
  * Spot chronological contradictions, forged signature marks on deeds, or biased familial motives.
  * Cast the decisive verdict: Guilty vs Innocent vs Compromise settlement, facing bribery temptations from corrupt town elites.
* **Simulation Impact:**
  * Boosts Community Karma and Civic Reputation; accepting bribes grants quick cash but risks public disgrace, imprisonment, or family curse flags.

---

### 14. The Ballot Box Campaign (Hustings Speech & Constituency Stumping)
* **Setting & Lore:** 
  * *India:* The historic 1952 first general elections of independent India, campaigning with the iconic two-bullocks ballot symbol across rural Awadh.
  * *Victorian Britain:* Parliamentary hustings under the Reform Acts in industrial boroughs (Manchester, Birmingham, Leeds).
* **Core Gameplay:** 
  A strategic rhetoric and audience demographic mini-game:
  * The crowd is divided into three factions (e.g., Peasants, Mill Workers, Shopkeepers).
  * Choose speech topics and rhetorical tone (Fiery populist, Reassuring conservative, Technocratic visionary).
  * React to hostile crowd hecklers by using witty deflection, moral authority, or promising municipal relief.
* **Simulation Impact:**
  * Wins election to Municipal Council or Parliament; unlocks political authority over city development budgets and appointments; opens higher government career tiers.

---

### 15. The Surveyor's Boundary Map (Land Partition & Property Settlement)
* **Setting & Lore:** 
  * *India:* Post-Independence Zamindari abolition land consolidation and ancestral farm demarcations.
  * *Victorian Britain:* Railway land acquisition surveys and Enclosure Act estate mapping across rural Yorkshire and the Midlands.
* **Core Gameplay:** 
  A geometry staking and theodolite transit puzzle:
  * Adjust survey chains, compass bearings, and level sightings to trace exact property acreage boundaries.
  * Reconcile conflicting ancestral copper plates and tax maps while avoiding encroaching on neighboring temple/church lands or village commons.
* **Simulation Impact:**
  * Resolves bitter family inheritance lawsuits, expands farm acreage yields by +20%, and prevents multi-generational land feuds with neighbors.

---

### 16. The Telegraph Operator's Key (Morse Code Dispatch & Decryption)
* **Setting & Lore:** 
  * *India:* Posts & Telegraphs Department central wire rooms in Lucknow, Kanpur, and New Delhi handling wartime civil defense and commercial wires.
  * *Victorian Britain:* General Post Office and submarine cable stations transmitting trans-Atlantic telegrams and Admiralty dispatches.
* **Core Gameplay:** 
  A rhythm-keying and cipher decryption game:
  * Listen/watch incoming dots and dashes (Morse rhythm).
  * Tap out response keys to transcribe urgent dispatches under a ticking clock.
  * Moral/Economic choice: chance to intercept confidential commodity tips (cotton supply shortages, railway charter approvals) before delivering to recipient.
* **Simulation Impact:**
  * Career promotion to Telegraph Inspector; provides legal insider stock tips or triggers official secrets treason investigations if caught leaking.

---

## 5. Survival, Health & Epidemic Calamities (Health Pillar)

### 17. The Quarantine Cordon & Triage (Epidemic Outbreak Response)
* **Setting & Lore:** 
  * *India:* Managing emergency medical cordons during the 1954 Kumbh Mela cholera outbreak or seasonal malaria surges in the monsoon plains.
  * *Victorian Britain:* Dr. John Snow's 1854 Broad Street cholera containment and London typhus hospital triage.
* **Core Gameplay:** 
  A spatial epidemiology containment puzzle:
  * A district map shows infection clusters radiating from contaminated water pumps and tenements.
  * Deploy limited supplies: place carbolic disinfectants, distribute boiling alerts, seal infected water handles, and triage hospital beds (mild vs acute vs critical).
  * Keep the total neighborhood death count below the containment threshold.
* **Simulation Impact:**
  * Directly saves the player's own spouse and children from contractable fatal illness; awards public medals and heroic historical chronicling; failure causes severe household illness/death.

---

### 18. The Monsoon Embankment Sandbagger (Flood & Storm Defense)
* **Setting & Lore:** 
  * *India:* Battling the catastrophic 1960 Gomti River Flood in Lucknow, shoring up clay levees to save homes and granaries.
  * *Victorian Britain:* The Great Thames River surge inundating riverside wharves, warehouses, and low-lying East London basements.
* **Core Gameplay:** 
  A high-intensity structural reinforcement and rescue puzzle:
  * River water levels rise in real time against a multi-section retaining dyke.
  * Allocate laborers and sandbags to reinforce sagging levee breaches before structural collapse occurs.
  * Choose between evacuating valuable grain storehouses or rescuing stranded elderly neighbors.
* **Simulation Impact:**
  * Saves owned property assets (haveli, workshop, crops) from total destruction; boosts town respect to 100/100; failure wipes out uninsured assets and incurs flood debt.

---

### 19. The Herbal Forager's Trail (Wild Forest Botanical Identification)
* **Setting & Lore:** 
  * *India:* Foraging medicinal roots, bark, and herbs in the Awadh foothills, Terai forests, and riverbanks.
  * *Victorian Britain:* Countryside hedgerow gathering of wild edible mushrooms, digitalis (foxglove), elderberry, and willow bark during economic depressions.
* **Core Gameplay:** 
  A field-guide visual identification and botany search game:
  * Explore scenic illustrated nature scenes to locate hidden plant specimens.
  * Compare leaf veins, berry clusters, and root aromas against the herbal field manual to distinguish life-saving medicinal herbs from lethal toxic look-alikes (e.g., wild carrot vs deadly hemlock).
* **Simulation Impact:**
  * Free valuable apothecary ingredients, cures for chronic illness, emergency nutrition preventing starvation during bad harvests; severe poisoning hazard if mistaken.

---

### 20. The Locksmith's Tumbler (Ancestral Strongbox & Safe Cracking)
* **Setting & Lore:** 
  * *India:* Opening a late grandfather's heavy brass-studded iron chest (Tijori) containing forgotten deeds, gold sovereigns, and family secrets.
  * *Victorian Britain:* Deciphering Chubb detector safes and patent brass cylinder locks in bank vaults, aristocratic manors, or solicitor offices.
* **Core Gameplay:** 
  A sensory tension and pin-tumbler lockpicking game:
  * Rotate tension wrench to apply gentle turning torque.
  * Probe each tumbler pin with a pick: feel audio-haptic clicks and visual micro-movements when a pin hits the sheer line.
  * Over-tension snaps the pick or triggers the deadbolt anti-tamper trap.
* **Simulation Impact:**
  * Recovers buried ancestral wills, lost inheritance deeds (+₹5,000 / +£500), secret letters resolving family mysteries, or being arrested if attempting unauthorized burglary.

---

## Implementation Matrix & Priority Roadmap

| ID | Mini-Game | Pillar | Access Mode | Era Alignment | Complexity |
|---|---|---|---|---|---|
| **01** | The Merchant's Bargain | Economy | Both (Market & Events) | Both (Bazaar / Petticoat) | Medium |
| **02** | The Assayer's Scales | Economy | On-Demand (Sarafa/Jeweller) | Both (Sarafa / Hatton) | Medium |
| **03** | The Shareholder's Ticker | Economy | On-Demand (Bourse/Exchange) | Both (Dalal St / Royal Exch) | Medium |
| **04** | The Cargo Manifest | Economy | Career / Event | Both (GT Road / London Docks)| Medium |
| **05** | The Handloom Weaver | Career | On-Demand (Apprentice/Artisan) | Both (Chikan / Cotton Mill) | High (Action) |
| **06** | Boiler Pressure Stoker | Career | Career / Hazard Events | Both (Locomotive / Factory) | Medium (Active) |
| **07** | The Apothecary's Mortar | Career / Health | Both (Clinic / Epidemics) | Both (Vaidya / Chemist) | High (Puzzle) |
| **08** | The Typesetter's Galley | Career | Career / Sedition Events | Both (Lucknow Press / Fleet St) | Medium |
| **09** | Chausar / Pachisi | People | On-Demand (Family / Parlour) | India Special (Awadh Haveli)| High (Turn-based)|
| **10** | Grandmaster's Gambit | People | On-Demand (Clubs / Salons) | Victorian Special (Chess) | Medium (Puzzle) |
| **11** | Suitor's Ghazal & Verse| People | Courtship / Romance Events | Both (Baitbazi / Sonnets) | High (Narrative)|
| **12** | The Billiard Room Wager| People | On-Demand (Clubs / Taverns) | Both (Cantonment / West End)| Medium (Physics) |
| **13** | Panchayat / Jury Verdict| World | Event (Disputes / Crimes) | Both (Panchayat / Old Bailey)| High (Deduction)|
| **14** | Ballot Box Campaign | World | Career / Election Years | Both (1952 Polls / Hustings)| High (Strategy) |
| **15** | The Surveyor's Boundary | World | Estate / Land Events | Both (Land Reform / Railways) | Medium (Geometry)|
| **16** | Telegraph Morse Key | World | Career / Wartime Events | Both (Post & Tel / GPO) | Medium (Rhythm) |
| **17** | Quarantine & Triage | Health | Historical Calamity Events | Both (Kumbh / Broad St) | High (Strategy) |
| **18** | Monsoon Sandbagger | Health | Calamity Events (Floods) | Both (Gomti / Thames Surge) | Medium (Active) |
| **19** | Herbal Forager's Trail | Health | On-Demand (Wellness) | Both (Forest / Countryside) | Medium (Hidden) |
| **20** | Locksmith's Tumbler | World / Family| Inheritance / Secret Events | Both (Iron Tijori / Chubb Safe)| Medium (Sensory) |

---

## Recommended Initial Batch (Top 3 for Immediate Implementation)

1. **The Merchant's Bargain (Bazaar Haggling):** Seamlessly integrates with the newly built Real Estate & Property market and shopping events.
2. **Chausar / Pachisi & Victorian Parlour Chess:** Deepens the newly built Family & Relationship systems, allowing players to challenge parents, spouses, and rivals to games that affect affection and intellect.
3. **The Apothecary's Mortar / Workshop Crafting:** Plugs directly into the Health and Career dashboards, giving players hands-on gameplay when treating illnesses or working apprenticeships.

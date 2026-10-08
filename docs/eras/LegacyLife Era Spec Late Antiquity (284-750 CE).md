# LegacyLife Era Specification: Late Antiquity (c. 284-750 CE)

Design specification v0.1 for AI coding agents. Not production code. Where this document says 'LATER', the feature depends on a system not yet defined.

## 0. How to Read This Document

**Labels used throughout**

- **\[FACT\]** historically well supported.
- **\[DEBATE\]** historians disagree or evidence is thin; the game must treat it as a configurable parameter, not a certainty.
- **\[DESIGN\]** a proposed game mechanic (never history).
- **\[LATER\]** requires a future system.

**Conventions**

- Dates are CE. 'c.' means approximate. Where sources disagree, a date range is given.
- Contemporary self-names are used in-game: East Romans call themselves *Rhomaioi* (Romans). 'Byzantine' is a later modern label and must appear only as optional UI metadata or encyclopedia text, never in character dialogue.
- Modern concepts must not appear in-game: no 'nation', 'ethnicity' as a legal category, 'middle class', 'feudalism' (a contested later term), 'GDP', 'Dark Ages'.
- All numbers (prices, mortality, population) are **tuning parameters** based on scholarly estimates, not facts. They are stored in data files and flagged \[DEBATE\] where ranges are wide.

---

## 1. Era Overview

**Name:** Late Antiquity: The Long Transformation (Rome, Persia, India and the Christian world)

**Date range:** 284 (accession of Diocletian) to 750 (Abbasid revolution; end of the Umayyad caliphate). \[DEBATE\] Scholars place the end anywhere from c. 600 to c. 800. For LegacyLife, 750 is a design choice, chosen because by then the Late Roman-Persian state system has been replaced by the caliphate, the Frankish Carolingian rise has begun, and post-Gupta India has fully regionalized.

**Geographic range:** Atlantic coast (Britain, Spain) to the Ganges plain; Nile valley and Axum to the Rhine, Danube and Caucasus; steppe and Central Asian margins; Arabia.

**Major societies**

1. **Roman Empire:** unified to 395, then western and eastern halves. West ends as a state 476 (traditional date). East continues as the 'Byzantine' empire.
2. **Sasanian Empire** (224-651): Zoroastrian Iranian empire, Rome's rival.
3. **Gupta Empire and successors** (c. 319/320-c. 550; post-Gupta states after): North India.
4. **Germanic kingdoms:** Goths (Visigoths, Ostrogoths), Vandals, Franks, Burgundians, Lombards, Suebi, Anglo-Saxons, Angles, Jutes and others.
5. **Church communities:** imperial church, Miaphysite (Syriac, Coptic, Armenian), Church of the East (inside Persia), Arian Germanic churches, monastic networks.
6. **Peripheral powers:** Huns, Hephthalites, Avars, Turks, Slavs, Arabs (before and after Islam), Axum, Armenia, Caucasian Iberia and Lazica, Berber groups.

**Important transitions**

- Fiscal-military reorganization of Rome (Diocletian, Constantine).
- Christianization of the Roman state (313 Edict of Milan tradition; 380 Edict of Thessalonica).
- Germanic settlement and the end of the Western Roman state (376-476).
- Justinianic reconquest and the Justinianic Plague (533-565).
- Roman-Persian 'last great war' (602-628) and mutual exhaustion.
- Arab conquests and fall of the Sasanian Empire (632-651).
- Hunnic invasions and Gupta fragmentation (c. 470-550).

**Why it suits LegacyLife**

- Transformation era: identity, religion, citizenship, loyalty and law all shift inside a lifetime. Player choices (convert? flee? serve a new lord?) feel meaningful and historically grounded.
- Rich low-status life: coloni, monks, slaves, merchants, soldiers, scribes, laborers are well attested.
- Strong fixed anchors (sacks, councils, plagues, wars) plus deep regional variation gives date+location sensitivity.
- Multiple parallel civilizations let the same birth year produce wholly different lives.

**Era-wide distinctions the engine must model**

- Tax-state (Rome, Persia, Gupta) versus kin/lord-based rule (early Germanic).
- Literate bureaucratic cultures versus largely oral cultures.
- Doctrinal conflict inside Christianity (Nicene, Arian, Miaphysite, Church of the East).
- Coin economy versus mixed coin, kind and service economy, varying by region and decade.

---

## 2. Date + Location Resolution (Core Rule)

```text
BIRTH DATE (year, season)
+ BIRTH LOCATION (grid cell -> region -> controlling polity at that date)
+ SOCIAL CONTEXT (class, family occupation, religion, legal status)
= HISTORICAL WORLD INSTANCE
```

**Resolution steps \[DESIGN\]**

1. Validate date within 284-750. Reject or re-roll outside range.
2. Find the **SubEra** (Section 3) containing the date.
3. Find the **Region** (Section 4) containing the location.
4. Look up the **PoliticalEntity** controlling that cell on that date from a `ControlTimeline` table (borders change; e.g., Carthage is Roman 284-439, Vandal 439-533, Roman 533-698, Arab after).
5. Load the **region-period profile** (law, currency, dominant religion, dangers, active events, language).
6. Generate family, class, religion and starting stats from the profile.
7. Generate the **local calendar of events** (fixed anchors affecting the region within the lifespan window plus random pools).

**Fidelity tiers \[DESIGN\]**

- **Tier A (rich):** hand-authored events, NPC pools, class tables. Example: East Roman Empire 527-565.
- **Tier B (structured):** full rules and region profile; fewer unique events. Example: Sasanian Iran 531-579, Gupta heartland 375-467, Frankish Gaul 481-561.
- **Tier C (generic):** profile-driven generic life with era-appropriate events. Example: Britain, Ireland, Axum, Central Asia, southern India.
- Auto Create weights toward Tier A and B; Custom Life may select Tier C with a visible 'lower detail' notice.

**Unsupported / sparse places** If the chosen location has no meaningful polity (open sea, steppe, high mountains), snap to the nearest supported region with a short explanation, or generate nomadic/pastoral context for steppe regions (P2).

---

## 3. Temporal Breakdown (SubEras)

The era is divided into six sub-eras. Each is a data record (`SubEra`) with boundaries, but boundaries are **regionally soft**: a region's profile may override the sub-era for local conditions.

### SE1. Dominate and Christian Empire (284-378)

- **Dates:** 284-9 Aug 378 (Battle of Adrianople).
- **Societies:** Unified Roman Empire (tetrarchy 293-324, then Constantinian dynasty, Julian, Valentinian and Valens); Sasanians under Shapur II (309-379); early Guptas (Chandragupta I c. 319/320; Samudragupta c. 335-375); Germanic confederations (Alamanni, Franks, Goths) on frontiers.
- **Politics:** Diocletian's tetrarchy; Constantine reunites 324; Constantinople dedicated 330; Christianity favored from 312-313; Julian's pagan revival 361-363; Valens killed at Adrianople 378.
- **Technology:** Classical Mediterranean level: stone and concrete building, Roman roads and cursus publicus (state post), watermills spreading, ox-drawn plough, codex replacing scroll.
- **Economy:** Heavy fiscal state. Solidus (gold coin) introduced c. 309/310 by Constantine; base-metal coinage unstable. Tax in kind (annona) and gold. Bound coloni in law by 332 (Constantine) \[FACT\]; degree in practice \[DEBATE\].
- **Social structure:** Senatorial and curial elites, imperial service (militia), soldiers, free peasants, coloni, slaves. Curial class (city councillors) burdened by tax liability.
- **Conflicts:** Roman-Persian wars (Shapur II), civil wars, Germanic frontier raids; Gothic migration across the Danube 376.
- **Changes from previous:** (First sub-era.) Transition from third-century crisis to a reorganized empire.

### SE2. Collapse of the West, Rise of the Kingdoms (378-493)

- **Dates:** 378-493 (Theodoric takes Ravenna).
- **Societies:** Divided Roman Empire after 395; Visigoths, Vandals, Burgundians, Franks, Huns; Sasanians (Yazdegerd I, Bahram V, Peroz); Guptas (Chandragupta II c. 375-415 through Skandagupta c. 455-467).
- **Major events:** Crossing of the Rhine 406; Sack of Rome 410 (Alaric); Vandals in Africa 429-439; Council of Ephesus 431; Attila's campaigns 440s-453; Council of Chalcedon 451; Vandal sack of Rome 455; deposition of Romulus Augustulus 476; Odoacer; Theodoric 489-493; Hephthalite pressure on Persia and India.
- **Technology:** Largely continuous; infrastructure decay in West; Persian and Roman fortress engineering; Indian iron and astronomy advances (Aryabhata b. 476).
- **Economy:** Western regions: coin circulation contracts, estates (villae) become semi-autonomous; East remains monetized and urban. Tax continuity under new kings varies \[DEBATE\].
- **Social:** Roman and barbarian elites merge; Germanic military settlement (hospitalitas, a system for quartering/sharing land; mechanics debated \[DEBATE\]); Church bishops become civic leaders.
- **Changes:** West loses central imperial authority; Church becomes a main institution of continuity; Huns and Hephthalites reshape Persian and Indian frontiers.

### SE3. Justinianic Age (493-565)

- **Dates:** 493-14 Nov 565 (death of Justinian).
- **Societies:** East Roman Empire (Anastasius 491-518, Justin I 518-527, Justinian 527-565); Ostrogothic Italy (493-553); Vandal Africa (to 533); Franks (Clovis d. 511; Merovingian division); Visigoths in Spain; Sasanian Persia (Kavad I, Khosrow I 531-579); Gupta collapse (c. 500-550).
- **Major events:** Nika riot Jan 532; Hagia Sophia rebuilt 532-537; Corpus Juris Civilis 529-534; Vandalic War 533-534; Gothic War 535-554; Plague arrives 541-542 (Constantinople 542); Rule of Benedict (c. 530s-540s); silk worms smuggled c. 552 \[DEBATE on exact details\]; Council of Constantinople 553.
- **Technology:** Peak of late Roman monumental construction (domes, pendentives). Greek fire not yet (c. 670s). Cataphract cavalry, composite bows, siege towers, ballistae.
- **Economy:** Strong gold economy in East; heavy war expenditures; plague-driven labor shortage, wage rises and tax shortfalls.
- **Social:** Mass mortality; senate weaker than court; faction ('Blues' and 'Greens') public violence in cities.
- **Conflicts:** Roman-Persian wars (527-532, 540-562); Gothic War; Moorish revolts in Africa; Hunnic and Slavic raids in Balkans.
- **Changes:** Re-expansion of Roman East into Italy, Africa, southern Spain; overextension; legal and doctrinal consolidation.

### SE4. Exhaustion and Crisis (565-630)

- **Dates:** 565-628/630.
- **Societies:** East Rome under Justin II, Tiberius II, Maurice (582-602), Phocas, Heraclius (610-641); Lombards in Italy from 568; Avars and Slavs in Balkans; Khosrow II (590-628); Visigothic Spain; Merovingian Francia; Anglo-Saxon kingdoms; post-Gupta states (Harsha 606-647); Chalukya Pulakeshin II.
- **Major events:** Lombard invasion 568; Gregory the Great as pope 590-604; Augustine of Canterbury's mission 597; Maurice overthrown 602; Roman-Persian war 602-628; Persian conquest of Syria, Palestine (Jerusalem 614), Egypt (c. 618-619); siege of Constantinople 626; Heraclius' campaign into Persia, Battle of Nineveh 627; peace 628.
- **Economy:** Plague recurrences; Balkan collapse; monetary and military stress.
- **Changes:** Roman cities in Balkans largely lost; Persia at maximum extent then collapses into civil war.

### SE5. Arab Conquests and Realignment (630-717)

- **Dates:** 630-717.
- **Societies:** Rashidun caliphs (632-661), Umayyads (661-750); reduced East Roman state; Sasanian end (Yazdegerd III d. 651); Lombard kingdom; Frankish mayors of the palace; Visigothic Spain.
- **Events:** Yarmouk 636 (date debated); Qadisiyya (636-638 debated); Nahavand c. 642; conquest of Egypt 639-642; Arab sieges of Constantinople 674-678, 717-718; Carthage falls 698.
- **Technology/economy:** Fleet warfare, Greek fire (c. 672-678 tradition); thematic provincial armies (theme system's date and nature \[DEBATE\]); Arab tax and tribute systems layered on Roman and Sasanian ones.
- **Changes:** Persia's state ends; Syria, Egypt and North Africa leave Roman rule; Roman state becomes smaller, Greek-centered.

### SE6. Late Umayyad and Early Medieval Settlement (717-750)

- **Dates:** 717-750.
- **Events:** Defeat at Constantinople 718; Iconoclasm begins c. 726-730 \[DEBATE on start\]; Muslim defeat at Tours/Poitiers 732 (a raid battle, modest size); Charles Martel dies 741; Abbasid revolution 747-750.
- **Changes:** Settled medieval patterns; Late Antique state system fades.

**Cross-period note \[DESIGN\]:** Each SubEra defines default values; each Region can supply overrides for any parameter.

---

## 4. Geographic Breakdown (Playable Regions)

Each region is a `Region` record with per-SubEra profiles. Below: base profiles. Tier is the target fidelity.

### R1. Constantinople and Thrace (Tier A)

- **Entity:** East Roman Empire (capital from 330).
- **Cities:** Constantinople (population c. 300,000-500,000 at peak \[DEBATE\]), Adrianople, Heraclea, Thessalonica (nearby).
- **Population:** Greek-speaking majority in city; Latin official use in law and army through 6th century; migrants from Anatolia, Syria, Balkans; slaves; Goths and other foederati.
- **Social:** Emperor and court; senators; bureaucrats (scrinia); shopkeepers and guilds (the Book of the Eparch is 10th century, so use only generally); circus factions (Blues, Greens); clergy; poor of the city (bread distribution until 618 \[FACT\]).
- **Economy:** Tax and grain from Egypt, trade, workshops, silk and luxury goods.
- **Religion:** Chalcedonian (imperial) Christianity; Jewish minority; pagans persecuted (Justinian); heresies suppressed or contested.
- **Military:** Excubitors, scholae, field armies, urban garrison.
- **Occupations:** Official, clerk, soldier, artisan, merchant, sailor, dock worker, cleric, servant, entertainer.
- **Risks:** Riots (532), plague (542), earthquakes, fires, Slavic and Avar raids in Thrace, famine on grain failure.
- **Events:** Nika 532, Hagia Sophia, plague 542, Avar siege 626, Arab sieges 674 and 717.

### R2. Anatolia (Tier B)

- **Entity:** East Roman provinces.
- **Cities:** Ephesus, Nicaea, Nicomedia, Ancyra, Caesarea (Cappadocia), Trebizond; rural villages dominate.
- **Economy:** Grain, olives (west coast), wool, stock; free villages and large estates; coloni.
- **Risks:** Persian raids (603-626), Arab raids from 640s, earthquakes, plague.
- **Occupations:** Peasant farmer, shepherd, soldier-farmer, monk.
- **Languages:** Greek, plus Isaurian, Armenian, Cappadocian and Galatian local languages.
- **Note:** Cappadocian monastic settlements and Church councils (Nicaea 325 near).

### R3. Syria-Palestine and Antioch (Tier B)

- **Entity:** East Roman until 636-640; Persian occupation c. 613-628; Arab after.
- **Cities:** Antioch (devastated by earthquakes 526, 528 and Persian sack 540), Jerusalem, Caesarea Maritima, Edessa (Osroene), Damascus, Palmyra (declining).
- **Culture:** Syriac and Greek speakers; Jewish and Samaritan communities; Christian pilgrimage to Holy Land; Arab client groups (Ghassanids).
- **Religion:** Chalcedonians versus Miaphysites (Jacobite church organized 540s-560s by Jacob Baradaeus).
- **Risks:** Earthquake, Persian and Arab invasion, plague.

### R4. Egypt and Alexandria (Tier B)

- **Entity:** Roman East until c. 618-619 (Persian), restored 629, Arab 639-642.
- **Cities:** Alexandria, Oxyrhynchus, Antinoopolis, Thebes.
- **Economy:** Grain surplus (Constantinople's supply), papyrus, linen; abundant papyrus documents \[FACT\], enabling realistic local life data.
- **Culture:** Greek administrative class; Coptic-speaking peasantry; monastic movement (Pachomius, Shenoute); urban Alexandria's intellectual life (the Neoplatonic school; Hypatia killed 415).
- **Religion:** Strong Miaphysite (Coptic) majority after Chalcedon (451).
- **Risks:** Nile flood failure, plague, religious riots, tax pressure.

### R5. Italy and Rome (Tier A/B)

- **Entities:** Roman Empire (West) to 476; Odoacer 476-493; Ostrogoths 493-553; East Roman (Ravenna exarchate from 584); Lombards from 568; Papacy.
- **Cities:** Rome (population decline from c. 500,000+ in 4th century to a few tens of thousands by 6th century \[DEBATE\]), Ravenna, Milan, Naples, Pavia.
- **Economy:** Large senatorial estates, tenant farmers; Gothic War devastation 535-554; plague.
- **Culture:** Latin and Gothic speakers; Senatorial families (Anicii); Boethius (c. 477-524), Cassiodorus.
- **Religion:** Nicene Roman Church; Arian Goths; Pope's growing civic role (Gregory I).
- **Risks:** War, sieges (Rome changes hands several times, 536-552), famine, plague, Lombard raids.

### R6. Gaul/Francia (Tier B)

- **Entities:** Roman Gaul; Visigoths (Aquitaine, 418+); Burgundians; Franks under Merovingians (Clovis c. 481-511).
- **Cities:** Tours, Paris, Lyon, Arles, Trier, Soissons, Reims, Metz.
- **Economy:** Agriculture, estates (villae) and small farms; salt, wine; limited coin; bishops central; tolls and royal fisc.
- **Social:** Frankish warriors, Gallo-Roman aristocrats, bishops, peasants, slaves; Salic law (Lex Salica, c. 507-511 or later) uses wergild (compensation payment) \[FACT\].
- **Religion:** Catholic (Nicene) after Clovis' baptism (date debated, between c. 496 and 508 \[DEBATE\]).
- **Risks:** Dynastic wars among Merovingian kings (Fredegund and Brunhild era), raiding, famine, disease.

### R7. Hispania and North Africa (Tier B)

- **Spain:** Visigothic kingdom (Toledo capital from c. 560s-570s; Leovigild 568-586; Reccared converts to Catholic Christianity 587/589); Suebi kingdom in Northwest to 585; Byzantine south-east 552-624; fall to Arabs 711.
- **Africa:** Vandal kingdom (439-533; Arian) then East Roman (533-698); Berber (Moorish) groups; Carthage as main city; Donatist and Nicene tensions earlier.
- **Economy:** Olive oil and grain export; African Red Slip pottery; large estates.

### R8. Britain and Ireland (Tier C)

- Roman Britain until c. 410 (end of imperial administration); Anglo-Saxon settlement (details and numbers \[DEBATE\]); British kingdoms; Irish monastic Christianity (Patrick, fifth century). Sparse documentary sources; settlement archaeology only.

### R9. Sasanian Iran and Mesopotamia (Tier B)

- **Entity:** Sasanian Empire (Shahanshah, 'King of Kings').
- **Cities:** Ctesiphon (royal capital, near Seleucia), Gundeshapur (medical and learned center), Istakhr, Ray, Merv, Nisibis (school), Bishapur, Ardashir-Khwarrah.
- **Population:** Persian (Middle Persian/Pahlavi), Aramaic-speaking Mesopotamians, Armenians, Arabs of Hira (Lakhmids), Jews of Babylonia (producing the Babylonian Talmud c. 3rd-6th centuries), Christians (Church of the East), Zoroastrians.
- **Social estates:** Priests (magi, with a Mobed), warriors (including the great houses), scribes (dabirs) and commoners (peasants, artisans) \[FACT, idealized\]; dehqans (landed gentry) became important especially after Khosrow I's reforms.
- **Economy:** Silver drachms; irrigation agriculture (Sawad); Silk Road trade; tax reform by Kavad I and Khosrow I (land survey; fixed tax rather than share of crop) \[FACT with debate on details\].
- **Religion:** State Zoroastrianism (fire temples, with Kartir in 3rd century persecuting others), Mazdakite movement under Kavad I c. 488-531 \[DEBATE on nature\].
- **Military:** Heavy cavalry (savaran), archers, elephants, Arab allies; frontier fortresses (Derbent, Caucasian wall).
- **Risks:** Roman and Hephthalite wars, plague (542 and after), taxes, religious suppression, civil war after 628.

### R10. Gupta India and Successors (Tier B for Ganges plain; Tier C elsewhere)

- **Entity:** Gupta Empire c. 319/320-c. 550; post-Gupta kingdoms (Maukharis, Later Guptas, Pushyabhutis under Harsha of Kanauj, Chalukyas of Badami in Deccan, Pallavas in the south, Vakatakas allied to Guptas).
- **Cities:** Pataliputra (capital), Ujjain (a second center under Chandragupta II), Ayodhya, Mathura, Varanasi, Kausambi, Nalanda (monastic university, 5th century onward), Vidisha.
- **Society:** Varna and jati system with Brahmins, Kshatriyas, Vaishyas, Shudras, and outcaste (candala) groups \[FACT as social ideal in texts; practice variable\].
- **Economy:** Gold dinaras (Gupta coinage in gold and silver), cowries for small change, village agriculture, guilds (shreni), land grants to Brahmins and temples (agrahara) increasingly common \[FACT\].
- **Religion:** Hindu worship (Vaishnava, Shaiva, Shakta), Buddhism (monasteries, patronage) and Jainism; Gupta kings favored Vaishnavism but supported others.
- **Knowledge:** Aryabhata (b. 476), Kalidasa (dates uncertain, traditionally associated with Chandragupta II \[DEBATE\]), Panchatantra, Sanskrit literature, Vatsyayana, medicine (Ayurveda, Sushruta and Charaka traditions), place-value numerals, early chess precursor (chaturanga).
- **Visitors:** Faxian (Fa-Hien) c. 399-412; Xuanzang c. 629-645 under Harsha.
- **Risks:** Hun invasions (Toramana and Mihirakula c. 500-530s \[DEBATE on details\]), regional wars, monsoon failure, disease.

### R11. Caucasus, Armenia, Arabia, Axum (Tier C) \[P2/P3\]

Buffer zones: Armenia (Christianized c. 301 traditionally), Iberia, Lazica, Himyar (Yemen; Jewish kingdom c. 520s), Ghassanids and Lakhmids as Arab clients, Axum (Christian from c. 330s, Ezana), Mecca and Medina (Muhammad c. 570-632).

### R12. Steppe and Central Asia (Tier C) \[P3\]

Huns, Avars, Turks, Hephthalites and Sogdian merchants. Nomadic lifeways, caravan trade.

---

## 5. Historical World Model

**Entity types**

- **PoliticalEntity:** empire, kingdom, client state, papacy, tribal confederation, city (as semi-autonomous unit). Each has: ruler, capital, tax model, law system, religion policy, army type, territory (time-based), diplomatic relationships.
- **Settlement:** metropolis (>100k), city (5-50k), town, village, estate (villa), monastery, fortress, camp. Each has: population, economy mix, defenses, local institutions.
- **Institution:** imperial court, civil service, municipal council (curia), Church (bishopric, monastery, ecumenical council), army unit, guild, estate, Sasanian fire temple, Gupta brahmanical and Buddhist institutions, Germanic assembly (thing/mallus), royal household.
- **Faction:** dynamic groups competing for power. E.g., Blues and Greens; Chalcedonians versus Miaphysites; Arian Goths and Nicene Romans; Persian magnates; Merovingian royal lines; Gupta heirs.
- **Trade network:** Mediterranean sea lanes (grain from Egypt and Africa, oil, wine), Red Sea and Indian Ocean (spices, pepper, cotton), overland Silk Road (silk, Sogdians), Baltic and Atlantic coastal trade (tin, amber) (limited), Rhine and Danube frontier trade.
- **Dynasty/Family:** Constantinian, Theodosian, Justinianic, Sasanian royal house, Merovingians, Guptas. Powerful senatorial families (Anicii).

**Key relationships \[DESIGN: simulate as edges with attributes\]**

- Roman Empire <-> Persia: rival; fixed border region (Mesopotamia, Armenia); frequent war and treaty; cultural exchange.
- Roman East <-> Church: emperor intervenes in doctrine; bishops hold civic power.
- Germanic kings <-> Roman population: dual legal systems (personal law: Roman law for Romans, Germanic custom for Goths and Franks in many kingdoms); alliances through marriage.
- Persia <-> Hephthalites <-> Gupta: shifting northern pressure.
- Gupta kings <-> Brahmins and Buddhist sangha: patronage via land grants.
- All empires <-> peasants: tax extraction versus local community.

**Simulation scale \[DESIGN\]** The world is not fully simulated agent by agent. Maintain: (a) polity-level state (ruler, stability, treasury, war status), (b) region-level state (prosperity, unrest, plague level, famine), (c) settlement-level state for places the player visits, and (d) generated NPCs near the player.

---

## 6. Player Creation

### 6.1 Entry modes

- **Auto Create:** random year weighted by sub-era playability tier, random location weighted by regional population (but with a minimum floor so rare regions appear), then random family drawn from region-period tables.
- **Custom Life:** the player chooses year (and optionally season) and location from a map. They may optionally choose class and religion if allowed by region-period profile (with 'plausibility warnings', for example choosing 'senator in Pataliputra' triggers a 'not a Roman concept' error).

### 6.2 What is determined by location and date

- Polity, law system, taxes, language(s), dominant and minority religions, economic base, class system (for example: Roman legal statuses, Sasanian estates, Indian varna and jati, Germanic free versus unfree and kin groups).
- Active historical events and dangers.
- Prices, currency, literacy rates, plague presence.

### 6.3 What is random

- Family structure, birth order, siblings, parents' specific occupation within class, health at birth, innate aptitudes, extended kin, personality traits, minor local conditions.

### 6.4 Player Creation Output (CharacterState seed)

- Name (culture-appropriate name generator), sex at birth, birth date, birthplace, legal status, social class, family wealth tier, parents and their occupations, siblings, household (nuclear or extended), religion and sect, language(s), starting stats, hidden traits, family obligations (tax, debt, patron).

### 6.5 Sex and gender \[DESIGN\]

Gender substantially shapes legal and social access in all these societies. The game must represent that honestly while avoiding sensationalism: women had different opportunities (property rights in Roman law, dowry control, religious roles such as abbesses and deaconesses; Sasanian noblewomen could rule briefly: Boran and Azarmidokht in 630s; Gupta women had limited public role but queens such as Prabhavatigupta ruled as regent of the Vakataka realm). Mechanics should alter available paths, not forbid exploration of historically attested exceptions.

### 6.6 Starting advantages and disadvantages \[DESIGN\]

- Advantages: literate household, patron in the bureaucracy, land holdings, craft tools, strong health, kin network, good location (safe interior), religious standing.
- Disadvantages: debt, bound status (colonus, slave), frontier location, minority religion in persecuting period, household with disease, orphan, famine year birth, war region.

### 6.7 Birth-time risks \[DESIGN with FACT bases\]

Infant and child mortality very high: roughly a quarter to a third of infants died in the first year and about half of children by age 10 in many pre-modern populations \[DEBATE on exact local rates\]. The game uses a configurable mortality table, with in-game messaging handled sensitively (the player 'continues as a sibling or heir' option when early death occurs; see Section 20).

### 6.8 Population-weighted starting distribution (approximate guide) \[DESIGN\]

- Rural cultivator or tenant \~75-85%, urban craft or trade \~8-12%, soldiers/clergy/officials \~3-5%, elite \~1-3%. Auto Create should weight toward the lower classes but include a 'prominent birth' bias option for engaging gameplay (player-configurable, default 'moderate').

---

## 7. Social Classes and Legal Status

Social class is a function of (region, period). Use a common **StatusRank 0-9** abstraction internally, with culture-specific labels.

### 7.1 Roman system (East and West, SE1-SE5)

| Class | Lifestyle | Wealth | Rights and limits | Education | Occupations | Mobility |
| --- | --- | --- | --- | --- | --- | --- |
| Senatorial aristocrat (*clarissimus*, later *illustris*, *spectabilis*) | Large estates, urban palaces | Very high (land + gold) | Can hold high office; tax privileges; exposure to court intrigue and confiscation | Rhetoric, law, classics | Official, landowner, bishop, general | Via court, marriage; risk of falling |
| Municipal elite (*curiales*, *honorati*) | City council, local estates | Moderate to high | Collect taxes personally liable; many sought imperial exemptions | Rhetoric, grammar | Councillor, local official, landowner | Escape into bureaucracy or Church |
| Soldier / veteran | Barracks or military village | Low to moderate | Privileges, hereditary service obligations (limitanei) | Often limited | Soldier, officer | Promotion; officer to elite |
| Free peasant and small artisan | Villages and city shops | Low | Taxed; legally free | Mostly illiterate | Farmer, craftsperson, trader | Limited |
| Colonus (tied tenant) | Estate village | Very low | Legally tied to land (late Roman law); cannot freely leave | None | Tenant cultivator | Rare escape: Church, army, flight |
| Slave | Household, mines, estates, workshops | None; peculium (allowed holdings) possible | Property in law, though Christian law gave slight protections and manumission was encouraged | Variable (some educated) | Domestic, craft, farm, clerk | Manumission, freedmen (liberti) |
| Cleric and monk | Church or monastery | Varied | Church legal privilege (clerical immunity from some duties) | Literate often | Priest, bishop, monk, nun | Church ladder is a major mobility path |

**Marriage \[FACT\]:** Roman law required consent; dowry; betrothal early; legal age 12 for girls and 14 for boys (law), actual ages vary. Slave unions (contubernium) not legally recognized as marriage in early periods; later law changed gradually. **Political access:** Court connections (patrons), Senate (symbolic in later periods), imperial office, Church councils. **Military access:** Citizens and non-citizens served; by 6th century heavily mercenary and federate (foederati), with Goths, Huns, Isaurians, Armenians, Lombards.

### 7.2 Sasanian system

- **Priests (magi, mobeds):** religious and legal authority; wealth from fire temple endowments.
- **Warriors / nobility:** great houses (Suren, Karen, Mihran, Spahbed families), dehqans (gentry), cavalry (aswaran/savaran).
- **Scribes (dabirs):** bureaucrats, accountants.
- **Commoners:** farmers, artisans, merchants.
- **Non-Zoroastrians:** Jews, Christians (Church of the East), Manichaeans (persecuted), others; legal and fiscal obligations (head tax in some periods) \[DEBATE on details by period\].
- **Slaves:** exist, often war captives.
- **Mobility:** Limited, though Khosrow I reorganized and promoted lesser nobility and administrators; military talent could rise.
- **Marriage:** Elite endogamy (next-of-kin marriage, khwedodah) attested in Zoroastrian texts and traditions \[DEBATE on prevalence\]; polygyny allowed for elite.

### 7.3 Gupta and post-Gupta system

- **Varna:** Brahmin (priests, ministers, scholars), Kshatriya (rulers, warriors), Vaishya (traders, farmers, in some texts), Shudra (laborers, servants), plus excluded groups (candalas).
- **Jati:** Birth-defined occupational groups; guilds (shreni) trade and craft associations.
- **Religious class:** Buddhist and Jain monks and nuns (sangha); monasteries as property owners.
- **Rights:** Dharma texts (Narada, Brihaspati smritis) specify law and penalties differentially by varna \[FACT\]; enforcement varied in practice.
- **Marriage:** Arranged, endogamous by jati; dowry practices vary; early marriage appears in texts.
- **Mobility:** Limited by jati, but wealth, guild success, monastic life, military service, and royal patronage allow adjustments; regional variation and uncertainty \[DEBATE\].

### 7.4 Germanic (kingdoms and Anglo-Saxon England)

- **Free warriors and landholders:** weapon-bearing free men; assemblies; kin groups; wergild tied to rank.
- **Nobles/kings' retainers:** royal household (gesith, comitatus; antrustions in Frankish law).
- **Roman provincials:** old senatorial families, bishops, urban populations; often legally distinct under Roman law.
- **Unfree:** slaves (bought, born, captured), semi-free (liti/laeti) peasants.
- **Clergy:** bishops often Roman aristocrats; monks.
- **Marriage:** Often by purchase or agreement between kin groups; bride-price and morning gifts; dynastic polygyny among Merovingian kings is attested \[FACT\].
- **Mobility:** Military success and royal favor.

**Social Mobility Mechanic \[DESIGN\]:** Mobility is a pathway system, not a free upgrade. Pathways (e.g., 'enter the Church', 'join the army', 'win patronage', 'accumulate land', 'manumission') each have prerequisites, costs and risks. See Section 7 life paths in Part 2.

---

## 7B. Life Paths and Careers

Careers are `Occupation` records gated by region, period, status, sex, religion, literacy and connections. No modern careers exist. Each occupation lists: entry requirements, income model, risks, advancement ladder, skill tags, and event pools.

**Roman East and West (SE1-SE5)**

- **Farmer / tenant / colonus / shepherd:** subsistence, harvest cycles, tax collectors, estate owners. Risk: famine, debt, raids.
- **Artisan** (potter, weaver, smith, mason, shipwright, glassmaker, baker): guild-like associations (collegia, in practice informal), apprenticeship (usually 3-7 years, \[DESIGN\]).
- **Merchant / shipper (navicularius, negotiator):** sea trade in grain, oil, wine, silk; high risk, high gain; loans and partnerships.
- **Soldier:** limitanei (frontier garrison), comitatenses (field army), foederati (allied units), later thematic units (SE5, details \[DEBATE\]).
- **Imperial official** (clerk, notary, tax assessor, provincial governor staff): requires literacy and often a patron; salary in coin and fees; corruption pressures.
- **Lawyer (scholasticus) and teacher (grammaticus, rhetor):** requires education; Berytus (Beirut) legal school until the 551 earthquake and tsunami.
- **Cleric** (reader, deacon, priest, bishop), **monk or nun** (cenobitic, anchorite), **deaconess:** religious ladder, economic support, theological conflict.
- **Physician (iatros), midwife, healer:** knowledge based on Galen and Hippocratic tradition; holy healers also exist.
- **Entertainer** (charioteer, mime, dancer, actor): circus factions; some stars gain fame (e.g., charioteer Porphyrius, c. 480-after 507) while social status stays low.
- **Servant / slave worker / courtier eunuch** (Constantinople palace): eunuchs held real power (e.g., Narses).
- **Pilgrim, scholar, copyist (scriptorium), translator.**
- **Criminal / bandit / pirate / rebel:** present in all periods.

**Sasanian:** peasant farmer, craftsperson, merchant (including Sogdian and Jewish merchants), scribe (dabir), priest (mobed), warrior (aswar), physician (Gundeshapur), Church of the East cleric or teacher (Nisibis school), royal servant.

**Gupta India and post-Gupta:** farmer, herder, artisan (weaver, smith, potter), guild merchant (including maritime traders), priest, ritual specialist, Buddhist or Jain monk or nun, temple servant, scribe, court poet, physician (vaidya), soldier (infantry, cavalry, war elephants), village head (gramika), official (kayastha clerks emerge as a scribal class, details \[DEBATE\]).

**Germanic kingdoms:** farmer-warrior, retainer, smith (high prestige in many Germanic societies), trader, priest or bishop, monk, slave, royal official (count, graf, duke), minter (moneyer), hostage (as political tool).

**Social mobility pathways \[DESIGN\]**

- **Church:** literate, dedicated, accessible even to low-status in many regions; risk: doctrinal conflict.
- **Army:** reward for valor; officers can gain land and rank.
- **Patronage:** a powerful patron grants office or protection; costs obligations.
- **Trade:** wealth conversion into land or status.
- **Manumission and legal change.**
- **Marriage:** dowry, alliance.
- **Education:** rhetoric or law (Roman), scribal training (Sasanian and Indian), monastic schools.
- **Court favor:** rare, volatile (see Theodora, who rose from entertainer background to empress, Procopius's hostile account \[DEBATE on reliability\]).

---

## 8. Life Stages: Birth to Death

The game uses **life stages** with variable time step: infancy and childhood (annual), adolescence and early adulthood (annual with season sub-steps during key moments), adult life (seasonal during crisis, annual otherwise), old age (annual).

| Stage | Roman | Sasanian | Gupta / post-Gupta | Germanic |
| --- | --- | --- | --- | --- |
| Birth | Home birth with midwife; infant exposure and abandonment existed but was legally condemned by Christian emperors (374 law; \[DEBATE\] on prevalence) | Home; Zoroastrian purity concerns | Home; rituals (jatakarma, naming) | Home; naming within kin |
| Childhood (0-12) | Household chores, early work in poor families, basic literacy for urban and elite; high mortality | Family training; elite children by tutors | Family and village; Brahmin and some merchant children begin Vedic or Sanskrit learning | Family, play and training; boys with weapons from early teens |
| Education | Grammar then rhetoric for elite; Church catechesis; monastic schools; vocational apprenticeship | Priestly schools; scribal training; Nisibis for Christians | Gurukula-style teaching, monasteries (Nalanda), guild apprenticeship | Mostly oral; clerical education in monasteries (Roman-Gallic elites) |
| Adolescence (12-18) | Betrothal and marriage possible (girls often by mid-teens); military age \~18; apprenticeships | Similar; elite marriages by arrangement | Early marriage for many girls, upanayana ceremony for upper varnas | Warrior initiation for boys; marriage via kin |
| Adulthood (18-45) | Career; taxes; marriage and children; military or clerical service | Career; military duty for gentry | Career; household duties | Warrior service; farming; kinship duty |
| Old age (45+) | Retire to estate or monastery; dependence on children; many don't survive past 50 | Priests and officials often remain active | Vanaprastha ideals (forest dwelling) for high-status Hindu men; monastic retirement | Elders respected if wealth/kin; exposure to feud and famine |
| Death | Burial (Christian church burial rises; catacombs; martyr shrines), cremation fades | Exposure of the dead (dakhma) in Zoroastrian practice (attested especially in later sources, with archaeology pointing to regional variation \[DEBATE\]) | Cremation (Hindu), stupa and monastic burial (Buddhist) | Burial with grave goods in early periods, decreasing after conversion |

**Variation by class and sex \[DESIGN\]**

- Education access: elite sons -> rhetoric and law; elite daughters -> household management, sometimes literacy and religious learning; poor children -> labor.
- Marriage: age, consent, dowry or bride-price, remarriage rules, widow's property (varies).
- Career: sex-specific gating, with narrow but real exceptions (abbess, empress, regent, female physician, female landholder, merchant widow).

**Aging system \[DESIGN\]**

- Health decays after c. 40; injuries and chronic conditions accumulate; wealth and diet slow this; physical occupations accelerate it.
- Death can occur at any age from disease, accident, violence, childbirth, famine, war.
- Old-age support: kin, patron, Church, monastery, estate. Without support, destitution event chain.

**Life expectancy \[DEBATE\]:** Life expectancy at birth often estimated at c. 20-30 years in many Roman-era populations; survivors to adulthood commonly reached their 40s-60s. Aim for realism in mortality tables, but present results via 'you survived childhood' framing rather than a punitive early death.

---

## 9. Game Stats

**Design principle:** a small number of stats, each with clear drivers and effects. Visible stats are shown as qualitative bands; hidden stats drive event probabilities.

| Stat | Represents | Changes by | Affects | Visible? |
| --- | --- | --- | --- | --- |
| **Health** (0-100) | Physical condition and resistance to disease | Age, disease, diet, injuries, medicine, labor, living conditions | Mortality chance, work capacity, event outcomes | Yes, band (e.g., Hale, Frail) |
| **Vigor** (0-100) | Strength, stamina and combat/labor capacity | Age, training, labor, nutrition, injuries | Labor, soldiering, escape and survival | Yes |
| **Wit** (0-100) | Intelligence and practical judgment | Innate, education, experience | Skill growth, negotiation, rhetoric, decision outcomes | Yes (band) |
| **Learning** (0-100) | Literacy, languages, texts, training in rhetoric, law, scripture, scribal arts | Education, study, career | Access to offices, Church and scribal paths, law, medicine | Yes |
| **Craft** (0-100 per skill track) | Occupation-specific skill (farming, smithing, soldiering, trade, healing, sailing, etc.) | Practice, mentors | Income, success chance, promotion | Yes |
| **Holdings** (see Section 10) | Wealth as land, coin, goods, livestock, debts, obligations | Work, trade, inheritance, taxes, war | Survival, status, options | Yes (tier and key assets) |
| **Standing** (0-100 per community) | Status within a specific audience: village, city, court, army, church, guild | Deeds, rumors, office, family | Opportunities, protection, marriage | Yes, per audience |
| **Piety / Faith Standing** (0-100) | Religious reputation and devotion within one's faith (not the same as belief sincerity) | Rituals, charity, asceticism, doctrine choices, scandals | Church careers, protection from persecution, community trust | Yes |
| **Connections** (list with strength) | Patrons, clients, kin, friends, rivals | Interaction, favors, marriage | Access to jobs, protection, trade, justice | Yes (relationship list) |
| **Influence** (0-100) | Ability to affect decisions beyond one's own household (local to imperial) | Office, wealth, military command, religious rank, patronage | Divergence eligibility (Section 20) | Partly (as a tier) |
| **Suspicion** (0-100, hidden) | How much authorities or enemies distrust player (heresy, treason, tax evasion, banditry) | Actions, rumors, enemies, doctrine | Trials, arrests, exile, confiscation | Hidden (warnings in text) |
| **Fortune** (hidden) | A bounded luck modifier, mean-reverting | Random, small modifications by deeds | Tilts random outcomes slightly | Hidden |
| **Disposition traits** (set) | Qualitative traits: devout, shrewd, brave, cruel, scrupulous, ambitious | Choices, events | Unlock or lock choices, NPC reactions | Yes |

**Removed or merged on purpose:** 'Happiness' (anachronistic as a single meter; use trait-based mood events), 'Intelligence' (split into Wit and Learning), 'Social status' (replaced by StatusRank + Standing per audience), 'Political power' (merged into Influence), 'Military ability' (a Craft track), 'Survival' (emerges from Health, Vigor, Holdings, Fortune), 'Family standing' (represented by household record: KinStanding attribute).

**Household record \[DESIGN\]:** Household has its own Holdings, Standing, members, and obligations. Many decisions affect the household, not just the individual.

---

## 10. Economy

### 10.1 Representing wealth

Wealth is **not** a single money number. Use the **Holdings** model:

- **Liquid:** coin (by metal type) and portable goods.
- **Productive:** land (acres or equivalents in local terms), livestock, tools, workshop, ship, shares in a venture.
- **Claims:** debts owed to player, patronage obligations, dowry, church endowments.
- **Obligations:** debts, taxes owed, rents, military and labor service.
- **Wealth Tier** (0-9): derived value for quick reading. Tier descriptions are culture-specific (a Roman senator with 4,000 pounds of gold annual income versus a colonus with a few solidi per year).

### 10.2 Currency and exchange \[FACT with variability\]

- **Roman:** *solidus* (gold, 72 to the pound, introduced c. 309/310), *siliqua* (silver, 1/24 solidus), *nummus/follis* (bronze; reformed by Anastasius c. 498; value fluctuates vs solidus). Rule: store price in solidus-equivalents with period and region multipliers; the modeler must verify price lists (e.g., Diocletian's Edict on Maximum Prices 301 is a source for early prices but inflation changed values quickly).
- **Sasanian:** silver *drachm* (dirham), copper coin; gold issuance limited; Roman gold circulated.
- **Gupta:** gold *dinara* (derived from Roman denarius name), silver coin (*rupaka*) under Chandragupta II; cowrie shells for small trade; coinage debases after 500 \[DEBATE on interpretation\].
- **Germanic:** Roman and imitation coinage; *tremissis* (1/3 solidus) widely used; Merovingian gold coinage then silver (denier/sceat shift late 7th century); in kin-based societies, wealth in cattle, weapons, arm rings, and *wergild* payments.
- **Monetization \[DESIGN\]:** each region-period has `MonetizationLevel` (0-1). At low values, many transactions use barter, labor service or in-kind payment; gameplay uses 'Provisions' and 'Obligations' rather than coin.

### 10.3 Food, goods and land

- **Staples:** wheat, barley, millet, olives, wine, legumes (Mediterranean), rice (India), dates (Mesopotamia), pastoral products (Germanic regions and Anatolia).
- **Luxury and long-distance goods:** silk (Chinese until c. 552 Roman acquisition of silkworm eggs \[DEBATE\]; Persians control overland trade), spices, pepper (Indian Ocean), ivory, incense, glass, papyrus, tin, amber, slaves.
- **Land:** the main source of wealth. Roman land tax assessed in *iuga* (units of productivity) and *capita* (labor units) (the system called *iugatio-capitatio*, with regional variation). Persia: land survey by Kavad I and Khosrow I; fixed tax per area and crop type (*kharaj* later in Arab usage). Gupta: crown share of produce and land grants.

### 10.4 Taxes, tribute and obligations

- **Roman:** land tax (gold and in-kind annona), poll tax on rural population, trade taxes (*kommerkion*), customs; *collatio lustralis* on merchants (abolished 498 by Anastasius \[FACT\]); tax collectors and curials liable. Corruption risk.
- **Persia:** land tax, poll tax on non-Zoroastrians and non-elite (*gezit*) \[DEBATE on early periods\]; corvée labor for irrigation and fortifications.
- **Gupta:** shares of produce (often cited as a sixth in texts), forced labor (*visti*), special taxes on traders, land grants exempt from some royal taxes.
- **Germanic:** tribute, military obligation, gifts to kings, tolls, fines (wergild and composition payments), and in Frankish lands the fisc.

### 10.5 Markets, employment and risk

- **Markets:** weekly or periodic; bigger fairs; urban shops; caravan stops.
- **Employment:** seasonal wage work, tenancy, apprenticeship, military pay (with donatives at accession), clergy income via Church, scribal fees.
- **Economic risks:** harvest failure, plague-driven labor shortage and price swings, currency debasement, tax increases, extortion, shipwreck, piracy, confiscation, theft, debt bondage (illegal in Roman law but occurs).
- **Economic opportunities:** trade voyages, estate acquisition, patronage-linked offices, military loot (after sieges), Church endowments, rebuilding after plague (wages rise).

---

## 11. Politics and Power

**Political structures**

- **Roman Empire:** monarchical empire with emperor (*autokrator*, *basileus* after Heraclius 629 \[FACT\]), imperial court, praetorian prefects (civil administration), provincial governors, *magistri militum* (generals), city councils, bishops. Succession: dynastic with army and court acclamation, frequent usurpation; co-emperors.
- **Sasanian:** hereditary monarchy ('King of Kings'); high priest; great noble houses; succession disputes (nobles and priests selecting or deposing kings); *wuzurg framadar* (chief minister); *spahbed* (generals; four regional commands after Khosrow I).
- **Gupta:** hereditary kings with titles (*maharajadhiraja*); feudatories (samantas), ministers, provincial governors (bhuktis), district officers (vishayapatis), village bodies; succession often by chosen heir among sons; civil war risk.
- **Germanic kingdoms:** hereditary kingship within royal kin (Merovingians: long hair as symbol, partible inheritance causing wars), assemblies of freemen, counts as royal agents, dukes; Visigothic kingship elective with noble factions; Lombard dukes.
- **Church:** parallel structure (bishops, metropolitans, patriarchs: Rome, Constantinople, Alexandria, Antioch, Jerusalem), councils (Nicaea 325, Constantinople 381, Ephesus 431, Chalcedon 451, Constantinople 553, 680-681), monasteries.

**Factions \[DESIGN as dynamic objects with relations\]**

- Roman: Blues and Greens (circus factions with political and religious overtones; originally charioteering clubs), Chalcedonians versus Miaphysites, senators versus court bureaucrats, army commanders.
- Persian: nobility versus crown, priests versus Mazdakites, Zoroastrians versus Christians.
- Indian: Brahmanical versus Buddhist patronage; regional feudatories versus center.
- Germanic: royal brothers and heirs, Arian versus Catholic elites, Roman bishops versus king.

**Alliances and rivalries:** Tracked as `Relation(a, b, value, type)` in polity-level state.

**Law**

- **Roman:** Theodosian Code (438), Corpus Juris Civilis (529-534), edicts, petitions, appeals (*appellatio*), bribery. **Sasanian:** Zoroastrian law and royal edicts; a *Book of a Thousand Judgements* (Madigan-i-Hazar-Dadestan, compiled late). **Indian:** Dharmashastra and local custom. **Germanic:** codified custom (Lex Salica, Burgundian Law, Visigothic Code, Edictus Rothari 643 for Lombards).

**How an ordinary player interacts \[DESIGN\]**

- **Petitioning:** go to governor, bishop, king or village council for justice; success depends on Standing, Connections, bribes, legal skill.
- **Taxes and obligations:** pay, evade, appeal.
- **Civic action:** join riots or demonstrations, support or oppose factions.
- **Service:** serve in office or army; patronage.
- **Rebellion:** join local revolts (Nika-type riot, peasant revolt, Bagaudae in Gaul, Berber revolts), or betray them.
- **Diplomacy:** envoy roles, hostages, interpreters, merchants as informants.
- **Religion:** doctrinal choices lead to alliances or persecution.

**Political influence levels \[DESIGN\]:** Influence Tier 0 (household), 1 (village/neighborhood), 2 (city/district), 3 (province), 4 (court/kingdom), 5 (imperial or international).

---

## 12. War and Conflict

**Types of conflict \[DESIGN list\]**

1. **Interstate war:** Roman-Persian wars; Roman-Gothic, Vandal, Lombard wars; Gupta-Hun wars.
2. **Civil war and usurpation:** extremely common in SE1-SE4.
3. **Frontier raiding:** Huns, Avars, Slavs, Saracens, Alamanni, Berbers.
4. **Urban riot and sectarian violence:** Nika riot, Alexandria riots.
5. **Siege warfare:** Rome (537-538), Dara, Edessa, Constantinople (626, 674-678, 717-718).
6. **Feud and private violence:** Germanic wergild feuds, aristocratic retinues.
7. **Banditry, piracy, local insurrection.**
8. **Religious persecution and iconoclast conflict (late).**

**Who fights and how recruited \[FACT with debate\]**

- **Roman:** professional soldiers (hereditary service in frontier troops); recruitment by conscription quotas on landowners (*tirones*) with commutation to gold; barbarian federates; private retinues (*bucellarii*) of generals; urban militias in emergencies.
- **Sasanian:** heavy cavalry (nobles), light cavalry, archers, infantry levies, Arab, Armenian, Daylamite and Hephthalite auxiliaries; four *spahbeds*; *dehqan* cavalry under Khosrow I.
- **Gupta:** royal army (infantry, cavalry, elephants, chariots in texts; chariots largely archaic by this time \[DEBATE\]), feudatory contingents, mercenaries.
- **Germanic:** war bands of free men, royal retinues, levy of free males; Roman units absorbed in some kingdoms.

**Military roles for player \[DESIGN\]:** infantry, archer, cavalryman, scout, siege worker, sailor and marine, officer (decanus, centenarius, tribune, *dux*), supply (annona official), camp follower, healer, engineer, bucellarius, guard.

**Weapons \[FACT\]:** spear, sword (spatha), shield, mail and scale armor, composite bow, javelins, lance, battle-axe (Frankish francisca), siege engines (ballistae, onagers, battering rams, towers), fire arrows, naval: dromon galleys and later Greek fire.

**Risks and rewards**

- **Risks:** death in battle (usually from disease and camp conditions at least as much as combat), wounds and infection, capture, ransom, enslavement, desertion penalties, pay arrears, mutiny.
- **Rewards:** pay, donatives, plunder, land or exemptions, promotion, patronage.
- **Captivity:** Roman and Persian prisoners resettled (Antioch captives resettled in 540 near Ctesiphon at Khosrow's 'Better Antioch', Veh Antiok Khosrow; \[FACT\]); enslavement of captives widespread.
- **Prison:** short-term detention; harsh; exile, mines, forced labor, mutilation (rhinotmesis, blinding) as punishments in Roman East; monastic confinement.
- **Injury and death:** use **InjuryState** (wounds with infection chance based on medicine access) rather than simple HP.

**Territory and political consequences \[DESIGN\]:** wars alter `ControlTimeline` and local conditions (tax changes, population movement, language and religion pressure, property confiscations).

**Gameplay representation \[DESIGN\]:** Avoid a generic strategy mini-game. Battles resolve as a small sequence of **personal-scale decisions** (hold line, flee, loot, protect companions), with outcomes affected by the player's role, Craft, Vigor, Standing, and the wider battle outcome set by the historical engine (fixed for anchor battles; probabilistic otherwise).

---

## 13. Religion, Culture and Society

### 13.1 Religious systems \[FACT unless marked\]

| System | Where and when | Core gameplay-relevant features |
| --- | --- | --- |
| **Nicene / Chalcedonian Christianity** | Roman Empire (official from 380); Frankish and Visigothic kingdoms after conversion | Bishops as civic leaders; councils; fasting, feasts, saints and relics; pilgrimage; monasticism; legal privileges; heresy laws |
| **Miaphysite Christianity** (Coptic, Syriac 'Jacobite', Armenian, Ethiopian) | Egypt, Syria, Armenia, Axum; majority in Egypt after 451 | Parallel church hierarchy; persecution or toleration depending on emperor; Persian and Arab rulers later tolerated them |
| **Church of the East** | Sasanian Mesopotamia and beyond; Synod of 410 organized it; school at Nisibis | Christians in a Zoroastrian empire: suspicion as Roman allies in war years; missionaries along Silk Road |
| **Arian Christianity** | Goths, Vandals, Burgundians, Lombards (until conversions: Visigoths 587/589, Lombards c. 7th century) | Separate church with Gothic-language liturgy (Wulfila's Bible); tension with Nicene Roman subjects |
| **Germanic paganism** | Franks (before conversion), Anglo-Saxons (to 7th century), Scandinavians | Sacral kingship, oaths, feast sacrifices, omens; sources are late and fragmentary \[DEBATE\]; keep abstract |
| **Roman paganism / philosophy** | Declining; Theodosian laws against sacrifices (391-392); pagan philosophy at Athens until 529 | Hidden practice, persecution risk, village survivals |
| **Judaism** | Everywhere, large communities in Babylonia, Palestine, Spain, Italy | Community autonomy, legal restrictions in Christian law (Theodosian and Justinianic codes), rabbinic schools, Talmudic compilations |
| **Zoroastrianism** | Sasanian state religion | Fire temples, purity laws, Magi hierarchy, religious law in courts, persecution of 'Manichaeans' and sometimes Christians; Nowruz and seasonal feasts |
| **Manichaeism and Mazdakism** | Persia (Mani executed 274-277); Mazdak c. 488-528 | Suppressed groups; secret communities; Mazdakite social radicalism contested \[DEBATE\] |
| **Hindu traditions** | Gupta India: Vaishnava, Shaiva, Shakta; temple building (Deogarh, Bhitargaon) | Brahmin ritual authority, caste rules, temple endowments, pilgrimages, Sanskrit learning |
| **Buddhism and Jainism** | Gupta and post-Gupta India (Buddhism strong at Nalanda, Ajanta cave patronage in Deccan) | Monastic careers, merit-making, state patronage, Chinese pilgrims (Faxian, Xuanzang) |
| **Pre-Islamic Arabian religion, Judaism and Christianity in Arabia** | Arabia c. 500-630 | Pilgrimage centers (Mecca), tribal law; client kingdoms |
| **Islam** | From 610/622; major presence in SE5-SE6 | New ruling religion; dhimma (protected status) arrangements for Christians, Jews, Zoroastrians (administrative form developed over decades) \[DEBATE on early details\]; the early community's institutions are a LATER module |

### 13.2 Culture and customs (selected, gameplay-relevant)

- **Household and family:** Roman paterfamilias authority softened by Christian emperors; Sasanian kin-based households; Indian joint family and caste rules; Germanic kin-group (sibb) with obligations of vengeance or compensation.
- **Marriage customs:** Betrothal, dowry (Roman, Indian), bride price (Germanic), consent; divorce (Roman law allowed but Justinian restricted; Zoroastrian law allowed; Indian texts restrictive), concubinage (Roman law recognized *concubinatus*; Christian norms pushed against it).
- **Festivals and calendar:** Christian liturgical year (Easter dating disputes; Christmas observed on 25 Dec in Rome by 336; saints' days; Lent); Roman civic games and chariot races (until mid 6th century; decline after); Zoroastrian Nowruz and seasonal gahambar feasts; Jewish festivals; Indian seasonal and temple festivals (details LATER).
- **Taboos and sanctions:** oath-breaking; pollution by corpses (Zoroastrian); caste purity; sexual morality enforced by Church; usury (condemned by Church councils); sacrilege (violating sanctuary); treason; magic and sorcery accusations; **heresy**.
- **Law and community:** Bishops' courts (episcopalis audientia), village councils (Roman villages had elders and tax collectors; Indian *panchayat*-like bodies attested later \[DEBATE\]), Germanic assemblies (mallus, thing).
- **Literature and arts:** Roman rhetoric and hagiography (Lives of saints), Persian court poetry and Pahlavi texts, Sanskrit drama and poetry, Syriac hymns (Ephrem the Syrian, 4th century), Germanic oral poetry, mosaics and icons.

### 13.3 Mechanics from religion \[DESIGN\]

- **ReligiousIdentity:** (faith, denomination, devotion level, community). Determines legal status, allowed careers, persecution exposure.
- **Conversion events:** forced or voluntary; consequences for family and career.
- **Doctrinal pressure:** council decisions change official doctrine on specific dates (anchor events), changing persecution risk for groups.
- **Heresy and Suspicion:** Suspicion stat rises with accusations; trials can result in fines, exile, mutilation or death in some regimes.
- **Church as institution:** safe harbor (sanctuary), charity (alms, hospitals), education, employment.
- **Pilgrimage and relic events:** travel and opportunity.

---

## 14. Technology and Knowledge

**Rule:** technology level is a property of (region, SubEra). Gameplay uses `TechFlag` entries (available, unavailable, rare) rather than a tech tree, because change was slow and uneven.

| Domain | Late Roman / East Roman | Sasanian | Gupta / post-Gupta | Germanic kingdoms |
| --- | --- | --- | --- | --- |
| **Transport** | Roman roads (maintenance declines in West), merchant ships, state post (*cursus publicus*), lighthouses; pack animals and carts | Roads and caravan routes, Persian Gulf shipping, royal road remnants, caravanserai-like stations | Ox carts, river boats (Ganges), coastal and ocean trade with sea-going ships (Indian Ocean) | Rivers, tracks, reused Roman roads; coastal boats; horses for elites |
| **Communication** | Letters on papyrus and parchment, couriers, heralds, inscriptions, church networks; beacon systems and signals | Royal couriers, scribes (Pahlavi script), fire signals | Sanskrit prose, copper-plate land grants, inscriptions, palm leaf, birch bark | Messengers, oral message, few written records |
| **Agriculture** | Ard (scratch plough), terracing, irrigation, olive and vine culture, water mills; crop rotation (two-field systems) | Qanats (underground canals), large irrigation works in Khuzestan and Sawad; rice and date cultivation | Intensive agriculture in Gangetic plain, irrigation wells, double cropping in places | Mixed farming; heavy plough in northern lowlands (spread and date \[DEBATE\]) |
| **Medicine** | Galenic and Hippocratic humoral medicine, surgery in cities, hospitals (Church xenodochia; Basileias founded c. 370 by Basil of Caesarea), herbals | Gundeshapur learning combining Greek, Syriac, Indian and Persian knowledge | Ayurveda texts (Charaka and Sushruta compilations), surgery, herbal pharmacy, hospitals in Buddhist context (attested by Chinese visitors) | Herbal folk medicine, monastic infirmaries after Christianization |
| **Weapons** | Spatha, mail, composite bow, cataphract lance, ballistae, dromon galleys; Greek fire from c. 670s (SE5) | Heavy cavalry with lance and bow, armored horses, siege engines, elephants | Bow, sword, spear, elephants, siege techniques; iron metallurgy advanced | Spear, sword (some pattern-welded), axe, shield, mail for elites |
| **Construction** | Domes (Hagia Sophia), concrete and brick, aqueducts, cisterns (Basilica Cistern), city walls (Theodosian Walls 413) | Vaults (Taq Kasra in Ctesiphon), fortresses, palaces | Stone and brick temples (Deogarh), rock-cut caves (Ajanta), stupas, iron pillar at Delhi (c. 4th-5th century) | Timber halls, earthworks, some stone churches, reused Roman buildings |
| **Manufacturing** | Glass, ceramics (African Red Slip), textile workshops (state *gynaecea*), mosaics, metalwork | Silver plate, textiles, glass, ceramics | Cotton textiles, steel, jewelry, ivory, stone sculpture | Smithing (jewelry, swords), pottery, textiles |
| **Education and writing** | Schools of grammar, rhetoric, law; Church and monastery schools; codex books | Priestly and scribal schools; Nisibis; libraries (Pahlavi translations of Greek and Indian texts under Khosrow I) | Monastic universities (Nalanda), Brahmanical schools, court learning | Church schools, oral instruction; literacy limited to clergy and a few officials |
| **Science and math** | Neoplatonic natural philosophy, Philoponus (c. 490-570) critique of Aristotle, astronomy, engineering (Anthemius, Isidore of Miletus) | Astronomy (Zij-i Shahriyar), medical translation work | Astronomy and mathematics (Aryabhata 499 text; place-value and zero concept developed; Brahmagupta 628) | Minimal |

**Notable dated technology points \[FACT with caveats\]**

- Solidus 309/310; Codex form dominant by 4th-5th centuries.
- Stirrups reach Avar and East European cavalry c. 6th century (spread debated \[DEBATE\]).
- Silkworm eggs acquired by Romans c. 552 (monks smuggling; story from Procopius and Theophanes \[DEBATE\]).
- Greek fire in 670s (Callinicus tradition).
- Hagia Sophia dome partial collapse 558, rebuilt 562.

**Gameplay impact \[DESIGN\]**

- Travel speed and risk by terrain/season; sea travel mostly April to October (mare clausum in winter).
- Information delay: news travels slowly (days to months). Events reach the player with delay depending on distance and Connections.
- Medicine: modest effect; superstition and religion options (healing saints, amulets).
- Literacy gate: certain choices need reading ability or a scribe.
- Warfare tech differences between Roman, Persian, Hunnic or Germanic armies affect battle odds and injuries.

---

## 15. Health, Disease and Survival

### 15.1 Facts and parameters

- **Life expectancy:** at birth c. 20-30 (many estimates; wide uncertainty \[DEBATE\]); at age 15, expected additional years c. 30-40 \[DEBATE\].
- **Infant mortality:** 20-35% in first year; about half of children die before 10-15 \[DEBATE on regional values\].
- **Childbirth:** a substantial cause of female adult mortality; midwives; high infection risk.
- **Common diseases:** malaria (Mediterranean marshes, Rome, Mesopotamia, India), dysentery and typhoid, tuberculosis, respiratory illness, intestinal worms, leprosy (attested), smallpox and measles (plausible, text evidence debated \[DEBATE\]), eye disease, parasitic infection, malnutrition, ergot poisoning.
- **Plague:** **First Plague Pandemic**, beginning with Justinianic Plague (541 Pelusium; Constantinople 542); recurrent waves c. 558, 573-574, 588, 599, 610s-620s, 640s, 670s; last major wave c. 747 \[FACT broad\]. Mortality estimates range from catastrophic (25-50% in some places) to localized (small or modest effect) \[DEBATE\]. LegacyLife uses a **PlagueSeverity** parameter (default moderate; 10-30% regional mortality) editable by researchers or game modes.
- **Climate shock:** volcanic dust veil 536 and cooling 536-545 (tree rings, texts) leading to poor harvests \[FACT broad; societal effect \[DEBATE\]\].
- **Natural disasters:** earthquakes (Antioch 526, 528; Constantinople 557; Berytus 551), floods (Nile failures, Tigris), droughts, locust plagues, fires (Constantinople), storms at sea, volcanic eruptions (Vesuvius 472 and 512).
- **Injuries:** farm accidents, burns, fractures, war wounds, mining injury, judicial mutilation, shipwreck.
- **Sanitation:** Roman cities have aqueducts, latrines, public baths (declining in West after sixth century), cisterns; villages rely on wells and streams. Persia: qanats and ritual cleanliness; India: bathing and purity customs. Germanic regions: less urban sanitation but lower density.

### 15.2 Mechanics \[DESIGN\]

- **Condition list:** player has 0-n active Conditions (fever, dysentery, malaria, wound, infection, famine weakness, plague, pregnancy and childbirth risk, chronic pain, lameness, blindness).
- **Hazard model:** annual or seasonal death chance computed from base age hazard x region disease burden x Health modifiers x Holdings (food and shelter) x occupation hazard x active event modifiers. Hazards remain hidden; show narrative hints.
- **Care options:** home care, healer, physician (costly), church or monastery hospital, pilgrimage to healing saint, charm and prayer. Each has cost, access requirement and effect.
- **Food security:** `FoodSecurity` state for household (Secure, Tight, Hungry, Starving) derived from harvest event, price shocks, Holdings, patron help. Starvation events chain to disease.
- **Epidemic wave:** region-level state machine (Rumor -> Arrival -> Peak -> Decline -> Aftershock). Player infection chance depends on density, trade involvement, household crowding and Health; survivors of the infection can gain immunity; consequences include household member deaths, flight choice (leave city), labor shortage, wage and rent changes, religious reactions (processions, apocalyptic movements).
- **Disaster events:** quake or flood triggers local damage and relief choices; relief systems (state grain, Church charity).
- **Complexity limit:** The MVP uses 8-10 Conditions and 3-4 hazard multipliers. No per-pathogen microsimulation.

---

## 16. Historical Events Catalogue

**Event classes**

- **Background:** ambient world changes that rarely involve the player directly (e.g., Hun migration pressure, climate cooling).
- **Local:** one city, estate or village; mostly generated, but anchored events exist (e.g., earthquake of Antioch 526).
- **Regional:** province or kingdom-level (e.g., Vandal conquest of Africa).
- **Major historical:** anchor events across the era.

**Fixedness codes:** **ANCHOR** (occurs on date regardless unless divergence conditions met; see Section 20), **PIVOT** (branchable), **FLEX** (outcome random within band).

### 16.1 Major historical events (full specification)

**EV-M01 Council of Nicaea**

- Date: May-June or later 325 (opening about 20 May; closing 25 Aug 325 \[DEBATE\]).
- Location: Nicaea (Bithynia, Anatolia).
- Cause: Arian controversy about Christ's nature; Constantine's wish for unity.
- Outcome: Nicene Creed; condemnation of Arius; date of Easter guidance; decisions about church order.
- People: Constantine, Arius, Alexander of Alexandria, Athanasius, Eusebius of Caesarea.
- Affected: bishops and communities empire-wide.
- Player relevance: clergy, Alexandrians, Christians; Arian-Nicene divide lasting centuries.
- Possible involvement: be a minor attendee (cleric's servant, scribe), local bishop's supporter; shape local reception.
- Alternatives (if divergence allowed): different creed wording or weaker unity (low probability).
- Long-term: doctrinal conflicts through 4th-5th centuries; Arian Germanic kingdoms.
- Fixedness: ANCHOR.

**EV-M02 Battle of Adrianople**

- Date: 9 Aug 378. Location: near Adrianople (Thrace).
- Cause: Gothic refugees crossing the Danube in 376 mistreated by Roman officials; revolt.
- Outcome: Emperor Valens killed; two-thirds of the eastern field army destroyed (traditional account; scale \[DEBATE\]).
- People: Valens, Fritigern, Gratian, Theodosius (later emperor).
- Affected: Thracian population, Goths, army.
- Relevance: Roman soldier, Gothic refugee, local farmer.
- Involvement: fight at the battle (roles), refugees, provisioning officials, corrupt official.
- Alternatives: negotiated settlement; Roman victory (low).
- Long-term: Goths settled within the empire (382 treaty), reshaping army and politics.
- Fixedness: PIVOT for local outcomes; ANCHOR for Valens's death unless Influence >= National.

**EV-M03 Sack of Rome**

- Date: 24-27 Aug 410. Location: Rome.
- Cause: Alaric's Visigoths unpaid and negotiating; Honorius refused to negotiate at Ravenna; Rome besieged.
- Outcome: city plundered for three days; Alaric died soon after (410).
- People: Alaric, Honorius, Galla Placidia (captured), Augustine (response in City of God).
- Affected: Roman aristocrats, refugees (fled to Africa, Palestine), slaves who opened the gate \[DEBATE on tradition\].
- Relevance: Roman residents; refugees fleeing.
- Involvement: flee, hide, shelter, collaborate, loot, ransom.
- Alternatives: a negotiated settlement.
- Long-term: psychological shock; West weakened; Visigothic settlement in Aquitaine (418).
- Fixedness: ANCHOR.

**EV-M04 Vandal conquest of Roman Africa**

- Date: 429-439 (Carthage 19 Oct 439). Location: North Africa.
- Cause: Vandal and Alan migration from Spain under Gaiseric; imperial weakness and internal conflict (Boniface).
- Outcome: Vandal kingdom (Arian) with Carthage capital; sea power; sack of Rome 455.
- People: Gaiseric, Boniface, Augustine (died 430 at siege of Hippo).
- Affected: Roman landowners, Catholic clergy (persecuted), Berbers.
- Relevance: African estate dwellers, clerics, merchants.
- Involvement: flee, collaborate, resist; conversion pressures.
- Alternatives: Roman defense holds (low).
- Long-term: Grain supply to Italy cut; later Justinianic reconquest 533.
- Fixedness: ANCHOR; local timing variable.

**EV-M05 Hunnic invasions and Chalcedon (451)**

- Date: Attila's campaigns 441-453; Catalaunian Plains 451; Italy 452; Council of Chalcedon Oct-Nov 451.
- Location: Danube, Gaul, Italy; Chalcedon.
- Cause: Hunnic expansion and tribute; imperial inability; theological disputes (Eutyches and Dioscorus).
- Outcome: Attila turned back, died 453; Council defined two natures; Egypt and Syria split.
- People: Attila, Aetius, Leo I, Marcian, Pulcheria, Dioscorus.
- Affected: Balkan and Gallic populations, Egyptian and Syrian Christians.
- Relevance: soldiers, refugees, clergy.
- Involvement: war, flight, doctrinal choices.
- Alternatives: Attila succeeds in Italy; compromise at Chalcedon.
- Long-term: Miaphysite churches; Hun empire fragments.
- Fixedness: ANCHOR (Hun defeat and Chalcedon outcome).

**EV-M06 End of the Western Roman emperors**

- Date: 4 Sept 476 (deposition of Romulus Augustulus; some date 480 at death of Julius Nepos).
- Location: Ravenna and Italy.
- Cause: Army revolt of Odoacer; weakness of western court.
- Outcome: Odoacer rules as king, nominally under eastern emperor Zeno.
- Relevance: Italian elite, soldiers; moderate experience change for peasants \[DEBATE on how contemporaries saw it\].
- Alternatives: Nepos restored (low).
- Long-term: Theodoric in Italy 493.
- Fixedness: ANCHOR.

**EV-M07 Nika Riot**

- Date: 13-18 Jan 532. Location: Constantinople.
- Cause: Blue and Green factions united against taxes and officials (John the Cappadocian, Tribonian); Hypatius proclaimed emperor.
- Outcome: Belisarius and Mundus attack in Hippodrome; c. 30,000 killed (reported number \[DEBATE\]); Justinian remains; Hagia Sophia rebuilt.
- People: Justinian, Theodora, Belisarius, Narses, Hypatius, John the Cappadocian.
- Relevance: Constantinople residents.
- Involvement: rioter, bystander, soldier, official, informant, rescuer.
- Alternatives: Justinian flees and a new emperor rules (low-moderate for high-influence players).
- Long-term: Justinian's autocratic consolidation; legal and building programs.
- Fixedness: PIVOT (high stakes).

**EV-M08 Gothic War in Italy**

- Date: 535-554 (campaigns, with sieges of Rome 537-538, 546, 549-550). Location: Italy.
- Cause: Justinian's reconquest after the murder of Amalasuntha 535.
- Outcome: Ostrogothic kingdom destroyed; Italy devastated; Lombards enter 568.
- People: Belisarius, Narses, Totila, Vitigis, Cassiodorus, Pope Vigilius.
- Relevance: Italians, soldiers, churchmen, senators.
- Involvement: serve either side, endure sieges, flee, negotiate, desert.
- Alternatives: quicker Roman victory or Gothic survival.
- Long-term: weak Italy open to Lombards.
- Fixedness: PIVOT; ANCHOR for overall Roman victory unless multiple local divergences accumulate.

**EV-M09 Justinianic Plague**

- Date: 541-544 (first wave), recurring to c. 750. Location: Pelusium 541, Alexandria, Constantinople spring 542, then across the Mediterranean and Persia.
- Cause: Yersinia pestis spread via grain and trade routes (ancient DNA evidence) \[FACT\].
- Outcome: major mortality; economic and military disruption; Justinian fell sick (542).
- People: Justinian, Procopius (witness), John of Ephesus, Evagrius, Gregory of Tours (later waves).
- Relevance: all players; high.
- Involvement: flee, nurse, bury, profit, preach, blame communities.
- Alternatives: lower severity.
- Long-term: shortages of labor, tax pressure, army shrinkage, eschatological anxiety.
- Fixedness: ANCHOR (arrival), FLEX (severity).

**EV-M10 Roman-Persian War of 602-628**

- Date: 602-628. Location: Mesopotamia, Syria, Anatolia, Egypt, Constantinople, Caucasus.
- Cause: Murder of Maurice (602) as casus belli for Khosrow II; Roman internal strife.
- Outcome: Persia occupies Jerusalem 614 (True Cross taken), Egypt c. 618-619; siege of Constantinople 626 (with Avars); Heraclius campaigns 622-628, Nineveh 627; peace 628; Khosrow II killed 628.
- People: Khosrow II, Heraclius, Shahrbaraz, Shahin, Phocas, Patriarch Sergius.
- Relevance: Syrian, Egyptian, Anatolian, Persian players.
- Involvement: soldier, refugee, collaborator, administrator, clergy, merchant.
- Alternatives: Persia wins (low), Constantinople falls (very low).
- Long-term: both empires exhausted; Arab conquests.
- Fixedness: PIVOT; anchor outcomes unless National-level divergence.

**EV-M11 Arab conquests of Syria, Egypt and Iran**

- Date: 634-651 (Syria 634-638; Egypt 639-642; Iran 633-651).
- Cause: unification of Arabia under Islam; exhausted empires.
- Outcome: Roman Syria and Egypt lost; Sasanian Empire collapses (Yazdegerd III killed 651).
- People: Abu Bakr, Umar, Khalid ibn al-Walid, Amr ibn al-As, Heraclius, Yazdegerd III, Rustam Farrokhzad.
- Relevance: players in Near East, Iran.
- Involvement: soldier, local official, merchant, convert or dhimmi, refugee.
- Alternatives: delayed conquests (low).
- Long-term: Umayyad caliphate, new fiscal and religious order.
- Fixedness: ANCHOR (broad).

**EV-M12 Hun invasions and fall of the Guptas**

- Date: c. 455-467 (Skandagupta's defense), c. 500-540 (Toramana, Mihirakula, Yasodharman) \[DEBATE on chronology\].
- Location: northwest India, Malwa, Ganges plain.
- Cause: Hephthalite pressure from Bactria; dynastic weakening, regional rulers.
- Outcome: Gupta power declines; regional kingdoms; Harsha later reunites parts of north India (606-647).
- Relevance: northern Indian players.
- Involvement: soldier, farmer, priest, Buddhist monk (persecution tradition under Mihirakula \[DEBATE\]), merchant.
- Alternatives: stronger central resistance.
- Long-term: regionalization, new dynasties, land-grant economy.
- Fixedness: PIVOT for timing; ANCHOR for Gupta decline by 550 unless high divergence.

**EV-M13 Conversion of Clovis and rise of Franks**

- Date: c. 481-511 (reign), baptism c. 496-508 \[DEBATE\].
- Location: Gaul.
- Cause: military successes; alliance with Gallo-Roman church.
- Outcome: Frankish kingdom of Catholic faith; defeat of Visigoths at Vouille 507.
- Relevance: Frankish and Gallo-Roman players.
- Alternatives: conversion to Arianism (low) or pagan persistence.
- Fixedness: ANCHOR (Frankish Catholic outcome).

**EV-M14 Siege of Constantinople 626**

- Date: July-Aug 626. Location: Constantinople.
- Cause: Persian army at Chalcedon and Avar army with Slavs.
- Outcome: Failure of the siege; Roman navy destroys Slavic boats.
- Relevance: city residents.
- Fixedness: ANCHOR.

**EV-M15 Lombard invasion of Italy**

- Date: 568 (Alboin). Location: northern Italy.
- Outcome: Lombard kingdom; Italy fragmented into Roman and Lombard zones.
- Fixedness: ANCHOR.

**EV-M16 Hijra, Yarmouk and later Constantinople sieges** (SE5): defined as separate records under P1-P2.

### 16.2 Regional events (compact list; each uses the same field template, to be authored later)

| ID | Event | Date | Region | Priority |
| --- | --- | --- | --- | --- |
| EV-R01 | Tetrarchy established and Edict of Maximum Prices | 293-301 | Roman Empire | P1 |
| EV-R02 | Edict of Milan / Constantine's victory at Milvian Bridge | 312-313 | Rome | P1 |
| EV-R03 | Foundation of Constantinople | 324-330 | Thrace | P0 |
| EV-R04 | Julian's pagan restoration and Persian campaign | 361-363 | East | P1 |
| EV-R05 | Edict of Thessalonica | 380 | East | P1 |
| EV-R06 | Rhine crossing by Vandals, Alans and Suebi | 31 Dec 406 | Gaul | P1 |
| EV-R07 | Visigothic settlement in Aquitaine | 418 | Gaul | P2 |
| EV-R08 | Theodosian Code issued | 438 | Constantinople | P1 |
| EV-R09 | Theodoric's rule in Italy | 493-526 | Italy | P1 |
| EV-R10 | Antioch earthquakes | 526, 528 | Syria | P0 |
| EV-R11 | Corpus Juris Civilis | 529-534 | Constantinople | P1 |
| EV-R12 | Closure of Athens school and later temple closures | 529 and c. 535-537 | Athens, Philae | P2 |
| EV-R13 | Persian sack of Antioch | 540 | Syria | P0 |
| EV-R14 | Vandalic War | 533-534 | Africa | P0 |
| EV-R15 | Hagia Sophia completed | 537 (dedicated 27 Dec 537) | Constantinople | P0 |
| EV-R16 | Silkworm smuggling | c. 552-553 | Constantinople | P2 |
| EV-R17 | Council of Constantinople II | 553 | Constantinople | P2 |
| EV-R18 | Avar arrival and Danube crisis | 558-570s | Balkans | P1 |
| EV-R19 | Gregory the Great as pope | 590-604 | Rome | P1 |
| EV-R20 | Augustine of Canterbury's mission | 597 | Kent | P2 |
| EV-R21 | Fall of Antioch, Jerusalem under Persia | 613-614 | Levant | P1 |
| EV-R22 | Harsha's reign | 606-647 | North India | P1 |
| EV-R23 | Battle of Yarmouk | 636 | Syria | P1 |
| EV-R24 | Fall of Visigothic Spain | 711 | Spain | P2 |
| EV-R25 | Battle of Tours/Poitiers | 732 | Gaul | P2 |
| EV-R26 | Iconoclasm begins | 726-730 | East | P2 |
| EV-R27 | Abbasid revolution | 747-750 | Near East | P3 |

### 16.3 Local event archetypes (generated; see Section 18)

Tax inspection; village boundary dispute; bishop election riot; plague outbreak; church building; relic discovery; bandit raid; city fire; river flood; market fair; harvest failure; arrival of soldiers; new landlord; guild dispute; wedding negotiation; monastery foundation; trial for heresy; hiring of recruits; famine relief distribution.

### 16.4 Background events (state modifiers; no direct narrative)

Hunnic and Avar migrations; climate cooling 536-545; Silk Road shifts; monetary debasement; shifts in grain supply; Church expansion; changes in diplomatic relations; urban decline in the West; rise of monasteries; Roman-Persian trade terms; Indian Ocean trade fluctuations.

---

## 17. Historical Figures

**Interaction tiers \[DESIGN\]:** **T0** = never directly interactable (only referenced); **T1** = can be seen or heard in public events; **T2** = reachable through intermediaries (patrons, officials); **T3** = direct interaction possible only at high Influence or special roles.

| Name | Dates | Location / Role | Faction | Why important | Player relationship | Fixed | Changeable |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Constantine I | c. 272-337 | Roman Emperor | Imperial | Christianity favored; Constantinople | T2 (via officials) | 312 victory, 324 sole rule, death 337 | Policies at local level only |
| Shapur II | 309-379 | Sasanian king | Persian | Long reign; war with Rome | T1 | Reign length | Frontier events locally |
| Julian | c. 331-363 | Emperor, philosopher | Pagan | Failed pagan revival; died in Persia | T2 | Death 363 (PIVOT) | Local pagan policies |
| Theodosius I | 347-395 | Emperor | Nicene | Made Nicene Christianity official | T2 | Edict 380 | Local enforcement |
| Alaric | c. 370-410 | Visigoth leader | Gothic | Sack of Rome | T2 | Death 410 | Negotiation outcome (PIVOT) |
| Augustine of Hippo | 354-430 | Bishop, theologian | Church | City of God; died during Vandal siege | T2-T3 | Works, death 430 | Local church disputes |
| Hypatia | c. 350-415 (dates debated) | Alexandria, philosopher | Pagan/Neoplatonist | Murdered by Christian mob | T1-T2 | Murder in 415 (PIVOT) | Individual player can attempt to warn or protect |
| Attila | c. 406-453 | Hunnic king | Hun | Threat to empire | T1 | Death 453 | Route of invasion |
| Chandragupta II | r. c. 375-415 | Gupta king | Gupta | Expanded empire; era of cultural flourishing | T1-T2 | Reign | Local patronage |
| Faxian | c. 337-422 (travels c. 399-412) | Chinese Buddhist pilgrim | Buddhist | Written account of Gupta India | T2 | Existence | Interactions with locals |
| Theodoric the Great | c. 454-526 | Ostrogoth king in Italy | Gothic | Ruler of Italy; executed Boethius c. 524 | T2 | Rule, death 526 | Local policy |
| Clovis I | c. 466-511 | Frankish king | Frankish | Founded Frankish Catholic kingdom | T2 | Baptism and victories | Details |
| Justinian I | 482-565 | Emperor | Imperial | Legal and building program; reconquests | T2-T3 | Nika survival, wars, death 565 | Policy via divergence only |
| Theodora | c. 500-548 | Empress | Imperial | Influential co-ruler | T2 | Death 548 | Local favors |
| Belisarius | c. 505-565 | General | Roman army | Reconquered Africa and Italy | T2 (soldiers meet him) | Campaign outline | Individual battles |
| Narses | c. 478-573 | Eunuch general | Roman | Completed Gothic war | T2 | Outline | Local |
| Procopius | c. 500-565 | Historian | Roman | Main chronicler; his accounts are partial | T1-T2 | Works | Not applicable |
| Khosrow I Anushirvan | r. 531-579 | Persian king | Sasanian | Reforms; war with Rome | T1-T2 | Reforms, sack of Antioch 540 | Local administration |
| Benedict of Nursia | c. 480-547 | Monastic founder | Church | Rule of Benedict | T2 | Rule composition | Monastic influence locally |
| Gregory the Great | c. 540-604 | Pope | Church | Organized Church relief, mission | T2-T3 | Papacy 590-604 | Local church works |
| Brunhild and Fredegund | c. 543-613 / 543-597 | Frankish queens | Merovingian | Dynastic wars | T1-T2 | Rivalry | Local alliances |
| Khosrow II | r. 590-628 | Persian king | Sasanian | Conquered Roman East; overthrown | T1 | 628 fall | Local |
| Heraclius | c. 575-641 | Emperor | Roman | Defeated Persia; lost lands to Arabs | T2 | 610-641 | Local |
| Harsha | c. 590-647 | North Indian king | Pushyabhuti | Reunified north India briefly | T1-T2 | Reign | Local |
| Xuanzang | 602-664 | Chinese Buddhist monk | Buddhist | Travelogue in India | T2 | Journey | Meetings |
| Muhammad | c. 570-632 | Prophet, leader | Early Muslim community | Founder of Islam | T1 for Arabia only | Life and death | Not directly modeled; sensitive; later module |
| Khalid ibn al-Walid | d. 642 | General | Muslim | Syrian and Iraqi campaigns | T1 | Campaigns | Local |
| Charles Martel | c. 688-741 | Frankish mayor | Carolingian | Prepared Carolingian rise | T1-T2 | Reign | Local |
| Leo III | c. 685-741 | Emperor | Isaurian | Defended Constantinople 717-718 | T2 | Defense | Local |

**Sensitivity note \[DESIGN\]:** Religious founders and sacred figures (Muhammad, Jesus, Buddha) must have a dedicated content policy before direct depiction; default: **T0 or text references only**, handled by a religious-content review.

**Rule:** Famous people occupy places in the timeline but are not always accessible; players meet **intermediaries**, e.g., staff, officers, scribes, bishops' secretaries.

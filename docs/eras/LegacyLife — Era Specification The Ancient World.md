# LegacyLife — Era Specification: The Ancient World

*ERA\_ANCIENT · c. 3100 BCE – 476 CE · Design draft v0.1 for AI coding agents*

## 0. How to Read This Document

This is a game-development specification, not a history essay. Every statement is tagged by type so agents never confuse fact with proposal.

- **\[H\]** Historically defensible fact (scholarly consensus or well-attested).
- **\[U\]** Uncertain, disputed, or conventional dating. Agents must store the uncertainty (see `confidence` field in Section 23), never silently pick one value.
- **\[D\]** Design proposal: a game rule, not a historical claim.
- **P0–P3** Content priority (defined in Section 26).
- **IDs** like `ERA_ANCIENT`, `SE_C_IRON`, `REG_ROME` are stable identifiers for data files.

**Dating convention:** BCE/CE, "c." = approximate. The engine stores years as astronomical integers (1 BCE = 0, 2 BCE = −1) and displays local calendars as flavor (Section 1.6).

---

## 1. Era Overview

### 1.1 Identity

- **Name:** The Ancient World (`ERA_ANCIENT`)
- **Date range \[D\]:** c. 3100 BCE → 476 CE. Start = approximate emergence of the first states and writing in Egypt and Mesopotamia \[U: Egyptian unification dated variably c. 3150–3000 BCE\]. End = deposition of the last western Roman emperor, Romulus Augustulus, 476 CE \[H\].
- **Geographic range:** Nile Valley and Nubia; Mesopotamia; Anatolia and Levant; Iranian plateau; Indus–Ganges valleys and peninsular India; Aegean and the Mediterranean basin including Italy and Carthage; temperate Europe's Celtic/Germanic fringe; the Eurasian steppe; the Yellow and Yangtze river basins; Mesoamerica; the Andes and Peruvian coast.
- **Hard-edge rule \[D\]:** Births before 3100 BCE route to a future *Prehistory* era (not specified here). Births after 476 CE route to a future *Late Antiquity / Medieval* era. Several regions continue "ancient" patterns past 476 (Gupta India to c. 550, Sasanian Persia to 651, Teotihuacan to c. 550, Classic Maya to c. 900, the Eastern Roman Empire). Treat these as **edge regions**: see Open Questions (Section 27).

### 1.2 Major Civilizations (with approximate spans)

| Society | Approx. span | Notes |
| --- | --- | --- |
| Egypt (Old → Roman) | c. 3100 BCE – 395 CE | Pharaonic until 332 BCE; Ptolemaic 305–30 BCE; Roman province after 30 BCE |
| Sumer / Akkad / Babylon / Assyria | c. 3500 – 539 BCE | Then absorbed into Persian, Hellenistic, Parthian worlds |
| Indus (Harappan) | c. 2600 – 1900 BCE | Script undeciphered \[U\] |
| Minoan / Mycenaean Greece | c. 2000 – 1100 BCE | Palace economies; Linear B tablets |
| Hittites, Phoenicians, Israel/Judah | c. 1650 BCE onward | Levant and Anatolia |
| Shang / Zhou / Warring States / Qin / Han | c. 1600 BCE – 220 CE |  |
| Achaemenid Persia | 550 – 330 BCE | First pan-Near-Eastern empire |
| Greek poleis, Macedon, Hellenistic kingdoms | c. 800 – 31 BCE |  |
| Mauryan and post-Mauryan India | c. 321 BCE – 3rd c. CE | Includes Kushan, Satavahana, Tamil kingdoms |
| Parthia | c. 247 BCE – 224 CE | Rome's eastern rival |
| Rome (Republic, Empire) | 509 BCE – 476 CE (West) | Traditional Republic date |
| Mesoamerica (Olmec → Teotihuacan, Maya) | c. 1200 BCE – 500 CE | Archaeology-heavy |
| Andes (Norte Chico → Moche, Nazca) | c. 3000 BCE – 700 CE | No writing; archaeology only |
| Steppe nomads (Scythians, Xiongnu) | c. 800 BCE – 100 CE | Known mainly through outsider texts |

### 1.3 Why This Era Suits LegacyLife

- Radically different life outcomes depending on date and place: a farmer's child on the Nile in 1900 BCE and a Roman senator's son in 60 BCE are in different games.
- Low technology makes survival, family, and patronage the core drama, not gadgets.
- Dense, well-documented flashpoints (Peloponnesian War, Alexander, Spartacus, Caesar, Han–Xiongnu) provide natural divergence hooks.
- Ordinary people left traces too (Deir el-Medina ostraca, Persepolis ration tablets, Roman tombstones, Pompeii graffiti), so authentic ordinary-person content is possible.

### 1.4 Honest Limits \[H\]

- Sources overrepresent elites, men, cities, and literate cultures. Outsider accounts (Greeks on Scythians, Romans on Celts) are biased.
- Before c. 800 BCE and for the Americas and steppe, personal-level detail is mostly reconstruction. The game must say so (Evidence Tiers, below).

### 1.5 Core Engine Concept: Context Packs

```text
BIRTH DATE  +  LOCATION  +  SOCIAL CONTEXT  =  HISTORICAL WORLD
```

**Context Pack \[D\]:** a data bundle keyed by (region, date range) holding the political entity, rulers, calendar, currency, laws, laws of inheritance, class structure, careers, religions, active events, tech flags, disease profile, naming rules, and text templates. Birth resolves to exactly one Context Pack (plus optional overlays such as "under Persian rule").

**Fidelity Tiers \[D\]:**

- **Tier A:** hand-authored in depth (MVP target).
- **Tier B:** semi-authored from a template plus regional overrides.
- **Tier C:** procedural from a Civilizational Archetype (e.g., `ARCH_RIVER_VALLEY_STATE`, `ARCH_CITY_STATE_MARITIME`, `ARCH_PASTORAL_NOMAD`, `ARCH_SEDENTARY_CHIEFDOM`, `ARCH_EMPIRE_PROVINCE`) so any valid date/location always produces *something* defensible.

**Evidence Tiers \[D\]:** `E1` rich texts and records (Rome, Athens, Han, Egypt New Kingdom+). `E2` partial texts plus archaeology (Mesopotamia pre-1000 BCE, India, Persia, Celts). `E3` archaeology only (Andes, Indus, early Mesoamerica, steppe). For E3 contexts the game uses reconstructed generic names, flags content as "reconstructed", and avoids named individual events.

### 1.6 Calendar and Dating \[D\]

Internal clock = day/season/year (astronomical year). Display flavor by context: regnal years (Egypt, Mesopotamia, Persia, Han era names from 140 BCE), *ab urbe condita* and consular years (Rome), Olympiads and archon years (Greece), Seleucid era (Hellenistic east, from 312 BCE), Long Count (Maya, Classic period inscriptions). Gameplay ages use *turns of one year* in childhood-to-adulthood and finer "seasonal turns" during crises (war, famine, plague).

### 1.7 Birth Resolution (Auto Create vs Custom Life)

- **Auto Create \[D\]:** sample a (context, date) cell with weights by *approximate historical population share*, optionally flattened so small contexts appear (so Egypt is not drowned by Rome and China). Default blend: 60% population-weighted, 40% uniform across Tier A/B contexts.
- **Custom Life \[D\]:** player picks a year and location. Resolve to the nearest valid Context Pack. If the place had no state (e.g., a coast with chiefdoms), resolve to Tier C archetype and tell the player plainly. If the date precedes any settled society in that location, offer the nearest valid date.
- **Fallback rule \[D\]:** never fail silently, never invent a named kingdom. Show the source tier.

---

## 2. Temporal Breakdown

Seven global epochs bucket the era. Regions run their own phases inside each (Section 3). Epochs are an engine convenience, not claims that the world changed everywhere at once.

### SE\_A\_DAWN — Dawn of States (c. 3100 – 2200 BCE)

- **Societies:** Early Dynastic Egypt, Old Kingdom Egypt; Sumerian city-states and Akkad (Sargon, c. 2334 BCE); Indus cities c. 2600+; Norte Chico (Caral) in Peru c. 3000–1800 BCE; early Shang later; Minoan Crete beginning.
- **Politics:** sacral kings, temple-palaces, city-states, first empires (Akkad).
- **Events:** Giza pyramids (c. 2600–2500 BCE); Akkadian conquests; 4.2 ka climate event c. 2200 BCE linked to Old Kingdom and Akkadian collapses \[U on exact causes\].
- **Tech:** copper and early bronze, writing, irrigation, plough, wheel, sailing boats, mud-brick and stone monuments.
- **Economy:** temple and palace redistribution, rations, grain and barley, weight-based silver or copper standards.
- **Social:** king, priests, scribes, farmers, laborers; slavery exists mostly as war captivity and debt.
- **Conflicts:** city-state border wars, river-water disputes.
- **Change from previous:** (none: first epoch, begins after Prehistory).

### SE\_B\_PALACE — Bronze Age Palace Worlds (c. 2200 – 1200 BCE)

- **Societies:** Middle and New Kingdom Egypt; Old Babylonian (Hammurabi r. c. 1792–1750 BCE); Hittites; Minoans and Mycenaeans; Shang China; late Indus decline; Kassite Babylonia; Olmec begin c. 1200 BCE.
- **Politics:** diplomatic great-power club (Amarna letters, c. 1350 BCE) of Egypt, Hatti, Mitanni, Babylon, Assyria.
- **Events:** Hyksos in Egypt (c. 1650–1550); Thutmose III; Akhenaten (r. c. 1353–1336 BCE); Battle of Kadesh (c. 1274 BCE).
- **Tech:** bronze weapons, chariots, composite bow, glass, long-distance tin trade; Linear A/B, cuneiform, hieroglyphs, oracle-bone script.
- **Economy:** palace storage and tribute, international gift exchange.
- **Conflicts:** chariot warfare, vassal revolts.
- **Change:** from city-states to larger territorial states and international diplomacy.

### SE\_C\_IRON — Collapse and Iron Age Reordering (c. 1200 – 600 BCE)

- **Societies:** Neo-Assyria (911–609 BCE); Israel/Judah; Phoenician cities; Greek Dark Age → Archaic; Zhou (Western Zhou ends 771 BCE; Spring and Autumn from 770); Vedic India; Chavín (Andes); Olmec La Venta; Rome founded traditionally 753 BCE.
- **Events:** Late Bronze Age Collapse c. 1200–1150 BCE (Sea Peoples; causes debated \[U\]); alphabet spreads; Greek colonization from c. 750; Assyrian mass deportations; Lydian coinage c. 600 BCE \[U on precise date\].
- **Tech:** iron, alphabets, coinage begins, trireme later, Assyrian siege engines.
- **Economy:** private merchants, ironworking, early coin, slave raiding.
- **Change:** palace systems collapse in much of the east Mediterranean; alphabet and iron democratize tools and literacy.

### SE\_D\_EMPIRES — Great Empires and Classical Thought (c. 600 – 323 BCE)

- **Societies:** Neo-Babylon (Nebuchadnezzar II, r. 605–562); Achaemenid Persia (550–330); Classical Greece; Carthage; Roman Republic; Mahajanapadas and Nanda India; Warring States China (475–221); Monte Albán; Chavín.
- **Events:** Cyrus takes Babylon 539; Persian Wars (499–449; Marathon 490; Thermopylae and Salamis 480); Peloponnesian War (431–404); Buddha and Mahavira (5th c. BCE, exact dates debated \[U\]); Confucius (551–479); Philip II and Alexander (336–323).
- **Tech:** coinage common, Royal Road, trireme, hoplite phalanx, iron plough, cast iron in China, crossbow in China.
- **Economy:** monetized in the Mediterranean and Persian world; guild and market growth.
- **Change:** from palace redistribution to citizenship, philosophy, and large multicultural empires.

### SE\_E\_HELLENISTIC — Successor Kingdoms, Mauryas, Qin–Han, Roman Expansion (323 – 27 BCE)

- **Societies:** Ptolemaic Egypt, Seleucid Asia, Antigonid Macedon; Maurya (c. 321–185 BCE) and successors; Parthia; Qin (221–206) and Western Han; Rome from Punic Wars to Augustus; Nazca, Teotihuacan beginning c. 100 BCE.
- **Events:** Wars of the Diadochi; Ashoka and Kalinga (c. 261 BCE); First Emperor 221 BCE; Punic Wars (264–146); Corinth and Carthage destroyed 146; Spartacus (73–71); Caesar and civil wars; Actium 31 BCE; Zhang Qian's missions (c. 138–126 BCE).
- **Tech:** Archimedes-era mechanics, aqueducts, Roman concrete, paper-like fibers in China (later paper c. 100 CE), standardized legions, war elephants.
- **Economy:** long-distance trade networks (proto Silk Roads, monsoon sea route), mass slavery in Italy, Han state monopolies (salt and iron, from 119 BCE).
- **Change:** state scale jumps; Greek becomes lingua franca of the east.

### SE\_F\_HIGH\_EMPIRE — High Classical Empires (27 BCE – 235 CE)

- **Societies:** Roman Empire (Pax Romana), Han (Western to 9 CE, Xin 9–23, Eastern 25–220), Parthia, Kushan, Satavahana and Tamil kingdoms; Classic Maya begins c. 250; Moche; Teotihuacan.
- **Events:** Great Fire of Rome 64 CE; Vesuvius 79 CE; Jewish revolts (66–73, 132–135 CE); Antonine Plague (165–180 CE); Constitutio Antoniniana 212 CE granting citizenship broadly; Yellow Turban Rebellion 184 CE; Han collapse 220 CE.
- **Economy:** monetized provincial economies, Indo-Roman monsoon trade.
- **Change:** stable empires, peak urbanism, mass roads, imperial cults, rise of new universal religions (Christianity, Buddhism's spread).

### SE\_G\_CRISIS — Crisis, Transformation, Late Antiquity (235 – 476 CE)

- **Societies:** Rome (Crisis 235–284, Diocletian's reforms, Constantine, Christian empire, Theodosian era, western collapse), Sasanian Persia, Three Kingdoms and Jin China, Gupta India, Teotihuacan peak then decline, Classic Maya.
- **Events:** Cyprianic plague (c. 249–262); Edict of Milan (313); Constantinople dedicated (330); Adrianople (378); Sack of Rome (410); 476.
- **Change:** inflation, military emperors, frontier migration, new orthodoxies.

---

## 3. Geographic Breakdown (Region Packs)

Each region is a `Region` record with child `Location` records. Fidelity Tier is the MVP recommendation.

### REG\_EGYPT — Egypt and Nubia (Tier A, P1)

- **Political:** pharaonic states by dynasty; Ptolemaic kingdom; Roman province *Aegyptus* governed by an equestrian prefect. Kush (Kerma, Napata, Meroë) to the south.
- **Cities:** Memphis, Thebes, Heliopolis, Amarna (c. 1346–1332 BCE), Alexandria (founded 331 BCE), Elephantine, Deir el-Medina (workmen's village).
- **Population:** several million at most \[U\]; nearly all live along the river and in the Delta.
- **Social/economy:** pharaoh; vizier; priests; scribes; soldiers; artisans; peasant farmers; corvée labor; taxation in kind; temple estates; Nile flood determines harvest.
- **Religion:** Ra, Osiris, Isis, Amun, ma'at order, elaborate funerary beliefs.
- **Languages:** Egyptian (Old to Late, then Demotic); Greek in Ptolemaic and Roman times.
- **Military:** conscript levies, Medjay police, chariots (New Kingdom), Greek-Macedonian cleruch settlers (Ptolemaic).
- **Occupations:** farmer, scribe, priest, mason, embalmer, boatman, brewer, potter, soldier.
- **Risks:** low Nile and famine, plague, corvée, tomb robbery, tax collectors.
- **Events:** unification, pyramids, Hyksos, Kadesh, Akhenaten, Sea Peoples, Alexander (332), Cleopatra VII (r. 51–30 BCE).

### REG\_MESO — Mesopotamia (Tier A/B, P1)

- **Political:** Sumerian city-states (Uruk, Ur, Lagash, Kish, Nippur); Akkad; Ur III (c. 2112–2004); Old Babylon; Kassite Babylonia; Assyria (Assur, Nimrud, Nineveh); Neo-Babylon; Persian satrapy; Seleucid (Seleucia on the Tigris); Parthian (Ctesiphon).
- **Population/social:** dense irrigation cities; free citizens, dependents, debt-slaves and war slaves; temple households.
- **Economy:** barley, dates, sheep and wool, canal irrigation, silver by weight, clay-tablet contracts. Salinization was a recurring problem in the south \[U on scale\].
- **Culture/religion:** polytheism (Anu, Enlil, Enki, Inanna/Ishtar, Marduk, Ashur), omen divination, kingship tied to temples.
- **Languages:** Sumerian, Akkadian, later Aramaic.
- **Military:** city levies; Neo-Assyrian professional army, deportation policy.
- **Occupations:** farmer, canal worker, scribe, merchant, weaver, brewer, priest, soldier, shepherd.
- **Risks:** flood and drought, debt bondage, deportation, siege.
- **Events:** Sargon; Hammurabi's code (c. 1754 BCE); Assyrian conquest; Nineveh falls 612 BCE; Babylon taken 539 BCE.

### REG\_LEVANT\_ANATOLIA — Levant and Anatolia (Tier B, P2)

- **Political:** Hittites (c. 1650–1180); Phoenician cities (Tyre, Sidon, Byblos); Israel and Judah; Lydia (Sardis); Greek Ionia (Ephesus); Persian provinces; Hellenistic Pergamon and Antioch; Hasmoneans; Roman Judea after 63 BCE (province from 6 CE).
- **Economy:** maritime trade (Phoenician purple dye, cedar), pastoralism, caravan trade.
- **Religion:** Hittite storm-god cults; Canaanite pantheon; Yahwism and later Judaism (Second Temple c. 516 BCE–70 CE); Greco-Roman cults; Christianity from the 1st century CE.
- **Risks:** being a corridor between great powers; siege and deportation.
- **Events:** Kadesh; Babylonian Exile (586–539 BCE); Maccabean revolt (c. 167 BCE); Jerusalem destroyed 70 CE.

### REG\_PERSIA — Iranian Plateau (Tier B, P1)

- **Political:** Elam, Medes, Achaemenid empire (550–330) with satrapies, Royal Road; Seleucid; Parthian (c. 247 BCE–224 CE); Sasanian from 224 CE.
- **Cities:** Pasargadae, Persepolis, Susa, Ecbatana, Babylon as administrative center.
- **Economy:** ration and tribute system (Persepolis Fortification tablets c. 509–493 BCE document worker rations); darics.
- **Religion/culture:** Zoroastrian-influenced traditions; religious tolerance of subject cults under Achaemenids \[H, with caution about stereotype\]. Languages: Old Persian, Elamite, Aramaic (administration).
- **Military:** royal infantry and cavalry, subject contingents; Parthian horse archers.
- **Events:** Cyrus; Darius I (r. 522–486); Xerxes; Alexander's conquest (334–330); Carrhae 53 BCE.

### REG\_INDIA — India (Tier B, P1)

- **Political:** Harappan cities (Mohenjo-daro, Harappa); Vedic tribal polities; Mahajanapadas (Magadha, Kosala, Kashi); Maurya (capital Pataliputra); Shunga, Satavahana, Indo-Greek, Kushan; Tamil kingdoms (Chola, Chera, Pandya); Gupta from c. 320 CE.
- **Economy:** agriculture, guilds (*shreni*), punch-marked coinage from c. 6th–5th c. BCE onward, spice and cotton exports, Indo-Roman trade (Muziris, Arikamedu).
- **Social:** *varna* ideal and local *jati* groups; do **not** project later colonial-era caste rigidity backward \[U on how rigid classes were in each period\]. Sangha and monastic communities.
- **Religion:** Brahmanical rituals, Buddhism, Jainism, Ajivika; later devotional traditions.
- **Languages:** Vedic Sanskrit, Pali and Prakrits, Tamil; scripts Brahmi and Kharosthi.
- **Events:** Buddha era; Alexander at the Hydaspes (326 BCE); Chandragupta; Ashoka and Kalinga (c. 261 BCE; edicts survive); Kanishka.

### REG\_GREECE — Aegean and Greek World (Tier A, P1)

- **Political:** Minoan palaces; Mycenaean kingdoms (Mycenae, Pylos); Archaic and Classical poleis (Athens, Sparta, Corinth, Thebes, Syracuse), Macedon; Hellenistic kingdoms; Roman province Achaea after 146 BCE.
- **Population/social:** Athens' citizen males perhaps 30–40k at Classical peak \[U\]; metics (resident foreigners); slaves (a large minority, exact share \[U\]); Sparta: Spartiates, perioikoi, helots.
- **Economy:** olive, grain imports, silver mines (Laurion), seaborne trade, drachma; liturgies funded by the rich.
- **Religion/culture:** Olympian pantheon, civic festivals, Panhellenic games (Olympics traditionally 776 BCE), oracles, symposia, theatre.
- **Military:** hoplites; rowers (thetes) in navy; mercenaries; Macedonian phalanx.
- **Risks:** war, piracy, plague (Athens 430–426 BCE), infant exposure, exile.
- **Events:** Persian Wars; Peloponnesian War; Chaeronea 338; Alexander; Corinth sacked 146 BCE.

### REG\_ROME — Rome, Italy and the Western Mediterranean (Tier A, **P0**)

- **Political:** Etruscans, Latins, Samnites, Magna Graecia; Roman Republic (509–27 BCE) then Empire; Carthage (trad. founded c. 814 BCE \[U\]); provinces.
- **Cities:** Rome (peak 1st–2nd c. CE, estimates 450k–1.2M \[U\]), Ostia, Pompeii, Capua, Syracuse, Carthage, Lugdunum, Londinium; Constantinople from 330 CE.
- **Social:** senators, equestrians, local decurions, plebs, freedmen, slaves, non-citizen *peregrini*; tenants (*coloni*) in the later empire.
- **Economy:** latifundia and small farms, tribute from provinces, grain dole (Rome), denarius (c. 211 BCE), sestertius, Mediterranean trade.
- **Religion:** state cult with priestly colleges, household cult (lares, penates), mystery cults, imperial cult, Judaism, Christianity.
- **Military:** citizen levy; Marian reforms (c. 107 BCE) opening service to the landless; Augustan standing legions and auxiliaries; later frontier armies.
- **Languages:** Latin; Greek in the east; many local languages.
- **Risks:** proscriptions, civil war, debt, fire, plague, slave revolts, gladiatorial and arena culture, frontier raids.
- **Events:** see Section 15 (Late Republic is the MVP window).

### REG\_CHINA — China (Tier B, P1)

- **Political:** Shang; Zhou feudal order (Mandate of Heaven); Spring and Autumn states; Warring States (Qin, Chu, Qi, Yan, Han, Zhao, Wei); Qin (221–206 BCE); Han (202 BCE–220 CE); Three Kingdoms.
- **Cities:** Anyang, Linzi, Xianyang, Chang'an, Luoyang.
- **Social:** ideological four-occupation order: scholar-officials (*shi*), farmers, artisans, merchants (merchants ranked low in ideology though often rich); clan and ancestor veneration.
- **Economy:** millet and rice, iron tools, cast iron, state monopolies, bronze then *wuzhu* coins (from 118 BCE), silk exports; Han census of 2 CE recorded roughly 58–60 million people \[H\].
- **Thought:** Confucianism (state patronage grows under Emperor Wu, r. 141–87 BCE), Legalism, Daoism, Mohism. Careers via recommendation (*xiaolian*) rather than later civil-service exams.
- **Military:** conscript peasants, crossbowmen, cavalry for steppe wars.
- **Risks:** Yellow River floods, famine, conscription, corvée, steppe raids.
- **Events:** Qin unification; Great Wall linkage; Xiongnu wars; Salt and Iron Debate (81 BCE); Wang Mang; Yellow Turbans.

### REG\_MESOAMERICA — Mesoamerica (Tier B/C, P2)

- **Political:** Olmec (San Lorenzo c. 1200–900; La Venta c. 900–400 BCE); Zapotec Monte Albán (from c. 500 BCE); Maya city-kingdoms (Preclassic El Mirador; Classic Tikal and Calakmul from c. 250 CE); Teotihuacan (c. 100 BCE rise, major power by 300–500 CE).
- **Economy:** maize, beans, squash; cacao; obsidian; no draft animals, no metal tools, no wheeled transport (wheeled toys exist).
- **Religion/culture:** dynastic rulership, bloodletting, ballgame, calendars (260-day ritual cycle, 365-day year, Long Count), human sacrifice.
- **Evidence:** mostly archaeology plus Classic Maya inscriptions (E2/E3). Avoid invented personal biography.

### REG\_ANDES — Andes and Peruvian Coast (Tier C, P2)

- Norte Chico/Caral (c. 3000–1800 BCE), Chavín (c. 900–200 BCE), Paracas and Nazca (lines, textiles), Moche (c. 100–700 CE; Sipán burial c. 250 CE), Tiwanaku (from c. 500 CE).
- Camelids (llama, alpaca), potato and maize, vertical ecology, textiles, *khipu* record-keeping appears later than most of this era (do not assume Inca structures). E3: archaeology only.

### REG\_STEPPE — Steppe and Central Asia (Tier C, P2)

- Scythians and Saka (c. 8th–3rd c. BCE), Sarmatians, Xiongnu confederation (c. 209 BCE–1st c. CE), Yuezhi.
- Mounted archery, kurgan burials, seasonal migration, kin-based leadership; known mostly via outsider texts (Herodotus, Sima Qian) \[U on interpretive bias\].

### Deferred regions (P3)

Arabia and Red Sea (Sabaeans, Nabataeans), Aksum and the Sahel (Nok), Korea and Japan (Yayoi), Southeast Asia, North American Eastern Woodlands (Adena, Hopewell), Celtic/Germanic Europe (`REG_CELTIC_GERMANIC`, treated as a Roman frontier overlay at P2).

---

## 4. Historical World Model

### 4.1 Entity Layers \[D\]

- **PoliticalEntity:** empire, kingdom, polis/city-state, tribal confederation, chiefdom, province, satrapy, client kingdom. Each has `ruler_chain`, `capital`, `legal_system`, `tax_system`, `military_system`, `state_religion_policy`.
- **Settlement tiers:** camp, hamlet, village, town, city, metropolis. Tier drives available occupations, markets, temples, disease spread.
- **Institutions:** household (the core social unit), temple, palace, army unit, guild/association, school, law court, assembly/senate/council, cult community, estate/latifundium, monastery (India, later Christian).
- **Groups:** factions, kin groups/clans, dynasties, religious communities, ethnic-cultural groups, professional colleges (e.g., Roman *collegia*).
- **Networks:** Nile, Euphrates–Tigris, Royal Road (Sardis–Susa), Mediterranean sea lanes, Silk Roads (overland, c. 2nd c. BCE onward), monsoon sea route (Red Sea–India, 1st c. BCE onward), steppe corridors, Mesoamerican obsidian and jade routes.

### 4.2 The Household Rule \[D\]

The player is born into a **Household** entity, not just a parent pair. A Household holds members (kin, slaves, dependents), property, a head, a status rating, patrons, and shared reputation. Roman *familia* and *domus*, Greek *oikos*, Egyptian household, Chinese *jia*/clan, and Mesopotamian *bit abi* are mapped to the same engine object with context-specific legal rules (who can inherit, who speaks for whom).

### 4.3 Relationship Types

`rules`, `vassal_of`, `tributary_of`, `allied_with`, `at_war_with`, `rival_of`, `patron_of` / `client_of`, `owns` (property, slaves), `member_of`, `married_to`, `kin_of`, `worships`, `trades_with`, `holds_office`. All relationships carry `strength` (−100..100) and `since_date`.

### 4.4 Example Dynasties and Houses (Tier A/B candidates)

Egypt: 18th Dynasty (Thutmose III, Akhenaten, Tutankhamun), 19th (Ramesses II), Ptolemies. Persia: Achaemenids. Macedon: Argeads, Antigonids. Seleucids. India: Mauryas. China: Zhou house, Ying (Qin), Liu (Han). Rome: Cornelii Scipiones, Claudii, Julii, Licinii, Julio-Claudians, Flavians, Antonines. Greece: Alcmaeonids and Philaids in Athens.

### 4.5 Simulation Granularity \[D\]

- **High detail:** the player's region and household (seasonal turns during crises).
- **Medium detail:** neighboring regions (yearly state updates, scripted events plus probabilities).
- **Low detail:** the rest of the world (event timeline only; resolved lazily when relevant).

---

## 5. Player Creation

### 5.1 Creation Pipeline \[D\]

1. Resolve date and location to a Context Pack (Section 1.7).
2. Roll sex at birth (M/F at launch). Gender roles come from context data, never hard-coded. \[U: historical gender variance exists but is thinly documented; defer richer modeling to P3.\]
3. Roll legal status and social class using the context's weighted table.
4. Generate Household: parents' occupations, siblings, grandparents, dependents, slaves owned, property, patrons.
5. Roll cultural, religious, and linguistic background from the context's population mix.
6. Roll birth traits (advantages and disadvantages).
7. Roll base stats and hidden frailty.
8. Generate culture-appropriate name (Section 5.4).
9. Generate a birth snapshot: season, omens (where culture records them), active crisis flags (famine, war, plague year).

### 5.2 What Is Determined vs Random

| Determined by date + location | Weighted by context | Fully random |
| --- | --- | --- |
| Political entity, ruler, laws, currency, calendar, languages, state religion, active events, tech flags, disease profile | Social class, occupation of parents, wealth tier, household size, urban/rural split, literacy odds, religion mix | Base stats, birth season, siblings count and sex, personal quirks, birth traits, family conflicts |

### 5.3 Birth Traits (examples)

**Advantages:** born citizen of a favored polis; scribal or priestly lineage; patron family; inherited land; sound constitution; trade-route town birth; literate parent. **Disadvantages:** debtor household; birth in famine or plague year; congenital impairment (documented examples include club foot); orphaned young; unfree status; marginal land; frontier raid zone; disfavored cult; widowed mother with no guardian. **Cultural flags:** twins and unusual births may read as omens in Mesopotamia and Rome \[H: omen traditions exist\]; use as flavor with bounded gameplay effect.

### 5.4 Naming Rules \[D\]

Roman free males: *praenomen + nomen + cognomen* (*tria nomina*), with limited praenomina and daughters named after the family *nomen* (e.g., Julia). Greek: single name plus patronymic and deme in Athens. Egyptian: theophoric names (e.g., "Amun-is-satisfied" style). Mesopotamian: name plus father's name. Chinese: surname (*xing/shi*) and personal name; Han naming conventions evolve. Indian: Prakrit/Sanskrit personal names, gotra/lineage markers where applicable. For E3 regions, generate descriptive reconstructed names and tag them `reconstructed: true`.

### 5.5 Cultural Background, Not Race \[D\]

Do not use modern racial categories. Use `Culture`, `Language`, `LegalStatus`, `Religion`, and `Origin` (native, immigrant, captive, colonist). Ancient societies sorted people by city, kin, language, legal status, and cult; these are the fields that matter.

---

## 6. Social Classes and Life Paths

### 6.1 Universal Status Tiers \[D\]

Engine tiers (`T1`–`T5`) let agents compare societies; each Context Pack maps tiers to local names.

| Tier | Meaning | Examples |
| --- | --- | --- |
| T1 | Ruler and ruling family | Pharaoh, great king, emperor, Han emperor, Roman senatorial dynasts |
| T2 | Elite | Nobles, senators, high priests, great landowners, Athenian wealthy liturgists, Han scholar-officials |
| T3 | Free middling | Citizens with property, artisans, merchants, mid-level scribes, small landholders |
| T4 | Free poor and dependent | Tenants, laborers, urban poor, clients, corvée peasants |
| T5 | Unfree | Slaves, serfs/bound laborers, debt-bondsmen, captives |

### 6.2 Class Table: Late Roman Republic (MVP Context, 91–27 BCE) \[Tier A\]

| Class | Lifestyle and wealth | Rights and restrictions | Education | Typical occupations | Marriage | Politics and military | Mobility | Risks and opportunities |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Senatorial aristocracy (T2)** | Urban *domus*, country villas, large estates, many slaves | Hold magistracies; barred from direct trade (traditional norm; the *lex Claudia* of 218 BCE limited senators' seagoing ships) | Greek tutors, grammar, rhetoric, law, public speaking | Magistrate, governor, priest, orator, general | Political alliances; dowry; divorce common | Cursus honorum; commands legions | Rises or falls by elections and civil war | Proscription, exile, debt from campaigning; glory, provincial wealth |
| **Equestrians (T2/T3)** | Wealthy merchants, bankers, tax-farmers (*publicani*) | Citizens; may stand for office but fewer do | Practical and rhetorical | Banker, publican, trader, shipowner, estate manager | Alliance with senatorial families | Officers, financiers, jury service in some periods | Can enter Senate via wealth and patrons | Provincial exploitation backlash; large profits |
| **Italian municipal gentry (T2/T3)** | Local councilors in towns across Italy (citizens after 89 BCE) | Local office; limited Roman office at first | Local schools, Greek influence | Landowner, local magistrate, merchant | Local networks | Local militia and legion service | Slow upward through Rome patrons | Social War aftermath; land confiscations |
| **Free citizen poor and small farmers (T3/T4)** | Subsistence farms or urban tenements (*insulae*) | Vote in assemblies; protected by tribunes; clients of patrons | Rare, basic literacy | Smallholder, artisan, laborer, dock worker, shopkeeper, soldier | Family-arranged or choice; easy divorce | Legion service after Marian reforms; vote in assemblies | Military loot, land grants | Debt, famine, displacement by large estates, urban fires |
| **Freedmen (T3/T4)** | Often craftspeople, shopkeepers, business agents | Citizens with limits (cannot hold magistracies); sons are freeborn | Skills from enslavement | Merchant, craftsman, steward, banker | Marriage within or across status | Cannot hold magistracies; may serve patron's affairs | Strong via business | Patron obligations, social stigma; real wealth possible |
| **Provincials and non-citizens (T3/T4)** | Varies by local culture | No Roman voting rights; local law | Local | Farmer, trader, local official | Local customs | Auxiliary service | Citizenship grants are rare rewards | Tax farming extortion, governor abuse |
| **Slaves (T5)** | Domestic, agricultural, mining, gladiatorial, skilled (teachers, doctors, secretaries) | Property of owner; limited legal personhood; no legal marriage (*contubernium*) | Often skilled; Greek slaves in education | Household servant, farm laborer, miner, gladiator, teacher, steward | Informal unions | None | Manumission by owner or *peculium* savings | Violence, sale, family separation, execution; freedom and citizenship for descendants |

**Women across classes:** under paternal power or guardianship; can own property and manage estates; elite women exert influence through households and marriage alliances; no vote or magistracy.

### 6.3 Class Mapping for Other Contexts (key differences only)

- **Classical Athens (REG\_GREECE):** citizen males (political rights, assembly, juries, ephebic training), citizen women (no political rights, household role, inherit via *epikleros* rules), metics (taxed, no land ownership), slaves. Class tiers by property class (*pentakosiomedimnoi* ... *thetes*) shape military role.
- **Sparta:** Spartiates (full citizens, communal training), perioikoi (free non-citizens), helots (unfree state-owned agricultural population).
- **New Kingdom Egypt:** royal family, nobles and high priests, officials and scribes, artisans, farmers/laborers, servants and slaves (incl. war captives). Women could own, inherit, and litigate \[H\].
- **Mesopotamia (Old Babylonian / Neo-Assyrian):** king, palace and temple elite, free citizens (*awilum* in Old Babylonian law), dependents (*mushkenum*), slaves (*wardum*). Debt-slavery and release edicts (*misharum*) recur.
- **Han China:** emperor and imperial clan, scholar-officials and local gentry, farmers, artisans, merchants, laborers/convicts, slaves. Occupational order is an ideology, not strict class law.
- **Mauryan India:** king and court, Brahmins and ritual specialists, warriors and landholders, merchant guilds, cultivators, artisans, outcaste and servile groups, with variation by region and period \[U\].
- **Achaemenid Persia:** king and Persian nobility, satraps and officials, royal workers on ration, farmers and artisans, slaves/captives; Persians had favored status.
- **Mesoamerica and Andes:** ruling lineages, nobles, priests, artisans, farmers, laborers, captives; data thin (E2/E3).

### 6.4 Career Archetypes (modern careers do not exist)

`Cultivator`, `Herder`, `Artisan`, `Merchant`, `Soldier`, `Sailor`, `Scribe/Administrator`, `Priest/Ritual Specialist`, `Healer`, `Performer`, `Laborer`, `Domestic`, `Outlaw`, `Teacher/Scholar`, `Retainer/Client`, `Ruler's Agent`. Contexts map these to concrete `Occupation` records with gates.

**Roman Republic concrete careers:** senator (cursus: quaestor, aedile, praetor, consul; minimum ages on the order of 30/39/42 \[U, varied\]), soldier/centurion, *publicanus*, banker, merchant, farmer/tenant, artisan/shopkeeper, gladiator, actor, teacher (often Greek slave or freedman), physician, priest (pontifex, augur), Vestal Virgin (female), scribe, orator/advocate, sailor, bureaucrat's assistant, client, outlaw/bandit.

### 6.5 Mobility Levers \[D\]

Military service and loot, patron favor, education (esp. literacy), wealth accumulation, marriage alliance, manumission, religious office, conquest and land grants, fleeing (becoming outlaw or migrant).

---

## 7. Childhood → Adulthood → Old Age

### 7.1 Stage Model \[D\]

| Stage | Approx. ages | Gameplay focus |
| --- | --- | --- |
| Infancy | 0–5 | High mortality; mostly passive. Illness, nutrition, household events |
| Childhood | 6–12 | Early education, chores, play, first labor; household shocks |
| Youth | 13–19 | Coming-of-age rites; training; betrothal; first career; first conflicts |
| Adulthood | 20–54 | Career, marriage, children, politics, war, migration |
| Elderhood | 55+ | Wealth transmission, authority, dependency, death risk |

Life expectancy at birth in antiquity was low (often estimated in the 20s–30s \[U\]) mostly because of infant and child mortality; adults who survived childhood could reach their 50s–60s. Do not model "old at 40" as universal.

### 7.2 Coming-of-Age and Education by Context

- **Rome:** boys receive the *toga virilis* around mid-teens; elite education includes *paedagogus*, *grammaticus*, *rhetor*; sons of equestrian and senatorial families receive military tribune posts. Girls: informal domestic and some literary education; marriage as early as 12 legally, commonly later \[U\].
- **Athens:** boys: private teachers; ephebeia (military-civic training formalized c. 335 BCE). Girls: household training.
- **Sparta:** state *agoge* for Spartiate boys from age 7.
- **Egypt:** scribal schooling or apprenticeship; priestly lineage training in temple "House of Life."
- **Mesopotamia:** *edubba* scribal schools for elite boys.
- **India:** teacher-student households (*gurukula*), later Buddhist and Jain monastic education; city of Taxila (northwest) as a center in the later first millennium BCE.
- **China:** clan and tutor schooling; imperial academy (*Taixue*) founded 124 BCE.
- **Mesoamerica/Andes:** elite scribal and ritual training (Maya); labor and craft apprenticeship for most.

### 7.3 Marriage and Family

- Arrangement by families is typical; dowry (Greece, Rome), bride-price (parts of Near East, India), and gift exchange vary.
- Polygyny is attested among rulers and elites in Egypt (royal), Persia, China (concubinage), and India; monogamy in Greece and Rome (concubinage and slave relations existed).
- Divorce: relatively easy in Rome and Egypt; harder for women in many other contexts.
- Authority: Roman *patria potestas*; Athenian *kyrios*; Chinese filial piety and clan authority; Egyptian household more flexible for women; Mesopotamian temple women (*naditu*) can hold property.
- Children are heirs, labor, and security; inheritance rules (primogeniture vs partible) affect wealth.

### 7.4 Adulthood Loop \[D\]

Each year turn: Work (career action), Household (family events), Community (social action), Faith (ritual), Risk (random event draw), Opportunity (offered choice). Crisis seasons add finer-grained turns.

### 7.5 Aging and Death Baseline \[D\]

Hazard curve by age and context: very high in first year, moderate to age 5, lowest 10–20, rising from 35. Modifiers: wealth, sanitation (city vs countryside), occupation, war and plague flags. Women's mortality has a childbirth spike in fertile years.

### 7.6 Variation Matrix (summary)

| Axis | Effect |
| --- | --- |
| Region | Political rules, education, religion, disease profile |
| Class | Education access, career gates, safety, marriage options |
| Gender | Property and legal capacity, career access, marriage pressure, childbirth risk |
| Wealth | Nutrition, medical access, ability to buy out of obligations |
| Occupation | Injury exposure, mobility, social network |
| Time period | Tech, state strength, trade intensity, war frequency |

---

## 8. Game Stats

Principle: only stats that change decisions. Modern stats such as "Looks" and "Smarts" are replaced or merged.

### 8.1 Visible Stats

| Stat | Represents | Changes via | Affected by | Affects |
| --- | --- | --- | --- | --- |
| **Health** (0–100) | Current physical condition | Illness, injury, age, nutrition, rest, medicine and ritual care | Disease exposure, wealth, occupation, war | Survival rolls, career capacity, event outcomes |
| **Strength** (0–100) | Physical power and endurance | Labor, training, age, nutrition | Occupation, childhood nutrition | Laborer, soldier, athlete, survival checks |
| **Wits** (0–100) | Learning speed and cunning | Education, experience, aging | Schooling, mentors, health in youth | Skill gain, negotiation, scribal and legal careers |
| **Skills** (0–100 each) | Craft, Farming, Arms, Trade, Rhetoric, Healing, Navigation, Literacy, Languages (per language), Ritual | Practice and instruction | Wits, mentors, opportunity | Career access and event options |
| **Standing** (0–100) | Local reputation (Roman *fama*/*dignitas*, Greek *timē*, Egyptian *ma'at* standing, Chinese *ming* and face) | Deeds, conduct, family actions, gossip | Class, behavior, patrons | Marriage, patronage, legal outcomes, office |
| **Rank** (tier + rank within tier) | Legal and social position | Office, legal status change, manumission, marriage | Law, wealth, military success | Rights, restrictions, career gates |
| **Holdings** (composite; see Section 9) | Material wealth in several forms | Income, trade, inheritance, tribute | Occupation, market, season, war | Safety, diet, patronage ability |
| **Influence** (0–100) | Network of patrons, clients, allies | Favors, service, marriage ties, office | Standing, wealth, faction | Access to opportunities, protection, political divergence |
| **Household Standing** (0–100) | Strength and resilience of the household/lineage | Family wealth, marriages, children, feuds | All members' actions | Inheritance, safety net, status |
| **Piety** (0–100) | Ritual correctness and divine favor in local terms | Rites, offerings, festival participation, vows | Culture, taboo violations, omens | Community trust, priestly careers, event outcomes, some medical care |

### 8.2 Hidden Stats \[D\]

- **Frailty:** inherent susceptibility to disease and injury; modifies Health shocks.
- **Disease Load:** accumulated chronic burden (malaria, parasites, tuberculosis).
- **Legal Exposure:** unresolved debts, crimes, feuds, lawsuits.
- **Obligation:** patron/client duties owed (and owed to you).
- **Notoriety:** negative reputation separate from Standing (infamy).
- **Ritual Pollution:** impurity from taboo acts, requires cleansing in some cultures.
- **Fertility:** conception odds.
- **Relationship Scores:** per-person trust, loyalty, resentment.

### 8.3 Derived Values (not stored stats)

- **Political Power** = f(office held, Influence, faction alignment, armed support, Household Standing). Computed on demand.
- **Survival Odds** = f(Health, Frailty, Disease Load, age, wealth, environment flags).
- **Martial Ability** = Arms skill + Strength + training history + equipment.

### 8.4 Display Rules

Visible stats display as bars or descriptive words ("hale", "respected"); hidden stats surface only through consequences, rumors, or healers' remarks. Wealth display is context-specific (Section 9.5).

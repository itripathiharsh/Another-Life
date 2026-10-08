# LegacyLife — Era Specification: Prehistoric / Early Civilization

*Game-development specification for AI coding agents. Version 0.1. Covers c. 50,000 BCE – c. 1000 BCE.*

---

## 0. How to Read This Document

**Conventions used throughout**

- **\[FACT\]** = historically/archaeologically supported statement.
- **\[UNCERTAIN\]** = scholars disagree or evidence is thin; the game must treat this as a configurable assumption, not truth.
- **\[DESIGN\]** = a proposed game mechanic or abstraction. Not a historical claim.
- **\[FUTURE\]** = depends on a system not yet specified.
- Dates are BCE unless stated. Bronze Age dates follow the **Middle Chronology** for Mesopotamia by default (Hammurabi r. c. 1792–1750 BCE); the data model must allow a chronology switch (High/Middle/Low/Ultra-Low) because Mesopotamian absolute dates shift by up to \~150 years depending on the chronology.
- Priority tags P0–P3 are defined in Section 26. Inline tags like `(P0)` mark content priority.

**Core honesty rule for this era:** Before writing (c. 3400–3200 BCE) there are no names, no personal events, no recorded speech. For roughly 90% of this era's timespan, the game is an **archaeologically informed reconstruction**, not a record. The simulation must therefore distinguish three *evidence tiers* (Section 1.4) and the UI/narration must never present reconstructed culture as documented fact.

---

# 1. ERA OVERVIEW

## 1.1 Identity

| Field | Value |
| --- | --- |
| **Era name** | Prehistoric & Early Civilization (internal ID: `era_prehistoric_early_civ`) |
| **Playable date range** | c. 50,000 BCE → c. 1000 BCE (end of Late Bronze Age collapse aftermath) |
| **Hard end boundary** | Lives that would extend beyond 1000 BCE are handed to the next era module (Iron Age/Classical, **out of scope here**). |
| **Geographic range** | Effectively global, but playable regions are limited to those with enough evidence (Section 3). |
| **Defining transitions** | (1) Behavioural modernity & Upper Paleolithic foraging; (2) end of last Ice Age & Holocene warming (c. 9700 BCE); (3) Neolithic farming/herding; (4) metallurgy (copper c. 5000–4500 BCE; bronze c. 3300–3000 BCE in the Near East); (5) urbanisation & writing (c. 3400–3200 BCE); (6) territorial states and empires; (7) Late Bronze Age international system and its collapse (c. 1200–1150 BCE). |

**Why start at 50,000 BCE?** \[DESIGN\] Anatomically modern humans exist far earlier (\~300,000 years), but the Upper Paleolithic offers art (cave painting, figurines, c. 45,000–35,000 BCE and later), symbolic burial, and enough archaeological texture for narrative. Earlier lives (Neanderthal coexistence, Homo erectus) are **P3 / out of scope**.

## 1.2 Why this era suits LegacyLife

1. **Maximal contrast between lives.** A forager in Ice Age Europe, a Sumerian scribe, an Egyptian stonecutter and a Shang diviner's apprentice share almost nothing materially, yet all fall inside one era module.
2. **Date + location is the core variable.** A birth date shift of 500 years can move the player from an egalitarian farming village to a walled city-state.
3. **Systems emerge from first principles.** Hunger, kinship, seasons, disease, ritual, tribute and violence drive gameplay, not modern institutions, which keeps design honest and simple.
4. **Divergence is meaningful but bounded.** Individuals rarely change history, but local events (a flood, a raid, a founding) can plausibly be altered.
5. **Huge replay variety** at low content cost for the earliest periods (procedural), with deep authored content at the Bronze Age.

## 1.3 Major societies (index; details in Sections 2–4)

- **Foragers (global):** Upper Paleolithic Eurasian big-game hunters (Gravettian, Magdalenian), Natufian semi-sedentary foragers (Levant), Jomon (Japan, pottery by c. 14,000 BCE), Australian Aboriginal societies (continuous occupation 50,000+ years, **sensitive-content flag**, see 1.5), Pacific Northwest and later Arctic foragers.
- **Early farmers/herders:** PPNA/PPNB Levant, Anatolian Neolithic (Çatalhöyük), Linear Pottery (LBK) Europe, Yangshao & Longshan (China), Peiligang/Jiahu, Mehrgarh (South Asia), Saharan/Nile pastoralists, Ubaid Mesopotamia, Cucuteni–Trypillia.
- **Early civilizations:** Uruk/Sumer, Early Dynastic city-states, Akkadian Empire, Ur III, Old Babylonian, Old Kingdom–New Kingdom Egypt, Indus (Harappan) Civilization, Minoan Crete, Mycenaean Greece, Hittite Empire, Mitanni, Kassite Babylonia, Assyria, Erlitou/Shang China, Norte Chico/Caral (Peru), Olmec (Mesoamerica).
- **Mobile/steppe/other:** Yamnaya & Corded Ware (Pontic–Caspian steppe, c. 3300–2500), Andronovo, Bell Beaker, Unetice.

## 1.4 Evidence tiers \[DESIGN\]

Every content item carries `evidenceTier`:

| Tier | Meaning | Example regions/periods | Content rule |
| --- | --- | --- | --- |
| **T1 — Documented** | Contemporary written records exist | Mesopotamia from c. 2600 (administrative), Egypt from c. 3100/Old Kingdom, Hittite archives, Ugarit | Named people/events allowed; fixed-event rules apply |
| **T2 — Archaeologically rich** | Strong material evidence, no/limited texts | Indus, Minoan Crete (Linear A undeciphered), Çatalhöyük, LBK, Caral | No named historical individuals; society modeled from sites and burials; heavy \[UNCERTAIN\] flags on beliefs, politics |
| **T3 — Sparse reconstruction** | Little direct evidence of social life | Most Upper Paleolithic foragers | Procedurally generated cultural detail drawn from archaeological and ethnographic *analogy*, labelled as such |

**Ethnographic analogy warning \[DESIGN\]:** Modern forager societies (e.g., San, Hadza, Inuit, Aboriginal Australians) are *not* living Paleolithic fossils. They may inform plausible social mechanics (sharing norms, band size, fission–fusion) but must not be copied wholesale. Documentation must label any analogy-derived mechanic `source: analogy`.

## 1.5 Content-sensitivity flags \[DESIGN\]

- Living Indigenous cultures (Aboriginal Australian, Native American descendants, etc.): avoid inventing sacred stories or ceremonies; use general, respectful, non-specific representation. Flag `sensitive_cultural_content = true` and require review before shipping.
- Slavery, human sacrifice, infanticide, war atrocities: **historically attested in parts of this era**; model with restraint and as systemic consequences, not spectacle. Provide content toggles (Section 12.6).
- Gender violence/sexual coercion: acknowledge as historical reality; **do not** implement graphic mechanics (P3 excluded by default).

---

# 2. TEMPORAL BREAKDOWN

The era is divided into **nine sub-eras** (`SubEra`). Boundaries are *regional*: the same year belongs to different sub-eras in different regions (see 2.10). Use the **regional sub-era table** in the data model rather than one global timeline.

## 2.1 SE1 — Upper Paleolithic Foragers (c. 50,000 – 26,500 BCE) `(P0 lite)`

- **Major societies:** Early modern humans across Africa, Eurasia, Sahul (Australia–New Guinea). In Europe, coexistence/replacement of Neanderthals ends c. 40,000–38,000 BCE.
- **Political situation:** No states. Autonomous bands (typically \~25–50 people) linked in regional networks of perhaps several hundred ('maximum band' / mating networks). \[UNCERTAIN: exact sizes\]
- **Major events:** Cave art (Sulawesi, Europe: Chauvet c. 34,000+ BCE); figurines (Venus of Hohle Fels c. 38,000–33,000 BCE); long-distance raw material exchange; spread to Australia (≥50,000 BCE, date debated).
- **Technology:** Blade tools, bone/antler/ivory working, needles, spear-throwers (atlatl, later in period), controlled fire, bows possibly appear (earliest secure evidence debated).
- **Economy:** Foraging, big-game hunting, gathering; reciprocal sharing; no money.
- **Social structure:** Kin-based, mostly egalitarian with age/skill-based prestige. Exceptional burials (e.g., Sunghir, c. 28,000 BCE, richly furnished child burials) show that *some* inherited or ascribed status may have existed. \[UNCERTAIN\]
- **Conflicts:** Occasional interpersonal and group violence documented in skeletons; scale low. \[UNCERTAIN: levels of warfare\]

## 2.2 SE2 — Glacial Maximum & Late Paleolithic (c. 26,500 – 11,700 BCE) `(P0 lite)`

- **Key factor:** Last Glacial Maximum (c. 26,500–19,000 BCE). Ice sheets cover northern Europe/North America; populations retreat to refugia (Iberia, Balkans, Ukraine, southern France).
- **Notable cultures:** Gravettian (to c. 21,000), Solutrean, Magdalenian (c. 17,000–12,000 BCE; Lascaux, Altamira), Mammoth-bone settlements on the Russian Plain (Mezhirich, Mezin), Jomon pottery (Japan, c. 14,500 BCE), Americas first peopling (earliest secure evidence c. 21,000–13,000 BCE; routes debated: coastal vs. interior).
- **Technology:** Eyed needles/tailored clothing, mammoth-bone houses, fishing technology, domesticated dog (c. 15,000+ BCE, origin debated), ceramics in East Asia.
- **Changes from SE1:** Retreat to refugia, higher cold stress, more art/ornament, more storage experimentation.

## 2.3 SE3 — Epipaleolithic/Mesolithic & Holocene Transition (c. 11,700 – 8,500 BCE) `(P1)`

- Younger Dryas cold snap (c. 10,800–9,700 BCE) then rapid warming at the Holocene's start (c. 9700 BCE).
- **Natufian** (Levant, c. 12,500–9,500 BCE): semi-sedentary foragers, early cereal harvesting with sickles, cemeteries, possible early beer-brewing evidence (Raqefet Cave, debated).
- **Göbekli Tepe** (SE Anatolia, c. 9500–8000 BCE): monumental stone enclosures built by non-farming/early-transition communities. Purpose \[UNCERTAIN\] (ritual/feasting/gathering center).
- **Europe:** Mesolithic forager–fisher communities (Star Carr c. 9000 BCE).
- Extinction of Pleistocene megafauna in many regions (human role vs climate debated).

## 2.4 SE4 — Early Neolithic (c. 9600 – 7000 BCE) `(P0 for Levant/Anatolia)`

- **Societies:** Pre-Pottery Neolithic A and B (PPNA/PPNB) in Levant & Anatolia; early farmers at Jericho, 'Ain Ghazal, Çayönü, Çatalhöyük (c. 7100–5700 BCE); Zagros herders; Jiahu & Peiligang (China, c. 7000+ BCE); early Mehrgarh (c. 7000 BCE, Baluchistan).
- **Domestication:** wheat (emmer, einkorn), barley, lentil, pea, flax, sheep/goat (c. 9000–8000 BCE), cattle & pig (c. 8000–7000 BCE). Rice domestication in the Yangtze (c. 7000–5000 BCE).
- **Society:** Villages of \~100–1,000+ (Çatalhöyük up to \~5,000–8,000 at peak, estimates vary). Plastered skulls, communal ritual buildings, increasing storage.
- **Economy:** Mixed farming with continued foraging; household-scale surplus; early obsidian trade (Anatolian obsidian reaches Levant).
- **Change from SE3:** Permanent villages, farming, new infectious disease load from crowding & livestock.

## 2.5 SE5 — Developed Neolithic & Copper Age (Chalcolithic) (c. 7000 – 3600 BCE) `(P1)`

- **Societies:** Halaf & Ubaid (Mesopotamia; Ubaid c. 6500–3800), LBK across Central Europe (c. 5500–4500), Cucuteni–Trypillia (c. 5500–2750; mega-settlements up to several thousand people), Vinča (Balkans), Varna (Bulgaria, c. 4600–4200: earliest worked gold in lavish graves), Yangshao (China, c. 5000–3000), Megalithic Atlantic Europe (Carnac c. 4500+), Badari/Naqada (Egypt, c. 4400–3100).
- **Technology:** Pottery, plow (ard) c. 5000–4000 BCE in Near East/Europe, wheel and wheeled vehicles (c. 3500 BCE, multiple regions), copper smelting (c. 5000–4500), irrigation in southern Mesopotamia, sail (c. 4000 BCE?).
- **Change:** Emerging chiefdoms, craft specialization, long-distance trade, first monumental tombs.

## 2.6 SE6 — Urban Revolution & Early States (c. 3600 – 2500 BCE) `(P0)`

- **Uruk period** (c. 4000–3100) → Jemdet Nasr → **Early Dynastic Sumer** (c. 2900–2350): city-states (Uruk, Ur, Lagash, Kish, Umma, Nippur, Eridu).
- **Egypt:** Predynastic → unification (Narmer/Menes, c. 3100 BCE; traditional date) → Early Dynastic (to c. 2686) → **Old Kingdom** (c. 2686–2181; Pyramid Age; Djoser, Khufu, Khafre, Menkaure).
- **Indus:** Early Harappan (c. 3300–2600) → **Mature Harappan** (c. 2600–1900): planned cities Mohenjo-daro, Harappa, Dholavira, Rakhigarhi.
- **Others:** Liangzhu (China, c. 3300–2300; hydraulic works); Caral-Supe/Norte Chico (Peru, c. 3000–1800); Stonehenge phases (c. 3000–2500 BCE); Orkney (Skara Brae c. 3180–2500); Yamnaya/steppe expansions (c. 3300–2600); Troy I–II, Early Minoan.
- **Innovation:** Cuneiform (c. 3400–3200 BCE, accounting tokens → tablets), Egyptian hieroglyphs (c. 3250–3100), bronze, plow agriculture, bureaucracies, standing temples, early law/administration, Indus seals (script undeciphered).
- **Conflicts:** Early Dynastic border wars (e.g., Lagash vs Umma); Egyptian expeditions.

## 2.7 SE7 — Territorial States & Early Empires (c. 2500 – 1600 BCE) `(P0)`

- **Akkadian Empire** (Sargon, c. 2334–2279; fall c. 2154) → Gutian interlude → **Ur III** (c. 2112–2004; Ur-Nammu code).
- **Egypt:** First Intermediate Period (c. 2181–2055) → **Middle Kingdom** (c. 2055–1650) → Second Intermediate (Hyksos in the Delta c. 1650–1550).
- **4.2 kiloyear event (c. 2200 BCE):** widespread drought/climate shift affecting Mesopotamia, Egypt, Indus \[UNCERTAIN: scale of social impact; contested\].
- **Indus:** Late Harappan deurbanization (c. 1900–1300 BCE); causes debated (monsoon shifts, river changes, trade decline).
- **Mesopotamia after Ur III:** Isin–Larsa; Old Assyrian trade (Kanesh merchant colonies c. 1950–1750); **Old Babylon** (Hammurabi, r. 1792–1750 Middle Chron.); Mari; Old Hittite kingdom (c. 1650).
- **Aegean:** Minoan palatial society (Knossos, Phaistos; palaces c. 1900–1450), early Mycenaean (c. 1700+).
- **China:** Erlitou culture (c. 1900–1500; identification with Xia dynasty debated) → Erligang/early Shang.
- **Europe:** Bell Beaker (c. 2800–1800), Unetice (c. 2300–1600), Nebra sky disc (c. 1600 BCE).

## 2.8 SE8 — Late Bronze Age International System (c. 1600 – 1177 BCE) `(P0)`

- **Great Powers:** New Kingdom Egypt (c. 1550–1070), Hittite Empire (c. 1400–1180 peak), Mitanni (to c. 1350), Kassite Babylonia, Middle Assyria, Mycenaean palaces. Amarna Letters (c. 1360–1332) document a diplomatic 'Club' of 'Great Kings' addressing each other as 'brother'.
- **Key events:** Thutmose III's campaigns & Megiddo (c. 1457), Akhenaten's reform (c. 1353–1336), Battle of Kadesh (c. 1274; Ramesses II vs Muwatalli II), Egyptian–Hittite treaty (c. 1259, among the earliest surviving international treaties), Trojan-war-era Aegean (historicity of the epic war \[UNCERTAIN\]), Uluburun shipwreck (c. 1320 BCE; trade evidence).
- **China:** Shang at Anyang (c. 1250–1046; Wu Ding, oracle bone inscriptions).
- **Americas:** Olmec San Lorenzo (c. 1400–1000 BCE).
- **Economy:** Palace-managed trade in copper, tin, glass, textiles, grain, oil, wine; **tin from far sources** (Central Asia, possibly Anatolia, Afghan sources debated).

## 2.9 SE9 — Collapse & Aftermath (c. 1200 – 1000 BCE) `(P1)`

- Destruction/abandonment of many sites: Ugarit, Hattusa, Mycenaean palaces, many Levantine cities. Egypt survives, battles 'Sea Peoples' (Medinet Habu, c. 1177 BCE, Ramesses III).
- **Causes \[UNCERTAIN / multi-causal\]:** drought, earthquakes ('earthquake storm' hypothesis, contested), migration/raids, internal revolt, trade collapse, systemic fragility. **The game must not present a single cause as fact.**
- **Aftermath:** Regional reorganization; Phoenician city-states, Philistines, early Israelite/Aramean polities (**sensitive**, treat with caution & scholarly consensus), Neo-Hittite city-states, Egypt's Third Intermediate Period begins c. 1070.
- **Era handoff:** After c. 1000 BCE the game transitions to Iron Age/Classical modules.

## 2.10 Regional sub-era table \[DESIGN\]

Because 'Neolithic' starts at different times, the data model uses `RegionalPeriod { regionId, subEraId, startYear, endYear }`.

| Region | Forager | Neolithic begins | Metallurgy (copper→bronze) | Writing / state |
| --- | --- | --- | --- | --- |
| Mesopotamia/Levant | to c. 9600 | c. 9600 | c. 5000 / c. 3000 | c. 3400 |
| Egypt/Nile | to c. 5500 (farming arrives) | c. 5500 | c. 4000 / c. 2000 | c. 3250 |
| Indus | to c. 7000 | c. 7000 | c. 4500 / c. 2800 | c. 2600 (script undeciphered) |
| China (Yellow R.) | to c. 7000 | c. 7000 | c. 2000 (Erlitou) | c. 1250 (oracle bone) |
| Europe (Central/Atlantic) | to c. 5500 | c. 5500 | c. 3500–2500 / c. 2200 | Linear B in Aegean only c. 1450+ |
| Peru (Andes) | to c. 3500 | c. 3500 | after 1500 (late) | No writing (quipu later; origin debated) |
| Mesoamerica | to c. 2000 | c. 2000 (maize farming earlier) | none in era | Olmec symbols (limited) |
| Australia | whole era | none | none | none |

## 2.11 Important temporal rules \[DESIGN\]

1. **Boundary blending:** If a birth year is within ±100 years of a regional transition, enable a `transitionModifier` (mixed technologies, shifting norms).
2. **Year granularity:** Prehistory uses 'epoch buckets' (e.g., 'c. 20,000 BCE ±500') rather than exact years; exact-year logic starts where documents allow (Egypt/Mesopotamia Bronze Age).
3. **Calendar:** The game's clock is the **solar year with seasons**; there are no standardized calendars in most of the era. Mesopotamia (lunar months, intercalation), Egypt (civil 365-day year, 3 seasons: Akhet/Peret/Shemu) are used where relevant. Display as 'c. 2300 BCE' with +/- uncertainty where needed.
4. **No fake precision:** Do not display birth dates like '14 March 28,000 BCE'. Auto Create should pick *year buckets* and *season*.

---

# 3. GEOGRAPHIC BREAKDOWN

The playable world is divided into **Macro-Regions** (`Region`) containing **Locations** (`Location`: settlement, camp, or site). Not all macro-regions are available at all times; availability is a function of `regionPeriod`.

## 3.1 Region catalogue (summary)

| ID | Macro-Region | Active spans | Evidence tier | Priority |
| --- | --- | --- | --- | --- |
| R01 | Mesopotamia (southern Sumer; north Assyria) | c. 7000–1000 | T1 from c. 2600 | P0 |
| R02 | Nile Valley (Egypt) | c. 5500–1000 | T1 from c. 3100 | P0 |
| R03 | Levant & Anatolia | c. 12,500–1000 | T1 late | P0/P1 |
| R04 | Indus Valley | c. 7000–1300 | T2 | P1 |
| R05 | Aegean (Crete/Greece) | c. 7000–1000 | T2 → T1 (Linear B) | P1 |
| R06 | Yellow River/China | c. 7000–1000 | T2 → T1 (Shang) | P1 |
| R07 | Western/Central Europe | c. 50,000–1000 | T3/T2 | P0 (forager + Neolithic) |
| R08 | Pontic–Caspian Steppe | c. 5000–1000 | T2/T3 | P2 |
| R09 | Andes (Norte Chico) | c. 3500–1500 | T2 | P2 |
| R10 | Mesoamerica (Olmec) | c. 2000–1000 | T2 | P3 |
| R11 | Sahul (Australia/New Guinea) | c. 50,000–1000 | T3 + sensitivity | P3 / sensitive |
| R12 | East Asia (Jomon Japan) | c. 14,500–1000 | T2 | P3 |
| R13 | Sahara/East Africa pastoralists | c. 7000–1000 | T2/T3 | P3 |
| R14 | Arctic/North America foragers | c. 20,000–1000 | T3 | P3 |

## 3.2 R01 — Mesopotamia (P0)

- **Political entities by sub-era:** Ubaid villages → Uruk city-states (c. 3600–3100) → Early Dynastic city-states (c. 2900–2350) → Akkad (c. 2334–2154) → Ur III (c. 2112–2004) → Isin–Larsa → Old Babylon / Assyria → Kassite Babylonia (c. 1595–1155) → Middle Assyrian state.
- **Major cities:** Eridu, Uruk, Ur, Lagash, Girsu, Umma, Nippur (religious center), Kish, Sippar, Babylon (rise c. 1900+), Assur, Nineveh, Mari, Nuzi (north).
- **Population:** Southern alluvial plain: large irrigated cities (Uruk perhaps 40,000–80,000 at c. 3000; estimates debated). Mixed Sumerian/Akkadian-speaking populations; Semitic (Akkadian, later Amorite) and Sumerian (language isolate) coexisting.
- **Social structure:** Temple & palace households; free citizens (*awilum*), dependents/clients (*mushkenum*), slaves (*wardum/arad*). Women could own property, run businesses (e.g., naditu women in Sippar), serve as priestesses (e.g., Enheduanna, c. 2285–2250, daughter of Sargon).
- **Economy:** Barley agriculture, date palms, sheep/goat wool textiles, trade in timber, stone, metals; silver by weight as unit of account (shekel) and barley as ration/price unit.
- **Culture/Religion:** Polytheism; city gods (Enlil, Inanna, Enki, Nanna/Sin, Utu/Shamash, Marduk later); temples as large economic institutions; ritual cycles (e.g., Akitu new-year, spring).
- **Languages:** Sumerian, Akkadian (Babylonian/Assyrian dialects), Amorite; scribal schools (edubba).
- **Military:** City-state levies; later royal standing contingents (Akkad), spearmen, archers, chariots (early 'battle cars' in Early Dynastic; true spoked-wheel horse chariot later c. 2000+).
- **Major occupations:** Farmer, herder, brewer, potter, scribe, temple servant, merchant (tamkarum), soldier, irrigation worker, textile worker.
- **Major risks:** Flood or salinization, canal failure, war and tribute, debt-slavery, epidemic, famine, harsh legal penalties.
- **Key events:** Writing invention; Lagash–Umma border war; Sargon's rise; Ur III bureaucracy; Hammurabi's code (c. 1754 BCE; not the first law code: Ur-Nammu c. 2100, Lipit-Ishtar, Eshnunna precede it).

## 3.3 R02 — Egypt (Nile Valley) (P0)

- **Political entities:** Predynastic chiefdoms (Naqada) → Unified state (c. 3100) → Old Kingdom (Memphis) → First Intermediate (nomarchs) → Middle Kingdom (Itjtawy/Thebes) → Hyksos at Avaris (Delta) vs Theban rulers → New Kingdom Empire (Thebes/Amarna/Pi-Ramesse).
- **Major settlements:** Memphis, Thebes/Waset, Abydos, Heliopolis, Elephantine, Avaris/Pi-Ramesse, Amarna (Akhetaten, c. 1346–1332 BCE), Deir el-Medina (workmen's village; rich written evidence c. 1550–1070).
- **Population/economy:** Nile floodplain: perhaps 1–2 million in Old Kingdom (estimates vary). Grain, flax/linen, papyrus, livestock; redistributive state economy with tax in kind (grain, labor corvée); no coinage; **deben** (copper/silver weight unit) as accounting measure.
- **Social structure:** King (pharaoh) → vizier & officials (scribes) → nobles/priests → artisans/farmers → laborers; slavery existed (more as war captives in New Kingdom). Women could own property and inherit.
- **Religion:** Polytheism (Ra, Osiris, Isis, Amun, Ptah, Hathor...), divine kingship (Ma'at as cosmic order), strong mortuary religion, temple cults.
- **Military:** Old Kingdom: expeditions, levies; Middle Kingdom: fortresses in Nubia; New Kingdom: professional standing army, chariots (introduced via Hyksos c. 1650–1550), Maryannu elite (Levant style).
- **Risks:** Poor flood (famine), corvée, tax, plague, tomb robbing/crime, political instability.
- **Events:** Narmer unification (c. 3100), Djoser's Step Pyramid (c. 2670), Khufu's pyramid (c. 2560), First Intermediate collapse (c. 2181), Mentuhotep II reunification (c. 2055), Hyksos period, Ahmose expels Hyksos (c. 1550), Hatshepsut (r. c. 1479–1458), Thutmose III, Akhenaten, Tutankhamun (r. c. 1332–1323), Ramesses II (r. 1279–1213), Kadesh, Sea Peoples.

## 3.4 R03 — Levant & Anatolia (P0/P1)

- **Early:** Natufian, PPNA (Jericho c. 9000 BCE), PPNB (Çayönü, 'Ain Ghazal), Çatalhöyük.
- **Bronze Age:** Canaanite city-states (Byblos, Ugarit, Megiddo, Hazor, Jericho, Lachish) under Egyptian and Hittite spheres; Hattusa-based Hittite Empire; Assyrian merchant colonies at Kanesh (c. 1950–1750).
- **Society:** City-state kings (*malku*), a **maryannu** chariot class, **Habiru/Apiru** (a social designation of bandit/mercenary groups in 2nd-millennium texts; **not** automatically equal to Hebrews: sensitive, \[UNCERTAIN\]).
- **Religion:** Local pantheons (Baal, Asherah, Anat, El at Ugarit); Hittite 'thousand gods'.
- **Languages:** Akkadian as lingua franca; Hittite, Hurrian, Luwian, Ugaritic.
- **Risks:** Egyptian–Hittite proxy wars, tribute, plague (Hittite plague documented c. 1320s BCE, perhaps spread by war captives), drought and earthquake, and the Late Bronze Age Collapse.

## 3.5 R04 — Indus Valley (P1)

- **Entities:** Hakra–Ghaggar, Indus plains; cities share standardized weights, brick sizes (1:2:4 ratio), and seals; **no evidence of palaces, grand royal burials, or standing armies** \[UNCERTAIN: governance may have been merchant/ritual/council-based\].
- **Cities:** Mohenjo-daro (c. 40,000?), Harappa, Dholavira, Rakhigarhi, Lothal (dockyard debated), Ganweriwala.
- **Economy:** Wheat, barley, cotton (earliest), cattle, bead/carnelian craft, long-distance sea trade with Mesopotamia ('Meluhha' in Akkadian texts).
- **Culture:** Undeciphered script (\~400 signs); religion unknown (Great Bath, figurines, seals; interpretations speculative). **Do not invent religion beyond marked \[UNCERTAIN\].**
- **Risks:** Flood, monsoon variability, river-course change, deurbanization after c. 1900.

## 3.6 R05 — Aegean (P1)

- **Minoan Crete (c. 3000–1450):** Palaces (Knossos, Phaistos, Malia, Zakros), possible peaceful maritime network (**'thalassocracy' contested**), Linear A (undeciphered), frescoes (priestess or goddess imagery; interpretations debated), Thera eruption (c. 1600 BCE, date debated; between \~1630–1500 BCE).
- **Mycenaean (c. 1700–1100):** Fortified palaces (Mycenae, Pylos, Tiryns, Thebes), Linear B (Greek) tablets showing bureaucratic palace economy: *wanax* (king), *lawagetas*, *telestai*; shaft graves; trade with Egypt/Levant.
- **Troy (Hisarlik):** Troy VI/VIIa (c. 1300–1180); Hittite texts mention 'Wilusa' and 'Ahhiyawa' (possible Mycenaean Greeks) \[UNCERTAIN\].

## 3.7 R06 — Yellow River / China (P1)

- **Neolithic:** Peiligang, Yangshao (painted pottery), Longshan (c. 3000–1900; walled towns, warfare), Liangzhu (Yangtze delta; jade, canals).
- **Erlitou (c. 1900–1500):** Possibly early state; palace foundations; bronze ritual vessels. **Xia dynasty identification debated.**
- **Shang (c. 1600–1046):** Oracle-bone divination (Anyang, c. 1250+); bronze casting; chariots (introduced c. 1200), human sacrifice at royal tombs; ancestor worship; king as diviner-leader; Fu Hao (consort & military leader, c. 1250 BCE, tomb discovered 1976).

## 3.8 R07 — Europe (P0 for forager + Neolithic)

- **Upper Paleolithic:** Gravettian/Magdalenian big-game hunting; cave art; mobile bands in Franco-Cantabrian refuge.
- **Neolithic:** LBK farmers (c. 5500+) with longhouses (some evidence of violence: Talheim, Schletz massacre sites \~5000 BCE), Megalithic builders (Carnac, Newgrange c. 3200, Stonehenge), Corded Ware/Yamnaya migrations c. 3000–2500 (major genetic turnover in parts of Europe; **sensitive political misuse risk**, present as population movement, not 'racial' narrative).
- **Bronze Age:** Unetice, Tumulus, Nordic Bronze Age (amber & bronze trade), Bell Beaker networks.

## 3.9 R08–R14 (stubs)

Steppe, Andes, Mesoamerica, Sahul, Jomon, Africa and Arctic regions are defined as `Region` records with **forager/pastoralist/early-chiefdom templates only** in MVP+ phases. No named individuals; evidence tier T2/T3. **Sahul and living-descendant regions require cultural review (Section 1.5).**

## 3.10 Location types \[DESIGN\]

| `locationType` | Description |
| --- | --- |
| `camp_band` | Seasonal forager camp (mobile; moves with seasons) |
| `village_farm` | Permanent farming village |
| `town_proto` | Large Neolithic proto-town (Çatalhöyük, Jericho) |
| `city_state` | Walled city with temple/palace |
| `capital_royal` | Royal/imperial capital |
| `ritual_center` | Göbekli Tepe, Stonehenge, Caral platform mounds |
| `trade_hub` | Kanesh, Ugarit, Byblos, Lothal |
| `frontier_fort` | Nubian fortress, Hittite border fortress |
| `worksite_state` | Pyramid worksite, canal, quarry, mine |

Each location has: coordinates (approximate), `population`, `foodSurplus`, `defenseLevel`, `tradeRoutes`, `ruler/polity`, `localCulture`, `diseaseLoad`, `climateProfile`, `availableOccupations`.

---

# 4. HISTORICAL WORLD MODEL

## 4.1 World entity taxonomy \[DESIGN\]

| Entity | Used in | Examples |
| --- | --- | --- |
| `Band` | SE1–SE3 | Forager group of \~25–50 |
| `ClanLineage` | all | Descent group; main identity for most people |
| `Village` | SE3+ | 50–1000 residents |
| `CityState` | SE6+ | Uruk, Ur, Lagash |
| `Kingdom/Territorial State` | SE6+ | Old Kingdom Egypt, Akkad, Hittite |
| `Empire` | SE7–SE8 | Akkad, New Kingdom Egypt, Hittite |
| `Temple Institution` | SE6+ | Temple of Inanna at Uruk |
| `Palace Institution` | SE6+ | Knossos, Pylos |
| `TradeNetwork` | all | Obsidian, copper, tin, lapis, amber, Indus–Gulf trade |
| `ReligiousCommunity` | all | Cult of Osiris, Inanna temple |
| `MilitaryUnit` | SE6+ | Egyptian chariot division, Hittite chariot corps |
| `Faction` | SE6+ | Priesthood vs palace, Theban vs Hyksos |
| `Dynasty` | SE6+ | Egyptian 4th Dynasty, Akkadian dynasty |
| `Guild/Corporation` | SE7–SE8 | Merchant associations (karum), craft workshops |

## 4.2 Relationship types

- **Kin ties:** the basic social glue; marriage alliances between clans.
- **Patronage:** client to patron (nobles, temples, palaces).
- **Tribute/Tax:** local polity to overlord.
- **Diplomatic:** alliances, marriage diplomacy ('brother' kings, Amarna), treaties.
- **Trade:** exchange partners, merchant colonies, caravan routes.
- **Religious:** cult membership, priesthood roles, oracle consultation.
- **Enmity:** blood feud, rival city-state, war.

## 4.3 Trade networks \[FACT unless noted\]

| Network | Goods | Dates |
| --- | --- | --- |
| Anatolian obsidian | Obsidian blades | c. 9000 BCE+ |
| Spondylus shell | Ornament (Balkans) | c. 5000 BCE |
| Copper | Sinai, Cyprus (Alashiya), Oman (Magan), Anatolia | c. 4500+ BCE |
| Tin | Afghanistan, Central Asia, possibly Anatolia/Cornwall | c. 3000+ BCE |
| Lapis lazuli | Badakhshan (Afghanistan) → Mesopotamia/Egypt | c. 4000+ BCE |
| Indus–Gulf–Mesopotamia | Carnelian, cotton, timber | c. 2600–1900 BCE |
| Cedar of Lebanon | Byblos → Egypt | c. 2600+ BCE |
| Old Assyrian caravans | Tin & textiles ↔ silver at Kanesh | c. 1950–1750 BCE |
| Mediterranean palace trade | Copper ingots, glass, oil, wine, ivory | c. 1600–1200 BCE |
| Amber | Baltic → Europe/Aegean | c. 2000+ BCE |

## 4.4 Key institutions

- **Temple economy (Mesopotamia):** land, flocks, workshops, rations, scribes. **Big employer**: players can be temple dependents.
- **Palace economy (Aegean/Near East):** centralized redistribution documented by clay tablets.
- **Scribal schools:** Elite training (edubba / House of Life in Egypt), 3–10+ years, high social mobility for talented boys, mostly male \[UNCERTAIN: female scribes rare but attested\].
- **Priesthoods:** Mediators with deities, controlling ritual calendar and land.
- **Corvée/labor levy:** Egypt/Mesopotamia state labor (pyramid builders were largely organized labor teams, not mass slaves; **do not use the 'slave pyramid' myth**).
- **Law courts:** Local judges/elders, king as final judge; written law collections (Ur-Nammu, Lipit-Ishtar, Hammurabi, Hittite laws, Middle Assyrian laws).

## 4.5 Dynasty/family anchors (T1 only)

Used as *background* power structure (see Section 16 for interactable figures): Egypt 1st–4th, 11th–12th, 18th–19th dynasties; Akkad (Sargon, Naram-Sin); Ur III (Ur-Nammu → Ibbi-Sin); First Dynasty of Babylon (Hammurabi); Hittite kings (Suppiluliuma I, Muwatalli II, Hattusili III); Kassite kings; Mycenaean wanaktes (unnamed in most contexts); Shang kings (Wu Ding, others).

## 4.6 Entity simulation levels (Level of Detail) \[DESIGN\]

To keep simulation tractable:

| LoD | Entities | Simulation fidelity |
| --- | --- | --- |
| **L0** | Player's household/band | Full per-year simulation |
| **L1** | Immediate community (village/city ward) | Per-year events + key NPCs tracked |
| **L2** | Polity/region | Abstract state vars: stability, harvest, war status, tribute |
| **L3** | World | Timeline of fixed/branchable events + climate state |

L2/L3 are simulated by *state machines*, not agent simulation, with historically fixed anchors.

---

# 5. PLAYER CREATION

## 5.1 Master formula

```text
BIRTH YEAR BUCKET (+ season)
+ REGION / LOCATION
+ SOCIAL CONTEXT (class, kin group, occupation of parents)
= HISTORICAL WORLD (sub-era, polity, technology set, risks, available content)
```

## 5.2 Creation modes

**Auto Create \[DESIGN\]**

1. Pick a **world-weighted** random year bucket. Raw uniform sampling over 49,000 years would almost always land in foraging eras. Use a configurable sampler with presets: `Population-weighted` (default; heavily Bronze Age, since populations were far larger), `Era-uniform` (each sub-era equally likely), `Evidence-weighted` (favours T1/T2 content), `Forager-heavy` (novelty mode).
2. Pick a region valid for that year (`regionPeriod` table).
3. Pick a location (weighted by population) and then a household (Section 5.4).
4. Roll sex at birth, health traits, family circumstances.
5. Announce a **context card** to the player: sub-era, region, evidence tier, and a one-line 'what to expect'.

**Custom Life \[DESIGN\]**

1. Player picks year (or year range) and location from a map/timeline UI that shows only supported combinations.
2. If the year/location combo is unsupported (e.g., Mesopotamia in 40,000 BCE had no cities), the engine reports why and offers the nearest valid context: *'In 40,000 BCE this region was inhabited by foraging bands; choose forager life?'*
3. Optional: player may pick a social class or occupation of parents if the date/region supports it; otherwise random.
4. Some choices are **locked** by history (cannot choose to be born a Sumerian noble in 8000 BCE).

## 5.3 What is random vs. location/date-determined

| Attribute | Determined by | Random? |
| --- | --- | --- |
| Sub-era, technology, polity | Date + location | No |
| Language/culture group | Location + date (weighted by population share) | Weighted random |
| Social class | Date + location (class distribution table) | Weighted random (or chosen) |
| Family structure | Culture + class | Weighted random |
| Sex at birth | — | \~50/50 (slight male-birth bias is a real demographic fact; optional) |
| Birth health/constitution | Baseline + parent health + environment | Random |
| Birth order, siblings | Culture + fertility + mortality | Random |
| Starting wealth | Class + household | Random within class band |
| Parent occupations | Class + region + date | Weighted random |
| Initial disease exposure | Location density, climate | Random |
| Starting talent seeds | — | Random |

**Gender note \[DESIGN\]:** Gender roles varied a great deal. The engine uses `sexAtBirth` for biology (pregnancy, certain labor patterns) and a culture-defined `genderRoleProfile` for social access. Do not apply one universal rule. Documented examples: Mesopotamian and Egyptian women could own property and conduct business; Shang royal consort Fu Hao led armies; many forager roles are task-flexible. Do not model non-binary or transgender identities with invented historical specificity. Where evidence exists (e.g., gender-variant burials, third-gender roles documented in later cultures) treat as **\[UNCERTAIN\] / P3** with sensitivity review.

## 5.4 Household generation

**Household (`Household`) fields:** `kinGroupId`, `householdType` (band, extended family, nuclear, temple dependent, palace staff), `headOfHousehold`, `parentOccupation`, `landOrAssets`, `statusLevel`, `healthEnvironment`, `religiousAffiliation`, `siblings[]`, `dependents[]`.

**Family structures by context:**

| Context | Typical structure |
| --- | --- |
| Upper Paleolithic band | Small bands, kin ties across bands, flexible marriage rules \[UNCERTAIN: residence rules\] |
| Early Neolithic village | Extended household in a courtyard or shared house cluster; communal storage |
| Mesopotamia | Patrilineal household (*bitum*); father head; mother manages domestic economy; polygyny rare, usually for infertility; concubines/secondary wives exist |
| Egypt | Mostly monogamous households (nuclear/extended); royal polygamy; women's rights to property and divorce |
| Indus | Unknown; household architecture suggests courtyard homes; do not invent kinship rules |
| Shang China | Patrilineal clans; ancestors central; elite polygyny |
| Mycenaean | Palace-centered; household details limited |

## 5.5 Starting advantages and disadvantages (`BirthTrait`)

Examples (all are \[DESIGN\] abstractions of historically plausible conditions):

- **Advantages:** `healthy_constitution`, `skilled_parent` (craft knowledge head start), `literate_household` (only in scribal contexts), `well_connected_kin`, `fertile_land`, `temple_patronage`, `protected_by_strong_clan`, `good_memory`, `strong_build`.
- **Disadvantages:** `frail_infant`, `famine_year_birth`, `debt_burdened_household`, `frontier_location`, `epidemic_cohort`, `dependent_status` (client/slave-born), `orphan_risk`, `exposed_to_raids`, `unfavorable_birth_omen` (**culture-dependent**; Mesopotamian omen texts record birth omens; effect is social, not supernatural).
- **Cultural/ritual traits:** `born_to_priestly_line`, `outsider_clan`, `foreign_captive_descendant`.

## 5.6 Birth-survival gate \[DESIGN\]

The first years are the highest-risk period (Section 14). The game offers **two modes**:

- **Classic mode:** Infant/child mortality applied honestly. Dying at age 2 ends the run and shows the legacy summary. Because many players will dislike frequent very-early deaths, include a configurable **Survival Bias** option (`off` / `light` / `story-friendly`) that reduces early childhood death rolls and explains this as a design setting.
- **Story mode (default recommended):** Early childhood death can occur but is limited; the player always gets at least a minimal childhood scene sequence unless Classic mode is chosen.

---

# 6. SOCIAL CLASSES AND LIFE PATHS

Classes are **region- and period-specific** (`SocialClass` records with `regionId`, `validFrom`, `validTo`). Below are the core templates.

## 6.1 Forager societies (SE1–SE3) `(P0 lite)`

&#91;DESIGN + UNCERTAIN\] There are no formal classes. Status is *role and skill based*.

| Status tier | Description | Opportunities | Risks |
| --- | --- | --- | --- |
| **Band member (default)** | Participates in foraging, sharing | Learn hunting/gathering/crafts; marriage across bands | Hunger, injury, predators |
| **Respected specialist** | Skilled hunter, toolmaker, healer, storyteller/artist, ritual specialist | Influence in decisions; better mate choices | Pressure; rivalry |
| **Elder** | Knowledge keeper | Advisory role | Frailty; abandonment risk in famine \[UNCERTAIN, avoid sensationalism\] |
| **Outsider/Captive (rare)** | Excluded person | Possible adoption | Vulnerable; limited resources |

**Rights:** Customary; no written law. **Mobility:** high, depending on skills and social ties. **Political access:** consensus-based band decisions; leadership situational.

## 6.2 Neolithic villages (SE4–SE5) `(P1)`

| Tier | Description |
| --- | --- |
| **Household farmer** | Family working fields and herds; main population |
| **Specialist craftsperson** | Potter, flint-knapper, weaver, copper-worker, bead-maker |
| **Ritual/communal leader** | Elder, shaman-like specialist, ritual guardian \[UNCERTAIN\] |
| **Prestige-lineage** | Households with larger storage, imported goods, richer burials (e.g., Varna) |
| **Dependent/captive** | Rare; some evidence of captives from raids |

## 6.3 Mesopotamia (Early Dynastic → Old Babylonian) `(P0)`

| Class | Lifestyle | Wealth | Rights / Restrictions | Education | Occupations | Marriage | Mobility | Risks / Opportunities |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Royal/ruling family** | Palace | Very high | Near-absolute authority; religious duties | Scribal & military training | King, queen, governor | Political marriages | Fixed | Assassination, coups / policy power |
| **Elite (priests, high officials, large landowners)** | Large urban households; temple estates | High | Legal privilege; litigation access | Scribal school | High priest, *sukkal* (vizier), judge, merchant-prince | Within elite networks | Moderate | Court intrigue / wealth accumulation |
| **Free citizens (awilum, middle)** | Households of 5–15; farm, workshop, shop | Moderate | Can own property, sue, testify; subject to corvée & military service | Some literacy; scribal training if family can pay | Farmer, craftsman, merchant, soldier, junior scribe | Marriage contracts; dowry/bridewealth; adoption | Moderate | Debt, war levy / trade profit |
| **Dependents / clients (mushkenum)** | Palace or temple dependents | Low-moderate | Rations; state-linked; limited autonomy | Rare | Palace/temple worker | Constrained | Low | Dependency / stable ration |
| **Slaves (wardum)** | Household/temple/palace | Property-less | Owned; some legal protections and ability to buy freedom (Old Babylonian laws) | None | Domestic, field, workshop | Limited | Very low (manumission possible) | Abuse; sale / manumission |
| **Debt-bondsmen** | Free person pledged for debt | Low | Time-limited service (e.g., 3 years in Hammurabi's law) | Limited | Labor | Constrained | Low | Hardship / release |

**Women \[FACT-based DESIGN\]:** Can run business, own land, be priestesses (*naditu*, *entu*), serve as brewers/tavern-keepers; legally under father/husband authority but with contract rights. Marriage by contract with dowry.

## 6.4 Egypt `(P0)`

| Class | Description | Notes |
| --- | --- | --- |
| **Pharaoh & royal family** | Divine king; royal women have major ceremonial/political roles | Fixed |
| **High officials/nobles** | Vizier, treasurer, nomarchs, generals, high priests | Often hereditary/clientage |
| **Priests, scribes, specialists** | Temple staff; scribes access administrative careers | Scribal training: 'become a scribe' is a common ancient ideal (e.g., *Satire of the Trades*, Middle Kingdom) |
| **Skilled artisans/soldiers** | Stonemasons, painters, craftsmen, professional troops | Deir el-Medina workmen are a best-documented example |
| **Farmers/laborers** | Bulk of population; corvée in flood season | Seasonal labor (Akhet) on state projects |
| **Slaves/captives** | Mostly war captives, household or temple service (esp. New Kingdom) | Some rights; manumission possible |

**Women:** Own property, inherit, divorce, serve as temple singers, some in administration; **rarely** scribes; queens may hold great power (Hatshepsut as king; Nefertiti prominence).

## 6.5 Other civilizations (compressed templates)

- **Indus \[UNCERTAIN\]:** Class structure not known; evidence of craft specialization and urban planning but no clear palaces/tombs. Use *generic urban roles* (merchant/artisan/farmer/city-worker) with no named class system.
- **Minoan/Mycenaean:** Mycenaean palace hierarchy (wanax, lawagetas, local officials, craft workers, slaves *do-e-ro*). Minoan structure largely unknown \[UNCERTAIN\].
- **Hittite:** King (*labarna/tabarna*), nobility, warriors, free citizens, **slaves**; strong legal system (Hittite Laws).
- **Shang:** King-diviner, aristocratic clans, bronze-casting craftsmen, farmers, servile laborers, sacrificial victims (**sensitive**).
- **Caral/Andes:** Collective labor and monumental architecture; class structure uncertain \[UNCERTAIN\].

## 6.6 Occupations (`Occupation`) — representative catalogue

| Group | Examples | First appears |
| --- | --- | --- |
| Foraging | Hunter, gatherer, fisher, toolmaker, hide-worker, firekeeper | SE1 |
| Ritual/Art | Cave artist, shaman-like ritualist \[UNCERTAIN\], storyteller, singer | SE1 |
| Farming/herding | Farmer, shepherd, cattle-herder, miller | SE4 |
| Craft | Potter, weaver, flint-knapper, stonemason, brewer, coppersmith, bronzeworker, jeweler, carpenter, shipwright | SE4–SE6 |
| Trade | Caravan trader, ship captain, merchant (tamkarum), market vendor | SE5–SE8 |
| Administration | Scribe, tax assessor, granary overseer, canal inspector, temple accountant | SE6 |
| Religion | Priest/priestess, temple singer, diviner, mortuary specialist, embalmer (Egypt) | SE6 |
| Military | Spearman, archer, charioteer, sailor, officer, scout, garrison soldier | SE6–SE8 |
| Labor | Quarry worker, canal digger, builder, porter, miner | SE6 |
| Domestic | Servant, nurse, midwife, cook | SE6 |
| Healing | Folk healer, physician (Egyptian *swnw*; Mesopotamian *asu* and *ashipu*) | SE6 |
| Outside the law | Raider, bandit, tomb robber, smuggler | SE5–SE9 |
| Entertainment | Musician, dancer, acrobat | SE6+ |

**Not available \[DESIGN rule\]:** modern office jobs, banker, lawyer, doctor-as-profession in prehistory, etc.

---

# 7. CHILDHOOD → ADULTHOOD → OLD AGE

## 7.1 Time model \[DESIGN\]

- **Turn = one year** for childhood and routine adult years.
- **Sub-turn = season** (spring/summer/autumn/winter, or Nile flood seasons in Egypt) for key events (planting, harvest, flood, migration, campaign season).
- **Event focus:** the engine can pause a year for a **Life Event Scene** (crisis, opportunity, rite).

## 7.2 Life-stage framework

| Stage | Age (default) | Forager | Farming village | Mesopotamia/Egypt (city) |
| --- | --- | --- | --- | --- |
| **Birth** | 0 | Band-assisted birth; high risk | Midwives, kin | Midwife, rituals; birth omens |
| **Infancy** | 0–2 | Breastfeeding to 3–4 (spacing births) | Shorter weaning with farming (higher fertility) | Wet nurses for elite |
| **Early childhood** | 3–6 | Play-learning, imitation | Light chores | Household tasks |
| **Middle childhood** | 7–12 | Tool use, foraging, tracking | Herding, field work | Apprenticeship; scribal school for some |
| **Adolescence** | 13–17 | Initiation rites \[UNCERTAIN\] | Marriage possible (esp. girls) | Marriage often late teens for men, mid-teens for women |
| **Adulthood** | 18–40 | Full forager roles | Farm/household head | Full careers, war, trade |
| **Maturity** | 40–55 | Elder status emerging | Elder householder | Peak authority |
| **Old age** | 55+ | Few survive; knowledge keepers | Dependents of children | Pensions rare; dependence on kin/temple |

**Demographics note \[FACT-based\]:** Life expectancy at birth in most of this era was roughly **20–35 years**, mostly driven by infant/child mortality; people who survived to adulthood often lived into their 40s–60s. Do not assume 'old at 30'.

## 7.3 Education and training

- **Foragers:** Learning by observation, kin tutoring, apprenticeship in toolmaking, ritual knowledge, oral tradition.
- **Farmers:** Learning on the job, craft apprenticeships, ritual instruction.
- **Mesopotamian scribal school (*edubba*):** Sumerian language, sign lists, math, literature; long, harsh discipline described in the *Schooldays* text. Mostly boys from families who can pay, but exceptions.
- **Egyptian House of Life / scribal training:** hieratic writing, letter-writing, math, religious knowledge.
- **Elite military/royal training:** archery, chariot driving, hunting.
- **Crafts:** workshops and family transmission.

## 7.4 Marriage and family

- **Mesopotamia:** Contractual marriage, often arranged; **dowry** (from bride's family), **bridewealth** (from groom's family) to varying degrees; adultery punished; divorce possible with compensation; childlessness could lead to adoption or concubine.
- **Egypt:** Marriage was largely a social/economic arrangement with no formal religious ceremony; couples set up households; property rights recognized; divorce possible; royal sibling marriage is documented in some contexts (**do not generalise** to commoners).
- **Foragers/Neolithic:** Exogamy rules (marrying outside your band) are likely to prevent inbreeding; specifics \[UNCERTAIN\].
- **Mechanics:** Marriage is an **alliance event** (links kin groups, shifts resources, changes status), not just a romance milestone. Romance exists as an *affection* modifier (love poetry exists in Egypt and Sumer).

## 7.5 Work and career progression

- Careers are mostly **inherited or kin-arranged**, but talent, patronage and events can move a person.
- Foragers: skill and reputation progression.
- Cities: apprenticeship → journeyman → master/household head, or scribe → senior scribe → official.
- Military: levy → professional soldier → officer (New Kingdom Egypt, Hittite).

## 7.6 Aging and death

- Health decline follows Section 14; old age shifts roles to advisory and care dependence; widows may face poverty unless kin or temple support.
- Funerary practices vary: Neolithic burial under house floors (Çatalhöyük), megalithic tombs, Mesopotamian burial beneath house or in family tomb; Egypt's mummification and tombs; cremation rare then (some Bronze Age Europe urnfield traditions, c. 1300+ BCE).

## 7.7 Differences matrix

| Dimension | Effect |
| --- | --- |
| **Region** | Determines risks (flood, drought), occupations, norms |
| **Class** | Education access, marriage choices, risk exposure |
| **Gender** | Role access, labor patterns; **never hard-code modern gender norms** |
| **Wealth** | Nutrition, medical access, marriage market |
| **Occupation** | Injury and disease profile, mobility, income type |
| **Time period** | Technology, institutions, conflict intensity |

---

# 8. GAME STATS

## 8.1 Design principles \[DESIGN\]

1. **Few stats, strong meaning.** Do not use the modern 'happiness/looks/smarts' triad blindly.
2. **Context-sensitive:** Stats are *visible* or *hidden* depending on character knowledge, culture, and mode.
3. **Two layers:** Core stats (all eras) and **context stats** (activated by region/occupation).

## 8.2 Core stats (P0)

| Stat | Represents | Range | Changes by | Affects | Visible? |
| --- | --- | --- | --- | --- | --- |
| **Health** | Physical condition & disease resistance | 0–100 | Age, disease, injury, nutrition, medical care, environment | Survival rolls, work capacity, fertility | Yes (qualitative band: *robust / well / weak / ailing / near death*) |
| **Nutrition (Food Security)** | Reliability of food supply for you/household | 0–100 | Harvest, season, wealth, famine, war | Health decay, fertility, child survival | Yes (qualitative) |
| **Strength/Endurance** | Physical labor & combat capability | 0–100 | Age, labor type, training, injury | Labor output, hunting, military | Yes |
| **Wits (Intelligence/Craft Knowledge)** | Learning, memory, problem solving | 0–100 | Education, experience, health | Skill gain rate, administration, trade | Yes (as 'Wits') |
| **Skill set** | Individual skills (see 8.4) | 0–100 each | Practice, mentorship | Career success, event options | Yes |
| **Reputation** | How the community regards you | −100 to +100 | Deeds, gossip, rituals | Marriage, loans, jobs, justice | Yes (descriptive) |
| **Standing (Social Status)** | Your position in the local hierarchy | 0–100 tied to class | Class, office, wealth, marriage | Access to roles, legal outcomes | Partly (rank titles) |
| **Kin Support (Family Standing)** | Strength of your kin network | 0–100 | Marriage, siblings, feuds, deaths | Safety net, help in crisis, political leverage | Yes |
| **Resources (Wealth)** | Material means in culture-appropriate form | See Section 9 | Work, trade, tribute, disaster | Food, goods, status, security | Yes (as items, not number) |
| **Piety/Ritual Standing** | Religious/ritual esteem (culture-defined) | 0–100 | Rituals, offerings, omens | Social acceptance, priestly roles, resilience events | Yes (as description) |

## 8.3 Context stats (P1)

| Stat | Active when | Meaning |
| --- | --- | --- |
| **Influence** | Adult in polity | Ability to move decisions; scaled by office, patronage |
| **Political Power / Office Rank** | In bureaucracy/state | Formal rank in temple, palace, or army |
| **Military Ability** | Combat roles | Combat skill, leadership |
| **Survival/Wilderness** | Forager/nomad/travel | Tracking, navigation, shelter |
| **Trade Network** | Merchant | Contacts across cities |
| **Literacy** | Writing cultures | 0–100; gate for scribe/official careers; **not available in prehistory** |
| **Fertility/Pregnancy status** | Female adults | Pregnancy and birth risk |
| **Stress/Morale** | All | Mental strain; hidden as a number but shown as mood |
| **Notoriety/Criminality** | Crime paths | Legal consequences risk |

## 8.4 Skills (`Skill`) \[DESIGN\]

Skills are tagged by **region/period availability**:

`foraging, hunting, tracking, toolmaking, fishing, animal_husbandry, farming, irrigation, pottery, weaving, metalworking_copper, metalworking_bronze, masonry, carpentry, boatbuilding, trade_negotiation, scribal_writing, accounting, mathematics, medicine_folk, ritual_knowledge, oratory, leadership, archery, spear_combat, chariotry, siegecraft, seafaring, caravan_navigation, diplomacy`

**Rule:** A skill can only be learned if the **technology exists** and a **teacher or opportunity** exists in the character's context.

## 8.5 Stat visibility policy

- Show **qualitative labels** by default rather than raw numbers to avoid a modern spreadsheet feel; a **Debug/Detail mode** shows numbers.
- Hidden stats (affect outcomes without direct display): *latent disease*, *hidden enemies*, *genetic traits*, *cultural omen standing*.

## 8.6 Stat update rules (summary) \[DESIGN\]

```text
Each year:
  Nutrition      = f(harvest_state, season_outcomes, household_resources, region_famine_flag, status)
  Health delta   = baseline_age_decay + disease_events + injury - care_modifier + nutrition_effect
  Reputation     = decays toward neutral unless reinforced; changes by deeds, rituals, scandals
  Kin Support    = modified by marriage, births, deaths, feuds, obligations kept/broken
  Standing       = class_base + office + marriage + wealth_adj + reputation_adj (bounded by class)
```

---

# 9. ECONOMY

## 9.1 Representation of wealth \[DESIGN\]

Do **not** use a single modern 'money' number across the era. Represent wealth as a **portfolio** (`HouseholdAssets`) plus a **Wealth Band** for UI:

```text
HouseholdAssets {
  food_stores          (months of food)
  land_plots           (area & quality; where relevant)
  livestock            (count & types)
  tools_goods          (quality tiers)
  tradeable_goods      (barley, silver, copper, textiles etc.)
  silver_or_equivalent (units where silver exists)
  obligations/debts    (to whom, due when)
  patronage_claims     (rights to rations, temple land)
}
WealthBand = f(assets) in {destitute, poor, modest, comfortable, wealthy, elite}
```

## 9.2 Exchange systems by period

| Period | System |
| --- | --- |
| SE1–SE3 | **Reciprocity & sharing**; prestige goods exchange (shell, obsidian); no markets |
| SE4–SE5 | **Gift exchange/barter**; storage; prestige goods; ritual feasting |
| SE6–SE7 Mesopotamia | **Barley and silver** as standard values (silver by weight: shekel approx. 8.3 g; mina = 60 shekels; talent = 60 minas); barley ration standard; credit & debt contracts on clay tablets; interest rates documented (commonly around 20% on silver loans and 33% on grain in Old Babylonian texts, varying) |
| Egypt | **No coinage**. **Deben** (roughly 91 g in the New Kingdom; copper, silver and gold used by weight) as accounting unit; barter and ration payments (grain, beer, bread) for workers at Deir el-Medina |
| SE8 | Ingots (copper 'oxhide ingots' of around 25 kg), silver, gold, tin; palace-managed trade; the Uluburun wreck shows scale |

**Coinage did not exist** until c. 600 BCE (Lydia). There was no banking or stock market; credit existed through temples/merchants (Mesopotamia).

## 9.3 Food and subsistence

- **Foragers:** meat, fish, plants, nuts; seasonal scarcity; storage in cold or dry conditions; mobility to avoid depletion.
- **Farmers:** cereal-heavy diet (barley, wheat/millet/rice), legumes, dairy, beer, bread; periodic famine risk.
- **Elite diets:** meat, wine (Egypt/Levant), beer, honey, imports.
- **Famine mechanic:** see Section 14.

## 9.4 Land, property and taxes

- **Land:** In Mesopotamia, much land belongs to temples, palaces, and private landowners; sale deeds exist from the 3rd millennium; irrigation rights matter. In Egypt, the king nominally owns the land; temples and estates hold large tracts; farmers pay grain taxes.
- **Taxes:** Grain, labor (corvée), military service, flocks, tribute from conquered peoples.
- **Tribute:** Imperial states extract tribute; local rulers may be client kings.
- **Debts:** Mesopotamian debt cycles; periodic *misharum* edicts (royal debt-cancellation) provide a mechanic for 'amnesty events'.

## 9.5 Employment and labor

- Labor is **seasonal** (sowing, harvest, flood-season state projects).
- Pay in **rations** (barley, beer, bread, oil, cloth).
- **Workshops** in cities (palace/temple/private).
- **Slavery** exists (war captive, debt-bondage, purchased slaves).

## 9.6 Risks and opportunities

**Risks:** harvest failure, flood, blight, locusts, raids, tax shocks, debt spiral, trade disruption, collapse.

**Opportunities:** trade expeditions, craft specialization, temple patronage, military loot, land purchase, scribal promotion, marriage alliance.

## 9.7 Economy simulation \[DESIGN\]

- Region-level `HarvestState` per year: `{catastrophic, poor, normal, good, bumper}` influenced by climate state (flood height, rainfall), pests, war, and labor.
- `PriceIndex` (relative grain-to-silver value) is a **soft modifier**, not a market simulation, to avoid fake precision.
- Trade routes are **graph edges** with `risk`, `duration`, `profit`; see Section 4.3.

---

# 10. POLITICS AND POWER

## 10.1 Political structures by period

| Period | Structure |
| --- | --- |
| Forager | **Egalitarian/flexible leadership** by skill, age, persuasion |
| Neolithic | Village councils, lineage heads, possible big-man or chiefly emergence \[UNCERTAIN\] |
| Early states | **City-state kingship** (Sumer: *ensi*, *lugal*), temple-palace dual power; Egyptian **divine kingship** |
| Territorial empires | **Royal bureaucracies** with provincial governors; client kings; mass levy |
| Late Bronze Age | **Great King diplomacy**, vassal treaties (Hittite treaty format), palace elites |

## 10.2 Leadership, succession and legitimacy

- **Egypt:** Royal succession (typically son of the king; legitimacy via divine ancestry, Ma'at, rituals); crises when no clear heir; co-regencies in the Middle Kingdom; female king Hatshepsut as exceptional.
- **Mesopotamia:** The Sumerian King List (legendary, partly historical) says kingship 'descended from heaven'; dynastic succession with legitimation via temples; conquest and usurpation common.
- **Hittite:** Succession by designated heir; the Telepinu edict (c. 1500) attempted to regularise it after crises.
- **Shang:** Brother-to-brother and father-to-son patterns; king as chief diviner.
- **Mechanic:** `LegitimacyScore` per ruler; changes through rituals, victories, harvests, disasters. Famine and military defeat reduce legitimacy, as does breaking cultural norms.

## 10.3 Factions

Palace vs. temple; provincial governors vs. the crown; priesthood factions; military officers; merchant associations; foreign-sponsored parties; reformers vs. traditionalists (e.g., Akhenaten vs. the Amun priesthood).

## 10.4 Law and authority

- Law collections: **Ur-Nammu (c. 2100)**, **Lipit-Ishtar (c. 1930)**, **Eshnunna**, **Hammurabi (c. 1754)**, **Hittite laws**, Middle Assyrian laws. Features: compensation, talion-style punishments that depend on class, different penalties for awilum vs mushkenum vs slave, ordeal by river for certain accusations.
- Egypt: vizier's courts; *Ma'at* ideology; local *kenbet* councils; documented trials (e.g., tomb-robbery papyri).
- **Foragers:** customary law; punishment via ostracism; blood feuds \[UNCERTAIN\].

## 10.5 Ordinary player interaction (`PoliticalAction`)

| Action | Available to | Effect |
| --- | --- | --- |
| Serve on a council or jury | Free adults (culture-dependent) | Influence, reputation |
| Petition the ruler/temple | Any with access | Redress, favors |
| Pay/avoid taxes/corvée | All | Wealth vs. legal risk |
| Join factions or patron networks | Adults | Opportunity, risk |
| Rebel/flee/migrate | Dissatisfied population | Possible emigration, outlaw life |
| Serve as informant/bureaucrat | Literate | Career path |
| Marriage alliance | Families | Kin Support, Standing |
| Participate in ritual/festival offices | Elite | Piety, Influence |
| Testify in court | Free persons | Justice outcomes |

## 10.6 Rebellion and diplomacy

- **Rebellions:** Ration strikes and work stoppages are documented at Deir el-Medina (c. 1157 BCE, under Ramesses III), among the earliest recorded labor strikes; provincial revolts followed the fall of Akkad.
- **Diplomacy:** Letters (Amarna), treaties (Egypt–Hittite), marriage alliances (e.g., Egyptian–Mitanni; Hittite–Egyptian marriage c. 1245), ambassadors/envoys.
- **Player entry points:** envoy, scribe-translator, merchant courier, marriage-hostage, soldier in treaty campaigns.

---

# 11. WAR AND CONFLICT

## 11.1 Conflict types

| Type | Scale | Eras |
| --- | --- | --- |
| **Interpersonal violence/feud** | Individuals/clans | All |
| **Raiding** | Small groups; cattle, captives | SE4–SE9 |
| **Inter-band conflict** | Small | SE1–SE3 \[UNCERTAIN prevalence\] |
| **City-state border war** | Thousands | SE6 |
| **Imperial conquest** | Tens of thousands | SE7–SE8 |
| **Great-power campaigns** | Kadesh: ancient sources imply tens of thousands per side; exact numbers unknown | SE8 |
| **Sieges** | City-level | SE6–SE9 |
| **Civil war/revolts** | Regional | SE6–SE9 |
| **Naval/piratical conflict** | Sea Peoples, Aegean raids | SE8–SE9 |

## 11.2 Who fights and recruitment

- **Foragers:** Adults of the band as needed; informal.
- **Neolithic:** Village defenders; raid parties.
- **Early states:** **Levy** of free citizens; palace retainers; a professional core appears with Akkad and in New Kingdom Egypt.
- **Elite warrior class:** chariot nobility (maryannu).
- **Mercenaries and foreign auxiliaries:** Nubian *Medjay*, Shardana, Libyan troops in Egypt.
- **Women:** Rare as warriors; exceptions in royal/elite context (Fu Hao). Do not allow modern-style gender-equal armies.

## 11.3 Weapons and tactics (by period)

| Period | Weapons/Tactics |
| --- | --- |
| SE1–SE3 | Spears, spear-throwers, bows (later), clubs, slings, stone points |
| SE4–SE5 | Bows, maces, clubs, slings; village palisades |
| SE6 | Copper/bronze spears, daggers, axes, shields, early body armor (leather/bronze), solid-wheeled battle carts; dense spear formations are depicted on the Stele of the Vultures (c. 2450) |
| SE7 | Composite bows (c. 2000+), battle-axes, early chariots |
| SE8 | **Light two-horse spoked-wheel chariots (c. 1700–1600+)**, composite bow, scale armor, bronze swords, siege ramps; Hittite three-man chariots; infantry still the bulk of armies |

**No cavalry** as a major arm until the Iron Age; **iron weapons were not in common use** (iron is rare before c. 1200–1000 BCE).

## 11.4 Risks, rewards and consequences

- **Risks:** Death; wounds (infection often fatal); capture (slavery); loss of family property; disease in camps; famine due to sieges.
- **Rewards:** Loot, land grants, promotion, captives, status, honors (Egypt's 'Gold of Valor').
- **Prison:** No long-term prison system in the modern sense; punishments by fines, labor, mutilation, exile, execution; prisons mainly held debtors and the accused.
- **Territory change:** Conquests change tribute, ruler, and the status of captives and local elites; mass deportations (Hittite and later Assyrian practice).

## 11.5 Conflict simulation \[DESIGN\]

Do not simulate battles tactically. Use **Campaign Event Chains**:

```text
Campaign {
  trigger, sides, region, season_window, scale,
  player_role_options[], outcomes[], historical_anchor?
}
Player role -> Survival roll (Strength, Military Ability, Health, equipment, luck, role risk)
            -> Outcome tags {wounded, captured, decorated, looted, killed, unscathed}
            -> Downstream effects (Standing, Wealth, Reputation, Kin Support, 'Burden' status)
```

The campaign's *macro result* (e.g., the ambiguous outcome of Kadesh) is **historically fixed** unless divergence criteria are met (Section 19). The player's role affects only **personal fate** by default.

---

# 12. RELIGION, CULTURE AND SOCIETY

## 12.1 Principle \[DESIGN\]

Religion in this era is **embedded in daily life** (agriculture, kingship, healing, law, death). Model it as a **social and practical system** (ritual obligations, calendar, legitimacy, taboos), not as a modern 'faith choice' menu. For T2/T3 cultures we do **not** know the beliefs; the game depicts *material practices* (burials, monuments, figurines, art) and flags interpretations as \[UNCERTAIN\].

## 12.2 Belief systems by context

| Context | Known/likely practices | Evidence |
| --- | --- | --- |
| Upper Paleolithic | Ritual burials, ornaments, cave art, figurines; animal-focused symbolism; interpretations (shamanism, hunting magic, initiation) are **hypotheses** | T3 |
| Göbekli Tepe / early Neolithic | Monumental T-pillars with animal reliefs; communal feasts; skull cults (plastered skulls in PPNB) | T2, interpretation \[UNCERTAIN\] |
| Çatalhöyük | Burial beneath house floors; wall paintings and bull-horn installations; ritual meaning \[UNCERTAIN\] (the 'Mother Goddess' thesis is **contested**) | T2 |
| Megalithic Europe | Passage tombs aligned to solstices (Newgrange: winter solstice sunrise), Stonehenge (solstice alignment; funerary and ceremonial use) | T2 |
| Mesopotamia | Polytheism; each city has a patron deity; temples as households of gods; cult statues fed/clothed; divination (extispicy, omens), exorcism (*ashipu*), laments; underworld (Kur/Irkalla) bleak | T1 |
| Egypt | Polytheism and divine kingship; Ma'at; mortuary religion (Pyramid Texts, Coffin Texts, Book of the Dead); festivals (Opet, Wepet-Renpet); oracles of deities in New Kingdom; Atenism (Akhenaten) | T1 |
| Indus | Seals with animal & composite figures; 'proto-Shiva' seal interpretation **contested**; Great Bath ritual role \[UNCERTAIN\] | T2 |
| Minoan/Mycenaean | Goddess/priestess iconography, peak sanctuaries (Minoan); Mycenaean gods with later-Greek names appear in Linear B (Zeus, Hera, Poseidon, Athana Potnia) | T2/T1 |
| Hittite | 'Thousand gods' absorbing Hattian, Hurrian, Luwian deities; festival cycles; royal ritual duties | T1 |
| Shang | Ancestor worship, oracle-bone divination to Di and ancestors, bronze ritual vessels, human/animal sacrifice | T1 |
| Andes/Mesoamerica | Platform mounds (Caral), Olmec colossal heads and jaguar iconography; beliefs \[UNCERTAIN\] | T2 |

## 12.3 Customs, festivals, taboos

- **Seasonal cycle:** planting/harvest/flood/solstice festivals drive the **event calendar** (e.g., Mesopotamian Akitu spring festival; Egyptian Opet festival during the flood season; midwinter/midsummer gatherings at monuments).
- **Funerary customs:** key identity event; neglecting ancestors/burial rites is a serious taboo in Egypt, Mesopotamia and Shang China.
- **Hospitality norms:** widely attested in Near Eastern texts; used for travel events.
- **Oaths and ordeals:** swearing by gods carried legal force; river ordeal in Mesopotamia.
- **Purity/pollution concepts:** documented in Mesopotamia/Egypt/Hittite texts; used for ritual-illness events.
- **Taboos (illustrative; culture-tagged):** breaking oaths; neglect of the dead; incest rules (variable); offending a god's temple; sorcery accusations (*kishpu* in Mesopotamia).

## 12.4 Family and community

- **Forager:** bands linked by kin, reciprocity (sharing norms strongly enforced), ritual gatherings of multiple bands (aggregation seasons).
- **Village:** household clusters, communal granaries/feasts; elders' councils.
- **City:** wards/neighborhoods (Mesopotamia), guild-like associations (karum), temple communities, workmen's villages (Deir el-Medina with its own *kenbet* court).

## 12.5 Culture elements that affect gameplay (P0)

1. **Ritual calendar** → time-based events and obligations.
2. **Kin obligations** → help/burden mechanic (`Kin Support`).
3. **Divination/omens** → social decision-making events (the *belief* has social effect; outcomes follow normal probability).
4. **Funerary duty** → inheritance and legacy.
5. **Temple patronage** → employment and rations.
6. **Law/status distinctions** → different consequences by class.

## 12.6 Content-sensitivity toggles \[DESIGN\]

`sensitiveContent` flags with default levels: *Mild/Standard/Mature*.

- **Human sacrifice** (Shang royal tombs, possible Mesopotamian Royal Cemetery of Ur retainers c. 2600; interpretation debated): depicted briefly and non-graphically, with historical context.
- **Slavery & captivity**: depicted as structural and consequential; no 'slave-owner' gameplay fantasy as a reward loop.
- **Violence against children/infanticide**: referenced only as a historical risk in text where attested; **no gameplay choice that rewards it**.
- **Sexual violence**: not depicted; referenced only as a general risk to captured persons in a non-explicit way, or omitted by default.

---

# 13. TECHNOLOGY AND KNOWLEDGE

## 13.1 Technology gating \[DESIGN\]

Each `Technology` has `regionalAvailability[{regionId, from, to, diffusionCurve}]`. A technology unlocks **actions, items, occupations, risks**. Never allow tech from an unaligned region/time (e.g., chariots in 3000 BCE).

## 13.2 Timeline by domain

| Domain | SE1–SE3 (to c. 8500) | SE4–SE5 (c. 9600–3600) | SE6–SE7 (c. 3600–1600) | SE8–SE9 (c. 1600–1000) |
| --- | --- | --- | --- | --- |
| **Transport** | Walking; dugout/boats (Sahul crossing ≥50k BCE); sledges | Domesticated cattle/donkey for packing; wheeled vehicles c. 3500; sail boats | Donkey caravans; ox-carts; Nile & Gulf sea trade; sail boats; first horses harnessed (chariots c. 2000+) | Chariots; seagoing merchant ships (Uluburun); roads in palace states; **camel use not yet widespread** |
| **Communication** | Oral, symbol/art, trade networks; tokens later | Pottery/seal symbols; **tokens** (Near East) | Writing (cuneiform, hieroglyphs); clay tablets, papyrus; seals; messengers; royal roads (later) | Alphabetic writing emerges (Proto-Sinaitic c. 1850–1500 BCE, Ugaritic cuneiform alphabet c. 1400); diplomatic letters; Linear B; oracle bones |
| **Agriculture** | Foraging; managed landscapes (fire) | Domestication; sickles; grinding stones; terracing | Ard plow; irrigation canals/basins; shaduf (c. 2000?); date palm cultivation; vineyards | Iron not yet; widespread irrigation; olive & vine in Mediterranean |
| **Medicine** | Herbal & empirical care; trepanation evidence (Neolithic) | Folk remedies; midwifery | Egyptian medical papyri (Edwin Smith c. 1600 BCE surgical, Ebers c. 1550 BCE); Mesopotamian diagnostic handbooks (Sakikku c. 1600?) | Continued; magico-medical mix |
| **Weapons** | Spear, atlatl, bow | Bow, sling, mace | Bronze weapons, composite bow, battle cart | Chariot, scale armor, bronze swords, early iron (rare) |
| **Construction** | Hide tents, mammoth-bone huts, stone-lined hearths | Mudbrick houses, megaliths, plaster | Ziggurats, mudbrick cities, pyramids (stone), mortar and baked brick, planned drains (Indus) | Palaces, fortification walls, cyclopean masonry (Mycenae), rock-cut tombs |
| **Manufacturing** | Flaked stone, bone/antler, hide clothing, ochre | Pottery, weaving (spindle, loom), copper working | Bronze casting (lost-wax), glass (c. 2500+ beads; vessels c. 1500), faience, kilns, wheel-thrown pottery (potter's wheel c. 3500–3000) | Large-scale glass, ivory, ship-building, early ironworking (Anatolia, Cyprus) |
| **Education** | Oral apprenticeship | Craft/ritual apprenticeship | Scribal schools | Scribal schools, palace training |
| **Science/knowledge** | Seasonal & lunar tracking (tally marks, Ishango bone c. 20,000 BCE \[interpretations vary\]), astronomical alignments | Calendar knowledge; megalith alignments | Base-60 mathematics (Mesopotamia; Plimpton 322 c. 1800 BCE), base-10 geometry (Egypt Rhind papyrus c. 1550), surveying, astronomical omen observation (Venus tablet of Ammisaduqa c. 1600) | Star catalogues; refined calendars |

## 13.3 Gameplay translation

- **Technology determines accessible actions and risks** (e.g., irrigation unlocks bumper harvest events and salinization risk; chariots unlock charioteer careers and charge events).
- **Knowledge isn't global:** a Mesopotamian scribe knows base-60 math; a forager does not need it. Use **knowledge nodes** with transmission through teachers and trade.
- **No anachronisms rule:** The engine rejects content tagged with technology outside the valid regional range.

---

# 14. HEALTH, DISEASE AND SURVIVAL

## 14.1 Demographic baseline \[FACT-based; ranges, not precise\]

- **Infant mortality (first year):** commonly \~20–40% in pre-modern agrarian societies; for foragers estimates vary, often \~25–35%; \~40–60% of children died before adulthood in many contexts \[UNCERTAIN; high variance\].
- **Life expectancy at birth:** \~20–35; **adult life expectancy at 15** ≈ another 25–40 years.
- **Maternal mortality:** much higher than today; childbirth is among the leading causes of death for young women.
- **Fertility:** Foragers \~4–6 births per woman (long spacing); farmers could reach \~6–8 (shorter weaning, more food), with high mortality.

## 14.2 Disease landscape

| Context | Common threats |
| --- | --- |
| Foragers | Injuries, parasites, infections, hunger, hypothermia, predation, limited epidemic disease (small groups) |
| Neolithic villages | Zoonotic infections from livestock, tuberculosis-like diseases, dental disease (cereal diet), anemia, dysentery, parasites; crowding spreads infections |
| Early cities | Typhus-like and dysentery epidemics, malaria (Nile/Mesopotamia/Indus floodplains; documented *possible* in Egypt), schistosomiasis (Nile; evidence in mummies), smallpox (evidence debated in Egypt, e.g., Ramesses V's mummy lesions), plague-like outbreaks (Bronze Age *Yersinia pestis* detected in Eurasian burials c. 3000 BCE+; **historical impact debated**), leprosy \[UNCERTAIN\] |
| Late Bronze Age | Hittite plague c. 1320s BCE (documented in texts; cause uncertain), war epidemics |

**Rule:** Do not use modern disease names for ancient texts as certainties; present them as *'a wasting fever'*, *'the plague of the god Nergal'*, etc., plus an internal `diseaseModelTag` for simulation.

## 14.3 Medical systems and limits

- **Egypt:** Skilled physicians (*swnw*) with empirical wound care documented in the Edwin Smith Papyrus; spells and drugs; dentists; specialist doctors recorded.
- **Mesopotamia:** Two parallel traditions: *asu* (herbal/surgical) and *ashipu* (diagnosis by omen/exorcism); Hammurabi's laws regulate surgeon fees and malpractice penalties.
- **Foragers/Neolithic:** Folk healer/ritual specialists; herbs; bone-setting; trepanation had survivors.
- **Limits:** no germ theory, no antibiotics, no vaccines, no anaesthesia; wound infection, childbirth complications and dental abscesses are often fatal.
- **Mechanic:** `CareQuality` modifier by wealth/region/occupation reduces some risks but never eliminates them. Magic/ritual care affects **morale and social support**, not literal cure rolls (unless a culture-specific *placebo/support* mechanic is clearly labelled).

## 14.4 Injuries and environmental risks

- **Injury sources:** hunting accidents, falls, animal attacks, farming accidents, construction accidents, war wounds, crop/granary fires, boating accidents, snakebite, drowning.
- **Environmental:** flooding (Tigris/Euphrates, Indus, Nile), drought, locusts, earthquakes (e.g., Late Bronze Age Aegean/Anatolia), volcanic events (Thera c. 1600 BCE), extreme cold (Ice Age winters), heat.
- **Climate shocks to anchor (fixed or climate-flagged):** Younger Dryas (c. 10,800–9,700 BCE), 8.2 kiloyear cold event (c. 6200 BCE), 5.9 kiloyear event / Saharan aridification (c. 4000–3000 BCE, 'Green Sahara' ends), **4.2 kiloyear event (c. 2200 BCE)**, drought phases around c. 1200 BCE (eastern Mediterranean; scale debated).

## 14.5 Sanitation

- Foragers move away from waste. Early cities: drains and wells (Indus: advanced drainage, private bathing rooms); Mesopotamia and Egypt: canal/river water use with contamination risk; Minoan palaces had drainage and terracotta pipes.
- **Mechanic:** `SanitationLevel` per settlement affects disease exposure.

## 14.6 Gameplay translation \[DESIGN\]

```text
Each yearly turn:
  risk_pool = base_age_risk + occupation_risk + region_risk + season_risk + event_risk
  modifiers = nutrition, care_quality, sanitation, status, trait_effects
  death_roll if risk_pool(modified) passes threshold, with 'near-death scene' option for survivable outcomes
```

Implementation guidance:

- Use **age-specific hazard curves** per region type (forager / village / city) with parameters in data, not code.
- Give the player **meaningful agency**: seek healer, move house, change diet, travel to a temple, avoid risky work.
- Prefer **injury and illness states** (`wounded`, `feverish`, `weakened`, `malnourished`, `lame`) over opaque health numbers, to create story hooks and recoverable arcs.

---

# 15. HISTORICAL EVENTS

## 15.1 Event record template

Use this schema for every event in the database (details in Section 23).

```text
Event Name
Date / Date Range            (with confidence interval)
Location
Historical Cause
Historical Outcome
Important People
Affected Groups
Player Relevance             (who can encounter it, at what scale)
Possible Player Involvement
Possible Alternative Outcomes (divergence branches; only if allowed)
Long-Term Consequences
Evidence tier + chronology note
Fixed? (fixed / soft-fixed / branchable)
Scale (Background / Local / Regional / Major)
```

## 15.2 Event scale definitions

| Scale | Meaning | Player contact |
| --- | --- | --- |
| **Background** | World/climate/tech trends the player lives within | Ambient text, modifiers |
| **Local** | Village/city-level incidents | Direct involvement likely |
| **Regional** | Wars, famines, plagues affecting a region | Involvement via role/location |
| **Major** | Era-defining events | Participation limited by position; high fixed-ness |

## 15.3 Background events (P0/P1)

| ID | Event | Date | Notes |
| --- | --- | --- | --- |
| BG01 | Last Glacial Maximum | c. 26,500–19,000 BCE | Cold/dry pressure; refugia; forager mobility; fixed climate state |
| BG02 | Holocene warming & end of Younger Dryas | c. 9700 BCE | Opens farming possibilities |
| BG03 | Neolithic spread (Near East → Europe/N. Africa/S. Asia) | c. 9600 → 4000 BCE | Wave-of-advance with local adoption and migration |
| BG04 | Climate crises (8.2 ka, 5.9 ka, 4.2 ka) | see 14.4 | Regional harvest/drought flags |
| BG05 | Diffusion of bronze & the tin trade | c. 3300–2000 BCE | Wealth and conflict pressure |
| BG06 | Spread of chariot warfare | c. 2000–1600 BCE | Military technology shift |
| BG07 | Late Bronze Age Collapse (systemic) | c. 1200–1150 BCE | See M-events |

## 15.4 Local events (templates; many procedural) (P0)

| ID | Event | Where/when | Player involvement |
| --- | --- | --- | --- |
| L01 | Village granary fire | Neolithic+ | Rescue/blame/loss |
| L02 | Canal dispute between neighboring villages/cities | Mesopotamia/Egypt | Witness/testify/fight |
| L03 | Debt-cancellation edict (*misharum*) | Old Babylonian | Gain/loss depending on class |
| L04 | Local flood shortfall | Egypt/Mesopotamia | Hardship, charity, relocation |
| L05 | Temple festival and feast | City | Participation, opportunity |
| L06 | Workmen's ration delay at Deir el-Medina | c. 1157 BCE | Strike participation |
| L07 | Raiding party at a frontier village | any | Defend/flee/negotiate |
| L08 | Caravan arrives or disappears | trade hub | Merchant career hook |

## 15.5 Regional events (P0–P1)

| ID | Event | Date | Location | Cause → Outcome | People | Fixed-ness | Player role | Alt outcomes | Consequences |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R-01 | Lagash–Umma border conflict | c. 2450–2350 | S. Mesopotamia | Boundary/water rights dispute → Eannatum of Lagash wins (Stele of the Vultures); long feud; ends with Urukagina/Lugalzagesi | Eannatum, Entemena, Urukagina, Lugalzagesi | Soft-fixed | Soldier, farmer on border, scribe | Umma wins an early round; truce longer | Weakens Sumerian cities, enabling Sargon |
| R-02 | First Intermediate Period famine & fragmentation | c. 2181–2055 | Egypt | Low floods (4.2 ka link debated), weak central rule → nomarch autonomy | Ankhtifi (nomarch, famine inscription) | Soft-fixed | Farmer, local official | Shorter instability | Rise of Theban/Herakleopolitan rivalry |
| R-03 | Collapse of Ur III | c. 2004 | S. Mesopotamia | Famine, Amorite pressure, Elamite sack → end of Ur III | Ibbi-Sin | Fixed (major outcome) | Official, soldier, refugee | Delay at most | Isin–Larsa; Amorite dynasties |
| R-04 | Hyksos rule & expulsion | c. 1650–1550 | Egyptian Delta/Nile | Levantine rulers dominate N. Egypt; Theban counter-conquest | Kamose, Ahmose I | Soft-fixed | Delta resident, Theban soldier | Longer Hyksos rule | New Kingdom empire |
| R-05 | Thera eruption & Minoan decline | c. 1630–1500 (date debated) | Aegean | Volcanic eruption (+ later fires, Mycenaean takeover) | — | Fixed (event), branchable (aftermath) | Islander, seaman | N/A | Mycenaean dominance |
| R-06 | Hittite plague | c. 1320s | Anatolia/Levant | Spread via war captives; kills Suppiluliuma I and heir | Suppiluliuma I, Mursili II | Fixed | Anyone | Severity | Hittite weakening |
| R-07 | Amarna reform | c. 1353–1332 | Egypt | Akhenaten promotes Aten → temple conflict; reversal | Akhenaten, Nefertiti, Tutankhamun, Horemheb | Fixed (reversal) | Artisan, priest, official | Atenism persists (major divergence) | Restoration of Amun cult |
| R-08 | Harappan deurbanization | c. 1900–1300 | Indus | Climate/river/trade shifts (debated) | — | Soft-fixed (multi-cause) | Resident | Slower decline | Regional shift east and south |

## 15.6 Major historical events (P0–P1)

| ID | Event | Date | Location | Cause → Outcome | People | Player relevance | Involvement | Alt outcomes | Long-term |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| M-01 | Neolithic transition at Göbekli Tepe / Levant | c. 9600–8000 | SE Anatolia/Levant | Climate + sedentism → farming | — (anonymous) | Defines SE3–SE4 | Labor/ritual participation | Slower farming adoption | Settled society |
| M-02 | Invention of writing | c. 3400–3200 | Uruk | Administrative complexity → cuneiform | Anonymous | Gate for T1 era | Scribe | None (fixed) | Records, bureaucracy |
| M-03 | Unification of Egypt | c. 3100 | Nile Valley | Predynastic rivalry → Narmer | Narmer | Birth era T1 begins | Soldier/official | Delayed unification (major divergence) | Pharaonic state |
| M-04 | Great Pyramids of Giza | c. 2600–2500 | Giza | Royal ideology + state labor | Khufu, Khafre, Menkaure | Common worksite player role | Workman/overseer/priest | Different pyramid forms | Monumental culture |
| M-05 | Rise of Sargon & Akkadian Empire | c. 2334–2154 | Mesopotamia | City-state wars → first empire | Sargon, Naram-Sin, Enheduanna | High | Soldier, scribe, subject | Sumerian resistance succeeds longer | Imperial model |
| M-06 | Collapse of Akkad | c. 2154 | Mesopotamia | Climate, rebellion, Gutian incursions | Shar-kali-sharri | High | Refugee/soldier | Longer survival | Ur III revival |
| M-07 | Hammurabi's rise & code | c. 1792–1750 | Babylon | Expansion over Larsa/Mari | Hammurabi | High | Citizen/soldier/litigant | Larsa survives (major divergence) | Babylonian primacy |
| M-08 | Thutmose III and Megiddo | c. 1457 | Levant | Canaanite coalition revolt | Thutmose III | High | Soldier/envoy | Coalition holds | Egyptian empire |
| M-09 | Battle of Kadesh | c. 1274 | Orontes valley | Egyptian–Hittite rivalry → inconclusive; both claim victory | Ramesses II, Muwatalli II | Very high | Soldier/charioteer/scribe | Egyptian rout (divergence) | Treaty c. 1259 |
| M-10 | Egyptian–Hittite treaty | c. 1259 | Pi-Ramesse/Hattusa | Mutual threat from Assyria | Ramesses II, Hattusili III | High | Envoy/scribe | Continued war | Peace and diplomacy |
| M-11 | Late Bronze Age Collapse | c. 1200–1150 | E. Mediterranean | Multi-causal \[UNCERTAIN\] | Ramesses III | Very high | Anyone | Shorter/lesser collapse (major) | New political map |
| M-12 | Shang rule at Anyang | c. 1250–1046 | N. China | Dynastic consolidation | Wu Ding, Fu Hao | Medium | Diviner/craftsman/soldier | Not applicable in MVP | Chinese writing tradition |

**Rule:** M-01 to M-12 are **timeline anchors**. Each has `fixedness` and `divergenceThreshold` (Section 19).

---

# 16. HISTORICAL FIGURES

## 16.1 Figure rules \[DESIGN\]

- Only **T1 figures** (documented by contemporary or near-contemporary sources) are named. For T2/T3 contexts, use **procedural NPCs** and **archetypes** (the Chief, the Healer, the Trader), never invented 'real' names.
- **Interactability tiers:** `Distant` (appears in news/rumor only), `Encounter` (rare scripted meeting), `Relationship` (limited recurring interaction), `Direct` (for high-influence players only).
- **Dates** use conventional/middle chronology; show uncertainty in UI.
- **Fixed vs. changeable:** Birth/death and macro-role of a figure is fixed unless the divergence engine permits an alternate timeline (Section 19). Personal interactions are free.

## 16.2 Figure catalogue (representative)

| Figure | Dates (approx.) | Location | Role/Faction | Importance | Player relationship tier | Interaction examples | Fixed | Changeable |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Narmer** | c. 3100 | Egypt | King, unifier (identity with Menes debated) | Unification | Distant | Rumor, ceremonial scene | Reign, unification | Details of campaign |
| **Djoser & Imhotep** | c. 2670 | Egypt | King; architect/vizier | Step Pyramid | Distant/Encounter (Imhotep for elites) | Worksite visit | Pyramid building | Worker fates |
| **Khufu** | r. c. 2589–2566 | Egypt | King | Great Pyramid | Distant | Labor team | Pyramid | Personal fates |
| **Sargon of Akkad** | r. c. 2334–2279 | Mesopotamia | King | First empire | Encounter (soldier/scribe) | Serving in campaign | Rise, empire | Local episodes |
| **Enheduanna** | c. 2285–2250 | Ur | High priestess, poet | Earliest known named author | Relationship (temple staff) | Temple literature | Authorship, role | Student relationships |
| **Naram-Sin** | r. c. 2254–2218 | Akkad | King | Imperial peak, deified | Distant/Encounter | Campaign | Reign | Local roles |
| **Gudea of Lagash** | c. 2144–2124 | Lagash | Ruler, builder | Temple building | Encounter | Temple works | Temple project | Participation |
| **Ur-Nammu** | r. c. 2112–2095 | Ur | King, law-giver | Ur III, early code | Distant | Legal cases | Code | Case outcomes |
| **Hammurabi** | r. c. 1792–1750 | Babylon | King | Babylonian rise, code | Encounter (elite/soldier) | Petition, campaign | Reign | Case-level events |
| **Hatshepsut** | r. c. 1479–1458 | Egypt | Female king | Trade expedition to Punt | Distant/Encounter | Punt expedition crew | Reign | Crew fates |
| **Thutmose III** | r. c. 1479–1425 | Egypt | Warrior king | Egyptian empire | Encounter (soldier) | Campaign | Campaigns | Personal episodes |
| **Akhenaten & Nefertiti** | r. c. 1353–1336 | Amarna | King/queen | Atenism | Encounter (artisan/priest) | City life | Reform and reversal | Local reactions |
| **Tutankhamun** | r. c. 1332–1323 | Egypt | Boy king | Restoration | Distant | Palace rumor | Death at \~18 | — |
| **Ramesses II** | r. c. 1279–1213 | Egypt | King | Kadesh, building | Encounter | Campaign/building | Reign | Personal |
| **Suppiluliuma I / Mursili II / Muwatalli II / Hattusili III** | c. 1344–1237 | Hatti | Hittite kings | Hittite empire | Distant/Encounter | Campaign | Reigns | Personal |
| **Fu Hao** | c. 1250 | Shang | Consort & military leader | Evidence of elite women | Distant | Rumor, ritual | Role | Local events |
| **Wu Ding** | r. c. 1250–1192 | Shang | King | Oracle bone inscriptions | Distant | Divination | Reign | Local events |

**Do-not-use rules:** No fabricated dialogue attributed to real figures in 'historical' mode (use paraphrased summaries or clearly fictional rumor); respect the guidelines for living-descendant cultures; avoid 'great man' overemphasis by letting ordinary NPCs matter.

## 16.3 Figures that must remain non-interactable for MVP

All of them. For MVP, all named figures are **Distant** (rumors, edicts, news). Direct interaction is P2.

---

# 17. RANDOM EVENTS

## 17.1 Random event philosophy \[DESIGN\]

- Events should be **plausible for context** and **respect fixed anchors**.
- Generation uses **context filters** (region, period, class, occupation, season, world state).
- **Weights** come from historical plausibility (e.g., flood-related events weigh more in Egyptian Akhet; raiding events weigh more on frontiers).
- **Randomness is bounded**: certain outcomes are historically impossible regardless of luck (e.g., a farmer becoming king of Akkad).

## 17.2 Event categories

| Category | Examples |
| --- | --- |
| **Family** | Birth, death of a parent, sibling quarrel over inheritance, marriage negotiation, adoption, fostering, widowhood, kin feud |
| **Economic** | Bumper harvest, blight, locust swarm, debt offer, loan default, workshop contract, tax collector visit, caravan investment |
| **Weather/climate** | Late flood, drought, harsh winter, storm at sea, unusual star (omen) |
| **Disease** | Fever outbreak, childbirth complication, injury infection, parasitic illness, epidemic arrival |
| **Accident** | Fall, drowning, animal attack, building collapse, kiln fire |
| **Social conflict** | Dispute over boundary, theft accusation, gossip scandal, rival for marriage, ration dispute |
| **Opportunity** | Apprenticeship offer, patron's attention, scribe school place, trade expedition slot, land lease, expedition crew |
| **Travel** | Caravan journey, river voyage, pilgrimage to a temple, relocation, captured abroad |
| **Crime** | Theft, tomb robbery temptation, smuggling, bribery, false witness |
| **Discovery** | New technique, ore deposit, useful plant, new trade partner, foreign tech (e.g., chariot) |
| **Political** | Tax reform, new ruler, edict, conscription call, diplomatic arrival, rebellion rumor |
| **Religious** | Festival role, omen reading, temple service, ritual obligation, oracle consultation, priest conflict |
| **Military** | Levy call, raid, siege, mutiny, defeat, capture, ransom, garrison duty |

## 17.3 Weighting formula \[DESIGN\]

```text
weight(event) = base_weight
  * region_modifier * period_modifier * class_modifier * occupation_modifier
  * season_modifier * world_state_modifier(e.g., famine, war)
  * player_state_modifier(e.g., debt, injuries, reputation)
  * anti_repetition_penalty
```

**Constraints:** (1) Event must pass **technology gate**. (2) Event must pass **political gate** (does the polity exist?). (3) Event must pass **historical anchor gate** (does not contradict fixed events within the player's local timeline). (4) Event gives **at least one meaningful choice** or a state change with narrative consequences.

## 17.4 Event chains

Events can create **flags** that later raise probabilities (e.g., debt → default → debt-bondage → opportunity of release via *misharum*). Chains must be authored as small graphs (P0: 10–15 chains).

---

# 18. CHOICE DESIGN

## 18.1 Principles

1. **Choices arise from the historical world** (obligations, scarcity, status, risk), not from arbitrary prompts.
2. Every major choice has **trade-offs**; avoid a single correct option.
3. Consequences are layered (see 18.2).
4. Historical plausibility check: an option is shown only if the player's state permits it (class, skill, resources, location).

## 18.2 Consequence layers

| Layer | Meaning |
| --- | --- |
| **Immediate** | Result visible this year/season |
| **Delayed** | Triggered later (flag with timer) |
| **Hidden** | Not shown to the player until revealed (e.g., a rival's grudge) |
| **Personal** | Stats, health, skills |
| **Family** | Spouse, children, kin standing |
| **Social** | Reputation, relationships, status |
| **Historical** | Contribution to a local/regional event (rare; gated) |

## 18.3 Choice types

- **Survival/subsistence** (when to move camp; which crop to plant; whether to eat seed grain in famine).
- **Obligation** (honor a kin debt; pay temple dues; join corvée).
- **Career** (apprenticeship; scribal school; join the army).
- **Marriage/family** (accept an arranged match; refuse; dowry negotiation).
- **Moral/legal** (testify truthfully; accept a bribe; steal grain).
- **Political** (support a faction; petition a ruler; flee a levy).
- **Religious/ritual** (take part in a festival role; consult a diviner; defy a priest).
- **Risk/opportunity** (join a caravan to a distant city; join an expedition to Punt; investigate an ore find).

## 18.4 Representative examples

**Example A (Forager, c. 18,000 BCE, Magdalenian France):** *A dry autumn has thinned the reindeer herds. Your band's elders are split: follow the herd to a distant valley used by another band, or stay and rely on stored dried meat and fishing.* Choices: (1) Follow herd (risk: conflict or negotiation with the other band; reward: food, new kin ties); (2) Stay and fish (risk: winter shortage; reward: safety from conflict); (3) Split the band (risk: weakened defence; reward: flexible survival). Delayed: exchange of mates with the other band; hidden: disease from contact.

**Example B (Mesopotamia, c. 1780 BCE, Larsa/Babylon, free citizen farmer):** *A poor flood has left you unable to repay a silver loan from a temple creditor. The creditor offers to take your son as a pledge for three years.* Choices: (1) Pledge your son; (2) Sell part of your field; (3) Appeal to the local judge with a petition citing the king's debt edict rumor; (4) Flee to Sippar. Immediate/delayed/hidden consequences differ; Historical layer: outcome influenced by whether a *misharum* edict occurs (fixed by timeline for the polity).

**Example C (Egypt, c. 1157 BCE, Deir el-Medina workman):** *Rations have been delayed by weeks. Your fellow workmen are planning to walk out.* Choices: (1) Join the strike; (2) Stay and work; (3) Informally petition the scribe; (4) Pilfer grain from the storeroom. Layers: reputation, family hunger, official consequences, history of the strike (fixed event; the player's involvement is *participation*, not outcome control).

**Anti-example (forbidden):** 'You see a bird. What do you do?' — no choice emerging from social/economic reality.

---

# 19. HISTORICAL DIVERGENCE

## 19.1 Core rule

> The player does **not** rewrite history by choosing a dramatic option. History changes only when the **player's position in the world** gives them credible leverage over a **divergence-eligible event** inside its **time window**.

In this era, nearly every player will be a farmer, forager, craftsperson, or soldier. Divergence for them is **personal, family and local**. Regional and larger changes require elite access (court, army command, temple office, trade networks) and are deliberately rare.

## 19.2 Divergence levels

```text
L0 Personal   -> your own fate (health, career, marriage)
L1 Family     -> your household/kin group (land, feud, lineage)
L2 Local      -> village/city ward/temple/estate
L3 Regional   -> a city-state, province, valley, trade route
L4 National   -> a kingdom or empire's policy, succession, war outcome
L5 Historical -> era-defining event changes (e.g., a battle outcome)
L6 Major Alternate Timeline -> persistent timeline fork (e.g., Akhenaten's Atenism survives)
```

| Level | Typical player | Example | Gate |
| --- | --- | --- | --- |
| L0 | Anyone | Survive an epidemic through good care | Always allowed |
| L1 | Anyone with kin | Win a land dispute; secure a marriage alliance | Kin Support + resources |
| L2 | Reputable adult | Rescue a granary; mediate a canal dispute; found a small workshop | Reputation/Standing thresholds |
| L3 | Elite, officer, high priest/ess, rich merchant | Change a province's response to famine; negotiate a trade deal | Influence ≥ regional threshold + position |
| L4 | Court insider, general, regent | Alter succession or war strategy | Office rank + faction support + opportunity window |
| L5 | Near-sovereign power only | Decide a major battle's outcome | Extreme thresholds + historical opening |
| L6 | Ruler-level power + preceding chain of L3–L5 changes | Alternate empire trajectory | Requires a Divergence Chain (19.5) and **P3 system** |

## 19.3 Event fixedness classes

| Class | Meaning | Examples |
| --- | --- | --- |
| **F0 — Physical/natural fixed** | Cannot change | Climate shocks, volcanic eruptions (Thera), floods' macro cycle, deaths of figures outside the player's reach |
| **F1 — Hard historical anchor** | Changes only via L5/L6 | Unification of Egypt (c. 3100), Akkad's rise, Kadesh's inconclusive outcome, Late Bronze Age collapse's occurrence |
| **F2 — Soft anchor (branchable)** | Outcome can vary if player leverage meets threshold | Local effects of the collapse; Lagash–Umma battle outcomes; Hyksos expulsion timing; reforms' details |
| **F3 — Local/emergent** | Free to vary | Village disputes, migrations, trade deals, local rebellions |

**Note on the collapse:** The Late Bronze Age Collapse is multi-causal and not fully understood. The game models **collapse pressure** as a regional state variable and the player may influence *local outcomes* (e.g., whether a particular town is destroyed, whether a refugee group is absorbed) but not *whether the systemic crisis occurs* (F1).

## 19.4 Divergence Potential Score (DPS) \[DESIGN\]

```text
DPS(player, event) =
    w1 * Proximity(location_distance, travel_time)
  + w2 * Role(access to decision/action nodes)
  + w3 * Influence(office, patronage, faction)
  + w4 * Resources(wealth, troops, goods)
  + w5 * Skills(relevant skills)
  + w6 * Relationships(key NPC ties)
  + w7 * Reputation(trust/legitimacy)
  + w8 * Timing(within window)
  + w9 * PriorActions(prior divergence flags)

Event.divergenceThreshold[level] is defined in data.
If DPS >= threshold AND fixedness permits AND window open -> branch option appears.
Branch success = probability(DPS margin, luck, opposition strength).
```

**Opposition:** Each event defines `inertia` (resistance to change) and `counterforces` (rival factions, institutions). Success must exceed them.

## 19.5 Divergence chains

Large changes require **sequences**. Example (illustrative, not scripted): Delaying Egypt's New Kingdom expansion would require (1) L3 weakening of Theban resources, (2) L4 changes in succession, (3) L5 changes in a campaign outcome. The system tracks `divergenceChain[]` and prohibits skipping levels.

## 19.6 Propagation rules \[DESIGN\]

1. **Local first.** A change is applied to the local timeline and spreads outward only via defined causal links (trade, kin, army, reputation, rumor).
2. **Damping:** Each propagation step has a damping factor; most local changes stop at L2.
3. **Reconvergence ('historical attractors'):** For F1/F2 events, the world tends to *reconverge* on the historical path unless the change reaches the gate level. Example: the player saves a village from a flood; the regional Nile cycle (F0) is unchanged.
4. **Ripple budget:** The engine caps the number of active divergences per timeline for testability.
5. **Consistency checks:** Branches must not contradict fixed events outside the branch's scope.

## 19.7 What is NOT allowed

- Changing climate, geology, or demographics at scale by choice.
- Introducing technology that is not yet invented in the region (no early iron, gunpowder, etc.) — even in alternate timelines; at most *earlier adoption within plausible range* (P3).
- Making a peasant a king through a single choice.
- Erasing documented figures without a valid chain.

## 19.8 Timeline representation

`Timeline { id, parentId, branchPoint(eventId, year), divergenceLevel, flags[], eventOverrides[] }`. Output summary lists **Historical Anchors Preserved** and **Changes Caused**.

---

# 20. DEATH AND LEGACY

## 20.1 Death causes (culturally and temporally plausible) (P0)

| Category | Examples |
| --- | --- |
| **Birth/infancy** | Stillbirth, infant fever, weaning diarrhea, malnutrition |
| **Childhood illness** | Dysentery, fevers, parasitic disease, snakebite |
| **Childbirth** | Hemorrhage, sepsis, obstructed labor |
| **Injury** | Hunting accidents, falls, drowning, construction/worksite accidents, animal attack |
| **Violence** | Raid, war, execution, feud, judicial punishment, sacrifice (culture-specific) |
| **Famine/exposure** | Starvation, cold, drought |
| **Epidemic** | Plague-like outbreaks, typhus-like fevers |
| **Chronic disease/old age** | Wasting disease, dental infection, heart failure (unknown to them), 'old age' |
| **Disaster** | Flood, earthquake, volcanic event, collapse of building |
| **Mysterious** | Unknown cause (culturally interpreted as divine anger or sorcery) |

**Rule:** Death messages use **culturally framed narration** ('the fever god took you') plus a plain internal cause tag.

## 20.2 Funeral and afterlife handling \[DESIGN\]

Burial customs per culture (Section 12). The funeral scene reports who attends, burial goods, and memorial status (affects family Standing and `LegacyScore`).

## 20.3 End-of-life summary (required output)

```text
LifeSummary {
  identity: name (procedural or chosen), birth/death years (with 'c.' where uncertain), place, culture, class
  life_arc: 5-10 key milestones (generated from life log)
  achievements: skills mastered, offices held, works created (e.g., a tomb stone, a tablet, a bronze weapon)
  family: spouse(s), children (survived/died), grandchildren, lineage outcomes
  wealth_status: final assets & standing; inheritance outcome
  relationships: top 5 relationships (kin, friend, rival, patron)
  historical_involvement: events witnessed/participated in (Local/Regional/Major)
  historical_changes: divergence flags & level reached
  timeline_divergence: summary + 'Historical Anchors Preserved'
  legacy: LegacyScore + narrative epitaph + 'what the archaeological record might hold'
  evidence_note: tier statement ('This life is reconstructed from archaeology...')
}
```

**Archaeology epilogue (signature feature) \[DESIGN\]:** Each life ends with a short 'what remains' passage — e.g., a burial with specific grave goods, or a clay tablet in a house archive — so that the player sees how thin and fascinating the historical record is. This also reinforces the evidence tier honesty rule.

## 20.4 LegacyScore \[DESIGN\]

`LegacyScore = f(descendants_survival, Standing_peak, Reputation_final, works_created, community_impact, divergence_level)`. Weighted to **not** reward only power; family survival, craft mastery and community service matter too.

---

# 21. REPLAYABILITY

| Axis | Variation |
| --- | --- |
| **Date** | 9 sub-eras with different technology, politics, hazards |
| **Location** | Sumer vs Nile vs Indus vs Aegean vs Anatolia vs Europe vs China |
| **Class** | Farmer, craft worker, scribe, soldier, priest, slave, merchant, noble |
| **Family** | Large kin network vs isolated household; debt vs wealth |
| **Careers** | Over 40 occupations by period, unique event chains each |
| **Factions** | Palace vs temple vs merchant vs rebel |
| **Choices** | Layered consequences; different survival strategies |
| **Historical outcome** | Branchable events and different local histories |
| **Influence level** | From an anonymous forager to an imperial administrator |
| **Evidence tiers** | 'Archaeological mystery' lives vs 'documented' lives — distinct feel |
| **Challenge modes** | Classic mortality; 'Hardcore Ice Age'; 'Scribe's Path'; 'Great Houses' |

**Replay hooks \[DESIGN\]:** an *Atlas of Lives* (map/timeline where lived contexts are marked), *Archaeology codex* (unlocked by lives, showing real sites and artifacts), *Generational mode* (P2: continue as a descendant), *Era achievements* (e.g., 'Survived the 4.2 ka drought', 'Witnessed Kadesh').

---

# 22. GAMEPLAY EXAMPLES

## Example 1 — Magdalenian forager, southwestern France, c. 15,000 BCE (T3)

```text
Player Setup: Auto Create -> Female, band of ~35 near a river valley. Parent roles: hunter-toolmaker (father), hide-worker (mother).
Historical Context: Late Glacial; reindeer, horse and salmon seasonally abundant; cave art tradition; trade in shells and flint.
Life Situation: Age 14. Band gathers with neighbors at summer aggregation camp.
Event: 'Aggregation Season' -> opportunity for marriage, trade and ritual art.
Choices: (1) Pursue an apprenticeship with an elder who paints in the cave; (2) Seek marriage alliance with a neighboring band; (3) Join the salmon-fishing team; (4) Remain in the band's camp care role.
Player Choice: (1)
Immediate Consequence: Skill 'ritual_knowledge' + 'art' rises; Piety standing up; time away from foraging (Nutrition risk small).
Long-Term Consequence: Adult status as Respected Specialist; invited to inter-band ceremonies; marriage prospects improved.
Historical Consequence: None at L3+; the cave painting may be part of the archaeological epilogue ('a hand stencil in ochre').
```

## Example 2 — Deir el-Medina workman, Egypt, c. 1157 BCE (T1)

```text
Player Setup: Custom Life -> Male, born 1185 BCE, to a tomb-builder family in the royal necropolis workmen's village. Class: skilled artisan.
Historical Context: Late reign of Ramesses III; regional instability; supply irregularities.
Life Situation: Age 28; married with two children; rations are weeks late.
Event: Ration delay (Local, F3 inside a Regional F2 anchor: the historical strike).
Choices: (1) Join the strike (walk out to the temples); (2) Keep working; (3) Petition the scribe informally; (4) Pilfer grain.
Player Choice: (1)
Immediate: Reputation up among peers; official anger; family hunger eased after rations are delivered.
Long-Term: Foreman remembers; career stalls vs. gains respect; possible scribe patron lost or gained.
Historical: Participation recorded; strike outcome remains as documented (F2). If DPS high (foreman, strong relationships) player may influence settlement terms (L2).
```

## Example 3 — Merchant at Kültepe/Kanesh, Anatolia, c. 1850 BCE (T1)

```text
Player Setup: Born in Assur, family of Old Assyrian merchants; age 22 sent to the karum (merchant colony) at Kanesh.
Context: Donkey caravans carry tin and textiles to Anatolia, returning with silver; letters and contracts on clay tablets; local Anatolian rulers tax caravans.
Event: Caravan route disrupted by local conflict; creditors in Assur demand payment.
Choices: (1) Pay a bribe to a local ruler for safe passage; (2) Take a riskier mountain route; (3) Delay and negotiate with creditors; (4) Sell goods locally at a loss.
Player Choice: (2)
Immediate: Roll for survival & cargo; if success, profit; if fail, debt or capture.
Long-Term: Reputation among karum merchants; marriage to an Anatolian woman (documented practice) or a family in Assur.
Historical: No change to the Old Assyrian trade system (F2). A strong merchant may influence local karum policy (L2).
```

## Example 4 — Child in Çatalhöyük, c. 6600 BCE (T2)

```text
Player Setup: Auto Create -> Child (age 5) in a mudbrick house with plastered walls; parents farm outside the settlement and tend sheep/goats.
Context: Large dense settlement; houses entered from the roof; burials beneath floors; obsidian trade.
Event: Illness in the household; an elder dies; burial under the main platform.
Choices: (1) Participate in the burial ritual; (2) Be kept away to avoid disease; (3) Stay with the herding group outside.
Player Choice: (1)
Immediate: Piety/Kin Support up; exposure to disease risk (small).
Long-Term: Household cohesion; strengthened inheritance claim to house/platform.
Historical: No named history (T2); contribution to the site's archaeological epilogue ('floor burial with a bead necklace').
```

---

# 23. DATA MODEL REQUIREMENTS

Conventions: every record has `id`, `name`, `description`, `evidenceTier`, `confidence`, `sources[]` (scholarly refs), `priority (P0–P3)`, `contentFlags[]` (sensitive), `version`. Dates use `YearRange {start, end, uncertainty, chronologyVariant}`.

| Structure | Required information |
| --- | --- |
| **Era** | id, name, global date range, subEraIds\[\], default chronology, rules (anachronism checks), sampler presets |
| **SubEra** | id, name, YearRange, regional variants, technology baseline, climate baseline, default event tables |
| **RegionalPeriod** | regionId, subEraId, YearRange, local tech/polity references (maps global sub-era to local timing) |
| **Region** | id, geography (polygon/points), climate profile, available periods, locations\[\], language families, cultural groups |
| **Location** | id, regionId, type, coordinates (approx.), population curve, foodSurplus, sanitationLevel, tradeRoutes\[\], polityId by time, culture, occupations available |
| **PoliticalEntity** | id, type (band/village/city-state/kingdom/empire), YearRange, capital, rulers/dynasty, territory by time, tribute rules, law codes, military capacity |
| **Faction** | id, polityId, interests, relations, resource base, influence nodes |
| **Dynasty** | id, polityId, ruler list with YearRange and fixedness |
| **SocialClass** | id, regionId, validPeriod, rights, restrictions, education access, marriage rules, mobility rules, occupation access, class-specific legal penalties |
| **Occupation** | id, tech requirements, region/period availability, class access, gender access (culture-defined), skill requirements, income type, risk profile, career ladder, event tags |
| **Skill** | id, learning requirements (teacher, tech), decay rate, related stats |
| **Stat/StatDefinition** | id, range, visibility, update formula refs, thresholds, UI labels |
| **HistoricalEvent** | template fields in Section 15.1; fixedness class, divergence thresholds, branches, scale, location(s), time window |
| **HistoricalFigure** | id, dates, role, faction, evidenceTier, interactability tier, fixed facts, changeable facts, rumor texts |
| **Technology** | id, domain, regionalAvailability\[\], prerequisites, unlocks (actions/items/occupations), risks |
| **Religion/BeliefSystem** | id, culture links, deities/concepts (only T1/T2-supported), ritual calendar entries, taboos, gameplay effects |
| **Culture** | id, language(s), marriage/inheritance rules, gender role profile, funerary customs, naming conventions, content flags |
| **EconomyProfile** | region/period: exchange system, units, ration standards, tax types, trade goods, price modifiers, harvest model params |
| **TradeRoute** | id, endpoints, goods, risk, duration, YearRange |
| **DiseaseModel** | id, tag, symptoms (narrative), transmission, age/occupation weights, mortality, region/period, historical-record notes |
| **HazardCurve** | region type, age-specific base mortality and morbidity parameters |
| **RandomEvent** | id, category, preconditions (tech/region/class/season/world flags), weights, choices\[\], chains, tags, anti-repeat rules |
| **Choice** | id, text, requirements, costs, skill checks, consequences\[\], hidden flags, UI hints |
| **Consequence** | id, layer (immediate/delayed/hidden/personal/family/social/historical), effects (stat deltas, flags, relationships, timers), narrative text refs |
| **WorldState** | current year, season, region states (harvest, stability, war, disease, collapse pressure), active event flags, timeline id |
| **CharacterState** | identity, age, sex, culture, class, location, household, stats, skills, traits, injuries/illnesses, relationships, assets, obligations, life log, divergence flags |
| **Household** | members, assets, obligations, land, kin group, status |
| **Relationship/NPC** | id, role, kin tie, affinity, loyalty, secrets, procedural traits, life-stage |
| **Timeline** | id, parentId, branch point, flags, event overrides, divergence level, summary |
| **LifeSummary/LegacyRecord** | see 20.3; plus archaeology epilogue template library |
| **ContentSource/Citation** | id, reference, reliability, date, notes (for traceability and fact-checking) |

---

# 24. AGENT IMPLEMENTATION NOTES

## MUST BE HISTORICALLY FIXED

- Sub-era boundaries and **regional period tables** (unless a valid divergence changes them).
- **Technology availability** by region/time (no chariots before c. 2000–1700 BCE, no coinage, no cavalry as an arm, no iron weapons in common use, no writing in non-literate regions).
- Climate shocks and natural disasters (F0).
- Existence and rough dates of major polities and rulers (T1).
- Major timeline anchors: M-01 to M-12 unless L5/L6 divergence.
- Social structure features that are documented (e.g., class-specific penalties in Mesopotamian law).
- Evidence tier labels and uncertainty flags.
- Prohibitions: **no modern concepts** (no money banking, nationalism, race categories, modern gender/sexuality terminology applied as historical fact).

## CAN BE RANDOMIZED

- Birth family, siblings, health constitution, talents, personality traits.
- Local weather/harvest within climate bounds.
- Local disputes, accidents, opportunities, NPC names (using period-appropriate name lists).
- Individual disease outcomes (within hazard curves).
- Which of many plausible local roles the player is offered.
- Procedural village layouts and NPC relationships.

## CAN BE PLAYER-CHANGED

- Personal life path, skills, marriage, family, wealth, reputation.
- Local outcomes (disputes, small conflicts, local reputation).
- Regional/national outcomes only via DPS gates; large changes only via divergence chains.
- Migration (moving to another valid region/time-locked context).

## REQUIRES FUTURE SYSTEM

- **Cross-life persistence** (descendants, timeline memory) \[FUTURE\].
- **Multi-era handoff** (Iron Age/Classical module) \[FUTURE\].
- **Localization & naming systems** for ancient languages (Sumerian/Akkadian/Egyptian names) with scholarly review \[FUTURE\].
- **Visual/UX system** for archaeology codex and maps \[FUTURE\].
- **Procedural NPC network simulation** at scale \[FUTURE\].
- **Advanced diplomacy/war simulation** beyond campaign chains \[FUTURE\].
- **Sensitive-content review pipeline** for Indigenous, religious and violence topics \[FUTURE\].
- **Scholarly advisory process** (archaeologists/Assyriologists/Egyptologists) for P1+ content \[FUTURE\].

## Engineering rules for AI coding agents

1. Treat **all** values in this spec labelled \[DESIGN\] as defaults to be placed in data/config files, not hard-coded.
2. Anything labelled \[UNCERTAIN\] must be implemented as a *configurable assumption* with a documented default and alternative.
3. Never infer a missing historical fact. If a content record lacks data, **raise a content gap** (`TODO_CONTENT`) rather than inventing.
4. All content records require `evidenceTier` and at least one `source`.
5. Provide **validation tools**: anachronism checker (tech/region/time), fixedness validator (events vs. divergence), and content-flag audit.
6. Keep the simulation **deterministic with seeds** for reproducibility and testing.

---

# 25. MVP RECOMMENDATION

## 25.1 Recommended vertical slice

**MVP context: Old Babylonian southern Mesopotamia, c. 1810–1740 BCE (Middle Chronology).**

*Why this slice:* (1) Rich documentation (T1): thousands of letters, contracts, laws and school texts; (2) Strong drama across classes (debt, law, family, temples, war); (3) Clear anchors (Hammurabi's accession c. 1792, defeat of Larsa/Rim-Sin c. 1763, destruction of Mari c. 1761, law collection c. 1754); (4) Moderate technology/limited systems (no horses in cavalry, simple economy); (5) Both male and female playable roles with documented agency; (6) Demonstrates *date + location + class* variation within a manageable scope.

**Why not forager first?** T3 contexts are procedurally flexible but low on authored historical anchors, so they're weaker for testing the divergence and anchor systems. They become a **P1 'contrast slice'**.

## 25.2 MVP minimums

| Component | Minimum |
| --- | --- |
| **Map** | Lower Mesopotamia: Euphrates corridor (Babylon, Sippar, Kish area), Larsa/Ur area; Mari as a distant northern node |
| **Locations** | 5: Babylon (capital), Sippar (temple city), Larsa (southern rival), generic canal village, caravan stop/trade hub |
| **Social classes** | 4: Elite (priestly/official/landowner), Free citizen (awilum), Dependent (mushkenum/temple-palace dependent), Slave/debt-bondsman. Royal family is non-playable |
| **Careers** | 7: farmer, craftsperson (potter/weaver), scribe, soldier (levy/professional), merchant (tamkarum agent), temple servant/priestess (including *naditu* as a female path), tavern-keeper/brewer |
| **Historical events** | 6 anchors: Hammurabi's accession (c. 1792); Larsa conquest (c. 1763); Mari's fall (c. 1761); Law collection (c. 1754); a misharum debt-edict mechanic; a flood-failure/famine year (generic, not dated) |
| **Random events** | 40–50 events across families, economy, disease, social, travel, religion, military; 8 event chains |
| **Stats** | 8: Health, Nutrition, Strength, Wits, Reputation, Standing, Kin Support, Resources (portfolio); skills limited to 10; Influence (adult) unlocked at 25+ |
| **Historical figures** | 3 Distant: Hammurabi, Rim-Sin I of Larsa, Zimri-Lim of Mari (rumor/edict/news only) |
| **Choice system** | Event-based choices with 2–4 options; layered consequences (immediate/delayed/hidden); requirements gating; no dialogue trees |
| **Divergence** | L0–L2 only; DPS framework implemented; L3+ 'locked with explanation' text; fixedness flags enforced; timeline summary at death |
| **Life flow** | Birth → childhood → adolescence → adulthood (marriage, career) → old age → death + LifeSummary + archaeology epilogue |
| **Creation** | Auto Create and Custom Life (limited to the MVP context with a clear 'coming soon' for other contexts) |
| **Tooling** | Anachronism validator, content-gap reporter, seeded RNG, data-driven content loading |

## 25.3 MVP exclusions

Other regions, forager/Neolithic lives, direct interaction with figures, L3+ divergence, naval/long-distance travel beyond the simple caravan node, cross-life persistence.

---

# 26. CONTENT PRIORITY

## P0 — Required for MVP

- Core engine hooks: era/sub-era/regional period tables; anachronism checks; seeded RNG.
- Old Babylonian Mesopotamia context (Section 25).
- Stats: Health, Nutrition, Strength, Wits, Reputation, Standing, Kin Support, Resources.
- Social classes (4), careers (7), life-stage flow, marriage, family.
- Hazard curves and a simplified disease/injury model.
- Random events (40–50), chains (8).
- Anchors (6) with fixedness flags; Distant figures (3).
- Choice and consequence system with layered consequences.
- Divergence levels L0–L2 and DPS framework.
- Death, LifeSummary, archaeology epilogue.
- Evidence tiers and content-flag system.

## P1 — Important (soon after MVP)

- **Egypt New Kingdom** slice (Deir el-Medina, Thebes) and **Old Kingdom** worksite slice.
- **Forager contrast slice** (Magdalenian or Natufian) with procedural culture.
- **Early Neolithic** slice (Çatalhöyük, Levant).
- Merchant/caravan systems (Kanesh), Mesopotamian Ur III and Akkad slices.
- Additional careers (soldier ranks, charioteer, priest roles, healer).
- Extended hazard/disease models, climate shocks (4.2 ka).
- Late Bronze Age Mediterranean (Hittite/Mycenaean/Ugarit) and the collapse event chain.
- L3 divergence (regional) for elites.

## P2 — Expansion

- Indus, Aegean (Minoan/Mycenaean), China (Erlitou/Shang), Europe Bronze Age.
- Direct interaction with historical figures; court and diplomacy mini-systems.
- Archaeology codex, Atlas of Lives, achievements, challenge modes.
- Generational mode; extended family simulation.
- L4 divergence for rulers/high officials.

## P3 — Future

- Sahul, Americas, Arctic, Jomon, Steppe slices with cultural review.
- L5–L6 divergence, alternate timelines and persistent branching.
- Pre-Upper-Paleolithic (Neanderthal contact) lives.
- Linguistic immersion systems (ancient language snippets), expert-reviewed.
- Deep economic or military simulation layers.

---

# 27. FINAL SECTION — ERA DESIGN SUMMARY

### Era Identity

This is the era where humans move from small mobile bands to cities, writing, empires and international diplomacy, spanning \~49,000 years but with a deeply uneven record: almost silent for most of its length, then suddenly full of letters, contracts and laws. Its identity is **thin evidence, thick imagination, and enormous variation in life**.

### Player Fantasy

To live an *ordinary* life inside an extraordinary transformation: to feel the pull of the seasons, kin obligations, hunger and ritual, and to realize that the grand events of history are made of households like yours. The player should feel **vulnerable, embedded, and quietly consequential**.

### Core Gameplay

Year-by-year life decisions driven by **subsistence, kin, work, obligation, risk and ritual**, with periodic historical pressure (harvests, wars, edicts, plagues). The player primarily **navigates scarcity and status**, builds a household and legacy, and occasionally intersects with big history.

### Major Systems

1. Date+location+class world generator with regional period tables.
2. Era-specific stats and wealth-as-portfolio.
3. Hazard/disease/injury and nutrition model.
4. Random event engine with technology/political/anchor gates.
5. Layered choice and consequence engine.
6. Fixedness-based Historical Divergence with DPS.
7. Legacy and archaeology-epilogue system.
8. Evidence-tier and content-sensitivity framework.

### Historical Hook

The **archaeology epilogue**: every life ends with a glimpse of what the record (or its absence) would show, turning the evidence gap itself into emotional gameplay. Add Bronze Age 'globalization' (tin, copper, diplomacy) and its collapse as the era's grand arc.

### MVP

Old Babylonian Mesopotamia c. 1810–1740 BCE with 5 locations, 4 classes, 7 careers, 6 anchors, 40–50 events, 8 stats, 3 distant figures, L0–L2 divergence, full life-to-legacy loop.

### Open Questions

**Research questions (need scholarly review):**

1. Which chronology should be default for Mesopotamia/Levant (Middle vs Low) and how to present uncertainty to players?
2. How to represent T3 forager societies responsibly (analogy usage, sensitivity, avoiding stereotypes)?
3. How much of Indus/Minoan social structure can be depicted without implying unsupported hierarchies?
4. Which hazard-curve datasets (paleodemography) should parameterize mortality by region/period?
5. How to present the Late Bronze Age Collapse's causes without privileging a single theory?
6. Name lists and language usage: who reviews?

**Product decisions:**

1. Sampling default for Auto Create (population-weighted vs era-uniform).
2. Default mortality mode (Classic vs Story) and the early-childhood-death experience.
3. Sensitive-content defaults (slavery, sacrifice, violence) and age rating.
4. Whether Custom Life allows out-of-MVP contexts as 'procedural previews'.
5. How strongly to expose the evidence-tier system in the UI.
6. Whether to allow cross-life persistence (descendants) in v1 or later.
7. Gender and sexuality representation policy for ancient contexts, with expert and community consultation.
8. Scope and funding for external scholarly advisors.

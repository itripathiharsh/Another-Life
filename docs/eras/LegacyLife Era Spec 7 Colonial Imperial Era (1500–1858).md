# LegacyLife Era Spec 7: Colonial / Imperial Era (1500–1858)

*Game-development specification for AI coding agents. Not a history essay. Production code is out of scope.*

## 0. How to Read This Document

**Tag convention (applies everywhere):**

- **\[F\]** = historical fact, defensible by mainstream scholarship.
- **\[U\]** = uncertain or contested; the number or claim is a range, and the game must store it as a range, not a point.
- **\[M\]** = proposed game mechanic (design decision, not history).
- **P0 / P1 / P2 / P3** = content priority (see Section 26).

**Core rule for agents:** if a rule is not written here and not listed in Section 24 under "REQUIRES FUTURE SYSTEM", do not invent it. Raise it as an open question.

**Content governance (read first).** This era includes the Atlantic slave trade, conquest, forced labor, epidemic collapse of Indigenous populations, caste and casta hierarchies, and religious persecution. \[M\] Requirements:

- These are simulated as structural systems with real costs and constraints, never as reward loops. No "profit multiplier" framing for enslaving people. The system must never present enslavement, dispossession or massacre as a neutral optimization.
- Perpetrator roles (slave trader, plantation owner, conquistador, company official) are playable only through the same consequence engine as everyone else, including delayed, hidden and historical consequences, and end-of-life summaries that state plainly what the character did.
- Victim and resistance roles (enslaved person, forced laborer, maroon, rebel, converso/hidden Christian in Japan) are first-class playable lives with real agency (see Section 18), not game-over states.
- Do not apply modern "race" as a uniform stat. Historical status systems differ by place: Iberian *limpieza de sangre* and *castas*, English colonial slave codes tying status to ancestry, Mughal and Indian *jati/varna* and *ashraf/ajlaf* distinctions, Qing Manchu/Han banner distinctions, Tokugawa *mibun*. Each is implemented as its own region-specific ruleset.

---

## 1. Era Overview

**Name:** Colonial / Imperial Era (`era_id: colonial_imperial`)

**Date range:** 1 Jan 1500 to 31 Dec 1858 (core window). \[M\] Region-specific *active windows* differ (see below).

**Why these bounds:**

- Start \[F\]: Portuguese landfall in Brazil (Cabral, April 1500) and the consolidation of Iberian transoceanic empires; Portuguese Goa taken 1510. The 1492 Columbus voyage and Tordesillas (1494) are treated as *backstory* (pre-start) because the Americas' Caribbean phase begins before 1500 but is a different, earlier era slice. Open question Q1: should 1492–1499 be included?
- End \[F\]: Government of India Act (Aug 1858) and Queen's proclamation (Nov 1858) end Company rule after the 1857 rebellion; Perry (1853) and Kanagawa (1854) end Tokugawa closure; Treaty of Nanjing (1842) and the Taiping war (from 1850) begin Qing's "semi-colonial" phase. After 1858 the world is better handled by a later Industrial/High-Imperial era.

**Region-specific active windows \[M\]:**

| Region module | Active from | Active until (handoff) | Handoff reason |
| --- | --- | --- | --- |
| Spanish America | 1500 | 1825 (Ayacucho Dec 1824, last mainland royalist resistance ends by 1826) | independence states; continue to 1858 as `post_colonial` sub-era with reduced content (P2) |
| Portuguese/Imperial Brazil | 1500 | 1858 | empire continues; slavery continues to 1888, flag as era-tail (P2) |
| British/French/Dutch Atlantic (N. America, Caribbean) | 1500 | 1858 (US module ends 1783 for colonial rules, then "early republic" sub-era P2) |  |
| West and West-Central Africa | 1500 | 1858 | pressure continues beyond |
| Mughal / colonial India | 1500 | 1858 | Crown Raj |
| Ming/Qing China | 1500 | 1858 |  |
| Japan | 1500 | 1854 | Kanagawa |

**Geographic range:** Atlantic basin (Iberia, Atlantic Europe, West/West-Central Africa, Caribbean, Americas); Indian Ocean (South Asia, Swahili coast, Cape); East Asia (China, Japan); Southeast Asia port-polities (P2/P3).

**Major societies \[F\]:** Spanish and Portuguese empires; Dutch Republic; England/Britain; France; Mughal Empire and successor states (Marathas, Mysore, Bengal nawabs, Hyderabad); Ming then Qing China; Tokugawa shogunate; Indigenous American polities (Aztec/Mexica to 1521, Inca to 1532/1572, Maya city-states, Haudenosaunee, Powhatan, Cherokee, Lakota and many more); West and Central African states (Songhai, Kongo, Ndongo/Matamba, Benin, Oyo, Dahomey, Asante, Senegambian states); Swahili city-states and Oman; Dutch-founded Cape Colony.

**Important transitions:**

1. Iberian conquest and epidemic collapse of the Americas (1519–c.1600).
2. Rise of chartered companies and the plantation Atlantic (1600–1700).
3. Global imperial rivalry; Company rule in India; peak of Atlantic slave trade (1700–1790).
4. Age of revolutions, abolition, and industrial-era pressure on Asia and Africa (1790–1858).

**Why this era suits LegacyLife:**

- Date+location produces radically different lives: the same year (e.g., 1760) is a Qing Hanlin scholar's world, a Bengal weaver under Company pressure, a Virginia tobacco planter's household, an enslaved child in Saint-Domingue, a Kongo village, an Edo merchant's apprentice.
- Built-in divergence hooks: revolts, conquests, treaties, famines, trade monopolies.
- Strong tension between structural constraint and personal agency.
- Fits the "ordinary person, not king" design: most lives are shaped by institutions the player can only slightly bend.

**Date handling \[M\] (P0):**

- Store `birth_date_gregorian` (proleptic). Display local calendar: Julian in Britain and colonies until 1752 (skip 2–14 Sept 1752 \[F\]); Catholic Europe switched 1582 \[F\]; Japan and China lunisolar with reign/era names; Mughal and Muslim communities Hijri.
- Birth *season* is a first-class variable (harvest cycle, monsoon, sailing seasons, epidemic seasons).

**The engine formula for this era:**

```text
DATE (year+season) + LOCATION (region module + place) + SOCIAL CONTEXT (status system + household) = HISTORICAL WORLD
```

Each term resolves in order: date selects a SubEra; location selects a RegionModule *as of that date* (borders and rulers change); social context is sampled from the region's status system with date-weighted probabilities.

---

## 2. Temporal Breakdown

Four sub-eras, plus per-region overrides. Every number below is a design anchor; dates are \[F\] unless noted.

### SubEra A: Conquest and Contact (1500–1600)

- **Societies:** Ming China (Zhengde, Jiajing, Wanli); Sengoku Japan until 1603; Mughal Empire founded 1526 (Panipat); Akbar 1556–1605; Spanish conquest of Mexico (Tenochtitlan fell 13 Aug 1521) and Peru (Cajamarca 16 Nov 1532); Portuguese Estado da Índia (Goa 1510, Malacca 1511, Macau settlement c.1557); Kongo under Afonso I (r. c.1509–1542); Songhai until Moroccan victory at Tondibi 1591; Dutch Revolt against Spain from 1568.
- **Politics:** Iberian crown-chartered conquest; encomienda (from 1503), then New Laws (1542) and Viceroyalties (New Spain 1535; Peru c.1542). Potosí silver discovered 1545.
- **Technology:** carracks/galleons, arquebus, steel and horses in the Americas, printing in Europe (and Jesuit presses in Asia later), Chinese and Japanese gunpowder weapons, matchlocks reach Japan 1543 \[F\].
- **Economy:** American silver reorients global trade; Ming China absorbs silver ("silver for goods"); Spanish Manila galleon from 1565.
- **Social structure:** colonial *república de españoles* vs *república de indios*; early mestizo population; African slavery begins on Iberian Atlantic islands and expands to the Americas.
- **Conflicts:** conquest wars; Italian wars context; Sengoku unification wars; Mughal-Afghan wars; Ottoman-Habsburg tensions (context only).
- **Disease:** *cocoliztli* epidemics in Mexico 1545–48 and 1576–80; smallpox, measles. Population collapse in central Mexico is estimated at roughly 80–90% over the century \[U: ranges vary widely\].
- **Change from prior:** n/a (start). Treat as the base state.

### SubEra B: Companies and Plantations (1600–1700)

- **Societies:** English East India Company (charter 31 Dec 1600), Dutch VOC (1602); Tokugawa shogunate (Sekigahara 21 Oct 1600; Ieyasu shogun 1603); Qing conquest of Ming (1644); Mughal peak under Shah Jahan (1628–58) and Aurangzeb (1658–1707); English colonies (Jamestown 1607, Massachusetts from 1620/1630), New France (Quebec 1608), Dutch New Netherland (1624–1664), Barbados and Jamaica (English 1655), Dutch Brazil (1630–1654); Cape Colony (VOC 1652); Dahomey/Asante origins; Kongo disintegration after Mbwila (1665).
- **Politics:** mercantilism (Navigation Acts 1651+), chartered monopolies, royal absolutism, Qing consolidation under Kangxi (1661–1722), Tokugawa *bakuhan* system, *sankin-kōtai* (formalized 1635), *sakoku* edicts (1633–39).
- **Technology:** fluyt ships (Dutch), sugar mill technology, improved fortress design (bastion forts), Jesuit astronomy in Qing court, wheel-lock and flintlock transition.
- **Economy:** sugar "revolution" in Barbados (1640s); tobacco in Chesapeake; silver from Potosí and Mexico; Indian textiles (calico) dominate Asian/African/European demand; Atlantic slave trade scales up \[F: roughly 12.5 million embarked over 1501–1866, \~10.7 million disembarked; treat as ranges\].
- **Conflicts:** Thirty Years' War (Europe context); Anglo-Dutch wars; Qing-Ming transition and Three Feudatories revolt (1673–81); Shimabara rebellion (1637–38); King Philip's War (1675–76); Mughal-Maratha wars begin; Pueblo Revolt (1680).
- **Change from A:** companies replace crown-conquest as main expansion engine; plantation slavery becomes the main economic form in the Atlantic tropics; Japan closes; China changes dynasty.

### SubEra C: Imperial Rivalry and Revolution Buildup (1700–1790)

- **Societies:** Qing High Qing (Yongzheng 1722–35, Qianlong 1735–96, Canton System 1757); Mughal decline (Nader Shah sacks Delhi 1739); Bengal nawabs; British Company victories (Plassey 23 June 1757; Buxar 1764; *diwani* of Bengal 1765); Maratha confederacy; Asante (c.1701 consolidation), Oyo, Dahomey (tributary to Oyo from c.1730); Seven Years' War (1756–63) and Treaty of Paris (1763); American Revolution (1775–83); Bourbon reforms in Spanish America; Tokugawa Kyōhō and Tenmei periods.
- **Economy:** Atlantic slave trade at its peak decades (roughly 1780s) \[U on exact peak\]; Britain's textile and sugar imports; Canton tea-for-silver trade; Edo-period commercialization (rice brokers, *tonya*, *kabu nakama* guilds).
- **Disasters:** Great Bengal famine 1769–70 \[U: mortality estimates range roughly from one to ten million; Company policy role debated\]; Tenmei famine in Japan (1782–88); Lisbon earthquake 1755.
- **Change from B:** state-vs-state global wars (Seven Years' War), Company becomes territorial power in India, fiscal-military pressure triggers colonial resistance in the Americas.

### SubEra D: Revolutions, Abolition and Industrial Pressure (1790–1858)

- **Events:** Haitian Revolution (1791–1804); Latin American wars of independence (1808–1826); British abolition of the slave *trade* (1807) and slavery in most of the empire (Act 1833, effective 1834 with "apprenticeship" to 1838); US importation ban 1808; Anglo-Mysore wars (Tipu Sultan killed 1799); Anglo-Maratha wars (final 1817–19); Macartney embassy (1793); White Lotus rebellion (1796–1804); Opium War (1839–42, Treaty of Nanjing Aug 1842); Taiping war (1850–64); Indian Rebellion (1857–58); Perry (July 1853), Kanagawa (31 Mar 1854); Indian Removal Act (1830) and the Trail of Tears (1838–39); Tenpō famine (1833–37) and Ōshio Heihachirō's revolt (1837); Liberia (1822); Great Trek (1836+); Zanzibar sultanate center under Sa'id from c.1840; Oyo collapse in the early 19th century.
- **Technology:** steamships, railways (India from 1853), telegraph (India 1850s), cotton gin (1793), Enfield rifle (relevant to 1857), quinine prophylaxis (1820s+ isolation, widespread use mid-century).
- **Change from C:** the logic of empire shifts from monopoly trade to industrial and territorial control; abolition movements reshape Atlantic labor; Asian states face treaty imposition.

### Handling Birth Dates Within a SubEra \[M\] (P0)

- Each region module defines **ruler timeline**, **war timeline**, **epidemic/famine timeline** and **law timeline** as separate tracks. The engine queries them for the player's birth date and for every simulated year.
- Sub-era boundaries are soft (+/- 10 years blend for technology and economy tables); political tracks are hard-dated.

---

## 3. Geographic Breakdown (Playable Region Modules)

Each module is a self-contained dataset. Priority: P0 for MVP modules, P1/P2 for later. MVP picks are in Section 25.

### R1. Spanish America (P1)

- **Entity \[F\]:** Viceroyalty of New Spain (1535), Peru (c.1542), later New Granada (1717/1739) and Río de la Plata (1776); *audiencias*, *cabildos*; Habsburg to 1700, Bourbon after.
- **Places:** Mexico City, Puebla, Veracruz, Acapulco, Lima, Cuzco, Potosí, Cartagena, Havana, Manila (Pacific link, P2).
- **Population:** Indigenous majority in highlands (Nahua, Maya, Quechua, Aymara and many others); Spanish-born *peninsulares*; American-born *criollos*; *mestizos*; Africans and Afro-descendants (free and enslaved). *Casta* labels were real legal/social vocabulary but their rigidity varied; the "16 castas" painting genre is 18th-century and not a legal code \[U on enforcement\].
- **Economy:** silver mining (Potosí *mita* labor draft; Mexican mines wage/*repartimiento*), haciendas, obrajes (textile workshops), Church wealth, Manila galleon.
- **Religion:** Catholicism with Indigenous syncretism; Inquisition tribunals (Mexico 1571, Lima 1570); Jesuit missions (expelled 1767).
- **Military:** militias, presidios, frontier wars (Chichimeca war, Mapuche war).
- **Risks:** epidemics, forced labor drafts, mine accidents, hacienda debt peonage, Inquisition, uprisings.
- **Key events:** conquest, New Laws 1542, Valladolid debate 1550–51, Túpac Amaru II 1780–81, independence 1810–1824.

### R2. Portuguese Atlantic and Brazil (P1)

- Captaincies (1534), Salvador capital (1549), Rio from 1763; sugar, then gold in Minas Gerais (from 1690s), then coffee (19th c.); Dutch Brazil (1630–54); *quilombos* including Palmares (late 16th c. to 1694); royal court moves to Rio 1808; independence 1822.
- Africa link: Luanda (1576) and Benguela as slave-embarkation ports; Brazil received the largest share of enslaved Africans disembarked \[F\].

### R3. English/British, French, Dutch Atlantic: North America and Caribbean (P0 candidate)

- **Chesapeake** (Virginia, Maryland): tobacco; indentured servants to 1670s then enslaved Africans; Virginia slave codes 1660s–1705 define hereditary status \[F\].
- **New England** and **Middle Colonies**: family farms, shipping, trade; Puritan communities; Quaker Pennsylvania (1681); New York (Dutch to 1664).
- **Carolina/Georgia**: rice and indigo, enslaved majority in lowcountry.
- **Caribbean** (Barbados, Jamaica, Saint-Domingue, Cuba from 1800s): sugar; enslaved majority; extremely high mortality and negative natural increase for enslaved people; maroon communities (Jamaica treaties 1739–40).
- **New France:** fur trade, seigneurial system, Catholic; Conquest 1759–60.
- **Indigenous nations** (Powhatan, Wampanoag, Haudenosaunee, Cherokee, Shawnee, Lakota later): not "background"; each is a playable cultural context with its own kinship and political systems (P1/P2).
- **Languages:** English, French, Dutch, many Indigenous languages, creoles.
- **Key events:** Jamestown 1607, Pequot/King Philip's wars, Salem 1692, Seven Years' War, Revolution, Haitian Revolution 1791–1804, Indian Removal 1830.

### R4. West and West-Central Africa (P0 candidate for a coastal module; deep interior P2)

- **States \[F\]:** Kongo (Christian, Mbanza Kongo/São Salvador), Ndongo/Matamba (Queen Njinga, c.1583–1663), Benin (Oba, Edo), Oyo (Yoruba, Alaafin), Dahomey (Abomey), Asante (Kumasi, Golden Stool, c.1701), Senegambian kingdoms, Akan coastal states; Songhai (to 1591).
- **Economy:** gold, ivory, cloth, salt, iron, agricultural surplus; Atlantic exchange for cloth, metal, firearms, cowries, alcohol; the slave trade as a state-shaping industry \[F\]. African rulers and merchants were agents with their own interests, not passive recipients \[F\].
- **Social:** kinship/lineage structures, titled elites, enslaved populations within Africa (distinct from chattel export), guilds, secret societies, religious specialists.
- **Religion:** many local religions; Islam in the Sahel and Senegambia; Christianity in Kongo; Kimpa Vita (executed 1706) movement.
- **Military:** firearms-armed infantry, cavalry in the savanna, standing armies (Dahomey), slave-raiding warfare, coastal forts (e.g., Elmina, Portuguese 1482, Dutch 1637).
- **Risks:** raiding, capture, war, famine, epidemic, witchcraft accusations.
- **Key events:** Afonso I's reign, Tondibi 1591, Mbwila 1665, Oyo-Dahomey tribute, Asante wars, Atlantic abolition and naval patrols from 1808, Freetown (1787/1792), Liberia 1822.

### R5. Mughal and Colonial India (P0 candidate)

- **Entities \[F\]:** Mughal Empire (to 1707 strong; titular to 1857); successor states: Bengal, Awadh, Hyderabad, Maratha confederacy, Mysore, Sikh state (Ranjit Singh, 1799–1839); European enclaves: Goa (Portuguese), Pondicherry (French), Chinsurah (Dutch), Bombay (English from 1661), Madras (Fort St George 1639/40), Calcutta (1690 settlement), later presidencies.
- **Population:** Hindu majority, Muslim minority, Sikh, Jain, Christian, Parsi; jati, varna, *ashraf*/*ajlaf*, Adivasi communities; European and Eurasian communities.
- **Economy:** agriculture (land revenue central), textile weaving, banking houses (e.g., Jagat Seths in Bengal), grain trade, overland and maritime trade.
- **Governance:** *mansabdari* system and *jagirs* under Mughals; *zamindars*; Company *diwani* (1765); Permanent Settlement in Bengal (1793); ryotwari and mahalwari systems (19th c.).
- **Military:** cavalry, artillery, sepoy armies (Company sepoys, increasingly drilled), mercenaries.
- **Risks:** famine (Bengal 1769–70), war, taxation, banditry, cholera (pandemic from 1817 starting in Bengal \[F\]).
- **Key events:** Panipat 1526, Akbar's reforms, Aurangzeb, Nader Shah 1739, Plassey 1757, Mysore wars, Maratha wars, 1857.

### R6. Ming and Qing China (P0 candidate)

- **Ming \[F\]:** Zhengde/Jiajing/Wanli; Single Whip tax reform (c.1581); silver economy; Jiangnan commercial prosperity; wokou coastal raids (mid-16th c.); Macau. **Late Ming crisis:** 1620s–40s famine, rebellion (Li Zicheng), Little Ice Age effects \[U on causal weight\].
- **Qing \[F\]:** Manchu conquest 1644; queue order 1645; Eight Banners; civil service examinations (*keju*); Kangxi (1661–1722), Yongzheng, Qianlong (1735–96); Canton System (1757); population growth from roughly 150 million around 1700 to over 400 million by 1850 \[U: approximate\]; White Lotus rebellion; Opium trade and war.
- **Places:** Beijing, Nanjing, Suzhou, Hangzhou, Guangzhou (Canton, Thirteen Hongs), Macau, Yangzhou (salt merchants), rural villages, lineage estates.
- **Social:** gentry-scholar (*shi/shenshi*), peasants, artisans, merchants, banner families, "mean" (*jianmin*) status groups until Yongzheng-era reforms in places \[U on scope\].
- **Religion:** Confucian social order, Buddhism, Daoism, folk religion, Islam (Hui), Christianity (Jesuits, Rites Controversy and 1724 ban).
- **Risks:** famine, flood (Yellow River), rebellion, corvée, corruption, opium.

### R7. Tokugawa Japan (P0 candidate)

- **Entities \[F\]:** Shogunate in Edo; *daimyo* domains (*han*, roughly 250–270), *bakufu* retainers (*hatamoto*), Kyoto imperial court, Osaka merchants, Nagasaki (Dejima Dutch from 1641, Chinese quarter), Satsuma/Tsushima/Matsumae as controlled contact channels (Ryukyu, Korea, Ainu).
- **Social:** *shi-nō-kō-shō* ideal (samurai, farmers, artisans, merchants) was an ideal, not a literal rank law \[U on strictness\]; outcastes (*eta/hinin*); village headmen; temple registration (*terauke*) from the 1630s–1670s; Christianity banned (1614), *fumi-e* trials, Shimabara 1637–38.
- **Economy:** rice-stipend system (*koku*), commercialization, Osaka rice exchange (Dojima), merchant houses, guilds.
- **Culture:** Genroku (1688–1704), kabuki, ukiyo-e, Neo-Confucianism, *kokugaku*, *rangaku* (Dutch learning).
- **Risks:** famine (Kyōhō 1732, Tenmei 1782–88, Tenpō 1833–37), fire in Edo, earthquakes, domain debt, peasant uprisings (*ikki*).

### R8. Other Modules (P2/P3)

Cape Colony and Khoikhoi/San/Xhosa frontier (VOC 1652; British 1806; Great Trek 1836); Swahili coast and Oman/Zanzibar; Batavia and Dutch East Indies (founded 1619); Philippines under Spain (Manila); Metropolitan Europe as origin of colonists (Seville/Lisbon/Amsterdam/London/Bristol/Nantes); Ottoman and Safavid adjacency; Korea and Ryukyu; Siam/Vietnam/Burma; Pacific (late).

---

## 4. Historical World Model

&#91;M\] The world is a graph of **entities with typed relations**, updated per tick (monthly, with season) and annually for slow tracks.

**Entity types:**

- **PoliticalEntity:** empire, kingdom, shogunate/domain, company-state, viceroyalty, colony, republic, tribal confederacy, city-state. Fields: ruler, legitimacy, treasury (abstract), military capacity, territory set, allies/rivals, tax regime, laws.
- **Settlement:** capital, port city, market town, plantation, mission, fort/factory, village, mine town, castle town.
- **Institution:** Church/clergy orders, Inquisition, Company, guild, lineage trust, *han* (domain), *zamindari*, banner, mosque/temple/shrine network, plantation estate, village council, *cabildo*, *audiencia*, university/academy.
- **Faction:** a bundle of interests tied to institutions (e.g., Jesuits, criollo elite, planter lobby, abolitionists, Maratha chiefs, Hong merchants, Satsuma domain).
- **Trade Network:** edges with goods, volume, controlling entity: Atlantic triangle, Manila galleon, Cape route, Indian Ocean monsoon trade, Canton tea-silver, Nagasaki Dutch channel, trans-Saharan routes.
- **Family/Dynasty:** named lineages of rulers and elite houses (Habsburg, Bourbon, Stuart/Hanover, Mughal Timurids, Tokugawa, Qing Aisin Gioro, Oyo Alaafin line).

**Key relations \[M\]:** `rules`, `taxes`, `trades_with`, `at_war_with`, `tributary_of`, `patron_of`, `member_of`, `controls_port`, `owes_debt_to`, `legitimizes`.

**Core structural facts the world model must encode \[F\]:**

1. Colonial empires were patchworks of ports, forts and inland states, not solid maps; much of Africa and Asia stayed under local rule through most of the era.
2. Company armies and state armies overlap; "nation" is not always the correct unit.
3. Local intermediaries (African merchants and rulers, Indian *banias* and *dubashes*, Chinese Hong merchants, Japanese Nagasaki interpreters, Indigenous leaders, criollo elites) were essential and had agency.
4. Metropole decisions arrive with **communication lag**: Spain-Mexico months; London-Calcutta 4-8 months by sail around the Cape \[F, approximate\]. \[M\] Order and news delay is a mechanic (Section 13).

---

## 5. Player Creation

### 5.1 Resolution Order \[M\] (P0)

```text
1. Date (Auto: sampled weighted by content availability; Custom: player-chosen)
2. Region module + Settlement (Auto: weighted by population share of playable modules; Custom: player picks region, then a place or "random in region")
3. Legal/status system for that region at that date
4. Cultural-religious community within the region
5. Household (class, wealth, parents' occupations, siblings, legal status)
6. Sex/gender (see 5.4), body traits, hidden traits, inherited vulnerabilities
7. Immediate world-state snapshot (ruler, wars, epidemics, harvest quality, prices)
```

### 5.2 What Is Random vs Determined

| Attribute | Determined by date/location | Random within constraints |
| --- | --- | --- |
| Ruler, laws, wars, epidemics, famine years | Yes (timelines) | No |
| Languages and scripts available | Yes | Literacy of parents |
| Legal status system (free/unfree/caste/banner/mibun/casta) | Yes | Which status the household holds |
| Religion | Weighted by region/community | Denomination or sect, devoutness |
| Wealth tier | Weighted by region class distribution | Exact assets |
| Parents' occupations | Weighted by class and region | Specific job |
| Siblings, birth order | No | Yes (demographic tables) |
| Health traits, fertility, temperament | No | Yes |
| Birth survival | Weighted by region/class/season/epidemic | Yes |

### 5.3 Auto Create Sampling \[M\]

- Sample a date across 1500–1858 weighted by content density, so the MVP does not spawn dates with no event data. Optional **Historical Spotlight** toggle biases toward years near major events.
- Sample location from the playable-module list. Region weights should reflect plausible population share with a gameplay-balancing floor (e.g., 5%) so small modules still appear. Keep weights in config.
- Reject combinations with no authored content (`content_coverage < threshold`) and retry.

### 5.4 Gender and Sex Handling \[M\]

Era societies were strongly gendered. Model gendered legal and social constraints as history, not as arbitrary penalties.

- Birth sex sampled at roughly 105 male : 100 female \[F, approximate\]. Custom Life lets the player choose.
- Region-specific gender roles: Han Chinese foot-binding (not practiced by Manchu women; prevalence varied by class and region \[U\]); Japanese *ie* household system; Iberian honor and virginity codes; English coverture; Akan and Yoruba women's market authority; Haudenosaunee clan mothers; Mughal *zenana* and women's property rights under Islamic law.
- Historically attested non-binary or third-gender roles (*hijra* communities in India \[F\]; *wakashu* in Edo Japan as an age-linked male youth category \[F\]; Two-Spirit roles in several Native nations \[F, varied by nation\]) are P2 content, written region-specifically and respectfully. Do not project modern identity categories backward.
- P1 option: play a life from a chosen sex regardless of birth tables, with a visible notice that the world will respond historically.

### 5.5 Family Structure Options by Region \[F/M\]

- **Iberian America:** nuclear and extended Catholic households; *compadrazgo* (godparent ties); high illegitimacy; enslaved household members.
- **Chesapeake/Caribbean:** planter families vs enslaved families (legally unprotected, sold apart); indentured servants.
- **New England:** nuclear family farms, Puritan covenants.
- **West Africa:** lineage-based (matrilineal among many Akan, patrilineal elsewhere), polygyny among wealthy men, extended compounds.
- **India:** joint families; jati endogamy; purdah among elites.
- **China:** patrilineal lineage (*zu*); multi-generation household ideal; concubinage for wealthy men; ancestral halls.
- **Japan:** *ie* continuity; adoption (including adult adoption) to preserve lines; five-household groups (*goningumi*).
- **Indigenous North America:** clan and band systems varying widely (matrilineal Haudenosaunee and Cherokee; patrilineal elsewhere).

### 5.6 Starting Advantages and Disadvantages \[M\]

- **Advantages:** literate parent; guild membership by birth; hereditary office (headman, *zamindar*, chief's household); good birth season; inherited disease resistance (e.g., malaria-protective traits such as sickle-cell trait are real \[F\], but must be a hidden *inherited resistance* flag, never a "race stat").
- **Disadvantages:** debt-bonded parents; legal unfreedom; stigmatized caste or outcaste status; recently conquered group; epidemic in birth year; widowed mother; religiously suspect household (converso, hidden Christian in Japan, accused witch).

---

## 6. Social Classes and Life Paths

Each region module defines its own **StatusSystem**.

### 6.1 Cross-Region Class Tiers \[M\]

Used only for generic UI and balancing. Never replace the regional system in dialogue.

```text
T0 Unfree/Bonded (enslaved, debt-bonded, convict labor)
T1 Dependent poor (tenants, landless laborers, casual workers, indentured servants)
T2 Common free (smallholders, artisans, small traders, fishers)
T3 Middling (master craftsmen, merchants, clerks, minor officials, scholar families)
T4 Elite (large landholders, high clergy, merchant magnates, gentry-officials)
T5 Ruling (royalty, viceroys, governors, rulers, top company officers)
```

### 6.2 Region Status Systems (P0 core)

**Mughal / Colonial India \[F/M\]**

- *Systems:* varna/jati (endogamous occupational communities), religious communities (Hindu, Muslim, Sikh, Jain, Christian, Parsi), service nobility (*mansabdars*), land-revenue hierarchy (*zamindars*, *ryots*).
- *Tiers:* landless laborers and low-jati groups, some facing untouchability (T0/T1); cultivators (T2); weavers/artisans/traders (T2–T3); *bania* bankers and *zamindars* (T3–T4); *mansabdars*, nawabs, Maratha chiefs (T4–T5); Company servants (T3–T5 by rank and date).
- *Rights:* community law (dharmashastra custom, Islamic law, caste councils), local ruler; after 1765 Company courts in Bengal.
- *Mobility:* limited by jati but real: military service, trade, administrative skill, patronage, conversion.
- *Education:* *pathshala*/*maktab*/madrasa, apprenticeship; English-medium education only from the 1830s.
- *Marriage:* arranged, jati-endogamous, dowry customs vary; child betrothal common \[F, varied\]; widow remarriage restricted among many upper groups.
- *Military access:* martial communities; Company sepoy recruitment (caste-specific in the Bengal Army from the late 18th c. \[F\]).
- *Risks:* famine, taxation, debt, plunder, cholera.
- *Opportunities:* banking, textiles, Company contracts (*banian/dubash* intermediaries), military pay.

**Qing China \[F/M\]**

- *Systems:* four-occupation ideal (scholar, farmer, artisan, merchant), banner vs civilian divide (Manchu, Mongol, Han banners), gentry degree-holders (*shengyuan*, *juren*, *jinshi*), lineage trusts.
- *Tiers:* tenants and peasants (T1–T2); artisans/small traders (T2); village literati, rich peasants, merchants (T3); degree-holding gentry, salt and Hong merchants, officials (T4); imperial clan, high officials (T5). Unfree: bondservants (*booi*) in banner households.
- *Mobility:* exams are the legitimate route but costly and high-failure; official titles could be purchased in some periods.
- *Education:* clan schools, tutors, Four Books, eight-legged essay.
- *Marriage:* family-arranged, patrilocal; concubinage; widow-chastity ideology.
- *Military access:* hereditary banner garrisons, Green Standard Army, local militia (especially after 1796).
- *Risks:* famine, Yellow River floods, tax surcharges, rebellion, piracy, opium.
- *Opportunities:* exams, Canton/salt/silk/tea trade, *yamen* clerk work, lineage office.

**Tokugawa Japan \[F/M\]**

- *Systems:* *mibun*: samurai (roughly 5–7% of population \[U\]), peasants, artisans, merchants; outcastes (*eta*/*hinin*) with local variation; clergy and court nobles separate. The four-class scheme was an ideal, not a literal rank law \[U on strictness\].
- *Tiers:* tenants and day laborers (T1); farmers, artisans, merchants (T2–T3); low samurai (*ashigaru*) (T2–T3); mid samurai (T3); upper retainers (T4); daimyo (T5).
- *Rights:* sword privilege for samurai; movement restricted by registration and travel passes.
- *Mobility:* adoption into samurai houses (purchasable in later periods), merchant wealth, scholarly service (including *rangaku* physicians), village headman roles.
- *Education:* *terakoya* temple schools for commoners; domain schools (*hankō*) for samurai; commoner literacy high by the 18th century \[F, relative to peer societies\].
- *Marriage:* arranged within status; adopted sons-in-law (*mukoyōshi*).
- *Military access:* samurai only; mostly bureaucratic after 1615.
- *Risks:* famine, Edo fires, earthquakes, domain debt, *ikki* repression, Christian ban.
- *Opportunities:* urban trade, rice brokerage, domain service, print industry, theater.

**Atlantic Africa (Dahomey / Asante / Kongo / Oyo type) \[F/M\]**

- *Systems:* royal lineage, titled office-holders, free commoners, enslaved people (domestic/farm/state; rights varied), specialist guilds (smiths, weavers, traders), religious specialists.
- *Mobility:* military achievement (Dahomey, Asante), trade wealth, office.
- *Risks:* raiding, capture and sale, war, accusation, famine, malaria and sleeping sickness.
- *Education:* oral tradition, apprenticeship, initiation societies, Quranic schools in Islamic areas.
- *Marriage:* polygyny among the wealthy; bridewealth; lineage alliance.

**Plantation Atlantic (Chesapeake, Caribbean, Brazil, Saint-Domingue)**

- *Tiers:* enslaved (T0); free people of color and manumitted (T1–T3, legally restricted); indentured and poor whites (T1–T2); small farmers/artisans (T2); merchants/professionals (T3); planter elite (T4); governors and Company agents (T5).
- *Law:* slave codes; French *Code Noir* (1685) with nominal protections weakly enforced \[F\].
- *Mobility:* manumission rare and restricted; self-purchase (*coartación* in Spanish colonies, *alforria* in Brazil \[F\]); free Black and mixed-ancestry militias in some colonies.
- *Risks:* extreme mortality, punishment, family separation, disease, hurricane.
- *Opportunities:* skilled trades, provision-ground markets, maroon escape, rebellion.

**Spanish America \[F/M\]**

- Tiers: Indigenous commoners (*tributarios*, T1–T2); *caciques* (T3–T4); *mestizos* and *castas* (T1–T3); enslaved Africans (T0); *criollo* elite (T3–T4); *peninsulares* office holders (T4–T5); clergy cross-cutting.
- The *república de indios* gave Indigenous people some legal protections alongside obligations (tribute, *mita*, *repartimiento*). *Limpieza de sangre* mattered for certain offices and guilds.

### 6.3 Life Paths and Careers \[M\]

Careers are region-gated, status-gated and date-gated records. No modern careers.

| Career | Regions | Status gate | Date gate | Notes |
| --- | --- | --- | --- | --- |
| Peasant cultivator / tenant | all | T1–T2 | all | harvest cycle |
| Weaver / textile artisan | India, China, Japan, Europe, W. Africa | T2 | all | Company advances (*dadni*) in India |
| Rice broker / merchant clerk | Japan | T2–T3 | after c.1650 | Osaka/Edo |
| Exam candidate / scholar-official | China (Japan analogue for samurai-scholars) | T3+ | all | long, high-failure |
| Soldier: banner / sepoy / militia / samurai retainer | China/India/Japan | status-gated | all | stable pay vs war risk |
| Planter / overseer / bookkeeper | Plantation Atlantic | T2–T4 | after c.1550 | moral weight must surface in consequences |
| Skilled artisan, house servant, field worker, driver | Plantation Atlantic, Spanish America | T0 | after c.1520 | autonomy mechanics (Section 18) |
| Sailor / crew (merchant, naval, company, slaver) | Atlantic, Indian Ocean | T1–T2 | all | high mortality; naval impressment |
| Priest / missionary / monk / nun | all | clergy status | all | Jesuits in Asia; mission towns |
| Merchant / factor / agent | all | T2–T4 | all | Hong merchant, caravan trader |
| Banker (*bania*, *shroff*), moneylender | India, Japan, Europe | T3 | all |  |
| Interpreter / go-between (*dubash*, linguist, Dejima interpreter) | Asia, Africa, Americas | T2–T3 | all | high-influence intermediary |
| Midwife, healer, physician (Ayurvedic, Unani, Chinese, European) | all | varies | all | different medical systems |
| Clerk / court retainer (*yamen* clerk, *munshi*) | China, India | T2–T3 | all |  |
| Frontiersman, fur trader, scout, mercenary | Americas, Africa, India | varies | all |  |
| Convict / servant transported | British Atlantic | T0–T1 | c.1615–1776 |  |
| Smuggler / pirate | Atlantic, Indian Ocean, China coast | T1–T3 | all |  |
| Rebel / maroon / bandit / heterodox preacher | all | any | all | direct divergence hooks |

**Status mobility \[M\]:** each class defines `mobility_paths` with prerequisites and `success_probability` as a function of Skill, Connections, Wealth and region/date modifiers. Mobility must be rare, costly and visible, never a free level-up.

---

## 7. Childhood to Old Age

### 7.1 Time Model \[M\]

- **Tick:** 1 season for ages 0–12 and 60+; 1 month for active adult years or crises; event-driven compression otherwise. Season matters for harvest, monsoon, sailing and epidemics.

### 7.2 Birth

- Survival roll uses region, class, season, mother's health, epidemic state, famine, and attendant quality.
- **Infant and child mortality \[U, ranges\]:** commonly 15–30% die before age 1 and roughly 35–50% before 15 in many pre-industrial populations; enslaved infants and children in Caribbean sugar colonies fared worse; some elite East Asian lineages did better. Never hard-code a single global rate; use region/class tables with ranges.
- P1: a short memorial screen when a birth does not survive, with a restart option.

### 7.3 Childhood (0–12)

- Events: weaning illness, chores from age 5+ in agrarian settings, religious rites (baptism, Hindu naming rites, Chinese first-birthday rites), early apprenticeship, orphanhood, sale risk for enslaved children.
- Child labor commonly begins around 6–10.

### 7.4 Adolescence (13–20)

- Gates: apprenticeship, betrothal/marriage, sepoy or soldier recruitment, exam preparation, initiation rites in some African societies, plantation field assignment.
- First **major life-path choice** appears here (Section 18).

### 7.5 Adulthood (20–50)

- Career, marriage, children, property, debt, litigation, migration, war service, faith crises. Gendered legal limits are modeled as rules (Section 12).

### 7.6 Old Age (50+)

- Retirement is rarely a concept. Care depends on family, lineage, patron, church/temple, or stipend. Elders hold high status in many societies; poor and enslaved elders face neglect.
- Legacy hooks: inheritance, adoption, ancestor veneration, memorial endowment.

### 7.7 Differences Matrix \[M\]

- **Region:** marriage ages, kinship, education, religion.
- **Class:** food security, medical access, literacy.
- **Gender:** legal capacity, inheritance, mobility, labor.
- **Wealth:** resilience to famine and debt.
- **Occupation:** exposure to risk (sailor, miner, soldier).
- **Time:** disease regime, law, war context.

---

## 8. Game Stats

Principle \[M\]: few, legible stats, with region-specific labels and effects. Only stats that change a decision or outcome are implemented.

### 8.1 Core Stats (visible)

**Health (0–100)** — physical condition. Changes with illness, injury, food security, workload, age, medical access. Affects survival rolls and capacity to work, fight and travel. Visible. A hidden **Constitution** sets the baseline.

**Strength (0–100)** — physical capacity for labor and combat. Rises with training and labor; falls with age and malnutrition. Gates labor-heavy and military careers. Visible.

**Learning (0–100)** — literacy, numeracy and formal or traditional knowledge in the region's own knowledge system (Classical Chinese, Persian, Sanskrit, Latin, Quranic recitation, oral genealogy). Changes with schooling, apprenticeship, self-study, travel. Affects career gates, exams, contract reading. Visible, with `literacy_languages[]`.

**Skill (per craft, 0–100)** — region craft list (weaving, farming, carpentry, smithing, navigation, gunnery, medicine, bookkeeping, translation). Practice raises it; tools and tutelage cap it. Affects income and risk. Visible.

**Resourcefulness (0–100)** — coping with scarcity, hostile environments, escape. Affects famine, travel, imprisonment and shipwreck outcomes. Shown as hints only.

### 8.2 Social Stats (visible)

**Standing** — a discrete, region-specific rank rather than a number (Edo: *ashigaru* → mid samurai → *hatamoto*; China: *shengyuan* → *juren* → *jinshi*; plantation: field hand → skilled → driver; India: jati position plus service rank). Affects eligibility, marriage market, legal outcomes. Changes by promotion, scandal, conquest.

**Reputation (multi-audience)** — sub-scores for *Kin, Community, Patron/Authority, Religious Body, Underworld/Rivals*. Changes with conduct and rumor. Affects trust, access, protection.

**Connections** — a relationship graph summarized as 0–100. Affects jobs, protection, bail, marriage. Changes through favors, gifts, kinship, debts, betrayal.

**Observance + Affiliation** — religious/cultural standing. Affects community acceptance, risk under Inquisition or ban, clergy options. Changes with practice, crises, conversion, persecution.

**Freedom (legal status)** — discrete: *Free, Bonded/Indentured (time-limited), Enslaved, Convict, Dependent (e.g., peon, unfree tenant)*, plus `manumission_progress` where applicable. A critical gate stat.

### 8.3 Wealth Stats

See Section 9 (five components).

### 8.4 Hidden Stats

- **Constitution:** inherited baseline resilience.
- **Temperament tags (3–5):** e.g., cautious, ambitious, devout, defiant, charming; weight choice outcomes.
- **Fertility/Childbirth Risk.**
- **Immunity History:** survived smallpox, malaria resistance, etc.
- **Heat (Suspicion):** how closely authorities watch (Inquisition, *bakufu* informants, Company police, slave patrols, *yamen*).
- **Obligations:** kin and patron duties (a debt of honor).
- **Historical Leverage:** composite gating influence over historical tracks (Section 19).

---

## 9. Economy

### 9.1 Representing Wealth \[M\] (P0)

Avoid one "money" number. Use five components:

1. **Subsistence Security** (0–100): household food and shelter margin; primary survival buffer.
2. **Cash/Silver:** local currency, internally converted to a silver-weight standard for cross-region math.
3. **Assets:** tools, livestock, houses, ships, workshops, stock. Enslaved people appear in region law as property, but the UI must treat them as people with their own records (see governance).
4. **Land/Rights:** holdings, tenancy rights, office income (*jagir*, stipend, tax farm), guild membership.
5. **Debt/Obligations:** loans, bondage, advances, tribute.

### 9.2 Currencies and Exchange \[F\]

- Spanish silver *peso de a ocho* circulated worldwide; Ming/Qing silver by weight (*tael*) plus copper cash; Mughal silver rupee; Tokugawa gold *ryō*, silver by weight, copper *mon*; cowrie shells, cloth and iron bars in parts of West Africa; wampum in eastern North America; commodity money (tobacco in Chesapeake).
- &#91;M\] `Currency` entities carry `silver_equivalent` ranges and `acceptance` by region.

### 9.3 Goods and Trade \[F\]

- Silver, sugar, tobacco, tea, spices, cotton textiles, silk, porcelain, furs, cacao, coffee, rice, indigo, timber, gold, and enslaved people.
- Networks: Atlantic triangle, Manila galleon (from 1565), Indian Ocean monsoon trade, Canton tea-silver-opium trade, Nagasaki Dutch/Chinese channel, trans-Saharan routes.
- &#91;M\] Regional **Price Index** (grain, cloth, salt, tools, labor) driven by harvest and war tracks.

### 9.4 Land, Taxes, Tribute \[F\]

- Mughal land revenue; Company systems (Permanent Settlement 1793 in Bengal; ryotwari; mahalwari); Qing land tax and grain tribute; Tokugawa *kokudaka* rice assessment; Spanish *tribute*/*mita*/*repartimiento*; tithes; African tribute from subordinate states.
- &#91;M\] **Obligation Resolver:** each tick computes taxes, rent, labor service, tithes and tribute due; shortfalls cause debt, flight, penalties or rebellion events.

### 9.5 Employment and Markets

- Wage labor exists, but most work is kin-based, tenancy-based, tributary, guild-based or unfree. Do not default to "job + salary".
- Markets: town markets, fairs, port auctions, Company warehouses, Dojima rice exchange, Canton Hongs, plantation provision grounds.

### 9.6 Risks and Opportunities

- Risks: harvest failure, price spikes, debasement, tax hikes, debt spirals, piracy, war requisition, monopoly changes.
- Opportunities: Columbian Exchange crops (maize, potato, sweet potato spread widely \[F\]), trade partnerships, patronage, land clearance, smuggling.

---

## 10. Politics and Power

### 10.1 Structures by Module \[F/M\]

- **Spanish/Portuguese America:** viceroys, *audiencias*, *cabildos*, Church; sale of offices grows in the 17th century.
- **British colonies:** governors, assemblies, charters; Parliament vs colonies tension.
- **West Africa:** sacral kingship, councils, queen mothers (Asante), military titles, lineage heads.
- **India:** emperor/nawab/raja, *mansabdari*, *zamindars*, village *panchayats*, Company residents and councils.
- **Qing:** emperor, Grand Council (from the 1730s), Six Boards, governors, county magistrates with clerks and runners, banners.
- **Tokugawa:** shogun, senior councillors (*rōjū*), daimyo, inspectors (*metsuke*), village and town elders.

### 10.2 Succession and Legitimacy \[M\]

Each PoliticalEntity has a **succession ruleset** (primogeniture, brother-to-brother, Mughal war of succession, Qing secret-edict succession from Yongzheng \[F\], shogunal adoption, Asante matrilineal succession) and a **legitimacy score**. Rulers change on hard-dated historical tracks unless a divergence unlocks alternatives.

### 10.3 How an Ordinary Player Interacts (P0)

- **Petition/appeal** to magistrate, *kadi*, *alcalde*, village council or patron.
- **Tax/labor negotiation:** delay, bribe, appeal, flee.
- **Patronage:** join a household, faction, guild or militia.
- **Local offices** (headman, clerk, agent, militia captain) as stepping stones.
- **Collective action:** petition, strike, flight, riot, rebellion, each with a visible risk preview and hidden Heat.
- **Diplomacy** only for mid/high-status roles (interpreter, merchant envoy, local chief), as structured missions.

### 10.4 Laws and Authority \[M\]

- `LawSet` per entity: crimes, penalties, procedure, inheritance, status-based exceptions.
- Examples \[F\]: Virginia slave codes (comprehensive 1705), *Code Noir* (1685), *Da Qing lüli*, Tokugawa *Kujikata osadamegaki* (1742), Spanish *Recopilación de Leyes de Indias* (1680), Islamic and customary law.
- Punishment severity and bias per status are part of the law data; do not generate modern fairness.

---

## 11. War and Conflict

### 11.1 Conflict Types \[F/M\]

| Type | Examples | Player-facing form |
| --- | --- | --- |
| Conquest war | Mexico 1519–21, Peru 1532–72, Qing conquest 1644–83 | levy, auxiliary, civilian under siege, collaborator |
| Dynastic/succession war | Mughal succession wars, Japanese Sengoku to 1615 | choosing patron, service, flight |
| Interstate/imperial war | Seven Years' War (1756–63), Anglo-Mysore and Maratha wars | conscription, requisition, siege, news-lag |
| Slave-raiding and state warfare in Africa | Dahomey, Asante, Oyo campaigns | warrior, raided villager, captive, trader |
| Frontier/Indigenous wars | King Philip's War (1675–76), Pueblo Revolt (1680), Mapuche war | militia, scout, refugee, captive, diplomat |
| Rebellion/revolution | Túpac Amaru II, Haiti 1791–1804, White Lotus, Taiping, 1857 | join, inform, flee, suppress |
| Maritime conflict | piracy, privateering, naval blockades, Anglo-Dutch wars | crew, captive, merchant under convoy |
| Local feud/banditry | all regions | household defense, militia |

### 11.2 Who Fights, Recruitment \[F/M\]

- **Hereditary or status-based:** banner troops (Qing), samurai (Japan), *mansabdar* cavalry (Mughal), *encomenderos*/militias (Spanish America).
- **Levies and militia:** English colonial militia (mandatory for free men), Qing local militia, village levies.
- **Paid/mercenary:** Company sepoys (drilled European-style units, growing from the 1750s), European regiments, mercenary bands.
- **Forced:** naval impressment (Britain), conscription by rulers, *corvée* labor, captive soldiers.
- **Slave soldiers/free people of color:** militias in Spanish and French colonies; armies of rebel leaders in Haiti.
- &#91;M\] Recruitment is an **event**, not a menu: age, Strength, Standing, patron and region produce an offer, a demand, or an impressment.

### 11.3 Military Roles \[M\]

Cavalry, infantry (arquebus/musket, pike, bow, spear), artillery crew, sapper, camp follower and supply worker, sailor and gunner, scout/interpreter, officer (status-gated), clerk/paymaster, surgeon. Women appear as camp followers, defenders, spies, rulers and, rarely, fighters (e.g., Dahomey's female royal guard from the 18th century \[F\]; Rani Lakshmibai in 1857 \[F\]).

### 11.4 Weapons by SubEra \[F\]

- **A:** swords, pikes, crossbows, early arquebuses, steel armor; war horses and dogs in the Americas; Japanese matchlocks (*tanegashima*, from 1543).
- **B:** flintlock transition, bayonet, field artillery, fortified positions; cavalry still key in India and Central Asia.
- **C:** line infantry with flintlock muskets, light artillery, naval ships of the line.
- **D:** percussion caps, rifled muskets (Enfield 1853), steamships, early railways in logistics.

### 11.5 Risks and Rewards \[M\]

- **Risks:** battle death or wounds (infection often kills after survival), disease in camps (typically deadlier than combat), capture, execution of rebels, plunder retaliation, famine after campaigns.
- **Rewards:** pay (often late), booty, land grants, status promotion, patron favor, pension (rare), manumission (in some contexts, e.g., service for freedom, though inconsistently honored).

### 11.6 Prison, Injury, Death \[M\]

- **Prison:** long-term imprisonment is rare as punishment; common outcomes are fines, corporal punishment, forced labor, galley service (declining), transportation, exile, execution, enslavement of captives.
- **Injury system:** persistent injury tags (limb loss, scarring, fever relapse) that alter work, fight and social options.
- **Death:** battle, execution, disease, shipwreck, mutiny, massacre.

### 11.7 Territory and Political Consequences \[M\]

Wars do not modify abstract "borders" directly. They alter **control of settlements, tax rights, trade ports, and status systems** in the world model. Outcomes are **historical tracks** that may branch only through Section 19 rules.

### 11.8 Design Rules

- No generic strategy map. The player experiences war as **pressure, chance and consequences** around their household, labor, loyalty and survival.
- Large battles are summarized with **"you are here" role vignettes** (e.g., baggage train at Plassey), with the outcome fixed unless a divergence qualifies.

---

## 12. Religion, Culture and Society

### 12.1 Religions and Belief Systems \[F\]

Catholicism (Iberian, French, Jesuit/Franciscan/Dominican missions), Protestant denominations (Anglican, Puritan/Congregationalist, Quaker, Reformed, Lutheran, Moravian), Judaism (including conversos, Amsterdam and Caribbean communities), Islam (Sunni/Shia; Sufi orders; Mughal, Swahili and West African contexts), Hinduism (Vaishnava, Shaiva, Shakta; bhakti movements), Sikhism (Khalsa 1699), Jainism, Buddhism (Japan, China), Confucian ritual order, Daoism, Chinese folk religion, Shinto (shrine-temple systems), Indigenous American religions, West and Central African religions (ancestor veneration, spirit possession, *Vodun*, *Orisha* worship), and syncretic traditions (Candomblé, Vodou, Santería emerging; Christian-Kongo syncretism).

### 12.2 Gameplay Role \[M\]

- **Observance** (Section 8) + **Affiliation** gate marriages, offices, clergy careers and legal treatment.
- **Religious calendar** drives festivals (harvest rites, Lent/Carnival, Ramadan/Eid, Diwali/Holi, Chinese New Year, Japanese *matsuri*, Obon) that create seasonal events, expenses and social visibility.
- **Persecution/ban systems:** Inquisition (Iberian America, Goa), Christian ban and *fumi-e* (Japan), Qing proscription of heterodox sects (White Lotus), Protestant-Catholic conflict, Mughal religious policy shifts (Akbar's tolerance and *sulh-i kul*; Aurangzeb's reimposition of jizya in 1679 \[F\]).

### 12.3 Customs, Norms, Taboos \[F/M examples\]

- **Honor/purity:** *limpieza de sangre*, caste purity rules, Chinese filial piety, Japanese duty obligations (use cautiously; avoid essentializing \[U\]).
- **Marriage:** dowry, bridewealth, arranged alliances, endogamy norms, concubinage, adoption.
- **Death rites:** ancestor altars, cremation vs burial, funeral expense obligations.
- **Dress and status markers:** queue hairstyle in Qing China (1645 order), sumptuary laws (Tokugawa; European), turbans and caste marks, mourning dress.
- **Taboos:** blasphemy, apostasy, forbidden marriages (inter-caste, inter-status), witchcraft accusation (European trials into the early 1700s; Salem 1692; accusations in African and other societies).

### 12.4 Community Structures \[F/M\]

Parish and *compadrazgo*; Chinese lineages and temple associations; village councils (India *panchayat*; Japan *mura* with headman); guilds (Europe, India *mahajan*, Japan *kabu nakama*, China *huiguan*); African age sets and secret societies (*Poro*, *Ogboni* \[F, regionally specific\]); lay brotherhoods (*cofradías*) in Iberian America; maroon communities.

### 12.5 What Affects Gameplay \[M\]

Observance, Affiliation, Standing, marriage rules, legal status, festival cycle, taboo-violation checks (feeding **Heat**), community support structures (providing safety nets and obligations).

---

## 13. Technology and Knowledge

### 13.1 Tech Level Matrix \[F/M\]

The engine uses `Technology` records with `available_from`, `region_access` and `adoption_curve` (not binary). Tables are design anchors.

| Domain | A (1500–1600) | B (1600–1700) | C (1700–1790) | D (1790–1858) |
| --- | --- | --- | --- | --- |
| Transport | sail, galleons, animals, river craft | fluyts, improved charts | copper-sheathed hulls (late), turnpikes (Britain) | steamboats (from 1807), railways (1830s+), early steamships |
| Communication | letters, couriers, printing | postal systems, gazettes | newspapers, coffeehouse news | telegraph (1840s West; India 1850s) |
| Agriculture | plow, hoe, terracing, rice paddies | maize/potato spreading | crop rotation (Europe), new crops | guano, early mechanization |
| Medicine | humoral theory; Ayurveda; Unani; Chinese medicine; herbal and midwifery | cinchona bark (quinine source) used in Europe | variolation and inoculation (older in Asia and Africa) | Jenner vaccination (1796), anesthesia (1846), cholera theories |
| Weapons | arquebus, cannon, sword, bow | flintlock, bayonet | line infantry, field artillery | percussion, rifles, steam warships |
| Construction | wood, stone, fortresses, adobe, bamboo | bastion forts | masonry cities, canal works | iron, rail infrastructure |
| Manufacturing | handicraft, water mills, forges | workshops, sugar mills | early factories (Britain) | factory systems, steam engines |
| Knowledge | scholastic, Neo-Confucian, Persian-Islamic, oral | Jesuit science in Qing; Scientific Revolution | Enlightenment; *rangaku* | industrial science, Orientalist scholarship |

### 13.2 Gameplay Effects \[M\]

- **Information lag:** news travel times per route and date (e.g., London–Calcutta roughly 4–8 months in the 18th century \[F, approximate\]; faster with steam later). Decisions use stale information; events resolve with delays.
- **Travel:** voyages are risk events (storm, scurvy, piracy, calm). Overland journeys depend on season and escorts.
- **Craft constraints:** Skill ceilings depend on tools and local knowledge.
- **Medicine:** multiple systems with different availability and trust; effects probabilistic and sometimes harmful.
- **Literacy:** information access depends on languages and scripts.

---

## 14. Health, Disease and Survival

### 14.1 Diseases \[F\]

Smallpox (global; devastating in the Americas; variolation traditional in parts of Asia and Africa; Jenner 1796), measles, typhus, plague (late waves; Marseille 1720), tuberculosis, dysentery, malaria (endemic across the tropics; heavy toll on Europeans in West Africa), yellow fever (Atlantic ports, Caribbean), cholera (pandemics from 1817), scurvy (long sea voyages), syphilis, influenza, childbirth fever, famine-related disease.

### 14.2 Demography \[U/F\]

- Life expectancy at birth often **25–40** across regions; those surviving childhood often reached 50–60 \[U by region\]. Do not display a single number; use ranges per region and class.
- **Epidemic modifiers:** Americas (*cocoliztli*, smallpox), epidemic years in India and China, Caribbean enslaved populations (negative natural increase).
- **Seasoning:** new European arrivals in West Africa and the Caribbean had very high first-year mortality \[F\]; the Middle Passage killed on average roughly 10–15% of those embarked, varying widely \[U\].

### 14.3 Food and Environment \[M\]

Famine/harvest tracks per region (Japan Kyōhō/Tenmei/Tenpō; Bengal 1770; regional Chinese famines; Atlantic hurricane season). Disasters: earthquakes (Edo 1855; Lima 1746; Lisbon 1755), Yellow River floods, droughts, Little Ice Age cold phases \[U on regional effect\].

### 14.4 Medical Limitations \[M\]

- Treatments are uncertain; some are harmful (bleeding, purging, mercury). The player chooses between **medical systems** (herbal, humoral, religious, spirit healers) with different success curves by disease.
- Infection after injury is a major killer.

### 14.5 Sanitation \[F/M\]

Urban crowding (Edo, Beijing, Calcutta, Lima), contaminated water, fire risk. Wealth buys better housing and food, not immunity.

### 14.6 Gameplay Translation (keep simple) \[M\] (P0)

- Health (0–100) plus **Condition tags** (*Smallpox scars*, *Malarial*, *Starving*, *Scurvy*, *Injured leg*) with durations.
- Per tick: `risk = base(region, season, class) * epidemic_modifier * subsistence_modifier * immunity_modifier * care_modifier`.
- Three outcomes per disease event: recover, chronic condition, death.
- Hidden immunity history prevents repetitive outcomes and models survivor effects.

---

## 15. Historical Events Catalogue

**Format \[M\]:** every record uses these fields: Event Name; Date; Location; Cause; Outcome; Important People; Affected Groups; Player Relevance; Possible Involvement; Alternative Outcomes; Long-Term Consequences. **Tier:** Background (B), Local (L), Regional (R), Major (M). Entries below are specifications for the MVP-candidate set and exemplars for the rest. Dates \[F\] unless marked.

### 15.1 Major Events (exemplars)

**EVT-001: Fall of Tenochtitlan (M)**

- *Date:* 1519–1521 (fall 13 Aug 1521). *Location:* Valley of Mexico.
- *Cause:* Spanish expedition under Cortés allied with Tlaxcalans and other polities hostile to Mexica tribute demands; smallpox epidemic from 1520.
- *Outcome:* Mexica capital falls; Spanish rule begins in central Mexico.
- *People:* Cortés, Moctezuma II (d. 1520), Cuauhtémoc, Malintzin, Tlaxcalan leaders.
- *Affected:* Nahua peoples, Tlaxcalans, Totonacs, Spanish.
- *Relevance:* households 1518–21; survivors form the first colonial generation.
- *Involvement:* defender, Tlaxcalan auxiliary, interpreter, captive, refugee, Spanish soldier or priest.
- *Alternatives (Level 4+):* delayed conquest, negotiated terms, longer resistance; Spanish dominance likely still arrives within decades \[U on counterfactual\].
- *Long-term:* New Spain, Atlantic silver, *encomienda*, population collapse.

**EVT-002: Plassey and Company Ascendancy in Bengal (M)**

- *Date:* 23 June 1757; *diwani* grant 1765. *Location:* Bengal.
- *Cause:* Calcutta conflict with Siraj ud-Daulah; conspiracy of nobles and bankers.
- *Outcome:* Mir Jafar installed; Company gains fiscal control.
- *People:* Robert Clive, Siraj ud-Daulah, Mir Jafar, Jagat Seths.
- *Affected:* Bengali weavers, peasants, bankers, Company servants.
- *Relevance:* Bengal households 1750s–1770s; famine 1769–70 follows.
- *Involvement:* sepoy, weaver, banker, informant, *zamindar* agent, European clerk.
- *Alternatives (Level 5+):* Siraj ud-Daulah survives; French influence expands; Company power could still arise elsewhere.
- *Long-term:* territorial empire, tax regime, de-industrialization debate \[U on extent and causes\].

**EVT-003: Qing Conquest and the Queue Order (M)**

- *Date:* 1644–1683; queue order 1645. *Location:* North China, Jiangnan, South China.
- *Cause:* Ming collapse (Li Zicheng takes Beijing April 1644); Wu Sangui's alliance with the Manchus.
- *Outcome:* Qing control; haircut policy sparks resistance (Yangzhou 1645, Jiading).
- *People:* Dorgon, Wu Sangui, Li Zicheng, Shi Kefa.
- *Relevance:* births 1620–1660 in north and Jiangnan.
- *Involvement:* refugee, collaborator, loyalist, bannerman, scholar-recluse.
- *Alternatives (Level 5+):* stronger Southern Ming; partial partition.
- *Long-term:* Qing legitimacy debates, banner society, queue as identity marker.

**EVT-004: Sekigahara, Tokugawa Settlement and Sakoku (M)**

- *Date:* 21 Oct 1600; shogun 1603; Osaka 1614–15; edicts 1633–39; Shimabara Dec 1637–Apr 1638. *Location:* Japan.
- *Cause:* succession struggle after Hideyoshi (d. 1598); Christian networks seen as threat.
- *Outcome:* about 250 years of Tokugawa rule; restricted foreign contact.
- *People:* Ieyasu, Ishida Mitsunari, Toyotomi Hideyori, Amakusa Shirō, Iemitsu.
- *Involvement:* ashigaru in battle, hidden Christian, Dejima interpreter, adapting merchant.
- *Alternatives (Level 5+):* Toyotomi survive; different contact policy.
- *Long-term:* *sankin-kōtai*, urbanization, Edo culture.

**EVT-005: Atlantic Slave Trade Peak and Abolition (M, multi-region)**

- *Date:* peak roughly 18th century into early 19th \[U on peak decade\]; British trade ended 1807; US importation ban 1808; British slavery ended by Act 1833 (apprenticeship to 1838).
- *Location:* West and West-Central Africa, Atlantic, Americas.
- *Cause:* plantation demand, African supply systems, European finance. Abolition driven by religious movements, enslaved resistance, and changing economics.
- *Outcome:* roughly 12.5 million embarked over the full trade; slavery persists in Brazil, Cuba and the US after British abolition.
- *People:* Olaudah Equiano (attributed), Granville Sharp, William Wilberforce, Thomas Clarkson, Toussaint Louverture.
- *Involvement:* captured person, ship crew, trader, planter, abolitionist, runaway, rebel.
- *Alternatives:* earlier abolition or longer persistence (Level 5+); large systemic change needs Level 6.
- *Long-term:* demographic transformation of Africa and the Americas.

**EVT-006: Haitian Revolution (M)**

- *Date:* Aug 1791–Jan 1804. *Location:* Saint-Domingue.
- *Cause:* brutal plantation regime, French revolutionary conflict, free people of color's demands.
- *Outcome:* independent Haiti (1 Jan 1804), first state founded by formerly enslaved people.
- *People:* Toussaint Louverture, Jean-Jacques Dessalines, Boukman, Henri Christophe.
- *Involvement:* enslaved rebel, free-colored soldier, planter, refugee.
- *Alternatives (Level 5+):* French reconquest of 1802–03 partly succeeds; negotiated settlements.
- *Long-term:* abolition momentum; indemnity of 1825.

**EVT-007: First Opium War and Treaty of Nanjing (M)**

- *Date:* 1839–1842 (treaty 29 Aug 1842). *Location:* Guangzhou, coast, Yangzi.
- *Cause:* opium trade crisis; Lin Zexu's 1839 confiscation; trade restrictions.
- *Outcome:* Hong Kong ceded; treaty ports opened; Canton System ended.
- *Alternatives (Level 5+):* different opium regulation; stronger Qing naval response.
- *Long-term:* Taiping setting, treaty-port society.

**EVT-008: Indian Rebellion of 1857 (M)**

- *Date:* 10 May 1857 (Meerut) to 1858. *Location:* north and central India.
- *Cause:* sepoy grievances, annexations (Awadh 1856), cartridge dispute, land-revenue stress.
- *Outcome:* suppression; Company ends 1858.
- *Alternatives (Level 6):* local rebel successes; Crown transition timed differently.

**EVT-009: Túpac Amaru II Rebellion (R)**

- *Date:* Nov 1780–1781 (execution May 1781). *Location:* Cuzco/Peru highlands.
- *Cause:* Bourbon taxes, *mita*, *repartimiento* abuses.
- *Outcome:* suppressed; repression of Indigenous elites.

**EVT-010: Tenmei Famine (R)**

- *Date:* 1782–1788. *Location:* northern Honshu especially (Asama eruption 1783 a contributing factor).
- *Outcome:* mass mortality, urban riots (*uchikowashi*), fall of Tanuma Okitsugu, Kansei reforms (1787+).
- *Alternatives:* domain-level relief variation (domain-level divergence).

### 15.2 Regional, Local and Background Event Types \[M\]

- **Regional (R):** Pueblo Revolt (1680), King Philip's War, Pequot War (1636–37), Maratha-Mughal wars, Mysore wars, Dahomey-Oyo tribute, Asante campaigns, Kongo civil wars, Bengal famine, Meireki fire of Edo (1657), Lisbon earthquake 1755, Jamaican Maroon wars (1730s; 1795–96), Taiping, White Lotus.
- **Local (L):** harvest failure; magistrate scandal; plantation revolt; village boundary dispute; local epidemic; ship arrival; market riot; mission founding; guild conflict.
- **Background (B):** ruler accessions and deaths, price trends, treaties, trade policy changes, religious controversies (Rites Controversy), scientific publications, fashion shifts. Background events generate news items and ambience; they do not branch.

---

## 16. Historical Figures

**Rule:** only a small set are *directly interactable*; most are **ambient** (news, rumor, letters, rare sightings). Interaction eligibility depends on region, Standing, role and Historical Leverage. Dates \[F\] unless marked.

| Figure | Dates | Location/Faction | Role | Interact? | Fixed | Changeable |
| --- | --- | --- | --- | --- | --- | --- |
| Hernán Cortés | 1485–1547 | Mexico/Spanish | conquistador | Ambient; direct for Spanish soldiers or captives | conquest timeline | local treatment of allies |
| Malintzin (La Malinche) | c.1500–c.1529 \[U\] | Mexico | interpreter | Ambient/rare | her role as interpreter | none (high sensitivity; avoid caricature) |
| Bartolomé de las Casas | 1484–1566 | Spanish America/Church | reformer | Direct for clergy and petitioners | New Laws (1542) | local enforcement |
| Akbar | 1542–1605 | Mughal | emperor | Ambient; direct only at court | reign dates | local policy effects |
| Aurangzeb | 1618–1707 | Mughal | emperor | Ambient | reign | provincial revolts |
| Robert Clive | 1725–1774 | Company | commander | Direct for Company/sepoy/Bengal elites | Plassey timeline | local rewards, informants |
| Tipu Sultan | 1750–1799 | Mysore | ruler | Direct in Mysore | death at Seringapatam 1799 | policy details |
| Kangxi | 1654–1722 | Qing | emperor | Ambient | reign | edicts affecting a locality |
| Qianlong | 1711–1799 | Qing | emperor | Ambient | reign | local tax relief |
| Lin Zexu | 1785–1850 | Qing/Guangzhou | official | Direct for Guangzhou merchants, clerks | 1839 confiscation | local compliance paths |
| Tokugawa Ieyasu | 1543–1616 | Japan | shogun | Ambient | Sekigahara result | retainers' fates |
| Tokugawa Yoshimune | 1684–1751 | Japan | shogun | Ambient | reform timeline | local reform outcomes |
| Ōshio Heihachirō | 1793–1837 | Osaka | rebel-official | Direct for Osaka commoners | 1837 revolt | participation outcomes |
| Njinga (Nzinga) | c.1583–1663 \[U\] | Ndongo-Matamba | queen | Direct in her realm | her reign | local alliances |
| Afonso I of Kongo | r. c.1509–1542 \[U on dates\] | Kongo | king | Direct in Kongo | reign | local trade stance |
| Osei Tutu | d. c.1717 \[U\] | Asante | founder-king | Ambient | Asante rise | war participation |
| Kimpa Vita | c.1684–1706 \[U\] | Kongo | prophet | Direct for Kongo households | execution 1706 | followers' fates |
| Toussaint Louverture | c.1743–1803 \[U on birth\] | Saint-Domingue | revolutionary leader | Direct in Haiti | capture 1802 | local actions, desertions |
| Olaudah Equiano | c.1745–1797 \[U on birthplace\] | Atlantic | author, activist | Ambient/rare | 1789 narrative | none |
| Hong Xiuquan | 1814–1864 | Taiping | leader | Ambient | war timeline | local defections |

**Rules \[M\]:**

- Interaction is mediated by **Access Tiers** (Section 19). Most players never meet a major figure, but they feel their policies through local agents.
- Figures have **Behavior Envelopes** (what they would plausibly do), **Fixed Dates**, and **Branch Points**, editable only by Level 5+ divergence.
- Avoid invented intimate dialogue for real figures; use clearly framed reported speech or fictionalized composites.

---

## 17. Random Events

### 17.1 Categories \[M\]

- **Family:** births, deaths, illness, marriage negotiation, inheritance dispute, adoption, abandoned child, kin obligation.
- **Economic:** crop outcome, price swing, debt call, lost cargo, partnership, windfall, fraud, tax demand.
- **Weather/Environment:** drought, flood, hurricane, monsoon failure, harsh winter, earthquake, fire.
- **Disease:** epidemics, fever, injuries, childbirth risk.
- **Social:** feud, rumor, honor dispute, patron favor, conversion pressure, festival.
- **Opportunity:** apprenticeship offer, trade contact, mission, patron, land lease, exam attempt.
- **Travel:** voyage, caravan, pilgrimage, shipwreck, pirates, port quarantine.
- **Crime/Law:** theft, arrest, trial, flogging, fine, extortion, smuggling.
- **Discovery:** new crops, tools, a book, a healer, a route, a language.
- **Political:** tax reform, levy, official transfer, inspector's visit, proclamation.
- **Religious:** miracle claims, sermons, inquisitorial summons, pilgrimage, schism.
- **Military:** raid, requisition, recruitment, siege, desertion, camp fever.

### 17.2 Plausibility Engine \[M\] (P0)

Every random event is an **EventTemplate** with:

- `context_filters` (region, SubEra, class, occupation, religion, season, active historical tracks);
- `base_weight` and `modifiers`;
- `exclusions` (e.g., no steamship travel before the 1810s; no abolition-era events before the relevant dates);
- `repeat_limits` and `cooldowns`;
- `historical_anchor` (nullable) tying templates to real patterns.

Sampling is **deck-based per tick**: global ambient deck + regional deck + class/occupation deck + crisis deck (triggered by tracks). The engine must guarantee that no random event contradicts a fixed historical track; random events may mimic, but never replace, historical events.

### 17.3 Randomness Principles \[M\]

- Randomness shapes what happens to the player, not what happens in history.
- Use a **seeded RNG** per life for reproducibility and debugging.
- Weight catastrophic events by realistic mortality, so death is a real risk without being constant.

---

## 18. Choice Design

### 18.1 Required Consequence Layers \[M\]

Every **major choice** is a `Choice` whose outcomes may populate:

1. **Immediate** (this tick).
2. **Delayed** (scheduled, 1–20 years).
3. **Hidden** (revealed later or never; e.g., Heat, rumor).
4. **Personal** (stats, traits, injuries).
5. **Family** (spouse, children, kin obligations).
6. **Social** (reputation, Connections, community).
7. **Historical** (contribution to a track, usually tiny; see Section 19).

### 18.2 Choice Types \[M\]

- **Survival/subsistence:** pay tax or sell tools; migrate or stay; accept an advance or avoid debt.
- **Allegiance:** which patron, domain, church, company or faction; whom to inform on.
- **Moral/identity:** conversion, concealment, resistance, complicity.
- **Opportunity:** apprenticeship, voyage, marriage offer, exam attempt, enlistment.
- **Legal:** petition, bribe, flee, accept punishment.
- **Knowledge:** learn a language, copy a text, seek medical care, travel.
- **Collective:** join a riot, strike, flight, maroon community or rebellion.

### 18.3 Constraints Shape Choice \[M\]

- Choices are generated from **Rules + Context**, not fixed menus: legal status, Standing, region, religion, Heat, Connections and Skills determine options.
- **Locked options** appear greyed with a reason (e.g., "A bondservant cannot petition the magistrate without his master's leave") to teach the system, without revealing hidden information.
- **Agency for unfree characters (P0):** meaningful choices under constraint: sabotage, skill-building, provision-ground trade, preserving family ties, secret literacy, flight, appeal, religious practice, task negotiation, saving toward freedom, solidarity, informing or refusing to inform. Outcomes carry real risk and can be tragic, but the player is never reduced to a spectator.

### 18.4 Representative Examples (condensed)

1. **Bengal weaver, 1768:** a Company agent offers an advance (*dadni*) to secure cloth at a fixed price. *Choices:* accept, refuse, sell to a private merchant, flee to a nearby state. *Immediate:* cash vs enforcement risk. *Delayed:* debt and famine vulnerability in 1769–70. *Hidden:* informant reports. *Family:* children's apprenticeships. *Social:* guild reputation. *Historical:* a tiny contribution to local weaver flight, no branch.
2. **Edo merchant apprentice, 1783:** during the Tenmei famine riots the shop owner asks you to guard stock rather than share rice. *Choices:* protect, share quietly, join rioters, hide. Consequences cascade into guild trust, arrest risk and later hiring.
3. **Enslaved house servant, Virginia, 1722:** you overhear plans to sell a family member. *Choices:* warn, plead, steal a pass and flee, remain silent. Outcomes vary by Connections, geography, season and law.
4. **Village leader in Guangdong, 1851:** Taiping recruiters and Qing militia officers both demand allegiance. *Choices:* join, pay for militia protection, hide, flee, play both sides. *Delayed:* village survival. *Historical:* local militia strength.
5. **Kongo noble youth, early 1700s:** the Antonian movement of Kimpa Vita, Capuchin missionaries and rival royal claimants compete. Each option changes faction ties and risks.

Avoid trivial choices ("you see a bird"). Every choice must trace to a **system hook** (law, faction, economy, religion, environment).

---

## 19. Historical Divergence

### 19.1 Principle \[M\]

History has **inertia**. Most player actions change *their* world, not *the* world. The player earns the ability to bend history through position, timing and accumulated influence. Structural forces (epidemics, economics, geography, institutions) tend to absorb small changes (**convergence pressure**).

### 19.2 Divergence Levels

```text
L0 Personal   : only the character changes (survival, wealth, status)
L1 Family     : household, kin line, inheritance, descendants
L2 Local      : village, estate, neighborhood, workshop, mission, ship, regiment
L3 Regional   : district, port, province, domain, plantation district
L4 Polity     : a state-level decision or a single battle/siege outcome
L5 Historical : changes the outcome of a catalogued Major event
L6 Alternate  : systemic timeline change (e.g., no Company rule, earlier abolition)
```

- **L0–L2 (P0):** fully open; the engine records but does not alter global tracks.
- **L3 (P1):** allowed with relevant leverage; modifies regional tracks (local famine severity, a riot's outcome, a magistrate's fate).
- **L4–L6 (P2/P3):** authored branches only; require high Leverage and presence in the event window. For MVP: logged as *"missed opportunity"* hooks, not implemented.

### 19.3 What Causes Divergence \[M\]

- A player action tagged as a `ContributionToTrack` (e.g., inform, shelter, supply, sabotage, lead, negotiate, witness, preach).
- Combined actions of **other characters** (the engine models non-player agents; the player can influence them through relationships).
- Environmental or random events *within allowed bounds*.

### 19.4 Historical Leverage (hidden composite) \[M\]

`HL = Access(Standing, office, role) + Connections(relevant to track) + Skill(relevant) + Wealth/Resources(relevant) + Reputation(to relevant audience) + FactionAlignment + Location/Presence + Timing(window) + PriorContributions`

- Each `BranchPoint` on a HistoricalEvent declares `required_presence` (place and role), `window` (date range), `required_leverage` (threshold), `blockers` and `outcomes[]` (pre-authored).
- Without presence and leverage, the player may still **participate** (their story changes) but cannot alter the track.

### 19.5 Anchor Strength for Events \[M\]

| Anchor | Meaning | Examples |
| --- | --- | --- |
| **Fixed** | Cannot change in MVP and rarely thereafter | epidemic arrival; ruler birth dates; large-scale climate events |
| **Hard** | Changes only at L5+ with keystone leverage | Plassey outcome; fall of Tenochtitlan; Qing conquest; Sekigahara |
| **Soft** | Changes at L3–L4 | local riot outcomes; a fortress surrender; a magistrate's decision |
| **Open** | Not tied to history | personal events |

### 19.6 How Large Events Change (Branching) \[M\]

- Events are **graphs of nodes** (preconditions → key decision nodes → outcome nodes) rather than single dated points.
- A branch **replaces** a downstream subgraph with an alternate subgraph (authored). Tracks update accordingly: rulers, control of places, tax regimes, trade flows.
- **Convergence rule:** when a branch erases a Hard event, the engine inserts a **pressure counter-event** with a probability reflecting structural forces (e.g., if Plassey goes differently, Company-France tensions or internal Bengal conflict may produce an alternate path). Do not leave a vacuum.
- **Ripple budget:** each branch has a `propagation_radius` (years and regions). Beyond the radius, the world reverts to base unless a new keystone event is changed.

### 19.7 Timelines \[M\]

- `BaseTimeline` (immutable canonical tracks).
- `LifeTimeline` (base + overlay patches from the player's life).
- Patches are **deterministic and versioned**; each has a source choice, level, preconditions and affected entities.
- **Divergence Ledger** records all patches for the end-of-life summary.

### 19.8 Cross-Life Persistence \[M\] (P3, Open Question)

Whether divergences persist into later lives ("Legacy mode" or sandbox worlds) is a product decision. MVP: **each life starts from BaseTimeline.**

---

## 20. Death and Legacy

### 20.1 Death Causes \[M\]

- **Natural/illness:** smallpox, fever, dysentery, tuberculosis, childbirth, old age.
- **Famine/disaster:** starvation, flood, earthquake, hurricane, fire.
- **Violence:** battle, massacre, execution, murder, plantation punishment, banditry.
- **Accident/labor:** mine collapse, ship loss, mill accident, fall.
- **Voyage:** shipwreck, scurvy, Middle Passage, piracy.
- **Ritual/judicial:** execution after rebellion, Inquisition sentence, forced suicide (e.g., ritual *seppuku* for samurai under Tokugawa law \[F\]), sati (a historically documented practice, abolished in Bengal in 1829 \[F\]) as content to be handled sensitively (P2).
- Content notes: death scenes use factual, non-gratuitous prose.

### 20.2 Legacy Calculation \[M\]

- **Legacy Tracks:** Family (descendants and inheritance), Community (reputation after death), Economic (assets endowed or lost), Cultural/Religious (memorials, texts, rites), Historical (ledger contributions).
- **Post-death effects (P1):** spouse and children status; property division per local law; debts inherited; ancestor memorial status; whether the person is remembered in local record.

### 20.3 End-of-Life Summary \[M\] (P0)

Sections:

1. **Life Summary:** birth context, key phases, location moves.
2. **Major Achievements and Failures.**
3. **Family:** spouses, children, survival status, lineage fate.
4. **Wealth and Status:** final assets, debts, rank, Freedom state history.
5. **Relationships:** patrons, rivals, friends, enslaved or servant dependents.
6. **Historical Involvement:** events experienced, role, accuracy notes.
7. **Changes Caused:** Divergence Ledger (level and effect).
8. **Timeline Divergence:** "In your world, X happened differently" (or "history held").
9. **Reality Check:** a short factual note separating real history from simulation ("What actually happened").
10. **Moral Ledger (non-scoring):** a plain account of significant harms done and aid given, shown factually; never a reward or leaderboard.
11. **Final Legacy Label.**

---

## 21. Replayability

Why players replay:

- **Date and place:** same year, different places (e.g., 1757 Bengal vs Edo vs Virginia vs Asante) are different games.
- **Class and status:** a Hong merchant's son and a tenant farmer's daughter live different Qing lives.
- **Role in events:** experience Plassey as sepoy, banker, weaver, European clerk, or camp follower.
- **Constraint-driven play:** enslaved, bonded, outcaste, convert, hidden Christian: very different decision trees.
- **Careers and factions:** exam path vs trade vs rebellion; Jesuit missionary vs Qing official.
- **Divergence:** discover what a life could change; achievements for "held history under pressure" and "changed a local outcome".
- **Hidden information:** Heat, Obligations and delayed consequences produce surprise.
- **Collection goals:** "Live through every SubEra", "Survive the Tenmei famine", "Complete a life in each module".
- **Perspective pairing:** replays from the *other side* of a conflict (conquest from both sides) with cross-referencing summaries.

---

## 22. Gameplay Examples

### Example A: Bengal Weaver, 1767 (SubEra C) — P0 slice

```text
Setup: Auto Create. Born 1744, Kasimbazar district (Bengal), Hindu weaver caste (T2), Subsistence 55, Skill(weaving) 40.
Context: Maratha raids ended 1751; Plassey 1757 shifted power; Company exerts pressure over weavers (advances, exclusive supply).
Life situation (age 23): a Company agent offers an advance (dadni) with a delivery quota.
Event: Poor monsoon reduces silk supply; price of raw silk jumps.
Choices:
  1. Accept advance and strict quota
  2. Refuse; sell to local merchant at higher price
  3. Take advance, deliver short, seek patron protection (zamindar agent)
  4. Move family inland to a village outside Company reach
Player chooses (1).
Immediate: +Cash, +Debt (quota), Heat +0, Connections(Company agent) +5.
Long-term: quota stress, vulnerability to 1769–70 famine as subsistence is thin; sibling apprenticed to Company cloth warehouse (opportunity).
Historical: contributes to "weaver compliance" local track (L2); no global divergence.
Summary note: "You survived the famine of 1770 with severe loss; two children died."
```

### Example B: Osaka Rice Broker's Apprentice, 1783 (SubEra C) — P1

```text
Setup: Custom. 1770 birth, Osaka, merchant family (T3), Learning 45.
Context: Tenmei famine; domains hoard rice; urban riots.
Event: A rioting crowd approaches the shop. The master orders the shutters closed, then asks you to carry a hidden rice sack to a temple.
Choices: Obey; secretly share rice with neighbors; join the crowd; report the master to a magistrate for hoarding.
Player chooses secret sharing.
Immediate: Heat +5 (if discovered), Reputation(Community) +10, Reputation(Master) -15 if exposed.
Delayed: Master finds out in year 3; apprenticeship at risk. Hidden: neighbor later vouches for you.
Historical: contributes to local riot dynamics (L2); no change to national reforms.
```

### Example C: Enslaved Child in Saint-Domingue, 1788 (SubEra C→D) — P1 (sensitive)

```text
Setup: Auto Create. Born 1778 on a sugar plantation near Cap-Français; Freedom=Enslaved; Health 70; hidden Constitution 55.
Context: extreme plantation mortality; maroon communities; tension among planters, free people of color, colonial officials.
Life situation (age 10): reassigned from house work to the sugar fields after the death of a parent.
Event: Rumors of a meeting in the woods. A driver asks who attended.
Choices: Lie; protect others; inform; flee.
Player chooses protect others.
Immediate: Punishment risk roll (Health -15), Reputation(Community) +, Heat(Overseer) +.
Delayed: 1791 uprising—your network gives access to a branch path (join, carry messages, shelter).
Historical: possible L2–L3 local contribution to the uprising's spread; L5 changes require leaders' roles.
End summary includes a plain account of conditions, choices under constraint, and what happened to the community.
```

### Example D: Hong Merchant's Clerk, Guangzhou, 1839 (SubEra D) — P1

```text
Setup: Custom. Born 1815, Guangzhou, clerk in a Hong merchant house (T3), Learning 60, Connections 40.
Context: Opium trade crisis; Lin Zexu arrives (1839) to enforce prohibition.
Event: Your employer is asked to certify stock; a foreign trader offers a bribe to hide a shipment.
Choices: Report; accept bribe; warn employer; resign and leave the city.
Player chooses warn employer.
Immediate: employer decision (random weighted by temperament), Heat +10.
Delayed: after war begins, trade house suffers; you relocate to Shanghai after 1842 treaty (opportunity).
Historical: a small contribution to the local compliance track (L2); L4+ requires proximity to Lin Zexu's staff.
```

### Example E: Mestiza Weaver in Cuzco, 1780 (SubEra C) — P1/P2

```text
Setup: Auto Create. Born 1760, Cuzco, mestiza artisan household (T2), Catholic observance moderate.
Event: Túpac Amaru II's rebellion spreads; local obraje workers are pressured.
Choices: Support rebels; remain neutral; report to authorities; flee.
Outcomes branch by location and kin ties. Consequences include property confiscation, informant networks, and possible violence. Historical outcome remains fixed (suppression, 1781), but local fates diverge.
```

---

## 23. Data Model Requirements

Schemas are described, not coded. All IDs are stable strings. All date fields are Gregorian proleptic with optional `local_calendar_display`.

- **Era:** `id`, `name`, `start_date`, `end_date`, `sub_era_ids[]`, `region_module_ids[]`, `ruleset_config`, `content_governance_flags`.
- **SubEra:** `id`, `era_id`, `name`, `start`, `end`, `blend_years`, `tech_table_ref`, `economy_table_ref`, `disease_table_ref`, `law_table_refs[]`.
- **Region (RegionModule):** `id`, `name`, `active_window`, `status_system_id`, `languages[]`, `religion_mix_by_date`, `currency_ids[]`, `calendar_systems[]`, `location_ids[]`, `track_ids[]` (ruler, war, famine, epidemic, law), `handoff_rules`.
- **Location:** `id`, `region_id`, `type` (city, village, port, mine, plantation, fort, mission), `coordinates`, `population_by_date`, `controlling_entity_by_date`, `economy_profile`, `risk_profile`, `climate_season_table`, `available_careers[]`.
- **PoliticalEntity:** `id`, `type`, `ruler_track`, `succession_rule`, `legitimacy_by_date`, `territory_by_date[]`, `tax_regime_id`, `law_set_id`, `relations[]` (ally, rival, tributary), `military_capacity_by_date`.
- **Faction:** `id`, `name`, `type`, `goals`, `institutions[]`, `members_rules`, `relations[]`, `influence_by_date`, `location_ids[]`.
- **SocialClass / StatusSystem:** `id`, `region_id`, `tier_map`, `ranks[]` (name, order, prerequisites), `rights_flags`, `restrictions_flags`, `mobility_paths[]`, `legal_status_set`, `marriage_rules`, `education_options`, `military_access`, `political_access`.
- **Occupation:** `id`, `name`, `status_gate`, `region_gate`, `date_gate`, `skills[]`, `income_model`, `risk_profile`, `progression_steps[]`, `event_deck_refs[]`.
- **Currency:** `id`, `name`, `silver_equivalent_range`, `regions_accepted[]`, `date_range`.
- **Technology:** `id`, `name`, `available_from`, `region_access`, `adoption_curve`, `effects`, `prerequisites`.
- **Religion:** `id`, `name`, `branches[]`, `calendar_events[]`, `rules` (marriage, diet, offices), `persecution_rules`, `institution_ids[]`.
- **Culture/Community:** `id`, `languages[]`, `kinship_system`, `marriage_customs`, `taboos[]`, `festivals[]`, `naming_conventions`, `gender_norms_profile`.
- **Institution:** `id`, `type`, `functions`, `membership_rules`, `resource_flows`, `location_ids[]`.
- **TradeRoute:** `id`, `nodes[]`, `goods[]`, `volume_by_date`, `controlling_entities[]`, `risks[]`.
- **HistoricalEvent:** `id`, `name`, `tier`, `date_range`, `locations[]`, `cause`, `outcome`, `important_people[]`, `affected_groups[]`, `anchor_strength`, `branch_points[]` (required\_presence, window, required\_leverage, outcomes\[\]), `player_roles[]`, `news_templates[]`, `consequence_ids[]`, `source_notes`, `uncertainty_notes`.
- **HistoricalFigure:** `id`, `name`, `dates`, `location`, `faction`, `role`, `importance`, `access_tier`, `behavior_envelope`, `fixed_facts[]`, `changeable_facts[]`, `interaction_templates[]`, `sensitivity_flag`.
- **RandomEvent (EventTemplate):** `id`, `category`, `context_filters`, `weight`, `modifiers`, `exclusions`, `cooldown`, `choices[]`, `anchor_ref?`.
- **Choice:** `id`, `prompt_template`, `preconditions`, `options[]` (label, requirements, locked\_reason, risk\_preview), `consequence_ids[]`, `layer_tags`.
- **Consequence:** `id`, `type` (immediate, delayed, hidden, personal, family, social, historical), `effects[]` (stat deltas, tag add/remove, relationship changes, flag sets), `schedule` (delay, probability), `visibility`, `ripple_contribution?`.
- **WorldState:** `date`, `tracks_state` (rulers, wars, famine, epidemic, prices), `entity_states`, `news_queue`, `patch_ledger`, `rng_seed`.
- **CharacterState:** `id`, `identity` (name, birth, sex, community), `location`, `stats` (visible and hidden), `legal_status`, `standing`, `wealth_components`, `relationships[]`, `conditions[]`, `skills[]`, `faith`, `life_log[]`, `heat`, `obligations[]`.
- **Timeline:** `base_track_refs`, `patches[]`, `divergence_level_log`, `version`.
- **Relationship:** `id`, `type` (kin, patron, rival, friend, owner/enslaved, employer), `strength`, `obligations`, `history[]`.
- **Disease/Condition:** `id`, `transmission`, `region_modifiers`, `severity_curve`, `treatments[]`, `immunity_effects`.
- **LawSet:** `id`, `entity_id`, `crimes[]`, `penalties_by_status`, `procedures`, `inheritance_rules`, `effective_dates`.
- **SourceNote:** `id`, `claim_ref`, `evidence_type`, `confidence` (high/medium/low), `scholarly_dispute_flag`, `citation_placeholder`. Every fact record must be able to link to a SourceNote.

---

## 24. Agent Implementation Notes

### MUST BE HISTORICALLY FIXED

- Ruler timelines (dates of accession and death) unless a valid divergence applies.
- Dated major events and their outcomes (Hard/Fixed anchors).
- Legal systems, status vocabularies and laws as of date (no anachronistic rights).
- Technology availability by date and region (no steamships before 1807 as practical craft, no telegraph in the 17th century).
- Currencies, units and trade networks by date.
- Religious institutions and bans by date and place.
- Disease arrival and epidemic windows.
- Calendar conventions (Julian/Gregorian/lunisolar).
- Existence and location of settlements by date.
- Content governance rules (Section 0).

### CAN BE RANDOMIZED

- Birth date and location within the allowed list; family composition; siblings; wealth within class bounds; temperament; hidden stats.
- Event draws and timings (within plausibility constraints).
- Weather and harvest outcomes within regional distributions (not historical famine or disaster years).
- Personal relationships and non-historical NPCs (names drawn from period- and region-appropriate lists; do not reuse generic modern-sounding names).
- Individual disease outcomes.

### CAN BE PLAYER-CHANGED

- Personal career, status moves (within mobility rules), marriage, migration, conversion, allegiance.
- Local outcomes (L2–L3): riot results, magistrate decisions, small-scale conflicts.
- Family fortunes and lineage.
- Higher-level outcomes (L4–L6) only through authored branches and leverage gating.

### REQUIRES FUTURE SYSTEM

- **Other-era handoff:** post-1858 and pre-1500 coverage; transitions between era modules.
- **Generative text/LLM narration:** if used, must be constrained by rule data; not part of rules logic.
- **Cross-life persistent worlds** (Legacy/sandbox mode).
- **Multiplayer or shared-world timelines.**
- **Deep NPC simulation** (agent-based social networks beyond summarized relationships).
- **Language learning/translation system** (multi-language play).
- **Map/visual layer** (historical maps and travel animation).
- **Localization** of non-English place and term names.
- **Mod/community content pipeline** with source-citation validation.
- **Sensitivity review tooling** and expert review workflow for flagged content.

### General Agent Rules

1. Never invent a historical fact. If data is missing, create a `SourceNote` with `confidence=low` and flag for review; do not fill silently.
2. Keep all rules in data, not code (no hard-coded events, laws or probabilities).
3. Every content record needs `region`, `date_range`, `sensitivity_flag`, and `source_note_id`.
4. Use terms in their historical vocabulary with glosses; avoid modern labels unless flagged as modern analytic terms.
5. Write tests asserting anachronism rules (e.g., no event instantiated outside its date or region filters).
6. Respect the governance rules in Section 0 in UI, copy and monetization design.

---

## 25. MVP Recommendation

### 25.1 Recommended Vertical Slice \[M\]

**Bengal, 1740–1772** (Mughal-era Bengal under the nawabs, to Company territorial rule and the 1770 famine).

Reasons: it showcases date+location sensitivity (nawabi Bengal → Company ascendancy); has clear class and economic systems (weaving, land revenue, banking); contains dated hooks (Maratha raids 1741–51, Plassey 1757, Buxar 1764, famine 1769–70, Company revenue control 1765–72); and avoids launching the most ethically heavy Atlantic plantation module before governance systems exist (Section 0). **Architecture must not hard-code Bengal**; the P1 validation module is **Edo/Osaka 1780–1790** to prove the region abstraction, then the **Atlantic plantation module** with sensitivity review.

### 25.2 MVP Minimums

- **Map:** 5 locations: Murshidabad (nawab's capital), Calcutta (Company settlement), Kasimbazar (weaving and silk district), a river-delta village, a Dhaka-region town.
- **Social classes:** 5: landless laborer/low-jati worker (T1), cultivator/artisan (T2), merchant-banker or weaver-trader (T3), *zamindar*/official/Company junior servant (T3–T4), and elite (nawabi noble or senior Company servant, T4–T5, NPC-heavy).
- **Careers:** 8: cultivator, weaver, trader/banian, clerk (*munshi*/Company writer), sepoy/soldier, boatman, healer, religious specialist (Brahmin priest, maulvi or fakir, one example each flagged as separate).
- **Historical events:** 6 Major/Regional: Maratha raids (1741–51), Siraj ud-Daulah's Calcutta capture (June 1756), Plassey, Buxar, the 1769–70 famine, Company revenue takeover (1765–72). Plus 10 background items (ruler changes, price shocks, treaties).
- **Random events:** 40: 8 family, 8 economic, 6 disease/health, 6 environment (flood, cyclone, monsoon), 6 social/legal, 6 opportunity/political.
- **Stats:** 8: Health, Strength, Learning, Skill, Standing, Reputation, Connections, Observance; plus Freedom (mostly Free/Dependent), Subsistence, Cash, Debt, and hidden Heat and Leverage.
- **Historical figures:** 6: Alivardi Khan, Siraj ud-Daulah, Mir Jafar, Robert Clive, Jagat Seth, Warren Hastings (all ambient; only 2 with direct interactions in MVP).
- **Choice system:** consequence-layer system with 7 layers; at least 20 authored major choices with delayed and hidden consequences.
- **Divergence:** L0–L2 implemented; L3 stub; L4+ logged only ("missed opportunity" ledger entries).
- **Output:** end-of-life summary with ledger and "What actually happened" note.
- **Tech:** Date/region resolver, event decks, tracks, ledger, SourceNote linkage.

---

## 26. Content Priority

**P0 — Required for MVP**

- Era/SubEra/Region/Location data model; date and calendar handling.
- Bengal 1740–1772 module (map, status system, careers, laws, economy).
- Core stats; wealth components; Freedom stat.
- Event deck engine with plausibility filters; seeded RNG.
- Choice/Consequence engine with 7 layers.
- Historical event tracks (Fixed/Hard/Soft/Open) and the Divergence Ledger.
- Disease/health model (simple).
- End-of-life summary with historical-accuracy note.
- SourceNote system and sensitivity flags.
- Content governance rules (Section 0) implemented in copy and UI.

**P1 — Important**

- Edo/Osaka module (Tokugawa).
- Atlantic plantation module (Saint-Domingue, Chesapeake, Caribbean) with sensitivity review.
- Qing China (Guangzhou, Jiangnan).
- Spanish America (Mexico/Peru) module.
- West/West-Central Africa coastal module.
- Extended event catalogue; L3 divergence; Heat system; information-lag mechanic.
- Marriage and family system depth; inheritance and legacy effects.
- More careers (mariner, merchant, scholar-official, soldier variants).

**P2 — Expansion**

- Cape Colony, Swahili coast, Dutch East Indies, Philippines, Indigenous North America modules.
- L4–L5 authored divergence branches for selected events.
- Third-gender/non-binary historical roles; deeper religious/legal systems.
- Medicine system choices (multi-system); voyages as playable episodes.
- Post-colonial sub-eras for Latin America (1825–1858).

**P3 — Future**

- L6 alternate timelines and persistent worlds.
- Generative narration bound to rules.
- Agent-based deep NPC simulation.
- Multiplayer or shared timelines.
- Language mechanics and map visualization.
- Community content tools.

---

## 27. Final Section — Era Design Summary

### Era Identity

A world of **overlapping empires, companies, kingdoms and communities** connected by oceans, silver and coerced labor, in which the same year can mean conquest, famine, prosperity, revolt or stagnation depending on where you stand. Power is **mediated** (agents, brokers, clerks, interpreters), and information is **delayed**.

### Player Fantasy

Not "conquer the world" but **survive, navigate and sometimes bend** systems far larger than you: a weaver bargaining with a Company agent, a clerk balancing loyalty and conscience, an enslaved person carving out a space for family and resistance, a scholar facing the exams. The player should feel **constraint, cost, and the occasional power of choice**.

### Core Gameplay

Seasonal/monthly life simulation: manage subsistence and obligations; choose career and allegiance; respond to events produced by region, class and the historical timeline; build relationships and reputation; occasionally encounter moments where participation or divergence is possible.

### Major Systems

1. Date + location + status resolver.
2. Region-specific status and law systems.
3. Five-component wealth model and obligation resolver.
4. Health/disease and survival model.
5. Event deck engine with plausibility filters.
6. Choice/consequence engine with layered consequences.
7. Historical tracks, anchors and divergence ledger.
8. End-of-life summary with historical notes.
9. Source, uncertainty and sensitivity management.

### Historical Hook

This era is the hinge where **local societies met global systems**: American silver reshapes China; Indian cloth clothes the Atlantic; Atlantic sugar kills and enriches; Japan closes yet stays globally connected; African states are agents in the trade that changes the world. LegacyLife can show how **ordinary lives** sit inside these structures and how little (or how much) any one person can change them.

### MVP

**Bengal 1740–1772** vertical slice (Section 25) with the data-driven architecture, followed by **Edo/Osaka** to validate the region abstraction, then the **Atlantic plantation module** under sensitivity review.

### Open Questions

1. **Era boundaries:** include 1492–1499 Caribbean phase? Should Spanish America after independence (1825–1858) be this era, a later era, or both?
2. **Overlap with other eras:** which adjacent era specs (e.g., Early Modern Europe, Industrial) claim metropolitan Europe 1500–1858? Need a shared ownership map.
3. **Region weighting in Auto Create:** population-proportional vs content-balanced.
4. **Sensitivity and governance:** expert review process; whether enslaved-character play requires opt-in content warnings, and how end-of-life "Moral Ledger" should be presented.
5. **Historiographical disputes** to decide how to present: Bengal famine causation and mortality; Plassey as turning point vs gradual process; precise slave-trade peak; Qing and Tokugawa social rigidity; population figures.
6. **Third-gender and non-binary roles:** which historical communities are included, with what consultation.
7. **Divergence persistence** across lives; whether alternate histories become sandbox worlds.
8. **Data sourcing:** which reference works are canonical (e.g., Slave Voyages database, regional historiography) and how SourceNotes are validated.
9. **Names and languages:** policy for period-correct names, honorifics and transliteration.
10. **Monetization and design ethics:** how to avoid rewarding exploitation, and how to present violence.

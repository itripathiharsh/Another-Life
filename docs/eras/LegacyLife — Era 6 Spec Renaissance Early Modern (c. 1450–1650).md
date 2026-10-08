# LegacyLife — Era 6 Specification: Renaissance / Early Modern (c. 1450–1650)

*Game-development specification for AI coding agents. Version 0.1. Design document only — no production code.*

---

## 0. How to Read This Document

**Evidence and status tags** (every non-trivial statement should carry one when ambiguity is possible):

| Tag | Meaning |
| --- | --- |
| \[FACT\] | Well attested in mainstream scholarship. Implement as fixed unless a valid divergence occurs. |
| \[EST\] | Scholarly estimate with a wide range (populations, wages, mortality). Implement as tunable data, never as hard-coded constants. |
| \[DISPUTED\] | Historians disagree. Implement as a configurable parameter or flavour text that avoids asserting one side. |
| \[DESIGN\] | Proposed game mechanic. Not history. |
| \[OPEN\] | Unresolved research or product decision (collected in §27). |

**ID convention:** snake\_case with type prefix: `era_`, `sub_`, `reg_`, `loc_`, `pol_`, `fac_`, `cls_`, `occ_`, `ev_`, `fig_`, `tech_`, `rel_`, `cul_`, `rnd_`, `chc_`. Event IDs end with the year: `ev_sack_of_rome_1527`.

**Date convention:** \[DESIGN\] Store all dates as a continuous day count (Julian Day Number). Dates in this document are given as conventionally cited by historians (Julian calendar before local adoption of the Gregorian reform; Catholic states switched Oct 1582, Protestant German states 1700, England 1752, Russia 1918). Gameplay only needs day-level precision for scripted events; ignore the 10-day drift elsewhere. Display dates in the **local calendar flavour** (Christian year with feast days; Islamic Hijri; Mughal Ilahi from 1584; Chinese reign-era names; Japanese nengō).

**The governing equation of LegacyLife:**

```
DATE + LOCATION + SOCIAL CONTEXT (+ faith, gender, household) = HISTORICAL WORLD
```

**World Resolution Pipeline** \[DESIGN\] — run once at birth, re-run on migration, conquest, conversion or marriage:

1. Resolve `birth_date` → active SubEra(s) (global timeline, §2).
2. Resolve `location` → Region → Locale; resolve which PoliticalEntity controls that locale on that date (borders move; use the PoliticalEntity timeline).
3. Resolve culture, language and religion probabilities from (polity, locale, date).
4. Resolve the SocialClass distribution from (polity, locale, date, settlement type).
5. Apply household, gender and faith modifiers.
6. Attach active event timelines (Background → Local → Regional → Major) filtered by each event's reach to this locale.
7. Initialise CharacterState and WorldState.

**Boundary Blending Rule** \[DESIGN\]: SubEra boundaries are soft. Modifiers (disease load, war risk, price levels, literacy access) interpolate across a ±3-year window around each boundary. Only scripted events use hard dates.

---

## 1. Era Overview

**Name:** Renaissance / Early Modern — working subtitle *The Age of Print, Gunpowder and Oceans*.

**Playable birth window:** 1450 – 1650 CE. The simulation continues until death, so lives may run to c. 1720. \[OPEN\] Events after 1650 need either an Era 7 specification or a generic fallback world (see §27).

**Why these boundaries** \[FACT\]: c. 1450 — Gutenberg's press in Mainz; 1449 Ming emperor captured at Tumu; 1453 Constantinople falls; Portuguese Atlantic exploration under way; 1467 Ōnin War opens Japan's Sengoku age. 1648 — Peace of Westphalia ends the Thirty Years' War; 1644 — Ming dynasty falls; 1639–1640s — Tokugawa Japan closes to most foreign contact; 1658 — Mughal succession war (just outside window). 1650 is a practical, not absolute, boundary.

**Geographic range:** Europe; the Mediterranean world; Ottoman lands (Balkans, Anatolia, Levant, Egypt, North Africa); Safavid Persia; Mughal India and neighbours; Ming China; Japan; the Iberian-Atlantic colonial world; with lower-priority outer zones — sub-Saharan Africa, Indian Ocean ports, Southeast Asia, pre- and post-conquest Americas.

**Macro-societies (summary):**

| Zone | Principal polities in this era |
| --- | --- |
| Latin Christendom — South | Italian city-states and papacy; Spanish monarchies (Castile, Aragon, from 1580–1640 also Portugal); Habsburg domains |
| Latin Christendom — North/West | Tudor and Stuart England; Valois and Bourbon France; Burgundian then Habsburg Netherlands, Dutch Republic; Holy Roman Empire; Scandinavia; Poland-Lithuania; Muscovy |
| Islamic gunpowder empires | Ottoman Empire; Safavid Persia; Mughal Empire (with Deccan sultanates) |
| East Asia | Ming China; Sengoku and then Tokugawa Japan; Joseon Korea (context only) |
| Oceanic and colonial | Portuguese Estado da Índia; Spanish Americas and Philippines; Dutch VOC and English EIC from 1600–1602 |
| Others (P2/P3) | Songhai, Kongo, Swahili coast, Ethiopia; Aztec Triple Alliance, Inca Tawantinsuyu; Ayutthaya, Aceh, Malacca |

**Important transitions** \[FACT\]:

1. Printing spreads (c. 1450 onward): information, literacy, propaganda and heresy accelerate.
2. Gunpowder reshapes states: large standing armies, fortress design, artillery, centralisation.
3. Oceanic routes open (1488 Dias; 1492 Columbus; 1498 da Gama; 1519–22 Magellan expedition): global trade, silver flows, slave trade expansion, epidemic exchange.
4. Western Christendom fractures (1517 Luther onward): confessional states, wars of religion, Counter-Reformation.
5. Three Islamic empires consolidate (Ottoman 1450s–1520s; Safavid 1501; Mughal 1526) with a Sunni–Shi'a political frontier.
6. Silver-driven global economy: American and Japanese silver flows into Ming China and Europe; price inflation in Europe and the Ottoman lands (the 'price revolution', \[DISPUTED\] in causes and scale).
7. Japan moves from fragmented warlord conflict to Tokugawa order (1467 → 1603).
8. Climatic cooling (the 'Little Ice Age', strongest effects c. 1590s–1640s) intensifies harvest failures and unrest \[EST\].
9. The 'General Crisis' of the 17th century: war, revolt and dynastic collapse across Eurasia (1618–1650). \[DISPUTED\] as a unified concept; use as a thematic pressure parameter, not a single cause.

**Why this era suits LegacyLife:**

- **Simultaneity of radically different worlds.** In a single year (e.g. 1556) a person could be a Florentine wool-guild apprentice, an Ottoman devshirme recruit, a Mughal mansabdar's retainer under a new emperor (Akbar), a Ming salt-merchant, or a Sengoku ashigaru. This is the strongest argument for the Date + Location + Class model.
- **Documentary density.** Wills, tax registers, court records, letters, diaries and printed pamphlets exist for many places, allowing plausible ordinary lives.
- **Divergence-rich.** Many pivots (Reformation, Armada, Sekigahara, Panipat, Chaldiran) are contingent and well suited to bounded branching.
- **Ordinary-person agency.** Guilds, parishes, village communities, patron-client networks and religious choices give ordinary people real decisions.
- **Exposes universal themes.** Faith vs. conformity, ambition vs. security, mobility, plague, war, exploitation and cultural contact.

**Sensitive-content note** \[DESIGN\]: This era includes chattel slavery (Mediterranean, Ottoman, Iberian, Atlantic), religious persecution, forced conversion, witch trials, colonial violence and epidemic mass death. The game must depict these as historically real constraints and moral pressure, not as optional spectacle. Content settings and tone guidelines are an \[OPEN\] product decision.

---

## 2. Temporal Breakdown

Six global SubEras. Each applies differently by region; regional offsets are given where needed. All boundaries are soft (§0).

### SUB-ERA 6.1 — Print, Fall and Balance (1450 – Sept 1494)

- **Societies:** Italian city-states in the balance of the Peace of Lodi (1454); Ottoman Empire under Mehmed II; Ming under Zhengtong/Tianshun, Chenghua (1464–87), Hongzhi (1487–1505); Ashikaga Japan sliding into war; Lodi Sultanate (Delhi); Aq Qoyunlu and Timurid successors in Iran; Mamluk Egypt/Syria; Lancastrians, Yorkists, early Tudors; Valois France; Iberian kingdoms; Aztec Triple Alliance and Inca expansion (P3).
- **Politics:** \[FACT\] Peace of Lodi (1454) and the Italic League stabilise Italy; Wars of the Roses (1455–1487), Bosworth 22 Aug 1485 begins Tudor rule; Louis XI of France consolidates (Burgundy's Charles the Bold dies Jan 1477); Ferdinand and Isabella marry (1469), Inquisition from 1478, Granada war 1482–92; Medici dominance in Florence (Cosimo d. 1464; Lorenzo from 1469); Ottoman conquests of Serbia (1459), Morea (1460), Trebizond (1461), Bosnia (1463), Negroponte (1470), Otranto raid (1480); Ōnin War (1467–77) wrecks Kyoto.
- **Major events:** Fall of Constantinople (29 May 1453); Gutenberg Bible (c. 1455); Pazzi conspiracy (26 April 1478); Portuguese reach Elmina (1482) and Dias rounds the Cape (1488); Ivan III annexes Novgorod (1478).
- **Technology:** Movable-type printing spreads (presses in well over 200 European towns by 1500 \[EST\]); large siege cannon (Ottoman 1453); carrack and caravel; astrolabe, quadrant, portolan charts; mechanical clocks; early hand firearms; Ming fire-lances and cannon.
- **Economy:** Post-Black Death demographic recovery begins in Europe c. mid-15th century; Medici bank at peak then declining; Venice dominant in the Levant spice trade; Portuguese gold and slave trade from West Africa; Ming economy still partly paper-money, shifting toward silver.
- **Social structure:** Late-medieval orders in Europe (clergy, nobility, urban patriciate, guilds, peasants); Ottoman askeri/reaya distinction; Ming scholar-gentry and hereditary military households; Japanese kokujin and warrior bands.
- **Major conflicts:** Wars of the Roses; Ottoman–Venetian war (1463–79); Burgundian wars; Ōnin War; Granada War.
- **Change from previous period:** Not applicable (first sub-era). Handoff from Era 5 (Late Medieval) is \[OPEN\]; if Era 5 does not exist, treat 1450 as a hard start with pre-seeded WorldState.

### SUB-ERA 6.2 — Italian Wars, Oceans Open, Reformation (Sept 1494 – 1530)

- **Societies:** Italy as battleground between France and Habsburg Spain; Henrician England; Habsburg Spain–Burgundy–Empire under Charles V (from 1516/1519); Ottoman Empire (Bayezid II, Selim I 1512–20, Suleiman from 1520); Safavid Persia (founded 1501); Mughal Empire (founded 1526); Portuguese and Spanish overseas empires; Aztec and Inca empires meet Spain (P3).
- **Politics:** \[FACT\] French invasion of Italy (1494); Medici expelled, Savonarola's republic (1494–98); Alexander VI Borgia (1492–1503), Julius II (1503–13), Leo X (1513–21); Machiavelli's Florence; Medici restored (1512); Henry VIII (1509–47); Luther's 95 Theses (31 Oct 1517), Diet of Worms (1521), German Peasants' War (1524–25); Chaldiran (23 Aug 1514); Ottoman conquest of Mamluk Egypt and Syria (1516–17); Mohács (29 Aug 1526); Panipat (21 April 1526); Sack of Rome (6 May 1527); Charles V crowned in Bologna (1530).
- **Major events:** Columbus (1492, Americas contact); Tordesillas (1494); da Gama reaches Calicut (1498); Portuguese capture Goa (1510) and Malacca (1511); Cortés takes Tenochtitlan (13 Aug 1521); Magellan expedition (1519–22); first siege of Vienna (1529); Syphilis outbreak with Naples campaign (1494–95).
- **Technology:** Pike-and-shot warfare matures (Swiss pikes, landsknechts, Spanish arquebusiers); bastioned fortress design (*trace italienne*) begins in Italy; matchlock arquebus spreads; printing in vernaculars; Ottoman and Safavid firearms (Chaldiran shows gunpowder advantage); Portuguese naval artillery.
- **Economy:** Antwerp rises as financial hub; Fugger banking; Spanish American bullion begins to arrive; Portuguese spice trade through the Cape disrupts but does not end Levantine routes \[DISPUTED in scale\]; Ottoman and Mughal land-revenue systems consolidate.
- **Social structure:** Print literacy widens; Protestant–Catholic divide opens; Iberian expulsions and forced conversions of Jews (1492) and Muslims (1500–02 Castile); Safavid state-enforced Twelver Shi'ism after 1501.
- **Major conflicts:** Italian Wars (1494–1559); Ottoman–Habsburg and Ottoman–Safavid wars; Peasants' War; Portuguese–Mamluk/Gujarati naval wars in the Indian Ocean; Spanish conquest of Mexico.
- **Change from previous period:** The Italian balance collapses; confessional identity becomes political; Islamic empires adopt gunpowder as state policy; Atlantic and Indian Ocean routes become permanent.

### SUB-ERA 6.3 — Confessional Fracture and Imperial Consolidation (1530 – 1565)

- **Societies:** Habsburg–Valois contest; English Reformation; Ottoman peak under Suleiman (1520–66); Safavid Persia under Tahmasp I (1524–76); Mughal restoration and Akbar's accession (1556); Ming under Jiajing (1521–67); Sengoku Japan at height of fragmentation; Spanish Peru and New Spain organised as viceroyalties.
- **Politics:** \[FACT\] Henry VIII's break with Rome (Act of Supremacy 1534), dissolution of monasteries (1536–40), Pilgrimage of Grace (1536–37); Edward VI (1547–53), Mary I (1553–58); Council of Trent (1545–63); Schmalkaldic War (1546–47); Peace of Augsburg (1555); Charles V's abdications (1555–56); Suleiman's campaigns, Preveza (1538), Amasya peace with Safavids (1555); Humayun loses (1540) and regains (1555) throne; Akbar's accession at Panipat II (5 Nov 1556); Jiajing's Great Rites controversy aftermath; Japan: Tanegashima matchlock introduction (1543), Xavier arrives (1549).
- **Major events:** Copernicus and Vesalius publish (1543); Potosí silver discovered (1545); Tahmasp moves capital to Qazvin (1540s–1555 \[DISPUTED\] exact date); Wokou (pirate) raids on the Chinese coast peak (1550s); Portuguese settle Macau (1557); Sweating sickness epidemic in England (1551).
- **Technology:** Printed vernacular Bibles; improved fortification; wider use of arquebus in Japan (rapid domestic manufacture by c. 1550s); galleon design emerging; anatomical and astronomical revisions.
- **Economy:** Silver imports begin to monetise the Ming economy (conversion of taxes to silver accelerates); European price inflation (mid-16th century); England's Great Debasement (1544–51); Ottoman akçe debasement begins later (1580s).
- **Social structure:** Confessional identity matters in law and marriage; rise of gentry in England; Ottoman consolidation of timar system; Mughal mansabdari being formalised (under Akbar, later).
- **Major conflicts:** Italian Wars close (Cateau-Cambrésis, 1559); Ottoman–Habsburg Hungarian wars; Ottoman–Safavid wars (1532–55); Sengoku warlord wars; Ming–wokou war.
- **Change from previous period:** Religious schism hardens into state policy; Islamic empires reach stable shape; European overseas empires add territorial rule (not just ports).

### SUB-ERA 6.4 — Silver, Revolt and Unification (1565 – 1600)

- **Societies:** Philip II's Spain (1556–98); Elizabethan England (1558–1603); French Wars of Religion (1562–98); Dutch Revolt (1568–1648); Ottoman Empire under Selim II and Murad III; Safavid Persia under Abbas I (from 1588); Akbar's Mughal Empire at height; Wanli's Ming (from 1572); Japan unified by Nobunaga and Hideyoshi.
- **Politics:** \[FACT\] Lepanto (7 Oct 1571); St Bartholomew's Day massacre (24 Aug 1572); Edict of Nantes (1598); Spanish Armada (1588); Union of Utrecht (1579); Spain annexes Portugal (1580); Gregorian calendar (1582); Zhang Juzheng's reforms (1573–82); Honnō-ji (21 June 1582), Hideyoshi unifies Japan (1590), Imjin War in Korea (1592–98); Sekigahara follows in 1600; Akbar's Fatehpur Sikri (1571–85) and Din-i Ilahi (1582); Vijayanagara falls at Talikota (1565).
- **Major events:** Venice plague (1575–77); Philip II's state bankruptcies (1557, 1560, 1575, 1596); English Poor Law codification (1597–1601); Peak of European witch-trial persecutions begins (c. 1560–1630 \[EST\]); Jesuits enter Ming court (Ricci reaches Beijing 1601, just after).
- **Technology:** Galleon and fluyt-precursor ships; standing infantry drilled with firearms; Gregorian reform; Mercator projection (1569); printing in Arabic and Persian remains limited (manuscript culture persists) \[FACT\].
- **Economy:** Peak American silver output (Potosí; mercury amalgamation from 1570s); sustained inflation in Europe; Ming silver tax conversions (Single Whip, 1570s–80s); Japanese silver exports; Atlantic slave trade grows with sugar plantations in Brazil.
- **Social structure:** Confessionalisation of parishes and schools; urban poor relief; Mughal ashraf and Rajput integration; Hideyoshi's separation of warrior and peasant (sword hunt 1588, status edicts 1591).
- **Major conflicts:** Dutch Revolt; French Wars of Religion; Ottoman–Habsburg 'Long War' (1593–1606); Ottoman–Safavid war (1578–90); Mughal conquests (Gujarat 1572, Bengal 1576, Kashmir 1586, Sindh 1591); Japanese unification wars; Imjin War.
- **Change from previous period:** The world economy becomes unmistakably global; centralised states fight on much larger scales; unification in Japan; religious wars shift from schism to attrition.

### SUB-ERA 6.5 — Companies, Courts and Crisis (1600 – 1630)

- **Societies:** Jacobean England; Bourbon France (Henri IV, Louis XIII); Dutch Republic's golden age; Spanish Habsburgs of Philip III and IV; Holy Roman Empire entering war; Ottoman Empire after Ahmed I (1603–17); Safavid Persia at Abbas's zenith (d. 1629); Jahangir and early Shah Jahan; Late Wanli and Tianqi Ming; early Tokugawa shogunate.
- **Politics:** \[FACT\] East India companies founded (EIC 1600, VOC 1602); Sekigahara (21 Oct 1600), Tokugawa Ieyasu shogun (1603); Union of Crowns (1603); Gunpowder Plot (1605); Moriscos expelled from Spain (1609–14); Jamestown (1607); Defenestration of Prague (1618) opens Thirty Years' War; Safavid capital moved to Isfahan (c. 1598–1602) with Naqsh-e Jahan square (from 1590s–1610s); Ottoman Celali rebellions (c. 1596–1610) and 'Age of Sultanate of Women' (\[DISPUTED\] term); Nurhaci's Later Jin founded (1616).
- **Major events:** Galileo's telescope observations (1609–10); Plague in London (1603, 1625); Ottoman–Safavid war (1603–18, 1623–39); Abbas retakes Baghdad (1623), Ottomans retake it (1638); Mughal famine (Gujarat/Deccan 1630–32, just after).
- **Technology:** Telescope and microscope appear; fluyt-style cargo ships; improved printing in Europe; Japan–Europe firearm and cannon transfers; Chinese adoption of European cannon (Ricci-linked Jesuits).
- **Economy:** Chartered joint-stock companies; Amsterdam financial innovations; Ottoman fiscal stress and tax-farming spread; Safavid silk monopoly under Abbas; Mughal revenue peak.
- **Social structure:** Confessional minorities (Huguenots, recusant Catholics, Moriscos) face legal pressure; Safavid ghulam class expands; Tokugawa status order begins (samurai / peasant / artisan / merchant as legal categories).
- **Major conflicts:** Thirty Years' War (from 1618); Ottoman–Safavid wars; Dutch–Portuguese colonial wars; Mughal Deccan campaigns; Osaka campaigns (1614–15).
- **Change from previous period:** Corporate and fiscal-military states emerge; Japan stabilises while Europe fragments; the Islamic empires reach administrative maturity but face fiscal strain.

### SUB-ERA 6.6 — The General Crisis (1630 – 1650+)

- **Societies:** Thirty Years' War Europe; Civil-War England; Fronde-era France; Spain and Portugal (secession 1640); late Ming and the Qing transition; Tokugawa Japan; Shah Jahan's Mughal Empire; Murad IV and Ibrahim's Ottomans; Safavid under Safi (1629–42).
- **Politics:** \[FACT\] Gustavus Adolphus's campaigns (1630–32); Portuguese revolt (1640); English Civil War begins (1642), Charles I executed (1649); Peace of Westphalia (1648); Fronde (1648–53); Catalan revolt (1640–52); Treaty of Zuhab (1639) fixes Ottoman–Safavid frontier; Shimabara rebellion (1637–38) and 'closed country' edicts (1633–39); Li Zicheng enters Beijing (April 1644), Chongzhen suicide; Qing take Beijing (June 1644); Ottoman Cretan War (1645–69).
- **Major events:** Plague of 1629–31 in northern Italy (Milan, Venice, Florence) and 1630s–40s epidemics in North China; Taj Mahal construction (1632–53); Dutch tulip speculation (1636–37, scale \[DISPUTED\]).
- **Technology:** Continued standardisation of infantry firearms (flintlock emerges); Dutch and English naval gunnery; Harvey on blood circulation (1628); Galileo's trial (1633).
- **Economy:** European agrarian crisis in the 1640s; Ming fiscal collapse as silver inflow falls (c. 1630s–40s) and taxes rise; Japanese trade restricted to Dutch and Chinese at Nagasaki; Atlantic sugar boom.
- **Social structure:** Mass displacement and wartime mortality in Germany (regional population losses between roughly 15% and 40% \[EST\]); Chinese peasant rebellions; Tokugawa class system institutionalised.
- **Major conflicts:** Thirty Years' War; English Civil Wars; Ming–Qing wars and peasant rebellions; Ottoman–Venetian Cretan War; Mughal–Deccan and Central Asian campaigns.
- **Change from previous period:** Crisis becomes systemic; several regimes fall or transform; Westphalia and Qing set the shape of the following era.

---

## 3. Geographic Breakdown

Regions are the top-level playable geographic units. Each Region contains Locales (cities, towns, village clusters, courts, ships). Priority tags (P0–P3) follow §26. Population figures are \[EST\] and must live in data files.

**Region index**

| ID | Region | Priority |
| --- | --- | --- |
| reg\_italy | Italian peninsula and islands | **P0 (MVP)** |
| reg\_england | England and Wales (Ireland, Scotland as sub-contexts) | P1 |
| reg\_iberia | Castile, Aragon, Portugal | P1 |
| reg\_ottoman | Ottoman Empire | P1 |
| reg\_mughal | Mughal India and subcontinent | P1 |
| reg\_ming | Ming China | P1 |
| reg\_japan | Japan | P1 |
| reg\_persia | Safavid Persia | P2 |
| reg\_france\_lowlands | France and the Low Countries | P2 |
| reg\_hre | Holy Roman Empire (German lands) | P2 |
| reg\_east\_europe | Poland-Lithuania, Muscovy, Hungary, Scandinavia | P2 |
| reg\_colonial\_atlantic | Iberian colonial world (Americas, Goa, Macau, Manila) | P2 |
| reg\_africa\_io | Sub-saharan Africa and Indian Ocean coasts | P3 |
| reg\_precolumbian | Aztec and Inca worlds before and during conquest | P3 |
| reg\_sea | At sea (ships, voyages, ports in transit) | P1 (supports many regions) |

### 3.1 reg\_italy — Italian Peninsula (P0)

- **Political entities** \[FACT\]: Republic of Venice (with terraferma); Florence (Medici regime 1434–94; republic 1494–1512; Medici 1512–27; republic 1527–30; Medici duchy 1532, Grand Duchy of Tuscany 1569); Milan (Visconti, then Sforza; French 1499–1512 and again 1515–21; Spanish control from 1535); Papal States; Kingdom of Naples (Aragonese; French 1495; Spanish from 1503–04, viceroyalty); Sicily and Sardinia (Aragonese then Spanish); Genoa (French, then Spanish-aligned under Andrea Doria from 1528); Savoy-Piedmont, Ferrara (Este), Mantua (Gonzaga), Urbino (Montefeltro, then della Rovere), Siena (annexed by Florence 1555–59), Lucca.
- **Major locales:** Florence (c. 60–70k, \[EST\]), Venice (c. 100–170k \[EST\]), Rome (c. 50k in 1500, c. 100k+ by the 1590s \[EST\]), Naples (largest, 200k+ \[EST\]), Milan (c. 100k \[EST\]), Genoa, Bologna, Siena, Pisa, Urbino, Ferrara, Mantua, Palermo; countryside (Tuscan *contado*, Venetian terraferma, Roman Campagna, Lombard plain).
- **Population (region):** c. 9–11 million around 1500, with severe regional shocks from plague and war \[EST\].
- **Social structure:** Urban patriciates (Venetian *Libro d'Oro* nobility; Florentine ottimati); guild structure (Florence: Arti Maggiori/Minori; many city-specific variants); professionals (notaries, lawyers, physicians); artisans and shopkeepers; *popolo minuto* (e.g. wool *ciompi*); sharecroppers (*mezzadria* in Tuscany); landless labourers; servants; household slaves (a smaller-scale slave trade in Italian cities, primarily women, persisted into the 16th century) \[FACT\]; clergy as a distinct estate; Jewish communities (Venetian Ghetto established 1516; Roman Jews; Livorno from 1590s).
- **Economy:** Wool and silk cloth, banking and exchange (Medici, then Genoese bankers), shipbuilding (Venetian Arsenale), printing (Venice dominant; Aldus Manutius from c. 1494), glass (Murano), luxury goods, mercenary service; agriculture (grain, vines, olives, rice in Lombardy); Levant and Mediterranean trade; the Cape route erodes some spice profits over the 16th century \[DISPUTED in extent\].
- **Culture and religion:** Catholic; humanist education (Latin, rhetoric, classical texts); patronage culture (courts and churches); confraternities, carnival, saints' days; religious tension (Savonarola, Counter-Reformation Inquisition from 1542, Index from 1559). Languages: Tuscan/Italian as a literary standard (not a spoken national language), regional dialects, Latin, Spanish (in Naples and Milan), Greek and Hebrew in scholarly or minority settings.
- **Military situation:** Mercenary condottieri early; city militias less important; Italian Wars bring Swiss, French, Imperial, Spanish armies (sacks of Prato 1512, Brescia 1512, Rome 1527); fortress building (Sangallo and others); Venetian and papal galleys vs. Ottomans.
- **Major occupations:** Wool and silk workers, merchants and factors, bankers, notaries, scribes and printers, painters and sculptors (workshop system), builders, sailors and gondoliers, soldiers, priests and friars, servants, farm labourers, sharecroppers.
- **Major risks:** Plague (1478–79, 1522–24, 1575–77 Venice, 1630–31 Milan/Venice/Florence); French disease (syphilis, from 1494); malaria (Roman Campagna, coastal marshes); war and sack; harvest failure (1590s); Ottoman raids on southern coasts; political purge and exile.
- **Key events:** Peace of Lodi (1454); Pazzi conspiracy (1478); Lorenzo's death (8 April 1492); French invasion (1494); Savonarola's rise and execution (23 May 1498); Borgia papacy; League of Cambrai (1508–10); Battle of Ravenna (1512); Marignano (1515); Pavia (1525); Sack of Rome (1527); Siege of Florence (1529–30); Cateau-Cambrésis (1559).
- **Sub-contexts:** `loc_florence`, `loc_venice`, `loc_rome`, `loc_naples`, `loc_milan`, `loc_tuscan_contado`, `loc_venetian_terraferma`. MVP uses Florence, Rome, Venice and Tuscan contado.

### 3.2 reg\_england — England and Wales (P1)

- **Polity** \[FACT\]: Kingdom of England under Tudors (1485–1603), Stuarts (1603–); Wales fully incorporated by Acts of Union 1536–43; Ireland under varying English control (Pale; Kingdom of Ireland from 1542; plantations from 1550s onward); Scotland a separate kingdom until 1603.
- **Locales:** London (c. 50k in 1500 → c. 200k by 1600 → c. 400k by 1650 \[EST\]); Norwich, Bristol, York, Exeter, Coventry, Newcastle; Oxford and Cambridge; manor villages; sheep-farming districts (Cotswolds, East Anglia); Welsh marches.
- **Population:** c. 2.5–3 million in 1500; c. 4 million around 1600; c. 5 million by 1650 \[EST, Wrigley–Schofield family\].
- **Social structure:** Peers; gentry (knights, esquires, gentlemen); clergy; yeomen; husbandmen; cottagers and labourers; urban merchants and livery-company freemen; apprentices and journeymen; servants (a huge fraction of youth lived in service); the poor, vagrants (subject to harsh vagrancy statutes, e.g. 1530s–40s).
- **Economy:** Wool and, increasingly, cloth exports (through Antwerp; collapses in 1550s and again in 1620s); agriculture (open-field and enclosed); coastal and North Sea fisheries; shipping and privateering; coal in the north-east; London's growth; inflation squeezes wage-earners; Poor Law system (1597–1601).
- **Culture and religion:** Catholic → Henrician schism (1534) → Protestant (Edward VI) → Catholic (Mary I) → Elizabethan Settlement (1559) → Puritan pressures, recusant Catholics, Laudian controversies, civil war. Language: English; Welsh, Cornish, Latin (law, church, scholarship), French (declining). Parish as the basic unit of life: church, tithes, poor relief, courts leet.
- **Military situation:** No large standing army; county militia and trained bands; navy under Henry VIII, Elizabeth; continental and Irish expeditions rely on levies and mercenaries; naval power at the Armada (1588).
- **Major occupations:** Farming, cloth-making (spinning, weaving, fulling), brewing, shoemaking, carpentry, shipbuilding, seafaring, clerks and lawyers, clergy, domestic service, soldiers/sailors, play-acting (from 1570s onward in London).
- **Major risks:** Plague (1563, 1603, 1625, 1636); sweating sickness (1485, 1508, 1517, 1528, 1551); harvest failures (1550s, 1590s); religious prosecution (Marian burnings c. 280 victims 1555–58 \[EST\]; recusancy fines; heresy and treason law); enclosure disputes; Irish and continental wars.
- **Key events:** Bosworth (1485); Henry VIII's reign and break with Rome; Dissolution of monasteries (1536–40); Pilgrimage of Grace (1536); Kett's Rebellion (1549); Marian restoration (1553–58); Armada (1588); Union of Crowns (1603); Civil War (1642–51).
- **Sub-contexts:** London; East Anglian cloth towns; Northern uplands; Welsh borderlands; Pale (Ireland).

### 3.3 reg\_iberia — Castile, Aragon, Portugal (P1)

- **Polity** \[FACT\]: Castile and Aragon in dynastic union (1479); Granada falls 2 Jan 1492; Navarre annexed 1512–15; Habsburg dynasty from 1516; Portugal under the Aviz dynasty, then Spanish rule 1580–1640, then Bragança restoration.
- **Locales:** Seville (Indies gateway; c. 100–150k by late 1500s \[EST\]), Lisbon, Toledo, Valladolid, Madrid (capital from 1561), Barcelona, Valencia, Granada, Cordoba, Salamanca; Castilian plateau villages; Andalusian ports.
- **Population:** Spain c. 6–8 million; Portugal c. 1–1.5 million \[EST\].
- **Social structure:** Grandees and titled nobility; *hidalgos* (low nobility with tax privileges); *letrados* (university-trained administrators); merchants; artisans; peasants and sheepherders; *conversos* (converted Jews) subject to *limpieza de sangre* ideology; Moriscos (converted Muslims; expelled 1609–14); slaves (Iberia and Lisbon had substantial enslaved African populations).
- **Economy:** Wool (the Mesta); Atlantic trade monopolised through the Casa de Contratación (1503); American silver; Portuguese Asian spice and Brazilian sugar; royal bankruptcies (1557, 1560, 1575, 1596, 1607, 1627, 1647).
- **Culture and religion:** Catholic orthodoxy enforced by Inquisition (Castile 1478; Portugal 1536); university culture (Salamanca); Spanish Golden Age; Jewish expulsion (1492; Portugal 1496–97 forced conversion). Languages: Castilian, Catalan, Galician, Basque, Portuguese, Arabic (Morisco), Ladino among Sephardic exiles.
- **Military:** Spanish *tercios* (professional infantry), galleys and galleons; Portuguese carracks and Asian forts; conquistador expeditions.
- **Occupations:** Shepherds, farmers, muleteers, sailors, clerks, friars, soldiers, silversmiths, merchants, slave traders.
- **Risks:** Plague (1596–1602 severe; 1647–52); famine; Inquisition and denunciation; shipwreck; fevers in the Indies; military mortality.
- **Key events:** Granada 1492; Expulsion; Comunidades revolt (1520–21); Spanish bankruptcies; Union with Portugal (1580); Armada; Morisco expulsion; Catalan revolt (1640).

### 3.4 reg\_ottoman — Ottoman Empire (P1)

- **Polity** \[FACT\]: Sultanate (Osmanli dynasty). Core provinces: Rumelia (Balkans), Anatolia, Syria, Egypt (from 1517), Iraq (from 1534), Hejaz, North African regencies (Algiers, Tunis, Tripoli), Hungary (from 1526), Crimean Khanate as vassal. Capital: Constantinople/Istanbul (from 1453; Edirne and Bursa earlier).
- **Locales:** Istanbul (c. 400–700k at peak \[EST\]), Bursa, Edirne, Salonica (major Jewish refuge city after 1492), Sarajevo, Belgrade, Sofia, Izmir (rising), Aleppo, Damascus, Cairo (c. 200k+ \[EST\]), Baghdad, Mecca and Medina, Algiers.
- **Population:** c. 20–30 million in the later 16th century \[EST, wide range\].
- **Social structure:** *Askeri* (those with sultanic authority: palace, army, bureaucracy, ulema) vs. *reaya* (taxpaying subjects, Muslim and non-Muslim); Muslims, Orthodox Christians, Armenians, Jews, others — communal self-government through religious institutions \[DISPUTED: whether a formal, uniform millet system existed before the 19th century; treat as flexible communal administration\]. *Devshirme* (levy of Christian boys, principally Balkan, for palace and Janissary service; declined from late 16th century); slavery (household, military, galley); guilds (*esnaf*); *timar* holders; ulema; Sufi orders (Mevlevi, Bektashi, Naqshbandi).
- **Economy:** Agriculture (grain, olive, cotton); *timar* land assignment (military tenure) giving way to tax-farming (*iltizam*) by the 17th century; Silk Road and Mediterranean trade; Spices and coffee (coffeehouses from mid-16th century); guild production; Bursa silk; *waqf* endowments; price inflation and akçe debasement (1580s onward); Janissary salary pressure.
- **Culture and religion:** Sunni Islam (Hanafi); Ottoman Turkish (court/bureaucracy), Arabic (religion and law), Persian (poetry), Greek, Armenian, Ladino, Slavic languages; kadi courts and sultanic *kanun*; Sufi lodges; imperial building (Sinan, 1539–1588 as chief architect).
- **Military:** Janissaries (standing infantry with firearms); *sipahi* (timar cavalry); artillery; navy (Barbarossa, Preveza 1538; Lepanto loss 1571, rapidly rebuilt); frontier raiders (*akinji*).
- **Occupations:** Peasants, craftsmen, merchants, scribes, soldiers, imams, dervishes, palace servants, shipbuilders, galley rowers, caravan operators.
- **Risks:** Plague endemic (Istanbul, Cairo and others, repeatedly); fire in Istanbul; famine and Celali revolts; war; conscription; palace purges; earthquake (1509 'Little Apocalypse' in Constantinople); slavery.
- **Key events:** Fall of Constantinople (1453); Chaldiran (1514); conquest of Egypt (1517); Rhodes (1522); Mohács (1526); Vienna (1529); Preveza (1538); Lepanto (1571); Cyprus (1570–71); Long War (1593–1606); Zuhab (1639).
- **Sub-contexts:** `loc_istanbul`, `loc_balkan_village`, `loc_anatolian_village`, `loc_cairo`, `loc_aleppo`, `loc_devshirme_pipeline`.

### 3.5 reg\_mughal — Mughal India and Subcontinent (P1)

- **Polity** \[FACT\]: Delhi Sultanate (Lodi, until 1526); Mughal Empire from Babur's Panipat victory (21 April 1526); Humayun's reign, Suri interlude (1540–55); Akbar (1556–1605); Jahangir (1605–27); Shah Jahan (1628–58). Neighbours: Vijayanagara (until 1565); Deccan sultanates (Bijapur, Golconda, Ahmadnagar, Bidar, Berar); Rajput kingdoms (Mewar, Amber/Jaipur, Marwar); Gujarat sultanate (conquered 1572); Bengal sultanate; Portuguese Goa and ports; Sikh community in Punjab.
- **Locales:** Agra and Delhi (c. 400–650k each at peaks \[EST\]), Fatehpur Sikri (capital 1571–85, abandoned), Lahore, Ahmedabad, Surat, Dhaka, Patna, Burhanpur, Hampi (Vijayanagara capital), Bijapur, Golconda/Hyderabad, Goa, Calicut, Kochi.
- **Population:** c. 100–150 million around 1600 \[EST, wide\].
- **Social structure:** Emperor and imperial family; *mansabdars* (ranked officers holding *zat* rank and *sawar* cavalry obligation, paid by revenue assignments *jagirs*); Persianate and Central Asian elites (Turani, Irani), Afghans, Indian Muslims, Rajputs (integrated through marriage and service under Akbar); *zamindars* (local landholders with revenue and armed rights); peasants (*raiyat*); artisans and weavers; merchants (Gujarati banias, Marwari, Khatri, Armenian, Jain, Parsi, Muslim); Brahmins; castes (*jati*) as a major organiser of occupation and marriage; Sufi, Bhakti, Sant, Sikh, Jain communities; slaves and eunuchs.
- **Economy:** Land revenue (Akbar's *zabt* and Todar Mal's assessments); cotton textiles (a world-leading export industry); indigo; saltpetre; sugar; silk; grain; Indian Ocean trade (Gujarat–Red Sea–Persian Gulf–Southeast Asia); silver imports; currency (rupee silver, copper *dam*, gold *mohur*) \[FACT\].
- **Culture and religion:** Islam (Sunni and Shi'a), Hinduism (Vaishnava, Shaiva, Shakta, Bhakti), Jainism, Sikhism, Christianity (Goa; Jesuits at Akbar's court from 1580), Zoroastrianism; Persian as administrative and court language; Hindavi, Sanskrit, Telugu, Kannada, Tamil, Bengali, Marathi, Gujarati. Akbar abolishes the jizya (1564) and pilgrimage tax (1563); his *sulh-i kull* ('peace with all') policy is a court ideology \[FACT\]; Din-i Ilahi (1582) was a limited court circle rather than a mass religion \[DISPUTED in interpretation\].
- **Military:** Mounted *sawar* contingents, matchlock infantry, imperial artillery, war elephants (declining relevance), river flotillas; sieges (Chittor 1568); Rajput cavalry traditions.
- **Occupations:** Peasant cultivators, weavers, dyers, carpenters, scribes (*munshi*), clerks (*diwan*), soldiers, petty officers, bankers (*sarraf*), merchants, brokers, pilgrims, court artists and poets.
- **Risks:** Famine (Deccan–Gujarat 1630–32); monsoon failure; plague (1616 Punjab, others); war and tax assignment disputes; piracy; succession wars.
- **Key events:** Panipat I (1526) and II (1556); Chittor (1568); Gujarat (1572); Talikota (1565, Vijayanagara falls); Akbar's religious debates (Ibadat Khana 1575–82); Jahangir–Nur Jahan period; Taj Mahal (1632–53).
- **Sub-contexts:** Mughal court; Gangetic village; Gujarat port-city; Rajput kingdom; Deccan sultanate; Vijayanagara (to 1565); Portuguese Goa.

### 3.6 reg\_ming — Ming China (P1)

- **Polity** \[FACT\]: Ming dynasty (1368–1644), emperors include Zhengtong/Tianshun (captured at Tumu 1449, restored 1457), Chenghua, Hongzhi, Zhengde, Jiajing (1521–67), Longqing, Wanli (1572–1620), Tianqi, Chongzhen (1627–44). Capital Beijing (secondary capital Nanjing). Frontiers: Mongols (Altan Khan; peace 1571), Jurchens/Manchus (Later Jin 1616; Qing 1636), coastal pirates (*wokou*), Japan (Imjin War 1592–98).
- **Locales:** Beijing, Nanjing, Suzhou, Hangzhou, Yangzhou, Songjiang, Guangzhou (Canton), Fuzhou, Quanzhou, Jingdezhen (porcelain), Kaifeng, Xi'an, Chengdu, Macau (Portuguese from 1557); Jiangnan villages; North China plain; Yellow River basin; border garrisons.
- **Population:** Extremely uncertain; official registers undercount; plausible 100–200+ million by the late 16th/early 17th century \[EST, wide\].
- **Social structure:** Emperor and imperial clan; civil officials via the examination system (county → prefectural → provincial *juren* → metropolitan *jinshi* → palace); *shenshi* gentry (degree-holders with tax and legal privileges); eunuchs (palace administration; political power peaks under Wang Zhen, Liu Jin, Wei Zhongxian); hereditary registered households (*min* civilian, *jun* military, *jiang* artisan; the system erodes over time); merchants (low formal status but high wealth and gentry aspiration); peasants (the large majority); servile and degraded groups; women under Confucian household norms but with substantial economic roles in textiles.
- **Economy:** Rice and wheat agriculture; commercialised cash crops (cotton, mulberry, tea, sugar); regional specialisation (Jiangnan textiles); Grand Canal grain tribute; salt monopoly merchants (Huizhou, Shanxi); porcelain; shifting from paper note (*baochao*, collapsed in the 15th century) to silver and copper cash; silver imports from Japan, Spain (via Manila from 1571); Single Whip reform (c. 1570s–80s) commutes taxes and labour to silver \[FACT\].
- **Culture and religion:** Neo-Confucian orthodoxy and Wang Yangming's school; Buddhism, Daoism, popular cults, ancestral rites; Islam (Hui), Judaism (Kaifeng); Jesuit mission from Ricci (arrived Beijing 1601); flourishing print culture (novels like *Jin Ping Mei*, *Journey to the West*, drama, almanacs); languages: Mandarin official speech with many regional languages.
- **Military:** Hereditary *weisuo* garrison system decays; mercenaries and regional armies; firearms and cannon; Great Wall defences; Qi Jiguang's anti-wokou forces (1550s–60s); crushing 1618–44 Liaodong crisis.
- **Occupations:** Farming, weaving, porcelain work, boatmen, merchants, clerks and runners (*yamen* staff), scholars and tutors, soldiers, craftsmen, monks, eunuchs, midwives.
- **Risks:** Flood (Yellow River), drought and famine (1580s–1640s severe), plague (north China 1630s–40s), banditry, corvee exactions, coastal raids, political purges (e.g. Donglin vs. eunuch faction), rebellion (Li Zicheng, Zhang Xianzhong).
- **Key events:** Tumu (1449); Wokou crisis (1550s); Zhang Juzheng era (1572–82); Imjin War (1592–98); Jesuit entry; Later Jin founded (1616); Li Zicheng takes Beijing (1644).

### 3.7 reg\_japan — Japan (P1)

- **Polity** \[FACT\]: Ashikaga shogunate (nominal until 1573); Sengoku daimyo domains; Oda Nobunaga (Okehazama 1560; enters Kyoto 1568; killed 1582); Toyotomi Hideyoshi (unifies 1590; Korea 1592–98); Tokugawa Ieyasu (Sekigahara 1600; shogun 1603); Ryukyu Kingdom (Satsuma invasion 1609); Ainu lands (Matsumae domain).
- **Locales:** Kyoto, Sakai (merchant free city), Osaka (castle 1583–; destroyed 1615), Nara, Hōryu-ji area, Hakata, Nagasaki (founded 1570s–80s), Edo (from 1590), Odawara, Kagoshima, Hiroshima; castle towns; farming villages (*mura*); temple towns (Ishiyama Hongan-ji, Mount Hiei, Mount Kōya).
- **Population:** c. 10–12 million around 1600 \[EST\].
- **Social structure:** Emperor and court nobles (kuge) in Kyoto; shogun; *daimyo*; *samurai* retainers; *kokujin* and *ji-samurai* (landed warriors blurring with peasantry until Hideyoshi's edicts); peasants (*hyakusho*); artisans; merchants; monks and temple soldiers; outcast groups (*eta*, *hinin*) with polluting-trade stigma; foreign communities (Portuguese, Chinese). From 1588–91, the sword hunt and status edicts begin legally separating samurai and peasants \[FACT\].
- **Economy:** Rice-centred (*koku* measure); land surveys (Taikō kenchi from 1582); silver mines (Iwami); trade with Ming China (through Ryukyu and pirate/merchant networks), Portuguese (from 1543) and Dutch/English (from 1600s); castle-town markets; guilds (*za*) abolished in Nobunaga's free-market policy (*rakuichi rakuza*).
- **Culture and religion:** Shinto, Buddhism (Zen, Pure Land, Shin/Ikkō, Nichiren, Tendai, Shingon), Christianity (Jesuits from 1549; Kirishitan communities concentrated in Kyushu; suppression from 1587–1614), tea ceremony (Sen no Rikyū), No, Kabuki beginnings (c. 1603), castle architecture. Language: Japanese (many dialects); Chinese for scholarship.
- **Military:** Samurai cavalry and spearmen; *ashigaru* foot soldiers; matchlock arquebus after 1543; castle sieges; naval forces (Murakami clan); temple armies (Ikkō-ikki); mass peasant levies.
- **Occupations:** Farmers, fishers, artisans (swordsmiths, carpenters), merchants, monks, retainers, ashigaru, tea masters, castle-builders, miners.
- **Risks:** Famine; war levy and razing; temple massacres (Enryaku-ji 1571); epidemic; earthquake and typhoon; religious suppression.
- **Key events:** Ōnin War (1467–77); Tanegashima (1543); Nagashino (1575); Honnō-ji (1582); sword hunt (1588); Imjin (1592–98); Sekigahara (21 Oct 1600); Osaka (1614–15); Shimabara (1637–38).

### 3.8 reg\_persia — Safavid Persia (P2)

- **Polity** \[FACT\]: Safavids from Shah Ismail I's capture of Tabriz and proclamation of Twelver Shi'ism (1501); Tahmasp I (1524–76); Abbas I (1588–1629); Safi (1629–42); Abbas II (1642–66). Capitals: Tabriz → Qazvin → Isfahan (c. 1598–1602). Frontiers with Ottomans (west), Uzbeks (northeast), Mughals (Qandahar).
- **Locales:** Tabriz, Qazvin, Isfahan (Naqsh-e Jahan), Shiraz, Mashhad, Qom, Kashan, Hormuz (Portuguese until 1622), Julfa/New Julfa (Armenian merchants).
- **Social:** Qizilbash tribal emirs (initially military and political elite); Persian bureaucrats (*tajik*); ulema, sayyids and *sadr*; *ghulams* (Georgian, Circassian and Armenian military slaves, expanded under Abbas I); merchants; peasants; pastoral nomads; Armenian, Jewish, Zoroastrian minorities.
- **Economy:** Silk (royal monopoly under Abbas); carpets; ceramics; overland and Persian Gulf trade; qanat irrigation; crown vs. state lands.
- **Religion/culture:** Twelver Shi'ism as state religion, with Sunni majority population forcibly shifted over generations \[DISPUTED pace\]; Persian poetry and miniature painting; Safavid religious ceremonies (Muharram).
- **Military:** Qizilbash cavalry; later standing *ghulam* units, musketeers and artillery (Abbas I's reforms with English advisers, the Sherley brothers \[FACT\]).
- **Key events:** Chaldiran (1514); Amasya (1555); Abbas I's reforms and Isfahan building; Baghdad lost (1638); Zuhab (1639).

### 3.9 Other Regions (compact entries)

**reg\_france\_lowlands (P2)** \[FACT\]: France under Valois (Louis XI to Henri III) and Bourbons (Henri IV from 1589); Wars of Religion (1562–98); St Bartholomew's (1572); Edict of Nantes (1598); Paris, Lyon, Rouen, Bordeaux, Toulouse; Antwerp and Amsterdam as financial hubs; Dutch Revolt (1568–1648), Union of Utrecht (1579), republic's golden age. Social: three estates in France; *offices* venal; *parlements*; urban guilds; Dutch burgher oligarchy. Risks: religious massacres, famine, siege and sack (Antwerp 1576 'Spanish Fury'), plague.

**reg\_hre (P2)** \[FACT\]: Holy Roman Empire: emperor, seven electors, \~300 territories, free imperial cities (Nuremberg, Augsburg, Frankfurt, Cologne), prince-bishops; Reformation homeland; Peasants' War 1524–25; Peace of Augsburg 1555 (*cuius regio, eius religio*); Thirty Years' War 1618–48 (regional losses 15–40% \[EST\]). Economy: mining (Saxony, Tyrol, Bohemia), Fugger/Welser banking, printing (Mainz, Nuremberg, Wittenberg), textile guilds. Second serfdom increases east of the Elbe \[DISPUTED chronology\].

**reg\_east\_europe (P2):** Poland-Lithuania (Union of Lublin 1569; *szlachta* nobility and elective monarchy; religious toleration under Warsaw Confederation 1573); Muscovy (Ivan III, Vasili III, Ivan IV 1533–84 with *oprichnina* 1565–72; Time of Troubles 1598–1613; Romanov accession 1613); Hungary (split after Mohács 1526: Habsburg north-west, Ottoman centre, Transylvania); Sweden (Vasa dynasty from 1523; Gustavus Adolphus 1611–32); Denmark-Norway.

**reg\_colonial\_atlantic (P2):** Spanish Americas (viceroyalties of New Spain 1535 and Peru 1542–43; *encomienda* → *repartimiento* and *mita*; Potosí silver); Spanish Philippines (Manila 1571; Manila galleon trade 1565–1815); Portuguese Brazil (captaincies 1534; Salvador 1549; sugar), Goa (1510), Macau (1557); the Laws of Burgos (1512), New Laws (1542), Valladolid debate (1550–51). Indigenous demographic collapse (commonly cited 50–90% regional decline in 1500s, \[EST, regionally variable\]); African slavery expands from 1500s, intensifying in the 17th century.

**reg\_africa\_io (P3):** Songhai (Gao, Timbuktu, Djenné; Askia Muhammad 1493–1528; Moroccan invasion 1591 Tondibi); Kingdom of Kongo (Afonso I, c. 1509–1542, conversion to Christianity and entanglement with Portuguese slave trade); Swahili city-states (Kilwa, Mombasa, Malindi; Portuguese raids from 1505); Ethiopia (Adal–Ethiopian war 1529–43 with Ottoman and Portuguese involvement); Benin; Morocco (Sa'adian dynasty). Design caution: do not render these societies as only victims or only trade nodes.

**reg\_precolumbian (P3):** Aztec Triple Alliance (Tenochtitlan, Texcoco, Tlacopan) and Inca Tawantinsuyu in 1450–1530s; Spanish contact 1519–32. Needs dedicated cultural research with indigenous-perspective review. \[OPEN\]

**reg\_sea (P1):** A pseudo-region for ships and voyages. Defines shipboard roles, rations, scurvy and storms, pirates and privateers, naval battle risks, voyage durations (Lisbon–Goa c. 6–9 months \[EST\]; Seville–Veracruz c. 2–3 months \[EST\]), and port-to-port travel.

---

## 4. Historical World Model

The WorldState is a set of typed entities linked by typed relations. Agents should implement entities as data (JSON/DB rows), not code.

**4.1 Entity types and what they represent**

| Entity type | Examples in this era | Key relations |
| --- | --- | --- |
| PoliticalEntity | Venice, Papal States, Tudor England, Ottoman Empire, Mughal Empire, Ming, Tokugawa shogunate, Vijayanagara, Dutch Republic, Holy Roman Empire | rules Locales; has Ruler, Court, Fiscal system, Law codes, Official religion, Military organisation, Diplomatic relations |
| Locale | City, town, village cluster, castle town, court, port, monastery, ship | belongs to Region and PoliticalEntity (time-dependent); has population class mix, institutions, prices, disease load |
| Dynasty / Family | Medici, Sforza, Tudor, Habsburg, Valois, Osmanlis, Safavids, Timurids/Mughals, Zhu (Ming imperial clan), Oda/Toyotomi/Tokugawa, Fugger | provides rulers and marriages; owns property; patron of people |
| Faction | Guelf/Ghibelline legacies; Medici party and anti-Medici ottimati; Piagnoni and Arrabbiati in Florence; Catholic League vs. Huguenots; Qizilbash vs. tajik bureaucrats; Janissaries vs. sipahis; Donglin vs. eunuch faction; Rajput vs. Turani nobles at the Mughal court; Takeda/Uesugi/Hojo clans | members have loyalty, goals, resources; can be allied or hostile |
| ReligiousGroup | Catholics, Lutherans, Calvinists/Reformed, Anglicans, Anabaptists, Orthodox, Sunni, Shi'a, Sufi orders, Hindu sects, Sikhs, Jains, Buddhist schools, Shinto, Daoism, Kirishitan, Jews, Zoroastrians | legal status by polity; doctrine tags; persecution risk by date and place; institutions |
| Institution | Papacy, Inquisitions, Guilds, Universities, Parishes, Confraternities, Monasteries, Madrasa, Waqf, Imperial Examination, Ottoman Palace School, Mughal mansab system, Samurai retinue, Merchant companies, Hanseatic networks, Banks | offers careers, services, rules and constraints |
| TradeNetwork | Mediterranean/Levant; Atlantic (Seville–Indies); Cape route (Lisbon–Goa); Manila galleon; Indian Ocean; Baltic grain; Silk Road remnants; Grand Canal; Nagasaki–Macau; Persian silk routes; Trans-Saharan; Atlantic slave trade | nodes (Locales), goods, risk, travel time, controlling polities |
| MilitaryGroup | Condottieri companies, Swiss pike, landsknechts, tercios, Janissaries, sipahis, Qizilbash, ghulams, mansabdar contingents, Rajput cavalry, Ming garrison households, samurai retinues, ashigaru levies, galley fleets | recruitment pools, wage systems, battle roles |
| Resource | Grain, wool, silk, cotton, silver, gold, spices, sugar, salt, timber, saltpetre, porcelain, books | produced/consumed in Locales; priced regionally |

**4.2 Key relationship patterns** \[DESIGN, built on FACT\]

- **Patron–client** is the universal glue: Italian *patronage*, English *affinity and good lordship*, Ottoman *kul* household ties, Mughal *mansab* networks, Chinese *guanxi* and teacher–student/cohort ties, Japanese lord–vassal bonds. The Patronage stat (§8) is a numeric abstraction over a graph of named patrons.
- **Overlapping jurisdictions:** a person may be subject to a city government, guild, parish or religious court, and monarch at once (Europe); a *kadi*, *kanun* and timar-holder at once (Ottoman); a village headman, zamindar and mansabdar jagirdar at once (Mughal).
- **Time-dependent control:** Locale→PoliticalEntity mapping is a timeline (e.g. Milan: Sforza → French → Sforza → French → Spanish; Naples: Aragonese → French → Spanish; Baghdad: Ottoman → Safavid → Ottoman). Never store a single static owner.
- **Religious overlay:** Religion alters legal standing, taxation, marriage options and occupational access separately from political control. Model as a table keyed by (polity, religion, date).
- **Trade and disease share pipes:** TradeNetworks carry plague and the Columbian exchange; quarantine systems (Venetian lazaretti from 1423, Ragusa) modify that.

---

## 5. Player Creation

### 5.1 Entry modes \[DESIGN\]

**Auto Create:** The engine chooses birth date and location using a *population-weighted, playability-adjusted* distribution: first sample a Region with weights derived from approximate population share (heavily Asian) blended with content availability (so unfinished regions are not sampled), then sample SubEra and year within content windows, then Locale, then class. In MVP all samples fall within the implemented slice.

**Custom Life:** The player picks year and location (map click or list). The engine applies the World Resolution Pipeline (§0). If the location is outside implemented Regions, show a clear message and offer the nearest supported context or a different year; never silently invent a world. If the year is outside 1450–1650, route to the adjacent era (when available) or show unsupported-date UI.

**Optional player constraints** (Custom Life): class tier (random within range), gender, religion (limited to historically available options at that date and place), and a 'fixed birth moment' toggle to start on a specific historical day (e.g. 6 May 1527 in Rome).

### 5.2 What the engine generates at birth

| Attribute | Determined by | Notes |
| --- | --- | --- |
| Birth date | Player or Auto | Matters for season (harvest, plague seasonality), sub-era, pending events |
| Locale and Region | Player or Auto | Determines polity, prices, language, diseases |
| Biological sex | Random (approx. 50/50; slight male birth skew) | Drives legal and social structure in §6–7. \[OPEN\]: representation of gender identity and non-binary lives needs a product and research decision |
| Religion at birth | Locale-weighted by date; family-linked | Includes minority groups (Jews, Huguenots, Orthodox, Christians in Muslim lands, etc.) |
| Culture/ethnic context | Locale; family | Use historically appropriate categories (Tuscan, Venetian, Genoese, Welsh, Morisco, Turkmen, Rajput, Han, Hui, Ainu, etc.); avoid anachronistic racial categories |
| Social class and household | Locale class distribution (§5.3) | Class distribution varies sharply by region and settlement type |
| Parents' occupations | Class-linked tables | See §6 occupation sets |
| Wealth tier (Means) | Class band + random roll | See §9 |
| Status/rank | Class + lineage | May be hereditary (nobility, caste, military household) or acquirable |
| Legitimacy | Random + class | Illegitimate birth has major legal effect among elites; less among poor |
| Birth order and siblings | Region-specific fertility; mortality | Inheritance rules vary (primogeniture, partible, *mezzadria* household splits, ultimogeniture in some places) |
| Health seed (Constitution) | Random with environmental modifiers | Hidden; shapes disease resistance and longevity |
| Temperament tags | Random | Narrative tags (cautious, bold, pious, curious) with light stat effects |
| Starting advantages/disadvantages | Derived (§5.4) | Shown as plain-language tags |

### 5.3 Baseline class distributions (starting values, all \[EST\] and tunable)

Values are approximate shares of births, to be replaced by researched data. Rural/urban split matters: use settlement type as a variable.

| Context | Elite (rulers, high nobility, patriciate) | Gentry / professionals / merchants | Artisans, shopkeepers, guildsmen | Peasants / agrarian | Servants, labourers, urban poor | Enslaved / outsiders | Clergy-linked births |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Italy, urban (Florence/Venice) | 1–3% | 8–12% | 25–35% | 5–10% | 25–35% | 1–3% | 1–2% |
| Italy, rural contado | <1% | 3–5% | 5–10% | 65–75% | 10–20% | <1% | 1% |
| England, village | 1–2% (gentry) | 5–10% (yeomen, ministers) | 5–10% | 55–65% (husbandmen/cottagers) | 15–25% (labourers) | \~0% | 1% |
| Ottoman rural (Balkan/Anatolia) | <1% | 1–2% | 3–5% | 85–90% | 3–5% | 1–2% | \~1% (ulema/dervish families) |
| Mughal village | <1% (zamindar families higher locally) | 2–3% | 8–12% (weavers etc.) | 70–80% | 5–10% | 1–2% | \~1% |
| Ming rural (Jiangnan vs. north) | <1% (gentry 1–2%) | 2–5% | 5–10% | 80–90% | 3–5% | \~1–3% (servile groups) | 1–2% (clergy/monastic) |
| Japan, rural | <1% (daimyo kin) | 3–5% (samurai/ji-samurai early; formal samurai after 1590s \~5–7%) | 3–5% | 80–85% | 2–4% | 1–2% (outcastes) | 1–2% |

### 5.4 Starting advantages and disadvantages (tag model) \[DESIGN\]

Tags are data-driven; each tag has effects on specific stats, events and choices. Examples:

- **Family-linked:** *Guild Master's Child* (+craft access, +Patronage early); *Noble Cadet* (+Standing, −Means, military/church track); *Younger Son/Daughter* (fewer inheritance prospects; church/military/marriage alliance routes); *Orphan*; *Widowed Mother's Household*.
- **Status-linked:** *Free Peasant*; *Bondsman/Serf*; *Hereditary Military Household* (Ming); *Timar Holder's Son* (Ottoman); *Mansabdar's Kin* (Mughal); *Outcaste Origins* (Japan); *Caste-bound Occupation* (India).
- **Religion-linked:** *Convert Family* (conversos, Moriscos — suspicion pressure); *Recusant Household*; *Jewish Household* in a locale with specific restrictions; *Armenian Merchant Network*.
- **Environmental:** *Plague Summer Birth*; *Famine Year*; *Border Zone*; *Port City* (trade and disease exposure).
- **Individual:** *Frail Infant*; *Sharp Wits*; *Gifted Hands*; *Strong Singing Voice* (church/court musical paths).

### 5.5 Random vs. deterministic

| Always deterministic from (date, location) | Randomised within bounds | Player-selected (Custom) |
| --- | --- | --- |
| Polity, ruler, laws, currency, religious establishment, active events, language(s), calendar, disease seasonal weights, tech level | Class, wealth, family, siblings, health seed, temperament, parents' occupations (within class table), rumours and local incidents | Date, location, optional class band, religion where multiple are plausible, gender, whether life starts on a fixed historical day |

---

## 6. Social Classes and Life Paths

### 6.1 Latin Christendom (Italy, England, Iberia, France, HRE) — generic table with local variants

| Class | Lifestyle and wealth | Rights and restrictions | Education | Marriage | Politics and military access | Mobility | Risks and opportunities |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **cls\_high\_nobility\_patriciate** (princes, peers, grandees, Venetian *nobili*, Florentine *ottimati*) | Palaces, retinues, estates, banking or rents; very high Means | Legal privileges; sumptuary rules; obligation to maintain honour; women's property rights vary by region | Private tutors; humanist (Latin, rhetoric, music) in Italy; universities | Arranged dynastic alliance; dowry crucial; remarriage common after widowhood | High; offices, councils, embassies; command or patronage of armies | Upward only via favour; downward via faction loss, debt, exile | Court intrigue, execution, exile; opportunities: patronage, offices, command |
| **cls\_gentry\_minor\_nobility** (English gentry, Spanish *hidalgos*, French *noblesse d'épée*, Italian lesser nobles) | Manor/estate or town house; comfortable but exposed to inflation; Means medium-high | Local office (JP, sheriff, magistrate); tax exemptions in Iberia and France | Grammar school, university, Inns of Court; courtly accomplishments | Arranged with strong landed and kin logic | Local administration, militia commands, parliament (England) | Rise via office, law, marriage; fall via debt | Rural disputes; opportunities: Parliament, Court, trade investment |
| **cls\_clergy** (parallel track) | Wide range: cardinal to hedge-priest; monks, friars, nuns | Celibate (Catholic); benefit of clergy and church courts; reformed churches allow clerical marriage | Cathedral schools, universities, monastic training; Latin literate | Not for Catholic clergy; Protestant ministers marry | Moderate: ecclesiastical offices, preaching, chaplaincies; no direct military role (some prelates exceptions) | Merit or patronage can raise a talented commoner; benefice markets | Heresy suspicion; plague deaths among carers; opportunities: scholarship, patronage, missions |
| **cls\_burgher\_professional** (merchant-bankers, lawyers, notaries, physicians, printers, master apothecaries) | Urban houses, trade capital; Means medium-high | Citizenship rights in free cities; guild/college membership; usury and canon-law constraints (receding) | University law or medicine; counting-house apprenticeship; abacus schools in Italy | Marriage within trade and professional circles; dowry strategy | Municipal office; sometimes military financing; urban militias | Fortune-based mobility; possible ennoblement or purchase of office (France, Spain, Italy) | Bankruptcy, plague, political purge; opportunities: investment, office, patronage |
| **cls\_master\_artisan** (guild masters) | Workshop with journeymen and apprentices; household economy; Means medium | Guild privileges and duties; can vote or hold office in guild-run cities; restrictions on competition | Apprenticeship (5–7 years typical \[EST\]); basic literacy common in towns | Marriage into guild families; widows often continue workshops | Guild and city councils; militia duty | Moderate; guild closing rules (family preference) tighten over time | Competition, famine price shocks; opportunities: workshop growth, commissions |
| **cls\_journeyman\_apprentice** | Live in master's household (apprentices); low wages | Bound by indenture; limited legal autonomy | On-the-job training | Often delayed until mastership | Minimal; militia | Entry to mastery depends on fees, connections | Abuse, unemployment; opportunities: travel (*Wanderjahre*), mastery |
| **cls\_free\_peasant** (yeoman, husbandman, *mezzadro*, free *laboureur*) | Smallholding, tenancy or sharecrop; Means low-medium | Customary rights; dues, tithes and rents; village assemblies | Informal; some parish or village schooling; literacy variable | Village endogamy; later marriage in NW Europe, earlier in Mediterranean \[EST\] | Village offices; militia levy | Slow; land purchase possible for a minority | Famine, plague, rent increases, enclosure disputes |
| **cls\_landless\_labourer\_servant** (cottagers, wage labourers, domestic servants, urban poor) | Subsistence; precarious; high exposure to price spikes | Little or no property; settlement laws (England); vagrancy statutes | Little formal | Delayed for service-age youth | Almost none; can be impressed into service | Few paths; service in good households can create patronage | Hunger, vagrancy punishment; opportunities: patronage via service |
| **cls\_serf\_bonded** (eastern Europe; residual elsewhere) | Bound labour, dues to lord | Attached to land; limited movement; legal subjection | Minimal | Lord's consent often required | None | Flight to towns, rare emancipation | Harsh seigneurial control; periodic revolt |
| **cls\_enslaved\_outsider** (domestic slaves in Italy/Iberia; galley slaves; Jewish and Roma communities with legal limitations) | Varies enormously; slaves have no legal autonomy; Jewish households may be wealthy but restricted | Slaves: property; Jews: restricted occupation, residential ghettos, special taxes (Italy, Papal States); Roma: expulsion edicts | Slaves: none; Jewish communities: strong internal education | Within community; limited cross-community | Very limited | Manumission possible; conversion changes status but raises suspicion | Violence, expulsion, forced conversion, trial; opportunities: medicine, banking (Jewish moneylenders), mediation |

**Regional variants to implement in data:** Venetian citizen classes (*cittadini originari*); English yeoman vs. cottager gradations; French venal office-holders (*noblesse de robe*); Spanish *limpieza de sangre* barrier; HRE free imperial city citizens vs. territorial subjects; Swiss Confederation burgher/peasant communes.

### 6.2 Ottoman Empire

| Class | Lifestyle and wealth | Rights and restrictions | Education | Marriage | Politics and military | Mobility | Risks and opportunities |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **cls\_ottoman\_palace\_elite** (viziers, pashas, palace officials, *devshirme* graduates) | Wealth from sultanic favour and grants; no hereditary guarantee | Rank belongs to the sultan; property can be confiscated (*müsadere*) | Palace schools (Enderun) for selected boys; rigorous training | Dynastic or household alliances, often with the sultan's family | Highest access; commanders and governors | Rapid rise or sudden fall; mobility is the system's logic | Execution, confiscation; opportunities: governorships, vizierate |
| **cls\_ottoman\_janissary\_sipahi** | Salaried infantry (Janissary); timar income (*sipahi*) | Janissaries celibate early (loosened later); sipahis owe cavalry service | Training in corps; literacy varies | Janissaries gain marriage rights later (late 16th century) | Core military; Janissaries influential in politics | Promotion by service; hereditary claims grow over time | War, discipline; opportunities: pay, loot, promotion |
| **cls\_ulema** (judges, jurists, teachers) | Salaried, endowments; moderate to high Means | Judicial and educational authority; religious law | Madrasa training; Arabic, law, theology | Within learned families | Judicial office (*kadi*), advisory roles | Ladder of madrasas and judgeships | Political rivalry; opportunities: office, patronage |
| **cls\_ottoman\_merchant\_artisan** (Muslim and non-Muslim guild members) | Urban households, bazaar shops | Guild regulation; fixed price controls (*narh*); non-Muslims pay *cizye* and face dress/building rules | Guild apprenticeship; Quranic or communal schools | Within community | Local administration through guilds and communal leaders | Possible rise via trade; Greek, Armenian and Jewish merchants hold key niches | Fires, price controls, confiscation |
| **cls\_ottoman\_reaya\_peasant** (Muslim and Christian villagers) | Smallholder; pay tithe (*öşr*) and land dues | Bound to land registers; dues owed to timar-holders or tax-farmers | Little formal; village imams or priests teach | Village endogamy | Local headman roles; levy burdens | Limited; flight to cities increasingly common | Tax pressure, banditry, Celali unrest, *devshirme* levy |
| **cls\_ottoman\_enslaved** (household, military, galley, agricultural) | Dependent on owner | No legal autonomy; manumission valued religiously | Variable | Concubinage possible with owner; children may be free | Elite slaves (*kul*) can rise within palace | Manumission or elite service | Exploitation, death; opportunities rare but real |

### 6.3 Safavid Persia and Mughal India (shared Persianate frameworks)

| Class | Lifestyle and wealth | Rights and restrictions | Education | Marriage | Politics and military | Mobility | Risks and opportunities |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **cls\_qizilbash\_noble / cls\_mughal\_mansabdar** | Revenue assignment (jagir) or tribal estates | Subject to ruler's favour; property reverts in many cases | Persian literacy; courtly culture | Alliances among elites; Mughal–Rajput marriages | Command, governorships, court | Rank promotion/demotion by emperor or shah | War, intrigue, jagir transfers; opportunities: command, patronage |
| **cls\_ulema\_sayyid\_brahmin\_scholar** | Endowments, gifts, teaching fees | Religious and legal authority; revenue grants (*madad-i ma'ash*, *suyurghal*) | Madrasa, pathshala, Sanskrit/Persian learning | Within learned families | Advisory, judicial | Patronage-dependent | Court politics; opportunities: grants, teaching |
| **cls\_merchant\_banker** (Gujarati *bania*, Armenian, Parsi, Persian merchant, Muslim trader) | Urban wealth; credit instruments (*hundi*) | Caste or community rules; ruler's tolls | Accounting, languages | Within caste/community | Influence through lending to nobles | High mobility via trade | Piracy, tolls, confiscation; opportunities: trade networks |
| **cls\_artisan\_weaver** | Caste-linked occupation; household production | Jati/guild restrictions | Apprenticeship in family | Within caste | Minimal | Limited, migration to boom towns | Price shocks, famine; opportunities: export demand |
| **cls\_peasant\_raiyat** | Village cultivation; revenue to state and zamindar | Customary rights; revenue demands; bondage in some cases | Little formal | Early marriage common in many communities \[EST\] | Village leadership; militia/levy | Limited; some join military labour markets | Famine, rent pressure, war |
| **cls\_zamindar\_local\_lord** | Local land control, retinue | Revenue-collecting rights and military duties | Informal | Alliances with local lords | Local power; may rebel | Rise by service or defiance | Suppression, revenue disputes |
| **cls\_pastoral\_nomad (Persia) / cls\_wandering\_ascetic (India)** | Mobility-based | Tribal law (nomad); religious asceticism recognised | Oral/religious | Within group | Tribal levies; ascetic orders occasionally armed | Mobile | Raid, conflict; opportunities: herding, pilgrimage |

### 6.4 Ming China

| Class | Lifestyle and wealth | Rights and restrictions | Education | Marriage | Politics and military | Mobility | Risks and opportunities |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **cls\_ming\_official\_gentry** (*shenshi*) | Landholding, stipend, tax exemptions; Means high | Legal privileges (corporal punishment exemptions, labour exemptions); honour duties | Classical education; examinations | Arranged; match for kin network | Officialdom; no direct military command except in crisis | Examination success is the mobility route | Political purges; examination failure; opportunities: office, patronage |
| **cls\_ming\_imperial\_clan** | Stipends from throne; restrictions on residence and occupation | Strictly limited from officialdom | Court tutors | Clan-regulated | None (by design) | Little | Poverty for distant branches; opportunities: stipend |
| **cls\_ming\_merchant** | Wealth in trade, salt, silver; Means high to very high in Huizhou/Shanxi | Low formal status; sumptuary rules loosely enforced | Literacy and accounting; some classical | Strategic marriage with gentry | Indirect via bribery and patronage | Convert wealth into gentry status via sons' education | Confiscation, extortion, piracy; opportunities: salt, textiles, overseas silver |
| **cls\_ming\_peasant** | Small farm, tenancy, cash crops; household labour (men and women) | Tax and corvee obligations (commuted to silver after Single Whip); register-based | Village schools for some; clan schools | Early marriage common; extended family households | Village headship, militia | Education of a son is the main route up | Flood, famine, tax collectors, banditry |
| **cls\_ming\_artisan\_military\_household** | Hereditary obligations (artisan and soldier households) | Bound to service; decayed system with desertion | Craft or military training | Within category | Garrison service | Flight common as system erodes | Poverty, corvee; opportunities: guild/craft stability |
| **cls\_ming\_servile\_degraded** | Dependent labour, entertainers, certain boat people, bondservants | Legal discrimination; barred from exams in some cases | None | Within group | None | Manumission or evasion | Exploitation; limited opportunities |
| **cls\_ming\_eunuch** (parallel track) | Palace service; high officials can be wealthy | Excluded from marriage in conventional sense (many adopt family structures) | Palace schools for senior eunuchs | Nominal | Palace administration, intelligence, military supervision | Rise via imperial favour | Purge; opportunities: very high influence |

### 6.5 Japan (Sengoku to early Tokugawa)

| Class | Lifestyle and wealth | Rights and restrictions | Education | Marriage | Politics and military | Mobility | Risks and opportunities |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **cls\_daimyo\_kin** | Domain income in *koku*; castle; retinue | Hostage and loyalty obligations; political marriages | Martial and cultural training; Zen, tea | Political marriage | Highest | Rise via conquest; fall via defeat | Death, clan extinction; opportunities: domain, alliances |
| **cls\_samurai\_retainer** | Stipend/fief or rice allowance; service duty | Right to bear two swords (formalised c. 1587–1591); obligation to lord | Literate (varying), martial skills | Arranged within rank | Military and administrative | Rise via battlefield merit in Sengoku; less so after 1600 | War death, unemployment (ronin after 1600); opportunities: promotion in war |
| **cls\_peasant\_hyakusho** | Village farmers; rice dues | Village collective responsibility (*mura*); cannot bear swords after 1588 | Temple schools (*terakoya* emerges later) | Village endogamy | Village headman; levy in wartime | Sengoku: some rise as ashigaru or jizamurai; post-1590 status freeze | Famine, levy, razing; opportunities: village leadership |
| **cls\_artisan\_merchant** | Castle-town and port economy (Sakai, Hakata) | Guild privileges eroded; merchant houses grow | Literacy and accounting | Within merchant circles | Indirect (financing) | Moderate; status ceiling post-1600 | Seizure; opportunities: arms trade, foreign trade |
| **cls\_monk\_priest** | Temple income; temple towns can be armed | Temple privileges eroded by Nobunaga and Hideyoshi | Scriptural study | Varies by sect (Shin priests marry) | Some temples are military powers | Merit and sect politics | Temple destruction, forced submission |
| **cls\_outcaste** (*eta*, *hinin*) | Leather, executions, cleaning; stigma | Residential segregation; limited legal protections | None formal | Within group | None | Very limited | Discrimination; opportunities: monopoly crafts |

### 6.6 Life paths (career tracks) \[DESIGN\]

Careers are modelled as **Tracks** with entry requirements, ranks, stat gates, income, risks and exits. Tracks are region- and class-gated. Do not offer modern careers.

**Latin Christendom:** Farmer/sharecropper; agricultural labourer; apprenticeship → journeyman → master (wool, silk, goldsmith, painter's workshop, printer, bookbinder, builder, shoemaker, tailor, baker); merchant factor → merchant → banker; notary; lawyer; physician/apothecary (university or guild routes); teacher/tutor; clerk/scribe; cleric (parish priest, friar, monk/nun, canon, bishop); soldier (levy, mercenary, officer); sailor, navigator, ship's officer; privateer/pirate; courtier/servant of a great house; artist or musician at a court; midwife (female domain); innkeeper; actor (from 1570s London); printer-publisher; explorer or colonist (Iberian).

**Ottoman:** Peasant/timar cultivator; guild craftsman; merchant; scribe/clerk; *kadi*/ulema; *devshirme* recruit → Janissary → officer or palace career; sipahi; galley sailor or captain; dervish/Sufi; caravan operator; eunuch or palace servant; physician.

**Persia and India:** Cultivator; weaver/artisan; *munshi* (scribe); soldier (*sawar*, matchlockman); mansabdar track; merchant/banker; *vakil* (agent); court painter/poet; scholar (*ulema*, Brahmin pandit); temple servant; ascetic; trader in the Indian Ocean.

**Ming:** Farmer; weaver; craftsman; merchant; examination candidate → *shengyuan* → *juren* → *jinshi* → official; clerk/runner; soldier (garrison); monk or Daoist priest; physician; teacher; boatman; pirate or smuggler; eunuch.

**Japan:** Farmer; ashigaru; samurai retainer → castle officer; swordsmith/armourer; merchant; monk; tea practitioner; artisan; sailor; trader at Sakai/Nagasaki; Kirishitan catechist.

**Cross-regional special tracks (P2+):** Diplomat/agent; spy; missionary (Jesuit, Franciscan, Dominican, Buddhist, Sufi); translator/interpreter; cartographer; instrument-maker; plague doctor (*medico della peste*, municipal appointment in Italian cities); inquisitor; judge; prison keeper; wet nurse (a major female occupation in Europe).

---

## 7. Childhood → Adulthood → Old Age

### 7.1 Life-tick model \[DESIGN\]

- **Base tick:** one year of life per turn, with 1–3 *Life Cards* per year (a Life Card is a situation requiring a decision or revealing a consequence).
- **Zoom mechanic:** the engine can switch to *monthly* or *daily* ticks during crises (plague outbreak, siege, battle, trial, voyage, accession of a ruler, key anniversaries).
- **Seasonality:** each year has agricultural (sowing, harvest), liturgical (Lent, Easter, Ramadan, Obon, Lunar New Year), and campaign seasons. Disease and war risk are seasonally weighted (plague peaks in summer in Europe; campaigning seasons by region).

### 7.2 Stages and generic content

| Stage (typical age) | Content | Key variation drivers |
| --- | --- | --- |
| **Birth** (0) | Survival roll for mother and infant (maternal death risk per birth is substantial \[EST\]); baptism within days (Catholic/Orthodox/Protestant), naming ceremonies and circumcision customs (Islam, Judaism), purification rituals; wet-nursing for elites | Class; religion; disease load; midwife availability |
| **Infancy** (0–2) | Highest mortality period; feeding choice; swaddling customs; household fortunes matter | Wet-nurse arrangement; plague year; famine |
| **Early childhood** (3–6) | Play and household chores; first religious instruction; sibling roles | Class; region; household size |
| **Later childhood** (7–13) | Schooling for some (grammar, parish, abacus, madrasa/maktab, village school, temple school); child labour for most; service placement begins \~10–14 in much of Europe \[EST\]; devshirme age range roughly 8–18 \[FACT/EST\]; samurai coming-of-age (*genpuku*) from c. 12–16 | Class; gender; region; wealth |
| **Adolescence** (14–20) | Apprenticeship, service, university, monastic novitiate, military page/trainee, betrothal and early marriage in many societies, exam preparation (Ming) | Class; gender; region |
| **Young adulthood** (21–34) | Career entry, marriage, children, migration, military service, political or religious commitment | All |
| **Mature adulthood** (35–49) | Peak in workshop, office, command, patronage; inheritance of fathers' property; guardianship of dependents | Class; career |
| **Later adulthood** (50–64) | Declining physical capacity; offices, councillorships, village elder roles; widowhood; retirement impossible for most | Class; health |
| **Old age** (65+) | Dependence on family, almshouses, monasteries or religious charity; testamentary decisions (wills); deathbed rites | Class; family strength |
| **Death** | See §20 | All |

### 7.3 Marriage, family and fertility patterns (starting parameters, all \[EST\])

| Region/context | Typical female first-marriage age | Typical male first-marriage age | Household pattern | Notes |
| --- | --- | --- | --- | --- |
| NW Europe (England, Netherlands, N. France) | Mid-20s | Mid-to-late 20s | Nuclear household; servants; life-cycle service | A substantial minority never marry; late marriage limits fertility |
| Italy (esp. Tuscany) | Late teens to early 20s | Late 20s to 30s | Larger multi-generational households, especially among sharecroppers | Large age gap in some urban elites; dowry inflation; convent as dowry-saving route for daughters (*monacazione forzata*) |
| Iberia | Early-to-mid 20s | Mid-20s | Nuclear-leaning; elites extended | Strong honour norms; many in church and military service |
| Ottoman lands | Mid-teens to early 20s | 20s | Extended or stem-family; elites with concubinage; polygyny uncommon outside the rich | Marriage contracts and dower (*mehr*) under Islamic law |
| Mughal India / Persia | Teens (varies by community) | 20s | Joint/extended family; caste endogamy; elite polygyny | Early betrothal in some communities; Hindu widow-remarriage restrictions by caste; sati practised in some communities and discouraged by some rulers |
| Ming China | Mid-teens to early 20s | 20s | Extended families, patrilineal, clan lineage organisations rising | Concubinage among the wealthy; widow chastity promoted by the state |
| Japan | Late teens (elite earlier) | 20s | *Ie* (household) with continuity focus; adoption to continue lines | Adoption is a first-class mechanic |

**Mechanics:** Marriage requires (a) availability rules (age, religion, caste/status, kin permission), (b) a negotiation (dowry/bridewealth/alliance), (c) a market (marriage options appear as Life Cards with named candidates). Divorce: limited or banned in Catholic Europe (annulment possible for the elite), possible in Islamic law, Protestant jurisdictions (limited), Japan and China (informal and legal routes). Remarriage after widowhood is common.

### 7.4 Gender affordances \[DESIGN, built on FACT\]

Gender sets **option availability, legal capacity and social risk**, not stat caps. Implement as rule tables keyed by (region, class, date, marital status). Exceptional lives (female rulers, scholars, artists, merchants, soldiers) must be reachable through rare but historically attested paths.

| Region | Property and law | Education | Work and public life | Notable exceptions (examples) |
| --- | --- | --- | --- | --- |
| England | Coverture (married women generally have no separate property; widows hold dower); single women and widows have legal capacity | Elite women educated at home; girls' literacy lower than boys' \[EST\] | Domestic service, textile work, brewing, midwifery, trade as widows | Elizabeth I; women brewers and traders |
| Italy | Dowry as property; inheritance rules favour male heirs but widows can control property; convents | Elite humanist education for some women | Textile work, trade, midwifery, courtesan culture; convent careers | Isabella d'Este; Caterina Sforza; painters (Sofonisba Anguissola) |
| Ottoman | Islamic law grants women ownership, inheritance (half male share), court access | Home and some female teachers | Women own waqf, run workshops, litigate; limited public mobility | Hurrem Sultan; Nurbanu; Kosem (court power roles) |
| Mughal/Persia | Muslim women inherit; Hindu women have limited property rights (stridhan) | Elite women educated in Persian/Arabic | Court women influence; merchants and artisans' wives | Nur Jahan; Gulbadan Begum; Mirabai (poet-saint) |
| Ming | Patrilineal inheritance; women hold dowry; widows' chastity honoured | Elite women may be literate; poetry circles in Jiangnan | Textile production, midwifery, trade; courtesans | Women poets, Nuns |
| Japan | Women of warrior class held property and influence in Sengoku; narrowing later | Elite women literate | Household managers; some female castellans; shrine maidens; entertainers | Women warriors are rare but attested; widows can act as regents |

### 7.5 How stages differ \[representative contrasts\]

- **Class:** A Florentine silk merchant's son (age 7–13 in abacus school; at 15 sent as a factor to Lyon) vs. a Tuscan sharecropper's son (labour from age 8; wedded at 25; household of 10).
- **Region:** A girl in England in service from 12 vs. a girl in Ming Jiangnan weaving silk at home vs. an Ottoman girl in a guild household.
- **Time:** Before 1520, a literate English boy's route is clerical; after 1540 it widens to law, grammar-school teaching and trade (post-Reformation).
- **Occupation:** Soldiers' life cycles (campaign years, injury, demobilisation) are discontinuous; sailors spend years at sea.

---

## 8. Game Stats

### 8.1 Design rules \[DESIGN\]

1. **No global Happiness stat.** Use Spirit (below) as a gentle morale buffer; avoid modern psychological framing.
2. **Wealth is not one number** — see §9: Means (tier) + Assets.
3. **Status and Reputation are distinct.** Standing is formal rank; Honour is community judgment.
4. All stats range 0–100 unless noted; deltas per event are capped (typically ±10 except catastrophic events).
5. Visible stats appear as **descriptive bands** (e.g. *Hale*, *Frail*) in addition to or instead of numbers; hidden stats influence outcomes without UI display.
6. Every stat must change **an actual probability or option set**; do not add decorative stats.

### 8.2 Core stat table

| Stat | Represents | Changes via | Affected by | Affects | Visible |
| --- | --- | --- | --- | --- | --- |
| **Health** | Current physical condition | Injury, illness, age, nutrition, medical care, labour intensity | Disease events, famine, hygiene (Locale), Constitution, Means | Survival rolls, work capacity, military fitness | Yes (qualitative band; number optional) |
| **Constitution** (hidden) | Innate resilience and longevity | Fixed at birth; slow modification by hardship | Birth seed, childhood nutrition | Disease resistance, ageing speed | No |
| **Vigor** | Strength and stamina | Labour, training, age | Health, nutrition | Manual work success, combat fitness, injury recovery | Yes (band) |
| **Wits** | Practical intelligence and judgment | Education, experience, mentorship | Learning, life choices | Success in negotiation, problem-solving, avoiding scams | Partly (descriptors); numeric hidden |
| **Learning** | Formal and informal education: literacy by language, numeracy, specialised knowledge | School, apprenticeship, tutors, reading, travel | Class, region, gender, religious schooling, print availability | Career access, patronage, administration, scholarship | Yes (literacy tags, e.g. *Latin-literate*, *Persian-literate*) |
| **Skill** (dictionary: craft/trade/art/administration/seamanship/medicine/husbandry etc., 0–100 each) | Occupational competence | Practice, training, workshop quality | Apprenticeship, guild, mentors | Income, quality of output, access to promotions | Yes (per skill) |
| **Martial** | Fighting and military competence | Training, combat, command experience | Vigor, weapons exposure, units | Battle survival, command roles, duels | Yes (when relevant) |
| **Means** | Wealth tier + asset portfolio (§9) | Income, inheritance, dowry, gifts, theft, loss | Class, career, war, debasement | Everything — marriage market, diet, healthcare, education | Yes (tier name, assets list) |
| **Standing** | Formal rank and legal status (title, guild degree, mansab rank, samurai status) | Promotion, purchase of office, ennoblement, demotion, conviction | Class, office, patronage, lineage | Political access, legal privileges, marriage options | Yes (title) |
| **Honour** (reputation) with audience vectors: Community, Guild/Profession, Court/Patrons, Faith community, Military | How trustworthy and respected one is | Conduct, scandal, public acts, rumour, achievements | Behaviour, gossip networks, success/failure | Credit (borrowing), marriage, patronage, hiring, legal credibility | Yes (per audience) |
| **Patronage** | Strength and quality of one's patron–client network | Cultivating patrons, service, gifts, kin ties | Standing, Honour, Skill, political climate | Access to offices, loans, protection, mobility | Yes (named patrons list plus strength band) |
| **Devotion** | Visible piety and religious practice | Ritual, pilgrimage, conversion, study | Upbringing, community, crisis events | Moral choices, community standing, spiritual events | Yes |
| **Suspicion** (hidden) | Risk of being denounced (heresy, witchcraft, treason, convert-suspicion) | Associations, speech, ancestry, books owned, ritual lapses | Region/date climate, neighbours' enmity, Inquisitions, state | Probability of investigation, trial, expulsion | No (hint events only) |
| **Household** | Family standing: dependents, harmony, lineage continuity, family Means | Marriage, children, deaths, inheritance, alliances | Choices, health, economic shocks | Support in crises, inheritance, social capital | Yes |
| **Authority** | Actual political/administrative power exercised | Office, command, jurisdiction | Standing, Patronage, Skill | Ability to decide, tax, adjudicate, command | Yes (when in office) |
| **Spirit** | Morale and resilience in hardship (melancholy and fortitude; humoral language allowed) | Loss, trauma, success, faith | Events, Household, Devotion | Recovery, risk-taking, breakdown events | Yes (band) |

**Derived values (not stored):** Survival Odds (Health + Constitution + Locale modifiers); Credit Rating (Honour + Means + Patronage); Mobility Index (Standing + Learning + Patronage); Danger Exposure (Locale risk × occupation × Suspicion).

### 8.3 Stat update principles \[DESIGN\]

- **Annual drift:** Health, Vigor and Martial decline after \~40 at class-dependent rates; Skill grows with practice and plateaus; Learning plateaus after formal schooling unless the person reads.
- **Event deltas:** Each event outcome specifies stat deltas with caps and optional hidden flags.
- **Interactions:** High Honour dampens the cost of minor scandal; low Means amplifies disease mortality; high Patronage raises the chance of favourable rolls in legal events; high Suspicion increases trial probability.
- **Regional skins:** UI labels vary (Honour: *onore* in Italy, *credit/worship* in England, *namus/şeref* in Ottoman contexts, *mianzi/face* in China, *meiyo* in Japan) but map to the same underlying stat vector. \[OPEN\]: precise translations and cultural nuance need expert review.

---

## 9. Economy

### 9.1 Representing wealth without modern economics \[DESIGN\]

**Principle:** Wealth is represented as **Means** (a tier derived from household income and assets relative to local subsistence) plus an **Asset ledger** (named holdings). The UI shows tier names and holdings, not modern currency totals.

**Subsistence Unit (SU):** the yearly cost of minimum adequate food and shelter for one adult in a given Locale and year (food dominates for poor households \[EST\]). Each Locale has a price table and a Harvest Quality Index (HQI) that scales food costs.

| Tier | Name | Approx. household resource (in SU per adult-equivalent per year) \[DESIGN, tunable\] | Typical examples |
| --- | --- | --- | --- |
| W0 | Destitute | < 0.7 | Beggars, vagrants, famine victims |
| W1 | Poor | 0.7–1.2 | Landless labourers, apprentices without support |
| W2 | Modest | 1.2–2.5 | Small tenant farmers, journeymen, village artisans |
| W3 | Comfortable | 2.5–6 | Master artisans, yeomen, minor clerks, small merchants |
| W4 | Wealthy | 6–20 | Substantial merchants, lawyers, gentry, senior guild masters |
| W5 | Rich | 20–100 | Great merchants, nobles with estates, senior officials |
| W6 | Magnate | 100+ | Princes, grand bankers (Fugger, Medici at peak), imperial favourites |

**Asset ledger types:** coin and bullion; credit owed to/from others; land (units: acres/*staioro*/*podere*, *bigha*, *mu*, *koku*-assessed fief, *dönüm*); buildings; workshop tools; livestock; ship shares; office or benefice (venal or granted); jagir/timar assignment (non-owned, revocable); jewellery and plate (a store of value); books; slaves/servants (where legal). Dowry and inheritance claims are first-class assets and obligations.

### 9.2 Currencies and units \[FACT unless noted\]

| Region | Principal units |
| --- | --- |
| Florence | Gold florin (*fiorino*); accounts in lire, soldi, denari (1 lira = 20 soldi = 240 denari) |
| Venice | Gold ducat (*zecchino*); lire; Bank of Rialto (1587), Banco del Giro (1619) |
| Rome/Naples/Spain | Scudo/ducat; Spanish *real*, *peso de a ocho* (8 reales), *maravedí* as accounting unit |
| England | £/s/d (12d = 1s; 20s = £1); groat, angel, sovereign, crown; Great Debasement 1544–51 |
| France | *Livre tournois* (20 sols, 12 deniers); *écu* |
| Ottoman | Silver *akçe*; gold *sultani*; debasement 1580s onward; *kuruş* later |
| Persia | Silver *shahi*, *abbasi*; *tuman* as 10,000-dinar accounting unit |
| Mughal | Silver rupee; copper *dam* (40 dams = 1 rupee under Akbar); gold *mohur* |
| Ming | Silver by weight (*liang*/tael); copper cash (*wen*, strings of \~1000); paper *baochao* defunct as real money |
| Japan | Copper *mon*; silver by weight (*monme*, *kan*); gold *ryō*; rice measure *koku* (c. 180 L \[EST\]) |
| Spanish colonies | Silver peso, *real*; cacao beans as small change in Mesoamerica |

### 9.3 Goods, food and land

- **Staples:** wheat/rye/barley (Europe), rice (East and South Asia, Lombardy), millet/sorghum (North China, India), olive oil and wine (Mediterranean), ale (England), maize and potatoes (Americas; spreading slowly), sweet potato and maize reach China in the 16th century \[FACT\].
- **Trade goods:** wool and cloth, silk, cotton, spices (pepper, cloves, nutmeg, cinnamon), sugar, salt, silver, gold, timber, iron, copper, saltpetre, paper, books, porcelain, tea (Ming), coffee (Ottoman from mid-16th century), tobacco (from late 16th century), slaves.
- **Harvest model:** each Region has an annual HQI (0–100). Low HQI raises grain price multiplier and famine-event probability. Climatic cooling episodes (1590s, 1630s–40s) lower mean HQI \[EST\].
- **Land tenure forms:** freehold, copyhold and leasehold (England); *mezzadria* sharecropping (Tuscany); feudal and seigneurial dues (France, HRE); *timar* (Ottoman, non-hereditary); *jagir* (Mughal, revocable); *zamindari* rights; Ming rent-paying tenants and landlord-gentry estates; Japanese fiefs assessed in *koku*.

### 9.4 Taxes, tribute and obligations

- **Europe:** church tithe; crown taxes (English subsidies, French *taille* and *gabelle*, Spanish *alcabala* and *millones*); feudal dues; city taxes (Florentine *catasto*, *monte* debt); fees.
- **Ottoman:** *öşr* (tithe), *cizye* (non-Muslim poll tax), *avarız* (extraordinary levies), customs dues.
- **Mughal:** land revenue (Akbar's assessments claim about one-third of produce; actual burden varied \[DISPUTED\]); customs and transit tolls.
- **Ming:** land tax and labour service converted progressively to silver under the Single Whip; surcharges frequent.
- **Japan:** assessed-yield dues in rice; nominal rates in a broad range from about one-third to two-thirds of assessed yield \[EST/DISPUTED\]; village collective responsibility.

### 9.5 Employment, markets and finance

- **Work:** household economies dominate; wage labour exists but fluctuates; guilds regulate many urban trades; service contracts; seasonal agriculture; corvee and military levy.
- **Markets and finance:** local markets and fairs (Lyon, Frankfurt, Antwerp, Besançon, Leipzig); bazaars and caravanserais; bills of exchange; maritime insurance; *monti di pietà* (first at Perugia 1462); Antwerp bourse (1531), Amsterdam exchange (1602, VOC shares); *hundi* credit instruments (India).
- **Economic risks:** harvest failure; debasement; war requisition; sovereign bankruptcy (Spain 1557 onward); piracy and shipwreck; plague quarantine; price revolution; tax-farmers; confiscation; fires; usury accusations.
- **Economic opportunities:** commenda/partnership ventures; land purchase (e.g. English monastic lands after 1536–40); venal office; ship or mine shares; printing and publishing; military contracts; colonial ventures (Iberian), joint-stock companies (from 1600–1602).

### 9.6 Economic mechanics (implementation spec) \[DESIGN\]

1. **Household ledger (annual):** Income streams (wages, farm output, rents, fees, stipend, dowry receipts, plunder) minus costs (food scaled by HQI and household size, rent/dues/taxes, tithe, apprenticeship fees, dowries, charity, debt service).
2. **Net result** updates cash and credit. **Means tier** recomputed from (net worth / household SU).
3. **Ventures:** player invests a share of liquid assets in a venture (trade voyage, partnership, land improvement, loan). Each venture type has region/date-specific payout distributions and failure modes (piracy, wreck, bankruptcy of partner).
4. **Credit:** borrowing depends on Honour (Community/Guild) and Patronage; default damages Honour and may trigger legal action or loss of assets.
5. **Price tables:** per Locale per year: grain price multiplier (from HQI), cloth, rent, wage, travel costs. Stored in data; updated by events.
6. **Never show:** modern bank accounts, credit scores, salary/benefit terms, or consumer-brand analogies.

---

## 10. Politics and Power

### 10.1 Political structure types \[FACT, with DESIGN notes\]

| Type | Examples | Leadership and succession | Law and authority | Gameplay hooks |
| --- | --- | --- | --- | --- |
| Oligarchic republic | Venice (doge elected for life; Great Council of patricians); Florence in republican phases; Genoa; Dutch Republic (stadtholder plus Estates) | Elections by patrician councils; office rotation | Civil law; magistracies; guild participation varies | Council offices, factional politics, conspiracy, exile |
| Signoria / duchy | Milan, Ferrara, Mantua, Urbino, Medici Florence (de facto) | Hereditary or de facto family rule | Princely courts; law codes; courts | Court patronage, condotta contracts, dynastic marriage |
| Elective theocracy | Papal States (pope elected by cardinals) | Conclave; papal nepotism | Canon law and papal courts | Church careers, patronage, sale of indulgences and offices |
| Composite monarchy | Spain (Castile and Aragon with different laws and *cortes*); England and Wales (Parliament plus common law); France (Estates General last met 1614; *parlements*) | Hereditary succession (primogeniture; Salic law excludes female succession in France; England and Spain allow it) | Mixed royal, customary, and Roman law | Local office, litigation, taxes, religious conformity |
| Elective empire | Holy Roman Empire (seven electors; Diet) | Elective emperor, in practice Habsburg from 1438 | Imperial law; territorial sovereignty | Territorial confessional politics; imperial cities |
| Sultanic state | Ottoman | No fixed rule of primogeniture; princes govern provinces; fratricide custom (institutionalised under Mehmed II, ended with Ahmed I's 1603 succession; later *kafes* confinement) | Sharia plus sultanic *kanun*; kadi courts | Palace and provincial service; devshirme; Janissary politics |
| Sacred-monarchical state | Safavid (shah as spiritual guide and king) | Dynastic; Qizilbash kingmaking | Sharia plus royal decrees; tribal law | Court, Qizilbash factions, ghulam rise |
| Imperial household state | Mughal (emperor; mansabdari) | No fixed succession; wars of succession (1658) | Sharia for Muslims; Hindu personal law; imperial *farmans* | Mansab ranks, court factions, provincial governors |
| Bureaucratic monarchy | Ming (emperor; Grand Secretariat; Six Ministries; censors; eunuch agencies) | Primogeniture preferred but contested (Great Rites; succession crises) | Great Ming Code (1397); local magistrates | Examinations, factional struggle, tax reform |
| Warlord and shogunate | Sengoku Japan; Tokugawa bakuhan system | Daimyo succession by heirs or adoption; shogun by lineage | House codes (*bunkoku-hō*); Buke shohatto (1615) | Retainer service, castle towns, local war |

### 10.2 Factions, alliances, rivalries (representative; all entities require data records)

- **Italy:** Medici vs. Pazzi, Albizzi legacies; Piagnoni (Savonarola's followers) vs. Arrabbiati; French vs. Imperial parties; Orsini vs. Colonna (Rome); Venetian *Senato* factions (Giovani vs. Vecchi).
- **England:** Yorkists vs. Lancastrians (to 1485); Catholic recusants vs. Protestant establishment; Puritans vs. conformists; court factions (Seymour, Dudley, Howard families).
- **France:** Catholic League (Guise) vs. Huguenots (Bourbon-Condé; Coligny); *politiques*.
- **Ottoman:** Janissaries vs. sipahis; Palace factions; viziers vs. ulema; Celali rebels.
- **Persia:** Qizilbash tribes (Ustajlu, Shamlu, Takkalu) vs. tajik bureaucrats vs. ghulams.
- **Mughal:** Turani vs. Irani nobles; Rajput vs. Muslim nobles; Deccan vs. northern interests.
- **Ming:** Donglin vs. eunuch faction (Wei Zhongxian); court officials vs. military; regional gentry vs. state.
- **Japan:** Daimyo coalitions (Takeda, Uesugi, Hojo, Oda, Tokugawa, Toyotomi, Mori, Shimazu), temple leagues (Ikkō-ikki).

### 10.3 How an ordinary player interacts with politics \[DESIGN\]

Political engagement is modelled as a **ladder of arenas**; the player's Authority, Patronage, Honour and Standing determine which rungs are reachable.

1. **Household and kin:** negotiate marriage, inheritance and guardianship.
2. **Community:** village or parish office, petition to the lord, join a confraternity or guild, organise or oppose neighbours.
3. **Guild/city/domain:** guild offices, city councils (where open), town militia, municipal posts; in Ottoman lands, guild and communal leadership.
4. **Provincial/Court:** patronage, petitioning a governor or court, serving as clerk or agent, litigation.
5. **Realm:** only through high Standing + Patronage; or as a witness to events.

**Verb set for political Life Cards:** petition; vote (where permitted); serve; bribe; denounce; testify; flee; shelter; join revolt; informant; conspire; appeal to patron; litigate; swear oath; refuse oath.

**Rebellion model:** Grievance (tax, hunger, religious pressure) × Organisation (priests, guild networks, nobles, local leaders) × Trigger (new tax, execution, harvest failure) → Outcome distribution (repression, concession, spread). Players can be bystanders, participants or leaders; repression produces Suspicion, confiscation and exile.

**Diplomacy:** available through professions (merchant, envoy, translator, cleric, agent) and marriage alliances. Ordinary people do not negotiate treaties but may carry messages, translate or witness.

---

## 11. War and Conflict

### 11.1 Principles \[DESIGN\]

- Conflict is experienced at **individual and community scale**, not as grand strategy.
- Disease, hunger and desertion kill more soldiers than battle in most early-modern campaigns \[FACT, general finding; proportions \[EST\]\].
- Civilians are routinely affected through requisition, billeting, sieges, sack and displacement.

### 11.2 Types of conflict (catalogue)

- **Dynastic and territorial wars:** Italian Wars; Habsburg–Valois wars; Ottoman–Habsburg; Ottoman–Safavid; Mughal conquests.
- **Civil and succession wars:** Wars of the Roses; Mughal succession wars (post-1627 and 1657–58); Japanese Sengoku conflicts; Ming rebellions.
- **Religious and confessional wars:** French Wars of Religion; Dutch Revolt; Thirty Years' War; Ikkō-ikki conflicts.
- **Naval and maritime conflict:** Mediterranean galley wars; Atlantic privateering; Indian Ocean Portuguese fort wars; Armada.
- **Frontier and raiding:** Ottoman *akinji*; steppe raids on Ming and Muscovy; Uskok raids in the Adriatic; coastal pirates (wokou, Barbary corsairs).
- **Colonial and conquest wars:** Spanish conquests; Portuguese expansion; Dutch/English company wars.
- **Local feuds and banditry:** vendetta (Italy, Corsica), clan feuds, brigandage.

### 11.3 Who fights, recruitment and roles

| Region | Fighters and recruitment | Main roles | Weapons (gameplay classes) |
| --- | --- | --- | --- |
| Italy/Europe | Condottieri early; mercenary companies (Swiss, landsknechts, Italian bands); militias; professional tercios; levies; privateers | Pikeman, arquebusier, halberdier, light horse (stradiot), man-at-arms, gunner, sapper, galley rower/marine, camp follower, sutler | Pike, halberd, sword, crossbow (declining), matchlock arquebus then musket, artillery, bastioned fortifications |
| England | Levies and trained bands; mercenaries abroad; naval volunteers; privateers | Archer (declining), billman, pikeman, musketeer, sailor | Longbow (declining; last major use early 16th century), bill, pike, firearms, naval artillery |
| Ottoman | Janissary corps (salaried); sipahi (timar cavalry); levies; provincial troops; naval volunteers; devshirme | Janissary musketeer, sipahi cavalryman, artillery, engineer, galley crew, frontier raider | Composite bow, sabre, firearms, cannon, galleys |
| Persia | Qizilbash cavalry; ghulam musketeers and artillery; tribal levies | Cavalryman, musketeer, artilleryman | Sabre, bow, musket, cannon |
| Mughal | Mansabdar contingents; imperial household troops; local levies; Rajput cavalry | Sawar (horse), matchlockman, artilleryman, elephant handler, camp servant | Sabre, bow, lance, matchlock, cannon, war elephant |
| Ming | Hereditary military households (decayed); recruited soldiers; local militias; mercenaries; border garrisons | Infantry, gunners, cavalry (northern), naval marines, wall guards | Spears, swords, crossbows, firearms (arquebus, cannon, fire-lances), Great Wall defences |
| Japan | Samurai retinues; ashigaru levies; peasant conscripts; temple armies | Samurai spearmen/cavalry, ashigaru arquebusier/pikeman, castle garrison | Spear (dominant), sword, bow, matchlock arquebus (after 1543), castle fortifications |

### 11.4 Individual war outcomes \[DESIGN\]

War Life Cards: *mustered; march; camp sickness; skirmish; siege; battle; plunder; billeting; desertion; mutiny; capture; ransom; wound; discharge; pension (rare); promotion; death*.

**Resolution:** resolve battles as chained rolls influenced by role, Martial, Health, unit quality, leadership, supplies, luck and terrain — not as tactical simulations. Casualty severity bands: unscathed; minor wound; serious wound (infection risk); crippling injury; death. Disease risk is rolled **separately from combat** during campaigns.

**Captivity:** ransom (elite), prison, forced labour, galley service, enslavement (Mediterranean, Ottoman frontier, Atlantic), forced conversion; release by exchange or ransom or manumission. Ransom amounts scale with Standing and kin Means.

**Rewards:** wages (often irregular — mutinies over arrears are historically common), plunder, land grants (timar, jagir, fief), titles, pension or alms (rare), social mobility for exceptional soldiers (esp. in Japan during Sengoku, Mughal service, Ottoman palace service).

**Territory and consequences:** conquest changes Locale control timeline; local effects include tax regime changes, religious policy changes, resettlement, confiscations and refugee flows. Wars also change prices and disease load.

---

## 12. Religion, Culture and Society

### 12.1 Religion table

| Religion/Belief | Where and when | Key practices and institutions | Gameplay hooks |
| --- | --- | --- | --- |
| Roman Catholicism | Italy, Iberia, France (majority), Habsburg lands, colonial worlds; England until 1534 and 1553–58; global missions | Mass, sacraments, confession, indulgences (pre-Trent), saints, confraternities, monasteries, Inquisition, Index | Church careers, penance, Inquisition risk, pilgrimage, patronage |
| Lutheranism | German lands, Scandinavia | Bible in vernacular; clerical marriage; Wittenberg | Conversion and conflict; schools |
| Calvinism / Reformed | Geneva, Netherlands, parts of France (Huguenots), Scotland, Puritans in England, Hungary/Transylvania | Consistory discipline; predestination; psalmody | Moral surveillance; confessional conflict |
| Anglican (Church of England) | England from 1534 (Henrician) / 1559 (Elizabethan) | Book of Common Prayer (1549/1552/1559); episcopal | Conformity pressure; recusancy fines |
| Anabaptists and radicals | Switzerland, Netherlands, Germany (Münster 1534–35) | Adult baptism; pacifism; communal | Severe persecution; flight |
| Eastern Orthodoxy | Balkans, Muscovy, Greek lands, Ottoman Christian subjects | Liturgy; patriarchates; monastic centres (Athos) | Ottoman minority rules; clergy roles |
| Sunni Islam | Ottoman lands, Mughal ruling class, Central Asia | Five pillars; Hanafi school dominant; ulema; Sufi orders | Madrasa careers; sharia courts; pilgrimage (hajj) |
| Twelver Shi'a Islam | Safavid Persia (from 1501), pockets elsewhere | Muharram rituals; mujtahids; shrines (Mashhad, Qom) | State-mandated conformity; clerical rise |
| Sufism | Across Islamic world | Orders (Mevlevi, Naqshbandi, Chishti, Qadiri, Bektashi); lodges | Mystic careers; popular piety; conflict with orthodoxy |
| Hinduism (Vaishnava, Shaiva, Shakta) with Bhakti traditions | India | Temples, pilgrimage, caste norms, domestic ritual; Bhakti saints (Kabir, Tulsidas, Mirabai) | Caste duties; temple patronage |
| Sikhism | Punjab (Guru Nanak c. 1469–1539; Guru Arjan executed 1606) | Gurdwaras, Guru Granth Sahib compilation (1604) | Community identity; conflict with Mughal state |
| Jainism, Zoroastrianism (Parsis) | India (Jain/Parsi merchants); Persia | Merchant networks; communal institutions | Occupational niches; legal restrictions |
| Judaism | Italy (ghettos), Ottoman lands (Salonica, Istanbul, Safed), Poland-Lithuania; after 1492 Sephardic diaspora | Talmudic learning; communal governance; printing (Venice, Salonica, Prague) | Financial and medical niches; expulsions; conversos |
| Buddhism | Japan (Zen, Pure Land, Nichiren, Tendai, Shingon), China, Tibet | Temples, monastic orders, pilgrimage | Temple politics; Ikkō armies |
| Shinto | Japan | Shrines, festivals, purity rites | Local ritual; seasonal events |
| Confucian ritual order; Daoism; popular religion | Ming China | Ancestor rites; examination curriculum (Neo-Confucian); temple cults; local gods | Exam path; family ritual obligations |
| Christianity as mission/minority (Kirishitan; Jesuit-led Chinese Christians; Goan Christians) | Japan (from 1549), China (from 1580s), India | Missionary catechesis; local lay confraternities | Persecution; conversion events |
| Folk beliefs, magic and witchcraft | All regions | Cunning-folk, charms, astrology, healers; witch-beliefs peak in Europe c. 1560–1630 \[EST\] | Witch accusations, healing choices, taboo events |

### 12.2 Festivals and calendars (gameplay as seasonal Life Cards)

- **Christian Europe:** Advent, Christmas, Carnival/Lent, Holy Week, Easter, Corpus Christi, Pentecost, saints' days (patron saints of cities and guilds), local festivals (Palio of Siena, Venetian Regata, Florentine Calcio), parish wakes and church ales (England until Puritan pressure).
- **Islamic world:** Ramadan, Eid al-Fitr, Eid al-Adha, Mawlid, Muharram/Ashura (Shi'a); Nowruz (Persia and Mughal); hajj caravans.
- **India:** Diwali, Holi, Dussehra, Ganesh and Durga festivals; Mughal court festivals; Sikh Baisakhi.
- **China:** Lunar New Year, Qingming (tomb sweeping), Dragon Boat, Mid-Autumn; temple fairs.
- **Japan:** Obon, New Year, Tanabata, local *matsuri*; tea gatherings.

### 12.3 Customs, norms and taboos

- **Honour and shame cultures:** duelling (Italy, France), vendetta, reputation of women (honour in Mediterranean, in Ottoman and Mughal contexts), sumptuary laws (Europe, Ottoman, Mughal, Japan).
- **Purity and pollution:** caste purity (India), outcaste groups (Japan), ritual impurity (Islam, Judaism), blood-purity ideology (*limpieza de sangre* in Spain).
- **Hospitality and gift economy:** patron–client gifts, bribes vs. gifts distinction varies by culture.
- **Community structures:** parish; guild; confraternity; village commune; mosque quarter (*mahalle*); caste panchayat; clan lineage (China); *mura* (Japan).
- **Gameplay effects:** these produce **Obligation Cards** (festival expense, duty to kin, guild fee, pilgrimage), **Taboo Cards** (actions that raise Suspicion or lower Honour), and **Conformity Checks** (e.g. recusancy fines, Muharram participation).

---

## 13. Technology and Knowledge

### 13.1 Technology tables by domain and sub-era (concise; \[FACT\] unless tagged)

| Domain | 6.1 (1450–1494) | 6.2–6.3 (1494–1565) | 6.4–6.6 (1565–1650) |
| --- | --- | --- | --- |
| Transport (land) | Foot, pack animals, carts, riverboats; couriers on horseback | Improved post networks: Imperial Post (Taxis) in the Empire; Ottoman *menzil* relay; Ming courier stations | Coach travel emerging in Europe; Mughal *dak chowki* runners; Sher Shah Suri's road building (1540s) as precursor |
| Transport (sea) | Caravel; carrack; galley | Galleon emerging; improved navigation (astrolabe, cross-staff; sounding) | Dutch fluyt (c. 1590s); East Indiamen; Manila galleons |
| Communication | Manuscript; early printing; messengers; heralds | Printed pamphlets, newsletters, vernacular Bibles; letters by merchant networks | Printed gazettes (Strasbourg 1605; Antwerp, Amsterdam); Ming print boom; Mughal and Safavid scribal courts |
| Agriculture | Three-field and two-field rotation; ox and horse ploughs; terraced rice; Chinese double-cropping | Columbian exchange begins (maize, potatoes, tomatoes, chilies move; new crops adopted slowly) | Maize and sweet potato spread in China; sugar plantations in Atlantic; Dutch land reclamation and drainage |
| Medicine | Galenic humoral theory; Arabic-Latin medical texts; herbal medicine; bone-setting; midwives; Chinese pulse and formula medicine; Ayurvedic and Unani traditions | Vesalius (1543) revises anatomy; plague tracts; syphilis remedies (mercury, guaiacum); Paracelsian chemical medicine | Harvey (1628); Bencao Gangmu (Li Shizhen, 1578/1596); apothecary regulation; quarantine regimes mature |
| Weapons | Hand cannon; siege bombards; longbow; crossbow; pikes; halberds | Matchlock arquebus; improved field artillery; bastioned fortresses; Japan receives arquebus 1543 | Musket; flintlock emerging (1610s–30s); lighter field guns (Gustavus Adolphus) |
| Construction | Gothic to Renaissance (Brunelleschi dome, 1436); castle building; Chinese palace complexes | Renaissance and Mannerist architecture (Bramante, Michelangelo); Ottoman mosque domes (Sinan); Mughal tomb gardens | Baroque; Isfahan building; Taj Mahal; Japanese castle towers (Himeji); Great Wall rebuilding (Ming) |
| Manufacturing | Guild workshops; water mills; fulling; glass; paper mills; silk reeling | Printing houses; ironworks; gunpowder mills; arsenals | Larger arsenals; Dutch shipyards; porcelain mass production (Jingdezhen); cotton industry (India) |
| Education | Church and cathedral schools; universities (Bologna, Padua, Paris, Oxford, Salamanca); madrasas; Ming academies | Humanist schools; Jesuit colleges (from 1540s); Protestant schools; vernacular printing | Jesuit global network; accademie (Lincei 1603); Ming private academies and Donglin; Japanese temple schools |
| Scientific knowledge | Ptolemaic cosmos; Aristotelian natural philosophy; Islamic astronomy and mathematics; Chinese calendar science | Copernicus (1543); Vesalius; Tartaglia; Stevin; mapping of Americas | Tycho; Kepler; Galileo (1609–10 observations; 1633 trial); Napier logarithms (1614); Jesuit astronomy in China |

### 13.2 Gameplay implications \[DESIGN\]

- **Travel and distance:** Foot travel \~20–30 km/day \[EST\]; horses faster with relay stations; ships vary hugely with wind and season. Travel is a Life Card chain with risks (robbers, weather, tolls, disease).
- **Information lag:** news travels at courier/ship speed; the player rarely knows distant events immediately. Implement per-Locale *news delay* (days) from event origin.
- **Literacy and print:** print access lowers cost of books and pamphlets; vernacular Bibles raise religious agency and Suspicion risk; manuscript culture dominates Islamic empires, India and Japan (though Japanese woodblock printing exists) \[FACT/EST\].
- **Medicine:** treatments are mostly ineffective or harmful by modern standards; gameplay should offer *choices* among healers (physician, barber-surgeon, apothecary, cunning woman, hakim, vaidya, temple priest) with probabilistic outcomes and cost, avoiding modern success rates. Quarantine and lazaretti reduce plague spread in places with administrative capacity (Venice, Ragusa).
- **Weapons:** firearms make soldiering less dependent on lifelong training; fortress design changes siege outcomes.
- **Technological diffusion:** treat arrival dates as **Technology availability windows** per Region (e.g. matchlock in Japan from 1543; printing in the Mughal court never mass-adopted).

---

## 14. Health, Disease and Survival

### 14.1 Demographic starting parameters (all \[EST\]; tune per region)

- **Life expectancy at birth:** roughly 30–40 years in much of Europe, similar or lower in other regions, with enormous variance by period, class and place. **Conditional life expectancy is far higher:** a person surviving to 15 often had decades more life ahead. Do NOT show 'life expectancy' as a ceiling; old age (60–75+) is common among survivors.
- **Infant mortality:** very approximately 15–30% die in the first year; roughly 30–45% before age 10 in many populations \[EST\]. Higher in cities, plague years, foundling hospitals and for wet-nursed infants of poor families.
- **Maternal mortality:** meaningful risk per birth \[EST\]; modelled as a Life Card with class-sensitive modifiers (midwife skill, Means, Health).

### 14.2 Disease catalogue (period-appropriate; names are the era's common labels where noted)

| Disease | Where/when | Notes for gameplay |
| --- | --- | --- |
| Plague (bubonic/pneumonic) | Recurrent across Europe, Ottoman cities, North Africa, India; notable: Italy 1575–77 and 1629–31; London 1563, 1603, 1625; Spain 1596–1602; Ottoman cities repeatedly | Summer peaks; mortality in stricken towns commonly 10–50% \[EST\]; Italian 1630–31 outbreaks killed roughly a third to a half of several cities' populations \[EST\]; quarantine, lazaretti, health boards (Italy); flight is the classic elite response |
| Smallpox | Endemic worldwide; devastating in the Americas after 1519–20 | Childhood killer in Eurasia; scarring; epidemic waves; no inoculation in Europe in this era (variolation known in parts of Asia) |
| Measles, whooping cough, diphtheria | Endemic | Child mortality |
| Dysentery ('bloody flux'), typhoid, summer diarrhoea | Cities and camps | Water and sanitation linked; army camp killers |
| Typhus ('camp fever', 'gaol fever') | Sieges, armies, prisons (e.g. Granada, Italian Wars) | War and prison events |
| Sweating sickness | England 1485, 1508, 1517, 1528, 1551 (and continental epidemic 1529) | Rapid, high lethality in affected places; wealthy not spared |
| Syphilis ('French pox' in Italy; 'Neapolitan disease' in France) | Epidemic spread from 1494–95 | Social stigma; mercury and guaiacum treatments; later milder forms |
| Malaria ('mal'aria', agues) | Roman Campagna, Po delta, Tuscany coast, Southeast England marshes, India | Seasonal; reduces labour; Locale modifier |
| Tuberculosis ('consumption') | Common across region | Chronic decline; household spread |
| Influenza (e.g. 1557–59 pandemic) | Europe and beyond | Elderly vulnerability |
| Famine fevers | Dearth years | Death from hunger and associated infection |
| Scurvy | Long sea voyages | Voyage events; treatment by fresh food known empirically |
| Ergotism, rickets, smallpox scars | Various | Chronic tags |

### 14.3 Famine, environment and disaster

- **Dearth years** \[FACT\]: Europe and Ming China suffer clustered harvest failures in the 1590s; England 1594–97; India (Deccan/Gujarat) 1630–32; Japan (Kan'ei famine) 1640s; Ming north China droughts 1580s–1640s.
- **Little Ice Age** (cooling episodes concentrated around the 1590s and 1640s \[EST\]) is a hidden pressure variable on HQI.
- **Floods and earthquakes:** Tiber flood (1530), Arno flood (1557), Yellow River floods (Ming), Constantinople earthquake (1509), Ferrara earthquake (1570); city fires (Venice Doge's Palace fire 1577; Istanbul fires).
- **Sanitation:** dependency on wells, rivers, cisterns, public baths (Ottoman *hamams*, Japanese bathhouses), waste removal; Locale sanitation score modifies disease and mortality.

### 14.4 Medical limitations and care options

- **Practitioners:** physician (university-trained, expensive), barber-surgeon, apothecary, midwife, cunning-folk, priest and monastic infirmaries, Sufi healer, *hakim*, *vaidya*, Chinese physician, Japanese physician or temple monk, bone-setter, itinerant quack.
- **Treatments:** bleeding, purging, herbals, charms, prayer, pilgrimage to healing shrines, quarantine. Evidence-based success is low for many conditions; outcomes in-game should reflect uncertainty, cost and belief rather than modern efficacy.

### 14.5 Health mechanics \[DESIGN\]

Three layers keep complexity low:

1. **Baseline hazard** per age band, modified by Constitution, Health, Means, Locale sanitation and nutrition. Starting annual death probabilities (tunable so that survival to age 15 lands roughly in the 55–70% range): age 0: 15–25%; 1–4: 4–6%; 5–14: 1–1.5%; 15–39: 1–1.5%; 40–59: 2–4%; 60–74: 5–10%; 75+: 15%+.
2. **Epidemic states** per Locale: *Rumour → Outbreak → Peak → Decline*, with player choices (flee, stay, nurse, quarantine, pray, profit) and class differences (elites often flee).
3. **Illness and injury Life Cards** with healer choice, cost, treatment outcome and chronic tags (*limp*, *poor sight*, *pockmarked*, *hearing loss*, *old wound*).

---

## 15. Historical Events

### 15.1 Event model and tiers \[DESIGN\]

**Tiers:**

- **Background events:** long-running conditions affecting everyone in a Region (printing spread, price revolution, climatic cooling, Columbian exchange, witch-hunt waves). Implemented as parameter drifts, not scenes.
- **Local events:** city- or village-scale incidents (a fire, a guild strike, a flood, a local feud, an execution).
- **Regional events:** multi-city or province-scale (famines, plague waves, regional wars, rebellions).
- **Major historical events:** named, widely documented events with anchor status.

**Anchor classes (used in §19):** `FIXED` (cannot change; player can only change their own experience), `SOFT` (core outcome fixed, details and timing may shift), `BRANCHABLE` (credible alternate outcomes with preconditions), `LOCAL_ONLY` (no wider consequences).

**Record schema (every event):** Name; Date or range; Location; Historical cause; Historical outcome; Important people; Affected groups; Player relevance; Possible player involvement; Possible alternative outcomes; Long-term consequences; Anchor class; Reach (which Locales feel it and how quickly via news delay).

### 15.2 Detailed records — priority events

**ev\_fall\_of\_constantinople\_1453** (Major, `FIXED`)

- *Date:* 6 April – 29 May 1453. *Location:* Constantinople (with Galata/Pera).
- *Cause:* Ottoman expansion under Mehmed II; shrinking Byzantine territory; failure of Western relief.
- *Outcome:* City falls; Constantine XI dies; Hagia Sophia becomes a mosque; Istanbul becomes the Ottoman capital; Greek scholars and clergy migrate (many to Italy).
- *People:* Mehmed II; Constantine XI Palaiologos; Giovanni Giustiniani Longo (Genoese commander).
- *Affected:* Greeks, Genoese and Venetians in the city, Ottoman army, Italian traders.
- *Player relevance:* births c. 1450–53 in Constantinople, Galata, Venetian/Genoese colonies, Ottoman frontier; impact on Mediterranean trade and Greek-learning transmission.
- *Involvement:* defender, civilian, merchant, informant, refugee, Janissary or Ottoman soldier.
- *Alternatives:* none at city level (FIXED); player-level alternatives: survive, flee, enslaved, ransomed.
- *Long-term:* Ottoman imperial consolidation; Italian demand for Greek texts; Venice–Ottoman rivalry.

**ev\_pazzi\_conspiracy\_1478** (Local/Regional, `BRANCHABLE` at low probability)

- *Date:* 26 April 1478 (Easter Sunday Mass). *Location:* Florence Cathedral.
- *Cause:* Pazzi family and allied interests opposing Medici dominance, with backing from Pope Sixtus IV's circle.
- *Outcome:* Giuliano de' Medici murdered; Lorenzo wounded and survives; conspirators executed; Florence excommunicated; war with the papacy and Naples (1478–80); Lorenzo's diplomacy in Naples (1479–80).
- *People:* Lorenzo and Giuliano de' Medici; Francesco de' Pazzi; Francesco Salviati; Sixtus IV.
- *Affected:* Florentine citizens, Medici supporters, Pazzi kin and clients.
- *Player relevance:* Florentine births 1450–1490; affiliations; reprisal violence in the days after.
- *Involvement:* bystander, assassin (low), defender, informant, neighbour caught up in reprisals.
- *Alternatives:* Lorenzo killed → Medici regime weakens earlier (affects 1494 trajectory).
- *Long-term:* Medici dominance consolidates; papal–Florentine hostility; Lorenzo's later 'tyranny' critiques.

**ev\_french\_invasion\_medici\_expulsion\_1494** (Major, `SOFT`)

- *Date:* Sept 1494 – 1495. *Location:* Italy (Asti → Florence → Rome → Naples).
- *Cause:* Charles VIII's claim to Naples; Ludovico Sforza's invitation; Italian disunity.
- *Outcome:* Piero de' Medici surrenders fortresses; Medici expelled (9 Nov 1494); Charles enters Florence (17 Nov); Naples taken (Feb 1495); League of Venice forms; Battle of Fornovo (6 July 1495); French withdraw.
- *People:* Charles VIII; Piero de' Medici; Savonarola; Ludovico Sforza.
- *Affected:* All Italian states; Florentine citizens; soldiers.
- *Player relevance:* Florence, Milan, Rome, Naples; military levy, billeting, plague/syphilis exposure.
- *Involvement:* levy, soldier, petitioner to French, refugee, factional actor.
- *Alternatives:* Piero resists → Medici remain; invasion stalls.
- *Long-term:* Start of the Italian Wars; end of Italian balance; Savonarola's republic.

**ev\_savonarola\_rise\_and\_fall\_1494\_1498** (Regional/Local, `BRANCHABLE`)

- *Date:* 1494–23 May 1498. *Location:* Florence.
- *Cause:* Power vacuum after Medici flight; apocalyptic preaching; moral reform movement.
- *Outcome:* Republic with Great Council (1494–98); Bonfire of the Vanities (7 Feb 1497); excommunication (May 1497); failure of the proposed ordeal by fire (April 1498); arrest and execution in the Piazza della Signoria (23 May 1498).
- *People:* Girolamo Savonarola; Alexander VI; Arrabbiati opponents; Piagnoni supporters.
- *Affected:* Florentine citizens, artists, clergy.
- *Player relevance:* Florentine moral and political choices; damages to art and property; denunciations.
- *Involvement:* join reform bands (*fanciulli*), donate or hide valuables, attend sermons, denounce, flee, testify.
- *Alternatives:* Ordeal occurs and Savonarola survives longer; papal compromise; Medici party resurgence.
- *Long-term:* Republican institutions that Machiavelli served; religious and artistic climate shifts.

**ev\_granada\_and\_expulsion\_1492** (Major, `FIXED`)

- *Date:* 2 Jan 1492 (Granada surrenders); 31 March 1492 (Alhambra Decree). *Location:* Granada, Castile, Aragon.
- *Outcome:* End of Muslim rule in Iberia; Jews ordered to convert or leave (estimates of those who left range widely, tens of thousands to well over 100,000 \[EST/DISPUTED\]); Sephardic diaspora to Ottoman lands, North Africa, Italy, Portugal.
- *Player relevance:* Iberian Jewish, converso and Muslim births; migrant lives in Salonica, Istanbul, Venice, Ferrara.
- *Alternatives:* none at policy level; player-level: convert, emigrate, hide, be caught.

**ev\_luther\_and\_reformation\_1517** (Major, `SOFT`)

- *Date:* 31 Oct 1517 (Luther's letter and Theses; the door-posting tradition is \[DISPUTED\]); Diet of Worms 1521; Peasants' War 1524–25. *Location:* Wittenberg and Empire.
- *Outcome:* Reformation; Bible translation; printing wave; Peasants' War (tens of thousands killed \[EST\]); confessional states by 1555.
- *Player relevance:* German, Swiss, Scandinavian, English, French, Dutch lives; religious choices; heresy exposure.
- *Alternatives:* Luther suppressed earlier (a branch with high Standing in the Empire) → slower or different fragmentation (BRANCHABLE only through elite actions).

**ev\_panipat\_1526** (Major, `SOFT`)

- *Date:* 21 April 1526. *Location:* Panipat, north of Delhi.
- *Cause:* Lodi Sultanate weaknesses; Babur's ambitions; invitation from disaffected nobles.
- *Outcome:* Ibrahim Lodi killed; Babur takes Delhi and Agra; Khanwa (16 March 1527) consolidates against Rana Sanga.
- *Player relevance:* Delhi–Agra region births; soldiers; camp followers; refugees.
- *Alternatives:* Babur loses → Lodi regime persists (low probability).
- *Long-term:* Mughal dynasty; Persianate court culture in India.

**ev\_sack\_of\_rome\_1527** (Major, `BRANCHABLE`)

- *Date:* 6 May 1527 (occupation into early 1528). *Location:* Rome.
- *Cause:* Imperial army (Spanish, German landsknecht, Italian) unpaid and mutinous after Charles of Bourbon's death in the assault; Clement VII allied against Charles V.
- *Outcome:* Mass killing, looting, ransom; Swiss Guard heavy losses; the pope besieged in Castel Sant'Angelo then forced to terms; Medici expelled from Florence in response.
- *People:* Charles of Bourbon; Clement VII; Philibert of Orange; Benvenuto Cellini (as memoirist).
- *Player relevance:* Roman births and residents; clerics; artists; refugees; soldiers on either side.
- *Involvement:* defender, victim, looter, ransomer, nurse, fugitive.
- *Alternatives:* Bourbon survives or the pope concedes early → milder outcome; delayed Counter-Reformation tone.
- *Long-term:* End of High Renaissance Rome; Spanish dominance; changed papal politics.

**ev\_siege\_of\_florence\_1529\_1530** (Regional, `SOFT`)

- *Date:* Oct 1529 – 12 Aug 1530. *Location:* Florence and Tuscan contado.
- *Outcome:* Republic of Florence falls to imperial–papal forces; Prince of Orange killed at Gavinana (3 Aug 1530); Medici restored; Alessandro de' Medici becomes duke (1532).
- *Player relevance:* militia service, famine in the city, ravaged countryside, exile and reprisals.
- *Alternatives:* Republic holds (low probability).

**ev\_dissolution\_of\_monasteries\_1536\_1540** (Regional, `SOFT`)

- *Date:* 1536–1540. *Location:* England and Wales.
- *Outcome:* Hundreds of religious houses closed; land sold to gentry and merchants; Pilgrimage of Grace (Oct 1536–Feb 1537) crushed; monks and nuns pensioned or displaced; relief for the poor and schools disrupted.
- *Player relevance:* monastery tenants and workers, clergy, gentry buyers, northern rebels.
- *Alternatives:* Pilgrimage succeeds in forcing concessions (BRANCHABLE: needs high-Authority northern player).

**ev\_armada\_1588** (Major, `SOFT`)

- *Date:* July–Aug 1588. *Location:* English Channel and North Sea.
- *Outcome:* Spanish Armada fails to link with Parma's army; storms and fire-ships; heavy Spanish losses on the return around Scotland and Ireland.
- *Player relevance:* English sailors and coastal communities; Spanish soldiers and sailors.
- *Alternatives:* Armada joins Parma → contingent invasion scenarios (hard branch; requires very high-impact actions).

**ev\_sekigahara\_1600** (Major, `BRANCHABLE`)

- *Date:* 21 Oct 1600. *Location:* Sekigahara, Mino Province.
- *Outcome:* Tokugawa Ieyasu's Eastern forces defeat the Western coalition led by Ishida Mitsunari after defections (notably Kobayakawa Hideaki); Tokugawa shogunate follows (1603).
- *Player relevance:* samurai, ashigaru, domain subjects; allegiance choices.
- *Alternatives:* Western victory → Toyotomi continuity (a valid alternate timeline requires specific earlier defections).

### 15.3 Compact catalogue (all require full schema records in data; tiers per §15.1)

| Event | Date | Location | Tier / Anchor | Player relevance and alternatives |
| --- | --- | --- | --- | --- |
| Gutenberg and spread of printing | c. 1450– | Mainz → Europe | Background / `FIXED` | Print access; printer careers; heresy exposure |
| Wars of the Roses | 1455–1487 | England | Regional / `SOFT` | Levies; loyalty choices; Bosworth (22 Aug 1485) outcome is `BRANCHABLE` |
| Ottoman conquest of Morea, Bosnia, Negroponte | 1460–1470 | Balkans, Aegean | Regional / `FIXED` | Refugees; devshirme; Venetian colonial lives |
| Ōnin War | 1467–1477 | Kyoto and Japan | Regional / `FIXED` | Refugees; samurai service; start of Sengoku |
| Granada War | 1482–1492 | Iberia | Regional / `FIXED` | Soldiers; Muslim and Jewish families |
| Dias rounds the Cape | 1488 | Southern Africa | Major / `FIXED` | Sailors; later Cape route |
| Columbus's first voyage | 3 Aug 1492 – Mar 1493 | Atlantic | Major / `SOFT` | Crew roles; Seville and Palos lives |
| Treaty of Tordesillas | 7 June 1494 | Iberia | Major / `FIXED` | Political background to overseas empires |
| Da Gama reaches Calicut | May 1498 | Indian Ocean | Major / `SOFT` | Sailors; Kerala port lives; Gujarati merchants |
| Jubilee year (Rome) | 1500, 1525, 1550, 1575, 1600, 1625, 1650 | Rome | Local / `LOCAL_ONLY` | Pilgrimage; income spikes; disease risk |
| Shah Ismail takes Tabriz | 1501 | Azerbaijan | Major / `FIXED` | Shi'a conversion pressure |
| Venetian Ghetto established | 1516 | Venice | Local / `FIXED` | Jewish residents; restrictions |
| Chaldiran | 23 Aug 1514 | Eastern Anatolia | Major / `FIXED` | Soldiers; frontier families |
| Ottoman conquest of Mamluk Egypt/Syria | 1516–1517 | Levant, Egypt | Major / `FIXED` | Cairo and Damascus lives; Ottoman provincial system |
| Cortés takes Tenochtitlan | 13 Aug 1521 | Mexico | Major / `FIXED` | Colonial and indigenous lives (P3) |
| Magellan expedition | 1519–1522 | Global | Major / `SOFT` | Crew roles |
| Mohács | 29 Aug 1526 | Hungary | Major / `SOFT` | Soldiers; Hungarian lives; Habsburg–Ottoman border |
| Siege of Vienna (first) | Sept–Oct 1529 | Vienna | Major / `BRANCHABLE` | City defenders; Ottoman troops |
| Act of Supremacy | 1534 | England | Major / `FIXED` | Religious conformity choices |
| Pilgrimage of Grace | Oct 1536 – Feb 1537 | Northern England | Regional / `BRANCHABLE` | Rebel or loyal |
| Preveza | 28 Sept 1538 | Ionian Sea | Major / `SOFT` | Galley crews |
| Tanegashima: matchlocks reach Japan | 1543 | Japan | Major / `FIXED` | Weaponry shift; blacksmith careers |
| Copernicus and Vesalius publish | 1543 | Europe | Background / `FIXED` | Learned circles |
| Council of Trent | 1545–1563 | Trent | Major / `FIXED` | Catholic reform effects on local life |
| Potosí silver strike | 1545 | Peru | Major / `FIXED` | Silver flows to Seville and China |
| Peace of Augsburg | 25 Sept 1555 | Holy Roman Empire | Major / `FIXED` | Confessional status by territory |
| Panipat II / Akbar's accession | 5 Nov 1556 | Delhi region | Major / `SOFT` | Soldiers; court careers |
| Talikota | 1565 | Deccan | Major / `FIXED` | Vijayanagara refugees |
| Dutch Revolt begins | 1568 | Low Countries | Regional / `BRANCHABLE` | Rebel, loyal, refugee |
| Lepanto | 7 Oct 1571 | Gulf of Patras | Major / `SOFT` | Galley crews; Venetian, Ottoman, Spanish fighters |
| St Bartholomew's Day massacre | Aug 1572 | Paris and French cities | Major / `FIXED` | Huguenot lives; Catholic neighbours; shelter or denounce |
| Venice plague | 1575–1577 | Venice | Regional / `SOFT` | Epidemic mechanics |
| Honnō-ji incident | 21 June 1582 | Kyoto | Major / `BRANCHABLE` | Retainers of Nobunaga and Akechi; alternate: Nobunaga survives |
| Gregorian calendar adoption | Oct 1582 | Catholic states | Background / `FIXED` | Date confusion between Catholic/Protestant lands |
| Imjin War | 1592–1598 | Korea | Regional / `SOFT` | Japanese levies; Ming expeditionary forces |
| Edict of Nantes | 1598 | France | Major / `FIXED` | Huguenot legal status |
| Defenestration of Prague / start of Thirty Years' War | 23 May 1618 | Bohemia | Major / `SOFT` | Soldiers, civilians in Germany |
| Plague of 1629–31 | 1629–1631 | Northern Italy | Regional / `SOFT` | Epidemic mechanics |
| Shimabara Rebellion | 1637–1638 | Kyushu | Regional / `SOFT` | Kirishitan and peasants; sakoku context |
| Treaty of Zuhab | 1639 | Ottoman–Safavid frontier | Major / `FIXED` | Border populations |
| English Civil War | 1642–1651 | British Isles | Major / `BRANCHABLE` | Soldiers; civilians; allegiance choices |
| Fall of the Ming (Li Zicheng takes Beijing; Qing entry) | Apr–June 1644 | Beijing | Major / `BRANCHABLE` | Officials, soldiers, refugees |
| Peace of Westphalia | 1648 | Münster and Osnabrück | Major / `FIXED` | War's end for survivors |

---

## 16. Historical Figures

### 16.1 Access tiers and rules \[DESIGN\]

- **Tier A — Distant:** the player can only hear rumours, see a procession, read a pamphlet or witness from afar (monarchs, sultans, emperors, most great generals).
- **Tier B — Public encounter:** the player may see or briefly meet the figure in public settings (sermon, procession, market inspection, audience).
- **Tier C — Petition / patron access:** the player with sufficient Standing/Patronage can petition or serve a figure or their household.
- **Tier D — Personal relationship possible:** the figure may become a patron, teacher, colleague, rival or friend, within plausible social proximity.
- **Rules:** (1) Do NOT make every famous person directly interactable. (2) Birth and death dates and signature works are **fixed** unless a valid divergence has modified them (§19). (3) The player may influence a figure's *circumstances* (patronage, commissions, rumours) but not override core biography without Level 4+ divergence. (4) Each figure record carries date-of-presence windows and Locale ranges.

### 16.2 Figure catalogue (core set; extend in data)

**Italy**

| Figure (dates) | Role / faction | Access | Fixed | Can change |
| --- | --- | --- | --- | --- |
| Lorenzo de' Medici (1449–1492) | De facto ruler of Florence; patron | B, C (Florence) | Death 8 April 1492; Pazzi survival | Patronage grants; local policies |
| Piero de' Medici (1472–1503) | Ruler of Florence 1492–94 | B | Expulsion 1494 (SOFT) | Whether he resists the French |
| Girolamo Savonarola (1452–1498) | Dominican prior; reformer | B, C | Execution 23 May 1498 (BRANCHABLE) | Support networks; ordeal-by-fire outcome |
| Niccolò Machiavelli (1469–1527) | Florentine secretary; writer | C, D | Authorship of *The Prince* (1513) | Career setbacks; acquaintances |
| Alexander VI Borgia (1431–1503) | Pope 1492–1503 | A, B | Papacy dates; death Aug 1503 | Appointments, rumours |
| Cesare Borgia (c. 1475–1507) | Papal commander and duke | B | Death 1507 | Campaign outcomes (local) |
| Julius II (1443–1513) | Pope 1503–13; patron of Michelangelo, Raphael | A, B | League of Cambrai context | Commission details |
| Leo X (1475–1521) | Pope 1513–21; Medici | A, B | Papacy dates; indulgence controversy | Local favours |
| Clement VII (1478–1534) | Pope 1523–34; Medici | A, B | Sack of Rome fate (BRANCHABLE) | Negotiation timing |
| Leonardo da Vinci (1452–1519) | Artist, engineer | C, D | Death 2 May 1519 | Student/assistant roles |
| Michelangelo (1475–1564) | Sculptor, painter, architect | C, D | Major works; death 1564 | Workshop roles |
| Raphael (1483–1520) | Painter | C, D | Death 1520 | Workshop roles |
| Isabella d'Este (1474–1539) | Mantuan marchioness; patron | C, D | Role in Mantua | Patronage given |
| Andrea Doria (1466–1560) | Genoese admiral | B, C | Admiralty; 1528 Genoa change | Naval service |
| Cosimo I de' Medici (1519–1574) | Duke (from 1537) and Grand Duke (1569) of Tuscany | A, B, C | Accession and rule | Office appointments |
| Aldus Manutius (c. 1449–1515) | Venetian printer | C, D | Press founding (c. 1494) | Staff and works printed (minor) |
| Andrea Gritti (1455–1538) | Doge of Venice 1523–38 | A, B | Doge term | Policy influence only at Level 3+ |

**England and Western Europe**

| Figure (dates) | Role / faction | Access | Fixed | Can change |
| --- | --- | --- | --- | --- |
| Henry VII (1457–1509) | First Tudor king | A, B | Bosworth win (BRANCHABLE) | Local administration |
| Henry VIII (1491–1547) | King 1509–47 | A, B | Break with Rome | Local effects |
| Thomas Cromwell (c. 1485–1540) | Chief minister | B, C | Execution 1540 | Appointments |
| Thomas More (1478–1535) | Lord Chancellor; writer | B, C, D | Execution 1535 | Circle of acquaintance |
| Elizabeth I (1533–1603) | Queen 1558–1603 | A, B | Reign and death | Local patronage |
| William Cecil (1520–1598) | Chief adviser | B, C | Term of office | Patronage |
| Francis Drake (c. 1540–1596) | Navigator, privateer | C, D | Voyages | Crew membership |
| William Shakespeare (1564–1616) | Playwright | D (London theatre circles) | Authorship of main works | Casting, patronage |
| Martin Luther (1483–1546) | Reformer | A, B | Theses, Bible translation | Local follower networks |
| John Calvin (1509–1564) | Reformer, Geneva | B, C | Geneva system | Congregational networks |
| Erasmus (c. 1466–1536) | Humanist scholar | C, D | Works | Correspondence |
| Jakob Fugger (1459–1525) | Banker | C, D | Bank empire | Loans extended |
| Charles V (1500–1558) | Emperor; King of Spain | A, B | Reign; abdication 1555–56 | Local outcomes |
| Philip II (1527–1598) | King of Spain | A | Reign | Local outcomes |
| William of Orange (1533–1584) | Leader of the Dutch Revolt | B, C | Assassination 1584 (BRANCHABLE) | Support networks |

**Iberia and overseas**

| Figure (dates) | Role / faction | Access | Fixed | Can change |
| --- | --- | --- | --- | --- |
| Isabella I (1451–1504) / Ferdinand II (1452–1516) | Monarchs of Castile and Aragon | A, B | Dynastic union; 1492 policies | Local effects |
| Christopher Columbus (1451–1506) | Navigator | B, C | 1492 voyage | Crew, patronage |
| Vasco da Gama (c. 1469–1524) | Portuguese navigator | B, C | 1497–99 voyage | Crew |
| Ferdinand Magellan (c. 1480–1521) | Navigator | B, C | Death 1521 | Crew |
| Hernán Cortés (1485–1547) | Conquistador | B, C | 1519–21 campaign | Soldier roles |
| Ignatius of Loyola (1491–1556) | Founder of the Jesuits | B, C, D | Society's foundation (1540) | Recruitment |
| Miguel de Cervantes (1547–1616) | Soldier, writer | D | Works | Circumstance |

**Ottoman and Safavid**

| Figure (dates) | Role / faction | Access | Fixed | Can change |
| --- | --- | --- | --- | --- |
| Mehmed II (1432–1481) | Sultan 1444–46, 1451–81 | A, B | Conquest of Constantinople | Local levy outcomes |
| Bayezid II (1447–1512) | Sultan | A | Reign | Local effects |
| Selim I (1470–1520) | Sultan | A | Conquests | Local effects |
| Suleiman I (1494–1566) | Sultan 1520–66 | A, B | Campaigns, laws (*kanun*) | Local effects |
| Hurrem Sultan (c. 1502–1558) | Consort of Suleiman | A, C (via household) | Role at court | Patronage |
| Mimar Sinan (c. 1489–1588) | Chief architect | B, C, D | Major buildings | Apprenticeship |
| Hayreddin Barbarossa (c. 1478–1546) | Ottoman admiral | B, C | Preveza 1538 | Crew roles |
| Sokollu Mehmed Pasha (1506–1579) | Grand vizier | B, C | Assassination 1579 | Patronage |
| Shah Ismail I (1487–1524) | Safavid founder | A, B | Tabriz, Chaldiran | Local effects |
| Shah Abbas I (1571–1629) | Safavid ruler | A, B | Reforms, Isfahan | Local effects |

**Mughal and Indian**

| Figure (dates) | Role / faction | Access | Fixed | Can change |
| --- | --- | --- | --- | --- |
| Babur (1483–1530) | Mughal founder | A, B | Panipat, memoirs | Local roles |
| Humayun (1508–1556) | Emperor | A, B | Exile and restoration | Local effects |
| Sher Shah Suri (c. 1486–1545) | Afghan ruler; administrator | A, B | Interregnum | Local administrators |
| Akbar (1542–1605) | Emperor 1556–1605 | A, B, C | Accession, policies | Local appointments |
| Abu'l-Fazl (1551–1602) | Court historian | C, D | *Akbarnama* | Scribe roles |
| Todar Mal (c. 1500–1589) | Revenue minister | C | Revenue system | Local assessments |
| Guru Nanak (1469–1539) | Sikh founder | B, D | Teaching | Follower networks |
| Mirabai (c. 1498–c. 1547, dates \[DISPUTED\]) | Bhakti poet-saint | B | Poetry | Devotee circles |
| Jahangir (1569–1627); Nur Jahan (1577–1645); Shah Jahan (1592–1666) | Emperors/empress | A, B | Reigns; Taj Mahal | Local effects |

**Ming and Japan**

| Figure (dates) | Role / faction | Access | Fixed | Can change |
| --- | --- | --- | --- | --- |
| Wang Yangming (1472–1529) | Philosopher-official | B, C, D | Teachings | Students, disciples |
| Jiajing (1507–1567) / Wanli (1563–1620) / Chongzhen (1611–1644) | Emperors | A | Reigns | Local effects |
| Zhang Juzheng (1525–1582) | Grand Secretary | B, C | Reforms 1573–82 | Local implementation |
| Qi Jiguang (1528–1588) | General vs. wokou | B, C | Campaigns | Soldier roles |
| Li Shizhen (1518–1593) | Physician; *Bencao Gangmu* | C, D | Work | Students |
| Matteo Ricci (1552–1610) | Jesuit missionary | B, C, D | Mission | Converts |
| Li Zicheng (c. 1606–1645) | Rebel leader | B | Capture of Beijing 1644 | Local alliances |
| Oda Nobunaga (1534–1582) | Warlord | A, B | Honnō-ji 1582 (BRANCHABLE) | Retainer roles |
| Toyotomi Hideyoshi (1537–1598) | Unifier | A, B | Rise; Korea campaigns | Retainer roles |
| Tokugawa Ieyasu (1543–1616) | Shogun from 1603 | A, B | Sekigahara (BRANCHABLE) | Retainer roles |
| Takeda Shingen (1521–1573); Uesugi Kenshin (1530–1578) | Warlords | A, B | Campaign history | Retainer roles |
| Sen no Rikyū (1522–1591) | Tea master | C, D | Forced suicide 1591 | Student roles |
| Francis Xavier (1506–1552) | Jesuit missionary | B, C | Mission 1549–51 | Converts |

---

## 17. Random Events

### 17.1 Principles \[DESIGN\]

- **Plausibility envelope:** events are drawn from a deck filtered by date, Region, Locale, class, occupation, gender, religion, season and WorldState flags. Anything outside the envelope has zero probability.
- **No-modernity filter:** an event cannot reference concepts that do not exist at the date and place (no 'newspaper' before printed gazettes, no 'police' in the modern sense, no 'insurance' except maritime and certain guild/confraternity relief).
- **Weights from frequency:** base probabilities derive from historical patterns (harvest failures, epidemic cycles, litigation, feast days) and are tunable in data.
- **Clustering:** events correlate through WorldState (a famine year raises riot, disease, and migration probabilities; a war year raises requisition, billeting, desertion).
- **Rare-event budget:** catastrophes (plague, sack, execution) have per-lifetime caps to avoid parody and to make them meaningful, though historical hotspots may exceed the cap.
- **Foreshadowing:** hard failures (execution, ruin) are preceded by warning events whenever historically plausible (rumours, summons, bad harvest).
- **Chains and cooldowns:** events can trigger follow-ups and have cooldowns to prevent repetition.

### 17.2 Categories and representative examples

| Category | Representative events (examples) |
| --- | --- |
| Family | Betrothal offer; dowry dispute; inheritance quarrel; death of a parent; widow's remarriage; child's illness; adoption (Japan); family feud; will dispute |
| Economic | Harvest failure; price spike; guild fee dispute; debt call; ship share maturity; confiscation; counterfeit coin; mercenary arrears; tax-farmer arrives |
| Weather and environment | Flood; drought; hard winter; hail; sea storm; earthquake; locust swarm; river freeze |
| Disease | Plague rumour; child fever; sweating sickness; syphilis encounter; wound infection; epidemic quarantine |
| Accidents | Mill accident; shipboard injury; fire in the quarter; fall from horse; building collapse |
| Social conflict | Neighbour feud; denunciation; rumours; carnival riot; insult leading to duel; guild strike |
| Opportunities | Patron's offer; apprenticeship placement; travel opportunity; commission; land sale; office vacancy; inheritance windfall; examination success |
| Travel | Road robbery; ferry delay; pilgrim route event; caravan hazards; storm at sea; border toll; plague cordon |
| Crime and justice | Theft; assault; trial before magistrate; imprisonment; fine; pardon; torture risk (jurisdiction-dependent); outlawry |
| Discovery and learning | A book; a new craft technique; an astronomical wonder (comet 1577, nova 1572, 1604); an invention; an encounter with a foreign traveller |
| Political | Tax increase; levy call; faction meeting; oath-swearing demand; local rebellion; arrival of a governor; succession news |
| Religious | Sermon that moves; confession; pilgrimage; heresy rumour; conversion offer; iconoclasm; festival obligation; witch accusation |
| Military | Recruiting sergeant; billeting; passing army; skirmish; siege; battle; plunder; capture |

### 17.3 Event data template

`{ id, category, conditions{ date_range, regions, locales, classes, occupations, religions, gender_rules, season, world_flags_required, world_flags_forbidden }, base_weight, modifiers[], cooldown, chain_to[], choices[], outcomes[], text_variants_by_culture[] }`

---

## 18. Choice Design

### 18.1 Principles \[DESIGN\]

- Choices must **emerge from the historical situation** and the character's position — no decorative decisions.
- Every major choice offers at least two options with **different trade-offs** (not 'good vs. bad'), reflecting real period tensions: loyalty vs. survival, faith vs. conformity, family vs. ambition, risk vs. security.
- Every major choice records outcomes in up to **seven consequence layers**:
  1. *Immediate* (stat, asset, status changes now)
  2. *Delayed* (timer-triggered future events)
  3. *Hidden* (flags, Suspicion, relationship changes the player does not see at once)
  4. *Personal* (health, spirit, skills)
  5. *Family* (Household changes; heirs; dependants)
  6. *Social* (Honour by audience; Patronage ties; community standing)
  7. *Historical* (contribution to divergence points; §19)
- **No choice without information:** the UI should give context but not full probabilities; historically plausible uncertainty is preserved.
- **Cultural voice:** text variants respect the region's idiom and values (honour, face, duty).

### 18.2 Choice types

- **Vocational:** apprenticeship, specialisation, entering service, taking holy orders, examination attempts.
- **Household:** marriage, dowry, adoption, inheritance, care for elders.
- **Economic:** invest, borrow, speculate, hoard grain, dodge taxes, bribe.
- **Religious and moral:** conform, convert, hide beliefs, denounce, shelter, pilgrimage, tithe.
- **Political and military:** swear an oath, take a side, volunteer or hide from levy, plunder or protect, rebel or inform.
- **Mobility:** migrate, travel for trade, emigrate, join an expedition, flee a plague city.
- **Crisis:** nurse the sick, abandon the household, evade or face a magistrate.

### 18.3 Representative examples

**C1 — The Bonfire of the Vanities (Florence, Carnival 1497; Florentine household, Wits ≥ moderate)**

- *Situation:* Savonarola's followers collect 'vanities' (mirrors, cosmetics, certain books and paintings, playing cards, musical instruments) for burning; your family owns several.
- *Options:* (a) Surrender items to the boys' collectors; (b) hide valuable pieces; (c) donate publicly to gain standing; (d) protest or mock.
- *Layers:* Immediate: lose or retain assets; Honour with Faith community ±; Delayed: after Savonarola's fall (1498) the choice can flip into social vulnerability; Hidden: Suspicion/Faction flags (Piagnone vs. Arrabbiato); Personal: Spirit; Family: spouse or parent may disagree; Social: neighbours track your behaviour; Historical: negligible individually; accumulates into local mood.

**C2 — Pilgrimage of Grace (Yorkshire farmer, Oct 1536)**

- *Situation:* Local monastery that gave you work is being closed; rebel leaders call for an oath.
- *Options:* Swear the Pilgrim's oath; stay home and avoid; inform the lord; join the march to Doncaster.
- *Layers:* Immediate: risk of being named; Delayed: after the rising's collapse (Feb 1537) reprisals and executions; Hidden: attainder risk; Personal: injury risk; Family: land and rent security; Social: village divisions; Historical: rebel numbers feed the BRANCHABLE flag only if many high-Authority players join.

**C3 — Devshirme levy (Balkan Christian village, 1520s)**

- *Situation:* Ottoman officials arrive to select boys; your son is of age.
- *Options:* Present him; hide him; bribe an official; flee the village; (family) volunteer him for a chance at palace advancement.
- *Layers:* Immediate: loss of child vs. risk of punishment; Delayed: the son may reappear as a Janissary or official (a Tier C petition path); Hidden: informant risk; Personal: Spirit; Family: Household shifts; Social: community reputation; Historical: none individually.

**C4 — Examination attempt (Ming, Jiangnan village boy, 1570s)**

- *Options:* Study for the county exam with family support; apprentice in a trade; join a clan school; borrow money for tutoring; accept patronage of a gentry family.
- *Layers:* Immediate: tuition costs; Delayed: results years later; Hidden: patron obligations; Personal: Learning and Spirit; Family: whole clan invests; Social: lineage rank; Historical: possible official career (Authority).

**C5 — Sack of Rome (6 May 1527; resident printer in Borgo)**

- *Options:* Flee early over the Tiber; shelter in Castel Sant'Angelo (if connected); hide books and presses; join a militia; collaborate with soldiers.
- *Layers:* Immediate: survival odds; Delayed: ransom demand and disease; Hidden: reputation among invaders; Personal: injuries; Family: separation; Social: reputation for courage or cowardice; Historical: contributes to the BRANCHABLE pool if the player reaches high-impact positions (e.g. papal household).

**C6 — Allegiance before Sekigahara (Mino samurai, autumn 1600)**

- *Options:* Join Ishida's coalition; join Tokugawa's; stay neutral; defect at the right moment (extremely high-risk, high-reward).
- *Layers:* Immediate: troop assignment; Delayed: domain reassignments (new lords) after 1600; Hidden: vassal's trust; Personal: combat risk; Family: heirs' prospects; Social: retainers' reputation; Historical: only retainers close to key commanders can matter.

**C7 — Plague in the city (Venice, summer 1576)**

- *Options:* Flee to the terraferma (needs means and a health pass); stay and work; volunteer as carer; hoard grain; falsify a health pass.
- *Layers:* Immediate: mortality risk; Delayed: property loss or gain by inheritance; Hidden: contagion carrier flags; Personal: Spirit; Family: dependants; Social: reputation for courage; Historical: none individually.

### 18.4 Anti-patterns

- Contextless binaries ('You see a bird. What do you do?').
- Choices whose outcomes ignore class or region.
- Choices that give modern ethical frames without period reality (e.g. 'report to the police').
- Choices that rewrite history without prerequisites.

---

## 19. Historical Divergence

Divergence is a core LegacyLife system. The player does **not** rewrite history because they selected an option; they change history only when **position, timing, resources and a chain of earlier actions** make it plausible.

### 19.1 Divergence levels \[DESIGN\]

```
D0 Personal  →  D1 Family  →  D2 Local  →  D3 Regional  →  D4 National  →  D5 Historical  →  D6 Major Alternate Timeline
```

| Level | What changes | Example (this era) | Typical requirements (starting thresholds, tunable) |
| --- | --- | --- | --- |
| D0 Personal | The character's own life path | Survive a plague by fleeing; avoid conscription | None beyond ordinary choices |
| D1 Family | Household fate and lineage | Family avoids ruin after Sack of Rome; son enters Janissary service | Household ≥ moderate; relevant choice chain (2+ steps) |
| D2 Local | A village, quarter, guild, parish or small town | A town negotiates surrender and avoids sack; a guild resists a tax; a monastery tenant community protects its monastery | Local Authority or high Honour in Community audience; Patronage with a local power |
| D3 Regional | A province, city-state or confederation outcome | A regional revolt succeeds; a city holds longer in a siege; a local religious settlement differs | Authority ≥ regional office or role in coalition; Patronage ≥ strong; prior D2 successes |
| D4 National (polity) | A state-level policy or outcome | The Republic of Florence survives 1530; a tax reform adopted differently; Pilgrimage of Grace wins concessions | Standing at court/council level; Authority ≥ high; multiple prerequisite flags; event `BRANCHABLE` with the player's role in the preconditions |
| D5 Historical | A major named event's outcome | Savonarola survives the ordeal crisis; Sack of Rome is milder; Honnō-ji fails | Pivotal role (one of the named causal roles); precondition chain; narrow time window; high Convergence Pressure to overcome |
| D6 Major Alternate Timeline | A systemic fork (e.g. no Tokugawa shogunate, no Reformation in a major state) | Western victory at Sekigahara persists into the 1600s; Ming survives 1644 | Not in MVP. Requires Era-level fork support, curated branch content, and multi-generation play \[OPEN\] |

### 19.2 Core mechanics

**Divergence Points (DP).** Each BRANCHABLE or SOFT event contains one or more DPs that define: the window (dates); prerequisite flags; pivotal roles (named positions or individuals the player could occupy or influence); resistance (historical inertia); possible outcomes with branch deltas; and convergence targets (what the world tends to snap back to).

**Information and timing.** The player must be physically able to act in time. Because news is delayed (§13.2), an action in Florence cannot affect an event in Rome within days unless the player is already in Rome or has a courier chain. If the player only learns of an event after its window, the DP is closed.

**Leverage score.** For a given DP, Leverage = weighted combination of: relevant Authority; Standing; Patronage (to the people who decide); Means (to bribe, equip, hire); Skill relevant to the action (negotiation, command, craft); Honour with the relevant audience; Proximity (Locale distance and travel time); Faction alignment; and Momentum (accumulated contribution from earlier related choices). Weights are per-DP data.

**Impact roll.** Impact = Leverage × Timing modifier − Resistance. Compare to level thresholds. Outcomes: *no effect*, *local effect only* (reduce level), *intended effect*, *backfire* (the attempt triggers reprisal or reveals the player, raising Suspicion).

**Convergence ('historical gravity').** After a divergence, each anchor event has a Convergence Pressure (0–1) pulling the world back toward its original outcome. Small divergences are absorbed (e.g. the player saves one town but the larger war result stands). Convergence decays over time and with the magnitude of accumulated divergence mass. High-level forks occur only if mass exceeds the anchor's threshold.

**Propagation.** Changes spread through the relation graph (Entities → relations) with decay per hop and per day (news delay). Typical order: Locale state → Faction attitudes → Polity decisions → neighbouring polities → Trade networks and price levels → later events' preconditions.

**Divergence budget (coherence guard).** Each life has a soft cap on simultaneous divergences (e.g. 1 D5 maximum, up to 3 D3–D4) to preserve coherence. Over-budget attempts resolve at lower levels.

**Timeline objects.** The world uses a **Baseline Timeline** (canonical) and **Branch Timelines** (delta patches against the baseline). Branches record: parent timeline, fork date, changed events, changed entity states, and flags. Only the current life's branch is playable in MVP; saved branches for sharing are P3.

**Content for alternates.** For each BRANCHABLE event, authors define curated alternates (P1/P2). If none exist, apply *generic extrapolation* with conservative effects (changed local state; baseline continues) and flag the branch as 'uncurated'.

### 19.3 What can and cannot change

| Class | Rule |
| --- | --- |
| `FIXED` | Cannot be changed by player actions in MVP. Player may change their own role, survival and local experience within the event. (D6 forks in later systems only.) |
| `SOFT` | Core outcome fixed; details can change (casualties in the area, local damage, timing by days, who is saved). |
| `BRANCHABLE` | Real alternate outcomes exist, gated by roles, preconditions and level thresholds. |
| `LOCAL_ONLY` | Player can change local consequences but not wider history. |

### 19.4 Worked examples (illustrative thresholds)

- **D2 (local) — Surrender of a Tuscan town in 1530:** a notary with Honour (Community) high and Patronage with the captain negotiates terms; success = reduced plunder; the Siege's outcome remains.
- **D4 (national) — Pilgrimage of Grace concessions:** requires northern gentry Standing, Authority of a commander, and prior D3 success in raising local support; even then Convergence Pressure pulls toward repression unless many local DPs succeed.
- **D5 (historical) — Savonarola's ordeal by fire (April 1498):** pivotal roles (Franciscan challenger, magistrates, Dominican prior). A player in a role with Authority over the ordeal logistics could tilt to either outcome; both outcomes produce curated branches.

### 19.5 Anti-patterns

- No 'kill the monarch' sandbox. High-level actions require high-level positions and plausible access.
- Failure is not game over; backfires produce interesting life consequences.
- Do not reveal exact thresholds to the player; provide hints (rumours, advice) instead.

---

## 20. Death and Legacy

### 20.1 Death causes (catalogue; probabilities by §14 and region)

- **Disease:** plague, smallpox, dysentery, typhoid, typhus, sweating sickness, tuberculosis, influenza, childbed fever.
- **Childbirth and infancy.**
- **Famine and exposure.**
- **Accident:** fall, fire, drowning, workplace accidents, shipwreck, mine collapse.
- **Violence:** battle and siege; massacre; murder; feud and vendetta; duel; robbery; piracy.
- **Judicial:** hanging, beheading (higher-status), burning (heresy, witchcraft, treason in some jurisdictions), drowning or other local forms, execution after rebellion, death in prison, galley service.
- **Honour deaths:** forced or sanctioned deaths in elite honour systems (e.g. seppuku in Japan; ordered executions in courts). Handled under content settings; no method detail.
- **Natural disaster:** earthquake, flood, storm, volcanic.
- **Old age.**
- **Exile and exposure** (death en route).

### 20.2 End-of-life summary (what the player receives)

1. **Life summary:** birth, key years, residences, occupations, major turning points.
2. **Major achievements:** works (buildings, paintings, books), titles, offices, victories.
3. **Family:** spouses, children (with outcomes), heirs, adoptions, dependants.
4. **Wealth and status:** Means tier at death; Standing; property passed on; debts; will contents.
5. **Important relationships:** patrons, friends, rivals, mentors.
6. **Historical involvement:** events witnessed or touched, with tier (witness/participant/pivotal).
7. **Historical changes caused:** divergences with levels and consequences.
8. **Timeline divergence view:** baseline vs. branch comparison (what changed).
9. **Final legacy:** a written epitaph in a culturally appropriate format — parish burial register entry and will (England), notarial testament (Italy), tombstone inscription (Ottoman/Islamic), genealogical record (China), family and temple record (Japan), merchant ledger notes (India).

### 20.3 Legacy components \[DESIGN\]

Legacy is a **profile**, not a single score: Family Continuity; Estate Transmitted; Works and Craft; Honour Record (by audience); Faith Record; Historical Involvement; Divergence Impact; Memory (who remembers you and how). \[OPEN\]: whether to support multi-generational play (continue as heir) — recommended as P2.

---

## 21. Replayability

**Why a player replays this era:**

- **Parallel worlds:** the same year offers radically different lives (e.g. 1556: Akbar's accession vs. Tudor Marian England vs. Ming Jiajing vs. Italian Wars aftermath).
- **Time slices:** each sub-era has a distinct pressure profile (plague years, war years, reformation years, silver years).
- **Class and gender:** each class table (§6) opens different careers, constraints and events.
- **Religion and conscience:** conformity, conversion, concealment and persecution produce different life arcs.
- **Careers:** workshop, church, court, army, sea, trade and administration each have their own progression and failure modes.
- **Historical access:** witnessing vs. participating vs. pivotal roles.
- **Divergence:** different players can discover different alternate outcomes; curated branches reward repeat play.
- **Codex and discovery:** unlocking entries for places, people, events, careers, objects and customs encountered across lives.
- **Challenge seeds:** shareable birth presets (e.g. 'born in Venice on the day the Arsenal burned').

**Replay matrix (representative axes):** Region (15) × SubEra (6) × Class tier (4–9 by Region) × Gender × Religion × Career track (10–20 by Region) × Event involvement tier (3) × Divergence ambition (low/high).

---

## 22. Gameplay Examples

Each example follows: **Setup → Context → Situation → Event → Choices → Player choice → Immediate → Long-term → Historical.**

### Example 1 — Florence, 1478 (artisan class, Italy, SubEra 6.1)

- **Setup:** Born 1462 to a wool-carding household in San Frediano; Means W2; apprenticed at 12 to a master dyer.
- **Context:** Medici dominant; Pazzi rivalry; Lent and Easter season; guild politics.
- **Situation:** Easter Sunday 1478; you are 16, running errands near the Duomo.
- **Event:** Pazzi Conspiracy (26 April 1478). Chaos in the cathedral; crowds hunt conspirators; neighbours denounce one another.
- **Choices:** (a) join the mob chasing Pazzi partisans; (b) shelter a Pazzi-affiliated neighbour; (c) stay in the workshop; (d) report a neighbour for profit.
- **Player choice:** (b) shelter the neighbour.
- **Immediate:** Suspicion +; Honour (Community) − among Medici loyalists but + with the neighbour's family; risk of search.
- **Long-term:** A Pazzi-linked silk merchant later offers a trade favour (opening a Patronage path), but you appear on a Medici watch list; later, in 1494, the same networks matter when the Medici fall.
- **Historical:** No change to the event (Local; `BRANCHABLE` only at very low probability). Your life diverges at D0–D1.

### Example 2 — Ottoman Balkans, 1515–1526 (peasant class, SubEra 6.2)

- **Setup:** Born 1503 to a Christian peasant family near Sarajevo; Means W2; *reaya* status.
- **Context:** Ottoman consolidation under Selim I and Suleiman.
- **Situation:** 1515 devshirme officials visit; you are 12 and healthy.
- **Event:** Devshirme levy.
- **Choices:** (a) present as selected; (b) hide; (c) family bribes; (d) flee.
- **Player choice:** (a) selected.
- **Immediate:** Separation from family; conversion and training; Learning + (Turkish literacy); Honour (Family) −.
- **Long-term:** Rise through Janissary ranks; at 23 you march to Mohács (1526); a promotion path opens; visiting your village later changes family fortunes (Means, Patronage).
- **Historical:** Mohács is `SOFT`: you may survive, be wounded, or earn notice. D0–D1.

### Example 3 — Ming Jiangnan, 1576 (gentry-adjacent, SubEra 6.4)

- **Setup:** Born 1560 near Suzhou to a landholding family with one *shengyuan* uncle; Means W3.
- **Context:** Zhang Juzheng's reforms; silver tax conversion; commercial boom.
- **Situation:** You are 16 and preparing for the provincial exam.
- **Event:** Local tax reassessment threatens family land.
- **Choices:** (a) continue study and rely on the uncle's patronage; (b) join a merchant relative; (c) petition the magistrate; (d) bribe the clerk.
- **Player choice:** (a) with a petition via the uncle.
- **Immediate:** Honour (Local gentry) +; study costs rise; Spirit steady.
- **Long-term:** Pass *juren* in 1585; posted as a county magistrate; later cross-pressured by the post-1582 backlash against Zhang's policies.
- **Historical:** Zhang's reforms are `SOFT`; the player's county can implement them differently (D2).

### Example 4 — Gujarat, 1630 (merchant class, SubEra 6.6)

- **Setup:** Born 1595 in Surat to a Bania grain-and-cloth merchant; Means W4.
- **Context:** Mughal rule; Dutch and English factories; monsoon failure.
- **Situation:** Harvest failures push grain prices upward.
- **Event:** Gujarat–Deccan famine (1630–32).
- **Choices:** (a) hoard grain for profit; (b) distribute to caste and neighbours; (c) export surplus to the coast; (d) petition the governor for relief.
- **Player choice:** (b) with partial hoarding.
- **Immediate:** Honour (Community) +; Means −; Household stability.
- **Long-term:** Famine deaths in the region; your reputation yields credit lines later; a disease outbreak follows.
- **Historical:** Famine is `SOFT`; local relief can reduce local mortality (D2).

### Example 5 — Mikawa Province, Japan, 1560 (samurai class, SubEra 6.3–6.4)

- **Setup:** Born 1541 to a minor retainer family under the Imagawa; Means W3.
- **Context:** Sengoku warfare; Matsudaira Motoyasu (the future Tokugawa Ieyasu) is held in Imagawa's sphere.
- **Situation:** You serve with the Imagawa army near the Owari border.
- **Event:** Okehazama (19 June 1560): Oda Nobunaga's surprise attack kills Imagawa Yoshimoto.
- **Choices:** (a) stay with the Imagawa remnants; (b) retreat with Matsudaira forces; (c) seek service with Oda; (d) desert.
- **Player choice:** (b).
- **Immediate:** Survival; shift of allegiance to the Matsudaira household.
- **Long-term:** Ties with the Matsudaira/Tokugawa household; career advancement later; Nagashino (1575) service; Sekigahara (1600) at age 59 depending on Health.
- **Historical:** Okehazama is `FIXED`; player's role does not change the outcome. D1 (family trajectory).

### Example 6 — Florence, 1529–30 (patrician class; divergence attempt)

- **Setup:** Born 1495 into an *ottimati* family; Means W5; Learning high; Authority medium (member of a council).
- **Context:** Second Republic of Florence (1527–30); imperial–papal army approaches.
- **Situation:** You are 34 and hold command of a militia district.
- **Event:** Siege of Florence (Oct 1529 – Aug 1530).
- **Choices:** (a) hold the line with the militia; (b) negotiate terms with the besiegers; (c) support sorties; (d) quietly prepare a Medici-friendly faction.
- **Player choice:** (c) support sorties, with Patronage to the military commander.
- **Immediate:** Honour (Military) +; casualties; supply strain.
- **Long-term:** The siege still ends in August 1530 (`SOFT`); you face exile, fine or imprisonment under the restored Medici regime depending on your D2 success; your wealth is partially confiscated.
- **Historical:** The republic's survival (D4) is a `BRANCHABLE` DP requiring pivotal roles (commanders, magistrates) and prior successes in supply, defence and diplomacy.

---

## 23. Data Model Requirements

Design-level only; no production code. All content is **data-driven** (JSON/DB); rules reference IDs, not hard-coded names. Every record carries: `id`, `name` (with `name_local` variants), `description`, `tags[]`, `sources[]` (scholarly references, to be filled by researchers), `confidence` (FACT/EST/DISPUTED/DESIGN), `valid_from`, `valid_to`.

| Structure | What it must contain |
| --- | --- |
| **Era** | id; name; birth window; supported SubEras; Region list; default calendars; global parameters (disease baseline, price drift, climate series); handoff rules to adjacent eras |
| **SubEra** | id; start/end (soft boundary window); global modifiers (war intensity, print diffusion, silver flow, climate index, epidemic weights); active Background events |
| **Region** | id; name; priority; Locale list; default polity timeline; population estimate series; languages; climate/harvest model; disease profile; travel graph edges; news-delay table |
| **Location (Locale)** | id; Region; type (city, town, village cluster, court, port, ship, castle town); coordinates; population series \[EST\]; institutions present; class mix by date; price table; sanitation score; disease pressure; guild/religious community data; controlling PoliticalEntity timeline |
| **PoliticalEntity** | id; type; ruler timeline; capital; territory by date (Locale mapping); laws and law-type; taxes; religious establishment; military organisation; relations (alliances, rivalries) by date |
| **Faction** | id; scope (Locale/Region/Polity); members and leaders (Figures); goals; resources; relations; start/end dates; flags it sets |
| **Dynasty/Family** | id; seat; members; marriages; wealth; patronage reach |
| **SocialClass** | id; Region/polity validity; lifestyle text; Means band; rights and restrictions; education tiers; occupational access; marriage rules; political/military access; mobility rules; risk and opportunity tags; baseline share by settlement type and date |
| **Occupation (Track)** | id; entry requirements (class, gender rules, religion, Learning, Skill); ranks; income by rank (SU multiples); risks; stat gates; exits; Life Card decks; time-to-rank distributions |
| **HistoricalEvent** | id; tier; anchor class; dates; Locales/Regions; cause; outcome; people; affected groups; reach and news-delay; Divergence Points; related events; Life Card hooks; curated alternates; sources and confidence |
| **DivergencePoint** | id; event; level range; window; prerequisite flags; pivotal roles; Leverage weights; resistance; outcomes with branch deltas; convergence targets; propagation rules |
| **HistoricalFigure** | id; dates; locations by date; roles; Faction; access tiers; fixed facts; mutable facts; interaction decks; dependence on divergence flags |
| **Technology** | id; domain; availability windows by Region; effects (travel speed, medical options, weapon roles, production capacities); prerequisites |
| **Religion** | id; branches; legal status by (polity, date); institutions; practices; festivals; taboos; persecution risk curves; conversion rules; clergy tracks |
| **Culture** | id; languages; naming conventions; honour code vocabulary; festivals; clothing/sumptuary rules; marriage customs; text style variants for events |
| **RandomEvent** | id; category; conditions; base weight; modifiers; cooldown; chain rules; choices; outcomes; text variants by culture and class |
| **LifeCard** | id; type (random, historical, career, family, crisis); prompt; options; display rules; stat/hidden flags touched |
| **Choice** | id; option labels; requirements (stat, class, gender, religion, items); costs; risk model; linked Consequences; UI hint level |
| **Consequence** | id; layer (immediate, delayed, hidden, personal, family, social, historical); target (character, household, Locale, Faction, WorldState); delta; timer; conditions; visibility |
| **Disease** | id; transmission; seasonality; mortality by age/class; Locale pressure rules; treatment options; chronic outcomes |
| **TradeNetwork** | id; nodes; goods; travel times; risks; controlling polities; disease transmission weight |
| **PriceTable** | Locale; year; item index; HQI link; wage index |
| **Institution** | id; type (guild, parish, monastery, court, university, etc.); membership rules; services; costs; obligations |
| **WorldState** | current date; active Timeline; Locale states (controller, prices, epidemic state, mood); Faction states; flags; event log; RNG seeds; Divergence ledger |
| **CharacterState** | identity; demographic fields; class; stats; skills; assets ledger; household members; relations graph (patrons, kin, rivals); Suspicion; beliefs; career history; locations history; flags; Life Card log |
| **Timeline** | id; parent; fork date; delta list vs. baseline (events, entity states, flags); curated/uncurated marker; authorship |
| **Relation** | typed edge between entities (kin, patron-client, ally, rival, employer, subject-of, member-of); weight; dates |

---

## 24. Agent Implementation Notes

### 24.1 MUST BE HISTORICALLY FIXED (unless a valid divergence at the correct level occurs)

- Dates, locations and principal outcomes of `FIXED` events (e.g. Fall of Constantinople, Granada, Panipat, Chaldiran, Peace of Westphalia).
- Rulers and reign dates (e.g. Lorenzo's death 8 April 1492; Suleiman 1520–66; Wanli 1572–1620).
- Calendar systems and their adoption dates; feast and fasting calendars.
- Currency names and basic denominations; units used in specific regions.
- Technology availability windows (no matchlock in Japan before 1543; no telescopes before 1608–09; no flintlock before c. 1610s; no widespread printing in Mughal court).
- Religious legal frameworks by date (Henrician schism from 1534; Safavid Shi'ism from 1501; Augsburg 1555; Edict of Nantes 1598; Tokugawa Christian bans from 1612–14 and later).
- Biographical facts of historical figures unless the player has a divergence that touches them.
- Social class legal rules (e.g. Hideyoshi's separation after 1588–91).

### 24.2 CAN BE RANDOMIZED

- Player birth class, family, siblings, health seed, temperament, parent occupations within class tables.
- Local random events (fires, thefts, feuds, minor illnesses), weather and harvest variance within the climate envelope.
- Which specific neighbours and NPCs populate a Locale (names from region/date-appropriate lists).
- Minor details of plague outbreak timing in a Locale (within bounds).
- Individual outcomes of battles for a character (survival, wounds).
- Marriage candidates, patron offers, apprenticeship placements.

### 24.3 CAN BE PLAYER-CHANGED

- The character's own path: career, marriage, religion (where permitted), migration, wealth, reputation.
- Local consequences (a town, a guild, a village) through D2.
- Regional or higher outcomes only through prerequisites in §19 (D3+).
- The Divergence Ledger and the final timeline view.

### 24.4 REQUIRES FUTURE SYSTEM

- Full multi-generational play (heirs, dynasty continuation).
- NPC-to-NPC simulation depth (fully autonomous factions and rulers).
- Large-scale economic simulation (market clearing, price formation).
- Full alternate-timeline simulation beyond curated branches (D5–D6).
- Complete Americas content with indigenous perspective consultation.
- Handoff to Era 5 (before 1450) and Era 7 (after 1650).
- Multi-language localisation including culturally accurate honorifics and idioms.
- Moderation/content-warning settings for slavery, massacre, persecution and sexual violence themes.
- Tooling: curated alternate-event authoring pipeline; scholarly review workflow.

### 24.5 Rules for coding agents

1. **Never invent historical facts.** If data is missing, create a record with `confidence: OPEN` and stub text; do not fill with guesses.
2. **Data over code.** Put numbers, dates, names, probabilities in data files with a source tag; keep rules in engine code.
3. **Anachronism guard:** implement validation tests that reject any content referencing a Technology, Institution, Religion, term or item before its availability date or outside its Region.
4. **Separate fact from mechanic:** mechanic parameters (Impact thresholds, Means tiers, hazard rates) must be marked DESIGN and kept tunable.
5. **Time and location always required:** every event, class table and Life Card has date and location filters; no unfiltered global content.
6. **Respect anchor classes:** the engine must refuse writes that change `FIXED` event outcomes without a valid divergence record.
7. **Determinism and seeds:** support seeded runs for testing and shareable Challenge Seeds.
8. **Content ratings:** tag sensitive content (violence, slavery, persecution, sexual violence, death of children) for later filtering.
9. **Testing:** include (a) snapshot tests per (date, location, class) for World Resolution; (b) statistical tests that survival-to-15 and age-at-death distributions fall in configured ranges; (c) event eligibility tests for anachronisms; (d) divergence propagation tests.

---

## 25. MVP Recommendation

### 25.1 Recommended vertical slice

**Slice: Italian city-states, 1485–1530 (Florence-centred, with Rome and Venice and the Tuscan countryside).**

**Why this slice:** (1) Dense documentary history and well-known events; (2) a small geographic footprint (travel graph with four nodes); (3) strong class contrasts in a compact setting (patrician, guildsman, sharecropper, cleric); (4) rich BRANCHABLE events at different scales (Savonarola, Medici return, Sack of Rome, Siege of Florence); (5) showcases the Date + Location + Class equation; (6) avoids the research and sensitivity risks of broader global content in v1.

**Alternative slices (for comparison):** Tudor England 1530–1560 (a clean religious-choice slice with a single legal system); Sengoku Mikawa/Owari 1550–1600 (strong military mobility); Mughal Agra 1556–1605 (court and mansab systems). Pick one only; keep the data model general.

### 25.2 Minimum content set

| Dimension | MVP minimum |
| --- | --- |
| **Time window** | Birth window 1485–1510; lives run to death (mostly before c. 1570). **Late-life deck:** generic 1530–1570 content (Medici duchy 1532/1537, plagues, wars, price drift) so characters can age without new event scripting |
| **Map** | 4 Locales: `loc_florence`, `loc_tuscan_contado` (village cluster), `loc_rome`, `loc_venice`; plus travel edges and a `reg_sea` stub for Venice–Rome coastal voyages; Siena/Pisa/Bologna as travel stops only |
| **Social classes** | 6: Patrician/ottimati; Merchant-professional; Master artisan (with journeyman/apprentice ranks); Sharecropper (*mezzadro*); Urban labourer/servant; plus a **Clergy track** (entered through career, not birth class) |
| **Careers** | 10: wool/silk artisan; merchant factor; notary; painter's workshop apprentice; friar/priest; mercenary soldier; sharecropper; domestic servant; apothecary/physician; printer (Venice) |
| **Historical events (full records)** | 7: French invasion and Medici expulsion (1494); Savonarola rise and fall (1494–98); Battle of Agnadello and the League of Cambrai crisis (1509); Medici return after the Sack of Prato (1512); Sack of Rome (1527); Siege of Florence (1529–30); plus Luther's theses (1517) as Background |
| **Random events** | \~60 Life Cards across 10 categories (family, economic, weather, disease, accident, social, opportunity, travel, crime, religious) with culturally flavoured variants |
| **Stats** | 10: Health, Wits, Learning, Skill (5 skills), Means, Standing, Honour (3 audiences), Patronage, Devotion plus hidden Suspicion, Household |
| **Historical figures** | 8–10: Savonarola, Piero de' Medici, Alexander VI, Julius II, Leo X, Clement VII, Machiavelli, Michelangelo, Leonardo (optional), Cesare Borgia (optional) |
| **Choice system** | Life Cards with 2–4 options; consequence layers implemented: immediate, delayed (timers), hidden (flags), social (Honour/Patronage); personal and family as simple stat/household changes; historical as flags |
| **Divergence** | D0–D2 implemented; D3 stub for the Siege of Florence (limited alternate outcomes); D4+ disabled |
| **Systems** | World Resolution pipeline; Auto Create and Custom Life (limited to slice); household ledger; plague epidemic state machine; healer choices; marriage market (basic); end-of-life summary; codex of encountered terms |

### 25.3 Acceptance criteria \[DESIGN\]

- A player can be born anywhere in the slice on any date within the window, and live a complete life to death.
- Distribution checks: survival to 15 within configured range; plague years produce visible spikes in affected cities.
- At least one historical event is experienced as witness, participant or local actor in the majority of lives (aim: >70% of lives touch ≥1 major event).
- No anachronism test failures; all events carry date and location filters.
- End-of-life summary shows timeline view (baseline vs. branch) where divergence occurred.
- Content volume: ≥ 150 unique Life Card variants (including class/gender/culture variants) to avoid obvious repetition in a single life.

---

## 26. Content Priority

| Priority | Items |
| --- | --- |
| **P0 — Required for MVP** | The Italian slice (§25); World Resolution pipeline; Locale/class/occupation data model; Life Card engine; Means and household ledger; 10 core stats; plague and baseline hazard model; 7 events; \~60 random events; 8–10 figures; D0–D2 divergence; end-of-life summary; anachronism and anchor guards; Auto Create and Custom Life within the slice; seeded RNG |
| **P1 — Important** | Tudor England (1509–1603) as the second Region; Ottoman (Istanbul, Balkans) 1450–1566; Mughal (Agra/Delhi) 1526–1605; Ming Jiangnan 1522–1620; Japan (Mikawa, Owari, Kyoto) 1534–1603; `reg_sea` voyages; war Life Card system; marriage market depth; faith/Suspicion systems (heresy, conformity); curated alternates for BRANCHABLE events; 30+ events; 40+ figures; D3 divergence; price tables with HQI; guild and parish institutions; legal/crime system; patron network graph |
| **P2 — Expansion** | Safavid Persia; France and the Low Countries; Holy Roman Empire; Poland-Lithuania/Muscovy/Hungary; Iberia in depth; colonial Atlantic (Americas, Goa, Macau, Manila) with consultation; witch-trial system; exploration careers; multi-generational play; D4 divergence; ventures system and company shares; deeper medicine system; expanded religion (Sufi, Bhakti, Sikh) content |
| **P3 — Future** | Sub-Saharan Africa and Swahili coast; pre-Columbian Americas; D5–D6 alternate timelines and branch sharing; fully autonomous NPC factions; advanced economy simulation; multiplayer or shared-world features; specialised mini-games (battle tactics, voyage navigation) |

---

## 27. Final Section — Era Design Summary

### Era Identity

A two-century world in which **printing, gunpowder, oceans and silver** knit together previously separate societies while religious and dynastic conflict tears many of them apart. What makes it unique for LegacyLife is **simultaneity and contrast**: the same year hosts guilds in Florence, devshirme levies in the Balkans, examination halls in Jiangnan, mansabdars at Akbar's court and samurai retainers in Sengoku Japan.

### Player Fantasy

To live a *plausible* life inside a living world: to feel constrained by class, faith and geography, make meaningful trade-offs between loyalty and survival, witness history from below or beside, and sometimes — rarely, and only with position and luck — bend a small part of it.

### Core Gameplay

Year-by-year Life Cards with period-shaped choices (apprenticeship, marriage, faith, loyalty, risk), a household ledger instead of modern money, health and plague mechanics, career tracks, patronage, and occasional high-stakes historical moments where position and preparation determine whether the player is bystander, participant or pivotal.

### Major Systems

1. World Resolution pipeline (Date + Location + Social Context).
2. Class, Occupation and Gender affordance rules.
3. Means (SU-based) and household ledger.
4. Stats with hidden Suspicion and audience-specific Honour.
5. Disease, famine and baseline mortality model.
6. Life Card engine (random, historical, career, crisis).
7. Historical events and Divergence Points with Convergence Pressure.
8. Patronage and political arenas ladder.
9. War experience system (individual-scale).
10. End-of-life summary with timeline comparison.

### Historical Hook

The era is the **hinge** between regional worlds and a connected global one, and it is full of genuinely contingent moments (Savonarola's ordeal, Medici returns, the Sack of Rome, Sekigahara, the Armada). The player can feel history 'turn' without being given a magic wand, because the divergence system demands position, timing and preparation.

### MVP

Build the **Italian city-states 1485–1530 vertical slice** (Florence, Tuscan contado, Rome, Venice), 6 classes, 10 careers, 7 historical events, \~60 random events, 10 stats, 8–10 figures, D0–D2 divergence, and the end-of-life summary. Keep the data model general so Tudor England, Ottoman, Mughal, Ming and Japan slices can follow as P1.

### Open Questions \[OPEN\]

**Product decisions**

1. Birth window boundaries and handoff to Era 5 (before 1450) and Era 7 (after 1650); fallback for lives that extend past 1650.
2. Auto Create weighting: population-weighted vs. playability-weighted vs. player-chosen emphasis.
3. Representation of gender identity and non-binary lives in historically grounded settings; options for player customisation.
4. Content-warning and moderation settings for slavery, massacre, persecution, sexual violence and child mortality.
5. Multi-generational play and lineage carry-over.
6. Whether to expose numbers (stats, probabilities) or use descriptive bands only; accessibility requirements.
7. Handling of religion as a player choice (conformity, conversion, concealment) without trivialising persecution.

**Research tasks**

- (8) Region-specific class distributions and wage/price series (replace \[EST\] placeholders with sourced data).
- (9) Era-appropriate naming lists, honorifics and idioms per Region (expert review).
- (10) Detailed Ottoman, Mughal, Ming and Japanese institutional rules for careers (devshirme dynamics, mansab ranks, examination quotas, status edicts by date).
- (11) Curated alternates for BRANCHABLE events (require historian input to avoid implausible fantasy).
- (12) Indigenous and enslaved perspectives for colonial and Atlantic content; consultation process.
- (13) Calendar handling: conversion rules and UI for Julian/Gregorian/Hijri/Ilahi/lunisolar systems.
- (14) Disease data (plague outbreaks by city and year; regional famine series) and calibration of mortality parameters.
- (15) Licensing and attribution for any images, texts or datasets used in content.

**Design validation**

- (16) Playtest thresholds for divergence (how often should a player reach D3+; how to keep it feeling earned).
- (17) Balance of historical constraint vs. player agency across classes (avoid 'only elites matter').
- (18) Quality-control process for AI-assisted content generation (scholarly review, anachronism tests).

*End of document. Status: v0.1 — authoritative starting draft. All \[EST\], \[DISPUTED\] and \[OPEN\] items require expert review before production content is written.*

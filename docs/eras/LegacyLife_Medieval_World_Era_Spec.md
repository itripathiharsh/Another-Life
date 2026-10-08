# LegacyLife — Era Specification: MEDIEVAL WORLD (c. 500–1500 CE)

**Document type:** Game-development specification (not a historical essay)
**Intended audience:** AI coding agents and designers implementing the Medieval World era
**Status:** Authoritative starting-point design document
**Companion rule:** Anything marked **[FACT]** is a historically defensible claim (with uncertainty flagged). Anything marked **[MECHANIC]** is a proposed game system, not history.

---

# 1. ERA OVERVIEW

## 1.1 Definition

- **Name:** Medieval World
- **Date range:** c. 500 CE – c. 1500 CE
- **Geographic range:** Europe (West, North, Central, East, Mediterranean), the Islamic world (Middle East, North Africa, Iberia, Central Asia), the Indian subcontinent, China, Japan, sub-Saharan Africa (West African savanna and Sahel, Ethiopia, East African coast, the Zimbabwe plateau), Southeast Asia (mainland and maritime).
- **Major civilizations/societies:** Latin Christendom (Frankish/Carolingian successor kingdoms, England, Iberian Christian kingdoms, Scandinavia, the Papal States, the Holy Roman Empire, medieval Rus'), Byzantium, the Islamic Caliphates and successor sultanates (Abbasid, Umayyad Córdoba, Fatimid, Seljuk, Ayyubid, Mamluk, Almoravid, Almohad), Indian kingdoms and the Delhi Sultanate, Tang and Song China, Heian and Kamakura Japan, West African kingdoms (Ghana, Mali, Songhai rising at the end), Ethiopia (Zagwe and Solomonic dynasties), Khmer Angkor, Pagan, Srivijaya, Majapahit, and the Norse/Viking world.
- **Important transitions:** collapse and transformation of the Western Roman order (early), rise of Islam (622–750) and the Islamic Golden Age, the "medieval warm period" agricultural expansion (c. 950–1250), urbanization and commercial revolution in Europe and Song China, the Mongol conquests (1206–1368), the Black Death (1347–1353+), the rise of the Ottoman state, the fall of Constantinople (1453), and — at the very end of the era — the voyages that begin the early modern age (1492).

## 1.2 Why this periodization needs care

**[FACT]** "Medieval" is a European concept (medium aevum). It maps awkwardly onto China, India, Africa, and Southeast Asia. **LegacyLife therefore treats "Medieval World" as a container era with region-specific internal clocks.** A player born in 900 CE in England and a player born in 900 CE in Heian Japan are playing in different worlds that happen to share a date. The engine must resolve:

```
BIRTH DATE + BIRTH LOCATION + SOCIAL CONTEXT → HISTORICAL WORLD
```

- The **date** selects the sub-period (temporal layer): Early / High / Late Medieval, plus region-specific phases (e.g., Tang vs. Song vs. Yuan for China).
- The **location** selects the cultural-political layer: legal system, religion, economy, available occupations.
- The **social context** (family class) selects the experience layer: what the player sees, may do, and risks.

## 1.3 Sub-periods (global skeleton — each region refines this)

| Sub-period | Dates | Global character |
|---|---|---|
| Early Medieval | c. 500–1000 | Post-Roman fragmentation; rise of Islam; Carolingian experiment; Vikings; Tang apogee and collapse; Heian Japan; Ghana; Srivijaya; Chola expansion |
| High Medieval | c. 1000–1250 | European population and town growth; crusading; Norman conquests; Song commercial revolution; Baghdad's golden age then Mongol storm; Mali rises; Angkor at height; Kamakura Japan |
| Late Medieval | c. 1250–1500 | Mongol successor states; Black Death; Hundred Years' War; Ottoman rise; Ming founding; Vijayanagara; Great Zimbabwe at height; Majapahit; Age of Exploration begins at the boundary |

## 1.4 Why this era suits LegacyLife

1. **Enormous variance by date+location+class:** peasant in post-Black Death England, court lady in Heian Kyoto, examination candidate in Kaifeng, griot's apprentice in Mali, novice monk in Cluny, sailor in Melaka — all "medieval," all radically different lives.
2. **Legible stakes:** mortality is high, mobility is constrained, and every choice (land, marriage, faith, lord) matters. This is a choice-driven life sim's ideal substrate.
3. **Pre-modern logic:** no modern concepts (universal literacy, insurance, democracy, germ theory) can be assumed; the design must be honest about how people actually understood their world.
4. **Well-documented:** rich historiography and primary sources allow historically defensible content at the granularity the game needs.

---

# 2. TEMPORAL BREAKDOWN

> **[MECHANIC]** The engine should implement each row below as a `SubEra` object keyed by (region, start, end). Transitions are event-driven, not automatic: a player alive in 1257 England does not "enter the Late Medieval" on a calendar tick; the world changes when events fire (e.g., Black Death arrival in their region).

## 2.1 Early Medieval (c. 500–1000)

**European theatre:**
- **Political situation:** successor kingdoms on Roman soil (Franks, Visigoths, Lombards, Anglo-Saxon kingdoms, later Norse polities); Byzantine Empire holds the East; Charlemagne crowned emperor 800 **[FACT]**; Treaty of Verdun 843 splits the Carolingian empire into three parts, ancestors of France/Germany/Italy **[FACT]**; Magyar raids (until c. 955), Viking raids (from 793), Saracen raids in the Mediterranean.
- **Economy:** overwhelmingly agrarian and manorial; coinage thins out in the North; long-distance trade shrinks then revives from the 9th–10th c. via the Rhine, the Channel, and the Islamic Mediterranean.
- **Technology/change:** heavy plough and horse collar diffuse through northern Europe **[FACT]**; stirrup and mounted warfare transform elite combat (the "feudal" mutation of the Carolingian world).
- **Society:** personal lordship; slavery declining in the West but present everywhere in some form; monasteries as the main cultural institutions.

**Islamic theatre:**
- Rise of Islam (622), Rashidun and Umayyad conquests (632–750); Abbasid Revolution (750); Baghdad founded 762; the **Islamic Golden Age** of science, medicine, and translation (8th–10th c.) **[FACT]**.

**East Asian theatre:**
- Tang dynasty (618–907) at its height, then the **An Lushan Rebellion (755–763)** — a demographic and fiscal catastrophe that begins the shift from aristocratic empire to more bureaucratic government **[FACT]**; Huang Chao rebellion (874–884) fatally weakens Tang; Five Dynasties interregnum 907–960; Song founded 960.
- Japan: Heian period (794–1185); Fujiwara regency; court aristocracy (kuge) culture; rise of warrior houses in the provinces.

**South Asian theatre:**
- Gurjara-Pratihara, Pala, and Rashtrakuta compete (the "tripartite struggle" over Kannauj, 8th–10th c.); Chola dynasty rises in the south (from 9th c.) **[FACT]**; Hindu temple-building and bhakti devotion expand; Buddhism still significant but retreating from the Indian heartland.

**African theatre:**
- Kingdom of Ghana (c. 300–1100) dominates the gold trade **[FACT]**; Aksum converts to Christianity (4th c.) and declines in the 10th c.; Swahili city-states emerge on the East African coast (from 8th c.) trading with the Islamic world; Great Zimbabwe founded (from c. 11th c.).

**Southeast Asian theatre:**
- Srivijaya (centered on Palembang, from 7th c.) controls maritime trade; Sailendra in Java; Pagan unifies Burma (Anawrahta, r. 1044–1077); Khmer empire building Angkor.

## 2.2 High Medieval (c. 1000–1250)

**European theatre:**
- **Political situation:** kingdoms consolidate (England after 1066 **[FACT]**; Capetian France; Ottonian/Salian/Hohenstaufen German emperors; Norman Sicily); the **Investiture Controversy (1075–1122)** recalibrates church–state power **[FACT]**; Magna Carta 1215 in England **[FACT]**; Italian and German communes gain self-government; Hanseatic network grows (Lübeck 1143, Hamburg alliance 1241) **[FACT]**.
- **Crusading:** First Crusade 1096–1099 (Jerusalem taken) **[FACT]**; Second (1147–49), Third (1189–92, Saladin vs. Richard I) **[FACT]**; **Fourth Crusade sacks Constantinople 1204** **[FACT]** — Latin Empire 1204–1261; Albigensian Crusade (1209–29) in southern France.
- **Economy/society:** European population roughly doubles (c. 1000–1250) **[FACT]**; land clearance, three-field rotation, towns and guilds, cathedrals, universities (Bologna ~1088, Paris, Oxford by 1096) **[FACT]**; feudal/monarchical states professionalize (scutage, Exchequer, Chancery).
- **Frontier:** the **Reconquista** advances — Toledo 1085, Las Navas de Tolosa 1212 (Iberia south of the Tagus in Christian hands) **[FACT]**; Baltic crusades and the eastward expansion (Ostsiedlung) of German settlement **[FACT]**.
- **Technology:** Romanesque→Gothic architecture; water-powered fulling mills; paper enters Europe via Islamic Spain and Sicily **[FACT]**; gunpowder formulas known in China (military use by Song).

**Islamic theatre:**
- Fragmentation after 945 (Buyids take Baghdad); **Seljuk Turks win Manzikert 1071** — Anatolia opens to Turkic settlement **[FACT]**; Fatimid Cairo (al-Qahira founded 969) as a wealthy counter-caliphate; **Saladin abolishes the Fatimid caliphate 1171**, Ayyubid sultanate rules Egypt and Syria **[FACT]**; Saladin retakes Jerusalem 1187 **[FACT]**; Almoravids (from 1040s) and Almohads (from 1121) rule North Africa and al-Andalus.
- 1206: Delhi Sultanate founded (Qutb al-Din Aibak) — Turkic military slave elites rule north India **[FACT]**; 1220s–1258: **Mongol storm**: Khwarezm destroyed 1219–21; Rus' principalities subjugated 1237–40; Baghdad sacked **1258**, Abbasid caliphate ends **[FACT]**; **Ain Jalut 1260** — Mamluks stop the Mongols **[FACT]**.

**East Asian theatre:**
- **Song dynasty (960–1279):** examination-based bureaucracy, paper money (jiaozi, from c. 1023 officially) **[FACT]**, iron and coal industries at unmatchable scale, gunpowder weapons, gunpowder printing of books (woodblock), civil bureaucrat ideal ("scholar-official") **but** chronic military weakness vs. steppe empires: Liao (Khitan) to 1125, then **Jurchen Jin (1115–1234)** take Kaifeng 1127 **[FACT]** — Southern Song (1127–1279) re-centers on Hangzhou, the largest and richest city on earth (over 1 million people) **[FACT]**; Neo-Confucianism synthesized (Zhu Xi, 1130–1200) **[FACT]**.
- Japan: **Genpei War 1180–1185** — Taira destroyed; **Minamoto no Yoritomo** founds the Kamakura bakufu (shogunate), appointed Seii Taishogun 1192 **[FACT]**; Hōjō regents rule after 1203; **Jōkyū War 1221** crushes the imperial court's attempted restoration **[FACT]**; land steward (jitō) and protector (shugo) networks embed warriors nationwide.

**South Asian theatre:**
- Chola peak (Rajaraja I, r. 985–1014; raid on Srivijaya 1025) **[FACT]**; Chalukya–Hoysala–Kakatiya–Pandya in the Deccan/south; Rajput kingdoms in the north; bhakti and temple economies flourish; 1192 Second Battle of Tarain — Muhammad of Ghor defeats the Rajput confederation, opening the plain to Turkic rule **[FACT]**.

**African theatre:**
- Ghana declines (Almoravid pressure, shift of trade routes); **Mali Empire founded c. 1235 (Sundiata Keita)** **[FACT]**; Great Zimbabwe grows (stone enclosures by 13th c.); Zagwe dynasty in Ethiopia builds the Lalibela rock churches (early 13th c.) **[FACT]**; Swahili coast flourishes (Kilwa, Mogadishu, Mombasa, Sofala trade links to Great Zimbabwe's gold).

**Southeast Asian theatre:**
- Angkor at height (Angkor Wat under Suryavarman II, early 12th c.; Jayavarman VII's Bayon empire, late 12th c.) **[FACT]**; Pagan builds thousands of temples (sacked by Mongols 1287 — just past this sub-period's edge); Srivijaya weakened by Chola raid 1025 and rise of Malay straits rivals; 1293 Majapahit founded in Java (at the boundary).

## 2.3 Late Medieval (c. 1250–1500)

**Global shocks:** Mongol successor khanates; **Black Death 1347–1353** (kills roughly a third to half of Europe, the Islamic world, and China in waves) **[FACT]**; Little Ice Age onset c. 1300; **Great Famine 1315–1317** in Northern Europe **[FACT]**; repeated plague recurrences every generation.

**European theatre:**
- **Hundred Years' War 1337–1453** (Crécy 1346, Agincourt 1415, Joan of Arc 1429–31) **[FACT]**; peasant revolts (Jacquerie 1358 in France, English Rising 1381) **[FACT]**; **Western Schism 1378–1417** (two, then three popes) **[FACT]**; Hussite Wars 1419–1436 in Bohemia **[FACT]**; conciliar movement; Ottoman advance: Kosovo 1389, Nicopolis 1396, Varna 1444; Constantinople falls **1453** **[FACT]**; Muscovy rises as tribute-collector for the Golden Horde; Moscow principality "Third Rome" ideology late; Iberia: Granada falls **1492** **[FACT]**; state formation deepens (standing taxation, representative assemblies — parliaments, estates, cortes).
- Economy: post-plague labor scarcity raises real wages in Western Europe **[FACT]**; serfdom withers in the West but intensifies in the East (second serfdom); banking families (Medici from 1397) **[FACT]**; Portuguese exploration begins (Ceuta 1415; African coast 1430s–).

**Islamic theatre:**
- Mamluk Egypt/Syria prospers (Cairo a mega-city); Ilkhanate converts to Islam (Ghazan, 1295) and fragments; **Timur (Tamerlane) 1370–1405** devastates Persia, India (Delhi 1398), and Anatolia (Ankara 1402) but founds no durable system **[FACT]**; Ottomans consolidate the Balkans and Anatolia; al-Andalus reduced to Granada until 1492.

**East Asian theatre:**
- **Yuan dynasty 1271–1368** (Kublai Khan): China under Mongol rule; Southern Song falls 1279 **[FACT]**; Mongol invasion attempts on Japan 1274 and 1281 destroyed by storms (kamikaze) **[FACT]**; social hierarchy formalized (Mongols, "various sorts" — Semu, Han, Nan); paper money inflation; Red Turban rebellions; **Ming founded 1368 (Zhu Yuanzhang)** — within the era boundary; Zheng He's voyages (1405–1433) are beyond it (early modern).

**South Asian theatre:**
- Delhi Sultanate under Khalji and Tughlaq reaches its greatest extent (penetrates the Deccan); Ibn Battuta serves at Delhi (1330s) **[FACT]**; sultanate fragments after Muhammad bin Tughlaq's failures (drought, famine, currency experiments) **[FACT]**; **Vijayanagara founded 1336** in the south (Hindu response) **[FACT]**; Bahmani sultanate in the Deccan (1347); regional kingdoms (Bengal, Gujarat, Malwa, Mewar — Rana Kumbha builds Kumbhalgarh); regional literatures in vernaculars rise.

**African theatre:**
- Mali at height under **Mansa Musa (r. c. 1312–1337)**, whose 1324–25 hajj to Mecca famously depressed the price of gold in Cairo **[FACT]**; Timbuktu a great learning center (Sankore mosque-university); Great Zimbabwe at peak (Great Enclosure, 14th–15th c.), trading gold through Sofala; Ethiopia under Solomonid dynasty (from 1270), highland kingdom; Songhai rises at Gao (Sunni Ali conquers Timbuktu 1468).

**Southeast Asian theatre:**
- Majapahit zenith (Hayam Wuruk, r. 1350–1389, and prime minister Gajah Mada) — "Nusantara" hegemony over the archipelago **[FACT]**; Ayutthaya founded 1351, destroys Angkor's power 1431; Malacca founded c. 1400 and rises as the straits entrepôt (parameswara) **[FACT]**; Le dynasty in Vietnam (1428); Theravada Buddhism spreads in mainland SE Asia; Islam gains footholds in coastal trading ports (Aceh, Malacca, Java's north coast).

## 2.4 Period-boundary rules **[MECHANIC]**

1. A player is assigned to exactly one region-specific sub-period chain at birth.
2. Sub-period transitions fire through **world events** (see §15), not calendar dates alone. Example: a Russian peasant born 1230 experiences the Mongol invasion as a lived event; the "Late Medieval" label never appears in-game.
3. Where two adjacent sub-periods overlap (e.g., Yuan 1271 vs. Southern Song's fall 1279), the engine resolves by the controlling `PoliticalEntity` of the birth location on the birth date.

---

# 3. GEOGRAPHIC BREAKDOWN (Playable Regions)

> **[MECHANIC]** Each region below is a `Region` containing `Location`s. Data per location: political entity, settlements, social structure, economy, culture, religion, languages, military, occupations, risks, events. Below: region-level summaries; agents should treat these as the minimum fields to implement.

## 3.1 England & Wales
- **Political entity:** Kingdom of England (unified from 927; conquered by Normandy 1066 **[FACT]**; Angevin empire 1154–1204; Magna Carta 1215).
- **Major settlements:** London (c. 40–80k in 1300), Winchester, York, Norwich, Canterbury (pilgrimage).
- **Population/society:** free peasantry significant (English distinctiveness vs. continental serfdom), villeinage (unfree tenants owing week-work) common **[FACT]**; shire/county courts; manorial courts; Jews (until expulsion 1290) **[FACT]**; Welsh March lordships.
- **Economy:** wool = export king (to Flanders/Italy); sheep on demesnes; grain; fairs (Stourbridge near Cambridge); tin in Cornwall; silver at Bere, Devon.
- **Religion/language:** Latin Christianity; Old English → Middle English; French elite language post-1066 (until 14th c.); Welsh/Cornish in the west.
- **Military:** fyrd (levy) early; feudal quotas; Welsh Wars; Scottish wars; Hundred Years' War drafts, archers (longbow) — the famous tactical arm **[FACT]**.
- **Occupations:** peasant holdings, shepherd, wool merchant (London/Winchester), fisherman (Grimsby), miner, weaver (rural putting-out later), monk (great monasteries: Westminster, Glastonbury).
- **Risks:** famine 1315–17 (severe in England), plague 1348–49, murrain (livestock disease), coastal raids (Vikings early), war (raiding during Barons' Wars, Scottish border warfare).
- **Events:** Hastings 1066, Anarchy 1135–54, Becket murder 1170, Magna Carta 1215, Barons' Wars, Scottish wars (Bannockburn 1314 — defeat for England), plague, Wat Tyler's revolt 1381, Agincourt-era levies.

## 3.2 Northern France (Île-de-France, Normandy, Flanders adjacency)
- **Entity:** Capetian royal domain (small at first, expands), Normandy (ducal), Flanders (rich county, technically vassal of France and emperor — classic conflict trigger) **[FACT]**; Angevin lands to 1204.
- **Settlements:** Paris (c. 200k by 1300, university from c. 1200), Rouen, Tours, Orléans, Bruges (then Ghent) in Flanders.
- **Society:** more strictly feudal-serfdom gradient north→east (serfdom heavier in eastern France/Franche-Comté); strong towns with communes (Laon massacre 1112 **[FACT]** — commune as political force).
- **Economy:** wine ( Île-de-France to Paris), grain Beauce, wool cloth in Flanders (Ghent, Bruges — drapery industry) **[FACT]**; Champagne fairs (12th–13th c., decline with sea route) **[FACT]**; royal domain revenue the king's power base.
- **Religion/language:** Catholic; langue d'oïl (north), langue d'oc (south — Albigensian crusade zone).
- **Military:** feudal host; Flemish urban militias (weavers/archers) defeat French knights at Courtrai 1302 (infantry revolution marker) **[FACT]**; Hundred Years' War battlefields (Crécy, Poitiers 1356, Agincourt).
- **Occupations:** vine-grower, cloth-fuller (notoriously unhealthy), miller (high-status villager, literacy-adjacent), university student/clerk, cathedral builder, pilgrim (Compostela routes through France).
- **Risks:** royal–baron war, Jacquerie 1358, English chevauchées (mounted raiding), famine, plague.

## 3.3 Germany & the Baltic (Holy Roman Empire; Saxony, Franconia, Bavaria, Rhineland; later Prussia/Pomerania frontier)
- **Entity:** East Frankish kingdom → Ottonian empire (962 imperial coronation) → Salian → Hohenstaufen (interregnum 1254–73, "little kings" era) **[FACT]**; princes (dukes, bishops, counts) de facto sovereign; imperial free cities; Teutonic Order state in Prussia (from 1226) **[FACT]**; Hanseatic League (Lübeck anchor) **[FACT]**.
- **Settlements:** Cologne (largest German city, c. 40k+), Mainz, Nuremberg (Hohenstaufen), Magdeburg (eastern colonization hub), Lübeck (founded 1143 — Baltic hegemon), Danzig/Gdańsk.
- **Society/economy:** manorialism with heavy serfdom east of the Elbe; eastward colonization (Ostsiedlung) offers peasants **improved legal terms** to settle frontier (attractive lure — use as gameplay mobility lever) **[FACT]**; Rhenish silver (Freiberg 1168 starts the silver flood) **[FACT]**; Baltic grain, timber, amber, wax, furs.
- **Religion/language:** Catholic (investiture conflicts: Worms Concordat 1122) **[FACT]**; German dialects; Slavic (Polabian, Pomeranian) on the frontier; Livonian/Estonian lands.
- **Military:** imperial expeditions to Italy (a money-sink that eroded royal power); ministeriales (unfree knights — distinct German institution) **[FACT]**; crusades in Prussia/Livonia; Hussite wars (Bohemia) burn the region 1419–36 **[FACT]**.
- **Occupations:** peasant colonist, miner (silver), guild craftsman (Nuremberg metalwork), Hanseatic merchant's clerk, Teutonic knight-brother, castle servant (ministerial).
- **Risks:** interregnum lawlessness (robber barons), Hussite raids (c. 1420s), plague 1349.

## 3.4 Iberia (Christian kingdoms + al-Andalus)
- **Entity:** Christian north: León-Castile, Aragon-Catalonia, Navarre, Portugal (from 1139/1143) **[FACT]**; Muslim south: Córdoba caliphate (929–1031) → taifa kingdoms → Almoravid (from 1086) → Almohad (from 1147) → Nasrid Granada (1238–1492) **[FACT]**.
- **Settlements:** Córdoba (c. 1000: perhaps the largest city in Europe, c. 250–500k — uncertainty flagged **[FACT]**), Toledo (taken 1085), Seville (taken 1248), Barcelona, Granada (Alhambra 13th–14th c.); Santiago de Compostela (pan-European pilgrimage).
- **Society:** unusually plural frontier — Mozarabs (Christians under Muslim rule), mudéjars (Muslims under Christian rule), Jews as administrators/physicians/translators (Toledo translation school) **[FACT]**; convivencia (coexistence) real but punctured by massacres (1090 Granada, 1391 pogroms) **[FACT]**.
- **Economy:** irrigation agriculture (acequias), silk, paper (Játiva), leather, transhumance sheep (Mesta founded 1273) **[FACT]**; reconquista repopulation charters (fueros) offer peasant land in exchange for military service — again a mobility lever **[FACT]**.
- **Religion/language:** Catholic; Islam (Maliki school dominant in the West); Judaism; Arabic, Romance (Castilian/Aragonese/Catalan), Hebrew; Mozarabic.
- **Military:** frontier warfare — castle networks, caballeros villanos (non-noble knights), military orders (Calatrava, Santiago) **[FACT]**; Las Navas de Tolosa 1212 **[FACT]**; final Granada war 1482–92.
- **Occupations:** frontier settler (fuero peasant), irrigator (acequiero), mudéjar craftsman, Jewish physician/trader, translator, shepherd (Mesta), sailor (Barcelona–Genoa axis).
- **Risks:** frontier raiding, expulsion/forcible conversion (pogroms 1391; forced conversions 1492/expulsion edict) **[FACT]**, plague 1348.

## 3.5 Italy (Lombardy, Tuscany, Papal States, Naples/Sicily, Venice/Genoa)
- **Entity:** patchwork: kingdom of Sicily (Norman, then Hohenstaufen, Angevin vs. Aragonese — Sicilian Vespers 1282) **[FACT]**; papal states; city-states north (Milan, Florence, Venice, Genoa, Pisa, Siena); imperial claims (Ghibelline) vs. papal (Guelph).
- **Settlements:** Venice (maritime empire: Constantinople 1204 spoils, Crete, trade to Alexandria/Acre; St Mark's basilica; Arsenal), Genoa (Black Sea trade, banking), Florence (wool then banking; c. 100k by 1300), Milan, Rome (declined; popes in Avignon 1309–77) **[FACT]**, Naples (Angevin capital, largest Italian city).
- **Society/economy:** **the most urbanized, commercialized region in Europe**; communes governed by guilds/magnates; podestà (hired professional mayors) **[FACT]**; banking (Florentine — Medici later), maritime insurance bottomry, double-entry bookkeeping late **[FACT]**; grain from Sicily, wool cloth everywhere.
- **Religion/language:** Catholic; Latin→volgare (Tuscan emerges as prestige vernacular via Dante, d. 1321 **[FACT]**); Byzantine/Greek communities in the south.
- **Military:** condottieri (professional mercenary companies) **[FACT]**; communal militias; naval wars Venice vs. Genoa (War of Chioggia 1378–81) **[FACT]**; Sicilian Vespers massacre 1282.
- **Occupations:** wool carder (Florence's proletariat), notary (the era's paperwork backbone — literacy lever), banker/factor, galley rower (free or convict — Venetian galleys use paid free rowers by this period) **[FACT]**, condottiere captain, glassworker (Murano, c. 1291 glass furnaces moved there) **[FACT]**.
- **Risks:** faction war (Guelph/Ghibelline street wars), plague 1348 (Florence loses half+), bank failures (Bardi/Peruzzi 1340s) **[FACT]**, papal interdict.

## 3.6 Scandinavia & the Viking World (Denmark, Norway, Sweden; Iceland; Norse colonies)
- **Entity:** Viking Age 793–1066: raids then settlement (Danelaw England, Normandy 911, Ireland towns, Iceland 870, Greenland 985, Vinland c. 1000) **[FACT]**; Christianization c. 960–1150; consolidated kingdoms by 12th–13th c. (Denmark dominant: Valdemar I/II — Scanian Law 1241, expansion into Estonia) **[FACT]**; Kalmar Union 1397 (Denmark-led) **[FACT]**.
- **Settlements:** Hedeby/Schleswig (emporium), Birka (Sweden, replaced by Sigtuna), Trondheim (Nidaros — pilgrimage, St Olaf), Bergen (stockfish to England/Germany), Oslo; Greenland's Eastern Settlement (flourishes to c. 1400 then vanishes — climate + trade decline **[FACT]**).
- **Society/economy:** free peasant society (thing assemblies — the closest thing to popular participation in Europe) **[FACT]**; no serfdom; chieftains (goðar in Iceland); thingvellir; outlawry as legal punishment; stockfish (dried cod) = hard currency export; walrus ivory, falcons, slaves (early); later herring (Scanian fairs), copper (Falun).
- **Religion/language:** Norse paganism (Odin/Thor, seiðr seeresses, blot sacrifices, ship burials for elites) → Christianity 10th–12th c. **[FACT]**; Old Norse; runes (limited literacy — runestones as gameplay "records"); Iceland's Commonwealth (Althing, 930) until 1262–64 subjugation **[FACT]**; Sturlung Age civil war (12th–13th c.).
- **Military:** leidang (naval levy); huscarls (household troops); longships; bowmen; later knightly adoption; Varangian Guard service in Constantinople (major career path!) **[FACT]**.
- **Occupations:** free farmer (bondi), fisher (stockfish), seafarer/merchant (knerrir cargo ships), skald (court poet — fame engine), blacksmith (bog iron), goði chieftain, Varangian guardsman, Greenland farmer/norse hunter.
- **Risks:** famine (Iceland), outlawry (saga-style feuds), Black Death 1349–50 (Norway loses ~half; accelerates decline), Hanseatic stranglehold on trade (Bergen kontor), climate deterioration (Little Ice Age), Greenland colony extinction by c. 1450 **[FACT]**.

## 3.7 Byzantine World & Eastern Europe (Constantinople, the Balkans, Rus')
- **Entity:** Byzantine Empire (Greek-speaking Roman state; themes→provincial armies; Komnenian restoration after Manzikert; 1204 sack; 1261 restoration; Palaiologan decline; 1453 fall) **[FACT]**; Rus' principalities (Kiev's heyday 10th–11th c. under Vladimir/Yaroslav; fragmentation; Mongol yoke 1240–1480; rise of Moscow) **[FACT]**; Bulgaria (First and Second Empires — Asen restoration 1185) **[FACT]**; Serbia (Dušan's empire 1346, death 1355) **[FACT]**; Hungary (Árpád then Anjou; Matthias Corvinus 1458–90, one of Europe's best armies) **[FACT]**; Poland (Jagiellon union with Lithuania 1386 — largest state in Europe) **[FACT]**.
- **Settlements:** Constantinople (c. 400–500k before 1204 — the largest Christian city; silk, purple, commerce) **[FACT]**; Thessalonica; Kiev (c. 40k at height); Novgorod (Hanseatic partner, republic governed by veche — popular assembly!) **[FACT]**; Moscow, Vladimir, Sofia, Belgrade, Buda.
- **Society/economy:** Byzantine: peasants on military lands then increasingly on pronoia (conditional grants) and estates; guilds (collegia) tightly regulated (Book of the Eparch, 10th c.) **[FACT]**; silk monopoly (smuggling silkworms out = crime) **[FACT]**; pronoia soldiers; aristocracy of birth + office (archontes). Rus': druzhina (retinue), boyars, peasant communes; Novgorod fur trade; Moscow tax-farmers for the Horde (the Muscovite rise engine) **[FACT]**.
- **Religion/language:** Eastern Orthodoxy (autocephalous national churches: Russian, Serbian, Bulgarian); Greek, Church Slavonic (written culture shared across Orthodoxy) **[FACT]**; South/East Slavic vernaculars.
- **Military:** thematic/tagmatic armies → Komnenian mercenary blends → Palaiologan reliance on Genoese/Venetian aid; Rus': druzhina, then militia; Serbian/Hungarian heavy cavalry; Polish-Lithuanian winged hussars (late); Ottoman janissaries (devşirme levy of Christian boys — a real "path" for Balkan villagers) **[FACT]**.
- **Occupations:** Byzantine silk weaver (state workshop), bureaucrat (literacy → office, the eastern service path), Rus' fur trapper, Novgorod merchant (fur to the Hanse), Orthodox monk (Hesychasm on Athos), Bulgarian turner of pottery, Serbian silver miner (Brskovo — funded Dušan) **[FACT]**, Danube boatman, Moscow tax-collector.
- **Risks:** Fourth Crusade sack 1204 (gameplay catastrophe event), Ottoman conquest, steppe raids (Pechenegs, Cumans early; Mongols), plague 1347 (arrives via Constantinople/Black Sea ports) **[FACT]**, civil wars over throne.

## 3.8 The Islamic Heartlands (Iraq/Syria/Egypt/Iran) — Abbasid, then successor states
- **Entity:** Abbasid Caliphate (Baghdad 762–1258) — caliph increasingly symbolic under Buyid (945) and Seljuk (1055) military rulers **[FACT]**; Seljuk sultanate (11th–12th c.); Fatimid Isma'ili caliphate in Egypt (969–1171, Cairo founded 969) **[FACT]**; Zengids; Ayyubids (1171–1260, Saladin) **[FACT]**; Mamluk Sultanate (1250–1517) — military slave dynasty, defeats Mongols at Ain Jalut 1260 and Crusader states gradually (Arsuf 1191 lost; Acre falls 1291) **[FACT]**; Ilkhanate (Mongol, converts to Islam 1295) then Timur 1398–1402 **[FACT]**.
- **Settlements:** Baghdad (House of Wisdom era c. 830s–1200s; c. 500k–1M at peak — uncertainty flagged **[FACT]**); Basra (port), Damascus (crafts, madrasas), Cairo/al-Qahira (c. 200k+), Alexandria (entrepôt), Aleppo, Mosul, Isfahan, Nishapur (Seljuk capital before Mongol destruction 1221) **[FACT]**; Merv (oasis metropolis, destroyed 1221) **[FACT]**.
- **Society/economy:** umma (Muslim community) vs. dhimmi protected communities (Jews, Christians, Zoroastrians) paying jizya (head tax) — legally protected but subordinate **[FACT]**; iqta' land-assignments fund the military (like pronoia/feudalism but not hereditary-by-law) **[FACT]**; waqf (pious endowments) fund mosques, schools, hospitals — the era's welfare infrastructure **[FACT]**; sugar, paper, glass, ceramics (lusterware), cotton, indigo, incense trade (Indian Ocean), slave-soldier systems (mamluks, ghulams, janissaries share a Eurasian grammar).
- **Religion/language:** Islam (Sunni: Ash'ari theology, four madhhabs; Shia: Isma'ili Fatimids, later Twelver under Ilkhans/Safavids at boundary); Arabic (science/administration), Persian (culture/bureaucracy from 9th c.), Turkish (military from 11th c.), Coptic/Aramaic/Hebrew among dhimmis **[FACT]**.
- **Military:** ghazi frontier warriors; mamluk (slave-soldier) professional armies — horse archery; Ayyubid/Mamluk cavalry elite; siegecraft strong (counterweight trebuchet) **[FACT]**.
- **Occupations:** madrasa student → ulama scholar → qadi (judge)/imam; sufi novice in a ribat/khanqah (spiritual path); copyist (books = capital); physician (hospitals — bimaristan — trained physicians, not barbers) **[FACT]**; damascene swordsmith (wootz steel); sugar refiner; camel caravan master (Hajj routes, Mecca pilgrim traffic); dhimmi merchant-banker; astronomer (astrolabe maker).
- **Risks:** Mongol destruction (1230s–1258), Timurid terror raids, sectarian mob violence occasionally, plague 1347–49 (Egypt loses perhaps a third+), Nile flood failure famine, political execution (sultanate coups — ~40 sultans in 267 years of Bahri rule **[FACT]**).

## 3.9 Al-Andalus & North Africa (Maghreb)
- **Entity:** Córdoba caliphate (929–1031) — the European splendor pole **[FACT]**; taifa kings; Almoravids (Murābiṭūn, from 1042 — Saharan puritan reform movement) take al-Andalus 1086 **[FACT]**; Almohads (Muwaḥḥidūn, from 1121) — second reform empire, defeat Castile at Alarcos 1195, lose Las Navas 1212 **[FACT]**; Marinids, Hafsids, Zayyanids after; Nasrid Granada 1238–1492.
- **Settlements:** Córdoba (great mosque, libraries, street lighting by reputation **[FACT]**); Seville, Granada (Alhambra), Málaga; Fez (Marinid madrasa city), Marrakesh (Almoravid), Tunis (Hafsid), Tlemcen; Sijilmasa (trans-Saharan gold gate) **[FACT]**.
- **Society/economy:** urbanized Andalusian society of high refinement (music, poetry — the muwashshah, medicine — Ibn Rushd/Averroës, d. 1198, Córdoba-born) **[FACT]**; trans-Saharan gold (Ghana→Sijilmasa→Fez) and salt; caravan cities; leather, wool, saffron, sugar.
- **Risks:** Almoravid/Almohad religious rigor waves, Reconquista, Marinid–Castile wars, plague.

## 3.10 China — Tang (618–907), Five Dynasties (907–960), Song (960–1279), Yuan (1271–1368)
- **Entity:** centralized bureaucratic empire — the world's most populous and for stretches its richest state **[FACT]**; **examination system** selects officials (expanded under Song — the era's premier meritocratic mobility lever) **[FACT]**; military weakness vs. steppe confederations is the structural drama (An Lushan 755–763 halves the population register; 907 collapse; Liao pressure; Jin takes north 1127; Yuan/Mongols end it 1279) **[FACT]**.
- **Settlements:** Chang'an (Tang, c. 1M+ at peak, walled grid, cosmopolitan via Silk Road) **[FACT]**; Kaifeng (Northern Song, open city, c. 1M, restaurants, night markets) **[FACT]**; Hangzhou (Southern Song, c. 1–1.5M, described by Marco Polo as beyond compare **[FACT]** — though his numbers are doubted); Guangzhou/Canton (treaty port, Arab/Persian quarters); Quanzhou (Zayton — the world's busiest port late Song/early Yuan) **[FACT]**; Chengdu (Sichuan, jiaozi paper money origin) **[FACT]**.
- **Society:** scholar-officials (mandarins) at top; large free peasantry (never serfs in the European sense) **[FACT]**; hereditary military households under Yuan; artisans in state/guild workshops; merchants rich but low-status officially (a tension to exploit: "rich but despised") **[FACT]**; women: elite footbinding spreads from 10th–13th c. (Song) **[FACT]**; courtesan culture in cities; widows could run businesses; dowry increasingly important.
- **Economy:** paper money (jiaozi/cash inflation cycles), copper cash, iron/coal industry (Bian river coal, iron output in 11th c. possibly matching Europe's whole 18th c. — uncertain, flagged **[FACT]**), tea monopoly, canal system (Grand Canal links rice south to grain north), southward demographic shift (Yangzi delta becomes the core), rice (Champa early-ripening rice from 11th c. doubles cropping) **[FACT]**; maritime trade under Song (compass, watertight bulkheads).
- **Religion/language:** Confucian state cult + Daoism + Buddhism (Chan thriving) + folk religion; Neo-Confucianism becomes state orthodoxy (Yuan adopts Zhu Xi commentaries for exams) **[FACT]**; Classical Chinese written; spoken Sinitic languages diverge.
- **Military:** mostly conscript/military households early Song; steppe allies/enemies provide cavalry; gunpowder weapons from 10th c. (fire lances, bombs, "thunder crash bombs" at siege of Kaifeng 1232 **[FACT]**); Jurchen Jin and Mongol siegecraft; Yuan paper-money war finance.
- **Occupations:** tenant rice farmer (Yangzi delta), examination student (years of cramming — exam halls hold thousands) **[FACT]**, salt smuggler (evade the salt monopoly — classic outlaw glamour), tea merchant, canal boatman, printer (Kaifeng/Hangzhou book culture), gunpowder technician, physician (Confucian-skeptical profession, "barefoot doctors" rural), courtesan (entertainer-poet, elite cultural figures) **[FACT]**, Buddhist monk/nun (temple land wealth), Mongol bannerman (Yuan).
- **Risks:** Yellow River floods/course changes (catastrophic), famine, Jurchen raiding 1120s, Mongol conquest 1235–1279 (massacres at defended cities), Yuan paper-money hyperinflation, Red Turban wars 1350s, plague documented in China 1331+ (historians link to the Black Death's origin — debated) **[FACT]**.

## 3.11 Japan — Heian (794–1185) & Kamakura (1185–1333)
- **Entity:** imperial court (tennō, largely ceremonial after late 9th c.) + Fujiwara regency (sekkanke) + retired-emperor rule (insei, 11th c.) + provincial warrior leagues (Taira/Minamoto) → **bakufu (tent government) at Kamakura** 1185/1192 — the famous dual polity: court in Kyoto, warriors' state in the east **[FACT]**; Hōjō regency as shikken (regents) after 1203; Mongol invasions 1274/1281; Kenmu Restoration 1333 then Ashikaga shogunate 1336 (boundary) **[FACT]**.
- **Settlements:** Heian-kyō/Kyoto (grid city, c. 100k+; aristocratic salons), Kamakura (bakufu seat, coastal), Nara (temples — Kōfukuji/Tōdaiji "temple power"), provincial manor seats (shōen), Hakata (Kyushu port, burned by Mongols 1274) **[FACT]**.
- **Society:** **Heian:** court aristocracy (kuge) — refinement as power; women of the court could be major literary figures (Murasaki Shikibu, Sei Shōnagon, early 11th c.) **[FACT]**; marriage customs distinct (visiting marriage — husband visits wife's house; daughters often raised in natal home; matrilocal tendencies among aristocrats) **[FACT]**; Buddhism (Tendai/Shingon esoteric) + kami cult (later "Shinto"); shōen tax-free estates erode central land control **[FACT]**.
- **Kamakura:** bushi (warriors) ideology crystallizes — loyalty to lord, martial arts, Zen patronage, death-before-dishonor ethos hardening after the Mongol crises (the "way of the warrior" is a *later* codification — flag that bushidō as a formal code is early-modern; medieval samurai were pragmatic) **[FACT]**; jitō (stewards) and shugo (protectors) appointed nationwide; vassal bands (gokenin) hold shiki (office/share rights to land income) **[FACT]**.
- **Economy:** rice taxation (nengu), coin vs. rice-as-tax duality; imported Song coins circulate (Kamakura relies on Chinese copper cash; Japan exports gold, sulfur, fans, swords); Zen monastery economies (trade with China) **[FACT]**.
- **Occupations:** provincial samurai (gokenin) farming his own land in peacetime — "farmer by day" pattern is real in the Kamakura period **[FACT]**, estate manager (azukari dokoro), Buddhist monk (novice at Enryakuji or Zen kana-temple), shrine maiden (miko), fisherman (Kamakura/Inland Sea), pirate/wako (coastal raiding, 13th–14th c. rise) **[FACT]**, courtier (kuge) — now impoverished ornamental prestige.
- **Risks:** Mongol invasion (1274/1281 — Kyushu devastated; mass panic; no rewards after victory because no conquered land to grant → warrior discontent) **[FACT]**, famine (Shōchō famine 1420 is past boundary; earlier famines exist), earthquakes (1185?; the 1293 Kamakura earthquake kills ~23k — near boundary) **[FACT]**, banditry in wartime, thirteenth-century inflation.

## 3.12 India — North (Delhi Sultanate) & South (Chola→Vijayanagara)
- **Entity:** tripartite struggle north (Pratihara/Pala/Rashtrakuta) early; Rajput kingdoms; **Ghaznavid raids (from 1000)** then Ghorid conquest — **Second Battle of Tarain 1192** opens the plain **[FACT]**; **Delhi Sultanate 1206** (Slave/Mamluk dynasty, then Khalji 1290, Tughlaq 1320, Sayyid, Lodi 1451) **[FACT]**; regional sultanates late (Bengal, Gujarat, Malwa, Jaunpur, Bahmani 1347); **Vijayanagara 1336** (Hindu imperial response in the Deccan) **[FACT]**; Chola maritime empire in the south to 13th c. (Rajaraja I; 1025 Srivijaya raid) **[FACT]**; temple cities (Thanjavur, Madurai — Meenakshi).
- **Settlements:** Delhi (Qutb complex), Lahore, Multan, Varanasi, Kannauj (decayed imperial capital), Madurai, Thanjavur, Vijayanagara/Hampi (c. 1500: perhaps 200k+ — uncertainty flagged); port: Cambay, Calicut (spice), Quilon.
- **Society:** varna/jati (caste) hierarchy organizing occupation and marriage endogamy **[FACT]**; Brahmin ritual authority; temple economies (devadasi temple dancers, land grants to Brahmins — brahmadeya); Islamic rule introduces iqta' (Turkic), Persianate administration, and converts mainly at social margins; Hindu kingdoms use nayaka warrior-chiefs; village self-government via assemblies (sabha/ur in the south) **[FACT]**; untouchability and slavery both present — handle with care and accuracy, not glamor **[FACT]**.
- **Religion/language:** Hinduism (bhakti devotion — Tamil Alvars/Nayanars heritage; Ramanuja 11th c.) **[FACT]**; Jainism and Buddhism (declining in the peninsula by 12th c. — Nalanda destroyed 1193 by Bakhtiyar Khalji **[FACT]**); Islam (Sunni Hanafi majority among Turkic rulers; Sufi orders — Chishti, spread Islam in the countryside) **[FACT]**; languages: Sanskrit (high culture), Persian (sultanate court), Apabhramsha/early Hindi, Tamil, Telugu, Kannada, Marathi (Marathi inscriptions at boundary).
- **Military:** Turkic slave-soldier core → Afghan/Turkic cavalry + war elephants (a prestige arm of Indic armies; expensive and temperamental — good mechanical tradeoff) **[FACT]**; Rajput chivalric warfare (personal combat norms); Vijayanagara's musketeer companies late; Timur sacks Delhi 1398 **[FACT]**.
- **Occupations:** peasant-cultivator (jajmani relations with service castes), temple servant, weaver (cotton — India clothes the world), spice trader (Calicut), Sufi dervish, Persianate scribe, elephant-keeper (mahout), courtesan (tawaif culture late), Rajput landholder-warrior, dhimmi-style protection of Brahmins under sultans.
- **Risks:** famine (Deccan droughts, 1340s crisis under Tughlaq) **[FACT]**, plague (14th c. India less documented — flag uncertainty), Timurid raid 1398, temple desecration in conquest wars, caste/jati violation consequences.

## 3.13 West Africa — Sahel (Ghana, Mali, Songhai) & the Forest/Coast
- **Entity:** Ghana (c. 300–1100) → Mali (c. 1235–c. 1600) → Songhai (15th c. peak) along the Niger bend **[FACT]**; Mossi kingdoms; forest polities (Ife from 11th c. — naturalistic bronzes; Benin from 11th–13th c. — Benin bronzes; Oyo at boundary).
- **Settlements:** Kumbi Saleh (Ghana's twin towns — Muslim traders' town + royal town) **[FACT]**; Niani (Mali capital, uncertainty on exact site — flag), Timbuktu (from 1100s — Sankore; under Mali from 1324), Gao (Songhai), Djenné (Mosque), Walata; Taghaza (salt mines — "salt as gold"); Ife/Benin City.
- **Society:** caste-like occupational orders among the Mande: **horon** (free farmers/warriors/nobles), **nyamakala** (artisan lineages — blacksmiths, griots/jeliw praise-singers and oral historians, leatherworkers) **[FACT]**, **jonow** (slaves — incl. royal slaves used in administration/army; note "slave" in Sahelian context varied widely in meaning — accuracy flag) **[FACT]**; matrilineal elements among some groups; Islam the religion of rulers and towns from Ghana's later phase; traditional religions dominant rurally; mansas rule via provincial governors; Songhai asks (commanders) and Fula marabout networks.
- **Economy:** **gold-for-salt axis across the Sahara** (Taghaza salt slabs carried south to exchange for gold dust at silent/barter rates) **[FACT]**; kola nuts (forest→north), leather, ivory, slaves (export north — dark but factual; handle soberly), cowrie shells (currency from the Indian Ocean via North Africa) **[FACT]**; Niger River canoe transport; taxation of trade = state revenue; griots as royal memory and diplomacy.
- **Military:** Mandekalu cavalry (horse + spear + javelins) plus river canoes and archers; camels from the north; siege craft weak (mud-brick cities).
- **Occupations:** gold dust trader (Wangara/Dyula networks — famous for trust-based credit) **[FACT]**, salt caravan leader (Tuareg/Soninke), griot's apprentice, blacksmith (nyamakala — feared/respected), rice farmer (Niger inland delta), canoe pilot, royal courtier, Islamic scholar at Sankore, Ife bronze caster (lost-wax).
- **Risks:** Saharan raiding (Sanhaja/Almoravids early; Tuareg later — Tuareg take Timbuktu repeatedly), drought cycles, slave raiding wars, plague rare (few documented outbreaks — flag; isolation helped), Portuguese arrive at coast 1440s+ (first direct European contact — past the core, at boundary).

## 3.14 Ethiopia & the Horn
- **Entity:** Aksum declines (9th–10th c. — trade shifts, Beja pressure; Queen Gudit/Yodit destroys churches c. 960–980 per tradition, flag as tradition) **[FACT]**; **Zagwe dynasty 1137–1270** — rock-hewn churches of Lalibela (13th c.) **[FACT]**; **Solomonic restoration 1270** (Yekuno Amlak claims Davidic descent — the Kebra Nagast national epic) **[FACT]**; highland church-state fusion (Coptic-liturgy Orthodox); Adal/Muslim sultanates on the coast (Ifat, Adal) — border jihad wars late (boundary).
- **Settlements:** Aksum (old capital), Lalibela (New Jerusalem), Gondar (only later 17th c. — exclude), Zeila (Adal port), Massawa.
- **Economy:** highland plough agriculture (unique in sub-Saharan Africa — ox-plough, terraced fields) **[FACT]**; coffee (kaffa region — export to Yemen from 15th c.) **[FACT]**; gold, ivory, slaves to the Red Sea; church land (gult).
- **Occupations:** highland farmer-priest (every church village), monk (Debre Damo), royal scribe (Ge'ez), ivory trader to Massawa, falasha (Beta Israel) craft communities, Adal coastal merchant.

## 3.15 Southeast Asia — Mainland (Pagan, Angkor, Champa, Sukhothai/Ayutthaya, Đại Việt) & Maritime (Srivijaya, Majapahit, Malacca)
- **Entity:** **Pagan** (Burma): Anawrahta unifies 1044; Theravada adopted; thousands of temples (sacked by Mongols 1287) **[FACT]**; **Khmer/Angkor**: Suryavarman II (Angkor Wat, early 12th c.), Jayavarman VII (Bayon, empire to Champa/Malaya, late 12th c.); decline: droughts (tree-ring evidence, 14th–15th c.), Champa sack 1177, Thai migration pressure; Ayutthaya takes Angkor 1431 — the end **[FACT]**; **Champa**: Hindu kingdoms on the coast (pirates and sailors); **Sukhothai** (Thai, from 1238) → **Ayutthaya 1351** (Siamese hegemon); **Đại Việt** (independent from China 939; Lý/Trần dynasties; defeats Mongols 1258/1288 — riverine ambush tactics) **[FACT]**; **Srivijaya** (Palembang, 7th–13th c.; Chola raid 1025; Javanese rivals) → **Singhasari/Majapahit** (Majapahit founded 1293 after Mongol Java expedition fails; Hayam Wuruk + Gajah Mada: "Nusantara" archipelago hegemony) **[FACT]**; **Malacca** founded c. 1400; Islamizes the straits trade (Aceh, Malacca, Java's north coast) **[FACT]**.
- **Settlements:** Bagan (Pagan — temple plain), Angkor (c. 1M in its metropolitan area at peak? — debated, flag; certainly one of the world's largest preindustrial cities) **[FACT]**, Ayutthaya, Thăng Long (Hanoi), Palembang, Majapahit (Trowulan), Malacca.
- **Society:** **mandala** polities — power radiates from charismatic centers, borders porous, tributary networks (very different from European territorial states — must model differently: personal oaths, tributary kaleidoscope) **[FACT]**; devaraja (god-king) ideology in Cambodia; vast temple economies (Angkor's rice reservoirs — barays — state hydraulic works); Theravada monkhood as literacy pathway (Pali); khmer social orders with hereditary service groups; women relatively high-status in mainland SE Asia (property, trade) — flag as regional distinction **[FACT]**; wet-rice surplus funds everything.
- **Economy:** rice (double-cropping), spices (cloves/nutmeg only in the Moluccas — far east), camphor, sandalwood, tin (Malay peninsula), gold; maritime entrepôt trade (Indian Ocean + South China Sea); monsoon calendars drive shipping seasons (critical gameplay constraint: sailing windows) **[FACT]**; cowrie/ silver/ gold currency by zone; barter common rural.
- **Military:** Khmer war elephants and river fleets; Cham navy; Thai infantry+elephant; Majapahit mandala levies; Mongol Java expedition 1292–93 fails (tropical logistics) **[FACT]**; Vietnamese riverine warfare defeats Mongols twice.
- **Occupations:** rice farmer (baray/delta), temple builder/sculptor (Khmer), Pali novice monk, Cham sailor-trader, Thai elephant handler, pepper planter (Sumatra/Java west coast — Malabar parallel), Majapahit court scribe (kawi), Malacca customs broker, forest gatherer (camphor hunters — dangerous, valuable).
- **Risks:** monsoon failure/drought (Angkor's tree-ring droughts 14th–15th c.) **[FACT]**, Cham–Khmer wars (temple sackings), Mongol expeditions, pirate coasts, malaria/dengue (forest work), volcanic eruptions (Sunda arc — 1257 Samalas eruption causes global cooling blip **[FACT]**).

## 3.16 The Steppe & Silk Road Corridor (trans-Eurasian connector region)
- **Why include:** not a "civilization start" per se but a crossable world-layer: caravanserais, oasis cities, nomad confederations (Khazars early — convert to Judaism c. 860–890 **[FACT]**; Pechenegs; Cumans; Mongols from 1206 **[FACT]**; Timurids late).
- **Settlements:** Samarkand, Bukhara (Persianate twin poles; paper-making adopted from Chinese prisoners at Samarkand 751 per tradition) **[FACT]**, Kashgar, Dunhuang (cave libraries), Merv/Nishapur (destroyed 1221), Karakorum (Mongol capital), Sarai (Golden Horde).
- **Gameplay function:** highest-risk, highest-reward travel corridor; religious spectrum (Buddhist/Manichaean/Nestorian/Muslim shrines at Dunhuang) **[FACT]**; language: Persian as trade lingua franca.

---

# 4. HISTORICAL WORLD MODEL

## 4.1 Entity types (what exists in the world)

| Entity | Description | Examples | Relationships |
|---|---|---|---|
| `PoliticalEntity` | Sovereign-ish unit holding territory | Kingdom of England; Mali Empire; Southern Song; Abbasid Caliphate (nominal); Novgorod Republic | holds `Location`s; fights wars; collects taxes; has `Faction`s |
| `Dynasty` | Ruling family | Capetians; Hōjō regents; Solomonids; Solomonic claim; Abbasids | occupies offices of a `PoliticalEntity`; succession events |
| `TerritorialUnit` | Admin subdivision | County (England), Theme (Byzantium), Province (Islamic), Circuit (Song), Shōen (Japan), Mandala circle (Angkor) | taxed by `PoliticalEntity`; hosts `Faction`s |
| `Settlement` | City/town/village/nomadic camp | London, Timbuktu, Hangzhou, a Norse longhouse farm | markets, temples, risk profile, population |
| `Faction` | Coherent interest group | Papal court; a noble house; a merchant guild; an ulama circle; a monastic order; a samurai band; a Sufi order | seeks offices, privileges; drives events |
| `Institution` | Durable organization | Monasteries (Cluny), cathedral schools, madrasas, waqf hospitals, examination boards, guilds, temple complexes (Angkor), the Church/Temple as trans-territorial bodies | provides education, healthcare, employment, legitimacy |
| `ReligiousCommunity` | Faith group (incl. protected minorities) | Latin Christians; Sunni Muslims; dhimmis; Jews; Buddhists; Hindus | affects law, taxes (jizya/tithe), marriage pool, mob violence risk |
| `SocialClass` | Legal/economic status layer | King → noble → knight/bushi → burgher → free peasant → serf → slave | gates careers, marriage, courts, obligations |
| `TradeNetwork` | Route + nodes + goods | Silk Road; Indian Ocean; trans-Saharan gold; Baltic-Hanseatic; Champagne fairs; Grand Canal | moves goods, news, disease, pilgrims; creates wealth clusters |
| `MilitaryFormation` | Army types | Feudal host; mamluk regiments; ashigaru; steppe tumens; garrison troops | conscription pool; war outcomes |
| `Family/Household` | Player-facing unit | Player's kin; lord's family; patron's house | source of support, marriage, inheritance, feuds |
| `DiseasePool` / `ClimateState` | Environmental systems | Plague reservoirs; monsoon cycles; Nile floods; Little Ice Age | drives health/famine events; gates travel |

## 4.2 Core relational rules **[MECHANIC]**

1. **The player's world is concentric:** Household → Village/Manor → Lordship → Realm. Most players will never see beyond level 2 except via travel or catastrophe. **Design every system to work at level 1–2; higher levels matter only for special paths** (courtier, merchant, soldier, pilgrim, official).
2. **Trans-territorial institutions trump borders:** the Church, the ulema, Buddhist monastic orders, Sufi chains, merchant networks (Hansa, Karimi, Wangara), and steppe confederations move across `PoliticalEntity` boundaries — use them as the pipes of mobility, news, and plague.
3. **Obligation flows downward, legitimacy flows upward:** peasants owe labor/tax; lords owe service; rulers owe justice/protection (explicit social contract, e.g., Magna Carta, fueros, shōen immunities). **Breaking this contract is the engine of revolt** — model it as a legitimacy meter per polity.
4. **Slavery and unfreedom are real:** serf, slave (jonow, mamluk-as-status, Latin sclavus), corvée, devadasi, galley convict. Implement soberly: they constrain choices (movement, marriage, property, testimony) and can be escaped/manumitted/transcended in era-legal ways. **Never gamify slavery as a fun career; model it as a status to survive, flee, or (for the enslaver) an ugly power available to some starts.** The MVP excludes player-slaver starts.
5. **Religion is infrastructure:** tithes/waqf/temple endowments fund schools, hospitals, alms; clergy are the educated class in most regions; conversion is a real personal and political event; heresy/schism (Catharism, Waldensians, Isma'ili vs Sunni, Buddhist sectarian) triggers severe consequences.

---

# 5. PLAYER CREATION

## 5.1 Birth location selection

**[MECHANIC]** Two flows:
- **Auto Create:** pick a (region, date) weighted by approximate historical population density and era coverage (favor well-documented, content-complete regions in MVP). Then pick a settlement class: rural village (weight 0.75–0.9 historically), small town, city, elite estate. Population reality: >90% of humans farmed; the game should reflect that in weighting while ensuring cities are reachable.
- **Custom Life:** player picks year + location from the unlocked region list. The engine validates: location exists in that year (e.g., no Timbuktu in 700 CE; no Granada caliphate in 1500 CE).

**Then resolve:** `SubEra` (from date) → `PoliticalEntity` (from location+date) → `SocialClass` (from family roll) → `Household` (structure, wealth, occupations, religion).

## 5.2 Family structure templates (historical)

| Region pattern | Household template | Notes |
|---|---|---|
| Western European manorial | nuclear + servants; lord's demesne nearby | inheritance: partible in some zones (e.g., some Germanic), primogeniture spreading among elites 12th c. on **[FACT]** |
| Mediterranean/extended | stem-family, multi-generation house | early marriage for women, dowry-driven |
| Islamic urban | extended around courtyard; polygyny legal (max 4, rare in practice) **[FACT]** | women retain property rights under Islamic law (dower/mahr) **[FACT]** |
| Indian joint family | multi-couple joint household under elder | caste endogamy rules; village exogamy common |
| Chinese extended (Song) | large multi-generation households ideal; equal partible inheritance among sons **[FACT]** | daughters get dowry; lineage lands; ancestor rites |
| Japanese aristocratic (Heian) | matrilocal visiting-marriage for court class **[FACT]** | husband visits wife's residence; children of mother's line |
| African Sahelian | extended/polygynous compounds | matrilineal elements in some Mande groups; griot and smith lineages endogamous |
| SE Asian | flexible bilateral kin; women manage market trade | (regional distinctiveness flag) |

## 5.3 Social class at birth (weighted random, location-gated)

Roll order: (1) legal status tier, (2) wealth band within tier, (3) parent's occupation, (4) family religion (usually = region default, with minority chances where factual: Jews anywhere urban; dhimmis in Islamic lands; Christians under Muslim rule etc.).

| Tier | Share (Western Europe example) | Gate notes |
|---|---|---|
| Royal/noble | <1% | title only via rare roll or Custom Life with "legendary blood" trait |
| Clerical/ulama/official | 1–3% | requires literate parents |
| Urban merchant/craftsman | 5–15% | town residence required |
| Free peasant/tenant | 40–60% | default rural outcome |
| Unfree (serf/bound) | 20–40% (varies: heavier east of Elbe, lighter in England/Scandinavia) **[FACT]** | movement/marriage restrictions |
| Slave/servile | 1–5% (varies hugely; excluded as default in MVP) | — |

**Region overrides:** China → almost all free smallholders (no serf class); Japan (Kamakura) → gokenin samurai vastly more common than European knights (a whole provincial warrior class); Sahel → nyamakala artisan orders (hereditary); Scandinavia → no serfs, all free; Byzantium → coloni (bound tenants) early, paroikoi later; India → jati assignment drives occupation.

## 5.4 Starting advantages/disadvantages

- **Advantages (random small chance, era-legal):** literate parent (any region); uncle in the Church/monastery (apprenticeship path); a lord's favor debt to the family; a prized skill lineage (smith, weaver, healer); trade connection (uncle in the Hansa/Wangara network); holy lineage (sayyid descent in Islam; Brahmin birth in India; kuge blood in Japan; griot lineage in Mali).
- **Disadvantages:** unfree status; landless laborer parents; debt bondage; disability (clubfoot, blindness — impacts occupation gates realistically); orphan risk at birth (mother dies in childbirth — historically 1–2% per birth, up to 5%+ cumulative; implement carefully as story, not gore) **[FACT]**; minority religion in a hostile region (Jews in England 1290+ → expelled; pagans in Saxony 8th c.).

## 5.5 What is random vs. determined **[MECHANIC]**

- **Determined by location+date:** political entity, religion defaults, legal system, currency, technology level, disease pool, war/peace state, available occupations list.
- **Determined by family roll:** class, wealth band, parent occupations, household structure, kin network size, health genetics baseline.
- **Random within bounds:** birth order, exact wealth within band, sibling count (modulated by family wealth), parental temperament (feeds childhood events), congenital traits.
- **Player-influenced at creation (Custom Life only):** birth year/location; optionally "guarantee" one of: literate family, urban birth, or a specific class (locked behind achievements later).

---

# 6. SOCIAL CLASSES AND LIFE PATHS

## 6.1 Class profiles (use as `SocialClass` templates)

### 6.1.1 Royalty & High Nobility
- **Lifestyle:** castles/palaces, conspicuous consumption, hunting as both sport and politics; hostage-raising of heirs as standard diplomacy.
- **Wealth:** land income, tolls, feudal aids; **cash-poor but asset-rich** is a recurring historical reality (selling rights, pawning jewels, borrowing from Italian bankers) — model as illiquidity.
- **Rights/restrictions:** near-total legal privilege; total political exposure (wars, coups, assassinations are the leading cause of noble death besides war).
- **Education:** private tutors, cathedral schools; literacy expected by 12th c.
- **Marriage:** alliance instrument; consanguinity dispensations (church marriage rules — a real historical lever) **[FACT]**.
- **Mobility:** only down (morganatic marriage, disinheritance) or up via conquest/usurpation. **MVP: not a playable start; reachable via rare event chains (bastard discovery, election as Holy Roman Emperor).**
- **Risks:** assassination, war captivity (ransom economy), rebellion, excommunication, dynastic extinction.
- **Opportunities:** patronage networks, crusade command, founding institutions (monasteries = prayer credit + political memory).

### 6.1.2 Lesser Nobility / Gentry / Samurai (gokenin) / Rajput / Horon-warrior class
- **Lifestyle:** manor house; military training from boyhood; judicial role over tenants (lord's court).
- **Wealth:** land rents; variable — lesser knights famously cash-strapped (mortgaging estates, marrying heiresses, going on crusade for land) **[FACT]**.
- **Rights:** bear arms by right; trial by peers; hunting rights (harsh forest laws in England/France — peasant poaching = serious crime) **[FACT]**.
- **Occupations:** knight-errant (early, anachronistic-glamour-flag), royal official (sheriff, castellan), crusader, courtier, administrator.
- **Mobility:** down via debt/partition; up via royal service, rich marriage, crusading glory.
- **Risks:** war death (highest for this class), ransom capture, family feud, attainder.
- **Japan note:** Kamakura gokenin are simultaneously rice farmers; the pure "samurai = full-time warrior" image hardens later — model the farmer-warrior duality **[FACT]**.

### 6.1.3 Clergy, Monastics, Ulama, Buddhist Sangha
- **Lifestyle:** rule-bound (Benedict's Rule; monastic vows; madrasa boarding; Vinaya discipline).
- **Wealth:** institutional (monastic estates, waqf revenues, temple lands) not personal; personal poverty + institutional riches is the norm (corruption events possible).
- **Rights:** benefit of clergy (Latin West — church courts, sanctuary) **[FACT]**; ulama's witness/judicial authority; monks' tax immunity.
- **Education:** **the literacy monopoly** — this is the era's education system.
- **Career ladder:** novice → monk/priest → cellarer/prior → abbot/bishop; student → mufti/qadi; novice → monk → abbot. **Mechanical hook: literacy is the superpower of the age.**
- **Marriage:** celibacy (Latin clergy — unevenly observed; flag honesty) **[FACT]**; Islamic ulama marry normally; Buddhist monks celibate (Japan: marriage common despite vows — flag) **[FACT]**.
- **Mobility:** the greatest vertical mobility in the era — peasant-born popes and caliphs' tutors existed (Gregory VII, servant-born; several Abbasid-era viziers were slaves) **[FACT]**.
- **Risks:** reform purges (Cluniac/Cistercian waves, Almohad rigor), anti-clerical riots, plague in crowded monasteries, heresy accusations, conclave politics.

### 6.1.4 Urban Merchants & Financiers
- **Lifestyle:** counting-house, partnerships (commenda in Italy — the era's joint-stock precursor) **[FACT]**, family firms; long absences for traders.
- **Wealth:** liquid — the class that holds cash; **everyone in debt to them, everyone resenting them.**
- **Rights/restrictions:** guild membership gates; sumptuary laws ignore their wealth; usury bans push Christian lending onto Jews/Lombards/Cahorsins (define carefully — stereotype risk; document as historical dynamic with regional nuance) **[FACT]**.
- **Mobility:** up via purchase of land/office (English wool merchants became gentry: the "wool church" phenomenon — merchants funding parish churches as status) **[FACT]**; down via shipwreck/bank failure.
- **Risks:** piracy, shipwreck, default, pogroms (Jewish lenders), expulsion, arbitrary seizure by rulers (Edward I's 1290 expulsion of Jews seized assets) **[FACT]**.
- **Networks:** Hanse, Italian galley convoys (muda system), Karimi of Egypt, Wangara/Dyula of West Africa, guild-halls of Hangzhou, Malacca brokers.

### 6.1.5 Master Artisans & Guild Craftsmen
- **Lifestyle:** shop + dwelling combined; long apprenticeship (typically 7 years in Europe) **[FACT]**; journeyman wandering years (compulsory in many German trades) **[FACT]**.
- **Wealth:** modest capital (tools, workshop); feast obligations drain surplus.
- **Rights:** monopoly of craft in town; guild mutual aid (burial, widow support) — the era's insurance.
- **Risks:** fire (thatched cities burn), price regulation, plague in dense towns, technological disruption (fulling mills vs hand-fullers — real Luddite episode, flag) **[FACT]**.
- **Mobility:** master → guild elder → alderman → mayor in open towns (Italian/German communes — genuine urban political careers) **[FACT]**.

### 6.1.6 Free Peasants (smallholders, tenants, franklins, coloni, free Chinese smallholders)
- **Lifestyle:** subsistence-plus; the agricultural year structures time (ploughing, sowing, hay, harvest — **build the seasonal clock**); cottage industries (spinning, basketry).
- **Wealth:** land or tenancy; 1–2 oxen = the difference between prosperity and disaster (livestock = the credit card of the peasantry) **[FACT]**.
- **Rights:** free movement, own land, use public courts — where free (English freemen, Scandinavian bondi, Chinese smallholders); but taxed, tithed, tallaged.
- **Risks (the big four):** famine, disease, war passing through, livestock death. Plus lords: tallage, merchet (marriage fine on unfree), heriot (death duty — best beast to the lord) **[FACT]**.
- **Mobility:** up via lucky harvests, a craft sideline, a son in the Church, frontier settlement charters (fueros, Ostsiedlung, Assarting); down via debt, land fragmentation, flight.
- **Opportunities:** village office (reeve, beadle — literacy-adjacent!), militia muster pay, pilgrimage if rich enough, seasonal wage labor at harvest.

### 6.1.7 Unfree Peasants (serfs/villeins, Russian kholopy, Byzantine paroikoi)
- Same as 6.1.6 plus: movement requires permission, marriage fines (merchet/formariage), labor dues (week-work: 2–3 days/week on the demesne) **[FACT]**, tallage at lord's will, no sword right.
- **Escape valves (historical):** flight to a town (English common law maxim: *a villein dwelling a year and a day in a borough becomes free* — generous reading, but real urban pull) **[FACT]**; manumission by charter; crusade (some lords freed serfs to crusade — rare but real); buying freedom (commutation of labor dues for money rent — the commutation wave of the 12th–13th c.) **[FACT]**; **post-Black Death: labor scarcity → serfdom collapses in Western Europe within two generations** **[FACT]** — the single greatest class mobility event of the era. **Must be simulated.**

### 6.1.8 Slaves & the Most Unfree (excluded from MVP starts; modeled as status)
- Latin Europe: slavery marginal by 1100 (household slaves in Italy, Iberia; *sclavus* etymology) **[FACT]**; Sahel: jonow (royal/administrative slavery real; treat as the region's central injustice — playable only as a "born unfree" survival arc); Mamluk system: enslaved soldier elites can become sultans (paradox of power-through-unfreedom — the most interesting slave narrative in the era) **[FACT]**; devadasi (temple dedication — scholarly debates; flag uncertainty, handle respectfully); China: mostly penal/kin-based servitude rather than chattel slavery at scale; Japan: *nuhi* (minors, absorbed into peasantry over time).
- **Mechanical stance:** status gates legal personhood; emancipation/manumission paths era-legal; **no mechanics that reward enslaving others; no slavery-economy minigame.**

### 6.1.9 Marginal & Mobile People
- Beggars, lepers (leprosaria as forced communities — also the era's care institutions; double-edged), pilgrims of dubious status, minstrels/jongleurs (suspect but licensed), executioners/tanners (ritually polluted trades — Japan's *hinin* and *eta*, European equivalents) **[FACT]**, prostitutes (regulated in many towns — Toulouse brothel fines fund the walls, flag as factual system), salt-smugglers, bandits, pirates/wako.

## 6.2 Life paths / careers (`Occupation` templates — era-legal only)

**Land paths:** peasant holder → reeve/bailiff → yeoman; frontier settler (fuero/Ostsiedlung); assarting pioneer; shepherd (Mesta transhumance); vineyardist; rice farmer (Yangzi/Angkor/Niger delta); slash-and-burn highland farmer (Khmer periphery, Ethiopian plateau).

**Hand paths:** apprentice → journeyman → master craftsman (per guild: smith, weaver, mason, fuller, tanner, potter, glassmaker, swordsmith, papermaker, printer [late], bronze caster [Ife]); masons specifically: **cathedral lodges as international career ladders** **[FACT]**.

**Word paths:** novice → cleric → vicar → bishop; madrasa student → imam/qadi/mufti; Buddhist novice → scholar-abbot; examination candidate → county graduate → metropolitan graduate → magistrate (Song) — **the era's purest exam meritocracy** **[FACT]**; scribe/notary (Byzantine taboularios, European notarii, Islamic kātib); court bard/skald/griot (praise-singer = living archive + propagandist).

**Sword paths:** page → squire → knight; man-at-arms (paid); longbowman/yeoman archer (English); crossbowman (Genoese mercenaries); mamluk recruit → emir (the slave-to-general arc); ghazi frontier settler; ashigaru/gokenin warrior; Varangian guardsman (Norse→Byzantium pipeline) **[FACT]**; janissary (devşirme — Balkan Christian boys, at the era's end); condottiere (Italian); steppe horse-archer recruit; elephant corps (Khmer/Indian).

**Sea paths:** fisherman (stockfish!); coastal trader; Hanseatic skipper; Venetian galley oarsman-quartermaster; Indian Ocean dhow crew (monsoon calendar mastery); Chinese junk crew (compass, bulkheads); wako pirate; naval levyman (Byzantine, Norman); Malacca broker-pilot.

**Market paths:** peddler; market woman (high female participation in SE Asia + Africa + peasant Europe); factor/commission agent; moneychanger (sarrafs); tax farmer; salt smuggler; pawnbroker; innkeeper (waystations = information economy); pilgrim-traffic entrepreneur (guide to Compostela/Mecca trade).

**Court paths:** page/cupbearer → chamberlain → chancellor; concubine/courtesan (formalized roles in many courts — the Ottoman harem and Chinese court were political machines; handle maturely, factually); queen's lady (Heian court ladies wrote the era's masterpieces — **women's court path is a first-class design pillar**); eunuch (Byzantine/Chinese courts — sensitive; accurate; optional content); diplomat (marriage negotiations as profession); herald (armorial knowledge as job).

**Edge paths:** leper-colony elder; executioner; executioner's kin (pollution extends); treasure-hunter (relic trade! — relics as a commodity market) **[FACT]**; alchemist/astrologer (court science); hermit (saint-in-the-making career: asceticism → local cult → canonization dossier — a full ladder!) **[FACT]**.

---

# 7. CHILDHOOD → ADULTHOOD → OLD AGE

## 7.1 Birth
- **Ceremony gates culture:** baptism (Latin West — name + godparents + parish registry); naming on day 7 with sacrifice (Aqiqah in Islam); name-giving per family/ancestor rites (China — one-month celebration); Shinto shrine visit (Japan); birth rites + caste horoscope (India — jyotisha is prestigious science); outdooring naming day (West Africa — day 8 for Akan-adjacent groups, flag specificity); Ge'ez baptism (Ethiopia).
- **Gameplay:** ceremony choice/attendance affects piety and kin ties; **mother's survival roll** (childbirth mortality ~1–2% per birth historically, higher in complications — flag ranges) **[FACT]**; **infant mortality roll** (region/period-modulated; ~20–30% before age 5 in much of Eurasia; some zones worse) **[FACT]** — the engine must be honest but not gratuitous: show it through family structure (many dead siblings), not shock events.
- **Birth anomalies** (rare): twin birth (interpreted variously: demonic in some European folklore, auspicious elsewhere — historical color, mechanical neutrality), disability (affects path availability realistically — monasteries as refuge, blindness → music/memoization careers in Islamic societies, etc. — handle with dignity and accuracy).

## 7.2 Childhood (0–7)
- **Feeding/mortality phase**; weaning ~2 years (wet-nursing among elites — foundling hospitals in Italy as dark institution) **[FACT]**.
- **Play as cultural training:** toys exist (dolls, whipping tops, hobby horses, knucklebones) **[FACT]**; games teach adult skills (play-cooking, toy tools, mock combat for boys).
- **First labor** begins ~5–7: goose-herding, fetching, spinning with grandmother.
- **Event hooks:** baptism-godparent relationship as patronage seed; childhood illness rolls; orphan events (highest parental-death period for fathers is war years; for mothers, childbirth); fosterage in noble/Irish/Welsh/Sahelian houses (child sent to kin/lord as page or household member — apprenticeship of belonging) **[FACT]**.

## 7.3 Education (7–14)
- **Default:** none formal. Skills at home: farming by doing, housewifery, herding.
- **Paths:**
  - **Cathedral school/monastery (Europe):** if family has a church connection; Latin grammar = unlock code for all administration.
  - **Madrasa (Islamic world):** Quran memorization → Arabic grammar → fiqh; funded by waqf stipends (poor boys' route documented) **[FACT]**.
  - **Song China school → exam prep:** county school, charitable estate schools (yixue); cram academies; exam cycles every 2–3 years; candidate passes: shengyuan (student) → juren (provincial) → jinshi (metropolitan) — ages typically 20s–40s at jinshi **[FACT]**.
  - **Heian Japan (aristocrats):** home education; women trained in calligraphy, poetry (waka), kana literature — Murasaki Shikibu product of this **[FACT]**; boys in Chinese classics.
  - **India:** gurukula for twice-born boys; temple schools (South); arithmetic via merchant castes; Persian for the sultanate service.
  - **Apprenticeship (7/12–early 20s):** guild indenture (7 years, Europe) **[FACT]**; craft lineage (nyamakala; jati); workshop training everywhere.
  - **Warrior training:** pages at 7–14 (noble houses), squires 14–21; Kamakura: provincial martial arts within family; archery/horse training for steppe boys from toddler age.
  - **Zen temple school (Kamakura Japan):** literacy for provincial boys — monk-teachers as rural educators **[FACT]**.
- **Girls:** formal education rare everywhere; exceptions: convents (educated nuns — Hildegard of Bingen archetype **[FACT]**), courtly women's culture (Heian), merchant wives keeping books (Italy, China), Quranic schools for girls (urban Islam), courtesan academies (China). **Mechanical rule: female literacy is a rare, precious asset with special paths.**

## 7.4 Adolescence (12–18, culturally fuzzy: no word for "teenager" — adolescence as a stage is a modern concept; but liminal ages exist everywhere: confirmation, first communion, coming-of-age rites, first muster, first solo trade)
- **Coming-of-age gates:** knighting (21, sometimes earlier); girding with sword; first yatra/pilgrimage; caju rites; capping ceremony for Chinese elite males (crown at 20 — flag); genpuku in Japan (court aristocrats, age ~15–20) **[FACT]**; first participation in thing assemblies (Scandinavia, age of majority ~12 for testimony) **[FACT]**.
- **Career choice forks here** (see §6.2): stay on land / apprentice / enter church / take the sword / take to sea / study for exams.
- **Event hooks:** first crush/marriage negotiations begin; village games turn to adult roles; first muster (militia); first market day solo; bandit temptation; monastery recruitment push (they scout for bright boys — the era's talent-spotting) **[FACT]**.

## 7.5 Adulthood: marriage, household, career
- **Marriage systems (region-coded):**
  - **European Christian:** church marriage becomes norm 12th c. on; consent doctrine (12th c. canon law: marriage by consent — *verba de praesenti* — technically valid without witnesses, which is also a scandal engine) **[FACT]**; forbidden degrees to 7th cousins (later 4th) — dispensations = noble tool **[FACT]**; peasant marriage late-ish (mid-late 20s for men — need a holding first: the "European marriage pattern" ~mid-20s women) **[FACT]**; annulment vs. divorce (annulment rich man's game: Louis VII/Eleanor).
  - **Islamic:** contract + mahr (bride's dower, her property); polygyny ≤4 (practice rare, wealth-gated); unilateral male repudiation (talaq) + women's stipulated divorce rights via contract; 'idda waiting periods; slave-concubinage exists legally — handle soberly.
  - **India:** arranged, jati-endogamous, gotra-exogamous; child marriage practices documented (upper-caste daughters betrothed young — flag as historically real, increasingly formalized late medieval) **[FACT]**; sati practiced (rare, widow-related, controversial — document factually, restrict to event-driven narrative, never mechanicized as "good"); dowry shifts toward bride-price in some regions.
  - **China:** arranged via matchmaker; equal-inheritance households mean **dowry = daughter's share of family wealth** — the Song dowry spiral (elite dowry inflation — families ruined) **[FACT]**; widows honored, chastity-cult pressure rises (Neo-Confucian); remarriage of widows possible and commoner than myth.
  - **Japan (Heian aristocracy):** visiting marriage; separation = husband stops visiting (women could not easily be divorced, men simply left) **[FACT]**; Kamakura: more patrilineal, but women still held property/manage estates in warrior class **[FACT]**.
  - **Africa (Sahel):** polygyny (status-linked); bride-wealth (bridewealth transfers to bride's family); matrilineal pockets; royal dynastic marriages as foreign policy.
  - **SE Asia:** bilateral kinship, women retain property; marriage more companionate-formal mix; Theravada monks as matchmaker-advisers.
- **Household economy:** marriage = merger of labor + land + tools; the **dower** (widow's share) protects women (English dower = 1/3 of husband's freehold for life) **[FACT]**; step-families everywhere (high adult death → remarriage: medieval "blended families" are the norm) **[FACT]**.
- **Career integration:** most adults run a household + an occupation simultaneously; "career" as identity is a modern frame — **model "life project" instead**: the holding, the trade, the children, the pilgrimage vow, the patron.

## 7.6 Aging and old age
- **Life expectancy honesty:** at birth ~25–35 across most regions; **surviving to 15 → expectation of 50s–60s** **[FACT]** (range flagged). Elders are rare and therefore *powerful*: council seats, "wise woman/man" roles, arbitration authority in villages (scabini/jurati, English jurymen of the manor court) **[FACT]**.
- **Old-age support:** children (the pension system — "for the love of God and St. Martin I give my holding to my son, reserving food and clothing for life" — real charter formula; implement as reverse-mortgage event) **[FACT]**; monastery retirement (corrody: prepaid lodging) **[FACT]**; guild alms chests.
- **Aging mechanics:** stat decay (strength/vitality), wisdom/renown accrual (compensating), memory-keeper role (griot/elder/scabinus), testament events (will-making is a religious act everywhere — deathbed confession economics).

## 7.7 Death (see §20 for full treatment)

## 7.8 Class/region/gender differentiators (summary table for engine)

| Stage | Elite male | Elite female | Peasant male | Peasant female | Urban artisan child | Clerical/monastic path |
|---|---|---|---|---|---|---|
| Birth | auspicious horoscope | — | baptism, survival rolls | — | godparent network | offered to monastery (oblate) |
| 7–14 | page/fosterage/latin tutor | convent or home arts | herding/spinning | housewifery start | apprenticeship indenture | Latin/Quran/Pali |
| 14–21 | squire, first war | betrothal/marriage market | full field labor | marriage (early-mid 20s) | journeyman wandering | vows/orders |
| 21–40 | lordship office, wars, crusade | household management, patronage | holding head, militia | dower work, market, childbirth cycle | master (if capital) | benefice/priory |
| 40+ | council, arbitration | widow management (often wealthier as widow) | village office | grandmother authority, brewing | guild elder | abbot/qadi/dean |

---

# 8. GAME STATS

> **[MECHANIC]** Design rule: stats must (a) change through gameplay, (b) gate era-meaningful outcomes, (c) be understandable in era terms. Currency-styled to the character's region. All stats 0–100 unless noted.

| Stat | Represents | How it changes | What it affects | Visible? |
|---|---|---|---|---|
| **Vitality** (health) | bodily reserve; childbirth/illness/wounds subtract; recovery slow | disease events, injuries, work strain, food quality, age decay | death rolls, work capacity, military rolls, fertility | Yes (as wellness descriptors: "hale," "ailing," "bedridden" — no numbers in-fiction) |
| **Fertility** | reproductive capacity (both parents) | age, health, nutrition, region customs (spacing) | children count/timing | Hidden (expressed as "no children yet" anxiety; revealed in events) |
| **Wealth** | total assets in local currency + goods + land claims (see §9 multi-ledger) | work income, harvests, trade, inheritance, fines, theft | everything economic: marriage value, bribes, muster equipment, pilgrimage feasibility | Yes (tiered descriptors: destitute/struggling/comfortable/prosperous/rich — numbers in ledger) |
| **Standing** (social status) | class position + local reputation composite | deeds, office, marriage, scandal, patronage, manumission | gate to occupations, courts, marriage pool, audience with superiors | Yes (titles + whispered descriptors) |
| **Piety** | religious standing in own community (not generic morality) | observance, pilgrimage, donations, vows, sin events per doctrine | clergy paths, community support, burial honor, heresy risk inverse | Yes (via clergy feedback, community treatment) |
| **Honor/Reputation (word)** | personal name-value: keeps word, brave, generous — or not; note regional synonyms: *bona fama*, *sharaf*, *menboku*-adjacent, griot-remembered | promises kept/broken, public acts, insults avenged, generosity | marriage, alliances, court credibility, feud triggers, merchant credit | Yes (gossip system: this stat is *the* medieval economy of trust) |
| **Learning** (literacy + knowledge) | ability to read/write languages known; book access; numeracy | schooling, apprenticeship, self-study (rare), scriptorium work | clerk paths, administration, medicine, law, heresy detection risk inverse | Yes (player knows their own literacy) |
| **Martial** | personal combat: arms skill, nerve, physicality | training, campaigning, tourneys (where legal), brawls | soldier outcomes, village defense, tourney prizes, banditry | Yes |
| **Craft** | skill in chosen trade(s) | apprenticeship quality, practice, innovation events | income, masterpiece acceptance, guild rank | Yes |
| **Network/Influence** | who owes you, who you can ask | favors given/asked, kin ties, patronage, gossip engine | access: jobs, courts, news, loans, marriage introductions | Partially (see relationships concretely; influence is emergent sum) |
| **Family Standing** | dynasty-level reputation | family members' deeds, marriages, deaths with honor, estate continuity | starting standing of descendants (replay hook), funeral turnout, inheritance disputes | Yes |
| **Freedom** (legal status) | free / unfree / enslaved axis | birth, manumission, flight + year-and-a-day, commutation purchase, enslavement (capture, debt, punishment) | movement, marriage self-determination, court access, property rights | Yes (as legal descriptor: freeman, villein, slave) |
| **Survival** | practical bushcraft/adaptability: find food, endure weather, read seasons | hard childhoods, travel, famine survival, frontier living | famine/death spiral resistance, travel events, bandit survival | Hidden (shows via outcomes) |

**Explicitly excluded (modern concepts):** happiness, hygiene, education-as-school, democracy-points. **Converted equivalents:** "Contentment" emerges from events, not a stat.

---

# 9. ECONOMY

## 9.1 Design rule

**[MECHANIC]** **No unified money.** Wealth = **multi-ledger**: `Cash` (local currency), `Goods` (grain stores, livestock — the peasant's true wealth), `LandRights` (acreage/tenancy/shares), `Claims` (debts owed to/by, wages owed, pension-reserved rights), `MoveableCapital` (tools, workshop, books, silk stock). Most transactions are in-kind, in-service, or on credit. Display wealth as tiers; keep ledgers under the hood.

## 9.2 Currencies by region (representative, not exhaustive) **[FACT]**

| Region | Money |
|---|---|
| Latin Europe | silver penny/denarius (Eng. penny, Fr. denier, Ger. pfennig); mark (account unit = 160 pence England/240 elsewhere — flag variation); gold florin (1252 Florence), ducat (1284 Venice) revive gold in the West **[FACT]** |
| Byzantium | gold solidus/nomisma ("bezant" in Europe) — the era's most stable coin for 700 years, debased late **[FACT]** |
| Islamic world | gold dinar + silver dirham (Quranic weights); copper fals; Fatimid/Mamluk gold; **money-changing as licensed trade (sarraf)** |
| India | gold dinaras/tankas (Delhi), silver (Western coast, from 13th c.), cowries (small change — Bengal especially) **[FACT]** |
| Song/Yuan China | bronze cash (strings of 1,000), iron cash (Sichuan), **paper notes: jiaozi (Sichuan, official c. 1023), huizi** — with inflation/deflation cycles engineered by state; Yuan overprints → late-Yuan collapse of paper **[FACT]** |
| Japan | no coin minted domestically for most of the era — **Chinese copper cash imported**; rice measures (koku) as value standard; cloth/metal commodity money **[FACT]** |
| Sahel West Africa | gold dust (by weight, mithqal); salt slabs (Taghaza — a literal currency of blocks); **cowrie shells** (imported via North Africa — global commodity chain!); copper (Takedda); later Portuguese import manillas at the boundary **[FACT]** |
| Ethiopia | imported coin thin; Maria Theresa thaler is *18th c.* — exclude; salt bars, cloth, iron bars as media; Aksumite coinage is antique heritage |
| SE Asia | silver/gold by weight; cowries; Chinese cash widespread in maritime trade; rice and cloth as standards; no native coin in much of the mainland until late |

## 9.3 The economic metabolism

- **Food first:** grain (wheat/barley/rye/oats north; rice south/east; millet/sorghum Sahel; teff highlands) → caloric base; meat rare for the poor (fast days enforce fish); ale/beer/wine as safe calories; **salt = strategic commodity everywhere** (Taghaza, Salins, Lüneburg, coastal salt pans).
- **Land and its rents:** manorial demesne vs tenant strips; three-field rotation (North Europe), two-field (Mediterranean); tithe (~10% to church — in grain!), jizya (dhimmi head tax), kharaj (land tax on non-Muslim land), nengu (Japanese rice tax in kind), corvée (labor tax), tallage (lord's arbitrary levy on unfree).
- **Prices:** no price stability assumption. **Famines triple grain prices within months (1315–17 England: wheat at ~8–10x normal)** **[FACT]** — implement regional price vectors modulated by harvest, war, and trade blockade.
- **Trade engines:** wool (England→Flanders→Italy); silver (Rhineland/Saxony/Bohemia — the great 12th–15th c. European money pump) **[FACT]**; Baltic grain/timber; Champagne fairs (12th–13th c.); Hanseatic network; Silk Road (silk, spices, gems, slaves, paper east-west; silver west-east per medieval flow); Indian Ocean (pepper from Malabar via Aden/Cairo — the Karimi syndicate) **[FACT]**; trans-Saharan (gold north, salt south, kola/ivory/leather); Grand Canal rice (China's circulatory system).
- **Credit without banks (mostly):** Jewish lending houses (Europe, until expulsions), Italian merchant-bankers (Bardi/Peruzzi to Edward III — catastrophic defaults 1340s) **[FACT]**, Islamic partnership law (mudaraba/commenda analogs; hawala transfer networks) **[FACT]**, Chinese "draft banks" (feiqian, early Tang ancestor — remnant), Wangara trust-credit (gold dust advances on word) **[FACT]**.
- **Economic risks:** harvest failure (weather table), murrain (animal disease), debasement (rulers clip coins — affects ledgers!), war chevauchée (armies = moving economic catastrophes for the district), piracy, shipwreck ( Mediterranean winter sailing ban — naulon rules; monsoon windows in the Indian Ocean) **[FACT]**, guild exclusion, usury prosecutions, pogrom-as-asset-seizure.
- **Economic opportunities:** clearing waste (assarting), draining fens, frontier charters with tax holidays (Ostsiedlung terms: fixed low dues, hereditary tenure **[FACT]**), tournament prizes, ransoms (knightly capture economy — the *real* soldier's payday) **[FACT]**, relic discovery (!), exam success (Song: officials are rich), temple/monastic patronage careers, tax-farming.

## 9.4 Player wealth representation

- Peasant: oxen count, acres, grain sacks, pigs — display as "Your father has two oxen and owes the miller." Money appears rarely (market days, taxes in cash occasionally).
- Artisan: tools + stock + shop; cash cycles weekly.
- Merchant: multi-currency ledgers (this is fun at scale: exchanger events, debasement arbitrage — make numeracy stat matter).
- Elite: income is owed, not held: arrears, tallies, wardships, scutage — **cash-flow crises are the elite's defining drama** (William I's son-in-law owed him; everyone owed Italian bankers) **[FACT]**.

---

# 10. POLITICS AND POWER

## 10.1 Structures by region **[FACT]**

| Region | Sovereignty | Succession | Administration | Law |
|---|---|---|---|---|
| Western Europe | hereditary kingship + feudal vassalage (revocable honors vs hereditary fiefs — the era's great constitutional fight) | primogeniture spreading among elites; elective among German princes (HRE — seven prince-electors formalized 1356 Golden Bull) **[FACT]** | household-to-bureaucracy transition: Exchequer, Chancery, Parlement, cortes/estates as tax-consent bodies **[FACT]** | feudal custom + Roman revivals; ordeal/trial-by-combat (suppressed 1215 Lateran IV for clergy — ordeal condemned) **[FACT]**; compurgation (oath-helpers); jury manorial courts; canon law courts (marriage, clergy) |
| England specifics | unusually centralized (sheriffs, eyre justices, coroners from 1194) **[FACT]** | strict primogeniture among nobility; entail later | common law + Magna Carta as tax-war contract template | hundred/shire courts; manorial courts; benefit of clergy |
| Byzantium | basileus (emperor) = God's vicegerent; autocracy tempered by senate/city mobs/patriarch | hereditary + palace coups (the real mechanism) | themes → tagmata; logothetes (ministries); provincial governors | Roman law codified (Justinian's Code, *Basilika* 9th c.) **[FACT]**; church law; guild regulation (Book of the Eparch) |
| Islamic lands | caliph (legitimacy) + sultan/emir (power) — the classic dualism | hereditary + slave-soldier coup + iqta politics | diwan (chancery); vizier; qadi courts; hisba (market inspectors) | Sharia (fiqh schools) + qanun (sultanic decree); dhimmi autonomy under their own law for internal matters **[FACT]** |
| China | emperor (Son of Heaven, Mandate of Heaven — rebellion legitimated as heaven's revocation) | hereditary dynasty; exam meritocracy beneath | three ministries + six boards; censors; county magistrate = the node every player meets **[FACT]** | codified law codes (Tang Code ancestor); clan rules; customary law; severe penal code |
| Japan | tennō (sacral) + bakufu (military) + shōen lords — **three-layer sovereignty** | imperial line unbroken (ritual); shogunate by force; regencies (Hōjō shikken) run the bakufu | bakufu hyōjōshū (council), jitō/shugo networks; temple-shrine estates (Kōfukuji armed monks!) **[FACT]** | ritsuryō code (Chinese-modeled) vs warrior custom; trial by ordeal (tanzen) existed — flag; kokushi courts |
| India | rajadharma (king as dharma-protector); sultanate = Persianate monarchy | hereditary + usurpation; Rajput clan consensus | iqtadars (Turkic) / nayankara (Vijayanagara military chiefs) **[FACT]**; village sabhas self-rule | dharmashastra ideals + jati courts (panchayats) + sultanic qanun; multiple concurrent jurisdictions = gameplay feature |
| Sahel Africa | mansa (divine-charismatic) + provincial governors (farbas) + council of elders + queen mothers (powerful political actors — use!) **[FACT]** | matrilineal elements among Mande (flag: Mansa Musa's succession debates); lineage councils | griots as diplomats/historians; royal slaves as officials | customary law; Islamic law in towns (Maliki); both operate in parallel |
| SE Asia | mandala: concentric circles of allegiance; devaraja cult (Khmer); tributary networks | sacred kingship + usurpation; minister-clans as kingmakers (Khmers' rival families — Sivaka family drama) **[FACT]** | temple households as administrative nodes | customary law + dharmaśāstra prestige + royal edicts; ordeals used (Khmer water ordeal — flag) |

## 10.2 How ordinary players interact with politics

- **The village layer (everyone):** manor court/jury duty (English peasants as jurors = political micro-participation) **[FACT]**; headman/reve selection; tax assessment disputes; corvée negotiation; shrine/temple festivals as political theater (funding, seating order = status map).
- **The patronage layer (mobile players):** attach to a lord's household (livery and maintenance — keep a knight = maintenance economy), a bishop's familia, a merchant house, a madrasa circle, a daimyo's band (gokenin registers!); **patron's wars become your wars** — the era's military-draft reality.
- **The voice layer (urban):** commune charters, guild master elections, guild-based assemblies (Flemish towns send guild deputies; Venice's Great Council is closed aristocracy — contrast!), Novgorod veche mob-assemblies, Song China: examination graduates *are* the state (joining = the career).
- **The sword layer:** rebellion (peasant risings real: Stedingers 1234, Jacquerie 1358, English 1381, Flemish 1323–28, Hussite revolution 1419–36) — implement as cascading legitimacy-collapse events with genuine cause-chains (war taxes + plague labor laws in 1381's case) **[FACT]**.
- **The faith layer:** heresy as political crime (Cathars; Waldensians; Hus), church councils, investiture fights touching local clergy appointments, mosque appointments under rival sultans.

## 10.3 Factions, alliances, rivalries (system objects)

- `Faction` examples: Guelph vs Ghibelline; Armagnac vs Burgundian (France, civil war 1407–35); Lancaster vs York (from 1455 — boundary); Hōjō clan vs imperial loyalists; temple vs bakufu (Jōkyū War); Brahmin vs Sufi patronage networks (India); guild vs patriciate (Flemish cities); Saracen-vs-Frank frontier (Iberia); Karimi merchants vs crown (Egypt); mandala rim factions (Cham vs Khmer vs Thai).
- **Rivalry engine:** honor-based feud ladders (Icelandic sagas as the extreme case — formalized feud with arbitration) **[FACT]**; vendetta vs. legal compensation (wergeld tradition, diyya blood-money in Sharia — both real compensatory mechanisms) **[FACT]**.

---

# 11. WAR AND CONFLICT

## 11.1 Types of conflict **[FACT]**

1. **Dynastic/feudal war:** succession, inheritance (Anarchy 1135–54 England; Hundred Years' War is dynastic at root — Edward III claims France) **[FACT]**.
2. **Frontier war:** Reconquista (castle sieges, raids, *razzias*), Baltic crusades, steppe raiding (Rus' vs Pechenegs/Cumans; China vs Liao/Jin), ghazi warfare (Anatolia).
3. **Holy war / crusade:** indulgences + vows + preaching tours; crusader states (Outremer 1099–1291); Baltic/Northern crusades; Albigensian crusade vs heretics **[FACT]**.
4. **Peasant/town revolt:** (list above); communal wars (Lombard leagues vs emperors — Legnano 1176 **[FACT]**).
5. **Nomadic conquest:** the Mongol system (horse archery, feigned retreat, intelligence via merchants, *submission-or-massacre* ultimatum choice — a real decision engine) **[FACT]**; Timurid variant (terror as policy).
6. **Piracy/banditry:** wako, Barbary privateers (later), Baltic pirates (Victual Brothers), *eremitic* bandit noble (robber baron) — endemic low-level conflict that touches players constantly.
7. **Religious civil war:** Hussite Wars (wagon forts! first mass field-artillery doctrine) **[FACT]**; Byzantine iconoclasm (8th–9th c.); later Reformation is outside era.

## 11.2 Recruitment & who fights

| Path | Who | Terms |
|---|---|---|
| Feudal levy (Europe) | vassal knights + their retinues; obliged 40 days/year typical (flag as customary, varied) **[FACT]** | scutage (money commutation) grows → mercenary market |
| Mercenaries | free companies (routiers, écorcheurs, condottieri, German landsknechts late) **[FACT]** | contract pay; famous mutiny-and-sack behavior when unpaid (plot generator!) |
| Urban militia | Flemish guildsmen (weavers' guilds field companies), Italian commune bands, English fyrd/shire levies, French arrière-ban, German Bürgerwehr | defense of walls; Courtrai 1302, Morgarten 1315 (Swiss vs Habsburg) **[FACT]** |
| Professional soldier-slaves | mamluks (Egypt), janissaries (Ottoman, end of era), ghulam regiments | bought/levied young, trained to corps-loyalty |
| Nomad hosts | all free males ride; decimal tumens (10k) **[FACT]** | plunder economy; harsh discipline |
| Chinese systems | Tang fubing (military-colony farmers early); Song hired armies (expensive, weak); Yuan hereditary garrisons; Ming weisuo (boundary) | paid in paper money/cash |
| Japanese | gokenin obligation per shiki share; Kamakura mobilization slow (Jōkyū War took months to assemble) **[FACT]**; Kamikaze-era mass mobilization (1274/81) including tsushima/iki garrison duty |
| Southeast Asia | mandala levies (corvée armies), elephant corps, river fleets | seasonal (rice calendar limits campaign windows!) **[FACT]** |

## 11.3 Weapons & armor (tech-gated loadouts)

- **Melee:** spear (the true king of battle), sword (status weapon — expensive!), axe, mace/war hammer (vs armor), dagger; **Dane axe, falchion, katana-tachi (early curved blade evolving), kris (SE Asia), khanda (India).**
- **Missile:** longbow (England/Wales — muster-trained from boyhood), crossbow (Genoese; Church tried banning vs Christians, 1139 — flag as ineffective ban) **[FACT]**, composite steppe bow (the apex weapon), javelins, slings.
- **Armor:** mail hauberk → coat of plates → full plate (elite, late) **[FACT]**; lamellar (Byzantine/Rus/Islamic/steppe/Japan); o-yoroi (Japanese boxy cuirass); quilted cloth for commoners (gambeson — decent!).
- **Siege:** counterweight trebuchet (the Mongol/Islamic peak), early cannon from 1320s+ (small; Mehmed II's great bombards 1453 breach Constantinople's walls — *the* era-ending image) **[FACT]**; mines, mantlets, Greek fire's successors.
- **Naval:** longship (Viking), knarr (cargo), cog (Hanseatic workhorse), caravel (late Portuguese), dromon (Byzantine, Greek fire — early), dhow (Indian Ocean sewn boats), junk (Chinese multi-masted, bulkheads, rudders — tech marvel) **[FACT]**, war canoes + elephant transport (Khmer).

## 11.4 Risks/rewards (mechanical balance)

- **Risks:** death (battle ~ but disease in camp historically kills more — armies as plague vectors **[FACT]**), maiming (wound table: lose eye/hand/leg → career change arcs), capture (knight: ransom market — capture is *preferable* to death for elites; commoner: no ransom value → killed or enslaved — brutal but accurate asymmetry), PTSD-analog ("soldier's heart" — flag modern projection; describe as "the shakes," drinking, visions — contemporary language from chronicles).
- **Rewards:** loot (regulated share systems: the Spanish *quinto* for crown share is early-modern; medieval customary thirds/halves) **[FACT]**, ransoms, land grants (conquest aristocracies: marcher lords, gokenin confirmations, iqta assignments, Spanish *repartimiento*-adjacent repopulation), glory (tournament circuit in peacetime — the war-substitute economy of the 12th c.) **[FACT]**, wages (mercenary).
- **Political consequences:** veterans change politics (English longbowmen as county mob; Swiss confederacy born of victorious peasant infantry; Hussite revolution).

## 11.5 Anti-"generic strategy game" rules

1. Armies are small relative to population (England fields ~10–30k max for major expeditions — flag as broad) **[FACT]**; the *player's war* is usually 10–100 people.
2. Campaign seasons rule (harvest limits; winter quarters; monsoon windows).
3. Logistics = the game: supply carts, fodder, water. A campaign fails on fodder more often than on battle (animal-drawn armies eat the campaign) **[FACT]**.
4. Battle is rare, fast, chaotic: resolve as climactic dice-with-modifiers against pre-battle maneuver (terrain, surprise, weather) — no real-time tactics layer in MVP.
5. Sieges dominate: most "war" is waiting, mining, disease, negotiation, sorties.

---

# 12. RELIGION, CULTURE AND SOCIETY

## 12.1 Faith map (core systems) **[FACT]**

| Faith | Heartlands | Key institutions | Era dynamics |
|---|---|---|---|
| Latin Christianity | Western/Central Europe, Scandinavia, Hungary, Poland | Papacy; monastic orders (Benedictine→Cluniac→Cistercian→mendicants Franciscans 1209/Dominicans 1216→warrior-monks Templar 1119/Hospitaller) **[FACT]** | Investiture contest; crusades; heresy inquisitions (from 1230s) **[FACT]**; Avignon captivity + schism; conciliarism |
| Eastern Orthodoxy | Byzantium, Rus', Balkans, Ethiopia | Autocephalous churches; monasticism (Mount Athos; Kiev Caves; Ethiopian monasteries) | Hesychasm; Union debates with Rome (Lyons 1274, Florence 1439 — fail) **[FACT]**; Ottoman dhimma transition |
| Islam | Spain→Central Asia→India, Africa coast | Caliphate legitimacy; madrasas; Sufi orders (Qadiriyya, Chishtiyya, Rifa'iyya, Mevlevi late); waqf | Sunni-Shia polity rivalry (Baghdad vs Cairo); reform movements (Almoravid/Almohad); Mongol conversion; madrasa standardization |
| Judaism | Diaspora: Rhineland, Spain (Sefarad), North Africa, Egypt, Baghdad, Yemen, India (Cochin) | Rabbinic courts; yeshivot; communal self-government (kehillot) | Rhineland massacres (1096 First Crusade pogroms; 1348 Black-Death scapegoat massacres) **[FACT]**; expulsions (England 1290, France 1306/1394, Spain 1492) **[FACT]**; Sefardi golden ages (Córdoba, Toledo translators, Maimonides — d. 1204 Egypt) **[FACT]** |
| Hinduism | India, Bali, mainland SE Asia (declining) | Temples (devaswam lands); matha monasteries; pilgrimage (Varanasi, Prayaga, Rameswaram) | Bhakti movements (Ramanuja; Kabir at boundary); temple desecration as conquest symbolism (documented both ways — flag scholarship debate) **[FACT]**; Vijayanagara as Hindu bulwark |
| Buddhism | China, Japan, Korea (period-edge), SE Asia mainland (Theravada), Tibet (Vajrayana) | Sangha (monkhood); stupas/temples; Chan/Zen (Japan: Rinzai — Eisai 1191; Soto — Dogen 1227) **[FACT]**; Tibetan lineages | Chinese suppression waves (Huichang 845, past era start — background); Pure Land devotion; Kamakura Zen-warrior symbiosis; SE Asia Theravada golden age (Pagan, Sukhothai) |
| Jainism | India (Gujarat, Karnataka) | Tirthankara temples; monastic orders | Tolerance pacts with sultans (some Jain temples protected); merchant networks |
| Zoroastrianism | Iran (declining under Islam), India (Parsi migration at boundary-ish, 8th–10th c. traditions — flag) | Fire temples | Dhimmi status |
| Traditional African religions | Sahel rural, Ethiopia margins, everywhere plural | Ancestor cults; diviners; masking societies (flag regional variety) | Syncretic coexistence with Islam (griot epics fuse) |
| Norse paganism (early only) | Scandinavia, Iceland, Norse settlements | Goðar chieftain-priests; blot feasts; thing sites | Conversion 960–1150 as *playable drama* (missionary pressure, king's baptism = realm event) **[FACT]** |

## 12.2 Customs that must affect gameplay

- **Calendar & festival cycles:** Easter/Christmas + saint days (parish rhythm; feast or fast economics); Ramadan (day-fasting → night markets; Eid al-Fitr spending spike); Divali/Dussehra; Vesak; harvest festivals (Lammas, Sankranti); matsuri (Japanese shrine festivals with sake, theater — corvée-paid fun); the **carnivalesque inversion** (Feast of Fools, May games) as licensed disorder valves **[FACT]**.
- **Rites of passage:** baptism/naming (see §7.1); confirmation; first pilgrimage; capping/genpuku; marriage rites; funerary rites ( Christian burial vs. Islamic qibla burial vs. Chinese ancestor rites vs. Hindu cremation vs. Norse ship burial for elites **[FACT]** — funeral choice affects soul-repose beliefs and community judgment).
- **Food laws:** Lent/no-meat → fish economy (herring boom!); halal/haram and kosher butchery (professional niches); Hindu vegetarian currents; Buddhist monastic rules (no afternoon meals — temple economies structured around it).
- **Purity/pollution:** caste commensality rules; Japanese *hinin/eta* outcaste trades; European leper-bell etiquette; Muslim purity before prayer; menstruation seclusion customs (vary wildly — flag uncertainty, avoid stereotype mechanics).
- **Hospitality law:** guest-friendship (steppe; Bedouin-adjacent; Germanic); sanctuary rights; monastic hospitality obligations (travel game-saver); the **traveler's dilemma** (bandit risk vs. guest-right) as recurring choice.
- **Ordeals & oaths:** judicial ordeal (hot iron, cold water — types mapped: cold water for the guilty in Frankish custom, inverted in others; flag complexity) **[FACT]**; compurgation with oath-helpers; trial by battle (wager of battle dies hard in England — last case 1818 is later, but flag); oaths on relics (why relic trade = trust infrastructure); Quranic oath procedures.
- **Gifts & reciprocity:** gift-giving as political language (Heian poetry exchanges as diplomacy; potlatch-adjacent chiefly generosity in Africa; lordly largesse = legitimacy). **No "sell" verb for elites in many interactions — gifts, counter-gifts, obligations.**

## 12.3 Taboos with teeth (gameplay consequences)

- Usury (Christian) → social stain, legal risk; Jewish lending niche (see §9.2, handle with care).
- Heresy/apostasy → inquisition, execution (Cathar burnings; Hussite stakes); leaving Islam (ridda) — capital offense in fiqh theory (implementation rare; flag).
- Caste mixing → pollution, expulsion from jati (losing caste = economic death).
- Pogroms (anti-Jewish violence) → implement as *reality*: playable Jewish characters face recurring danger events tied to rumor engines (well-poisoning libels, host-desecration libels — historically the actual triggers) **[FACT]**.
- Witch accusations (late era rise: inquisition manuals like *Malleus Maleficarum* 1486 — boundary) **[FACT]**.
- Sexual norms: fornication fines (church courts' *leyrwite*), bastardy status (canon law bastards barred from orders — dispensation industry exists) **[FACT]**; same-sex acts criminalized in most codes (sodomy laws; Islamic fiqh penalties; handle factually, with documentary restraint).
- Suicide: property forfeiture (English deodand/felo de se), dishonor → survival narratives matter.

## 12.4 Community structures

Village commune (open-field collective decisions — plough teams are shared enterprises = co-op mechanics) **[FACT]**; parish; guild; manor; monastery (as landlord and employer); mosque-quarter; temple-town (India); shōen estate community (Japan); clan/lineage (China — lineage estates, ancestral halls); sabha/ur (South Indian village assemblies); thing (Scandinavia — public assembly with legal force) **[FACT]**; mandala court circles (SE Asia); griot circles (Mali — oral-constitution communities).

---

# 13. TECHNOLOGY AND KNOWLEDGE

## 13.1 Diffusion map (era-defining: tech is *localized and traveling*) **[FACT]**

| Tech | Origin/zone | Route & date (representative) | Gameplay effect |
|---|---|---|---|
| Heavy plough + horse collar + nailed horseshoe | Northern Europe (Carolingian→) | spreads 9th–12th c. Europe | farmland value ↑↑ in wet north; oxen→horses (speed) |
| Three-field rotation | Europe | high medieval | food surplus → population boom |
| Windmill | Persia→Europe | 12th c. north Europe | milling income; mill monopoly lord-rights (multure banalité) **[FACT]** |
| Water power (fulling, trip hammers, mills) | everywhere | dense in Europe 11th–13th c. **[FACT]** | proto-industry; guild conflicts |
| Stirrup | steppe→ | 8th c. Europe/Islam | mounted shock combat; caste of lancers |
| Gunpowder | China (9th c. alchemists; military 10th) | Mongols→Islam→Europe by mid-14th c. **[FACT]** | end-game: bombs, fire lances, cannon (1453 drama) |
| Paper | China (Han era) → Samarkand (751, tradition: Chinese papermakers captured) → Baghdad (8th–9th) → Europe (Spain/Italy 12th–13th) **[FACT]** | cost of writing collapses; bureaucracy & heresy detection ↑ |
| Printing (woodblock) | China (Tang Buddhist texts; Song mass market — Kaifeng/Hangzhou book trade) **[FACT]**; movable type Bi Sheng c. 1040s (clay — limited adoption; flag) | China: exam prep industry, almanacs; Korea metal type (13th c.) **[FACT]** |
| Compass | China (Song maritime use documented) | Indian Ocean via Arabic sailors ("needle that knows the way") **[FACT]** | night/overcast sailing; trade risk ↓ |
| Astrolabe/quadrant | Hellenistic→Islamic refinement (8th–10th c.) | Europe via al-Andalus/Sicily **[FACT]** | navigation; prayer-time precision (qibla direction); court astronomer career |
| Arabic numerals + algebra | India→al-Khwarizmi (9th c. Baghdad) → Fibonacci's *Liber Abaci* 1202 Italy **[FACT]** | accounting revolution at era's end; merchant numeracy stat gates |
| Double-entry bookkeeping | Italy | 13th–14th c. Genoa/Venice **[FACT]** | big-firm gameplay; fraud detection |
| Eyeglasses | Italy (Pisa/Murano traditions; documented late 13th) **[FACT]** | scholars/scrivers extend careers (aging penalty offset!) |
| Mechanical clock | Europe | weight-driven late 13th; spring 15th **[FACT]** | monastic hours→city bells; time discipline (work-day mechanics) |
| Shipbuilding | Chinese junks (watertight bulkheads, stern-post rudder — 1st c. tech matured) **[FACT]**; dhow sewn planks; cog flush-planked; caravel late (Prince Henry's school) | sea-path safety tiers; monsoon windows remain hard |
| Steel | wootz crucible steel (India/Sri Lanka) → Damascus blades **[FACT]**; pattern-welded Norse; Japanese tatara (late) | weapon tiers; gift-grade prestige swords |
| Medicine corpus | Galen (Greek) → Islamic synthesis (al-Razi, d. 925; Ibn Sina's *Canon*, 11th c. — Europe's medical textbook to 1600s) **[FACT]**; Chinese *Bencao* materia medica | physician quality by region; humoral treatment (bleeding/purging — often harmful; honesty: cures are rare, comfort and regime are the real arts) |
| Agriculture (India/Sahel/SE Asia) | Champa rice (early-ripening, drought-tolerant) → Yangzi delta 11th c. → double-cropping **[FACT]** | Song population boom engine; surplus funds exams/armies |
| Camel saddle/trans-Saharan tech | Roman North Africa→Arab expansion | 8th–9th c. gold-salt routes at scale **[FACT]** | Mali gameplay enabled |
| Horse collar→steppe horse archery kit; composite bow | Central Asia | the steppe military-industrial complex | nomad conquest events |

## 13.2 Transportation & communication speeds (hard simulation constants) **[FACT]**

- Walking: 30–40 km/day sustained; riding horse: 60–100 km/day (change mounts on post roads: the Mongol *yam* relay achieves ~300 km/day for urgent messages) **[FACT]**.
- Sea: cog coastal hops with winter bans (Mediterranean navigation closed Nov–March officially — Byzantium's *peripli* rules) **[FACT]**; Indian Ocean: monsoon calendar (April–Sept southwest, reverse after); trans-Saharan: 60–90 day camel caravans, water-station chains (foggara/oasis nodes); Silk Road: caravan 25–30 km/day.
- News speed: rumor outruns official post; battle news travels weeks-months; **mechanical rule: player knowledge of distant events lags realistically** (timeline UI shows "what your character could know").
- Books: a Bible = 2–3 years of a scribe's labor pre-paper-cheap era **[FACT]**; universities' pecia system (rental copy sections) **[FACT]**; monastery library access = research rolls.

## 13.3 Education & science access by sub-period (gate tables for Learning stat progression)

- Europe c. 1000: monastic + cathedral schools; 1200: universities (licentia docendi); 1300: ~30 universities; printing (Gutenberg c. 1450) at boundary **[FACT]**.
- Islamic world: madrasa + hospital (bimaristan, with salaried physicians) + observatories (Maragha 1259, funded by Hulagu's vizier — Mongol-era irony) **[FACT]**; Bayt al-Hikma heritage as *memory/quest hook*.
- China: state schools + exam academies; book markets; encyclopedias (Song *leishu*); **knowledge = purchasable commodity in cities** (a distinctively Song texture).
- India: temple colleges (Ennayiram inscription — Vedic college with 340 students, c. 1025) **[FACT]**; madrasas under sultans; Persian curriculum at Delhi.
- Japan: temple schools (terakoya come later — Kamakura: Zen literacy; court scholarship decadent but present).

## 13.4 How tech differences affect gameplay (summary rules)

1. Tech is a **property of location + date**, not of the player (until player carries it — **technology transfer is a legitimate player achievement**: a Norman noble returning from Sicily with paper-making knowledge; a Chinese salt-smuggler teaching distillation; flag as high-tier divergence).
2. Equipment gates military/craft careers; knowledge gates careers (numeracy for merchants post-1202 in Italy).
3. **Information tech = power tech:** cheap writing (paper/printing) increases state reach (tax rolls, heresy detection) — model as `StateReach` regional variable that constrains the player's room to maneuver (frontiers and paper-light zones = freer but riskier).
4. Transport tech sets travel event tables; communication tech sets news lag; both set the **pace of the game** (a medieval year should feel slower and bigger than a modern one).

---

# 14. HEALTH, DISEASE AND SURVIVAL

## 14.1 Demographic honesty (baseline constants, region/period-modulated) **[FACT]**

| Parameter | Range (typical) | Notes |
|---|---|---|
| Infant/child mortality (<5) | ~20–30% of births in much of Eurasia; higher in crisis zones | flag uncertainty; urban worse than rural |
| Maternal mortality | ~1–2% per birth (cumulative 5–10% over reproductive life) | birth event = danger event |
| Life expectancy at birth | ~25–35 years | widely misread: skewed by child deaths |
| Life expectancy at 15 | ~45–60 more years | elders exist and matter |
| Urban vs rural | cities death-sinks until ~1400 (constant immigration to replace population) | gameplay: city = opportunity + attrition |

## 14.2 Disease catalogue (event tables with period gates) **[FACT]**

| Disease | Period/region gate | Character |
|---|---|---|
| **Plague (Yersinia pestis)** | Justinianic 541–549+ recurring to ~750 (Byzantine/med early edge); **Black Death 1347–1353** then 15+ recurrences to 1700s (beyond scope) | three forms: bubonic (40–60% fatal untreated, flag range), pneumonic (near-certain), septicemic; fleas on rats + human pneumonic chains; arrives via ports → spreads along trade routes |
| Smallpox | endemic everywhere; epidemics periodic | child-scarring; survivors immune (immunity trait!) |
| Measles / diphtheria / whooping cough | endemic childhood killers | village event waves |
| Tuberculosis ("consumption") | ubiquitous | slow; romanticized late; kills adults |
| Leprosy | epidemic peaks 11th–13th c. Europe; endemic elsewhere | social death + care institutions (leprosaria) **[FACT]**; player diagnosis arc: flight, community, or colony leadership |
| Malaria | Mediterranean littoral, lowlands SE Asia, Sahel wet zones | seasonal; "bad air" theory is their era's model — players' *characters* hold era beliefs regardless of player knowledge |
| Dysentery/"flux" | armies, sieges, camps | the soldier's true enemy |
| Ergotism ("St Anthony's fire") | rye regions, wet years | hallucinations → "dance mania" events (contested etiology — flag) **[FACT]**; grain inspection gameplay |
| Typhus | late period, crowded conditions | prisons, ships |
| Influenza | periodic pandemics | 1357 etc. waves |
| **Famine diseases** | any famine: typhoid-ish, dysentery, dropsy (edema from protein starvation) | famine → death spiral events |
| Scurvy | winter/sea | seasonal trait |
| Goiter | iodine-poor mountains | regional cosmetic/health trait |
| Veterinary murrain | cattle/sheep plagues (1315–22 sheep panzootic England) **[FACT]** | wealth-destroyer for pastoralists |

## 14.3 Medical system (what "healthcare" actually is)

- **Practitioners:** physicians (university/madrasa-trained; rare; expensive; theory-bound: humoralism), surgeons (guild-trained; barbers — battlefield specialists), midwives (the real maternity experts; licensed in some towns), herbalists/wise-women, monks (infirmarians; prayer + nursing), temple healers, bone-setters, tooth-drawers (fairs!), plague doctors (late; theatrical; marginal).
- **What medicine can do (honest mechanical caps):** set bones, lance abscesses, deliver babies (with real skill), amputate (death-risky), nursing care (biggest actual benefit: food, warmth, cleanliness), regime/diet advice, quarantine (genuinely effective — Ragusa 1377, Venice lazaretto system; implement as player-visible action with real plague-mitigation effect) **[FACT]**.
- **What medicine cannot do:** antibiotics (0), germ theory (era belief: miasma, humors, divine will), anesthesia beyond alcohol/opium-datura-poppy preparations (soporific sponge — real recipe, unreliable) **[FACT]**.
- **Faith healing:** pilgrimage cures (shrines with reputations — real referral networks), relic-touch (monarch's touch for scrofula in France/England — royal ritual) **[FACT]**; mechanically: comfort + placebo-modulated real small effects, plus piety/social effects.
- **Hospitals:** monastic infirmaries (Europe), bimaristan (Islamic world: Cairo's al-Mansuri — still standing; free treatment, medical school attached) **[FACT]**, Chinese public pharmacies (Song state medicine — *huimin yaoju* — flag as notable), leprosaria. Access-gated by location/wealth/faith.

## 14.4 Environmental & disaster events

- **Weather/climate:** medieval warm period c. 950–1250 (vineyards in England — flag) → Little Ice Age onset c. 1300 (glacier advances, crop failures) **[FACT]**; monsoon failure (India 1340s, Angkor drought cycles per tree-ring data **[FACT]**); Nile flood failure (Egypt famines); Yellow River floods/course changes (1048 catastrophe — flag); drought (Sahel cycles).
- **Earthquakes:** 1117 Verona; 1138 Aleppo (contested death toll — flag); 1293 Kamakura; 1456 Naples; Constantinople seismic risk.
- **Volcanic:** 1257 Samalas (Indonesia) — global cooling, famine fingerprints 1258–60 **[FACT]** (connect to Mongol-era hardships); 1341? (lesser); 1450s Kuwae (debated).
- **Fire:** wooden towns burn (e.g., 1087 London, 1174 Canterbury cathedral, 1428 Barcelona — representative **[FACT]**); implement as recurring urban hazard + water-bucket community minigame (bucket chains are real and dramatic).
- **War-driven famine:** chevauchée, siege (Acre 1291 queues; Constantinople 1453 starvation), foraging armies.
- **Storms at sea:** shipwreck tables; kamikaze events (1274/1281) as divine-wind miracles for Japan players.

## 14.5 Sanitation & the texture of daily survival

- Water: wells (privilege of towns), rivers (everyone downstream of someone), springs (monastery-owned — access politics!), aqueducts (only Rome's ruins and a few cities — Constantinople's still runs **[FACT]**), rain cisterns (Mediterranean), tea-boiling (China — genuinely protective!).
- Waste: cesspits (urban nightsoil economy — gong farmers of China/Japan as real occupation — respectful implementation), tanners at river-edges (pollution complaints documented in Paris — court cases exist) **[FACT]**.
- Food preservation: salting, smoking, drying (stockfish!), fermenting (sauerkraut, miso, fish sauce), winter ice-pits (elite); **spring hunger gap (May–June) as recurring peasant crisis window** — the lean months before harvest.
- Clothing/heat: one set of clothes (wedding = wardrobe event), shared beds, hay-box sleeping; winter-kill for the poor (excess winter mortality documented) **[FACT]**.

## 14.6 Translating into mechanics without bloat

1. **Health = Vitality + conditions list** (not a dozen micromanaged bars). Conditions: Wounded (healing/possible infection), Ailing (seasonal), Chronic (TB, blindness, lameness), Pregnant, Starving.
2. **Disease events roll on region-tables** with clear gates (plague only post-1347 in Europe; smallpox anywhere; ergotism only rye zones wet years).
3. **Death rolls are consequential, not constant:** crisis periods (famine/plague/siege) raise death-pressure visibly via world-state warnings ("the flux is in the next parish").
4. **Player agency is real but bounded:** quarantine, flight to the country (the classic aristocratic plague response — flag as class privilege), clean-water choices, food-stock choices, nursing choices, shrine pilgrimage (social + placebo), physician hire (expensive, dicey), midwife hire (genuinely good odds).
5. **Grief is systemic, not cosmetic:** family members die on schedule-era rates; the game's memory systems (memorial masses, ancestor rites, griot naming) convert loss into story and legacy stats.

---

# 15. HISTORICAL EVENTS (structured catalogue)

> **[MECHANIC]** Schema: `Event {name, dateRange, location, cause, outcome, people[], affectedGroups[], playerRelevance, involvement[], altOutcomes[], longTermConsequences[]}`. Tiering: **Global** (affects world-state everywhere), **Regional** (polity-shaking), **Local** (the player's county). Implement Regional+Local in MVP; Global tiers listed for completeness.

## 15.1 Background events (engine context, mostly not directly playable)

| Event | Date/Location | Cause→Outcome | Player relevance |
|---|---|---|---|
| Rise of Islam; conquests | 622–750, Arabia→West Asia/N.Africa/Iberia | tribal unification under revelation→the great 8th-century religio-political map redraw | regional default states; conversion timelines |
| Carolingian empire & division | 800/843, Francia | Charlemagne's coronation→Verdun tripartition = France/Germany/Italy embryos | polity boundaries 843+; imperial idea (HRE, later) |
| Iconoclasm controversy | 726–787/843, Byzantium | theological/political struggle→icons restored 843 (Orthodoxy's "Triumph") | Byzantine religious politics; art events |
| Khazar conversion | c. 860–890, steppe | state Judaism→buffer power; Rus' destruction of Khazaria 960s | Silk Road node politics early |
| Ghana's golden centuries | c. 300–1100, Sahel | gold-for-salt trade→first great Sahel empire | background to Mali starts |
| Srivijaya's thalassocracy | 7th–13th c., SE Asia | strait control→maritime trade empire | SE Asia trade layer |
| Viking expansion | 793–c.1050, North Atlantic→Russia | ship tech + population pressure→raiding, settling, trade (Varangian route to Constantinople; Volga route to Baghdad) | Scandinavian starts; travel events; Varangian career |

## 15.2 Regional/major events (full schema examples — MVP+)

### E-01 An Lushan Rebellion
- **Dates:** 755–763 | **Location:** Tang China (Chang'an, Luoyang, north)
- **Cause:** frontier general's coup→ dynastic near-death; **Outcome:** Tang survives but decentralized; population registers collapse (demographic catastrophe — scale debated, census 53m→17m is registration artifact + real death, flag **[FACT]**)
- **People:** An Lushan, Tang Xuanzong, Yang Guifei (court tragedy — executed at Mawei, flag as narrative), Guo Ziyi
- **Affected:** everyone in north China; **Player relevance:** refugee events, flight south (the southward shift of China's economy begins)
- **Involvement:** flee/serve as porter/loot-or-protect choices; **Alt outcomes (divergence-gated):** rebel victory (vast divergence, High tier), faster suppression (Medium)
- **Long-term:** southern China's rise; militarized frontier governors (jiedushi) → Five Dynasties chaos

### E-02 Great Schism of 1054 (and its buildup)
- **Dates:** 1054 (decree) | **Location:** Rome/Constantinople
- **Cause:** filioque, papal primacy, liturgy, politics→mutual excommunications **[FACT]**
- **Outcome:** permanent Latin/Greek split — shapes Balkans/Rus' forever
- **Player relevance:** marriage/ecclesiastical event flavor; crusade-era tension; Orthodox players' Latin interactions
- **Alt outcomes:** reconciliation synods (low probability, High-tier divergence)

### E-03 Battle of Hastings & Norman Conquest
- **Dates:** 1066 | **Location:** England (Hastings; then submission of England)
- **Cause:** Edward's childless death; Harold's coronation; William's claim (oath story — flag as Norman propaganda claim) **[FACT]**; Harald Hardrada's parallel invasion (Stamford Bridge)
- **Outcome:** Norman aristocracy replaces English; Domesday survey 1086 (state-reach landmark); castles everywhere; English-French diglossia for 300 years
- **People:** William I, Harold Godwinson, Harald Hardrada, Edith Swan-neck (search narrative), Odo of Bayeux
- **Player relevance:** English starts 1067+ live under conquest regime: new landlords, forest laws, castle-building corvée, murdrum fines (kill a Norman = huge fine → legal discrimination) **[FACT]**
- **Involvement:** fight at Hastings (on either side — pre-birth impossible unless born ≥1049 adult), land-forfeiture claim events, resistance (Hereward the Wake arcs, flag legend-fact blend)
- **Alt outcomes:** Harold wins (High-tier divergence: no Norman England → no Angevin empire; English culture unbroken); Hardrada wins (Medium)

### E-04 First Crusade
- **Dates:** 1095 (Clermont call) – 1099 (Jerusalem taken) | **Location:** France→Anatolia→Jerusalem
- **Cause:** Byzantine appeal + Urban II's indulgence offer→mass movement: princes' expedition + People's Crusade (destroyed 1096) **[FACT]**
- **Outcome:** four crusader states (Jerusalem, Antioch, Edessa, Tripoli); massacre of Jerusalem's inhabitants (documented by both sides' sources — handle soberly) **[FACT]**; Rhineland pogroms en route (flag: crusade's shadow)
- **People:** Bohemond, Godfrey of Bouillon, Raymond of Toulouse, Alexios I (canny host), Pope Urban II
- **Player relevance:** knight-vow events; family legacy ("a crusader grandfather"); relic-return economy; peasant view: taxation + absence + rumors
- **Involvement:** take the cross (vow mechanic, indulgence + debt + risk), stay and manage the estate, join the People's Crusade (disaster track)
- **Alt outcomes:** failure at Antioch/Nicaea (Medium: no Outremer, different Byzantine recovery)

### E-05 Fourth Crusade
- **Dates:** 1202–1204 | **Location:** Zara→Constantinople
- **Cause:** Venice's debt leverage→diverted expedition→sack of the greatest Christian city **[FACT]**
- **Outcome:** Latin Empire (1204–61); Byzantine exile states (Nicaea, Epirus, Trebizond); permanent East-West poison
- **Player relevance:** Byzantine players: catastrophe arc (refugee, ransomed noble, city under Latin rule); Venetian players: spoils (the bronze horses, the city quarters)
- **Alt outcomes:** the original Egypt plan succeeds (High divergence: no Latin Empire; Venice different)

### E-06 Las Navas de Tolosa
- **Dates:** 1212 | **Location:** Iberia
- **Cause:** Almohad threat after Alarcos 1195; pan-Iberian crusade coalition (Castile, Aragon, Navarre + volunteers) **[FACT]**
- **Outcome:** Almohad collapse accelerates → only Granada remains by 1250; Iberian Christianity's confidence century
- **Player relevance:** Iberian frontier resets; repopulation charters multiply (peasant opportunity wave)

### E-07 Mongol Conquests (the storm)
- **Dates:** 1206 (temüjin elected Genghis) – 1260s consolidation | **Location:** steppe→China→Islam→Europe edges
- **Cause:** steppe unification + subordination-or-massacre doctrine + horse-archery supremacy + meritocratic generalship (subedei!) **[FACT]**
- **Outcome:** largest contiguous land empire ever; Baghdad 1258 (caliph executed — shattering symbolic event); Rus' tributary (240 years); Khwarezmia annihilated; Ain Jalut 1260 stops westward drive **[FACT]**
- **People:** Genghis Khan, Ögedei, Batu, Hülegü, Subedei; Jalal al-Din (resistance epic); scholars dying at Baghdad (Nasir al-Din Tusi survives → Maragha observatory)
- **Player relevance:** by region: Rus' player (tribute, census, conscription — the yoke); Islamic-world player (flight/siege/refugee); Chinese player (war descends 1235–79); steppe player (golden opportunity); Eastern European player (raids 1241 — Hungary/Poland; Western Europe spared by Ögedei's death, flag historiographical debate) **[FACT]**
- **Involvement:** hide grain/flee/surrender-negotiate (surrender often spared tribute status; resistance risked massacre — real mechanical choice with real historical odds); join the tumens (steppe career)
- **Alt outcomes:** Ögedei lives → Europe campaign (High); Song holds the Yangzi longer (Medium); no Ain Jalut stop → Mamluk collapse (High)
- **Long-term:** Pax Mongolica opens Eurasia (Marco Polo route), plague highways later; Muscovite rise as tax-collectors; "Tatar yoke" Russian memory

### E-08 Fall of the Southern Song
- **Dates:** 1271 (Yuan proclaimed) / 1275–79 (conquest) | **Location:** Hangzhou→Yamen (1279)
- **Cause:** Mongol unification + Song structural weakness; **Outcome:** first full conquest of China by non-Han dynasty; loyalist suicides (Lu Xiufu leaps with the boy emperor — potent narrative, handle respectfully) **[FACT]**
- **Player relevance:** Chinese players of the era live the end; examination suspended (restored 1315 with quotas — career gate change!); four-class legal hierarchy **[FACT]**
- **Alt outcomes:** Southern Song endures (High: requires divergent Mongol civil war + Song reform — costly path)

### E-09 Great Famine
- **Dates:** 1315–1317 (after-effects to 1322) | **Location:** Northern Europe (worst: England, Flanders, Germany, Scandinavia)
- **Cause:** incessant rain (three rotten harvests) + crop diseases + war disruption **[FACT]**
- **Outcome:** 5–15% population loss in worst zones (flag range); crime waves; cannibalism reports (chronicle claims — mark as reported) **[FACT]**; governments learn granary strategy slowly
- **Player relevance:** the era's harshest peasant survival gauntlet: eat seed grain? sell children? (documented desperation sales — dark but real; implement as grim event choice with long shadow) banditry? migration?
- **Alt outcomes:** good harvest 1316 (Low-tier local mercy)

### E-10 Black Death
- **Dates:** 1347 (Sicily/Marseille) – 1353 (Iceland); recurrences to 1400s | **Location:** all Europe, Islamic world, (earlier waves in China/India — debated origins, flag) **[FACT]**
- **Cause:** plague ecology (reservoirs in marmots; flea vectors) + Mongol-era trade integration + port entry
- **Outcome:** 30–60% mortality in Europe across 1347–53 (flag range by region; cities worst); Islamic world comparable losses (Egypt/Syria hard) **[FACT]**; flagellants, pogroms (Strasbourg 1349 — entire Jewish community burned), quarantine invention (Ragusa 1377), labor scarcity → serfdom's western collapse → social revolt (see E-11) **[FACT]**
- **People:** Boccaccio (eyewitness literature), Ibn Battuta's world shrinking, the Flagellant processions, Guy de Chauliac (Avignon physician-survivor)
- **Player relevance:** **the era's defining survival event.** All players in range face: flee/stay/quarantine/nursing choices; scapegoat-mob choices (resist or join — moral weight, legacy impacts); labor-law aftermath (Statute of Labourers 1351 — draconian wage caps → revolt fuel) **[FACT]**
- **Involvement:** physician/nurse heroics; priest administering last rites; quarantine officer; gravedigger (documented high-wage crisis occupation); flagellant joiner; pogrom resistor or — shameful option — participant (game tracks this in legacy)
- **Alt outcomes:** **anchor policy: the plague OCCURS (historical anchor)**; divergence affects *local severity and response only* (e.g., a player-led quarantine saves a town — Personal→Regional tier); **exception:** a very high-tier player (physician network + state power) might suppress a regional recurrence (Historical tier, huge cost)
- **Long-term:** labor value ↑, land value ↓ (aristocratic squeeze), piety shocks (mysticism, anti-clericalism), end-of-world expectations (Joachimite fervor), art's danse macabre

### E-11 The English Rising (1381) & Jacquerie (1358)
- **Dates:** 1358 (France) / 1381 (England) | **Location:** Île-de-France; Kent/Essex→London
- **Cause:** post-plague labor repression (statutes) + war taxes (France: routier terror; England: poll taxes 1377/1379/1381) **[FACT]**
- **Outcome:** rebels kill officials (Simon Sudbury archbishop), burn records (manorial rolls — debt cancellation attempt! **[FACT]**), occupy London briefly; Richard II's promises, then mass repressions; Wat Tyler killed at Smithfield by William Walworth (flagged hero-myth)
- **People:** Wat Tyler (ashen name — origins contested, flag), John Ball (preacher: "When Adam delved and Eve span…" — the era's equality slogan) **[FACT]**, King Richard II (15 years old, facing them!), Jean Froissart (chronicler source, flag bias)
- **Player relevance:** peasants everywhere feel the tax pressure; London apprentices join; clerks drafted to write rebel letters (real literacy hire!)
- **Involvement:** join march (ideology vs. violence events), hide the rent-roll, negotiate with rebels, defend the manor
- **Alt outcomes:** rebel negotiation holds (High: Magna Carta-for-peasants constitutional divergence); French variant: capture of the dauphin? (Medium)

### E-12 Hundred Years' War (selected beats)
- **Dates:** 1337–1453 | **Location:** France + seas
- **Cause:** Edward III's French claim (via Isabella) + Gascony/Flanders economics → dynastic war **[FACT]**
- **Beats:** Crécy 1346 (English longbow + dismounted men-at-arms win; blind King John of Bohemia dies — chivalry's elegy), Poitiers 1356 (King John II captured — ransom economy at royal scale), Agincourt 1415 (Henry V; mud, stakes, archery), Joan of Arc 1429–31 (visions, Orléans relief, coronation at Reims, capture, Rouen trial — the era's most documented trial) **[FACT]**, gunpowder finale: Formigny 1450, Castillon 1453 (cannon decide)
- **Player relevance:** English: archer musters (village quotas!), wool-tax grumbling; French: chevauchée terror, brigandage, Jacquerie; both: post-war demobilized men = bandit waves
- **Involvement:** muster (conscription), archer career (wages + ransom shares), Joan-adjacent arcs (her soldiers: ordinary men at extraordinary hinge)

### E-13 Fall of Constantinople
- **Dates:** 1453 | **Location:** Constantinople
- **Cause:** Ottoman century-long advance + Mehmed II's great cannon (Hungarian founder Urban Orban) **[FACT]**; Byzantine hollow-state (4,000 defenders vs 80,000; flag numbers range) **[FACT]**
- **Outcome:** 1,123 years of Rome-in-the-East end; Greek scholars westward (Italian Renaissance precondition — flag as scholarly thesis, debated); Russia's "Third Rome" ideology
- **Player relevance:** the era's great end-date event; Byzantine players: final siege arc (last emperor Constantine XI dies fighting — memorialized); Genoese/Venetian: the relief fleet gamble
- **Alt outcomes:** Hungary sends aid (Medium); Orban's cannon fails (Medium — the walls hold a decade longer)

### E-14 The Viking Storm (era-opening beat)
- **Dates:** 793 (Lindisfarne) – 1066 (Stamford Bridge/Hastings) | **Location:** coasts & rivers of Europe; Atlantic isles
- **Cause:** ship tech (longship) + silver hunger (Islamic dirhams in hoards prove the eastern pull) **[FACT]**
- **Outcome:** Danelaw England, Normandy (911), Ireland's towns (Dublin 841), Iceland (930 Althing), Greenland (985), Vinland (~1000); then assimilation: conversion, kingdoms, the Varangian Guard pipeline
- **Player relevance:** Scandinavian starts are *inside* this arc; victims' starts (English coastal villages) face raid events; settlers' starts face Greenland's slow doom
- **Alt outcomes:** unified Norse kingdom holds England (Medium); Vinland colony endures (High — needs several lucky chains)

### E-15 Mansa Musa's Hajj
- **Dates:** 1324–25 | **Location:** Mali→Egypt→Mecca
- **Cause:** royal duty + prestige politics; **Outcome:** Cairo gold price depressed for years (contemporary reports, flag exaggeration risk in later tellings) **[FACT]**; Timbuktu/Sankore rise as scholarly magnet; Mali on the map (1375 Catalan Atlas!)
- **Player relevance:** Sahel players: the caravan passes (wage event, pilgrimage slots, griot commissions); Egypt players: gold glut price events
- **Involvement:** join caravan (porter to scholar slots), sell supplies at spike prices
- **Alt outcomes:** caravan routes shift (Low-Medium)

### E-16 Rise of Mali / Fall of Ghana transition
- **Dates:** c. 1076 (Ghana sacked by Almoravids — contested: certainly weakened, "sack" debated) / c. 1235 (Sundiata wins at Krina) **[FACT]** | **Location:** Niger bend
- **Outcome:** Mande hegemony; griot-epic foundation (Sundiata = *epic hero* — the world's great medieval epic traditions include West Africa's, a deliberate design inclusivity)
- **Player relevance:** Sahel start families carry Ghana/Mali loyalties; smiths/griots get epic material

### E-17 Heian→Kamakura transition
- **Dates:** 1156 (Hōgen rebellion) – 1185 (Dan-no-ura) – 1192 (bakufu) | **Location:** Japan
- **Cause:** Taira/Minamoto militarization of court politics; **Outcome:** warrior government; court culture preserved in amber (still the aesthetic summit — *Genji*, *Pillow Book*); jitō/shugo network plants warrior administration nationwide
- **Player relevance:** Japanese starts live the shift; Kyoto aristocrats become beautiful antiques (income-less prestige — a fascinating *declining class* simulation); Kyushu landholders get jitō appointments (new gentry!)
- **Alt outcomes:** Taira win (Medium); court restoration succeeds at Jōkyū (High — requires divergent Hōjō politics)

### E-18 Mongol invasions of Japan
- **Dates:** 1274, 1281 | **Location:** Tsushima/Iki→Hakata Bay
- **Cause:** Yuan demand for submission (the letter: "…if you do not submit…" — extant document **[FACT]**); **Outcome:** invasions destroyed by storms (kamikaze, "divine wind") + coastal walls + fierce defense; **no rewards granted to warriors (no land conquered!) → bakufu fiscal crisis → warrior discontent → 1333 fall of Kamakura** **[FACT]** — a textbook cause-chain the game must model end-to-end
- **Player relevance:** Kyushu players: muster, wall-building corvée, battle; all Japan: the no-reward aftermath (gokenin impoverishment events)

### E-19 Angkor's Long Drought & Fall
- **Dates:** drought cycles c. 1300–1500 (tree-ring data; severity debated); 1431 sack by Ayutthaya **[FACT]**
- **Outcome:** the greatest city of its day empties (population disperses — not destroyed, *abandoned*: a different death, great design lesson); Theravada Buddhist shift in the region
- **Player relevance:** Khmer players: hydraulic maintenance choices vs. faith-shift choices; later: the quiet emptying (melancholy end-game arc — the *anti-catastrophe*: your world fades rather than burns)

### E-20 Delhi Sultanate zenith & fragmentation
- **Dates:** 1290 (Khalji) – 1398 (Timur sacks Delhi) – 1451 (Lodi; regional sultanates) | **Location:** North India
- **People:** Alauddin Khalji (market control experiments — price regulation wars!), Muhammad bin Tughlaq (the brilliant-failure archetype: capital shift to Daulatabad, token currency — real experiments, real failures **[FACT]**), Ibn Battuta (visits, serves as qadi, flees), Timur (massacre at Delhi — "the pyramids of skulls" tradition, flag as chronicler trope but violence real) **[FACT]**
- **Player relevance:** Indian starts: tax (kharaj on non-Muslims — religious-economic identity tension), Sufi conversion missions (Chishti khanqahs = social mobility + faith), Deccan campaigns (military lottery)
- **Alt outcomes:** Daulatabad capital sticks (Medium: south-India-centered divergence); Tughlaq currency succeeds (Medium)

### E-21 Norse Greenland & the Western Settlement's End
- **Dates:** 985 founding – c. 1350 Western Settlement abandoned – c. 1450 all Norse gone **[FACT]** | **Location:** Greenland
- **Cause:** Little Ice Age + marginal pasture + trade-route shifts (ivory outcompeted by African elephant ivory) + no Inuit integration (documented absence of adaptation — contested by scholars, flag) **[FACT]**
- **Player relevance:** the era's great *slow failure* simulation: no villain, just compounding wrongness — design it as decade-scale decline events
- **Alt outcomes:** Inuit alliance strategy succeeds (Medium-Historical for the colony's survival — requires major behavior change = the game's lesson)

### E-22 The Plague of Justinian (era-boundary opener)
- **Dates:** 541–549, recurrences to ~750 | **Location:** Mediterranean world, Constantinople core
- **Outcome:** ends antique Mediterranean integration; arguably shapes the early medieval world
- **Player relevance:** early-era Byzantine starts carry its memory; **anchor: occurred**

### E-23 Christianization of Scandinavia & Saxony
- **Dates:** c. 722 (Boniface felling the Donar oak, tradition) – c. 1150 (Uppsala's last temple) **[FACT]** | **Location:** northern Europe
- **Cause:** missionary empires (Anglo-Saxon, Frankish) + kings' baptism as sovereignty strategy (Harald Bluetooth's Jelling stone: "he made the Danes Christian" — the conversion selfie!) **[FACT]**
- **Player relevance:** pagan-player defense/resistance arcs; godparent-politics; the thing-debate episodes (Iceland's conversion decision 999/1000 — decided peacefully by law-speaker's arbitration, flag narrative details) **[FACT]**

### E-24 Investiture Contest & Concordat of Worms
- **Dates:** 1075–1122 | **Location:** Germany/Italy
- **Cause:** who appoints bishops (Henry IV vs Gregory VII) → Road to Canossa 1077 (the kneeling-in-snow image — flag hagiographic polish) **[FACT]**; **Outcome:** Worms compromise (1122): regalia vs. spiritualia split
- **Player relevance:** German starts live in civil war (Saxon revolt); bishops are political players — a priest-player can be a pawn or a kingmaker

### E-25 Rise of the Mali successor: Songhai & Portuguese coastal contact
- **Dates:** 1468 (Sunni Ali takes Timbuktu) – 1480s (Dias rounds Africa's cape — boundary) **[FACT]**
- **Player relevance:** Sahel end-game: river-vs-desert power politics; coast: first direct European traders (Elmina 1482) — the next era's door, shown here as horizon event

## 15.3 Local event archetypes (template-driven, not fixed list)

- **Manor-level:** mill dam breaks (water rights war); harvest shortfall assessment dispute; poaching arrest in royal forest; priest absentee → chapel decay; new reeve election (bribery opportunities).
- **Town-level:** guild strike (fullers vs mill-owners); pogrom rumor wave; commune charter petition; mayor election riot; bridge toll privatization; confraternity feast planning (status micro-game).
- **Frontier-level:** raid warning (bell-tower duty), hostage negotiation (fosterage customs), land charter auction.
- **Village Asia:** dike maintenance corvée allocation; temple festival funding round; samurai process passage (requisition etiquette); examination candidate's send-off feast (village investment event).

---

# 16. HISTORICAL FIGURES

> **[MECHANIC]** Rules: (1) figures exist in the world by date+location; (2) player interaction requires **proximity + plausibility** (rank, city, event); (3) most figures are **world-state context**, not NPC buddies; (4) fixed-behavior anchors listed per figure — divergence never trivially rewrites their personality; (5) total: MVP ships 6–8 figures.

## 16.1 Figure catalogue (representative; extend per region)

### F-01 Charlemagne (d. 814)
- Dates 748–814; Aachen/Frankia; King of Franks then Emperor. **Role:** era-opener; state-builder (missi dominici, silver coinage). **Faction:** Carolingian dynasty. **Fixed:** dies 814 (anchor, before most play); empire divided 843 (anchor). **Interaction:** only via 800–814 starts in Frankia (he's the employer/warlord). **Player-changeable:** nothing personal — too high; his court patronage is the door.

### F-02 Alfred the Great (849–899)
- Wessex/England; king-scholar; survives Viking onslaught (878 Edington), rebuilds with burhs (fortified towns — literal city-builder system!). **Player relevance:** English player in Wessex 870s: the Great Heathen Army arc. **Fixed:** dies 899. **Changeable:** his law code's reach (local), burh economy success (local-regional).

### F-03 William the Conqueror (c. 1028–1087)
- Normandy→England; bastard-duke to king. **Anchor:** wins Hastings 1066 (divergence requires player-scale impossible for ordinary starts — treat as near-locked). **Interaction:** post-1066 England — he's the new sovereign (domain events: castle works, forest laws, murdrum). **Fixed:** harsh, administrative, lands-obsessed (Domesday). **Changeable:** nothing for players; his policies' local severity is event-modulated.

### F-04 Eleanor of Aquitaine (c. 1122–1204)
- France→England; duchess, queen of France then England, crusader, mother of Plantagenet kings; patron of troubadours (courtly love culture engine). **Player relevance:** Aquitaine court starts; Angevin political arcs. **Fixed:** two marriages, outlives Henry II, dies 1204. **Changeable:** her court's cultural reach (patronage network tier).

### F-05 Salah al-Din (Saladin) (1137–1193)
- Tikrit→Damascus→Cairo; uniter of Egypt-Syria; chivalry myth vs realpolitik (both — flag the mythmaking). **Fixed:** takes Jerusalem 1187 (anchor); dies 1193 Damascus (anchor). **Player relevance:** crusade-era Syria/Egypt: his armies, his court, his truces. **Changeable:** Acre 1191 outcomes' local severity (Regional tier); his mercy-execution record (documented executions after Hattin — handle factually).

### F-06 Genghis Khan (c. 1162–1227)
- Steppe; world-bender. **Anchor:** unification 1206; dies 1227 (on campaign vs Tanguts — anchor). **Interaction:** steppe start only (and even then: elevation through merit is the real path — his system promotes the capable, historically!). **Fixed:** the yassa code, terror doctrine, succession partition (Ögedei elected 1229 — anchor). **Changeable:** nothing at personal level; conquest *pathways* respond to player-region defenses (Regional tier).

### F-07 Mansa Musa (c. 1280–1337, r. c. 1312–1337)
- Mali; richest individual of the era (tradition). **Fixed:** hajj 1324–25 (anchor); Sankore endowment (anchor). **Player relevance:** Sahel golden generation: his caravan is the event of a lifetime. **Changeable:** caravan route/stopovers (Low), Timbuktu patronage scale (Medium if player is his official!).

### F-08 Murasaki Shikibu (c. 973–c. 1014)
- Heian court; lady-in-waiting; *The Tale of Genji*. **Player relevance:** female court start — the era's highest literary career. **Fixed:** serves Empress Shōshi; writes Genji (anchor as achievement). **Changeable:** her salon's reach, the education of girls around her (Personal-Local).

### F-09 Minamoto no Yoritomo (1147–1199)
- Kamakura; founder-shogun. **Fixed:** wins Genpei War; appointed shogun 1192; dies 1199 (fall from horse — mundane, humanizing). **Changeable:** his gokenin settlement patterns (Regional tier).

### F-10 Su Shi (Su Dongpo) (1037–1101)
- Song China; poet-statesman; examination star → factional exile (the literati emotional cycle: honor→exile→poetry). **Player relevance:** Song scholar-path ideal; his exile arcs model the demotion mechanic. **Fixed:** death 1101. **Changeable:** nothing (beloved figure; keep his poetry real).

### F-11 Zhu Xi (1130–1200)
- Song; Neo-Confucian synthesizer; commentaries become exam canon (Yuan 1315 adoption — the long fuse of his influence). **Player relevance:** examination students quote him; temples honor him (posthumous rehabilitation 1209+ — the scholar-politics of memory). **Fixed:** canon status (anchor).

### F-12 Ibn Sina (Avicenna) (980–1037)
- Bukhara→Isfahan→Hamadan; *Canon of Medicine*. **Fixed:** dies 1037; Canon translated to Latin (Gerard of Cremona) — anchor (European medicine drinks from his well for 500 years). **Player relevance:** physician-path aspiration; his casebook is a real text (use his actual clinical anecdotes as event content!).

### F-13 Ibn Rushd (Averroës) (1126–1198)
- Córdoba; qadi, physician, commentator on Aristotle ("the Commentator" in Latin Europe). **Fixed:** Almohad patronage then exile (politics of intellect); dies Marrakesh 1198. **Player relevance:** Andalusian scholarly starts; Latin-translation arcs (his works banned-ish/burned in Paris 1210–77 (actually 1210 provincial ban; 1277 Condemnations are broader) — flag nuance) **[FACT]**.

### F-14 Maimonides (1138–1204)
- Córdoba→Feast→Egypt; physician to Saladin's court (tradition), *Mishneh Torah*, *Guide for the Perplexed*. **Fixed:** dies 1204 Fustat. **Player relevance:** dhimmi/jewish start in Egypt: he's the ceiling (physician-sage). **Changeable:** nothing.

### F-15 Hildegard of Bingen (1098–1179)
- Rhineland; abbess, visionary, composer, naturalist (*Physica*), correspondent of popes/emperors. **Player relevance:** female monastic path ceiling; visionary-event mechanics (interpretation choices!). **Fixed:** dies 1179 (canonized 2012 — flag the 800-year gap as memory-system content).

### F-16 Francis of Assisi (1181/2–1226)
- Umbria; merchant's son → friar; receives stigmata 1224. **Fixed:** founds order 1209/10 (papal approval 1209/1210 flag); dies 1226. **Player relevance:** Italian town start: the friars arrive (mendicant shock to parish economics). **Changeable:** order's local reception.

### F-17 Thomas Aquinas (1225–1274)
- Italy/Paris; *Summa Theologiae*. **Fixed:** dies 1274 (Reggio, en route to Council of Lyons). **Player relevance:** university-path students sit at his lectures (Paris 1250s). **Changeable:** nothing.

### F-18 Joan of Arc (c. 1412–1431)
- Domrémy→Orléans→Rouen; peasant visionary → army commander → heretic's pyre → saint (1920). **Fixed:** hears voices (her testimony, anchor), lifts Orléans siege 1429 (anchor), captured Compiègne 1430, burned Rouen 1431 (anchor), rehabilitation retrial 1456 (anchor). **Player relevance:** the era's supreme *proximity* figure: her soldiers, her judges' clerks, the crowd at Rouen — ordinary players witness a hinge of history. **Changeable:** **controversial design call: her execution is locked** (it's the archetypal martyrdom; too radioactive to gamify) — but the *trial record's path to rehabilitation* can respond to player-document actions (a clerk preserving testimony = real divergence with real stakes).

### F-19 Marco Polo (1254–1324)
- Venice→Khanbaliq (Beijing); *The Book* (ghost-written in Genoese prison — flag authorship debate) **[FACT]**. **Player relevance:** Eurasian corridor travel events; his route is a travel-table with real stops. **Fixed:** returns 1295 (anchor); dies 1324.

### F-20 Ibn Battuta (1304–1369)
- Tangier→ everywhere; 73,000 miles (tradition, flag) — Mali, Delhi, China, Mali again; qadi under Delhi sultanate, dies Morocco. **Player relevance:** the era's travel-guide as NPC-encounter engine (meet him on the road! historically plausible across half the map). **Fixed:** his itinerary's rough arc. **Changeable:** nothing important (delight cameo, not pivot).

### F-21 Sundiata Keita (c. 1217–c. 1255)
- Mali; epic hero ("Lion King" ancestor of the Disney-ish name — flag); the griot Balla Fasséké (his griot, founder of the griot lineage office!) **[FACT]**. **Fixed:** victory at Krina c. 1235 (anchor, tradition-flavored). **Player relevance:** Sahel epic-generation starts. **Changeable:** epic's details vary by teller — *by design* (griot memory-system: the epic is the divergence ledger!).

### F-22 Kublai Khan (1215–1294)
- Mongolia→China; Great Khan + Yuan founder. **Fixed:** proclaims Yuan 1271; falls Hangzhou 1276; dies 1294. **Player relevance:** China end-game sovereign; Japan invasions (his letters, his fleets). **Changeable:** nothing personal; campaign paces respond to defense (Regional).

### F-23 Empresses/Queen-regnants cluster (design note)
- **Wu Zetian** is pre-era (d. 705) — exclude as figure, allow as memory. Within era: **Empress Matilda** (1102–1167, Anarchy claimant — playable political arc), **Tamara of Georgia** (r. 1184–1213, golden age), **Razia Sultan** (Delhi, r. 1236–40 — the sultanate's female ruler, defeated by nobles — a "what-if" anchor!), **Sei Shōnagon** (c. 966–1025, Heian rival-salon!), **Blanche of Castile** (regent of France — the regency mechanic embodied), **Margaret I of Denmark** (Kalmar Union architect, d. 1412).
- **Design rule:** female power exists in era-legal forms (regency, co-rule, household sovereignty, property, widow-management) — implement as first-class paths, not exceptions.

### F-24 Mehmed II (1432–1481)
- Edirne→Constantinople; "the Conqueror," lawgiver, poet. **Fixed:** takes Constantinople 1453 (anchor). **Player relevance:** Balkan/Byzantine end-game. **Changeable:** post-conquest settlement terms (Regional).

### F-25 Timur (Tamerlane) (1336–1405)
- Samarkand; steppe-Islamic hybrid conqueror; terror strategy (Isfahan 70k skulls tradition, flag chronicler inflation but massacres real) **[FACT]**. **Fixed:** Ankara 1402 (crushes Ottoman Bayezid — the era's great what-if hinge!), dies Otrar 1405. **Player relevance:** Persianate world end-game catastrophe arc. **Changeable:** **design call: Ankara locked** (without it the Ottoman trajectory — and thus the era's end — unravels); his *route's* victims can vary (Regional mercy/suppression choices for local actors).

## 16.2 Interaction plausibility matrix **[MECHANIC]**

| Player tier | Can interact with |
|---|---|
| Peasant/artisan | local officials, priests, guild masters, tax collectors, (rare) famous travelers-in-transit (Ibn Battuta rule: plausible if in his path) |
| Clergy/scholar | bishops, qadis, university masters, (rarely) top figures via petitions |
| Merchant | patricians, court factors, Hanse aldermen, Karimi syndics |
| Warrior retainer | lords, captains, (battle-proximity) kings |
| Court official | ministers, (office-gated) rulers, royal family |
| Ruler-adjacent | figures directly (and then the divergence rules bite hardest) |

---

# 17. RANDOM EVENTS

> **[MECHANIC]** Design goals: (1) historically grounded — every event has a source-anchored archetype; (2) plausibility-gated — weighted by region, sub-period, class, season, and current world-state; (3) consequential — events feed choice nodes; (4) non-gratuitous — hardship is real, but the game does not wallow.

## 17.1 Category taxonomy (with era-anchored examples)

### A. Family & household
- Birth (with survival rolls); death of kin (disease/accident/childbirth); marriage proposal arrives (matchmaking via kin); inheritance dispute (will challenge — church court); step-parent arrival; sibling takes the cloth; fosterage offer; adoption of orphans (real kin practice); family feud flare-up (insult at market → feud ladder); runaway daughter/son events; care of aged parent (the bedridden-years arc — emotionally central to the era).

### B. Economic
- Harvest roll (weather table: wet year/dry year/normal); livestock murrain; miller dispute (seigneurial monopoly — bake your own bread?); market day price shock; customer defaults; workshop fire; guild masterpiece judged (promotion gate); apprenticeship contract dispute (runaway apprentice is a lawsuit genre) **[FACT]**; inheritance windfall; coin debasement notice (ledger shock); toll increase on the bridge/river; new tax announcement (tallage, hearth tax, gabelle — the salt tax!); landlord raises entry fines (merchet hike → village tension); wage-labor offer at harvest (the season when cash enters peasant life).

### C. Weather & season
- Storm damage (roof, mill); early frost kills vines (wine-zone crisis); flood breaches dike (Yangzi/Angkor/Bangladesh-delta analogs); drought onset; unusual cold snap (Little Ice Age tail); haymaking rain-out; bee swarm departs (a real economic blow — wax/honey revenue); ship sailing-window closes (monsoon missed = winter stuck in port = expensive and dangerous).

### D. Disease & health
- Village fever wave ("the sweating sickness is in Ashby"); child develops rash (smallpox watch); flux (dysentery) at the manor; ergot year (rye zones — hallucination events, charity-court cases); leper at the village edge (alms vs. fear); pregnancy complications (midwife choice event); toothache → fair-time tooth-drawer (risky); rat-signs in the granary (plague precursor when 1347+).

### E. Accidents & travel
- Cart accident on the way to market; ford drowning; wolf/bear encounter (forest zones); shipwreck survival (sea paths); bandit toll demand (pay/ flee/ resist); river pirate encounter (Rhine/Weser genre); broken leg (bone-setter vs. surgeon choice); building collapse (cathedral scaffolds — real occupational risk); mill machinery accident (gearing is genuinely medieval-industrial-dangerous).

### F. Social conflict
- Poaching arrest (forest law!); assault charge (tavern brawl → ordeal/oath resolution); debt suit (court of piepowders at fairs — real institution) **[FACT]**; feud retaliation night-visit; rumor engine events (adultery whisper → honor crisis); sumptuary-law violation accusation (dressed too fine for your station); heresy whisper (dangerous: informer choice); pogrom rumor (as instigator's target or as bystander-resister); public penance assigned (scandal → church court).

### G. Opportunities
- Monastic talent-scout (bright child offered oblation); university letter (patron funds study); crusade vow offer (indulgence + risk); exam summons (Song); apprenticeship opening in a named master; patron's marriage alliance offer; merchant partnership offer (commenda — invest sea capital); relic discovery (genuine? fake? trade it where?); manuscript copy job (for the literate); pilgrimage convoy recruiting (safety in numbers, cost); tournament announcement (prize + risk); militia muster pay; frontier charter (free land in the marches — with the catch: military obligation).

### H. Political
- Muster summons (the lord's war becomes yours); tax assessor visit (hide the pig?); election of reeve/jurati (village politics); commune charter petition drive; lord dies → relief payment (inheritance tax: your holding's status reset under the heir); marriage of the lord's heir (festivities + levies); castle works corvée (build the lord's tower or pay scot); safe-conduct needed (war zone travel); hostage fosterage politics; royal progress passes through (the village on show day — provisioning demands + theft temptations).

### I. Religious
- Pilgrimage vow taken by a family member (escort/seek blessing); shrine rumor (miracle at the abbey — pilgrimage economy spike); relic-viewing day (indulgence offer); heretic preaching in the fields (report or listen?); friars arrive begging (mendicant shock); mosque/madrasa endowment scholarship; temple festival duty; ancestor-rite obligation (China — festival returns home or lose face); confession-scandal (priest knows the manor's secrets); conversion pressure event (dhimmi family, steppe missions, Sahel court Islam).

### J. Military
- Raid warning (beacon fires; flee to the castle or hide grain?); levy muster (equipment expectations by status); pay muster (mercenary contract signing); siege proximity (walls, price spiral, sortie volunteers); post-battle aftermath (ransom offers, loot sales, corpse-strip events — sober); veteran returns changed (drinking/vows/visions); enemy army passing (pay them not to burn? real practice: "fire geld" payments documented) **[FACT]**.

### K. Discovery & knowledge
- Washed-up cargo (beach finds law — "wreck" rights belong to the lord: legal event!); old coin hoard plowed up (treasure trove law: belongs to the crown — England's treasure trove doctrine is medieval-rooted) **[FACT]**; strange manuscript in the attic; foreign traveler teaches a technique (technology-transfer hooks); child shows prodigy gift (which path invests?); almanac prophecy year (Joachimite expectation spikes); comet sighting (omen events across cultures).

### L. Crime & punishment
- Theft accusation (hue and cry — the community pursuit duty!); outlawry declaration (saga-grade consequence); prison stint (gaol fees — you pay for your own keep! real system) **[FACT]**; branding/mutilation sentence; sanctuary flight (reach the church in 40 days logic — English law detail) **[FACT]**; execution attendance duty (public execution is communal theater — players may attend, refuse, or face a kin being executed); pardon sale (indulgence-adjacent pardons — real revenue system, flag abuse).

### M. Supernatural & folk belief (characters believe; engine is agnostic)
- Ghost at the crossroads (exorcism via priest costs money); saint's dream (shrine directive); fox spirit (East Asia — kitsune mischief; Korean/Chinese fox lore); jinn tale (Islamic world); witch neighbor suspicion (late era); fairy abduction explanation for missing persons (medieval explanation culture — the game models belief-effects, not adjudicating metaphysics); astrology consultation before marriage (court astrologers real jobs).

## 17.2 Randomness discipline

1. **Gate tables first, dice second:** every event passes `plausibility(region, date, class, season, worldState)`; impossible events (e.g., gunpowder accident in 900 England) are filtered out, not merely rare.
2. **World-state coupling:** war nearby → military event weight ↑; plague world-flag on → disease weight ↑ but also specific quarantine/opportunity events; post-harvest → marriage market events.
3. **Believability budget:** extraordinary events (miracles, prodigies) capped per lifetime — rarity is the point; a second miracle requires the first to have consequences (reputation becomes "the one the saint spoke to" — social reality forms around rare events).
4. **No meaningless filler:** every event must touch a stat, a relationship, a ledger, a choice, or a memory. If it can't, cut it.
5. **Tone calibration:** hardship events end with *agency* (a choice, a door, a person); triumph events carry *seeds* (envy, obligation, new expectations). This is what makes a life story, not a slot machine.

## 17.3 Event schema

```text
RandomEvent {
  id, category, title
  gates: {regions[], dateRange, classes[], seasons[], worldFlags[], probWeight}
  setupText (2nd person, era-voiced)
  choices: [ {text, requirements[], consequenceSet} ]   // 2–4 choices
  fallbackOutcome (if no choice applies — e.g., too poor to pay)
  tags: [disease, feud, faith, debt...]
}
```

---

# 18. CHOICE DESIGN

## 18.1 Consequence anatomy (every major choice should carry)

| Layer | Meaning | Example |
|---|---|---|
| Immediate | what happens now | pay the fine / lose the pig |
| Delayed | surfaces months-years later | the fine borrowed at interest → debt spiral; the spared poacher remembers |
| Hidden | player isn't told | the miller noticed which way you voted |
| Personal | stats/conditions | Vitality −, Piety + |
| Family | household ripple | sister's marriage negotiation damaged by your scandal |
| Social | network/town standing | guild blacklists; village reeve seat lost |
| Historical | divergence ledger | your quarantine saved a town → Regional divergence |

## 18.2 Choice archetypes (era-native)

1. **Obligation vs. survival:** the lord's muster vs. the harvest that needs you. (Family consequence + Historical: armies muster late if peasants don't come.)
2. **Faith vs. interest:** lend at interest? (Sin ledger vs. Wealth; usury = afterlife risk in-fiction.)
3. **Honor vs. safety:** avenge the insult (feud ladder) or swallow it (Honor −, safety +). Both cost — that's the design.
4. **Stay vs. go:** the frontier charter (opportunity + danger) vs. the ancestral plot (security + obligation).
5. **Confess vs. conceal:** the priest's seal vs. the lord's court (two legal systems — choose your forum strategically: historically people did).
6. **Voice vs. silence:** report the heretic/poacher/foreigner (safety, complicity) or not (risk, integrity).
7. **Education vs. labor:** send the bright son to the monastery (family prestige, lost labor) or keep him at the plough.
8. **The marriage question:** accept the good-match-with-bad-person vs. poor-match-with-good-person (the era's central household decision).
9. **The escape:** flee serfdom to the town (year-and-a-day), flee debt to the frontier, flee plague to the countryside — each escape resets the board and burns bridges.
10. **The vow:** crusade, pilgrimage, monastic profession — irreversible commitment arcs with preparation mechanics (debts settled, farewell feast, the vow itself as social contract).

## 18.3 Anti-patterns (forbidden)

- "You see a bird. What do you do?" (no stakes, no context).
- Choices with no cost (design rule: **every choice closes at least one door**).
- Modern options smuggled in (rights talk, individual self-fulfillment framing — characters pursue honor, soul, household, and livelihood; self-expression exists but in era forms: poetic fame, saintly reputation, filial duty well done).
- Symmetrical coin flips: the player should infer odds from *visible world-state* (the priest's wealth suggests tithe extraction power; the lord's debts suggest tallage coming).

## 18.4 Worked choice example (mini)

**Event:** The harvest is short by a third. The reeve assesses each holding's shortfall. Your cousin (reeve's clerk) hints your assessment could be "adjusted" if you lend him your ox for the week he works his brother-in-law's plot.
- **Accept:** Wealth + (fine avoided), cousin Bond +, Village Honor − (hidden: the miller's daughter saw), *delayed:* next year the reeve expects the arrangement again (dependency chain).
- **Refuse and pay:** Wealth −−, Honor +, cousin Bond −.
- **Refuse and fight the assessment at the manor court:** requires Learning ≥ 20 or a kinsman juror; success → standing +, reeve grudge (feud seed); failure → fine doubled + court costs.
- **Not eligible (too poor):** fallback — the lord's bailiff takes your best pig (heriot-adjacent seizure); the village notes your poverty (marriage market −).

---

# 19. HISTORICAL DIVERGENCE (core system)

## 19.1 Divergence levels

| Level | Name | Scope | Examples | Gate (who can do it) |
|---|---|---|---|---|
| L1 | Personal | own body/household | survive the plague; marry up; learn to read | anyone |
| L2 | Family | kin network across a generation | family rises from villeins to franklins; a daughter becomes an abbess; house accumulates three holdings | anyone, decades of play |
| L3 | Local | village/manor/town quarter | quarantine saves the parish; commune charter won; guild master dynasty founded; the village converts/stays pagan en masse | requires local office/influence + Network |
| L4 | Regional | county/sultanate-pocket/delta | a town spared plague recurrence becomes a refuge magnet; a frontier charter zone flourishes; a monastery's lands resist an expropriation | requires faction role (officeholder, great merchant, abbot, warlord) |
| L5 | National | polity direction | England keeps Normandy (Angevin consolidation); Mali adopts naval strategy; a regency holds against usurpation | requires court-level power + decades |
| L6 | Historical | era-defining outcomes | Hastings reversed; Baghdad spared; the Black Death regionally contained; the Mongols turned at the Danube | requires extraordinary confluence: high influence + skills + resources + luck + costs; **most era anchors locked against this** |
| L7 | Major Alternate Timeline | civilizational branches | no Mongol unification; a unified Scandinavia; an enduring Southern Song; a Reformation-free... (beyond scope) | effectively story-mode goals; flagged as post-MVP design space |

## 19.2 Core rules

1. **Anchors list (locked unless explicitly gated):** births/deaths of top figures; the *occurrence* of the Black Death, Mongol unification, rise of Islam (pre-era), fall of Constantinople (but not its *aftermath texture*), Hastings outcome (L6-locked for all but near-impossible chains), the major schisms' existence, the Song's fall (L5-gated: a century-long defense program by player-led factions could, in theory, alter its pace — flagged as epic-mode).
2. **Divergence requires leverage:** each level demands the corresponding influence tier, plus domain match (a physician influences plague outcomes; a griot influences epic memory; a bishop influences crusade preaching locally).
3. **Costs are real and era-shaped:** diverging costs money (bribes, armies, endowments), honor (rebellion stains), piety (defying God's anointed), and kin (reprisals fall on families). **No free rewrites.**
4. **Propagation lag:** local divergences propagate outward at communication speed (§13.2): a spared town attracts refugees (L3→L4 pressure over years); distant powers react in seasons-years.
5. **Historicity credit system:** the engine tracks "plausibility debt." Player-caused divergences must be *paid for* with diegetic resources; the higher the level, the more the world resists (reaction events: counter-moves by established powers — history pushes back).
6. **The clock:** era-length campaigns (multi-generational play) are where L4–L6 lives. Single lives mostly touch L1–L3 — **and that is correct**: most humans bend history only by inches; the game honors both truths (the quiet life well-lived; the rare hinge-mover).
7. **The divergence ledger (player-facing end-game reveal):** "The timeline remembers: because you held the bridge, the wool convoy reached Flanders; because you preached quarantine, Derbyshire kept its people (unlike history's 70% loss — flagged illustrative); because you burned the rolls, three families' debts died with them."

## 19.3 Worked divergence ladder (example)

**Seed (L1):** 1348, Derbyshire villager. You bar your door and refuse to nurse your plague-stricken neighbor's children (or the reverse: you nurse them and survive).
**L2:** your household intact while others orphaned → you absorb two holdings (land consolidation) → wealth band ↑ → son apprenticed to the wool merchant (family path change).
**L3:** your survival fame + literacy (the merchant's clerk taught you) → chosen as reeve in 1351 → you enforce the statute's wage cap leniently (or harshly) → village peace (or 1381-style grievance seed).
**L4:** your leniency/harshness shapes county labor flows → Derbyshire's wage structure diverges from historical record → (engine generates) a county-level prosperity/grievance variable feeding revolt-risk tables.
**Ceiling check:** at no point did the player alter the plague's existence or England's war — those anchors held; the player's divergence is *texture and statistics*, which is historically honest and mechanically satisfying.

---

# 20. DEATH AND LEGACY

## 20.1 Death in this era (what kills you, era-honestly)

| Cause tier | Examples | Era notes |
|---|---|---|
| The childhood gauntlet | birth complications, weaning diseases, fevers | modeled via family structure, not gore |
| The big four (adult) | disease, famine, war, childbirth (women) | the honest center of the mortality table |
| The accidents | work injuries, drowning, fire, horses | statistically huge; under-dramatized in history books — elevate in events |
| The legal | execution, outlawry-killing, judicial maiming → death | crime/punishment paths end here often |
| The voluntary-ish | monastic fasting extremes, crusade, sea risk, duel | chosen-risk deaths (player's gamble ledger) |
| The old age | organ failure, winter kill, "died full of days" | the achievement: rare and celebrated |

## 20.2 Deathbed & funeral (the era's most important social event)

- **The good death (ars moriendi tradition):** confession, communion, will, farewells — achieving it is a **gameplay goal with real stakes** (dying unprepared = legacy penalties in piety/family terms; plague-deaths often denied this — one of the era's true cruelties) **[FACT]**.
- **Funeral rites by culture:** requiem + burial in parish ground; Islamic ghusl/janaza with qibla grave; Hindu cremation with rites (son lights pyre — sonlessness = spiritual crisis event); Chinese ancestor rites, professional mourners hired (real economy); Norse ship/f mound burial for elites then churchyard; Sahel Islamic rites + traditional second rites (flag syncretism); Buddhist chanting cremation; **funeral spending is a real budget decision with reputation consequences** ("a poor send-off" follows the family).
- **Memory systems (the player's "cloud save"):** parish obituary rolls, commemorative masses (funded), anniversary obits; Islamic *dua* and waqf-in-name; Chinese ancestor tablet in the hall; griot's genealogy recital (Mali — memory IS the institution); Icelandic saga memorial (family hires the saga's shaping!); epitaph commissions.

## 20.3 End-of-life summary (the Legacy Screen)

```text
╔ THE LIFE OF [NAME] ═══════════════════════╗
  Born [date] at [place], [class descriptor]
  Died [date] ([age]) of [cause] at [place]
  ── THE ARC ──
  Occupation path; offices held; voyages; vows kept
  ── FAMILY ──
  Spouse(s), children (surviving/deceased), descendants count
  Household wealth tier at death; land held; works made
  ── STANDING ──
  Honor word-of-mouth summary (2-3 lines of gossip-style text)
  Piety judgment (parish/monastery/mosque record)
  ── HISTORY ──
  Events witnessed; events touched; divergence ledger entries
  Timeline comparison: "In the history we know, [X]. In your world: [Y]."
  ── THE LEGACY ──
  What survives you: descendants' starting modifier; named memory
  (the mill they still call by your name; the psalm you composed;
   the quarantine your grandson still observes; the griot's verse)
╚══════════════════════════════════════════╝
```

- **Legacy scoring (composite, era-weighted):** Descendants (family continuity) · Works (things that bear your name) · Wealth-status held at end · Faith standing · Honor renown · Historical touch (witness/influence) · Divergence magnitude. Display as **a parchment epitaph**, not a leaderboard (leaderboards belong to modern fantasy).
- **Multi-generational hook:** "Continue as your grandchild" (New Game+ carrying Family Standing + region divergence state — the era's deepest replay engine).

---

# 21. REPLAYABILITY

1. **Location matrix:** 16 regions × distinct laws, faiths, economies, dangers — a Norse bondi and a Mali griot-apprentice share almost no events.
2. **Date matrix:** the same manor in 800 (Vikings, ordeal, silver famine), 1100 (crusade fervor, boom), 1340 (high medieval zenith), 1380 (post-plague new world) are four different games.
3. **Class matrix:** every class is a different system emphasis (feudal law / guild economy / exam meritocracy / war-band loyalty / temple economy / caravan trust).
4. **Family & dynasty:** siblings, cousins, descendants — different branch, different story; the household is the roguelike "build."
5. **Gender paths:** era-real but varied: manor mistress (dower management), nun-abbess, Heian court lady, merchant widow (Hangzhou/Italy), queen's household, Sahel queen-mother track, artisan wife keeping books.
6. **The three tragedies:** survive famine (1315), plague (1347), or war (rolling) — each is a distinct survival-roguelike.
7. **The careers ladder:** same starting village can produce a reeve, a monk, a mercenary, a merchant — class mobility as the core run-based variance.
8. **Divergence hunting:** completionist replay to trigger ledger entries; the "what-if" museum (timeline gallery comparing runs).
9. **Epic-mode:** multi-generational saves aiming at L4–L6 divergences (long campaign design).
10. **Encounter hunting:** figure-proximity runs (be at Stamford Bridge; nurse in Ibn Sina's hospital; clerk at Joan's trial).

---

# 22. GAMEPLAY EXAMPLES (complete walkthroughs)

## Example 1 — English villein, b. 1067, Huntingdonshire

```text
SETUP: Auto Create → England, 1067, village of Little Paxton (fictional composite, documented-type manor)
CONTEXT: 1 year post-Hastings. New Norman lord (historical pattern: French-speaking). Your father: gebür (villein) owing 2 days/week demesne work. Mother brews. Two older brothers.
LIFE SITUATION: Age 6 (1073). The lord is building a motte; your father's labor quota rises. New forest law: the old pannage route now forbidden.
EVENT: Age 8 — Your eldest brother (16) is pressed into the castle works hauling timber. He returns with a crushed foot. The manor has no surgeon; the midwife will try for a silver penny your family doesn't have.
CHOICES: (a) borrow from the reeve (debt, obligation); (b) the lord's chaplain for charity (piety +, lord's notice +, family shame); (c) sell the winter barley seed (hunger risk); (d) do nothing (brother crippled: permanent family labor −).
PLAYER CHOICE: (a) reeve's loan at harvest-repayment.
IMMEDIATE: brother's foot saved (midwife + crude splint); debt recorded; reeve now "owns" a favor.
DELAYED (age 14): the reeve calls the debt as: your service in his son's place for the lord's Bohemian War escort? (flag: invented local conflict — keep generic "the lord's Welsh campaign").
HIDDEN: the miller's daughter (who you fancy) hears of the debt — her father's price for marriage rises (dowry logic inverted).
FAMILY: parents' standing dips (debt known); younger sister's betrothal negotiation stalls.
SOCIAL: reeve's patronage opens manorial-court jury duty track (your literacy spark: you learn tallies).
HISTORICAL: none (correct for this tier).
LATER: age 32 (1099) — first crusade's veterans return with relics and tales; you (now a franklin-aspiring free tenant via commutation of labor dues — earned over years) muster as archer for a lord's contingent to Normandy (non-crusade). Age 51: the Anarchy's tax squeeze; your choice to hide the third pig decides whether the family eats or the manor's rolls show shortfall (hidden record → 20 years later, a roll-burning during the 1135 succession chaos erases it — local divergence L2: your line keeps the holding when neighbors are dispossessed).
DEATH: age 63 (1130), winter fever, "full of years," holding intact, son literate enough to witness charters.
LEGACY: "Wulfric the Tallyman — kept his word, kept his land, taught his son letters."
```

## Example 2 — Baghdad merchant's daughter, b. 1220

```text
SETUP: Custom → Baghdad, 1220, Karaj district (silk-weavers' quarter)
CONTEXT: Abbasid twilight under al-Nasir; the city still glorious — madrasas, bimaristan, paper cheap; but Khwarezmian war chaos north; 20 years to Hülegü.
FAMILY: Father: wholesale silk merchant with Khanqah Sufi connections; mother from a family of copyists; one brother destined for madrasa; you: educated at home (Quran, accounts, Persian poetry — elite daughters' real curriculum).
AGE 12 (1232): family debate — send you to a relative's household in Mosul (safer, duller) or keep you for the family business (your numeracy is the best of the children). Player chooses: stay.
AGE 16 (1236): the great caravan from Samarkand brings news: the steppe conqueror's armies move west. Father must choose: buy the Mongol passport (paiza — real institution) for the winter caravan, or send goods south to Basra. Player (advising in family council — your accounts reveal the margin) chooses Basra route.
IMMEDIATE: Basra route profits; Samarkand caravan burned (news arrives with survivors, 1238).
DELAYED: the family gains Basra agents; your name enters the partnership papers (women held property/contracts under Islamic law — you inherit your share).
AGE 22 (1242): marriage offers: (a) a madrasa-trained kinsman (piety alliance, steady); (b) a Karimi-style long-distance merchant (wealth, danger, travel); (c) remain in the household business unmarried (dowry capital stays, gossip rises).
PLAYER CHOICE: (b) the merchant — with contract stipulating her retained property (mahr + her trade capital).
AGE 27 (1247): pilgrimage caravan season; you finance a third of the Mecca caravan (profit + piety + prestige). Jerusalem under Khwarezmian chaos that year — caravan reroutes; profit higher, danger real.
AGE 30 (1250): Mamluk victory at Ain Jalut reaches Baghdad as rumor — hope against the storm. Father dies; brother inherits household headship but cedes the silk book to you (your skill acknowledged).
AGE 37 (1257): THE STORM. Refugee flood; the city walls manned by the last caliph's few thousand. Choices: flee now (lose everything, live), fortify the shop quarter (defense + charity — piety, cost), send children out with the Sufi lodge (fragment family, save bloodline).
PLAYER CHOICE: children out, self stays with husband; shop-quarter defense fund (a real historical pattern: quarter self-defense).
IMMEDIATE: Feb 1258 — the siege weeks; the fund feeds the quarter's fighters; your name spoken with blessings.
DELAYED/HIDDEN: a quarter that resists is a quarter that dies harder — the survivors remember who organized the bread.
AGE 40: captive city; husband executed in the reprisal sweep? (engine roll) — widowed with capital and a name. Choices: remarry (alliance), take the household south (Mamluk Egypt — Cairo rising), or liquidate and follow the children's Sufi lodge to Anatolia.
HISTORICAL: the sack is the anchor; your quarter's defense did not save Baghdad — but your family line lives, resettled in Cairo (1310s), grandchildren as Karimi-style syndicate factors.
DIVERGENCE: L3 (quarter survival rate higher than history's — recorded in the ledger as "the Silk Quarter endured").
LEGACY: "Zaynab al-Harir — the Silk Quarter's bread in the dark winter; her letters crossed three seas."
```

## Example 3 — Song China examination candidate, b. 1085

```text
SETUP: Custom → Jiangnan (Yangzi delta), 1085, county-town literati family (minor gentry: grandfather a county graduate)
CONTEXT: Northern Song at zenith; Wang Anshi's reform politics roiling (New Policies); the exam system the family ladder; your county: famous for its charitable school.
AGE 7 (1092): county school enrollment; your memory prodigy trait shows (engine roll). Father's decision: full examination track (costs: tutors, books = years of farm income from the family's 40 mu).
AGE 16 (1101): prefectural exam attempt #1 — fail (2 of 10 candidates pass). Crisis: repeat (cost) or take the clerical shortcut (secure, capped).
PLAYER CHOICE: repeat. Family sells the mulberry grove (Wealth −−; Mother silent at the table).
AGE 19 (1104): pass prefectural (juren path open). The New Policies factional bans are purging exam content (factionalism = real exam-politics); your essay teacher is proscribed — his students suspect (hidden flag).
AGE 22 (1107): metropolitan exam in Kaifeng — the great city overwhelms (event: night markets, the exam halls' cells, 3 days of essays). Result: pass at rank 300+ (jinshi!).
IMMEDIATE: appointment queue — a county registrar post in Fujian (far, malarial, honest); or wait for better (patronage needed).
PLAYER CHOICE: take Fujian.
AGE 25–35 (1110–1120): registrar → magistrate of a poor mountain county. Event: a "reckless" land-survey reveals tax-hidden estates of a great clan (historical genre: tax evasion by the powerful). Choices: report up (justice, enemies, reformist credentials) or bury it (safety, bribe). Player: report. Hidden: the clan's patron at court notes your name.
AGE 37 (1122): Kaifeng falls to the Jurchen? No — 1127. At 37 (1122) you're recalled to the capital for an audit of salt-gabelle fraud. You build a case against a palace-connected syndicate.
AGE 42 (1127): THE JINGKANG CATASTROPHE — Kaifeng falls; the emperor captured (anchor). Your choice made in the chaos: flee south with the court (bureaucratic continuity, lose the case files and your estates) or stay to bury the files and protect county granaries (local lives, personal ruin).
PLAYER CHOICE: stay. (Three villages eat through 1128 because of it.)
DELAYED: 1130s Southern Song re-founded at Hangzhou — the new court needs experienced, incorrupt officials. Your reformist file resurfaces; summons south.
AGE 45–60: demotion-and-redeployment cycle (the literati emotional roller: faction swings — your reformist patron falls → you to a salt-post; returns → prefect of a Yangzi county; falls → "retirement" in Jiangnan writing local gazetteers).
HISTORICAL: the court survives (anchor); your granaries and surveys become the "model case" in your prefecture's records (L3 divergence: documented local divergence in tax equity).
DEATH: age 71 (1156), at home, students at the bed, the classic good death.
LEGACY: "Shen of Jiangnan — thrice demoted, never bought; the gazetteer still cites his survey."
```

## Example 4 — Kamakura gokenin, b. 1245

```text
SETUP: Custom → Sagami province (Kamakura's hinterland), 1245, warrior household holding jitō shiki over two villages
CONTEXT: Bakufu 60 years old; Hōjō regency smooth; your grandfather fought at Jōkyū (1221) — the family's shiki confirmed.
AGE 8 (1253): sent as page to a Yamanouchi-branch relative in Kamakura (household service = the school).
AGE 15 (1260): genpuku; granted a new jitō shiki in Shimōsa (marshy, promising — land development opportunity).
AGE 29 (1274): THE MONGOL EXPEDITION. Mobilization order arrives (hyōjōshū edict). Choices embedded: go (obligation, the greatest war of the age) or send a substitute brother (acceptable, cheaper, honor −).
PLAYER CHOICE: go. Events: the Hakata wall (stone rampart built 1274–81, real), the first night landing chaos, the typhoon that scatters the fleet (the kamikaze — anchor).
IMMEDIATE: survival (battle wound: arm scar — Martial −5 permanent, Honor +).
AGE 33 (1278): reward petition denied — no conquered land to grant (the structural insult, historically documented **[FACT]**). Household finances strain (the campaign ate reserves).
AGE 36 (1281): second invasion — you muster again; second storm; second denial of rewards.
DELAYED: the gokenin impoverishment wave — your Shimōsa jitō villagers petition bakufu against your tax exactions (you raised dues to cover campaign debts). The bakufu court (the hyōjōshū's local session) rules against you (historical pattern of bakufu protecting peasants from squeezed warriors).
CHOICES: accept (Honor +, finances worsen), appeal to a patron (bonds spent), or squeeze harder (village flight event; later, your name is cursed in the shrine's records).
PLAYER CHOICE: accept and take in-law money via a marriage alliance with a moneylending temple (real: temples/brewers as financiers; warrior-indebtedness is THE Kamakura story).
AGE 60 (1305): the bakufu's fiscal rot is visible; a grandson studies Zen at Kenchōji (education path); a daughter married into a Hōjō-branch constable family.
DEATH: age 68 (1313), in the saddle (fall from horse — echo of Yoritomo's death, deliberate texture), debts settled by the temple marriage clause, grandson inherits shiki.
HISTORICAL: Kamakura's fall (1333) comes to his descendants (the dynasty's doom — the engine shows it in the epilogue).
LEGACY: "The man who twice faced the storm and was twice unpaid — his grandson kept the shiki until the world turned."
```

## Example 5 — Mali, smith's-lineage boy, b. 1310

```text
SETUP: Custom → Niani region, 1310, blacksmith (numu) lineage household in a smith-quarter attached to a royal village
CONTEXT: Mali at apogee; Mansa Musa's reign approaches (1312); your caste: nyamakala — feared and indispensable (smiths as ritual-power figures, griots as memory-keepers).
AGE 7 (1317): apprenticeship begins at father's forge (bellows boy). Note: smith endogamy rules constrain your marriage pool (caste mechanics).
AGE 14 (1324): THE HAJJ YEAR. The caravan of the century passes — your uncle's smith-guild contracted to repair cart axles and shoe horses; you join as water-carrier. Event: the gold-lit spectacle; a griot (Balla Fasséké's lineage descendant — flagged as lineage-fiction) hears you retell the caravan's order-of-march perfectly (memory gift event).
CHOICES: stay with the griot as apprentice (the memory path — prestige, travel, danger: griots speak truth to power) or return to the forge (security, craft mastery).
PLAYER CHOICE: the forge first, griot-training summers (a real dual-apprenticeship texture).
AGE 22 (1332): your steel (bloomery furnace mastery) earns royal armory notice; Mansa Musa's successor commissions spearheads; you marry within smith endogamy (wealth +, pool constrained — tradeoff visible).
AGE 35 (1345): Tuareg raiders strike the Walata road; your village's warning system (the smith-quarter's bells — your design event) saves the grain stores; the provincial governor grants a smith-quarter charter (tax relief — local office achieved: L3 enabler).
AGE 45 (1355): Timbuktu's Sankore rises; your son sent for Quranic + craft education (the elite double-track).
AGE 60 (1370): griot-master dies; the epic mantle passes — you now perform the Dausi/Tarikh segments at the mansa-name ceremonies (memory-legitimacy role).
HISTORICAL: Mali's slow decline proceeds (anchor); your charter quarter endures two centuries (engine projects descendants in the epilogue).
LEGACY: "The smith who kept the bells — his verse still names the kings."
```

## Example 6 — Norse Greenland farmer, b. 1065 (the slow tragedy)

```text
SETUP: Custom → Eastern Settlement, Greenland, 1065, free farmer household (2 cows, 8 sheep, boat-share)
CONTEXT: 80 years after settlement; the colony at height; tithe paid to the distant archbishop; walrus ivory income real.
THE ARC (compressed): decades of margin: good hay years vs. bad; the 12th-c. peak; then: ivory competition (event: a trader prefers African elephant ivory — economic doom foretold); drifting sea ice (Little Ice Age events); the 1347 marriage-ship plague note (a sailor's tale that never reaches them — the news-lag mechanic dramatized); by c. 1350 your grandchildren face THE DECISION EVENT: stay, adapt toward the sea (hunting like the skrælings — taboo, survival) or abandon west for Iceland (cost: sell the ancestral farm; the church records will forget you).
PLAYER CHOICE (as grandfather advising): sell. The family departs 1354; arrives Iceland 1355 to find half of Europe dead (the plague they fled Greenland to avoid was already there — the irony the engine arranges from the world-state).
HISTORICAL: the colony dies c. 1450 (anchor); your line lives in Iceland (divergence L2/L3: one Greenland family name in Reykjavik's registers).
LEGACY: "They left before the winter that never ended."
```

---

# 23. DATA MODEL REQUIREMENTS

> Design-specification level (no code). Fields marked *MVP* are required for the vertical slice.

## 23.1 Core world structures

**Era** *(MVP)*
`{id, name, dateRange, description, subEras[], regions[], globalAnchors[], calendarSystem, currencyRegistry, techRegistry}`

**SubEra** *(MVP)*
`{id, eraId, regionId, startDate, endDate, politicalSituation, techLevel, economyProfile, socialProfile, conflicts[], transitionEvents[], entryConditions}`

**Region** *(MVP)*
`{id, name, geography, subEras[], defaultReligion, languages[], economy, diseaseProfile, seasonModel (agricultural calendar + sailing windows)}`

**Location** *(MVP)*
`{id, regionId, type (village|town|city|monastery|port|frontier), population, politicalEntityId, institutions[], marketData, riskProfile, mapPosition}`

**PoliticalEntity** *(MVP)*
`{id, type (kingdom|empire|sultanate|bakufu|mandala|city-republic|tribe-confederation), rulerTitle, successionLaw, legitimacy, stateReach, taxProfile, legalSystem, warState, factions[]}`

**Faction** *(MVP)*
`{id, name, politicalEntityId, type (dynasty|guild|order|clan|household|religious), goals[], resources, leaders, playerAccess}`

**Dynasty** *(MVP)*
`{id, name, members[], claims[], holdings, reputation, marriageNetwork}`

## 23.2 Character & society structures

**SocialClass** *(MVP)*
`{id, name, regionScope, legalStatus, rights[], restrictions[], obligations, wealthBands, marriageRules, mobilityPaths[], risks[], opportunities[]}`

**Occupation** *(MVP)*
`{id, classGates[], entryPaths, stages[] (apprentice→…→master), incomeModel, statRequirements, riskModel, advancementEvents, regionAvailability, genderAvailability}`

**Religion** *(MVP)*
`{id, name, doctrines (diet, usury, marriage, afterlife, purity), institutions[], calendar (fasts, feasts), conversionMechanics, heresyBranches[], minorityStatusRules}`

**Culture** *(MVP)*
`{id, ritesOfPassage[], festivalCalendar, giftEconomyRules, hospitalityLaw, taboos[], honorCode, deathRites, memoryInstitutions (griot, saga, obit, tablet, epic)}`

**Household** *(MVP)*
`{id, headId, members[], structureType, assets (multi-ledger), obligations[], reputation}`

**Relationship** *(MVP)*
`{id, aId, bId, type (kin|lord|patron|guild|feud|debt|marriage|godparent|foster), strength, historyLog}` — the gossip engine's substrate.

## 23.3 Content structures

**HistoricalEvent** *(MVP for event-driven sub-period transitions)*
`{id, name, tier (global|regional|local), dateRange, locationIds[], cause, outcome, figures[], affectedGroups[], playerRelevance, involvementOptions[], anchorStatus (locked|branchable|open), altOutcomes[], longTermConsequences[]}`

**HistoricalFigure** *(MVP)*
`{id, name, dates, regionIds[], role, factionId, importance, availabilityWindows[], interactionRules, fixedBehaviors[], changeableSurfaces[], figureProximityEvents[]}`

**Technology** *(MVP)*
`{id, name, originRegion, diffusionTimeline[{region, date}], prerequisites, effects[{stat|system|occupation, delta}], transferability}`

**RandomEvent** *(MVP)*
`{id, category, gates{regions[], dates[], classes[], seasons[], worldFlags[]}, setupText, choices[]{text, requirements, consequences}, fallbackOutcome, tags[]}`

**Choice** *(MVP)*
`{id, eventId, text, requirementGates, consequenceSet{immediate[], delayed[], hidden[], personal[], family[], social[], historical[]}, doorClosed}`

**Consequence** *(MVP)*
`{id, targetType (stat|ledger|relationship|worldFlag|worldState|reputation|memory), magnitude, delay, visibility, decay, narrativeTemplate}`

## 23.4 Simulation structures

**WorldState** *(MVP)*
`{date, regions[{politicalEntity, warState, plagueState, harvestOutlook, priceVectors, legitimacy, stateReach}], tradeNetworks[], institutions[], divergenceLedger[], newsQueue (lagged)}`

**CharacterState** *(MVP)*
`{id, name, sex, birthDate, deathDate, locationId, householdId, classId, occupationPath[], stats{vitality, fertility, wealth, standing, piety, honor, learning, martial, craft, network, familyStanding, freedom, survival}, conditions[], relationships[], memories[], vows[], secrets[], beliefsProfile}`

**Timeline / DivergenceLedger** *(MVP)*
`{entries[{date, level L1–L7, description, anchorTouched, cost, propagationState, historicalComparisonText}]}`

**SeasonModel** *(MVP)*
`{agriculturalCalendar (ploughing/sowing/hay/harvest/lean), sailingWindows, campaignWindows, festivalSlots[], taxDueDates[]}`

**NewsQueue** *(later MVP+)*
`{items[{originId, dateCreated, propagationRoute, arrivalDelays per destination}]}`

**GossipEngine** *(P1)*
`{rumorItems[{subjectId, claim, truthValue, spreadNetwork, mutationRules, consequenceHooks}]}`

---

# 24. AGENT IMPLEMENTATION NOTES

## 24.1 MUST BE HISTORICALLY FIXED (anchors — never randomly change)

1. **Dated, sourced major events' occurrence:** Black Death (1347–53, recurrences), Mongol unification & key conquests, sack of Baghdad (1258), fall of the Song (1279), An Lushan (755–63), Hastings outcome (1066), Christianization of Scandinavia (by c. 1150), Great Schism's existence, foundation dates of the major polities per the tables above.
2. **Technology diffusion floors:** no gunpowder outside East Asia before ~1240s, no firearms in Europe before ~1320s, no paper in Europe before ~12th c., no printing press (European movable type) before c. 1450.
3. **Demographic baselines:** infant mortality floors, life expectancy bands, urban-death-sink behavior.
4. **Legal systems' existence per region/period** (trial by ordeal ends 1215 in Latin lands; exams gate Chinese office).
5. **Figure fixed biographies** as specified per figure (deaths, key deeds).

## 24.2 CAN BE RANDOMIZED (per-playthrough variance)

1. Player family: class roll within location-gated weights, wealth band, sibling structure, parent temperaments, congenital traits.
2. Weather/harvest tables (within climate envelope of sub-period).
3. Local events: which village has the poaching scandal; which traveler arrives.
4. Marriage market composition; NPC personality seeds; rumor specifics.
5. Battle outcomes at the tactical level (given historically-correct odds).
6. Prices within band; plague *local severity* within global occurrence.

## 24.3 CAN BE PLAYER-CHANGED (with divergence gates)

1. Own stats, health, survival, career trajectory, marriage, faith practice.
2. Household wealth/continuity (L1–L2).
3. Local events' outcomes: quarantine success, roll-burning, charter petitions, guild elections (L3).
4. Regional outcomes *when holding office/faction role:* county labor regimes, monastery land defense, town charter gains, province tax equity (L4).
5. National outcomes only via high office over decades (L5).
6. Historical anchors only via the explicit gated exceptions listed in §19 (L6, rare, costly).

## 24.4 REQUIRES FUTURE SYSTEM (not buildable yet — define interfaces now)

1. **Multi-generational play** (descendants as new player characters; inheritance of `FamilyStanding` + region divergence) — MVP designs CharacterState to allow handoff.
2. **Gossip/Rumor engine** (honor economy substrate) — MVP stubs with static reputation deltas.
3. **News propagation** (lagged knowledge) — MVP uses event-flags only.
4. **War campaign layer** (army logistics minigame) — MVP resolves wars as event streams.
5. **Sailing/monsoon navigation** (deep travel) — MVP uses travel-event tables.
6. **Relic/market speculation & long-distance trade portfolio play** — MVP simple buy/sell with band prices.
7. **Inquisition/legal defense minigame** (two-court strategy) — MVP choice-tree.
8. **L7 alternate-timeline meta** — post-launch.
9. **Modding/era-editor** (the platform goal) — schema-first design throughout this document.

## 24.5 Content sensitivity directives (must)

1. Slavery, pogroms, massacre, forced conversion, execution: **portray as historical reality with consequences and costs; never as reward mechanics or spectacle.**
2. Child marriage and sati: historical facts — appear only as event-level narrative with era-accurate framing and stakes; never romanticized, never a "goal."
3. Gender restrictions: model as historical constraints and the *real* era-legal workarounds (dower, widowhood, convents, courts, property) — the design celebrates the workarounds as the gameplay.
4. Religious depiction: insiders' piety treated seriously in-fiction (the engine is agnostic; characters believe); avoid caricature; no faith is a "villain faction" wholesale (political actors may be).
5. Medieval beliefs (demons, omens, miasma): presented as lived reality with era-consistent effects; the *player's* modern knowledge does not become the character's knowledge.

---

# 25. MVP RECOMMENDATION (vertical slice)

**Recommendation: "The Long Twelfth Century" — England & Northern France, 1066–1216, at village scale.**

Why: the best-documented society of the era (Domesday Book, manorial rolls, English common law records — data-rich = design-rich); conquest-to-charter arc gives a built-in story spine (Hastings → Norman regime → Anarchy → Becket → Magna Carta); wool economy = legible trade system; plague not yet (1347+) so the health model can start simpler; two languages, two laws, one war = compact complexity.

**Minimum playable map (5 locations):**
1. *Little Paxton* — an English manor-village (composite; Domesday-modeled: demesne, villeins, cottars, mill).
2. *St. Albans-adjacent market town* — (modeled on small Hertfordshire towns; or use historic St Albans abbey-town): weekly market, parish church, guild-less crafts, Jews' street (pre-1290).
3. *London, Wool Wharf quarter* — city layer: St Paul's shadow, wharves, ward politics, New Temple (the Knights Templar — London financial hub!).
4. *A Norman manor* in the Vexin/Normandy — for the cross-Channel arc (post-1204 loss mechanic).
5. *Canterbury* — pilgrimage destination node (Becket's shrine, 1170+); doubles as the faith/travel system showcase.

**Minimum social classes (5):** villein (unfree peasant) · free tenant/franklin · craftsman (village smith or town weaver) · clergy (priest/monk track) · merchant/gentry (wool-stapler's agent). (Noble excluded from MVP starts; appears as the lord.)

**Minimum careers (6):** arable peasant; shepherd/wool handler; smith; parish priest/monastic novice; wool merchant's factor; man-at-arms (muster levies + the 1190s crusade-adjacent arc). Each with 3-stage ladder and ≥3 advancement events.

**Minimum historical events (8):** Norman Conquest regime change (1066+) · Domesday survey event (1086) · The Anarchy (1135–54, locality-scale civil war events) · Becket conflict & martyrdom (1170, Canterbury content) · Third Crusade muster (1189–92) · Loss of Normandy (1204, cross-Channel arc climax) · Magna Carta (1215, county-level justice events) · (bonus) Great Famine is post-slice (1315) — instead include a local famine event from the weather table.

**Minimum random events (24):** 2 per category from §17 taxonomy (A–L), each with 3+ choices and consequence sets; 6 seasonal events; 4 "opportunity" events (crusade vow, oblation offer, muster pay, pilgrimage convoy).

**Minimum stats (8):** Vitality, Wealth (multi-ledger), Standing, Piety, Honor, Learning, Craft, FamilyStanding. (Martial, Network, Freedom enter as gates/statuses without full systems.)

**Minimum historical figures (6):** William I (post-1066 context), Thomas Becket (arc), Henry II (lord-level presence), Richard I (muster arc), Eleanor of Aquitaine (Aquitaine content via Vexin arc), King John (Magna Carta arc). All at "presence/presence-adjacent" interactivity per §16.

**Minimum choice system:** §18 anatomy with Immediate + Delayed + Hidden consequences live; Family/Social via relationship deltas; Historical via divergence ledger entries (L1–L3 only).

**Minimum divergence system:** L1–L3 fully; L4 stubbed (one showcase: your town's charter petition succeeds/fails, recorded in ledger); anchors enforced per §24.1.

**Slice exit criteria:** a player can be born a villein, live to 50, change their family's class (commutation path), witness two regime events, make one charter-level divergence, die with an epitaph — and a second player in the same map at a different date/class experiences ≥60% different content.

---

# 26. CONTENT PRIORITY

## P0 — Required for MVP
- All §25 minimums; Era/SubEra/Region/Location/PoliticalEntity/SocialClass/Occupation/Household/CharacterState/WorldState schemas; SeasonModel (English agricultural year); anchor enforcement; choice anatomy (immediate/delayed/hidden); divergence L1–L3; event schema + 8 regional events + 24 random events; multi-ledger wealth; honor/piety basics; death + epitaph + legacy screen.

## P1 — Important (first expansion, 1–2 quarters post-MVP)
- Gossip engine v1; news lag v1; war event streams (Anarchy at full); two more regions (Flanders wool circuit + one Iberian frontier strip); female-path suite (dower, widowhood, convent); craft guilds in town; muster/levy system with battle resolution; pilgrimage system (Compostela) with travel tables; relic economy; figures' proximity events; children/education system to full.

## P2 — Expansion
- Islamic heartlands region pack (Baghdad 1150–1258 arc — the Mongol storm as the P2 centerpiece); Song China region pack (exams + paper money economy); Kamakura Japan pack; Sahel Mali pack (griot memory system); plague expansion (late-medieval toggle); multi-generational handoff; naval layer (Hansa/Channel); legal minigames; inquisition/court-defense system; technology-transfer player achievements.

## P3 — Future
- L4–L6 full divergence; L7 alternate-timeline meta; steppe conquest systems (Mongol campaign layer); SE Asia mandala pack; Ethiopia/Great Zimbabwe packs; Byzantine full arc (incl. 1204 & 1453 endgame); economy deep-sim (fairs, banking, insurance); modding/era-editor; "Epic mode" (century-scale campaigns).

---

# 27. ERA DESIGN SUMMARY

### Era Identity
A thousand-year, three-continent **pre-modern condition**: worlds bound by land, lord, and liturgy, where literacy is sorcery and a pig is a pension plan — radically different depending on when and where you're born, yet legibly *one era* through shared iron, faith, and risk.

### Player Fantasy
- "I was born a nobody in a dangerous world — and I made a name, a family, a meaning that outlived me."
- "I lived through the storm everyone studies" (Hastings, the Mongols, the Plague, the fall of a capital).
- "I bent my small corner of history — and the timeline remembers."
- Also: "I just lived well — and that was enough" (the era honors the quiet life).

### Core Gameplay
**Live a complete life under historical constraints:** raise a household, choose a path among era-legal ladders (plow, craft, cloister, sword, ledger, word), survive famine/plague/war, navigate faith and law and lordship, marry and bury, and leave a memory — while the world's great events roll past, occasionally touching you, rarely (but memorably) touched by you.

### Major Systems
1. Date+Location+Class world-resolution. 2. Multi-ledger pre-modern economy. 3. Seasonal agricultural clock. 4. Obligation/legitimacy politics from manor to mandala. 5. Faith-as-infrastructure. 6. Honor/gossip reputation economy. 7. Career ladders with era-gates. 8. Consequence-anatomy choice system. 9. Tiered divergence ledger with anchors. 10. Legacy/epitaph/multi-generational memory.

### Historical Hook
The medieval world is **the era of the ordinary person's maximum agency at minimum safety** — every institution is small enough to see and strong enough to kill you. It's the perfect laboratory for a life simulator: high stakes, legible systems, deep documentation, and a thousand untold lives per map square.

### MVP
**"The Long Twelfth Century": England & Normandy, 1066–1216, five locations, five classes, six careers, eight anchor events, twenty-four random events, eight stats, six figures, L1–L3 divergence.** Build the vertical slice where a villein can become a franklin, a smith's son can take the cross, and a wool-factor's ledger can change a town — then widen the world.

### Open Questions (require product/research decisions)
1. **Population-weighted vs. content-weighted random births** — historical honesty (90% peasants) vs. engagement; recommended: honest weights with strong peasant-path design and "life preview" at creation.
2. **Plague content rating** — its horror is the point; calibrate tone (no body-horror spectacle; focus on choices/loss).
3. **Religious truth stance** — engine agnosticism is recommended; validate with sensitivity review (miracle events: psychological vs. miraculous presentation toggle for player comfort).
4. **Multi-generational scope** — 1 life (definable), dynasty mode (high value, high cost), or both from P1? Recommend: single-life MVP, dynasty mode P1.
5. **Language barrier system depth** — full linguistics sim vs. travel-friction abstraction? Recommend abstraction (v1) with dialect flavor text.
6. **Female experience parity goals** — how far to extend era-realistic constraints before they gate content unfairly? Recommend: era-real constraints, era-real workarounds as designed content (per §24.5.3), playtest with diverse testers.
7. **Slavery content boundaries** — survival-arc only, no slaver starts, no slavery economy minigame; review before P2 Sahel pack.
8. **Figure interaction ceiling** — how "buddy" can famous NPCs be before history breaks? Recommend: proximity > friendship; fixed behaviors hold.
9. **Chinese/Japanese naming, caste, and calendar data depth** — budget research passes per region pack (hire regional consultants for P2 packs).
10. **Save-format compatibility** — schema-first now to protect against future era-packs' migration pain.

---

*End of specification. This document is the authoritative starting point for the Medieval World era of LegacyLife. Build the slice; the timeline is waiting.*

# LegacyLife — Historical Accuracy & Content Audit

**Audit Date:** October 2026  
**Auditor:** Historical Systems Designer & Content Verifier  
**Reference Sources:** `docs/eras/*` (10 Global Era Specifications), `packages/historical`, `packages/content`

---

## 1. Content Coverage vs Complete Game Scope

The overarching design of LegacyLife specifies **10 Global Historical Epochs** spanning prehistoric society to modern civilization:

1. Prehistoric & Early Civilization
2. The Ancient World (Greece, Rome, Han China, Maurya)
3. Late Antiquity (284–750 CE)
4. The Medieval World
5. Renaissance & Early Modern (c. 1450–1650)
6. Colonial & Imperial Era (1500–1858)
7. Victorian & Industrial Revolution (1840–1890)
8. World War Era (1914–1945)
9. Cold War & Post-Colonial (1945–1990)
10. The Modern World

### Implemented Data Packs
Currently, only **two historical data packs** are authored and implemented in code:
- **Pack 1:** *Post-War Indian Transformation (1945–1970)* (`packages/content/src/lucknow.ts`) — Phase 7 MVP Vertical Slice.
- **Pack 2:** *Victorian Industrial Britain (1840–1890)* (`packages/content/src/industrial.ts`) — Multi-era expansion.

The remaining 8 epochs remain as design specifications in `docs/eras/` and have not yet been converted into structured datasets.

---

## 2. Historical Audit: Post-War India (1945–1970)

### 2.1 Chronological & Political Integrity
- **Sovereign Transitions:**
  - `1945-01-01` to `1947-08-14`: British Raj (`entity.british_raj`) — Correct.
  - `1947-08-15` to `1950-01-25`: Dominion of India (`entity.dominion_india`) — Correct.
  - `1950-01-26` onwards: Republic of India (`entity.republic_india`) — Correct.
- **Provincial Geography:**
  - Identifies United Provinces (later Uttar Pradesh). 5 authentic urban/rural nodes: Lucknow (provincial capital), Kanpur (industrial textile hub), Delhi (national capital), Prayagraj (legal/judicial hub), and Awadh Rural (agrarian hinterland).
- **Major Historical Chronology:**
  - Cabinet Mission: `1946-03-24` — Verified.
  - Partition of India: `1947-08-01` to `1947-10-31` — Verified.
  - Independence Day: `1947-08-15` — Verified.
  - Assassination of M.K. Gandhi: `1948-01-30` — Verified.
  - Constitution Enactment: `1950-01-26` — Verified.
  - First General Election: `1951-10-25` to `1952-02-21` — Verified.
  - UP Zamindari Abolition Act: `1952-07-01` — Verified.
  - Sino-Indian Border Conflict: `1962-10-20` — Verified.
  - Indo-Pakistani War: `1965-08-05` — Verified.

### 2.2 Currency, Economy & Social Norms
- **Currency:** Rupee (₹) and Anna. Pre-1957 non-decimal coinage (1 Rupee = 16 Annas) is acknowledged in lore; simplified decimal rupees used for simulation arithmetic.
- **Social Classes:** Landed Elite (Taluqdars), Professional Class, Middle Class (Babu/Clerks), Working Class (Millhands), Peasantry (Kisans).
- **Authenticity of Life Dilemmas:**
  - 17 authored templates in `LUCKNOW_LIFE_TEMPLATES` accurately reflect socio-cultural realities: Partition refugee relief at Charbagh railway station, 1952 universal suffrage voting circles, 1953 Aminabad literary mushaira, 1960 Gomti river flood rescues, and 1965 wartime blackout civil defense warden duties.

---

## 3. Historical Audit: Victorian Britain (1840–1890)

### 3.1 Chronological & Legal Integrity
- **Sovereign Entity:** British Empire under the reign of Queen Victoria (`entity.british_empire`).
- **Industrial Geography:**
  - London (Imperial metropolis & docks), Manchester (Cottonopolis & textile mills), Birmingham (Metalwork foundries), Glasgow (Clyde shipyards), Yorkshire (Woollen mills).
- **Legislative & Technological Milestones:**
  - Mines Act (prohibiting women/children underground): `1842-08-10` — Verified.
  - Railway Mania boom: `1844–1847` — Verified.
  - The Great Exhibition at Crystal Palace: `1851-05-01` — Verified.
  - Dr. John Snow Broad Street Cholera Outbreak: `1854-08-31` — Verified.
  - The Great Stink of the River Thames: `1858-06-15` — Verified.
  - Elementary Education Act (Forster Act): `1870-08-09` — Verified.
  - Matchgirls Strike (Bryant & May): `1888-07-02` — Verified.

### 3.2 Currency, Labor & Class System
- **Currency:** British Pound Sterling (£) and Shillings.
- **Social Hierarchy:** Landed Gentry / Aristocracy, Industrialist Magnates, Bourgeoisie / Commercial Middle Class, Proletariat / Millhands, Destitute / Workhouse Poor.
- **Labor Laws:** Correctly gates full-time adult employment before age 14/18; apprenticeships unlock at age 14.

---

## 4. Content Defects & Provenance Gaps

1. **Passive World Chronicle Exposure:**
   - In both data packs, major historical events (Gandhi's assassination, Great Exhibition, etc.) are currently logged only as passive background strings (`[world] Historical event: ...`) in `lucknowYearNotes` and `victorianYearNotes`.
   - Players do not receive interactive choices or personal dilemmas when these world events happen unless an explicit life template matches the exact calendar year.
2. **Missing Demographic Differentiation:**
   - The simulation does not yet adjust mortality curves or educational barriers based on gender or caste/class in the engine calculations; all characters share the same baseline health drift and lifespan roll formulas.
3. **Provenance Validation (`packages/historical/src/validate.ts`):**
   - Both data packs pass `validateDataset` cleanly with zero dangling IDs, zero date overlaps, and 100% provenance source citations on all entities.

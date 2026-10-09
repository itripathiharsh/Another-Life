# LegacyLife — Core Game Systems Deep Audit

**Audit Date:** October 2026  
**Auditor:** Senior Game Systems Designer & Engine Architect  
**Scope:** Forensic evaluation of all 10 foundational game systems specified in Section 8.

---

## 1. Subsystem A: Historical World and Context Resolution

### Intended Design
`Birth Date + Birth Location` resolves the authoritative historical context:
- Sovereign political entity and territorial control records.
- Active historical events and regional conflicts.
- Available occupations, social classes, and legal constraints.
- Available technologies, endemic diseases, and living conditions.

### Actual Implementation
- **Location & Political Sovereign:**
  - Resolved via `resolveHistoricalContext` in `packages/historical/src/context.ts:54-95`.
  - Date ranges are checked using `withinRange(date, r.range)`.
  - Verified: Boundaries like Indian Independence (`1947-08-15`) and Republic Day (`1950-01-26`) correctly transition sovereignty from *British Raj* to *Dominion of India* to *Republic of India*.
- **Data Coverage & Provincial Depth:**
  - Limited to 5 locations in Post-War India (`lucknow`, `kanpur`, `delhi`, `prayagraj`, `awadh_rural`) and 5 in Victorian Britain (`london`, `manchester`, `birmingham`, `glasgow`, `yorkshire`).
- **Defects & Gaps:**
  - `apps/web/app/world/page.tsx` never calls the context resolver API. It uses a parallel, hardcoded metadata dictionary in `apps/web/lib/era.ts`.
  - Historical context changes do not dynamically modify the player's tax rates or legal restrictions during yearly ticks; they only append text notes to `session.timeline`.

---

## 2. Subsystem B: Life Simulation & Progression

### Intended Design
Birth → Early Childhood → Childhood → Adolescence → Early Adulthood → Adulthood → Later Adulthood → Death.
Age transitions should handle birthdays, life-stage boundaries, bodily growth, and state evolution based on actual choices.

### Actual Implementation
- **Lifecycle Engine:**
  - Implemented in `packages/simulation/src/player.ts` and `session.ts`.
  - `stageForAge` (`player.ts:25-34`) maps chronological age into 7 bands:
    - 0: `birth`
    - 1–5: `early_childhood`
    - 6–13: `childhood`
    - 14–17: `adolescence`
    - 18–29: `early_adulthood`
    - 30–49: `adulthood`
    - 50+: `later_adulthood`
- **Aging & Upkeep Loop (`session.ts:242-313`):**
  - Increments `player.age` by 1 year.
  - Automatically handles schooling between `schoolStartAge` (6) and `schoolEndAge` (14), adding +1 `educationYears` per year.
  - Automatically handles starting work at `workStartAge` (18), applying default salary.
  - Dependent children (age < 18) incur 0 living expenses; independent adults incur 20/yr living expenses when unemployed.
- **Defects & Gaps:**
  - Work start is completely automated at age 18 (`session.ts:290-296`). The player is not prompted to choose or apply for a career in the simulation loop.

---

## 3. Subsystem C: Event and Choice Engine

### Intended Design
The causal loop:
`World State + Player State + Context → Eligibility → Event Selection → Choice → Probability Roll → Immediate/Delayed Consequences → Future Events`.

### Actual Implementation
- **Eligibility & Requirements (`packages/simulation/src/events.ts:93-122`):**
  - `Requirement` supports operators: `>=`, `<=`, `==`, `!=`, `>`, `<`, `includes`.
  - Hard gating: impossible events are never presented (`isEligible` checks all requirements).
- **Probability Resolution (`events.ts:134-142`):**
  - `resolveOutcome(baseProbability, modifiers, rng)` calculates `roll = rng() * 100`.
  - If `roll < finalProbability`, outcome is `success`; otherwise `failure`.
- **Consequence Interpreter (`packages/simulation/src/effects.ts:45-104`):**
  - Supports targets: `player` (wealth, health, reputation), `world` (`flag:<name>` markers), `family` (`add_child`, `add_spouse`), `relationship` (`trust`, `affection`), and `followup` (schedules delayed event).
- **CRITICAL DEFECT — Failure Consequence Asymmetry (`session.ts:355-360`):**
  ```typescript
  const applicable = outcome.success
    ? choice.consequences
    : choice.consequences.filter(
      (c) => c.target === 'player' && c.property === 'wealth' && c.op === 'ADD' &&
        typeof c.value === 'number' && c.value < 0,
    );
  ```
  *Defect:* When an event choice roll fails, **the engine only applies negative wealth deductions** (paying fees). It does NOT support distinct failure consequences (e.g., getting injured, contracting illness, losing standing, or failing exams). There is no `failureConsequences` array on `Choice`.
- **CRITICAL DEFECT — UI Stat Masking (`apps/web/app/events/page.tsx:180-230`):**
  - The frontend outcome screen ignores the actual consequences applied by `effects.ts` and renders a hardcoded fake diff (`+10 Wealth, +5 Knowledge, +5 Relations, -10 Free Time`).

---

## 4. Subsystem D: Historical Divergence

### Intended Design
Player actions can alter the historical timeline across scopes: Personal (L0), Family (L1), Local (L2), Regional (L3), Political (L4), National (L5), Global (L6).

### Actual Implementation
- **Existing Code (`packages/simulation/src/divergence.ts`):**
  - Defines `DivergenceLevel` (0–6), `LEVEL_BARS` (threshold importance: L0=10, L6=95), `shouldDiverge(importance, scope)`, and `createDivergence(...)`.
- **CRITICAL DEFECT — 100% Dead Code:**
  - Neither `shouldDiverge` nor `createDivergence` is called anywhere in `session.ts`, `slice.ts`, `effects.ts`, `service.ts`, or the web app.
  - In `session.ts:405`, `divergenceCount` passed to `computeLegacy` is hardcoded to `0`.
  - Historical Divergence is **COMPLETELY NON-FUNCTIONAL**.

---

## 5. Subsystem E: Economy and Finances

### Intended Design
Historical currency, wages, living costs, property ownership, business investments, debts, and transaction ledgers.

### Actual Implementation
- **Property & Yield Loop (`packages/simulation/src/session.ts:449-474`):**
  - `buyPropertySession` enforces age 18+, checks wealth, deducts cost, and appends `PropertyAsset`.
  - `processYear` aggregates annual yields from all owned deeds and credits them to `player.wealth`.
  - Fully wired through API (`POST /properties/buy`) and web UI (`apps/web/app/economy/page.tsx`).
- **Defects & Gaps:**
  - The transaction log in `/economy` is static mock data. No persistent `TransactionRecord` table or array exists in the backend.
  - Buttons for buying sweets, saving in a box, or purchasing workshop tools are inert toast triggers.

---

## 6. Subsystem F: Relationships and Family

### Intended Design
Kinship bonds, affection, trust, conflict, marriage, children, and genealogy.

### Actual Implementation
- **Simulation Models (`packages/simulation/src/family.ts`):**
  - `Relationship` contains 7 numerical dimensions: `trust`, `affection`, `respect`, `conflict`, `loyalty`, `familiarity`, `dependency`.
  - `evolveRelationship` clamps scores between 0 and 100 and tracks `sharedHistory`.
- **Marriage & Child System (`session.ts:476-520`):**
  - `marryPartnerSession` enforces age 18+, prevents polygamy, appends spouse to family members and relationships.
  - `haveChildSession` appends child with birth year.
  - Both wired to REST API and Next.js UI with live Family Tree rendering.
- **Defects & Gaps:**
  - The frontend People directory synthesizes contacts on the client instead of reading `session.relationships`.
  - Social interactions (Talk, Gift, Advice) modify in-memory React state and never call the backend.

---

## 7. Subsystem G: Career, Education, and Skills

### Intended Design
Schooling, apprenticeships, qualifications, job applications, promotion ladders, and occupational income.

### Actual Implementation
- **Education:**
  - Primary schooling automatically increments `educationYears` from age 6 to 14.
- **Occupation Assignment:**
  - Automatically sets `life.occupationId` at age 18 with default salary (`session.ts:291`).
- **Defects & Gaps:**
  - The job market in `/career` is completely disconnected. Clicking "Apply for Position" only displays a toast notification.
  - No backend API endpoint exists for changing jobs (`POST /career/apply` is missing).

---

## 8. Subsystem H: Health, Aging, and Death

### Intended Design
Vitality, illness, recovery, aging decline, life expectancy, healthcare access, and causes of death.

### Actual Implementation
- **Aging & Mortality (`session.ts:250-258, 305-312`):**
  - Lifespan is generated at birth: `55 + Math.floor(rng.next() * 20)` (55–74 years).
  - Health drifts annually based on age and basic care via `annualHealthDrift`.
  - Death triggers if `age >= lifespan` (old age) or `health <= 0` (disease).
- **Defects & Gaps:**
  - The backend only tracks 1 integer (`player.health`).
  - The frontend displays 5 vitals, of which 4 are hardcoded fake values: Mental Health (70), Energy (75), Sleep (65), Immunity (85).
  - Health activities in the UI (doctor visits, exercise) do not call any API and do not improve vitality.

---

## 9. Subsystem I: Save, Load, and Game Management

### Intended Design
Multi-slot save management, deterministic state serialization, versioning, backup integrity.

### Actual Implementation
- **Snapshot Engine (`session.ts:418-447`):**
  - Fully serializes `SessionState` including Mulberry32 `rngState`, flags, timeline, and history.
  - Embeds `schemaVersion: 1`, `engineVersion`, and `contentVersion`.
- **Defects & Gaps:**
  - `apps/web/app/saves/page.tsx` hardcodes slots 2 and 3 ("Charlotte Sterling", "Zubair Khan").
  - Clicking "▶ Load" on slot 2 or 3 only navigates home without switching saves.
  - "Delete Save" and "Import Save" are fake toast notifications.
  - The web app only tracks a single active life in `localStorage`.

---

## 10. Subsystem J: Death, Life Review, and Legacy

### Intended Design
Calculates a multi-dimensional historical footprint (family, wealth, social standing, historical impact) based on actual life history; offers dynastic succession.

### Actual Implementation
- **Legacy Engine (`packages/simulation/src/legacy.ts:25-90`):**
  - `computeLegacy` evaluates children count, final wealth, and recorded events.
  - Produces a coherent narrative summary string.
- **Deceased Memorial Screen (`apps/web/app/legacy/page.tsx:312-510`):**
  - Displays tombstone motif, accurate years lived, cause of death, and eulogy.
- **CRITICAL DATA DESTRUCTION BUG (`service.ts:313-318`):**
  - `playAsHeir(id)` calls `this.persist(id, heirSession)` using the **same life ID**.
  - This **overwrites** the ancestor's save file on disk, permanently destroying the ancestor's life achievements, timeline, and legacy summary.

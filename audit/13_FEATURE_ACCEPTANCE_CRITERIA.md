# LegacyLife — Feature Acceptance Criteria (P0 & P1 Requirements)

**Audit Date:** October 2026  
**Auditor:** QA Lead & Test Automation Architect  
**Purpose:** Provide unambiguous, testable Given/When/Then acceptance criteria for every critical (P0) and high-severity (P1) issue identified in the audit.

---

## 1. AC-001: Dynastic Succession Ancestor Preservation (P0)
**Issue:** `ISSUE-001` (`packages/api/src/service.ts`)  
**Objective:** Playing as an heir must transfer inheritance without destroying the deceased ancestor's life chronicle.

- **Scenario 1: Ancestor Save File Preserved on Succession**
  - **GIVEN** an active character `Arjun Sharma` with save ID `life_arjun_123` who has passed away (status: `dead`),
  - **WHEN** the player clicks "👑 Play as Heir (Inherit Dynasty & Estate)" (`POST /api/v1/lives/life_arjun_123/heir`),
  - **THEN** the server must generate a *new unique life ID* (e.g. `life_heir_456`) for the heir,
  - **AND** save file `life_arjun_123.json` must remain intact on disk under `.data/saves/`,
  - **AND** save file `life_heir_456.json` must be written containing the heir's state,
  - **AND** the heir's session must reference `ancestorId: "life_arjun_123"` in its lineage metadata,
  - **AND** the heir must inherit 80% of Arjun's final wealth and 100% of owned real estate deeds.

---

## 2. AC-002: Atomic File Persistence (P0)
**Issue:** `ISSUE-002` (`packages/api/src/store.ts`)  
**Objective:** Save snapshot operations must never corrupt existing files during unexpected process crashes.

- **Scenario 1: Atomic File Replacement**
  - **GIVEN** an existing save file `life_123.json` on disk,
  - **WHEN** `FileSaveStore.save("life_123", newSnapshotJson)` is executed,
  - **THEN** the store must write the new snapshot to `life_123.json.tmp`,
  - **AND** flush the data to physical storage,
  - **AND** execute an atomic rename (`fs.renameSync`) from `life_123.json.tmp` to `life_123.json`,
  - **AND** if an error occurs prior to the rename, the original `life_123.json` must remain uncorrupted.

---

## 3. AC-003: Multi-Slot Save Management & Loading (P1)
**Issue:** `ISSUE-003` (`apps/web/app/saves/page.tsx`)  
**Objective:** The Saves screen must accurately reflect all real saved files on disk and allow switching active chronicles.

- **Scenario 1: Listing Real Saved Chronicles**
  - **GIVEN** 3 valid save files exist under `.data/saves/` (`life_a.json`, `life_b.json`, `life_c.json`),
  - **WHEN** the player navigates to `/saves`,
  - **THEN** the UI must fetch `GET /api/v1/lives` and render exactly 3 save cards displaying the actual names, locations, and ages from those files,
  - **AND** no hardcoded dummy saves ("Charlotte Sterling", "Zubair Khan") shall appear.

- **Scenario 2: Loading an Inactive Save Slot**
  - **GIVEN** the player's active life is `life_a`,
  - **WHEN** the player clicks "▶ Load" on slot `life_b`,
  - **THEN** the web app must update `localStorage.setItem('legacylife:lifeId', 'life_b')`,
  - **AND** navigate to the home dashboard (`/`),
  - **AND** the dashboard must render the identity, stats, and year of `life_b`.

- **Scenario 3: Deleting a Save Slot**
  - **GIVEN** slot `life_c` is listed on `/saves`,
  - **WHEN** the player clicks "Delete" on slot `life_c` and confirms,
  - **THEN** the frontend must dispatch `DELETE /api/v1/lives/life_c`,
  - **AND** the backend must delete `life_c.json` from disk,
  - **AND** slot `life_c` must disappear from the UI list.

---

## 4. AC-004: Genuine Career Application & Occupational Transition (P1)
**Issue:** `ISSUE-004` (`apps/web/app/career/page.tsx`)  
**Objective:** Applying for a profession must alter backend character occupation and compensation.

- **Scenario 1: Successful Job Application**
  - **GIVEN** a character aged 18 with 8 years of education and current occupation `Independent Citizen`,
  - **WHEN** the player navigates to `/career` and clicks "Apply for Position" on `Government Secretariat Clerk` (requires age 18+, edu 8+),
  - **THEN** the client must dispatch `POST /api/v1/lives/:id/career/apply` with `{ occupationId: "occupation.government_clerk" }`,
  - **AND** the backend must update `player.occupationId` to `occupation.government_clerk`,
  - **AND** set `yearlyIncome` to 180 coins/year,
  - **AND** log `"Started work as Government Secretariat Clerk"` in the timeline,
  - **AND** the dashboard and career headers must immediately update to display the new title and salary.

- **Scenario 2: Ineligible Job Application Rejected**
  - **GIVEN** a character aged 15 (Adolescent),
  - **WHEN** the player attempts to apply for `Physician / Vaid` (requires age 20+),
  - **THEN** the application must be blocked with an explanatory error notice,
  - **AND** no state change shall occur.

---

## 5. AC-005: Truthful Consequence Presentation in Decision Outcome (P1)
**Issue:** `ISSUE-005` (`apps/web/app/events/page.tsx`)  
**Objective:** The outcome review screen must present the exact state diffs produced by the simulation engine.

- **Scenario 1: Real Consequence Diffs Displayed**
  - **GIVEN** an active dilemma `evt.childhood_illness` where choosing the doctor applies `-20 Wealth` and `+10 Health`,
  - **WHEN** the player confirms the choice and the roll succeeds,
  - **THEN** the API response must include `{ appliedConsequences: [...] }`,
  - **AND** the outcome card must render:
    - `Wealth: -20 Coins` (in red/negative text),
    - `Health: +10 Vitality` (in green/positive text),
  - **AND** it must NOT render the generic hardcoded card (`+10 Wealth, +5 Knowledge, -10 Free Time`).

---

## 6. AC-006: Asymmetric Event Choice Failure Penalties (P1)
**Issue:** `ISSUE-006` (`packages/simulation/src/session.ts`)  
**Objective:** Failing a risky event roll must apply distinct failure penalties rather than discarding consequences.

- **Scenario 1: Failure Consequences Applied on Unsuccessful Roll**
  - **GIVEN** a risky choice with `failureConsequences: [{ target: 'player', property: 'health', op: 'ADD', value: -15 }]`,
  - **WHEN** the random roll fails (`roll >= finalProbability`),
  - **THEN** `player.health` must decrease by 15 points,
  - **AND** the failure consequence must be recorded in `record.consequencesApplied`,
  - **AND** the outcome review screen must display the health reduction.

---

## 7. AC-007: Historical Divergence Integration (P1)
**Issue:** `ISSUE-007` (`packages/simulation/src/divergence.ts`)  
**Objective:** Significant historical interventions must record divergence branches and influence legacy.

- **Scenario 1: High-Impact Choice Creates Divergence**
  - **GIVEN** an event with a consequence targeting divergence scope L3 (Regional, threshold: 55) with importance score 65,
  - **WHEN** the choice resolves successfully,
  - **THEN** `effects.ts` must call `shouldDiverge(65, 3)` (which evaluates to `true`),
  - **AND** create a `DivergenceRecord` appended to `session.divergences`,
  - **AND** upon character death, `legacy.divergenceCount` must be greater than 0,
  - **AND** the `/legacy` screen must display the alternate timeline branch created.

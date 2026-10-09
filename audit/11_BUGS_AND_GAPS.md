# LegacyLife — Deduplicated Bug, Defect & Implementation Gap Register

**Audit Date:** October 2026  
**Auditor:** Technical Auditor & QA Lead  
**Classification System:**
- **P0 — Critical:** Data loss, corruption of game state, destructive overwrites, severe application failure.
- **P1 — High:** Core gameplay loop broken, persistence unreliable, major system returns fabricated results.
- **P2 — Medium:** Meaningful feature incomplete, inconsistent, or degraded with mock data.
- **P3 — Low:** Cosmetic, maintainability, dead routes, minor UX polish.

---

## 1. Master Issue Register

| Issue ID | Priority | Confidence | Affected Area | Title / Summary | File Reference |
|---|---|---|---|---|---|
| **ISSUE-001** | **P0** | CONFIRMED | Dynastic Succession | `playAsHeir` Overwrites and Destroys Ancestor's Save File | `packages/api/src/service.ts:313-318` |
| **ISSUE-002** | **P0** | CONFIRMED | Persistence Engine | Non-Atomic Save Writes Risk File Corruption During Crashes | `packages/api/src/store.ts:38-40` |
| **ISSUE-003** | **P1** | CONFIRMED | Game Management | Save Slots 2 & 3 are Hardcoded Fakes; "Load" Does Nothing | `apps/web/app/saves/page.tsx:58-89, 205` |
| **ISSUE-004** | **P1** | CONFIRMED | Career System | Career Application is Fake UI; No Backend Career Endpoint | `apps/web/app/career/page.tsx:349-360` |
| **ISSUE-005** | **P1** | CONFIRMED | Decision Resolution | Outcome Review Masks Real Engine Diffs with Fake Stat Card | `apps/web/app/events/page.tsx:180-230` |
| **ISSUE-006** | **P1** | CONFIRMED | Simulation Engine | Event Choice Failure Drops All Consequences Except Money | `packages/simulation/src/session.ts:355-360` |
| **ISSUE-007** | **P1** | CONFIRMED | Historical Divergence| Divergence System is 100% Dead Code / Disconnected | `packages/simulation/src/divergence.ts:43-67` |
| **ISSUE-008** | **P2** | CONFIRMED | Health System | 4 of 5 Health Vitals are Hardcoded; Wellness Activities are Fake | `apps/web/app/health/page.tsx:56, 140-180` |
| **ISSUE-009** | **P2** | CONFIRMED | Relationships | Social Kinship Interactions Mutate Ephemeral In-Memory State | `apps/web/app/people/page.tsx:200-205` |
| **ISSUE-010** | **P2** | CONFIRMED | Economy | Ledger Transactions & Financial Action Buttons are Fakes | `apps/web/app/economy/page.tsx:80, 709-800` |
| **ISSUE-011** | **P2** | CONFIRMED | World Gazetteer | `/world` Bypasses Backend Context Resolver; Uses Static Text | `apps/web/app/world/page.tsx:38-101` |
| **ISSUE-012** | **P2** | CONFIRMED | Life Timeline | History Truncated to Last 25 Entries; Early Milestones Lost | `packages/api/src/service.ts:132` |
| **ISSUE-013** | **P2** | CONFIRMED | Service Architecture | Hardcoded Era Branching in Service Layer Violates Generic Engine| `packages/api/src/service.ts:40-60` |
| **ISSUE-014** | **P3** | CONFIRMED | Web Routing | Leftover Dynamic Route Directory `[...slug]` Remains on Disk | `apps/web/app/[...slug]/page.tsx` |
| **ISSUE-015** | **P3** | CONFIRMED | Test Coverage | Zero Automated Tests for Frontend Web Application | `apps/web/` |

---

## 2. Detailed Issue Reports

### ISSUE-001 — P0 (Critical): `playAsHeir` Overwrites Ancestor's Save File
- **Affected File:** [`packages/api/src/service.ts:313-318`](file:///d:/Another%20life/legacylife/packages/api/src/service.ts#L313-L318)
- **Expected Behavior:** When continuing as an heir, the deceased ancestor's life snapshot should remain preserved on disk in the Hall of Ancestors / Dynasty archive, and the heir should receive a new save snapshot file.
- **Actual Behavior:**
  ```typescript
  playAsHeir(id: string): LifeView {
    const { session } = this.load(id);
    const heirSession = createHeirSession(session);
    this.persist(id, heirSession); // Overwrites existing ancestor file!
    return toView(id, heirSession);
  }
  ```
  The heir's session is saved under the ancestor's existing `id`. The ancestor's lifespan, timeline, achievements, cause of death, and eulogy are permanently overwritten and lost.
- **Impact:** Catastrophic loss of dynasty history.
- **Recommended Fix:** Generate a new life ID for the heir (`newId(heirSession.seed)`), save the heir to `store.save(newHeirId, ...)`, and record the ancestor's ID in an ancestral lineage pointer.

---

### ISSUE-002 — P0 (Critical): Non-Atomic Save Writes Risk File Corruption
- **Affected File:** [`packages/api/src/store.ts:38-40`](file:///d:/Another%20life/legacylife/packages/api/src/store.ts#L38-L40)
- **Expected Behavior:** File persistence operations must be atomic (write to temporary file, sync, atomic rename) to prevent incomplete files during interruptions.
- **Actual Behavior:** `writeFileSync(this.pathFor(id), snapshotJson, 'utf-8')` truncates and writes directly to the destination path.
- **Impact:** Any system crash, power loss, or abrupt process termination during a write corrupts the save file into an unparseable state.
- **Recommended Fix:** Write snapshot to `${path}.tmp`, flush, and execute `fs.renameSync(tmpPath, targetPath)`.

---

### ISSUE-003 — P1 (High): Save Slots 2 & 3 are Hardcoded Fakes; "Load" Does Nothing
- **Affected File:** [`apps/web/app/saves/page.tsx:58-89, 205-208`](file:///d:/Another%20life/legacylife/apps/web/app/saves/page.tsx#L58-L89)
- **Expected Behavior:** The `/saves` screen retrieves genuine saved chronicles from `GET /api/v1/lives` and allows the player to load or delete specific save slots.
- **Actual Behavior:**
  - Slots 2 ("Charlotte Sterling") and 3 ("Zubair Khan") are hardcoded static dummy records.
  - Clicking "▶ Load" on slot 2 or 3 only runs:
    ```typescript
    showMessage(`Loaded ${slot.name}! Returning to home.`);
    router.push('/');
    ```
    It never changes `localStorage.getItem('legacylife:lifeId')`. When the user lands on the dashboard, the original character is still loaded.
  - "Delete Save" and "Import Save" are inert toast notifications.
- **Impact:** Completely broken multi-save management.
- **Recommended Fix:** Fetch saved chronicles via `api.listLives()`, render real metadata, wire "Load" to update `lifeId`, and wire "Delete" to `api.deleteLife(id)`.

---

### ISSUE-004 — P1 (High): Career Application is Fake UI; No Backend Career Endpoint
- **Affected File:** [`apps/web/app/career/page.tsx:349-360`](file:///d:/Another%20life/legacylife/apps/web/app/career/page.tsx#L349-L360)
- **Expected Behavior:** Player browses job openings, applies, verifies qualifications, and transitions to that occupation with updated wages and duties.
- **Actual Behavior:** `handleApply` displays a golden toast (`"✓ Position applied! Your petition has been logged..."`). No API request is dispatched; `player.occupationId` never changes; the player remains locked into the hardcoded default job assigned at age 18.
- **Impact:** Breaks core player agency in career and economic progression.
- **Recommended Fix:** Implement `POST /api/v1/lives/:id/career/apply` and wire `career/page.tsx` to dispatch the command and refresh state.

---

### ISSUE-005 — P1 (High): Outcome Review Masks Real Engine Diffs with Fake Stat Card
- **Affected File:** [`apps/web/app/events/page.tsx:180-230`](file:///d:/Another%20life/legacylife/apps/web/app/events/page.tsx#L180-L230)
- **Expected Behavior:** After resolving an event choice, the screen displays the actual consequences applied by the simulation engine (real wealth delta, real reputation gain/loss, health damage, flags).
- **Actual Behavior:**
  ```tsx
  // Hardcoded in events/page.tsx:
  Wealth: resolved.success ? '+10' : '+0'
  Knowledge: +5
  Relationships: +5
  Free Time: -10
  ```
  The UI displays this static card for every event, completely concealing real engine consequences.
- **Impact:** Misinforms the player; disconnects visual feedback from true simulation state.
- **Recommended Fix:** Update `resolveChoice` API response to return the array of `consequencesApplied`, and dynamically render the exact stat deltas in the UI.

---

### ISSUE-006 — P1 (High): Event Choice Failure Drops All Consequences Except Money
- **Affected File:** [`packages/simulation/src/session.ts:355-360`](file:///d:/Another%20life/legacylife/packages/simulation/src/session.ts#L355-L360)
- **Expected Behavior:** Failing a risky event roll should apply failure consequences (injury, loss of standing, disease, arrest, negative relationship drift).
- **Actual Behavior:**
  ```typescript
  const applicable = outcome.success
    ? choice.consequences
    : choice.consequences.filter(
      (c) => c.target === 'player' && c.property === 'wealth' && c.op === 'ADD' &&
        typeof c.value === 'number' && c.value < 0,
    );
  ```
  Failing a choice drops all consequences except negative wealth costs. There is no concept of failure consequences.
- **Impact:** Inability to model failure hazards, illness from exposure, or social fallout.
- **Recommended Fix:** Add `failureConsequences?: Consequence[]` to `Choice` schema and apply it on `outcome.success === false`.

---

### ISSUE-007 — P1 (High): Historical Divergence is 100% Dead Code / Disconnected
- **Affected File:** [`packages/simulation/src/divergence.ts:43-67`](file:///d:/Another%20life/legacylife/packages/simulation/src/divergence.ts#L43-L67)
- **Expected Behavior:** Player actions that cross threshold bars generate alternate timeline branches, recording divergences and altering future historical event presentation.
- **Actual Behavior:** `shouldDiverge` and `createDivergence` are only referenced in unit tests. Neither function is called by the simulation engine, session runner, or web interface.
- **Impact:** Failure to deliver on the central premise of LegacyLife ("living history + alternate history").
- **Recommended Fix:** Wire consequence evaluation to check `divergence` targets and record `DivergenceRecord`s in the session state.

---

### ISSUE-008 — P2 (Medium): 4 of 5 Health Vitals are Hardcoded; Wellness Activities are Fake
- **Affected File:** [`apps/web/app/health/page.tsx:56-59, 140-180`](file:///d:/Another%20life/legacylife/apps/web/app/health/page.tsx#L56-L59)
- **Expected Behavior:** Health dashboard reflects genuine mental and physical vitals, and wellness habits improve vitality.
- **Actual Behavior:** Mental Health is hardcoded to 70, Energy to 75, Sleep to 65, and Immunity to 85. Wellness buttons only trigger toast notifications.
- **Impact:** Degrades immersion and player trust.
- **Recommended Fix:** Track mental health in engine or simplify the UI to display only authentic physical health until supporting vitals are modeled.

---

### ISSUE-009 — P2 (Medium): Kinship Interactions Mutate Ephemeral In-Memory State
- **Affected File:** [`apps/web/app/people/page.tsx:200-205`](file:///d:/Another%20life/legacylife/apps/web/app/people/page.tsx#L200-L205)
- **Expected Behavior:** Interacting with family/friends updates `Relationship` scores in the persistent save snapshot.
- **Actual Behavior:** Mutates a temporary React object (`selectedPerson.relationshipScore += 3`), which resets as soon as the user navigates away.
- **Impact:** Social interactions are meaningless placebo clicks.
- **Recommended Fix:** Implement `POST /api/v1/lives/:id/relationships/:relId/interact` and persist relationship evolution.

---

### ISSUE-010 — P2 (Medium): Ledger Transactions & Financial Actions are Fakes
- **Affected File:** [`apps/web/app/economy/page.tsx:80-142, 709-800`](file:///d:/Another%20life/legacylife/apps/web/app/economy/page.tsx#L80-L142)
- **Expected Behavior:** The ledger reflects actual historical financial transactions, and micro-actions adjust wealth.
- **Actual Behavior:** Transactions are static hardcoded strings; buttons only display toast messages.
- **Impact:** Financial simulation feels fake beyond the working property market.
- **Recommended Fix:** Maintain a persistent `TransactionRecord[]` in `session.ts`.

---

### ISSUE-011 — P2 (Medium): `/world` Bypasses Backend Context Resolver
- **Affected File:** [`apps/web/app/world/page.tsx:38-101`](file:///d:/Another%20life/legacylife/apps/web/app/world/page.tsx#L38-L101)
- **Expected Behavior:** Screen fetches dynamic political governance and active historical events from `GET /api/v1/historical-context`.
- **Actual Behavior:** Renders static client strings and hardcoded event lists.
- **Impact:** World state is disconnected from the simulation engine.
- **Recommended Fix:** Wire `world/page.tsx` to call `api.historicalContext`.

---

### ISSUE-012 — P2 (Medium): History Truncated to Last 25 Entries; Early Milestones Lost
- **Affected File:** [`packages/api/src/service.ts:132`](file:///d:/Another%20life/legacylife/packages/api/src/service.ts#L132)
- **Expected Behavior:** Full life timeline preserves all chronological milestones from birth to old age.
- **Actual Behavior:** `LifeView` only returns `timelineTail: session.timeline.slice(-25)`, causing birth and early education milestones to disappear on the `/life` screen in older characters.
- **Impact:** Degrades life timeline review.
- **Recommended Fix:** Return full `timeline` or structured `history` in `LifeView` and paginate if needed.

---

### ISSUE-013 — P2 (Medium): Hardcoded Era Branching in Service Layer
- **Affected File:** [`packages/api/src/service.ts:40-60`](file:///d:/Another%20life/legacylife/packages/api/src/service.ts#L40-L60)
- **Expected Behavior:** Generic era-agnostic architecture where adding new eras requires zero service modifications.
- **Actual Behavior:** `service.ts` uses hardcoded `isVictorianLocation` ternaries.
- **Impact:** Adding a 3rd era requires editing and recompiling core service code.
- **Recommended Fix:** Introduce an `EraRegistry` mapping location prefixes to datasets.

---

### ISSUE-014 — P3 (Low): Leftover Dynamic Route Directory `[...slug]`
- **Affected File:** `apps/web/app/[...slug]/page.tsx`
- **Expected Behavior:** Repository contains clean routes matching standard Next.js 14 conventions.
- **Actual Behavior:** An obsolete catch-all route file remains on disk despite iteration log 008 claiming it was deleted.
- **Impact:** Potential routing collision.
- **Recommended Fix:** Safely delete `apps/web/app/[...slug]/` in the next implementation iteration.

---

### ISSUE-015 — P3 (Low): Zero Automated Tests for Frontend Web Application
- **Affected Directory:** `apps/web/`
- **Expected Behavior:** Automated tests verify web routing, context providers, and component interactions.
- **Actual Behavior:** No unit, component, or E2E tests exist for `apps/web`.
- **Impact:** Regressions in UI interactions go unnoticed by `npm test`.
- **Recommended Fix:** Add Vitest/React Testing Library tests for key components.

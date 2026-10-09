# LegacyLife — Frontend–Backend Mapping & Traceability Audit

**Audit Date:** October 2026  
**Auditor:** Full-Stack QA & Systems Architect  
**Objective:** Trace every user-facing frontend action from UI trigger down to database persistence, identifying all breaks, mock layers, and disconnected paths.

---

## 1. Master Frontend–Backend Traceability Matrix

| Feature / User Action | UI Screen & Trigger | API Client Method | HTTP Route | Backend Service & Domain Engine | Database / State Object Mutated | Response to UI | Persistence Verified? | Mapping Status |
|---|---|---|---|---|---|---|---|---|
| **Create Life (Auto / Custom)** | `/` (`page.tsx:156,171`)<br/>Click "Begin Journey" | `api.createLife` | `POST /api/v1/lives` | `service.createLife`<br/>`simulation.createSession` | Writes new `life_*.json` under `.data/saves/` | Returns initial `LifeView` | **YES** (File created on D:) | **CONNECTED (PASS)** |
| **Advance 1 Year** | `/` (`page.tsx:121`)<br/>Click "Advance 1 Year" | `api.advance` | `POST /api/v1/lives/:id/advance` | `service.advanceLife`<br/>`simulation.advanceSession` | Updates `session.player.age`, `wealth`, `timeline`, saves snapshot | Returns updated `LifeView` + `stopped` flag | **YES** (Snapshot updated on D:) | **CONNECTED (PASS)** |
| **Resolve Event Choice** | `/events` (`events/page.tsx:56`)<br/>Click "Confirm Decision" | `api.resolveChoice` | `POST /api/v1/lives/:id/events/:id/choices` | `service.resolveChoice`<br/>`effects.applyConsequence` | Executes effects; appends `EventRecord`; saves snapshot | Returns `LifeView` + `success`, `roll` | **YES** (Snapshot updated on D:) | **PARTIAL (UI DIFF MASKED)** |
| **Purchase Real Estate Deed** | `/economy` (`economy/page.tsx:35`)<br/>Click "Acquire Deed" | `api.buyProperty` | `POST /api/v1/lives/:id/properties/buy` | `service.buyProperty`<br/>`session.buyPropertySession` | Deducts cost from `wealth`; appends to `properties[]`; saves snapshot | Returns updated `LifeView` | **YES** (Asset persists and yields accrue) | **CONNECTED (PASS)** |
| **Propose Marriage** | `/people` (`people/page.tsx:49`)<br/>Click "Propose Marriage" | `api.marryPartner` | `POST /api/v1/lives/:id/marry` | `service.marryPartner`<br/>`session.marryPartnerSession` | Adds `spouse` to `family.members` and `relationships`; saves snapshot | Returns updated `LifeView` | **YES** (Spouse persists in family) | **CONNECTED (PASS)** |
| **Welcome Child into Dynasty** | `/people` (`people/page.tsx:61`)<br/>Click "Welcome Child" | `api.haveChild` | `POST /api/v1/lives/:id/children` | `service.haveChild`<br/>`session.haveChildSession` | Adds `child` to `family.members` and `relationships`; saves snapshot | Returns updated `LifeView` | **YES** (Child persists in family) | **CONNECTED (PASS)** |
| **Apply for Career Position** | `/career` (`career/page.tsx:349`)<br/>Click "Apply for Position" | **NONE** | **NONE** | **NONE** | **NONE** (No backend logic invoked) | Toast notification only | **NO** (Never persisted) | **FAKE UI / BROKEN** |
| **Perform Health Activities** | `/health` (`health/page.tsx:56`)<br/>Click "Exercise / Visit Doctor" | **NONE** | **NONE** | **NONE** | **NONE** (No backend logic invoked) | Toast notification only | **NO** (Never persisted) | **FAKE UI / BROKEN** |
| **Kinship Social Interaction** | `/people` (`people/page.tsx:199`)<br/>Click "Talk / Gift / Advice" | **NONE** | **NONE** | **NONE** | Mutates local in-memory React state (`selectedPerson.relationshipScore += 3`) | Toast notification; resets on page leave | **NO** (Reset on unmount) | **CLIENT-ONLY / BROKEN** |
| **Financial Actions (Save/Spend)** | `/economy` (`economy/page.tsx:709`)<br/>Click "Save Coin / Buy Sweets" | **NONE** | **NONE** | **NONE** | **NONE** (No backend logic invoked) | Toast notification only | **NO** (Never persisted) | **FAKE UI / BROKEN** |
| **Inspect World Conditions** | `/world` (`world/page.tsx`)<br/>View City / Cartography | **NONE** | (Backend route `/historical-context` exists) | **NONE** (Frontend bypasses backend) | None | Displays static client text from `era.ts` | **NO** (Static view) | **ORPHANED BACKEND** |
| **Load Game Save (Slots 2 & 3)** | `/saves` (`saves/page.tsx:205`)<br/>Click "▶ Load" | **NONE** | **NONE** | **NONE** | **NONE** (No backend logic invoked) | Toast: `"Loaded Charlotte Sterling!"` -> navigates to `/` | **NO** (Loads nothing) | **FAKE UI / BROKEN** |
| **Delete Saved Chronicle** | `/saves` (`saves/page.tsx:338`)<br/>Click "Delete Save" | **NONE** | (Backend route `DELETE /lives/:id` exists) | **NONE** (Frontend never calls DELETE) | None | Toast: `"Slot management active."` | **NO** (Deletes nothing) | **FAKE UI / BROKEN** |
| **Export Save Snapshot** | `/saves` (`saves/page.tsx:288`)<br/>Click "Export Save" | Native browser | `GET /api/v1/lives/:id/save` | `service.exportSave`<br/>`store.load` | Reads raw JSON snapshot from disk | Browser downloads/displays raw JSON | **YES** | **CONNECTED (PASS)** |
| **Dynastic Succession (Play Heir)** | `/legacy` (`legacy/page.tsx:65`)<br/>Click "Play as Heir" | `api.playAsHeir` | `POST /api/v1/lives/:id/heir` | `service.playAsHeir`<br/>`session.createHeirSession` | **OVERWRITES** same file `life_*.json` on disk; ancestor deleted | Returns new heir `LifeView` | **CORRUPTS/DESTROYS ANCESTOR SAVE** | **FAIL (DATA DESTRUCTION)** |

---

## 2. Sequence Diagram: Working Full-Stack Flow (Advance Time)

```mermaid
sequenceDiagram
    autonumber
    actor Player as Player
    participant UI as Dashboard (apps/web/app/page.tsx)
    participant Ctx as LifeContext
    participant Client as lib/api.ts
    participant Router as server.ts (Port 3001)
    participant Svc as LifeService (service.ts)
    participant Sim as session.ts (advanceSession)
    participant Store as FileSaveStore (store.ts)

    Player->>UI: Clicks "Advance 1 Year"
    UI->>Ctx: advanceLife(1)
    Ctx->>Client: api.advance(lifeId, 1)
    Client->>Router: POST /api/v1/lives/:id/advance { years: 1 }
    Router->>Svc: advanceLife(id, 1)
    Svc->>Store: load(id)
    Store-->>Svc: Stored JSON snapshot string
    Svc->>Sim: advanceSession(session, templates, notesFn, 1)
    Sim->>Sim: processYear(): age+1, healthDrift, economy, history notes
    Sim-->>Svc: AdvanceResult { stopped: 'choice', pending: [...] }
    Svc->>Store: save(id, exportSessionSnapshot(session))
    Store-->>Svc: Persisted to disk
    Svc-->>Router: LifeView { id, date, player, pending, ... }
    Router-->>Client: HTTP 200 JSON
    Client-->>Ctx: setView(advanced)
    Ctx-->>UI: Reactive update
    UI-->>Player: Displays updated age + "Decisions Await" alert banner
```

---

## 3. Sequence Diagram: Broken Flow (Career Application)

```mermaid
sequenceDiagram
    autonumber
    actor Player as Player
    participant UI as CareerPage (career/page.tsx)
    participant Client as lib/api.ts
    participant Router as server.ts
    participant Svc as LifeService

    Player->>UI: Taps "Apply for Position" on Government Clerk
    Note over UI: handleApply(job) executes line 349
    UI->>UI: Checks if playerAge >= job.minAge (18 >= 18 -> True)
    UI->>UI: showToast("✓ Position applied! Your petition has been logged...")
    Note over UI,Client: ❌ BREAK: No API client method called!
    Note over Client,Router: ❌ BREAK: No HTTP request dispatched!
    Note over Router,Svc: ❌ BREAK: No career endpoint exists in backend!
    UI-->>Player: Displays golden success toast
    Note over Player,UI: Player assumes they got the job,<br/>but player.occupationId remains unchanged in backend!
```

---

## 4. Sequence Diagram: Broken Flow (Save Slot Loading)

```mermaid
sequenceDiagram
    autonumber
    actor Player as Player
    participant UI as SavesPage (saves/page.tsx)
    participant Ctx as LifeContext (localStorage)
    participant Client as lib/api.ts

    Player->>UI: Clicks "▶ Load" on Slot 2 (Charlotte Sterling)
    Note over UI: onClick executes line 205
    UI->>UI: showMessage("Loaded Charlotte Sterling! Returning to home.")
    UI->>UI: router.push('/')
    Note over UI,Ctx: ❌ BREAK: Does not change localStorage lifeId!
    Note over UI,Client: ❌ BREAK: Does not call api.getLife("life_slot_2")!
    UI-->>Player: Navigates to Dashboard
    Note over Player,UI: Dashboard reloads OLD character from localStorage,<br/>completely ignoring Charlotte Sterling!
```

---

## 5. Architectural Recommendations for Contract Reconciliation

1. **Implement Missing Backend Endpoints:**
   - Add `POST /api/v1/lives/:id/career/apply` accepting `{ occupationId: string }` and validating education, age, and class prerequisites.
   - Add `POST /api/v1/lives/:id/health/activity` accepting `{ activityId: string }` and modifying health attributes with cooldowns.
   - Add `POST /api/v1/lives/:id/relationships/:relId/interact` accepting `{ action: 'talk' | 'gift' | 'advice' }` to mutate trust and affection in `family.ts`.
2. **Wire `/saves` to Real Backend Slots:**
   - Fetch actual saves using `GET /api/v1/lives`.
   - Update `localStorage.setItem('legacylife:lifeId', selectedId)` upon loading a slot.
   - Connect "Delete Save" to `DELETE /api/v1/lives/:id`.
3. **Pass Authoritative Consequence Diffs to UI:**
   - Modify `resolveSessionChoice` to return `{ appliedConsequences: Consequence[] }`.
   - In `events/page.tsx`, map the actual consequences instead of the hardcoded `+10 Wealth / +5 Knowledge` card.

# LegacyLife — Comprehensive Audit: Executive Summary

**Audit Date:** October 2026  
**Auditor Role:** Senior Software Architect, Reverse Engineer, Full-Stack Lead, Game Systems Designer, QA & Security Auditor  
**Workspace:** `d:\Another life\legacylife`  
**Evaluation Scope:** Complete repository reverse-engineering, specification reconciliation, frontend-backend traceability, gameplay meaningfulness, historical simulation integrity, and security/persistence review.

---

## 1. Executive Headline

**LegacyLife has a functioning headless deterministic simulation kernel and an attractive Android mobile-framed Next.js web interface, but the connective tissue between the player's choices and authoritative game state is fractured, incomplete, or simulated with client-side placeholders.**

The project appears visually polished at first glance, featuring high-fidelity dark/gold aesthetics, responsive mobile styling, and passing automated unit tests (79/79 Vitest). However, forensic inspection reveals that **multiple visible systems are facade-only interactions**. Buttons trigger toast notifications without modifying backend state; vitals meters and financial ledgers display hardcoded values; job applications do not alter employment; the defining feature of the game—**Historical Divergence**—is completely disconnected; and several backend REST endpoints are never invoked by the frontend.

---

## 2. Verified Implementation Status

| Metric / Dimension | Specification Scope | Implemented in Code | Genuinely Connected & Persistent | Status |
|---|---|---|---|---|
| **Core Life Simulation Engine** | Agnostic life cycle (birth → death) | `packages/simulation` (tick, aging, health, stats) | Verified in headless runner & interactive sessions | **PASS** |
| **Historical World Resolver** | Date + Location → Political, Laws, Tech, Events | `packages/historical` (context resolver & validation) | Verified in isolation & headless script; disconnected from web World tab | **PARTIAL** |
| **Historical Content Packs** | 10 Global Eras | 2 Data Packs (Lucknow 1945–1970, Victorian Britain 1840–1890) | Both data packs playable in session runner; hardcoded switch in `service.ts` | **PARTIAL** |
| **Interactive Decisions & Outcomes** | Choice selection → Consequence execution | `packages/simulation/src/session.ts` & `effects.ts` | Backend executes consequences; UI displays hardcoded fake stat deltas | **PARTIAL** |
| **Historical Divergence (L0–L6)** | Personal to Global alternate history | `divergence.ts` (stubs: `shouldDiverge`, `createDivergence`) | Zero callers in simulation engine, session, API, or frontend | **MISSING / DISCONNECTED** |
| **Career & Employment** | Job search, requirements, promotions, salaries | UI displays 8 career tracks; backend sets static job at age 18 | Job applications in UI only show toast; no career API endpoint exists | **MISLEADING / BROKEN** |
| **Economy & Real Estate** | Income, expenses, assets, banking, commerce | Property deeds purchase works end-to-end; passive yields tick | Banking/commerce buttons are fake toasts; transactions are static mock data | **PARTIAL** |
| **Relationships & Genealogy** | Multi-attribute kinship (trust, affection, etc.) | Backend `Relationship` model; marriage/child API | UI directory synthesizes kin client-side; kinship actions do not persist | **PARTIAL** |
| **Health & Vitality** | 5 Vitals, treatments, aging, illness | Backend tracks 1 numeric health value; UI displays 5 vitals | 4 of 5 vitals are hardcoded static numbers; health activities are fake toasts | **MISLEADING / BROKEN** |
| **Save / Load & Game Management** | Multi-slot versioned persistent saves | Single active session via localStorage; file snapshots on D: | UI shows fake slots 2 & 3; "Load", "Import", "Delete" are fake toasts | **MISLEADING / BROKEN** |
| **Dynastic Succession (Play as Heir)** | Transfer estate, preserve ancestral legacy | `createHeirSession` transfers wealth & assets | Overwrites ancestor's save file, obliterating lived history | **FAIL (DATA DESTRUCTION)** |
| **Automated Test Quality** | Comprehensive unit, integration, E2E | 79 Vitest unit tests in packages; 0 frontend tests | Tests cover headless math and session; zero UI/integration tests | **PARTIAL** |

---

## 3. Strongest Parts of the Existing Codebase

1. **Deterministic Simulation Kernel (`packages/simulation/src/rng.ts`, `player.ts`, `engine.ts`)**:
   - Seeded Mulberry32 RNG guarantees deterministic replayability when seeds and inputs are identical.
   - Headless vertical slice runner (`scripts/vertical-slice.ts`) cleanly executes a 60-year lifespan in Lucknow (1946–2006) with zero runtime crashes.
2. **Historical Entity Schemas & Validation (`packages/historical/src/entities.ts`, `validate.ts`)**:
   - Rigorous type contracts enforcing provenance citations, date ranges, and entity references.
   - Built-in data validator catches orphaned foreign keys and inverted chronological boundaries.
3. **Property & Real Estate Acquisition Loop (`apps/web/app/economy/page.tsx`, `packages/api/src/server.ts`)**:
   - Full-stack vertical slice where the player purchases real estate, funds are deducted, deeds are persisted in session snapshots, and annual passive yields accrue into player wealth during yearly ticks.
4. **Mobile Design System & Aesthetic Foundation (`apps/web/app/globals.css`, `AppShell.tsx`)**:
   - Exceptional visual styling matching the reference mockups: obsidian void backgrounds, metallic gold gradients, responsive Android chassis framing, and crisp Google Fonts typography (`Cinzel` and `Inter`).

---

## 4. Weakest Parts & Critical Vulnerabilities

1. **Cosmetic / Placeholder Interactions Throughout Frontend**:
   - `/career`: "Apply for Job" button triggers a toast notification; no backend API is invoked, no occupation changes.
   - `/health`: "Physical Exercise", "Visit Doctor", etc. trigger toasts; player health never improves. Mental Health (70), Energy (75), Sleep (65), and Immunity (85) are hardcoded static values.
   - `/economy`: "Save Pocket Coin", "Buy Sweets", etc. trigger toasts without debiting/crediting wealth.
   - `/saves`: Slots 2 and 3 are hardcoded static mock objects; clicking "▶ Load" only displays a toast and navigates home without loading anything.
2. **The "Consequence Mask" in Decision Resolution (`apps/web/app/events/page.tsx`)**:
   - While the backend engine executes real consequences (wealth, reputation, flags), the frontend ignores the engine's authoritative diff and displays a static, hardcoded card: `+10 Wealth, +5 Knowledge, +5 Relationships, -10 Free Time`.
3. **Historical Divergence is Completely Dead Code (`packages/simulation/src/divergence.ts`)**:
   - The game promises "living history + alternate history", but divergence calculations are completely disconnected from the engine loop. `divergenceCount` is hardcoded to `0` in legacy summaries.
4. **Dynastic Succession Overwrites Ancestor History (`packages/api/src/service.ts`)**:
   - Calling `playAsHeir(id)` overwrites the deceased character's save file (`life_*.json`) with the heir's state instead of generating a new save slot, permanently erasing the ancestor's life achievements and cause of death.
5. **Non-Atomic File Persistence (`packages/api/src/store.ts`)**:
   - Writes directly to disk using `fs.writeFileSync` without temporary files or atomic renaming, creating severe risks of JSON file corruption during crash or power interruption.
6. **Hardcoded Era Branching in Service Layer (`packages/api/src/service.ts`)**:
   - Instead of a generic registry, `service.ts` uses hardcoded `isVictorianLocation(locId)` ternaries, violating the architectural mandate that the simulation engine must remain era-agnostic.

---

## 5. Completion Estimate & Calculation

To provide a defensible, mathematical completion estimate:
- **Total Architectural Capabilities Mandated in Specs (Phases 1–9):** 52 Distinct Core Subsystems.
- **Fully Working & Connected:** 14 Subsystems (26.9%).
- **Partially Working (Code exists but partially wired or stubbed):** 19 Subsystems (36.5%).
- **Broken / Misleading (Fake UI or corrupted data flow):** 11 Subsystems (21.2%).
- **Completely Missing:** 8 Subsystems (15.4%).

**Defensible Functional Completion: ~38% of intended vertical-slice scope.**  
(While the codebase compiles and passes tests, less than two-fifths of the specified mechanics actually operate with genuine causal persistence.)

---

## 6. Top 5 Urgent Priorities

1. **Repair Save/Load Architecture (`P0`)**: Wire `/saves` to `GET /api/v1/lives`, `DELETE /api/v1/lives/:id`, and `service.getLife`, eliminating all fake save slots.
2. **Eliminate Fake UI Actions & Implement Missing Command Endpoints (`P1`)**: Connect Career application, Health activities, and Financial actions to authoritative backend service methods.
3. **Surface Authoritative Consequence Results in Events Screen (`P1`)**: Return consequence diffs from `POST /events/:id/choices` and render actual stat changes instead of the hardcoded `+10 Wealth / +5 Knowledge` card.
4. **Preserve Ancestor Records During Heir Succession (`P0`)**: Make `playAsHeir` create a new save file for the heir while archiving the ancestor's death record in a persistent Dynasty ledger.
5. **Integrate Historical Divergence into the Engine Loop (`P1`)**: Connect `shouldDiverge` and `createDivergence` to high-impact event choices so player actions visibly branch the world state.

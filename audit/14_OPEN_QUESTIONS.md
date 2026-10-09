# LegacyLife — Open Questions & Architectural Decisions

**Audit Date:** October 2026  
**Auditor:** Senior Software Architect  
**Purpose:** Identify only unresolved architectural and product decisions that cannot be definitively answered from repository evidence alone, explaining why each decision materially affects the implementation roadmap.

---

## 1. Decision 1: Long-Term Database Strategy vs Local File Snapshots
- **Context:**
  - `TECHNICAL_IMPLEMENTATION_PLAN.md` §4 and §25 recommend **PostgreSQL** as the primary relational database.
  - However, `CLAUDE.md` Rule 1 (The D-Drive Rule) strictly forbids external dependencies that require root or cross-drive writes, and §39 permits simplifying MVP persistence to deterministic versioned snapshots under the repository directory.
  - The current file-based JSON snapshots (`.data/saves/*.json`) are lightweight (2.5 KB), fully versioned, and completely self-contained on Drive D.
- **Decision Required from Stakeholder:**
  - **Option A (Recommended for MVP):** Continue with local versioned JSON snapshots on Drive D (hardened with atomic writes and SQLite if relational queries are needed), deferring PostgreSQL until a cloud/multiplayer backend is commissioned.
  - **Option B:** Immediately stand up a local PostgreSQL instance (containerized strictly on Drive D) and implement full ORM migrations (Prisma/Drizzle) for Phase B.
- **Why It Matters:** Affects the implementation complexity and toolchain dependencies of Phase B and Phase E.

---

## 2. Decision 2: Prioritization of Mini-Games from Catalog
- **Context:**
  - Iteration 010 created `docs/MINI_GAMES_CATALOG.md` specifying 20 period-accurate mini-games across 5 pillars (The Merchant's Bargain, The Handloom Shuttle, Chausar, Telegraph Key, Gomti Flood Sandbagger, etc.).
  - The user explicitly requested to "Ask before implementing."
- **Decision Required from Stakeholder:**
  - Which specific mini-game(s) should be prioritized for initial implementation during Phase H once the core simulation loops are repaired?
  - Recommended candidates:
    1. *The Merchant's Bargain (Haggling):* Complements the working property/market loop in `/economy`.
    2. *Chausar / Victorian Chess:* Complements courtship and social visits in `/people`.
- **Why It Matters:** Prevents building secondary mini-games before confirming player interest and gameplay fit.

---

## 3. Decision 3: Scope of Historical Divergence Feedback
- **Context:**
  - Phase 1 and Phase 4 mandate historical divergence (alternate historical timelines).
  - Personal (L0–L2) divergences can simply modify character standing, family wealth, and local flags.
  - Regional and National (L3–L6) divergences (e.g. averting the 1965 war, preventing Partition displacement in Lucknow) imply that future world events must diverge from real-world history.
- **Decision Required from Stakeholder:**
  - For the MVP vertical slice, should historical divergence:
    - **Option A (Scoped):** Focus on L0–L3 (Personal, Family, Local, Regional), altering character standing, local flags, and future dilemma eligibility while leaving broad global dates fixed.
    - **Option B (Full Counterfactual):** Include full timeline branches where national events (e.g. elections, wars) can be delayed, cancelled, or replaced with alternate timeline chronicles.
- **Why It Matters:** Determines whether the event engine needs a counterfactual world chronicle generator or localized flag branching for Phase D.

---

## 4. Decision 4: Event Failure Lethality & Sudden Death
- **Context:**
  - Currently, death only occurs during the yearly tick (`session.ts:305-312`) if `age >= lifespan` or `health <= 0`.
  - When event choices fail, the engine currently drops all health penalties.
- **Decision Required from Stakeholder:**
  - Can high-hazard historical dilemmas (e.g., epidemic exposure, collapsing embankment, wartime bombardment) cause immediate character death during event resolution, or should event failures only reduce health and allow the yearly tick to finalize mortality?
- **Why It Matters:** Governs how `resolveSessionChoice` handles mid-year mortality transitions and routes the UI directly to `/legacy`.

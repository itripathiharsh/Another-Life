# AGENTS.md — LegacyLife Agent & Developer Guidelines

Historical life-simulation game ("BitLife + living history + alternate history").
Multi-era, multi-region historical simulation engine with a full REST API and Next.js web application.

---

## 1. Core Principles & Non-Negotiable Rules

### A. Generic Engine, Data-Driven Content
* The simulation engine (`packages/simulation`) is **era/region-agnostic**. No era, location, event, occupation, or currency may be hardcoded into core simulation logic.
* All historical content is **data packs** (`packages/content`), validated before use.
* Currently validated content packs:
  1. **Post-War Transformation Era (1945–1970):** Northern India (Lucknow, Kanpur, Delhi, Prayagraj, Awadh) with partition relief, constitutional dawn, elections, and land reforms.
  2. **Victorian Industrial Britain (1840–1890):** United Kingdom (London, Manchester, Birmingham, Glasgow, Yorkshire) with industrial revolution, mines acts, cholera containment, railway mania, and telegraphy.

### B. CONTEXT.md Protocol
* [`CONTEXT.md`](./CONTEXT.md) at the repository root is the living project chronicle.
* At the conclusion of every work iteration, append an entry: date, stage, what was accomplished, key architectural decisions, and verification results.
* Never delete historical entries — append only.

### C. Deterministic Behavioral State
* All randomness must be seeded and deterministic (`packages/simulation/src/rng.ts`).
* Never use raw unseeded `Math.random()` in core simulation logic.

---

## 2. Monorepo Architecture

```
legacylife/
├── apps/
│   └── web/                   # Next.js 14 App Router, gilded obsidian UI matching design specifications
├── packages/
│   ├── shared/                # Core types, temporal math, political-control resolvers
│   ├── historical/            # Era-agnostic entity schemas, provenance validators, context resolver
│   ├── simulation/            # Headless life engine (RNG, player, aging, family, economy, events, saves)
│   ├── content/               # Historical datasets & life templates (India 1945–1970, Victorian 1840–1890)
│   └── api/                   # REST API server (native Node HTTP server, zero heavy deps, port 3001)
├── scripts/                   # Headless life simulation runner and automated verification scripts
├── docs/                      # Architectural era specifications and mini-games catalog
├── CONTEXT.md                 # Living project history and iteration log
└── AGENTS.md                  # Agent operating instructions
```

---

## 3. Standard Verification Commands

```bash
# Typecheck across all packages
npm run typecheck

# Run test suite across all packages (79 tests)
npm test

# Run the API server
npm run api

# Run the Next.js web application
npm run web
```

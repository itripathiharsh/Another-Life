# LegacyLife

A choice-driven historical life-simulation game. You are born as an ordinary person inside a real
historical world — a clerk in Lucknow in 1946, a weaver in medieval Flanders, a worker in
Manchester in 1890. History moves around you whether you act or not; your choices ripple through
your life, your family, sometimes your region — and, rarely, history itself.

**Architecture principle:** a generic, deterministic simulation engine + data-driven historical
content packs. Adding an era must never require engine changes.

## Repo Layout

```
legacylife/
├── CLAUDE.md            # Rulebook (D-drive rule, protocols, agent conduct) — READ FIRST
├── CONTEXT.md           # Living iteration log — updated every work session
├── docs/                # Design specifications (source of truth)
│   ├── phases/          # Phase 1–9 specs
│   ├── prototypes/      # Paper-prototype life records (LIFE_001–005)
│   └── eras/            # Historical era specifications
├── packages/
│   └── shared/          # Core entity types + temporal/resolver logic (era-agnostic)
├── scripts/
└── .cache/              # npm/temp caches — kept in-repo (D-drive rule), gitignored
```

## Quick Start

```bash
npm install        # cache pinned to repo via .npmrc (nothing touches C: drive)
npm test
```

## Status

Stage 0 (Foundation) complete — see `CONTEXT.md` for the current stage and full history.

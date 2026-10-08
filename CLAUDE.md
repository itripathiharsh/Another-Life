# LegacyLife — Repository Rules (READ FIRST)

Historical life-simulation game ("BitLife + living history + alternate history").
Full design specs live in `docs/` — they are the source of truth, this file is the rulebook.

Repo root: `D:\Another life\legacylife`

---

## RULE 1 — THE D-DRIVE RULE (NON-NEGOTIABLE)

**All project data lives on drive D. NOTHING may be written to drive C. Nothing means nothing.**

- ✅ Allowed: everything inside `D:\Another life\legacylife\` — code, `node_modules`, caches, builds, databases, saves, logs, temp files.
- ❌ Forbidden: `C:\Users\...\AppData`, `C:\Users\...\.npm`, `C:\Users\...\.cache`, `C:\Temp`, **any** `C:` path, for any reason.

### Enforcement (every agent, every session)

1. **npm cache is pinned to the repo** via `.npmrc`. Verify before installs:
   `npm config get cache` → must print a `D:\Another life\legacylife\...` path.
2. **Redirect TMP/TEMP before any command that writes temp files** (installs, builds, tests):
   ```
   TMP="D:/Another life/legacylife/.cache/tmp" TEMP="D:/Another life/legacylife/.cache/tmp" npm install
   ```
3. **No global installs** (`npm i -g` is banned). Use `npx` or devDependencies.
4. Tool-specific caches must be redirected to `D:\Another life\legacylife\.cache\`:
   - Playwright: `PLAYWRIGHT_BROWSERS_PATH=D:/Another life/legacylife/.cache/ms-playwright`
   - pip/uv (if ever used): `PIP_CACHE_DIR` / `UV_CACHE_DIR` → `.cache/`
5. If a tool insists on writing to C: and cannot be redirected — **stop and report**. Do not proceed, do not "just this once" it.

---

## RULE 2 — CONTEXT.md PROTOCOL (EVERY ITERATION)

`CONTEXT.md` at repo root is the living project log.

- **At the end of every work iteration, append an entry**: date, stage, what was done, decisions made, what's next.
- Never delete or rewrite old entries — append only.
- Any agent resuming work reads `CONTEXT.md` first.

---

## RULE 3 — GENERIC ENGINE, DATA-DRIVEN CONTENT

The game must work for ALL eras and regions, not just the MVP slice.

- The simulation engine (`packages/*`) is **era/region-agnostic**. No era, location, event, or occupation may be hardcoded into engine logic.
- All historical content is **data** (structured datasets per era/region), validated before use.
- MVP content slice = Lucknow 1945–1970 — a *data pack*, not an engine feature. Adding a second era must require zero engine changes.
- Never invent historical facts. Uncertain history must be marked as uncertain. Every content item needs provenance.

---

## RULE 4 — STAGE 5 REMINDER (frontend design)

**Before ANY frontend/UI work begins (Stage 5): ASK THE USER for their design reference images.**
The user has reference designs and wants the FE to match them. Do not design the FE from imagination. Extract the design system from their images first.

---

## Build Order (per Phase 9 spec)

```
Stage 0  Foundation (repo, toolchain, rules)          ← DONE
Stage 1  Historical Core (data + context resolver)    ← headless
Stage 2  Simulation Engine (life, events, choices)    ← headless
Stage 3  Headless Vertical Slice proof (full life)
Stage 4  API layer
Stage 5  Frontend  ← ASK USER FOR DESIGN IMAGES FIRST
Stage 6  Wire FE ↔ sim → playable game
Stage 7  Playtest, iterate, expand content/eras
```

## Source-of-Truth Order (if docs conflict, higher wins)

1. `docs/phases/p1.md` — Game Definition
2. `docs/eras/*` — Era specifications
3. `docs/phases/p2.5.md` — Historical World Architecture
4. `docs/phases/p3.md` — Historical Simulation Spec
5. `docs/phases/p4.md` — Event/Choice Engine Spec
6. `docs/phases/p5.md` + `docs/prototypes/*` — Paper Prototype & results
7. `docs/phases/p6.md` — Game Systems Spec
8. `docs/phases/p7.md` — MVP Content / Vertical Slice
9. `docs/phases/p8.md` — UI/UX Spec
10. `docs/phases/TECHNICAL_IMPLEMENTATION_PLAN.md` — Phase 9

If two documents conflict: identify it, do not silently pick, preserve the higher-level rule, document the required change.

## Agent Conduct (from Phase 9 §85)

- One bounded task at a time; read relevant specs first.
- Never invent mechanics or history; never hardcode the MVP era into the engine.
- Write tests with each system; run existing tests before and after changes.
- Preserve deterministic behavior (seeded randomness only).
- Never bypass validation to make a demo work.

## Everyday Commands

```bash
# All commands that write temp files MUST prefix TMP/TEMP (see Rule 1)
npm test                 # run vitest
npm run typecheck        # tsc --noEmit
npm config get cache     # verify D-drive rule
```

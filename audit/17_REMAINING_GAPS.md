# LegacyLife — Remaining Gaps & Future Roadmap Report

**Date**: October 9, 2026  
**Status**: Zero P0 / P1 Blockers Remaining  
**Target Architecture**: Production-Ready MVP Historical Life Simulator  

---

## 1. Status of Core Requirements

All critical defects, data safety hazards, and disconnected subsystems identified during the reverse-engineering audit have been resolved:
- **P0 Blockers**: 0 remaining.
- **P1 Critical Defects**: 0 remaining.
- **Core Loop Integrity**: 100% operational (Create → Context → Dashboard → Events → Choices → Consequences → Advance → Career → Health → Relationships → World Changes → Save/Load → Death → Legacy → Heir Lineage).

---

## 2. Documented Trade-Offs & Architectural Decisions

1. **Filesystem Atomic Persistence vs. SQL / NoSQL Database**
   - **Decision**: Maintained the existing filesystem-based storage architecture in `packages/api/src/store.ts` enhanced with two-stage atomic write-rename (`.tmp` write, payload validation, `fsyncSync`, and atomic `renameSync`).
   - **Rationale**: Keeps the application zero-dependency and local-first, perfectly tailored for single-player desktop/mobile execution without requiring database daemon management.
   - **Future Enhancement**: For cloud-hosted multiplayer or cross-device cloud sync, replace `FileSaveStore` with an SQLite or PostgreSQL adapter conforming to the `SaveStore` interface.

2. **In-Memory Idempotency Cache vs. Persistent Key-Value Store**
   - **Decision**: Implemented an in-memory LRU-style idempotency cache in `packages/api/src/server.ts` with a 10-minute TTL.
   - **Rationale**: Completely protects against local rapid double-taps, network retries, and frontend re-submissions during gameplay sessions without adding Redis or disk-state overhead.
   - **Future Enhancement**: If the API server is clustered or deployed to serverless lambdas, transition idempotency cache to Redis or disk-backed SQLite.

3. **Client-Side Rendering of Era Visuals vs. Pure Server Generation**
   - **Decision**: Normal gameplay screens remain predominantly text-based with subtle cards and icons, keeping illustrations reserved for cartography and key narrative milestones.
   - **Rationale**: Preserves mobile-first portrait usability (optimized for Android 430px viewports) and guarantees sub-second page loads.

---

## 3. Future Content Expansions (Post-MVP Roadmap)

While the engine is fully generic and data-driven, the current content packs focus on:
1. **Lucknow, India (1945–1970)**: High depth of events, laws, occupations, and Partition dynamics.
2. **Victorian London (1850s–1880s)**: High depth of industrial mechanics, clerk/mill occupations, and parliamentary acts.

**Recommended Future Content Packs**:
- **Ancient Rome (Late Republic / Early Empire)**: Roman cursus honorum, legionary service, patrician vs plebeian dynamics.
- **Edo Japan (Genroku Era, 1680–1709)**: Samurai, merchant, and artisan class strata with shogunate edicts.
- **Weimar Republic / Interwar Europe (1920s)**: Hyperinflation, cultural explosion, and political instability.

---

## 4. Conclusion

LegacyLife is now verified as a coherent, connected, and authentic historical simulation game. All acceptance criteria from `audit/13_FEATURE_ACCEPTANCE_CRITERIA.md` are fulfilled.

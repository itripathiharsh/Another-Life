# LegacyLife — Database, Storage & Persistence Audit

**Audit Date:** October 2026  
**Persistence Technology:** File-based JSON Snapshots under `packages/api/.data/saves/*.json`  
**Driver Implementation:** `packages/api/src/store.ts` (`FileSaveStore`)  
**Snapshot Schema:** `SessionSnapshot` in `packages/simulation/src/session.ts:412-447`

---

## 1. Specification vs Implemented Storage Architecture

| Dimension | Specification Requirement (`TECHNICAL_PLAN §25`) | Current Implementation (`packages/api/src/store.ts`) | Architectural Gap / Risk |
|---|---|---|---|
| **Database Engine** | PostgreSQL (relational model with tables) | Local file-based JSON snapshots (`.data/saves/*.json`) | No relational foreign keys, indexes, or SQL querying capability. |
| **Storage Location** | Managed Postgres server | Drive D (`packages/api/.data/saves/`) per Rule 1 | Native to filesystem; zero external network dependencies. |
| **Atomic File Operations** | ACID transactions with rollback boundaries | Synchronous `fs.writeFileSync(path, json, 'utf-8')` | **CRITICAL RISK:** Non-atomic write; process crash corrupts file. |
| **Referential Integrity** | Foreign key constraints on characters, events, trees | Denormalized nested document embedding | Dangling references possible if internal arrays desynchronize. |
| **Save Versioning** | Schema, engine, and content version markers | Embedded: `schemaVersion: 1`, `engineVersion`, `contentVersion` | **PASS:** Robust snapshot metadata preventing silent version drift. |
| **Multi-Slot Persistence** | Multiple independent chronicles per user | Real files exist on disk, but UI only tracks 1 `localStorage` ID | UI hardcodes fake slots; fails to expose real file list. |
| **Dynastic Preservation** | Lineage tree preserved across generations | `playAsHeir` calls `store.save(id, heirSession)` | **CRITICAL DATA DESTRUCTION:** Overwrites ancestor file. |

---

## 2. Snapshot Schema & Payload Inspection

Inspection of real persisted save files (e.g. `life_7yfk9q_muzuefbw_2.json`) confirms that the backend serializes a remarkably complete, deterministic state:

```json
{
  "version": 1,
  "seed": 481096286,
  "rngState": -150739384,
  "lifespan": 65,
  "date": "1954-03-01",
  "player": {
    "id": "player.session",
    "name": "Aarav Sharma",
    "birthDate": "1946-03-01",
    "age": 8,
    "locationId": "location.lucknow",
    "classId": "class.middle",
    "health": 81,
    "wealth": -20,
    "educationYears": 3,
    "skills": { "literacy": 30 },
    "traits": [],
    "reputation": 0,
    "alive": true,
    "properties": []
  },
  "family": {
    "members": [],
    "wealth": 0,
    "reputation": 0
  },
  "relationships": [
    {
      "id": "rel.friend",
      "type": "friend",
      "name": "Mohan",
      "trust": 50,
      "affection": 50,
      "respect": 50,
      "conflict": 0,
      "loyalty": 50,
      "familiarity": 10,
      "dependency": 0,
      "sharedHistory": []
    }
  ],
  "scheduled": [],
  "history": [
    {
      "eventId": "evt.childhood_illness",
      "instanceId": "evt_1950-03-01_1",
      "timestamp": "1950-03-01",
      "locationId": "location.lucknow",
      "selectedChoiceId": "evt.childhood_illness.doctor",
      "outcome": "success",
      "consequencesApplied": [
        { "target": "player", "property": "wealth", "op": "ADD", "value": -20 },
        { "target": "player", "property": "health", "op": "ADD", "value": 10 }
      ],
      "causalChildren": []
    }
  ],
  "flags": {},
  "firedIds": ["evt.childhood_illness"],
  "timeline": ["..."],
  "schooled": true,
  "status": "active",
  "schemaVersion": 1,
  "engineVersion": "0.4.0-stage4",
  "contentVersion": "lucknow-slice-v1"
}
```

### Strengths of the Current Snapshot Model
1. **RNG Reproducibility:** Serializes `rngState`, ensuring that reloading a game does not reroll or desynchronize future random sequences.
2. **Causal Audit Trail:** Preserves `firedIds`, `history` (with choice taken and consequences applied), and `timeline`.
3. **Strict Version Gating (`session.ts:436-441`):**
   ```typescript
   if (parsed.schemaVersion !== SESSION_SCHEMA_VERSION) {
     throw new SessionError('bad-save-version', `Unsupported save schema...`);
   }
   ```

---

## 3. Critical Storage Defects & Data Loss Risks

### 3.1 P0 Defect: Dynastic Succession Erases Ancestors (`packages/api/src/service.ts:313-318`)
- **Code:**
  ```typescript
  playAsHeir(id: string): LifeView {
    const { session } = this.load(id);
    const heirSession = createHeirSession(session);
    this.persist(id, heirSession); // <-- REUSES ANCESTOR'S ID
    return toView(id, heirSession);
  }
  ```
- **Consequence:** Reusing `id` writes the heir's newly initialized session directly over the deceased ancestor's JSON file. The ancestor's lifespan, achievements, cause of death, event log, and eulogy are completely eradicated.
- **Fix:** `createHeirSession` must generate a fresh life ID (e.g. `life_heir_${Date.now()}`), save the heir to a new file, and link back to the ancestor's ID in a `dynastyAncestors: string[]` ledger.

### 3.2 P0 Defect: Non-Atomic File Writes (`packages/api/src/store.ts:38-40`)
- **Code:**
  ```typescript
  save(id: string, snapshotJson: string): void {
    writeFileSync(this.pathFor(id), snapshotJson, 'utf-8');
  }
  ```
- **Risk:** Standard `fs.writeFileSync` truncates the existing file before writing new data. If the server is terminated, power is lost, or an out-of-disk exception occurs mid-write, the JSON file is left half-written and permanently corrupted.
- **Fix:** Implement atomic write pattern: write to `path.tmp`, flush to disk, and execute atomic `fs.renameSync(tmpPath, targetPath)`.

### 3.3 P1 Defect: Save Slot Disconnect in Web UI (`apps/web/app/saves/page.tsx:58-89`)
- **Evidence:**
  The disk contains 6 valid saved chronicles (`life_7vet5b_...`, `life_7xb5zm_...`, etc.), but `saves/page.tsx` hardcodes static dummy slots ("Charlotte Sterling", "Zubair Khan") and never calls `GET /api/v1/lives`. Clicking "Load" does not switch the active game.
- **Fix:** Wire `/saves` to `api.listLives()`, fetch metadata for each slot, and allow the user to select and load any genuine chronicle.

---

## 4. Concurrency & Integrity Assessment

- **Thread Safety / Concurrency:** Because Node.js is single-threaded, in-memory operations are non-preemptive. However, across asynchronous I/O or multi-tab usage, race conditions can occur if two requests modify the same file concurrently. File locking (`proper-lockfile`) should be added.
- **Disk Usage & Retention:** Saves are approximately 2.5 KB each. 1,000 lives require under 3 MB, posing no storage concerns under Drive D constraints.

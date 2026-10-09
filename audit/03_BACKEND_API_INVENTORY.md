# LegacyLife — Backend API & Endpoint Inventory

**Audit Date:** October 2026  
**Backend Framework:** Native Node.js `node:http` (Zero third-party HTTP dependencies)  
**Host & Port:** `http://127.0.0.1:3001` (`packages/api/src/serve.ts`)  
**Router & Handler:** `packages/api/src/server.ts`  
**Domain Service:** `packages/api/src/service.ts` (`LifeService`)  
**Storage Driver:** `packages/api/src/store.ts` (`FileSaveStore`)

---

## 1. Complete HTTP Endpoint Catalog

| HTTP Method | Route Pattern | Handler in `server.ts` | Service Method | Request Payload | Response Schema | Frontend Consumer | Status |
|---|---|---|---|---|---|---|---|
| `GET` | `/api/v1/historical-context` | line 122 | `service.historicalContext(date, locId)` | Query: `?date=&locationId=` | `{ date, location, political, activeEvents, availableOccupations, activeLaws }` | **NONE** (Never called by UI) | **ORPHANED** |
| `POST` | `/api/v1/lives` | line 130 | `service.createLife(input)` | `{ name, seed?, birthDate?, locationId?, classId? }` | `LifeView` (201 Created) | `api.createLife` (`page.tsx`) | **PASS** |
| `GET` | `/api/v1/lives` | line 144 | `service.listLives()` | None | `{ lives: string[] }` (200 OK) | **NONE** (`saves/page.tsx` omits this) | **ORPHANED** |
| `GET` | `/api/v1/lives/:id` | line 154 | `service.getLife(id)` | None | `LifeView` (200 OK) | `api.getLife` (`LifeContext.tsx`) | **PASS** |
| `DELETE` | `/api/v1/lives/:id` | line 158 | `service.deleteLife(id)` | None | `{ deleted: id }` (200 OK) | **NONE** (`saves/page.tsx` uses fake toast) | **ORPHANED** |
| `GET` | `/api/v1/lives/:id/save` | line 163 | `service.exportSave(id)` | None | Raw JSON Snapshot string | Direct browser `window.open` | **PASS** |
| `POST` | `/api/v1/lives/:id/advance` | line 172 | `service.advanceLife(id, years)` | `{ years: number }` | `LifeView & { stopped: string }` | `api.advance` (`page.tsx`) | **PASS** |
| `POST` | `/api/v1/lives/:id/events/:eventId/choices` | line 177 | `service.resolveChoice(id, eventId, choiceId)` | `{ choiceId: string }` | `LifeView & { success, roll, finalProbability }` | `api.resolveChoice` (`events/page.tsx`) | **PASS** |
| `POST` | `/api/v1/lives/:id/properties/buy` | line 188 | `service.buyProperty(id, prop)` | `{ id, name, type, cost, annualYield }` | `LifeView` (200 OK) | `api.buyProperty` (`economy/page.tsx`) | **PASS** |
| `POST` | `/api/v1/lives/:id/marry` | line 200 | `service.marryPartner(id, partnerName)` | `{ partnerName: string }` | `LifeView` (200 OK) | `api.marryPartner` (`people/page.tsx`) | **PASS** |
| `POST` | `/api/v1/lives/:id/children` | line 206 | `service.haveChild(id, childName)` | `{ childName: string }` | `LifeView` (200 OK) | `api.haveChild` (`people/page.tsx`) | **PASS** |
| `POST` | `/api/v1/lives/:id/heir` | line 212 | `service.playAsHeir(id)` | None | `LifeView` (200 OK) | `api.playAsHeir` (`legacy/page.tsx`) | **DEFECT (DATA DESTRUCTION)** |

---

## 2. Orphaned & Disconnected Endpoints (Backend Implemented, Frontend Ignores)

1. **`GET /api/v1/historical-context?date=&locationId=`**:
   - *Intended Purpose:* Provide authoritative historical entity metadata for cartography and gazetteer screens.
   - *Backend Implementation:* Completely functional. Calls `resolveHistoricalContext(date, locationId, dataset)` and outputs political authority, active events, and available occupations.
   - *Frontend Gap:* `apps/web/app/world/page.tsx` never calls this endpoint. Instead, the page hardcodes static text strings.
2. **`GET /api/v1/lives`**:
   - *Intended Purpose:* List all saved life IDs stored on disk for slot selection and game management.
   - *Backend Implementation:* Reads `FileSaveStore.list()`, returning an array of saved IDs (e.g. `["life_7vet5b_...", "life_bl3nx_..."]`).
   - *Frontend Gap:* `apps/web/app/saves/page.tsx` never fetches this list. Instead, it displays fake hardcoded slots ("Charlotte Sterling", "Zubair Khan").
3. **`DELETE /api/v1/lives/:id`**:
   - *Intended Purpose:* Allow players to delete obsolete or deceased save slots.
   - *Backend Implementation:* Invokes `store.remove(id)` to unlink the JSON snapshot.
   - *Frontend Gap:* The "Delete Save" option on `/saves` triggers an inert toast (`"Slot management active."`) rather than calling this endpoint.

---

## 3. Missing Endpoints Mandated by Specification

The following endpoints are required by the game design specifications (Phases 6, 8, 9) but **do not exist anywhere in the backend codebase**:

| Missing Endpoint | Spec Reference | Required Capability | Current Workaround / Defect |
|---|---|---|---|
| `POST /api/v1/lives/:id/career/apply` | Phase 6 §14, Phase 9 §43 | Apply for occupation, evaluate requirements, update `occupationId`, set salary. | Frontend shows fake toast (`career/page.tsx:358`); job never changes. |
| `POST /api/v1/lives/:id/health/activity` | Phase 6 §16, Phase 9 §43 | Perform medical consult or wellness habit; alter health, recovery, or disease status. | Frontend shows fake toast (`health/page.tsx:57`); health never changes. |
| `POST /api/v1/lives/:id/relationships/:relId/interact` | Phase 6 §12, Phase 9 §43 | Talk, gift, or seek advice; mutate `trust`, `affection`, or `conflict` in `family.ts`. | Frontend mutates ephemeral client object (`people/page.tsx:203`). |
| `POST /api/v1/lives/:id/economy/transaction` | Phase 6 §15, Phase 9 §43 | Spend pocket money, buy equipment, take loans; adjust wealth and log transaction. | Frontend shows fake toast (`economy/page.tsx:732`); wealth never changes. |
| `POST /api/v1/lives/import` | Phase 9 §39 | Upload external save JSON snapshot into storage. | Frontend shows fake toast (`saves/page.tsx:311`). |

---

## 4. Request & Response Validation Review

### 4.1 Schema Validation Quality
- **Body Parser (`server.ts:55-83`):**
  - Limits payloads to 1 MB (`BODY_LIMIT_BYTES = 1024 * 1024`).
  - Rejects malformed JSON with 400 Bad Request (`code: "bad-body"`).
- **Error Formatting (`server.ts:38-45`):**
  - Uniform structured error response:
    ```json
    {
      "code": "bad-advance",
      "message": "years must be an integer 1..120",
      "request_id": "req_14"
    }
    ```
- **HTTP Status Mapping (`server.ts:47-53`):**
  - Maps `not-found` -> 404.
  - Maps `unknown-event`, `ineligible-choice`, `life-ended` -> 409 Conflict.
  - Maps all other `SessionError` / `StoreError` -> 400 Bad Request.

### 4.2 Security, Concurrency & Idempotency Defects
1. **No Idempotency Key Handling (`Phase 9 §45 violation`):**
   - Endpoints that perform non-idempotent state mutations (`POST /advance`, `POST /choices`, `POST /properties/buy`) do not accept an `Idempotency-Key` or `client_command_id`. If a mobile device sends a duplicate tap under network latency, the character can be billed twice or advanced two years.
2. **Missing Concurrency Controls / Race Conditions:**
   - The file store loads the entire JSON snapshot into memory, mutates it, and overwrites the file. Two concurrent requests for the same life ID will cause the second write to silently discard the first mutation.
3. **No Authentication or Ownership Checks:**
   - While acceptable for a single-player local proof-of-concept, the API exposes full read, delete, and overwrite access to any caller providing an ID string.

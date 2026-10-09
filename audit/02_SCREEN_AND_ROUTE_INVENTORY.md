# LegacyLife — Screen and Route Inventory

**Audit Date:** October 2026  
**Application:** `@legacylife/web` (`apps/web`)  
**Design Reference Image Match:** 30 PNG Mockups (`apps/web/public/images/`)  
**Viewport Framework:** Mobile portrait 430px chassis (`AppShell.tsx` + `globals.css`)

---

## 1. Master Route Directory

| Route Path | Component File | Matches Design Image | Functional Status | Primary Vulnerability |
|---|---|---|---|---|
| `/` | `apps/web/app/page.tsx` | `Landing  Start.png`, `Choose Life Mode...`, `Custom Life Setup...`, `LegacyLife Dashboard in Paris.png` | **PARTIAL** | Hero & setup works; stat formulas are heuristics; "What would you like to do?" links just navigate to tabs. |
| `/events` | `apps/web/app/events/page.tsx` | `Choice Selection.png`, `Choice Result  Consequences.png`, `event situation.png` | **PARTIAL** | Resolves choices via API, but consequence review displays hardcoded fake stat deltas (+10 Wealth, +5 Knowledge). |
| `/career` | `apps/web/app/career/page.tsx` | `Career.png` | **MISLEADING** | "Apply for Position" button is a fake toast; no backend career endpoint exists; occupation never updates. |
| `/economy` | `apps/web/app/economy/page.tsx` | `Economy  Finances.png` | **PARTIAL** | Real estate deed purchase works & persists; transaction log is hardcoded static mock; banking buttons are fake toasts. |
| `/health` | `apps/web/app/health/page.tsx` | `LegacyLife Health Dashboard.png` | **MISLEADING** | 4 of 5 vitals are hardcoded static numbers; all 8 wellness activity buttons only show fake toasts. |
| `/life` | `apps/web/app/life/page.tsx` | `Life Timeline.png`, `Timeline Event Detail.png` | **PARTIAL** | Reads `view.timelineTail`, but tail truncates history to last 25 entries, causing early-life milestones to disappear. |
| `/people` | `apps/web/app/people/page.tsx` | `LegacyLife People Directory.png`, `Person  Relationship Detail.png`, `Family  Genealogy.png` | **PARTIAL** | Marriage & children persist via API; social interactions (Talk, Gift) mutate ephemeral objects that reset on unmount. |
| `/world` | `apps/web/app/world/page.tsx` | `LegacyLife World Overview.png`, `Historical Map.png` | **MISLEADING** | Does not query backend `/api/v1/historical-context`; displays hardcoded regional matrix and static global events. |
| `/saves` | `apps/web/app/saves/page.tsx` | `Save  Load  Game Management.png` | **MISLEADING** | Slots 2 & 3 are hardcoded fake saves; "Load" does nothing; "Delete", "Import", and "Details" are fake toasts. |
| `/legacy` | `apps/web/app/legacy/page.tsx` | `LegacyLife Death Summary UI.png`, `LegacyLife_ Your Legacy End Screen.png`, `LegacyLife_ Life Review Summary.png` | **FAIL (DATA DESTRUCTION)** | "Play as Heir" works but overwrites ancestor's save file, destroying historical legacy and life review records. |
| `/[...slug]` | `apps/web/app/[...slug]/page.tsx` | N/A | **DEAD ROUTE** | Leftover dynamic catch-all route that conflicts with standard `not-found.tsx`. |

---

## 2. Granular Screen-by-Screen Audit

### 2.1 Screen: Home & Dashboard (`/`)
- **Component:** `HomePage` ([page.tsx](file:///d:/Another%20life/legacylife/apps/web/app/page.tsx))
- **Intended Purpose:** Manage game entry, era/customization setup, active life dashboard, vital stats overview, and the primary loop driver ("Advance 1 Year").
- **States & Sub-Views:**
  1. *Hero Landing:* Artwork, logo, "Start Your Journey →" CTA, modal trailer.
  2. *Mode Selection:* Auto Create ("Surprise Me →") vs Custom Life wizard.
  3. *Custom Setup Wizard:* Epoch selector (Post-War India vs Victorian Britain), date dropdown, location picker, social class selection, character name/gender input, context summary preview, birth ceremony card.
  4. *Active Dashboard:* Circular avatar, character details, era badge, 5-stage life progress track (Childhood, Education, Career, Family, Legacy), 5 stat cards with animated bars, current situation narrative, "Decisions Await" alert banner, "What would you like to do?" action list, "Advance 1 Year" gold button.
- **Data Sources & API Interactions:**
  - `useLife()` context (`view`, `loading`, `error`, `createNewLife`, `advanceLife`).
  - `POST /api/v1/lives` on life creation.
  - `POST /api/v1/lives/:id/advance` on time advance.
- **Vulnerabilities & Findings:**
  - *Heuristic Stat Bars (lines 829–833):*
    ```typescript
    const relationVal = Math.min(100, Math.max(0, view.familyMembers.length * 20 + 20));
    const knowledgeVal = Math.min(100, Math.max(0, p.educationYears * 12 + 10));
    ```
    Relationships stat is simply a count of family members multiplied by 20. It completely ignores backend relationship trust/affection scores.
  - *"What would you like to do?" is purely navigational:*
    Cards like "Play & Explore", "Attend School Lessons", "Apprenticeships & Trades" look like playable choices, but are merely hyperlinks navigating to `/health`, `/career`, etc.

---

### 2.2 Screen: Decisions & Outcomes (`/events`)
- **Component:** `EventsPage` ([events/page.tsx](file:///d:/Another%20life/legacylife/apps/web/app/events/page.tsx))
- **Intended Purpose:** Present active historical dilemmas and decision points; resolve choices; display narrative and statistical consequences.
- **Sub-Views:**
  1. *Decision Selection Screen:* Event title, historical narrative, location pill, choice cards with predictive pills (`+ Income`, `High Risk`, etc.).
  2. *Consequence Review Screen:* Your Choice recap, narrative outcome, "Changes in Your Life" impact breakdown, "New Opportunities" unlocked, "Continue →" CTA.
  3. *Empty State:* "No Decisions Await — Advance time by 1 year on your dashboard."
- **Data Sources & API Interactions:**
  - Reads `view.pending` (array of `PendingEvent`).
  - Calls `api.resolveChoice(lifeId, eventId, choiceId)` -> `POST /api/v1/lives/:id/events/:eventId/choices`.
- **Vulnerabilities & Findings:**
  - *Hardcoded Consequence Diff (lines 180–230):*
    ```typescript
    // Regardless of event, always renders:
    Wealth / Income: resolved.success ? '+10' : '+0'
    Knowledge: +5
    Relationships: +5
    Free Time: -10
    ```
    The frontend completely fabricates stat changes on the result screen rather than displaying the real effects executed by `effects.ts`.
  - *Naive Predictive Pills (lines 17–46):* Choice tag pills (`+ Income`, `+ Knowledge`) are guessed via string `.includes('work')` or `.includes('study')` from the title rather than inspecting template consequence schemas.

---

### 2.3 Screen: Career & Calling (`/career`)
- **Component:** `CareerPage` ([career/page.tsx](file:///d:/Another%20life/legacylife/apps/web/app/career/page.tsx))
- **Intended Purpose:** Track occupational standing, browse era-authentic job vacancies, verify qualifications, apply for employment, view daily duties.
- **Displayed Content:**
  - Current role banner (age-gated: Infant in Parental Care vs School Student vs Apprentice vs Full-time Profession).
  - 8 job listings tailored by era (Post-War India vs Victorian Britain) with income, age requirements, duties, and skills.
- **Actions:**
  - Tab switcher: `Job Opportunities`, `Career Progression`, `Skills & Calling`, `Guild Duties`.
  - "Apply for Position" button on each listing.
- **Vulnerabilities & Findings:**
  - **CRITICAL MOCK INTERACTION (lines 349–360):**
    ```typescript
    function handleApply(job: Job): void {
      if (age < job.minAge) { showToast(...); return; }
      showToast(`✓ Position applied! Your petition for ${job.title} has been logged with the guild masters.`);
    }
    ```
    The application button does nothing except display a toast notification. No API call is made; `player.occupationId` is never modified; no job state is saved.

---

### 2.4 Screen: Economy & Assets (`/economy`)
- **Component:** `EconomyPage` ([economy/page.tsx](file:///d:/Another%20life/legacylife/apps/web/app/economy/page.tsx))
- **Intended Purpose:** Monitor net worth, review income and expenses, inspect real estate deeds, acquire property, and conduct financial operations.
- **Displayed Content:**
  - Total wealth KPI, monthly wages, living costs, housing status.
  - Transaction ledger history.
  - Owned Property Deeds grid (with live annual passive yield counter).
  - Real Estate & Commercial Market catalog (Townhouses, Shops, Farmland, Havelis, Mills).
  - Financial Actions tab.
- **Data Sources & API Interactions:**
  - `buyProperty` helper calling `POST /api/v1/lives/:id/properties/buy`.
- **Vulnerabilities & Findings:**
  - *Hardcoded Transaction Log (lines 80–142):* Transactions are static dummy arrays hardcoded in the component (`"Bought sweet jalebi at bazaar"`, `"Bought slate pencil"`). They do not reflect real economic deductions or historical purchases.
  - *Fake Financial Action Buttons (lines 709–800):*
    - "Save Pocket Coin": Only shows toast `"✓ Put a pocket coin into your wooden piggy box. Saved +1!"` — does not add coins.
    - "Buy Bazaar Sweets (-1 Coin)": Only shows toast — does not deduct wealth.
    - "Buy School Slate": Only shows toast.
    - "Deposit Stipend": Only shows toast.
    - "Buy Craft Tools": Only shows toast.
  - *Working Exception:* The property deed purchase market (lines 35–55) is genuinely wired to the backend API and persists.

---

### 2.5 Screen: Health & Well-being (`/health`)
- **Component:** `HealthPage` ([health/page.tsx](file:///d:/Another%20life/legacylife/apps/web/app/health/page.tsx))
- **Intended Purpose:** Display vitality metrics, diagnose physical ailments, and provide healthcare/wellness interventions.
- **Displayed Content:**
  - Overall health status badge (`Healthy` vs `Unwell`).
  - 5 Health Vitals meters: Physical Health, Mental Health, Energy, Sleep, Immunity.
  - 8 Wellness Activities (age-gated: Infant feeding vs child games vs adult exercise/doctor visits).
- **Vulnerabilities & Findings:**
  - **CRITICAL HARDCODED METRICS (lines 140–180):**
    - `Physical Health`: Reads `player.health` (Real).
    - `Mental Health`: Hardcoded `70 / 100` (Fake).
    - `Energy`: Hardcoded `75 / 100` (Fake).
    - `Sleep`: Hardcoded `65 / 100` (Fake).
    - `Immunity`: Hardcoded `85 / 100` (Fake).
  - **CRITICAL MOCK ACTIVITIES (lines 56–59):**
    ```typescript
    function performActivity(title: string): void {
      setToast(`✓ Completed: ${title}. Vitality boosted.`);
    }
    ```
    Every single health activity button ("Visit Doctor", "Take Medicine", "Physical Exercise") only shows a toast message without affecting `player.health` or making an API request.

---

### 2.6 Screen: Life Timeline (`/life`)
- **Component:** `LifeTimelinePage` ([life/page.tsx](file:///d:/Another%20life/legacylife/apps/web/app/life/page.tsx))
- **Intended Purpose:** Chronological ledger of all life chapters, personal milestones, historical events, and causal consequences.
- **Displayed Content:**
  - Chapters Carousel (Childhood, Youth, Early Adulthood, Peak, Elderhood).
  - Key Milestones horizontal timeline.
  - Historical Chronicle Feed.
  - Milestone Detail Modal.
- **Data Sources:**
  - `view.timelineTail` (array of formatted string logs).
- **Vulnerabilities & Findings:**
  - *History Truncation Bug:* The backend `LifeView` only returns `timelineTail: session.timeline.slice(-25)`. In an older character (age 40+), birth, childhood schooling, and early historical events are sliced off and disappear from the timeline feed.
  - *String Parsing Fragility:* Milestones are extracted via regex parsing on string logs (`note.match(/^(\d{4})-\d{2}-\d{2}.../)`) rather than structured `EventRecord` objects.

---

### 2.7 Screen: People & Relationships (`/people`)
- **Component:** `PeoplePage` ([people/page.tsx](file:///d:/Another%20life/legacylife/apps/web/app/people/page.tsx))
- **Intended Purpose:** Directory of kinship and social ties, interactive relationship cards, family genealogy tree, marriage, and childbirth.
- **Displayed Content:**
  - Category filters: `All`, `Family`, `Friends`, `Romantic`, `Work`, `Others`.
  - Directory grid with relationship strength bars.
  - Interactive Person Detail modal (Talk, Gift, Spend Time, Advice, Distance).
  - Multi-generation Family Tree view.
  - Marriage Proposal and Child Birth actions.
- **Data Sources & API Interactions:**
  - `marryPartner` -> `POST /api/v1/lives/:id/marry` (Real).
  - `haveChild` -> `POST /api/v1/lives/:id/children` (Real).
- **Vulnerabilities & Findings:**
  - *Client-Side Kinship Synthesis:* The directory contacts (Father, Mother, Brother, Friend, Mentor) are generated client-side from `getFamilyKinshipProfile` rather than retrieved from the backend `session.relationships` model.
  - *Ephemeral Interaction Score Mutation (lines 200–205):*
    ```typescript
    selectedPerson.relationshipScore = Math.min(100, selectedPerson.relationshipScore + 3);
    ```
    Tapping "Talk", "Gift", or "Spend Time" increments a property on an in-memory object that is discarded when the component unmounts. No API call is made; no backend relationship evolves.

---

### 2.8 Screen: World Gazetteer (`/world`)
- **Component:** `WorldPage` ([world/page.tsx](file:///d:/Another%20life/legacylife/apps/web/app/world/page.tsx))
- **Intended Purpose:** Provide geopolitical context, local city conditions, regional life matrices, and active historical events.
- **Displayed Content:**
  - City profile card (Population, Government, Language, Economy, Historic Lore).
  - Regional Life Conditions Matrix (Wealth, Education, Healthcare, Safety).
  - Global Historical Chronicle news feed.
- **Vulnerabilities & Findings:**
  - **COMPLETELY DISCONNECTED FROM BACKEND:** The backend implements a rich context resolver at `GET /api/v1/historical-context?date=&locationId=`, but `/world` never calls it.
  - Instead, the page renders hardcoded static profiles from `ALL_CITY_METADATA` and a static array of events (`Cabinet Mission`, `Land Reforms`, etc.) with fixed dates (`15 Mar`, `28 Feb`, `10 Jan`).

---

### 2.9 Screen: Game Management & Saves (`/saves`)
- **Component:** `SavesPage` ([saves/page.tsx](file:///d:/Another%20life/legacylife/apps/web/app/saves/page.tsx))
- **Intended Purpose:** Save slot selection, continue current chronicle, load previous saves, export/import snapshots, delete saves.
- **Displayed Content:**
  - Saved Lives list (Slots 1, 2, 3).
  - Empty Slots list (Slots 4, 5).
  - Game Options menu (Export Save, Import Save, Save Details, Delete Save).
- **Vulnerabilities & Findings:**
  - **CRITICAL FAKE DATA (lines 58–89):**
    Slot 2 ("Charlotte Sterling, London 1851") and Slot 3 ("Zubair Khan, Delhi 1946") are hardcoded static mock objects.
  - **CRITICAL FAKE LOAD (lines 205–208):**
    Clicking "▶ Load" on Slot 2 or 3 only executes:
    `showMessage("Loaded " + slot.name + "! Returning to home."); router.push('/');`
    It does NOT call `api.getLife` or switch `localStorage` `lifeId`. It merely redirects to `/` with the existing life still active!
  - **FAKE OPTIONS:** "Import Save", "Save Details", and "Delete Save" only display toast messages. None of them invoke API methods.

---

### 2.10 Screen: Dynasty, Death & Legacy (`/legacy`)
- **Component:** `LegacyPage` ([legacy/page.tsx](file:///d:/Another%20life/legacylife/apps/web/app/legacy/page.tsx))
- **Intended Purpose:** End-of-life memorial, cause of death analysis, multidimensional legacy evaluation, life review, and dynastic succession ("Play as Heir").
- **Sub-Views:**
  1. *Living Character View:* "Dynasty & Living Heritage" banner, projected legacy, will & testament.
  2. *Deceased Character View:* Tombstone memorial, cause of death, life summary KPI, laurel wreath memory card, life review narrative.
  3. *"Play as Heir" CTA:* Ascend to household leadership.
- **Data Sources & API Interactions:**
  - `playAsHeir` calling `POST /api/v1/lives/:id/heir`.
- **Vulnerabilities & Findings:**
  - **CRITICAL ANCESTOR DESTRUCTION BUG:** When "Play as Heir" is triggered, the backend `service.ts` calls `this.persist(id, heirSession)` using the **same life ID**, overwriting the ancestor's JSON snapshot with the new character. The entire life review, achievements, and death record of the ancestor are permanently obliterated from disk.

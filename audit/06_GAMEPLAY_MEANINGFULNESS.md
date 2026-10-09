# LegacyLife — Gameplay Meaningfulness & Causal Depth Audit

**Audit Date:** October 2026  
**Perspective:** Senior Game Systems Designer & Historical Simulation Lead  
**Evaluation Standard:** LegacyLife is not a generic CRUD management tool; it is a historical life simulator ("BitLife + Living History + Alternate Timelines"). Features are evaluated based on whether player decisions create genuine causal consequences, meaningful trade-offs, and historical resonance.

---

## 1. Feature Classification Taxonomy

Each discovered feature is classified into one of seven gameplay categories:

- **CORE:** Essential to the fundamental gameplay loop; the game fails without it.
- **SUPPORTING:** Deepens or connects core systems, increasing historical immersion.
- **OPTIONAL:** Adds flavour or secondary utility; non-essential for initial vertical slice.
- **REDUNDANT:** Duplicates existing functionality without adding distinct value.
- **COSMETIC ONLY:** Visual presentation with zero underlying mechanics or state mutation.
- **MISLEADING:** Appears interactive to the player, but produces no persistent state modification (fake interactions).
- **OUT OF SCOPE:** Distracting features that should be deferred until the core loop is solid.

---

## 2. Feature-by-Feature Gameplay Evaluation

### 2.1 Character Creation & Historical Origin
- **Classification:** **CORE**
- **Gameplay Need:** Establishes player identity, family context, class privileges, geographic constraints, and the historical epoch they inhabit.
- **Player Decisions:** Auto-generation vs custom date, location, social class, and name.
- **State Read & Changed:** Reads era data packs; initializes `CharacterState` (`age: 0`, `wealth: 0`, `health: 100`, `classId`, `locationId`).
- **Causal Connection:** Directly sets the baseline for life expectancy, schooling years, initial occupation options, and available historical dilemmas.
- **Evaluation:** Genuinely meaningful and functioning. Proves the foundational premise of `Birth Date + Location = Historical Context`.

---

### 2.2 Time Advance & Aging Engine (`Advance 1 Year`)
- **Classification:** **CORE**
- **Gameplay Need:** Drives the progression of time, triggering bodily maturation, educational milestones, wage collection, living costs, and historical world events.
- **Player Decisions:** Deciding when to advance time after reviewing situation and pending decisions.
- **State Read & Changed:** Reads `player.age`, `occupationId`, `properties`; increments age, adjusts health drift, accrues income/expenses/yields, advances date.
- **Causal Connection:** Connects directly to mortality checks (`age >= lifespan` or `health <= 0`), life stage gating, and event eligibility.
- **Evaluation:** Genuinely functioning and well-structured.

---

### 2.3 Historical Dilemmas & Decision Resolution
- **Classification:** **CORE**
- **Gameplay Need:** Provides the primary interactive choices where the player confronts real historical dilemmas (Partition refugees, Republic Day, elections, war civil defense, worker strikes).
- **Player Decisions:** Choosing between ethical, financial, or political actions with distinct risk/reward probabilities.
- **State Read & Changed:** Reads player stats and world flags; updates wealth, reputation, relationships, and triggers delayed consequences.
- **Causal Connection:** Drives branching life paths; unlocks or suppresses future scheduled events.
- **Evaluation:** **Flawed Execution.** While the backend simulation logic is causal and persistent, the frontend masks the real results and displays a fake, hardcoded stat delta card (`+10 Wealth, +5 Knowledge`). The gameplay value is severely compromised until the frontend truthfully reveals real engine consequences.

---

### 2.4 Career & Job Market
- **Classification:** **CORE**
- **Gameplay Need:** Earning a livelihood, climbing the social hierarchy, fulfilling guild or clerical duties, and shaping civic standing.
- **Player Decisions:** Browsing job listings, reviewing requirements, applying for positions.
- **State Read & Changed:** *Intended:* Read age/education; modify `player.occupationId` and `income`. *Actual:* **Modifies nothing.**
- **Evaluation:** **MISLEADING.** The career screen is an interactive facade. The "Apply" button triggers a toast notification, but makes no API call and changes no backend state. The player is forced into an automated occupation assigned at age 18. This breaks player agency in economic self-determination.

---

### 2.5 Real Estate & Property Deeds
- **Classification:** **SUPPORTING**
- **Gameplay Need:** Wealth accumulation, investing capital into historical assets (orchards, bazaar shops, townhouses, textile looms), generating passive annual income.
- **Player Decisions:** Selecting properties within budget; balancing liquidity against recurring yield.
- **State Read & Changed:** Reads `player.wealth`; deducts purchase cost; appends `PropertyAsset` to `player.properties`; accrues annual yields into wealth.
- **Causal Connection:** Survives save/load; yields compound into net worth; assets inherit to heirs.
- **Evaluation:** Genuinely meaningful and working end-to-end. One of the strongest full-stack vertical slices in the application.

---

### 2.6 Financial Actions (Allowance, Sweets, Supplies)
- **Classification:** **MISLEADING**
- **Gameplay Need:** Provide micro-decisions during childhood and youth (saving pocket money in a box, buying sweets, buying slate pencils).
- **Player Decisions:** Tapping action buttons in `/economy`.
- **State Read & Changed:** *Intended:* Deduct 1 coin, boost happiness/reputation. *Actual:* **Zero state change.** Only fires a toast notification.
- **Evaluation:** Degrades player trust. These buttons must either be connected to real wealth modifications or removed until properly implemented.

---

### 2.7 Health Activities & Vitals
- **Classification:** **MISLEADING**
- **Gameplay Need:** Maintaining vitality, recovering from illnesses, seeking medical consultations, mitigating workplace fatigue.
- **Player Decisions:** Choosing wellness habits (exercise, healthy diet, doctor consultation).
- **State Read & Changed:** *Intended:* Modify physical/mental vitality. *Actual:* **Zero state change.**
- **Evaluation:** Displays 5 meters, 4 of which are hardcoded static numbers (Mental Health: 70, Energy: 75, Sleep: 65, Immunity: 85). Activities only show toast notifications. Fails to deliver specified gameplay mechanics.

---

### 2.8 Marriage, Children & Family Lineage
- **Classification:** **CORE**
- **Gameplay Need:** Building a family, nurturing dynasty, securing heirs for succession, deepening emotional investment in the character's life.
- **Player Decisions:** Proposing marriage at age 18+; welcoming children into the family dynasty.
- **State Read & Changed:** Mutates `family.members` and `relationships`; appends timeline milestones; updates Family Tree visualization.
- **Causal Connection:** Children become eligible heirs; family size scales projected legacy; relationships persist in save snapshots.
- **Evaluation:** Genuinely functioning and well-integrated into the gameplay loop.

---

### 2.9 Social Interactions with Kin & Friends (Talk, Gift, Advice)
- **Classification:** **MISLEADING / COSMETIC ONLY**
- **Gameplay Need:** Nurturing relationships, mitigating conflict, gaining advice or financial assistance.
- **Player Decisions:** Tapping "Talk", "Gift", "Spend Time" in the Person Detail modal.
- **State Read & Changed:** Mutates an in-memory client object (`selectedPerson.relationshipScore += 3`) that is immediately discarded upon navigation.
- **Evaluation:** Does not modify backend `family.ts` relationships. Needs to be wired to authoritative backend state.

---

### 2.10 World Gazetteer & Regional Conditions
- **Classification:** **COSMETIC ONLY**
- **Gameplay Need:** Informing the player of broader historical conflicts, geopolitical governance shifts, and regional economic disparities.
- **Player Decisions:** Passive inspection.
- **State Read & Changed:** None. Reads client-side static strings.
- **Evaluation:** Bypasses the backend `GET /historical-context` endpoint. While aesthetically attractive, it does not respond to simulation changes.

---

### 2.11 Dynastic Succession ("Play as Heir")
- **Classification:** **CORE (CURRENTLY DESTRUCTIVE)**
- **Gameplay Need:** Allows the player to continue their family dynasty across generations after death, inheriting wealth and properties.
- **Player Decisions:** Ascending to household leadership as the heir.
- **State Read & Changed:** Reads deceased player's wealth (transfers 80%) and property deeds; creates new character.
- **Causal Connection:** Bridges generational gameplay.
- **Evaluation:** **CRITICAL DEFECT.** Overwrites the deceased ancestor's save file, destroying all historical legacy and life review records. Must be corrected to preserve the family lineage tree.

---

### 2.12 Historical Divergence Engine
- **Classification:** **CORE (CURRENTLY MISSING)**
- **Gameplay Need:** LegacyLife's signature unique selling proposition: the ability of an ordinary person to influence history and create alternate historical timelines.
- **Player Decisions:** High-risk historical choices (preventing a conflict, saving a historical figure, passing reform).
- **State Read & Changed:** Should alter world flags, delay/prevent historical events, and create `DivergenceRecord`s.
- **Evaluation:** **100% Dead Code.** Stubs exist in `divergence.ts`, but are never called. This is the single largest gameplay gap in the project.

---

## 3. Summary Classification Table

| Feature | Classification | Gameplay Value | Causal Depth | Status |
|---|---|---|---|---|
| **Character Creation** | CORE | High | High | PASS |
| **Yearly Time Advance** | CORE | High | High | PASS |
| **Event Choices** | CORE | High | High (in engine) | PARTIAL (UI masks diff) |
| **Career Applications** | CORE | High | None | MISLEADING / BROKEN |
| **Real Estate Purchases** | SUPPORTING | High | High | PASS |
| **Financial Actions (Bazaar)**| SUPPORTING | Low | None | MISLEADING |
| **Health Vitals & Habits** | CORE | High | Low | MISLEADING |
| **Marriage & Children** | CORE | High | High | PASS |
| **Kinship Interactions** | SUPPORTING | Medium | None | MISLEADING |
| **World Gazetteer** | SUPPORTING | Medium | None | COSMETIC ONLY |
| **Save / Load Slots** | CORE | High | None (slots 2 & 3 fake) | MISLEADING / BROKEN |
| **Dynastic Succession** | CORE | High | Negative (destroys data)| CRITICAL DEFECT |
| **Historical Divergence** | CORE | Critical | None (not wired) | MISSING |
| **Mini-Games Catalog** | OPTIONAL | Medium | None (design doc only) | SPECIFICATION ONLY |

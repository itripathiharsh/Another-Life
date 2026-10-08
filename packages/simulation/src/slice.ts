// Vertical-slice runner: a complete deterministic life, birth → death →
// legacy (Stage 3). GENERIC — all content (templates, income, historical
// notes) is injected via SliceConfig. Consequence conventions live in
// effects.ts (shared with interactive sessions). Outcome rule: success
// applies all consequences; failure still applies wealth costs (value<0
// ADD) — the price is paid either way.

import {
  contextFromPlayer,
  createEventRecord,
  isEligible,
  resolveOutcome,
  resetInstanceCounter,
  triggerDue,
  type Choice,
  type EvalContext,
  type EventRecord,
  type ScheduledEvent,
  type SimEventTemplate,
} from './events';
import { applyConsequence, type EffectBundle } from './effects';
import {
  createFamily,
  createRelationship,
  type FamilyRecord,
  type Relationship,
} from './family';
import { computeLegacy, type DeathCause, type Legacy } from './legacy';
import { agePlayer, createPlayer, killPlayer, stageForAge, type CharacterState } from './player';
import { createRng, type Rng } from './rng';
import { createSnapshot, serializeSnapshot } from './save';
import { annualHealthDrift, applyEconomy, gainEducation, setOccupation } from './systems';

export interface SliceConfig {
  seed: number;
  name: string;
  birthDate: string;
  locationId: string;
  classId: string;
  schoolStartAge: number;
  schoolEndAge: number;
  workStartAge: number;
  occupationId: string;
  yearlyIncome: number;
  yearlyExpenses: number;
  templates: SimEventTemplate[];
  historicalNotes: (date: string, locationId: string) => string[];
  friendName: string;
}

export interface SliceResult {
  timeline: string[];
  deathAge: number;
  deathDate: string;
  cause: DeathCause;
  legacy: Legacy;
  snapshotJson: string;
  eventCount: number;
  finalWealth: number;
}

function addYears(dateISO: string, years: number): string {
  const [y = 0, m = 1, d = 1] = dateISO.split('-').map(Number);
  const pad = (n: number): string => String(n).padStart(2, '0');
  return `${y + years}-${pad(m)}-${pad(d)}`;
}

export function runLife(config: SliceConfig): SliceResult {
  resetInstanceCounter();
  const rng: Rng = createRng(config.seed);
  const lifespan = 55 + Math.floor(rng() * 20);

  let player: CharacterState = createPlayer({
    id: 'player.slice',
    name: config.name,
    birthDate: config.birthDate,
    locationId: config.locationId,
    classId: config.classId,
  });
  let family: FamilyRecord = createFamily();
  const friend: Relationship = createRelationship({
    id: 'rel.friend',
    type: 'friend',
    name: config.friendName,
  });
  let relationships: Relationship[] = [friend];
  let scheduled: ScheduledEvent[] = [];
  const history: EventRecord[] = [];
  const timeline: string[] = [];
  const flags: Record<string, number> = {};
  const fired = new Set<string>();
  let schooled = false;

  const log = (date: string, msg: string): void => {
    timeline.push(`${date} (age ${player.age}, ${stageForAge(player.age)}): ${msg}`);
  };

  const ctxFor = (date: string): EvalContext =>
    ({ ...contextFromPlayer(player, date), ...flags }) as EvalContext;

  const bundleForFire = (): EffectBundle => ({
    player,
    family,
    relationships,
    flags,
    scheduled,
  });

  const syncFromBundle = (b: EffectBundle): void => {
    player = b.player;
    family = b.family;
    relationships = b.relationships;
    scheduled = b.scheduled;
  };

  const fireTemplate = (template: SimEventTemplate, date: string, viaSchedule: boolean): void => {
    if (fired.has(template.id)) return;
    const ctx = ctxFor(date);
    const choice: Choice | undefined = template.choices.find((ch) => isEligible(ch.requirements, ctx));
    if (!choice) {
      if (viaSchedule) {
        log(date, `Scheduled ${template.id} cancelled (requirements no longer hold)`);
      }
      return;
    }
    const outcome = resolveOutcome(choice.baseProbability, 0, rng);
    const record = createEventRecord({
      eventId: template.id,
      timestamp: date,
      locationId: player.locationId,
    });
    record.selectedChoiceId = choice.id;
    record.outcome = outcome.success ? 'success' : 'failure';
    const applicable = outcome.success
      ? choice.consequences
      : choice.consequences.filter(
        (c) => c.target === 'player' && c.property === 'wealth' && c.op === 'ADD' &&
          typeof c.value === 'number' && c.value < 0,
      );
    const sealed: string[] = [];
    const bundle = bundleForFire();
    for (const c of applicable) {
      if (c.timing === 'hidden') {
        sealed.push(`${date}: [hidden consequence sealed — source ${c.source}]`);
      }
      applyConsequence(bundle, c, date);
      record.consequencesApplied.push(c);
    }
    syncFromBundle(bundle);
    history.push(record);
    fired.add(template.id);
    log(
      date,
      `Event ${template.id} — chose "${choice.title}" → ${record.outcome} (roll ${outcome.roll.toFixed(1)} vs ${outcome.finalProbability})`,
    );
    for (const line of sealed) timeline.push(line);
  };

  // --- birth ---
  log(config.birthDate, `Born in ${config.locationId}`);
  for (const note of config.historicalNotes(config.birthDate, config.locationId)) {
    timeline.push(`${config.birthDate}: [world] ${note}`);
  }

  let deathDate = config.birthDate;
  let cause: DeathCause = 'old_age';

  for (let age = 0; age <= 100; age++) {
    const date = addYears(config.birthDate, age);
    if (age > 0) {
      player = agePlayer(player, 1);
      player = {
        ...player,
        health: annualHealthDrift(player.health, {
          age: player.age,
          healthcareAccess: player.age < 2 ? 'none' : 'basic',
          livingConditions: 'average',
          occupationHazard: 0,
        }),
      };
      if (player.occupationId) {
        player = applyEconomy(player, {
          income: config.yearlyIncome,
          expenses: config.yearlyExpenses,
        });
      } else {
        const isDependentChild = age < config.workStartAge;
        player = applyEconomy(player, { income: 0, expenses: isDependentChild ? 0 : 20 });
      }
      if (age >= config.schoolStartAge && age < config.schoolEndAge) {
        if (!schooled) {
          log(date, 'Started school');
          schooled = true;
        }
        player = gainEducation(player, 1);
      }
      if (age === config.schoolEndAge && schooled) log(date, 'Left school');
      if (age === config.workStartAge) {
        player = setOccupation(player, {
          occupationId: config.occupationId,
          income: config.yearlyIncome,
        });
        log(date, `Started work as ${config.occupationId} (income ${config.yearlyIncome}/yr)`);
      }
    }

    for (const note of config.historicalNotes(date, config.locationId)) {
      const tag = `[world] ${note}`;
      if (!timeline.some((line) => line.includes(tag))) {
        timeline.push(`${date}: ${tag}`);
      }
    }

    const ctx = ctxFor(date);
    for (const template of config.templates) {
      if (!fired.has(template.id) && isEligible(template.requirements, ctx)) {
        fireTemplate(template, date, false);
      }
    }

    const due = scheduled.filter((s) => triggerDue(s, ctxFor(date)));
    scheduled = scheduled.filter((s) => !triggerDue(s, ctxFor(date)));
    for (const s of due) {
      const template = config.templates.find((t) => t.id === s.eventId);
      if (!template) {
        log(date, `Scheduled ${s.eventId} has no template — dropped`);
        continue;
      }
      if (isEligible(template.requirements, ctxFor(date))) {
        fireTemplate(template, date, true);
      } else {
        log(date, `Scheduled ${s.eventId} cancelled (requirements no longer hold)`);
      }
    }

    if (player.age >= lifespan || player.health <= 0) {
      deathDate = date;
      cause = player.health <= 0 && player.age < lifespan ? 'disease' : 'old_age';
      player = killPlayer({ ...player, age: Math.max(player.age, age) });
      log(date, `Died (${cause})`);
      break;
    }
  }

  const legacy = computeLegacy({
    player,
    family,
    history,
    relationshipCount: relationships.length,
    divergenceCount: 0,
    death: { date: deathDate, age: player.age, cause, locationId: player.locationId },
  });
  timeline.push(`${deathDate}: Legacy — ${legacy.summary}`);

  const snapshotJson = serializeSnapshot(
    createSnapshot({
      seed: config.seed,
      date: deathDate,
      player,
      family,
      relationships,
      scheduled,
      history,
      divergences: [],
      timeline,
    }),
  );

  return {
    timeline,
    deathAge: player.age,
    deathDate,
    cause,
    legacy,
    snapshotJson,
    eventCount: history.length,
    finalWealth: player.wealth,
  };
}

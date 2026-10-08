// Stage 1 — Historical Context Resolver.
// Resolution order per Phase 2.5 §5:
// DATE → REGION → POLITICAL TERRITORY → PERIOD → SOCIAL CONTEXT → WORLD STATE.
// Deterministic: same inputs → same output. Unsupported combos return
// undefined fields, never invented data.

import type {
  DateISO,
  HistoricalEventEntity,
  LocationEntity,
  PoliticalControlRecord,
  PoliticalEntity,
} from '../../shared/src/types';
import { assertValidDate, withinRange } from '../../shared/src/temporal';
import type {
  DiseaseEntity,
  LawEntity,
  OccupationEntity,
  SocialClassEntity,
  TechnologyEntity,
} from './entities';

export interface HistoricalDataset {
  locations: readonly LocationEntity[];
  politicalEntities: readonly PoliticalEntity[];
  controlRecords: readonly PoliticalControlRecord[];
  events: readonly HistoricalEventEntity[];
  occupations: readonly OccupationEntity[];
  classes: readonly SocialClassEntity[];
  technologies: readonly TechnologyEntity[];
  diseases: readonly DiseaseEntity[];
  laws: readonly LawEntity[];
}

export interface HistoricalContext {
  date: DateISO;
  location: LocationEntity;
  politicalControl: PoliticalControlRecord | undefined;
  politicalEntity: PoliticalEntity | undefined;
  /** Events whose range covers the date and include this location. */
  activeEvents: HistoricalEventEntity[];
  /** Occupations valid for this date + location. */
  availableOccupations: OccupationEntity[];
  /** Classes valid for this date. */
  activeClasses: SocialClassEntity[];
  /** Technologies adopted by this date (adoptionStart <= date). */
  availableTechnologies: TechnologyEntity[];
  /** Diseases whose range covers the date. */
  activeDiseases: DiseaseEntity[];
  /** Laws whose range covers the date. */
  activeLaws: LawEntity[];
}

export function resolveHistoricalContext(
  date: DateISO,
  locationId: string,
  dataset: HistoricalDataset,
): HistoricalContext | undefined {
  assertValidDate(date);
  const location = dataset.locations.find((l) => l.id === locationId);
  if (!location) return undefined;

  const politicalControl = dataset.controlRecords.find(
    (r) => r.locationId === locationId && withinRange(date, r.range),
  );
  const politicalEntity = politicalControl
    ? dataset.politicalEntities.find((e) => e.id === politicalControl.entityId)
    : undefined;

  const activeEvents = dataset.events.filter(
    (e) => withinRange(date, e.range) && e.locationIds.includes(locationId),
  );
  const availableOccupations = dataset.occupations.filter(
    (o) => withinRange(date, o.range) && o.locationIds.includes(locationId),
  );
  const activeClasses = dataset.classes.filter((c) => withinRange(date, c.range));
  const availableTechnologies = dataset.technologies.filter(
    (t) => t.adoptionStart <= date,
  );
  const activeDiseases = dataset.diseases.filter((d) => withinRange(date, d.range));
  const activeLaws = dataset.laws.filter((l) => withinRange(date, l.range));

  return {
    date,
    location,
    politicalControl,
    politicalEntity,
    activeEvents,
    availableOccupations,
    activeClasses,
    availableTechnologies,
    activeDiseases,
    activeLaws,
  };
}

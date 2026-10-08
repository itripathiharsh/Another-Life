import { describe, expect, it } from 'vitest';
import {
  LUCKNOW_LIFE_TEMPLATES,
  lucknowYearNotes,
} from '../../../content/src/index';
import {
  deserializeSnapshot,
  runLife,
  type SimEventTemplate,
  type SliceConfig,
} from '../index';

function lucknowConfig(seed: number): SliceConfig {
  return {
    seed,
    name: 'Slice Person',
    birthDate: '1946-03-01',
    locationId: 'location.lucknow',
    classId: 'class.middle',
    schoolStartAge: 6,
    schoolEndAge: 14,
    workStartAge: 18,
    occupationId: 'occupation.government_clerk',
    yearlyIncome: 180,
    yearlyExpenses: 120,
    templates: LUCKNOW_LIFE_TEMPLATES,
    historicalNotes: lucknowYearNotes,
    friendName: 'Mohan',
  };
}

describe('Stage 3 vertical slice (Lucknow 1946 life)', () => {
  it('runs a complete coherent life: birth → death → legacy', () => {
    const result = runLife(lucknowConfig(19460301));
    expect(result.deathAge).toBeGreaterThanOrEqual(50);
    expect(result.deathAge).toBeLessThanOrEqual(80);
    expect(result.eventCount).toBeGreaterThanOrEqual(5);
    expect(result.legacy.summary).toContain('Slice Person');
    expect(result.timeline.length).toBeGreaterThan(15);
  });

  it('weaves real history through the life (Raj → Republic, 1947, 1965)', () => {
    const result = runLife(lucknowConfig(19460301));
    const text = result.timeline.join('\n');
    expect(text).toContain('British Raj');
    expect(text).toContain('Republic of India');
    expect(text).toContain('Independence of India');
    expect(text).toContain('1965');
  });

  it('is deterministic: same seed → identical life', () => {
    const a = runLife(lucknowConfig(19460301));
    const b = runLife(lucknowConfig(19460301));
    expect(a.timeline).toEqual(b.timeline);
    expect(a.snapshotJson).toBe(b.snapshotJson);
  });

  it('different seeds can diverge', () => {
    const a = runLife(lucknowConfig(19460301));
    const b = runLife(lucknowConfig(99999999));
    expect(a.timeline).not.toEqual(b.timeline);
  });

  it('save snapshot restores the final state', () => {
    const result = runLife(lucknowConfig(19460301));
    const restored = deserializeSnapshot(result.snapshotJson);
    expect(restored.player.id).toBe('player.slice');
    expect(restored.history).toHaveLength(result.eventCount);
    expect(restored.timeline).toEqual(result.timeline);
  });

  it('chains fire in causal order (help→return, invest→review)', () => {
    const rigged: SimEventTemplate[] = LUCKNOW_LIFE_TEMPLATES.map((t) => ({
      ...t,
      choices: t.choices.map((c) => ({ ...c, baseProbability: 100 })),
    }));
    const result = runLife({
      ...lucknowConfig(7),
      yearlyIncome: 300,
      yearlyExpenses: 100,
      templates: rigged,
    });
    const text = result.timeline.join('\n');
    expect(text).toContain('evt.help_friend');
    expect(text).toContain('evt.friend_returns');
    expect(text).toContain('evt.invest');
    expect(text).toContain('evt.invest_review');
    // causal order: cause precedes effect
    expect(text.indexOf('evt.invest —')).toBeLessThan(text.indexOf('evt.invest_review —'));
    expect(text.indexOf('evt.help_friend —')).toBeLessThan(text.indexOf('evt.friend_returns —'));
    // review fires exactly once (no scheduled/template double-fire)
    expect(text.split('evt.invest_review —').length - 1).toBe(1);
  });
});

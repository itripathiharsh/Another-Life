'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLife } from '../../components/LifeContext';
import { ApiError, api, type Consequence } from '../../lib/api';

interface ResolvedState {
  eventTitle: string;
  eventDesc: string;
  choiceTitle: string;
  choiceDesc?: string;
  success: boolean;
  roll?: number;
  finalProbability?: number;
  appliedConsequences: Consequence[];
}

function formatConsequence(c: Consequence): {
  icon: string;
  label: string;
  changeText: string;
  isPositive: boolean;
  isNegative: boolean;
  note: string;
} {
  let icon = '📊';
  let label = c.property;
  if (c.property === 'wealth') {
    icon = '🪙';
    label = 'Wealth / Wealth Assets';
  } else if (c.property === 'health') {
    icon = '❤️';
    label = 'Physical Health';
  } else if (c.property === 'reputation') {
    icon = '⭐';
    label = 'Social Reputation';
  } else if (c.property === 'educationYears') {
    icon = '🎓';
    label = 'Education & Study';
  } else if (c.property === 'occupationId' || c.property === 'occupation') {
    icon = '💼';
    label = 'Occupation';
  } else if (c.target === 'relationship') {
    icon = '👥';
    label = 'Relationship Affinity';
  } else if (c.target === 'world') {
    icon = '🌐';
    label = `Historical Shift (${c.property})`;
  }

  const op = String(c.op).toLowerCase();
  let changeText = String(c.value);
  let isPositive = false;
  let isNegative = false;

  if (typeof c.value === 'number') {
    if (op === 'add') {
      changeText = c.value > 0 ? `+${c.value}` : `${c.value}`;
      isPositive = c.value > 0;
      isNegative = c.value < 0;
    } else if (op === 'multiply') {
      changeText = `×${c.value}`;
      isPositive = c.value > 1;
      isNegative = c.value < 1;
    } else {
      changeText = `→ ${c.value}`;
    }
  } else {
    changeText = `${c.value}`;
  }

  const note =
    c.target === 'relationship' && c.relationshipId
      ? `Bond with ${c.relationshipId.replace(/^person\./, '').replace(/_/g, ' ')}`
      : c.source
      ? `From: ${c.source.replace(/^event\./, '').replace(/_/g, ' ')}`
      : 'Authoritative outcome';

  return { icon, label, changeText, isPositive, isNegative, note };
}

// Generate realistic predictive tags for choices if not specified in engine
function getChoicePills(title: string, desc: string = ''): { text: string; type: 'pos' | 'neg' | 'neu' | 'gold' }[] {
  const combined = (title + ' ' + desc).toLowerCase();
  const pills: { text: string; type: 'pos' | 'neg' | 'neu' | 'gold' }[] = [];

  if (combined.includes('work') || combined.includes('job') || combined.includes('earn') || combined.includes('invest') || combined.includes('clerk')) {
    pills.push({ text: '+ Income', type: 'pos' });
  }
  if (combined.includes('study') || combined.includes('learn') || combined.includes('school') || combined.includes('book') || combined.includes('exam')) {
    pills.push({ text: '+ Knowledge', type: 'pos' });
  }
  if (combined.includes('friend') || combined.includes('marry') || combined.includes('family') || combined.includes('help') || combined.includes('social')) {
    pills.push({ text: '+ Relationships', type: 'pos' });
  }
  if (combined.includes('protest') || combined.includes('fight') || combined.includes('war') || combined.includes('revolution') || combined.includes('risk')) {
    pills.push({ text: 'High Risk / High Impact', type: 'gold' });
    pills.push({ text: '- Safety', type: 'neg' });
  }
  if (combined.includes('study') && combined.includes('job')) {
    pills.push({ text: '- Study Time', type: 'neg' });
  }
  if (combined.includes('decline') || combined.includes('refuse') || combined.includes('ignore')) {
    pills.push({ text: 'No Immediate Effect', type: 'neu' });
  }

  if (pills.length === 0) {
    pills.push({ text: '+ Experience', type: 'pos' });
    pills.push({ text: 'No Immediate Risk', type: 'neu' });
  }

  return pills;
}

export default function EventsPage(): JSX.Element {
  const { view, loading, refresh } = useLife();
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | undefined>(undefined);
  const [resolving, setResolving] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [resolved, setResolved] = useState<ResolvedState | undefined>(undefined);

  async function handleResolve(eventId: string, eventTitle: string, eventDesc: string, choiceId: string, choiceTitle: string, choiceDesc?: string): Promise<void> {
    if (!view) return;
    setResolving(true);
    setError(undefined);
    try {
      const result = await api.resolveChoice(view.id, eventId, choiceId);
      setResolved({
        eventTitle,
        eventDesc,
        choiceTitle,
        choiceDesc,
        success: result.success === true,
        roll: result.roll,
        finalProbability: result.finalProbability,
        appliedConsequences: result.appliedConsequences ?? [],
      });
      await refresh();
    } catch (err) {
      setError(err instanceof ApiError ? `${err.code}: ${err.message}` : 'API unreachable');
    } finally {
      setResolving(false);
    }
  }

  if (loading && !view) {
    return (
      <div className="ll-card" style={{ textAlign: 'center', padding: 30 }}>
        <p className="ll-muted">Consulting the historical records…</p>
      </div>
    );
  }

  if (!view) {
    return (
      <div className="ll-card" style={{ textAlign: 'center', padding: 30 }}>
        <h2>No Active Life Found</h2>
        <p className="ll-muted" style={{ margin: '8px 0 16px' }}>
          Please start a journey from the home screen first.
        </p>
        <Link href="/" className="ll-btn-gold" style={{ textDecoration: 'none' }}>
          ← Return to Home
        </Link>
      </div>
    );
  }

  // 1. RESULT & CONSEQUENCES SCREEN (Matches 'Choice Result Consequences.png')
  if (resolved) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Event Header Card */}
        <section className="ll-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'rgba(230, 179, 77, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold-400)',
                fontSize: '1.2rem',
              }}
            >
              📜
            </div>
            <div>
              <span className="ll-pill gold" style={{ fontSize: '0.72rem' }}>Event</span>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--cream)' }}>{resolved.eventTitle}</h3>
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5 }}>
            {resolved.eventDesc}
          </p>
        </section>

        {/* Your Choice Card */}
        <section className="ll-card ll-card-gold" style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ color: 'var(--gold-400)' }}>🧭</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--gold-300)', fontWeight: 600 }}>Your Choice</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(230, 179, 77, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.3rem',
                color: 'var(--gold-300)',
              }}
            >
              ✓
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--cream)' }}>{resolved.choiceTitle}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {resolved.choiceDesc || 'You made your decision and stepped forward.'}
              </p>
            </div>
          </div>
        </section>

        {/* Narrative Result Card */}
        <section className="ll-card">
          <h3 className="ll-section-title" style={{ marginBottom: 6 }}>
            <span className="ll-section-icon">📑</span> Result
          </h3>
          <p style={{ lineHeight: 1.6, fontSize: '0.92rem', color: 'var(--text)' }}>
            {resolved.success
              ? 'Your decision took hold successfully. People in your community noticed, and the immediate challenges turned into a foothold for your growth.'
              : 'The outcome met unexpected resistance. Circumstances tested your resolve and resources, leaving an indelible mark on your journey.'}
          </p>
          <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
            <span className={resolved.success ? 'll-pill positive' : 'll-pill negative'}>
              {resolved.success ? 'Outcome: Favorable Success' : 'Outcome: Complicated Failure'}
            </span>
            {resolved.roll !== undefined && resolved.finalProbability !== undefined && (
              <span className="ll-pill neutral" style={{ fontSize: '0.75rem' }}>
                Roll: {resolved.roll} (Chance: {resolved.finalProbability}%)
              </span>
            )}
          </div>
        </section>

        {/* Actual Authoritative Consequences Breakdown */}
        <section className="ll-card">
          <h3 className="ll-section-title" style={{ marginBottom: 12 }}>
            <span className="ll-section-icon">📊</span> Changes in Your Life
          </h3>
          {resolved.appliedConsequences.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '4px 0' }}>
              No permanent stat alterations resulted directly from this choice.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {resolved.appliedConsequences.map((c, idx) => {
                const item = formatConsequence(c);
                return (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom:
                        idx === resolved.appliedConsequences.length - 1
                          ? 'none'
                          : '1px solid var(--border)',
                      paddingBottom: idx === resolved.appliedConsequences.length - 1 ? 0 : 8,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>{item.icon}</span>
                      <span style={{ fontWeight: 600 }}>{item.label}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span
                        style={{
                          color: item.isPositive
                            ? 'var(--green)'
                            : item.isNegative
                            ? 'var(--red)'
                            : 'var(--cream)',
                          fontWeight: 700,
                        }}
                      >
                        {item.changeText}
                      </span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        {item.note}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Historical Footprint & Continuity */}
        <section className="ll-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ color: 'var(--gold-400)', fontSize: '1.2rem' }}>⭐</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--cream)' }}>
              Historical Footprint
            </span>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            This event has been recorded in your permanent life chronicle. Subsequent years and historical encounters will reflect these consequences.
          </p>
        </section>

        {/* Continue Button */}
        <button
          type="button"
          className="ll-btn-gold"
          onClick={() => {
            setResolved(undefined);
            setSelectedChoiceId(undefined);
          }}
        >
          Continue →
        </button>
      </div>
    );
  }

  // 2. NO PENDING DECISIONS
  if (view.pending.length === 0) {
    return (
      <div className="ll-card" style={{ textAlign: 'center', padding: 30 }}>
        <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>⏳</div>
        <h2>No Decisions Await</h2>
        <p style={{ color: 'var(--text-muted)', margin: '8px 0 20px', lineHeight: 1.5 }}>
          Your life is running smoothly. Advance time by 1 year on your dashboard to encounter fresh historical events and choices.
        </p>
        <Link href="/" className="ll-btn-gold" style={{ textDecoration: 'none' }}>
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  // 3. EVENT & CHOICE SELECTION SCREEN (Matches 'Choice Selection.png')
  const currentEvent = view.pending[0]!;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {error && (
        <div className="ll-card" style={{ borderColor: 'var(--red)' }}>
          <p style={{ color: 'var(--red)' }}>{error}</p>
        </div>
      )}

      {/* Main Event Card */}
      <section className="ll-card" aria-label={currentEvent.title}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'rgba(230, 179, 77, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.3rem',
              color: 'var(--gold-400)',
            }}
          >
            💼
          </div>
          <div>
            <span className="ll-pill gold" style={{ fontSize: '0.72rem' }}>
              {currentEvent.viaScheduled ? 'Major Historical Event' : 'Life Event'}
            </span>
            <h2 style={{ fontSize: '1.45rem', margin: '2px 0 0', color: 'var(--cream)' }}>
              {currentEvent.title}
            </h2>
          </div>
        </div>

        <p style={{ color: 'var(--text)', fontSize: '0.94rem', lineHeight: 1.6, margin: '8px 0 14px' }}>
          {currentEvent.description}
        </p>

        <div className="ll-divider" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.86rem' }}>
            <span style={{ color: 'var(--gold-400)' }}>📍</span>
            <span className="ll-muted">Location:</span>
            <span style={{ fontWeight: 600 }}>{view.player.locationId.replace(/^location\./, '').replace(/_/g, ' ')}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.86rem' }}>
            <span style={{ color: 'var(--gold-400)' }}>📊</span>
            <span className="ll-muted">Potential Effects:</span>
            <span style={{ fontWeight: 600 }}>Income, Knowledge, Reputation, Time</span>
          </div>
        </div>
      </section>

      {/* "What will you do?" Header */}
      <div>
        <h3 className="ll-section-title" style={{ fontSize: '1.3rem', color: 'var(--cream)' }}>
          What will you do?
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 2 }}>
          Choose your course of action. Every decision carries lasting ripples.
        </p>
      </div>

      {/* Interactive Choice Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {currentEvent.choices.map((choice, index) => {
          const isSelected = selectedChoiceId === choice.id || (selectedChoiceId === undefined && index === 0);
          const pills = getChoicePills(choice.title, choice.description);

          return (
            <div
              key={choice.id}
              className={`ll-choice-card ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedChoiceId(choice.id)}
            >
              <div className="ll-choice-icon-circle">
                {index === 0 ? '💼' : index === 1 ? '🎓' : index === 2 ? '👥' : '✕'}
              </div>
              <div className="ll-choice-body">
                <div className="ll-choice-title">{choice.title}</div>
                {choice.description && (
                  <div className="ll-choice-desc">{choice.description}</div>
                )}
                <div className="ll-choice-pills">
                  {pills.map((pill, i) => (
                    <span
                      key={i}
                      className={`ll-pill ${pill.type === 'pos' ? 'positive' : pill.type === 'neg' ? 'negative' : pill.type === 'gold' ? 'gold' : 'neutral'}`}
                    >
                      {pill.text}
                    </span>
                  ))}
                </div>
              </div>
              <span className="ll-action-chev">›</span>
            </div>
          );
        })}
      </div>

      {/* Confirm Choice CTA Button */}
      <div style={{ marginTop: 8 }}>
        <button
          type="button"
          className="ll-btn-gold"
          disabled={resolving}
          onClick={() => {
            const activeChoice =
              currentEvent.choices.find((c) => c.id === selectedChoiceId) ?? currentEvent.choices[0];
            if (activeChoice) {
              void handleResolve(
                currentEvent.eventId,
                currentEvent.title,
                currentEvent.description,
                activeChoice.id,
                activeChoice.title,
                activeChoice.description,
              );
            }
          }}
        >
          {resolving ? 'Shaping Destiny…' : 'Confirm Choice →'}
        </button>
      </div>
    </div>
  );
}

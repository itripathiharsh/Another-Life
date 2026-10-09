'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useLife } from '../../components/LifeContext';
import { formatLocationFull, getEraInfo } from '../../lib/era';

interface MilestoneItem {
  year: number;
  icon: string;
  title: string;
  desc: string;
  tag?: string;
}

export default function LifeTimelinePage(): JSX.Element {
  const { view } = useLife();
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneItem | null>(null);

  const player = view?.player;
  const currentAge = player?.age ?? 0;
  const birthYear = view ? parseInt(view.date.slice(0, 4), 10) - currentAge : 1946;
  const currentYear = view ? parseInt(view.date.slice(0, 4), 10) : 1946;
  const eraInfo = getEraInfo(player?.locationId, currentYear);

  // Visual Chapter Cards with real completion status
  const chapters = [
    {
      title: 'Childhood & Nurturing',
      years: `${birthYear} - ${birthYear + 11}`,
      summary: currentAge < 12 ? 'Current Life Stage: Growing in family care' : 'Completed: Foundations of character',
      icon: '👶',
      status: currentAge < 12 ? 'Current' : 'Completed',
    },
    {
      title: 'Youth & Apprenticeship',
      years: `${birthYear + 12} - ${birthYear + 17}`,
      summary: currentAge < 12 ? 'Upcoming chapter' : currentAge < 18 ? 'Current Life Stage: Preparing for adult trade' : 'Completed: Youth training',
      icon: '📖',
      status: currentAge < 12 ? 'Upcoming' : currentAge < 18 ? 'Current' : 'Completed',
    },
    {
      title: 'Early Adulthood',
      years: `${birthYear + 18} - ${birthYear + 29}`,
      summary: currentAge < 18 ? 'Upcoming chapter' : currentAge < 30 ? 'Current Life Stage: Independent profession' : 'Completed: Foundational adult years',
      icon: '👤',
      status: currentAge < 18 ? 'Upcoming' : currentAge < 30 ? 'Current' : 'Completed',
    },
    {
      title: 'Career & Family Peak',
      years: `${birthYear + 30} - ${birthYear + 49}`,
      summary: currentAge < 30 ? 'Upcoming chapter' : currentAge < 50 ? 'Current Life Stage: Civic and family influence' : 'Completed',
      icon: '💼',
      status: currentAge < 30 ? 'Upcoming' : currentAge < 50 ? 'Current' : 'Completed',
    },
    {
      title: 'Elderhood & Legacy',
      years: `${birthYear + 50}+`,
      summary: currentAge < 50 ? 'Upcoming chapter' : 'Current Life Stage: Reflecting on a lived life',
      icon: '⏳',
      status: currentAge < 50 ? 'Upcoming' : 'Current',
    },
  ];

  // Dynamic Timeline Events generated strictly from real life history
  const timelineEvents: MilestoneItem[] = [
    {
      year: birthYear,
      icon: '👶',
      title: 'Born in ' + formatLocationFull(player?.locationId),
      desc: `You entered the world as ${player?.name ?? 'a child'} into a changing historical epoch.`,
    },
  ];

  if (currentAge >= 6) {
    timelineEvents.push({
      year: birthYear + 6,
      icon: '📖',
      title: 'Began Primary School',
      desc: 'Learned reading, arithmetic, calligraphy, and classical history.',
    });
  }

  if (currentAge >= 14) {
    timelineEvents.push({
      year: birthYear + 14,
      icon: '🎓',
      title: 'Completed Basic Schooling',
      desc: 'Formed early ideas about trade, society, and public service.',
    });
  }

  if (currentAge >= 18) {
    timelineEvents.push({
      year: birthYear + 18,
      icon: '🏛️',
      title: 'Reached Legal Adulthood',
      desc: player?.occupationId
        ? `Began professional career as ${player.occupationId.replace(/^occupation\./, '').replace(/_/g, ' ')}.`
        : 'Attained full civic independence.',
    });
  }

  // Parse real history entries from full timeline (or fallback to timelineTail)
  const timelineEntries = view?.timeline ?? view?.timelineTail ?? [];
  if (timelineEntries.length > 0) {
    timelineEntries.forEach((note) => {
      const match = note.match(/^(\d{4})-\d{2}-\d{2}\s*(?:\(age (\d+)[^)]*\))?:\s*(.*)$/);
      if (match) {
        const itemYear = parseInt(match[1]!, 10);
        const itemAge = match[2] ? parseInt(match[2]!, 10) : itemYear - birthYear;
        const text = match[3]!;
        if (!text.toLowerCase().includes('born in')) {
          timelineEvents.push({
            year: itemYear,
            icon: text.startsWith('[world]') ? '🌐' : '📜',
            title: text.startsWith('[world]') ? 'Historical World Chronicle' : `Age ${itemAge} Milestone`,
            desc: text.replace(/^\[world\]\s*/, ''),
          });
        }
      }
    });
  }

  if (currentAge > 0) {
    timelineEvents.push({
      year: currentYear,
      icon: '⏳',
      title: `Current Age: ${currentAge}`,
      desc: `You are currently ${currentAge} years old. Your ongoing choices continue to shape your historical footprint.`,
    });
  }

  timelineEvents.sort((a, b) => a.year - b.year);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header & Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <div>
          <h2>Life Timeline</h2>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            A journey through the key moments of your life.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span className="ll-pill gold">
            🏛️ Era: {eraInfo.eraTitle} ({eraInfo.eraSpan})
          </span>
          <span className="ll-pill neutral">
            📍 {formatLocationFull(player?.locationId)}
          </span>
        </div>
      </div>

      {/* Visual Chapter Cards Carousel (Matches Life Timeline.png) */}
      <div
        style={{
          display: 'flex',
          gap: 10,
          overflowX: 'auto',
          paddingBottom: 8,
          scrollbarWidth: 'none',
        }}
      >
        {chapters.map((ch, idx) => (
          <div
            key={ch.title}
            className="ll-card"
            style={{
              minWidth: 140,
              flex: '0 0 auto',
              padding: 12,
              textAlign: 'center',
              border: idx === 0 ? '1.5px solid var(--gold-500)' : '1px solid var(--border)',
              background: idx === 0 ? 'rgba(230, 179, 77, 0.08)' : 'var(--bg-card)',
            }}
          >
            <div style={{ fontSize: '1.8rem', marginBottom: 4 }}>{ch.icon}</div>
            <div style={{ fontWeight: 600, color: 'var(--cream)', fontSize: '0.9rem' }}>{ch.title}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--gold-400)', margin: '2px 0 4px' }}>{ch.years}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{ch.summary}</div>
          </div>
        ))}
      </div>

      {/* Main Column Stack: Detailed Timeline Ledger & Milestones */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Detailed Timeline Ledger */}
        <div className="ll-card">
          <h3 className="ll-section-title" style={{ marginBottom: 14 }}>
            <span className="ll-section-icon">📜</span> Detailed Timeline
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {timelineEvents.map((evt, idx) => (
              <div
                key={idx}
                className="ll-choice-card"
                style={{ padding: '10px 14px', margin: 0 }}
                onClick={() => setSelectedMilestone(evt)}
              >
                <div style={{ minWidth: 44, fontWeight: 700, color: 'var(--gold-400)', fontSize: '0.95rem' }}>
                  {evt.year}
                </div>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: '#1d2531',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    flexShrink: 0,
                  }}
                >
                  {evt.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, color: 'var(--cream)', fontSize: '0.92rem' }}>
                    {evt.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    {evt.desc}
                  </div>
                </div>
                <span className="ll-action-chev">›</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Summaries & Milestones */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Key Milestones */}
          <div className="ll-card">
            <h3 className="ll-section-title" style={{ marginBottom: 10 }}>
              <span className="ll-section-icon">🏆</span> Key Milestones
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 6 }}>
                <span>👶 Birth into History</span>
                <span style={{ fontWeight: 600, color: 'var(--green)' }}>Year {birthYear} ✓</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 6 }}>
                <span>🏫 Primary School</span>
                <span style={{ fontWeight: 600, color: currentAge >= 14 ? 'var(--green)' : currentAge >= 6 ? 'var(--gold-400)' : 'var(--text-dim)' }}>
                  {currentAge >= 14 ? `Completed (${birthYear + 14}) ✓` : currentAge >= 6 ? `In Progress (Age ${currentAge})` : `Unlocks Age 6 (${birthYear + 6})`}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 6 }}>
                <span>🔨 Trade Apprenticeship</span>
                <span style={{ fontWeight: 600, color: currentAge >= 18 ? 'var(--green)' : currentAge >= 14 ? 'var(--gold-400)' : 'var(--text-dim)' }}>
                  {currentAge >= 18 ? `Completed (${birthYear + 18}) ✓` : currentAge >= 14 ? `In Progress (Age ${currentAge})` : `Unlocks Age 14 (${birthYear + 14})`}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 6 }}>
                <span>🏛️ Full Civic Adulthood</span>
                <span style={{ fontWeight: 600, color: currentAge >= 18 ? 'var(--green)' : 'var(--text-dim)' }}>
                  {currentAge >= 18 ? `Achieved (${birthYear + 18}) ✓` : `Unlocks Age 18 (${birthYear + 18})`}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>📜 Historical Epoch</span>
                <span style={{ fontWeight: 600, color: 'var(--gold-400)' }}>
                  {eraInfo.eraTitle} ({eraInfo.countryName})
                </span>
              </div>
            </div>
          </div>

          {/* Life Statistics */}
          <div className="ll-card">
            <h3 className="ll-section-title" style={{ marginBottom: 10 }}>
              <span className="ll-section-icon">📊</span> Life Statistics
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              <div style={{ background: 'var(--bg-secondary)', padding: 8, borderRadius: 8 }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>CURRENT AGE</div>
                <div style={{ fontWeight: 700, color: 'var(--cream)' }}>{currentAge} years</div>
              </div>
              <div style={{ background: 'var(--bg-secondary)', padding: 8, borderRadius: 8 }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>YEARS LIVED</div>
                <div style={{ fontWeight: 700, color: 'var(--cream)' }}>{currentAge}</div>
              </div>
              <div style={{ background: 'var(--bg-secondary)', padding: 8, borderRadius: 8 }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>RELATIONSHIPS</div>
                <div style={{ fontWeight: 700, color: 'var(--red)' }}>{view?.familyMembers.length ?? 3}</div>
              </div>
              <div style={{ background: 'var(--bg-secondary)', padding: 8, borderRadius: 8 }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>WEALTH STATUS</div>
                <div style={{ fontWeight: 700, color: 'var(--yellow)' }}>{player?.classId ?? 'Middle Class'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Event Detail Modal (Matches Timeline Event Detail.png) */}
      {selectedMilestone && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
          onClick={() => setSelectedMilestone(null)}
        >
          <div
            className="ll-card ll-card-gold"
            style={{ maxWidth: 480, width: '100%', padding: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span className="ll-pill gold">Year {selectedMilestone.year}</span>
              <button
                type="button"
                className="ll-icon-btn"
                onClick={() => setSelectedMilestone(null)}
              >
                ✕
              </button>
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--cream)', marginBottom: 8 }}>
              {selectedMilestone.title}
            </h3>
            <p style={{ color: 'var(--text)', lineHeight: 1.6, fontSize: '0.92rem' }}>
              {selectedMilestone.desc}
            </p>
            <div style={{ marginTop: 14, padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 10 }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: 4 }}>HISTORICAL IMPACT</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--cream-soft)' }}>
                Recorded in family memoirs and community records for this generation.
              </div>
            </div>
            <button
              type="button"
              className="ll-btn-gold"
              style={{ marginTop: 16 }}
              onClick={() => setSelectedMilestone(null)}
            >
              Close Ledger
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

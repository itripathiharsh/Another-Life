'use client';

import { useState } from 'react';
import { useLife } from '../../components/LifeContext';

interface HealthActivity {
  id: string;
  title: string;
  desc: string;
  icon: string;
  btnLabel: string;
}

export default function HealthPage(): JSX.Element {
  const { view } = useLife();
  const [activeTab, setActiveTab] = useState<string>('Activities');
  const [toast, setToast] = useState<string | null>(null);

  const player = view?.player;
  const age = player?.age ?? 0;
  const healthBase = player ? Math.min(100, Math.max(0, player.health)) : 95;

  let activities: HealthActivity[] = [];

  if (age < 6) {
    activities = [
      { id: 'act1', title: 'Nutritious Milk & Feeding', desc: 'Mother’s milk and warm soft porridge to nourish growth.', icon: '🍼', btnLabel: 'Nourish' },
      { id: 'act2', title: 'Cradle Rest & Sleep', desc: 'Long peaceful sleep to build strong immunity.', icon: '🛏️', btnLabel: 'Rest' },
      { id: 'act3', title: 'Courtyard Sunshine', desc: 'Morning sunlight and fresh garden air for vitality.', icon: '☀️', btnLabel: 'Bask' },
      { id: 'act4', title: 'Tummy Time & Crawling', desc: 'Gentle play and crawling to build motor coordination.', icon: '🧸', btnLabel: 'Play' },
      { id: 'act5', title: 'Parental Cuddle & Warmth', desc: 'Comforting touch to soothe distress and bond.', icon: '🫂', btnLabel: 'Cuddle' },
      { id: 'act6', title: 'Pediatric Herbal Checkup', desc: 'Gentle natural tonics for seasonal colds.', icon: '🩺', btnLabel: 'Care' },
    ];
  } else if (age < 14) {
    activities = [
      { id: 'act1', title: 'Active Outdoor Games', desc: 'Run with friends, play marbles, and fly kites.', icon: '🏃', btnLabel: 'Play' },
      { id: 'act2', title: 'Wholesome Family Meals', desc: 'Nutritious home meals, warm bread/grains, and fresh fruit.', icon: '🍏', btnLabel: 'Eat' },
      { id: 'act3', title: 'Restorative Sleep', desc: 'Restful 9 hours of sleep after schooling.', icon: '🛏️', btnLabel: 'Sleep' },
      { id: 'act4', title: 'Mental Rest from Studies', desc: 'Relax your mind and eyes from book reading.', icon: '📚', btnLabel: 'Rest' },
      { id: 'act5', title: 'Visit Local Herbalist / Doctor', desc: 'Checkup for seasonal fevers and tonics.', icon: '🩺', btnLabel: 'Consult' },
      { id: 'act6', title: 'Spend Time Outdoors', desc: 'Breathe clean air in the local gardens.', icon: '🌳', btnLabel: 'Explore' },
    ];
  } else {
    activities = [
      { id: 'act1', title: 'Physical Exercise', desc: 'Improve fitness, stamina and endurance.', icon: '🏃', btnLabel: 'Do Activity' },
      { id: 'act2', title: 'Eat Healthy Diet', desc: 'Boost immunity and long-term vitality.', icon: '🍏', btnLabel: 'Do Activity' },
      { id: 'act3', title: 'Rest & Recovery', desc: 'Recover energy and reduce workplace fatigue.', icon: '🛏️', btnLabel: 'Do Activity' },
      { id: 'act4', title: 'Meditation & Prayer', desc: 'Reduce mental strain and maintain focus.', icon: '🧘', btnLabel: 'Do Activity' },
      { id: 'act5', title: 'Visit Doctor / Physician', desc: 'Check health and diagnose physical ailments.', icon: '🩺', btnLabel: 'Consult' },
      { id: 'act6', title: 'Take Medicine & Tonics', desc: 'Treat illnesses and recover strength faster.', icon: '💊', btnLabel: 'Take' },
      { id: 'act7', title: 'Avoid Bad Habits', desc: 'Maintain temperance and avoid vices.', icon: '🚫', btnLabel: 'Maintain' },
      { id: 'act8', title: 'Spend Time in Nature', desc: 'Fresh air and sunlight to improve mood.', icon: '🌳', btnLabel: 'Do Activity' },
    ];
  }

  function performActivity(title: string): void {
    setToast(`✓ Completed: ${title}. Vitality boosted.`);
    setTimeout(() => setToast(null), 3000);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--gold-500)',
            color: '#120e06',
            padding: '10px 20px',
            borderRadius: 999,
            fontWeight: 700,
            zIndex: 100,
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}
        >
          {toast}
        </div>
      )}

      {/* Header */}
      <div>
        <h2>Health</h2>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Take care of your physical and mental well-being.
        </div>
      </div>

      {/* Main Health Vitals Card (Matches LegacyLife Health Dashboard.png) */}
      <section className="ll-card" aria-label="Character Health">
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: '50%',
              background: '#1d2531',
              border: '2px solid var(--green)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
            }}
          >
            🧑🏻
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--cream)' }}>
                {player?.name ?? 'You'}
              </h3>
              <span className="ll-pill positive" style={{ fontSize: '0.72rem' }}>
                Healthy
              </span>
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
              Age {age} • Male • High vitality
            </div>
          </div>
        </div>

        {/* 5 Vitals Meters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Physical Health */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 3 }}>
              <span>❤️ Physical Health</span>
              <span style={{ fontWeight: 600, color: 'var(--green)' }}>{healthBase} / 100</span>
            </div>
            <div className="ll-stat-bar-track">
              <div className="ll-stat-bar-fill" style={{ width: `${healthBase}%`, background: 'var(--green)' }} />
            </div>
          </div>

          {/* Mental Health */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 3 }}>
              <span>🧠 Mental Health</span>
              <span style={{ fontWeight: 600, color: 'var(--blue)' }}>70 / 100</span>
            </div>
            <div className="ll-stat-bar-track">
              <div className="ll-stat-bar-fill" style={{ width: '70%', background: 'var(--blue)' }} />
            </div>
          </div>

          {/* Energy */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 3 }}>
              <span>⚡ Energy</span>
              <span style={{ fontWeight: 600, color: 'var(--yellow)' }}>75 / 100</span>
            </div>
            <div className="ll-stat-bar-track">
              <div className="ll-stat-bar-fill" style={{ width: '75%', background: 'var(--yellow)' }} />
            </div>
          </div>

          {/* Sleep */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 3 }}>
              <span>🌙 Sleep</span>
              <span style={{ fontWeight: 600, color: 'var(--purple)' }}>65 / 100</span>
            </div>
            <div className="ll-stat-bar-track">
              <div className="ll-stat-bar-fill" style={{ width: '65%', background: 'var(--purple)' }} />
            </div>
          </div>

          {/* Immunity */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 3 }}>
              <span>🛡️ Immunity</span>
              <span style={{ fontWeight: 600, color: 'var(--green)' }}>85 / 100</span>
            </div>
            <div className="ll-stat-bar-track">
              <div className="ll-stat-bar-fill" style={{ width: '85%', background: 'var(--green)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Health Status Cards 2x2 Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
        <div className="ll-card" style={{ padding: 10 }}>
          <div style={{ fontSize: '1.2rem', marginBottom: 2 }}>💚</div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--green)' }}>No Major Conditions</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: 2 }}>You are currently healthy.</div>
        </div>

        <div className="ll-card" style={{ padding: 10 }}>
          <div style={{ fontSize: '1.2rem', marginBottom: 2 }}>🏋️</div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--yellow)' }}>Fitness: Moderate</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: 2 }}>You could be more active.</div>
        </div>

        <div className="ll-card" style={{ padding: 10 }}>
          <div style={{ fontSize: '1.2rem', marginBottom: 2 }}>🛏️</div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--cream)' }}>Sleep: Average</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: 2 }}>Try to get more rest.</div>
        </div>

        <div className="ll-card" style={{ padding: 10 }}>
          <div style={{ fontSize: '1.2rem', marginBottom: 2 }}>🧠</div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--blue)' }}>Stress: Low</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: 2 }}>Handling pressures well.</div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="ll-filter-tabs">
        {['Activities', 'Diet', 'Medical Care', 'Habits'].map((tab) => (
          <button
            key={tab}
            type="button"
            className={`ll-filter-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Choose an Activity Grid (Matches LegacyLife Health Dashboard.png) */}
      <section className="ll-card">
        <h3 className="ll-section-title" style={{ marginBottom: 12 }}>
          <span className="ll-section-icon">🧘</span> Choose an Activity
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
          {activities.map((act) => (
            <div
              key={act.id}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: 12,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 8,
              }}
            >
              <div>
                <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{act.icon}</div>
                <div style={{ fontWeight: 600, color: 'var(--cream)', fontSize: '0.92rem' }}>{act.title}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 2 }}>{act.desc}</div>
              </div>
              <button
                type="button"
                className="ll-pill gold"
                style={{ cursor: 'pointer', alignSelf: 'flex-start', padding: '4px 12px' }}
                onClick={() => performActivity(act.title)}
              >
                {act.btnLabel}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

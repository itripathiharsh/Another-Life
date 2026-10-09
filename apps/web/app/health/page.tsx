'use client';

import { useState } from 'react';
import { useLife } from '../../components/LifeContext';

interface HealthActivity {
  id: string;
  type: 'exercise' | 'rest' | 'consultation' | 'medicine';
  title: string;
  desc: string;
  icon: string;
  btnLabel: string;
  cost: number;
}

export default function HealthPage(): JSX.Element {
  const { view, performHealthActivity } = useLife();
  const [activeTab, setActiveTab] = useState<string>('Activities');
  const [toast, setToast] = useState<string | null>(null);
  const [isActing, setIsActing] = useState<boolean>(false);

  const player = view?.player;
  const age = player?.age ?? 0;
  const healthBase = player ? Math.min(100, Math.max(0, player.health)) : 95;
  const wealth = player?.wealth ?? 0;

  // Dynamic vitals derived authoritatively from player state & historical life stage
  const mentalHealth = Math.min(100, Math.max(15, Math.round(50 + (player?.reputation ?? 0) * 0.25 + healthBase * 0.25)));
  const energy = Math.min(100, Math.max(10, Math.round(healthBase * (age < 50 ? 0.95 : 0.8))));
  const sleep = Math.min(100, Math.max(20, Math.round(30 + healthBase * 0.65)));
  const immunity = Math.min(100, Math.max(10, Math.round(healthBase * (age < 5 ? 0.75 : age > 65 ? 0.7 : 0.9))));

  const activities: HealthActivity[] = age < 6
    ? [
        { id: 'act1', type: 'exercise', title: 'Tummy Time & Crawling', desc: 'Gentle play and motor coordination (+5 Health).', icon: '🧸', btnLabel: 'Play', cost: 0 },
        { id: 'act2', type: 'rest', title: 'Cradle Rest & Sleep', desc: 'Long restorative sleep for infant growth (+3 Health).', icon: '🛏️', btnLabel: 'Rest', cost: 0 },
        { id: 'act3', type: 'consultation', title: 'Pediatric Vaid / Doctor', desc: 'Herbal tonics and checkup for seasonal fevers (15 Coins, +10 Health).', icon: '🩺', btnLabel: 'Care (15c)', cost: 15 },
      ]
    : age < 14
      ? [
          { id: 'act1', type: 'exercise', title: 'Active Outdoor Running & Play', desc: 'Run with neighborhood classmates (+5 Health).', icon: '🏃', btnLabel: 'Play', cost: 0 },
          { id: 'act2', type: 'rest', title: 'Restorative Sleep & Recovery', desc: 'Deep recovery after school day lessons (+3 Health).', icon: '🛏️', btnLabel: 'Sleep', cost: 0 },
          { id: 'act3', type: 'consultation', title: 'Consult Local Physician', desc: 'Medical examination and preventative advice (15 Coins, +10 Health).', icon: '🩺', btnLabel: 'Consult (15c)', cost: 15 },
          { id: 'act4', type: 'medicine', title: 'Herbal Tonics & Teas', desc: 'Nutritious botanical remedies (25 Coins, +15 Health).', icon: '🌿', btnLabel: 'Take (25c)', cost: 25 },
        ]
      : [
          { id: 'act1', type: 'exercise', title: 'Physical Exercise & Conditioning', desc: 'Improve stamina and fitness (+5 Health).', icon: '🏃', btnLabel: 'Exercise', cost: 0 },
          { id: 'act2', type: 'rest', title: 'Rest & Fatigue Recovery', desc: 'Restorative sleep to reduce workplace exhaustion (+3 Health).', icon: '🛏️', btnLabel: 'Rest', cost: 0 },
          { id: 'act3', type: 'consultation', title: 'Physician Consultation', desc: 'Diagnosis and medical treatment by licensed doctor (15 Coins, +10 Health).', icon: '🩺', btnLabel: 'Consult (15c)', cost: 15 },
          { id: 'act4', type: 'medicine', title: 'Therapeutic Medicines & Tonics', desc: 'Botanical and pharmaceutical remedies (25 Coins, +15 Health).', icon: '💊', btnLabel: 'Take (25c)', cost: 25 },
        ];

  async function handleActivity(act: HealthActivity): Promise<void> {
    if (act.cost > 0 && wealth < act.cost) {
      setToast(`⛔ Insufficient Wealth: Cannot afford ${act.cost} coins for ${act.title}.`);
      setTimeout(() => setToast(null), 3500);
      return;
    }

    setIsActing(true);
    try {
      const res = await performHealthActivity(act.type);
      setToast(res?.message ?? `✓ Completed: ${act.title}`);
    } catch (err) {
      setToast(err instanceof Error ? err.message : 'Activity failed');
    } finally {
      setIsActing(false);
      setTimeout(() => setToast(null), 3500);
    }
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
            background: toast.includes('⛔') ? '#b91c1c' : 'var(--gold-500)',
            color: toast.includes('⛔') ? '#ffffff' : '#120e06',
            padding: '10px 22px',
            borderRadius: 999,
            fontWeight: 700,
            zIndex: 100,
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            textAlign: 'center',
            maxWidth: '90%',
          }}
        >
          {toast}
        </div>
      )}

      {/* Header */}
      <div>
        <h2>Health & Well-being</h2>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Take real medical care of your physical and mental constitution across life stages.
        </div>
      </div>

      {/* Main Health Vitals Card */}
      <section className="ll-card" aria-label="Character Health">
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: '50%',
              background: '#1d2531',
              border: `2px solid ${healthBase >= 60 ? 'var(--green)' : healthBase >= 35 ? 'var(--yellow)' : 'var(--red)'}`,
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
              <span className={`ll-pill ${healthBase >= 60 ? 'positive' : healthBase >= 35 ? 'neutral' : 'negative'}`} style={{ fontSize: '0.72rem' }}>
                {healthBase >= 80 ? 'Robust Vitality' : healthBase >= 60 ? 'Healthy' : healthBase >= 35 ? 'Frail' : 'Critically Ill'}
              </span>
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
              Age {age} • Wealth {wealth} Coins
            </div>
          </div>
        </div>

        {/* 5 Dynamic Vitals Meters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Physical Health */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 3 }}>
              <span>❤️ Physical Health</span>
              <span style={{ fontWeight: 600, color: healthBase >= 60 ? 'var(--green)' : 'var(--yellow)' }}>
                {healthBase} / 100
              </span>
            </div>
            <div className="ll-stat-bar-track">
              <div className="ll-stat-bar-fill" style={{ width: `${healthBase}%`, background: healthBase >= 60 ? 'var(--green)' : 'var(--yellow)' }} />
            </div>
          </div>

          {/* Mental Health */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 3 }}>
              <span>🧠 Mental Well-being</span>
              <span style={{ fontWeight: 600, color: 'var(--blue)' }}>{mentalHealth} / 100</span>
            </div>
            <div className="ll-stat-bar-track">
              <div className="ll-stat-bar-fill" style={{ width: `${mentalHealth}%`, background: 'var(--blue)' }} />
            </div>
          </div>

          {/* Energy */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 3 }}>
              <span>⚡ Energy & Stamina</span>
              <span style={{ fontWeight: 600, color: 'var(--yellow)' }}>{energy} / 100</span>
            </div>
            <div className="ll-stat-bar-track">
              <div className="ll-stat-bar-fill" style={{ width: `${energy}%`, background: 'var(--yellow)' }} />
            </div>
          </div>

          {/* Sleep */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 3 }}>
              <span>🌙 Rest & Recovery</span>
              <span style={{ fontWeight: 600, color: 'var(--purple)' }}>{sleep} / 100</span>
            </div>
            <div className="ll-stat-bar-track">
              <div className="ll-stat-bar-fill" style={{ width: `${sleep}%`, background: 'var(--purple)' }} />
            </div>
          </div>

          {/* Immunity */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 3 }}>
              <span>🛡️ Natural Immunity</span>
              <span style={{ fontWeight: 600, color: 'var(--green)' }}>{immunity} / 100</span>
            </div>
            <div className="ll-stat-bar-track">
              <div className="ll-stat-bar-fill" style={{ width: `${immunity}%`, background: 'var(--green)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="ll-filter-tabs">
        {['Activities', 'Medical Care'].map((tab) => (
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

      {/* Choose an Activity Grid */}
      <section className="ll-card">
        <h3 className="ll-section-title" style={{ marginBottom: 12 }}>
          <span className="ll-section-icon">🧘</span> Health Interventions & Care
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {activities.map((act) => (
            <div
              key={act.id}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1 }}>
                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{act.icon}</span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontWeight: 600, color: 'var(--cream)', fontSize: '0.9rem', lineHeight: 1.2 }}>
                    {act.title}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', marginTop: 2 }}>
                    {act.desc}
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="ll-pill gold"
                disabled={isActing}
                style={{ cursor: isActing ? 'wait' : 'pointer', flexShrink: 0, padding: '5px 12px', fontWeight: 600 }}
                onClick={() => void handleActivity(act)}
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


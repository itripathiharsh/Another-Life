'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLife } from '../../components/LifeContext';
import {
  formatLocationFull,
  getCurrencyForLocation,
  getFamilyKinshipProfile,
  isVictorianLocation,
} from '../../lib/era';

function formatLocation(id: string): string {
  return id
    .replace(/^location\./, '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatClass(id: string): string {
  return id
    .replace(/^class\./, '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function LegacyPage(): JSX.Element {
  const router = useRouter();
  const { view, forgetLife, playAsHeir } = useLife();
  const [activeTab, setActiveTab] = useState<'death' | 'legacy' | 'review'>('death');
  const [testamentToast, setTestamentToast] = useState<string | null>(null);
  const [isInheriting, setIsInheriting] = useState<boolean>(false);

  const player = view?.player;
  const isDead = view?.status === 'dead';
  const age = player?.age ?? 0;
  const name = player?.name ?? 'Aarav Sharma';
  const locationName = formatLocationFull(player?.locationId);
  const currency = getCurrencyForLocation(player?.locationId);
  const currentYear = view ? parseInt(view.date.slice(0, 4), 10) : 1946;
  const birthYear = currentYear - age;
  const wealth = player?.wealth ?? 0;
  const isVictorian = isVictorianLocation(player?.locationId);
  const playerSurname =
    player?.name?.split(' ').slice(1).join(' ') ||
    (isVictorian ? 'Pendelton' : 'Sharma');
  const kinship = getFamilyKinshipProfile(player?.locationId, playerSurname);

  const occupation = player?.occupationId
    ? player.occupationId.replace(/^occupation\./, '').replace(/_/g, ' ')
    : age < 6
      ? 'In Parental Care'
      : age < 14
        ? 'Primary School Student'
        : age < 18
          ? 'Trade Apprentice Candidate'
          : 'Independent Citizen';

  function handleStartNew(): void {
    forgetLife();
    router.push('/');
  }

  async function handlePlayAsHeir(): Promise<void> {
    setIsInheriting(true);
    try {
      await playAsHeir();
      router.push('/life');
    } catch (err) {
      setTestamentToast(err instanceof Error ? err.message : 'Could not transition to heir');
    } finally {
      setIsInheriting(false);
    }
  }

  function handleWillAction(msg: string): void {
    setTestamentToast(msg);
    setTimeout(() => setTestamentToast(null), 3000);
  }

  // A. IF CHARACTER IS ALIVE: Show Living Dynasty & Lineage View
  if (!isDead && view) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {testamentToast && (
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
            {testamentToast}
          </div>
        )}

        {/* Header Banner */}
        <div className="ll-card ll-card-gold" style={{ textAlign: 'center', padding: '24px 16px' }}>
          <div style={{ fontSize: '2.5rem', color: 'var(--gold-400)', marginBottom: 6 }}>👑</div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--cream)', marginBottom: 4 }}>
            Dynasty & Living Heritage
          </h2>
          <div style={{ color: 'var(--gold-400)', fontWeight: 600, fontSize: '1rem', marginBottom: 6 }}>
            {name} • Age {age} • {locationName}
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Your story is actively unfolding. Plan your dynastic succession, build family renown, and shape your future memory.
          </p>
        </div>

        {/* 3 Tabs for Living Character */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          <button
            type="button"
            className={`ll-card ${activeTab === 'death' ? 'll-card-gold' : ''}`}
            style={{
              padding: '10px 0',
              textAlign: 'center',
              cursor: 'pointer',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: activeTab === 'death' ? 'var(--gold-300)' : 'var(--text-muted)',
            }}
            onClick={() => setActiveTab('death')}
          >
            Family Standing
          </button>
          <button
            type="button"
            className={`ll-card ${activeTab === 'legacy' ? 'll-card-gold' : ''}`}
            style={{
              padding: '10px 0',
              textAlign: 'center',
              cursor: 'pointer',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: activeTab === 'legacy' ? 'var(--gold-300)' : 'var(--text-muted)',
            }}
            onClick={() => setActiveTab('legacy')}
          >
            Projected Legacy
          </button>
          <button
            type="button"
            className={`ll-card ${activeTab === 'review' ? 'll-card-gold' : ''}`}
            style={{
              padding: '10px 0',
              textAlign: 'center',
              cursor: 'pointer',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: activeTab === 'review' ? 'var(--gold-300)' : 'var(--text-muted)',
            }}
            onClick={() => setActiveTab('review')}
          >
            Will & Succession
          </button>
        </div>

        {/* Tab 1: Family Standing */}
        {activeTab === 'death' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="ll-card">
              <h3 className="ll-section-title" style={{ marginBottom: 10 }}>
                <span className="ll-section-icon">🏛️</span> Household Standing & Lineage
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.86rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 6 }}>
                  <span className="ll-muted">Family Social Class</span>
                  <span>{formatClass(player?.classId ?? 'class.middle')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 6 }}>
                  <span className="ll-muted">Ancestral Homeland</span>
                  <span>{locationName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 6 }}>
                  <span className="ll-muted">Current Life Role</span>
                  <span style={{ textTransform: 'capitalize' }}>{occupation}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 6 }}>
                  <span className="ll-muted">Family Treasury / Wealth</span>
                  <span style={{ color: 'var(--yellow)', fontWeight: 700 }}>{currency.symbol}{wealth}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="ll-muted">Civic Reputation</span>
                  <span style={{ color: 'var(--gold-400)', fontWeight: 600 }}>{player?.reputation ?? 0} Points</span>
                </div>
              </div>
            </div>

            <div className="ll-card">
              <h3 className="ll-section-title" style={{ marginBottom: 8 }}>
                <span className="ll-section-icon">👥</span> Household Members
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', marginBottom: 10 }}>
                The relatives and kin who carry your household name forward:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--bg-secondary)', padding: '8px 12px', borderRadius: 8, fontSize: '0.85rem' }}>
                  <span>👨🏻‍🦳 {kinship.fatherName} (Father)</span>
                  <span className="ll-pill gold">Household Head</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--bg-secondary)', padding: '8px 12px', borderRadius: 8, fontSize: '0.85rem' }}>
                  <span>👩🏻 {kinship.motherName} (Mother)</span>
                  <span className="ll-pill neutral">Caregiver</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--bg-secondary)', padding: '8px 12px', borderRadius: 8, fontSize: '0.85rem' }}>
                  <span>👦🏻 {kinship.brotherName} (Elder Brother)</span>
                  <span className="ll-pill neutral">Senior Heir</span>
                </div>
              </div>
            </div>

            <Link href="/" className="ll-btn-gold" style={{ textAlign: 'center', textDecoration: 'none' }}>
              ← Return to Active Dashboard
            </Link>
          </div>
        )}

        {/* Tab 2: Projected Legacy */}
        {activeTab === 'legacy' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="ll-card">
              <h3 className="ll-section-title" style={{ marginBottom: 10 }}>
                <span className="ll-section-icon">⭐</span> Projected Memory in History
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: 1.5, marginBottom: 12 }}>
                Based on your life stage and choices to date, this is how history perceives your early path:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div className="ll-card" style={{ padding: 12, background: 'var(--bg-secondary)' }}>
                  <span style={{ fontSize: '1.4rem' }}>📖</span>
                  <div style={{ fontWeight: 600, color: 'var(--cream)', marginTop: 4 }}>Scholastic Promise</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 2 }}>
                    {player?.educationYears ? `${player.educationYears} years completed` : 'Early childhood nurturing'}
                  </div>
                </div>
                <div className="ll-card" style={{ padding: 12, background: 'var(--bg-secondary)' }}>
                  <span style={{ fontSize: '1.4rem' }}>🤝</span>
                  <div style={{ fontWeight: 600, color: 'var(--cream)', marginTop: 4 }}>Kinship Loyalty</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 2 }}>
                    Strong ties with family and neighborhood
                  </div>
                </div>
              </div>
            </div>

            <div className="ll-card">
              <h3 className="ll-section-title" style={{ marginBottom: 6 }}>
                <span className="ll-section-icon">📜</span> Prospective Family Inscription
              </h3>
              <p style={{ fontStyle: 'italic', color: 'var(--cream-soft)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                "{name}, born in the dawn of a new era in {locationName}. A beloved child of their family whose ongoing choices will shape their lineage."
              </p>
            </div>

            <Link href="/" className="ll-btn-gold" style={{ textAlign: 'center', textDecoration: 'none' }}>
              ← Return to Active Dashboard
            </Link>
          </div>
        )}

        {/* Tab 3: Will & Succession */}
        {activeTab === 'review' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="ll-card">
              <h3 className="ll-section-title" style={{ marginBottom: 8 }}>
                <span className="ll-section-icon">📑</span> Testament & Succession Plan
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: 14 }}>
                {age < 18
                  ? 'As a minor dependent, your personal estate is safeguarded under the legal guardianship of your parents. When you reach adulthood, you may draft legally binding wills.'
                  : 'Designate primary heirs and allocate savings and land titles to ensure dynastic continuity.'}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button
                  type="button"
                  className="ll-btn-outline"
                  onClick={() => handleWillAction(`✓ Designated elder brother ${kinship.brotherName} as future family guardian.`)}
                >
                  Designate Primary Heir: {kinship.brotherName}
                </button>
                <button
                  type="button"
                  className="ll-btn-outline"
                  onClick={() => handleWillAction('✓ Family trust fund established in district records.')}
                >
                  Establish Family Reserve Fund ({wealth} Coins)
                </button>
              </div>
            </div>

            <Link href="/" className="ll-btn-gold" style={{ textAlign: 'center', textDecoration: 'none' }}>
              ← Return to Active Dashboard
            </Link>
          </div>
        )}
      </div>
    );
  }

  // B. IF CHARACTER HAS PASSED AWAY (DEAD): Show Authentic Death Summary & Life Review
  const summaryText = view?.legacy?.summary ?? '';
  const causeOfDeath = summaryText.includes('disease')
    ? 'Illness / Disease'
    : summaryText.includes('accident')
      ? 'Accidental Mishap'
      : 'Natural Causes (Old Age)';

  const causeDesc = summaryText.includes('disease')
    ? `You succumbed to severe illness at the age of ${age} despite medical care.`
    : `You passed away peacefully at the age of ${age} due to old age surrounded by loved ones in ${locationName}.`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Perspective Switcher */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
        <button
          type="button"
          className={`ll-card ${activeTab === 'death' ? 'll-card-gold' : ''}`}
          style={{
            padding: '8px 0',
            textAlign: 'center',
            cursor: 'pointer',
            fontSize: '0.82rem',
            fontWeight: 600,
            color: activeTab === 'death' ? 'var(--gold-300)' : 'var(--text-muted)',
          }}
          onClick={() => setActiveTab('death')}
        >
          Death Summary
        </button>
        <button
          type="button"
          className={`ll-card ${activeTab === 'legacy' ? 'll-card-gold' : ''}`}
          style={{
            padding: '8px 0',
            textAlign: 'center',
            cursor: 'pointer',
            fontSize: '0.82rem',
            fontWeight: 600,
            color: activeTab === 'legacy' ? 'var(--gold-300)' : 'var(--text-muted)',
          }}
          onClick={() => setActiveTab('legacy')}
        >
          Your Legacy
        </button>
        <button
          type="button"
          className={`ll-card ${activeTab === 'review' ? 'll-card-gold' : ''}`}
          style={{
            padding: '8px 0',
            textAlign: 'center',
            cursor: 'pointer',
            fontSize: '0.82rem',
            fontWeight: 600,
            color: activeTab === 'review' ? 'var(--gold-300)' : 'var(--text-muted)',
          }}
          onClick={() => setActiveTab('review')}
        >
          Life Review
        </button>
      </div>

      {/* 1. DEATH SUMMARY VIEW */}
      {activeTab === 'death' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Header Card */}
          <div className="ll-card" style={{ textAlign: 'center', padding: '24px 16px' }}>
            <div style={{ fontSize: '2.5rem', color: 'var(--gold-400)', marginBottom: 6 }}>🕊️</div>
            <h2 style={{ fontSize: '1.9rem', color: 'var(--cream)', marginBottom: 4 }}>
              You Have Passed Away
            </h2>
            <div style={{ color: 'var(--gold-400)', fontWeight: 600, fontSize: '1.05rem', marginBottom: 6 }}>
              {birthYear} — {currentYear} • Age {age}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              Your journey in this historical epoch has concluded. Here is the chronicle of the life you lived.
            </p>
          </div>

          {/* Cause of Death Card */}
          <div className="ll-card" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'rgba(248, 113, 113, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                color: 'var(--red)',
              }}
            >
              💓
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                CAUSE OF PASSING
              </div>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--cream)' }}>{causeOfDeath}</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {causeDesc}
              </p>
            </div>
          </div>

          {/* Life Summary vs Key Traits */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
            <div className="ll-card">
              <h3 className="ll-section-title" style={{ marginBottom: 10 }}>
                <span className="ll-section-icon">📊</span> Life Summary
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.84rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 4 }}>
                  <span className="ll-muted">Years Lived</span>
                  <span>{age} years</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 4 }}>
                  <span className="ll-muted">Social Class</span>
                  <span>{formatClass(player?.classId ?? 'class.middle')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 4 }}>
                  <span className="ll-muted">Main Occupation</span>
                  <span style={{ textTransform: 'capitalize' }}>{occupation}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 4 }}>
                  <span className="ll-muted">Total Wealth</span>
                  <span style={{ color: 'var(--yellow)', fontWeight: 700 }}>{currency.symbol}{wealth}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="ll-muted">Historical Location</span>
                  <span>{locationName}</span>
                </div>
              </div>
            </div>

            <div className="ll-card">
              <h3 className="ll-section-title" style={{ marginBottom: 10 }}>
                <span className="ll-section-icon">⭐</span> Key Traits & Legacy
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                <span className="ll-pill positive">📖 Intelligent</span>
                <span className="ll-pill gold">👥 Respected</span>
                <span className="ll-pill neutral">⚖️ Principled</span>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 8 }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--gold-400)', fontWeight: 600, marginBottom: 4 }}>
                  HISTORICAL MEMORIAL
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {view?.legacy?.summary ??
                    `You are remembered as an honorable citizen of ${locationName} who nurtured family ties and contributed to your community.`}
                </p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 6 }}>
            <button
              type="button"
              className="ll-btn-gold"
              disabled={isInheriting}
              style={{
                padding: '12px 18px',
                fontSize: '0.94rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
              onClick={() => void handlePlayAsHeir()}
            >
              <span>👑</span> {isInheriting ? 'Ascending to Household Leadership...' : 'Play as Heir (Inherit Dynasty & Estate) →'}
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              <Link
                href="/life"
                className="ll-btn-outline"
                style={{ textAlign: 'center', textDecoration: 'none' }}
              >
                📜 View Life Timeline
              </Link>
              <button
                type="button"
                className="ll-btn-outline"
                onClick={() => handleStartNew()}
              >
                Start Completely New Life
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. YOUR LEGACY VIEW */}
      {activeTab === 'legacy' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="ll-card ll-card-gold" style={{ textAlign: 'center', padding: '20px 14px' }}>
            <div style={{ fontSize: '2.4rem', color: 'var(--gold-400)' }}>👑</div>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--cream)', margin: '4px 0' }}>Your Legacy</h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              How your name is inscribed across the chronicles of {locationName}.
            </div>
          </div>

          <div className="ll-card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
              <div style={{ fontSize: '2rem', color: 'var(--gold-400)' }}>🛡️</div>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--gold-300)' }}>Well Remembered</h3>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.84rem' }}>
                  You left a positive imprint on your household, peers, and city.
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--bg-secondary)', padding: 8, borderRadius: 8 }}>
                <span>📖 Knowledge</span>
                <span style={{ fontWeight: 600, color: 'var(--green)' }}>Respected</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--bg-secondary)', padding: 8, borderRadius: 8 }}>
                <span>👥 Relationships</span>
                <span style={{ fontWeight: 600, color: 'var(--green)' }}>Cherished</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--bg-secondary)', padding: 8, borderRadius: 8 }}>
                <span>🏛️ Civic Standing</span>
                <span style={{ fontWeight: 600, color: 'var(--yellow)' }}>Solid</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--bg-secondary)', padding: 8, borderRadius: 8 }}>
                <span>🪙 Estate</span>
                <span style={{ fontWeight: 600, color: 'var(--yellow)' }}>{wealth} Coins</span>
              </div>
            </div>
          </div>

          <div className="ll-card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: '1.2rem' }}>📜</span>
              <span style={{ fontWeight: 600, color: 'var(--gold-400)' }}>Memorial Inscription</span>
            </div>
            <p style={{ fontStyle: 'italic', color: 'var(--cream-soft)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              "{name} of {locationName}. Remembered for integrity, kinship loyalty, and steadfast devotion to home and duty during transformative times."
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button
              type="button"
              className="ll-btn-gold"
              disabled={isInheriting}
              style={{ padding: '12px 18px', fontSize: '0.94rem', fontWeight: 700 }}
              onClick={() => void handlePlayAsHeir()}
            >
              👑 {isInheriting ? 'Ascending to Household Leadership...' : 'Play as Heir (Inherit Dynasty & Estate) →'}
            </button>
            <button
              type="button"
              className="ll-btn-outline"
              onClick={() => handleStartNew()}
            >
              Start Completely New Life
            </button>
          </div>
        </div>
      )}

      {/* 3. LIFE REVIEW VIEW */}
      {activeTab === 'review' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="ll-card" style={{ padding: 16 }}>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--cream)', marginBottom: 4 }}>Life Review: {name}</h3>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Lifespan: {birthYear} — {currentYear} ({age} years) • {locationName}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginTop: 12 }}>
              <div style={{ background: 'var(--bg-secondary)', padding: 8, borderRadius: 8 }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>LIFETIME VOCATION</div>
                <div style={{ fontWeight: 600, textTransform: 'capitalize' }}>{occupation}</div>
              </div>
              <div style={{ background: 'var(--bg-secondary)', padding: 8, borderRadius: 8 }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>FINAL WEALTH</div>
                <div style={{ fontWeight: 600, color: 'var(--yellow)' }}>{currency.symbol}{wealth}</div>
              </div>
            </div>
          </div>

          <div className="ll-card">
            <h3 className="ll-section-title" style={{ marginBottom: 10 }}>Key Life Statistics</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.84rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 4 }}>
                <span className="ll-muted">Completed Education</span>
                <span style={{ color: 'var(--blue)' }}>{player?.educationYears ?? 0} Years</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 4 }}>
                <span className="ll-muted">Reputation Score</span>
                <span style={{ color: 'var(--gold-400)' }}>{player?.reputation ?? 0}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="ll-muted">Total Milestones Penned</span>
                <span style={{ color: 'var(--green)' }}>{view?.timelineTail.length ?? 1} Entries</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button
              type="button"
              className="ll-btn-gold"
              disabled={isInheriting}
              style={{ padding: '12px 18px', fontSize: '0.94rem', fontWeight: 700 }}
              onClick={() => void handlePlayAsHeir()}
            >
              👑 {isInheriting ? 'Ascending to Household Leadership...' : 'Play as Heir (Inherit Dynasty & Estate) →'}
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              <Link href="/life" className="ll-btn-outline" style={{ textAlign: 'center', textDecoration: 'none' }}>
                View Detailed Timeline
              </Link>
              <button
                type="button"
                className="ll-btn-outline"
                onClick={() => handleStartNew()}
              >
                Start Completely New Life
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

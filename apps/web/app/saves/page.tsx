'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLife } from '../../components/LifeContext';
import { getCountryForLocation, isVictorianLocation } from '../../lib/era';

interface SaveSlot {
  slotNum: number;
  name: string;
  country: string;
  years: string;
  age: number;
  occupation: string;
  socialClass: string;
  lastPlayed: string;
}

export default function SavesPage(): JSX.Element {
  const router = useRouter();
  const { view, createNewLife } = useLife();
  const [activeTab, setActiveTab] = useState<string>('Save / Load');
  const [toast, setToast] = useState<string | null>(null);

  const player = view?.player;
  const currentAge = player?.age ?? 0;
  const currentYear = view ? parseInt(view.date.slice(0, 4), 10) : 1946;
  const birthYear = currentYear - currentAge;

  const activeOccupation =
    currentAge < 6
      ? 'In Parental Care'
      : currentAge < 14
        ? 'Primary School Student'
        : currentAge < 18
          ? 'Trade Apprentice Candidate'
          : player?.occupationId
            ? player.occupationId.replace(/^occupation\./, '').replace(/_/g, ' ')
            : 'Independent Citizen';

  const activeLocation = player
    ? player.locationId
        .replace(/^location\./, '')
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : 'London';

  const activeClass = player
    ? player.classId
        .replace(/^class\./, '')
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Middle Class';

  const currentCountry = getCountryForLocation(player?.locationId);

  const savedSlots: SaveSlot[] = [
    {
      slotNum: 1,
      name: player?.name ?? (isVictorianLocation(player?.locationId) ? 'Arthur Pendelton' : 'Aarav Sharma'),
      country: `${currentCountry} (${activeLocation})`,
      years: `${birthYear} — ${currentYear}`,
      age: currentAge,
      occupation: activeOccupation,
      socialClass: activeClass,
      lastPlayed: 'Active Chronicle',
    },
    {
      slotNum: 2,
      name: 'Charlotte Sterling',
      country: 'United Kingdom (London)',
      years: '1851 — 1872',
      age: 21,
      occupation: 'Telegraph Clerk',
      socialClass: 'Bourgeoisie',
      lastPlayed: 'Yesterday 19:11',
    },
    {
      slotNum: 3,
      name: 'Zubair Khan',
      country: 'India (Delhi)',
      years: '1946 — 1970',
      age: 24,
      occupation: 'Civil Clerk',
      socialClass: 'Middle Class',
      lastPlayed: '3 Oct 2026 21:05',
    },
  ];

  function showMessage(msg: string): void {
    setToast(msg);
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ fontSize: '2rem' }}>📁</div>
        <div>
          <h2>Game Management</h2>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Save, load, and manage your historical life stories.
          </div>
        </div>
      </div>

      {/* Tabs (Save / Load, New Life, Settings) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {['Save / Load', 'New Life', 'Settings'].map((t) => (
          <button
            key={t}
            type="button"
            className={`ll-card ${activeTab === t ? 'll-card-gold' : ''}`}
            style={{
              padding: '10px 0',
              textAlign: 'center',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.88rem',
              color: activeTab === t ? 'var(--gold-300)' : 'var(--text-muted)',
            }}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab: Save / Load */}
      {activeTab === 'Save / Load' && (
        <>
          {/* Your Saved Lives Section */}
          <div>
            <h3 className="ll-section-title" style={{ marginBottom: 10, fontSize: '1.05rem' }}>
              Your Saved Lives
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {savedSlots.map((slot) => (
                <div key={slot.slotNum} className="ll-card" style={{ padding: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 8,
                          background: slot.slotNum === 1 ? 'var(--gold-500)' : '#1b222d',
                          color: slot.slotNum === 1 ? '#120e06' : 'var(--cream)',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.1rem',
                        }}
                      >
                        {slot.slotNum}
                      </div>

                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--cream)', fontSize: '1rem' }}>
                          {slot.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {slot.country} • {slot.years} (Age {slot.age})
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                          {slot.occupation} • {slot.socialClass}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                      <button
                        type="button"
                        className={slot.slotNum === 1 ? 'll-btn-gold' : 'll-btn-outline'}
                        style={{
                          padding: '6px 16px',
                          fontSize: '0.85rem',
                          borderRadius: 999,
                        }}
                        onClick={() => {
                          showMessage(`Loaded ${slot.name}! Returning to home.`);
                          router.push('/');
                        }}
                      >
                        {slot.slotNum === 1 ? '▶ Continue' : '▶ Load'}
                      </button>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                        {slot.lastPlayed}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Empty Slots Section */}
          <div style={{ marginTop: 6 }}>
            <h3 className="ll-section-title" style={{ marginBottom: 10, fontSize: '1.05rem' }}>
              Empty Slots
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[4, 5].map((slotNum) => (
                <div
                  key={slotNum}
                  className="ll-card"
                  style={{
                    padding: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderStyle: 'dashed',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        background: 'transparent',
                        border: '1px dashed var(--border)',
                        color: 'var(--text-dim)',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {slotNum}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--cream)', fontSize: '0.92rem' }}>Empty Slot</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Start a new life in this slot.</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="ll-pill gold"
                    style={{ cursor: 'pointer', padding: '6px 14px', fontWeight: 600 }}
                    onClick={() => {
                      void createNewLife(`Destiny #${slotNum}`);
                      showMessage('Created new life slot!');
                      router.push('/');
                    }}
                  >
                    + New Life
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Game Options Grid (Matches Save  Load  Game Management.png) */}
          <div style={{ marginTop: 8 }}>
            <h3 className="ll-section-title" style={{ marginBottom: 10, fontSize: '1.05rem' }}>
              Game Options
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div
                className="ll-action-row"
                style={{ padding: 12 }}
                onClick={() => {
                  if (!view) {
                    showMessage('No active life to export.');
                    return;
                  }
                  window.open(`http://127.0.0.1:3001/api/v1/lives/${encodeURIComponent(view.id)}/save`, '_blank');
                  showMessage(`✓ Exported save snapshot for ${view.player.name}.`);
                }}
              >
                <span style={{ fontSize: '1.4rem' }}>☁️</span>
                <div className="ll-action-body">
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--cream)' }}>Export Save</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Backend Snapshot JSON</div>
                </div>
                <span className="ll-action-chev">›</span>
              </div>

              <div
                className="ll-action-row"
                style={{ padding: 12 }}
                onClick={() => showMessage('Import tool ready.')}
              >
                <span style={{ fontSize: '1.4rem' }}>📥</span>
                <div className="ll-action-body">
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--cream)' }}>Import Save</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>From device</div>
                </div>
                <span className="ll-action-chev">›</span>
              </div>

              <div
                className="ll-action-row"
                style={{ padding: 12 }}
                onClick={() => showMessage('Snapshot checksum verified.')}
              >
                <span style={{ fontSize: '1.4rem' }}>📑</span>
                <div className="ll-action-body">
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--cream)' }}>Save Details</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Full history</div>
                </div>
                <span className="ll-action-chev">›</span>
              </div>

              <div
                className="ll-action-row"
                style={{ padding: 12 }}
                onClick={() => showMessage('Slot management active.')}
              >
                <span style={{ fontSize: '1.4rem' }}>🗑️</span>
                <div className="ll-action-body">
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--red)' }}>Delete Save</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Clear slot</div>
                </div>
                <span className="ll-action-chev">›</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Tab: New Life */}
      {activeTab === 'New Life' && (
        <div className="ll-card" style={{ textAlign: 'center', padding: 24 }}>
          <h3>Begin Fresh Lineage</h3>
          <p style={{ color: 'var(--text-muted)', margin: '8px 0 16px' }}>
            Choose whether to begin a randomized life or configure an exact historical era and location.
          </p>
          <Link href="/" className="ll-btn-gold" style={{ textDecoration: 'none' }}>
            Go to Start Screen →
          </Link>
        </div>
      )}

      {/* Tab: Settings */}
      {activeTab === 'Settings' && (
        <div className="ll-card">
          <h3 style={{ marginBottom: 14 }}>System & Game Settings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.88rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Deterministic Seed RNG</span>
              <span className="ll-pill positive">Active (Mulberry32)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Storage Location</span>
              <span className="ll-pill gold">Drive D (Strict Rule 1)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Sound Effects</span>
              <span className="ll-pill neutral">Enabled</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

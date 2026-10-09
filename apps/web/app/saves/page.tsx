'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useLife } from '../../components/LifeContext';
import { api, getIsOffline, setOfflineMode, type SaveSummary } from '../../lib/api';
import { formatLocationFull, getCountryForLocation } from '../../lib/era';

export default function SavesPage(): JSX.Element {
  const router = useRouter();
  const { view, loadLife, deleteLife, createNewLife } = useLife();
  const [activeTab, setActiveTab] = useState<string>('Save / Load');
  const [toast, setToast] = useState<string | null>(null);
  const [saves, setSaves] = useState<SaveSummary[]>([]);
  const [loadingSaves, setLoadingSaves] = useState<boolean>(true);
  const [saveToDelete, setSaveToDelete] = useState<SaveSummary | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [offline, setOffline] = useState<boolean>(false);

  useEffect(() => {
    setOffline(getIsOffline());
  }, []);

  const fetchSaves = useCallback(async () => {
    setLoadingSaves(true);
    try {
      const res = await api.listLives();
      setSaves(res.saves ?? []);
    } catch {
      setSaves([]);
    } finally {
      setLoadingSaves(false);
    }
  }, []);

  useEffect(() => {
    void fetchSaves();
  }, [fetchSaves]);

  function showMessage(msg: string): void {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  async function handleLoad(id: string, name: string): Promise<void> {
    try {
      await loadLife(id);
      showMessage(`Loaded chronicle of ${name}!`);
      router.push('/');
    } catch {
      showMessage(`Failed to load save "${name}".`);
    }
  }

  async function confirmDelete(): Promise<void> {
    if (!saveToDelete) return;
    setIsDeleting(true);
    try {
      await deleteLife(saveToDelete.id);
      showMessage(`Deleted chronicle for ${saveToDelete.name}.`);
      setSaveToDelete(null);
      await fetchSaves();
    } catch {
      showMessage(`Failed to delete save.`);
    } finally {
      setIsDeleting(false);
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

      {/* Delete Confirmation Modal */}
      {saveToDelete && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            padding: 16,
          }}
        >
          <div className="ll-card ll-card-gold" style={{ maxWidth: 400, width: '100%', padding: 20 }}>
            <h3 style={{ color: 'var(--red)', marginBottom: 8 }}>Confirm Chronicle Deletion</h3>
            <p style={{ color: 'var(--text)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: 16 }}>
              Are you sure you want to delete the saved life of <strong>{saveToDelete.name}</strong> (Age {saveToDelete.age})?
              This will remove this specific character file while preserving any linked genealogical records.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="ll-btn-outline"
                disabled={isDeleting}
                onClick={() => setSaveToDelete(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="ll-btn-gold"
                style={{ background: '#b91c1c', borderColor: '#b91c1c', color: '#fff' }}
                disabled={isDeleting}
                onClick={() => void confirmDelete()}
              >
                {isDeleting ? 'Deleting...' : 'Delete Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ fontSize: '2rem' }}>📁</div>
        <div>
          <h2>Game Management</h2>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Save, load, and manage your genuine historical life stories.
          </div>
        </div>
      </div>

      {/* Tabs */}
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
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <h3 className="ll-section-title" style={{ margin: 0, fontSize: '1.05rem' }}>
                Your Saved Lives ({saves.length})
              </h3>
              <button
                type="button"
                className="ll-btn-outline"
                style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                onClick={() => void fetchSaves()}
              >
                ↻ Refresh
              </button>
            </div>

            {loadingSaves ? (
              <div className="ll-card" style={{ padding: 20, textAlign: 'center' }}>
                <span className="ll-muted">Loading recorded chronicles from storage…</span>
              </div>
            ) : saves.length === 0 ? (
              <div className="ll-card" style={{ padding: 24, textAlign: 'center' }}>
                <p style={{ color: 'var(--cream)', fontWeight: 600, marginBottom: 6 }}>
                  No Saved Lives Found
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', marginBottom: 14 }}>
                  Begin your first historical chronicle from the home screen or start a new life below.
                </p>
                <Link href="/" className="ll-btn-gold" style={{ textDecoration: 'none', display: 'inline-block' }}>
                  + Start New Chronicle
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {saves.map((slot, idx) => {
                  const isActive = view?.id === slot.id;
                  const country = getCountryForLocation(slot.locationId);
                  const city = formatLocationFull(slot.locationId);
                  const occTitle = slot.occupationId
                    ? slot.occupationId.replace(/^occupation\./, '').replace(/_/g, ' ')
                    : slot.age < 6
                      ? 'In Parental Care'
                      : slot.age < 14
                        ? 'Student'
                        : 'Independent Citizen';

                  return (
                    <div
                      key={slot.id}
                      className={`ll-card ${isActive ? 'll-card-gold' : ''}`}
                      style={{ padding: 14 }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
                          <div
                            style={{
                              width: 38,
                              height: 38,
                              borderRadius: 8,
                              background: isActive ? 'var(--gold-500)' : '#1b222d',
                              color: isActive ? '#120e06' : 'var(--cream)',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1rem',
                            }}
                          >
                            #{idx + 1}
                          </div>

                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ fontWeight: 700, color: 'var(--cream)', fontSize: '1rem' }}>
                                {slot.name}
                              </span>
                              {slot.generation > 1 && (
                                <span className="ll-pill gold" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                                  Gen {slot.generation}
                                </span>
                              )}
                              <span
                                className={`ll-pill ${slot.status === 'active' ? 'positive' : 'neutral'}`}
                                style={{ fontSize: '0.65rem', padding: '1px 6px' }}
                              >
                                {slot.status === 'active' ? 'Alive' : 'Deceased'}
                              </span>
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                              {country} ({city}) • Age {slot.age} • Year {slot.date.slice(0, 4)}
                            </div>
                            <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', textTransform: 'capitalize' }}>
                              {occTitle} • {slot.wealth} Coins
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button
                              type="button"
                              className={isActive ? 'll-btn-gold' : 'll-btn-outline'}
                              style={{
                                padding: '6px 14px',
                                fontSize: '0.82rem',
                                borderRadius: 999,
                              }}
                              onClick={() => {
                                if (isActive) {
                                  router.push('/');
                                } else {
                                  void handleLoad(slot.id, slot.name);
                                }
                              }}
                            >
                              {isActive ? '▶ Continue' : '▶ Load'}
                            </button>
                            <button
                              type="button"
                              className="ll-btn-outline"
                              style={{
                                padding: '6px 10px',
                                fontSize: '0.82rem',
                                borderRadius: 999,
                                color: 'var(--red)',
                                borderColor: 'rgba(239, 68, 68, 0.3)',
                              }}
                              title="Delete save"
                              onClick={() => setSaveToDelete(slot)}
                            >
                              🗑️
                            </button>
                          </div>
                          <div style={{ fontSize: '0.68rem', color: isActive ? 'var(--gold-400)' : 'var(--text-dim)' }}>
                            {isActive ? '● Currently Active' : slot.id.slice(0, 16)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Create New Chronicle Slot */}
          <div style={{ marginTop: 6 }}>
            <h3 className="ll-section-title" style={{ marginBottom: 10, fontSize: '1.05rem' }}>
              Create New Life Slot
            </h3>
            <div
              className="ll-card"
              style={{
                padding: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderStyle: 'dashed',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, color: 'var(--cream)', fontSize: '0.92rem' }}>
                  New Historical Life
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                  Start a new persona in British Raj Lucknow (1946) or Victorian London (1850).
                </div>
              </div>
              <button
                type="button"
                className="ll-pill gold"
                style={{ cursor: 'pointer', padding: '6px 14px', fontWeight: 600 }}
                onClick={() => {
                  void createNewLife({ name: `Chronicle #${saves.length + 1}` });
                  showMessage('Created new life chronicle!');
                  router.push('/');
                }}
              >
                + New Life
              </button>
            </div>
          </div>

          {/* Game Options */}
          <div style={{ marginTop: 8 }}>
            <h3 className="ll-section-title" style={{ marginBottom: 10, fontSize: '1.05rem' }}>
              Save Storage Tools
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* Export Button */}
              <div
                className="ll-action-row"
                style={{ padding: 12, cursor: 'pointer' }}
                onClick={async () => {
                  if (!view) {
                    showMessage('No active life to export.');
                    return;
                  }
                  try {
                    const json = await api.exportSave(view.id);
                    const blob = new Blob([json], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `legacylife-${view.player.name.replace(/\s+/g, '_')}-${view.id.slice(0, 8)}.json`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    showMessage(`✓ Exported save snapshot for ${view.player.name}.`);
                  } catch (err) {
                    showMessage(`Export failed: ${(err as Error).message}`);
                  }
                }}
              >
                <span style={{ fontSize: '1.4rem' }}>💾</span>
                <div className="ll-action-body">
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--cream)' }}>
                    Export Save Snapshot
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                    Download offline JSON snapshot file to your device
                  </div>
                </div>
                <span className="ll-action-chev">↓</span>
              </div>

              {/* Import Button */}
              <label
                className="ll-action-row"
                style={{ padding: 12, cursor: 'pointer', margin: 0 }}
              >
                <span style={{ fontSize: '1.4rem' }}>📂</span>
                <div className="ll-action-body">
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--cream)' }}>
                    Import Save Snapshot
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                    Restore a previously exported chronicle JSON file
                  </div>
                </div>
                <span className="ll-action-chev">↑</span>
                <input
                  type="file"
                  accept=".json,application/json"
                  style={{ display: 'none' }}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      const text = await file.text();
                      const imported = await api.importSave(text);
                      await loadLife(imported.id);
                      showMessage(`✓ Imported save for ${imported.player.name}!`);
                      await fetchSaves();
                      router.push('/');
                    } catch (err) {
                      showMessage(`Import failed: ${(err as Error).message || 'Invalid JSON'}`);
                    }
                    e.target.value = '';
                  }}
                />
              </label>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: '0.88rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--cream)' }}>Execution Engine</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  {offline ? '100% On-Device Standalone (Zero Network Calls)' : 'Backend API Server Mode'}
                </div>
              </div>
              <button
                type="button"
                className={`ll-pill ${offline ? 'positive' : 'neutral'}`}
                style={{ cursor: 'pointer', border: 'none', padding: '6px 12px' }}
                onClick={() => {
                  const nextState = !offline;
                  setOfflineMode(nextState);
                  setOffline(nextState);
                  showMessage(nextState ? 'Switched to Offline Standalone Engine' : 'Switched to Remote Server Engine');
                  void fetchSaves();
                }}
              >
                {offline ? '⚡ Standalone (Offline)' : '🌐 Remote Server'}
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Deterministic Seed RNG</span>
              <span className="ll-pill positive">Active (Mulberry32)</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Storage Driver</span>
              <span className="ll-pill gold">
                {offline ? 'localStorage Sandbox (Mobile/Browser)' : 'Drive D Atomic Store'}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Active Chronicle ID</span>
              <span className="ll-pill neutral">{view?.id ?? 'None'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useLife } from '../components/LifeContext';

const NODES = ['Childhood', 'Education', 'Career', 'Family', 'Legacy'];

import { formatLocationFull, getEraInfo, getCurrencyForLocation } from '../lib/era';

const INDIA_LOCATIONS = [
  { id: 'location.lucknow', name: 'Lucknow, India', tag: 'Awadh • Cultural & Administrative Capital' },
  { id: 'location.kanpur', name: 'Kanpur, India', tag: 'Industrial Hub • Textile Mills & Commerce' },
  { id: 'location.delhi', name: 'Delhi, India', tag: 'National Capital • Seat of Governance' },
  { id: 'location.prayagraj', name: 'Prayagraj (Allahabad), India', tag: 'Confluence • Law, Courts & Tradition' },
  { id: 'location.awadh_rural', name: 'Awadh Rural, India', tag: 'Agrarian Countryside • Village Farms' },
];

const INDIA_CLASSES = [
  { id: 'class.middle', name: 'Middle Class', tag: 'Clerks, Teachers & Traders' },
  { id: 'class.working', name: 'Working Class', tag: 'Artisans, Factory & Mill Workers' },
  { id: 'class.peasantry', name: 'Peasantry', tag: 'Tenant Farmers & Cultivators' },
  { id: 'class.professional', name: 'Professional Class', tag: 'Doctors, Advocates & Engineers' },
  { id: 'class.landed_elite', name: 'Landed Elite', tag: 'Taluqdars & Traditional Estates' },
];

const INDIA_DATES = [
  { value: '1946-03-01', label: '1 March 1946 (Post-War Dawn & Cabinet Mission)' },
  { value: '1947-08-15', label: '15 August 1947 (Historic Independence Day)' },
  { value: '1950-01-26', label: '26 January 1950 (Republic of India Constitution)' },
];

const VICTORIAN_LOCATIONS = [
  { id: 'location.london', name: 'London, Great Britain', tag: 'Imperial Metropolis • Thames Docks & Commerce' },
  { id: 'location.manchester', name: 'Manchester, Great Britain', tag: 'Cottonopolis • Steam Mills & Proletariat' },
  { id: 'location.birmingham', name: 'Birmingham, Great Britain', tag: 'City of 1,000 Trades • Metalworks & Foundries' },
  { id: 'location.glasgow', name: 'Glasgow, Great Britain', tag: 'River Clyde Shipyards & Heavy Locomotive Works' },
  { id: 'location.yorkshire', name: 'Yorkshire, Great Britain', tag: 'Leeds & West Riding • Woollen Mills' },
];

const VICTORIAN_CLASSES = [
  { id: 'class.victorian_middle', name: 'Middle Class (Clerks & Drapers)', tag: 'Counting House Clerks & Shopkeepers' },
  { id: 'class.victorian_working', name: 'Working Class (Millhands)', tag: 'Textile Operatives & Engine Stokers' },
  { id: 'class.victorian_professional', name: 'Professional Class', tag: 'Solicitors, Physicians & Schoolmasters' },
  { id: 'class.victorian_industrialist', name: 'Industrialist Elite', tag: 'Mill Owners & Chamber of Commerce Magnates' },
];

const VICTORIAN_DATES = [
  { value: '1840-05-01', label: '1 May 1840 (Victorian Dawn & Industrial Boom)' },
  { value: '1851-05-01', label: '1 May 1851 (The Great Exhibition at Crystal Palace)' },
  { value: '1870-08-09', label: '9 August 1870 (Elementary Education Act)' },
];

function getActiveStageIndex(stage: string): number {
  switch (stage) {
    case 'birth':
    case 'early_childhood':
    case 'childhood':
      return 0;
    case 'adolescence':
    case 'early_adulthood':
      return 1;
    case 'adulthood':
      return 2;
    case 'later_adulthood':
      return 3;
    default:
      return 4;
  }
}

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

export default function HomePage(): JSX.Element {
  const { view, loading, error, createNewLife, advanceLife, refresh, forgetLife } = useLife();

  // Onboarding / Setup State: 'hero' | 'mode' | 'custom-1' | 'custom-2' | 'birth'
  const [setupStep, setSetupStep] = useState<string>('hero');
  const [selectedEraId, setSelectedEraId] = useState<'india' | 'victorian'>('india');
  const [selectedYear, setSelectedYear] = useState<string>('1946-03-01');
  const [selectedPlace, setSelectedPlace] = useState<string>('Lucknow, India');
  const [customName, setCustomName] = useState<string>('');
  const [customGender, setCustomGender] = useState<'Male' | 'Female'>('Male');
  const [customClass, setCustomClass] = useState<string>('Middle Class');
  const [showTrailerModal, setShowTrailerModal] = useState<boolean>(false);
  const [advancing, setAdvancing] = useState<boolean>(false);
  const [advanceError, setAdvanceError] = useState<string | undefined>(undefined);

  const activeLocations = selectedEraId === 'victorian' ? VICTORIAN_LOCATIONS : INDIA_LOCATIONS;
  const activeClasses = selectedEraId === 'victorian' ? VICTORIAN_CLASSES : INDIA_CLASSES;
  const activeDates = selectedEraId === 'victorian' ? VICTORIAN_DATES : INDIA_DATES;

  function handleSelectEra(era: 'india' | 'victorian'): void {
    setSelectedEraId(era);
    if (era === 'victorian') {
      setSelectedYear('1840-05-01');
      setSelectedPlace(VICTORIAN_LOCATIONS[0]!.name);
      setCustomClass(VICTORIAN_CLASSES[0]!.name);
      setCustomName(customGender === 'Female' ? 'Emma Watson' : 'Arthur Pendelton');
    } else {
      setSelectedYear('1946-03-01');
      setSelectedPlace(INDIA_LOCATIONS[0]!.name);
      setCustomClass(INDIA_CLASSES[0]!.name);
      setCustomName(customGender === 'Female' ? 'Priya Sharma' : 'Aarav Sharma');
    }
  }

  async function handleAdvance(): Promise<void> {
    if (!view || view.status !== 'active') return;
    setAdvancing(true);
    setAdvanceError(undefined);
    try {
      await advanceLife(1);
    } catch (err) {
      setAdvanceError(err instanceof Error ? err.message : 'Failed to advance time');
    } finally {
      setAdvancing(false);
    }
  }

  function handleAutoCreate(): void {
    const isFemale = Math.random() > 0.5;
    const isVictorian = selectedEraId === 'victorian' || (Math.random() > 0.7);
    const chosenLocations = isVictorian ? VICTORIAN_LOCATIONS : INDIA_LOCATIONS;
    const chosenClasses = isVictorian ? VICTORIAN_CLASSES : INDIA_CLASSES;
    const chosenDates = isVictorian ? VICTORIAN_DATES : INDIA_DATES;

    const indiaMaleNames = ['Aarav Sharma', 'Mohan Sen', 'Arjun Prasad', 'Zubair Khan', 'Rajesh Verma', 'Devendra Singh'];
    const indiaFemaleNames = ['Ananya Roy', 'Priya Devi', 'Fatima Begum', 'Sunita Sen', 'Meera Patel', 'Kavita Verma'];
    const vicMaleNames = ['Arthur Pendelton', 'Charles Dickens', 'Thomas Thorne', 'Edward Sterling', 'William Cooper'];
    const vicFemaleNames = ['Emma Watson', 'Charlotte Brontë', 'Mary Higgins', 'Alice Thornton', 'Eleanor Vance'];

    const namePool = isVictorian
      ? (isFemale ? vicFemaleNames : vicMaleNames)
      : (isFemale ? indiaFemaleNames : indiaMaleNames);

    const name = namePool[Math.floor(Math.random() * namePool.length)]!;
    const loc = chosenLocations[Math.floor(Math.random() * chosenLocations.length)]!;
    const cls = chosenClasses[Math.floor(Math.random() * chosenClasses.length)]!;
    const date = chosenDates[Math.floor(Math.random() * chosenDates.length)]!;

    setCustomGender(isFemale ? 'Female' : 'Male');
    void createNewLife({
      name,
      birthDate: date.value,
      locationId: loc.id,
      classId: cls.id,
    });
  }

  function handleCustomCreate(): void {
    const loc = activeLocations.find((l) => l.name === selectedPlace) ?? activeLocations[0]!;
    const cls = activeClasses.find((c) => c.name === customClass) ?? activeClasses[0]!;
    const defaultName = selectedEraId === 'victorian'
      ? (customGender === 'Female' ? 'Emma Watson' : 'Arthur Pendelton')
      : (customGender === 'Female' ? 'Priya Sharma' : 'Aarav Sharma');

    void createNewLife({
      name: customName.trim() || defaultName,
      birthDate: selectedYear,
      locationId: loc.id,
      classId: cls.id,
    });
  }

  // 1. NO ACTIVE LIFE: Render Landing -> Mode Selection -> Custom Wizard
  if (!view) {
    // 1A. HERO LANDING SCREEN (Matches 'Landing  Start.png')
    if (setupStep === 'hero') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: 10 }}>
          {/* Hero Artwork Frame */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 12px 40px rgba(0,0,0,0.8)',
              border: '1px solid rgba(230, 179, 77, 0.25)',
              marginBottom: 20,
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: 380 }}>
              <Image
                src="/images/Landing  Start.png"
                alt="LegacyLife Hero Art"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(9,12,15,0.2) 0%, rgba(9,12,15,0.7) 70%, #090c0f 100%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 20,
                  left: 0,
                  right: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div style={{ width: 120, height: 120, position: 'relative', marginBottom: -10 }}>
                  <Image src="/images/logo.png" alt="Hourglass Logo" fill style={{ objectFit: 'contain' }} />
                </div>
                <h1 className="ll-logo" style={{ fontSize: '2.5rem', marginBottom: 4 }}>
                  LegacyLife
                </h1>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.82rem',
                    letterSpacing: '0.15em',
                    color: 'var(--cream)',
                    fontWeight: 600,
                  }}
                >
                  DIFFERENT ERAS. REAL CHOICES. YOUR LEGACY.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Actions */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
            <button
              type="button"
              className="ll-btn-gold"
              onClick={() => setSetupStep('mode')}
            >
              Start Your Journey →
            </button>
            <button
              type="button"
              className="ll-btn-outline"
              onClick={() => setShowTrailerModal(true)}
            >
              ▶ Watch Historical Chronicle
            </button>
          </div>

          {/* 3 Value Pillars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, width: '100%', marginTop: 8 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: '1.4rem' }}>⏳</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--cream)', fontWeight: 600 }}>Authentic Historical Eras</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: '1.4rem' }}>🔀</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--cream)', fontWeight: 600 }}>Make Meaningful Choices</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: '1.4rem' }}>👥</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--cream)', fontWeight: 600 }}>Experience Human Destinies</span>
            </div>
          </div>

          {/* Trailer Modal Simulation */}
          {showTrailerModal && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.85)',
                backdropFilter: 'blur(8px)',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
              }}
              onClick={() => setShowTrailerModal(false)}
            >
              <div
                className="ll-card ll-card-gold"
                style={{ maxWidth: 440, width: '100%', textAlign: 'center', padding: 24 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{ width: 80, height: 80, position: 'relative', margin: '0 auto 12px' }}>
                  <Image src="/images/logo.png" alt="Logo" fill style={{ objectFit: 'contain' }} />
                </div>
                <h2>A Living History Simulation</h2>
                <p style={{ color: 'var(--text-muted)', margin: '14px 0 20px', lineHeight: 1.6 }}>
                  Witness the transformation of a world in flux: independence, social reform, industrial expansion, and personal destiny. Your choices echo across generations.
                </p>
                <button
                  type="button"
                  className="ll-btn-gold"
                  onClick={() => {
                    setShowTrailerModal(false);
                    setSetupStep('mode');
                  }}
                >
                  Enter The Timeline →
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    // 1B. CHOOSE LIFE MODE (Matches 'Choose Life Mode — Auto Create  Custom Life.png')
    if (setupStep === 'mode') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <button
              type="button"
              className="ll-icon-btn"
              onClick={() => setSetupStep('hero')}
            >
              ←
            </button>
            <div>
              <h2>Choose Your Life Mode</h2>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>How would you like to begin your journey?</div>
            </div>
          </div>

          {/* Auto Create Card */}
          <div className="ll-card" style={{ padding: 18, border: '1px solid var(--border-gold)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'rgba(230, 179, 77, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  color: 'var(--gold-400)',
                }}
              >
                🎲
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem' }}>Auto Create</h3>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Quick start into a random destiny</div>
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: 16 }}>
              Let fate decide. A unique life will be born into a random city, social class, and historical circumstance.
            </p>
            <button
              type="button"
              className="ll-btn-gold"
              disabled={loading}
              onClick={handleAutoCreate}
            >
              {loading ? 'Entering History…' : 'Surprise Me →'}
            </button>
          </div>

          {/* Custom Life Card */}
          <div className="ll-card" style={{ padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: '#1d2531',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  color: 'var(--cream)',
                }}
              >
                ✏️
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem' }}>Custom Life</h3>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Handcraft your historical origin</div>
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: 16 }}>
              Shape your own beginning. Choose your exact birth date, city, social class, and name.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              <div className="ll-action-row" style={{ padding: '8px 12px' }}>
                <span style={{ fontSize: '1.2rem' }}>🏛️</span>
                <div style={{ flex: 1, fontSize: '0.85rem' }}>
                  Era: <strong>{selectedEraId === 'victorian' ? 'Victorian Industrial Era (1840)' : 'Post-War Era (1946)'}</strong>
                </div>
                <span className="ll-action-chev">›</span>
              </div>
              <div className="ll-action-row" style={{ padding: '8px 12px' }}>
                <span style={{ fontSize: '1.2rem' }}>📍</span>
                <div style={{ flex: 1, fontSize: '0.85rem' }}>
                  Place: <strong>{selectedEraId === 'victorian' ? 'London, United Kingdom' : 'Lucknow, India'}</strong>
                </div>
                <span className="ll-action-chev">›</span>
              </div>
              <div className="ll-action-row" style={{ padding: '8px 12px' }}>
                <span style={{ fontSize: '1.2rem' }}>👥</span>
                <div style={{ flex: 1, fontSize: '0.85rem' }}>Class: <strong>{customClass}</strong></div>
                <span className="ll-action-chev">›</span>
              </div>
            </div>

            <button
              type="button"
              className="ll-btn-outline"
              onClick={() => setSetupStep('custom-1')}
            >
              Configure Custom Life →
            </button>
          </div>
        </div>
      );
    }

    // 1C. CUSTOM LIFE SETUP: Step 1 Date & Location
    if (setupStep === 'custom-1') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              type="button"
              className="ll-icon-btn"
              onClick={() => setSetupStep('mode')}
            >
              ←
            </button>
            <div>
              <h2>Custom Life Setup</h2>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Step 1: Set time and location</div>
            </div>
          </div>

          {/* Epoch / Era Selector */}
          <div className="ll-card">
            <h3 className="ll-section-title">
              <span className="ll-section-icon">①</span> Choose Historical Epoch
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '4px 0 12px' }}>
              Select the historical epoch and civilization for your journey:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div
                className={`ll-card ${selectedEraId === 'india' ? 'll-card-gold' : ''}`}
                style={{
                  padding: 12,
                  cursor: 'pointer',
                  borderColor: selectedEraId === 'india' ? 'var(--gold-500)' : 'var(--border)',
                }}
                onClick={() => handleSelectEra('india')}
              >
                <div style={{ fontSize: '1.4rem', marginBottom: 4 }}>🇮🇳</div>
                <div style={{ fontWeight: 700, fontSize: '0.94rem', color: 'var(--cream)' }}>
                  Post-War India (1945–1970)
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: 4 }}>
                  Awadh & National Dawn • Partition, Republic & Green Revolution
                </div>
              </div>

              <div
                className={`ll-card ${selectedEraId === 'victorian' ? 'll-card-gold' : ''}`}
                style={{
                  padding: 12,
                  cursor: 'pointer',
                  borderColor: selectedEraId === 'victorian' ? 'var(--gold-500)' : 'var(--border)',
                }}
                onClick={() => handleSelectEra('victorian')}
              >
                <div style={{ fontSize: '1.4rem', marginBottom: 4 }}>🇬🇧</div>
                <div style={{ fontWeight: 700, fontSize: '0.94rem', color: 'var(--cream)' }}>
                  Victorian Britain (1840–1890)
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: 4 }}>
                  Age of Steam & Smog • Railway Mania, Crystal Palace & Factory Acts
                </div>
              </div>
            </div>
          </div>

          {/* Era & Date Picker */}
          <div className="ll-card">
            <h3 className="ll-section-title">
              <span className="ll-section-icon">②</span> Choose Historical Birth Date
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '4px 0 12px' }}>
              Select the historical milestone of your birth:
            </p>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              style={{
                width: '100%',
                padding: 12,
                borderRadius: 10,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                fontSize: '0.95rem',
                marginBottom: 10,
              }}
            >
              {activeDates.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          {/* Location Picker */}
          <div className="ll-card">
            <h3 className="ll-section-title">
              <span className="ll-section-icon">③</span> Choose Birth City
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '4px 0 12px' }}>
              Where in the historical universe will your life begin?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {activeLocations.map((loc) => {
                const active = selectedPlace === loc.name;
                return (
                  <div
                    key={loc.id}
                    className={`ll-card ${active ? 'll-card-gold' : ''}`}
                    style={{
                      padding: 12,
                      cursor: 'pointer',
                      borderColor: active ? 'var(--gold-500)' : 'var(--border)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                    onClick={() => setSelectedPlace(loc.name)}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--cream)' }}>
                        📍 {loc.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: 2 }}>
                        {loc.tag}
                      </div>
                    </div>
                    {active && <span style={{ color: 'var(--gold-400)', fontWeight: 700 }}>✓</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Identity & Social Class */}
          <div className="ll-card">
            <h3 className="ll-section-title">
              <span className="ll-section-icon">④</span> Character Identity & Social Standing
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, margin: '10px 0 12px' }}>
              {(['Male', 'Female'] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  className={customGender === g ? 'll-btn-gold' : 'll-btn-outline'}
                  style={{ padding: 10, fontSize: '0.9rem' }}
                  onClick={() => setCustomGender(g)}
                >
                  {g === 'Male' ? '👦 Male' : '👧 Female'}
                </button>
              ))}
            </div>

            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
              Full Character Name
            </label>
            <input
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder={
                selectedEraId === 'victorian'
                  ? (customGender === 'Female' ? 'e.g. Emma Watson or Charlotte Brontë' : 'e.g. Arthur Pendelton or Thomas Thorne')
                  : (customGender === 'Female' ? 'e.g. Priya Sharma or Ananya Sen' : 'e.g. Aarav Sharma or Arjun Prasad')
              }
              style={{
                width: '100%',
                padding: 12,
                borderRadius: 10,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                fontSize: '0.95rem',
                marginBottom: 12,
              }}
            />

            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
              Social Background / Household Class
            </label>
            <select
              value={customClass}
              onChange={(e) => setCustomClass(e.target.value)}
              style={{
                width: '100%',
                padding: 12,
                borderRadius: 10,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                fontSize: '0.95rem',
              }}
            >
              {activeClasses.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name} ({c.tag})
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="ll-btn-gold"
            onClick={() => setSetupStep('custom-2')}
          >
            Next: Historical Context →
          </button>
        </div>
      );
    }

    // 1D. CUSTOM SETUP: Step 2 Context Preview (Matches 'Historical Context Preview.png')
    if (setupStep === 'custom-2') {
      const yearOnly = selectedYear.slice(0, 4);
      const isVic = selectedEraId === 'victorian';
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              type="button"
              className="ll-icon-btn"
              onClick={() => setSetupStep('custom-1')}
            >
              ←
            </button>
            <div>
              <h2>Historical Context Preview</h2>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>The world you will be born into</div>
            </div>
          </div>

          <div className="ll-card ll-card-gold" style={{ padding: 18 }}>
            <span className="ll-pill gold" style={{ marginBottom: 6 }}>
              {isVic ? '1840 — 1890' : '1945 — 1970'}
            </span>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--cream)' }}>
              {isVic ? 'Victorian Industrial Britain' : 'Post-War Transformation Era'}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5, marginTop: 6 }}>
              {isVic
                ? 'The crucible of the steam age. Iron locomotives connect bustling cities, mechanical looms and foundries redefine commerce, and parliamentary reforms transform working life.'
                : 'A pivotal epoch of history. Empires dissolve, independent nations arise, and rapid modernization transforms ancient societies with five-year plans and civic institutions.'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginTop: 14 }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: 10, borderRadius: 10 }}>
                <div style={{ fontSize: '1.1rem' }}>🇮🇳 Sovereign Nation</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 2 }}>Colonial rule yields to independent republic</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: 10, borderRadius: 10 }}>
                <div style={{ fontSize: '1.1rem' }}>⚙️ Industrial Growth</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 2 }}>Railways, mills, electrification and plans</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: 10, borderRadius: 10 }}>
                <div style={{ fontSize: '1.1rem' }}>📜 Land & Social Reform</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 2 }}>Zamindari abolition and civic equity</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: 10, borderRadius: 10 }}>
                <div style={{ fontSize: '1.1rem' }}>👥 Democratic Franchise</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 2 }}>Universal polling and constitutional courts</div>
              </div>
            </div>
          </div>

          <div className="ll-card">
            <h3 className="ll-section-title">Your Starting Point</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 6 }}>
                <span className="ll-muted">📅 Date</span>
                <span>{selectedYear} ({yearOnly})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 6 }}>
                <span className="ll-muted">📍 Location</span>
                <span>{selectedPlace}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 6 }}>
                <span className="ll-muted">👤 Identity</span>
                <span>{customName || (customGender === 'Female' ? 'Priya Sharma' : 'Aarav Sharma')} ({customGender})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 6 }}>
                <span className="ll-muted">👑 Social Class</span>
                <span>{customClass}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="ll-btn-gold"
            onClick={() => setSetupStep('birth')}
          >
            Looks Good: Witness Birth →
          </button>
        </div>
      );
    }

    // 1E. BIRTH INTRODUCTION (Matches 'Life Introduction  Birth.png')
    if (setupStep === 'birth') {
      const yearOnly = selectedYear.slice(0, 4);
      const defaultName = customGender === 'Female' ? 'Priya Sharma' : 'Aarav Sharma';
      const finalName = customName.trim() || defaultName;

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Birth Painting */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 280,
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid var(--border-gold)',
            }}
          >
            <Image
              src="/images/Life Introduction  Birth.png"
              alt="Birth of Character"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 40%, rgba(9,12,15,0.9) 100%)',
              }}
            />
            <div style={{ position: 'absolute', bottom: 12, left: 16, right: 16 }}>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--cream)' }}>Your Life Begins</h2>
              <div style={{ color: 'var(--gold-400)', fontSize: '0.82rem', fontStyle: 'italic' }}>
                "A new soul enters the tapestry of history."
              </div>
            </div>
          </div>

          <div className="ll-card">
            <h3 className="ll-section-title">
              <span className="ll-section-icon">👶</span> Birth Chronicle
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '4px 0 12px' }}>
              You were born into a {customClass.toLowerCase()} household in {selectedPlace}.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              <div style={{ background: 'var(--bg-secondary)', padding: 10, borderRadius: 10 }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>NAME</div>
                <div style={{ fontWeight: 600, color: 'var(--cream)' }}>{finalName}</div>
              </div>
              <div style={{ background: 'var(--bg-secondary)', padding: 10, borderRadius: 10 }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>YEAR</div>
                <div style={{ fontWeight: 600, color: 'var(--cream)' }}>{yearOnly}</div>
              </div>
              <div style={{ background: 'var(--bg-secondary)', padding: 10, borderRadius: 10 }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>LOCATION</div>
                <div style={{ fontWeight: 600, color: 'var(--cream)' }}>{selectedPlace}</div>
              </div>
              <div style={{ background: 'var(--bg-secondary)', padding: 10, borderRadius: 10 }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>INITIAL HEALTH</div>
                <div style={{ fontWeight: 600, color: 'var(--green)' }}>Healthy (100)</div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="ll-btn-gold"
            disabled={loading}
            onClick={handleCustomCreate}
          >
            {loading ? 'Creating Destiny…' : 'Begin Your Journey →'}
          </button>
        </div>
      );
    }

    return (
      <div className="ll-card" style={{ textAlign: 'center', padding: 30 }}>
        <p className="ll-muted">Initializing historical universe…</p>
      </div>
    );
  }

  // 2. ACTIVE LIFE DASHBOARD (Matches 'LegacyLife Dashboard in Paris.png')
  const p = view.player;
  const currentStageIndex = getActiveStageIndex(p.stage);
  const healthVal = Math.min(100, Math.max(0, p.health));
  const knowledgeVal = Math.min(100, Math.max(0, p.educationYears * 12 + 10));
  const relationVal = Math.min(100, Math.max(0, view.familyMembers.length * 20 + 20));
  const wealthVal = Math.max(0, p.wealth);
  const repVal = Math.min(100, Math.max(0, p.reputation));
  const yearNum = view.date.slice(0, 4);
  const yearVal = parseInt(yearNum, 10);

  // Dynamic Era Name & Date
  const eraInfo = getEraInfo(p.locationId, yearVal);
  const eraTitle = eraInfo.eraTitle;
  const eraSpan = eraInfo.eraSpan;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* 2A. Character Identity Card */}
      <section className="ll-card ll-identity-card" aria-label="Player Identity">
        <div className="ll-avatar-circle">
          <Image
            src="/images/logo.png"
            alt="Character Avatar"
            fill
            style={{ objectFit: 'contain', padding: 4 }}
          />
        </div>
        <div className="ll-identity-info">
          <div className="ll-char-name">{p.name}</div>
          <div className="ll-char-meta">
            Age {p.age} • {customGender} • {formatClass(p.classId)}
          </div>
          <div className="ll-char-loc">
            <span>📍</span> {formatLocationFull(p.locationId)}, {yearNum}
          </div>
        </div>
        <div className="ll-era-badge">
          <span className="ll-era-badge-icon">🏛️</span>
          <span className="ll-era-name">{eraTitle}</span>
          <span className="ll-era-years">{eraSpan}</span>
        </div>
      </section>

      {/* 2B. Life Progress Card */}
      <section className="ll-card" aria-label="Life Progress">
        <div className="ll-progress-head">
          <span className="ll-section-title">Life Progress</span>
          <span className="ll-muted" style={{ fontSize: '0.82rem' }}>
            Age {p.age} / ~80 years
          </span>
        </div>
        <div className="ll-progress-track-wrapper">
          <div className="ll-progress-line" />
          <div className="ll-progress-nodes">
            {NODES.map((node, idx) => {
              const isActive = idx === currentStageIndex;
              const isDone = idx < currentStageIndex;
              return (
                <div
                  key={node}
                  className={`ll-progress-node ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}`}
                >
                  <div className="ll-node-dot" />
                  <span>{node}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2C. 5 Stat Cards Horizontal Row */}
      <section className="ll-stats-grid" aria-label="Vital Statistics">
        {/* Health */}
        <div className="ll-stat-card">
          <span className="ll-stat-icon">💚</span>
          <span className="ll-stat-title">Health</span>
          <span className="ll-stat-val">{healthVal}</span>
          <div className="ll-stat-bar-track">
            <div className="ll-stat-bar-fill" style={{ width: `${healthVal}%`, background: 'var(--green)' }} />
          </div>
        </div>

        {/* Knowledge */}
        <div className="ll-stat-card">
          <span className="ll-stat-icon">🧠</span>
          <span className="ll-stat-title">Knowledge</span>
          <span className="ll-stat-val">{knowledgeVal}</span>
          <div className="ll-stat-bar-track">
            <div className="ll-stat-bar-fill" style={{ width: `${knowledgeVal}%`, background: 'var(--blue)' }} />
          </div>
        </div>

        {/* Relationships */}
        <div className="ll-stat-card">
          <span className="ll-stat-icon">👥</span>
          <span className="ll-stat-title">Relations</span>
          <span className="ll-stat-val">{relationVal}</span>
          <div className="ll-stat-bar-track">
            <div className="ll-stat-bar-fill" style={{ width: `${relationVal}%`, background: 'var(--red)' }} />
          </div>
        </div>

        {/* Wealth */}
        <div className="ll-stat-card">
          <span className="ll-stat-icon">🪙</span>
          <span className="ll-stat-title">Wealth</span>
          <span className="ll-stat-val">{wealthVal}</span>
          <div className="ll-stat-bar-track">
            <div className="ll-stat-bar-fill" style={{ width: `${Math.min(100, wealthVal * 2)}%`, background: 'var(--yellow)' }} />
          </div>
        </div>

        {/* Reputation */}
        <div className="ll-stat-card">
          <span className="ll-stat-icon">⭐</span>
          <span className="ll-stat-title">Reputation</span>
          <span className="ll-stat-val">{repVal}</span>
          <div className="ll-stat-bar-track">
            <div className="ll-stat-bar-fill" style={{ width: `${repVal}%`, background: 'var(--purple)' }} />
          </div>
        </div>
      </section>

      {/* 2D. Current Situation Card */}
      <section className="ll-card ll-situation-card" aria-label="Current Situation">
        <div className="ll-situation-body">
          <h3 className="ll-section-title" style={{ marginBottom: 6 }}>
            <span className="ll-section-icon">📜</span> Current Situation
          </h3>
          <p style={{ lineHeight: 1.5, fontSize: '0.92rem' }}>
            {view.status === 'dead'
              ? view.legacy?.summary ?? 'Your life in this historical era has come to an end.'
              : p.age < 6
                ? `You are an infant (${p.age} years old), nurtured by your family in ${formatLocationFull(p.locationId)}. You spend your days resting in the cradle, playing with wooden toys, and learning your first words.`
                : p.age < 14
                  ? `You are ${p.age} years old, living with your family in ${formatLocationFull(p.locationId)}. You are enrolled in primary school, learning reading, arithmetic, and moral history.`
                  : p.age < 18
                    ? `You are ${p.age} years old in ${formatLocationFull(p.locationId)}. As an adolescent, you are eligible for trade apprenticeships and preparing for independent adult life.`
                    : p.occupationId
                      ? `You are an adult (${p.age} years old) living in ${formatLocationFull(p.locationId)}, working as ${p.occupationId.replace(/^occupation\./, '').replace(/_/g, ' ')}.`
                      : `You are an adult (${p.age} years old) in ${formatLocationFull(p.locationId)}, seeking an honorable occupation and forging your historical destiny.`}
          </p>
          {view.timelineTail.length > 0 && (
            <div style={{ marginTop: 8, fontSize: '0.82rem', color: 'var(--gold-400)', fontStyle: 'italic' }}>
              Latest: {view.timelineTail[view.timelineTail.length - 1]}
            </div>
          )}
        </div>
        <div className="ll-year-card">
          <span className="ll-year-icon">⏳</span>
          <span className="ll-year-label">Year</span>
          <span className="ll-year-num">{yearNum}</span>
        </div>
      </section>

      {/* 2E. Pending Decisions Alert Banner */}
      {view.status === 'active' && view.pending.length > 0 && (
        <Link
          href="/events"
          className="ll-choice-card selected"
          style={{ textDecoration: 'none' }}
        >
          <div className="ll-choice-icon-circle">🔔</div>
          <div className="ll-choice-body">
            <div className="ll-choice-title" style={{ color: 'var(--gold-400)' }}>
              Decisions Await ({view.pending.length})
            </div>
            <div className="ll-choice-desc">
              Historical events require your immediate choices and action.
            </div>
          </div>
          <span className="ll-action-chev">›</span>
        </Link>
      )}

      {/* 2F. "What would you like to do?" Age-Gated Action List */}
      {view.status === 'active' && (() => {
        interface DashboardAction {
          href: string;
          icon: string;
          title: string;
          desc: string;
        }

        let actions: DashboardAction[] = [];

        if (p.age < 6) {
          actions = [
            {
              href: '/health',
              icon: '🧸',
              title: 'Play & Explore',
              desc: 'Play with wooden toys in the courtyard to build early vitality.',
            },
            {
              href: '/people',
              icon: '👨‍👩‍👦',
              title: 'Bond with Family',
              desc: 'Cuddle with mother & father, listen to lullabies, and seek comfort.',
            },
            {
              href: '/career',
              icon: '🗣️',
              title: 'Infant Early Development',
              desc: 'Learn first words and observe the bustling household.',
            },
            {
              href: '/health',
              icon: '🛏️',
              title: 'Rest & Cradle Nap',
              desc: 'Sleep soundly in the cradle to grow strong and healthy.',
            },
            {
              href: '/world',
              icon: '🌳',
              title: 'Observe the World',
              desc: 'Watch the birds and listen to neighborhood morning sounds.',
            },
          ];
        } else if (p.age < 14) {
          actions = [
            {
              href: '/career',
              icon: '🏫',
              title: 'Attend School Lessons',
              desc: 'Learn reading, arithmetic, calligraphy, and classical history.',
            },
            {
              href: '/people',
              icon: '🪁',
              title: 'Play with Neighborhood Friends',
              desc: 'Fly kites, play marbles, and explore with school playmates.',
            },
            {
              href: '/people',
              icon: '🧹',
              title: 'Help Family with Chores',
              desc: 'Assist your parents with home duties to earn respect and praise.',
            },
            {
              href: '/economy',
              icon: '🪙',
              title: 'Manage Pocket Allowance',
              desc: 'Save your copper coins or buy sweet treats at the bazaar.',
            },
            {
              href: '/health',
              icon: '🏃',
              title: 'Health & Active Play',
              desc: 'Run outdoors, eat wholesome food, and stay energized.',
            },
            {
              href: '/world',
              icon: '🌐',
              title: 'Explore the Town',
              desc: 'Discover historic monuments, bazaars, and neighborhood temples.',
            },
          ];
        } else if (p.age < 18) {
          actions = [
            {
              href: '/career',
              icon: '🔨',
              title: 'Apprenticeships & Trades',
              desc: 'Seek a workshop placement or learn a skilled trade craft.',
            },
            {
              href: '/career',
              icon: '📖',
              title: 'Scholastic & Exam Prep',
              desc: 'Prepare for academic, clerical, or guild entrance examinations.',
            },
            {
              href: '/people',
              icon: '👥',
              title: 'Youth Social Circle',
              desc: 'Form bonds with fellow apprentices, mentors, and peers.',
            },
            {
              href: '/economy',
              icon: '🪙',
              title: 'Youth Earnings & Savings',
              desc: 'Manage your apprentice stipend and save for upcoming adulthood.',
            },
            {
              href: '/health',
              icon: '🏹',
              title: 'Physical & Martial Drill',
              desc: 'Build endurance, physical discipline, and agility.',
            },
            {
              href: '/world',
              icon: '🌐',
              title: 'Explore the Region',
              desc: 'Follow historic developments, news, and civic politics.',
            },
          ];
        } else {
          actions = [
            {
              href: '/career',
              icon: '💼',
              title: 'Professional Career',
              desc: 'Advance your trade, fulfill duties, and seek promotions.',
            },
            {
              href: '/economy',
              icon: '🪙',
              title: 'Manage Finances & Estate',
              desc: 'Manage income, investments, property, and taxes.',
            },
            {
              href: '/people',
              icon: '💍',
              title: 'Courtship & Relationships',
              desc: 'Find a spouse, nurture family bonds, and expand your circle.',
            },
            {
              href: '/people?tab=family',
              icon: '🏠',
              title: 'Household & Family Care',
              desc: 'Provide for your children, spouse, and elder relatives.',
            },
            {
              href: '/world',
              icon: '🌐',
              title: 'Civic Affairs & World',
              desc: 'Travel between regions, engage in politics, and track history.',
            },
            {
              href: '/health',
              icon: '💚',
              title: 'Health & Well-being',
              desc: 'Maintain vitality, consult doctors, and rest when weary.',
            },
          ];
        }

        return (
          <section className="ll-card" aria-label="Actions">
            <div className="ll-section-head">
              <h3 className="ll-section-title">
                <span className="ll-section-icon">🧭</span> What would you like to do?
              </h3>
              <Link href="/life" className="ll-link-gold">
                View All →
              </Link>
            </div>

            <div className="ll-action-list">
              {actions.map((act, idx) => (
                <Link key={idx} href={act.href} className="ll-action-row">
                  <div className="ll-action-icon-circle">{act.icon}</div>
                  <div className="ll-action-body">
                    <div className="ll-action-title">{act.title}</div>
                    <div className="ll-action-desc">{act.desc}</div>
                  </div>
                  <span className="ll-action-chev">›</span>
                </Link>
              ))}
            </div>
          </section>
        );
      })()}

      {/* 2G. Primary CTA: Advance Year or Legacy End */}
      {view.status === 'active' ? (
        <div style={{ marginTop: 6 }}>
          {advanceError && (
            <p style={{ color: 'var(--red)', fontSize: '0.85rem', marginBottom: 8, textAlign: 'center' }}>
              {advanceError}
            </p>
          )}
          <button
            type="button"
            className="ll-btn-gold"
            disabled={advancing}
            onClick={() => void handleAdvance()}
          >
            {advancing ? 'Passing Time in History…' : 'Advance 1 Year →'}
          </button>
        </div>
      ) : (
        <section className="ll-card ll-card-gold" style={{ textAlign: 'center', padding: 24 }}>
          <span style={{ fontSize: '2.5rem' }}>👑</span>
          <h2 style={{ margin: '8px 0', color: 'var(--cream)' }}>Your Journey Is Complete</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>
            {view.legacy?.summary}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link href="/legacy" className="ll-btn-gold" style={{ textDecoration: 'none' }}>
              View Complete Life Legacy →
            </Link>
            <button
              type="button"
              className="ll-btn-outline"
              onClick={() => {
                forgetLife();
                setSetupStep('hero');
              }}
            >
              Start a New Life
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

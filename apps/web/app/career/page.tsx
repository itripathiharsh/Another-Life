'use client';

import { useState } from 'react';
import { useLife } from '../../components/LifeContext';
import {
  formatLocationFull,
  getCurrencyForLocation,
  isVictorianLocation,
} from '../../lib/era';

interface Job {
  id: string;
  title: string;
  type: string;
  desc: string;
  income: string;
  minAge: number;
  experienceLevel: string;
  skillsGained: string;
  requirements: string;
  icon: string;
}

export default function CareerPage(): JSX.Element {
  const { view } = useLife();
  const [activeTab, setActiveTab] = useState<string>('Job Opportunities');
  const [toastMsg, setToastMsg] = useState<{ text: string; isError?: boolean } | null>(null);

  const player = view?.player;
  const age = player?.age ?? 0;
  const isVictorian = isVictorianLocation(player?.locationId);
  const locationName = formatLocationFull(player?.locationId);
  const currency = getCurrencyForLocation(player?.locationId);
  const year = view?.date.slice(0, 4) ?? (isVictorian ? '1850' : '1946');

  function showToast(text: string, isError = false): void {
    setToastMsg({ text, isError });
    setTimeout(() => setToastMsg(null), 3500);
  }

  // Determine current life-stage occupation / role
  let currentTitle = 'In Parental Care';
  let currentType = 'Infancy & Early Childhood';
  let currentIcon = '🧸';
  let currentDesc =
    'You are an infant in the care of your family. You spend your days resting, playing with simple toys, and learning your first words. You are far too young for labor or employment.';
  let currentIncome = '0 / year (Parental Care)';
  let currentExp = 'Growing Up';
  let currentSkills = 'Curiosity, Motor Skills';
  let currentDuties = [
    'Play with wooden toys and rattles',
    'Listen to parents’ stories and lullabies',
    'Explore the home courtyard',
    'Sleep in the family cradle',
  ];
  let progressTitle = 'Parental Nurturing & Growth';
  let progressScore = 100;

  if (age >= 6 && age < 14) {
    currentTitle = 'Primary School Student';
    currentType = 'Basic Education';
    currentIcon = '🏫';
    currentDesc =
      'You are enrolled in foundational schooling. You attend daily morning lessons to learn reading, arithmetic, history, and moral conduct.';
    currentIncome = '0 / year (Supported by Parents)';
    currentExp = '+10 Knowledge / yr';
    currentSkills = 'Literacy, Arithmetic';
    currentDuties = [
      'Attend morning recitation and writing classes',
      'Practice arithmetic and slate calligraphy',
      'Help family with light household chores after school',
      'Study classical folklore and historical events',
    ];
    progressTitle = 'Academic Standing';
    progressScore = 80;
  } else if (age >= 14 && age < 18) {
    if (player?.occupationId) {
      currentTitle = player.occupationId.replace(/^occupation\./, '').replace(/_/g, ' ');
      currentType = 'Trade Apprenticeship';
      currentIcon = '🔨';
      currentDesc =
        'You work as an apprentice under an experienced master, learning practical skills and earning a modest youth stipend.';
      currentIncome = '+10 / year';
      currentExp = '+15 Experience';
      currentSkills = 'Craft, Trade Etiquette';
      currentDuties = [
        'Assist master craftsman with daily workshop tasks',
        'Maintain tools and prepare raw materials',
        'Deliver finished wares to patrons and bazzars',
        'Learn the secrets and techniques of the guild',
      ];
      progressTitle = 'Apprenticeship Progress';
      progressScore = 65;
    } else {
      currentTitle = 'Academy Student & Trade Candidate';
      currentType = 'Youth Studies';
      currentIcon = '📖';
      currentDesc =
        'Having completed basic primary schooling, you are preparing your mind for adult trade examinations or higher academy studies.';
      currentIncome = '0 / year';
      currentExp = '+20 Knowledge';
      currentSkills = 'Reasoning, Discipline';
      currentDuties = [
        'Study advanced grammar, literature and accounts',
        'Inquire with master craftsmen about apprenticeships',
        'Discuss civic affairs with tutors and fellow students',
        'Prepare examination petitions',
      ];
      progressTitle = 'Scholastic Progress';
      progressScore = 70;
    }
  } else if (age >= 18) {
    if (player?.occupationId) {
      currentTitle = player.occupationId.replace(/^occupation\./, '').replace(/_/g, ' ');
      currentType = 'Full-time Profession';
      currentIcon = '💼';
      currentDesc =
        'You are an independent adult established in your profession, earning wages and building your civic reputation.';
      currentIncome = '+180 / year';
      currentExp = '+25 Pts / yr';
      currentSkills = 'Administration, Public Standing';
      currentDuties = [
        'Draft and file official correspondence and ledgers',
        'Verify commercial records and market permits',
        'Liaise with district magistrates and guild masters',
        'Manage departmental documentation and accounts',
      ];
      progressTitle = 'Job Performance';
      progressScore = 78;
    } else {
      currentTitle = 'Independent Citizen (Seeking Profession)';
      currentType = 'Adult Job Seeker';
      currentIcon = '📜';
      currentDesc =
        'You have reached adulthood and are seeking an honorable profession or trade contract in the city.';
      currentIncome = '0 / year';
      currentExp = 'Seeking Work';
      currentSkills = 'Adaptability';
      currentDuties = [
        'Inquire for vacancies at local trading houses',
        'Submit employment applications to municipal offices',
        'Network with family connections and merchants',
        'Seek contract labor or clerkships',
      ];
      progressTitle = 'Job Search Readiness';
      progressScore = 50;
    }
  }

  // All potential occupations with historical age gating and era alignment
  const jobs: Job[] = isVictorian
    ? [
        {
          id: 'j1',
          title: 'Apprentice Joiner & Carpenter',
          type: 'Apprenticeship',
          desc: 'Work under a master carpenter in the docks or builder yards. Learn timber joinery, carving, and framing.',
          income: `+${currency.symbol}12 / year`,
          minAge: 14,
          experienceLevel: 'Entry',
          skillsGained: 'Craftsmanship, Focus',
          requirements: 'Minimum Age 14+',
          icon: '🔨',
        },
        {
          id: 'j2',
          title: 'Draper’s & Shop Assistant',
          type: 'Apprenticeship',
          desc: 'Assist in a bustling high-street draper or dry goods shop. Measure cloth yards and record customer accounts.',
          income: `+${currency.symbol}15 / year`,
          minAge: 14,
          experienceLevel: 'Entry',
          skillsGained: 'Commerce, Ledger Accounts',
          requirements: 'Minimum Age 14+',
          icon: '🏪',
        },
        {
          id: 'j3',
          title: 'Cotton Mill Operative',
          type: 'Industrial Labor',
          desc: 'Operate mechanised steam weaving looms and carding machines in northern manufacturing mills.',
          income: `+${currency.symbol}18 / year`,
          minAge: 14,
          experienceLevel: 'Entry',
          skillsGained: 'Machinery Operation, Endurance',
          requirements: 'Minimum Age 14+',
          icon: '🏭',
        },
        {
          id: 'j4',
          title: 'Grammar School & Classical Scholar',
          type: 'Scholastic',
          desc: 'Pursue classical Greek, Latin, mathematics, and jurisprudence for high civil or legal offices.',
          income: '0 / year (Fellowship)',
          minAge: 14,
          experienceLevel: 'Scholastic',
          skillsGained: 'Philosophy, Classical Languages, Law',
          requirements: 'Minimum Age 14+, Literacy',
          icon: '📖',
        },
        {
          id: 'j5',
          title: 'GPO Telegraph Clerk',
          type: 'Full-time Professional',
          desc: 'Operate electric Morse telegraph keys transmitting domestic commerce and Admiralty wires across Great Britain.',
          income: `+${currency.symbol}180 / year`,
          minAge: 18,
          experienceLevel: 'Professional',
          skillsGained: 'Telegraphy, Administration, Ciphers',
          requirements: 'Minimum Age 18+, Education 8+ yrs',
          icon: '⚡',
        },
        {
          id: 'j6',
          title: 'Locomotive Stoker & Driver',
          type: 'Railway Transport',
          desc: 'Regulate high-pressure steam boilers and fireboxes on the Great Western and Northern Express trunk lines.',
          income: `+${currency.symbol}210 / year`,
          minAge: 18,
          experienceLevel: 'Advanced Technical',
          skillsGained: 'Boiler Engineering, Railway Regulations',
          requirements: 'Minimum Age 18+, Physical Stamina',
          icon: '🚂',
        },
        {
          id: 'j7',
          title: 'Steam Engine Builder & Fitter',
          type: 'Heavy Engineering',
          desc: 'Assemble marine propulsion engines, beam pumps, and industrial machine tools in iron foundry works.',
          income: `+${currency.symbol}240 / year`,
          minAge: 18,
          experienceLevel: 'Master Artisan',
          skillsGained: 'Mechanical Precision, Metallurgy',
          requirements: `Minimum Age 18+, Capital 100+ ${currency.unit}`,
          icon: '⚙️',
        },
        {
          id: 'j8',
          title: 'Surgeon & Apothecary Physician',
          type: 'Medical Profession',
          desc: 'Practice medicine, clinical diagnoses, and public sanitation under the Royal College of Surgeons.',
          income: `+${currency.symbol}260 / year`,
          minAge: 20,
          experienceLevel: 'Advanced Scholastic',
          skillsGained: 'Surgery, Pharmacology, Anatomy',
          requirements: 'Minimum Age 20+, Education 10+ yrs',
          icon: '🩺',
        },
      ]
    : [
        {
          id: 'j1',
          title: 'Apprentice Carpenter',
          type: 'Apprenticeship',
          desc: 'Work under a master carpenter. Learn wood joinery, carving, and furniture construction.',
          income: `+${currency.symbol}12 / year`,
          minAge: 14,
          experienceLevel: 'Entry',
          skillsGained: 'Craftsmanship, Focus',
          requirements: 'Minimum Age 14+',
          icon: '🔨',
        },
        {
          id: 'j2',
          title: 'Shop Assistant / Helper',
          type: 'Apprenticeship',
          desc: 'Assist at a bustling market stall. Learn commercial bookkeeping, weights, and trade.',
          income: `+${currency.symbol}15 / year`,
          minAge: 14,
          experienceLevel: 'Entry',
          skillsGained: 'Trade, Communication',
          requirements: 'Minimum Age 14+',
          icon: '🏪',
        },
        {
          id: 'j3',
          title: 'Agricultural Assistant',
          type: 'Seasonal Labor',
          desc: 'Assist on regional farms during sowing and harvest seasons.',
          income: `+${currency.symbol}10 / year`,
          minAge: 14,
          experienceLevel: 'Entry',
          skillsGained: 'Physical Endurance, Agriculture',
          requirements: 'Minimum Age 14+',
          icon: '🌾',
        },
        {
          id: 'j4',
          title: 'Academy / University Scholar',
          type: 'Scholastic',
          desc: 'Pursue advanced scholarship, law, and economic planning for higher civil positions.',
          income: '0 / year (Scholarship)',
          minAge: 14,
          experienceLevel: 'Scholastic',
          skillsGained: 'Philosophy, Logic, Law',
          requirements: 'Minimum Age 14+, Literacy',
          icon: '📖',
        },
        {
          id: 'j5',
          title: 'Government Secretariat Clerk',
          type: 'Full-time Professional',
          desc: 'Serve in the civil administration drafting records, petitions, and tax accounts.',
          income: `+${currency.symbol}180 / year`,
          minAge: 18,
          experienceLevel: 'Professional',
          skillsGained: 'Administration, Law, Penmanship',
          requirements: 'Minimum Age 18+, Education 8+ yrs',
          icon: '📜',
        },
        {
          id: 'j6',
          title: 'Independent Merchant',
          type: 'Full-time Commerce',
          desc: 'Operate an independent trade venture importing goods across regional trade hubs.',
          income: `+${currency.symbol}220 / year`,
          minAge: 18,
          experienceLevel: 'Advanced',
          skillsGained: 'Negotiation, Trade Logistics',
          requirements: `Minimum Age 18+, Capital 100+ ${currency.unit}`,
          icon: '🚢',
        },
        {
          id: 'j7',
          title: 'Civil Defense & Armed Service',
          type: 'Public Defense',
          desc: 'Serve in national border defense and civil emergency volunteer brigades.',
          income: `+${currency.symbol}140 / year`,
          minAge: 18,
          experienceLevel: 'Public Service',
          skillsGained: 'Combat, Discipline, Vigilance',
          requirements: 'Minimum Age 18+, Health 75+',
          icon: '⚔️',
        },
        {
          id: 'j8',
          title: 'Physician / Medical Vaid',
          type: 'Medical Field',
          desc: 'Study pathology, public health immunization, and pharmacology.',
          income: `+${currency.symbol}200 / year`,
          minAge: 20,
          experienceLevel: 'Advanced Scholastic',
          skillsGained: 'Medicine, Biology, Care',
          requirements: 'Minimum Age 20+, Education 10+ yrs',
          icon: '🩺',
        },
      ];

  function handleApply(job: Job): void {
    if (age < job.minAge) {
      showToast(
        `⛔ Ineligible: You are only ${age} years old. Minimum required age for ${job.title} is ${job.minAge}.`,
        true,
      );
      return;
    }
    showToast(
      `✓ Position applied! Your petition for ${job.title} has been logged with the guild masters.`,
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Toast Notification */}
      {toastMsg && (
        <div
          style={{
            position: 'fixed',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            background: toastMsg.isError ? '#d32f2f' : 'var(--gold-500)',
            color: toastMsg.isError ? '#ffffff' : '#120e06',
            padding: '10px 22px',
            borderRadius: 999,
            fontWeight: 700,
            fontSize: '0.9rem',
            zIndex: 100,
            boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
            textAlign: 'center',
            maxWidth: '90%',
          }}
        >
          {toastMsg.text}
        </div>
      )}

      {/* Header */}
      <div>
        <h2>Career & Life Calling</h2>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Build your skills, earn your livelihood, and shape your historical footprint.
        </div>
      </div>

      {/* Current Job / Role Card (Matches Career.png design) */}
      <section className="ll-card ll-card-gold" aria-label="Current Role">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 10,
          }}
        >
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: 'rgba(230, 179, 77, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.6rem',
                color: 'var(--gold-400)',
              }}
            >
              {currentIcon}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    color: 'var(--cream)',
                    textTransform: 'capitalize',
                  }}
                >
                  {currentTitle}
                </h3>
                <span className="ll-pill gold" style={{ fontSize: '0.72rem' }}>
                  {currentType}
                </span>
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.84rem' }}>
                {locationName} • Year {year} • Age {age}
              </div>
            </div>
          </div>
        </div>

        <p
          style={{
            color: 'var(--text)',
            fontSize: '0.88rem',
            lineHeight: 1.5,
            marginBottom: 14,
          }}
        >
          {currentDesc}
        </p>

        {/* 3 KPI Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 8,
            background: 'rgba(0,0,0,0.3)',
            padding: 10,
            borderRadius: 10,
            marginBottom: 12,
          }}
        >
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>ANNUAL INCOME</div>
            <div
              style={{
                fontWeight: 700,
                color: currentIncome.includes('+') ? 'var(--green)' : 'var(--cream)',
              }}
            >
              {currentIncome}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>EXPERIENCE / GAIN</div>
            <div style={{ fontWeight: 700, color: 'var(--blue)' }}>{currentExp}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>PRIMARY FOCUS</div>
            <div
              style={{
                fontWeight: 600,
                color: 'var(--cream)',
                fontSize: '0.78rem',
              }}
            >
              {currentSkills}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: 10, borderRadius: 10 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.78rem',
              marginBottom: 4,
            }}
          >
            <span style={{ color: 'var(--text-muted)' }}>{progressTitle}</span>
            <span style={{ fontWeight: 700, color: 'var(--gold-400)' }}>
              {progressScore}%
            </span>
          </div>
          <div className="ll-stat-bar-track">
            <div
              className="ll-stat-bar-fill"
              style={{ width: `${progressScore}%`, background: 'var(--gold-500)' }}
            />
          </div>
        </div>
      </section>

      {/* Daily Duties Card */}
      <section className="ll-card" aria-label="Daily Duties">
        <h3 className="ll-section-title" style={{ marginBottom: 8 }}>
          <span className="ll-section-icon">📋</span> Daily Responsibilities & Duties
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {currentDuties.map((duty, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 12px',
                background: 'var(--bg-secondary)',
                borderRadius: 8,
                fontSize: '0.85rem',
              }}
            >
              <span style={{ color: 'var(--gold-400)' }}>✓</span>
              <span>{duty}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Career Filter Tabs */}
      <div className="ll-filter-tabs">
        {['Job Opportunities', 'My Career Progress', 'Skills', 'Achievements'].map(
          (tab) => (
            <button
              key={tab}
              type="button"
              className={`ll-filter-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ),
        )}
      </div>

      {/* Tab Content: Job Opportunities */}
      {activeTab === 'Job Opportunities' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {age < 14 && (
            <div
              className="ll-card"
              style={{
                background: 'rgba(230, 179, 77, 0.08)',
                borderColor: 'var(--border-gold)',
                padding: 12,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  color: 'var(--gold-400)',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                }}
              >
                <span>ℹ️</span> Life Stage Notice: Child Character (Age {age})
              </div>
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.82rem',
                  marginTop: 4,
                  lineHeight: 1.4,
                }}
              >
                In accordance with historical realism and social law, young children cannot be
                employed in independent professions. Trade apprenticeships unlock at{' '}
                <strong>Age 14</strong>, and full adult professions unlock at{' '}
                <strong>Age 18</strong>.
              </p>
            </div>
          )}

          {jobs.map((job) => {
            const isEligible = age >= job.minAge;
            return (
              <div
                key={job.id}
                className="ll-card"
                style={{
                  padding: 14,
                  opacity: isEligible ? 1 : 0.72,
                  borderColor: isEligible ? 'var(--border)' : 'rgba(255,255,255,0.06)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 8,
                  }}
                >
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: '1.5rem' }}>{job.icon}</span>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', color: 'var(--cream)' }}>
                        {job.title}
                      </h4>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          marginTop: 2,
                        }}
                      >
                        <span
                          className={`ll-pill ${isEligible ? 'positive' : 'negative'}`}
                          style={{ fontSize: '0.7rem' }}
                        >
                          {isEligible ? 'Eligible' : `Requires Age ${job.minAge}+`}
                        </span>
                        <span
                          className="ll-pill neutral"
                          style={{ fontSize: '0.7rem' }}
                        >
                          {job.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: isEligible ? 'var(--green)' : 'var(--text-dim)',
                      fontSize: '0.92rem',
                    }}
                  >
                    {job.income}
                  </div>
                </div>

                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.4,
                    marginBottom: 10,
                  }}
                >
                  {job.desc}
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 6,
                    fontSize: '0.78rem',
                    background: 'var(--bg-secondary)',
                    padding: 8,
                    borderRadius: 8,
                    marginBottom: 10,
                  }}
                >
                  <div>
                    <span className="ll-muted">Requirements:</span>{' '}
                    <span>{job.requirements}</span>
                  </div>
                  <div>
                    <span className="ll-muted">Skills:</span> <span>{job.skillsGained}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className={isEligible ? 'll-btn-gold' : 'll-btn-outline'}
                  style={{
                    width: '100%',
                    padding: '8px 14px',
                    fontSize: '0.85rem',
                    cursor: isEligible ? 'pointer' : 'not-allowed',
                  }}
                  onClick={() => handleApply(job)}
                >
                  {isEligible ? 'Apply for Position →' : `Locked (Minimum Age ${job.minAge})`}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab Content: My Career Progress */}
      {activeTab === 'My Career Progress' && (
        <div className="ll-card" style={{ padding: 16 }}>
          <h3 className="ll-section-title">Historical Career Trajectory</h3>
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              margin: '6px 0 14px',
            }}
          >
            Tracking your professional milestones across life stages.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                padding: 10,
                background: 'var(--bg-secondary)',
                borderRadius: 8,
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>👶</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                  Infancy & Early Nurturing (Ages 0–5)
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {age >= 5 ? 'Completed in parental care.' : 'Current stage of life.'}
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                padding: 10,
                background: 'var(--bg-secondary)',
                borderRadius: 8,
                opacity: age >= 6 ? 1 : 0.5,
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>🏫</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                  Primary School & Foundations (Ages 6–13)
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {age >= 14
                    ? 'Completed basic literacy and arithmetic.'
                    : age >= 6
                      ? 'Currently enrolled in school.'
                      : 'Upcoming once you reach Age 6.'}
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                padding: 10,
                background: 'var(--bg-secondary)',
                borderRadius: 8,
                opacity: age >= 14 ? 1 : 0.5,
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>🔨</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                  Apprenticeship / Secondary Academy (Ages 14–17)
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {age >= 18
                    ? 'Completed youth preparation.'
                    : age >= 14
                      ? 'Eligible for trade workshops.'
                      : 'Locked until Age 14.'}
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                padding: 10,
                background: 'var(--bg-secondary)',
                borderRadius: 8,
                opacity: age >= 18 ? 1 : 0.5,
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>🏛️</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                  Adult Profession & Public Standing (Ages 18+)
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {age >= 18
                    ? 'Full professional career active.'
                    : 'Locked until legal adulthood (Age 18).'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Skills */}
      {activeTab === 'Skills' && (
        <div className="ll-card" style={{ padding: 16 }}>
          <h3 className="ll-section-title">Character Competencies</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.82rem',
                  marginBottom: 4,
                }}
              >
                <span>Literacy & Language</span>
                <span style={{ color: 'var(--gold-400)', fontWeight: 700 }}>
                  {Math.min(100, (player?.educationYears ?? 0) * 15 + 10)}%
                </span>
              </div>
              <div className="ll-stat-bar-track">
                <div
                  className="ll-stat-bar-fill"
                  style={{
                    width: `${Math.min(100, (player?.educationYears ?? 0) * 15 + 10)}%`,
                    background: 'var(--blue)',
                  }}
                />
              </div>
            </div>

            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.82rem',
                  marginBottom: 4,
                }}
              >
                <span>Trade & Commercial Sense</span>
                <span style={{ color: 'var(--gold-400)', fontWeight: 700 }}>
                  {age >= 18 ? 55 : age >= 14 ? 30 : 10}%
                </span>
              </div>
              <div className="ll-stat-bar-track">
                <div
                  className="ll-stat-bar-fill"
                  style={{
                    width: `${age >= 18 ? 55 : age >= 14 ? 30 : 10}%`,
                    background: 'var(--green)',
                  }}
                />
              </div>
            </div>

            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.82rem',
                  marginBottom: 4,
                }}
              >
                <span>Social & Civic Standing</span>
                <span style={{ color: 'var(--gold-400)', fontWeight: 700 }}>
                  {Math.min(100, (player?.reputation ?? 0) + 15)}%
                </span>
              </div>
              <div className="ll-stat-bar-track">
                <div
                  className="ll-stat-bar-fill"
                  style={{
                    width: `${Math.min(100, (player?.reputation ?? 0) + 15)}%`,
                    background: 'var(--gold-500)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Achievements */}
      {activeTab === 'Achievements' && (
        <div className="ll-card" style={{ padding: 16 }}>
          <h3 className="ll-section-title">Career Milestones</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: 10,
                background: 'var(--bg-secondary)',
                borderRadius: 8,
              }}
            >
              <span style={{ fontSize: '1.4rem' }}>🌟</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>Born to Life</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Entered the historical tapestry in {locationName}.
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: 10,
                background: 'var(--bg-secondary)',
                borderRadius: 8,
                opacity: age >= 6 ? 1 : 0.4,
              }}
            >
              <span style={{ fontSize: '1.4rem' }}>📚</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>Scholar of Letters</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Began primary school education at age 6.
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: 10,
                background: 'var(--bg-secondary)',
                borderRadius: 8,
                opacity: age >= 14 ? 1 : 0.4,
              }}
            >
              <span style={{ fontSize: '1.4rem' }}>🔨</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>Youth Guild Candidate</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Eligible to seek trade apprenticeships.
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: 10,
                background: 'var(--bg-secondary)',
                borderRadius: 8,
                opacity: age >= 18 ? 1 : 0.4,
              }}
            >
              <span style={{ fontSize: '1.4rem' }}>👑</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>Self-Made Freeman</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Reached full adulthood with independent career rights.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

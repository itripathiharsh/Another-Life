'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useLife } from '../../components/LifeContext';
import {
  ALL_CITY_METADATA,
  formatLocationFull,
  getCountryForLocation,
  getCurrencyForLocation,
  getEraInfo,
  isVictorianLocation,
} from '../../lib/era';

interface RegionCondition {
  region: string;
  wealth: string;
  education: string;
  healthcare: string;
  safety: string;
  quality: string;
}

export default function WorldPage(): JSX.Element {
  const { view } = useLife();
  const player = view?.player;
  const locationRaw = player?.locationId ?? 'location.lucknow';
  const isVictorian = isVictorianLocation(locationRaw);
  const [selectedRegion, setSelectedRegion] = useState<string>(isVictorian ? 'Europe' : 'Asia');

  const yearStr = view?.date.slice(0, 4) ?? (isVictorian ? '1850' : '1946');
  const yearNum = parseInt(yearStr, 10);

  const city = ALL_CITY_METADATA[locationRaw] ?? (isVictorian ? ALL_CITY_METADATA['location.london']! : ALL_CITY_METADATA['location.lucknow']!);
  const eraInfo = getEraInfo(locationRaw, yearNum);
  const currency = getCurrencyForLocation(locationRaw);

  const regions: RegionCondition[] = isVictorian
    ? [
        { region: 'British Isles & Empire', wealth: 'var(--green)', education: 'var(--green)', healthcare: 'var(--yellow)', safety: 'var(--green)', quality: 'var(--green)' },
        { region: 'Western Europe', wealth: 'var(--green)', education: 'var(--green)', healthcare: 'var(--yellow)', safety: 'var(--yellow)', quality: 'var(--green)' },
        { region: 'North America', wealth: 'var(--green)', education: 'var(--yellow)', healthcare: 'var(--yellow)', safety: 'var(--yellow)', quality: 'var(--yellow)' },
        { region: 'East Asia', wealth: 'var(--yellow)', education: 'var(--yellow)', healthcare: 'var(--yellow)', safety: 'var(--yellow)', quality: 'var(--yellow)' },
        { region: 'South Asia (Colonies)', wealth: 'var(--yellow)', education: 'var(--yellow)', healthcare: 'var(--red)', safety: 'var(--yellow)', quality: 'var(--yellow)' },
        { region: 'Africa', wealth: 'var(--red)', education: 'var(--red)', healthcare: 'var(--red)', safety: 'var(--red)', quality: 'var(--red)' },
      ]
    : [
        { region: 'South Asia (India)', wealth: 'var(--yellow)', education: 'var(--yellow)', healthcare: 'var(--yellow)', safety: 'var(--green)', quality: 'var(--green)' },
        { region: 'East Asia', wealth: 'var(--yellow)', education: 'var(--yellow)', healthcare: 'var(--yellow)', safety: 'var(--yellow)', quality: 'var(--yellow)' },
        { region: 'Europe', wealth: 'var(--yellow)', education: 'var(--green)', healthcare: 'var(--yellow)', safety: 'var(--yellow)', quality: 'var(--green)' },
        { region: 'Middle East', wealth: 'var(--yellow)', education: 'var(--yellow)', healthcare: 'var(--yellow)', safety: 'var(--yellow)', quality: 'var(--yellow)' },
        { region: 'Africa', wealth: 'var(--red)', education: 'var(--yellow)', healthcare: 'var(--red)', safety: 'var(--yellow)', quality: 'var(--yellow)' },
        { region: 'Americas', wealth: 'var(--green)', education: 'var(--green)', healthcare: 'var(--green)', safety: 'var(--green)', quality: 'var(--green)' },
      ];

  const globalEvents = isVictorian
    ? [
        {
          icon: '🏛️',
          title: 'Parliamentary Legislation & Reform',
          date: `15 Mar ${yearStr}`,
          desc: 'Westminster deliberates on municipal public health acts, factory hour limits, and franchise reform.',
        },
        {
          icon: '🚂',
          title: 'Railway Mania & Steam Transit',
          date: `28 Feb ${yearStr}`,
          desc: 'Rapidly expanding locomotive railway networks connect colliery basins and textile mills with London docks.',
        },
        {
          icon: '⚙️',
          title: 'Industrial Exposition & Machinery',
          date: `10 Jan ${yearStr}`,
          desc: 'Demonstrations of modern steam engines, telegraph links, and mechanised factory production.',
        },
      ]
    : [
        {
          icon: '🏛️',
          title: yearNum < 1947 ? 'Cabinet Mission Negotiations' : yearNum < 1950 ? 'Drafting the Constitution' : 'Parliamentary Five-Year Plans',
          date: `15 Mar ${yearStr}`,
          desc: yearNum < 1947
            ? 'British cabinet delegation confers with national leaders in Delhi over self-governance.'
            : yearNum < 1950
              ? 'Constituent Assembly debates fundamental rights and republican federalism.'
              : 'National planning commission allocates capital to dams, railways, and industrial plants.',
        },
        {
          icon: '🌾',
          title: 'Agricultural & Land Reforms',
          date: `28 Feb ${yearStr}`,
          desc: 'Zamindari abolition legislation and agrarian tenancy reforms reshape regional land tenure.',
        },
        {
          icon: '🚂',
          title: 'Infrastructure & Railway Growth',
          date: `10 Jan ${yearStr}`,
          desc: 'Electrification, river valley hydroelectric dams, and expanding passenger transit routes across the nation.',
        },
      ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* City Profile & Cartography Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14 }}>
        {/* City Profile Card */}
        <div className="ll-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '1.4rem' }}>🏛️</span>
                <h2 style={{ fontSize: '1.15rem', color: 'var(--cream)', margin: 0 }}>
                  {city.name}
                </h2>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--gold-400)', marginTop: 4 }}>
                {city.tag}
              </div>
            </div>
            <span className="ll-pill gold">Current Location</span>
          </div>

          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 16 }}>
            {city.desc}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            <div style={{ background: 'var(--bg-secondary)', padding: 8, borderRadius: 8 }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>POPULATION</div>
              <div style={{ fontWeight: 600 }}>{city.pop}</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: 8, borderRadius: 8 }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>GOVERNMENT</div>
              <div style={{ fontWeight: 600, fontSize: '0.8rem' }}>{eraInfo.governmentTitle}</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: 8, borderRadius: 8 }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>LANGUAGE</div>
              <div style={{ fontWeight: 600 }}>{city.lang}</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: 8, borderRadius: 8 }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>CURRENCY</div>
              <div style={{ fontWeight: 600 }}>{currency.name}</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: 8, borderRadius: 8 }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>CIVIC STABILITY</div>
              <div style={{ fontWeight: 600, color: 'var(--green)' }}>Stable</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: 8, borderRadius: 8 }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>ECONOMIC GROWTH</div>
              <div style={{ fontWeight: 600, color: 'var(--gold-400)' }}>High Expansion</div>
            </div>
          </div>
        </div>

        {/* Historical Map Card */}
        <div
          className="ll-card"
          style={{
            position: 'relative',
            minHeight: 280,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, opacity: 0.85 }}>
            <Image
              src="/images/Historical Map.png"
              alt="Historical Cartography"
              fill
              style={{ objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(9,12,15,0.4) 0%, rgba(9,12,15,0.85) 100%)',
              }}
            />
          </div>

          <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="ll-pill gold">Cartography • {eraInfo.eraTitle} ({eraInfo.eraSpan})</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button type="button" className="ll-pill neutral" style={{ cursor: 'pointer' }}>+</button>
              <button type="button" className="ll-pill neutral" style={{ cursor: 'pointer' }}>-</button>
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {(isVictorian
                ? ['British Isles', 'Western Europe', 'North America', 'East Asia', 'Colonies']
                : ['South Asia', 'East Asia', 'Middle East', 'Europe', 'Americas']
              ).map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`ll-pill ${selectedRegion === r ? 'gold' : 'muted'}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedRegion(r)}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Global Events & World Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }}>
        {/* Global Events Feed */}
        <div className="ll-card">
          <div className="ll-section-head">
            <h3 className="ll-section-title">
              <span className="ll-section-icon">⚔️</span> Era Chronicles & News
            </h3>
            <span className="ll-muted" style={{ fontSize: '0.8rem' }}>Year {yearStr}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {globalEvents.map((evt, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: 8,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: '1.2rem' }}>{evt.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--cream)' }}>{evt.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{evt.desc}</div>
                  </div>
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--gold-400)', whiteSpace: 'nowrap' }}>
                  {evt.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* World Stats Card */}
        <div className="ll-card">
          <h3 className="ll-section-title" style={{ marginBottom: 12 }}>
            <span className="ll-section-icon">🌐</span> Global & Regional Stats
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            <div style={{ background: 'var(--bg-secondary)', padding: 10, borderRadius: 10 }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>GLOBAL POPULATION</div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--cream)' }}>
                {isVictorian ? '~ 1.2 Billion' : '~ 2.5 Billion'}
              </div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: 10, borderRadius: 10 }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                {eraInfo.countryName.toUpperCase()} POPULATION
              </div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--cream)' }}>
                {isVictorian ? '~ 28 Million' : '~ 360 Million'}
              </div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: 10, borderRadius: 10 }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>RAILWAY NETWORK</div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--green)' }}>
                {isVictorian ? '13,000+ Track Miles' : '55,000+ Route Miles'}
              </div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: 10, borderRadius: 10 }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>LITERACY RATE</div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--yellow)' }}>
                {isVictorian ? 'Expanding (60%)' : 'Rising (18%)'}
              </div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: 10, borderRadius: 10 }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>HISTORICAL EPOCH</div>
              <div style={{ fontWeight: 600, color: 'var(--cream)' }}>{eraInfo.eraTitle}</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: 10, borderRadius: 10 }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>GLOBAL TRADE ROUTE</div>
              <div style={{ fontWeight: 600, color: 'var(--gold-400)' }}>
                {isVictorian ? 'Atlantic & Empire Shipping' : 'Indian Ocean & Suez'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Living Conditions Matrix */}
      <div className="ll-card">
        <h3 className="ll-section-title" style={{ marginBottom: 12 }}>
          <span className="ll-section-icon">📊</span> Regional Living Conditions Matrix
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', color: 'var(--text-dim)' }}>
                <th style={{ padding: '8px 6px' }}>Region</th>
                <th style={{ padding: '8px 6px' }}>Wealth</th>
                <th style={{ padding: '8px 6px' }}>Education</th>
                <th style={{ padding: '8px 6px' }}>Health</th>
                <th style={{ padding: '8px 6px' }}>Safety</th>
                <th style={{ padding: '8px 6px' }}>Quality</th>
              </tr>
            </thead>
            <tbody>
              {regions.map((r, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '8px 6px', fontWeight: 600, color: 'var(--cream)' }}>{r.region}</td>
                  <td style={{ padding: '8px 6px', color: r.wealth }}>●</td>
                  <td style={{ padding: '8px 6px', color: r.education }}>●</td>
                  <td style={{ padding: '8px 6px', color: r.healthcare }}>●</td>
                  <td style={{ padding: '8px 6px', color: r.safety }}>●</td>
                  <td style={{ padding: '8px 6px', color: r.quality }}>●</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

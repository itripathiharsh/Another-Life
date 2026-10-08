'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, type ReactNode } from 'react';
import { useLife } from './LifeContext';

interface PrimaryTab {
  href?: string;
  label: string;
  icon: string;
  isMore?: boolean;
}

const PRIMARY_TABS: PrimaryTab[] = [
  { href: '/', label: 'Home', icon: '⌂' },
  { href: '/people', label: 'People', icon: '👥' },
  { href: '/career', label: 'Career', icon: '💼' },
  { href: '/economy', label: 'Assets', icon: '🪙' },
  { label: 'More', icon: '☰', isMore: true },
];

const SECONDARY_ACTIVITIES = [
  {
    href: '/life',
    icon: '📜',
    title: 'Life Timeline',
    desc: 'Chronological history, chapters & recorded memories',
  },
  {
    href: '/world',
    icon: '🌐',
    title: 'World Gazetteer',
    desc: 'Cartography, regional stability, and historic news',
  },
  {
    href: '/health',
    icon: '💚',
    title: 'Health & Clinic',
    desc: 'Vitality, herbal treatments, physicians & rest',
  },
  {
    href: '/legacy',
    icon: '🏛️',
    title: 'Hall of Ancestors',
    desc: 'Dynasty tree, wills, testament & generational heirs',
  },
  {
    href: '/saves',
    icon: '💾',
    title: 'Saves & Settings',
    desc: 'Manage chronicles, save slots, audio & backup',
  },
];

export function AppShell({ children }: { children: ReactNode }): JSX.Element {
  const pathname = usePathname();
  const router = useRouter();
  const { view } = useLife();
  const [showMoreSheet, setShowMoreSheet] = useState<boolean>(false);

  const year = view?.date.slice(0, 4);
  const isSubpage = pathname !== '/' && pathname !== '/events';
  const pendingCount = view?.pending?.length ?? 0;

  // Determine if current route is part of "More"
  const isMoreRoute =
    pathname.startsWith('/life') ||
    pathname.startsWith('/world') ||
    pathname.startsWith('/health') ||
    pathname.startsWith('/legacy') ||
    pathname.startsWith('/saves');

  return (
    <div className="ll-app-wrapper">
      <div className="ll-page">
        {/* Top Header */}
        <header className="ll-topbar">
          <div className="ll-topbar-left">
            {isSubpage ? (
              <button
                type="button"
                className="ll-icon-btn"
                onClick={() => router.back()}
                aria-label="Go back"
              >
                ←
              </button>
            ) : (
              <button
                type="button"
                className="ll-icon-btn"
                onClick={() => setShowMoreSheet(true)}
                aria-label="Open Chronicle Activities"
              >
                ⚙️
              </button>
            )}
          </div>

          <div className="ll-logo-group">
            <Link href="/" className="ll-logo">
              LegacyLife
            </Link>
            <div className="ll-logo-star">✧ ✦ ✧</div>
          </div>

          <div>
            {view ? (
              <div className="ll-age-pill">
                Age {view.player.age}
                <br />
                {year}
              </div>
            ) : (
              <Link href="/saves" className="ll-age-pill" style={{ textDecoration: 'none' }}>
                New Journey
              </Link>
            )}
          </div>
        </header>

        {/* Main View Area */}
        <main>{children}</main>

        {/* Standard 5-Destination Android Bottom Navigation Dock */}
        <nav className="ll-tabbar" aria-label="Primary Android Navigation">
          {PRIMARY_TABS.map((tab) => {
            if (tab.isMore) {
              const active = isMoreRoute || showMoreSheet;
              return (
                <button
                  key="more"
                  type="button"
                  className={`ll-tab ${active ? 'active' : ''}`}
                  onClick={() => setShowMoreSheet((prev) => !prev)}
                  aria-label="Open More Activities"
                >
                  <span className="ll-tab-icon" aria-hidden="true">
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            }

            const active =
              pathname === tab.href ||
              (tab.href !== '/' && pathname.startsWith(tab.href!));

            return (
              <Link
                key={tab.href}
                href={tab.href!}
                className={`ll-tab ${active ? 'active' : ''}`}
                aria-current={active ? 'page' : undefined}
                onClick={() => setShowMoreSheet(false)}
              >
                <span className="ll-tab-icon" aria-hidden="true">
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
                {tab.href === '/' && pendingCount > 0 && (
                  <span className="ll-tab-badge" aria-label={`${pendingCount} pending decisions`}>
                    {pendingCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Android Activities Hub — Bottom Sheet Drawer */}
        {showMoreSheet && (
          <div
            className="ll-sheet-backdrop"
            onClick={() => setShowMoreSheet(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Chronicle Activities Hub"
          >
            <div
              className="ll-sheet-container"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="ll-sheet-handle" />
              <div className="ll-sheet-head">
                <h3 className="ll-sheet-title">
                  <span>🏛️</span> Chronicle Hub
                </h3>
                <button
                  type="button"
                  className="ll-sheet-close"
                  onClick={() => setShowMoreSheet(false)}
                  aria-label="Close activities menu"
                >
                  ✕
                </button>
              </div>

              <div className="ll-sheet-grid">
                {SECONDARY_ACTIVITIES.map((act) => (
                  <Link
                    key={act.href}
                    href={act.href}
                    className="ll-sheet-tile"
                    onClick={() => setShowMoreSheet(false)}
                  >
                    <span className="ll-sheet-tile-icon">{act.icon}</span>
                    <span className="ll-sheet-tile-title">{act.title}</span>
                    <span className="ll-sheet-tile-desc">{act.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

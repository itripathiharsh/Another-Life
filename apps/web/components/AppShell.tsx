'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { useLife } from './LifeContext';

const TABS = [
  { href: '/', label: 'Home', icon: '⌂' },
  { href: '/life', label: 'Life', icon: '▤' },
  { href: '/world', label: 'World', icon: '⊕' },
  { href: '/people', label: 'People', icon: '👥' },
  { href: '/career', label: 'Career', icon: '💼' },
  { href: '/economy', label: 'Economy', icon: '🪙' },
  { href: '/health', label: 'Health', icon: '💚' },
  { href: '/saves', label: 'More', icon: '⋯' },
];

export function AppShell({ children }: { children: ReactNode }): JSX.Element {
  const pathname = usePathname();
  const router = useRouter();
  const { view } = useLife();
  const year = view?.date.slice(0, 4);

  const isWidePage = pathname.startsWith('/life') || pathname.startsWith('/world');
  const isSubpage = pathname !== '/' && pathname !== '/events';

  return (
    <div className="ll-app-wrapper">
      <div className={`ll-page ${isWidePage ? 'wide' : ''}`}>

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
              <Link href="/saves" className="ll-icon-btn" aria-label="Settings & Game Management">
                ⚙️
              </Link>
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

        {/* Fixed Floating Bottom Navigation Dock */}
        <nav className="ll-tabbar" aria-label="Primary Navigation">
          {TABS.map((tab) => {
            const active =
              pathname === tab.href ||
              (tab.href !== '/' && pathname.startsWith(tab.href));
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={active ? 'll-tab active' : 'll-tab'}
                aria-current={active ? 'page' : undefined}
              >
                <span className="ll-tab-icon" aria-hidden="true">
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

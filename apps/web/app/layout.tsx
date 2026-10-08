import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppShell } from '../components/AppShell';
import { LifeProvider } from '../components/LifeContext';

export const metadata: Metadata = {
  title: 'LegacyLife — Different Eras. Real Choices. Your Legacy.',
  description: 'A choice-driven historical life-simulation game.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'LegacyLife',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#090c0f',
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body>
        <LifeProvider>
          <AppShell>{children}</AppShell>
        </LifeProvider>
      </body>
    </html>
  );
}

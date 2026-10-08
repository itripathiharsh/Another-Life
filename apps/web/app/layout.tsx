import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '../components/AppShell';
import { LifeProvider } from '../components/LifeContext';

export const metadata: Metadata = {
  title: 'LegacyLife — Different Eras. Real Choices. Your Legacy.',
  description: 'A choice-driven historical life-simulation game.',
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

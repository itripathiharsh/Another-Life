import Link from 'next/link';

export default function NotFound(): JSX.Element {
  return (
    <div className="ll-card" style={{ textAlign: 'center', padding: 32 }}>
      <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📜</div>
      <h2>Historical Archive Not Found</h2>
      <p style={{ color: 'var(--text-muted)', margin: '10px 0 20px', lineHeight: 1.6 }}>
        The chronicles for this path are unwritten or lost in the sands of time.
      </p>
      <Link href="/" className="ll-btn-gold" style={{ textDecoration: 'none' }}>
        ← Return to Main Timeline
      </Link>
    </div>
  );
}

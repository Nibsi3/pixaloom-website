'use client';

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-ZA">
      <body style={{ margin: 0, background: '#080808', color: '#f2efe7', fontFamily: 'Arial, sans-serif' }}>
        <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '32px', boxSizing: 'border-box' }}>
          <div style={{ width: 'min(720px, 100%)', borderTop: '1px solid #333', paddingTop: '28px' }}>
            <p style={{ margin: '0 0 28px', color: '#888', fontSize: '11px', letterSpacing: '.18em', textTransform: 'uppercase' }}>Pixaloom · Temporary interruption</p>
            <h1 style={{ margin: 0, fontFamily: 'Georgia, serif', fontSize: 'clamp(56px, 10vw, 128px)', fontWeight: 400, lineHeight: '.9', letterSpacing: '-.06em' }}>Let’s try<br /><em>that again.</em></h1>
            <button type="button" onClick={reset} style={{ marginTop: '44px', border: '1px solid #555', background: 'transparent', color: '#f2efe7', padding: '14px 20px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '.12em', fontSize: '10px' }}>Reload experience</button>
          </div>
        </main>
      </body>
    </html>
  );
}

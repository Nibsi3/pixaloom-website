import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'radial-gradient(900px 630px at 75% 30%, rgba(93,112,255,0.55) 0%, rgba(17,19,24,0.96) 58%, rgba(17,19,24,1) 100%)',
          padding: 64,
          color: '#f0f6fc',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: '#ff5c35',
              border: '1px solid rgba(240,246,252,0.14)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            PX
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, opacity: 0.92 }}>Pixaloom</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1 }}>
            Websites that win business.
          </div>
          <div style={{ fontSize: 26, lineHeight: 1.35, opacity: 0.86, maxWidth: 980 }}>
            Strategy, design and development for ambitious South African businesses.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {['Web design', 'Ecommerce', 'SEO', 'Web apps', 'South Africa'].map((t) => (
              <div
                key={t}
                style={{
                  padding: '10px 14px',
                  borderRadius: 999,
                  background: 'rgba(240,246,252,0.06)',
                  border: '1px solid rgba(240,246,252,0.12)',
                  fontSize: 18,
                  opacity: 0.9,
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 18, opacity: 0.7 }}>pixaloom.co.za</div>
        </div>
      </div>
    ),
    size
  );
}

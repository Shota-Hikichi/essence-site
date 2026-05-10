import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Essence — 大学受験オンラインコーチング';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '80px',
          background: 'linear-gradient(135deg, #FAFAF7 0%, #F5F1EA 100%)',
          position: 'relative',
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '8px',
            background: '#9A071A',
          }}
        />

        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            color: '#9A071A',
            fontWeight: 700,
            marginBottom: 16,
            display: 'flex',
          }}
        >
          ESSENCE
        </div>

        <div
          style={{
            fontSize: 68,
            fontWeight: 700,
            color: '#2D2D3A',
            lineHeight: 1.25,
            marginBottom: 32,
            display: 'flex',
          }}
        >
          大学受験オンラインコーチング
        </div>

        <div
          style={{
            fontSize: 28,
            color: '#4B5563',
            lineHeight: 1.6,
            display: 'flex',
          }}
        >
          志望校と現状の差分を数値化し、最短ルートを設計する。
        </div>

        <div
          style={{
            display: 'flex',
            gap: 20,
            marginTop: 48,
          }}
        >
          <div
            style={{
              padding: '12px 24px',
              background: '#9A071A',
              color: '#fff',
              fontSize: 24,
              fontWeight: 700,
              borderRadius: 8,
              display: 'flex',
            }}
          >
            第一志望合格率 76%
          </div>
          <div
            style={{
              padding: '12px 24px',
              background: '#fff',
              color: '#9A071A',
              fontSize: 24,
              fontWeight: 700,
              borderRadius: 8,
              border: '2px solid #9A071A',
              display: 'flex',
            }}
          >
            累計 743名+ 指導
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 48,
            left: 80,
            fontSize: 20,
            color: '#9CA3AF',
            letterSpacing: 1,
            display: 'flex',
          }}
        >
          essence-coaching.net
        </div>
      </div>
    ),
    { ...size }
  );
}

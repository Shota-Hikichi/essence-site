import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchLabPosts, LAB_CATEGORIES } from '@/lib/microcms';

export const revalidate = 600;

const SITE_URL = 'https://www.essence-coaching.net';

export const metadata: Metadata = {
  title: 'Essence Lab｜大学受験の悩みを解決する知見集',
  description:
    '大学受験コーチングEssenceが運営する、受験生のための知見アーカイブ。勉強法・英語・日本史・国語・志望校選びまで、現役コーチが実体験に基づく145本以上の動画要点を記事化。',
  alternates: { canonical: `${SITE_URL}/lab` },
  openGraph: {
    title: 'Essence Lab｜大学受験の悩みを解決する知見集',
    description:
      '勉強法・英語・日本史・国語・志望校選びまで、現役コーチが実体験に基づく知見を記事化した大学受験の知見アーカイブ。',
    url: `${SITE_URL}/lab`,
    type: 'website',
  },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

function thumbnailUrl(youtubeId?: string): string | null {
  if (!youtubeId) return null;
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}

export default async function LabTopPage() {
  const { contents, totalCount } = await fetchLabPosts({ limit: 30 });

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '80px', background: '#FAFAF7', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        {/* Header */}
        <header className="lab-fade-in" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p className="section-label" style={{ color: 'var(--primary)' }}>Essence Lab</p>
          <h1
            className="lab-hero-title"
            style={{
              fontFamily: "'Noto Serif JP', serif",
              fontSize: '34px',
              fontWeight: 600,
              lineHeight: 1.5,
              marginBottom: '16px',
              color: '#2D2D3A',
            }}
          >
            大学受験の「正しい努力」を、<br className="mobile-br" />知見で支える。
          </h1>
          <p
            className="lab-hero-lead"
            style={{
              fontSize: '15px',
              color: '#6B7280',
              lineHeight: 1.9,
              maxWidth: '720px',
              margin: '0 auto',
            }}
          >
            Essenceの代表・引地が、自身のYouTubeで発信してきた受験コーチングの知見を記事化。
            志望校選び・勉強法・科目別の伸ばし方など、受験生の"今"に効く現場発の知恵を掲載しています。
          </p>
        </header>

        {/* Category nav */}
        <nav
          className="lab-fade-in lab-fade-in-delay-1"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            justifyContent: 'center',
            marginBottom: '48px',
          }}
        >
          <Link
            href="/lab"
            style={{
              padding: '10px 18px',
              fontSize: '13px',
              fontWeight: 600,
              background: 'var(--primary)',
              color: '#fff',
              borderRadius: '999px',
              textDecoration: 'none',
            }}
          >
            すべて
          </Link>
          {LAB_CATEGORIES.map((cat) => (
            <Link
              key={cat.en}
              href={`/lab/category/${cat.en}`}
              style={{
                padding: '10px 18px',
                fontSize: '13px',
                fontWeight: 600,
                background: '#fff',
                color: '#4B5563',
                border: '1px solid #E5E7EB',
                borderRadius: '999px',
                textDecoration: 'none',
              }}
            >
              {cat.jp}
            </Link>
          ))}
        </nav>

        {/* Posts grid */}
        {contents.length === 0 ? (
          <div style={{ padding: '80px 24px', textAlign: 'center', background: '#fff', borderRadius: '12px' }}>
            <p style={{ fontSize: '15px', color: '#6B7280' }}>
              記事を準備中です。まもなく公開予定ですので、今しばらくお待ちください。
            </p>
          </div>
        ) : (
          <>
            <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '20px' }}>
              全 <strong style={{ color: 'var(--primary)' }}>{totalCount}</strong> 件
            </p>
            <div
              className="lab-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '24px',
              }}
            >
              {contents.map((post, idx) => {
                return (
                  <Link
                    key={post.id}
                    href={`/lab/${post.slug}`}
                    className="lab-card lab-fade-in"
                    style={{
                      background: '#fff',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1px solid #E5E7EB',
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      animationDelay: `${Math.min(idx * 0.05, 0.5) + 0.2}s`,
                    }}
                  >
                    <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span
                          style={{
                            padding: '3px 10px',
                            fontSize: '11px',
                            fontWeight: 700,
                            color: 'var(--primary)',
                            border: '1px solid var(--primary)',
                            borderRadius: '3px',
                          }}
                        >
                          {post.category}
                        </span>
                        <span style={{ fontSize: '11px', color: '#9CA3AF', fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.5px' }}>
                          {formatDate(post.publishedDate)}
                        </span>
                      </div>
                      <h2
                        style={{
                          fontFamily: "'Noto Serif JP', serif",
                          fontSize: '16px',
                          fontWeight: 600,
                          lineHeight: 1.5,
                          color: '#2D2D3A',
                          margin: 0,
                        }}
                      >
                        {post.title}
                      </h2>
                      <p
                        style={{
                          fontSize: '12.5px',
                          color: '#6B7280',
                          lineHeight: 1.7,
                          margin: 0,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>

      <style>{`
        .lab-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(154, 7, 26, 0.08);
        }
        @keyframes labFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .lab-fade-in {
          opacity: 0;
          animation: labFadeIn 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
        }
        .lab-fade-in-delay-1 { animation-delay: 0.15s; }
        .lab-card.lab-fade-in:hover {
          transform: translateY(-2px);
        }
        @media (prefers-reduced-motion: reduce) {
          .lab-fade-in { animation: none; opacity: 1; }
        }
        @media (max-width: 767px) {
          .lab-grid {
            grid-template-columns: 1fr !important;
          }
          .lab-hero-title {
            font-size: 24px !important;
            line-height: 1.55 !important;
          }
          .lab-hero-lead {
            font-size: 13.5px !important;
          }
        }
      `}</style>
    </main>
  );
}

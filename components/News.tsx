import Link from 'next/link';
import { fetchNews, type NewsItem } from '@/lib/microcms';

// Revalidate every 5 minutes (ISR)
export const revalidate = 300;

const categoryColor: Record<string, string> = {
  'お知らせ': '#6B7280',
  '合格実績': 'var(--primary)',
  'サービス': '#C9A84C',
  'メディア': '#2D2D3A',
};

// Fallback items shown if microCMS is unreachable or empty
const fallbackItems: NewsItem[] = [
  {
    id: 'fallback-1',
    publishedDate: '2026-04-15T00:00:00.000Z',
    category: 'お知らせ',
    title: '2026年度 夏期集中コーチングの募集を開始しました',
  },
];

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

function getCategoryLabel(c: string): string {
  return c || 'お知らせ';
}

function getCategoryColor(c: string): string {
  return categoryColor[c] || '#6B7280';
}

export default async function News() {
  const items = await fetchNews(10);
  const list = items.length > 0 ? items : fallbackItems;

  return (
    <section
      className="news-section"
      id="news"
      style={{
        padding: '100px 0',
        background: '#fff',
        borderTop: '1px solid #F3F0EA',
      }}
    >
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="animate-on-scroll" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p className="section-label" style={{ color: 'var(--primary)' }}>News</p>
          <h2
            style={{
              fontFamily: "'Noto Serif JP', serif",
              fontSize: '28px',
              fontWeight: 600,
              marginBottom: '12px',
            }}
          >
            Essenceからのお知らせ
          </h2>
          <p style={{ fontSize: '14px', color: '#6B7280' }}>
            サービス・合格実績・メディア掲載などの最新情報
          </p>
        </div>

        <ul className="news-list animate-on-scroll" style={{ borderTop: '1px solid #E5E7EB' }}>
          {list.map((item) => {
            const cat = getCategoryLabel(item.category);
            const color = getCategoryColor(cat);
            const isFallback = item.id.startsWith('fallback-');
            const content = (
              <>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#2D2D3A',
                    letterSpacing: '1px',
                  }}
                >
                  {formatDate(item.publishedDate)}
                </span>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '4px 0',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                    textAlign: 'center',
                    color,
                    border: `1px solid ${color}`,
                    borderRadius: '2px',
                    width: '100px',
                  }}
                >
                  {cat}
                </span>
                <span
                  className="news-title"
                  style={{
                    fontSize: '14.5px',
                    color: '#2D2D3A',
                    lineHeight: 1.7,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span style={{ flex: 1 }}>{item.title}</span>
                  {!isFallback && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      style={{ flexShrink: 0, color: '#9CA3AF' }}
                    >
                      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  )}
                </span>
              </>
            );

            const baseStyle = {
              display: 'grid',
              gridTemplateColumns: '110px 100px 1fr',
              gap: '24px',
              alignItems: 'center',
              padding: '22px 8px',
              borderBottom: '1px solid #E5E7EB',
              transition: 'background 0.2s ease',
            } as const;

            return (
              <li key={item.id} style={{ listStyle: 'none' }}>
                {isFallback ? (
                  <div className="news-item" style={baseStyle}>{content}</div>
                ) : (
                  <Link
                    href={`/news/${item.id}`}
                    style={{ ...baseStyle, color: 'inherit', textDecoration: 'none' }}
                    className="news-item news-link"
                  >
                    {content}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <style>{`
        .news-link:hover {
          background: #FAFAF7;
        }
        .news-link:hover .news-title {
          color: var(--primary) !important;
        }
        .news-link:hover svg {
          color: var(--primary) !important;
          transform: translateX(2px);
          transition: transform 0.2s ease, color 0.2s ease;
        }
        @media (max-width: 1023px) {
          .news-section {
            padding: 70px 0 !important;
          }
          .news-item {
            grid-template-columns: 1fr !important;
            gap: 6px !important;
            padding: 18px 4px !important;
          }
          .news-item > span:nth-child(1) {
            font-size: 13px !important;
          }
          .news-item > span:nth-child(2) {
            width: auto !important;
            max-width: 90px;
            font-size: 10px !important;
            padding: 2px 8px !important;
          }
          .news-item > span:nth-child(3) {
            font-size: 14px !important;
          }
        }
      `}</style>
    </section>
  );
}

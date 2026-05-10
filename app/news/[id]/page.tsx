import { notFound } from 'next/navigation';
import { fetchNewsById, fetchAllNewsIds } from '@/lib/microcms';

export const revalidate = 300;

export async function generateStaticParams() {
  const ids = await fetchAllNewsIds();
  return ids.map((id) => ({ id }));
}

const categoryColor: Record<string, string> = {
  'お知らせ': '#6B7280',
  '合格実績': 'var(--primary)',
  'サービス': '#C9A84C',
  'メディア': '#2D2D3A',
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await fetchNewsById(id);
  if (!item) return { title: 'お知らせ' };
  const plainBody = item.body ? item.body.replace(/<[^>]*>/g, '').slice(0, 140) : item.title;
  const url = `https://www.essence-coaching.net/news/${id}`;
  return {
    title: item.title,
    description: plainBody,
    alternates: { canonical: url },
    openGraph: {
      title: item.title,
      description: plainBody,
      url,
      type: 'article',
      publishedTime: item.publishedDate,
      siteName: 'Essence',
      locale: 'ja_JP',
    },
    twitter: {
      card: 'summary_large_image',
      title: item.title,
      description: plainBody,
    },
  };
}

export default async function NewsDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await fetchNewsById(id);
  if (!item) notFound();

  const color = categoryColor[item.category] || '#6B7280';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: item.title,
    datePublished: item.publishedDate,
    dateModified: item.publishedDate,
    articleSection: item.category,
    author: {
      '@type': 'Organization',
      name: 'Essence',
      url: 'https://www.essence-coaching.net',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Essence',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.essence-coaching.net/icon.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.essence-coaching.net/news/${id}`,
    },
  };

  return (
    <article style={{ padding: '140px 0 100px', background: '#fff', minHeight: '70vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="container" style={{ maxWidth: '760px' }}>
        <div style={{ marginBottom: '32px' }}>
          <a
            href="/#news"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              color: '#6B7280',
              letterSpacing: '1px',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            お知らせ一覧に戻る
          </a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
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
              padding: '4px 12px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '1.5px',
              color,
              border: `1px solid ${color}`,
              borderRadius: '2px',
            }}
          >
            {item.category}
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Noto Serif JP', serif",
            fontSize: '28px',
            fontWeight: 600,
            lineHeight: 1.6,
            marginBottom: '40px',
            color: '#2D2D3A',
            paddingBottom: '24px',
            borderBottom: '1px solid #E5E7EB',
          }}
        >
          {item.title}
        </h1>

        {item.body ? (
          <div
            className="news-body"
            style={{
              fontSize: '15px',
              lineHeight: 2.0,
              color: '#2D2D3A',
            }}
            dangerouslySetInnerHTML={{ __html: item.body }}
          />
        ) : (
          <p style={{ fontSize: '14px', color: '#6B7280' }}>
            詳細な内容は準備中です。
          </p>
        )}

        <div style={{ marginTop: '60px', paddingTop: '32px', borderTop: '1px solid #E5E7EB', textAlign: 'center' }}>
          <a
            href="/#news"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              color: 'var(--primary)',
              letterSpacing: '1px',
              fontWeight: 600,
            }}
          >
            ← お知らせ一覧に戻る
          </a>
        </div>
      </div>

      <style>{`
        .news-body h1, .news-body h2, .news-body h3 {
          font-family: 'Noto Serif JP', serif;
          font-weight: 600;
          margin: 32px 0 16px;
          line-height: 1.5;
        }
        .news-body h2 { font-size: 20px; }
        .news-body h3 { font-size: 17px; }
        .news-body p { margin: 0 0 20px; }
        .news-body a { color: var(--primary); text-decoration: underline; }
        .news-body ul, .news-body ol { margin: 0 0 20px 1.5em; }
        .news-body li { margin-bottom: 6px; }
        .news-body img { max-width: 100%; height: auto; margin: 20px 0; border-radius: 6px; }
        .news-body blockquote {
          border-left: 3px solid var(--primary);
          padding: 8px 16px;
          margin: 20px 0;
          color: #4B5563;
          background: #FAFAF7;
        }
        .news-body code {
          background: #F3F0EA;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 13px;
        }
      `}</style>
    </article>
  );
}

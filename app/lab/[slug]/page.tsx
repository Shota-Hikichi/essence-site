import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  fetchLabPostBySlug,
  fetchAllLabSlugs,
  fetchRelatedLabPosts,
  LAB_CATEGORIES,
} from '@/lib/microcms';

export const revalidate = 3600;

const SITE_URL = 'https://www.essence-coaching.net';

export async function generateStaticParams() {
  const slugs = await fetchAllLabSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchLabPostBySlug(slug);
  if (!post) {
    return { title: '記事が見つかりません' };
  }
  const title = post.seoTitle || `${post.title} | Essence Lab`;
  const description =
    post.seoDescription ||
    post.excerpt ||
    `${post.title} — 大学受験コーチング Essence が発信する受験生のための知見記事。`;
  const url = `${SITE_URL}/lab/${post.slug}`;
  const thumb = post.youtubeId
    ? `https://img.youtube.com/vi/${post.youtubeId}/maxresdefault.jpg`
    : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: post.publishedDate,
      siteName: 'Essence',
      locale: 'ja_JP',
      images: thumb ? [{ url: thumb, width: 1280, height: 720 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: thumb ? [thumb] : undefined,
    },
    keywords: post.seoKeywords
      ? post.seoKeywords.split(/[,、]/).map((s) => s.trim()).filter(Boolean)
      : undefined,
  };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

function categoryEn(jp: string): string {
  return LAB_CATEGORIES.find((c) => c.jp === jp)?.en || 'general';
}

export default async function LabDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchLabPostBySlug(slug);
  if (!post) notFound();

  const related = await fetchRelatedLabPosts(post.id, post.category, 3);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    datePublished: post.publishedDate,
    dateModified: post.updatedAt || post.publishedDate,
    image: post.youtubeId
      ? `https://img.youtube.com/vi/${post.youtubeId}/maxresdefault.jpg`
      : undefined,
    author: {
      '@type': 'Person',
      name: '引地 祥太',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Essence',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.svg` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/lab/${post.slug}`,
    },
    articleSection: post.category,
    keywords: post.seoKeywords,
  };

  return (
    <main style={{ background: '#fff', paddingTop: '100px', paddingBottom: '80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="container" style={{ maxWidth: '760px' }}>
        {/* Breadcrumb */}
        <nav
          aria-label="breadcrumb"
          style={{ marginBottom: '24px', fontSize: '12px', color: '#9CA3AF' }}
        >
          <Link href="/" style={{ color: '#6B7280' }}>HOME</Link>
          <span style={{ margin: '0 6px' }}>›</span>
          <Link href="/lab" style={{ color: '#6B7280' }}>Essence Lab</Link>
          <span style={{ margin: '0 6px' }}>›</span>
          <Link href={`/lab/category/${categoryEn(post.category)}`} style={{ color: '#6B7280' }}>
            {post.category}
          </Link>
        </nav>

        {/* Header */}
        <header style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '14px' }}>
            <span
              style={{
                padding: '4px 12px',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--primary)',
                border: '1px solid var(--primary)',
                borderRadius: '3px',
              }}
            >
              {post.category}
            </span>
            <span style={{ fontSize: '12px', color: '#9CA3AF', fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.5px' }}>
              {formatDate(post.publishedDate)}
            </span>
          </div>
          <h1
            style={{
              fontFamily: "'Noto Serif JP', serif",
              fontSize: '28px',
              fontWeight: 600,
              lineHeight: 1.5,
              color: '#2D2D3A',
              marginBottom: '16px',
            }}
          >
            {post.title}
          </h1>
          <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.9 }}>
            {post.excerpt}
          </p>
        </header>

        {/* Body */}
        <div
          className="lab-body"
          style={{ fontSize: '15.5px', lineHeight: 2.0, color: '#2D2D3A' }}
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        {/* YouTube embed (placed after article body) */}
        {post.youtubeId && (
          <section style={{ marginTop: '40px' }}>
            <h2
              style={{
                fontFamily: "'Noto Serif JP', serif",
                fontSize: '18px',
                fontWeight: 600,
                marginBottom: '16px',
                paddingBottom: '10px',
                borderBottom: '2px solid #F3F0EA',
                color: '#2D2D3A',
              }}
            >
              動画でも詳しく話しています
            </h2>
            <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.9, marginBottom: '16px' }}>
              この記事のベースになった動画はこちらです。ニュアンスやリアルな語り口を知りたい方はぜひ視聴してみてください。
            </p>
            <div
              style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '56.25%',
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#000',
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${post.youtubeId}`}
                title={post.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0,
                }}
              />
            </div>
          </section>
        )}

        {/* Affiliate section */}
        {post.affiliateHtml && (
          <section
            style={{
              marginTop: '48px',
              padding: '28px',
              background: '#FAFAF7',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
            }}
          >
            <h2
              style={{
                fontFamily: "'Noto Serif JP', serif",
                fontSize: '17px',
                fontWeight: 600,
                marginBottom: '16px',
                color: '#2D2D3A',
              }}
            >
              関連参考書・おすすめサービス
            </h2>
            <div
              className="lab-affiliate"
              dangerouslySetInnerHTML={{ __html: post.affiliateHtml }}
            />
            <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '14px', lineHeight: 1.8 }}>
              ※本セクションには一部プロモーションリンクを含みます。リンク先での購入が、当サイト運営の一助となります。
            </p>
          </section>
        )}

        {/* CTA to coaching */}
        <section
          style={{
            marginTop: '48px',
            padding: '36px 28px',
            background: 'linear-gradient(135deg, #9A071A 0%, #7A0515 100%)',
            borderRadius: '12px',
            color: '#fff',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', marginBottom: '10px', opacity: 0.8 }}>
            ESSENCE COACHING
          </p>
          <h2
            style={{
              fontFamily: "'Noto Serif JP', serif",
              fontSize: '22px',
              fontWeight: 600,
              lineHeight: 1.6,
              marginBottom: '16px',
            }}
          >
            この記事の"実践"を、<br className="mobile-br" />あなたの受験に落とし込む。
          </h2>
          <p style={{ fontSize: '14px', lineHeight: 1.9, marginBottom: '24px', opacity: 0.92 }}>
            Essenceでは、志望校と現状の差分を数値化し、<br className="mobile-br" />
            残された時間から逆算して毎日のタスクまで設計する<br className="mobile-br" />
            大学受験オンラインコーチングを提供しています。
          </p>
          <a
            href="https://qyzxk47dyy.jp.larksuite.com/scheduler/176525bd10e971ba"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              background: '#fff',
              color: '#9A071A',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            15分の無料相談を予約する
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </a>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section style={{ marginTop: '64px' }}>
            <h2
              style={{
                fontFamily: "'Noto Serif JP', serif",
                fontSize: '18px',
                fontWeight: 600,
                marginBottom: '24px',
                paddingBottom: '12px',
                borderBottom: '1px solid #E5E7EB',
              }}
            >
              関連記事
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/lab/${r.slug}`}
                  style={{
                    padding: '16px',
                    background: '#FAFAF7',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>
                    {r.category}
                  </div>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, lineHeight: 1.6, color: '#2D2D3A' }}>
                    {r.title}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back */}
        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <Link
            href="/lab"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              color: 'var(--primary)',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            ← Essence Lab トップへ
          </Link>
        </div>
      </article>

      <style>{`
        .lab-body h2 { font-family: 'Noto Serif JP', serif; font-size: 20px; font-weight: 600; margin: 36px 0 16px; padding-bottom: 10px; border-bottom: 2px solid #F3F0EA; color: #2D2D3A; }
        .lab-body h3 { font-family: 'Noto Serif JP', serif; font-size: 17px; font-weight: 600; margin: 28px 0 12px; color: #2D2D3A; }
        .lab-body p { margin: 0 0 18px; }
        .lab-body a { color: var(--primary); text-decoration: underline; }
        .lab-body ul, .lab-body ol { margin: 0 0 18px 1.5em; }
        .lab-body li { margin-bottom: 6px; }
        .lab-body img { max-width: 100%; height: auto; margin: 18px 0; border-radius: 6px; }
        .lab-body blockquote { border-left: 3px solid var(--primary); padding: 10px 18px; margin: 18px 0; color: #4B5563; background: #FAFAF7; }
        .lab-body strong { color: #2D2D3A; font-weight: 700; }
        .lab-affiliate a { color: var(--primary); text-decoration: underline; font-weight: 600; }
        .lab-affiliate ul { margin: 0; padding-left: 1.4em; }
        .lab-affiliate li { margin-bottom: 8px; line-height: 1.8; }
      `}</style>
    </main>
  );
}

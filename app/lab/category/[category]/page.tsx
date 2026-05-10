import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchLabPosts, LAB_CATEGORIES } from '@/lib/microcms';

export const revalidate = 600;
const SITE_URL = 'https://www.essence-coaching.net';

export async function generateStaticParams() {
  return LAB_CATEGORIES.map((c) => ({ category: c.en }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = LAB_CATEGORIES.find((c) => c.en === category);
  if (!cat) return { title: 'カテゴリが見つかりません' };
  const title = `${cat.jp}の記事一覧 | Essence Lab`;
  const description = `大学受験コーチングEssenceによる「${cat.jp}」カテゴリの知見記事一覧。受験生のお悩みを解決する実践的な情報を掲載しています。`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/lab/category/${cat.en}` },
    openGraph: { title, description, url: `${SITE_URL}/lab/category/${cat.en}`, type: 'website' },
  };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export default async function LabCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = LAB_CATEGORIES.find((c) => c.en === category);
  if (!cat) notFound();

  const { contents, totalCount } = await fetchLabPosts({ limit: 50, category: cat.jp });

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '80px', background: '#FAFAF7', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <nav style={{ marginBottom: '24px', fontSize: '12px', color: '#9CA3AF' }}>
          <Link href="/" style={{ color: '#6B7280' }}>HOME</Link>
          <span style={{ margin: '0 6px' }}>›</span>
          <Link href="/lab" style={{ color: '#6B7280' }}>Essence Lab</Link>
          <span style={{ margin: '0 6px' }}>›</span>
          <span>{cat.jp}</span>
        </nav>

        <header style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p className="section-label" style={{ color: 'var(--primary)' }}>Category</p>
          <h1 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '28px', fontWeight: 600, marginBottom: '10px' }}>
            「{cat.jp}」の記事一覧
          </h1>
          <p style={{ fontSize: '13px', color: '#6B7280' }}>
            {totalCount} 件の記事
          </p>
        </header>

        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '40px' }}>
          <Link href="/lab" style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 600, background: '#fff', color: '#4B5563', border: '1px solid #E5E7EB', borderRadius: '999px', textDecoration: 'none' }}>
            すべて
          </Link>
          {LAB_CATEGORIES.map((c) => (
            <Link
              key={c.en}
              href={`/lab/category/${c.en}`}
              style={{
                padding: '8px 16px',
                fontSize: '12px',
                fontWeight: 600,
                background: c.en === cat.en ? 'var(--primary)' : '#fff',
                color: c.en === cat.en ? '#fff' : '#4B5563',
                border: `1px solid ${c.en === cat.en ? 'var(--primary)' : '#E5E7EB'}`,
                borderRadius: '999px',
                textDecoration: 'none',
              }}
            >
              {c.jp}
            </Link>
          ))}
        </nav>

        {contents.length === 0 ? (
          <div style={{ padding: '60px 24px', textAlign: 'center', background: '#fff', borderRadius: '12px' }}>
            <p style={{ fontSize: '15px', color: '#6B7280' }}>このカテゴリの記事はまだありません。</p>
          </div>
        ) : (
          <div className="lab-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {contents.map((post) => {
              return (
                <Link
                  key={post.id}
                  href={`/lab/${post.slug}`}
                  className="lab-card"
                  style={{
                    background: '#fff',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid #E5E7EB',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ padding: '20px', flex: 1 }}>
                    <div style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '8px', fontFamily: "'Cormorant Garamond', serif" }}>
                      {formatDate(post.publishedDate)}
                    </div>
                    <h2 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '16px', fontWeight: 600, lineHeight: 1.5, color: '#2D2D3A', marginBottom: '8px' }}>
                      {post.title}
                    </h2>
                    <p style={{ fontSize: '12.5px', color: '#6B7280', lineHeight: 1.7, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        .lab-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(154, 7, 26, 0.08); }
        @media (max-width: 767px) { .lab-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  );
}

import { createClient } from 'microcms-js-sdk';

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

if (!serviceDomain || !apiKey) {
  // Don't throw at import time — let callers handle missing config gracefully.
  console.warn('[microcms] MICROCMS_SERVICE_DOMAIN or MICROCMS_API_KEY is missing');
}

export const microcmsClient =
  serviceDomain && apiKey
    ? createClient({ serviceDomain, apiKey })
    : null;

// Separate client for Essence Lab (hosted on its own microCMS service)
const labServiceDomain = process.env.MICROCMS_LAB_SERVICE_DOMAIN || serviceDomain;
const labApiKey = process.env.MICROCMS_LAB_API_KEY || apiKey;

export const microcmsLabClient =
  labServiceDomain && labApiKey
    ? createClient({ serviceDomain: labServiceDomain, apiKey: labApiKey })
    : microcmsClient;

export type NewsCategory = 'お知らせ' | '合格実績' | 'サービス' | 'メディア';

export interface NewsItem {
  id: string;
  title: string;
  category: NewsCategory | string;
  publishedDate: string; // ISO8601
  body?: string;
}

export async function fetchNews(limit = 10): Promise<NewsItem[]> {
  if (!microcmsClient) return [];
  try {
    const res = await microcmsClient.get<{ contents: NewsItem[] }>({
      endpoint: 'news',
      queries: { limit, orders: '-publishedDate' },
    });
    return res.contents ?? [];
  } catch (err) {
    console.error('[microcms] fetchNews failed', err);
    return [];
  }
}

export async function fetchNewsById(id: string): Promise<NewsItem | null> {
  if (!microcmsClient) return null;
  try {
    const res = await microcmsClient.get<NewsItem>({
      endpoint: 'news',
      contentId: id,
    });
    return res ?? null;
  } catch (err) {
    console.error('[microcms] fetchNewsById failed', err);
    return null;
  }
}

export async function fetchAllNewsIds(): Promise<string[]> {
  if (!microcmsClient) return [];
  try {
    const res = await microcmsClient.get<{ contents: { id: string }[] }>({
      endpoint: 'news',
      queries: { limit: 100, fields: 'id' },
    });
    return (res.contents ?? []).map((c) => c.id);
  } catch (err) {
    console.error('[microcms] fetchAllNewsIds failed', err);
    return [];
  }
}

// ===== Essence Lab =====

export interface LabPostRaw {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  // microCMS returns category as array (multi-select) or string (single-select)
  category: string | string[];
  subcategory?: string;
  youtubeId?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  affiliateHtml?: string;
  publishedDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LabPost extends Omit<LabPostRaw, 'category'> {
  category: string; // normalized to first value if array
}

function normalizeLab(raw: LabPostRaw): LabPost {
  const cat = Array.isArray(raw.category) ? raw.category[0] || '一般' : raw.category || '一般';
  return { ...raw, category: cat };
}

export const LAB_CATEGORIES = [
  { jp: '一般', en: 'general' },
  { jp: '英語', en: 'english' },
  { jp: '勉強法', en: 'study-method' },
  { jp: '科目', en: 'subjects' },
  { jp: '国語', en: 'japanese' },
  { jp: '受験', en: 'exam' },
  { jp: '日本史', en: 'japanese-history' },
  { jp: '計画', en: 'planning' },
  { jp: '社会', en: 'social-studies' },
  { jp: '社会科', en: 'social-science' },
  { jp: '英語・国語・日本史', en: 'multi-subject' },
] as const;

export async function fetchLabPosts({
  limit = 20,
  offset = 0,
  category,
}: {
  limit?: number;
  offset?: number;
  category?: string;
} = {}): Promise<{ contents: LabPost[]; totalCount: number }> {
  if (!microcmsLabClient) return { contents: [], totalCount: 0 };
  try {
    const queries: Record<string, string | number> = {
      limit,
      offset,
      orders: '-publishedDate',
    };
    if (category) {
      // category might be multi-select array; use contains
      queries.filters = `category[contains]${category}`;
    }
    const res = await microcmsLabClient.get<{ contents: LabPostRaw[]; totalCount: number }>({
      endpoint: 'labs',
      queries,
    });
    return {
      contents: (res.contents ?? []).map(normalizeLab),
      totalCount: res.totalCount ?? 0,
    };
  } catch (err) {
    console.error('[microcms] fetchLabPosts failed', err);
    return { contents: [], totalCount: 0 };
  }
}

export async function fetchLabPostBySlug(slug: string): Promise<LabPost | null> {
  if (!microcmsLabClient) return null;
  try {
    const res = await microcmsLabClient.get<{ contents: LabPostRaw[] }>({
      endpoint: 'labs',
      queries: { filters: `slug[equals]${slug}`, limit: 1 },
    });
    const first = res.contents?.[0];
    return first ? normalizeLab(first) : null;
  } catch (err) {
    console.error('[microcms] fetchLabPostBySlug failed', err);
    return null;
  }
}

export async function fetchAllLabSlugs(): Promise<string[]> {
  if (!microcmsLabClient) return [];
  try {
    // microCMS limits to 100 per request; paginate
    const all: string[] = [];
    let offset = 0;
    const pageSize = 100;
    while (true) {
      const res = await microcmsLabClient.get<{ contents: { slug: string }[]; totalCount: number }>({
        endpoint: 'labs',
        queries: { limit: pageSize, offset, fields: 'slug' },
      });
      const slugs = (res.contents ?? []).map((c) => c.slug).filter(Boolean);
      all.push(...slugs);
      if (slugs.length < pageSize) break;
      offset += pageSize;
      if (offset > 2000) break; // safety
    }
    return all;
  } catch (err) {
    console.error('[microcms] fetchAllLabSlugs failed', err);
    return [];
  }
}

export async function fetchRelatedLabPosts(
  currentId: string,
  category: string,
  limit = 3
): Promise<LabPost[]> {
  if (!microcmsLabClient) return [];
  try {
    const res = await microcmsLabClient.get<{ contents: LabPostRaw[] }>({
      endpoint: 'labs',
      queries: {
        filters: `category[contains]${category}[and]id[not_equals]${currentId}`,
        limit,
        orders: '-publishedDate',
      },
    });
    return (res.contents ?? []).map(normalizeLab);
  } catch (err) {
    console.error('[microcms] fetchRelatedLabPosts failed', err);
    return [];
  }
}

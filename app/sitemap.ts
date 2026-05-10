import type { MetadataRoute } from 'next';
import { fetchNews, fetchLabPosts, LAB_CATEGORIES } from '@/lib/microcms';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.essence-coaching.net';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/lab`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/plan/minimum`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/plan/standard`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/plan/fullcommit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/checkout`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/tokushoho`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const labCategoryRoutes: MetadataRoute.Sitemap = LAB_CATEGORIES.map((c) => ({
    url: `${baseUrl}/lab/category/${c.en}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  let newsRoutes: MetadataRoute.Sitemap = [];
  try {
    const items = await fetchNews(100);
    newsRoutes = items.map((n) => ({
      url: `${baseUrl}/news/${n.id}`,
      lastModified: n.publishedDate ? new Date(n.publishedDate) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch {
    newsRoutes = [];
  }

  let labRoutes: MetadataRoute.Sitemap = [];
  try {
    // Paginate to collect all (microCMS caps at 100 per request)
    const allContents: Awaited<ReturnType<typeof fetchLabPosts>>['contents'] = [];
    let offset = 0;
    while (true) {
      const { contents } = await fetchLabPosts({ limit: 100, offset });
      allContents.push(...contents);
      if (contents.length < 100) break;
      offset += 100;
      if (offset > 2000) break;
    }
    labRoutes = allContents.map((p) => ({
      url: `${baseUrl}/lab/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(p.publishedDate),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch {
    labRoutes = [];
  }

  return [...staticRoutes, ...labCategoryRoutes, ...newsRoutes, ...labRoutes];
}

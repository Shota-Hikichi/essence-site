import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/', '/test-bg'],
    },
    sitemap: 'https://www.essence-coaching.net/sitemap.xml',
  };
}

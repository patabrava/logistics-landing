import type { MetadataRoute } from 'next';

import { generateSitemapUrls } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return generateSitemapUrls().map((entry) => ({
    url: entry.url,
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}

import type { MetadataRoute } from 'next';
import { getAllPosts } from '../lib/blog';

const siteUrl = 'https://orangeflow.in';

/**
 * Public pages that should be discoverable by search engines.
 * Authenticated dashboards and API routes are intentionally excluded.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/features`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/pricing`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/for-brands`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/about`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/contact`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${siteUrl}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/terms`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/refund-policy`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  return [
    ...pages,
    ...getAllPosts().map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}

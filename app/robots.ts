import type { MetadataRoute } from 'next';

const siteUrl = 'https://orangeflow.in';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/brand/',
        '/creator/',
        '/login',
        '/signup',
        '/forgot-password',
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

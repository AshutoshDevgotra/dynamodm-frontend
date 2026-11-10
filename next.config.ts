import type { NextConfig } from 'next';

const resolveApiBaseUrl = () => {
  const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/+$/, '');
  const productionApiUrl = 'https://api.v1.orangeflow.in/api';
  // The current local backend instance runs on 5003. Keep this fallback in
  // sync with the development server so subscription routes are proxied to
  // the API that contains the latest payment handlers.
  const localApiUrl = 'http://localhost:5003/api';
  const withApiPath = (url: string) => url.endsWith('/api') ? url : `${url}/api`;

  if (!configuredApiUrl) {
    return process.env.NODE_ENV === 'production'
      ? productionApiUrl
      : localApiUrl;
  }

  const isLocalDevelopmentUrl = /^(https?:\/\/)?(localhost|127\.0\.0\.1|0\.0\.0\.0)(?::\d+)?(?:\/|$)/i.test(configuredApiUrl);

  return isLocalDevelopmentUrl
    ? (process.env.NODE_ENV === 'production'
      ? productionApiUrl
      : localApiUrl)
    : withApiPath(configuredApiUrl);
};

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'graph.facebook.com' },
      { protocol: 'https', hostname: 'cdninstagram.com' },
      { protocol: 'https', hostname: '*.cloudflare.com' },
      { protocol: 'https', hostname: '*.r2.dev' },
    ],
  },
  async rewrites() {
    const apiBaseUrl = resolveApiBaseUrl();

    return [
      {
        source: '/api/:path*',
        destination: `${apiBaseUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;

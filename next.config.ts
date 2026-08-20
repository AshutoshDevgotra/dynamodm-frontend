import type { NextConfig } from 'next';

const resolveApiBaseUrl = () => {
  const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/+$/, '');

  if (!configuredApiUrl) {
    return process.env.NODE_ENV === 'production'
      ? 'https://dynamodm-backend.onrender.com/api'
      : 'http://localhost:5000/api';
  }

  const isFrontendOrigin = /^(https?:\/\/)?(localhost|127\.0\.0\.1|0\.0\.0\.0)(?::3000)?(?:\/|$)/i.test(configuredApiUrl);

  return isFrontendOrigin
    ? (process.env.NODE_ENV === 'production'
      ? 'https://dynamodm-backend.onrender.com/api'
      : 'http://localhost:5000/api')
    : configuredApiUrl;
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

import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: {
    default: 'DynamoDM — Instagram Automation for Creators',
    template: '%s | DynamoDM',
  },
  description:
    'Automate Instagram DMs, capture leads, and grow your business. DynamoDM turns every comment into a conversation — automatically.',
  keywords: ['instagram automation', 'instagram dm', 'creator tools', 'lead capture', 'instagram marketing'],
  authors: [{ name: 'DynamoDM' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://dynamodm.io',
    siteName: 'DynamoDM',
    title: 'DynamoDM — Instagram Automation for Creators',
    description: 'Automate Instagram DMs, capture leads, and grow your business.',
  },
  twitter: { card: 'summary_large_image', title: 'DynamoDM', description: 'Instagram Automation for Creators' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

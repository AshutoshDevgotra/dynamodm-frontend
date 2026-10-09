import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: {
    default: 'DynamoDM — Instagram automation for creators',
    template: '%s | DynamoDM',
  },
  description:
    'Automate Instagram DMs, capture leads, and sell from your storefront. DynamoDM turns every comment into a conversation.',
  keywords: ['instagram automation', 'instagram dm', 'creator tools', 'lead capture', 'instagram marketing'],
  authors: [{ name: 'DynamoDM' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://dynamodm.io',
    siteName: 'DynamoDM',
    title: 'DynamoDM — Instagram automation for creators',
    description: 'Automate Instagram DMs, capture leads, and grow your business.',
  },
  twitter: { card: 'summary_large_image', title: 'DynamoDM', description: 'Instagram automation for creators' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body suppressHydrationWarning className="font-sans antialiased bg-[var(--bg-base)] text-[var(--text-primary)]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

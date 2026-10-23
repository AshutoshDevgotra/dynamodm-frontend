import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: {
    default: 'OrangeFlow.in — AI conversations for creators and businesses',
    template: '%s | OrangeFlow.in',
  },
  description:
    'Orange Flow helps creators automate Instagram conversations and helps businesses turn comments and DMs into helpful, context-aware customer journeys.',
  keywords: ['instagram automation', 'instagram dm', 'creator tools', 'lead capture', 'instagram marketing'],
  authors: [{ name: 'OrangeFlow.in' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://orangeflow.in',
    siteName: 'OrangeFlow.in',
    title: 'OrangeFlow.in — AI conversations for creators and businesses',
    description: 'Automate Instagram conversations, answer customers with brand context, and capture more leads.',
  },
  twitter: { card: 'summary_large_image', title: 'OrangeFlow.in', description: 'AI-powered Instagram conversations for creators and businesses' },
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

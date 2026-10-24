import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const logoFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-logo',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#09090b',
};

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
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning className="overflow-x-hidden">
      <body
        suppressHydrationWarning
        className={`${logoFont.variable} font-sans antialiased bg-[var(--bg-base)] text-[var(--text-primary)] min-h-screen w-full overflow-x-hidden selection:bg-[var(--brand-from)] selection:text-white`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from 'next';
import { Sora, Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

/* ── Display / heading font — Sora ExtraBold ── */
const soraFont = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

/* ── Body font — Inter ── */
const interFont = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

/* ── Serif italic accent — Playfair Display ── */
const playfairFont = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffffff',
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`overflow-x-hidden ${soraFont.variable} ${interFont.variable} ${playfairFont.variable}`}
    >
      <body
        suppressHydrationWarning
        className="font-sans antialiased bg-white text-[var(--text-primary)] min-h-screen w-full overflow-x-hidden"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

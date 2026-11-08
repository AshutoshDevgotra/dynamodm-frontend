import type { Metadata, Viewport } from 'next';
import { Sora, Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import MetaPixel from '../components/MetaPixel';
import WhatsAppButton from './components/WhatsAppButton';

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
  metadataBase: new URL('https://orangeflow.in'),
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
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'OrangeFlow.in social preview' }],
    title: 'OrangeFlow.in — AI conversations for creators and businesses',
    description: 'Automate Instagram conversations, answer customers with brand context, and capture more leads.',
  },
  twitter: { card: 'summary_large_image', title: 'OrangeFlow.in', description: 'AI-powered Instagram conversations for creators and businesses', images: ['/og-default.png'] },
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
        <Providers>
          {children}
          <MetaPixel />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}

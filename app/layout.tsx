import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
});

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
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning className={`${inter.variable} ${instrument.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased bg-[var(--bg-base)] text-[var(--text-primary)]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

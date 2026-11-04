import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'For Brands',
  description: 'Turn Instagram conversations into qualified leads with AI replies, trigger-word campaigns, and customer context built for brands.',
  alternates: { canonical: 'https://orangeflow.in/for-brands' },
  openGraph: { type: 'website', url: 'https://orangeflow.in/for-brands' },
};

export default function ForBrandsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

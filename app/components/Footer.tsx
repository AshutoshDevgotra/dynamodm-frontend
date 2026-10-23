import Link from 'next/link';
import { Globe, Mail, Share2 } from 'lucide-react';
import Logo from './Logo';

const columns = {
  Product: [
    { label: 'AutoDM', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'For Brands', href: '/for-brands' },
    { label: 'Storefront', href: '/creator/storefront' },
  ],
  Company: [
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Refund Policy', href: '/refund-policy' },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/6 bg-white">
      <div className="container py-20 sm:py-24">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--text-secondary)]">
              Orange Flow helps creators monetize attention and helps businesses turn customer conversations into qualified leads with AI.
            </p>
            <div className="mt-5 flex gap-2">
              {[
                { icon: Share2, href: '#', label: 'Social' },
                { icon: Globe, href: '#', label: 'Website' },
                { icon: Mail, href: 'mailto:hello@orangeflow.in', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/8 text-zinc-500 hover:border-black/15 hover:text-zinc-900"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(columns).map(([title, items]) => (
            <div key={title}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400">{title}</h4>
              <ul className="flex list-none flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-zinc-600 hover:text-zinc-900">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-black/6 pt-8 text-[13px] text-zinc-400 sm:flex-row sm:items-center">
          <p>© {year} OrangeFlow.in. All rights reserved.</p>
          <p>Made in India</p>
        </div>
      </div>
    </footer>
  );
}

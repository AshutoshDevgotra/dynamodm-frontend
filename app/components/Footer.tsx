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
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/6 bg-white">
      <div className="container py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--text-secondary)]">
              The creator toolkit to automate Instagram DMs, capture leads, and sell from one storefront.
            </p>
            <div className="mt-5 flex gap-2">
              {[
                { icon: Share2, href: '#', label: 'Social' },
                { icon: Globe, href: '#', label: 'Website' },
                { icon: Mail, href: 'mailto:hello@dynamodm.io', label: 'Email' },
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

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-black/6 pt-6 text-[13px] text-zinc-400 sm:flex-row sm:items-center">
          <p>© {year} DynamoDM. All rights reserved.</p>
          <p>Made in India</p>
        </div>
      </div>
    </footer>
  );
}

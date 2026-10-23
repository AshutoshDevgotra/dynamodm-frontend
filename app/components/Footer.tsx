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
    <footer className="border-t border-white/10 bg-[#0b1220] text-white">
      <div className="container py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.8fr_1fr_1fr] md:gap-16">
          <div className="max-w-md mt-3">
            <Logo light />
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-300">
              Orange Flow helps creators monetize attention and helps businesses turn customer conversations into qualified leads with AI.
            </p>
            <div className="mt-4 flex gap-2.5">
              {[
                { icon: Share2, href: '#', label: 'Social' },
                { icon: Globe, href: '#', label: 'Website' },
                { icon: Mail, href: 'mailto:hello@orangeflow.in', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(columns).map(([title, items]) => (
            <div key={title}>
              <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-white">{title}</h4>
              <ul className="flex list-none flex-col gap-3.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-slate-300 transition hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center">
          <p>{String.fromCharCode(169)} {year} OrangeFlow.in. All rights reserved.</p>
          <p className="text-slate-300">Made in India <span className="ml-1" aria-hidden="true">{String.fromCodePoint(0x1f1ee, 0x1f1f3)}</span></p>
        </div>
      </div>
    </footer>
  );
}

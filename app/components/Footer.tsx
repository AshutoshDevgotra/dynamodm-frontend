import Link from 'next/link';
import { Globe, Mail, Share2 } from 'lucide-react';
import Logo from './Logo';

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const columns = {
  Product: [
    { label: 'Auto DM', href: '/features' },
    { label: 'Creator growth tools', href: '/#growth-tools' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'For Brands', href: '/for-brands' },
    { label: 'Creator shop', href: '/creator/storefront' },
  ],
  Company: [
    { label: 'About House of Orange', href: 'https://houseoforange.in' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Refund Policy', href: '/refund-policy' },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E9E1D7] bg-[#F8F4EE] text-[#332B25]">
      <div className="container pb-14 pt-16 sm:pb-16 sm:pt-20">
        <div className="grid grid-cols-1 gap-10 pt-3 sm:grid-cols-2 sm:pt-4 md:grid-cols-[1.8fr_1fr_1fr] md:gap-16">
          <div className="max-w-md">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-7 text-[#6F6258]">
              Orange Flow helps creators monetize attention and helps businesses turn customer conversations into qualified leads with AI.
            </p>
            <div className="mt-4 flex gap-2.5">
              {[
                { icon: InstagramIcon, href: 'https://www.instagram.com/orangeflow.in/', label: 'Orange Flow on Instagram', external: true },
                { icon: Share2, href: '#', label: 'Social' },
                { icon: Globe, href: '#', label: 'Website' },
                { icon: Mail, href: 'mailto:hello@orangeflow.in', label: 'Email' },
              ].map(({ icon: Icon, href, label, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DCCFC1] text-[#78695D] transition hover:border-[#B98C6B] hover:bg-white hover:text-[#8D563A]"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(columns).map(([title, items]) => (
            <div key={title}>
              <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#332B25]">{title}</h4>
              <ul className="flex list-none flex-col gap-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-[#786B60] transition hover:text-[#A94D2D]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[#E4D9CD] pt-6 text-xs text-[#87796E] sm:flex-row sm:items-center">
          <p>{String.fromCharCode(169)} {year} OrangeFlow.in. All rights reserved.</p>
          <p>Made in India <span className="ml-1" aria-hidden="true">{String.fromCodePoint(0x1f1ee, 0x1f1f3)}</span></p>
        </div>
      </div>
    </footer>
  );
}

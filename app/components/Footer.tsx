import Link from 'next/link';
import { Globe, Mail, Share2 } from 'lucide-react';
import Logo from './Logo';

const WHATSAPP_NUMBER = '919877292856';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20OrangeFlow%20team%2C%20I%20have%20a%20question.`;

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const columns = {
  Product: [
    { label: 'Auto DM', href: '/features' },
    { label: 'Creator growth tools', href: '/#growth-tools' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'For Brands', href: '/for-brands' },
    { label: 'Creator shop', href: '/creator/storefront' },
  ],
  Company: [
    { label: 'About Orange Flow', href: '/about' },
    { label: 'House of Orange', href: 'https://houseoforange.in' },
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
                { icon: Mail, href: 'mailto:team@houseoforange.in', label: 'Email' },
                { icon: WhatsAppIcon, href: WHATSAPP_URL, label: 'Chat on WhatsApp', external: true },
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
            {/* WhatsApp quick contact */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#C8DFC0] bg-[#F2FAF0] px-4 py-2 text-[13px] font-semibold text-[#2D6A4F] transition hover:bg-[#D8F3DC] hover:border-[#95D5B2]"
            >
              <WhatsAppIcon size={14} />
              Chat on WhatsApp
            </a>
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

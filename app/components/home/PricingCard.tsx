import Link from 'next/link';
import { Check } from 'lucide-react';

export interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge?: string;
  href: string;
}

export default function PricingCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  highlighted,
  badge,
  href,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-[28px] p-8 ${
        highlighted
          ? 'bg-[#0b1220] text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)]'
          : 'border border-black/6 bg-white text-[var(--text-primary)] shadow-[0_12px_40px_rgba(15,23,42,0.05)]'
      }`}
    >
      {badge && (
        <div className="absolute -top-3 left-6 rounded-full bg-[#f5d90a] px-3 py-1 text-[11px] font-semibold text-zinc-900">
          {badge}
        </div>
      )}
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className={`mt-1 text-sm ${highlighted ? 'text-zinc-400' : 'text-zinc-500'}`}>{description}</p>
      <div className="mt-6 mb-7 flex items-end gap-1">
        <span className="text-4xl font-bold tracking-tight">{price}</span>
        <span className={`mb-1 text-sm ${highlighted ? 'text-zinc-500' : 'text-zinc-400'}`}>{period}</span>
      </div>
      <ul className="mb-8 space-y-3">
        {features.map((f) => (
          <li key={f} className={`flex items-start gap-2.5 text-sm ${highlighted ? 'text-zinc-300' : 'text-zinc-600'}`}>
            <Check size={16} className={highlighted ? 'mt-0.5 text-blue-300' : 'mt-0.5 text-[var(--brand-from)]'} />
            {f}
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className={`flex w-full items-center justify-center rounded-full py-3 text-sm font-semibold transition-colors ${
          highlighted ? 'bg-white hover:bg-zinc-100' : 'btn-primary !rounded-full'
        }`}
        style={highlighted ? { color: '#18181b' } : undefined}
      >
        {cta}
      </Link>
    </div>
  );
}

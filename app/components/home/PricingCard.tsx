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
      className={`relative flex flex-col rounded-[24px] p-8 ${
        highlighted
          ? 'bg-[#F4ECF4] border border-[#B99AAA] shadow-[0_8px_30px_rgba(112,85,103,0.15)]'
          : 'border border-[#E5E7EB] bg-white shadow-sm'
      }`}
    >
      {badge && (
        <div className="absolute -top-3 left-6 rounded-full bg-[#8B6B87] px-3 py-1 text-[11px] font-semibold text-white shadow-sm shadow-[#705567]/30">
          {badge}
        </div>
      )}

      <h3 className="text-lg font-semibold text-[#111111]">{name}</h3>
      <p className="mt-1 text-sm text-[#6B7280]">{description}</p>

      <div className="mt-6 mb-7 flex items-end gap-1">
        <span className="text-4xl font-bold tracking-tight text-[#111111]">{price}</span>
        <span className="mb-1 text-sm text-[#6B7280]">{period}</span>
      </div>

      <ul className="mb-8 space-y-3 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-[#6B7280]">
            <Check size={16} className="mt-0.5 shrink-0 text-[#8B6B87]" />
            {f}
          </li>
        ))}
      </ul>

      <Link
        href={href}
        className={`flex w-full items-center justify-center rounded-full py-3 text-sm font-semibold transition-colors ${
          highlighted
          ? 'bg-[#A98FA8] text-[#332B38] hover:bg-[#8B6B87]'
            : 'border border-[#E5E7EB] bg-white text-[#111111] hover:bg-[#F8F1ED] hover:border-[#B99AAA]'
        }`}
      >
        {cta}
      </Link>
    </div>
  );
}

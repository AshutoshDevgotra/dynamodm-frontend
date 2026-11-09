'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import { track } from '../../../lib/fbq';

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
  trackPlanSelection?: boolean;
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
  trackPlanSelection = false,
}: PricingCardProps) {
  return (
    <div
      className={`relative flex flex-col rounded-[28px] p-8 transition-all duration-300 ${
        highlighted
          ? 'bg-white border-2 border-[#FF5A1F] shadow-[0_16px_40px_rgba(255,90,31,0.14)] ring-4 ring-[#FF5A1F]/10 z-10 md:-translate-y-2'
          : 'bg-white border border-neutral-200/90 shadow-sm hover:shadow-md hover:border-orange-500/25'
      }`}
    >
      {badge && (
        <div className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-[#FF782D] to-[#FF5A1F] px-3.5 py-1 text-[11px] font-bold text-white shadow-md shadow-orange-500/25 uppercase tracking-wider">
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
            <Check size={16} className="mt-0.5 shrink-0 text-[#FF5A1F]" />
            {f}
          </li>
        ))}
      </ul>

      <Link
        href={href}
        onClick={() => {
          if (!trackPlanSelection) return;
          const numericValue = Number(price.replace(/[^0-9.]/g, ''));
          track('InitiateCheckout', {
            content_name: name,
            content_category: 'subscription',
            ...(Number.isFinite(numericValue) ? { value: numericValue } : {}),
            currency: 'INR',
          });
        }}
        className={`flex w-full items-center justify-center rounded-full py-3 text-sm font-semibold transition-all duration-200 ${
          highlighted
            ? 'btn-primary text-white shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35'
            : 'border border-neutral-200 bg-neutral-50/80 text-neutral-800 hover:bg-neutral-100 hover:border-neutral-300 active:bg-neutral-200'
        }`}
      >
        {cta}
      </Link>
    </div>
  );
}

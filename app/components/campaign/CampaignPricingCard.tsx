'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import { CampaignPlanPricing, getIntroTerms } from '../../../lib/campaign';
import { trackCampaignCheckout } from './CampaignTracker';

export interface CampaignPricingCardProps {
  planId: string;
  planName: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  badge?: string;
  isFeatured?: boolean;
  campaign?: CampaignPlanPricing | null;
  /** Regular price string to show when no campaign active */
  regularPriceDisplay: string;
}

export default function CampaignPricingCard({
  planId,
  planName,
  period,
  description,
  features,
  cta,
  href,
  badge,
  isFeatured = false,
  campaign,
  regularPriceDisplay,
}: CampaignPricingCardProps) {
  const hasCampaign = !!campaign;

  return (
    <div
      id={planId}
      className="relative flex flex-col rounded-[24px] p-7"
      style={
        isFeatured
          ? {
              background: 'linear-gradient(160deg, #0D0500 0%, #1A0800 100%)',
              border: '1px solid rgba(255,168,0,0.40)',
              boxShadow: '0 0 0 0 rgba(255,120,0,0.3)',
              animation: 'diwali-card-glow 2.5s ease-in-out infinite',
            }
          : {
              background: '#FFEFE4',
              border: '1px solid #F0D6C6',
              boxShadow: '0 2px 12px rgba(17,24,39,0.06)',
            }
      }
    >
      {/* Badge */}
      {badge && (
        <div
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-wider shadow-lg"
          style={
            isFeatured
              ? {
                  background: 'linear-gradient(90deg, #FF7800, #FFA800)',
                  color: '#0D0500',
                  animation: 'diwali-badge-pulse 2s ease-in-out infinite',
                }
              : {
                  background: '#FFB08F',
                  color: '#6B2A16',
                }
          }
        >
          {badge}
        </div>
      )}

      {/* Plan name + description */}
      <h3
        className="text-lg font-bold"
        style={{ color: isFeatured ? '#FFFFFF' : '#111111' }}
      >
        {planName}
      </h3>
      <p
        className="mt-1 text-sm"
        style={{ color: isFeatured ? 'rgba(255,255,255,0.60)' : '#6B7280' }}
      >
        {description}
      </p>

      {/* Pricing */}
      <div className="mt-5 mb-2">
        {hasCampaign ? (
          <>
            <div className="flex items-end gap-2">
              <span
                className="text-[36px] font-black tracking-tight"
                style={{ color: isFeatured ? '#FFFFFF' : '#111111' }}
              >
                ₹{campaign.offerPriceInr}
              </span>
              <span className="mb-1.5 text-sm" style={{ color: isFeatured ? 'rgba(255,255,255,0.50)' : '#6B7280' }}>
                {period}
              </span>
              <span
                className="mb-1 rounded-full px-2.5 py-1 text-[11px] font-black"
                style={
                  isFeatured
                    ? { background: '#FF7800', color: '#0D0500' }
                    : { background: '#FFDCD0', color: '#B83B12' }
                }
              >
                SAVE {campaign.discountPercent}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="text-sm line-through"
                style={{ color: isFeatured ? 'rgba(255,255,255,0.35)' : '#9CA3AF' }}
              >
                ₹{campaign.regularPriceInr}{period}
              </span>
              <span
                className="text-[12px] font-semibold"
                style={{ color: isFeatured ? '#FFA800' : '#FF7800' }}
              >
                Save ₹{campaign.savingsPerMonthInr}/month
              </span>
            </div>
          </>
        ) : (
          <div className="flex items-end gap-1">
            <span className="text-[36px] font-black tracking-tight text-[#111111]">
              {regularPriceDisplay}
            </span>
            <span className="mb-1.5 text-sm text-[#6B7280]">{period}</span>
          </div>
        )}
      </div>

      {/* Introductory terms */}
      {hasCampaign && (
        <p
          className="mb-5 rounded-xl px-3 py-2.5 text-[11px] leading-relaxed"
          style={
            isFeatured
              ? { background: 'rgba(255,120,0,0.12)', color: 'rgba(255,255,255,0.65)' }
              : { background: 'rgba(255,120,0,0.07)', color: '#6B7280' }
          }
        >
          {getIntroTerms(campaign)}
        </p>
      )}

      {/* Feature list */}
      <ul className="mb-7 flex-1 space-y-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: isFeatured ? 'rgba(255,255,255,0.70)' : '#6B7280' }}>
            <Check
              size={15}
              className="mt-0.5 shrink-0"
              style={{ color: isFeatured ? '#FFA800' : '#FF5A1F' }}
            />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={href}
        onClick={() => {
          if (campaign) {
            trackCampaignCheckout(planId, campaign.offerPriceInr);
          }
        }}
        className="flex w-full items-center justify-center rounded-full py-3.5 text-sm font-bold transition"
        style={
          isFeatured
            ? {
                background: 'linear-gradient(135deg, #FF7800 0%, #FFA800 100%)',
                color: '#0D0500',
                boxShadow: '0 4px 18px rgba(255,120,0,0.35)',
              }
            : {
                background: '#FFB08F',
                color: '#6B2A16',
              }
        }
      >
        {cta}
      </Link>
    </div>
  );
}

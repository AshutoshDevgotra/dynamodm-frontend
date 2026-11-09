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
                  background: 'linear-gradient(160deg, #6D3427 0%, #3C211B 100%)',
                  border: '1px solid rgba(243,111,76,0.55)',
                  boxShadow: '0 0 0 0 rgba(243,111,76,0.3)',
              animation: 'diwali-card-glow 2.5s ease-in-out infinite',
            }
          : {
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
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
                  background: 'linear-gradient(90deg, #FFAD91, #F36F4C)',
                  color: '#FFFFFF',
                  animation: 'diwali-badge-pulse 2s ease-in-out infinite',
                }
              : {
                  background: 'linear-gradient(135deg, #FFAD91, #F36F4C)',
                  color: '#FFFFFF',
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
                    ? { background: '#F36F4C', color: '#FFFFFF' }
                    : { background: '#FFE2D8', color: '#A94D36' }
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
                    style={{ color: isFeatured ? '#FFAD91' : '#D9573A' }}
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
                ? { background: 'rgba(243,111,76,0.16)', color: 'rgba(255,255,255,0.72)' }
                : { background: 'rgba(243,111,76,0.08)', color: '#6B7280' }
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
              style={{ color: isFeatured ? '#FFAD91' : '#F36F4C' }}
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
                background: 'linear-gradient(135deg, #FFAD91 0%, #F36F4C 100%)',
                color: '#FFFFFF',
                boxShadow: '0 4px 18px rgba(243,111,76,0.35)',
              }
            : {
                background: '#FFFFFF',
                color: '#111827',
                border: '1px solid #E5E7EB',
              }
        }
      >
        {cta}
      </Link>
    </div>
  );
}

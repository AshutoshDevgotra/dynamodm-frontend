import { Metadata } from 'next';
import Link from 'next/link';
import { Check, ShieldCheck, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnnouncementBar from '../components/campaign/AnnouncementBar';
import CampaignPricingCard from '../components/campaign/CampaignPricingCard';
import { DiwaliKeyframes } from '../components/campaign/DiwaliAnimations';
import { CampaignTracker } from '../components/campaign/CampaignTracker';
import { CAMPAIGN, getCampaignPlan, getIntroTerms } from '../../lib/campaign';
import { PricingViewContent } from '../components/MetaPixelEvents';

export const metadata: Metadata = {
  title: 'Pricing',
  alternates: { canonical: 'https://orangeflow.in/pricing' },
  description: 'OrangeFlow.in pricing — start free and scale your Instagram automations. Diwali Extended Offer: up to 40% OFF.',
};

const pricingPlans = [
  {
    planId: 'free',
    planName: '3-day trial',
    regularPriceDisplay: '₹0',
    period: '/mo',
    description: 'Try every core workflow with no payment today',
    features: ['AI business context', 'Instagram inbox and replies', 'Lead capture', 'Comment and DM automations', 'No card required'],
    cta: 'Start 3-day trial',
    href: '/signup',
    badge: undefined,
    isFeatured: false,
  },
  {
    planId: 'starter',
    planName: 'Starter',
    regularPriceDisplay: '₹99',
    period: '/month',
    description: 'For creators getting started',
    features: ['3 automation rules', '500 leads / month', '1,000 DMs / month', '7-day analytics', 'Policy-aware send pacing', 'Email support'],
    cta: 'Unlock Diwali Offer',
    href: '/creator/payments/subscriptions?plan=starter&campaign=diwali-extended-2026',
    badge: 'SAVE 20%',
    isFeatured: false,
  },
  {
    planId: 'pro',
    planName: 'Pro',
    regularPriceDisplay: '₹499',
    period: '/month',
    description: 'For creators turning conversations into growth',
    features: ['10 automation rules', '5,000 leads / month', '10,000 DMs / month', '30-day analytics', 'Policy-aware send pacing', 'PDF attachments', 'CSV export', 'Priority queue', 'Email support'],
    cta: 'Get Pro at ₹299',
    href: '/creator/payments/subscriptions?plan=pro&campaign=diwali-extended-2026',
    badge: '🔥 MOST POPULAR · SAVE 40%',
    isFeatured: true,
  },
  {
    planId: 'premium',
    planName: 'Premium',
    regularPriceDisplay: '₹999',
    period: '/month',
    description: 'For agencies and high-volume teams',
    features: ['Unlimited automations', 'Unlimited leads & DMs', '1-year analytics', 'AI-assisted message review', 'Consent and opt-out safeguards', 'Custom branding', 'Priority support', 'API access', '5 team members'],
    cta: 'Claim Your Offer',
    href: '/creator/payments/subscriptions?plan=premium&campaign=diwali-extended-2026',
    badge: 'SAVE 30%',
    isFeatured: false,
  },
  {
    planId: 'enterprise',
    planName: 'Enterprise',
    regularPriceDisplay: 'Custom',
    period: '',
    description: 'For multi-brand operations',
    features: ['Multiple workspaces', 'Dedicated onboarding', 'Custom limits and controls', 'Security review', 'SLA and priority support'],
    cta: 'Talk to sales',
    href: '/contact',
    badge: undefined,
    isFeatured: false,
  },
];

const comparison = [
  { feature: 'Automation rules', free: '1', starter: '3', pro: '10', premium: 'Unlimited' },
  { feature: 'Leads / month', free: '100', starter: '500', pro: '5,000', premium: 'Unlimited' },
  { feature: 'DMs / month', free: '10', starter: '1,000', pro: '10,000', premium: 'Unlimited' },
  { feature: 'Analytics retention', free: 'Basic', starter: '7 days', pro: '30 days', premium: '1 year' },
  { feature: 'Policy-aware send pacing', free: 'Yes', starter: 'Yes', pro: 'Yes', premium: 'Yes' },
  { feature: 'AI-assisted message review', free: '—', starter: '—', pro: '—', premium: 'Yes' },
  { feature: 'Custom branding', free: '—', starter: '—', pro: '—', premium: 'Yes' },
  { feature: 'API access', free: '—', starter: '—', pro: '—', premium: 'Yes' },
];

export default function PricingPage() {
  const proCampaign = getCampaignPlan('pro');

  return (
    <>
      {CAMPAIGN.active && <AnnouncementBar />}
      {CAMPAIGN.active && <DiwaliKeyframes />}
      <Navbar />
      <PricingViewContent />
      <CampaignTracker event="PricingView" />
      <main className="pricing-page pt-[68px] pb-16">
        <div className="container">
          {/* ── Festive Pricing Hero ── */}
          {CAMPAIGN.active && (
            <div
              className="mx-auto mb-10 mt-10 max-w-3xl overflow-hidden rounded-[28px] px-8 py-10 text-center"
              style={{
                background: 'linear-gradient(160deg, #6D3427 0%, #3C211B 100%)',
                border: '1px solid rgba(243,111,76,0.45)',
              }}
            >
              <span
                className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-bold uppercase tracking-widest"
                style={{ borderColor: 'rgba(255,173,145,0.45)', background: 'rgba(243,111,76,0.16)', color: '#FFAD91' }}
              >
                🪔 Diwali Extended Offer
              </span>
              <h1 className="mt-3 !text-white" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#FFFFFF' }}>
                Celebrate smarter automation{' '}
                <span
                  style={{
                    background: 'linear-gradient(90deg, #FFAD91, #F36F4C)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  with up to 40% OFF
                </span>
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                New subscribers get introductory pricing for their first 3 months. Offer applies automatically at checkout.
              </p>
              {proCampaign && (
                <div
                  className="mx-auto mt-6 inline-flex items-center gap-3 rounded-2xl px-6 py-3"
                  style={{ background: 'rgba(243,111,76,0.16)', border: '1px solid rgba(255,173,145,0.30)' }}
                >
                  <span className="text-[22px] font-black text-white">₹{proCampaign.offerPriceInr}</span>
                  <span className="text-[14px] line-through" style={{ color: 'rgba(255,255,255,0.35)' }}>₹{proCampaign.regularPriceInr}</span>
                  <span className="text-[13px]" style={{ color: '#FFAD91' }}>Pro · Save ₹{proCampaign.savingsPerMonthInr}/month</span>
                </div>
              )}
            </div>
          )}

          {/* Regular hero when no campaign */}
          {!CAMPAIGN.active && (
            <div className="mx-auto mb-12 max-w-2xl pt-16 text-center">
              <span className="badge badge-brand mb-4"><Zap size={13} /> Simple paid plans</span>
              <h1 className="text-[#111111]">
                Start small,
                <span className="block font-serif text-[0.9em]">scale when ready</span>
              </h1>
              <p className="mt-4 text-lg text-[#6B7280]">
                Try OrangeFlow.in at ₹0 for 3 days, then choose a paid plan when you need more volume.
              </p>
            </div>
          )}

          {/* Plan grid */}
          <div className="mb-8 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {pricingPlans.map((plan) => {
              if (plan.planId === 'enterprise') {
                return (
                  <div key={plan.planId} className="relative flex flex-col rounded-[24px] border border-[#E5E7EB] bg-white p-7">
                    <h3 className="text-lg font-bold text-[#111111]">{plan.planName}</h3>
                    <p className="mt-1 text-sm text-[#6B7280]">{plan.description}</p>
                    <div className="mt-5 mb-5 text-[28px] font-black text-[#111111]">Custom</div>
                    <ul className="mb-7 flex-1 space-y-2.5">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-[#6B7280]">
                          <Check size={15} className="mt-0.5 shrink-0 text-[#FF5A1F]" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link href={plan.href} className="flex w-full items-center justify-center rounded-full border border-[#E5E7EB] bg-white py-3 text-sm font-bold text-[#111111] transition hover:bg-[#F8F1ED]">
                      {plan.cta}
                    </Link>
                  </div>
                );
              }

              const campaignPlan = CAMPAIGN.active ? getCampaignPlan(plan.planId) : null;
              return (
                <CampaignPricingCard
                  key={plan.planId}
                  planId={plan.planId}
                  planName={plan.planName}
                  period={plan.period}
                  description={plan.description}
                  features={plan.features}
                  cta={plan.cta}
                  href={plan.href}
                  badge={plan.badge}
                  isFeatured={plan.isFeatured}
                  campaign={campaignPlan}
                  regularPriceDisplay={plan.regularPriceDisplay}
                />
              );
            })}
          </div>

          {/* Introductory terms disclosure — shown prominently before checkout */}
          {CAMPAIGN.active && proCampaign && (
            <div
              className="mx-auto mb-10 max-w-2xl rounded-[20px] px-6 py-5"
              style={{ background: 'rgba(243,111,76,0.07)', border: '1px solid rgba(243,111,76,0.18)' }}
            >
              <p className="text-center text-[13px] leading-relaxed text-[#6B7280]">
                <strong className="text-[#111111]">Introductory pricing terms: </strong>
                {getIntroTerms(proCampaign)} By subscribing, you confirm that you understand and agree to the recurring charge at the regular plan price from the fourth billing cycle. You can cancel anytime from your account settings.
              </p>
            </div>
          )}

          {/* Trust cards */}
          <div className="mb-16 grid gap-4 md:grid-cols-3">
            {[
              ['₹0 for 3 days', 'Try the complete workflow without a card, then upgrade when you are ready.'],
              ['Built for consent', 'Respect opt-outs, message windows, and platform rules by default.'],
              ['Human support', 'Get help with setup, limits, and account configuration when you need it.'],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-[20px] border border-[#E5E7EB] bg-white p-5 shadow-sm">
                <ShieldCheck size={18} className="mb-3 text-[#8B6B87]" />
                <h3 className="text-sm font-semibold text-[#111111]">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-[#6B7280]">{copy}</p>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white shadow-sm">
            <h2 className="border-b border-[#E5E7EB] px-6 py-5 text-lg font-semibold text-[#111111]">Full comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#E5E7EB] text-xs uppercase tracking-wider text-[#6B7280]">
                    <th className="px-6 py-4 font-medium">Feature</th>
                    {['Free', 'Starter', 'Pro', 'Premium'].map((p) => (
                      <th key={p} className={`px-6 py-4 text-center font-semibold ${p === 'Pro' ? 'text-[#F36F4C]' : 'text-[#211B18]'}`}>
                        {p}
                        {p === 'Pro' && CAMPAIGN.active && proCampaign && (
                          <span className="ml-1.5 rounded-full bg-[#F36F4C] px-1.5 py-0.5 text-[9px] font-black text-white">40% OFF</span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.feature} className="border-b border-[#E5E7EB] last:border-0 hover:bg-[#F5F7FA] transition-colors">
                      <td className="px-6 py-3.5 text-sm text-[#6B7280]">{row.feature}</td>
                      {[row.free, row.starter, row.pro, row.premium].map((v, j) => (
                        <td key={`${row.feature}-${j}`} className="px-6 py-3.5 text-center text-sm font-medium text-[#111111]">
                          {v === 'Yes' ? (
                            <Check size={16} className="mx-auto text-[#8B6B87]" />
                          ) : (
                            v
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/creator/payments/subscriptions?plan=pro&campaign=diwali-extended-2026"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-bold transition"
              style={{
                background: CAMPAIGN.active ? 'linear-gradient(135deg, #FFAD91, #F36F4C)' : undefined,
                color: CAMPAIGN.active ? '#FFFFFF' : undefined,
              }}
            >
              {CAMPAIGN.active && proCampaign
                ? `Start Automating — ₹${proCampaign.offerPriceInr}/month`
                : 'Choose Starter'}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

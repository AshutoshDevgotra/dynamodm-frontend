import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Flame, Shield, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnnouncementBar from '../components/campaign/AnnouncementBar';
import CampaignPricingCard from '../components/campaign/CampaignPricingCard';
import ProblemSolution from '../components/campaign/ProblemSolution';
import ProductDemo from '../components/campaign/ProductDemo';
import CampaignFAQ from '../components/campaign/CampaignFAQ';
import { CampaignTracker } from '../components/campaign/CampaignTracker';
import { DiwaliKeyframes, StringLights, FloatingParticles, Diya, FireworksCanvas } from '../components/campaign/DiwaliAnimations';
import { CAMPAIGN, getCampaignPlan, getIntroTerms } from '../../lib/campaign';

export const metadata: Metadata = {
  title: 'Diwali Extended Offer — Up to 40% OFF | OrangeFlow',
  alternates: { canonical: 'https://orangeflow.in/diwali-offer' },
  description: 'OrangeFlow Diwali Extended Offer. Automate your Instagram comment-to-DM conversations. Pro plan at ₹299/month for the first 3 months.',
  openGraph: {
    title: 'OrangeFlow Diwali Extended Offer — Up to 40% OFF',
    description: 'Stop losing leads in your Instagram comments. Pro plan at ₹299/month for your first 3 months.',
    url: 'https://orangeflow.in/diwali-offer',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
};

const trustFeatures = [
  { icon: Zap, title: 'Live in 5 minutes', body: 'Connect your Instagram account and set your first keyword trigger in minutes.' },
  { icon: Shield, title: 'Policy-aware by design', body: 'Safe send pacing, opt-out handling, and message windows built in.' },
  { icon: Check, title: 'No card for free plan', body: 'Start with 10 DMs per month. Upgrade when you need more volume.' },
];

export default function DiwaliOfferPage() {
  const proCampaign = getCampaignPlan('pro');
  const starterCampaign = getCampaignPlan('starter');

  if (!CAMPAIGN.active) {
    return (
      <>
        <Navbar />
        <main className="pt-[68px]">
          <div className="container py-32 text-center">
            <h1 className="text-[#111111]">Campaign has ended</h1>
            <p className="mt-4 text-lg text-[#6B7280]">Check our pricing page for current plans.</p>
            <Link href="/pricing" className="btn-primary mt-8 inline-flex">See Pricing</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <DiwaliKeyframes />
      <AnnouncementBar />
      <Navbar />
      <CampaignTracker event="LandingView" params={{ page: 'diwali-offer' }} />

      <main className="pt-[68px]">
        {/* ── Hero ── */}
        <section
          className="relative isolate overflow-hidden py-20 sm:py-28"
          style={{ background: 'linear-gradient(160deg, #0D0500 0%, #1A0800 40%, #0A0200 100%)' }}
        >
          <FireworksCanvas className="absolute inset-0 h-full w-full" />
          <StringLights />
          <FloatingParticles />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,120,0,0.20) 0%, transparent 70%)' }}
          />

          <div className="container relative z-10">
            <div className="mx-auto max-w-[820px] text-center">
              <span
                className="mb-6 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-black uppercase tracking-[0.12em]"
                style={{ borderColor: 'rgba(255,168,0,0.45)', background: 'rgba(255,120,0,0.12)', color: '#FFA800', animation: 'diwali-badge-pulse 2s ease-in-out infinite' }}
              >
                🪔 Diwali Extended Offer — Up to 40% OFF
              </span>

              <h1
                className="text-white"
                style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)', lineHeight: '1.02', letterSpacing: '-0.05em', fontWeight: 800 }}
              >
                Stop losing leads{' '}
                <span style={{ background: 'linear-gradient(90deg, #FF7800, #FFA800, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  in your Instagram comments.
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-[580px] text-[17px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.70)' }}>
                Turn comment engagement into conversations. OrangeFlow automates your comment-to-DM workflows so you capture every interested lead.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="#pricing"
                  className="inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-bold transition"
                  style={{ background: 'linear-gradient(135deg, #FF7800 0%, #FFA800 100%)', color: '#0D0500', boxShadow: '0 8px 32px rgba(255,120,0,0.40)' }}
                >
                  <Flame size={18} />
                  Unlock 40% OFF
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="#product-demo"
                  className="inline-flex items-center gap-2 rounded-full border px-7 py-4 text-[15px] font-semibold transition hover:bg-white/5"
                  style={{ borderColor: 'rgba(255,168,0,0.35)', color: 'rgba(255,255,255,0.80)' }}
                >
                  See How It Works
                </Link>
              </div>

              {/* Pro pricing highlight */}
              {proCampaign && (
                <div className="mt-10 flex justify-center">
                  <div
                    className="flex items-center gap-4 rounded-2xl border px-6 py-4"
                    style={{ background: 'rgba(255,120,0,0.08)', borderColor: 'rgba(255,168,0,0.30)' }}
                  >
                    <Diya />
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-widest" style={{ color: '#FFA800' }}>OrangeFlow Pro</p>
                      <div className="mt-0.5 flex items-baseline gap-2">
                        <span className="text-[15px] line-through" style={{ color: 'rgba(255,255,255,0.35)' }}>₹{proCampaign.regularPriceInr}</span>
                        <span className="text-[28px] font-black text-white">₹{proCampaign.offerPriceInr}<span className="text-[14px] font-semibold" style={{ color: 'rgba(255,255,255,0.6)' }}>/month</span></span>
                        <span className="rounded-full px-2.5 py-1 text-[11px] font-black" style={{ background: '#FF7800', color: '#0D0500' }}>SAVE {proCampaign.discountPercent}%</span>
                      </div>
                      <p className="mt-1 text-[12px]" style={{ color: 'rgba(255,168,0,0.80)' }}>
                        First {proCampaign.introductoryCycles} months · Save ₹{proCampaign.savingsPerMonthInr}/month
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Problem / Solution ── */}
        <ProblemSolution />

        {/* ── Product Demo ── */}
        <ProductDemo />

        {/* ── Pricing ── */}
        <section
          id="pricing"
          className="scroll-mt-20 py-20 sm:py-28"
          style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, #FFFFFF 100%)' }}
          aria-labelledby="diwali-pricing-heading"
        >
          <div className="container">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span
                className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-bold uppercase tracking-widest"
                style={{ background: 'rgba(255,120,0,0.08)', borderColor: 'rgba(255,120,0,0.20)', color: '#FF7800' }}
              >
                🪔 Diwali Extended Pricing
              </span>
              <h2 id="diwali-pricing-heading" className="mt-3 text-[#111111]">
                Choose your plan.{' '}
                <span className="font-serif text-[0.9em]">Start saving today.</span>
              </h2>
              <p className="mt-4 text-lg text-[#6B7280]">
                Introductory pricing for new subscribers. Regular price applies from the fourth billing cycle.
              </p>
            </div>

            <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  planId: 'free',
                  planName: 'Free Trial',
                  regularPriceDisplay: '₹0',
                  period: '/mo',
                  description: 'Try every core workflow',
                  features: ['AI business context', 'Instagram inbox and replies', 'Lead capture', 'Comment and DM automations', 'No card required'],
                  cta: 'Start Free Trial',
                  href: '/signup',
                  badge: 'Try Free',
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
              ].map((plan) => (
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
                  campaign={CAMPAIGN.active ? getCampaignPlan(plan.planId) : null}
                  regularPriceDisplay={plan.regularPriceDisplay}
                />
              ))}
            </div>

            {/* Renewal terms disclosure */}
            {proCampaign && (
              <div
                className="mx-auto mt-8 max-w-2xl rounded-[20px] px-6 py-5 text-center"
                style={{ background: 'rgba(255,120,0,0.06)', border: '1px solid rgba(255,120,0,0.14)' }}
              >
                <p className="text-[13px] leading-relaxed text-[#6B7280]">
                  <strong className="text-[#111111]">Renewal terms: </strong>
                  {getIntroTerms(proCampaign)} You must agree to the recurring charge before payment is processed. Cancel anytime from your account settings.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ── Trust features ── */}
        <section className="py-16" style={{ background: '#F8F4EE' }}>
          <div className="container">
            <div className="grid gap-6 md:grid-cols-3">
              {trustFeatures.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div key={feat.title} className="rounded-[20px] border border-[#E9E1D7] bg-white p-6 shadow-sm">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF0E7] text-[#FF7800]">
                      <Icon size={18} />
                    </div>
                    <h3 className="text-[15px] font-bold text-[#111111]">{feat.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-[#6B7280]">{feat.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <CampaignFAQ />

        {/* ── Footer CTA ── */}
        <section
          className="py-20 sm:py-24"
          style={{ background: 'linear-gradient(160deg, #0D0500 0%, #1A0800 100%)' }}
        >
          <div className="container text-center">
            {proCampaign && (
              <>
                <p className="text-[12px] font-bold uppercase tracking-widest" style={{ color: '#FFA800' }}>
                  🪔 Diwali Extended Offer
                </p>
                <h2
                  className="mt-4 text-white"
                  style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
                >
                  Start Automating for{' '}
                  <span style={{ background: 'linear-gradient(90deg, #FF7800, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    ₹{proCampaign.offerPriceInr}/month
                  </span>
                </h2>
                <p className="mx-auto mt-4 max-w-md text-[15px]" style={{ color: 'rgba(255,255,255,0.60)' }}>
                  First {proCampaign.introductoryCycles} months at the Diwali price. Cancel anytime.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/creator/payments/subscriptions?plan=pro&campaign=diwali-extended-2026"
                    className="inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-bold transition"
                    style={{ background: 'linear-gradient(135deg, #FF7800, #FFA800)', color: '#0D0500', boxShadow: '0 8px 32px rgba(255,120,0,0.35)' }}
                  >
                    <Flame size={18} />
                    Claim Your Offer
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/signup"
                    className="inline-flex items-center gap-2 rounded-full border px-7 py-4 text-[15px] font-semibold transition hover:bg-white/5"
                    style={{ borderColor: 'rgba(255,168,0,0.35)', color: 'rgba(255,255,255,0.75)' }}
                  >
                    Start Free First
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

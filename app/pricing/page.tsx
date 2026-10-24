import { Metadata } from 'next';
import Link from 'next/link';
import { Check, ShieldCheck, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PricingCard from '../components/home/PricingCard';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'OrangeFlow.in pricing — start free and scale your AI conversations and automations.',
};

const plans = [
  { name: '3-day trial', price: '₹0', period: 'for 3 days', description: 'Try every core workflow with no payment today', features: ['AI business context', 'Instagram inbox and replies', 'Lead capture', 'Comment and DM automations', 'No card required'], cta: 'Start 3-day trial', href: '/signup', highlighted: true, badge: 'Try free' },
  { name: 'Starter', price: '₹99', period: '/month', description: 'For creators getting started', features: ['3 automation rules', '500 leads / month', '1,000 DMs / month', '7-day analytics', 'Policy-aware send pacing', 'Email support'], cta: 'Choose Starter', href: '/creator/payments/subscriptions?plan=starter', highlighted: false, badge: 'Best value' },
  { name: 'Pro', price: '₹499', period: '/month', description: 'For creators turning conversations into growth', features: ['10 automation rules', '5,000 leads / month', '10,000 DMs / month', '30-day analytics', 'Policy-aware send pacing', 'PDF attachments', 'CSV export', 'Priority queue', 'Email support'], cta: 'Choose Pro', href: '/creator/payments/subscriptions?plan=pro', highlighted: false },
  { name: 'Premium', price: '₹999', period: '/month', description: 'For agencies and high-volume teams', features: ['Unlimited automations', 'Unlimited leads & DMs', '1-year analytics', 'AI-assisted message review', 'Consent and opt-out safeguards', 'Custom branding', 'Priority support', 'API access', '5 team members'], cta: 'Choose Premium', href: '/creator/payments/subscriptions?plan=premium', highlighted: false },
  { name: 'Enterprise', price: 'Custom', period: '', description: 'For multi-brand operations', features: ['Multiple workspaces', 'Dedicated onboarding', 'Custom limits and controls', 'Security review', 'SLA and priority support'], cta: 'Talk to sales', href: '/contact', highlighted: false },
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
  return (
    <>
      <Navbar />
      <main className="pt-[68px] pb-16">
        <div className="container">
          {/* Hero */}
          <div className="mx-auto mb-12 max-w-2xl pt-16 text-center">
            <span className="badge badge-brand mb-4"><Zap size={13} /> Simple paid plans</span>
            <h1 className="text-[#111111]">
              Start small,
              <span className="block font-serif text-[0.9em]">scale when ready</span>
            </h1>
            <p className="mt-4 text-lg text-[#6B7280]">
              Try OrangeFlow.in at ₹0 for 3 days, then choose a paid plan from ₹99 when you need more volume. No card is required to start.
            </p>
          </div>

          {/* Plan grid — 5 plans across lg screens, wrap gracefully on smaller */}
          <div className="mb-8 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {plans.map((plan) => <PricingCard key={plan.name} {...plan} />)}
          </div>

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
                      <th key={p} className="px-6 py-4 text-center font-semibold text-[#111111]">{p}</th>
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
            <Link href="/creator/payments/subscriptions?plan=starter" className="btn-primary">
              Choose Starter
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

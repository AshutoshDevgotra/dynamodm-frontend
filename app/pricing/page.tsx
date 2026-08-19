import { Metadata } from 'next';
import Link from 'next/link';
import { Check, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PricingCard from '../components/home/PricingCard';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'DynamoDM pricing — Free, Pro and Premium. Start free, upgrade anytime.',
};

const plans = [
  {
    name: 'Free', price: '₹0', period: '/month', description: 'Get started with automation',
    features: ['1 automation rule', '100 leads / month', '500 DMs / month', '7-day analytics', 'Basic support'],
    cta: 'Start free', href: '/signup', highlighted: false,
  },
  {
    name: 'Pro', price: '₹999', period: '/month', description: 'For serious creators',
    features: ['10 automation rules', '5,000 leads / month', '10,000 DMs / month', '30-day analytics', 'PDF attachments', 'CSV export', 'Priority queue', 'Email support'],
    cta: 'Start Pro trial', href: '/signup?plan=pro', highlighted: true, badge: 'Most popular',
  },
  {
    name: 'Premium', price: '₹2,499', period: '/month', description: 'For agencies & power users',
    features: ['Unlimited automations', 'Unlimited leads & DMs', '1-year analytics', 'Custom branding', 'Priority support', 'API access', '5 team members'],
    cta: 'Go Premium', href: '/signup?plan=premium', highlighted: false,
  },
];

const comparison = [
  { feature: 'Automation rules', free: '1', pro: '10', premium: 'Unlimited' },
  { feature: 'Leads / month', free: '100', pro: '5,000', premium: 'Unlimited' },
  { feature: 'DMs / month', free: '500', pro: '10,000', premium: 'Unlimited' },
  { feature: 'Analytics retention', free: '7 days', pro: '30 days', premium: '1 year' },
  { feature: 'PDF attachments', free: '—', pro: 'Yes', premium: 'Yes' },
  { feature: 'CSV export', free: '—', pro: 'Yes', premium: 'Yes' },
  { feature: 'Custom branding', free: '—', pro: '—', premium: 'Yes' },
  { feature: 'API access', free: '—', pro: '—', premium: 'Yes' },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <span className="badge badge-brand mb-4">
              <Zap size={13} /> Transparent pricing
            </span>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Simple,
              <span className="block font-serif italic font-normal">honest pricing</span>
            </h1>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Start free and upgrade when you need more. No hidden fees.
            </p>
          </div>

          <div className="mb-16 grid items-start gap-5 md:grid-cols-3">
            {plans.map((plan) => (
              <PricingCard key={plan.name} {...plan} />
            ))}
          </div>

          <div className="overflow-hidden rounded-[28px] border border-black/6 bg-white">
            <h2 className="border-b border-black/6 px-6 py-5 text-lg font-semibold">Full comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-black/6 text-xs uppercase tracking-wider text-zinc-400">
                    <th className="px-6 py-4 font-medium">Feature</th>
                    {['Free', 'Pro', 'Premium'].map((p) => (
                      <th key={p} className="px-6 py-4 text-center font-semibold text-zinc-800">{p}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.feature} className="border-b border-black/5 last:border-0">
                      <td className="px-6 py-3.5 text-sm text-zinc-600">{row.feature}</td>
                      {[row.free, row.pro, row.premium].map((v, j) => (
                        <td key={`${row.feature}-${j}`} className="px-6 py-3.5 text-center text-sm font-medium">
                          {v === 'Yes' ? <Check size={16} className="mx-auto text-emerald-500" /> : v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link href="/signup" className="btn-primary">Get started free</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

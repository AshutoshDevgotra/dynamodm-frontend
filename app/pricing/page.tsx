import { Metadata } from 'next';
import Link from 'next/link';
import { Check, ShieldCheck, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PricingCard from '../components/home/PricingCard';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'DynamoDM pricing — paid plans for reliable, policy-aware DM automation.',
};

const plans = [
  { name: 'Pro', price: '₹999', period: '/month', description: 'For creators turning conversations into growth', features: ['10 automation rules', '5,000 leads / month', '10,000 DMs / month', '30-day analytics', 'Policy-aware send pacing', 'PDF attachments', 'CSV export', 'Priority queue', 'Email support'], cta: 'Start Pro', href: '/signup?plan=pro', highlighted: true, badge: 'Most popular' },
  { name: 'Premium', price: '₹2,499', period: '/month', description: 'For agencies and high-volume teams', features: ['Unlimited automations', 'Unlimited leads & DMs', '1-year analytics', 'AI-assisted message review', 'Consent and opt-out safeguards', 'Custom branding', 'Priority support', 'API access', '5 team members'], cta: 'Choose Premium', href: '/signup?plan=premium', highlighted: false },
  { name: 'Enterprise', price: 'Custom', period: '', description: 'For multi-brand operations', features: ['Multiple workspaces', 'Dedicated onboarding', 'Custom limits and controls', 'Security review', 'SLA and priority support'], cta: 'Talk to sales', href: '/contact', highlighted: false },
];

const comparison = [
  { feature: 'Automation rules', pro: '10', premium: 'Unlimited', enterprise: 'Custom' },
  { feature: 'Leads / month', pro: '5,000', premium: 'Unlimited', enterprise: 'Custom' },
  { feature: 'DMs / month', pro: '10,000', premium: 'Unlimited', enterprise: 'Custom' },
  { feature: 'Analytics retention', pro: '30 days', premium: '1 year', enterprise: 'Custom' },
  { feature: 'Policy-aware send pacing', pro: 'Yes', premium: 'Yes', enterprise: 'Yes' },
  { feature: 'AI-assisted message review', pro: '—', premium: 'Yes', enterprise: 'Yes' },
  { feature: 'Custom branding', pro: '—', premium: 'Yes', enterprise: 'Yes' },
  { feature: 'API access', pro: '—', premium: 'Yes', enterprise: 'Yes' },
];

export default function PricingPage() {
  return (<><Navbar /><main className="pt-28 pb-16"><div className="container">
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <span className="badge badge-brand mb-4"><Zap size={13} /> Simple paid plans</span>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">Pay first,<span className="block font-serif italic font-normal">work with confidence</span></h1>
      <p className="mt-4 text-lg text-[var(--text-secondary)]">Choose the capacity you need, pay securely, and unlock the workspace. Every paid plan includes consent-aware controls and policy-aligned send pacing.</p>
    </div>
    <div className="mb-8 grid items-start gap-5 lg:grid-cols-3">{plans.map((plan) => <PricingCard key={plan.name} {...plan} />)}</div>
    <div className="mb-16 grid gap-4 md:grid-cols-3">{[
      ['Pay first, unlock immediately', 'Checkout activates your paid workspace after payment verification.'],
      ['Built for consent', 'Respect opt-outs, message windows, and platform rules by default.'],
      ['Human support', 'Get help with setup, limits, and account configuration when you need it.'],
    ].map(([title, copy]) => <div key={title} className="rounded-2xl border border-black/6 bg-white p-5"><ShieldCheck size={18} className="mb-3 text-[var(--brand-from)]" /><h3 className="text-sm font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-zinc-500">{copy}</p></div>)}</div>
    <div className="overflow-hidden rounded-[28px] border border-black/6 bg-white"><h2 className="border-b border-black/6 px-6 py-5 text-lg font-semibold">Full comparison</h2><div className="overflow-x-auto"><table className="w-full min-w-[720px] border-collapse text-left"><thead><tr className="border-b border-black/6 text-xs uppercase tracking-wider text-zinc-400"><th className="px-6 py-4 font-medium">Feature</th>{['Pro', 'Premium', 'Enterprise'].map((p) => <th key={p} className="px-6 py-4 text-center font-semibold text-zinc-800">{p}</th>)}</tr></thead><tbody>{comparison.map((row) => <tr key={row.feature} className="border-b border-black/5 last:border-0"><td className="px-6 py-3.5 text-sm text-zinc-600">{row.feature}</td>{[row.pro, row.premium, row.enterprise].map((v, j) => <td key={`${row.feature}-${j}`} className="px-6 py-3.5 text-center text-sm font-medium">{v === 'Yes' ? <Check size={16} className="mx-auto text-emerald-500" /> : v}</td>)}</tr>)}</tbody></table></div></div>
    <div className="mt-10 text-center"><Link href="/signup?plan=pro" className="btn-primary">Choose Pro</Link></div>
  </div></main><Footer /></>);
}

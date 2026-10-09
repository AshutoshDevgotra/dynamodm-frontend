import { Metadata } from 'next';
import Link from 'next/link';
import { Check, ShieldCheck, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PricingCard from '../components/home/PricingCard';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'DynamoDM pricing — 10 DMs free, with paid plans from ₹99 for more volume.',
};

const plans = [
  { name: 'Free', price: '₹0', period: '/month', description: 'Try the workflow with a small limit', features: ['1 automation rule', '10 DMs / month', 'Basic analytics', 'Policy-aware send pacing'], cta: 'Start free', href: '/signup', highlighted: false },
  { name: 'Starter', price: '₹99', period: '/month', description: 'For creators getting started', features: ['3 automation rules', '500 leads / month', '1,000 DMs / month', '7-day analytics', 'Policy-aware send pacing', 'Email support'], cta: 'Choose Starter', href: '/signup?plan=starter', highlighted: true, badge: 'Best value' },
  { name: 'Pro', price: '₹499', period: '/month', description: 'For creators turning conversations into growth', features: ['10 automation rules', '5,000 leads / month', '10,000 DMs / month', '30-day analytics', 'Policy-aware send pacing', 'PDF attachments', 'CSV export', 'Priority queue', 'Email support'], cta: 'Choose Pro', href: '/signup?plan=pro', highlighted: false },
  { name: 'Premium', price: '₹999', period: '/month', description: 'For agencies and high-volume teams', features: ['Unlimited automations', 'Unlimited leads & DMs', '1-year analytics', 'AI-assisted message review', 'Consent and opt-out safeguards', 'Custom branding', 'Priority support', 'API access', '5 team members'], cta: 'Choose Premium', href: '/signup?plan=premium', highlighted: false },
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
  return (<><Navbar /><main className="pt-28 pb-16"><div className="container">
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <span className="badge badge-brand mb-4"><Zap size={13} /> Simple paid plans</span>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">Start small,<span className="block font-serif italic font-normal">scale when ready</span></h1>
      <p className="mt-4 text-lg text-[var(--text-secondary)]">Try the workflow with 10 free DMs, then choose a paid plan from ₹99 when you need more volume. Every plan includes consent-aware controls and policy-aligned send pacing.</p>
    </div>
    <div className="mb-8 grid items-start gap-5 xl:grid-cols-4">{plans.map((plan) => <PricingCard key={plan.name} {...plan} />)}</div>
    <div className="mb-16 grid gap-4 md:grid-cols-3">{[
      ['10 DMs free', 'Try the workflow without a card, then upgrade when you need more volume.'],
      ['Built for consent', 'Respect opt-outs, message windows, and platform rules by default.'],
      ['Human support', 'Get help with setup, limits, and account configuration when you need it.'],
    ].map(([title, copy]) => <div key={title} className="rounded-2xl border border-black/6 bg-white p-5"><ShieldCheck size={18} className="mb-3 text-[var(--brand-from)]" /><h3 className="text-sm font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-zinc-500">{copy}</p></div>)}</div>
    <div className="overflow-hidden rounded-[28px] border border-black/6 bg-white"><h2 className="border-b border-black/6 px-6 py-5 text-lg font-semibold">Full comparison</h2><div className="overflow-x-auto"><table className="w-full min-w-[900px] border-collapse text-left"><thead><tr className="border-b border-black/6 text-xs uppercase tracking-wider text-zinc-400"><th className="px-6 py-4 font-medium">Feature</th>{['Free', 'Starter', 'Pro', 'Premium'].map((p) => <th key={p} className="px-6 py-4 text-center font-semibold text-zinc-800">{p}</th>)}</tr></thead><tbody>{comparison.map((row) => <tr key={row.feature} className="border-b border-black/5 last:border-0"><td className="px-6 py-3.5 text-sm text-zinc-600">{row.feature}</td>{[row.free, row.starter, row.pro, row.premium].map((v, j) => <td key={`${row.feature}-${j}`} className="px-6 py-3.5 text-center text-sm font-medium">{v === 'Yes' ? <Check size={16} className="mx-auto text-emerald-500" /> : v}</td>)}</tr>)}</tbody></table></div></div>
    <div className="mt-10 text-center"><Link href="/signup?plan=starter" className="btn-primary">Choose Starter</Link></div>
  </div></main><Footer /></>);
}

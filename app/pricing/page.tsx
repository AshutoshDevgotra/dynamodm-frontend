import { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Check, Zap } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'DynamoDM pricing plans — Free, Pro and Premium. Start free, upgrade anytime.',
};

const plans = [
  {
    name: 'Free', price: '₹0', period: '/month', description: 'Get started with automation',
    features: ['1 Automation Rule', '100 Leads/month', '500 DMs/month', '7-day analytics', 'Basic support'],
    cta: 'Start Free', href: '/signup', highlighted: false, color: '#64748b',
  },
  {
    name: 'Pro', price: '₹999', period: '/month', description: 'For serious creators',
    features: ['10 Automation Rules', '5,000 Leads/month', '10,000 DMs/month', '30-day analytics', 'PDF attachments', 'CSV export', 'Priority queue', 'Email support'],
    cta: 'Start Pro Trial', href: '/signup?plan=pro', highlighted: true, badge: 'Most Popular', color: '#8b5cf6',
  },
  {
    name: 'Premium', price: '₹2,499', period: '/month', description: 'For agencies & power users',
    features: ['Unlimited Automations', 'Unlimited Leads', 'Unlimited DMs', '1-year analytics', 'Custom branding', 'Priority support', 'API access', 'Team members (5)'],
    cta: 'Go Premium', href: '/signup?plan=premium', highlighted: false, color: '#ec4899',
  },
];

const comparison = [
  { feature: 'Automation Rules', free: '1', pro: '10', premium: 'Unlimited' },
  { feature: 'Leads/Month', free: '100', pro: '5,000', premium: 'Unlimited' },
  { feature: 'DMs/Month', free: '500', pro: '10,000', premium: 'Unlimited' },
  { feature: 'Analytics Retention', free: '7 days', pro: '30 days', premium: '1 year' },
  { feature: 'PDF Attachments', free: '✕', pro: '✓', premium: '✓' },
  { feature: 'CSV Export', free: '✕', pro: '✓', premium: '✓' },
  { feature: 'Custom Branding', free: '✕', pro: '✕', premium: '✓' },
  { feature: 'API Access', free: '✕', pro: '✕', premium: '✓' },
  { feature: 'Priority Support', free: '✕', pro: '✕', premium: '✓' },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 100 }}>
        <div className="container" style={{ textAlign: 'center', paddingBottom: 64 }}>
          <span className="badge badge-brand" style={{ marginBottom: 20, display: 'inline-flex' }}>
            <Zap size={13} /> Transparent Pricing
          </span>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 60px)', fontWeight: 900, marginBottom: 16 }}>
            Simple, <span className="gradient-text">honest pricing</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 18, maxWidth: 500, margin: '0 auto 56px' }}>
            Start free and upgrade when you need more. No hidden fees, cancel anytime.
          </p>

          {/* Plans */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 80, alignItems: 'start', maxWidth: 1000, margin: '0 auto 80px' }}>
            {plans.map((plan) => (
              <div key={plan.name} className={plan.highlighted ? 'gradient-border' : 'card'} style={{ padding: 32, position: 'relative', ...(plan.highlighted && { transform: 'scale(1.04)' }) }}>
                {plan.badge && (
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--gradient-brand)', color: 'white', fontSize: 10, fontWeight: 700, padding: '4px 16px', borderRadius: 999, whiteSpace: 'nowrap' }}>
                    {plan.badge}
                  </div>
                )}
                <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{plan.name}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 16 }}>{plan.description}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 24 }}>
                  <span style={{ fontSize: 44, fontWeight: 900 }}>{plan.price}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>{plan.period}</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28, textAlign: 'left' }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-secondary)' }}>
                      <Check size={14} color={plan.color} /> {f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.href}>
                  <button className={plan.highlighted ? 'btn-primary' : 'btn-secondary'} style={{ width: '100%' }}>{plan.cta}</button>
                </Link>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'left' }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: 'center', marginBottom: 32 }}>Full Comparison</h2>
            <div className="card" style={{ overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                    <th style={{ padding: '16px 20px', fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', textAlign: 'left' }}>Feature</th>
                    {['Free', 'Pro', 'Premium'].map((p) => (
                      <th key={p} style={{ padding: '16px 20px', fontSize: 13, fontWeight: 700, textAlign: 'center' }}>{p}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={row.feature} style={{ borderBottom: '1px solid var(--border-subtle)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                      <td style={{ padding: '12px 20px', fontSize: 14, color: 'var(--text-secondary)' }}>{row.feature}</td>
                      {[row.free, row.pro, row.premium].map((v, j) => (
                        <td key={j} style={{ padding: '12px 20px', textAlign: 'center', fontSize: 13, fontWeight: 600, color: v === '✓' ? '#22c55e' : v === '✕' ? '#ef4444' : 'var(--text-primary)' }}>
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

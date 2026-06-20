'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CreditCard, Check, Zap, ArrowRight, AlertCircle } from 'lucide-react';
import { toast } from '../../components/ui/Toaster';

interface Subscription {
  plan: string;
  status: string;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd: boolean;
  features: { maxAutomations: number; maxLeads: number; maxDmsPerMonth: number };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  subscription_id: string;
  name: string;
  description: string;
  theme: { color: string };
  handler: (response: { razorpay_payment_id: string; razorpay_subscription_id: string; razorpay_signature: string }) => void;
}

interface RazorpayInstance {
  open: () => void;
}

const plans = [
  {
    id: 'free', name: 'Free', price: '₹0', period: '/month',
    features: ['1 Automation', '100 Leads/month', '500 DMs/month', '7-day analytics'],
    color: '#64748b', highlighted: false,
  },
  {
    id: 'pro', name: 'Pro', price: '₹999', period: '/month',
    features: ['10 Automations', '5,000 Leads', '10,000 DMs/month', '30-day analytics', 'CSV export', 'PDF attachments'],
    color: '#8b5cf6', highlighted: true, badge: 'Most Popular',
  },
  {
    id: 'premium', name: 'Premium', price: '₹2,499', period: '/month',
    features: ['Unlimited Everything', '1-year analytics', 'Custom branding', 'Priority support', 'API access'],
    color: '#ec4899', highlighted: false,
  },
];

export default function PaymentsPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState<string | null>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.head.appendChild(script);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/subscription`, { headers })
      .then(r => r.json())
      .then(d => { if (d.success) setSubscription(d.data.subscription); })
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpgrade = async (planId: string) => {
    if (planId === 'free') return;
    setUpgrading(planId);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/subscribe`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ plan: planId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      if (data.data.keyId === 'mock') {
        // Mock payment flow for missing Razorpay config
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/verify`, {
          method: 'POST', headers,
          body: JSON.stringify({ isMock: true, razorpay_payment_id: 'mock_payment', razorpay_subscription_id: data.data.subscriptionId }),
        });
        toast('🎉 Subscription activated (Mock Mode)!', 'success');
        window.location.reload();
        return;
      }

      const rzp = new window.Razorpay({
        key: data.data.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        subscription_id: data.data.subscriptionId,
        name: 'DynamoDM',
        description: `${planId.charAt(0).toUpperCase() + planId.slice(1)} Plan Subscription`,
        theme: { color: '#8b5cf6' },
        handler: async (response) => {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/verify`, {
            method: 'POST', headers,
            body: JSON.stringify(response),
          });
          toast('🎉 Subscription activated!', 'success');
          window.location.reload();
        },
      });
      rzp.open();
    } catch (err: unknown) {
      toast(err instanceof Error ? err.message : 'Payment failed', 'error');
    } finally {
      setUpgrading(null);
    }
  };

  const handleCancel = async () => {
    if (!confirm('Cancel your subscription? It will remain active until the end of the billing period.')) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/cancel`, { method: 'POST', headers });
    toast('Subscription will cancel at period end', 'success');
    setSubscription(prev => prev ? { ...prev, cancelAtPeriodEnd: true } : null);
  };

  if (loading) return <div style={{ textAlign: 'center', padding: 80, color: 'var(--text-muted)' }}>Loading...</div>;

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>Subscription & Billing</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Manage your DynamoDM subscription plan.</p>
      </div>

      {/* Current Plan Banner */}
      {subscription && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
          <div style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 16, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={22} color="white" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Current Plan: <span className="gradient-text">{subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)}</span></div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
                Status: {subscription.status} {subscription.currentPeriodEnd && `· Renews ${new Date(subscription.currentPeriodEnd).toLocaleDateString()}`}
                {subscription.cancelAtPeriodEnd && ' · Will cancel at period end'}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Link href="/creator/payments/invoices">
                <button className="btn-secondary" style={{ fontSize: 13, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CreditCard size={14} /> Invoices
                </button>
              </Link>
              {subscription.plan !== 'free' && !subscription.cancelAtPeriodEnd && (
                <button onClick={handleCancel} style={{ fontSize: 13, padding: '8px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, color: '#ef4444', cursor: 'pointer', fontWeight: 600 }}>
                  Cancel Plan
                </button>
              )}
            </div>
          </div>
          {subscription.cancelAtPeriodEnd && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.25)', borderRadius: 10, marginTop: 8 }}>
              <AlertCircle size={14} color="#fbbf24" />
              <span style={{ fontSize: 13, color: '#fbbf24' }}>Your subscription is set to cancel. Reactivate anytime by choosing a plan below.</span>
            </div>
          )}
        </motion.div>
      )}

      {/* Plan Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {plans.map((plan, i) => {
          const isCurrent = subscription?.plan === plan.id;
          return (
            <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <div
                className={plan.highlighted ? 'gradient-border' : 'card'}
                style={{ padding: 28, position: 'relative', ...(plan.highlighted && { transform: 'scale(1.02)' }) }}
              >
                {plan.badge && (
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--gradient-brand)', color: 'white', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 999, whiteSpace: 'nowrap' }}>
                    {plan.badge}
                  </div>
                )}

                <div style={{ marginBottom: 20 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{plan.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontSize: 36, fontWeight: 900 }}>{plan.price}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{plan.period}</span>
                  </div>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 24 }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                      <Check size={14} color={plan.color} /> {f}
                    </li>
                  ))}
                </ul>

                {isCurrent ? (
                  <div style={{ padding: '10px', borderRadius: 10, background: `${plan.color}15`, border: `1px solid ${plan.color}30`, textAlign: 'center', fontSize: 13, fontWeight: 600, color: plan.color }}>
                    ✓ Current Plan
                  </div>
                ) : (
                  <button onClick={() => handleUpgrade(plan.id)} disabled={upgrading === plan.id}
                    className={plan.highlighted ? 'btn-primary' : 'btn-secondary'}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    {upgrading === plan.id ? 'Processing...' : <><span>Upgrade to {plan.name}</span><ArrowRight size={14} /></>}
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

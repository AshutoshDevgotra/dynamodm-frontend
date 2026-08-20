'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, ShieldCheck, ArrowRight } from 'lucide-react';
import { toast } from '../../../components/ui/Toaster';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PLANS = [
  {
    id: 'pro',
    name: 'Pro',
    price: '₹999',
    period: '/month',
    description: 'For creators scaling their DM automations',
    features: ['10 Automations', '5,000 Leads', '10,000 DMs/month', '30-day analytics'],
    icon: Zap,
    color: '#8b5cf6',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '₹2,499',
    period: '/month',
    description: 'For power creators who want everything',
    features: ['Unlimited Automations', 'Unlimited Leads', 'Unlimited DMs', '1-year analytics', 'Priority Support', 'Custom Branding'],
    icon: Crown,
    color: '#f59e0b',
    badge: 'Most Popular',
  },
];

export default function SubscriptionsPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<string | null>(null);
  const [currentPlan, setCurrentPlan] = useState<string>('free');
  const [razorpayReady, setRazorpayReady] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    if (window.Razorpay) { setRazorpayReady(true); return; }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setRazorpayReady(true);
    document.body.appendChild(script);
  }, []);

  // Fetch current subscription
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setCurrentPlan(d.data.subscription?.plan || 'free');
      })
      .catch(() => {});
  }, []);

  // Auto-open checkout if ?plan= is in URL (coming from pricing page after login)
  useEffect(() => {
    const planParam = searchParams.get('plan');
    if (planParam && razorpayReady && (planParam === 'pro' || planParam === 'premium')) {
      handleCheckout(planParam);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [razorpayReady, searchParams]);

  const handleCheckout = async (planId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = `/login?redirect=/creator/payments/subscriptions?plan=${planId}`;
      return;
    }

    setLoading(planId);
    try {
      // Create Razorpay order
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ plan: planId }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Failed to create order');

      const { orderId, amount, currency, keyId, planName } = data.data;

      // Get user info for prefill
      const userRaw = localStorage.getItem('user');
      const user = userRaw ? JSON.parse(userRaw) : {};

      // Open Razorpay checkout modal
      const rzp = new window.Razorpay({
        key: keyId,
        amount,
        currency,
        order_id: orderId,
        name: 'DynamoDM',
        description: `${planName} — Monthly Subscription`,
        image: 'https://dynamodm-frontend.vercel.app/favicon.ico',
        prefill: { name: user.name || '', email: user.email || '' },
        theme: { color: '#8b5cf6' },
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          // Verify payment on backend
          try {
            const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
              body: JSON.stringify(response),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              toast(`🎉 ${planName} activated! Enjoy your new features.`, 'success');
              setCurrentPlan(planId);
              // Clean URL
              window.history.replaceState({}, '', '/creator/payments/subscriptions');
            } else {
              toast(verifyData.message || 'Payment verification failed. Contact support.', 'error');
            }
          } catch {
            toast('Payment verification failed. Contact support.', 'error');
          }
        },
        modal: {
          ondismiss: () => {
            toast('Payment cancelled.', 'error');
          },
        },
      });

      rzp.open();
    } catch (err: any) {
      toast(err.message || 'Something went wrong. Try again.', 'error');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div style={{ maxWidth: 800 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>Upgrade Plan</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
          {currentPlan === 'free'
            ? 'You are on the Free plan. Upgrade to unlock more automations and leads.'
            : `You are on the ${currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)} plan.`}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
        {PLANS.map((plan) => {
          const Icon = plan.icon;
          const isActive = currentPlan === plan.id;
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
              style={{ padding: 28, position: 'relative', border: isActive ? `2px solid ${plan.color}` : undefined }}
            >
              {plan.badge && (
                <div style={{ position: 'absolute', top: -12, left: 24, background: '#f59e0b', color: '#000', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999 }}>
                  {plan.badge}
                </div>
              )}
              {isActive && (
                <div style={{ position: 'absolute', top: -12, right: 24, background: plan.color, color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999 }}>
                  Current Plan
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${plan.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} color={plan.color} />
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>{plan.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{plan.description}</div>
                </div>
              </div>

              <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 20 }}>
                {plan.price}
                <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--text-muted)' }}>{plan.period}</span>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-secondary)' }}>
                    <Check size={15} color={plan.color} />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(plan.id)}
                disabled={!!loading || isActive || !razorpayReady}
                className="btn-primary"
                style={{ width: '100%', background: isActive ? 'var(--bg-secondary)' : plan.color, opacity: (loading && loading !== plan.id) ? 0.5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                {loading === plan.id ? 'Opening checkout...' : isActive ? 'Active' : `Upgrade to ${plan.name}`}
                {!isActive && loading !== plan.id && <ArrowRight size={16} />}
              </button>
            </motion.div>
          );
        })}
      </div>

      <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 13, color: 'var(--text-muted)' }}>
        <ShieldCheck size={14} />
        Secured by Razorpay · Cancel anytime · Billed monthly in INR
      </div>
    </div>
  );
}

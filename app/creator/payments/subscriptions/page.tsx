'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, ShieldCheck, ArrowRight } from 'lucide-react';
import { toast } from '../../../components/ui/Toaster';
import { track } from '../../../../lib/fbq';
import { CAMPAIGN, getCampaignPlan, getIntroTerms } from '../../../../lib/campaign';
import { trackCampaignCheckout } from '../../../components/campaign/CampaignTracker';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '₹99',
    period: '/month',
    description: 'For creators getting started',
    features: ['3 Automations', '500 Leads', '1,000 DMs/month', '7-day analytics'],
    icon: Zap,
    color: '#F36F4C',
    badge: 'Best value',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₹499',
    period: '/month',
    description: 'For creators scaling their DM automations',
    features: ['10 Automations', '5,000 Leads', '10,000 DMs/month', '30-day analytics'],
    icon: Zap,
    color: '#F36F4C',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '₹999',
    period: '/month',
    description: 'For power creators who want everything',
    features: ['Unlimited Automations', 'Unlimited Leads', 'Unlimited DMs', '1-year analytics', 'Priority Support', 'Custom Branding'],
    icon: Crown,
    color: '#E58B6F',
    badge: 'Most Popular',
  },
];

export default function SubscriptionsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [currentPlan, setCurrentPlan] = useState<string>('free');
  const [razorpayReady, setRazorpayReady] = useState(false);
  const [confirmedTerms, setConfirmedTerms] = useState(false);
  const trialExpired = searchParams.get('reason') === 'trial_expired';

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
    fetch('/api/auth/me', {
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
    if (planParam && razorpayReady && ['starter', 'pro', 'premium'].includes(planParam)) {
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

    // If campaign active, require terms confirmation
    const campaignPlan = getCampaignPlan(planId);
    if (CAMPAIGN.active && campaignPlan && !confirmedTerms) {
      toast('Please confirm the introductory pricing terms below before continuing.', 'error');
      document.getElementById('terms-confirmation')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setLoading(planId);
    try {
      // Create Razorpay order — server applies campaign pricing
      const res = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ plan: planId }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Failed to create order');

      const { orderId, amount, currency, keyId, planName, campaign: campaignResponse } = data.data;

      // Verify the checkout amount matches the expected campaign price
      // This prevents frontend spoofing — the server is the source of truth
      if (CAMPAIGN.active && campaignPlan) {
        const expectedAmount = campaignPlan.offerPriceInr * 100;
        if (amount !== expectedAmount && amount !== campaignPlan.regularPriceInr * 100) {
          throw new Error('Unexpected checkout amount. Please refresh and try again.');
        }
      }

      // Compute display amount for description
      const displayAmount = amount / 100;
      const regularAmount = campaignResponse?.regularPriceInr ?? displayAmount;
      const isIntro = campaignResponse && campaignResponse.offerPriceInr === displayAmount;
      const description = isIntro
        ? `${planName} — ₹${displayAmount}/month for first ${campaignResponse.introductoryCycles} months, then ₹${regularAmount}/month`
        : `${planName} — Monthly Subscription`;

      // Track campaign checkout
      if (CAMPAIGN.active && campaignPlan) {
        trackCampaignCheckout(planId, displayAmount);
      }

      // Get user info for prefill
      const userRaw = localStorage.getItem('user');
      const user = userRaw ? JSON.parse(userRaw) : {};

      // Preserve UTM params through checkout
      const utmSource = sessionStorage.getItem('utm_source') || 'direct';

      // Open Razorpay checkout modal
      const rzp = new window.Razorpay({
        key: keyId,
        amount,
        currency,
        order_id: orderId,
        name: 'OrangeFlow.in',
        description,
        image: 'https://orangeflow.in/favicon.ico',
        prefill: { name: user.name || '', email: user.email || '' },
        notes: {
          ...(CAMPAIGN.active ? { campaign: CAMPAIGN.campaignId } : {}),
          utm_source: utmSource,
        },
        theme: { color: '#F36F4C' },
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          // Verify payment on backend
          try {
            const verifyRes = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
              body: JSON.stringify(response),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              track('Purchase', {
                value: displayAmount,
                currency: 'INR',
                content_name: planId,
                content_category: 'subscription',
                ...(CAMPAIGN.active ? { campaign_id: CAMPAIGN.campaignId } : {}),
              });
              toast(`🎉 ${planName} activated! Enjoy your new features.`, 'success');
              setCurrentPlan(planId);
              // Clean URL
              window.history.replaceState({}, '', '/creator/payments/subscriptions');
              router.push('/creator');
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
      {trialExpired && (
        <div role="alert" style={{ marginBottom: 24, padding: 18, borderRadius: 14, border: '1px solid rgba(245,158,11,.45)', background: 'rgba(245,158,11,.12)', color: 'var(--text-primary)' }}>
          <strong>Your 3-day trial has ended.</strong>
          <div style={{ marginTop: 6, color: 'var(--text-secondary)', fontSize: 14 }}>Upgrade your plan to resume comment automations, DM delivery, and lead capture.</div>
        </div>
      )}

      {/* Diwali campaign banner */}
      {CAMPAIGN.active && (
        <div
          role="note"
          style={{ marginBottom: 24, padding: 18, borderRadius: 14, border: '1px solid rgba(255,168,0,0.40)', background: 'rgba(255,120,0,0.08)', color: 'var(--text-primary)' }}
        >
          <strong style={{ color: '#FF7800' }}>🪔 Diwali Extended Offer active</strong>
          <div style={{ marginTop: 6, fontSize: 14, color: 'var(--text-secondary)' }}>
            Introductory pricing applied automatically at checkout. Offer prices shown below.
          </div>
        </div>
      )}

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
          const campaignPlan = CAMPAIGN.active ? getCampaignPlan(plan.id) : null;
          const displayPrice = campaignPlan ? `₹${campaignPlan.offerPriceInr}` : plan.price;
          const regularPrice = campaignPlan ? plan.price : null;

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
              style={{ padding: 28, position: 'relative', border: isActive ? `2px solid ${plan.color}` : undefined }}
            >
              {plan.badge && (
                <div style={{ position: 'absolute', top: -12, left: 24, background: '#F36F4C', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999 }}>
                  {plan.badge}
                </div>
              )}
              {isActive && (
                <div style={{ position: 'absolute', top: -12, right: 24, background: plan.color, color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999 }}>
                  Current Plan
                </div>
              )}
              {campaignPlan && !isActive && (
                <div style={{ position: 'absolute', top: -12, right: 24, background: '#FF7800', color: '#0D0500', fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 999 }}>
                  SAVE {campaignPlan.discountPercent}%
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

              <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 4, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                {displayPrice}
                <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--text-muted)' }}>{plan.period}</span>
                {regularPrice && (
                  <span style={{ fontSize: 14, fontWeight: 400, color: '#9CA3AF', textDecoration: 'line-through' }}>{regularPrice}</span>
                )}
              </div>

              {campaignPlan && (
                <div style={{ marginBottom: 16, fontSize: 12, color: '#FF7800', fontWeight: 600 }}>
                  Save ₹{campaignPlan.savingsPerMonthInr}/month · First {campaignPlan.introductoryCycles} months
                </div>
              )}

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
                style={{ width: '100%', background: isActive ? 'var(--bg-secondary)' : (campaignPlan ? '#FF7800' : plan.color), opacity: (loading && loading !== plan.id) ? 0.5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                {loading === plan.id ? 'Opening checkout...' : isActive ? 'Active' : campaignPlan ? `Get ${plan.name} at ₹${campaignPlan.offerPriceInr}` : `Upgrade to ${plan.name}`}
                {!isActive && loading !== plan.id && <ArrowRight size={16} />}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Introductory pricing terms confirmation — required if campaign active */}
      {CAMPAIGN.active && (
        <div
          id="terms-confirmation"
          style={{ marginTop: 28, padding: 20, borderRadius: 14, border: '1px solid rgba(255,120,0,0.25)', background: 'rgba(255,120,0,0.05)' }}
        >
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 14 }}>
            <strong style={{ color: 'var(--text-primary)' }}>Introductory pricing terms:</strong>{' '}
            {(() => {
              const proPlan = getCampaignPlan('pro');
              return proPlan ? getIntroTerms(proPlan) : '';
            })()}{' '}
            By subscribing, you agree to the recurring charge at the regular plan price from the fourth billing cycle.
          </p>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', fontSize: 13, color: 'var(--text-primary)', fontWeight: 600 }}>
            <input
              type="checkbox"
              checked={confirmedTerms}
              onChange={(e) => setConfirmedTerms(e.target.checked)}
              style={{ marginTop: 2, accentColor: '#FF7800', width: 16, height: 16 }}
              aria-label="I understand and agree to the introductory pricing and recurring charge terms"
            />
            I understand the introductory pricing and agree to the recurring charge at the regular plan price after 3 months.
          </label>
        </div>
      )}

      <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 13, color: 'var(--text-muted)' }}>
        <ShieldCheck size={14} />
        Secured by Razorpay · Cancel anytime · Billed monthly in INR
      </div>
    </div>
  );
}

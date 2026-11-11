'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Crown, ShieldCheck, Zap } from 'lucide-react';
import { toast } from '../../components/ui/Toaster';
import { track } from '../../../lib/fbq';

declare global { interface Window { Razorpay: any; } }

const PLANS = [
  { id: 'free', name: 'Starter', price: 'Free', period: 'Forever', description: 'For those wanting to grow', icon: Zap, color: '#F36F4C', features: ['Link-in-bio Store', 'Unlimited AutoDMs on Reels & Posts', 'Collect up to 10 leads with Lead Magnets', 'Advanced AutoDM flows with email collection', 'Monetization apps'] },
  { id: 'starter', name: 'Creator', price: '₹0', period: 'first month, then ₹99 per month', mandateNote: '₹1 UPI Autopay authorization starts your free month.', description: 'Everything in Starter, plus', icon: Zap, color: '#F36F4C', badge: 'Popular', features: ['Unlimited AutoDM across posts, stories, and lives', 'Advanced AutoDM flows with follow-ups', 'Connect up to 5 Instagram accounts', 'Unlimited Leads via Lead Magnets', 'Digital products, courses, bookings, and events', 'Scheduler, AI replies, comment moderation, and Brand Collab'] },
  { id: 'pro', name: 'Pro', price: "Let's talk", period: '', description: 'Tailored solutions to fit your needs', icon: Crown, color: '#E58B6F', features: ['Everything in Creator', 'Custom Landing Pages', 'Dedicated Growth Manager', 'Dedicated Ads Manager', 'Dedicated WhatsApp Group for Support'] },
];

export default function SubscriptionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState('free');
  const [razorpayReady, setRazorpayReady] = useState(false);

  useEffect(() => {
    if (window.Razorpay) { setRazorpayReady(true); return; }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setRazorpayReady(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => response.json())
      .then((data) => { if (data.success) setCurrentPlan(data.data.subscription?.plan || 'free'); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (searchParams.get('plan') === 'starter' && razorpayReady) handleCheckout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [razorpayReady, searchParams]);

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    if (!token) { window.location.href = '/login?redirect=/creator/subscription?plan=starter'; return; }
    setLoading(true);
    try {
      const response = await fetch('/api/payments/create-subscription', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } });
      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Failed to create checkout');
      const { subscriptionId, keyId, planName } = data.data;
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const razorpay = new window.Razorpay({
        key: keyId, subscription_id: subscriptionId, name: 'OrangeFlow.in',
        description: 'Creator plan — ₹0 first month, then ₹99/month',
        prefill: { name: user.name || '', email: user.email || '' }, theme: { color: '#F36F4C' },
        handler: async (payment: any) => {
          const verify = await fetch('/api/payments/verify-subscription', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payment) });
          const result = await verify.json();
          if (!result.success) { toast(result.message || 'Payment verification failed.', 'error'); return; }
          track('Purchase', { value: 1, currency: 'INR', content_name: 'creator_mandate', content_category: 'subscription' });
          toast(`🎉 ${planName || 'Creator'} trial started! ₹99/month begins after one month.`, 'success'); setCurrentPlan('starter'); router.push('/creator');
        },
        modal: { ondismiss: () => toast('Payment cancelled.', 'error') },
      });
      razorpay.open();
    } catch (error: any) { toast(error.message || 'Something went wrong. Try again.', 'error'); }
    finally { setLoading(false); }
  };

  return <div className="creator-subscription-page">
    <div className="creator-subscription-header"><h1>Choose your plan</h1><p>See your current plan and choose the subscription that fits your growth.</p></div>
    <div className="creator-subscription-grid">
      {PLANS.map((plan) => { const Icon = plan.icon; const isActive = currentPlan === plan.id; const isCreator = plan.id === 'starter'; return <motion.div key={plan.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card creator-subscription-card" style={{ position: 'relative', border: isActive ? `2px solid ${plan.color}` : undefined }}>
        {plan.badge && <div style={{ position: 'absolute', top: -12, left: 20, background: '#2E9B68', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>{plan.badge}</div>}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}><div style={{ width: 40, height: 40, borderRadius: 10, background: `${plan.color}20`, display: 'grid', placeItems: 'center' }}><Icon size={20} color={plan.color} /></div><div><div style={{ fontSize: 19, fontWeight: 700 }}>{plan.name}</div><div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{plan.description}</div></div></div>
        <div style={{ minHeight: 84, marginBottom: 12 }}><div style={{ fontSize: plan.id === 'pro' ? 30 : 34, fontWeight: 800 }}>{plan.price}</div>{plan.period && <div style={{ marginTop: 4, fontSize: 13, color: 'var(--text-muted)', fontWeight: isCreator ? 600 : 400 }}>{plan.period}</div>}{plan.mandateNote && <div style={{ marginTop: 7, fontSize: 12, color: '#2E9B68', fontWeight: 600 }}>{plan.mandateNote}</div>}</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>{plan.features.map((feature) => <li key={feature} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}><Check size={15} color={plan.color} style={{ flex: '0 0 auto', marginTop: 2 }} />{feature}</li>)}</ul>
        <button type="button" onClick={isCreator ? handleCheckout : () => router.push(plan.id === 'pro' ? '/contact' : '/creator')} disabled={!!loading || isActive || (isCreator && !razorpayReady)} className="btn-primary" style={{ width: '100%', background: isActive ? 'var(--bg-secondary)' : plan.color, color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>{loading && isCreator ? 'Opening checkout...' : isActive ? 'Active' : plan.id === 'free' ? 'Start for free' : plan.id === 'pro' ? "Let's talk" : 'Start with ₹1 authorization'}{!isActive && <ArrowRight size={16} />}</button>
      </motion.div>; })}
    </div>
    <div className="creator-subscription-note"><ShieldCheck size={14} /> Secured by Razorpay · Billed monthly in INR</div>
  </div>;
}

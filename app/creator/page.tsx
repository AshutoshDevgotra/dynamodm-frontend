'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Users, MessageSquare, TrendingUp, ArrowRight, AlertCircle, Activity, CheckCircle, Plus, Crown, ShieldCheck } from 'lucide-react';
import { toast } from '../components/ui/Toaster';

declare global {
  interface Window { Razorpay: any; }
}

interface Stats {
  dmsSent: number;
  leadsTotal: number;
  commentsReceived: number;
  automationsActive: number;
  successRate: number;
  leadsNew: number;
}

interface StatCardProps {
  title: string;
  value: string | number;
  sub: string;
  icon: React.ElementType;
  color: string;
  delay?: number;
}

function StatCard({ title, value, sub, icon: Icon, color, delay = 0 }: StatCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5 }}>
      <div className="creator-card creator-stat-card">
        <div className="creator-icon-tile" style={{ color }}><Icon size={20} /></div>
        <div className="mb-1 mt-3 text-[32px] font-extrabold">{value}</div>
        <div className="mb-0.5 text-[13px] font-semibold text-[var(--text-secondary)]">{title}</div>
        <div className="text-xs text-[var(--text-muted)]">{sub}</div>
      </div>
    </motion.div>
  );
}

export default function CreatorDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [igConnected, setIgConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPlan, setCurrentPlan] = useState('free');
  const [razorpayReady, setRazorpayReady] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<string | null>(null);

  useEffect(() => {
    const oauthToken = new URLSearchParams(window.location.search).get('token');
    if (oauthToken) {
      localStorage.setItem('token', oauthToken);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    const token = oauthToken || localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    if (window.Razorpay) setRazorpayReady(true);
    else {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => setRazorpayReady(true);
      document.body.appendChild(script);
    }

    Promise.all([
      fetch('/api/analytics/summary?days=30', { headers }).then((r) => r.json()),
      fetch('/api/instagram/status', { headers }).then((r) => r.json()),
      fetch('/api/auth/me', { headers }).then((r) => r.json()),
    ]).then(([analyticsRes, igRes, authRes]) => {
      if (analyticsRes.success) setStats(analyticsRes.data);
      if (igRes.success) setIgConnected(Boolean(igRes.data?.isConnected || igRes.data?.account?.isConnected));
      if (authRes.success) setCurrentPlan(String(authRes.data?.subscription?.plan || 'free').toLowerCase());
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleUpgrade = async (planId: 'starter' | 'pro' | 'premium') => {
    const token = localStorage.getItem('token');
    if (!token || !razorpayReady) return;
    setCheckoutPlan(planId);
    try {
      const orderRes = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ plan: planId }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.success) throw new Error(orderData.message || 'Unable to create payment order');
      const { orderId, amount, currency, keyId, planName } = orderData.data;
      const userRaw = localStorage.getItem('user');
      const user = userRaw ? JSON.parse(userRaw) : {};
      const razorpay = new window.Razorpay({
        key: keyId,
        amount,
        currency,
        order_id: orderId,
        name: 'OrangeFlow.in',
        description: `${planName} — Monthly Subscription`,
        image: 'https://orangeflow.in/favicon.ico',
        prefill: { name: user.name || '', email: user.email || '' },
        theme: { color: '#2563eb' },
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          const verifyRes = await fetch('/api/payments/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify(response),
          });
          const verifyData = await verifyRes.json();
          if (!verifyRes.ok || !verifyData.success) throw new Error(verifyData.message || 'Payment verification failed');
          setCurrentPlan(planId);
          toast(`${planName} activated. Your dashboard limits are updated.`, 'success');
        },
        modal: { ondismiss: () => setCheckoutPlan(null) },
      });
      razorpay.open();
    } catch (error) {
      toast(error instanceof Error ? error.message : 'Payment could not be started', 'error');
    } finally {
      setCheckoutPlan(null);
    }
  };

  const quickActions = [
    { label: 'New Automation', href: '/creator/automations/new', icon: Zap, color: 'var(--brand-from)' },
    { label: 'View Leads', href: '/creator/leads', icon: Users, color: 'var(--brand-mid)' },
    { label: 'Analytics', href: '/creator/analytics', icon: TrendingUp, color: 'var(--success)' },
  ];

  if (loading) return (
    <div className="flex h-[400px] items-center justify-center"><div className="h-9 w-9 animate-spin rounded-full border-[3px] border-[var(--brand-border)] border-t-[var(--brand-from)]" /></div>
  );

  return (
    <div className="creator-dashboard">
      <motion.div className="creator-page-header creator-page-header--actions" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-from)]">
            <span className="h-2 w-2 rounded-full bg-[var(--success)]" /> Creator workspace
          </div>
          <h1 className="creator-page-title">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}
          </h1>
          <p className="creator-page-description">A clear view of your Instagram automations and audience activity.</p>
        </div>
        <Link href="/creator/automations/new" className="btn-primary" style={{ textDecoration: 'none' }}>
          <Plus size={16} /> New Automation
        </Link>
      </motion.div>

      {/* Instagram Alert */}
      {!igConnected && (
        <motion.div className="creator-alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="creator-alert__inner">
            <AlertCircle size={18} color="#fbbf24" />
            <div className="creator-alert__content">
              <span className="creator-alert__title">Instagram not connected </span>
              <span className="creator-alert__message">— connect your account to start automations.</span>
            </div>
            <Link href="/creator/instagram">
              <button className="btn-primary creator-alert__action">Connect Now</button>
            </Link>
          </div>
        </motion.div>
      )}

      {igConnected && (
        <motion.div className="creator-connection-strip" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div>
            <div className="creator-connection-strip__title">Instagram is connected</div>
            <div className="creator-connection-strip__text">Your automations are ready to watch comments and send replies.</div>
          </div>
          <Link href="/creator/instagram" className="creator-connection-strip__link">Manage connection <ArrowRight size={14} /></Link>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="creator-stat-grid">
        <StatCard title="DMs Sent" value={stats?.dmsSent?.toLocaleString() || '0'} sub="Last 30 days" icon={MessageSquare} color="#8b5cf6" delay={0} />
        <StatCard title="Total Leads" value={stats?.leadsTotal?.toLocaleString() || '0'} sub={`+${stats?.leadsNew || 0} this month`} icon={Users} color="#06b6d4" delay={0.1} />
        <StatCard title="Comments" value={stats?.commentsReceived?.toLocaleString() || '0'} sub="Received & processed" icon={Activity} color="#10b981" delay={0.2} />
        <StatCard title="Success Rate" value={`${stats?.successRate || 0}%`} sub={`${stats?.automationsActive || 0} active rules`} icon={CheckCircle} color="#f59e0b" delay={0.3} />
      </div>

      <motion.div className="mt-6 rounded-[var(--radius-xl)] bg-[#0b1220] p-6 text-white shadow-[var(--shadow-lg)] sm:p-8" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div><div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-300"><Crown size={14} /> Subscription</div><h2 className="text-2xl font-semibold">{currentPlan === 'free' ? 'Unlock more growth' : `You are on the ${currentPlan} plan`}</h2><p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">Upgrade directly from your dashboard to unlock more automations, leads, DMs, and analytics. Payment is verified and saved to your account before access changes.</p></div>
          <div className="flex shrink-0 items-center gap-2 text-xs text-zinc-400"><ShieldCheck size={16} className="text-emerald-400" /> Secure Razorpay checkout</div>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">{([{ id: 'starter', name: 'Starter', price: '₹99/mo', detail: '3 automations · 1,000 DMs' }, { id: 'pro', name: 'Pro', price: '₹499/mo', detail: '10 automations · 10,000 DMs' }, { id: 'premium', name: 'Premium', price: '₹999/mo', detail: 'Unlimited automations & DMs' }] as const).map((plan) => { const active = currentPlan === plan.id; return <button key={plan.id} type="button" disabled={active || Boolean(checkoutPlan) || !razorpayReady} onClick={() => handleUpgrade(plan.id)} className="rounded-2xl border border-white/10 bg-white/8 p-4 text-left transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"><div className="flex items-center justify-between"><span className="font-semibold">{plan.name}</span><span className="text-sm text-blue-200">{active ? 'Active' : checkoutPlan === plan.id ? 'Opening…' : plan.price}</span></div><p className="mt-2 text-xs text-zinc-400">{active ? 'Your current subscription' : plan.detail}</p></button>; })}</div>
      </motion.div>

      {/* Quick Actions + Recent Activity */}
      <div className="creator-dashboard-columns">
        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <div className="card creator-panel">
            <h2 className="creator-panel__title">Quick Actions</h2>
            <div className="creator-action-list">
              {quickActions.map((action) => (
                <Link key={action.label} href={action.href} style={{ textDecoration: 'none' }}>
                  <div className="creator-list__row items-center rounded-[var(--radius-md)] border border-[var(--border-subtle)] p-3 transition-colors hover:border-[var(--border-default)] hover:bg-[var(--bg-card-hover)]">
                    <div className="flex items-center gap-2.5">
                      <div className="creator-icon-tile h-8 w-8 rounded-[var(--radius-sm)]" style={{ color: action.color }}><action.icon size={15} /></div>
                      <span className="text-sm font-medium">{action.label}</span>
                    </div>
                    <ArrowRight size={14} className="ml-auto text-[var(--text-muted)]" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Getting Started */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          <div className="card creator-panel">
            <h2 className="creator-panel__title">Getting Started</h2>
            <div className="creator-checklist">
              {[
                { label: 'Connect Instagram account', href: '/creator/instagram', done: igConnected },
                { label: 'Create first automation', href: '/creator/automations/new', done: (stats?.automationsActive || 0) > 0 },
                { label: 'Share your public profile', href: '/creator/profile', done: false },
                { label: 'Upgrade to Pro plan', href: '/creator/payments/subscriptions', done: false },
              ].map((item) => (
                <Link key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
                  <div className="flex items-center gap-2.5 py-2">
                    <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${item.done ? 'border-[var(--success)] bg-[var(--success-subtle)]' : 'border-[var(--border-default)]'}`}>
                      {item.done && <CheckCircle size={12} className="text-[var(--success)]" />}
                    </div>
                    <span className={`text-sm ${item.done ? 'text-[var(--text-muted)] line-through' : 'text-[var(--text-secondary)]'}`}>{item.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}

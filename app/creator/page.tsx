'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Users, MessageSquare, TrendingUp, ArrowRight, AlertCircle, Activity, BarChart3, CheckCircle, Plus, Crown, ShieldCheck } from 'lucide-react';
import { toast } from '../components/ui/Toaster';
import { track } from '../../lib/fbq';
import FeatureBanner from '../components/creator/FeatureBanner';

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
    const oauthToken = new URLSearchParams(window.location.search).get('token')
      || new URLSearchParams(window.location.hash.replace(/^#/, '')).get('token');
    if (oauthToken) {
      localStorage.setItem('token', oauthToken);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    const token = oauthToken || localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

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
        theme: { color: '#F36F4C' },
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          const verifyRes = await fetch('/api/payments/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify(response),
          });
          const verifyData = await verifyRes.json();
          if (!verifyRes.ok || !verifyData.success) throw new Error(verifyData.message || 'Payment verification failed');
          track('Purchase', { value: Number(amount) / 100, currency: 'INR', content_name: planId, content_category: 'subscription' });
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
    { label: 'Create an automation', href: '/creator/automations/new', icon: Zap, color: 'var(--brand-from)' },
    { label: 'Find brand collabs', href: '/creator/collabs', icon: Users, color: '#FFAD91' },
    { label: 'Add to creator shop', href: '/creator/storefront', icon: Plus, color: 'var(--brand-mid)' },
    { label: 'See audience insights', href: '/creator/analytics', icon: TrendingUp, color: 'var(--success)' },
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
          <p className="creator-page-description">Grow your audience, earn from recommendations, and get discovered by the right brands.</p>
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

      <FeatureBanner
        eyebrow="Creator growth feature"
        title="Automate your"
        accent="DMs"
        description="Turn every message into a helpful conversation, even while you are creating."
        ctaLabel="Create an automation"
        href="/creator/automations/new"
        visualSrc="/banners/automate.png"
        theme="teal"
      />

      {/* Stats Grid */}
      <div className="creator-stat-grid">
        <StatCard title="DMs Sent" value={stats?.dmsSent?.toLocaleString() || '0'} sub="Last 30 days" icon={MessageSquare} color="#F36F4C" delay={0} />
        <StatCard title="Total Leads" value={stats?.leadsTotal?.toLocaleString() || '0'} sub={`+${stats?.leadsNew || 0} this month`} icon={Users} color="#FFAD91" delay={0.1} />
        <StatCard title="Comments" value={stats?.commentsReceived?.toLocaleString() || '0'} sub="Received & processed" icon={Activity} color="#10b981" delay={0.2} />
        <StatCard title="Success Rate" value={`${stats?.successRate || 0}%`} sub={`${stats?.automationsActive || 0} active rules`} icon={CheckCircle} color="#E58B6F" delay={0.3} />
      </div>

      <motion.section className="creator-insights-band" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>
        <div className="creator-insights-heading"><div><span className="creator-eyebrow"><Activity size={13} /> Performance snapshot</span><h2>Momentum this month</h2><p>Keep an eye on the signals that turn attention into action.</p></div><Link href="/creator/analytics" className="creator-insights-link">Open analytics <ArrowRight size={14} /></Link></div>
        <div className="creator-insights-grid">
          <div className="creator-insights-chart"><div className="creator-chart-label"><span>Conversations started</span><strong>+24.8%</strong></div><svg viewBox="0 0 620 150" role="img" aria-label="Conversation growth trend"><defs><linearGradient id="dashboardChartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#F36F4C" stopOpacity=".28" /><stop offset="1" stopColor="#F36F4C" stopOpacity="0" /></linearGradient></defs><path d="M0 126 C52 120 64 102 112 108 S170 78 216 92 S270 60 314 72 S370 81 410 52 S468 44 508 54 S558 26 620 17 V150 H0Z" fill="url(#dashboardChartFill)" /><path d="M0 126 C52 120 64 102 112 108 S170 78 216 92 S270 60 314 72 S370 81 410 52 S468 44 508 54 S558 26 620 17" fill="none" stroke="#F36F4C" strokeWidth="3" strokeLinecap="round" /></svg><div className="creator-chart-days"><span>W1</span><span>W2</span><span>W3</span><span>W4</span></div></div>
          <div className="creator-insights-breakdown"><div className="creator-chart-label"><span>Where growth came from</span><BarChart3 size={16} /></div>{[['Keyword automations', '48%', '#F36F4C'], ['Creator shop clicks', '31%', '#FFAD91'], ['Brand collabs', '21%', '#8E6B5E']].map(([label, value, color]) => <div className="creator-breakdown-row" key={label}><div><span>{label}</span><b>{value}</b></div><div className="creator-breakdown-track"><i style={{ width: value, background: color }} /></div></div>)}</div>
        </div>
      </motion.section>

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
                { label: 'Upgrade to Pro plan', href: '/creator/subscription', done: false },
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

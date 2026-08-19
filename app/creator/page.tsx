'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Users, MessageSquare, TrendingUp, ArrowRight, AlertCircle, Activity, Target, CheckCircle } from 'lucide-react';

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

  useEffect(() => {
    const oauthToken = new URLSearchParams(window.location.search).get('token');
    if (oauthToken) {
      localStorage.setItem('token', oauthToken);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    const token = oauthToken || localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch('/api/analytics/summary?days=30', { headers }).then((r) => r.json()),
      fetch('/api/meta/status', { headers }).then((r) => r.json()),
    ]).then(([analyticsRes, metaRes]) => {
      if (analyticsRes.success) setStats(analyticsRes.data);
      if (metaRes.success) setIgConnected(metaRes.data.account?.isConnected || false);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const quickActions = [
    { label: 'New Automation', href: '/creator/automations/new', icon: Zap, color: 'var(--brand-from)' },
    { label: 'View Leads', href: '/creator/leads', icon: Users, color: 'var(--brand-mid)' },
    { label: 'Analytics', href: '/creator/analytics', icon: TrendingUp, color: 'var(--success)' },
    { label: 'Upgrade Plan', href: '/creator/payments/subscriptions', icon: Target, color: 'var(--brand-to)' },
  ];

  if (loading) return (
    <div className="flex h-[400px] items-center justify-center"><div className="h-9 w-9 animate-spin rounded-full border-[3px] border-[var(--brand-border)] border-t-[var(--brand-from)]" /></div>
  );

  return (
    <div className="creator-dashboard">
      <motion.div className="creator-page-header" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="creator-page-title">
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'} 👋
        </h1>
        <p className="creator-page-description">Here&apos;s what&apos;s happening with your automations in the last 30 days.</p>
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

      {/* Stats Grid */}
      <div className="creator-stat-grid">
        <StatCard title="DMs Sent" value={stats?.dmsSent?.toLocaleString() || '0'} sub="Last 30 days" icon={MessageSquare} color="#8b5cf6" delay={0} />
        <StatCard title="Total Leads" value={stats?.leadsTotal?.toLocaleString() || '0'} sub={`+${stats?.leadsNew || 0} this month`} icon={Users} color="#06b6d4" delay={0.1} />
        <StatCard title="Comments" value={stats?.commentsReceived?.toLocaleString() || '0'} sub="Received & processed" icon={Activity} color="#10b981" delay={0.2} />
        <StatCard title="Success Rate" value={`${stats?.successRate || 0}%`} sub={`${stats?.automationsActive || 0} active rules`} icon={CheckCircle} color="#f59e0b" delay={0.3} />
      </div>

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

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
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}15`, border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={20} color={color} />
          </div>
        </div>
        <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 4 }}>{value}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 2 }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{sub}</div>
      </div>
    </motion.div>
  );
}

export default function CreatorDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [igConnected, setIgConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/summary?days=30`, { headers }).then((r) => r.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/meta/status`, { headers }).then((r) => r.json()),
    ]).then(([analyticsRes, metaRes]) => {
      if (analyticsRes.success) setStats(analyticsRes.data);
      if (metaRes.success) setIgConnected(metaRes.data.account?.isConnected || false);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const quickActions = [
    { label: 'New Automation', href: '/creator/automations/new', icon: Zap, color: '#8b5cf6' },
    { label: 'View Leads', href: '/creator/leads', icon: Users, color: '#06b6d4' },
    { label: 'Analytics', href: '/creator/analytics', icon: TrendingUp, color: '#10b981' },
    { label: 'Upgrade Plan', href: '/creator/payments/subscriptions', icon: Target, color: '#ec4899' },
  ];

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400 }}>
      <div style={{ width: 36, height: 36, border: '3px solid rgba(139,92,246,0.3)', borderTopColor: '#8b5cf6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <div>
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'} 👋
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Here&apos;s what&apos;s happening with your automations in the last 30 days.</p>
      </motion.div>

      {/* Instagram Alert */}
      {!igConnected && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: 24 }}>
          <div style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: 12, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <AlertCircle size={18} color="#fbbf24" />
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>Instagram not connected </span>
              <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>— connect your account to start automations.</span>
            </div>
            <Link href="/creator/instagram">
              <button className="btn-primary" style={{ padding: '6px 16px', fontSize: 13 }}>Connect Now</button>
            </Link>
          </div>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard title="DMs Sent" value={stats?.dmsSent?.toLocaleString() || '0'} sub="Last 30 days" icon={MessageSquare} color="#8b5cf6" delay={0} />
        <StatCard title="Total Leads" value={stats?.leadsTotal?.toLocaleString() || '0'} sub={`+${stats?.leadsNew || 0} this month`} icon={Users} color="#06b6d4" delay={0.1} />
        <StatCard title="Comments" value={stats?.commentsReceived?.toLocaleString() || '0'} sub="Received & processed" icon={Activity} color="#10b981" delay={0.2} />
        <StatCard title="Success Rate" value={`${stats?.successRate || 0}%`} sub={`${stats?.automationsActive || 0} active rules`} icon={CheckCircle} color="#f59e0b" delay={0.3} />
      </div>

      {/* Quick Actions + Recent Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <div className="card" style={{ padding: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Quick Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {quickActions.map((action) => (
                <Link key={action.label} href={action.href} style={{ textDecoration: 'none' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 14px', borderRadius: 10,
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-card-hover)'; e.currentTarget.style.borderColor = 'var(--border-default)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: `${action.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <action.icon size={15} color={action.color} />
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{action.label}</span>
                    </div>
                    <ArrowRight size={14} color="var(--text-muted)" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Getting Started */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          <div className="card" style={{ padding: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Getting Started</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Connect Instagram account', href: '/creator/instagram', done: igConnected },
                { label: 'Create first automation', href: '/creator/automations/new', done: (stats?.automationsActive || 0) > 0 },
                { label: 'Share your public profile', href: '/creator/profile', done: false },
                { label: 'Upgrade to Pro plan', href: '/creator/payments/subscriptions', done: false },
              ].map((item) => (
                <Link key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0' }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${item.done ? '#22c55e' : 'var(--border-default)'}`, background: item.done ? '#22c55e20' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s' }}>
                      {item.done && <CheckCircle size={12} color="#22c55e" />}
                    </div>
                    <span style={{ fontSize: 14, color: item.done ? 'var(--text-muted)' : 'var(--text-secondary)', textDecoration: item.done ? 'line-through' : 'none' }}>{item.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`@media(max-width:1024px){div[style*="grid-template-columns: repeat(4"]{grid-template-columns:repeat(2,1fr)!important;}}`}</style>
    </div>
  );
}

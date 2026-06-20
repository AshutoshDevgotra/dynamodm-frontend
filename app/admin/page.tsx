'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, CreditCard, TrendingUp, Zap, Shield, BarChart3, LayoutDashboard, LogOut } from 'lucide-react';

interface Metrics {
  totalUsers: number; totalCreators: number; activeSubscriptions: number;
  totalRevenue: number; totalDMs: number; totalLeads: number;
}

const adminNav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/creators', label: 'Creators', icon: Zap },
  { href: '/admin/subscriptions', label: 'Subscriptions', icon: CreditCard },
  { href: '/admin/revenue', label: 'Revenue', icon: TrendingUp },
];

export default function AdminPage() {
  const router = useRouter();
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}') as { role?: string };
    if (!token || user.role !== 'admin') { router.push('/login'); return; }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/metrics`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => { if (d.success) setMetrics(d.data); }).finally(() => setLoading(false));
  }, [router]);

  const stats = metrics ? [
    { label: 'Total Users', value: metrics.totalUsers.toLocaleString(), icon: Users, color: '#8b5cf6' },
    { label: 'Active Subscribers', value: metrics.activeSubscriptions.toLocaleString(), icon: CreditCard, color: '#06b6d4' },
    { label: 'Total Revenue', value: `₹${(metrics.totalRevenue / 100).toLocaleString()}`, icon: TrendingUp, color: '#10b981' },
    { label: 'DMs Sent', value: metrics.totalDMs.toLocaleString(), icon: Zap, color: '#f59e0b' },
    { label: 'Total Leads', value: metrics.totalLeads.toLocaleString(), icon: BarChart3, color: '#ec4899' },
    { label: 'Creators', value: metrics.totalCreators.toLocaleString(), icon: Shield, color: '#a855f7' },
  ] : [];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: 'var(--bg-secondary)', borderRight: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, bottom: 0, left: 0 }}>
        <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={16} color="white" />
          </div>
          <span style={{ fontSize: 16, fontWeight: 700, fontFamily: 'Plus Jakarta Sans' }}>Admin Panel</span>
        </div>
        <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {adminNav.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="sidebar-link" style={{}}>
              <Icon size={16} /> {label}
            </Link>
          ))}
        </nav>
        <div style={{ padding: '12px 8px', borderTop: '1px solid var(--border-subtle)' }}>
          <button onClick={() => { localStorage.clear(); router.push('/'); }} className="sidebar-link" style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, marginLeft: 220, padding: 28 }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>Admin Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Platform-wide metrics and management.</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 80 }}>Loading metrics...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <div className="card" style={{ padding: 24 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${stat.color}15`, border: `1px solid ${stat.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <stat.icon size={20} color={stat.color} />
                  </div>
                  <div style={{ fontSize: 32, fontWeight: 900 }}>{stat.value}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginTop: 4 }}>{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Quick Links */}
        <div style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Management</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {[
              { label: 'Manage All Users', href: '/admin/users', desc: 'View, search, suspend, and activate user accounts' },
              { label: 'Manage Creators', href: '/admin/creators', desc: 'View creator accounts and Instagram connections' },
              { label: 'Subscriptions', href: '/admin/subscriptions', desc: 'View all plan subscriptions and statuses' },
              { label: 'Revenue Analytics', href: '/admin/revenue', desc: 'Monthly revenue breakdown and payment history' },
            ].map((item) => (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ padding: 20 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{item.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

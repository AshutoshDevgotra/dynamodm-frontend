'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, CreditCard, TrendingUp, Zap, Shield, BarChart3, LayoutDashboard, LogOut, Receipt, Mail, CalendarDays, GraduationCap, UserRound, Globe2 } from 'lucide-react';

interface Metrics {
  totalUsers: number; totalCreators: number; activeSubscriptions: number;
  totalRevenue: number; totalDMs: number; totalLeads: number;
}

interface BillingUser { name?: string; email?: string; role?: string; status?: string; isActive?: boolean; createdAt?: string; }
interface PaymentRecord { _id?: string; userId?: BillingUser; plan?: string; amount?: number; currency?: string; status?: string; method?: string; createdAt?: string; }
interface BillingOverview {
  capturedPayments: { totalPaise: number; count: number };
  subscriptions: { _id: string; count: number }[];
  planBreakdown: { _id: string; count: number }[];
  recentPayments: PaymentRecord[];
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
  const [billing, setBilling] = useState<BillingOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}') as { role?: string; email?: string };
    if (!token || user.role?.toUpperCase() !== 'ADMIN' || user.email?.toLowerCase() !== 'ashutoshdevgotra@gmail.com') { router.push('/login'); return; }

    const headers = { Authorization: `Bearer ${token}` };
    Promise.all([
      fetch('/api/admin/metrics', { headers }).then(r => r.json()),
      fetch('/api/admin/billing-overview', { headers }).then(r => r.json()),
    ]).then(([metricsResponse, billingResponse]) => {
      if (metricsResponse.success) setMetrics(metricsResponse.data);
      if (billingResponse.success) setBilling(billingResponse.data);
      if (metricsResponse.message === 'Admin dashboard access is restricted.' || billingResponse.message === 'Admin dashboard access is restricted.') router.push('/login');
    }).finally(() => setLoading(false));
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

        <div className="card" style={{ padding: 20, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
            <Shield size={18} color="#10b981" />
            <h2 style={{ fontSize: 17, fontWeight: 800 }}>Open another workspace</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 14 }}>View the product from your own admin, creator, learner, or public-user perspective.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 10 }}>
            {[
              { href: '/admin', label: 'Admin', description: 'Manage platform', icon: Shield },
              { href: '/creator', label: 'Creator', description: 'Creator workspace', icon: UserRound },
              { href: '/learn', label: 'Learner / user', description: 'Student dashboard', icon: GraduationCap },
              { href: '/', label: 'Public view', description: 'Visitor experience', icon: Globe2 },
            ].map(({ href, label, description, icon: Icon }) => (
              <Link key={href} href={href} style={{ textDecoration: 'none' }}>
                <div style={{ minHeight: 76, padding: 12, borderRadius: 12, border: '1px solid var(--border-subtle)', background: href === '/admin' ? '#10b98112' : 'var(--bg-secondary)' }}>
                  <Icon size={17} color={href === '/admin' ? '#047857' : 'var(--text-secondary)'} />
                  <div style={{ marginTop: 7, fontSize: 13, fontWeight: 700 }}>{label}</div>
                  <div style={{ marginTop: 2, fontSize: 11, color: 'var(--text-muted)' }}>{description}</div>
                </div>
              </Link>
            ))}
          </div>
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

        {billing && (
          <section id="billing" style={{ marginTop: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 16 }}>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Billing & purchasers</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Captured payments and the customer details stored with each purchase.</p>
              </div>
              <Receipt size={22} color="#10b981" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
              <div className="card" style={{ padding: 18 }}><div style={{ fontSize: 26, fontWeight: 900 }}>₹{(billing.capturedPayments.totalPaise / 100).toLocaleString('en-IN')}</div><div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Captured revenue</div></div>
              <div className="card" style={{ padding: 18 }}><div style={{ fontSize: 26, fontWeight: 900 }}>{billing.capturedPayments.count.toLocaleString()}</div><div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Payments received</div></div>
              <div className="card" style={{ padding: 18 }}><div style={{ fontSize: 26, fontWeight: 900 }}>{billing.subscriptions.reduce((total, item) => total + item.count, 0).toLocaleString()}</div><div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Subscriptions recorded</div></div>
            </div>
            <div className="card" style={{ padding: 20, overflowX: 'auto' }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
                {billing.planBreakdown.map((plan) => <span key={plan._id} style={{ padding: '7px 11px', borderRadius: 999, background: '#10b98118', color: '#047857', fontSize: 12, fontWeight: 700 }}>{plan._id || 'Unknown'}: {plan.count}</span>)}
              </div>
              {billing.recentPayments.length === 0 ? <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)' }}>No payments have been recorded yet.</div> : (
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 760 }}>
                  <thead><tr style={{ textAlign: 'left', color: 'var(--text-muted)', fontSize: 12 }}><th style={{ padding: '10px 8px' }}>Customer</th><th style={{ padding: '10px 8px' }}>Plan</th><th style={{ padding: '10px 8px' }}>Amount</th><th style={{ padding: '10px 8px' }}>Status</th><th style={{ padding: '10px 8px' }}>Payment method</th><th style={{ padding: '10px 8px' }}>Date</th></tr></thead>
                  <tbody>{billing.recentPayments.map((payment) => <tr key={payment._id || `${payment.createdAt}-${payment.userId?.email}`} style={{ borderTop: '1px solid var(--border-subtle)', fontSize: 13 }}>
                    <td style={{ padding: '14px 8px' }}><div style={{ fontWeight: 700 }}>{payment.userId?.name || 'Unnamed user'}</div><div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 5 }}><Mail size={12} />{payment.userId?.email || 'Email unavailable'}</div><div style={{ color: 'var(--text-muted)', fontSize: 11, marginTop: 3 }}>{payment.userId?.role || 'USER'} · {payment.userId?.isActive === false ? 'Inactive' : 'Active'}</div></td>
                    <td style={{ padding: '14px 8px', fontWeight: 700 }}>{payment.plan || '—'}</td>
                    <td style={{ padding: '14px 8px', fontWeight: 700 }}>₹{((payment.amount || 0) / 100).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '14px 8px' }}><span style={{ color: payment.status === 'captured' ? '#047857' : '#b45309', fontWeight: 700 }}>{payment.status || '—'}</span></td>
                    <td style={{ padding: '14px 8px', color: 'var(--text-secondary)' }}>{payment.method || '—'}</td>
                    <td style={{ padding: '14px 8px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}><CalendarDays size={12} style={{ verticalAlign: 'middle', marginRight: 5 }} />{payment.createdAt ? new Date(payment.createdAt).toLocaleDateString('en-IN') : '—'}</td>
                  </tr>)}</tbody>
                </table>
              )}
              <div style={{ marginTop: 16, color: 'var(--text-muted)', fontSize: 12 }}>Only details stored in the account are shown. Mobile number is not currently stored in the user profile, so it is not displayed.</div>
            </div>
          </section>
        )}

        {/* Quick Links */}
        <div style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Management</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {[
              { label: 'Manage All Users', href: '/admin/users', desc: 'View, search, suspend, and activate user accounts' },
              { label: 'Manage Creators', href: '/admin/creators', desc: 'View creator accounts and Instagram connections' },
              { label: 'Subscriptions', href: '/admin/subscriptions', desc: 'View all plan subscriptions and statuses' },
              { label: 'Billing & purchasers', href: '#billing', desc: 'Captured payments, plans, and purchaser accounts' },
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

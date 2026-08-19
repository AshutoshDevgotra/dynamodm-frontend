'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, MessageSquare, Users, Target, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';

interface Summary {
  dmsSent: number; dmsFailed: number; leadsTotal: number; leadsNew: number;
  commentsReceived: number; automationsActive: number; successRate: number;
  linkClicks: number;
}

interface TimeSeriesPoint { _id: { date: string; eventType: string }; count: number; }

export default function AnalyticsPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [series, setSeries] = useState<TimeSeriesPoint[]>([]);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/summary?days=${days}`, { headers }).then(r => r.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/timeseries?days=${days}`, { headers }).then(r => r.json()),
    ]).then(([s, ts]) => {
      if (s.success) setSummary(s.data);
      if (ts.success) setSeries(ts.data.series);
    }).finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  // Process time series data for charts
  const chartData = (() => {
    const map: Record<string, Record<string, number>> = {};
    series.forEach(({ _id, count }) => {
      if (!map[_id.date]) map[_id.date] = {};
      map[_id.date][_id.eventType] = count;
    });
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b)).map(([date, events]) => ({
      date: new Date(date).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
      dms: (events.dm_sent || 0),
      leads: (events.lead_captured || 0),
      comments: (events.comment_received || 0),
    }));
  })();

  const customTooltipStyle = {
    background: 'rgba(13,13,20,0.95)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8, fontSize: 12, color: '#fff',
  };

  return (
    <div>
      <div className="creator-toolbar">
        <div>
          <h1 className="creator-page-title">Analytics</h1>
          <p className="creator-page-description">Track your automation performance and growth.</p>
        </div>
        <div className="flex gap-2">
          {[7, 30, 90].map((d) => (
            <button key={d} onClick={() => setDays(d)}
              className={`creator-period-button ${days === d ? 'creator-period-button--active' : ''}`}>
              {d}d
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="creator-stat-grid">
        {[
          { icon: MessageSquare, label: 'DMs Sent', value: summary?.dmsSent?.toLocaleString() || '0', color: 'var(--brand-from)', sub: `${summary?.successRate || 0}% success` },
          { icon: Users, label: 'New Leads', value: summary?.leadsNew?.toLocaleString() || '0', color: 'var(--brand-mid)', sub: `${summary?.leadsTotal?.toLocaleString() || '0'} total` },
          { icon: TrendingUp, label: 'Link Clicks', value: summary?.linkClicks?.toLocaleString() || '0', color: '#f59e0b', sub: 'Affiliate & Storefront' },
          { icon: Target, label: 'Active Rules', value: summary?.automationsActive || '0', color: '#10b981', sub: 'Running automations' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="creator-card creator-stat-card">
              <div className="creator-icon-tile mb-3" style={{ color: stat.color }}><stat.icon size={18} /></div>
              <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 2 }}>{stat.value}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{stat.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{stat.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {loading && <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>Loading chart data...</div>}

      {!loading && chartData.length === 0 && (
        <div className="creator-card creator-empty-state">
          <BarChart3 size={48} color="var(--text-muted)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No data yet</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Once your automations start firing, your metrics will appear here.</p>
        </div>
      )}

      {!loading && chartData.length > 0 && (
        <>
          {/* DMs + Leads Area Chart */}
          <div className="creator-card creator-card--padded mb-4">
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Performance Overview</h2>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="dmsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--brand-from)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--brand-from)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="leadsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#475569' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#475569' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={customTooltipStyle} />
                <Area type="monotone" dataKey="dms" name="DMs Sent" stroke="var(--brand-from)" fill="url(#dmsGrad)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="leads" name="Leads" stroke="#06b6d4" fill="url(#leadsGrad)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Comments Bar Chart */}
          <div className="creator-card creator-card--padded">
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Comments Received</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#475569' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#475569' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={customTooltipStyle} />
                <Bar dataKey="comments" name="Comments" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

    </div>
  );
}

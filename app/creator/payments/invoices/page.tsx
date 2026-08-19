'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Calendar, CheckCircle, XCircle } from 'lucide-react';

interface Payment {
  _id: string;
  amount: number;
  currency: string;
  status: string;
  razorpayPaymentId?: string;
  description?: string;
  createdAt: string;
}

export default function InvoicesPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/invoices`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json()).then(d => { if (d.success) setPayments(d.data.payments); }).finally(() => setLoading(false));
  }, []);

  const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
    captured: { color: '#22c55e', icon: <CheckCircle size={14} color="#22c55e" /> },
    failed: { color: '#ef4444', icon: <XCircle size={14} color="#ef4444" /> },
    created: { color: '#f59e0b', icon: <Calendar size={14} color="#f59e0b" /> },
  };

  return (
    <div className="max-w-[800px]">
      <div className="creator-page-header">
        <h1 className="creator-page-title">Invoices</h1>
        <p className="creator-page-description">Your payment history and receipts.</p>
      </div>

      {loading ? <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>Loading...</div> : payments.length === 0 ? (
        <div className="creator-card creator-empty-state">
          <Download size={48} color="var(--text-muted)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No invoices yet</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Your payment receipts will appear here.</p>
        </div>
      ) : (
        <div className="creator-card creator-table-wrap">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                {['Invoice ID', 'Amount', 'Status', 'Date', ''].map((h) => (
                  <th key={h} style={{ padding: '12px 16px', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payments.map((p, i) => (
                <motion.tr key={p._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                  style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-card)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '14px 16px', fontSize: 13, fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{p.razorpayPaymentId || p._id.slice(-8)}</td>
                  <td style={{ padding: '14px 16px', fontSize: 15, fontWeight: 700 }}>₹{(p.amount / 100).toLocaleString()}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: statusConfig[p.status]?.color || 'var(--text-muted)' }}>
                      {statusConfig[p.status]?.icon} {p.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--text-muted)' }}>{new Date(p.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <button className="creator-list__action" title="Download receipt">
                      <Download size={14} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

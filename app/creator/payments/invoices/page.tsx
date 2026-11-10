'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Calendar, CheckCircle, XCircle, WalletCards } from 'lucide-react';

interface Payment {
  _id: string;
  amount: number;
  currency: string;
  status: string;
  razorpayPaymentId?: string;
  description?: string;
  createdAt: string;
}
interface PayoutSummary { academyIncome: number; affiliateIncome: number; available: number; upiId: string | null; bankDetails: { bankName: string; accountHolderName: string; ifscCode: string; accountLast4: string }; }

export default function InvoicesPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [payout, setPayout] = useState<PayoutSummary | null>(null);
  const [upiId, setUpiId] = useState('');
  const [payoutMessage, setPayoutMessage] = useState('');
  const [payoutBusy, setPayoutBusy] = useState(false);
  const [bankForm, setBankForm] = useState({ bankName: '', accountHolderName: '', accountNumber: '', ifscCode: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    Promise.all([fetch('/api/payments/invoices', { headers }).then(r => r.json()), fetch('/api/academy/creator/payouts', { headers }).then(r => r.json())]).then(([invoiceData, payoutData]) => { if (invoiceData.success) setPayments(invoiceData.data.payments); if (payoutData.success) { setPayout(payoutData.data); setUpiId(payoutData.data.upiId || ''); setBankForm({ bankName: payoutData.data.bankDetails?.bankName || '', accountHolderName: payoutData.data.bankDetails?.accountHolderName || '', accountNumber: '', ifscCode: payoutData.data.bankDetails?.ifscCode || '' }); } }).finally(() => setLoading(false));
  }, []);

  const saveUpi = async () => { setPayoutBusy(true); setPayoutMessage(''); try { const response = await fetch('/api/academy/creator/payouts/upi', { method: 'PUT', headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ upiId }) }); const data = await response.json(); if (!response.ok || !data.success) throw new Error(data.message); setPayoutMessage('UPI ID saved.'); } catch (error) { setPayoutMessage(error instanceof Error ? error.message : 'Unable to save UPI ID.'); } finally { setPayoutBusy(false); } };
  const claimPayout = async () => { setPayoutBusy(true); setPayoutMessage(''); try { const response = await fetch('/api/academy/creator/payouts/claim', { method: 'POST', headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ upiId }) }); const data = await response.json(); if (!response.ok || !data.success) throw new Error(data.message); setPayoutMessage('Claim submitted. We will process it within 2 working days.'); setPayout((current) => current ? { ...current, available: 0 } : current); } catch (error) { setPayoutMessage(error instanceof Error ? error.message : 'Unable to submit payout claim.'); } finally { setPayoutBusy(false); } };
  const saveBankDetails = async () => { setPayoutBusy(true); setPayoutMessage(''); try { const response = await fetch('/api/academy/creator/payouts/bank', { method: 'PUT', headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' }, body: JSON.stringify(bankForm) }); const data = await response.json(); if (!response.ok || !data.success) throw new Error(data.message); setPayout((current) => current ? { ...current, bankDetails: data.data.bankDetails } : current); setBankForm((current) => ({ ...current, accountNumber: '' })); setPayoutMessage('Bank details saved securely.'); } catch (error) { setPayoutMessage(error instanceof Error ? error.message : 'Unable to save bank details.'); } finally { setPayoutBusy(false); } };

  const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
    captured: { color: '#22c55e', icon: <CheckCircle size={14} color="#22c55e" /> },
    failed: { color: '#ef4444', icon: <XCircle size={14} color="#ef4444" /> },
    created: { color: '#E58B6F', icon: <Calendar size={14} color="#E58B6F" /> },
  };

  return (
    <div className="max-w-[800px]">
      <div className="creator-page-header">
        <h1 className="creator-page-title">Invoices</h1>
        <p className="creator-page-description">Your payment history and receipts.</p>
      </div>

      {payout && <div className="creator-card creator-card--padded" style={{ marginBottom: 20 }}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><WalletCards size={20} color="#10b981" /><h2 style={{ fontSize: 18, fontWeight: 800 }}>Creator payout balance</h2></div><p style={{ marginTop: 6, color: 'var(--text-muted)', fontSize: 13 }}>Academy income and affiliate income are shown separately. Payouts are processed within 2 working days.</p><div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 16 }}><div><div style={{ fontSize: 20, fontWeight: 800 }}>₹{(payout.academyIncome / 100).toLocaleString('en-IN')}</div><div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Academy income</div></div><div><div style={{ fontSize: 20, fontWeight: 800 }}>₹{(payout.affiliateIncome / 100).toLocaleString('en-IN')}</div><div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Affiliate income</div></div><div><div style={{ fontSize: 20, fontWeight: 800, color: '#047857' }}>₹{(payout.available / 100).toLocaleString('en-IN')}</div><div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Available to claim</div></div></div><div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}><input className="input-field" style={{ flex: '1 1 220px' }} value={upiId} onChange={(event) => setUpiId(event.target.value)} placeholder="yourname@upi" /><button className="btn-secondary" disabled={payoutBusy} onClick={saveUpi}>Save UPI ID</button><button className="btn-primary" disabled={payoutBusy || payout.available < 100} onClick={claimPayout}>Claim balance</button></div><div style={{ marginTop: 20, borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}><h3 style={{ fontSize: 15, fontWeight: 800 }}>Bank details</h3><p style={{ marginTop: 4, color: 'var(--text-muted)', fontSize: 12 }}>Provide your bank name, account holder name, account number, and IFSC code. The full account number is encrypted and only the last four digits are shown after saving.</p><div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginTop: 12 }}><input className="input-field" value={bankForm.bankName} onChange={(event) => setBankForm({ ...bankForm, bankName: event.target.value })} placeholder="Bank name" /><input className="input-field" value={bankForm.accountHolderName} onChange={(event) => setBankForm({ ...bankForm, accountHolderName: event.target.value })} placeholder="Account holder name" /><input className="input-field" value={bankForm.accountNumber} onChange={(event) => setBankForm({ ...bankForm, accountNumber: event.target.value })} placeholder="Bank account number" inputMode="numeric" /><input className="input-field" value={bankForm.ifscCode} onChange={(event) => setBankForm({ ...bankForm, ifscCode: event.target.value.toUpperCase() })} placeholder="IFSC code" maxLength={11} /></div><button className="btn-secondary" style={{ marginTop: 10 }} disabled={payoutBusy} onClick={saveBankDetails}>Save bank details</button>{payout.bankDetails.accountLast4 && <div style={{ marginTop: 6, color: 'var(--text-muted)', fontSize: 12 }}>Saved account ending in {payout.bankDetails.accountLast4}.</div>}</div>{payoutMessage && <div style={{ marginTop: 10, color: '#047857', fontSize: 13 }}>{payoutMessage}</div>}</div>}

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

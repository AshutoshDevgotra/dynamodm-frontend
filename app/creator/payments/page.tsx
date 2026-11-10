'use client';

import { useEffect, useState } from 'react';
import { Landmark, ShieldCheck } from 'lucide-react';

export default function CreatorPaymentsPage() {
  const [bankForm, setBankForm] = useState({ bankName: '', accountHolderName: '', accountNumber: '', ifscCode: '' });
  const [bankSaved, setBankSaved] = useState('');
  const [bankSaving, setBankSaving] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [upiSaved, setUpiSaved] = useState('');
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/academy/creator/payouts', { headers: { Authorization: `Bearer ${token}` } }).then((response) => response.json()).then((data) => {
      if (data.success) { setBankForm({ bankName: data.data.bankDetails?.bankName || '', accountHolderName: data.data.bankDetails?.accountHolderName || '', accountNumber: '', ifscCode: data.data.bankDetails?.ifscCode || '' }); setUpiId(data.data.upiId || ''); }
    }).catch(() => undefined);
  }, []);

  const saveBankDetails = async () => {
    setBankSaving(true); setBankSaved('');
    try {
      const response = await fetch('/api/academy/creator/payouts/bank', { method: 'PUT', headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' }, body: JSON.stringify(bankForm) });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || 'Unable to save bank details.');
      setBankForm((current) => ({ ...current, accountNumber: '' }));
      setBankSaved(`Bank details saved. Account ending in ${data.data.bankDetails.accountLast4}.`);
    } catch (error) { setBankSaved(error instanceof Error ? error.message : 'Unable to save bank details.'); }
    finally { setBankSaving(false); }
  };

  const saveUpiId = async () => {
    setUpiSaved('');
    try {
      const response = await fetch('/api/academy/creator/payouts/upi', { method: 'PUT', headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ upiId }) });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || 'Unable to save UPI ID.');
      setUpiSaved('UPI ID linked successfully.');
    } catch (error) { setUpiSaved(error instanceof Error ? error.message : 'Unable to save UPI ID.'); }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Payments & bank</h1>
        <p className="text-zinc-500 mt-2">Connect your bank account to receive payouts from campaigns and affiliate commissions.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Info Column */}
        <div className="space-y-6">
          <div className="rounded-[var(--radius-xl)] border border-[var(--brand-border)] bg-[var(--brand-subtle)] p-6">
            <h3 className="text-[#F36F4C] font-semibold mb-2">Platform Fee Notice</h3>
            <p className="text-zinc-600 text-sm leading-relaxed">
              OrangeFlow.in charges a flat <strong>5% platform fee</strong> on all incoming brand sponsorships and affiliate commission payouts. This covers our AI operational costs and Razorpay processing fees. The fee is automatically deducted before transfer.
            </p>
          </div>

        </div>
      </div>

      <div className="creator-card creator-card--padded mt-8">
        <div className="mb-5 flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFF1EC] text-[#F36F4C]"><Landmark size={20} /></div><div><h2 className="text-xl font-semibold">Bank details for payouts</h2><p className="mt-1 text-sm text-zinc-500">Add the account where you want OrangeFlow to process your creator payouts.</p></div></div>
        <div className="grid gap-4 md:grid-cols-2"><input className="input-field" placeholder="Bank name" value={bankForm.bankName} onChange={(event) => setBankForm({ ...bankForm, bankName: event.target.value })} /><input className="input-field" placeholder="Account holder name" value={bankForm.accountHolderName} onChange={(event) => setBankForm({ ...bankForm, accountHolderName: event.target.value })} /><input className="input-field" placeholder="Bank account number" inputMode="numeric" value={bankForm.accountNumber} onChange={(event) => setBankForm({ ...bankForm, accountNumber: event.target.value })} /><input className="input-field uppercase" placeholder="IFSC code" maxLength={11} value={bankForm.ifscCode} onChange={(event) => setBankForm({ ...bankForm, ifscCode: event.target.value.toUpperCase() })} /></div>
        <div className="mt-4 flex flex-wrap items-center gap-3"><button type="button" className="btn-primary" disabled={bankSaving} onClick={saveBankDetails}>{bankSaving ? 'Saving…' : 'Save bank details'}</button>{bankSaved && <span className={`text-sm ${bankSaved.startsWith('Bank details saved') ? 'text-emerald-600' : 'text-rose-600'}`}>{bankSaved}</span>}</div>
        <p className="mt-3 text-xs text-zinc-500">Your full account number is encrypted and will not be shown again. Only the last four digits are displayed after saving.</p>
      </div>

      <div className="creator-card creator-card--padded mt-6">
        <div className="mb-5 flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600"><ShieldCheck size={20} /></div><div><h2 className="text-xl font-semibold">UPI payout details</h2><p className="mt-1 text-sm text-zinc-500">Link a UPI ID, including a mobile-number UPI address such as 9876543210@upi.</p></div></div>
        <div className="flex flex-col gap-3 sm:flex-row"><input className="input-field flex-1" placeholder="9876543210@upi or yourname@upi" value={upiId} onChange={(event) => setUpiId(event.target.value.trim().toLowerCase())} /><button type="button" className="btn-primary" onClick={saveUpiId}>Link UPI ID</button></div>
        {upiSaved && <p className={`mt-3 text-sm ${upiSaved.includes('successfully') ? 'text-emerald-600' : 'text-rose-600'}`}>{upiSaved}</p>}
        <p className="mt-3 text-xs text-zinc-500">Use either UPI or bank details for manual payout processing. We will verify the details before releasing funds.</p>
      </div>

      <div className="creator-card creator-card--padded mt-6">
        <h3 className="font-semibold mb-4">Recent transactions</h3>
        <div className="text-center py-8">
          <p className="text-zinc-500 text-sm">No transactions yet.</p>
          <p className="text-zinc-600 text-xs mt-1">Your course, affiliate, and payout activity will appear here.</p>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Landmark, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CreatorPaymentsPage() {
  const [onboardingStatus, setOnboardingStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS'>('IDLE');
  const [accountId, setAccountId] = useState<string | null>(null);
  
  // Dummy data for MVP onboarding
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleOnboard = async (e: React.FormEvent) => {
    e.preventDefault();
    setOnboardingStatus('LOADING');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/onboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (data.success) {
        setOnboardingStatus('SUCCESS');
        setAccountId(data.data?.accountId || data.accountId);
      } else {
        alert(data.message || 'Failed to onboard');
        setOnboardingStatus('IDLE');
      }
    } catch (err) {
      console.error(err);
      setOnboardingStatus('IDLE');
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Payments & bank</h1>
        <p className="text-zinc-500 mt-2">Connect your bank account to receive payouts from campaigns and affiliate commissions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Onboarding Form */}
        <div className="creator-card creator-card--padded">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Landmark size={20} />
            </div>
            <h2 className="text-xl font-semibold">Bank payouts setup</h2>
          </div>

          {onboardingStatus === 'SUCCESS' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Account linked</h3>
              <p className="text-zinc-500 mb-6">Your Razorpay Route account is active. You are ready to receive automated payouts.</p>
              <div className="bg-zinc-50 p-4 rounded-xl border border-black/6 inline-block text-left">
                <p className="text-xs text-zinc-500 mb-1">Razorpay Account ID</p>
                <p className="font-mono text-sm">{accountId}</p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleOnboard}>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Legal Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="As per bank records"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="creator@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Phone Number</label>
                  <input
                    required
                    type="tel"
                    placeholder="9999999999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={onboardingStatus === 'LOADING'}
                className="btn-primary w-full !rounded-xl"
              >
                {onboardingStatus === 'LOADING' ? 'Connecting to Razorpay...' : 'Connect Bank Account'} 
                <ArrowRight size={18} />
              </button>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-500">
                <ShieldCheck size={14} /> Secured by Razorpay
              </div>
            </form>
          )}
        </div>

        {/* Info Column */}
        <div className="space-y-6">
          <div className="rounded-[var(--radius-xl)] border border-[var(--brand-border)] bg-[var(--brand-subtle)] p-6">
            <h3 className="text-blue-400 font-semibold mb-2">Platform Fee Notice</h3>
            <p className="text-zinc-600 text-sm leading-relaxed">
              DynamoDM charges a flat <strong>5% platform fee</strong> on all incoming brand sponsorships and affiliate commission payouts. This covers our AI operational costs and Razorpay processing fees. The fee is automatically deducted before transfer.
            </p>
          </div>

          <div className="creator-card creator-card--padded">
            <h3 className="font-semibold mb-4">Recent transactions</h3>
            <div className="text-center py-8">
              <p className="text-zinc-500 text-sm">No transactions yet.</p>
              <p className="text-zinc-600 text-xs mt-1">Connect your account to start receiving payments.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { X, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CAMPAIGN, getCampaignPlan } from '../../../lib/campaign';
import { trackCampaignCTA } from './CampaignTracker';

const DISMISSED_KEY = 'of_diwali_float_dismissed';

export default function FloatingOfferBanner() {
  const [visible, setVisible] = useState(false);
  const proPlan = getCampaignPlan('starter');

  useEffect(() => {
    // Show after 8 seconds on first scroll, don't re-show if dismissed
    const dismissed = sessionStorage.getItem(DISMISSED_KEY);
    if (dismissed || !CAMPAIGN.active) return;

    const timeout = setTimeout(() => setVisible(true), 8000);
    return () => clearTimeout(timeout);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(DISMISSED_KEY, '1');
    setVisible(false);
  };

  if (!visible || !proPlan) return null;

  return (
    <div
      role="complementary"
      aria-label="Creator launch offer reminder"
      className="fixed bottom-6 right-4 z-[65] max-w-[300px] rounded-[20px] p-5 shadow-[0_16px_50px_rgba(0,0,0,0.25)] transition-all sm:right-6"
      style={{
        background: 'linear-gradient(160deg, #1A0800 0%, #0D0500 100%)',
        border: '1px solid rgba(255,168,0,0.35)',
      }}
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss offer reminder"
        className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-white"
      >
        <X size={13} />
      </button>

      <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: '#FFA800' }}>
        Creator Launch Offer
      </p>
      <p className="mt-1.5 text-[15px] font-black text-white">
        Creator at ₹{proPlan.offerPriceInr}{' '}
        <span className="text-[12px] font-normal line-through" style={{ color: 'rgba(255,255,255,0.35)' }}>
          ₹{proPlan.regularPriceInr}
        </span>
      </p>
      <p className="mt-1 text-[12px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
        First month free · Then ₹{proPlan.regularPriceInr}/month
      </p>

      <Link
        href="/pricing#creator"
        onClick={() => trackCampaignCTA('floating_banner_get_pro', 'pro')}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-[13px] font-bold transition"
        style={{
          background: 'linear-gradient(135deg, #FF7800, #FFA800)',
          color: '#0D0500',
          boxShadow: '0 4px 16px rgba(255,120,0,0.30)',
        }}
      >
        <Zap size={13} /> Start free for one month
      </Link>
    </div>
  );
}

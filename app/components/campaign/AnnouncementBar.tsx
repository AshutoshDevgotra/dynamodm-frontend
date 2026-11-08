'use client';

import Link from 'next/link';
import { X, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CAMPAIGN } from '../../../lib/campaign';
import { trackCampaignCTA } from './CampaignTracker';

const DISMISSED_KEY = 'of_diwali_bar_dismissed';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(DISMISSED_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(DISMISSED_KEY, '1');
    setVisible(false);
  };

  if (!CAMPAIGN.active || !visible) return null;

  return (
    <div
      role="banner"
      className="relative z-[70] flex items-center justify-between gap-3 bg-gradient-to-r from-[#1A0A00] via-[#2D1200] to-[#1A0A00] px-4 py-2.5 text-center text-[13px] font-semibold text-white"
      style={{ borderBottom: '1px solid rgba(255,168,0,0.25)' }}
    >
      {/* Left spacer for centering */}
      <span className="w-6 shrink-0" aria-hidden="true" />

      <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <span className="flex items-center gap-1.5">
          <span aria-label="diya" role="img">🪔</span>
          <span className="text-[#FFA800]">Diwali Extended Offer</span>
        </span>
        <span className="hidden sm:inline text-white/60">·</span>
        <span>Save up to 40% on OrangeFlow</span>
        <Link
          href="/pricing"
          onClick={() => trackCampaignCTA('announcement_bar_claim', 'pro')}
          className="ml-1 inline-flex items-center gap-1 rounded-full bg-[#FF7800] px-3 py-1 text-[11px] font-bold text-white transition hover:bg-[#FFA800] hover:text-black"
        >
          <Zap size={10} /> Claim Offer
        </Link>
      </p>

      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={dismiss}
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
      >
        <X size={14} />
      </button>
    </div>
  );
}

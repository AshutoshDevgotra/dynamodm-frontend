'use client';

import Link from 'next/link';
import { ArrowRight, Flame, Zap } from 'lucide-react';
import { CAMPAIGN, getCampaignPlan } from '../../../lib/campaign';
import { DiwaliKeyframes, FireworksCanvas, FloatingParticles, StringLights, Diya } from './DiwaliAnimations';
import { trackCampaignCTA } from './CampaignTracker';

export default function DiwaliHero() {
  const proPlan = getCampaignPlan('starter');
  if (!CAMPAIGN.active || !proPlan) return null;

  return (
    <>
      <DiwaliKeyframes />
      <section
        className="relative isolate overflow-hidden py-16 sm:py-24"
        aria-label="Creator Launch Offer"
        style={{
          background: 'linear-gradient(160deg, #0D0500 0%, #1A0800 40%, #0A0200 100%)',
        }}
      >
        {/* Fireworks — plays once on arrival */}
        <FireworksCanvas className="absolute inset-0 h-full w-full" />

        {/* String lights */}
        <StringLights />

        {/* Floating particles */}
        <FloatingParticles />

        {/* Ambient radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,120,0,0.18) 0%, transparent 70%)',
          }}
        />

        <div className="container relative z-10">
          {/* Festive eyebrow pill */}
          <div className="mb-8 flex justify-center">
            <span
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-bold uppercase tracking-[0.12em]"
              style={{
                borderColor: 'rgba(255,168,0,0.45)',
                background: 'rgba(255,120,0,0.12)',
                color: '#FFA800',
                animation: 'diwali-badge-pulse 2s ease-in-out infinite',
              }}
            >
              <span aria-label="diya" role="img">🪔</span>
              Creator Launch Offer — 1 Month Free
              <span aria-label="diya" role="img">🪔</span>
            </span>
          </div>

          {/* Headline */}
          <div className="mx-auto max-w-[820px] text-center">
            <h1
              style={{
                fontSize: 'clamp(2.2rem, 5.5vw, 4.4rem)',
                lineHeight: '1.02',
                letterSpacing: '-0.05em',
                fontWeight: 800,
                color: '#FFFFFF',
              }}
            >
              Your Instagram Comments{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #FF7800, #FFA800, #FFD700)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Deserve More
              </span>{' '}
              Than Manual Replies.
            </h1>

            <p className="mx-auto mt-6 max-w-[560px] text-[17px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.70)' }}>
              Automate comment-to-DM conversations, capture potential customers and save hours of repetitive work with OrangeFlow.
            </p>
          </div>

          {/* CTA row */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/pricing#creator"
              onClick={() => trackCampaignCTA('hero_unlock_40off', 'pro')}
              className="inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-bold transition"
              style={{
                background: 'linear-gradient(135deg, #FF7800 0%, #FFA800 100%)',
                color: '#0D0500',
                boxShadow: '0 8px 32px rgba(255,120,0,0.40)',
              }}
            >
              <Flame size={18} />
              Start Your Free Month
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/features"
              onClick={() => trackCampaignCTA('hero_see_how', undefined)}
              className="inline-flex items-center gap-2 rounded-full border px-7 py-4 text-[15px] font-semibold transition hover:bg-white/5"
              style={{ borderColor: 'rgba(255,168,0,0.35)', color: 'rgba(255,255,255,0.80)' }}
            >
              See How It Works
            </Link>
          </div>

          {/* Pro pricing highlight pill */}
          <div className="mt-10 flex justify-center">
            <div
              className="flex items-center gap-4 rounded-2xl border px-6 py-4"
              style={{
                background: 'rgba(255,120,0,0.08)',
                borderColor: 'rgba(255,168,0,0.30)',
              }}
            >
              <Diya className="shrink-0" />
              <div className="text-center sm:text-left">
                <p className="text-[12px] font-bold uppercase tracking-widest" style={{ color: '#FFA800' }}>
                  OrangeFlow Creator
                </p>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <span className="text-[15px] line-through" style={{ color: 'rgba(255,255,255,0.35)' }}>₹{proPlan.regularPriceInr}</span>
                  <span className="text-[28px] font-black text-white">
                    ₹{proPlan.offerPriceInr}
                    <span className="text-[14px] font-semibold" style={{ color: 'rgba(255,255,255,0.6)' }}>/month</span>
                  </span>
                  <span
                    className="rounded-full px-2.5 py-1 text-[11px] font-black"
                    style={{ background: '#FF7800', color: '#0D0500' }}
                  >
                    1ST MONTH FREE
                  </span>
                </div>
                <p className="mt-1 text-[12px]" style={{ color: 'rgba(255,168,0,0.80)' }}>
                  <Zap size={10} className="mr-1 inline-block" />
                  Free for your first month, then ₹{proPlan.regularPriceInr}/month
                </p>
              </div>
            </div>
          </div>

          {/* Social proof strip */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[12px]" style={{ color: 'rgba(255,255,255,0.40)' }}>
            {[
              '🏆 No card required for free plan',
              '⚡ Live in 5 minutes',
              '🔒 Cancel anytime',
            ].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

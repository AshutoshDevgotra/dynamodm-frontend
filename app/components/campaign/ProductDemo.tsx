'use client';

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { getCampaignPlan } from '../../../lib/campaign';
import { trackCampaignCTA } from './CampaignTracker';

export default function ProductDemo() {
  const proPlan = getCampaignPlan('pro');

  return (
    <section
      className="py-20 sm:py-28"
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF8F0 100%)' }}
      id="product-demo"
      aria-labelledby="product-demo-heading"
    >
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span
            className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-bold uppercase tracking-widest"
            style={{ background: 'rgba(255,120,0,0.07)', borderColor: 'rgba(255,120,0,0.18)', color: '#FF7800' }}
          >
            Product demo
          </span>
          <h2 id="product-demo-heading" className="text-[#111111]">
            See OrangeFlow{' '}
            <span className="font-serif text-[0.9em]">in Action</span>
          </h2>
          <p className="mt-4 text-lg text-[#6B7280]">
            One comment triggers an automated, personalised conversation. No manual effort.
          </p>
        </div>

        {/* Workflow visualisation */}
        <div
          className="mx-auto max-w-[900px] overflow-hidden rounded-[28px] border shadow-[0_20px_60px_rgba(255,120,0,0.12)]"
          style={{ background: '#0D0500', borderColor: 'rgba(255,168,0,0.22)' }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 border-b px-5 py-3.5"
            style={{ borderColor: 'rgba(255,168,0,0.15)', background: 'rgba(255,255,255,0.03)' }}
          >
            <span className="h-3 w-3 rounded-full" style={{ background: 'rgba(255,255,255,0.10)' }} />
            <span className="h-3 w-3 rounded-full" style={{ background: 'rgba(255,255,255,0.10)' }} />
            <span className="h-3 w-3 rounded-full" style={{ background: 'rgba(255,120,0,0.40)' }} />
            <span className="mx-auto rounded-md border px-14 py-1 text-[11px]" style={{ borderColor: 'rgba(255,168,0,0.15)', color: 'rgba(255,255,255,0.35)' }}>
              app.orangeflow.in — Automations
            </span>
          </div>

          <div className="grid gap-0 sm:grid-cols-[200px_1fr]">
            {/* Sidebar */}
            <div className="hidden border-r py-4 sm:block" style={{ borderColor: 'rgba(255,168,0,0.12)' }}>
              <div className="px-3 py-2 text-[12px] font-semibold" style={{ color: 'rgba(255,255,255,0.30)' }}>
                OrangeFlow
              </div>
              {[
                { label: 'Dashboard', active: false },
                { label: 'Automations', active: true },
                { label: 'Leads', active: false },
                { label: 'Analytics', active: false },
              ].map((item) => (
                <div
                  key={item.label}
                  className="mx-2 mb-0.5 rounded-lg px-3 py-2 text-[12px] font-medium"
                  style={{
                    background: item.active ? 'rgba(255,120,0,0.15)' : 'transparent',
                    color: item.active ? '#FF7800' : 'rgba(255,255,255,0.40)',
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>

            {/* Main content */}
            <div className="p-5 sm:p-7">
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <h3 className="text-[15px] font-bold text-white">Creator Launch Rule</h3>
                  <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.40)' }}>
                    Keyword: LINK · Comment → DM
                  </p>
                </div>
                <span
                  className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold"
                  style={{ background: 'rgba(255,120,0,0.20)', color: '#FFA800' }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#FFA800' }} />
                  Active
                </span>
              </div>

              {/* Stats row */}
              <div className="mb-6 grid grid-cols-3 gap-3">
                {[
                  { label: 'Triggered', value: '412' },
                  { label: 'DMs sent', value: '406' },
                  { label: 'Leads', value: '314' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl px-2 py-3 text-center"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,168,0,0.12)' }}
                  >
                    <div className="text-[18px] font-black text-white">{stat.value}</div>
                    <div className="text-[10px]" style={{ color: 'rgba(255,255,255,0.40)' }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Comment → DM workflow */}
              <div className="grid gap-3 sm:grid-cols-2">
                {/* Incoming comment */}
                <div
                  className="rounded-[14px] p-4"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#FF7800] to-[#FF4500] text-[12px] font-bold text-white">
                      P
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-white">@priya.creates</p>
                      <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.40)' }}>commented on your reel</p>
                    </div>
                  </div>
                  <div
                    className="rounded-xl rounded-tl-sm px-3 py-2.5 text-[13px] text-white"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                  >
                    DIWALI 🪔 send me the offer link!
                  </div>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide" style={{ color: '#FFA800' }}>
                    ✓ Trigger matched
                  </p>
                </div>

                {/* Auto DM sent */}
                <div
                  className="rounded-[14px] p-4"
                  style={{ background: 'rgba(255,120,0,0.12)', border: '1px solid rgba(255,168,0,0.25)' }}
                >
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide" style={{ color: '#FFA800' }}>
                    Auto DM sent
                  </p>
                  <div
                    className="rounded-xl rounded-tr-sm px-3 py-2.5 text-[13px] text-white"
                    style={{ background: 'rgba(255,120,0,0.25)' }}
                  >
                    Hey! Here's your Creator offer link — free for your first month, then ₹99/month.
                    Get started at orangeflow.in/pricing 🎉
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-[10px]" style={{ color: 'rgba(255,255,255,0.40)' }}>
                    <span>0.8s delivery</span>
                    <span
                      className="rounded-full px-2 py-0.5"
                      style={{ background: 'rgba(255,120,0,0.20)', color: '#FFA800' }}
                    >
                      Lead saved ✓
                    </span>
                  </div>
                </div>
              </div>

              {/* Config preview */}
              <div
                className="mt-4 rounded-[14px] p-4"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Automation configuration
                </p>
                <div className="grid gap-2 text-[12px] sm:grid-cols-2">
                  {[
                    ['Trigger', 'Comment contains "LINK"'],
                    ['Reply type', 'Direct Message'],
                    ['Message', 'Custom Creator offer message'],
                    ['Lead capture', 'Enabled'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center gap-2">
                      <Check size={12} style={{ color: '#FFA800' }} />
                      <span style={{ color: 'rgba(255,255,255,0.40)' }}>{k}:</span>
                      <span className="font-medium text-white">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href={proPlan ? `/signup?plan=pro&campaign=diwali-extended-2026` : '/signup'}
            onClick={() => trackCampaignCTA('demo_start_automating', 'pro')}
            className="inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-bold transition"
            style={{
              background: 'linear-gradient(135deg, #FF7800 0%, #FFA800 100%)',
              color: '#0D0500',
              boxShadow: '0 8px 24px rgba(255,120,0,0.30)',
            }}
          >
            Start Automating Today
            <ArrowRight size={16} />
          </Link>
          {proPlan && (
            <p className="mt-3 text-[13px] text-[#6B7280]">
              Pro plan at ₹{proPlan.offerPriceInr}/month for your first {proPlan.introductoryCycles} months
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

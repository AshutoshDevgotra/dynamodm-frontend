'use client';

import { AlertCircle, CheckCircle2, Clock, MessageSquareOff, Zap } from 'lucide-react';

const problems = [
  {
    icon: Clock,
    text: 'Hours spent manually replying to the same questions under every post',
  },
  {
    icon: MessageSquareOff,
    text: 'Interested buyers comment and move on before you reply',
  },
  {
    icon: AlertCircle,
    text: 'Potential customers never get the link, product, or resource they asked for',
  },
  {
    icon: AlertCircle,
    text: 'No way to capture leads from the conversation — the comment disappears',
  },
];

const solutionSteps = [
  {
    n: '1',
    label: 'Comment triggers',
    body: 'A user comments on your Instagram post with your configured keyword.',
    color: '#FF7800',
  },
  {
    n: '2',
    label: 'OrangeFlow detects it',
    body: 'The automation rule matches the keyword instantly — no manual monitoring needed.',
    color: '#FFA800',
  },
  {
    n: '3',
    label: 'Automated DM sent',
    body: 'The configured message, link, PDF or reply is delivered directly to their inbox.',
    color: '#FFD700',
  },
  {
    n: '4',
    label: 'Lead captured',
    body: 'The conversation is logged as a lead you can follow up with, tag, and export.',
    color: '#FF7800',
  },
];

/* Instagram comment mock */
function CommentMock({ user, text, time }: { user: string; text: string; time: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-3.5 shadow-sm">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF7800] to-[#FF4500] text-[13px] font-bold text-white">
        {user[0]}
      </div>
      <div className="min-w-0">
        <p className="text-[12px] font-semibold text-[#111111]">{user}</p>
        <p className="mt-0.5 text-[13px] text-[#374151]">{text}</p>
        <p className="mt-1 text-[10px] text-[#9CA3AF]">{time}</p>
      </div>
    </div>
  );
}

export default function ProblemSolution() {
  return (
    <section
      className="py-20 sm:py-28"
      style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, #FFFFFF 100%)' }}
      aria-labelledby="problem-solution-heading"
    >
      <div className="container">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span
            className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-bold uppercase tracking-widest"
            style={{ background: 'rgba(255,120,0,0.08)', borderColor: 'rgba(255,120,0,0.20)', color: '#FF7800' }}
          >
            <Zap size={12} /> The Instagram problem every creator faces
          </span>
          <h2 id="problem-solution-heading" className="mt-4 text-[#111111]">
            Growing engagement.{' '}
            <span className="font-serif text-[0.9em]">Lost conversions.</span>
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* ── LEFT: THE PROBLEM ── */}
          <div
            className="relative overflow-hidden rounded-[28px] p-8 sm:p-10"
            style={{ background: '#FFF0EE', border: '1px solid #FFD5D0' }}
          >
            {/* Red warning glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full opacity-30"
              style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.25), transparent 70%)', transform: 'translate(40%, -40%)' }}
            />

            <div className="mb-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#DC2626]">⚠ The Problem</p>
              <h3 className="mt-2 text-[#111111]">
                Your Instagram engagement is growing.{' '}
                <span className="font-serif text-[0.9em]">But are you converting it?</span>
              </h3>
            </div>

            {/* Simulated comment stream */}
            <div className="mb-6 space-y-2.5">
              <CommentMock user="@priya.sharma" text="Where can I buy this? 🔥" time="2 minutes ago" />
              <CommentMock user="@amit.creator" text="LINK please! 👇" time="5 minutes ago" />
              <CommentMock user="@riya_styles" text="Can you share the recipe?" time="12 minutes ago" />
            </div>

            {/* Problem indicators */}
            <ul className="space-y-3.5" aria-label="Problems with manual replies">
              {problems.map((p) => {
                const Icon = p.icon;
                return (
                  <li key={p.text} className="flex items-start gap-3 text-[14px] text-[#6B7280]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FEE2E2]">
                      <Icon size={11} className="text-[#DC2626]" />
                    </span>
                    {p.text}
                  </li>
                );
              })}
            </ul>

            {/* Manual reply label */}
            <div
              className="mt-6 rounded-xl border border-[#FECACA] bg-[#FEF2F2] p-3.5 text-[13px] text-[#B91C1C]"
            >
              <p className="font-semibold">You're still manually replying to every comment.</p>
              <p className="mt-1 text-[#EF4444]">Meanwhile, your potential customers lose interest and scroll on.</p>
            </div>
          </div>

          {/* ── RIGHT: THE SOLUTION ── */}
          <div
            className="relative overflow-hidden rounded-[28px] p-8 sm:p-10"
            style={{ background: '#0D0500', border: '1px solid rgba(255,168,0,0.25)' }}
          >
            {/* Orange glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full opacity-30"
              style={{ background: 'radial-gradient(circle, rgba(255,120,0,0.45), transparent 70%)', transform: 'translate(40%, -40%)' }}
            />

            <div className="mb-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: '#FFA800' }}>
                ✅ The OrangeFlow Solution
              </p>
              <h3 className="mt-2" style={{ color: '#FFFFFF' }}>
                Let OrangeFlow handle{' '}
                <span
                  style={{
                    background: 'linear-gradient(90deg, #FF7800, #FFD700)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  the repetitive conversations.
                </span>
              </h3>
            </div>

            {/* Workflow steps */}
            <ol className="mb-6 space-y-4" aria-label="How OrangeFlow automates replies">
              {solutionSteps.map((step, idx) => (
                <li key={step.n} className="flex items-start gap-3.5">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-black"
                    style={{ background: step.color, color: '#0D0500' }}
                  >
                    {step.n}
                  </span>
                  <div>
                    <p className="text-[13px] font-bold text-white">{step.label}</p>
                    <p className="mt-0.5 text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.60)' }}>
                      {step.body}
                    </p>
                  </div>
                  {idx < solutionSteps.length - 1 && (
                    <div aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>

            {/* DM Preview */}
            <div
              className="rounded-xl p-4"
              style={{ background: 'rgba(255,120,0,0.10)', border: '1px solid rgba(255,168,0,0.20)' }}
            >
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: '#FFA800' }}>
                Automated DM preview
              </p>
              <div className="flex items-start gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: 'rgba(255,120,0,0.3)' }}>
                  <span className="text-[14px]">🤖</span>
                </div>
                <div className="rounded-2xl rounded-tl-sm px-3.5 py-3 text-[13px] text-white" style={{ background: 'rgba(255,255,255,0.10)' }}>
                  Hey Priya! Here's the link you asked for 👉 orangeflow.in/priya
                  <br />
                  <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.50)' }}>Sent in 1.2s · Lead saved ✓</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-[13px]" style={{ color: '#FFA800' }}>
              <CheckCircle2 size={16} />
              <span>Every comment becomes a potential lead. Automatically.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

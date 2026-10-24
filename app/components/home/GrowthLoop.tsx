'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Link2, MessageCircle, ShoppingBag, Users } from 'lucide-react';

const workflows = [
  { id: 'followers', label: 'Grow followers', icon: Users, eyebrow: 'Follow-gated delivery', title: 'Turn “send me the link” into a follow and a conversation.', body: 'Ask people to follow your account first, then automatically send the promised resource, offer, or link when they complete the step.', steps: ['Comment trigger', 'Follow request', 'DM with the link'], accent: 'bg-[#FF5A1F]' },
  { id: 'affiliate', label: 'Earn commissions', icon: Link2, eyebrow: 'Affiliate-ready storefront', title: 'Share recommendations that keep earning after you post.', body: 'Add affiliate URLs to your storefront or automated replies, share them at the perfect moment, and track clicks so you know what converts.', steps: ['Add affiliate link', 'Share in DM', 'Track clicks + earnings'], accent: 'bg-[#ff7544]' },
  { id: 'products', label: 'Sell your offers', icon: ShoppingBag, eyebrow: 'Creator storefront', title: 'Give every audience member a clear next step.', body: 'Bundle digital products, lead magnets, coaching, and social links in one simple page that your automations can send instantly.', steps: ['Build your page', 'Capture the lead', 'Convert the sale'], accent: 'bg-[#e04810]' },
];

export default function GrowthLoop() {
  const [activeId, setActiveId] = useState(workflows[0].id);
  const active = workflows.find((workflow) => workflow.id === activeId) ?? workflows[0];
  const Icon = active.icon;

  return (
    <div className="grid gap-6 overflow-hidden rounded-[32px] border border-black/6 bg-white p-3 shadow-[0_16px_50px_rgba(15,23,42,0.06)] md:grid-cols-[0.8fr_1.2fr] md:p-4">
      <div className="gradient-creator flex flex-col justify-between rounded-[24px] p-5 text-white sm:p-7 shadow-lg shadow-[#FF5A1F]/15">
        <div>
          <span className="badge mb-6 border-white/20 bg-white/10 text-white backdrop-blur-sm">
            <MessageCircle size={13} /> Your growth loop
          </span>
          <h3 className="max-w-sm text-2xl font-semibold tracking-tight !text-white sm:text-3xl">
            One comment can start a much bigger journey.
          </h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/80">
            Use one trigger to grow your audience, build trust, and create a path to revenue.
          </p>
        </div>
        <div className="mt-8 flex items-center gap-2 text-xs text-white/70">
          <span className="h-2 w-2 rounded-full bg-[#FF5A1F] shadow-[0_0_8px_#FF5A1F]" /> Works with your existing Instagram content
        </div>
      </div>

      <div className="min-w-0 p-2 sm:p-5">
        <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Growth workflows">
          {workflows.map((workflow) => {
            const TabIcon = workflow.icon;
            const selected = workflow.id === active.id;
            return (
              <button
                key={workflow.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveId(workflow.id)}
                className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full px-4 text-xs font-semibold transition ${
                  selected
                    ? 'bg-[#FF5A1F] text-white shadow-sm shadow-[#FF5A1F]/20'
                    : 'bg-[#fff7f2] text-zinc-700 hover:bg-[#ffede2]'
                }`}
              >
                <TabIcon size={14} /> {workflow.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 min-w-0">
          <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-md shadow-[#FF5A1F]/20 ${active.accent}`}>
            <Icon size={20} />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-400">{active.eyebrow}</p>
          <h4 className="mt-2 max-w-xl text-xl font-semibold tracking-tight sm:text-2xl">{active.title}</h4>
          <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">{active.body}</p>
        </div>

        <div className="mt-7 grid gap-2 sm:grid-cols-3">
          {active.steps.map((step, index) => (
            <div key={step} className="flex min-w-0 items-center gap-2 rounded-xl border border-black/6 bg-[#fffaf5] px-3 py-3 text-xs font-semibold text-zinc-700">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF5A1F] text-[10px] text-white">
                {index + 1}
              </span>
              <span className="truncate">{step}</span>
              {index === active.steps.length - 1 && <Check size={14} className="ml-auto shrink-0 text-[#FF5A1F]" />}
            </div>
          ))}
        </div>

        <Link href="/signup" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#FF5A1F] hover:text-[#c43a08]">
          Build your workflow <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}

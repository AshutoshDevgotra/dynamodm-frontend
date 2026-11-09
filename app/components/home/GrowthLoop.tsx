'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  Check,
  Link2,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  Store,
  Users,
} from 'lucide-react';

function InstagramMark() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const workflows = [
  {
    id: 'auto-dm',
    label: 'Auto DM',
    icon: MessageCircle,
    eyebrow: 'Instagram automation',
    title: 'Turn a comment into a helpful conversation.',
    body: 'Set a keyword, write a friendly reply, and deliver the right link or resource when someone comments on your post.',
    steps: ['Choose a keyword', 'Write your reply', 'Send the right link'],
    surface: 'bg-gradient-to-br from-orange-50/90 via-white to-amber-50/50 border border-orange-500/15',
    accent: 'bg-gradient-to-br from-[#FF782D] to-[#FF5A1F]',
    previewTitle: 'Your automation',
    previewLabel: 'Instagram comment',
    previewMessage: 'Comment “LINK” and I’ll send you the details.',
    previewReply: 'Hey! Here’s the link you asked for.',
    previewAction: 'Send product link',
  },
  {
    id: 'affiliate',
    label: 'Affiliate links',
    icon: Link2,
    eyebrow: 'Affiliate hub',
    title: 'Make your recommendations easy to shop.',
    body: 'Organize affiliate links in your personal shop and share the right product when your audience asks for it.',
    steps: ['Add affiliate links', 'Organize your shop', 'Share in a DM'],
    surface: 'bg-gradient-to-br from-amber-50/90 via-white to-orange-50/50 border border-amber-500/15',
    accent: 'bg-gradient-to-br from-[#F59E0B] to-[#D97706]',
    previewTitle: 'Your affiliate shelf',
    previewLabel: 'Popular destinations',
    previewMessage: 'Meesho · Myntra · Nike',
    previewReply: 'Amazon · Flipkart · your own links',
    previewAction: 'Add your affiliate link',
  },
  {
    id: 'ai-context',
    label: 'AI context bot',
    icon: Bot,
    eyebrow: 'AI with your brand context',
    title: 'Give every customer a thoughtful answer.',
    body: 'Add your product details, FAQs, and brand voice so the assistant can respond to common questions with useful context.',
    steps: ['Add your brand info', 'Understand the question', 'Reply with context'],
    surface: 'bg-gradient-to-br from-sky-50/90 via-white to-orange-50/30 border border-sky-500/15',
    accent: 'bg-gradient-to-br from-[#F36F4C] to-[#D9573A]',
    previewTitle: 'Brand assistant',
    previewLabel: 'Customer asks',
    previewMessage: 'Is this available in another size?',
    previewReply: 'I can help with that. Here are the sizes currently listed in your shop.',
    previewAction: 'Answer from your context',
  },
  {
    id: 'brand-collabs',
    label: 'Brand collabs',
    icon: Sparkles,
    eyebrow: 'Creator-brand collaborations',
    title: 'Find collaborations that fit your creator brand.',
    body: 'Connect your Instagram presence and explore relevant opportunities, with House of Orange bringing influencer-marketing experience to the journey.',
    steps: ['Connect Instagram', 'Explore opportunities', 'Build brand partnerships'],
    surface: 'bg-gradient-to-br from-rose-50/90 via-white to-orange-50/30 border border-rose-500/15',
    accent: 'bg-gradient-to-br from-[#F43F5E] to-[#E11D48]',
    previewTitle: 'Collaboration brief',
    previewLabel: 'A better-fit partnership',
    previewMessage: 'Share your audience, content style, and interests.',
    previewReply: 'Discover opportunities that align with your creator profile.',
    previewAction: 'Powered by creator insight',
  },
  {
    id: 'creator-shop',
    label: 'Creator shop',
    icon: Store,
    eyebrow: 'Your personal storefront',
    title: 'Bring your products and recommendations together.',
    body: 'Create a simple shop for your products, digital offers, and affiliate picks, with space for the image, description, and link for each item.',
    steps: ['Add product details', 'Choose your links', 'Share your shop'],
    surface: 'bg-gradient-to-br from-emerald-50/90 via-white to-orange-50/30 border border-emerald-500/15',
    accent: 'bg-gradient-to-br from-[#10B981] to-[#059669]',
    previewTitle: 'Your creator shop',
    previewLabel: 'Featured picks',
    previewMessage: 'Everyday essentials · Digital guide',
    previewReply: 'Your products · Affiliate recommendations',
    previewAction: 'Customize your storefront',
  },
  {
    id: 'product-links',
    label: 'Product links',
    icon: ShoppingBag,
    eyebrow: 'From reel to the right product',
    title: 'Send the exact product someone came for.',
    body: 'Match a comment trigger to a shoe, outfit, or other product and share its destination—your store, Shopify, or a marketplace link.',
    steps: ['Set a product keyword', 'Add its destination', 'Send it in a DM'],
    surface: 'bg-gradient-to-br from-orange-50/90 via-white to-amber-50/40 border border-orange-500/15',
    accent: 'bg-gradient-to-br from-[#FF782D] to-[#FF5A1F]',
    previewTitle: 'Product reply',
    previewLabel: 'Reel comment',
    previewMessage: '“Nike Jordan 1”',
    previewReply: 'Send the matching product page from your shop or marketplace.',
    previewAction: 'Link to your chosen destination',
  },
];

export default function GrowthLoop() {
  const [activeId, setActiveId] = useState(workflows[0].id);
  const active = workflows.find((workflow) => workflow.id === activeId) ?? workflows[0];
  const Icon = active.icon;

  return (
    <div className="overflow-hidden rounded-[32px] border border-neutral-200/80 bg-neutral-50/60 p-3 shadow-lg shadow-neutral-900/5 sm:p-5">
      <div className="mb-4 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Creator growth tools">
        {workflows.map((workflow) => {
          const TabIcon = workflow.icon;
          const selected = workflow.id === active.id;
          return (
            <button
              key={workflow.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="growth-workflow-panel"
              onClick={() => setActiveId(workflow.id)}
              className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5A1F] ${
                selected
                  ? 'bg-gradient-to-r from-[#FF782D] to-[#FF5A1F] text-white shadow-md shadow-orange-500/20'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 border border-neutral-200/80 shadow-2xs'
              }`}
            >
              <TabIcon size={15} /> {workflow.label}
            </button>
          );
        })}
      </div>

      <div id="growth-workflow-panel" role="tabpanel" className={`grid overflow-hidden rounded-[26px] ${active.surface} md:min-h-[390px] md:grid-cols-[0.92fr_1.08fr]`}>
        <div className="flex flex-col items-start justify-center p-6 sm:p-9 lg:p-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200/80 bg-white/80 px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-2xs">
            <Icon size={14} className="text-[#FF5A1F]" /> {active.eyebrow}
          </span>
          <h3 className="mt-6 max-w-lg text-[2rem] leading-[1.08] tracking-[-0.04em] text-neutral-900 sm:text-[2.6rem]">{active.title}</h3>
          <p className="mt-4 max-w-lg text-[15px] leading-7 text-neutral-600">{active.body}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {active.steps.map((step, index) => (
              <span key={step} className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/85 px-3 py-2 text-xs font-semibold text-neutral-700 shadow-2xs">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/10 text-[10px] font-bold text-[#FF5A1F]">{index + 1}</span>
                {step}
              </span>
            ))}
          </div>
          <Link href="/signup" className="mt-8 btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-orange-500/20">
            Get started <ArrowRight size={15} />
          </Link>
        </div>

        <div className="flex items-center justify-center p-5 sm:p-8 md:p-10">
          <div className="w-full max-w-[440px] rounded-[28px] border border-neutral-200/80 bg-white p-4 shadow-[0_20px_50px_rgba(255,90,31,0.08)] sm:p-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-2xl text-white shadow-sm ${active.accent}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900">{active.previewTitle}</p>
                  <p className="text-xs text-neutral-500">A preview of your workflow</p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 text-[10px] font-semibold text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Ready</span>
            </div>

            <div className="mt-5 space-y-3">
              <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-neutral-100/80 border border-neutral-200/50 p-3.5">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.1em] text-neutral-400">{active.previewLabel}</p>
                <p className="text-sm leading-6 text-neutral-800">{active.previewMessage}</p>
              </div>
              <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-orange-50 to-orange-100/60 border border-orange-500/20 p-3.5">
                <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#FF5A1F]"><InstagramMark /> Orange Flow</div>
                <p className="text-sm leading-6 text-neutral-900 font-medium">{active.previewReply}</p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-neutral-200/80 bg-neutral-50/60 p-3.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700"><Check size={14} className="text-emerald-600" /> {active.previewAction}</div>
              <div className="mt-3 flex gap-2">
                <span className="h-2 flex-1 rounded-full bg-orange-500/20" />
                <span className="h-2 w-1/3 rounded-full bg-orange-500/40" />
              </div>
            </div>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-neutral-500"><Users size={12} /> Thoughtful tools for your next conversation</p>
          </div>
        </div>
      </div>
    </div>
  );
}

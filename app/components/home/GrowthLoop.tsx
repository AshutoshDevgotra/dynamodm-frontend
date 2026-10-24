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
    surface: 'bg-[#F1DDD0]',
    accent: 'bg-[#A94D2D]',
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
    surface: 'bg-[#E9E1D1]',
    accent: 'bg-[#75643C]',
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
    surface: 'bg-[#E1E5D8]',
    accent: 'bg-[#53634A]',
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
    surface: 'bg-[#E9DDE2]',
    accent: 'bg-[#805466]',
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
    surface: 'bg-[#F0E3D3]',
    accent: 'bg-[#A66A40]',
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
    surface: 'bg-[#E5DFD5]',
    accent: 'bg-[#665844]',
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
    <div className="overflow-hidden rounded-[32px] border border-[#E9E1D7] bg-[#FBF8F4] p-3 shadow-[0_24px_70px_rgba(76,55,38,0.10)] sm:p-5">
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
              className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A94D2D] ${
                selected
                  ? 'bg-[#332B25] text-white shadow-sm'
                  : 'bg-white text-[#61564D] hover:bg-[#F1E8DE]'
              }`}
            >
              <TabIcon size={15} /> {workflow.label}
            </button>
          );
        })}
      </div>

      <div id="growth-workflow-panel" role="tabpanel" className={`grid overflow-hidden rounded-[26px] ${active.surface} md:min-h-[390px] md:grid-cols-[0.92fr_1.08fr]`}>
        <div className="flex flex-col items-start justify-center p-6 sm:p-9 lg:p-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/65 px-3 py-1.5 text-xs font-semibold text-[#65584D]">
            <Icon size={14} /> {active.eyebrow}
          </span>
          <h3 className="mt-6 max-w-lg text-[2rem] leading-[1.08] tracking-[-0.04em] text-[#29231E] sm:text-[2.6rem]">{active.title}</h3>
          <p className="mt-4 max-w-lg text-[15px] leading-7 text-[#5F554D]">{active.body}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {active.steps.map((step, index) => (
              <span key={step} className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-2 text-xs font-semibold text-[#50463E]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] text-[#8D563A]">{index + 1}</span>
                {step}
              </span>
            ))}
          </div>
          <Link href="/signup" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#332B25] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#514237]">
            Get started <ArrowRight size={15} />
          </Link>
        </div>

        <div className="flex items-center justify-center p-5 sm:p-8 md:p-10">
          <div className="w-full max-w-[440px] rounded-[28px] border border-white/80 bg-white/90 p-4 shadow-[0_20px_50px_rgba(67,48,33,0.14)] sm:p-6">
            <div className="flex items-center justify-between border-b border-[#EEE8E1] pb-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-2xl text-white ${active.accent}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#332B25]">{active.previewTitle}</p>
                  <p className="text-xs text-[#887C71]">A preview of your workflow</p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-[#EDF2E8] px-2.5 py-1 text-[10px] font-semibold text-[#53634A]"><span className="h-1.5 w-1.5 rounded-full bg-[#6B8B58]" /> Ready</span>
            </div>

            <div className="mt-5 space-y-3">
              <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-[#F5F1EB] p-3.5">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#96887B]">{active.previewLabel}</p>
                <p className="text-sm leading-6 text-[#443A32]">{active.previewMessage}</p>
              </div>
              <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm bg-[#EDE5DA] p-3.5">
                <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#8D563A]"><InstagramMark /> Orange Flow</div>
                <p className="text-sm leading-6 text-[#443A32]">{active.previewReply}</p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-[#EEE8E1] bg-[#FCFAF7] p-3.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#544A41]"><Check size={14} className="text-[#71845E]" /> {active.previewAction}</div>
              <div className="mt-3 flex gap-2">
                <span className="h-2 flex-1 rounded-full bg-[#EAE2D8]" />
                <span className="h-2 w-1/3 rounded-full bg-[#D7C7B5]" />
              </div>
            </div>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-[#8A7D71]"><Users size={12} /> Thoughtful tools for your next conversation</p>
          </div>
        </div>
      </div>
    </div>
  );
}

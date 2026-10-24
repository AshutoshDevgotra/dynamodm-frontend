import Link from 'next/link';
import { ArrowRight, BarChart3, Bot, Check, MessageCircle, Shield, Sparkles, Store, Target, Users } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FeatureCard from './components/home/FeatureCard';
import PricingCard from './components/home/PricingCard';
import HeroMockup from './components/home/HeroMockup';
import GrowthLoop from './components/home/GrowthLoop';

const features = [
  { icon: MessageCircle, title: 'Follow-to-DM growth', description: 'Ask for a follow before delivering the promised guide, offer, or link—then keep the conversation moving.' },
  { icon: Bot, title: 'AI brand conversations', description: 'Let AI understand customer intent and reply using your products, policies, offers, and brand context.' },
  { icon: Store, title: 'Link-in-bio store', description: 'One storefront for digital products, affiliate links, socials, coaching, and lead magnets.' },
  { icon: Users, title: 'Lead capture', description: 'Every meaningful conversation becomes a lead you can tag, export, and follow up with.' },
  { icon: BarChart3, title: 'Clicks & commissions', description: 'See DMs sent, link clicks, leads, and conversions without a spreadsheet.' },
  { icon: Target, title: 'Smart keywords', description: 'Exact match, contains, starts with, or regex — one rule can cover a campaign.' },
  { icon: Shield, title: 'Reliable by design', description: 'Thoughtful delivery, safe pacing, and opt-out safeguards keep every conversation helpful.' },
];

const steps = [
  { n: '01', title: 'Connect Instagram', body: 'Bring your Creator or Business account into your workspace in a few clicks.' },
  { n: '02', title: 'Set a keyword', body: 'Write the DM, attach a link or PDF, and choose when it fires.' },
  { n: '03', title: 'Convert conversations', body: 'Orange Flow sends the link, answer, or next step and logs the lead for you.' },
];

const plans = [
  { name: 'Free', price: '₹0', period: '/mo', description: 'Try it with 10 DMs', features: ['1 automation rule', '10 DMs / month', 'Basic analytics', 'Policy-aware send pacing'], cta: 'Start free', highlighted: false, href: '/signup' },
  { name: 'Starter', price: '₹99', period: '/mo', description: 'For creators getting started', features: ['3 automation rules', '500 leads / month', '1,000 DMs / month', '7-day analytics', 'Email support'], cta: 'Choose Starter', highlighted: true, badge: 'Best value', href: '/signup?plan=starter' },
  { name: 'Pro', price: '₹499', period: '/mo', description: 'For growing creators', features: ['10 automation rules', '5,000 leads / month', '10,000 DMs / month', 'Policy-aware send pacing', 'PDF attachments'], cta: 'Choose Pro', highlighted: false, href: '/signup?plan=pro' },
  { name: 'Premium', price: '₹999', period: '/mo', description: 'For agencies & power users', features: ['Unlimited automations', 'Unlimited leads & DMs', 'AI-assisted message review', 'Consent and opt-out safeguards', 'Custom branding'], cta: 'Choose Premium', highlighted: false, href: '/signup?plan=premium' },
];

const faqs = [
  { q: 'What is Orange Flow?', a: 'Orange Flow is a growth workspace for creators and businesses. Automate Instagram replies, give AI your brand context, capture leads, and share the right product or link.' },
  { q: 'Can I automatically reply to Instagram comments?', a: 'Yes. Set a keyword trigger, write your reply, and send a relevant link or resource to people who comment on your content.' },
  { q: 'Can I create my own product and affiliate shop?', a: 'Yes. Add product images, descriptions, and destination links to create a simple creator storefront for your own products and affiliate recommendations.' },
  { q: 'Which affiliate platforms can I link to?', a: 'You can add affiliate links from programs you participate in, including destinations such as Meesho, Myntra, Nike, Flipkart, and Amazon. Availability and commission terms are set by each platform.' },
  { q: 'Can I share a specific product from a reel?', a: 'You can connect a keyword to a specific product link, such as a Shopify store page or a marketplace listing, and deliver that link in an Instagram reply.' },
  { q: 'What does the AI context bot use to answer?', a: 'It uses the product details, FAQs, policies, and brand voice you provide to help answer common customer questions. You remain in control of your brand information.' },
  { q: 'How do brand collaborations work?', a: 'Creators can connect their Instagram presence and explore collaboration opportunities. House of Orange brings influencer-marketing experience to the creator and brand journey.' },
  { q: 'Is there a free plan?', a: 'Yes. You can try the workflow with 10 DMs per month. Upgrade from ₹99 when you need more volume.' },
  { q: 'Do I need an Instagram Business or Creator account?', a: 'Instagram automation requires an eligible Business or Creator account. Personal accounts are not supported for these workflows.' },
];

export default function HomePage() {
  return (
    <div className="landing-page min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="hero-section pt-[68px]">
        <div className="container">
          <div className="mx-auto max-w-[860px] pb-10 pt-20 text-center sm:pt-28">

            {/* Eyebrow */}
            <span className="hero-eyebrow mb-6 inline-flex">
              <Sparkles size={13} />
              Creator economy growth engine
            </span>

            {/* Headline — Sora 800, tight */}
            <h1 className="mx-auto max-w-[780px]">
              Turn every comment into{' '}
              <span className="text-brand">revenue.</span>
              <span className="block mt-1 font-serif text-[0.88em] font-normal not-italic leading-[1.12] tracking-[-0.025em] text-[#111111]/80">
                The smarter way to grow.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-[560px] text-[17px] leading-[1.75] text-[#6B7280]">
              Automate Instagram replies, give AI your brand context, capture leads, and make every recommendation shoppable — from one workspace.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/signup"
                className="btn-primary gap-2.5 !px-7 !py-3.5 text-[15px]"
              >
                Start for Free
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/features"
                className="btn-outline !px-7 !py-3.5 text-[15px]"
              >
                See how it works
              </Link>
            </div>

            {/* Social proof strip */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[13px] text-[#9ca3af]">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8B6B87]" />
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8B6B87]" />
                Works with Business & Creator accounts
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8B6B87]" />
                Live in 5 minutes
              </span>
            </div>
          </div>

          {/* Product preview — directly below hero text, no excessive gap */}
          <HeroMockup />
        </div>
      </section>

      {/* Press / social proof strip */}
      <section aria-label="Featured in" className="landing-compact-section border-y border-[#EEE7DF] bg-white py-8 sm:py-10">
        <div className="container">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9A8D82]">Featured in</p>
          <div className="mt-6 grid grid-cols-2 items-center gap-x-8 gap-y-5 text-center text-[#8C8178] sm:grid-cols-4 lg:grid-cols-8">
            {['BW Businessworld', 'techgraph', 'Business Today', 'Business Standard', 'The Economic Times', 'ThePrint', 'Entrepreneur', 'Forbes'].map((publication) => (
              <span key={publication} className="font-serif text-[14px] font-semibold leading-tight opacity-80 sm:text-[15px]">{publication}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Built for callout ─────────────────────────────────────── */}
      <section className="landing-compact-section container py-8">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 rounded-2xl border border-[#E9E1D7] bg-[#F8F4EE] px-6 py-5 text-sm text-[#71655B]">
          <span className="font-semibold text-[#111111]">Built for growth</span>
          <span>Helpful conversations</span>
          <span>Creator monetization</span>
          <span>Made for teams</span>
        </div>
      </section>

      {/* ── Two-column value proposition ─────────────────────────── */}
      <section className="container py-20 sm:py-28">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="badge badge-brand mb-5">
            <Sparkles size={13} /> One platform, two growth engines
          </span>
          <h2>
            Built for creators.{' '}
            <span className="font-serif text-[0.9em]">Ready for business.</span>
          </h2>
          <p className="mt-5 text-lg text-[#6B7280]">Turn a comment into a useful reply, a product link, a qualified lead, or a sale — without losing the human context.</p>
        </div>

        <div className="grid gap-7 lg:grid-cols-2">
          {/* Creator card */}
          <div className="rounded-[28px] border border-[#F0D6C6] bg-[#FFEFE4] p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4D8C8] text-[#C87552] shadow-md shadow-[#D88963]/20">
              <Store size={22} />
            </div>
            <h3 className="text-[1.4rem]">For creators: make every comment shoppable</h3>
            <p className="mt-3 text-[16px] leading-[1.75] text-[#6B7280]">
              Someone comments &quot;LINK&quot; or asks where to buy. Orange Flow sends the product, storefront, affiliate, Amazon, Flipkart, or Shopify link directly in the DM and captures the person as a lead.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#8B6B87]">
              <span className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5">Comment trigger</span>
              <ArrowRight size={13} />
              <span className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5">Product link</span>
              <ArrowRight size={13} />
              <span className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5">Lead captured</span>
            </div>
          </div>

          {/* Business card */}
          <div className="rounded-[28px] border border-[#F0D6C6] bg-[#FFEFE4] p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E6A27F] text-[#4A3026]">
              <Bot size={22} />
            </div>
            <h3 className="text-[1.4rem]">For businesses: let AI understand intent</h3>
            <p className="mt-3 text-[16px] leading-[1.75] text-[#6B7280]">
              When someone comments or messages your brand page, AI analyzes the question and replies using the context you add — your products, prices, policies, FAQs, offers, and tone of voice.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#705567]">
              <span className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5">Customer question</span>
              <ArrowRight size={13} className="text-[#8B6B87]" />
              <span className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5">AI + brand context</span>
              <ArrowRight size={13} className="text-[#8B6B87]" />
              <span className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5">Helpful answer</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature grid ─────────────────────────────────────────── */}
      <section className="growth-grid-section py-20 sm:py-28">
        <div className="container">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="badge mb-5 border-white/15 bg-white/10 text-[#F0DED2]"><Sparkles size={13} /> Built for growth</span>
            <h2 className="!text-[#F7F1F5]">
              Reach more people{' '}
              <span className="font-serif text-[0.9em] text-[#E3C1AD]">with tools built for growth.</span>
            </h2>
            <p className="mt-5 text-lg text-[#F0DED2]">
              Turn Instagram comments and DMs into conversations, qualified leads, and sales.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.slice(0, 3).map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Growth tools carousel ────────────────────────────────── */}
      <section id="growth-tools" className="container scroll-mt-24 py-20 sm:py-28">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="badge badge-brand mb-5">
            <Sparkles size={13} /> Your creator growth toolkit
          </span>
          <h2>
            More ways to grow.{' '}
            <span className="font-serif text-[0.88em]">One connected journey.</span>
          </h2>
          <p className="mt-5 text-lg text-[#6B7280]">Choose a tool to explore how Instagram conversations, creator shops, affiliate links, and brand opportunities can work together.</p>
        </div>
        <GrowthLoop />
      </section>

      {/* ── Creator trust and story placeholders ──────────────────── */}
      <section className="bg-[#F4EEE6] py-20 sm:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="badge mb-5 border-[#D8C8B7] bg-white/70 text-[#735A46]">Made for India&apos;s creator economy</span>
            <h2>Trusted by creators{' '}<span className="font-serif text-[0.9em]">building what is next.</span></h2>
            <p className="mt-5 text-lg text-[#6B625A]">Add creator reviews, WhatsApp conversations, and community wins here as Orange Flow grows with India&apos;s creator economy.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { title: 'Creator stories', body: 'A space for creator feedback and WhatsApp stories from the community.', label: 'Creator review' },
              { title: 'Brand perspectives', body: 'A place to share how thoughtful creator partnerships help brands grow.', label: 'Brand review' },
              { title: 'Community picks', body: 'Highlight the products, links, and workflows creators love to share.', label: 'Community favorite' },
            ].map((story) => (
              <div key={story.title} className="flex min-h-[220px] flex-col rounded-[24px] border border-[#F0D6C6] bg-[#FFEFE4] p-6 sm:p-7">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#F0E7DC] px-3 py-1.5 text-xs font-semibold text-[#735A46]"><Sparkles size={12} /> {story.label}</span>
                <h3 className="mt-6 text-xl text-[#332B25]">{story.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#71655B]">{story.body}</p>
                <div className="mt-auto flex items-center gap-2 pt-5 text-xs font-semibold text-[#8A6C55]"><Check size={14} /> Real voices, shared with permission</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Steps ────────────────────────────────────────────────── */}
      <section className="bg-[#F8F2EB] py-20 sm:py-28">
        <div className="container">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2>
              Live in{' '}
              <span className="text-brand">5 minutes.</span>
            </h2>
            <p className="mt-5 text-lg text-[#6B7280]">Set the trigger, add your context, and let Orange Flow handle the conversation.</p>
          </div>
          <div className="grid gap-7 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.n} className="steps-card rounded-[24px] border border-[#F0D6C6] bg-[#FFEFE4] p-8 shadow-sm">
                <div className="mb-4 inline-flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F6C4AA] text-[12px] font-bold text-[#6B2A16]">{step.n}</span>
                </div>
                <h3 className="text-[1.2rem]">{step.title}</h3>
                <p className="mt-3 text-[16px] leading-[1.75] text-[#6B7280]">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────── */}
      <section className="container py-20 sm:py-28">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2>
            Simple,{' '}
            <span className="font-serif text-[0.9em]">honest pricing.</span>
          </h2>
          <p className="mt-5 text-lg text-[#6B7280]">Start free. Upgrade when you are ready. Cancel anytime.</p>
        </div>
        <div className="grid items-start gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="bg-[#FBF8F4] py-20 sm:py-28">
        <div className="container max-w-3xl">
          <h2 className="mb-10 text-center">
            Questions?{' '}
            <span className="font-serif text-[0.88em]">Answers.</span>
          </h2>
          <div className="divide-y divide-[#EEE7DF] rounded-[24px] border border-[#E9E1D7] bg-white px-6 shadow-[0_14px_40px_rgba(76,55,38,0.06)] sm:px-8">
            {faqs.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-[16px] font-semibold text-[#111111]">
                  {item.q}
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#E5E7EB] text-base font-normal text-[#6B7280] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl pb-1 text-[15px] leading-relaxed text-[#6B7280]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <div className="container">
          <div className="gradient-navy mx-auto max-w-[1000px] rounded-[32px] px-8 py-16 text-center shadow-[0_24px_60px_rgba(112,85,103,0.22)]">
            <h2 className="!text-[#6B2A16]" style={{ letterSpacing: '-0.045em' }}>
              Make every{' '}
              <span className="text-[#FF5A1F]">conversation</span>{' '}
              count.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-[#8B4A32]">
              Free to start. No credit card. Cancel anytime.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/signup" className="btn-primary !bg-[#FFB08F] !text-[#6B2A16] !px-8 !py-3.5 text-[15px] hover:!bg-[#FF5A1F] hover:!text-white active:!bg-[#B83B12]">
                Start for Free <ArrowRight size={16} />
              </Link>
              <Link href="/pricing" className="btn-outline !border-[#C97D59] !text-[#6B2A16] hover:!bg-[#FFE7D9] !px-8 !py-3.5 text-[15px]">
                See pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

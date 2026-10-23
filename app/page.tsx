import Link from 'next/link';
import { ArrowRight, BarChart3, Bot, MessageCircle, Shield, Sparkles, Store, Target, Users } from 'lucide-react';
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
  { q: 'What is OrangeFlow.in?', a: 'Orange Flow is a conversation engine for creators and businesses. Automate Instagram replies, give AI your brand context, capture leads, and share the right product or link.' },
  { q: 'Is there a free plan?', a: 'Yes. You can try the workflow with 10 DMs per month. Upgrade from ₹99 when you need more volume.' },
  { q: 'Does this work with personal Instagram accounts?', a: 'You can connect an Instagram Business or Creator account and get started in a few minutes.' },
  { q: 'Will this fit my Instagram workflow?', a: 'Yes. Orange Flow is designed for helpful conversations, sensible pacing, clear opt-outs, and tools that keep you in control.' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      <Navbar />

      <section className="landing-section px-4 pt-28 pb-12 sm:px-6">
        <div className="premium-hero mx-auto max-w-[1160px] overflow-hidden rounded-[36px] px-6 pb-14 pt-20 text-center sm:px-12 sm:pt-24">
          <p className="hero-kicker mb-5 text-sm font-semibold tracking-[0.02em]">A playful growth engine for the creator economy</p>
          <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            <span className="hero-lead">Turn attention into</span>
            <span className="hero-emphasis mt-2 block font-serif text-5xl italic font-normal sm:text-6xl">your next <strong className="font-bold not-italic">win</strong></span>
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-white/85 sm:text-lg">
            Grow your audience, manage brand conversations, and make every recommendation shoppable—from one beautifully simple workspace.
          </p>
          <div className="mt-10 flex justify-center">
            <Link href="/signup" className="inline-flex items-center gap-3 rounded-full bg-white py-2 pr-5 pl-2 text-sm font-semibold text-zinc-900 shadow-lg">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand-from)] text-white">
                <ArrowRight size={16} />
              </span>
              Get Started
            </Link>
          </div>
          <div className="mt-16"><HeroMockup /></div>
        </div>
      </section>

      <section className="landing-section container py-10">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-5 rounded-2xl border border-black/6 bg-white px-7 py-6 text-sm text-zinc-500">
          <span className="font-semibold text-zinc-800">Built for growth</span>
          <span>Helpful conversations</span>
          <span>Creator monetization</span>
          <span>Made for teams</span>
        </div>
      </section>

      <section className="landing-section container pt-24 pb-28 sm:pt-32 sm:pb-36">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="badge badge-brand mb-4"><Sparkles size={13} /> One platform, two growth engines</span>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Built for creators.
            <span className="mt-2 block font-serif text-4xl italic font-normal sm:text-5xl">Ready for business.</span>
          </h2>
          <p className="mt-4 text-[var(--text-secondary)]">Turn a comment into a useful reply, a product link, a qualified lead, or a sale—without losing the human context.</p>
        </div>
        <div className="grid gap-7 lg:grid-cols-2">
          <div className="rounded-[28px] border border-violet-200 bg-violet-50 p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 text-white"><Store size={22} /></div>
            <h3 className="text-2xl font-semibold">For creators: make every comment shoppable</h3>
            <p className="mt-3 leading-7 text-zinc-600">Someone comments “LINK” or asks where to buy. Orange Flow sends the product, storefront, affiliate, Amazon, Flipkart, or Shopify link directly in the DM and captures the person as a lead.</p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-violet-800"><span className="rounded-full bg-white px-3 py-1.5">Comment trigger</span><ArrowRight size={14} className="mt-1" /><span className="rounded-full bg-white px-3 py-1.5">Product link</span><ArrowRight size={14} className="mt-1" /><span className="rounded-full bg-white px-3 py-1.5">Lead captured</span></div>
          </div>
          <div className="rounded-[28px] border border-stone-200 bg-stone-50 p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1c1917] text-orange-300"><Bot size={22} /></div>
            <h3 className="text-2xl font-semibold">For businesses: let AI understand intent</h3>
            <p className="mt-3 leading-7 text-zinc-600">When someone comments or messages your brand page, AI analyzes the question and replies using the context you add—your products, prices, policies, FAQs, offers, and tone of voice.</p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-stone-700"><span className="rounded-full bg-white px-3 py-1.5">Customer question</span><ArrowRight size={14} className="mt-1 text-orange-500" /><span className="rounded-full bg-white px-3 py-1.5">AI + brand context</span><ArrowRight size={14} className="mt-1 text-orange-500" /><span className="rounded-full bg-white px-3 py-1.5">Helpful answer</span></div>
          </div>
        </div>
      </section>

      <section className="landing-section container py-16 sm:py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Reach more people
            <span className="mt-2 block font-serif text-4xl italic font-normal sm:text-5xl">with tools built for growth</span>
          </h2>
          <p className="mt-4 text-[var(--text-secondary)]">
            Everything you need to turn Instagram comments and DMs into helpful conversations, qualified leads, and sales.
          </p>
        </div>
        <div className="grid gap-7 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section className="landing-section container py-8 sm:py-16">
        <div className="mx-auto mb-10 max-w-2xl text-center"><span className="badge badge-brand mb-4"><Sparkles size={13} /> Grow first. Monetize naturally.</span><h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">Turn attention into an <span className="font-serif italic font-normal">income stream.</span></h2><p className="mt-4 text-[var(--text-secondary)]">Give people a reason to follow, deliver value in the DM, and make it easy to take the next step.</p></div>
        <GrowthLoop />
      </section>

      <section className="landing-section bg-white py-16 sm:py-24">
        <div className="container">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              Live in
              <span className="font-serif italic font-normal"> 5 minutes</span>
            </h2>
            <p className="mt-4 text-[var(--text-secondary)]">Set the trigger, add your context, and let Orange Flow handle the conversation.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.n} className="rounded-[28px] border border-black/6 bg-[var(--bg-base)] p-8">
                <div className="text-xs font-semibold tracking-[0.16em] text-[var(--brand-from)]">STEP {step.n}</div>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-[var(--text-secondary)]">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section container py-16 sm:py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Simple,
            <span className="font-serif italic font-normal"> honest pricing</span>
          </h2>
          <p className="mt-4 text-[var(--text-secondary)]">Start free. Upgrade when you are ready. Cancel anytime.</p>
        </div>
        <div className="grid items-start gap-7 md:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
      </section>

      <section className="landing-section bg-white py-16 sm:py-24">
        <div className="container max-w-3xl">
          <h2 className="mb-8 text-center text-3xl font-semibold tracking-tight sm:text-4xl">
            Questions? <span className="font-serif italic font-normal">Answers.</span>
          </h2>
          <div className="divide-y divide-black/8 border-y border-black/8">
            {faqs.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-base font-semibold">
                  {item.q}
                  <span className="text-xl font-normal text-zinc-400 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section px-4 pb-16 sm:px-6">
        <div className="gradient-creator mx-auto max-w-[1160px] rounded-[32px] px-8 py-16 text-center text-white shadow-[0_24px_70px_rgba(168,85,247,0.2)]">
          <h2 style={{ color: '#ffffff' }} className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Make every conversation count
            <span style={{ color: 'rgba(255,255,255,0.72)' }} className="mt-2 block font-serif text-4xl italic font-normal text-white/70 sm:text-5xl">Free to start. No commitments.</span>
          </h2>
          <Link href="/signup" className="btn-primary mt-8 !bg-white !text-zinc-900 hover:!bg-zinc-100">
            Start for Free <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

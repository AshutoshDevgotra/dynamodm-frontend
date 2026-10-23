import Link from 'next/link';
import { ArrowRight, BarChart3, Bot, MessageCircle, Shield, Store, Target, Users } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FeatureCard from './components/home/FeatureCard';
import PricingCard from './components/home/PricingCard';
import HeroMockup from './components/home/HeroMockup';

const features = [
  { icon: MessageCircle, title: 'Comment-to-DM automations', description: 'Turn trigger words on reels and posts into instant, useful replies with the right link.' },
  { icon: Bot, title: 'AI brand conversations', description: 'Let AI understand customer intent and reply using your products, policies, offers, and brand context.' },
  { icon: Store, title: 'Link-in-bio store', description: 'One storefront for products, affiliate links, socials, and lead magnets.' },
  { icon: Users, title: 'Lead capture', description: 'Every meaningful conversation becomes a lead you can tag, export, and follow up with.' },
  { icon: BarChart3, title: 'Analytics', description: 'See DMs sent, click-through, and conversions without a spreadsheet.' },
  { icon: Target, title: 'Smart keywords', description: 'Exact match, contains, starts with, or regex — one rule can cover a campaign.' },
  { icon: Shield, title: 'Meta-compliant', description: 'Official Graph API, HMAC webhooks, rate limits, and cooldowns built in.' },
];

const steps = [
  { n: '01', title: 'Connect Instagram', body: 'Link a Business or Creator account with official Meta OAuth.' },
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
  { q: 'Does this work with personal Instagram accounts?', a: 'You need an Instagram Business or Creator account connected to a Facebook Page. Setup takes a few minutes via official Meta login.' },
  { q: 'Is this allowed by Meta?', a: 'Yes. We use the official Meta Graph API with the right permissions, HMAC verification, cooldowns, and rate limiting.' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      <Navbar />

      <section className="px-4 pt-24 pb-8 sm:px-6">
        <div className="mx-auto max-w-[1160px] overflow-hidden rounded-[36px] bg-[linear-gradient(180deg,#2563eb_0%,#60a5fa_46%,#dbeafe_78%,#f4f6fb_100%)] px-6 pb-10 pt-16 text-center sm:px-12 sm:pt-20">
          <p className="mb-5 text-sm font-medium text-white/80">AI-powered conversations for creators and businesses</p>
          <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Turn attention into
            <span className="mt-2 block font-serif text-5xl italic font-normal sm:text-6xl">every comment.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/85 sm:text-lg">
            Auto-reply to comments, understand customer intent, and respond with the right product, link, or answer using your brand context.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/signup" className="inline-flex items-center gap-3 rounded-full bg-white py-2 pr-5 pl-2 text-sm font-semibold text-zinc-900 shadow-lg">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand-from)] text-white">
                <ArrowRight size={16} />
              </span>
              Get Started
            </Link>
          </div>
          <HeroMockup />
        </div>
      </section>

      <section className="container py-10">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 rounded-2xl border border-black/6 bg-white px-6 py-5 text-sm text-zinc-500">
          <span className="font-semibold text-zinc-800">Meta Tech Provider</span>
          <span>Official Graph API</span>
          <span>Razorpay payouts</span>
          <span>Built for creators &amp; businesses</span>
        </div>
      </section>

      <section className="container py-16 sm:py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Reach more people
            <span className="mt-2 block font-serif text-4xl italic font-normal sm:text-5xl">with tools built for growth</span>
          </h2>
          <p className="mt-4 text-[var(--text-secondary)]">
            Everything you need to turn Instagram comments and DMs into helpful conversations, qualified leads, and sales.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="container">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              Live in
              <span className="font-serif italic font-normal"> 5 minutes</span>
            </h2>
            <p className="mt-4 text-[var(--text-secondary)]">Set the trigger, add your context, and let Orange Flow handle the conversation.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
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

      <section className="container py-16 sm:py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Simple,
            <span className="font-serif italic font-normal"> honest pricing</span>
          </h2>
          <p className="mt-4 text-[var(--text-secondary)]">Start free. Upgrade when you are ready. Cancel anytime.</p>
        </div>
        <div className="grid items-start gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
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

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-[1160px] rounded-[32px] bg-[#0b1220] px-8 py-16 text-center text-white">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Make every conversation count
            <span className="mt-2 block font-serif text-4xl italic font-normal sm:text-5xl">Free to start. No commitments.</span>
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

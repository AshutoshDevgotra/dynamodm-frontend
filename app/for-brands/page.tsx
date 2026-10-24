'use client';

import Link from 'next/link';
import { ArrowRight, Shield, Sparkles, Target } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const stats = [
  { value: '50k+', label: 'Vetted creators' },
  { value: '3.2M', label: 'Audience data points' },
  { value: '4x', label: 'Better conversion' },
  { value: '100%', label: 'Escrow on payouts' },
];

export default function ForBrandsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      <Navbar />

      <section className="px-4 pt-24 pb-8 sm:px-6">
        <div className="premium-hero mx-auto max-w-[1160px] overflow-hidden rounded-[36px] px-6 py-20 text-center text-white sm:px-12">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-1.5 text-sm text-zinc-300 ring-1 ring-white/10">
            <Sparkles size={14} className="text-[#f5d90a]" /> AI customer conversations for brands
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
            Turn comments into
            <span className="mt-2 block font-serif text-5xl italic font-normal sm:text-6xl">customers.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-zinc-400 sm:text-lg">
            Give every campaign a smart conversion layer. When someone comments a trigger word or messages your page, Orange Flow understands what they need and replies with the right product, link, or next step.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/signup?role=brand" className="btn-primary">
              Start building your flow <ArrowRight size={16} />
            </Link>
            <Link href="#features" className="btn-secondary !bg-transparent !text-white !border-white/15">
              See how it works
            </Link>
          </div>
        </div>
      </section>

      <section className="container grid grid-cols-2 gap-6 py-14 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl font-semibold tracking-tight">{stat.value}</div>
            <div className="mt-1 text-sm text-[var(--text-secondary)]">{stat.label}</div>
          </div>
        ))}
      </section>

      <section id="features" className="container grid gap-5 pb-20 md:grid-cols-3">
          {[
          { icon: Target, title: 'Trigger-word campaigns', body: 'Set multiple keywords for a reel or product and automatically send a website, Amazon, Flipkart, or Shopify link.' },
          { icon: Sparkles, title: 'Context-aware AI', body: 'Add your brand, catalog, offers, policies, and FAQs. AI uses that context to understand intent and give a useful answer.' },
          { icon: Shield, title: 'Lead capture that works', body: 'Keep the conversation moving, collect high-intent leads, and give your sales team the context they need.' },
        ].map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-[28px] border border-black/6 bg-white p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-subtle)] text-[var(--brand-from)]">
              <Icon size={22} />
            </div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-3 text-[var(--text-secondary)]">{body}</p>
          </div>
        ))}
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-[1160px] rounded-[32px] bg-white px-8 py-16 text-center ring-1 ring-black/6">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Ready to scale
            <span className="font-serif italic font-normal"> every conversation?</span>
          </h2>
          <Link href="/signup?role=brand" className="btn-primary mt-8">
            Create business account <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

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
    <div className="brands-page min-h-screen bg-[#FAF8F4] text-[#211B18]">
      <Navbar />

      {/* Hero */}
      <section className="brands-hero-section px-4 pt-[68px] pb-8 sm:px-6">
        <div className="premium-hero mx-auto max-w-[1160px] overflow-hidden rounded-[36px] border border-[#EADBD1] bg-[#FAF8F4] px-6 py-20 text-center sm:px-12">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#FFF1EC] px-4 py-1.5 text-sm text-[#A94D36] ring-1 ring-[#F4C7B8]">
            <Sparkles size={14} className="text-[#F36F4C]" /> AI customer conversations for brands
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-[#211B18] sm:text-6xl">
            Turn comments into
            <span className="mt-2 block font-serif text-5xl italic font-normal sm:text-6xl">customers.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-[#81766E] sm:text-lg">
            Give every campaign a smart conversion layer. When someone comments a trigger word or messages your page, Orange Flow understands what they need and replies with the right product, link, or next step.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/signup?role=brand" className="btn-primary">
              Start building your flow <ArrowRight size={16} />
            </Link>
            <Link href="#features" className="btn-outline">
              See how it works
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="brands-stats container grid grid-cols-2 gap-6 py-14 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl font-semibold tracking-tight text-[#211B18]">{stat.value}</div>
            <div className="mt-1 text-sm text-[#81766E]">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section id="features" className="brands-feature-section container grid gap-5 pb-20 md:grid-cols-3">
        {[
          { icon: Target, title: 'Trigger-word campaigns', body: 'Set multiple keywords for a reel or product and automatically send a website, Amazon, Flipkart, or Shopify link.' },
          { icon: Sparkles, title: 'Context-aware AI', body: 'Add your brand, catalog, offers, policies, and FAQs. AI uses that context to understand intent and give a useful answer.' },
          { icon: Shield, title: 'Lead capture that works', body: 'Keep the conversation moving, collect high-intent leads, and give your sales team the context they need.' },
        ].map(({ icon: Icon, title, body }) => (
          <div key={title} className="brands-feature-card rounded-[24px] border border-[#EADBD1] bg-[#FAF8F4] p-8 shadow-sm transition-all duration-200 hover:shadow-md hover:border-[#F36F4C]">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF1EC] text-[#F36F4C]">
              <Icon size={22} />
            </div>
            <h3 className="text-xl font-semibold text-[#211B18]">{title}</h3>
            <p className="mt-3 text-[#81766E]">{body}</p>
          </div>
        ))}
      </section>

      {/* Bottom CTA */}
      <section className="brands-cta-section px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-[1160px] rounded-[32px] border border-[#EADBD1] bg-[#FAF8F4] px-8 py-16 text-center shadow-[0_18px_45px_rgba(83,47,31,0.07)]">
          <h2 className="text-3xl font-semibold tracking-tight text-[#211B18] sm:text-5xl">
            Ready to scale
            <span className="font-serif italic font-normal"> every conversation?</span>
          </h2>
          <Link href="/signup?role=brand" className="btn-primary mt-8 inline-flex">
            Create business account <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

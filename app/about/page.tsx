import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe2, HeartHandshake, IndianRupee, Mail, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Orange Flow, an India-based team building practical AI conversation tools for creators and businesses.',
};

const values = [
  {
    icon: Globe2,
    title: 'Built in India',
    body: 'Orange Flow is built by an India-based team for the way Indian creators, businesses, and customers communicate online.',
  },
  {
    icon: IndianRupee,
    title: 'Indian pricing',
    body: 'Our pricing is set in Indian rupees so you can use the product without confusing currency conversions or overseas pricing.',
  },
  {
    icon: HeartHandshake,
    title: 'Useful, human conversations',
    body: 'We want automation to feel helpful and respectful: clear replies, sensible pacing, and controls that keep people in charge.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[68px] pb-16">
        <section className="container py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="badge badge-brand mb-5">
              <Sparkles size={13} /> About Orange Flow
            </span>
            <h1 className="text-[#111111]">
              Built in India for
              <span className="block font-serif text-[0.88em]">better conversations</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#6B7280]">
              Orange Flow helps creators and businesses turn Instagram comments and DMs into helpful, context-aware customer journeys.
              We are an India-based team building practical tools for the people and businesses growing online here.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="about-value-card rounded-[24px] border border-[#E5E7EB] bg-white p-7 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-subtle)] text-[#8B6B87]">
                  <value.icon size={22} />
                </div>
                <h2 className="about-value-title text-xl font-semibold text-[#111111]">{value.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#6B7280]">{value.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#F8F4EE] py-16 sm:py-20">
          <div className="container grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A94D2D]">Who supports Orange Flow</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#332B25] sm:text-4xl">
                You are supporting an Indian company and team.
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-[#6F6258]">
                Orange Flow is supported by the team at House of Orange. We keep our product, support, and pricing close to the creators and businesses we serve in India.
                Our plans are offered in Indian pricing to make getting started straightforward.
              </p>
            </div>

            <div className="rounded-[28px] border border-[#E4D9CD] bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF1E9] text-[#A94D2D]">
                <Mail size={21} />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-[#332B25]">Talk to our team</h2>
              <p className="mt-2 text-sm leading-7 text-[#6F6258]">
                Questions about Orange Flow, plans, or getting started? Email the House of Orange team.
              </p>
              <a href="mailto:team@houseoforange.in" className="mt-5 inline-flex items-center gap-2 font-semibold text-[#A94D2D] hover:text-[#8D563A]">
                team@houseoforange.in <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <section className="container py-16 text-center sm:py-20">
          <h2 className="text-3xl font-semibold tracking-tight text-[#111111]">Ready to grow with Orange Flow?</h2>
          <p className="mx-auto mt-3 max-w-xl text-[#6B7280]">Start with the free plan and build conversations that feel like your brand.</p>
          <Link href="/signup" className="btn-primary mt-7">
            Start for free <ArrowRight size={16} />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

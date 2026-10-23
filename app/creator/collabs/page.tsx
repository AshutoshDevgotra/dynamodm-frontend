'use client';

import Link from 'next/link';
import { ArrowRight, BriefcaseBusiness, Camera, CheckCircle2, Heart, MapPin, Sparkles, Users } from 'lucide-react';

const opportunities = [
  { brand: 'Glow Theory', category: 'Beauty & wellness', budget: '₹25,000 – ₹45,000', fit: '98% fit', color: 'from-fuchsia-500 to-orange-400' },
  { brand: 'Roamly', category: 'Travel & lifestyle', budget: '₹15,000 – ₹30,000', fit: '94% fit', color: 'from-cyan-500 to-blue-500' },
  { brand: 'Nourish Co.', category: 'Food & nutrition', budget: '₹20,000 – ₹35,000', fit: '91% fit', color: 'from-emerald-400 to-teal-500' },
];

const metrics: Array<{ label: string; value: string; detail: string; icon: React.ElementType }> = [
  { label: 'Profile strength', value: '78%', detail: 'Add your rates to improve matches', icon: CheckCircle2 },
  { label: 'Audience reach', value: '24.8K', detail: 'Across your connected channels', icon: Users },
  { label: 'Saved opportunities', value: '06', detail: 'Keep the ones you love close', icon: Heart },
];

export default function CreatorCollabsPage() {
  return (
    <div className="mx-auto max-w-6xl pb-12">
      <section className="creator-collabs-hero">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur"><Sparkles size={14} /> Curated by House of Orange</div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Turn your influence into your next opportunity.</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-white/80">We match your content, audience, and style with brands that value your voice. Your profile helps us bring the right briefs to you.</p>
          <div className="mt-7 flex flex-wrap gap-3"><Link href="/creator/instagram" className="btn-primary !bg-white !text-orange-700"><Camera size={17} /> Connect Instagram</Link><Link href="/creator/profile" className="btn-secondary !border-white/30 !bg-white/10 !text-white">Complete your profile <ArrowRight size={16} /></Link></div>
        </div>
        <div className="creator-collabs-orb"><BriefcaseBusiness size={74} /></div>
      </section>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {metrics.map(({ label, value, detail, icon: Icon }) => <div className="creator-card creator-card--padded" key={label}><div className="flex items-center justify-between"><span className="text-sm font-semibold text-[var(--text-secondary)]">{label}</span><Icon size={18} className="text-[var(--brand-from)]" /></div><div className="mt-3 text-3xl font-extrabold">{value}</div><p className="mt-1 text-xs text-[var(--text-muted)]">{detail}</p></div>)}
      </div>

      <div className="mt-9 flex items-end justify-between"><div><h2 className="text-2xl font-bold">Opportunities picked for you</h2><p className="mt-1 text-sm text-[var(--text-secondary)]">A shortlist from the House of Orange network.</p></div><button className="btn-secondary hidden sm:inline-flex">View all <ArrowRight size={15} /></button></div>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {opportunities.map((opportunity) => <article key={opportunity.brand} className="creator-card overflow-hidden transition hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"><div className={`h-24 bg-gradient-to-br ${opportunity.color} p-4`}><div className="flex items-start justify-between"><span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">{opportunity.fit}</span><button aria-label={`Save ${opportunity.brand}`} className="rounded-full bg-white/20 p-2 text-white backdrop-blur"><Heart size={15} /></button></div></div><div className="p-5"><h3 className="text-lg font-bold">{opportunity.brand}</h3><p className="mt-1 text-sm text-[var(--text-secondary)]">{opportunity.category}</p><div className="mt-5 flex items-center gap-3 text-xs text-[var(--text-secondary)]"><span className="inline-flex items-center gap-1"><MapPin size={13} /> India · Remote</span><span className="inline-flex items-center gap-1"><Users size={13} /> Reels + Stories</span></div><div className="mt-5 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4"><span className="text-sm font-semibold">{opportunity.budget}</span><button className="rounded-full bg-[var(--brand-subtle)] px-3 py-1.5 text-xs font-bold text-[var(--brand-from)]">View brief</button></div></div></article>)}
      </div>
    </div>
  );
}

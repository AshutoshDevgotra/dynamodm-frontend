'use client';

import { ArrowRight, CheckCircle2, Heart, MapPin, Users } from 'lucide-react';
import FeatureBanner from '../../components/creator/FeatureBanner';

const opportunities = [
  { brand: 'Glow Theory', category: 'Beauty & wellness', budget: '₹25,000 – ₹45,000', fit: '98% fit', color: 'from-[#FFAD91] via-[#F36F4C] to-[#D9573A]' },
  { brand: 'Roamly', category: 'Travel & lifestyle', budget: '₹15,000 – ₹30,000', fit: '94% fit', color: 'from-[#18110D] via-[#2A140B] to-[#4A2416]' },
  { brand: 'Nourish Co.', category: 'Food & nutrition', budget: '₹20,000 – ₹35,000', fit: '91% fit', color: 'from-[#EA580C] via-[#C2410C] to-[#9A3412]' },
];

const metrics: Array<{ label: string; value: string; detail: string; icon: React.ElementType }> = [
  { label: 'Profile strength', value: '78%', detail: 'Add your rates to improve matches', icon: CheckCircle2 },
  { label: 'Audience reach', value: '24.8K', detail: 'Across your connected channels', icon: Users },
  { label: 'Saved opportunities', value: '06', detail: 'Keep the ones you love close', icon: Heart },
];

export default function CreatorCollabsPage() {
  return (
    <div className="mx-auto max-w-6xl pb-12">
      <FeatureBanner
        eyebrow="Audience growth"
        title="Follow first."
        accent="Grow faster."
        description="Build a warmer audience by turning genuine conversations into lasting connections."
        ctaLabel="Explore automations"
        href="/creator/automations"
        visualSrc="/banners/dms-to-followers.png"
        theme="purple"
      />
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

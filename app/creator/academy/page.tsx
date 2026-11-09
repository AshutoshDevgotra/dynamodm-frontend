import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock3, Sparkles } from 'lucide-react';

const academyFeatures = [
  { title: 'Subscription spaces', body: 'Build a premium hub where your audience can subscribe directly to you.', color: '#E9B4FF' },
  { title: 'Classes & courses', body: 'Teach yoga, fitness, business, or any skill through structured content.', color: '#A7EF52' },
  { title: 'Video & live', body: 'Upload premium videos and host live sessions from one creator workspace.', color: '#41D9FF' },
  { title: 'Direct payouts', body: 'Earn from your content and subscriptions with simple creator payouts.', color: '#FF7350' },
  { title: 'Learn with Orange Academy', body: 'Follow practical lessons to train, grow, and master your creator journey.', color: '#F5BD4D' },
];

export default function OrangeAcademyPage() {
  return (
    <div className="orange-academy-page">
      <section className="orange-academy-hero">
        <div>
          <span className="orange-academy-badge"><Sparkles size={14} /> Coming soon</span>
          <h1>Orange Academy</h1>
          <p>Learn, publish, and build a deeper business around the work your audience already loves.</p>
        </div>
        <div className="orange-academy-hero-icon"><BookOpen size={30} /></div>
      </section>

      <section className="orange-academy-preview">
        <div className="orange-academy-section-heading">
          <div><span className="creator-eyebrow"><Sparkles size={13} /> A new creator feature</span><h2>Teach more. Earn more. Stay in control.</h2></div>
          <span className="orange-academy-status"><Clock3 size={14} /> In development</span>
        </div>
        <div className="orange-academy-artwork">
          <Image src="/banners/orange-academy-coming-soon.png" alt="Orange Academy upcoming creator features" width={1536} height={2752} priority className="h-auto w-full" />
        </div>
      </section>

      <section className="orange-academy-feature-grid">
        {academyFeatures.map((feature) => <article key={feature.title} className="orange-academy-feature-card"><span style={{ background: feature.color }} /><h3>{feature.title}</h3><p>{feature.body}</p><small>Coming soon</small></article>)}
      </section>

      <div className="orange-academy-footer-cta"><div><h2>Want early access?</h2><p>Tell us what you want to teach first and help shape Orange Academy.</p></div><Link href="/contact" className="btn-primary">Share feedback <ArrowRight size={16} /></Link></div>
    </div>
  );
}

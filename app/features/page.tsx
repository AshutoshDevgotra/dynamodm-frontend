import { Metadata } from 'next';
import Link from 'next/link';
import { BarChart3, Bot, Camera, MessageCircle, Shield, Target, TrendingUp, Users, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Features',
  description: 'Explore DynamoDM features — Instagram automation, lead capture, analytics, and storefronts.',
};

const features = [
  {
    icon: MessageCircle, title: 'Instagram DM automation',
    desc: 'Send a personal DM the moment someone comments a keyword — 24/7.',
    points: ['Response in seconds', 'Templates with links & PDFs', 'Cooldowns to prevent spam'],
  },
  {
    icon: Target, title: 'Smart keyword matching',
    desc: 'Cover every way your audience comments, without a dozen duplicate rules.',
    points: ['Exact, contains, starts with', 'Regex for campaigns', 'Multiple keywords per rule'],
  },
  {
    icon: Users, title: 'Lead capture CRM',
    desc: 'Every interaction becomes a lead with username, tags, and history.',
    points: ['Auto-capture handles', 'Tag and segment', 'CSV export'],
  },
  {
    icon: BarChart3, title: 'Analytics',
    desc: 'See what is working: DMs, clicks, and conversions over time.',
    points: ['Delivery vs failures', 'Lead growth', 'Campaign funnels'],
  },
  {
    icon: Bot, title: 'Reliable delivery',
    desc: 'A queue with retries and Meta rate limits so DMs actually go out.',
    points: ['Automatic retries', 'Hourly caps', 'Failure logs'],
  },
  {
    icon: Shield, title: 'Meta-compliant',
    desc: 'Official Graph API, HMAC webhooks, encrypted tokens.',
    points: ['OAuth login', 'Webhook verification', 'Least-privilege scopes'],
  },
  {
    icon: Camera, title: 'Business accounts',
    desc: 'Works with Instagram Business and Creator accounts on a Facebook Page.',
    points: ['Business & Creator', 'Page connection', 'Multi-account on Premium'],
  },
  {
    icon: TrendingUp, title: 'Campaigns',
    desc: 'Group automations around a reel, launch, or collab.',
    points: ['Rules per campaign', 'Campaign analytics', 'Post URL tracking'],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="badge badge-brand mb-4">
              <Zap size={13} /> All features
            </span>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Everything to
              <span className="block font-serif italic font-normal">automate and grow</span>
            </h1>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              A complete Instagram automation platform for creators who mean business.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-[28px] border border-black/6 bg-white p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-subtle)] text-[var(--brand-from)]">
                  <feature.icon size={22} />
                </div>
                <h2 className="text-xl font-semibold">{feature.title}</h2>
                <p className="mt-2 text-[var(--text-secondary)]">{feature.desc}</p>
                <ul className="mt-5 space-y-2">
                  {feature.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-zinc-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-from)]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/signup" className="btn-primary">
              Start free — no credit card
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

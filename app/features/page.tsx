import { Metadata } from 'next';
import Link from 'next/link';
import { Camera, Zap, Users, BarChart3, Bot, Shield, MessageCircle, Target, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Features',
  description: 'Explore all DynamoDM features — Instagram automation, lead capture, analytics, and more.',
};

const features = [
  {
    icon: MessageCircle, title: 'Instagram DM Automation', color: '#8b5cf6',
    desc: 'Automatically send personalized DMs to anyone who comments a trigger keyword on your Instagram posts. Works 24/7, even while you sleep.',
    points: ['Instant response within seconds', 'Personalized message templates', 'PDF, link, and image attachments', 'Cooldown to prevent spam'],
  },
  {
    icon: Target, title: 'Smart Keyword Matching', color: '#ec4899',
    desc: 'Flexible keyword matching lets you handle any comment style your audience uses.',
    points: ['Exact match', 'Contains keyword', 'Starts with keyword', 'Advanced regex patterns'],
  },
  {
    icon: Users, title: 'Lead Capture CRM', color: '#06b6d4',
    desc: 'Every interaction automatically creates a lead in your dashboard with full contact details and conversation history.',
    points: ['Auto-capture Instagram usernames', 'Tag and segment leads', 'CSV export', 'Conversion tracking'],
  },
  {
    icon: BarChart3, title: 'Analytics Dashboard', color: '#10b981',
    desc: 'Beautiful time-series charts and metric cards give you full visibility into your automation performance.',
    points: ['DMs sent & failed', 'Lead growth over time', 'Comment volume tracking', 'Conversion funnel'],
  },
  {
    icon: Bot, title: 'BullMQ Queue Engine', color: '#f59e0b',
    desc: 'Enterprise-grade message queue ensures your DMs are delivered reliably even at scale.',
    points: ['Automatic retries on failure', 'Instagram rate limit compliance', '200 DMs/hour per account', 'Failure logging & alerts'],
  },
  {
    icon: Shield, title: 'Meta-Compliant', color: '#ef4444',
    desc: 'Built on the official Meta Graph API with proper OAuth, HMAC verification, and webhook handling.',
    points: ['Official Meta API', 'HMAC webhook verification', 'Encrypted token storage', 'Proper permission scopes'],
  },
  {
    icon: Camera, title: 'Business Account Support', color: '#833ab4',
    desc: 'Works with Instagram Business and Creator accounts connected to Facebook Pages.',
    points: ['Business accounts', 'Creator accounts', 'Facebook Page integration', 'Multi-account ready (Premium)'],
  },
  {
    icon: TrendingUp, title: 'Campaign Management', color: '#06b6d4',
    desc: 'Group automation rules into campaigns tied to specific posts or promotions.',
    points: ['Multiple rules per campaign', 'Campaign-level analytics', 'Post URL tracking', 'Campaign scheduling'],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 100 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <span className="badge badge-brand" style={{ marginBottom: 20, display: 'inline-flex' }}>
              <Zap size={13} /> All Features
            </span>
            <h1 style={{ fontSize: 'clamp(36px, 6vw, 60px)', fontWeight: 900, marginBottom: 16 }}>
              Everything you need to <br /><span className="gradient-text">automate and grow</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 18, maxWidth: 560, margin: '0 auto' }}>
              A complete Instagram automation platform built for creators who mean business.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {features.map((feature, i) => (
              <div key={feature.title} style={{
                display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
                gap: 48, padding: '56px 0',
                borderBottom: i < features.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}>
                <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: `${feature.color}18`, border: `1px solid ${feature.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                    <feature.icon size={26} color={feature.color} />
                  </div>
                  <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>{feature.title}</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.7, marginBottom: 20 }}>{feature.desc}</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {feature.points.map((p) => (
                      <li key={p} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--text-secondary)' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: feature.color, flexShrink: 0 }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ order: i % 2 === 0 ? 2 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="glass" style={{ width: '100%', aspectRatio: '4/3', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ width: 80, height: 80, borderRadius: 20, background: `${feature.color}18`, border: `1px solid ${feature.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <feature.icon size={40} color={feature.color} />
                    </div>
                    <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center, ${feature.color}08 0%, transparent 70%)` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', paddingTop: 64, paddingBottom: 64 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16 }}>Ready to get started?</h2>
            <Link href="/signup">
              <button className="btn-primary animate-pulse-glow" style={{ fontSize: 16, padding: '14px 32px' }}>
                Start Free — No Credit Card
              </button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

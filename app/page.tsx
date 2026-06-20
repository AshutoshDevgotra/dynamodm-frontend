'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {
  Zap, MessageCircle, Users, BarChart3, ArrowRight, Star, Check,
  Camera, Bot, Target, TrendingUp, Shield, Sparkles, ChevronRight,
  Play
} from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stagger: any = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const features = [
  {
    icon: MessageCircle,
    title: 'Instant DM Automation',
    description: 'When someone comments a keyword on your post, they instantly receive a personalized DM — even while you sleep.',
    color: '#8b5cf6',
  },
  {
    icon: Target,
    title: 'Smart Keyword Matching',
    description: 'Exact match, contains, starts with, or regex patterns. Handle multiple keywords per automation rule.',
    color: '#ec4899',
  },
  {
    icon: Users,
    title: 'Lead Capture & CRM',
    description: 'Every commenter becomes a lead. Track, tag, export and nurture your audience — all in one place.',
    color: '#06b6d4',
  },
  {
    icon: BarChart3,
    title: 'Deep Analytics',
    description: 'Track DMs sent, click rates, conversion metrics, and revenue — with beautiful time-series dashboards.',
    color: '#10b981',
  },
  {
    icon: Bot,
    title: 'BullMQ-Powered Engine',
    description: 'Enterprise-grade queue system with retries, rate limiting, and failure recovery baked in.',
    color: '#f59e0b',
  },
  {
    icon: Shield,
    title: 'Meta-Compliant',
    description: 'Built on the official Meta Graph API with proper permissions, HMAC verification, and cooldowns.',
    color: '#ef4444',
  },
];

const stats = [
  { value: '2M+', label: 'DMs Sent' },
  { value: '50K+', label: 'Creators' },
  { value: '98%', label: 'Delivery Rate' },
  { value: '12x', label: 'ROI Average' },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    handle: '@priyafit',
    avatar: 'PS',
    role: 'Fitness Coach',
    text: '"I posted my reel and said \'comment GUIDE\' — within 2 hours I had 340 leads in my DMs automatically. DynamoDM is insane."',
    rating: 5,
    color: '#8b5cf6',
  },
  {
    name: 'Rohan Mehta',
    handle: '@rohan.biz',
    avatar: 'RM',
    role: 'Business Coach',
    text: '"Went from manually replying to 200 DMs a day to zero. The automation just works. My engagement doubled in a week."',
    rating: 5,
    color: '#ec4899',
  },
  {
    name: 'Ananya Iyer',
    handle: '@ananya.creates',
    avatar: 'AI',
    role: 'Digital Creator',
    text: '"The analytics dashboard alone is worth it. I can see exactly which posts drive the most leads and revenue."',
    rating: 5,
    color: '#06b6d4',
  },
];

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: '/month',
    description: 'Perfect to get started',
    features: ['1 Automation Rule', '100 Leads/month', '500 DMs/month', '7-day analytics', 'Basic support'],
    cta: 'Start Free',
    highlighted: false,
    href: '/signup',
  },
  {
    name: 'Pro',
    price: '₹999',
    period: '/month',
    description: 'For growing creators',
    features: ['10 Automation Rules', '5,000 Leads/month', '10,000 DMs/month', '30-day analytics', 'PDF attachments', 'Priority queue', 'CSV export'],
    cta: 'Start Pro',
    highlighted: true,
    badge: 'Most Popular',
    href: '/signup?plan=pro',
  },
  {
    name: 'Premium',
    price: '₹2,499',
    period: '/month',
    description: 'For power users & agencies',
    features: ['Unlimited Automations', 'Unlimited Leads', 'Unlimited DMs', '1-year analytics', 'Custom branding', 'Priority support', 'API access', 'Team members'],
    cta: 'Go Premium',
    highlighted: false,
    href: '/signup?plan=premium',
  },
];

function HeroSection() {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 72 }}>
      {/* Background Effects */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(139,92,246,0.15) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(236,72,153,0.08) 0%, transparent 60%)',
      }} />
      <div style={{
        position: 'absolute', top: '20%', left: '10%', width: 400, height: 400,
        borderRadius: '50%', background: 'rgba(139,92,246,0.04)',
        filter: 'blur(60px)', zIndex: 0,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 80, paddingBottom: 80 }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}
        >
          {/* Badge */}
          <motion.div variants={fadeUp} style={{ marginBottom: 24 }}>
            <span className="badge badge-brand" style={{ fontSize: 13 }}>
              <Sparkles size={13} />
              Instagram Automation · Powered by Meta API
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(40px, 7vw, 76px)', fontWeight: 900, marginBottom: 24, lineHeight: 1.05 }}>
            Turn Every Comment
            <br />
            Into a{' '}
            <span className="gradient-text">
              Conversation
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 580, margin: '0 auto 40px' }}>
            DynamoDM automatically sends personalized Instagram DMs when followers comment keywords on your posts.
            Capture leads, deliver content, and grow — on autopilot.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 56 }}>
            <Link href="/signup">
              <button className="btn-primary animate-pulse-glow" style={{ fontSize: 16, padding: '14px 32px', display: 'flex', alignItems: 'center', gap: 8 }}>
                Start Automating Free
                <ArrowRight size={18} />
              </button>
            </Link>
            <button className="btn-secondary" style={{ fontSize: 16, padding: '14px 28px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Play size={16} />
              Watch Demo
            </button>
          </motion.div>

          {/* Example Flow */}
          <motion.div variants={fadeUp}>
            <div className="glass" style={{ display: 'inline-flex', alignItems: 'center', gap: 0, padding: 4, borderRadius: 16, overflow: 'hidden' }}>
              {[
                { icon: '📸', label: 'Post Reel', sub: '"Comment SIP"' },
                { icon: '💬', label: 'Follower Comments', sub: 'SIP' },
                { icon: '⚡', label: 'DynamoDM Triggers', sub: 'Instant' },
                { icon: '📩', label: 'DM Sent Automatically', sub: '+ PDF link' },
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ padding: '10px 16px', textAlign: 'center' }}>
                    <div style={{ fontSize: 20, marginBottom: 2 }}>{step.icon}</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>{step.label}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{step.sub}</div>
                  </div>
                  {i < 3 && <ChevronRight size={14} color="var(--text-muted)" />}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginTop: 80, maxWidth: 700, margin: '80px auto 0' }}
        >
          {stats.map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 900, background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {stat.value}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="section">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <motion.span variants={fadeUp} className="badge badge-brand" style={{ marginBottom: 16, display: 'inline-flex' }}>
            <Zap size={13} /> Everything You Need
          </motion.span>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(32px, 5vw, 52px)', marginBottom: 16 }}>
            Built for creators who<br /><span className="gradient-text">mean business</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ color: 'var(--text-secondary)', fontSize: 18, maxWidth: 560, margin: '0 auto' }}>
            Everything you need to automate, capture, and convert your Instagram audience.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={stagger}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={fadeUp}>
              <div className="card" style={{ padding: 28, height: '100%' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: `${feature.color}18`, border: `1px solid ${feature.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
                }}>
                  <feature.icon size={22} color={feature.color} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <style>{`@media(max-width:768px){.features-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { num: '01', title: 'Connect Instagram', desc: 'Link your Instagram Business or Creator account via official Meta OAuth — takes 30 seconds.', icon: Camera },
    { num: '02', title: 'Create an Automation', desc: 'Set a trigger keyword (e.g. "SIP"), write your DM response, add a CTA link or PDF attachment.', icon: Zap },
    { num: '03', title: 'Post & Promote', desc: 'Share your reel or post. Tell your audience to comment the keyword to receive the value.', icon: TrendingUp },
    { num: '04', title: 'Watch Leads Roll In', desc: 'Every comment triggers an instant DM. Leads are automatically captured in your dashboard.', icon: Users },
  ];

  return (
    <section className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(32px, 5vw, 52px)', marginBottom: 16 }}>
            Up and running in <span className="gradient-text">5 minutes</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ color: 'var(--text-secondary)', fontSize: 18 }}>
            No technical knowledge required. If you can post a reel, you can use DynamoDM.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}
        >
          {steps.map((step) => (
            <motion.div key={step.num} variants={fadeUp}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 16, margin: '0 auto 20px',
                  background: 'var(--gradient-brand-soft)', border: '1px solid var(--border-brand)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <step.icon size={26} color="#a78bfa" />
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#7c3aed', letterSpacing: '0.1em', marginBottom: 8 }}>STEP {step.num}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{step.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="section">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(32px, 5vw, 52px)', marginBottom: 16 }}>
            Loved by <span className="gradient-text">10,000+ creators</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
        >
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={fadeUp}>
              <div className="card" style={{ padding: 28 }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} color="#f59e0b" fill="#f59e0b" />
                  ))}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>{t.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${t.color}, #1a1a2e)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 700, color: 'white',
                  }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>{t.handle} · {t.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(32px, 5vw, 52px)', marginBottom: 16 }}>
            Simple, transparent <span className="gradient-text">pricing</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ color: 'var(--text-secondary)', fontSize: 18 }}>
            Start free, upgrade when you&apos;re ready. No hidden fees.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, alignItems: 'start' }}
        >
          {plans.map((plan) => (
            <motion.div key={plan.name} variants={fadeUp}>
              <div
                className={plan.highlighted ? 'gradient-border' : 'card'}
                style={{ padding: 32, position: 'relative', ...(plan.highlighted && { transform: 'scale(1.03)' }) }}
              >
                {plan.badge && (
                  <div style={{
                    position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--gradient-brand)', color: 'white', fontSize: 11, fontWeight: 700,
                    padding: '4px 16px', borderRadius: 999, whiteSpace: 'nowrap',
                  }}>
                    {plan.badge}
                  </div>
                )}
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{plan.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 16 }}>{plan.description}</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontSize: 40, fontWeight: 900 }}>{plan.price}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>{plan.period}</span>
                  </div>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--text-secondary)' }}>
                      <Check size={15} color={plan.highlighted ? '#a78bfa' : '#22c55e'} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href={plan.href}>
                  <button
                    className={plan.highlighted ? 'btn-primary' : 'btn-secondary'}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    {plan.cta}
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="section">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}
        >
          <div className="glass" style={{ padding: '64px 48px', borderRadius: 24, position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', inset: 0, zIndex: 0,
              background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, transparent 70%)',
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(28px, 5vw, 48px)', marginBottom: 16 }}>
                Ready to automate<br />your <span className="gradient-text">Instagram growth?</span>
              </motion.h2>
              <motion.p variants={fadeUp} style={{ color: 'var(--text-secondary)', fontSize: 17, marginBottom: 32 }}>
                Join 50,000+ creators who save hours every day with DynamoDM. Start free — no credit card required.
              </motion.p>
              <motion.div variants={fadeUp} style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/signup">
                  <button className="btn-primary" style={{ fontSize: 16, padding: '14px 32px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    Start Automating Free <ArrowRight size={18} />
                  </button>
                </Link>
              </motion.div>
              <motion.p variants={fadeUp} style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 16 }}>
                Free forever plan · No credit card required · Setup in 5 minutes
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

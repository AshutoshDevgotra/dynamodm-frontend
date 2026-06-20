'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, Users, BarChart3, Camera, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    id: 1, title: 'Welcome to DynamoDM!', icon: Zap, color: '#8b5cf6',
    desc: 'You\'re about to set up the most powerful Instagram automation tool for creators.',
    action: null,
  },
  {
    id: 2, title: 'Connect Instagram', icon: Camera, color: '#ec4899',
    desc: 'Link your Instagram Business or Creator account to enable DM automation.',
    action: { label: 'Connect Instagram', href: '/creator/instagram' },
  },
  {
    id: 3, title: 'Create Your First Automation', icon: Zap, color: '#8b5cf6',
    desc: 'Set a keyword and write the DM response your followers will receive.',
    action: { label: 'Create Automation', href: '/creator/automations/new' },
  },
  {
    id: 4, title: 'Go Live & Share!', icon: Users, color: '#10b981',
    desc: 'Post on Instagram, tell your audience to comment the keyword, and watch leads roll in.',
    action: { label: 'View Dashboard', href: '/creator' },
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const step = steps[currentStep];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 560 }}>
        {/* Progress */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 40 }}>
          {steps.map((s, i) => (
            <div key={s.id} style={{ width: i === currentStep ? 32 : 8, height: 8, borderRadius: 4, background: i <= currentStep ? 'var(--gradient-brand)' : 'var(--bg-card)', border: '1px solid var(--border-default)', transition: 'all 0.4s ease' }} />
          ))}
        </div>

        <motion.div key={currentStep} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <div className="glass-strong" style={{ padding: 48, borderRadius: 24, textAlign: 'center' }}>
            <div style={{ width: 72, height: 72, borderRadius: 20, background: `${step.color}18`, border: `1px solid ${step.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <step.icon size={32} color={step.color} />
            </div>

            <div style={{ fontSize: 13, fontWeight: 600, color: '#a78bfa', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Step {step.id} of {steps.length}
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 14 }}>{step.title}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.7, marginBottom: 36 }}>{step.desc}</p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
              {step.action ? (
                <Link href={step.action.href}>
                  <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {step.action.label} <ArrowRight size={16} />
                  </button>
                </Link>
              ) : null}
              {currentStep < steps.length - 1 && (
                <button onClick={() => setCurrentStep(currentStep + 1)} className={step.action ? 'btn-secondary' : 'btn-primary'} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {step.action ? 'Skip for now' : <><span>Get Started</span><ArrowRight size={16} /></>}
                </button>
              )}
              {currentStep === steps.length - 1 && !step.action && (
                <Link href="/creator">
                  <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CheckCircle size={16} /> Go to Dashboard
                  </button>
                </Link>
              )}
            </div>
          </div>
        </motion.div>

        {/* Step dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 24 }}>
          {steps.map((s, i) => (
            <button key={s.id} onClick={() => setCurrentStep(i)} style={{ width: 8, height: 8, borderRadius: '50%', border: 'none', cursor: 'pointer', background: i === currentStep ? '#8b5cf6' : 'var(--border-default)', transition: 'background 0.3s' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

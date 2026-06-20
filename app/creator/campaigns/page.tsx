'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Plus, BarChart3, Target } from 'lucide-react';

export default function CampaignsPage() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>Campaigns</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Group automation rules into campaigns for post-level tracking.</p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
          <Plus size={16} /> New Campaign
        </button>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="glass" style={{ padding: 64, textAlign: 'center', borderRadius: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Megaphone size={28} color="#8b5cf6" />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Campaigns coming soon</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, maxWidth: 380, margin: '0 auto 24px' }}>
            Group your automation rules into campaigns tied to specific Instagram posts. Track performance at the post level.
          </p>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
            {[{ icon: Target, label: 'Post Tracking' }, { icon: BarChart3, label: 'Campaign Analytics' }, { icon: Megaphone, label: 'Multi-Rule Groups' }].map((f) => (
              <div key={f.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <f.icon size={20} color="var(--text-muted)" />
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

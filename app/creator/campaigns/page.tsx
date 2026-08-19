'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Plus, BarChart3, Target } from 'lucide-react';

export default function CampaignsPage() {
  return (
    <div>
      <div className="creator-page-header--actions">
        <div>
          <h1 className="creator-page-title">Campaigns</h1>
          <p className="creator-page-description">Group automation rules into campaigns for post-level tracking.</p>
        </div>
        <button className="btn-primary">
          <Plus size={16} /> New Campaign
        </button>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="creator-card creator-empty-state">
          <div className="creator-icon-tile mx-auto mb-5 h-16 w-16 rounded-[var(--radius-lg)]"><Megaphone size={28} /></div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Campaigns coming soon</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, maxWidth: 380, margin: '0 auto 24px' }}>
            Group your automation rules into campaigns tied to specific Instagram posts. Track performance at the post level.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
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

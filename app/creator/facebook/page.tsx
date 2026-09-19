'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Camera, ArrowRight, ShieldCheck, Zap, Info } from 'lucide-react';

export default function FacebookPagesDashboard() {
  return (
    <div style={{ maxWidth: 760 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>Facebook Pages</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
          Information regarding Meta and Facebook Page connectivity.
        </p>
      </div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
        <div className="card" style={{ padding: 36, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(139,92,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-from)', flexShrink: 0 }}>
              <Zap size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700 }}>Migrated to Direct Instagram OAuth 2025</h2>
                <span className="badge badge-brand">New</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
                DynamoDM has upgraded to the official Instagram Graph API v23.0. You no longer need to link Facebook Pages or manage complex Facebook business asset permissions.
              </p>
            </div>
          </div>

          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 20, marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, fontWeight: 600, fontSize: 14 }}>
              <ShieldCheck size={18} color="#22c55e" />
              What changed?
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: 'var(--text-muted)', margin: 0, paddingLeft: 20 }}>
              <li>Direct Instagram login without requiring a linked Facebook Page.</li>
              <li>Encrypted AES-256-GCM token storage for high security.</li>
              <li>Faster, real-time webhook processing for post comments and DMs.</li>
            </ul>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Link href="/creator/instagram">
              <button className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                <Camera size={16} /> Go to Instagram Connection <ArrowRight size={14} />
              </button>
            </Link>
            <Link href="/creator/automations">
              <button className="btn-secondary" style={{ fontSize: 14 }}>
                View Automations
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

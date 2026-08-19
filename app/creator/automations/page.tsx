'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Zap, ToggleLeft, ToggleRight, Edit, Trash2, MessageCircle, Target, Clock, Link2 } from 'lucide-react';
import { toast } from '../../components/ui/Toaster';

interface Automation {
  _id: string;
  name: string;
  keywords: string[];
  triggerType: string;
  targetPosts: string[];
  matchType: string;
  responseMessage: string;
  isActive: boolean;
  delaySeconds: number;
  stats: { triggered: number; dmsSent: number; failed: number };
  createdAt: string;
}

export default function AutomationsPage() {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const fetchAutomations = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/automations`, { headers });
    const data = await res.json();
    if (data.success) setAutomations(data.data.automations);
    setLoading(false);
  };

  useEffect(() => { fetchAutomations(); }, // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  const handleToggle = async (id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/automations/${id}/toggle`, { method: 'PATCH', headers });
    setAutomations((prev) => prev.map((a) => a._id === id ? { ...a, isActive: !a.isActive } : a));
    toast('Automation updated', 'success');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this automation? This cannot be undone.')) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/automations/${id}`, { method: 'DELETE', headers });
    setAutomations((prev) => prev.filter((a) => a._id !== id));
    toast('Automation deleted', 'success');
  };

  const matchTypeLabels: Record<string, string> = { exact: 'Exact', contains: 'Contains', starts_with: 'Starts With', regex: 'Regex' };

  return (
    <div>
      <div className="creator-page-header--actions">
        <div>
          <h1 className="creator-page-title">Automations</h1>
          <p className="creator-page-description">Build and manage your Instagram DM automation rules.</p>
        </div>
        <Link href="/creator/automations/new">
          <button className="btn-primary">
            <Plus size={16} /> New Automation
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="h-9 w-9 animate-spin rounded-full border-[3px] border-[var(--brand-border)] border-t-[var(--brand-from)]" /></div>
      ) : automations.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="creator-card creator-empty-state">
            <div className="creator-icon-tile mx-auto mb-5 h-16 w-16 rounded-[var(--radius-lg)]"><Zap size={28} /></div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>No automations yet</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>Create your first automation rule and start converting comments into leads.</p>
            <Link href="/creator/automations/new">
              <button className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Plus size={16} /> Create First Automation</button>
            </Link>
          </div>
        </motion.div>
      ) : (
        <div className="creator-list">
          {automations.map((auto, i) => (
            <motion.div key={auto._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="creator-card creator-card--padded">
                <div className="creator-list__row">
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: auto.isActive ? 'var(--brand-subtle)' : 'var(--bg-card)', border: `1px solid ${auto.isActive ? 'var(--brand-border)' : 'var(--border-subtle)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Zap size={18} color={auto.isActive ? 'var(--brand-from)' : 'var(--text-muted)'} />
                  </div>

                  <div className="creator-list__content">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 700 }}>{auto.name}</h3>
                      <span className={`badge ${auto.isActive ? 'badge-success' : ''}`} style={!auto.isActive ? { background: 'var(--bg-card)', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)' } : {}}>
                        {auto.isActive ? 'Active' : 'Paused'}
                      </span>
                    </div>

                    <div className="creator-list__meta mb-3">
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-secondary)' }}>
                        <Target size={12} /> Keywords: <strong style={{ color: 'var(--brand-from)' }}>&quot;{auto.keywords?.join(', ')}&quot;</strong>
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-muted)' }}>
                        <MessageCircle size={12} /> {auto.triggerType === 'dm' ? 'Direct Message' : 'Post Comment'} ({matchTypeLabels[auto.matchType]})
                      </span>
                      {auto.targetPosts && auto.targetPosts.length > 0 && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-muted)' }}>
                          <Link2 size={12} /> Specific Post
                        </span>
                      )}
                      {auto.delaySeconds !== undefined && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-muted)' }}>
                          <Clock size={12} /> {auto.delaySeconds === 0 ? 'Instant' : auto.delaySeconds >= 60 ? `${auto.delaySeconds / 60}m delay` : `${auto.delaySeconds}s delay`}
                        </span>
                      )}
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-muted)' }}>
                        <Clock size={12} /> {new Date(auto.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div style={{ fontSize: 13, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 500 }}>
                      &ldquo;{auto.responseMessage}&rdquo;
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="creator-list__stats">
                    {[{ label: 'Triggered', value: auto.stats.triggered }, { label: 'DMs Sent', value: auto.stats.dmsSent }, { label: 'Failed', value: auto.stats.failed }].map((s) => (
                      <div key={s.label} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 20, fontWeight: 800 }}>{s.value}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="creator-list__actions">
                    <button onClick={() => handleToggle(auto._id)} title={auto.isActive ? 'Pause' : 'Activate'} className={`creator-list__action ${auto.isActive ? 'creator-list__action--active' : ''}`}>
                      {auto.isActive ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                    </button>
                    <Link href={`/creator/automations/${auto._id}/edit`}>
                      <button title="Edit" className="creator-list__action"><Edit size={16} /></button>
                    </Link>
                    <button onClick={() => handleDelete(auto._id)} title="Delete" className="creator-list__action creator-list__action--danger"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

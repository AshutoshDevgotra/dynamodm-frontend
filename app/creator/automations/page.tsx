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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>Automations</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Build and manage your Instagram DM automation rules.</p>
        </div>
        <Link href="/creator/automations/new">
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
            <Plus size={16} /> New Automation
          </button>
        </Link>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
          <div style={{ width: 36, height: 36, border: '3px solid rgba(139,92,246,0.3)', borderTopColor: '#8b5cf6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      ) : automations.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="glass" style={{ padding: 64, textAlign: 'center', borderRadius: 20 }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Zap size={28} color="#8b5cf6" />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>No automations yet</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>Create your first automation rule and start converting comments into leads.</p>
            <Link href="/creator/automations/new">
              <button className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Plus size={16} /> Create First Automation</button>
            </Link>
          </div>
        </motion.div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {automations.map((auto, i) => (
            <motion.div key={auto._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="card" style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: auto.isActive ? 'rgba(139,92,246,0.15)' : 'var(--bg-card)', border: `1px solid ${auto.isActive ? 'rgba(139,92,246,0.3)' : 'var(--border-subtle)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Zap size={18} color={auto.isActive ? '#8b5cf6' : 'var(--text-muted)'} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 700 }}>{auto.name}</h3>
                      <span className={`badge ${auto.isActive ? 'badge-success' : ''}`} style={!auto.isActive ? { background: 'var(--bg-card)', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)' } : {}}>
                        {auto.isActive ? 'Active' : 'Paused'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-secondary)' }}>
                        <Target size={12} /> Keywords: <strong style={{ color: '#a78bfa' }}>&quot;{auto.keywords?.join(', ')}&quot;</strong>
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
                  <div style={{ display: 'flex', gap: 20, flexShrink: 0 }}>
                    {[{ label: 'Triggered', value: auto.stats.triggered }, { label: 'DMs Sent', value: auto.stats.dmsSent }, { label: 'Failed', value: auto.stats.failed }].map((s) => (
                      <div key={s.label} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 20, fontWeight: 800 }}>{s.value}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                    <button onClick={() => handleToggle(auto._id)} title={auto.isActive ? 'Pause' : 'Activate'} style={{ background: 'none', border: 'none', cursor: 'pointer', color: auto.isActive ? '#8b5cf6' : 'var(--text-muted)', padding: 4 }}>
                      {auto.isActive ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                    </button>
                    <Link href={`/creator/automations/${auto._id}/edit`}>
                      <button title="Edit" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4 }}><Edit size={16} /></button>
                    </Link>
                    <button onClick={() => handleDelete(auto._id)} title="Delete" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: 4 }}><Trash2 size={16} /></button>
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

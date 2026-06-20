'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Save, ExternalLink } from 'lucide-react';
import { toast } from '../../components/ui/Toaster';

export default function ProfilePage() {
  const [form, setForm] = useState({ name: '', avatar: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, { headers })
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setForm({ name: d.data.user.name || '', avatar: d.data.user.avatar || '' });
          setUser({ email: d.data.user.email });
        }
      }).finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        method: 'PUT', headers,
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem('user', JSON.stringify({ ...JSON.parse(localStorage.getItem('user') || '{}'), name: form.name, avatar: form.avatar }));
      toast('Profile updated!', 'success');
    } catch (err: unknown) {
      toast(err instanceof Error ? err.message : 'Failed to update', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: 80 }}>Loading...</div>;

  return (
    <div style={{ maxWidth: 600 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>My Profile</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Update your public creator profile.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="card" style={{ padding: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: form.avatar ? 'transparent' : 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700, color: 'white', overflow: 'hidden', border: '2px solid rgba(139,92,246,0.3)', flexShrink: 0 }}>
              {form.avatar ? <img src={form.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : form.name?.[0]?.toUpperCase() || <User size={32} />}
            </div>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700 }}>{form.name || 'Your Name'}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>{user?.email}</p>
            </div>
          </div>

          <form onSubmit={handleSave}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Display Name</label>
              <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Avatar URL</label>
              <input className="input-field" value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} placeholder="https://..." type="url" />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button type="submit" disabled={saving} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                <Save size={15} /> {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <a href={`/u/creator`} target="_blank" rel="noopener noreferrer">
                <button type="button" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                  <ExternalLink size={14} /> View Public Profile
                </button>
              </a>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

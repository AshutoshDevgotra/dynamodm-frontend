'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Lock, Bell, Palette } from 'lucide-react';
import { toast } from '../../components/ui/Toaster';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({ emailDmFailed: true, emailLeadCapture: false, emailWeeklyReport: true });
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [saving, setSaving] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) { toast('Passwords do not match', 'error'); return; }
    if (passwords.new.length < 8) { toast('Password must be at least 8 characters', 'error'); return; }
    setSaving(true);
    setTimeout(() => { toast('Password updated!', 'success'); setSaving(false); setPasswords({ current: '', new: '', confirm: '' }); }, 1000);
  };

  return (
    <div style={{ maxWidth: 640 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>Settings</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Manage your account preferences.</p>
      </div>

      {/* Security */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="card" style={{ padding: 28, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <Lock size={18} color="#8b5cf6" />
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>Change Password</h2>
          </div>
          <form onSubmit={handlePasswordChange}>
            {[{ label: 'Current Password', key: 'current' }, { label: 'New Password', key: 'new' }, { label: 'Confirm New Password', key: 'confirm' }].map((field) => (
              <div key={field.key} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>{field.label}</label>
                <input type="password" className="input-field" value={passwords[field.key as keyof typeof passwords]}
                  onChange={(e) => setPasswords({ ...passwords, [field.key]: e.target.value })} placeholder="••••••••" />
              </div>
            ))}
            <button type="submit" disabled={saving} className="btn-primary" style={{ marginTop: 8, fontSize: 14 }}>
              {saving ? 'Saving...' : 'Update Password'}
            </button>
          </form>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="card" style={{ padding: 28, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <Bell size={18} color="#06b6d4" />
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>Notifications</h2>
          </div>
          {[
            { key: 'emailDmFailed', label: 'DM Failure Alerts', desc: 'Get notified when DMs fail to deliver' },
            { key: 'emailLeadCapture', label: 'New Lead Notifications', desc: 'Email when a new lead is captured' },
            { key: 'emailWeeklyReport', label: 'Weekly Report', desc: 'Weekly summary of your automation performance' },
          ].map((pref) => (
            <div key={pref.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{pref.label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{pref.desc}</div>
              </div>
              <button onClick={() => { setNotifications({ ...notifications, [pref.key]: !notifications[pref.key as keyof typeof notifications] }); toast('Preference saved', 'success'); }}
                style={{ background: notifications[pref.key as keyof typeof notifications] ? '#8b5cf6' : 'var(--bg-card)', border: `1px solid ${notifications[pref.key as keyof typeof notifications] ? '#8b5cf6' : 'var(--border-default)'}`, borderRadius: 20, width: 44, height: 24, cursor: 'pointer', position: 'relative', transition: 'all 0.3s' }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'white', position: 'absolute', top: 2, left: notifications[pref.key as keyof typeof notifications] ? 22 : 2, transition: 'left 0.3s' }} />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ padding: 24, borderRadius: 14, border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.04)' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#ef4444', marginBottom: 8 }}>⚠️ Danger Zone</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>Permanently delete your account and all associated data. This action cannot be undone.</p>
          <button onClick={() => toast('Contact support@dynamodm.io to delete your account.', 'info')} style={{ padding: '8px 18px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: 8, color: '#ef4444', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
            Delete Account
          </button>
        </div>
      </motion.div>
    </div>
  );
}

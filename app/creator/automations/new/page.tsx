'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Zap, MessageCircle, Link2, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { toast } from '../../../components/ui/Toaster';
import { InstagramPostSelector } from '../../../../components/ui/InstagramPostSelector';

const matchTypes = [
  { value: 'contains', label: 'Contains', desc: 'Comment includes the keyword anywhere' },
  { value: 'exact', label: 'Exact Match', desc: 'Comment must be exactly the keyword' },
  { value: 'starts_with', label: 'Starts With', desc: 'Comment starts with the keyword' },
  { value: 'regex', label: 'Regex', desc: 'Advanced — use regex pattern' },
];

export default function NewAutomationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<{
    name: string;
    keyword: string;
    triggerType: string;
    targetPosts: string[];
    matchType: string;
    responseMessage: string;
    delaySeconds: number;
    ctaLink: string;
    cooldownMinutes: number;
    sendPublicReply: boolean;
    publicReplyMessage: string;
  }>({
    name: '',
    keyword: '',
    triggerType: 'comment',
    targetPosts: [],
    matchType: 'contains',
    responseMessage: '',
    delaySeconds: 0,
    ctaLink: '',
    cooldownMinutes: 60,
    sendPublicReply: false,
    publicReplyMessage: '',
  });

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  const handleSave = async () => {
    if (!form.name || !form.keyword || !form.responseMessage) {
      toast('Please fill all required fields', 'error');
      return;
    }
    if (form.triggerType === 'comment' && form.targetPosts.length === 0) {
      toast('Please select at least one Target Post', 'error');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/automations`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast('Automation created! 🎉', 'success');
      router.push('/creator/automations');
    } catch (err: unknown) {
      toast(err instanceof Error ? err.message : 'Failed to create automation', 'error');
    } finally {
      setSaving(false);
    }
  };

  const steps = [
    { num: 1, label: 'Trigger', icon: MessageCircle },
    { num: 2, label: 'Response', icon: Zap },
    { num: 3, label: 'Settings', icon: Link2 },
  ];

  return (
    <div style={{ maxWidth: 680 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 2 }}>New Automation</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Build a keyword-triggered DM automation rule.</p>
        </div>
      </div>

      {/* Step Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 32 }}>
        {steps.map((s, i) => (
          <div key={s.num} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700,
                background: step > s.num ? '#22c55e' : step === s.num ? 'var(--gradient-brand)' : 'var(--bg-card)',
                border: `1px solid ${step >= s.num ? 'transparent' : 'var(--border-default)'}`,
                color: step >= s.num ? 'white' : 'var(--text-muted)',
              }}>
                {step > s.num ? <CheckCircle size={16} /> : s.num}
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: step >= s.num ? 'var(--text-primary)' : 'var(--text-muted)' }}>{s.label}</span>
            </div>
            {i < steps.length - 1 && <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)', margin: '0 12px' }} />}
          </div>
        ))}
      </div>

      <div className="glass" style={{ padding: 32, borderRadius: 20 }}>
        {/* Step 1 — Trigger */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Configure Trigger</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>What keyword should trigger this automation?</p>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Automation Name *</label>
              <input className="input-field" placeholder="e.g. Free Investment Guide" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Trigger Type *</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div onClick={() => setForm({ ...form, triggerType: 'comment' })} style={{ padding: '12px', border: `2px solid ${form.triggerType === 'comment' ? '#8b5cf6' : 'var(--border-subtle)'}`, borderRadius: 10, cursor: 'pointer', background: form.triggerType === 'comment' ? 'rgba(139,92,246,0.1)' : 'transparent' }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: form.triggerType === 'comment' ? '#a78bfa' : 'var(--text-primary)' }}>Post Comment</div>
                </div>
                <div onClick={() => setForm({ ...form, triggerType: 'dm' })} style={{ padding: '12px', border: `2px solid ${form.triggerType === 'dm' ? '#8b5cf6' : 'var(--border-subtle)'}`, borderRadius: 10, cursor: 'pointer', background: form.triggerType === 'dm' ? 'rgba(139,92,246,0.1)' : 'transparent' }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: form.triggerType === 'dm' ? '#a78bfa' : 'var(--text-primary)' }}>Direct Message</div>
                </div>
              </div>
            </div>

            {form.triggerType === 'comment' && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block' }}>Target Posts *</label>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{form.targetPosts.length} selected</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: 12, marginBottom: 10 }}>Select one or more posts to run this automation on. It will only monitor these specific posts.</p>
                
                <InstagramPostSelector 
                  selectedPostIds={form.targetPosts} 
                  onChange={(ids) => setForm({ ...form, targetPosts: ids })} 
                />
              </div>
            )}

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Trigger Keyword *</label>
              <input className="input-field" placeholder='e.g. SIP, GUIDE, FREE' value={form.keyword}
                onChange={(e) => setForm({ ...form, keyword: e.target.value })} style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 600, letterSpacing: '0.05em' }} />
              <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 6 }}>Case-insensitive. You can enter multiple keywords separated by commas.</p>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 10 }}>Match Type</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {matchTypes.map((m) => (
                  <div key={m.value} onClick={() => setForm({ ...form, matchType: m.value })}
                    style={{
                      padding: '12px 14px', borderRadius: 10, cursor: 'pointer', transition: 'all 0.2s',
                      border: `2px solid ${form.matchType === m.value ? '#8b5cf6' : 'var(--border-subtle)'}`,
                      background: form.matchType === m.value ? 'rgba(139,92,246,0.1)' : 'transparent',
                    }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2, color: form.matchType === m.value ? '#a78bfa' : 'var(--text-primary)' }}>{m.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{m.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2 — Response */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>DM Response</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>What message should be sent when the keyword is detected?</p>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Response Message * <span style={{ color: 'var(--text-muted)' }}>({form.responseMessage.length}/1000)</span></label>
              <textarea className="input-field" rows={5} placeholder="Hey! Thanks for commenting. Here's your free guide 👇&#10;&#10;[link will be added below]"
                value={form.responseMessage} maxLength={1000}
                onChange={(e) => setForm({ ...form, responseMessage: e.target.value })}
                style={{ resize: 'vertical', lineHeight: 1.6 }} />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>CTA Link (optional)</label>
              <input className="input-field" placeholder="https://your-link.com/free-guide" value={form.ctaLink}
                onChange={(e) => setForm({ ...form, ctaLink: e.target.value })} type="url" />
              <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 6 }}>This link will be appended to your message automatically.</p>
            </div>

            {/* Live Preview */}
            <div style={{ padding: '16px 20px', background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 12 }}>
              <div style={{ fontSize: 11, color: '#a78bfa', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>DM Preview</div>
              <div style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
                {form.responseMessage || 'Your message will appear here...'}
                {form.ctaLink && `\n\n${form.ctaLink}`}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3 — Settings */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Advanced Settings</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>Optional — configure delays, cooldowns, and public replies.</p>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Delay Before Sending DM</label>
              <select className="input-field" value={form.delaySeconds} onChange={(e) => setForm({ ...form, delaySeconds: parseInt(e.target.value) })}>
                <option value={0}>Immediately</option>
                <option value={5}>5 seconds</option>
                <option value={15}>15 seconds</option>
                <option value={60}>1 minute</option>
                <option value={300}>5 minutes</option>
                <option value={900}>15 minutes</option>
              </select>
              <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 6 }}>Add a realistic delay so your DMs feel more human.</p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Cooldown Period (minutes)</label>
              <input className="input-field" type="number" min={0} max={10080} value={form.cooldownMinutes}
                onChange={(e) => setForm({ ...form, cooldownMinutes: parseInt(e.target.value) || 60 })} />
              <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 6 }}>Prevent the same user from receiving duplicate DMs within this time window. Default: 60 minutes.</p>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Send Public Reply</label>
                <button onClick={() => setForm({ ...form, sendPublicReply: !form.sendPublicReply })}
                  style={{ background: form.sendPublicReply ? '#8b5cf6' : 'var(--bg-card)', border: `1px solid ${form.sendPublicReply ? '#8b5cf6' : 'var(--border-default)'}`, borderRadius: 20, width: 44, height: 24, cursor: 'pointer', position: 'relative', transition: 'all 0.3s' }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'white', position: 'absolute', top: 2, left: form.sendPublicReply ? 22 : 2, transition: 'left 0.3s' }} />
                </button>
              </div>
              {form.sendPublicReply && (
                <textarea className="input-field" rows={3} placeholder="e.g. Check your DMs! 📩"
                  value={form.publicReplyMessage} onChange={(e) => setForm({ ...form, publicReplyMessage: e.target.value })} />
              )}
            </div>

            {/* Summary */}
            <div style={{ padding: '20px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Summary</div>
              {[
                { label: 'Name', value: form.name },
                { label: 'Keyword', value: form.keyword },
                { label: 'Trigger', value: form.triggerType === 'comment' ? 'Post Comment' : 'Direct Message' },
                { label: 'Target', value: form.targetPosts.length > 0 ? `${form.targetPosts.length} Specific Posts` : 'All Posts' },
                { label: 'Match', value: matchTypes.find(m => m.value === form.matchType)?.label },
                { label: 'Delay', value: form.delaySeconds === 0 ? 'Instant' : form.delaySeconds >= 60 ? `${form.delaySeconds / 60}m` : `${form.delaySeconds}s` },
                { label: 'Cooldown', value: `${form.cooldownMinutes} minutes` },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '4px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{item.label}</span>
                  <span style={{ fontWeight: 600 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28 }}>
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
              <ArrowLeft size={16} /> Back
            </button>
          ) : <div />}

          {step < 3 ? (
            <button onClick={() => {
              if (step === 1 && (!form.name || !form.keyword)) { toast('Name and keyword are required', 'error'); return; }
              if (step === 2 && !form.responseMessage) { toast('Response message is required', 'error'); return; }
              setStep(step + 1);
            }} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
              Next <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
              {saving ? 'Creating...' : <><CheckCircle size={16} /> Create Automation</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

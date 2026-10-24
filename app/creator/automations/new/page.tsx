'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Zap, MessageCircle, Link2, ArrowLeft, ArrowRight, CheckCircle, Camera, Users } from 'lucide-react';
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
  const [checkingInstagram, setCheckingInstagram] = useState(true);
  const [instagramConnected, setInstagramConnected] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [form, setForm] = useState<{
    name: string;
    keyword: string;
    triggerType: string;
    targetPosts: string[];
    matchType: string;
    responseMessage: string;
    ctaLink: string;
    sendPublicReply: boolean;
    publicReplyMessage: string;
    requireFollow: boolean;
    followRequiredMessage: string;
    aiFallback: boolean;
    aiFallbackInstruction: string;
    excludedKeywords: string;
    delaySeconds: number;
    preDms: { type: 'FOLLOW' | 'EMAIL'; message: string }[];
    primaryDmType: 'TEXT' | 'TEXT_BUTTON';
    buttonLabel: string;
    buttonUrl: string;
    trackButtonClicks: boolean;
  }>({
    name: '',
    keyword: '',
    triggerType: 'comment',
    targetPosts: [],
    matchType: 'contains',
    responseMessage: '',
    ctaLink: '',
    sendPublicReply: false,
    publicReplyMessage: 'Thanks for commenting! Check your DMs.\nAmazing — the resource is in your DMs!\nYou got it! Check your inbox 📩',
    requireFollow: true,
    followRequiredMessage: 'First follow us to get the link or any PDF or the resource.',
    aiFallback: false,
    aiFallbackInstruction: '',
    excludedKeywords: '',
    delaySeconds: 60,
    preDms: [],
    primaryDmType: 'TEXT_BUTTON',
    buttonLabel: 'Get the resource',
    buttonUrl: '',
    trackButtonClicks: true,
  });

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  useEffect(() => {
    fetch('/api/instagram/status', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => setInstagramConnected(Boolean(data.success && data.data?.isConnected)))
      .catch(() => setInstagramConnected(false))
      .finally(() => setCheckingInstagram(false));
  }, [token]);

  const handleSave = async () => {
    if (!form.name || !form.keyword || !form.responseMessage) {
      toast('Please fill all required fields', 'error');
      return;
    }
    if (form.triggerType === 'comment' && form.targetPosts.length === 0) {
      toast('Please select at least one Target Post', 'error');
      return;
    }
    if (form.sendPublicReply && !form.publicReplyMessage.trim()) {
      toast('Add a public reply message or turn off the optional public reply', 'error');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/automations', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, publicReplyMessages: form.publicReplyMessage.split(/\r?\n/).map((message) => message.trim()).filter(Boolean) }),
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

  if (checkingInstagram) {
    return <div className="flex min-h-[360px] items-center justify-center"><div className="h-9 w-9 animate-spin rounded-full border-[3px] border-[var(--brand-border)] border-t-[var(--brand-from)]" /></div>;
  }

  if (!instagramConnected) {
    return <div className="mx-auto max-w-xl py-12"><div className="creator-card creator-empty-state"><div className="creator-icon-tile mx-auto mb-5 h-16 w-16 rounded-[var(--radius-lg)]"><Camera size={28} /></div><h1 className="text-2xl font-semibold">Connect Instagram first</h1><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--text-secondary)]">Automations need a connected Instagram account so OrangeFlow can listen for comments and send approved replies.</p><div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row"><button type="button" onClick={() => router.push('/creator/instagram')} className="btn-primary"><Camera size={16} /> Connect Instagram</button><button type="button" onClick={() => router.push('/creator/automations')} className="btn-secondary">Back to automations</button></div></div></div>;
  }

  return (
    <div className="automation-builder" style={{ maxWidth: 760 }}>
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

      <div className="glass automation-builder__card" style={{ padding: 32, borderRadius: 20 }}>
        {/* Step 1 — Trigger */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Configure Trigger</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>Choose where the automation listens and what kind of interaction should trigger it.</p>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Automation Name *</label>
              <input className="input-field" placeholder="e.g. Free Investment Guide" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Trigger Type *</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                <div onClick={() => setForm({ ...form, triggerType: 'comment' })} style={{ padding: '12px', border: `2px solid ${form.triggerType === 'comment' ? '#8b5cf6' : 'var(--border-subtle)'}`, borderRadius: 10, cursor: 'pointer', background: form.triggerType === 'comment' ? 'rgba(139,92,246,0.1)' : 'transparent' }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: form.triggerType === 'comment' ? '#a78bfa' : 'var(--text-primary)' }}>Post Comment</div>
                </div>
                <div onClick={() => setForm({ ...form, triggerType: 'dm' })} style={{ padding: '12px', border: `2px solid ${form.triggerType === 'dm' ? '#8b5cf6' : 'var(--border-subtle)'}`, borderRadius: 10, cursor: 'pointer', background: form.triggerType === 'dm' ? 'rgba(139,92,246,0.1)' : 'transparent' }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: form.triggerType === 'dm' ? '#a78bfa' : 'var(--text-primary)' }}>Direct Message</div>
                </div>
                {([{ value: 'story', label: 'Story reply' }, { value: 'live', label: 'Live comment' }, { value: 'keyword', label: 'Keyword anywhere' }] as const).map((option) => <div key={option.value} onClick={() => setForm({ ...form, triggerType: option.value })} style={{ padding: '12px', border: `2px solid ${form.triggerType === option.value ? '#8b5cf6' : 'var(--border-subtle)'}`, borderRadius: 10, cursor: 'pointer', background: form.triggerType === option.value ? 'rgba(139,92,246,0.1)' : 'transparent' }}><div style={{ fontWeight: 600, fontSize: 13, color: form.triggerType === option.value ? '#a78bfa' : 'var(--text-primary)' }}>{option.label}</div></div>)}
              </div>
            </div>

            <div style={{ marginBottom: 20, padding: 16, border: '1px solid var(--border-subtle)', borderRadius: 12 }}>
              <label style={{ fontSize: 13, fontWeight: 650 }}>Before the primary DM (optional)</label>
              <p style={{ color: 'var(--text-muted)', fontSize: 12, margin: '5px 0 10px' }}>Add a follow or email request that should be sent first.</p>
              {(['FOLLOW', 'EMAIL'] as const).map((type) => <div key={type} style={{ marginTop: 8 }}><input className="input-field" placeholder={type === 'FOLLOW' ? 'DM asking them to follow you' : 'DM asking for their email'} value={form.preDms.find((item) => item.type === type)?.message || ''} onChange={(e) => setForm({ ...form, preDms: [...form.preDms.filter((item) => item.type !== type), ...(e.target.value ? [{ type, message: e.target.value }] : [])] })} /></div>)}
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
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Trigger Keyword {form.triggerType === 'comment' ? '(optional)' : '*'}</label>
              <input className="input-field" placeholder='e.g. SIP, GUIDE, FREE' value={form.keyword}
                onChange={(e) => setForm({ ...form, keyword: e.target.value })} style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 600, letterSpacing: '0.05em' }} />
              <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 6 }}>Leave blank for any comment. Exclusions and AI meaning-match can be configured below.</p>
            </div>

            <div style={{ display: 'grid', gap: 12, marginBottom: 20 }}>
              <input className="input-field" placeholder="Excluded keywords (comma separated)" value={form.excludedKeywords} onChange={(e) => setForm({ ...form, excludedKeywords: e.target.value })} />
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 14, border: '1px solid #60a5fa', borderRadius: 12, background: 'rgba(96,165,250,0.08)', fontSize: 13, fontWeight: 650 }}><input type="checkbox" checked={form.aiFallback} onChange={(e) => setForm({ ...form, aiFallback: e.target.checked })} /> Reply without keywords using AI meaning-match</label>
              {form.aiFallback && <textarea className="input-field" rows={2} placeholder="Describe which comments should count (for example: comments asking for the guide)" value={form.aiFallbackInstruction} onChange={(e) => setForm({ ...form, aiFallbackInstruction: e.target.value })} />}
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

            <div style={{ marginBottom: 20, padding: 16, border: '1px solid var(--border-subtle)', borderRadius: 12 }}><label style={{ fontSize: 13, fontWeight: 650 }}>Set a time delay</label><p style={{ color: 'var(--text-muted)', fontSize: 12, margin: '5px 0 10px' }}>Wait before sending the first DM.</p><input className="input-field" type="number" min={0} max={86400} value={form.delaySeconds} onChange={(e) => setForm({ ...form, delaySeconds: Number(e.target.value) })} /></div>
            <div style={{ marginBottom: 20, padding: 16, border: '1px solid var(--border-subtle)', borderRadius: 12 }}><label style={{ fontSize: 13, fontWeight: 650 }}>Primary DM type</label><select className="input-field" style={{ marginTop: 8 }} value={form.primaryDmType} onChange={(e) => setForm({ ...form, primaryDmType: e.target.value as 'TEXT' | 'TEXT_BUTTON' })}><option value="TEXT_BUTTON">Text + Button</option><option value="TEXT">Text only</option></select>{form.primaryDmType === 'TEXT_BUTTON' && <div style={{ display: 'grid', gap: 8, marginTop: 8 }}><input className="input-field" placeholder="Button label" value={form.buttonLabel} onChange={(e) => setForm({ ...form, buttonLabel: e.target.value })} /><input className="input-field" placeholder="Button URL" value={form.buttonUrl || form.ctaLink} onChange={(e) => setForm({ ...form, buttonUrl: e.target.value, ctaLink: e.target.value })} /><label style={{ fontSize: 12 }}><input type="checkbox" checked={form.trackButtonClicks} onChange={(e) => setForm({ ...form, trackButtonClicks: e.target.checked })} /> Track button clicks</label></div>}</div>

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
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Growth & safety settings</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>Turn comments into followers first, then deliver the resource only after the follow is confirmed.</p>
            <div style={{ padding: 16, marginBottom: 24, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 12 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}><Users size={18} color="#4ade80" /><div><div style={{ fontWeight: 700, fontSize: 13 }}>Follow-to-unlock</div><div style={{ color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.5, marginTop: 4 }}>Followers receive the link/PDF. Everyone else gets a friendly prompt to follow first, creating a path from comment to follower.</div></div></div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, fontSize: 13, fontWeight: 600 }}><input type="checkbox" checked={form.requireFollow} onChange={(e) => setForm({ ...form, requireFollow: e.target.checked })} /> Require a follow before sending the resource</label>
              {form.requireFollow && <textarea className="input-field" rows={2} style={{ marginTop: 10 }} value={form.followRequiredMessage} onChange={(e) => setForm({ ...form, followRequiredMessage: e.target.value })} />}
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Public comment replies (2–3 variants)</label>
                <button onClick={() => setForm({ ...form, sendPublicReply: !form.sendPublicReply })}
                  aria-label={form.sendPublicReply ? 'Disable public comment reply' : 'Enable public comment reply'}
                  style={{ background: form.sendPublicReply ? 'var(--brand-from)' : 'var(--bg-subtle)', border: `1px solid ${form.sendPublicReply ? 'var(--brand-from)' : 'var(--border-strong)'}`, borderRadius: 20, width: 44, height: 24, cursor: 'pointer', position: 'relative', transition: 'all 0.3s' }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'white', position: 'absolute', top: 2, left: form.sendPublicReply ? 22 : 2, transition: 'left 0.3s' }} />
                </button>
              </div>
              {form.sendPublicReply && (
                <textarea className="input-field" rows={4} placeholder={'Thanks for commenting! Check your DMs.\nAmazing — the resource is in your DMs!\nYou got it! Check your inbox 📩'}
                  value={form.publicReplyMessage} onChange={(e) => setForm({ ...form, publicReplyMessage: e.target.value })} />
              )}
              {form.sendPublicReply && <div style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 6 }}>One reply is selected per comment to keep the conversation natural.</div>}
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
              if (step === 1 && (!form.name || (form.triggerType !== 'comment' && !form.keyword))) { toast('Name and the trigger keyword are required for this trigger', 'error'); return; }
              if (step === 2 && !form.responseMessage) { toast('Response message is required', 'error'); return; }
              setStep(step + 1);
            }} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
              Next <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={() => setReviewOpen(true)} disabled={saving} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
              <CheckCircle size={16} /> Review & launch
            </button>
          )}
        </div>
      </div>

      {reviewOpen && (
        <div role="dialog" aria-modal="true" aria-labelledby="launch-title" style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.68)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ width: 'min(620px, 100%)', maxHeight: '92vh', overflowY: 'auto', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 18, boxShadow: '0 24px 80px rgba(0,0,0,0.45)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)' }}>
              <div><h2 id="launch-title" style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Launch AutoDM</h2><p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Awesome! Let&apos;s review once before we launch.</p></div>
              <button type="button" onClick={() => setReviewOpen(false)} aria-label="Close review" style={{ background: 'none', border: 0, color: 'var(--text-muted)', fontSize: 24, cursor: 'pointer', lineHeight: 1 }}>×</button>
            </div>

            <div style={{ padding: 24, display: 'grid', gap: 18 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', padding: 14, background: 'var(--bg-subtle)', borderRadius: 12 }}><div style={{ width: 54, height: 54, borderRadius: 10, background: 'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)', display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 800 }}>IG</div><div><div style={{ fontSize: 13, fontWeight: 750 }}>Comments on this post</div><div style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 4 }}>{form.targetPosts.length ? `${form.targetPosts.length} selected post${form.targetPosts.length > 1 ? 's' : ''}` : 'Any post or reel'}</div></div></div>

              <div style={{ display: 'grid', gap: 10 }}>
                <ReviewRow label="When someone..." value={form.triggerType === 'comment' ? 'comments on this specific post' : form.triggerType === 'story' ? 'replies to your story' : form.triggerType === 'live' ? 'comments on your live' : form.triggerType === 'dm' ? 'sends you a DM' : 'matches the trigger keyword'} />
                {form.keyword && <ReviewRow label="Comment condition" value={`includes “${form.keyword}”`} />}
                {form.excludedKeywords && <ReviewRow label="Excluded keywords" value={form.excludedKeywords} />}
                {form.aiFallback && <ReviewRow label="AI fallback" value={form.aiFallbackInstruction || 'Meaning-match enabled'} />}
                <ReviewRow label="Then wait" value={`${form.delaySeconds || 0} seconds after the trigger`} />
                {form.requireFollow && <ReviewRow label="Before the primary DM" value={form.followRequiredMessage} />}
                {form.preDms.map((item) => <ReviewRow key={item.type} label={item.type === 'FOLLOW' ? 'Pre-DM follow request' : 'Pre-DM email request'} value={item.message} />)}
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}><div style={{ fontSize: 13, fontWeight: 750, marginBottom: 8 }}>Public comment reply · Replies rotate: 1 of {Math.max(1, form.publicReplyMessage.split(/\r?\n/).filter((value) => value.trim()).length)}</div>{form.publicReplyMessage.split(/\r?\n/).filter((value) => value.trim()).map((reply, index) => <div key={`${reply}-${index}`} style={{ color: 'var(--text-secondary)', fontSize: 13, padding: '6px 0' }}><strong>{index + 1}.</strong> {reply}</div>)}</div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}><div style={{ fontSize: 13, fontWeight: 750, marginBottom: 8 }}>Message to your audience</div><div style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.65, whiteSpace: 'pre-wrap', background: 'var(--bg-subtle)', padding: 14, borderRadius: 10 }}>{form.responseMessage || 'Your primary DM will appear here.'}{form.ctaLink && `\n\n${form.ctaLink}`}</div>{form.primaryDmType === 'TEXT_BUTTON' && <div style={{ marginTop: 8, color: 'var(--brand-from)', fontSize: 12 }}>Button: {form.buttonLabel || 'Get the resource'}{form.trackButtonClicks ? ' · Click tracking on' : ''}</div>}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, padding: '16px 24px', borderTop: '1px solid var(--border-subtle)' }}><button type="button" className="btn-secondary" onClick={() => setReviewOpen(false)}>Back</button><button type="button" className="btn-primary" disabled={saving} onClick={handleSave}>{saving ? 'Launching...' : 'Confirm & launch'}</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: 12, fontSize: 13, padding: '7px 0', borderBottom: '1px solid var(--border-subtle)' }}><span style={{ color: 'var(--text-muted)' }}>{label}</span><span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{value}</span></div>;
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Zap, MessageCircle, Link2, ArrowLeft, ArrowRight, CheckCircle, Users } from 'lucide-react';
import { toast } from '../../../../components/ui/Toaster';
import { InstagramPostSelector } from '../../../../../components/ui/InstagramPostSelector';

const matchTypes = [
  { value: 'contains', label: 'Contains', desc: 'Comment includes the keyword anywhere' },
  { value: 'exact', label: 'Exact Match', desc: 'Comment must be exactly the keyword' },
  { value: 'starts_with', label: 'Starts With', desc: 'Comment starts with the keyword' },
  { value: 'regex', label: 'Regex', desc: 'Advanced — use regex pattern' },
];

export default function EditAutomationPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
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
  });

  useEffect(() => {
    const fetchAutomation = async () => {
      try {
        const { id } = await params;
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/automations/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          const rule = data.data.automation;
          const keywords = Array.isArray(rule.keywords)
            ? rule.keywords.join(', ')
            : Array.isArray(rule.trigger?.keywords)
            ? rule.trigger.keywords.join(', ')
            : rule.keyword || '';
          const triggerType = (rule.triggerType || rule.trigger?.type || 'comment').toLowerCase();
          const targetPosts = rule.targetPosts || (rule.trigger?.postId ? [rule.trigger.postId] : []);
          const sendDmStep = rule.flow?.find((s: any) => s.type === 'SEND_DM');
          const responseMessage = rule.responseMessage || sendDmStep?.content || '';

          setForm({
            name: rule.name || '',
            keyword: keywords,
            triggerType,
            targetPosts,
            matchType: rule.matchType || 'contains',
            responseMessage,
            ctaLink: rule.ctaLink || '',
            sendPublicReply: rule.sendPublicReply || false,
            publicReplyMessage: rule.publicReplyMessage || '',
            requireFollow: rule.requireFollow ?? false,
            followRequiredMessage: rule.followRequiredMessage || 'First follow us to get the link or any PDF or the resource.',
          });
        } else {
          toast(data.message || 'Failed to load automation', 'error');
          router.push('/creator/automations');
        }
      } catch (err) {
        toast('Failed to load automation', 'error');
      } finally {
        setLoadingInitial(false);
      }
    };
    fetchAutomation();
  }, [params, router]);

    const handleSave = async () => {
      if (form.sendPublicReply && !form.publicReplyMessage.trim()) {
        toast('Add a public reply message or turn off the optional public reply', 'error');
        return;
      }
    if (!form.name || !form.keyword || !form.responseMessage) {
      toast('Please fill all required fields', 'error');
      return;
    }
    if (form.triggerType === 'comment' && form.targetPosts.length === 0) {
      toast('Please select at least one Target Post', 'error');
      return;
    }
    const token = localStorage.getItem('token');
    setSaving(true);
    try {
      const { id } = await params;
      const res = await fetch(`/api/automations/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, publicReplyMessages: form.publicReplyMessage.split(/\r?\n/).map((message) => message.trim()).filter(Boolean) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast('Automation updated! 🎉', 'success');
      router.push('/creator/automations');
    } catch (err: unknown) {
      toast(err instanceof Error ? err.message : 'Failed to update automation', 'error');
    } finally {
      setSaving(false);
    }
  };

  const steps = [
    { num: 1, label: 'Trigger', icon: MessageCircle },
    { num: 2, label: 'Response', icon: Zap },
    { num: 3, label: 'Settings', icon: Link2 },
  ];

  if (loadingInitial) {
    return <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Loading automation...</div>;
  }

  return (
    <div className="automation-builder" style={{ maxWidth: 760 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 2 }}>Edit Automation</h1>
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
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Growth & safety settings</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>Turn comments into followers first, then deliver the resource only after the follow is confirmed.</p>
            <div style={{ padding: 16, marginBottom: 24, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 12 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}><Users size={18} color="#4ade80" /><div><div style={{ fontWeight: 700, fontSize: 13 }}>Follow-to-unlock</div><div style={{ color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.5, marginTop: 4 }}>Followers receive the link/PDF. Everyone else gets a friendly prompt to follow first.</div></div></div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 14 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 650 }}>Require a follow before the primary DM</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 3 }}>{form.requireFollow ? 'On — non-followers get a Follow us button first.' : 'Off — everyone receives the primary DM immediately.'}</div>
                </div>
                <button type="button" onClick={() => setForm({ ...form, requireFollow: !form.requireFollow })} aria-pressed={form.requireFollow} aria-label={form.requireFollow ? 'Disable follow-to-unlock' : 'Enable follow-to-unlock'} style={{ flexShrink: 0, width: 48, height: 28, padding: 2, border: `1px solid ${form.requireFollow ? 'var(--brand-from)' : 'var(--border-strong)'}`, borderRadius: 999, background: form.requireFollow ? 'var(--brand-from)' : 'var(--bg-subtle)', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <span style={{ display: 'block', width: 22, height: 22, borderRadius: '50%', background: '#fff', transform: `translateX(${form.requireFollow ? 18 : 0}px)`, transition: 'transform 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,.2)' }} />
                </button>
              </div>
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
              if (step === 1 && (!form.name || !form.keyword)) { toast('Name and keyword are required', 'error'); return; }
              if (step === 2 && !form.responseMessage) { toast('Response message is required', 'error'); return; }
              setStep(step + 1);
            }} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
              Next <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
              {saving ? 'Updating...' : <><CheckCircle size={16} /> Update Automation</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

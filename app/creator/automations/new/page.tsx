'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Zap, MessageCircle, Link2, ArrowLeft, ArrowRight, CheckCircle, Camera, Users, Mail } from 'lucide-react';
import { toast } from '../../../components/ui/Toaster';
import { InstagramPostSelector } from '../../../../components/ui/InstagramPostSelector';
import { trackCustom } from '../../../../lib/fbq';
import ResponseComposer, { type ResponseComposerValue } from '../components/ResponseComposer';
import KeywordChips from '../components/KeywordChips';

const defaultComposer: ResponseComposerValue = {
  responseMessage: '',
  ctaLink: '',
  buttons: [],
  attachmentUrl: '',
  attachment: null,
  primaryDmType: 'TEXT',
  buttonLabel: '',
  buttonUrl: '',
  trackButtonClicks: true,
};

export default function NewAutomationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [checkingInstagram, setCheckingInstagram] = useState(true);
  const [instagramConnected, setInstagramConnected] = useState(false);
  const [instagramAccounts, setInstagramAccounts] = useState<{ _id: string; igUsername?: string }[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState('');
  const [reviewOpen, setReviewOpen] = useState(false);
  const [composer, setComposer] = useState<ResponseComposerValue>(defaultComposer);
  const [form, setForm] = useState<{
    name: string;
    keyword: string;
    triggerType: string;
    targetPosts: string[];
    sendPublicReply: boolean;
    publicReplyMessage: string;
    requireFollow: boolean;
    followRequiredMessage: string;
    delaySeconds: number;
    preDms: { type: 'FOLLOW' | 'EMAIL'; message: string }[];
  }>({
    name: '',
    keyword: '',
    triggerType: 'comment',
    targetPosts: [],
    sendPublicReply: false,
    publicReplyMessage: 'Thanks for commenting! Check your DMs.\nAmazing — the resource is in your DMs!\nYou got it! Check your inbox 📩',
    requireFollow: false,
    followRequiredMessage: 'Follow us.',
    delaySeconds: 0,
    preDms: [],
  });

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') ?? '' : '';

  useEffect(() => {
    fetch('/api/instagram/status', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => { const accounts = Array.isArray(data.data?.accounts) ? data.data.accounts : []; setInstagramAccounts(accounts); setSelectedAccountId(accounts[0]?._id || ''); setInstagramConnected(Boolean(data.success && data.data?.isConnected)); })
      .catch(() => setInstagramConnected(false))
      .finally(() => setCheckingInstagram(false));
  }, [token]);

  const handleSave = async () => {
    if (!composer.responseMessage) {
      toast('Please add a response message', 'error');
      return;
    }
    const hasIncompleteButton = composer.buttons.some(
      (b) => (b.title.trim() && !b.url.trim()) || (!b.title.trim() && b.url.trim())
    );
    if (hasIncompleteButton) {
      toast('Please provide both a label and a destination URL for your button', 'error');
      return;
    }
    if (form.triggerType === 'comment' && form.targetPosts.length === 0) {
      toast('Select a target post or reel before continuing', 'error');
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
        body: JSON.stringify({
          ...form,
          instagramAccountId: selectedAccountId,
          responseMessage: composer.responseMessage,
          ctaLink: composer.ctaLink,
          buttons: composer.buttons,
          attachmentUrl: composer.attachmentUrl,
          primaryDmType: composer.primaryDmType,
          buttonLabel: composer.buttonLabel,
          buttonUrl: composer.buttonUrl,
          trackButtonClicks: composer.trackButtonClicks,
          publicReplyMessages: form.publicReplyMessage.split(/\r?\n/).map((m) => m.trim()).filter(Boolean),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      trackCustom('CreateAutomation');
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
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Automation identity</label>
              <div className="input-field" style={{ color: 'var(--text-muted)', background: 'var(--bg-subtle)' }}>Generated automatically from your Instagram account</div>
            </div>

            {instagramAccounts.length > 1 && <div style={{ marginBottom: 20 }}><label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Instagram account for this automation</label><select className="input-field" value={selectedAccountId} onChange={(event) => setSelectedAccountId(event.target.value)}>{instagramAccounts.map((account) => <option key={account._id} value={account._id}>@{account.igUsername || 'Instagram account'}</option>)}</select><p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 6 }}>This automation will run only for the selected account.</p></div>}

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Trigger Type *</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                <div onClick={() => setForm({ ...form, triggerType: 'comment' })} style={{ padding: '12px', border: `2px solid ${form.triggerType === 'comment' ? 'var(--brand-from)' : 'var(--border-subtle)'}`, borderRadius: 10, cursor: 'pointer', background: form.triggerType === 'comment' ? 'var(--brand-subtle)' : 'transparent' }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: form.triggerType === 'comment' ? 'var(--brand-from)' : 'var(--text-primary)' }}>Post Comment</div>
                </div>
                <div onClick={() => setForm({ ...form, triggerType: 'dm' })} style={{ padding: '12px', border: `2px solid ${form.triggerType === 'dm' ? 'var(--brand-from)' : 'var(--border-subtle)'}`, borderRadius: 10, cursor: 'pointer', background: form.triggerType === 'dm' ? 'var(--brand-subtle)' : 'transparent' }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: form.triggerType === 'dm' ? 'var(--brand-from)' : 'var(--text-primary)' }}>Direct Message</div>
                </div>
                {([{ value: 'story', label: 'Story reply' }, { value: 'live', label: 'Live comment' }] as const).map((option) => <div key={option.value} onClick={() => setForm({ ...form, triggerType: option.value })} style={{ padding: '12px', border: `2px solid ${form.triggerType === option.value ? 'var(--brand-from)' : 'var(--border-subtle)'}`, borderRadius: 10, cursor: 'pointer', background: form.triggerType === option.value ? 'var(--brand-subtle)' : 'transparent' }}><div style={{ fontWeight: 600, fontSize: 13, color: form.triggerType === option.value ? 'var(--brand-from)' : 'var(--text-primary)' }}>{option.label}</div></div>)}
              </div>
            </div>

            {form.triggerType === 'comment' && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block' }}>Target post or reel *</label>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{form.targetPosts.length} selected</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: 12, marginBottom: 10 }}>Select at least one target post or reel. This automation cannot be activated without a target.</p>
                
                <InstagramPostSelector 
                  selectedPostIds={form.targetPosts} 
                  onChange={(ids) => setForm({ ...form, targetPosts: ids })} 
                />
              </div>
            )}

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Trigger Keyword {form.triggerType === 'comment' ? '(optional)' : '*'}</label>
              <KeywordChips keywords={form.keyword.split(',').map((item) => item.trim()).filter(Boolean)} onChange={(keywords) => setForm({ ...form, keyword: keywords.join(', ') })} />
            </div>
          </motion.div>
        )}

        {/* Step 2 — Response */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>DM Response</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>Craft the message sent when the trigger fires. Add emojis, a PDF, or up to 3 buttons.</p>

            <ResponseComposer
              value={composer}
              onChange={setComposer}
              token={token}
            />

            <div style={{ marginTop: 20, padding: 16, border: '1px solid var(--border-subtle)', borderRadius: 12 }}>
              <label style={{ fontSize: 13, fontWeight: 650 }}>Optional time delay</label>
              <p style={{ color: 'var(--text-muted)', fontSize: 12, margin: '5px 0 10px' }}>Default is immediate. You can delay the first DM by up to 60 seconds.</p>
              <input className="input-field" type="number" min={0} max={60} value={form.delaySeconds} onChange={(e) => setForm({ ...form, delaySeconds: Math.min(60, Math.max(0, Number(e.target.value) || 0)) })} />
            </div>
          </motion.div>
        )}

        {/* Step 3 — Settings */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Growth & safety settings</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>Turn comments into followers first, then deliver the resource only after the follow is confirmed.</p>
            <div style={{ padding: 16, marginBottom: 24, background: 'rgba(236,72,153,0.07)', border: '1px solid rgba(236,72,153,0.24)', borderRadius: 12 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}><Mail size={18} color="#ec4899" /><div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 13 }}>Ask for their email</div><div style={{ color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.5, marginTop: 4 }}>Send a clear email request before the primary resource DM. Captured emails appear in Leads.</div></div></div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 14 }}><input type="checkbox" checked={form.preDms.some((item) => item.type === 'EMAIL')} onChange={(event) => setForm({ ...form, preDms: event.target.checked ? [{ type: 'EMAIL', message: 'Reply with your email address and I will send you updates.' }] : form.preDms.filter((item) => item.type !== 'EMAIL') })} /><span style={{ fontSize: 13, fontWeight: 650 }}>Collect email before sending the main DM</span></div>
              {form.preDms.some((item) => item.type === 'EMAIL') && <textarea className="input-field" rows={2} style={{ marginTop: 10 }} value={form.preDms.find((item) => item.type === 'EMAIL')?.message || ''} onChange={(event) => setForm({ ...form, preDms: form.preDms.map((item) => item.type === 'EMAIL' ? { ...item, message: event.target.value } : item) })} placeholder="Reply with your email address and I will send you updates." />}
            </div>
            <div style={{ padding: 16, marginBottom: 24, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 12 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}><Users size={18} color="#4ade80" /><div><div style={{ fontWeight: 700, fontSize: 13 }}>Follow-to-unlock</div><div style={{ color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.5, marginTop: 4 }}>Followers receive the link/PDF. Everyone else gets a friendly prompt to follow first, creating a path from comment to follower.</div></div></div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 14 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 650 }}>Require a follow before the primary DM</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 3 }}>{form.requireFollow ? 'On — non-followers get Follow us and Already followed buttons first.' : 'Off — everyone receives the primary DM immediately.'}</div>
                </div>
                <button type="button" onClick={() => setForm({ ...form, requireFollow: !form.requireFollow })} aria-pressed={form.requireFollow} aria-label={form.requireFollow ? 'Disable follow-to-unlock' : 'Enable follow-to-unlock'} style={{ flexShrink: 0, width: 48, height: 28, padding: 2, border: `1px solid ${form.requireFollow ? 'var(--brand-from)' : 'var(--border-strong)'}`, borderRadius: 999, background: form.requireFollow ? 'var(--brand-from)' : 'var(--bg-subtle)', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <span style={{ display: 'block', width: 22, height: 22, borderRadius: '50%', background: '#fff', transform: `translateX(${form.requireFollow ? 18 : 0}px)`, transition: 'transform 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,.2)' }} />
                </button>
              </div>
              {form.requireFollow && <div style={{ marginTop: 10, padding: '10px 12px', borderRadius: 10, background: 'var(--bg-subtle)', color: 'var(--text-secondary)', fontSize: 12 }}>Non-followers receive: <strong>“Follow us.”</strong> with a <strong>Follow</strong> button linking to your Instagram profile.</div>}
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
                { label: 'Trigger', value: form.triggerType === 'comment' ? 'Post or Reel Comment' : form.triggerType === 'story' ? 'Story Reply' : form.triggerType === 'live' ? 'Live Comment' : 'Direct Message' },
                ...(form.triggerType === 'comment' ? [{ label: 'Target', value: `${form.targetPosts.length} selected post${form.targetPosts.length === 1 ? '' : 's'}` }] : []),
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
              if (step === 1 && !form.keyword.trim()) { toast('Add at least one trigger word with the + button', 'error'); return; }
              if (step === 1 && form.triggerType === 'comment' && form.targetPosts.length === 0) { toast('Select a target post or reel before continuing', 'error'); return; }
              if (step === 2 && !composer.responseMessage) { toast('Response message is required', 'error'); return; }
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
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', padding: 14, background: 'var(--bg-subtle)', borderRadius: 12 }}><div style={{ width: 54, height: 54, borderRadius: 10, background: 'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)', display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 800 }}>IG</div><div><div style={{ fontSize: 13, fontWeight: 750 }}>Instagram trigger</div><div style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 4 }}>{form.targetPosts.length ? `${form.targetPosts.length} selected post${form.targetPosts.length > 1 ? 's' : ''}` : form.triggerType === 'dm' ? 'Direct messages' : 'No target selected'}</div></div></div>

              <div style={{ display: 'grid', gap: 10 }}>
                <ReviewRow label="When someone..." value={form.triggerType === 'comment' ? 'comments on this post or reel' : form.triggerType === 'story' ? 'replies to the selected story content' : form.triggerType === 'live' ? 'comments during the selected live' : 'sends a direct message'} />
                {form.keyword && <ReviewRow label="Comment condition" value={`includes “${form.keyword}”`} />}
                <ReviewRow label="Then wait" value={`${form.delaySeconds || 0} seconds after the trigger`} />
                {form.requireFollow && <ReviewRow label="Before the primary DM" value={form.followRequiredMessage} />}
                {form.preDms.map((item) => <ReviewRow key={item.type} label={item.type === 'FOLLOW' ? 'Pre-DM follow request' : 'Pre-DM email request'} value={item.message} />)}
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}><div style={{ fontSize: 13, fontWeight: 750, marginBottom: 8 }}>Public comment reply · Replies rotate: 1 of {Math.max(1, form.publicReplyMessage.split(/\r?\n/).filter((value) => value.trim()).length)}</div>{form.publicReplyMessage.split(/\r?\n/).filter((value) => value.trim()).map((reply, index) => <div key={`${reply}-${index}`} style={{ color: 'var(--text-secondary)', fontSize: 13, padding: '6px 0' }}><strong>{index + 1}.</strong> {reply}</div>)}</div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}><div style={{ fontSize: 13, fontWeight: 750, marginBottom: 8 }}>Message to your audience</div><div style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.65, whiteSpace: 'pre-wrap', background: 'var(--bg-subtle)', padding: 14, borderRadius: 10 }}>{composer.responseMessage || 'Your primary DM will appear here.'}{composer.ctaLink && `\n\n${composer.ctaLink}`}</div>{composer.buttons.filter(b => b.title && b.url).map((b, i) => <div key={i} style={{ marginTop: 6, color: 'var(--brand-from)', fontSize: 12 }}>Button {i + 1}: {b.title} → {b.url}</div>)}{composer.attachment && <div style={{ marginTop: 6, fontSize: 12, color: 'var(--text-muted)' }}>📎 {composer.attachment.name}</div>}</div>
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

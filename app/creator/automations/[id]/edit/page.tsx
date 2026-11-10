'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Zap, MessageCircle, Link2, ArrowLeft, ArrowRight, CheckCircle, Users, Mail } from 'lucide-react';
import { toast } from '../../../../components/ui/Toaster';
import { InstagramPostSelector } from '../../../../../components/ui/InstagramPostSelector';
import ResponseComposer, { type ResponseComposerValue } from '../../components/ResponseComposer';
import KeywordChips from '../../components/KeywordChips';

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

export default function EditAutomationPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
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
    requireFollow: true,
    followRequiredMessage: 'Follow us.',
    delaySeconds: 0,
    preDms: [],
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
          const rawTriggerType = (rule.triggerType || rule.trigger?.type || 'comment').toLowerCase();
          const triggerType = rawTriggerType === 'story_reply' ? 'story' : rawTriggerType === 'live_comment' ? 'live' : rawTriggerType;
          const targetPosts = rule.targetPosts || (rule.trigger?.postId ? [rule.trigger.postId] : []);
          const sendDmStep = rule.flow?.find((s: any) => s.type === 'SEND_DM');
          const responseMessage = rule.responseMessage || sendDmStep?.content || '';

          setForm({
            name: rule.name || '',
            keyword: keywords,
            triggerType,
            targetPosts,
            sendPublicReply: rule.sendPublicReply || false,
            publicReplyMessage: rule.publicReplyMessage || '',
            requireFollow: rule.requireFollow ?? false,
            followRequiredMessage: 'Follow us.',
            delaySeconds: Math.min(60, Math.max(0, Number(rule.delaySeconds) || 0)),
            preDms: Array.isArray(rule.preDms) ? rule.preDms : [],
          });

          // Populate composer from stored primaryDm and attachment
          const existingButtons: { title: string; url: string }[] = Array.isArray((rule.primaryDm as any)?.buttons)
            ? (rule.primaryDm as any).buttons.map((b: any) => ({ title: b.title || '', url: b.url || '' }))
            : rule.primaryDm?.buttonUrl && rule.primaryDm?.buttonLabel
            ? [{ title: rule.primaryDm.buttonLabel, url: rule.primaryDm.buttonUrl }]
            : [];

          setComposer({
            responseMessage,
            ctaLink: rule.ctaLink || existingButtons[0]?.url || '',
            buttons: existingButtons,
            attachmentUrl: sendDmStep?.attachment || '',
            attachment: sendDmStep?.attachment
              ? { attachmentId: '', name: 'Existing attachment', size: 0, mimeType: 'application/pdf', url: sendDmStep.attachment }
              : null,
            primaryDmType: existingButtons.length > 0 ? 'TEXT_BUTTON' : 'TEXT',
            buttonLabel: existingButtons[0]?.title || rule.primaryDm?.buttonLabel || '',
            buttonUrl: existingButtons[0]?.url || rule.primaryDm?.buttonUrl || '',
            trackButtonClicks: rule.primaryDm?.trackButtonClicks ?? true,
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
    const emailPrompt = form.preDms.find((item) => item.type === 'EMAIL');
    if (emailPrompt && !emailPrompt.message.trim()) {
      toast('Add the email request message or turn off email collection', 'error');
      return;
    }
    if (!form.keyword || !composer.responseMessage) {
      toast('Please fill all required fields', 'error');
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
      toast('Select a target post or reel before saving', 'error');
      return;
    }
    const token = localStorage.getItem('token');
    setSaving(true);
    try {
      const { id } = await params;
      const res = await fetch(`/api/automations/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
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
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Automation identity</label>
              <div className="input-field" style={{ color: 'var(--text-muted)', background: 'var(--bg-subtle)' }}>{form.name || 'Generated automatically from your Instagram account'}</div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Trigger Type *</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
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
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Trigger Keyword *</label>
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
              token={typeof window !== 'undefined' ? localStorage.getItem('token') ?? '' : ''}
            />

            <div style={{ marginTop: 20, padding: 16, border: '1px solid var(--border-subtle)', borderRadius: 12 }}>
              <label style={{ fontSize: 13, fontWeight: 650 }}>Optional time delay</label>
              <p style={{ color: 'var(--text-muted)', fontSize: 12, margin: '5px 0 10px' }}>Default is immediate. Maximum delay is 60 seconds.</p>
              <input className="input-field" type="number" min={0} max={60} value={form.delaySeconds} onChange={(e) => setForm({ ...form, delaySeconds: Math.min(60, Math.max(0, Number(e.target.value) || 0)) })} />
            </div>
          </motion.div>
        )}

        {/* Step 3 — Settings */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Growth & safety settings</h2>
            <div style={{ marginBottom: 20, padding: 16, border: '1px solid var(--border-subtle)', borderRadius: 12 }}><label style={{ fontSize: 13, fontWeight: 650 }}>Optional time delay</label><p style={{ color: 'var(--text-muted)', fontSize: 12, margin: '5px 0 10px' }}>Default is immediate. Maximum delay is 60 seconds.</p><input className="input-field" type="number" min={0} max={60} value={form.delaySeconds} onChange={(e) => setForm({ ...form, delaySeconds: Math.min(60, Math.max(0, Number(e.target.value) || 0)) })} /></div>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>Turn comments into followers first, then deliver the resource only after the follow is confirmed.</p>
            <div style={{ padding: 18, marginBottom: 24, background: 'rgba(236,72,153,0.07)', border: '1px solid rgba(236,72,153,0.24)', borderRadius: 16 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}><Mail size={18} color="#ec4899" /><div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 13 }}>Ask for their email</div><div style={{ color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.5, marginTop: 4 }}>Ask for a valid address such as user@gmail.com. Captured replies are saved to Leads.</div></div></div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 16 }}><input type="checkbox" checked={form.preDms.some((item) => item.type === 'EMAIL')} onChange={(event) => setForm({ ...form, preDms: event.target.checked ? [{ type: 'EMAIL', message: 'Reply with a valid email address, like user@gmail.com, and I will send you updates.' }] : form.preDms.filter((item) => item.type !== 'EMAIL') })} /><span style={{ fontSize: 13, fontWeight: 650 }}>Collect email before sending the main DM</span></div>
              {form.preDms.some((item) => item.type === 'EMAIL') && <><textarea className="input-field" rows={3} style={{ marginTop: 12 }} value={form.preDms.find((item) => item.type === 'EMAIL')?.message || ''} onChange={(event) => setForm({ ...form, preDms: form.preDms.map((item) => item.type === 'EMAIL' ? { ...item, message: event.target.value } : item) })} placeholder="Reply with a valid email address, like user@gmail.com, and I will send you updates." /><p style={{ color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.5, margin: '8px 0 0' }}>Valid replies are saved to Leads.</p></>}
            </div>
            <div style={{ padding: 16, marginBottom: 24, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 12 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}><Users size={18} color="#4ade80" /><div><div style={{ fontWeight: 700, fontSize: 13 }}>Follow-to-unlock</div><div style={{ color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.5, marginTop: 4 }}>Followers receive the link/PDF. Everyone else gets a friendly prompt to follow first.</div></div></div>
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
            <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
              {saving ? 'Updating...' : <><CheckCircle size={16} /> Update Automation</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

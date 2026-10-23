'use client';

import { useEffect, useState } from 'react';
import { Bot, Check, Info, Save, Sparkles } from 'lucide-react';
import { toast } from '../../components/ui/Toaster';

const initialContext = { businessName: '', description: '', products: '', policies: '', tone: 'Helpful, warm, concise, and confident', instructions: '' };

export default function BrandContextPage() {
  const [form, setForm] = useState(initialContext);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/brand/context', { headers: { Authorization: `Bearer ${token}` } }).then(async (res) => { if (!res.ok) return; const data = await res.json(); if (data.success && data.data?.context) setForm({ ...initialContext, ...data.data.context }); }).catch(() => {}).finally(() => setLoaded(true));
  }, []);

  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const save = async (event: React.FormEvent) => {
    event.preventDefault(); setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/brand/context', { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error('Unable to save');
      toast('AI context saved', 'success');
    } catch { toast('Context saved locally for this session. Connect the business API to persist it.', 'info'); }
    finally { setSaving(false); }
  };

  const fields: { key: keyof typeof form; label: string; placeholder: string; rows: number }[] = [
    { key: 'businessName', label: 'Business or brand name', placeholder: 'e.g. House of Orange', rows: 1 },
    { key: 'description', label: 'What does your business do?', placeholder: 'Describe your brand, audience, locations, and what makes you different.', rows: 4 },
    { key: 'products', label: 'Products, services, and links', placeholder: 'Add product names, prices, sizes, availability, and purchase links. One product per line.', rows: 7 },
    { key: 'policies', label: 'Policies and frequently asked questions', placeholder: 'Shipping, returns, payment, delivery timelines, support hours, and questions the AI should answer.', rows: 7 },
    { key: 'instructions', label: 'Anything the AI should always remember', placeholder: 'For example: never promise a discount, ask for a phone number only when needed, or hand off complaints to a human.', rows: 4 },
  ];

  return <div className="mx-auto max-w-4xl"><div className="creator-page-header"><div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-from)]"><Bot size={14} /> AI knowledge base</div><h1 className="creator-page-title">Teach Orange Flow about your business</h1><p className="creator-page-description max-w-2xl">Add the information your AI needs to answer Instagram customers accurately. This context powers replies to DMs and comment-triggered conversations.</p></div><div className="mb-6 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900"><Info size={18} className="mt-0.5 shrink-0" /><div><p className="font-semibold">Your context stays in your workspace</p><p className="mt-1 text-blue-800">Keep product details, links, policies, and tone of voice up to date so customers get the right answer instead of a generic reply.</p></div></div><form onSubmit={save} className="space-y-5">{fields.map((field) => <label key={field.key} className="block rounded-2xl border border-black/6 bg-white p-5 shadow-[var(--shadow-sm)]"><span className="mb-2 block text-sm font-semibold">{field.label}</span>{field.rows === 1 ? <input value={form[field.key]} onChange={(e) => update(field.key, e.target.value)} placeholder={field.placeholder} className="input-field" /> : <textarea value={form[field.key]} onChange={(e) => update(field.key, e.target.value)} placeholder={field.placeholder} rows={field.rows} className="input-field resize-y" />}</label>)}<label className="block rounded-2xl border border-black/6 bg-white p-5 shadow-[var(--shadow-sm)]"><span className="mb-2 block text-sm font-semibold">Preferred reply style</span><input value={form.tone} onChange={(e) => update('tone', e.target.value)} className="input-field" /><p className="mt-2 text-xs text-zinc-400">Describe how your brand should sound: formal, playful, Hinglish, concise, or detailed.</p></label><div className="flex flex-col justify-between gap-4 rounded-2xl bg-[#0b1220] p-5 text-white sm:flex-row sm:items-center"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"><Sparkles size={18} /></div><div><p className="font-semibold">Ready for smarter replies?</p><p className="text-sm text-zinc-400">{loaded ? 'Your context is ready to save.' : 'Loading your saved context…'}</p></div></div><button type="submit" disabled={saving} className="btn-primary !bg-white !text-zinc-900"><Save size={16} />{saving ? 'Saving…' : 'Save AI context'}</button></div></form></div>;
}

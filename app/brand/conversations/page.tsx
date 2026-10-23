'use client';

import { useEffect, useMemo, useState } from 'react';
import { Bot, Camera as Instagram, CheckCheck, MessageCircle, Search, Send, UserRound } from 'lucide-react';
import { toast } from '../../components/ui/Toaster';

type Conversation = { id: string; handle: string; name: string; lastMessage: string; time: string; unread: boolean; source: string; messages: { from: 'customer' | 'brand'; text: string; time: string }[] };

const sample: Conversation[] = [
  { id: 'demo-1', handle: 'ananya.m', name: 'Ananya Mehta', lastMessage: 'Do you ship to Bengaluru?', time: '2m', unread: true, source: 'Product reel', messages: [{ from: 'customer', text: 'Hi! I commented LINK on your reel. Do you ship to Bengaluru?', time: '10:42 AM' }] },
  { id: 'demo-2', handle: 'rahul.fit', name: 'Rahul Verma', lastMessage: 'Can you share the price?', time: '18m', unread: true, source: 'Instagram DM', messages: [{ from: 'customer', text: 'Can you share the price and size guide?', time: '10:25 AM' }, { from: 'brand', text: 'Hey Rahul! I can help with that.', time: '10:26 AM' }] },
  { id: 'demo-3', handle: 'the.style.edit', name: 'The Style Edit', lastMessage: 'Thanks, got it!', time: '1h', unread: false, source: 'Comment trigger', messages: [{ from: 'customer', text: 'Thanks, got it!', time: '9:48 AM' }] },
];

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>(sample);
  const [selectedId, setSelectedId] = useState(sample[0].id);
  const [search, setSearch] = useState('');
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(true);
  const selected = conversations.find((item) => item.id === selectedId) || conversations[0];
  const visible = useMemo(() => conversations.filter((item) => `${item.name} ${item.handle}`.toLowerCase().includes(search.toLowerCase())), [conversations, search]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/brand/conversations', { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => { if (!res.ok) return; const data = await res.json(); if (data.success && Array.isArray(data.data?.conversations)) setConversations(data.data.conversations); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const sendReply = async () => {
    if (!draft.trim() || !selected) return;
    const text = draft.trim();
    setDraft('');
    setConversations((current) => current.map((item) => item.id === selected.id ? { ...item, lastMessage: text, messages: [...item.messages, { from: 'brand', text, time: 'now' }] } : item));
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/brand/conversations/${selected.id}/messages`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ message: text }) });
      if (!res.ok) throw new Error('Message could not be sent');
      toast('Reply sent to Instagram', 'success');
    } catch { toast('Reply saved in the conversation. Connect Instagram to send it live.', 'info'); }
  };

  return <div className="mx-auto max-w-7xl">
    <div className="creator-page-header--actions"><div><div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-from)]"><Instagram size={14} /> Instagram inbox</div><h1 className="creator-page-title">Conversations</h1><p className="creator-page-description">See customer handles, qualify leads, and reply from one place.</p></div><div className="badge badge-brand"><Bot size={13} /> Replies use your AI context</div></div>
    <div className="grid min-h-[620px] overflow-hidden rounded-[var(--radius-xl)] border border-black/8 bg-white shadow-[var(--shadow-card)] lg:grid-cols-[320px_1fr]">
      <aside className="border-b border-black/8 lg:border-r lg:border-b-0"><div className="border-b border-black/8 p-4"><div className="relative"><Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search handles or names" className="input-field pl-9" /></div><p className="mt-3 text-xs text-zinc-400">{loading ? 'Syncing Instagram messages…' : `${visible.length} conversations`}</p></div><div className="divide-y divide-black/6">{visible.map((item) => <button key={item.id} type="button" onClick={() => setSelectedId(item.id)} className={`w-full p-4 text-left transition-colors ${selected?.id === item.id ? 'bg-[var(--brand-subtle)]' : 'hover:bg-zinc-50'}`}><div className="flex items-start gap-3"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-700">{item.handle[0].toUpperCase()}</div><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><span className="truncate text-sm font-semibold">@{item.handle}</span><span className="text-[11px] text-zinc-400">{item.time}</span></div><p className="truncate text-xs text-zinc-500">{item.name}</p><p className="mt-1 truncate text-xs text-zinc-600">{item.lastMessage}</p></div>{item.unread && <span className="mt-1 h-2 w-2 rounded-full bg-[var(--brand-from)]" />}</div></button>)}</div></aside>
      {selected ? <section className="flex min-h-[620px] flex-col"><div className="flex items-center justify-between border-b border-black/8 p-5"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-700"><UserRound size={18} /></div><div><h2 className="font-semibold">{selected.name}</h2><a href={`https://instagram.com/${selected.handle}`} target="_blank" rel="noreferrer" className="text-xs text-[var(--brand-from)]">@{selected.handle}</a></div></div><span className="badge badge-muted">{selected.source}</span></div><div className="flex-1 space-y-4 overflow-y-auto bg-zinc-50/70 p-5">{selected.messages.map((message, index) => <div key={`${message.time}-${index}`} className={`flex ${message.from === 'brand' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.from === 'brand' ? 'rounded-br-sm bg-[var(--brand-from)] text-white' : 'rounded-bl-sm bg-white text-zinc-700 shadow-sm ring-1 ring-black/5'}`}><p>{message.text}</p><div className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${message.from === 'brand' ? 'text-white/70' : 'text-zinc-400'}`}>{message.time}{message.from === 'brand' && <CheckCheck size={12} />}</div></div></div>)}<div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 p-3 text-xs text-blue-800"><Bot size={15} className="shrink-0" /><span>AI suggestion: use your context to answer shipping, product, pricing, and policy questions.</span></div></div><div className="border-t border-black/8 p-4"><div className="flex items-end gap-2"><textarea value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendReply(); } }} rows={2} placeholder="Write a reply…" className="input-field resize-none" /><button type="button" onClick={sendReply} className="btn-primary h-[68px] px-4" aria-label="Send reply"><Send size={16} /></button></div><p className="mt-2 flex items-center gap-1 text-[11px] text-zinc-400"><MessageCircle size={12} /> Press Enter to send · Shift+Enter for a new line</p></div></section> : <div className="flex items-center justify-center p-8 text-zinc-500">No conversations found.</div>}
    </div>
  </div>;
}

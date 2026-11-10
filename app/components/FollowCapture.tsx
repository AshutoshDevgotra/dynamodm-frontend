'use client';

import { FormEvent, useState } from 'react';
import { Mail, ShieldCheck } from 'lucide-react';

export default function FollowCapture({ username, follow }: { username: string; follow?: { emailOnly?: boolean; thankYouTitle?: string; thankYouDescription?: string } }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus('saving');
    try {
      const response = await fetch(`/api/creators/${encodeURIComponent(username)}/follow`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to follow right now.');
      setMessage(`${data.data?.title || follow?.thankYouTitle || 'Thanks for following me!'} ${data.data?.description || follow?.thankYouDescription || ''}`);
      setStatus('done');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to follow right now.');
      setStatus('error');
    }
  };

  if (status === 'done') return <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">{message}</div>;
  return (
    <div className="mt-5 rounded-2xl border border-orange-100 bg-orange-50/70 p-4">
      <div className="flex items-center gap-2 text-sm font-bold text-zinc-900"><Mail size={16} className="text-orange-600" /> Follow for updates</div>
      <p className="mt-1 text-xs leading-5 text-zinc-600">Get new drops and updates by email. We only use it for this creator&apos;s updates.</p>
      <form onSubmit={submit} className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" className="min-w-0 flex-1 rounded-xl border border-orange-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500" />
        <button disabled={status === 'saving'} className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-orange-600 disabled:opacity-60">{status === 'saving' ? 'Saving…' : 'Follow'}</button>
      </form>
      {status === 'error' && <p className="mt-2 text-xs font-medium text-rose-600">{message}</p>}
      <div className="mt-2 flex items-center gap-1 text-[11px] text-zinc-500"><ShieldCheck size={12} /> No spam. Unsubscribe anytime.</div>
    </div>
  );
}

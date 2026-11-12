'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Check, Eye, EyeOff } from 'lucide-react';
import { toast } from '../components/ui/Toaster';
import Logo from '../components/Logo';
import { track } from '../../lib/fbq';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [code, setCode] = useState('');
  const isBusiness = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '').get('role') === 'brand';

  const passwordStrength = (p: string) => {
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  const strength = passwordStrength(form.password);
  const strengthColors = ['#ef4444', '#f59e0b', '#10b981', '#f97316'];
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 8) { toast('Password must be at least 8 characters.', 'error'); return; }
    if (/\s/.test(form.password)) { toast('Password cannot contain spaces.', 'error'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, role: isBusiness ? 'BRAND' : 'CREATOR' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setVerificationEmail(data.data.email);
      toast('Check your email for the verification code.', 'success');
    } catch (err: unknown) {
      toast(err instanceof Error ? err.message : 'Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/verify-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: verificationEmail, code }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      track('CompleteRegistration', { status: true, content_category: isBusiness ? 'brand' : 'creator' });
      const plan = new URLSearchParams(window.location.search).get('plan');
      router.push(isBusiness ? '/brand/dashboard' : plan ? `/creator/subscription?plan=${encodeURIComponent(plan)}` : '/creator/subscription');
    } catch (err: unknown) {
      toast(err instanceof Error ? err.message : 'Verification failed', 'error');
    } finally { setLoading(false); }
  };

  const resendCode = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/resend-verification', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: verificationEmail }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast(data.message, 'success');
    } catch (err: unknown) { toast(err instanceof Error ? err.message : 'Unable to resend code', 'error'); }
    finally { setLoading(false); }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-[440px]">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-[28px] border border-black/6 bg-white p-8 shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
          <h1 className="text-center text-2xl font-semibold tracking-tight">{isBusiness ? 'Create your business workspace' : 'Create your account'}</h1>
          <p className="mt-3 text-center text-sm font-semibold text-[var(--brand-from)]">Creator is free for your first month, then ₹99/month.</p>
          <div className="mt-3 mb-6 flex flex-wrap justify-center gap-3 text-xs text-zinc-500">
            {['10 DMs free', 'Plans from ₹99', 'Setup in 5 minutes'].map((p) => (
              <span key={p} className="inline-flex items-center gap-1">
                <Check size={12} className="text-emerald-500" /> {p}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              const plan = new URLSearchParams(window.location.search).get('plan');
              const query = plan ? `?plan=${encodeURIComponent(plan)}` : '';
              window.location.href = `/api/auth/google${query}`;
            }}
            className="btn-secondary w-full"
          >
            Continue with Google
          </button>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-black/8" />
            <span className="text-xs text-zinc-400">or</span>
            <div className="h-px flex-1 bg-black/8" />
          </div>

          {verificationEmail ? <form onSubmit={verifyEmail} className="space-y-4">
            <p className="text-center text-sm text-zinc-600">Enter the 6-digit code sent to <strong>{verificationEmail}</strong>.</p>
            <input aria-label="Email verification code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} className="input-field text-center text-xl tracking-[0.4em]" required />
            <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? 'Verifying...' : 'Verify email'}</button>
            <button type="button" onClick={resendCode} className="w-full text-sm font-medium text-[var(--brand-from)]" disabled={loading}>Resend code</button>
          </form> : <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-zinc-600">Full name</label>
              <input id="name" type="text" autoComplete="name" placeholder="Priya Sharma" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" required />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-zinc-600">Email</label>
              <input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" required />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-zinc-600">Password</label>
              <div className="relative">
                <input id="password" type={showPass ? 'text' : 'password'} autoComplete="new-password" placeholder="Min 8 characters" value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value.replace(/\s/g, '') })} className="input-field pr-11" required />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-400" aria-label={showPass ? 'Hide password' : 'Show password'}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2">
                  <div className="mb-1 flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="h-1 flex-1 rounded-full" style={{ background: i < strength ? strengthColors[strength - 1] : 'rgba(11,18,32,0.08)' }} />
                    ))}
                  </div>
                  <span className="text-[11px]" style={{ color: strengthColors[Math.max(strength - 1, 0)] }}>
                    {strength > 0 ? strengthLabels[strength - 1] : ''}
                  </span>
                </div>
              )}
            </div>
            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? 'Creating account...' : <>Create account <ArrowRight size={16} /></>}
            </button>
          </form>}

          <p className="mt-4 text-center text-xs text-zinc-400">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="text-[var(--brand-from)]">Terms</Link> and{' '}
            <Link href="/privacy" className="text-[var(--brand-from)]">Privacy Policy</Link>.
          </p>
          <p className="mt-3 text-center text-sm text-zinc-500">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-[var(--brand-from)]">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

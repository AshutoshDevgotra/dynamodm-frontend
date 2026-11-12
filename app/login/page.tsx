'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { toast } from '../components/ui/Toaster';
import Logo from '../components/Logo';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationRequired, setVerificationRequired] = useState(false);
  const [code, setCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 429) throw new Error('Too many login attempts. Please wait a few minutes and try again.');
        if (res.status === 403 && data.message?.toLowerCase().includes('verify')) {
          setVerificationRequired(true);
          throw new Error('Check your email for a new verification code.');
        }
        throw new Error(data.message);
      }
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      toast('Welcome back!', 'success');
      const requestedRedirect = new URLSearchParams(window.location.search).get('redirect');
      const redirect = requestedRedirect?.startsWith('/') && !requestedRedirect.startsWith('//') ? requestedRedirect : null;
      const role = data.data.user?.role?.toUpperCase();
      router.push(redirect || (role === 'ADMIN' ? '/admin' : role === 'BRAND' || role === 'BUSINESS' ? '/brand/dashboard' : '/creator'));
    } catch (err: unknown) {
      toast(err instanceof Error ? err.message : 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try {
      const res = await fetch('/api/auth/verify-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: form.email, code }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem('token', data.data.token); localStorage.setItem('user', JSON.stringify(data.data.user));
      router.push('/creator');
    } catch (err: unknown) { toast(err instanceof Error ? err.message : 'Verification failed', 'error'); }
    finally { setLoading(false); }
  };

  const resendCode = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/resend-verification', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: form.email }) });
      const data = await res.json(); if (!res.ok) throw new Error(data.message); toast(data.message, 'success');
    } catch (err: unknown) { toast(err instanceof Error ? err.message : 'Unable to resend code', 'error'); }
    finally { setLoading(false); }
  };

  return (
    <div className="login-page flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-[420px]">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-[28px] border border-black/6 bg-white p-8 shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
          <h1 className="text-center text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-1 mb-6 text-center text-sm text-[var(--text-secondary)]">Sign in to your OrangeFlow.in account</p>

          <button
            type="button"
            onClick={() => {
              const requestedRedirect = new URLSearchParams(window.location.search).get('redirect');
              const query = requestedRedirect ? `?redirect=${encodeURIComponent(requestedRedirect)}` : '';
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

          {verificationRequired ? <form onSubmit={verifyEmail} className="space-y-4">
            <p className="text-center text-sm text-zinc-600">Enter the 6-digit code sent to <strong>{form.email}</strong>.</p>
            <input aria-label="Email verification code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} className="input-field text-center text-xl tracking-[0.4em]" required />
            <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? 'Verifying...' : 'Verify email'}</button>
            <button type="button" onClick={resendCode} className="w-full text-sm font-medium text-[var(--brand-from)]" disabled={loading}>Resend code</button>
          </form> : <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-zinc-600">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-zinc-600">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value.replace(/\s/g, '') })}
                  className="input-field pr-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-400"
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="text-right">
              <Link href="/forgot-password" className="text-sm font-medium text-[var(--brand-from)]">Forgot password?</Link>
            </div>
            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? 'Signing in...' : <>Sign in <ArrowRight size={16} /></>}
            </button>
          </form>}

          <p className="mt-5 text-center text-sm text-zinc-500">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-semibold text-[var(--brand-from)]">Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Mail } from 'lucide-react';
import { toast } from '../components/ui/Toaster';
import Logo from '../components/Logo';

type Step = 'email' | 'otp' | 'password';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const requestResetCode = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to send reset code');
      setStep('otp');
      toast('If that email is registered, a reset code has been sent.', 'success');
    } catch (error) {
      toast(error instanceof Error ? error.message : 'Unable to send reset code', 'error');
    } finally {
      setLoading(false);
    }
  };

  const continueToPassword = (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^\d{6}$/.test(code)) {
      toast('Enter the 6-digit code from your email.', 'error');
      return;
    }
    setStep('password');
  };

  const resetPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password.length < 8) {
      toast('Password must be at least 8 characters.', 'error');
      return;
    }
    if (password !== confirmPassword) {
      toast('Passwords do not match.', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, password, confirmPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to reset password');
      toast('Password updated. You can now sign in.', 'success');
      router.push('/login');
    } catch (error) {
      toast(error instanceof Error ? error.message : 'Unable to reset password', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-[420px]">
        <div className="mb-8 flex justify-center"><Logo /></div>
        <div className="rounded-[28px] border border-black/6 bg-white p-8 shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
          <Link href="/login" className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-800">
            <ArrowLeft size={15} /> Back to sign in
          </Link>
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600"><Mail size={22} /></div>
            <h1 className="text-2xl font-semibold tracking-tight">Reset your password</h1>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
              {step === 'email' && 'Enter your account email and we’ll send you a one-time code.'}
              {step === 'otp' && `Enter the 6-digit code sent to ${email}.`}
              {step === 'password' && 'Choose a new password for your account.'}
            </p>
          </div>

          {step === 'email' && (
            <form onSubmit={requestResetCode} className="space-y-4">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-zinc-600">Email or Gmail address</label>
                <input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} className="input-field" required />
              </div>
              <button type="submit" className="btn-primary flex w-full items-center justify-center gap-2" disabled={loading}>
                {loading ? 'Sending code...' : <>Send OTP <ArrowRight size={16} /></>}
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={continueToPassword} className="space-y-4">
              <div>
                <label htmlFor="code" className="mb-1.5 block text-sm font-medium text-zinc-600">One-time password</label>
                <input id="code" inputMode="numeric" autoComplete="one-time-code" maxLength={6} placeholder="123456" value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, ''))} className="input-field text-center text-lg tracking-[0.35em]" required />
              </div>
              <button type="submit" className="btn-primary flex w-full items-center justify-center gap-2">Verify code <ArrowRight size={16} /></button>
              <button type="button" className="w-full text-sm font-medium text-[var(--brand-from)]" onClick={() => setStep('email')}>Use a different email</button>
            </form>
          )}

          {step === 'password' && (
            <form onSubmit={resetPassword} className="space-y-4">
              <PasswordField id="password" label="New password" value={password} onChange={setPassword} visible={showPassword} onToggle={() => setShowPassword(!showPassword)} />
              <PasswordField id="confirmPassword" label="Confirm new password" value={confirmPassword} onChange={setConfirmPassword} visible={showConfirmPassword} onToggle={() => setShowConfirmPassword(!showConfirmPassword)} />
              <button type="submit" className="btn-primary flex w-full items-center justify-center gap-2" disabled={loading}>
                {loading ? 'Updating password...' : <>Update password <ArrowRight size={16} /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function PasswordField({ id, label, value, onChange, visible, onToggle }: { id: string; label: string; value: string; onChange: (value: string) => void; visible: boolean; onToggle: () => void }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-zinc-600">{label}</label>
      <div className="relative">
        <input id={id} type={visible ? 'text' : 'password'} autoComplete="new-password" placeholder="Min 8 characters" value={value} onChange={(event) => onChange(event.target.value)} className="input-field pr-11" required />
        <button type="button" onClick={onToggle} className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-400" aria-label={visible ? `Hide ${label}` : `Show ${label}`}>
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}

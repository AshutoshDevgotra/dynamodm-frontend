'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/features', label: 'AI Automations' },
  { href: '/for-brands', label: 'For Brands' },
  { href: '/pricing', label: 'Pricing' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>

      <div className="container flex h-[68px] sm:h-[72px] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center rounded-full bg-white/90 p-1 shadow-[0_8px_30px_rgba(17,24,39,0.08)] ring-1 ring-black/5 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors ${active
                  ? 'bg-[var(--brand-from)] text-white shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900'
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/login" className="px-3 py-2 text-[13px] font-semibold text-zinc-700 hover:text-zinc-900">
            Sign in
          </Link>
          <Link href="/signup" className="btn-primary !py-2 !px-4 text-[13px] shadow-md hover:shadow-lg transition">
            Start for Free
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/8 bg-white/95 shadow-sm text-zinc-800 md:hidden active:scale-95 transition"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>


      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm md:hidden"
              aria-hidden="true"
            />
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-3 top-[76px] z-[60] rounded-3xl border border-black/8 bg-white/95 p-5 shadow-2xl backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${active
                        ? 'bg-[var(--brand-from)] text-white'
                        : 'text-zinc-800 hover:bg-zinc-100'
                        }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="mt-4 grid gap-2 pt-2 border-t border-black/6">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="btn-secondary w-full justify-center text-center py-2.5 font-semibold"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary w-full justify-center text-center py-2.5 font-semibold"
                  >
                    Start for Free
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

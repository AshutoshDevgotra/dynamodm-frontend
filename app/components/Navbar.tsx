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
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

export default function Navbar({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
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

  const dark = variant === 'dark';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 shadow-[0_1px_0_0_#E5E7EB] backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="container flex h-[68px] items-center justify-between gap-4">
          <Logo light={dark} />

          {/* Desktop nav pill */}
          <nav
            className={`hidden items-center rounded-full p-1 md:flex transition-colors duration-300 ${
              scrolled
                ? 'bg-[#F5F7FA] shadow-none'
                : dark ? 'bg-white/10 shadow-none ring-1 ring-white/15 backdrop-blur-sm' : 'bg-white/90 shadow-[0_4px_20px_rgba(17,37,84,0.10)] ring-1 ring-black/5'
            }`}
          >
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors ${
                    active
                      ? `${dark ? 'bg-[#F36F4C]' : 'bg-[#F36F4C]'} text-white shadow-sm`
                      : dark ? 'text-white/75 hover:text-white' : 'text-[#211B18] hover:text-[#F36F4C]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/login"
              className={`px-3 py-2 text-[13px] font-semibold transition-colors ${dark ? 'text-white/80 hover:text-white' : 'text-[#211B18] hover:text-[#F36F4C]'}`}
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="btn-primary !bg-[#F36F4C] !text-white !py-2 !px-5 text-[13px] shadow-md hover:shadow-lg transition"
            >
              Start for Free
            </Link>
          </div>

          {/* Mobile hamburger */}
            <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border shadow-sm md:hidden active:scale-95 transition ${dark ? 'border-white/20 bg-white/10 text-white' : 'border-[#E5E7EB] bg-white text-[#111111]'}`}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[55] bg-[#705567]/40 backdrop-blur-sm md:hidden"
              aria-hidden="true"
            />
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-3 top-[76px] z-[60] rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-2xl md:hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                        active
                        ? 'bg-[#F36F4C] text-white'
                          : 'text-[#211B18] hover:bg-[#FFF1EC]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="mt-4 grid gap-2 pt-2 border-t border-[#E5E7EB]">
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

'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Bot, ChevronLeft, ChevronRight, Inbox, LayoutDashboard, LogOut, Megaphone, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { href: '/brand/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/brand/conversations', label: 'Conversations', icon: Inbox },
  { href: '/brand/context', label: 'AI context', icon: Bot },
  { href: '/brand/campaigns', label: 'Campaigns', icon: Megaphone },
  { href: '/brand/settings', label: 'Settings', icon: Settings },
];

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<{ name?: string; email?: string; role?: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.replace(`/login?redirect=${encodeURIComponent(pathname || '/brand/dashboard')}`); return; }
    fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => {
        if (!res.ok) throw new Error('Unable to load account');
        const data = await res.json();
        const nextUser = data.data.user;
        const role = String(nextUser?.role || '').toUpperCase();
        if (!['BRAND', 'BUSINESS', 'ADMIN'].includes(role)) throw new Error('Brand workspace required');
        setUser(nextUser);
      })
      .catch(() => router.replace('/login?redirect=/brand/dashboard'));
  }, [pathname, router]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!user) return <div className="flex min-h-screen items-center justify-center"><div className="h-9 w-9 animate-spin rounded-full border-[3px] border-orange-200 border-t-[var(--brand-from)]" /></div>;

  return (
    <div className="creator-shell">
      <motion.aside animate={{ width: collapsed ? 72 : 248 }} className="creator-sidebar" transition={{ duration: 0.22 }}>
        <div className="creator-sidebar__brand">
          <div className="creator-brand-mark"><Image src="/icon.svg" alt="" width={26} height={26} className="h-6 w-6 object-contain" /></div>
          <AnimatePresence>{!collapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[15px] font-semibold tracking-tight">OrangeFlow<span className="text-[var(--brand-from)]">.in</span></motion.span>}</AnimatePresence>
        </div>
        <div className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">Business workspace</div>
        <nav className="creator-sidebar__nav pt-0">
          {navItems.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={`sidebar-link creator-nav-link ${pathname === href || (href !== '/brand/dashboard' && pathname?.startsWith(href)) ? 'active' : ''}`}><Icon size={18} className="shrink-0" /><AnimatePresence>{!collapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{label}</motion.span>}</AnimatePresence></Link>)}
        </nav>
        <div className="creator-sidebar__footer">
          <div className="creator-user-summary"><div className="creator-user-avatar">{user.name?.[0]?.toUpperCase() || 'B'}</div>{!collapsed && <div className="min-w-0"><div className="truncate text-[13px] font-semibold">{user.name || 'Business account'}</div><div className="truncate text-[11px] text-[var(--text-muted)]">{user.email}</div></div>}</div>
          <button type="button" onClick={logout} className="sidebar-link creator-logout-link mt-1 w-full border-none bg-transparent text-rose-500"><LogOut size={16} />{!collapsed && <span>Log out</span>}</button>
        </div>
        <button type="button" onClick={() => setCollapsed(!collapsed)} className="creator-sidebar-toggle" aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>{collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}</button>
      </motion.aside>
      <div className={`creator-main ${collapsed ? 'creator-main--collapsed' : ''}`}><header className="creator-topbar"><div className="text-sm font-medium text-zinc-500">{navItems.find((item) => pathname === item.href || pathname?.startsWith(item.href + '/'))?.label || 'Business workspace'}</div><div className="creator-topbar__actions"><span className="badge badge-success"><span className="pulse-dot" /> AI assistant ready</span><div className="creator-topbar__avatar">{user.name?.[0]?.toUpperCase() || 'B'}</div></div></header><main className="creator-content">{children}</main></div>
    </div>
  );
}

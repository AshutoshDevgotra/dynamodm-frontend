'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BarChart3, Bell, BookOpen, Camera, ChevronLeft, ChevronRight, CreditCard, HelpCircle,
  LayoutDashboard, LogOut, Megaphone, Settings, Store, User, Users, Zap,
} from 'lucide-react';

const navItems = [
  { href: '/creator', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/creator/instagram', label: 'Instagram', icon: Camera },
  { href: '/creator/facebook', label: 'Facebook Pages', icon: BookOpen },
  { href: '/creator/automations', label: 'Automations', icon: Zap },
  { href: '/creator/storefront', label: 'Storefront', icon: Store },
  { href: '/creator/campaigns', label: 'Campaigns', icon: Megaphone },
  { href: '/creator/leads', label: 'Leads', icon: Users },
  { href: '/creator/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/creator/payments', label: 'Payments', icon: CreditCard },
  { href: '/creator/profile', label: 'Profile', icon: User },
  { href: '/creator/settings', label: 'Settings', icon: Settings },
  { href: '/creator/support', label: 'Support', icon: HelpCircle },
];

interface AuthUser {
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

export default function CreatorLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (!token || !userData) { router.push('/login'); return; }
    const parsed = JSON.parse(userData) as AuthUser;
    if (parsed.role !== 'creator' && parsed.role !== 'admin') { router.push('/login'); return; }
    setUser(parsed);

    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token');
    if (urlToken) {
      localStorage.setItem('token', urlToken);
      router.replace('/creator');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const isActive = (href: string) => (href === '/creator' ? pathname === href : pathname?.startsWith(href));

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-blue-200 border-t-[var(--brand-from)]" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[var(--bg-base)]">
      <motion.aside
        animate={{ width: collapsed ? 72 : 248 }}
        transition={{ duration: 0.22, ease: 'easeInOut' }}
        className="fixed inset-y-0 left-0 z-30 flex flex-col overflow-hidden border-r border-black/6 bg-white"
      >
        <div className="flex h-16 items-center gap-2.5 border-b border-black/6 px-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-from)] text-white">
            <Zap size={15} fill="currentColor" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[15px] font-semibold tracking-tight">
                DynamoDM
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-2">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`sidebar-link ${isActive(href) ? 'active' : ''}`}
              style={{ justifyContent: collapsed ? 'center' : 'flex-start', padding: collapsed ? 10 : '9px 12px' }}
            >
              <Icon size={18} className="shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          ))}
        </nav>

        <div className="border-t border-black/6 p-2">
          <div className="flex items-center gap-2.5 rounded-xl p-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand-from)] text-xs font-bold text-white">
              {user.name?.[0]?.toUpperCase()}
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <div className="truncate text-[13px] font-semibold">{user.name}</div>
                <div className="truncate text-[11px] text-[var(--text-muted)]">{user.email}</div>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="sidebar-link mt-1 w-full border-none bg-transparent text-rose-500"
            style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
          >
            <LogOut size={16} />
            {!collapsed && <span>Log out</span>}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-5 -right-3 flex h-6 w-6 items-center justify-center rounded-full border border-black/10 bg-white text-zinc-500"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </motion.aside>

      <div className="flex min-h-screen flex-1 flex-col" style={{ marginLeft: collapsed ? 72 : 248, transition: 'margin-left 0.22s ease' }}>
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-black/6 bg-white/85 px-6 backdrop-blur-xl">
          <div className="text-sm font-medium text-zinc-500">
            {navItems.find((n) => isActive(n.href))?.label || 'Dashboard'}
          </div>
          <div className="flex items-center gap-3">
            <button type="button" className="relative flex h-9 w-9 items-center justify-center rounded-full border border-black/8 text-zinc-500" aria-label="Notifications">
              <Bell size={15} />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-[var(--brand-from)]" />
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand-from)] text-xs font-bold text-white">
              {user.name?.[0]?.toUpperCase()}
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

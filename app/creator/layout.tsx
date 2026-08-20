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

const normalizeRole = (role?: string) => String(role ?? '').trim().toUpperCase();

export default function CreatorLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token');
    const token = urlToken || localStorage.getItem('token');
    if (urlToken) localStorage.setItem('token', urlToken);
    if (!token) { router.push('/login'); return; }

    const userData = localStorage.getItem('user');
    if (userData && !urlToken) {
      const parsed = JSON.parse(userData) as AuthUser;
      const normalizedRole = normalizeRole(parsed.role);
      if (normalizedRole !== 'CREATOR' && normalizedRole !== 'ADMIN') { router.push('/login'); return; }
      setUser({ ...parsed, role: normalizedRole });
      return;
    }

    fetch(`${(process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/, '') || '/api'}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        if (!response.ok) throw new Error('Unable to load account.');
        const data = await response.json();
        const authenticatedUser = {
          ...(data.data.user as AuthUser),
          role: normalizeRole((data.data.user as AuthUser).role),
        };
        if (authenticatedUser.role !== 'CREATOR' && authenticatedUser.role !== 'ADMIN') throw new Error('Invalid account role.');
        localStorage.setItem('user', JSON.stringify(authenticatedUser));
        setUser(authenticatedUser);
        if (urlToken) router.replace('/creator');
      })
      .catch(() => router.push('/login'));
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
    <div className="creator-shell">
      <motion.aside
        animate={{ width: collapsed ? 72 : 248 }}
        transition={{ duration: 0.22, ease: 'easeInOut' }}
        className={`creator-sidebar ${collapsed ? 'creator-sidebar--collapsed' : ''}`}
      >
        <div className="creator-sidebar__brand">
          <div className="creator-brand-mark">
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

        <nav className="creator-sidebar__nav">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`sidebar-link creator-nav-link ${isActive(href) ? 'active' : ''}`}
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

        <div className="creator-sidebar__footer">
          <div className="creator-user-summary">
            <div className="creator-user-avatar">
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
            className="sidebar-link creator-logout-link mt-1 w-full border-none bg-transparent text-rose-500"
          >
            <LogOut size={16} />
            {!collapsed && <span>Log out</span>}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="creator-sidebar-toggle"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </motion.aside>

      <div className={`creator-main ${collapsed ? 'creator-main--collapsed' : ''}`}>
        <header className="creator-topbar">
          <div className="text-sm font-medium text-zinc-500">
            {navItems.find((n) => isActive(n.href))?.label || 'Dashboard'}
          </div>
          <div className="creator-topbar__actions">
            <button type="button" className="relative flex h-9 w-9 items-center justify-center rounded-full border border-black/8 text-zinc-500" aria-label="Notifications">
              <Bell size={15} />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-[var(--brand-from)]" />
            </button>
            <div className="creator-topbar__avatar">
              {user.name?.[0]?.toUpperCase()}
            </div>
          </div>
        </header>
        <main className="creator-content">{children}</main>
      </div>
    </div>
  );
}

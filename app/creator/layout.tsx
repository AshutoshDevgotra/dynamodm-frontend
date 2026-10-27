'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BarChart3, Bell, Camera, ChevronLeft, ChevronRight, CreditCard, Handshake, HelpCircle,
  LayoutDashboard, LogOut, Megaphone, Menu, Settings, ShoppingBag, User, Users, X, Zap,
} from 'lucide-react';

const navItems = [
  { href: '/creator', label: 'Home', icon: LayoutDashboard },
  { href: '/creator/instagram', label: 'Instagram profile', icon: Camera },
  { href: '/creator/collabs', label: 'Brand collabs', icon: Handshake },
  { href: '/creator/storefront', label: 'Creator shop', icon: ShoppingBag },
  { href: '/creator/automations', label: 'AutoDM', icon: Zap },
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
  subscription?: { plan?: string; status?: string };
}

interface ConnectedInstagram {
  igUsername?: string;
  name?: string;
  profilePic?: string;
  isConnected?: boolean;
}

function InstagramAvatar({ src, fallback, className }: { src?: string; fallback: string; className: string }) {
  const [imageFailed, setImageFailed] = useState(false);
  useEffect(() => setImageFailed(false), [src]);
  const showImage = Boolean(src) && !imageFailed;
  return showImage ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={`${className} creator-user-avatar--image`} src={src} alt={fallback} onError={() => setImageFailed(true)} />
  ) : (
    <div className={className} aria-label={fallback}><User size={15} aria-hidden="true" /></div>
  );
}

const normalizeRole = (role?: string) => String(role ?? '').trim().toUpperCase();

export default function CreatorLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [instagram, setInstagram] = useState<ConnectedInstagram | null>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    const urlToken = params.get('token') || hashParams.get('token');
    const hashPlan = hashParams.get('plan');
    const token = urlToken || localStorage.getItem('token');
    if (urlToken) localStorage.setItem('token', urlToken);
    if (!token) {
      const returnTo = `${pathname || '/creator'}${window.location.search}`;
      router.replace(`/login?redirect=${encodeURIComponent(returnTo)}`);
      return;
    }

    const loadInstagram = () => {
      fetch('/api/instagram/status', { headers: { Authorization: `Bearer ${token}` } })
        .then((instagramResponse) => instagramResponse.json())
        .then((instagramData) => {
          if (instagramData.success) setInstagram(instagramData.data?.account || null);
        })
        .catch(() => setInstagram(null));
    };

    fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        if (!response.ok) throw new Error('Unable to load account.');
        const data = await response.json();
        const authenticatedUser = {
          ...(data.data.user as AuthUser),
          subscription: data.data.subscription || (data.data.user as AuthUser).subscription,
          role: normalizeRole((data.data.user as AuthUser).role),
        };
        if (authenticatedUser.role !== 'CREATOR' && authenticatedUser.role !== 'ADMIN') throw new Error('Invalid account role.');
        localStorage.setItem('user', JSON.stringify(authenticatedUser));

        const plan = String(authenticatedUser.subscription?.plan || '').toLowerCase();
        const status = String(authenticatedUser.subscription?.status || '').toLowerCase();
        const hasPaidAccess = ['starter', 'pro', 'premium', 'enterprise'].includes(plan) && !['cancelled', 'expired', 'past_due'].includes(status);
        const hasFreeAccess = plan === '' || plan === 'free';
        const hasWorkspaceAccess = hasFreeAccess || hasPaidAccess;
        const isBillingPage = pathname?.startsWith('/creator/payments/subscriptions');
        if (authenticatedUser.role !== 'ADMIN' && !hasWorkspaceAccess && !isBillingPage) {
          router.replace('/creator/payments/subscriptions');
          return;
        }

        setUser(authenticatedUser);
        if (hasWorkspaceAccess || authenticatedUser.role === 'ADMIN') loadInstagram();
        if (urlToken) {
          const planParam = params.get('plan') || hashPlan;
          if (planParam) {
            router.replace(`/creator/payments/subscriptions?plan=${planParam}`);
          } else {
            router.replace(hasWorkspaceAccess || authenticatedUser.role === 'ADMIN' ? '/creator' : '/creator/payments/subscriptions');
          }
        }
      })
      .catch(() => router.push('/login'));
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const isActive = (href: string) => (href === '/creator' ? pathname === href : pathname?.startsWith(href));

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-orange-200 border-t-[var(--brand-from)]" />
      </div>
    );
  }

  return (
    <div className="creator-shell">
      {mobileMenuOpen && (
        <div
          className="creator-backdrop md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`creator-sidebar ${collapsed ? 'creator-sidebar--collapsed' : ''} ${mobileMenuOpen ? 'creator-sidebar--open' : ''}`}
      >
        <div className="creator-sidebar__brand">
          <div className="creator-brand-mark">
            <Image src="/favicon.ico" alt="OrangeFlow" width={26} height={26} className="h-6 w-6 object-contain" />
          </div>
          <span className="font-logo text-[16px] font-bold tracking-[-0.03em] text-[#111111]">
            OrangeFlow<span className="text-[#FF5A1F]">.</span>
          </span>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg border border-black/8 text-zinc-500 md:hidden"
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="creator-sidebar__nav">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className={`sidebar-link creator-nav-link ${isActive(href) ? 'active' : ''}`}
            >
              <Icon size={18} className="shrink-0" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="creator-sidebar__footer">
          <div className="creator-user-summary">
            <InstagramAvatar className="creator-user-avatar" src={instagram?.isConnected ? instagram.profilePic : undefined} fallback={instagram?.igUsername || user.name || 'Creator'} />
            <div className="min-w-0">
              <div className="truncate text-[13px] font-semibold">{instagram?.isConnected ? `@${instagram.igUsername}` : user.name}</div>
              <div className="truncate text-[11px] text-[var(--text-muted)]">{instagram?.isConnected ? 'Connected Instagram' : user.email}</div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="sidebar-link creator-logout-link mt-1 w-full border-none bg-transparent text-rose-500"
          >
            <LogOut size={16} />
            <span>Log out</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="creator-sidebar-toggle hidden md:flex"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </aside>

      <div className={`creator-main ${collapsed ? 'creator-main--collapsed' : ''}`}>
        <header className="creator-topbar">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-black/8 bg-white text-zinc-700 shadow-sm md:hidden"
              aria-label="Toggle navigation menu"
            >
              <Menu size={18} />
            </button>
            <div className="text-sm font-semibold text-zinc-700">
              {navItems.find((n) => isActive(n.href))?.label || 'Dashboard'}
            </div>
          </div>

          <div className="creator-topbar__actions">
            <button type="button" className="relative flex h-9 w-9 items-center justify-center rounded-full border border-black/8 text-zinc-500" aria-label="Notifications">
              <Bell size={15} />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-[var(--brand-from)]" />
            </button>
            <InstagramAvatar className="creator-topbar__avatar" src={instagram?.isConnected ? instagram.profilePic : undefined} fallback={instagram?.igUsername || user.name || 'Creator'} />
          </div>
        </header>
        <main className="creator-content">{children}</main>
      </div>
    </div>
  );
}

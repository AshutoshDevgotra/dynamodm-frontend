import { Metadata } from 'next';
import Link from 'next/link';
import { Camera, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Creator Profile | DynamoDM',
};

interface CreatorProfile {
  name?: string;
  bio?: string;
  instagramUsername?: string;
  followersCount?: number;
  links: Array<{ url: string; label: string; cta?: boolean }>;
}

async function getCreatorProfile(username: string): Promise<CreatorProfile | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/creators/${username}`, { next: { revalidate: 60 } });
    const data = await res.json();
    if (!res.ok) return null;
    return data.data.profile as CreatorProfile;
  } catch {
    return null;
  }
}

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const profile = await getCreatorProfile(username);

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Profile not found</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">This creator page is not live yet.</p>
          <Link href="/" className="btn-primary mt-6">Go home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#dbeafe_0%,#f4f6fb_28%,#f4f6fb_100%)] px-4 py-10">
      <div className="mx-auto w-full max-w-[420px]">
        <div className="overflow-hidden rounded-[32px] border border-black/6 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="h-28 bg-[linear-gradient(135deg,#2563eb,#60a5fa)]" />
          <div className="px-6 pb-8">
            <div className="-mt-10 mb-4 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-[var(--brand-from)] text-2xl font-bold text-white">
              {profile.name?.[0]?.toUpperCase() || '?'}
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">{profile.name}</h1>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-zinc-500">
              <Camera size={14} />
              @{profile.instagramUsername}
              {profile.followersCount != null && (
                <>
                  <span>·</span>
                  <span>{profile.followersCount.toLocaleString()} followers</span>
                </>
              )}
            </div>
            {profile.bio && (
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{profile.bio}</p>
            )}

            <div className="mt-6 flex flex-col gap-2.5">
              {profile.links.map((link) => (
                <a
                  key={link.url + link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                    link.cta
                      ? 'bg-[var(--brand-from)] text-white shadow-[0_10px_24px_rgba(37,99,235,0.28)]'
                      : 'bg-[var(--bg-base)] text-zinc-800 ring-1 ring-black/6'
                  }`}
                >
                  {link.label}
                  <ExternalLink size={14} className={link.cta ? 'text-white/80' : 'text-zinc-400'} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-zinc-400">
          <Link href="/" className="hover:text-zinc-600">Powered by DynamoDM</Link>
        </p>
      </div>
    </div>
  );
}

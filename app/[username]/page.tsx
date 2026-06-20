import { Metadata } from 'next';
import { Camera, Link2, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Creator Profile | DynamoDM',
};

// In production, this fetches from the API
async function getCreatorProfile(username: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/creators/${username}`, { next: { revalidate: 60 } });
    const data = await res.json();
    if (!res.ok) return null;
    return data.data.profile;
  } catch (e) {
    return null;
  }
}

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const profile = await getCreatorProfile(username);

  if (!profile) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
        <h2>Creator profile not found</h2>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(139,92,246,0.1) 0%, transparent 60%)' }} />

      <div style={{ width: '100%', maxWidth: 460, position: 'relative' }}>
        {/* Card */}
        <div className="glass-strong" style={{ borderRadius: 28, overflow: 'hidden' }}>
          {/* Header Banner */}
          <div style={{ height: 100, background: 'var(--gradient-brand)', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)' }} />
          </div>

          <div style={{ padding: '0 28px 28px' }}>
            {/* Avatar */}
            <div style={{ marginTop: -40, marginBottom: 16 }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'var(--gradient-brand)',
                border: '3px solid var(--bg-secondary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, fontWeight: 800, color: 'white',
              }}>
                {profile.name?.[0]?.toUpperCase() || '?'}
              </div>
            </div>

            {/* Name + Bio */}
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{profile.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <Camera size={14} color="#ec4899" />
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>@{profile.instagramUsername}</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>·</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{profile.followersCount?.toLocaleString()} followers</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
              {profile.bio}
            </p>

            {/* Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {profile.links.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <div style={{
                    padding: '14px 18px', borderRadius: 14,
                    background: link.cta ? 'var(--gradient-brand)' : 'var(--bg-card)',
                    border: link.cta ? 'none' : '1px solid var(--border-default)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    cursor: 'pointer', transition: 'all 0.2s',
                    ...(link.cta && { boxShadow: '0 4px 20px rgba(139,92,246,0.3)' }),
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <span style={{ fontSize: 14, fontWeight: link.cta ? 700 : 600, color: link.cta ? 'white' : 'var(--text-primary)' }}>
                      {link.label}
                    </span>
                    <ExternalLink size={14} color={link.cta ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)'} />
                  </div>
                </a>
              ))}
            </div>

            {/* Footer */}
            <div style={{ marginTop: 28, textAlign: 'center' }}>
              <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none' }}>
                <Link2 size={12} />
                Powered by DynamoDM
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

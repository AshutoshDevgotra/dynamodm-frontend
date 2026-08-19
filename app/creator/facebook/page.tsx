'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, RefreshCw, BookOpen, MapPin, Clock, Info } from 'lucide-react';
import { toast } from '../../components/ui/Toaster';

interface FacebookPage {
  id: string;
  name: string;
  category: string;
  verification_status: string;
  picture?: {
    data?: {
      url: string;
    };
  };
  cover?: {
    source: string;
  };
  location?: {
    city?: string;
    country?: string;
    street?: string;
  };
  hours?: Record<string, string>;
  about?: string;
  description?: string;
}

export default function FacebookPagesDashboard() {
  const [pages, setPages] = useState<FacebookPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  const headers = { Authorization: `Bearer ${token}` };

  const fetchPages = (isManualRefresh = false) => {
    if (isManualRefresh) setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/meta/pages`, { headers })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setPages(d.data.pages || []);
          setLastUpdated(new Date());
        }
      })
      .catch(() => toast('Failed to fetch Facebook pages', 'error'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPages();

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'META_AUTH_SUCCESS') {
        toast('Facebook connected successfully!', 'success');
        fetchPages();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleConnect = async () => {
    setConnecting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meta/connect`, { headers });
      const data = await res.json();
      if (data.success) {
        const width = 600, height = 700;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;
        window.open(data.data.authUrl, 'MetaOAuth', `width=${width},height=${height},left=${left},top=${top}`);
      }
    } catch {
      toast('Failed to initiate Facebook connection', 'error');
    } finally {
      setConnecting(false);
    }
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><div style={{ width: 36, height: 36, border: '3px solid rgba(139,92,246,0.3)', borderTopColor: '#8b5cf6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>;

  return (
    <div style={{ maxWidth: 1000 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>Facebook Pages</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>View public information from Facebook Pages connected to your account.</p>
        </div>
        
        {pages.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
            <button onClick={() => fetchPages(true)} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
              <RefreshCw size={14} /> Refresh Pages
            </button>
            {lastUpdated && (
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                Last updated: {lastUpdated.toLocaleString()}
              </div>
            )}
          </div>
        )}
      </div>

      {pages.length > 0 ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {pages.map((page) => (
              <div key={page.id} className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {/* Cover Image */}
                <div style={{ height: 100, background: 'var(--bg-secondary)', position: 'relative' }}>
                  {page.cover?.source ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={page.cover.source} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1877f2 0%, #0056b3 100%)' }} />
                  )}
                </div>
                
                <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginTop: -40, marginBottom: 16 }}>
                    {/* Profile Picture */}
                    {page.picture?.data?.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={page.picture.data.url} alt={page.name} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--bg-card)', background: 'var(--bg-card)' }} />
                    ) : (
                      <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#1877f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: 'white', fontWeight: 700, border: '3px solid var(--bg-card)' }}>
                        {page.name[0]?.toUpperCase()}
                      </div>
                    )}
                    <div style={{ paddingTop: 40, flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{page.name}</h2>
                        {page.verification_status === 'blue_verified' && (
                          <div title="Verified by Facebook" style={{ display: 'flex', alignItems: 'center' }}>
                            <CheckCircle size={14} color="#1877f2" fill="#1877f2" style={{ color: 'white' }} />
                          </div>
                        )}
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{page.category}</div>
                    </div>
                  </div>

                  {/* Public Info */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                    {(page.about || page.description) && (
                      <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {page.about || page.description}
                      </div>
                    )}
                    
                    {page.location && (page.location.city || page.location.street) && (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}>
                        <MapPin size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                        <span>{[page.location.street, page.location.city, page.location.country].filter(Boolean).join(', ')}</span>
                      </div>
                    )}

                    {page.hours && Object.keys(page.hours).length > 0 && (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}>
                        <Clock size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                        <span>Hours available publicly</span>
                      </div>
                    )}
                  </div>

                  {/* Source Label */}
                  <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(24,119,242,0.1)', color: '#1877f2', padding: '4px 8px', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>
                      <BookOpen size={12} />
                      Source: Facebook
                    </div>
                    <div title="Public Page information retrieved from Facebook through Meta's authorized API." style={{ cursor: 'help', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                      <Info size={14} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="gradient-border" style={{ padding: 48, textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: '#1877f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <BookOpen size={30} color="white" />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Connect Facebook</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.7, maxWidth: 440, margin: '0 auto 28px' }}>
              We could not find any accessible Facebook Pages. Connect your Facebook account to grant DynamoDM access to your Pages.
            </p>

            <button onClick={handleConnect} disabled={connecting} className="btn-primary" style={{ fontSize: 15, padding: '12px 28px', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <BookOpen size={18} />
              {connecting ? 'Connecting...' : 'Connect Facebook'}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

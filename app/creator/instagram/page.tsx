'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Camera, CheckCircle, AlertCircle, ExternalLink, RefreshCw, Unlink, Sparkles } from 'lucide-react';
import { toast } from '../../components/ui/Toaster';

interface IGAccount {
  username?: string;
  igUsername?: string;
  name?: string;
  profilePic?: string;
  followersCount?: number;
  isConnected?: boolean;
  scopes?: string[];
  updatedAt?: string;
}

export default function InstagramPage() {
  const [account, setAccount] = useState<IGAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  const headers = { Authorization: `Bearer ${token}` };

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/instagram/status', { headers });
      const d = await res.json();
      if (d.success && d.data) {
        setAccount(d.data.account);
      }
    } catch {
      // Ignored
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchStatus();

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'INSTAGRAM_AUTH_SUCCESS' || event.data?.type === 'META_AUTH_SUCCESS') {
        toast(`🎉 Instagram connected: @${event.data.username || 'account'}`, 'success');
        setConnecting(false);
        fetchStatus();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [fetchStatus]);

  const handleConnect = async () => {
    setConnecting(true);
    try {
      const response = await fetch('/api/instagram/login', { headers });
      const data = await response.json();
      if (!response.ok || !data.success || !data.data?.authUrl) {
        throw new Error(data.message || 'Unable to start Instagram connection');
      }

      const width = 600;
      const height = 700;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      const popup = window.open(
        data.data.authUrl,
        'InstagramOAuth2025',
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,status=yes`
      );

      if (!popup) throw new Error('Please allow popups to connect Instagram');

      const timer = setInterval(() => {
        if (popup.closed) {
          clearInterval(timer);
          setConnecting(false);
          fetchStatus();
        }
      }, 1000);
    } catch (error) {
      setConnecting(false);
      toast(error instanceof Error ? error.message : 'Unable to start Instagram connection', 'error');
    }
  };

  const handleDisconnect = async () => {
    if (!confirm('Disconnect your Instagram account? Your DM automations will stop working.')) return;
    try {
      const res = await fetch('/api/instagram/disconnect', { method: 'DELETE', headers });
      const data = await res.json();
      if (data.success) {
        setAccount(null);
        toast('Instagram account disconnected', 'success');
      } else {
        toast(data.message || 'Failed to disconnect', 'error');
      }
    } catch {
      toast('Failed to disconnect Instagram account', 'error');
    }
  };

  const requiredPermissions = [
    { scope: 'instagram_business_basic', label: 'Instagram Basic', desc: 'Read profile information and media' },
    { scope: 'instagram_business_manage_messages', label: 'Manage Messages', desc: 'Send and receive automated DMs' },
    { scope: 'instagram_business_manage_comments', label: 'Manage Comments', desc: 'Listen to comments and reply automatically' },
  ];

  const username = account?.username || account?.igUsername;
  const isConnected = Boolean(account?.isConnected);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
        <div style={{ width: 36, height: 36, border: '3px solid rgba(139,92,246,0.3)', borderTopColor: '#8b5cf6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800 }}>Instagram Connection</h1>
          <span className="badge badge-brand" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Sparkles size={12} /> 2025 Direct API
          </span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
          Connect your Instagram Creator or Business account directly without requiring Facebook Page linking.
        </p>
      </div>

      {isConnected && username ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Connected Card */}
          <div className="card" style={{ padding: 28, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20, color: '#22c55e' }}>
              <CheckCircle size={16} />
              <span style={{ fontSize: 13, fontWeight: 600 }}>Connected via Instagram Graph API v23.0</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              {account?.profilePic ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={account.profilePic} alt={username} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(139,92,246,0.4)' }} />
              ) : (
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: 'white', fontWeight: 700 }}>
                  {username?.[0]?.toUpperCase()}
                </div>
              )}
              <div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{account?.name || username}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>@{username}</div>
                {account?.followersCount !== undefined && (
                  <div style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>{account.followersCount.toLocaleString()} followers</div>
                )}
              </div>
              <a href={`https://instagram.com/${username}`} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 'auto', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4, fontSize: 13 }}>
                <ExternalLink size={14} /> View Profile
              </a>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={handleConnect} disabled={connecting} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                <RefreshCw size={14} className={connecting ? 'animate-spin' : ''} /> Reconnect
              </button>
              <button onClick={handleDisconnect} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, padding: '8px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, color: '#ef4444', cursor: 'pointer', fontWeight: 600 }}>
                <Unlink size={14} /> Disconnect
              </button>
            </div>
          </div>

          {/* Permissions */}
          <div className="card" style={{ padding: 28 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Active Permissions (v23.0)</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {requiredPermissions.map((p) => {
                const granted = !account?.scopes?.length || account?.scopes?.includes(p.scope);
                return (
                  <div key={p.scope} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, background: granted ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.06)', border: `1px solid ${granted ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}` }}>
                    {granted ? <CheckCircle size={16} color="#22c55e" /> : <AlertCircle size={16} color="#ef4444" />}
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{p.label}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="gradient-border" style={{ padding: 36, textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Camera size={30} color="white" />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Connect Instagram Account</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.7, maxWidth: 460, margin: '0 auto 28px' }}>
              Link your Instagram Professional (Creator or Business) account via Instagram OAuth 2025. Connects directly without requiring a Facebook Page.
            </p>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 28 }}>
              {requiredPermissions.map((p) => (
                <span key={p.scope} className="badge badge-brand">{p.label}</span>
              ))}
            </div>

            <button onClick={handleConnect} disabled={connecting} className="btn-primary" style={{ fontSize: 15, padding: '12px 28px', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Camera size={18} />
              {connecting ? 'Opening Instagram...' : 'Connect with Instagram'}
            </button>

            <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 16 }}>
              We never post on your behalf without permission. Read our{' '}
              <Link href="/privacy" style={{ color: '#a78bfa' }}>privacy policy</Link>.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

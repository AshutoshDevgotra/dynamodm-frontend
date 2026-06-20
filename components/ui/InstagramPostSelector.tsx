'use client';

import { useState, useEffect } from 'react';
import { Check, Image as ImageIcon } from 'lucide-react';

interface InstagramPost {
  id: string;
  caption?: string;
  media_url: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

interface Props {
  selectedPostIds: string[];
  onChange: (ids: string[]) => void;
}

export function InstagramPostSelector({ selectedPostIds, onChange }: Props) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meta/posts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setPosts(data.data.posts);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to load Instagram posts. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const togglePost = (id: string) => {
    if (selectedPostIds.includes(id)) {
      onChange(selectedPostIds.filter((postId) => postId !== id));
    } else {
      onChange([...selectedPostIds, id]);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 10 }}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton" style={{ aspectRatio: '1', borderRadius: 12 }} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 16, background: 'rgba(239,68,68,0.1)', color: '#ef4444', borderRadius: 12, fontSize: 13, marginTop: 10 }}>
        {error}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div style={{ padding: 32, textAlign: 'center', background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: 12, marginTop: 10 }}>
        <ImageIcon size={24} style={{ opacity: 0.5, marginBottom: 8, margin: '0 auto' }} />
        <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>No recent posts found.</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, maxHeight: 300, overflowY: 'auto', paddingRight: 4 }}>
        {posts.map((post) => {
          const isSelected = selectedPostIds.includes(post.id);
          const bgImage = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;

          return (
            <div
              key={post.id}
              onClick={() => togglePost(post.id)}
              style={{
                aspectRatio: '1',
                borderRadius: 12,
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                border: isSelected ? '2px solid #8b5cf6' : '1px solid var(--border-default)',
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'all 0.2s',
              }}
            >
              {isSelected && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(139,92,246,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{ background: '#8b5cf6', width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={16} color="white" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

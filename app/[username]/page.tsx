import { Metadata } from 'next';
import Link from 'next/link';
import { Camera, ExternalLink, ShoppingBag, Package } from 'lucide-react';
import FollowCapture from '../components/FollowCapture';

export const metadata: Metadata = { title: 'Creator Profile | OrangeFlow.in' };

interface Product {
  id: string;
  title: string;
  description?: string;
  type: string;
  imageUrl?: string;
  imageMimeType?: string;
  mediaType?: 'image' | 'video' | 'post';
  mediaUrl?: string;
  url: string;
}

interface CreatorProfile {
  name?: string;
  bio?: string;
  instagramUsername?: string;
  username?: string;
  avatar?: string;
  followersCount?: number;
  products?: Product[];
  follow?: { enabled?: boolean; emailOnly?: boolean; thankYouTitle?: string; thankYouDescription?: string };
}

async function getCreatorProfile(username: string): Promise<CreatorProfile | null> {
  try {
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'https://api.v1.orangeflow.in/api').replace(/\/api\/?$/, '');
    const response = await fetch(`${baseUrl}/api/creators/${username}`, { next: { revalidate: 60 } });
    const data = await response.json();
    if (!response.ok) return null;
    return data.data.profile as CreatorProfile;
  } catch {
    return null;
  }
}

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const profile = await getCreatorProfile(username);
  const products = profile?.products || [];

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50/30 px-4 py-8 md:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8 overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-xl shadow-orange-100/50">
          <div className="h-32 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600" />
          <div className="px-6 pb-6 md:px-8">
            <div className="-mt-12 mb-4 flex items-end gap-4">
              {profile.avatar ? (
                <img src={profile.avatar} alt={profile.name || ''} className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg" />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-orange-500 text-3xl font-bold text-white shadow-lg">
                  {profile.name?.[0]?.toUpperCase() || '?'}
                </div>
              )}
              <a href={`https://instagram.com/${profile.instagramUsername}`} target="_blank" rel="noopener noreferrer" className="mb-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 p-2.5 text-white shadow-lg" aria-label="View Instagram profile">
                <Camera size={20} />
              </a>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">{profile.name}</h1>
            <div className="mt-2 flex items-center gap-2 text-sm text-zinc-600">
              <span>@{profile.instagramUsername}</span>
              {profile.followersCount != null && <><span>·</span><span className="font-semibold">{profile.followersCount.toLocaleString()}</span><span>followers</span></>}
            </div>
            {profile.bio && <p className="mt-4 text-base leading-relaxed text-zinc-700">{profile.bio}</p>}
            {profile.follow?.enabled !== false && <FollowCapture username={profile.username || username} follow={profile.follow} />}
          </div>
        </div>

        {products.length > 0 ? (
          <div>
            <div className="mb-6 flex items-center gap-2">
              <ShoppingBag className="text-orange-600" size={24} />
              <h2 className="text-2xl font-bold text-zinc-900">Shop My Picks</h2>
              <span className="ml-2 rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">{products.length}</span>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => {
                const isVideo = product.mediaType === 'video' || product.imageMimeType?.startsWith('video/');
                const isPost = product.mediaType === 'post';
                return (
                  <article key={product.id} className="group overflow-hidden rounded-[1.5rem] border border-orange-100 bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100/50">
                    <div className="relative aspect-[9/16] overflow-hidden bg-gradient-to-br from-orange-100 via-orange-50 to-amber-100">
                      {isVideo && product.imageUrl ? (
                        <video src={product.imageUrl} className="h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" />
                      ) : product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="flex h-full items-center justify-center"><Package className="text-orange-400" size={48} /></div>
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                      <div className="absolute inset-x-4 bottom-4 text-white">
                        <span className="mb-2 inline-flex rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] backdrop-blur-md">
                          {isPost ? 'Post' : isVideo ? 'Reel' : product.type === 'AFFILIATE' ? 'Affiliate pick' : 'Product'}
                        </span>
                        <h3 className="text-xl font-semibold leading-tight">{product.title}</h3>
                        <p className="mt-1 text-sm text-white/80">@{profile.instagramUsername}</p>
                        <div className="mt-4 flex gap-2">
                          {product.url && (
                            <a href={product.url} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-orange-500 px-4 py-3 text-sm font-bold text-white shadow-lg transition-colors hover:bg-orange-600">
                              <span>{product.type === 'AFFILIATE' ? 'Buy now' : 'Get this'}</span>
                              <ExternalLink size={14} />
                            </a>
                          )}
                          {isPost && product.mediaUrl && (
                            <a href={product.mediaUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-white/20 px-4 py-3 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/30">
                              View post
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    {product.description && <div className="p-5"><p className="line-clamp-3 text-sm leading-relaxed text-zinc-600">{product.description}</p></div>}
                  </article>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-orange-200 bg-white/50 p-12 text-center">
            <ShoppingBag className="mx-auto mb-4 text-orange-600" size={32} />
            <h3 className="mb-2 text-xl font-semibold text-zinc-900">No products yet</h3>
            <p className="text-zinc-600">This creator hasn't added any products to their storefront.</p>
          </div>
        )}

        <div className="mt-12 text-center"><Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500"><span>Powered by</span><span className="font-bold text-orange-600">OrangeFlow.in</span></Link></div>
      </div>
    </div>
  );
}

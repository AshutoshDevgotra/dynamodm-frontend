import { Metadata } from 'next';
import Link from 'next/link';
import { Camera, ExternalLink, ShoppingBag, Package } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Creator Profile | OrangeFlow.in',
};

interface Product {
  id: string;
  title: string;
  description?: string;
  type: string;
  imageUrl?: string;
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
  links?: Array<{ url: string; label: string; cta?: boolean }>;
}

async function getCreatorProfile(username: string): Promise<CreatorProfile | null> {
  try {
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'https://api.v1.orangeflow.in/api').replace(/\/api\/?$/, '');
    const res = await fetch(`${baseUrl}/api/creators/${username}`, { next: { revalidate: 60 } });
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

  const products = profile.products || [];
  const hasProducts = products.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50/30 px-4 py-8 md:py-12">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header Card */}
        <div className="mb-8 overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-xl shadow-orange-100/50">
          <div className="h-32 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600" />
          <div className="px-6 pb-6 md:px-8">
            <div className="-mt-12 mb-4 flex items-end gap-4">
              {profile.avatar ? (
                <img 
                  src={profile.avatar} 
                  alt={profile.name || ''} 
                  className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-orange-500 to-orange-600 text-3xl font-bold text-white shadow-lg">
                  {profile.name?.[0]?.toUpperCase() || '?'}
                </div>
              )}
              <a
                href={`https://instagram.com/${profile.instagramUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 p-2.5 text-white shadow-lg transition-transform hover:scale-105"
                aria-label="View Instagram profile"
              >
                <Camera size={20} />
              </a>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">{profile.name}</h1>
            <div className="mt-2 flex items-center gap-2 text-sm text-zinc-600">
              <span>@{profile.instagramUsername}</span>
              {profile.followersCount != null && (
                <>
                  <span>·</span>
                  <span className="font-semibold">{profile.followersCount.toLocaleString()}</span>
                  <span>followers</span>
                </>
              )}
            </div>
            {profile.bio && (
              <p className="mt-4 text-base leading-relaxed text-zinc-700">{profile.bio}</p>
            )}
          </div>
        </div>

        {/* Products Section */}
        {hasProducts ? (
          <div>
            <div className="mb-6 flex items-center gap-2">
              <ShoppingBag className="text-orange-600" size={24} />
              <h2 className="text-2xl font-bold text-zinc-900">Shop My Picks</h2>
              <span className="ml-2 rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
                {products.length}
              </span>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <a
                  key={product.id}
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100/50"
                >
                  {product.imageUrl ? (
                    <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
                      <Package className="text-orange-400" size={48} />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700">
                        {product.type === 'AFFILIATE' ? '🔗 Affiliate' : '📦 Product'}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold leading-snug text-zinc-900 group-hover:text-orange-600">
                      {product.title}
                    </h3>
                    {product.description && (
                      <p className="mb-3 line-clamp-2 text-sm text-zinc-600">{product.description}</p>
                    )}
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-orange-600">
                      <span>View product</span>
                      <ExternalLink size={14} />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-orange-200 bg-white/50 p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
              <ShoppingBag className="text-orange-600" size={32} />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-zinc-900">No products yet</h3>
            <p className="text-zinc-600">This creator hasn't added any products to their storefront.</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-orange-600"
          >
            <span>Powered by</span>
            <span className="font-bold text-orange-600">OrangeFlow.in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

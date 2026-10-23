'use client';

import { useEffect, useState } from 'react';
import { Activity, ExternalLink, Link as LinkIcon, Plus, ShoppingBag, ImagePlus, Share2, Sparkles } from 'lucide-react';

interface StoreProduct {
  id: number | string;
  _id?: string;
  title: string;
  type: string;
  clicks: number;
  url: string;
  imageUrl?: string;
  imageMimeType?: string;
}

const MOCK_PRODUCTS: StoreProduct[] = [
  { id: 1, title: 'My Top 10 Video Editing Tips', type: 'DIGITAL_PRODUCT', clicks: 124, url: 'dynm.co/l/a1b2' },
  { id: 2, title: 'Favorite Lighting Gear (Amazon)', type: 'AFFILIATE', clicks: 89, url: 'dynm.co/l/x8y9' },
];

export default function StorefrontDashboard() {
  const [products, setProducts] = useState<StoreProduct[]>(MOCK_PRODUCTS);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [draft, setDraft] = useState({ title: '', description: '', url: '', type: 'AFFILIATE' });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetch('/api/products', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data?.products)) {
          setProducts(data.data.products.map((product: { _id: string; title: string; type: string; originalUrl?: string; imageUrl?: string; imageMimeType?: string }) => ({
            id: product._id,
            _id: product._id,
            title: product.title,
            type: product.type,
            clicks: 0,
            url: product.originalUrl || '',
            imageUrl: product.imageUrl || (product.imageMimeType ? `/api/products/${product._id}/image` : undefined),
          })));
        }
      })
      .catch(() => undefined);
  }, []);

  const handleImageChange = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Please choose an image file.'); return; }
    if (file.size > 5 * 1024 * 1024) { setError('Please choose an image smaller than 5 MB.'); return; }
    setError('');
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const addProduct = async () => {
    if (!draft.title || !draft.url) { setError('Add a product name and buying link.'); return; }
    const token = localStorage.getItem('token');
    if (!token) { setError('Please sign in again before adding a product.'); return; }
    setSaving(true);
    setError('');
    try {
      const form = new FormData();
      form.append('title', draft.title);
      form.append('description', draft.description);
      form.append('originalUrl', draft.url);
      form.append('type', draft.type);
      if (image) form.append('image', image);
      const response = await fetch('/api/products', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: form });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || 'Could not add product.');
      const product = data.data.product;
      setProducts((items) => [{ id: product._id, _id: product._id, title: product.title, type: product.type, clicks: 0, url: product.originalUrl, imageUrl: product.imageMimeType ? `/api/products/${product._id}/image` : product.imageUrl }, ...items]);
      setDraft({ title: '', description: '', url: '', type: 'AFFILIATE' });
      setImage(null); setImagePreview(''); setShowAdd(false);
    } catch (caught) { setError(caught instanceof Error ? caught.message : 'Could not add product.'); }
    finally { setSaving(false); }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Storefront & links</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">Manage affiliate links, digital products, and clicks.</p>
        </div>
        <div className="flex flex-wrap gap-2"><button type="button" className="btn-secondary"><Share2 size={16} /> Share my page</button><button type="button" className="btn-primary" onClick={() => setShowAdd((open) => !open)}><Plus size={16} /> Add product</button></div>
      </div>

      {showAdd && <div className="creator-card creator-card--padded mb-6 border-orange-200 bg-gradient-to-br from-orange-50 to-white"><div className="mb-4 flex items-center gap-2"><div className="creator-icon-tile h-9 w-9 rounded-full"><Sparkles size={16} /></div><div><h2 className="font-semibold">Add to your creator shop</h2><p className="text-xs text-[var(--text-secondary)]">Share products, recommendations, and offers from one link.</p></div></div><div className="grid gap-3 md:grid-cols-2"><input className="input-field" placeholder="Product or recommendation name" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} /><input className="input-field" placeholder="Buying or affiliate link" value={draft.url} onChange={(e) => setDraft({ ...draft, url: e.target.value })} /><label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-orange-300 bg-white px-4 py-3 text-sm font-semibold text-orange-700"><ImagePlus size={18} /><span>{image ? image.name : 'Upload product image'}</span><input className="sr-only" type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(e) => handleImageChange(e.target.files?.[0])} /></label><select className="input-field" value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value })}><option value="AFFILIATE">Affiliate recommendation</option><option value="DIGITAL_PRODUCT">My digital product</option></select><textarea className="input-field md:col-span-2" placeholder="Short description for your audience" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />{imagePreview && <img src={imagePreview} alt="Product preview" className="h-28 w-28 rounded-2xl object-cover ring-1 ring-orange-200" />}</div>{error && <p className="mt-3 text-sm font-medium text-rose-600">{error}</p>}<div className="mt-4 flex justify-end gap-2"><button className="btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button><button className="btn-primary" disabled={saving} onClick={addProduct}><ImagePlus size={16} /> {saving ? 'Saving…' : 'Add to shop'}</button></div></div>}

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="creator-card creator-stat-card">
          <div className="mb-2 flex items-center gap-2 text-sm text-zinc-500">
            <Activity size={16} className="text-[var(--brand-from)]" />
            Total clicks (30d)
          </div>
          <p className="text-3xl font-semibold">213</p>
        </div>
        <div className="creator-card creator-stat-card">
          <div className="mb-2 flex items-center gap-2 text-sm text-zinc-500">
            <ShoppingBag size={16} className="text-emerald-500" />
            Active products
          </div>
          <p className="text-3xl font-semibold">2</p>
        </div>
        <div className="creator-card creator-stat-card">
          <div className="mb-2 flex items-center gap-2 text-sm text-zinc-500">
            <LinkIcon size={16} className="text-sky-500" />
            Top link
          </div>
          <p className="truncate text-lg font-semibold">Video Editing Tips</p>
          <p className="mt-1 text-sm text-zinc-400">124 clicks</p>
        </div>
      </div>

      <div className="creator-card overflow-hidden">
        <div className="border-b border-black/6 px-5 py-4">
          <h2 className="text-base font-semibold">Your products</h2>
        </div>
        <div className="divide-y divide-[var(--border-subtle)]">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                {product.imageUrl ? <img src={product.imageUrl} alt="" className="h-11 w-11 rounded-xl object-cover ring-1 ring-black/5" /> : <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${product.type === 'AFFILIATE' ? 'bg-orange-50 text-orange-500' : 'bg-orange-100 text-orange-700'}`}>
                  {product.type === 'AFFILIATE' ? <LinkIcon size={18} /> : <ShoppingBag size={18} />}
                </div>}
                <div>
                  <h3 className="font-medium">{product.title}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">
                      {product.type === 'AFFILIATE' ? 'Affiliate link' : 'Digital product'}
                    </span>
                    <a href={`https://${product.url}`} className="inline-flex items-center gap-1 text-sm text-[var(--brand-from)]">
                      {product.url} <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-lg font-semibold">{product.clicks}</p>
                  <p className="text-xs text-zinc-400">clicks</p>
                </div>
                <button type="button" className="text-sm font-medium text-zinc-500 hover:text-zinc-900">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

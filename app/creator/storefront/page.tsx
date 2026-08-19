'use client';

import { useState } from 'react';
import { Activity, ExternalLink, Link as LinkIcon, Plus, ShoppingBag } from 'lucide-react';

const MOCK_PRODUCTS = [
  { id: 1, title: 'My Top 10 Video Editing Tips', type: 'DIGITAL_PRODUCT', clicks: 124, url: 'dynm.co/l/a1b2' },
  { id: 2, title: 'Favorite Lighting Gear (Amazon)', type: 'AFFILIATE', clicks: 89, url: 'dynm.co/l/x8y9' },
];

export default function StorefrontDashboard() {
  const [products] = useState(MOCK_PRODUCTS);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Storefront & links</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">Manage affiliate links, digital products, and clicks.</p>
        </div>
        <button type="button" className="btn-primary">
          <Plus size={16} />
          Add product
        </button>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-black/6 bg-white p-5">
          <div className="mb-2 flex items-center gap-2 text-sm text-zinc-500">
            <Activity size={16} className="text-[var(--brand-from)]" />
            Total clicks (30d)
          </div>
          <p className="text-3xl font-semibold">213</p>
        </div>
        <div className="rounded-2xl border border-black/6 bg-white p-5">
          <div className="mb-2 flex items-center gap-2 text-sm text-zinc-500">
            <ShoppingBag size={16} className="text-emerald-500" />
            Active products
          </div>
          <p className="text-3xl font-semibold">2</p>
        </div>
        <div className="rounded-2xl border border-black/6 bg-white p-5">
          <div className="mb-2 flex items-center gap-2 text-sm text-zinc-500">
            <LinkIcon size={16} className="text-sky-500" />
            Top link
          </div>
          <p className="truncate text-lg font-semibold">Video Editing Tips</p>
          <p className="mt-1 text-sm text-zinc-400">124 clicks</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-black/6 bg-white">
        <div className="border-b border-black/6 px-5 py-4">
          <h2 className="text-base font-semibold">Your products</h2>
        </div>
        <div className="divide-y divide-black/6">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${product.type === 'AFFILIATE' ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-600'}`}>
                  {product.type === 'AFFILIATE' ? <LinkIcon size={18} /> : <ShoppingBag size={18} />}
                </div>
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

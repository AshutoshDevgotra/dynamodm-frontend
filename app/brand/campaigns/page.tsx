'use client';

import { useState } from 'react';
import { Plus, Megaphone, Users, DollarSign, Activity, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_CAMPAIGNS = [
  { 
    id: 1, 
    title: 'Summer Skincare Launch', 
    budget: '$5,000', 
    status: 'ACTIVE', 
    creatorsInvited: 12, 
    creatorsAccepted: 4,
    deliverables: '2 Reels, 1 Story'
  },
  { 
    id: 2, 
    title: 'Q3 Brand Ambassador Program', 
    budget: '$15,000', 
    status: 'DRAFT', 
    creatorsInvited: 0, 
    creatorsAccepted: 0,
    deliverables: '3 Reels per month'
  }
];

export default function BrandCampaignsPage() {
  const [campaigns] = useState(MOCK_CAMPAIGNS);

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Campaigns</h1>
          <p className="text-zinc-500 mt-2">Manage your creator sponsorships and proposals.</p>
        </div>
        <button className="btn-primary">
          <Plus size={18} />
          Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-black/6 rounded-2xl p-6">
          <div className="flex items-center gap-3 text-zinc-500 mb-2">
            <Megaphone size={18} className="text-[var(--brand-from)]" />
            <h3 className="font-medium">Active Campaigns</h3>
          </div>
          <p className="text-4xl font-semibold">1</p>
        </div>
        <div className="bg-white border border-black/6 rounded-2xl p-6">
          <div className="flex items-center gap-3 text-zinc-500 mb-2">
            <Users size={18} className="text-emerald-400" />
            <h3 className="font-medium">Active Creators</h3>
          </div>
          <p className="text-4xl font-semibold">4</p>
        </div>
        <div className="bg-white border border-black/6 rounded-2xl p-6">
          <div className="flex items-center gap-3 text-zinc-500 mb-2">
            <DollarSign size={18} className="text-blue-400" />
            <h3 className="font-medium">Total Spent</h3>
          </div>
          <p className="text-4xl font-semibold">$2,500</p>
        </div>
        <div className="bg-white border border-black/6 rounded-2xl p-6">
          <div className="flex items-center gap-3 text-zinc-500 mb-2">
            <Activity size={18} className="text-pink-400" />
            <h3 className="font-medium">Proposals Sent</h3>
          </div>
          <p className="text-4xl font-semibold">12</p>
        </div>
      </div>

      <div className="bg-white border border-black/6 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-black/6 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Your campaigns</h2>
        </div>
        <div className="divide-y divide-black/6">
          {campaigns.map((campaign) => (
            <motion.div 
              key={campaign.id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-zinc-50 transition-colors gap-4"
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-medium text-lg">{campaign.title}</h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded-md ${campaign.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' : 'bg-zinc-100 text-zinc-500'}`}>
                    {campaign.status}
                  </span>
                </div>
                <p className="text-sm text-zinc-500">Deliverables: {campaign.deliverables}</p>
              </div>

              <div className="flex flex-wrap gap-6 items-center">
                <div className="text-center md:text-right">
                  <p className="text-zinc-400 text-xs mb-1">Budget</p>
                  <p className="font-semibold">{campaign.budget}</p>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-zinc-400 text-xs mb-1">Creators</p>
                  <p className="font-semibold">{campaign.creatorsAccepted} / {campaign.creatorsInvited}</p>
                </div>
                <button className="text-zinc-700 bg-zinc-100 hover:bg-zinc-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                  Manage <ExternalLink size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

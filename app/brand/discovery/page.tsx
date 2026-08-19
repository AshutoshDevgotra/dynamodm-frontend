'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Star, Users, Activity, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Creator {
  _id: string;
  name: string;
  username: string;
  followersCount: number;
  profile: {
    avatar?: string;
    bio?: string;
    niche?: string;
    geography?: string;
    audienceDemographics?: {
      topAgeRanges: { age: string; percentage: number }[];
      topGenders: { gender: string; percentage: number }[];
    };
  };
}

export default function DiscoveryPage() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [niche, setNiche] = useState('');
  const [minFollowers, setMinFollowers] = useState('');
  
  // Advanced filters state
  const [searchMode, setSearchMode] = useState<'standard' | 'ai'>('ai');
  const [aiQuery, setAiQuery] = useState('');
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [targetAge, setTargetAge] = useState('');
  const [targetGender, setTargetGender] = useState('');

  const fetchCreators = async () => {
    setLoading(true);
    setAiRecommendation(null);
    try {
      const token = localStorage.getItem('token');
      
      if (searchMode === 'ai' && aiQuery) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/discovery/ai-match`, {
          method: 'POST',
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query: aiQuery })
        });
        const data = await res.json();
        if (data.success) {
          setCreators(data.data.creators);
          setAiRecommendation(data.data.recommendation);
        }
      } else {
        const params = new URLSearchParams();
        if (query) params.append('query', query);
        if (niche) params.append('niche', niche);
        if (minFollowers) params.append('minFollowers', minFollowers);
        if (targetAge) { params.append('targetAge', targetAge); params.append('minAgePercentage', '30'); }
        if (targetGender) params.append('targetGender', targetGender);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/discovery/creators?${params.toString()}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setCreators(data.data.creators);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchMode === 'standard') {
      const delay = setTimeout(() => fetchCreators(), 500);
      return () => clearTimeout(delay);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, niche, minFollowers, targetAge, targetGender, searchMode]);

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-3">
            Creator discovery
            <span className="bg-blue-50 text-[var(--brand-from)] text-xs px-2 py-1 rounded-md border border-blue-100">Gemini powered</span>
          </h1>
          <p className="text-zinc-500 mt-2">Find the perfect creators for your next campaign using AI or demographic filters.</p>
        </div>
        
        {/* Toggle Mode */}
        <div className="bg-white border border-black/6 p-1 rounded-xl flex self-start md:self-end">
          <button 
            onClick={() => setSearchMode('ai')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${searchMode === 'ai' ? 'bg-zinc-100 text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}
          >
            <Star size={16} className={searchMode === 'ai' ? 'text-purple-400' : ''} /> AI Matchmaker
          </button>
          <button 
            onClick={() => setSearchMode('standard')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${searchMode === 'standard' ? 'bg-zinc-100 text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}
          >
            <Filter size={16} /> Advanced Filters
          </button>
        </div>
      </div>

      {searchMode === 'ai' ? (
        <div className="mb-8">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-20">
              <Star size={120} className="text-blue-200" />
            </div>
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                Ask Gemini <Star size={20} className="text-[var(--brand-from)]" />
              </h2>
              <p className="text-zinc-600 mb-6">Describe your campaign, audience, and niche. We will match creators that fit.</p>
              
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="e.g., 'Looking for female fitness influencers with a Gen Z audience in Mumbai...'"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchCreators()}
                  className="flex-1 bg-white border border-black/10 rounded-xl py-4 px-5 focus:outline-none focus:border-[var(--brand-from)] transition-all placeholder:text-zinc-400"
                />
                <button 
                  onClick={fetchCreators}
                  disabled={loading || !aiQuery}
                  className="btn-primary !rounded-xl !px-8 disabled:opacity-50"
                >
                  {loading ? 'Searching...' : 'Match'}
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {aiRecommendation && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-white border border-black/6 rounded-2xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                    <Star size={20} className="text-[var(--brand-from)]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Gemini&apos;s recommendation</h3>
                    <p className="text-zinc-600 whitespace-pre-wrap leading-relaxed">{aiRecommendation}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="mb-8">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
              <input
                type="text"
                placeholder="Search by name, username, or keywords in bio..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-white border border-black/8 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[var(--brand-from)] transition-colors"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`px-5 py-3 rounded-xl border flex items-center gap-2 transition-colors font-medium ${showFilters ? 'bg-[var(--brand-from)] border-[var(--brand-from)] text-white' : 'bg-white border-black/8 text-zinc-700 hover:text-zinc-900'}`}
            >
              <Filter size={18} />
              Filters
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-8"
              >
                <div className="bg-white border border-black/6 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Niche / Category</label>
                    <select 
                      value={niche} onChange={(e) => setNiche(e.target.value)}
                      className="w-full bg-zinc-50 border border-black/8 rounded-lg p-2.5 focus:outline-none focus:border-[var(--brand-from)]"
                    >
                      <option value="">Any Niche</option>
                      <option value="Fashion">Fashion & Beauty</option>
                      <option value="Tech">Tech & Gadgets</option>
                      <option value="Fitness">Fitness & Health</option>
                      <option value="Finance">Finance & Crypto</option>
                      <option value="Lifestyle">Lifestyle</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Min. Followers</label>
                    <select 
                      value={minFollowers} onChange={(e) => setMinFollowers(e.target.value)}
                      className="w-full bg-zinc-50 border border-black/8 rounded-lg p-2.5 focus:outline-none focus:border-[var(--brand-from)]"
                    >
                      <option value="">Any Size</option>
                      <option value="10000">10k+ (Micro)</option>
                      <option value="50000">50k+ (Mid-tier)</option>
                      <option value="250000">250k+ (Macro)</option>
                      <option value="1000000">1M+ (Mega)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Target Audience Age</label>
                    <select 
                      value={targetAge} onChange={(e) => setTargetAge(e.target.value)}
                      className="w-full bg-zinc-50 border border-black/8 rounded-lg p-2.5 focus:outline-none focus:border-[var(--brand-from)]"
                    >
                      <option value="">Any Age</option>
                      <option value="18-24">18 - 24 (Gen Z)</option>
                      <option value="25-34">25 - 34 (Millennials)</option>
                      <option value="35-44">35 - 44</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Majority Audience Gender</label>
                    <select 
                      value={targetGender} onChange={(e) => setTargetGender(e.target.value)}
                      className="w-full bg-zinc-50 border border-black/8 rounded-lg p-2.5 focus:outline-none focus:border-[var(--brand-from)]"
                    >
                      <option value="">Any Gender</option>
                      <option value="Female">Female ({'>'}50%)</option>
                      <option value="Male">Male ({'>'}50%)</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-4 flex justify-end">
                    <button 
                      onClick={() => { setNiche(''); setMinFollowers(''); setTargetAge(''); setTargetGender(''); }}
                      className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                      Clear all filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Results Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white border border-black/6 rounded-2xl h-[280px] animate-pulse"></div>
          ))}
        </div>
      ) : creators.length === 0 ? (
        <div className="text-center py-20 bg-white border border-black/6 rounded-2xl">
          <Search size={48} className="mx-auto text-zinc-300 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No creators found</h3>
          <p className="text-zinc-500">Try adjusting your filters or search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((creator) => (
            <div key={creator._id} className="bg-white border border-black/6 rounded-2xl overflow-hidden hover:border-black/12 transition-all group">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-sky-400 p-1">
                      <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-bold text-xl overflow-hidden">
                        {creator.profile?.avatar ? (
                          <img src={creator.profile.avatar} alt={creator.name} className="w-full h-full object-cover" />
                        ) : creator.name[0]?.toUpperCase()}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold truncate max-w-[120px]">{creator.name}</h3>
                      <p className="text-sm text-[var(--brand-from)]">@{creator.username}</p>
                      {creator.profile?.niche && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-zinc-100 text-zinc-600 text-xs rounded-md">
                          {creator.profile.niche}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-zinc-500 text-sm line-clamp-2 mb-6 h-10">
                  {creator.profile?.bio || 'No bio provided.'}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-zinc-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                      <Users size={14} /> Followers
                    </div>
                    <div className="font-semibold">{creator.followersCount?.toLocaleString() || '0'}</div>
                  </div>
                  <div className="bg-zinc-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                      <Activity size={14} /> Top audience
                    </div>
                    <div className="font-semibold text-sm truncate">
                      {creator.profile?.audienceDemographics?.topAgeRanges?.[0]?.age || '18-24'} 
                      {' '}·{' '} 
                      {creator.profile?.audienceDemographics?.topGenders?.[0]?.gender || 'Female'}
                    </div>
                  </div>
                </div>

                <button className="w-full py-2.5 bg-[var(--brand-from)] text-white font-semibold rounded-xl hover:bg-[var(--brand-to)] transition-colors flex items-center justify-center gap-2">
                  View Profile <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

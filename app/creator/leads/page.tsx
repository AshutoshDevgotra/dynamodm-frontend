'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Download, Search, Filter, ExternalLink } from 'lucide-react';

interface Lead {
  _id: string;
  username: string;
  name?: string;
  email?: string;
  source: string;
  commentText?: string;
  isConverted: boolean;
  createdAt: string;
}

interface Pagination { page: number; limit: number; total: number; pages: number; }

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, pages: 0 });
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  const headers = { Authorization: `Bearer ${token}` };

  const fetchLeads = async (page = 1) => {
    setLoading(true);
    const params = new URLSearchParams({ page: page.toString(), limit: '20', ...(search && { search }) });
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads?${params}`, { headers });
    const data = await res.json();
    if (data.success) { setLeads(data.data.leads); setPagination(data.data.pagination); }
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [search]);

  const handleExport = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads/export`, { headers });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'leads.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const sourceColors: Record<string, string> = { comment: '#8b5cf6', mention: '#06b6d4', story_mention: '#10b981', manual: '#f59e0b' };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>Leads</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
            {pagination.total.toLocaleString()} leads captured
          </p>
        </div>
        <button onClick={handleExport} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
          <Download size={15} /> Export CSV
        </button>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 20 }}>
        <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
        <input className="input-field" placeholder="Search by username, name, or email..." value={search}
          onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: 40 }} />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>Loading leads...</div>
      ) : leads.length === 0 ? (
        <div className="glass" style={{ padding: 64, textAlign: 'center', borderRadius: 20 }}>
          <Users size={48} color="var(--text-muted)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No leads yet</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>When followers trigger your automations, their info will appear here.</p>
        </div>
      ) : (
        <>
          <div className="card" style={{ overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  {['User', 'Email', 'Source', 'Comment', 'Status', 'Date', ''].map((h) => (
                    <th key={h} style={{ padding: '12px 16px', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, i) => (
                  <motion.tr key={lead._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                    style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-card)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--gradient-brand-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#a78bfa' }}>
                          {(lead.username || lead.name || '?')[0].toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600 }}>{lead.name || lead.username}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>@{lead.username}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--text-muted)' }}>{lead.email || '—'}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: `${sourceColors[lead.source] || '#64748b'}20`, color: sourceColors[lead.source] || '#64748b', border: `1px solid ${sourceColors[lead.source] || '#64748b'}30` }}>
                        {lead.source}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 12, color: 'var(--text-muted)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {lead.commentText || '—'}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span className={`badge ${lead.isConverted ? 'badge-success' : ''}`} style={!lead.isConverted ? { background: 'var(--bg-card)', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)' } : {}}>
                        {lead.isConverted ? '✓ Converted' : 'New'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 12, color: 'var(--text-muted)' }}>
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <a href={`https://instagram.com/${lead.username}`} target="_blank" rel="noopener noreferrer"
                        style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                        <ExternalLink size={14} />
                      </a>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).slice(0, 10).map((p) => (
                <button key={p} onClick={() => fetchLeads(p)} style={{ width: 36, height: 36, borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13, background: p === pagination.page ? 'var(--gradient-brand)' : 'var(--bg-card)', color: p === pagination.page ? 'white' : 'var(--text-muted)', transition: 'all 0.2s' }}>
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

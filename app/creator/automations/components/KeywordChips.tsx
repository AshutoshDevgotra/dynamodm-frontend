'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface Props {
  keywords: string[];
  onChange: (keywords: string[]) => void;
}

export default function KeywordChips({ keywords, onChange }: Props) {
  const [draft, setDraft] = useState('');

  const addKeyword = () => {
    // Keep internal spaces: "Orange Flow" is one phrase trigger, not two words.
    const keyword = draft.normalize('NFKC').replace(/[\u200B-\u200D\uFEFF]/g, '').trim().replace(/\s+/g, ' ');
    if (!keyword) return;
    const exists = keywords.some((item) => item.toLocaleLowerCase() === keyword.toLocaleLowerCase());
    if (!exists) onChange([...keywords, keyword]);
    setDraft('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addKeyword();
    }
  };

  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {keywords.map((keyword) => (
          <span key={keyword.toLocaleLowerCase()} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 9px 7px 12px', borderRadius: 999, background: 'var(--brand-subtle)', color: 'var(--brand-from)', fontSize: 13, fontWeight: 700 }}>
            {keyword}
            <button type="button" onClick={() => onChange(keywords.filter((item) => item !== keyword))} aria-label={`Remove ${keyword}`} style={{ display: 'inline-flex', padding: 0, border: 0, background: 'transparent', color: 'inherit', cursor: 'pointer' }}>
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          className="input-field"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a trigger phrase"
          aria-label="New trigger phrase"
          style={{ flex: 1, fontWeight: 600 }}
        />
        <button type="button" onClick={addKeyword} className="btn-secondary" aria-label="Add this whole trigger phrase" title="Add this whole trigger phrase" style={{ minWidth: 44, paddingInline: 12 }}>
          <Plus size={17} />
        </button>
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: 12, margin: 0 }}>Click + to save the full phrase as one trigger. For example, “Orange Flow” stays together.</p>
    </div>
  );
}

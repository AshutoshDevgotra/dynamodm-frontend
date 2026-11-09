'use client';

import { useRef, useState } from 'react';
import {
  FileText, Image, Link2, Plus, Smile, Trash2, Upload, X,
  ChevronDown, ChevronUp, Sparkles,
} from 'lucide-react';

/* ─── Types ──────────────────────────────────────────────────────── */

export interface ButtonDef {
  title: string;
  url: string;
}

export interface AttachmentMeta {
  attachmentId: string;
  name: string;
  size: number;
  mimeType: string;
  url: string;
}

export interface ResponseComposerValue {
  responseMessage: string;
  ctaLink: string;          // legacy single link (kept for backward compat)
  buttons: ButtonDef[];     // up to 3 CTA buttons
  attachmentUrl: string;    // attachment API path
  attachment: AttachmentMeta | null;
  primaryDmType: 'TEXT' | 'TEXT_BUTTON';
  // legacy single-button fields (kept so existing save logic still works)
  buttonLabel: string;
  buttonUrl: string;
  trackButtonClicks: boolean;
}

interface ResponseComposerProps {
  value: ResponseComposerValue;
  onChange: (next: ResponseComposerValue) => void;
  token: string;
}

/* ─── Templates ─────────────────────────────────────────────────── */

const TEMPLATES = [
  {
    id: 'freebie',
    label: '🎁 Free resource',
    icon: '🎁',
    text: "Hey! Thanks for commenting 🙌\n\nHere's the free resource you asked for 👇\n\nLet me know if you have any questions!",
  },
  {
    id: 'product',
    label: '🛍️ Product link',
    icon: '🛍️',
    text: "Hi there! 👋 Thanks for your interest.\n\nHere's the direct link to the product you asked about ⬇️\n\nFeel free to DM me if you need help choosing!",
  },
  {
    id: 'webinar',
    label: '📅 Event / webinar',
    icon: '📅',
    text: "Hey! So excited you're interested 🎉\n\nHere's your link to register for the upcoming session 👇\n\nSee you there! 🙌",
  },
  {
    id: 'guide',
    label: '📖 Guide / PDF',
    icon: '📖',
    text: "Hey! Here's the guide you asked for 📄\n\nI've attached it directly to this message — feel free to save it!\n\nLet me know if you found it helpful 💬",
  },
  {
    id: 'discount',
    label: '🎟️ Discount / offer',
    icon: '🎟️',
    text: "Hey! You're in luck 🎉\n\nHere's your exclusive discount code and link 👇\n\nDon't wait — this offer is time-limited! ⏳",
  },
];

/* ─── Emoji sets (curated — no heavy library needed) ─────────────── */

const EMOJI_GROUPS = [
  { label: 'Popular', emojis: ['👋', '🙌', '🎉', '🔥', '💛', '❤️', '✅', '⭐', '🚀', '💪', '😊', '🙏', '👇', '👆', '💬', '📩', '📲', '🎁', '🛍️', '📖', '🎟️', '📅', '⏳', '🔗', '📄', '📎'] },
  { label: 'Reactions', emojis: ['😍', '🥳', '😎', '🤩', '💯', '🫶', '👀', '🤝', '💥', '✨', '🌟', '💫', '🎯', '🏆', '🥇', '🪄'] },
  { label: 'Objects', emojis: ['📱', '💻', '🖥️', '📊', '📈', '🗓️', '🔔', '📬', '🔑', '🪙', '💎', '🎀', '🧧', '📦', '🛒', '🏷️'] },
];

/* ─── Helpers ───────────────────────────────────────────────────── */

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fileIcon(mimeType: string) {
  if (mimeType === 'application/pdf') return <FileText size={18} className="text-red-500" />;
  return <Image size={18} className="text-blue-500" />;
}

/* ─── Phone mockup preview ──────────────────────────────────────── */

function PhonePreview({ value }: { value: ResponseComposerValue }) {
  const hasContent = value.responseMessage.trim() || value.buttons.length > 0 || value.attachment;
  const activeButtons = value.buttons.filter((b) => b.title.trim() && b.url.trim());

  return (
    <div className="sticky top-4 flex justify-center">
      {/* Phone shell */}
      <div
        className="relative flex w-[230px] flex-col overflow-hidden rounded-[32px] shadow-2xl"
        style={{ background: '#1C1C1E', border: '6px solid #3A3A3C', minHeight: 420 }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-3 pb-1">
          <span className="text-[10px] font-semibold text-white/70">9:41</span>
          <div className="flex items-center gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-white/60" />
            <div className="h-1.5 w-1.5 rounded-full bg-white/60" />
            <div className="h-1.5 w-1.5 rounded-full bg-white/60" />
          </div>
        </div>

        {/* DM header */}
        <div className="flex items-center gap-2.5 border-b border-white/10 px-4 py-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#FF7800] to-[#FF4500] text-[11px] font-bold text-white">
            IG
          </div>
          <div>
            <p className="text-[11px] font-semibold text-white">Instagram User</p>
            <p className="text-[9px] text-white/40">Instagram · Direct</p>
          </div>
        </div>

        {/* Message area */}
        <div className="flex flex-1 flex-col gap-2 p-3">
          {!hasContent ? (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-center text-[10px] text-white/30">Your message preview will appear here</p>
            </div>
          ) : (
            <>
              {/* Text bubble */}
              {value.responseMessage.trim() && (
                <div
                  className="max-w-[90%] self-end rounded-[14px] rounded-br-[4px] px-3 py-2 text-[11px] leading-[1.6] text-white"
                  style={{ background: '#0084FF', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}
                >
                  {value.responseMessage}
                </div>
              )}

              {/* Attachment chip */}
              {value.attachment && (
                <div
                  className="flex max-w-[90%] items-center gap-2 self-end rounded-[12px] px-3 py-2"
                  style={{ background: '#2C2C2E', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  {fileIcon(value.attachment.mimeType)}
                  <div>
                    <p className="text-[10px] font-semibold text-white truncate max-w-[100px]">{value.attachment.name}</p>
                    <p className="text-[9px] text-white/40">{formatBytes(value.attachment.size)}</p>
                  </div>
                </div>
              )}

              {/* Button template */}
              {activeButtons.length > 0 && (
                <div
                  className="w-full overflow-hidden rounded-[14px]"
                  style={{ background: '#2C2C2E', border: '1px solid rgba(255,255,255,0.10)' }}
                >
                  {activeButtons.map((btn, i) => (
                    <div
                      key={i}
                      className="border-t border-white/10 px-3 py-2 text-center text-[10px] font-semibold text-[#0084FF] first:border-t-0"
                    >
                      {btn.title}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Input bar */}
        <div
          className="mx-3 mb-3 flex items-center gap-2 rounded-full px-3 py-2"
          style={{ background: '#2C2C2E' }}
        >
          <span className="text-[10px] text-white/30 flex-1">Message...</span>
          <div className="h-4 w-4 rounded-full bg-[#0084FF] flex items-center justify-center">
            <span className="text-[8px] text-white font-bold">↑</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────────── */

export default function ResponseComposer({ value, onChange, token }: ResponseComposerProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [activeEmojiGroup, setActiveEmojiGroup] = useState(0);
  const [showTemplates, setShowTemplates] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = (partial: Partial<ResponseComposerValue>) =>
    onChange({ ...value, ...partial });

  /* Emoji insert at cursor */
  const insertEmoji = (emoji: string) => {
    const ta = textareaRef.current;
    if (!ta) {
      set({ responseMessage: value.responseMessage + emoji });
      return;
    }
    const start = ta.selectionStart ?? value.responseMessage.length;
    const end = ta.selectionEnd ?? start;
    const next = value.responseMessage.slice(0, start) + emoji + value.responseMessage.slice(end);
    set({ responseMessage: next });
    requestAnimationFrame(() => {
      ta.focus();
      const pos = start + emoji.length;
      ta.setSelectionRange(pos, pos);
    });
    setShowEmojiPicker(false);
  };

  /* File upload */
  const handleFileUpload = async (file: File) => {
    setUploadError('');
    const MAX = 10 * 1024 * 1024;
    if (file.size > MAX) { setUploadError('File must be under 10 MB.'); return; }
    const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowed.includes(file.type)) { setUploadError('Only PDF, JPEG, PNG, GIF and WEBP are supported.'); return; }

    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/automations/attachment', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');
      set({
        attachmentUrl: data.data.url,
        attachment: data.data,
      });
    } catch (err: any) {
      setUploadError(err.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  /* Button management */
  const updateButton = (index: number, field: keyof ButtonDef, val: string) => {
    const next = [...value.buttons];
    next[index] = { ...next[index], [field]: val };
    // keep legacy single-button fields in sync
    set({
      buttons: next,
      buttonLabel: next[0]?.title || '',
      buttonUrl: next[0]?.url || '',
      ctaLink: next[0]?.url || value.ctaLink,
      primaryDmType: next.some((b) => b.title.trim() && b.url.trim()) ? 'TEXT_BUTTON' : 'TEXT',
    });
  };

  const addButton = () => {
    if (value.buttons.length >= 3) return;
    set({ buttons: [...value.buttons, { title: '', url: '' }], primaryDmType: 'TEXT_BUTTON' });
  };

  const removeButton = (index: number) => {
    const next = value.buttons.filter((_, i) => i !== index);
    set({
      buttons: next,
      buttonLabel: next[0]?.title || '',
      buttonUrl: next[0]?.url || '',
      ctaLink: next[0]?.url || '',
      primaryDmType: next.length > 0 ? 'TEXT_BUTTON' : 'TEXT',
    });
  };

  const charCount = value.responseMessage.length;
  const charLimit = 1000;
  const charOver = charCount > charLimit;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_230px]">
      {/* ── Left: Composer ── */}
      <div className="space-y-5">

        {/* Template picker */}
        <div className="overflow-hidden rounded-[14px] border border-[var(--border-subtle)]">
          <button
            type="button"
            onClick={() => setShowTemplates((v) => !v)}
            className="flex w-full items-center justify-between px-4 py-3 text-[13px] font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors"
          >
            <span className="flex items-center gap-2">
              <Sparkles size={14} className="text-[var(--brand-from)]" />
              Start from a template
            </span>
            {showTemplates ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>

          {showTemplates && (
            <div className="border-t border-[var(--border-subtle)] p-3">
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => {
                      set({ responseMessage: tpl.text });
                      setShowTemplates(false);
                    }}
                    className="flex items-center gap-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-3 py-2.5 text-left text-[12px] font-semibold text-[var(--text-primary)] transition hover:border-[var(--brand-from)] hover:bg-[var(--brand-subtle)]"
                  >
                    <span className="text-[18px]">{tpl.icon}</span>
                    {tpl.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Message textarea */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-[13px] font-semibold text-[var(--text-secondary)]">
              Message <span className="text-[var(--danger)]">*</span>
            </label>
            <span className={`text-[11px] font-medium ${charOver ? 'text-[var(--danger)]' : 'text-[var(--text-muted)]'}`}>
              {charCount}/{charLimit}
            </span>
          </div>

          <div
            className="overflow-hidden rounded-[14px] border transition-colors focus-within:border-[var(--brand-from)] focus-within:shadow-[0_0_0_3px_var(--brand-subtle)]"
            style={{ borderColor: charOver ? 'var(--danger)' : 'var(--border-default)' }}
          >
            <textarea
              ref={textareaRef}
              rows={6}
              maxLength={1100} // soft — we warn at 1000
              placeholder={"Hey! Thanks for your comment 👋\n\nHere's what you asked for 👇"}
              value={value.responseMessage}
              onChange={(e) => set({ responseMessage: e.target.value })}
              className="block w-full resize-none bg-transparent px-4 pt-3 pb-1 text-[14px] leading-[1.7] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
            />

            {/* Toolbar */}
            <div className="flex items-center gap-1 border-t border-[var(--border-subtle)] px-3 py-2">
              {/* Emoji */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker((v) => !v)}
                  title="Add emoji"
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]"
                >
                  <Smile size={16} />
                </button>
                {showEmojiPicker && (
                  <div
                    className="absolute bottom-9 left-0 z-20 w-[280px] overflow-hidden rounded-[14px] border border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-xl"
                    onMouseLeave={() => setShowEmojiPicker(false)}
                  >
                    {/* Group tabs */}
                    <div className="flex gap-1 border-b border-[var(--border-subtle)] p-2">
                      {EMOJI_GROUPS.map((g, i) => (
                        <button
                          key={g.label}
                          type="button"
                          onClick={() => setActiveEmojiGroup(i)}
                          className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${activeEmojiGroup === i ? 'bg-[var(--brand-subtle)] text-[var(--brand-from)]' : 'text-[var(--text-muted)] hover:bg-[var(--bg-subtle)]'}`}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-8 gap-0.5 p-2">
                      {EMOJI_GROUPS[activeEmojiGroup].emojis.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => insertEmoji(emoji)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-[18px] transition hover:bg-[var(--bg-subtle)] hover:scale-110"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="ml-auto flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
                <span>Tip: use emojis to boost replies</span>
              </div>
            </div>
          </div>
        </div>

        {/* PDF / File attachment */}
        <div>
          <label className="mb-1.5 block text-[13px] font-semibold text-[var(--text-secondary)]">
            Attachment <span className="text-[11px] font-normal text-[var(--text-muted)]">(PDF, image — optional)</span>
          </label>

          {value.attachment ? (
            <div className="flex items-center gap-3 rounded-[14px] border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-4 py-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--bg-card)] shadow-sm">
                {fileIcon(value.attachment.mimeType)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-[var(--text-primary)]">{value.attachment.name}</p>
                <p className="text-[11px] text-[var(--text-muted)]">{formatBytes(value.attachment.size)} · {value.attachment.mimeType === 'application/pdf' ? 'PDF' : 'Image'}</p>
              </div>
              <button
                type="button"
                onClick={() => set({ attachment: null, attachmentUrl: '' })}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[var(--text-muted)] transition hover:bg-[var(--danger-subtle)] hover:text-[var(--danger)]"
                aria-label="Remove attachment"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex w-full items-center justify-center gap-2.5 rounded-[14px] border-2 border-dashed border-[var(--border-default)] py-5 text-[13px] font-semibold text-[var(--text-muted)] transition hover:border-[var(--brand-from)] hover:bg-[var(--brand-subtle)] hover:text-[var(--brand-from)] disabled:opacity-50"
            >
              {uploading ? (
                <><div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--brand-from)] border-t-transparent" /> Uploading...</>
              ) : (
                <><Upload size={15} /> Upload PDF or Image</>
              )}
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,image/jpeg,image/png,image/gif,image/webp"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file);
              e.target.value = '';
            }}
          />

          {uploadError && (
            <p className="mt-1.5 text-[12px] text-[var(--danger)]">{uploadError}</p>
          )}
        </div>

        {/* CTA Buttons */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-[13px] font-semibold text-[var(--text-secondary)]">
              CTA Buttons <span className="text-[11px] font-normal text-[var(--text-muted)]">(up to 3)</span>
            </label>
            {value.buttons.length < 3 && (
              <button
                type="button"
                onClick={addButton}
                className="flex items-center gap-1 rounded-full border border-[var(--brand-border)] bg-[var(--brand-subtle)] px-2.5 py-1 text-[11px] font-bold text-[var(--brand-from)] transition hover:bg-[var(--brand-from)] hover:text-white"
              >
                <Plus size={11} /> Add button
              </button>
            )}
          </div>

          {value.buttons.length === 0 && (
            <div
              className="flex cursor-pointer items-center gap-2.5 rounded-[14px] border border-dashed border-[var(--border-default)] px-4 py-3.5 text-[13px] text-[var(--text-muted)] transition hover:border-[var(--brand-from)] hover:bg-[var(--brand-subtle)]"
              onClick={addButton}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && addButton()}
            >
              <Link2 size={15} />
              <span>Add a button with a link — e.g. "Get the guide"</span>
            </div>
          )}

          <div className="space-y-2.5">
            {value.buttons.map((btn, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-[14px] border border-[var(--border-subtle)] bg-[var(--bg-subtle)]"
              >
                <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] px-3 py-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--brand-subtle)] text-[10px] font-black text-[var(--brand-from)]">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-[12px] font-semibold text-[var(--text-muted)]">Button {i + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeButton(i)}
                    className="flex h-6 w-6 items-center justify-center rounded-full text-[var(--text-muted)] transition hover:bg-[var(--danger-subtle)] hover:text-[var(--danger)]"
                    aria-label={`Remove button ${i + 1}`}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
                <div className="grid gap-2 p-3 sm:grid-cols-2">
                  <input
                    className="input-field text-[13px]"
                    placeholder={i === 0 ? 'Get the free guide' : i === 1 ? 'Visit website' : 'Learn more'}
                    value={btn.title}
                    maxLength={20}
                    onChange={(e) => updateButton(i, 'title', e.target.value)}
                  />
                  <input
                    className="input-field text-[13px]"
                    placeholder="https://your-link.com"
                    type="url"
                    value={btn.url}
                    onChange={(e) => updateButton(i, 'url', e.target.value)}
                  />
                </div>
                {btn.title.length > 18 && (
                  <p className="px-3 pb-2 text-[11px] text-[var(--warning)]">Button labels work best under 20 characters.</p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Right: Phone preview ── */}
      <PhonePreview value={value} />
    </div>
  );
}

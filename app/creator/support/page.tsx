'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, MessageCircle, Book, Mail, ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How do I connect my Instagram account?',
    a: 'Go to Instagram → Connect Account. You\'ll be redirected to Meta\'s OAuth flow. You need an Instagram Business or Creator account connected to a Facebook Page.',
  },
  {
    q: 'Does this violate Instagram\'s terms?',
    a: 'No. DynamoDM uses the official Meta Graph API with proper permissions. All automations comply with Meta\'s policies. We use the instagram_manage_messages permission which is designed exactly for this use case.',
  },
  {
    q: 'How fast are DMs sent after a comment?',
    a: 'Typically within 2-10 seconds of the comment being posted. Our BullMQ worker system processes jobs with near-instant delivery.',
  },
  {
    q: 'Can I add attachments or PDFs to DMs?',
    a: 'Yes! On Pro and Premium plans, you can attach PDF links, images, or any URL to your DM response.',
  },
  {
    q: 'What happens if a DM fails?',
    a: 'Our system automatically retries failed DMs up to 3 times with exponential backoff. You can see failure reasons in your Analytics dashboard.',
  },
  {
    q: 'How does the cooldown feature work?',
    a: 'The cooldown prevents the same person from receiving duplicate DMs within a set time window. Default is 60 minutes. You can customize this per automation rule.',
  },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const links = [
    { icon: Book, label: 'Documentation', desc: 'Setup guides and API docs', href: '#', color: 'var(--brand-from)' },
    { icon: MessageCircle, label: 'Live Chat', desc: 'Chat with our team (Pro+)', href: '#', color: '#06b6d4' },
    { icon: Mail, label: 'Email Support', desc: 'support@dynamodm.io', href: 'mailto:support@dynamodm.io', color: '#10b981' },
  ];

  return (
    <div className="max-w-[720px]">
      <div className="creator-page-header">
        <h1 className="creator-page-title">Help & Support</h1>
        <p className="creator-page-description">Find answers or get in touch with our team.</p>
      </div>

      {/* Support Links */}
      <div className="mb-9 grid gap-4 sm:grid-cols-3">
        {links.map((link) => (
          <motion.a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ textDecoration: 'none' }}>
            <div className="creator-card creator-card--padded text-center">
              <div className="creator-icon-tile mx-auto mb-3" style={{ color: link.color }}>
                <link.icon size={20} color={link.color} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{link.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{link.desc}</div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* FAQ */}
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <HelpCircle size={20} className="text-[var(--brand-from)]" /> Frequently Asked Questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="card" style={{ overflow: 'hidden' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, textAlign: 'left' }}
                >
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{faq.q}</span>
                  <ChevronDown size={16} color="var(--text-muted)" style={{ flexShrink: 0, transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }} />
                </button>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} style={{ padding: '0 20px 16px', color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>
                    {faq.a}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

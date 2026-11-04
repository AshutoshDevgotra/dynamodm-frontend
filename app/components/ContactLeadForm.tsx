'use client';

import { track } from '../../lib/fbq';

export default function ContactLeadForm() {
  return (
    <form onSubmit={(event) => { event.preventDefault(); track('Lead', { content_name: 'contact_form', content_category: 'contact' }); }} className="rounded-[24px] border border-[#E5E7EB] bg-white p-8 shadow-sm">
      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div><label className="mb-1.5 block text-sm font-medium text-[#6B7280]">First name</label><input className="input-field" placeholder="Priya" /></div>
        <div><label className="mb-1.5 block text-sm font-medium text-[#6B7280]">Last name</label><input className="input-field" placeholder="Sharma" /></div>
      </div>
      <div className="mb-4"><label className="mb-1.5 block text-sm font-medium text-[#6B7280]">Email</label><input className="input-field" type="email" placeholder="you@example.com" /></div>
      <div className="mb-4"><label className="mb-1.5 block text-sm font-medium text-[#6B7280]">Subject</label><input className="input-field" placeholder="How can we help?" /></div>
      <div className="mb-6"><label className="mb-1.5 block text-sm font-medium text-[#6B7280]">Message</label><textarea className="input-field min-h-[140px]" rows={5} placeholder="Tell us a bit more..." /></div>
      <button type="submit" className="btn-primary w-full">Send message</button>
    </form>
  );
}

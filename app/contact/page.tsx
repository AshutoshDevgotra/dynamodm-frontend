import { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact the OrangeFlow.in team.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[68px] pb-16">
        <div className="container-sm">
          <div className="mb-10 pt-16 text-center">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl text-[#111111]">
              Get in <span className="font-serif italic font-normal">touch</span>
            </h1>
            <p className="mt-3 text-[#6B7280]">
              Send a note and we will reply within one business day.
            </p>
          </div>

          <form className="rounded-[24px] border border-[#E5E7EB] bg-white p-8 shadow-sm">
            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#6B7280]">First name</label>
                <input className="input-field" placeholder="Priya" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#6B7280]">Last name</label>
                <input className="input-field" placeholder="Sharma" />
              </div>
            </div>
            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-medium text-[#6B7280]">Email</label>
              <input className="input-field" type="email" placeholder="you@example.com" />
            </div>
            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-medium text-[#6B7280]">Subject</label>
              <input className="input-field" placeholder="How can we help?" />
            </div>
            <div className="mb-6">
              <label className="mb-1.5 block text-sm font-medium text-[#6B7280]">Message</label>
              <textarea className="input-field min-h-[140px]" rows={5} placeholder="Tell us a bit more..." />
            </div>
            <button type="submit" className="btn-primary w-full">Send message</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

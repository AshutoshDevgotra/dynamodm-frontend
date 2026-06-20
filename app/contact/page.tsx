import { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact DynamoDM support team.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 100 }}>
        <div className="container-sm" style={{ paddingTop: 48, paddingBottom: 80 }}>
          <h1 style={{ fontSize: 48, fontWeight: 900, marginBottom: 12, textAlign: 'center' }}>
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 17, textAlign: 'center', marginBottom: 48 }}>
            Have a question? We&apos;d love to hear from you. Send us a message and we&apos;ll respond within 24 hours.
          </p>

          <div className="glass-strong" style={{ padding: 40, borderRadius: 24, maxWidth: 560, margin: '0 auto' }}>
            <form>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>First Name</label>
                  <input className="input-field" placeholder="Priya" />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Last Name</label>
                  <input className="input-field" placeholder="Sharma" />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Email</label>
                <input className="input-field" type="email" placeholder="you@example.com" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Subject</label>
                <input className="input-field" placeholder="How can we help?" />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Message</label>
                <textarea className="input-field" rows={5} placeholder="Describe your issue or question in detail..." style={{ resize: 'vertical' }} />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>Send Message</button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

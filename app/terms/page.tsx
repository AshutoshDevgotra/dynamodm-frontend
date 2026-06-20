import { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = { title: 'Terms of Service', description: 'DynamoDM Terms of Service' };

export default function TermsPage() {
  const sections = [
    { title: '1. Acceptance of Terms', content: 'By accessing or using DynamoDM, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.' },
    { title: '2. Description of Service', content: 'DynamoDM provides Instagram DM automation tools that allow creators to automatically send direct messages to users who comment specific keywords on their Instagram posts using the official Meta Graph API.' },
    { title: '3. Acceptable Use', content: 'You agree to use DynamoDM only for lawful purposes and in accordance with Meta\'s Platform Terms and Instagram\'s Community Guidelines. You may not use our service to send spam, harass users, or engage in any illegal activity. You are responsible for the content of all automated messages sent from your account.' },
    { title: '4. Instagram API Compliance', content: 'Our service uses the official Meta Graph API. You must comply with Meta\'s terms of service at all times. Violation of Meta\'s policies may result in your Instagram account being restricted by Meta, for which DynamoDM bears no responsibility.' },
    { title: '5. Subscriptions & Payments', content: 'Subscription fees are billed monthly via Razorpay. By subscribing, you authorize recurring charges. You may cancel your subscription at any time; cancellation takes effect at the end of the current billing period. No refunds are provided for partial periods.' },
    { title: '6. Limitation of Liability', content: 'DynamoDM shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising from your use of the service or Meta API restrictions on your account.' },
    { title: '7. Termination', content: 'We may terminate or suspend your account for violation of these terms, Meta\'s policies, or any other conduct we deem harmful to our platform or other users.' },
    { title: '8. Contact', content: 'For questions about these Terms, contact us at legal@dynamodm.io.' },
  ];

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 100 }}>
        <div className="container-sm" style={{ paddingTop: 48, paddingBottom: 80 }}>
          <h1 style={{ fontSize: 44, fontWeight: 900, marginBottom: 8 }}>Terms of Service</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 48 }}>Last updated: June 2026</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {sections.map((s) => (
              <div key={s.title}>
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{s.title}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8 }}>{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

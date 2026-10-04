import { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | DynamoDM',
  description: 'DynamoDM Privacy Policy - Instagram automation by House of Orange',
};

export default function PrivacyPage() {
  const sections = [
    {
      title: '1. Information We Collect',
      content:
        'We collect information you provide directly when creating and using your DynamoDM account, including your name, email address, Instagram Business Account data (such as username, profile information, and follower count), automation rules and settings you create, and information necessary to manage your subscription. We also collect usage data such as DM logs, analytics events, and lead information generated through your automations.',
    },
    {
      title: '2. Account Login & Authentication',
      content:
        'DynamoDM allows users to create and access their accounts using Google Sign-In or email-based authentication. When you use Google Sign-In, we may receive basic account information provided by Google, such as your name and email address, for the purpose of creating and managing your DynamoDM account. We do not provide Google with access to your DynamoDM account data beyond what is required for authentication.',
    },
    {
      title: '3. How We Use Your Information',
      content:
        'We use your information to provide, maintain, and improve DynamoDM; manage your account; operate Instagram automation features; process subscriptions and payments; send transactional and service-related emails; provide customer support; monitor and analyze usage patterns; maintain platform security; and comply with applicable legal obligations. We do not sell your personal information to third parties.',
    },
    {
      title: '4. Instagram & Meta Data',
      content:
        'When you connect an eligible Instagram Business Account to DynamoDM, we may receive and store information made available through the Meta and Instagram APIs, including your Instagram Business Account ID, access token, username, profile information, and other information required to provide the automation features you authorize. Access tokens are encrypted at rest. We use Instagram and Meta data solely to provide the features and automations configured by you, including sending automated direct messages and processing relevant interactions. Our use of Meta and Instagram data is subject to applicable Meta Platform Terms and Instagram API policies.',
    },
    {
      title: '5. Payment Information',
      content:
        'Payments and subscription transactions for DynamoDM are processed through Razorpay, our third-party payment service provider. We may receive information such as transaction status, payment reference or transaction ID, subscription information, and other limited payment-related information necessary to manage your account and subscription. We do not store complete credit or debit card details on our own servers when those details are processed by Razorpay.',
    },
    {
      title: '6. Data Security',
      content:
        'We implement security measures designed to protect your information, including AES-256-GCM encryption for stored access tokens, HMAC signature verification for webhooks, JWT-based authentication, HTTPS enforcement, and rate limiting. However, no method of transmission or storage over the Internet can be guaranteed to be completely secure.',
    },
    {
      title: '7. Data Retention',
      content:
        'We retain your account information for as long as your DynamoDM account remains active or as necessary to provide our services. Analytics events are retained for up to 1 year. DM logs are retained for 90 days. Certain information may be retained for a longer period where required for legal, security, fraud-prevention, accounting, or dispute-resolution purposes. You may request deletion of your data by contacting us.',
    },
    {
      title: '8. Your Rights',
      content:
        'You may have the right to access, update, correct, or delete your personal information; request export of your data, including available leads and DM logs; disconnect your Instagram account from DynamoDM; close your DynamoDM account; and opt out of marketing communications. To exercise these rights, please contact us using the details provided below.',
    },
    {
      title: '9. Third-Party Services',
      content:
        'DynamoDM relies on certain third-party services to provide its functionality. These may include Google for authentication, Meta and Instagram for Instagram integrations and APIs, and Razorpay for payment processing. Your use of these third-party services may also be subject to their respective terms and privacy policies.',
    },
    {
      title: '10. Cookies & Usage Technologies',
      content:
        'DynamoDM may use cookies and similar technologies that are necessary for authentication, maintaining user sessions, security, preferences, analytics, and improving the user experience. You may configure your browser to restrict cookies, although certain functionality of the Service may not work correctly if necessary cookies are disabled.',
    },
    {
      title: '11. Data Deletion',
      content:
        'You may request deletion of your DynamoDM account and associated personal information by contacting us. Where applicable, we will process deletion requests within a reasonable period. Some information may need to be retained where required by applicable law or where reasonably necessary for security, fraud prevention, accounting, dispute resolution, or enforcement of our agreements.',
    },
    {
      title: '12. Changes to This Privacy Policy',
      content:
        'We may update this Privacy Policy from time to time to reflect changes to DynamoDM, our data practices, third-party integrations, or applicable legal requirements. Any updates will be published on this page and the "Last updated" date will be revised accordingly.',
    },
    {
      title: '13. Contact Us',
      content:
        'If you have questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact House of Orange at admin@houseoforange.in or +91 9877292856. Our address is 144 Green Avenue, Mukerian, Punjab - 144211, India.',
    },
  ];

  return (
    <>
      <Navbar />

      <main className="pt-28 pb-16">
        <div className="container-sm">
          <h1 className="text-4xl font-semibold tracking-tight">
            Privacy Policy
          </h1>

          <p className="mt-2 mb-10 text-sm text-[var(--text-muted)]">
            Last updated: October 2026
          </p>

          <div className="space-y-8">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="mb-2 text-lg font-semibold">{s.title}</h2>

                <p className="text-[15px] leading-8 text-[var(--text-secondary)]">
                  {s.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
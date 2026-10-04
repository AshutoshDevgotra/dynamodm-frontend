import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Return and Refund Policy',
  description: 'Return and Refund Policy for House of Orange Automations.',
};

const sections = [
  {
    title: '1. Free Plan',
    paragraphs: [
      'The Free Plan does not require any payment and may be discontinued or canceled at any time without any financial obligation.',
      'Users on the Free Plan may upgrade to a paid subscription at any time. No refund is applicable to the Free Plan as no payment is required.',
    ],
  },
  {
    title: '2. Monthly Plan',
    paragraphs: [
      'Users may cancel their Monthly Plan subscription at any time before the next billing date.',
      'Payments made for the current billing cycle are non-refundable. Once a subscription is canceled, it will not automatically renew for the next billing cycle. Your access to paid features will continue until the end of the current paid billing period.',
      'Partial refunds will not be provided for unused days, unused features, or early cancellation during an active billing cycle.',
    ],
  },
  {
    title: '3. Annual Plan',
    paragraphs: [
      'Users may cancel their Annual Plan subscription at any time.',
      'Payments made for the current annual billing period are non-refundable. Once canceled, the subscription will not renew for the next annual billing period. Your access to premium features will remain active until the end of the current annual billing period.',
      'Partial or prorated refunds will not be provided for unused time remaining in an active annual subscription.',
    ],
  },
  {
    title: '4. Subscription Cancellation',
    paragraphs: [
      'To cancel your subscription, please contact our support team. You may also contact the House of Orange team for assistance with your subscription or account.',
      'Once your cancellation request has been processed, you will receive confirmation via email or other available communication channels.',
      'Cancellation of a subscription only prevents future billing. It does not automatically result in a refund for the current billing period.',
    ],
    contact: ['Email: support@houseoforange.in', 'WhatsApp: +91 7982454237'],
  },
  {
    title: '5. Failed or Duplicate Payments',
    paragraphs: [
      'If you believe you have been charged more than once for the same subscription or that a payment was processed incorrectly due to a technical issue, please contact us at support@houseoforange.in with your payment details.',
      'We will review the transaction and, where a duplicate or erroneous charge is confirmed, process an appropriate refund.',
    ],
  },
  {
    title: '6. Service-Related Issues',
    paragraphs: [
      'House of Orange aims to maintain reliable availability of the automation platform. However, temporary interruptions may occur due to maintenance, third-party services, platform restrictions, API limitations, technical issues, or circumstances beyond our reasonable control.',
      'Temporary unavailability or interruption of a third-party platform, including Instagram or Meta services, does not automatically qualify a user for a refund.',
      'If you experience a technical issue with our platform, please contact our support team so that we can investigate and attempt to resolve the issue.',
    ],
  },
  {
    title: '7. Abuse of Refunds and Subscriptions',
    paragraphs: [
      'We reserve the right to deny refund requests where we reasonably determine that a user is attempting to abuse our refund or subscription system, including repeatedly subscribing, requesting refunds, canceling, and resubscribing for the purpose of obtaining paid services without payment.',
      'Accounts involved in fraudulent activity, payment abuse, or misuse of the platform may be suspended or terminated in accordance with our Terms of Service.',
    ],
  },
  {
    title: '8. Third-Party Platform Restrictions',
    paragraphs: [
      'Our automation services may rely on third-party platforms, APIs, and services, including Instagram and Meta.',
      'Changes to third-party APIs, permissions, policies, account restrictions, rate limits, outages, or other third-party actions may affect the availability or functionality of certain features. Such third-party restrictions do not automatically create an entitlement to a refund.',
    ],
  },
  {
    title: '9. Changes to This Policy',
    paragraphs: [
      'We may update this Return and Refund Policy from time to time to reflect changes to our services, business practices, or applicable requirements.',
      'Any changes will be published on this page. Where appropriate, significant changes may also be communicated to users through email or other available communication channels.',
    ],
  },
  {
    title: '10. Contact Us',
    paragraphs: [
      'If you have any questions, concerns, or requests regarding this Return and Refund Policy, please contact us:',
    ],
    contact: [
      'House of Orange',
      'Website: automation.houseoforange.in',
      'Email: support@houseoforange.in',
      'WhatsApp: +91 977292856',
      'Address: Green Avenue, 144, Green Avenue, Mukerian, Punjab 144211, India',
    ],
  },
];

export default function RefundPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container-sm">
          <h1 className="text-4xl font-semibold tracking-tight">Return and Refund Policy</h1>
          <p className="mt-2 mb-10 text-sm text-[var(--text-muted)]">Effective Date: 4 October 2026</p>

          <p className="mb-10 text-[15px] leading-8 text-[var(--text-secondary)]">
            At automations.houseoforange.in, operated by House of Orange, we value our customers and strive to provide a reliable and effective automation platform for creators, businesses, and brands. This Return and Refund Policy explains the terms applicable to our free and paid subscription plans.
          </p>

          <div className="space-y-8">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="mb-2 text-lg font-semibold">{section.title}</h2>
                <div className="space-y-3 text-[15px] leading-8 text-[var(--text-secondary)]">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.contact && (
                    <div className="space-y-1">
                      {section.contact.map((line) => <p key={line}>{line}</p>)}
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-10 text-[15px] leading-8 text-[var(--text-secondary)]">
            Thank you for using House of Orange Automations.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

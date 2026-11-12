import { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Support - OrangeFlow',
  description: 'Get help with OrangeFlow. Contact support, browse FAQs, and access documentation for Instagram automation and growth.',
  keywords: 'support, help, customer service, FAQ, documentation, Instagram automation support',
};

const faqs = [
  {
    question: 'How do I connect my Instagram account?',
    answer: 'Go to your Creator Dashboard, click "Connect Instagram", and follow the OAuth flow to authorize OrangeFlow. You need an Instagram Professional account (Business or Creator).',
  },
  {
    question: 'Why aren\'t my auto-DMs sending?',
    answer: 'Check: 1) Your Instagram account is connected, 2) You have active automations enabled, 3) You haven\'t exceeded your monthly DM limit, 4) The keyword matches exactly what users are commenting.',
  },
  {
    question: 'What is the cooling period?',
    answer: 'To prevent spam, Instagram users can only receive one auto-DM per hour from your account. This protects your account from being flagged.',
  },
  {
    question: 'How do I upgrade my plan?',
    answer: 'Go to Settings → Subscription in your dashboard. Select a new plan and complete the payment. Your upgrade takes effect immediately.',
  },
  {
    question: 'Can I cancel my subscription?',
    answer: 'Yes! Go to Settings → Subscription → Cancel Plan. You\'ll retain access until the end of your billing period.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 7-day money-back guarantee if you\'re not satisfied. Please contact support with your order details.',
  },
  {
    question: 'How many Instagram accounts can I connect?',
    answer: 'Starter: 1 account, Creator: 1 account, Pro: Multiple accounts. Check your plan limits in the dashboard.',
  },
  {
    question: 'Is my Instagram account safe?',
    answer: 'Yes! We use official Instagram Graph API and follow all Meta guidelines. Your credentials are never stored, only OAuth tokens.',
  },
];

const supportChannels = [
  {
    icon: '📧',
    title: 'Email Support',
    description: 'Get help via email within 24 hours',
    contact: 'support@orangeflow.in',
    action: 'mailto:support@orangeflow.in',
    actionText: 'Send Email',
    availability: '⏱️ Response within 24 hours',
  },
  {
    icon: '💬',
    title: 'WhatsApp Support',
    description: 'Quick responses on WhatsApp',
    contact: '+91 XXXXX XXXXX',
    action: 'https://wa.me/91XXXXXXXXXX',
    actionText: 'Message on WhatsApp',
    availability: '⏱️ Mon-Fri, 10 AM - 6 PM IST',
  },
  {
    icon: '📚',
    title: 'Documentation',
    description: 'Step-by-step guides and tutorials',
    contact: 'Comprehensive knowledge base',
    action: '/learn',
    actionText: 'Browse Docs',
    availability: '⏱️ Available 24/7',
  },
];

export default function SupportPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[68px] pb-16 bg-gradient-to-b from-[#FFF8EB] to-white">
        {/* Hero Section */}
        <div className="container-sm">
          <div className="mb-12 pt-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FFF3EE] rounded-full mb-6 text-3xl">
              ❓
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-[#111111] mb-4">
              How can we <span className="text-[#FF6B00]">help you?</span>
            </h1>
            <p className="mt-3 text-lg text-[#6B7280] max-w-2xl mx-auto">
              Get support, find answers, and learn how to make the most of OrangeFlow
            </p>
          </div>

          {/* Support Channels */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {supportChannels.map((channel, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#F1E8DC] rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-[#FF6B00]"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-[#FFF3EE] rounded-xl mb-4 text-2xl">
                  {channel.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#111111] mb-2">
                  {channel.title}
                </h3>
                <p className="text-[#6B7280] mb-3 text-sm">
                  {channel.description}
                </p>
                <p className="text-[#111111] font-medium mb-3">
                  {channel.contact}
                </p>
                <div className="text-xs text-[#6B7280] mb-4">
                  {channel.availability}
                </div>
                <Link
                  href={channel.action}
                  className="inline-block w-full text-center bg-[#FF6B00] text-white px-4 py-2.5 rounded-lg hover:bg-[#E55F00] transition-colors font-medium"
                >
                  {channel.actionText}
                </Link>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#111111] mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-[#6B7280]">
                Quick answers to common questions
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-white border border-[#F1E8DC] rounded-xl p-6 hover:border-[#FF6B00] transition-all"
                >
                  <summary className="flex justify-between items-center cursor-pointer list-none">
                    <span className="font-semibold text-[#111111] pr-4">
                      {faq.question}
                    </span>
                    <span className="text-[#FF6B00] group-open:rotate-180 transition-transform">
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-[#6B7280] leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* Additional Resources */}
          <div className="bg-gradient-to-br from-[#FF6B00] to-[#E55F00] rounded-2xl p-8 md:p-12 text-white text-center">
            <div className="text-5xl mb-4">👥</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Still need help?
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Our support team is here to help you succeed. Get personalized assistance with your account, automations, or any technical issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="mailto:support@orangeflow.in"
                className="inline-block bg-white text-[#FF6B00] px-8 py-3 rounded-lg hover:bg-[#FFF8EB] transition-colors font-semibold"
              >
                Contact Support
              </Link>
              <Link
                href="/learn"
                className="inline-block bg-white/10 backdrop-blur text-white px-8 py-3 rounded-lg hover:bg-white/20 transition-colors font-semibold border border-white/20"
              >
                Browse Documentation
              </Link>
            </div>
          </div>

          {/* Business Hours */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-[#6B7280] bg-white border border-[#F1E8DC] rounded-full px-6 py-3">
              <span className="text-lg">⏰</span>
              <span>
                <strong className="text-[#111111]">Support Hours:</strong> Monday - Friday, 10 AM - 6 PM IST
              </span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

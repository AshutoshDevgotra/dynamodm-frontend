import { getCampaignPlan } from '../../../lib/campaign';

const faqs = [
  {
    q: 'What is OrangeFlow?',
    a: 'OrangeFlow helps businesses and creators automate Instagram conversations using configured triggers and automated direct messages. When someone comments with a specific keyword, OrangeFlow automatically sends the configured DM and logs the person as a lead.',
  },
  {
    q: 'What does the Creator offer include?',
    a: 'New Creator subscribers get the full plan free for their first month. From the second billing cycle, the plan renews at ₹99/month.',
  },
  {
    q: 'What happens after the first month?',
    a: 'The subscription renews at ₹99/month. This is disclosed before checkout, and you must confirm the recurring AutoPay charge.',
  },
  {
    q: 'Will my existing subscription be changed?',
    a: 'No. The promotional pricing applies only to new subscriptions created during the campaign period. Existing active subscriptions are not affected.',
  },
  {
    q: 'Can I change or cancel my plan?',
    a: 'Yes. You can manage your subscription, change plans, or cancel at any time from your account settings. The existing plan management functionality is fully supported.',
  },
  {
    q: 'Is there a free plan?',
    a: 'Yes. OrangeFlow has a free plan that lets you try the core workflow with 10 DMs per month. No credit card is required.',
  },
  {
    q: 'Which Instagram account types are supported?',
    a: 'Instagram automation requires an eligible Business or Creator account. Personal accounts are not supported for automation workflows.',
  },
  {
    q: 'How quickly are automated DMs sent?',
    a: 'OrangeFlow uses policy-aware send pacing to keep delivery reliable and within platform guidelines. Typical delivery is within seconds of the trigger.',
  },
];

export default function CampaignFAQ() {
  const proPlan = getCampaignPlan('starter');

  return (
    <section
      className="py-20 sm:py-28"
      style={{ background: '#FAFAF7' }}
      id="faq"
      aria-labelledby="faq-heading"
    >
      <div className="container max-w-3xl">
        <div className="mb-10 text-center">
          <span
            className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-bold uppercase tracking-widest"
            style={{ background: 'rgba(255,120,0,0.07)', borderColor: 'rgba(255,120,0,0.18)', color: '#FF7800' }}
          >
            FAQ
          </span>
          <h2 className="mt-3 text-[#111111]">
            Questions?{' '}
            <span className="font-serif text-[0.9em]">Answers.</span>
          </h2>
        </div>

        <div className="divide-y divide-[#EEE7DF] rounded-[24px] border border-[#E9E1D7] bg-white px-6 shadow-[0_14px_40px_rgba(76,55,38,0.06)] sm:px-8">
          {faqs.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-[15px] font-semibold text-[#111111]">
                {item.q}
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#E5E7EB] text-base font-normal text-[#6B7280] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl pb-1 text-[14px] leading-relaxed text-[#6B7280]">{item.a}</p>
            </details>
          ))}
        </div>

        {proPlan && (
          <div
            className="mt-8 rounded-[20px] p-6 text-center"
            style={{ background: 'rgba(255,120,0,0.07)', border: '1px solid rgba(255,120,0,0.15)' }}
          >
            <p className="text-[14px] text-[#6B7280]">
              Still have questions?{' '}
              <a href="/contact" className="font-semibold text-[#FF7800] underline-offset-2 hover:underline">
                Contact our team
              </a>{' '}
              at{' '}
              <a href="mailto:team@houseoforange.in" className="font-semibold text-[#FF7800] underline-offset-2 hover:underline">
                team@houseoforange.in
              </a>{' '}
              — we're happy to help.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

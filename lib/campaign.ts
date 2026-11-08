/**
 * OrangeFlow Diwali Extended Offer — Centralized Campaign Configuration
 *
 * All campaign logic (pricing, eligibility, display) must read from this file.
 * Never hardcode campaign prices in individual UI components.
 */

export interface CampaignPlanPricing {
  planId: 'starter' | 'pro' | 'premium';
  planName: string;
  regularPriceInr: number;
  offerPriceInr: number;
  discountPercent: number;
  savingsPerMonthInr: number;
  introductoryCycles: number; // Number of billing cycles at offer price
}

export interface CampaignConfig {
  /** Internal campaign slug — used for tracking and coupon codes */
  campaignId: string;
  /** Human-readable campaign name */
  campaignName: string;
  /** Whether the campaign is currently active */
  active: boolean;
  /**
   * Campaign end date (ISO string or null).
   * If null, no countdown is shown. Do not invent a fake date.
   */
  endDate: string | null;
  /** Plan pricing details */
  plans: CampaignPlanPricing[];
  /** Coupon code prefix used in Razorpay order notes */
  couponPrefix: string;
}

export const CAMPAIGN: CampaignConfig = {
  campaignId: 'diwali-extended-2026',
  campaignName: 'Diwali Extended Offer',
  active: true,
  endDate: null, // Set to ISO string (e.g. "2026-11-30T23:59:59+05:30") to enable countdown
  couponPrefix: 'DIWALI26',
  plans: [
    {
      planId: 'starter',
      planName: 'Starter',
      regularPriceInr: 99,
      offerPriceInr: 79,
      discountPercent: 20,
      savingsPerMonthInr: 20,
      introductoryCycles: 3,
    },
    {
      planId: 'pro',
      planName: 'Pro',
      regularPriceInr: 499,
      offerPriceInr: 299,
      discountPercent: 40,
      savingsPerMonthInr: 200,
      introductoryCycles: 3,
    },
    {
      planId: 'premium',
      planName: 'Premium',
      regularPriceInr: 999,
      offerPriceInr: 699,
      discountPercent: 30,
      savingsPerMonthInr: 300,
      introductoryCycles: 3,
    },
  ],
};

/** Returns the campaign plan pricing for a given planId, or null if not found */
export function getCampaignPlan(planId: string): CampaignPlanPricing | null {
  if (!CAMPAIGN.active) return null;
  return CAMPAIGN.plans.find((p) => p.planId === planId) ?? null;
}

/**
 * Returns the effective checkout price for a plan.
 * If the campaign is active, returns the offer price; otherwise the regular price.
 */
export function getEffectivePriceInr(planId: string, regularPriceInr: number): number {
  const cp = getCampaignPlan(planId);
  return cp ? cp.offerPriceInr : regularPriceInr;
}

/**
 * Returns the checkout URL for a plan, appending the campaign source.
 * Preserves existing query params.
 */
export function getCampaignCheckoutHref(
  planId: string,
  baseHref: string,
  source?: string,
): string {
  const url = new URL(baseHref, 'https://orangeflow.in');
  if (CAMPAIGN.active) {
    url.searchParams.set('campaign', CAMPAIGN.campaignId);
    if (source) url.searchParams.set('utm_source', source);
  }
  return url.pathname + (url.search || '');
}

/** Human-readable introductory terms for a plan */
export function getIntroTerms(plan: CampaignPlanPricing): string {
  return `Introductory price for your first ${plan.introductoryCycles} months. Regular price of ₹${plan.regularPriceInr}/month applies from the ${plan.introductoryCycles + 1}${plan.introductoryCycles === 3 ? 'rd' : 'th'} billing cycle.`;
}

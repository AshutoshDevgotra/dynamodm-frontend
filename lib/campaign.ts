/**
 * OrangeFlow Creator Launch Offer — Centralized Campaign Configuration
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
  campaignId: 'creator-launch-2026',
  campaignName: 'Creator Launch Offer',
  active: false,
  endDate: null, // Set to ISO string (e.g. "2026-11-30T23:59:59+05:30") to enable countdown
  couponPrefix: 'CREATOR26',
  plans: [{ planId: 'starter', planName: 'Creator', regularPriceInr: 99, offerPriceInr: 0, discountPercent: 100, savingsPerMonthInr: 99, introductoryCycles: 1 }],
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
  return `Free for your first month. Regular price of ₹${plan.regularPriceInr}/month applies from the second billing cycle.`;
}

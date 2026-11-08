'use client';

import { useEffect } from 'react';
import { track, trackCustom } from '../../../lib/fbq';
import { CAMPAIGN } from '../../../lib/campaign';

interface CampaignTrackerProps {
  /** Which page/section is being viewed */
  event: 'LandingView' | 'PricingView' | 'CTAClick' | 'CheckoutInitiated';
  /** Additional Meta-safe event params (no PII) */
  params?: Record<string, string | number | boolean>;
}

/**
 * Fires campaign analytics on mount.
 * Preserves UTM params in sessionStorage for checkout.
 */
export function CampaignTracker({ event, params }: CampaignTrackerProps) {
  useEffect(() => {
    if (!CAMPAIGN.active) return;

    // Persist UTM params from URL into session so checkout can read them
    const urlParams = new URLSearchParams(window.location.search);
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    utmKeys.forEach((key) => {
      const val = urlParams.get(key);
      if (val) sessionStorage.setItem(key, val);
    });

    const campaignParams = {
      campaign_id: CAMPAIGN.campaignId,
      campaign_name: CAMPAIGN.campaignName,
      ...params,
    };

    if (event === 'LandingView') {
      track('ViewContent', {
        content_name: 'diwali_landing',
        content_category: 'campaign',
        ...campaignParams,
      });
    } else if (event === 'PricingView') {
      track('ViewContent', {
        content_name: 'diwali_pricing',
        content_category: 'subscription',
        ...campaignParams,
      });
    } else if (event === 'CTAClick') {
      trackCustom('CampaignCTAClick', campaignParams);
    } else if (event === 'CheckoutInitiated') {
      trackCustom('CampaignCheckoutInitiated', campaignParams);
    }
  }, [event, params]);

  return null;
}

/** Fires a CTA click event imperatively */
export function trackCampaignCTA(label: string, planId?: string) {
  if (!CAMPAIGN.active) return;
  trackCustom('CampaignCTAClick', {
    campaign_id: CAMPAIGN.campaignId,
    cta_label: label,
    ...(planId ? { plan_id: planId } : {}),
  });
}

/** Fires checkout initiation with plan and campaign context */
export function trackCampaignCheckout(planId: string, priceInr: number) {
  if (!CAMPAIGN.active) return;
  track('InitiateCheckout', {
    content_name: planId,
    content_category: 'subscription',
    value: priceInr,
    currency: 'INR',
    campaign_id: CAMPAIGN.campaignId,
  });
}

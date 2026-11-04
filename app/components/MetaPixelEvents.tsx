'use client';

import { useEffect } from 'react';
import { track } from '../../lib/fbq';

export function PricingViewContent() {
  useEffect(() => {
    track('ViewContent', { content_name: 'pricing', content_category: 'subscription' });
  }, []);

  return null;
}

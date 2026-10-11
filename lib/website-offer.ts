import { estimateBriefFromParams } from '@/lib/website-cost';

export const websiteOffer = {
  service: 'R3000 website offer',
  budget: 'R3000',
  contactUrl: '/contact?offer=website-r3000',
} as const;

export function inquiryPrefill(params: URLSearchParams, rescue = false) {
  const message = estimateBriefFromParams(params);
  // An estimator brief or rescue form retains its own context. Only a known,
  // unambiguous offer identifier may preselect commercial fields.
  const offer = !rescue && !message && params.getAll('offer').length === 1 && params.get('offer') === 'website-r3000';
  return { message, service: offer ? websiteOffer.service : '', budget: offer ? websiteOffer.budget : '' };
}

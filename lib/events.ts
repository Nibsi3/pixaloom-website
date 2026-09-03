export const conversionEvents = ['email_click', 'phone_click', 'whatsapp_click', 'enquiry_start', 'enquiry_submit', 'enquiry_error', 'estimate_quote_click'] as const;
export type ConversionEvent = (typeof conversionEvents)[number];

export function trackEvent(event: ConversionEvent) {
  // Same-origin, identifier-free operational counts, not cross-site analytics.
  // Never send form values, referrers, query strings or a visitor identifier.
  if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
    navigator.sendBeacon('/api/events', JSON.stringify({ event }));
  }
}

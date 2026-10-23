export const conversionEvents = ['email_click', 'phone_click', 'whatsapp_click', 'enquiry_start', 'enquiry_submit', 'enquiry_accepted', 'enquiry_error', 'estimate_quote_click'] as const;
export type ConversionEvent = (typeof conversionEvents)[number];

export function trackEvent(event: ConversionEvent) {
  // Use the existing owner-hosted analytics destination. Acceptance means the
  // email provider accepted the message, not inbox delivery or a qualified lead.
  // Tracking must never prevent a contact action if a tracker is unavailable.
  if (typeof window !== 'undefined' && ['pixaloom.co.za', 'www.pixaloom.co.za'].includes(window.location.hostname)) {
    try {
      const tracker = (window as Window & { plausible?: (name: string, options: { u: string }) => void }).plausible;
      tracker?.(event, { u: window.location.origin + window.location.pathname });
    } catch { /* Contact actions work independently of analytics. */ }
  }
  // Same-origin, identifier-free operational counts, not cross-site analytics.
  // Never send form values, referrers, query strings or a visitor identifier.
  if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
    try { navigator.sendBeacon('/api/events', JSON.stringify({ event })); } catch { /* Best-effort operational count. */ }
  }
}

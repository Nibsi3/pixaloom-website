export const contactUnavailable = 'The form is temporarily unavailable. Please email info@pixaloom.co.za or call 066 299 5533.';
export type ContactDetails = { name: string; email: string; company: string; phone: string; service: string; budget: string; message: string; website: string };
type Validation = { ok: true; data: ContactDetails; bot: boolean } | { ok: false; error: string };

export function validateContact(input: unknown): Validation {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { ok: false, error: 'Please complete the enquiry form.' };
  const value = input as Record<string, unknown>;
  const limits = { name: 80, email: 120, company: 120, phone: 30, service: 80, budget: 80, message: 3000, website: 200 };
  const data = {} as ContactDetails;
  for (const [key, limit] of Object.entries(limits)) {
    const field = value[key];
    if (field !== undefined && typeof field !== 'string') return { ok: false, error: 'Please check the enquiry fields.' };
    const text = typeof field === 'string' ? field.trim() : '';
    if (text.length > limit) return { ok: false, error: 'One or more fields are too long.' };
    data[key as keyof ContactDetails] = text;
  }
  if (data.website) return { ok: true, data, bot: true };
  if (!data.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || /[\r\n]/.test(data.name)) return { ok: false, error: 'Please provide a valid name and email address.' };
  if (data.message.length < 20) return { ok: false, error: 'Please provide between 20 and 3,000 characters.' };
  return { ok: true, data, bot: false };
}

export function escapeHtml(input: string) {
  return input.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

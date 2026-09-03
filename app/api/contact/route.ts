import { Resend } from 'resend';
import { contactUnavailable, escapeHtml, validateContact } from '@/lib/contact';

const json = (data: object, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });

// Readiness only: does not send email or expose configuration values.
export async function GET() {
  const available = Boolean(process.env.RESEND_API_KEY);
  return json({ available }, available ? 200 : 503);
}

export async function POST(req: Request) {
  if (!req.headers.get('content-type')?.includes('application/json')) return json({ ok: false, error: 'Please submit the website enquiry form.' }, 415);
  const origin = req.headers.get('origin');
  if (origin && origin !== new URL(req.url).origin && !['https://www.pixaloom.co.za', 'https://pixaloom.co.za'].includes(origin)) return json({ ok: false, error: 'Invalid request origin.' }, 403);
  let input: unknown;
  try {
    const reader = req.body?.getReader();
    if (!reader) return json({ ok: false, error: 'Please complete the enquiry form.' }, 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 24000) { await reader.cancel(); return json({ ok: false, error: 'Your enquiry is too long.' }, 413); }
      chunks.push(value);
    }
    input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch { return json({ ok: false, error: 'Please check the enquiry and try again.' }, 400); }
  const checked = validateContact(input);
  if (!checked.ok) return json({ ok: false, error: checked.error }, 400);
  if (checked.bot) return json({ ok: true });
  if (!process.env.RESEND_API_KEY) {
    console.error(JSON.stringify({ event: 'enquiry_unavailable', reason: 'email_not_configured' }));
    return json({ ok: false, error: contactUnavailable }, 503);
  }
  const { name, email, company, phone, service, budget, message } = checked.data;
  const fields = { Name: name, Email: email, Company: company, Phone: phone, Service: service, Budget: budget, Message: message };
  try {
    const result = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: process.env.RESEND_FROM || 'Pixaloom Website <website@pixaloom.co.za>',
      to: 'info@pixaloom.co.za', replyTo: email, subject: `Pixaloom enquiry — ${name}`,
      text: Object.entries(fields).map(([label, value]) => `${label}: ${value || '-'}`).join('\n\n'),
      html: Object.entries(fields).map(([label, value]) => `<p><strong>${label}</strong><br/>${escapeHtml(value || '-').replaceAll('\n', '<br/>')}</p>`).join(''),
    });
    if (result.error || !result.data?.id) throw new Error('delivery_failed');
    console.info(JSON.stringify({ event: 'enquiry_accepted' }));
    return json({ ok: true });
  } catch {
    // Never log form contents, addresses, credentials or provider errors.
    console.error(JSON.stringify({ event: 'enquiry_failed', reason: 'email_provider' }));
    return json({ ok: false, error: contactUnavailable }, 502);
  }
}

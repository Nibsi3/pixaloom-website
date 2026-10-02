import { contactUnavailable, escapeHtml, validateContact } from '@/lib/contact';
import { getEmailConfig, sendEmail } from '@/lib/email';

const json = (data: object, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });

// Readiness only: does not send email or expose configuration values.
export async function GET() {
  const available = Boolean(getEmailConfig());
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
  if (!getEmailConfig()) {
    console.error(JSON.stringify({ event: 'enquiry_unavailable', reason: 'email_not_configured' }));
    return json({ ok: false, error: contactUnavailable }, 503);
  }
  const { name, email, company, phone, service, budget, message, platform, appUrl, expected, errorLink, repository, deadline } = checked.data;
  const fields = { Name: name, Email: email, Company: company, Phone: phone, Service: service, Budget: budget, Message: message, ...(service === 'AI Website & App Rescue' ? { Platform: platform, 'App URL': appUrl, 'Expected result': expected, 'Error or screenshot link': errorLink, Repository: repository, 'Desired deadline': deadline } : {}) };
  try {
    await sendEmail({
      to: 'info@pixaloom.co.za', replyTo: email, subject: `Pixaloom enquiry — ${name}`,
      text: Object.entries(fields).map(([label, value]) => `${label}: ${value || '-'}`).join('\n\n'),
      html: Object.entries(fields).map(([label, value]) => `<p><strong>${label}</strong><br/>${escapeHtml(value || '-').replaceAll('\n', '<br/>')}</p>`).join(''),
    });
    console.info(JSON.stringify({ event: 'enquiry_accepted' }));
    return json({ ok: true });
  } catch {
    // Never log form contents, addresses, credentials or provider errors.
    console.error(JSON.stringify({ event: 'enquiry_failed', reason: 'email_provider' }));
    return json({ ok: false, error: contactUnavailable }, 502);
  }
}

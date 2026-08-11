import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: 'Missing RESEND_API_KEY' },
        { status: 500 },
      );
    }

    const from = process.env.RESEND_FROM || 'Pixaloom Website <website@pixaloom.co.za>';

    const body = (await req.json()) as {
      name?: string;
      email?: string;
      company?: string;
      phone?: string;
      service?: string;
      budget?: string;
      message?: string;
      website?: string;
    };

    const name = (body.name || '').trim();
    const email = (body.email || '').trim();
    const company = (body.company || '').trim();
    const phone = (body.phone || '').trim();
    const service = (body.service || '').trim();
    const budget = (body.budget || '').trim();
    const message = (body.message || '').trim();

    // Quietly accept bot submissions caught by the honeypot.
    if ((body.website || '').trim()) {
      return NextResponse.json({ ok: true });
    }

    if (!name || name.length > 80 || !email || email.length > 120 || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: 'Please provide a valid name and email address.' },
        { status: 400 },
      );
    }

    if (message.length < 20 || message.length > 3000) {
      return NextResponse.json(
        { ok: false, error: 'Please provide between 20 and 3,000 characters.' },
        { status: 400 },
      );
    }

    if (company.length > 120 || phone.length > 30 || service.length > 80 || budget.length > 80) {
      return NextResponse.json({ ok: false, error: 'One or more fields are too long.' }, { status: 400 });
    }

    const resend = new Resend(apiKey);

    const subject = `Pixaloom enquiry${name ? ` — ${name}` : ''}`;

    const textLines = [
      'New project enquiry',
      '',
      `Name: ${name || '-'}`,
      `Email: ${email || '-'}`,
      `Company: ${company || '-'}`,
      `Phone: ${phone || '-'}`,
      `Service: ${service || '-'}`,
      `Budget: ${budget || '-'}`,
      '',
      'Message:',
      message,
    ];

    const html = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto;">
        <h2 style="margin:0 0 12px;">New project enquiry</h2>
        <table style="border-collapse:collapse;">
          <tr><td style="padding:4px 12px 4px 0; color:#6b7280;">Name</td><td style="padding:4px 0;">${escapeHtml(name || '-')}</td></tr>
          <tr><td style="padding:4px 12px 4px 0; color:#6b7280;">Email</td><td style="padding:4px 0;">${escapeHtml(email || '-')}</td></tr>
          <tr><td style="padding:4px 12px 4px 0; color:#6b7280;">Company</td><td style="padding:4px 0;">${escapeHtml(company || '-')}</td></tr>
          <tr><td style="padding:4px 12px 4px 0; color:#6b7280;">Phone</td><td style="padding:4px 0;">${escapeHtml(phone || '-')}</td></tr>
          <tr><td style="padding:4px 12px 4px 0; color:#6b7280;">Service</td><td style="padding:4px 0;">${escapeHtml(service || '-')}</td></tr>
          <tr><td style="padding:4px 12px 4px 0; color:#6b7280;">Budget</td><td style="padding:4px 0;">${escapeHtml(budget || '-')}</td></tr>
        </table>
        <div style="margin-top:16px;">
          <div style="color:#6b7280; font-size:12px; margin-bottom:6px;">Message</div>
          <div style="white-space:pre-wrap; line-height:1.5;">${escapeHtml(message)}</div>
        </div>
      </div>
    `;

    const to = 'info@pixaloom.co.za';

    const result = await resend.emails.send({
      from,
      to,
      subject,
      text: textLines.join('\n'),
      html,
      reply_to: email,
    });

    if (result.error) {
      return NextResponse.json({ ok: false, error: result.error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Unexpected error' }, { status: 500 });
  }
}

function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

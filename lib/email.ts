type EmailMessage = { to: string; replyTo: string; subject: string; text: string; html: string };

export function getEmailConfig() {
  const apiKey = process.env.BYTESEND_API_KEY?.trim();
  if (!apiKey) return undefined;
  try {
    const base = new URL(process.env.BYTESEND_BASE_URL?.trim() || 'https://bytesend.cloud');
    if (base.protocol !== 'https:' || base.username || base.password || base.pathname !== '/' || base.search || base.hash) return undefined;
    const from = process.env.BYTESEND_FROM?.trim() || 'Pixaloom Website <website@pixaloom.co.za>';
    if (/[\r\n]/.test(from)) return undefined;
    return { apiKey, from, endpoint: new URL('/api/v1/emails', base).href };
  } catch {
    return undefined;
  }
}

export async function sendEmail(message: EmailMessage) {
  const config = getEmailConfig();
  if (!config) throw new Error('email_unavailable');
  const response = await fetch(config.endpoint, {
    method: 'POST',
    headers: { Authorization: `Bearer ${config.apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...message, from: config.from }),
    cache: 'no-store',
    redirect: 'error',
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error('email_provider');
  const result: unknown = await response.json();
  if (!result || typeof result !== 'object' || !('emailId' in result) || typeof result.emailId !== 'string' || !result.emailId.trim()) {
    throw new Error('email_provider');
  }
  // ByteSend acceptance is not proof of delivery; delivery is a separate event.
  return result.emailId;
}

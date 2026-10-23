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
    // Workers supports manual/follow, not error. Manual returns redirects as
    // non-2xx responses below without forwarding the credential to another URL.
    redirect: 'manual',
    signal: AbortSignal.timeout(10000),
  }).catch((error: unknown) => {
    const message = error instanceof Error ? error.message : '';
    console.error(JSON.stringify({ event: 'email_transport_failed', reason: /redirect/i.test(message) ? 'redirect' : /cache/i.test(message) ? 'cache_option' : /timeout|abort/i.test(message) ? 'timeout' : /fetch failed/i.test(message) ? 'fetch_failed' : /ssl|tls|certificate/i.test(message) ? 'tls' : 'network', name: error instanceof TypeError ? 'TypeError' : error instanceof SyntaxError ? 'SyntaxError' : 'Error' }));
    throw new Error('email_provider');
  });
  if (!response.ok) {
    // Status and fixed categories only: never log provider bodies or enquiries.
    const result = await response.json().catch(() => null);
    const codes = ['BAD_REQUEST', 'UNAUTHORIZED', 'FORBIDDEN', 'NOT_FOUND', 'RATE_LIMITED', 'INTERNAL_SERVER_ERROR'];
    const code = codes.includes(result?.error?.code) ? result.error.code : 'UNKNOWN';
    console.error(JSON.stringify({ event: 'email_provider_rejected', status: response.status, code }));
    throw new Error('email_provider');
  }
  const result: unknown = await response.json().catch(() => {
    console.error(JSON.stringify({ event: 'email_acceptance_invalid', reason: 'not_json', status: response.status }));
    throw new Error('email_provider');
  });
  if (!result || typeof result !== 'object' || !('emailId' in result) || typeof result.emailId !== 'string' || !result.emailId.trim()) {
    console.error(JSON.stringify({ event: 'email_acceptance_invalid', reason: 'missing_email_id', status: response.status }));
    throw new Error('email_provider');
  }
  // ByteSend acceptance is not proof of delivery; delivery is a separate event.
  return result.emailId;
}

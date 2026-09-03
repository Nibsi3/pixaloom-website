import { conversionEvents } from '@/lib/events';

export async function POST(req: Request) {
  const origin = req.headers.get('origin');
  if (!origin || !['https://www.pixaloom.co.za', 'https://pixaloom.co.za', new URL(req.url).origin].includes(origin)) return new Response(null, { status: 403 });
  // Discard arbitrary payloads; no user-provided text is logged.
  const reader = req.body?.getReader();
  if (!reader) return new Response(null, { status: 400 });
  let input = ''; let bytes = 0; const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read(); if (done) break;
    bytes += value.byteLength;
    if (bytes > 128) { await reader.cancel(); return new Response(null, { status: 413 }); }
    input += decoder.decode(value, { stream: true });
  }
  try {
    const { event } = JSON.parse(input);
    if (!conversionEvents.includes(event)) return new Response(null, { status: 400 });
    console.info(JSON.stringify({ event, source: 'website_action' }));
    return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });
  } catch { return new Response(null, { status: 400 }); }
}

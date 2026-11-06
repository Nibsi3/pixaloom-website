import { conversionEvents } from '@/lib/events';
import { readRequestText, RequestBodyError } from '@/lib/request-body';

const response = (status: number) => new Response(null, { status, headers: { 'Cache-Control': 'no-store' } });

export async function POST(req: Request) {
  const origin = req.headers.get('origin');
  if (!origin || !['https://www.pixaloom.co.za', 'https://pixaloom.co.za', new URL(req.url).origin].includes(origin)) return response(403);
  // Discard arbitrary payloads; no user-provided text is logged.
  try {
    const input = await readRequestText(req, { maxBytes: 128 });
    const { event } = JSON.parse(input);
    if (!conversionEvents.includes(event)) return response(400);
    console.info(JSON.stringify({ event, source: 'website_action' }));
    return response(204);
  } catch (error) { return response(error instanceof RequestBodyError ? error.status : 400); }
}

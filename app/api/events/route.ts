import { conversionEvents, isEventSection } from '@/lib/events';
import { readRequestText, RequestBodyError } from '@/lib/request-body';

const response = (status: number) => new Response(null, { status, headers: { 'Cache-Control': 'no-store' } });

export async function POST(req: Request) {
  const origin = req.headers.get('origin');
  if (!origin || !['https://www.pixaloom.co.za', 'https://pixaloom.co.za', new URL(req.url).origin].includes(origin)) return response(403);
  // Discard arbitrary payloads; no user-provided text is logged.
  try {
    const input = await readRequestText(req, { maxBytes: 128 });
    const { event, section } = JSON.parse(input);
    if (!conversionEvents.includes(event) && event !== 'page_view') return response(400);
    if (event === 'page_view' && !isEventSection(section)) return response(400);
    if (section !== undefined && !isEventSection(section)) return response(400);
    console.info(JSON.stringify({ event, source: 'website_action', section }));
    return response(204);
  } catch (error) { return response(error instanceof RequestBodyError ? error.status : 400); }
}

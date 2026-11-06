import { NextResponse } from 'next/server';

const unavailable = () => NextResponse.json({ ok: false, error: 'Failed to fetch joke' }, { status: 502, headers: { 'Cache-Control': 'no-store' } });

export async function GET() {
  try {
    const res = await fetch('https://v2.jokeapi.dev/joke/Programming?type=single', {
      headers: {
        accept: 'application/json',
      },
      cache: 'no-store',
      redirect: 'manual',
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      return unavailable();
    }

    const data = (await res.json()) as { error?: boolean; joke?: unknown };
    if (data?.error || typeof data?.joke !== 'string' || !data.joke.trim()) return unavailable();

    return NextResponse.json({ ok: true, joke: data.joke.trim() }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return unavailable();
  }
}

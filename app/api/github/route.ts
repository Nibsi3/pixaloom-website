import { NextResponse } from 'next/server';

const GITHUB_USER = 'Nibsi3';
const unavailable = () => NextResponse.json({ ok: false, error: 'Failed to fetch GitHub activity' }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
const isRecord = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === 'object' && !Array.isArray(value);

export async function GET() {
  try {
    const url = `https://api.github.com/users/${encodeURIComponent(GITHUB_USER)}/events/public?per_page=15`;
    const res = await fetch(url, {
      headers: {
        accept: 'application/vnd.github+json',
      },
      cache: 'no-store',
      redirect: 'manual',
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      return unavailable();
    }

    const events: unknown = await res.json();
    if (!Array.isArray(events)) return unavailable();

    const pushes = events
      .slice(0, 15)
      .filter((event): event is Record<string, unknown> => isRecord(event) && event.type === 'PushEvent')
      .slice(0, 5);

    const items = pushes.map((p) => {
      const repo = isRecord(p.repo) && typeof p.repo.name === 'string' ? p.repo.name : 'unknown';
      const commits = isRecord(p.payload) && Array.isArray(p.payload.commits) ? p.payload.commits : [];
      const messages = commits
        .flatMap((commit: unknown) => isRecord(commit) && typeof commit.message === 'string' ? [commit.message.trim()] : [])
        .filter(Boolean)
        .slice(0, 3);
      return {
        repo,
        createdAt: typeof p.created_at === 'string' && Number.isFinite(Date.parse(p.created_at)) ? p.created_at : null,
        messages,
      };
    });

    return NextResponse.json({ ok: true, user: GITHUB_USER, items }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return unavailable();
  }
}

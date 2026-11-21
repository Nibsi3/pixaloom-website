'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

type JokeResponse =
  | { ok: true; joke: string }
  | { ok: false; error: string };

export default function JokesPage() {
  const [joke, setJoke] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  async function load() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/joke', { cache: 'no-store' });
      const data = (await res.json()) as JokeResponse;
      if ('ok' in data && data.ok) {
        setJoke(data.joke);
      } else {
        setError('error' in data ? data.error : 'Failed to fetch joke');
      }
    } catch {
      setError('Unexpected error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <div className="min-h-screen bg-bg-900 bg-grid-fade">
      <Header />
      <div className="md:pl-[70px]">
        <main id="main-content" tabIndex={-1} className="px-4 py-10 sm:px-6">
          <h1 className="sr-only">Jokes</h1>
          <div className="mx-auto max-w-3xl">
            <div className="rounded-lg border border-bg-700 bg-bg-800/40">
              <div className="flex items-center justify-between border-b border-bg-700 bg-bg-900/25 px-4 py-3">
                <div className="flex items-center gap-2 text-sm font-medium text-fg-200">
                  <span className="rounded-md border border-bg-700 bg-bg-850 px-2 py-1 text-[11px]">EASTER_EGG.txt</span>
                  <span className="hidden sm:inline">jokes</span>
                </div>
                <div className="text-xs text-fg-300">status: unhinged</div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="font-mono text-xs text-fg-400">$ cat jokes</div>

                <div className="mt-4 rounded-lg border border-bg-700 bg-bg-900/35 p-4">
                  {error ? <div className="text-sm text-danger-500">{error}</div> : null}
                  {!error ? (
                    <div className="text-sm text-fg-100">{loading ? 'fetching…' : joke}</div>
                  ) : null}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={load}
                    disabled={loading}
                    className="rounded-md border border-accent-500/30 bg-accent-500/10 px-3 py-2 text-sm text-accent-400 hover:border-accent-500/60 disabled:opacity-60"
                  >
                    New joke
                  </button>
                  <a
                    href="/"
                    className="rounded-md border border-bg-700 bg-bg-850 px-3 py-2 text-sm text-fg-200 hover:border-accent-500"
                  >
                    Back to home
                  </a>
                </div>

                <div className="mt-6 font-mono text-xs text-fg-400">
                  Pro tip: never deploy on Friday.
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

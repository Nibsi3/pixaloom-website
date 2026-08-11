'use client';

import Link from 'next/link';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <>
      <Header />
      <main id="main-content" className="status-page">
        <div className="status-orbit status-orbit-error" aria-hidden="true"><span>500</span></div>
        <div className="status-copy">
          <p>Something interrupted the experience</p>
          <h1>A brief pause.<br /><em>Nothing more.</em></h1>
          <p className="status-description">
            We could not complete this page request. Try it once more, or return to the studio homepage.
          </p>
          <div className="status-actions">
            <button type="button" onClick={reset}><RotateCcw size={14} /> Try again</button>
            <Link href="/"><ArrowLeft size={14} /> Return home</Link>
          </div>
        </div>
        <span className="status-index">Error · 500</span>
      </main>
      <Footer />
    </>
  );
}

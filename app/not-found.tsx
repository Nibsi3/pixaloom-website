import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="status-page">
        <div className="status-orbit" aria-hidden="true"><span>404</span></div>
        <div className="status-copy">
          <p>Page not found · Pixaloom</p>
          <h1>This page has<br /><em>left the frame.</em></h1>
          <p className="status-description">
            The address may have changed, or the page may no longer exist. The rest of the studio is exactly where you left it.
          </p>
          <div className="status-actions">
            <Link href="/"><ArrowLeft size={14} /> Return home</Link>
            <Link href="/projects">Explore our work <ArrowUpRight size={14} /></Link>
          </div>
        </div>
        <span className="status-index">Error · 404</span>
      </main>
      <Footer />
    </>
  );
}

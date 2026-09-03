import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import { absoluteUrl, pageMetadata, site } from '@/lib/site';

export const metadata: Metadata = pageMetadata({ title: 'South African Digital Studio', description: 'Meet Pixaloom, a focused web design and development studio in George serving ambitious businesses throughout South Africa.', path: '/about' });

const principles = [
  ['Start with the business', 'Technology follows the customer, operating model and commercial goal—not the other way around.'],
  ['Make decisions visible', 'You see the logic, trade-offs and progress. No theatre and no mysterious black box.'],
  ['Build for ownership', 'Accessible, maintainable work with a clear handover, documentation and client-controlled accounts.'],
  ['Protect the long term', 'Fast foundations, honest SEO and no shortcuts that put your reputation or domain at risk.'],
];

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Pixaloom',
  url: absoluteUrl('/about'),
  description: 'About Pixaloom, an independent South African web design and development studio.',
  mainEntity: { '@id': `${site.url}/#organization` },
};

export default function AboutPage() {
  return <><Header /><main id="main-content" className="minimal-page">
    <JsonLd id="about-schema" data={aboutSchema} />

    <section className="minimal-hero">
      <div className="minimal-shell">
        <div className="minimal-crumb"><Link href="/">Home</Link><span>/</span><span>About</span></div>
        <p className="minimal-kicker">Independent · George, South Africa</p>
        <h1>Small by design.<br /> <em>Serious about the result.</em></h1>
        <div className="minimal-hero-foot">
          <p>Pixaloom is a focused web design and development studio. Strategy, design, engineering and technical SEO stay connected from the first conversation to launch.</p>
          <span>One studio · One accountable team</span>
        </div>
      </div>
    </section>

    <section className="minimal-statement">
      <div className="minimal-shell minimal-statement-grid">
        <div className="minimal-section-mark"><span>01</span><p>Why Pixaloom exists</p></div>
        <div>
          <h2>One line of<br /> <em>accountability.</em></h2>
          <div className="minimal-prose">
            <p>A business should not need three agencies and six handovers to launch a clear, effective website. Pixaloom brings commercial thinking, interface design, development and search foundations into one focused process.</p>
            <p>That means fewer gaps between what was promised, what was designed and what actually ships. Specialist help is brought in deliberately—not hidden behind layers of account management.</p>
            <div className="minimal-inline-links"><Link href="/services">Explore services <ArrowUpRight size={13} /></Link><Link href="/projects">See the work <ArrowUpRight size={13} /></Link></div>
          </div>
        </div>
      </div>
    </section>

    <section className="minimal-statement" id="cameron-falck"><div className="minimal-shell minimal-statement-grid"><div className="minimal-section-mark"><span>02</span><p>Who is behind the work</p></div><div><h2>Cameron Falck.</h2><div className="minimal-prose"><p>Cameron Falck is the person behind Pixaloom, a web design and development studio based in George, South Africa. Use the studio contact details to discuss project scope, delivery responsibilities or a correction to our published material.</p><p>Our portfolio describes interface and implementation work. Public previews and archived captures are identified, and we do not treat a screenshot as proof of a commercial result. Project-specific roles, permissions and references can be discussed before a proposal is agreed.</p><p>Journal articles are published by Pixaloom. Updates show when their content changed; a new deployment does not refresh every article date.</p><Link href="/contact" className="text-link">Contact Cameron at Pixaloom</Link></div></div></div></section>
    <section className="minimal-index-section">
      <div className="minimal-shell">
        <div className="minimal-index-heading"><div className="minimal-section-mark"><span>03</span><p>Working principles</p></div><h2>What you can<br />hold us to.</h2></div>
        <ol className="minimal-principle-list">
          {principles.map(([title, text], index) => <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}
        </ol>
      </div>
    </section>

    <section className="minimal-close"><div className="minimal-shell"><p className="minimal-kicker">A studio close to the work</p><h2>Bring the ambition.<br /> <em>We’ll bring the focus.</em></h2><Link href="/contact">Start a project <ArrowRight size={15} /></Link></div></section>
  </main><Footer /></>;
}

import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  globalIgnores([
    '.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'scripts/**',
    'app/os/**', 'app/jokes/**',
    'components/ui/**',
    'components/blog-listing.tsx', 'components/contact-cta.tsx',
    'components/desktop-shell.tsx', 'components/hack-overlay.tsx',
    'components/hero.tsx', 'components/hover-border-gradient-demo.tsx',
    'components/loading-screen.tsx', 'components/metrics.tsx',
    'components/projects-showcase.tsx', 'components/projects.tsx',
    'components/skills.tsx', 'components/stellar-background.tsx',
    'components/terminal-intro.tsx', 'components/terminal-landing.tsx',
    'components/timeline.tsx', 'components/websites-made.tsx',
    'components/work-gallery.tsx', 'components/work-marquee.tsx',
  ]),
]);

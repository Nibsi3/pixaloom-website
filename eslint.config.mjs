import { defineConfig, globalIgnores } from 'eslint/config';
import nextPlugin from '@next/eslint-plugin-next';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default defineConfig([
  ...tseslint.configs.recommended,
  reactHooks.configs.flat['recommended-latest'],
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
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

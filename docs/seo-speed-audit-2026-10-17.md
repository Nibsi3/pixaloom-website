# SEO and performance audit — 17 October 2026

## Scope and production source

Audited the canonical `https://www.pixaloom.co.za` site and the actual production source, `109817b5db02a47b6c602d96c0cd85ee1b5ffc81`. The original local checkout was an older SEO branch, so the release was prepared in a separate worktree based on production. Emberwell, Layerforge and Mineralis remain explicitly labelled independent concepts; their retired source imagery remains deleted.

## Findings and fixes

| Finding | Evidence | Remediation |
| --- | --- | --- |
| Homepage modification dates disagreed | JSON-LD said 3 September; sitemap said 14 September | Read both from the existing content-date registry |
| Article author links were invalid | All 16 articles used a plain studio name in `article:author` | Use the canonical About profile URL |
| Rescue page omitted structured breadcrumbs | Visible navigation had no matching BreadcrumbList | Add matching visible and structured breadcrumbs |
| Structured-data guide had only one main-content referring page | Full site link graph | Add a relevant link from the SEO service |
| Every frontend request crossed Cloudflare and Vercel | Gateway source and response headers; warm HTML TTFB 247 ms versus 180–188 ms directly at Vercel from the same host | Serve the current frontend and APIs from the existing OpenNext Cloudflare deployment |
| Intended static caching was bypassed | Live hero poster had `max-age=14400, must-revalidate` despite fingerprinted URLs | Use deployed asset binding and `public/_headers`; retain worker-first routing for apex redirects and preview noindex |
| Fixed logos pulled image code into text-focused pages | Live services bundle included the image runtime and generated manifest | Use dimensioned native images for the same 1.4 KB logo |

The services page's modern script graph dropped from 498,523 to 481,124 bytes raw and from 149,527 to 145,185 bytes when individually gzipped: a net reduction of 17,399 / 4,342 bytes. This is a build comparison, not a claim that every visitor saves exactly those transfer bytes.

The expanded crawler checks status codes, unique titles/descriptions, absolute self-canonicals, robots permissions, H1s, language, JSON-LD dates/breadcrumbs, social metadata, reachable sitemap pages, internal fragments, responsive `srcset` candidates, posters, redirects with query strings, intentional noindex pages and real missing-page responses.

## Pre-release verification

- Live baseline: 58 sitemap pages, 392 image URLs, 18 failures and one linking warning.
- Local Cloudflare production runtime: the same 58 pages and 392 images, zero failures and zero warnings.
- All 56 tests, TypeScript, lint, production Next/OpenNext build and diff checks passed.
- All 19 retired concept cover/gallery paths returned 404; current concept artwork returned 200.
- Bundles, fingerprinted images, video and noise returned one-year immutable caching. Logo: one day. Sitemap and robots retained their separate policy.
- Mobile visual check: readable opening frame, no horizontal overflow, functioning navigation and motion play control, no browser console errors. Reduced-motion preference keeps video unloaded and paused. Keyboard navigation starts at Skip to content.
- Contact delivery is not tested by sending mail. Local unconfigured readiness correctly returns 503 with `no-store`; production readiness must be checked after release.

## Performance baseline and limits

Chrome DevTools cold-load measurements before release:

| Profile | LCP | CLS | TTFB |
| --- | --- | --- | --- |
| Mobile 390 × 844, DPR 2, Slow 4G, 4× CPU, run 1 | 2,549 ms | 0.00 | 252 ms |
| Same mobile profile, run 2 | 2,767 ms | 0.00 | 272 ms |
| Desktop 1440 × 900, unthrottled | 562 ms | 0.00 | 246 ms |

The mobile LCP element was the optimized 16,824-byte video poster. Existing deferred video loading, responsive images, reduced-motion/data-saving behavior and visibility pausing were retained. Render-blocking and legacy-JavaScript insights estimated zero LCP savings, so no speculative CSS or framework compatibility changes were made.

The live homepage baseline scored 100 for Lighthouse SEO, accessibility and best practices. Those limited automated checks did not identify the 18 cross-page metadata failures above. The DevTools Lighthouse tool does not calculate a performance score; none is claimed.

No CrUX field data was available in the trace. These lab runs are not a field Core Web Vitals pass, a measured INP value, or evidence of ranking/traffic improvement. Search Console, indexing coverage, backlinks and Business Profile require their account data and are not verified here. [Google's Web Vitals guidance](https://web.dev/articles/vitals) distinguishes field and lab measurements. [Cloudflare's Next.js guide](https://developers.cloudflare.com/workers/frameworks/framework-guides/nextjs/) documents the OpenNext deployment approach.

Evidence files are under ignored `audits/`, including the baseline and local crawler JSON reports. Deployment identity, the final live crawl and repeat performance measurements are recorded in the release handover after deployment.

# Pixaloom

Next.js 16 / React 19 website for [Pixaloom](https://www.pixaloom.co.za), a web design and development studio in George, South Africa.

## Development and validation

Use Node.js 22 and the committed npm lockfile. Run `npm ci`, then `npm run dev`. Copy `.env.example` to an ignored `.env.local` only if you need local email delivery. Never commit credentials, private Search Console exports or customer enquiries.

```sh
npm test
npm run lint
npm run typecheck
npm run build
npm start
npm run audit:seo -- http://localhost:3000
```

The crawl checks all sitemap pages, internal links, metadata, canonicals, H1s, JSON-LD, social images, noindex/404 policies and permanent redirects. Tests cover input validation, safe article rendering, estimator handoff, gallery descriptions, sitemap dates, paused projects, host matching and responsive image output. Email delivery is mocked; tests do not send messages.

`dev`, `build`, `test` and `typecheck` prepare responsive WebP images with Sharp. The custom Next.js image loader serves these fingerprinted files directly from Cloudflare static assets; it does not rely on an Images subscription or the unconfigured runtime image optimizer. Originals stay in `public/`. Generated `public/optimized/` and `lib/generated-image-manifest.json` are ignored and regenerated on clean builds. Run `npm run images:build` after adding or replacing an image during development. Image quality is centrally set to 85 in that script; changing the recipe or original creates new cache-safe URLs.

If a local installation only has Next.js WASM bindings and lacks native SWC, use `npm run build -- --webpack` locally. Hosting still uses the normal `npm run build`; validate that build separately.

## Email and operational events

Set `BYTESEND_API_KEY` as a runtime secret on the existing Cloudflare Worker and verify the sender domain with ByteSend. Optional `BYTESEND_FROM` defaults to `Pixaloom Website <website@pixaloom.co.za>`. The default API is `https://bytesend.cloud/api/v1/emails`; for an existing self-hosted installation, set `BYTESEND_BASE_URL` to its HTTPS origin (no path, credentials or query). Enquiries go to `info@pixaloom.co.za`; the visitor's email is the reply-to address. Forward Email handles incoming mail through the existing MX records; configuring ByteSend sending does not require replacing those records.

`GET /api/contact` is a non-sending configuration check: `200 {"available":true}` or `503 {"available":false}`. A configured key is not proof of provider acceptance or inbox delivery. When unconfigured, the form shows email/phone/WhatsApp alternatives and disables sending. Invalid JSON or fields return 400 before configuration is checked; provider failures return a generic 502. The ByteSend request has a 10-second timeout and does not automatically retry a send. Production readiness requires an authorised synthetic enquiry, a `DELIVERED` event in ByteSend, and confirmation in the receiving inbox (including Forward Email forwarding).

Application logs contain allowlisted action names, failure categories and HTTP statuses only. `enquiry_accepted` means provider acceptance, not that the recipient read it. `enquiry_failed` and `enquiry_unavailable` record operational failures without form contents. Email diagnostics distinguish transport failures, provider rejection and invalid acceptance responses without logging provider bodies or credentials. Browser events include contact-link clicks, form starts/attempts/errors and estimator handoffs. They are **not** durable analytics, unique visitors, attribution, verified delivery or qualified leads. Select an owner-approved analytics/alerting destination before making those claims.

Email requests use `redirect: 'manual'`: Cloudflare Workers rejects `redirect: 'error'` at runtime. Redirect responses are rejected as non-2xx without following them, so the API key is never forwarded to a redirect destination.

## Content and search maintenance

- `/capabilities` is the portfolio CV page. Its shared copy is in `lib/capabilities.json`, with verification notes in `docs/capabilities-evidence.json`. Regenerate its downloadable PDF using `python scripts/build-capabilities-pdf.py` with ReportLab installed; render and visually review every page before publishing. The PDF is served at `/downloads/pixaloom-capabilities.pdf`.

- Homepage selection is Team Colours, Featherbleu Store, then Illumi. Featherbleu Store is shown without a project link. George Herald remains paused.
- Published work is filtered in `components/work-items.ts`; every rendered gallery image needs a visually checked entry in `lib/project-evidence.ts`.
- Current journal copy lives in `lib/journal-revisions.ts`. Render only `publishedBlogPosts`. Preserve original publication dates; update the modification date only after a substantive revision.
- Update only relevant entries in `lib/content-dates.ts`. Do not refresh every sitemap date on deploy.
- `/os` and `/jokes` are crawlable but noindexed. Vercel and `workers.dev` preview hosts receive `X-Robots-Tag: noindex, nofollow`; apex requests permanently redirect to the production canonical `https://www.pixaloom.co.za`.
- Retired CAPS Tutor and George Herald URLs return 404. Do not redirect unrelated case studies or restore paused work to eliminate an exclusion report.
- Cloudflare static assets use `public/_headers` for long-lived caching of fingerprinted Next.js bundles and decorative media. HTML, APIs, sitemap and robots retain separate policies.

See [SEO maintenance and owner checklist](docs/seo-maintenance.md) for completion gates and release acceptance.

## Production release

Production runs as the existing `pixaloom-website` Cloudflare Worker through the OpenNext adapter. The apex and `www` custom domains belong to that Worker. Do not deploy the application to Hostinger.

From the exact reviewed and pushed commit, run `npm ci`, the validation commands above, `npm run deploy:cloudflare`, and confirm Wrangler reports the `pixaloom-website` deployment. The Wrangler configuration keeps dashboard-managed variables and secrets. After deployment, verify `https://www.pixaloom.co.za` resolves through Cloudflare, crawl the canonical site, and check headers, enquiry readiness, navigation, representative images and estimator handoff. A successful upload or build is not a successful production release.

Browser tests should cover a narrow viewport, keyboard navigation, automatic muted playback, offscreen pausing, a readable first frame, and scroll effects (including with reduced-motion preferences). Reset temporary viewport overrides after testing.

For a local Cloudflare runtime check after an OpenNext build, use `npx wrangler dev --local-upstream www.pixaloom.co.za`. Wrangler otherwise infers the apex from the first route and every request correctly exercises the apex redirect. The SEO audit accepts local redirect origins when Wrangler rewrites response headers, while production audits require the canonical origin.

## Independent concepts

Layerforge, Mineralis and Emberwell are self-initiated designs for fictional brands, not commissioned client builds or operating businesses. Portfolio cards and case studies identify this status explicitly and use browser screenshots of the original website designs with fictional branding. No client testimonials, trading claims or measured results are attributed to these projects.

## Production serving

The canonical Cloudflare Worker serves the frontend and APIs from the same OpenNext build. Static assets come from that deployment with `public/_headers`, without forwarding requests to Vercel. Worker-first routing preserves apex redirects and preview noindex headers for assets as well as pages. Deploy from the current production branch so the reviewed independent concepts and removal of legacy media remain intact. Existing custom-domain routes and dashboard-managed bindings are retained. Verify that retired media returns 404 after release.

## Self-hosted pageview analytics

`components/plausible-analytics.tsx` sends public-page visits to the owner's
Plausible instance at `https://immich.tail31199f.ts.net/analytics/event`.
The manual tracker records client navigation without query strings or form
contents. It runs only on pixaloom.co.za and www.pixaloom.co.za.
The local dashboard is http://localhost:8000/pixaloom.co.za.
Collection stops while the owner's PC or Docker services are offline.

Contact actions also use this existing tracker when it is available. Configure
matching Plausible custom-event goals to report them. `enquiry_submit` is an
attempt; `enquiry_accepted` is emitted after successful API acceptance and is
not proof of inbox delivery or a qualified lead. Action URLs omit query strings
and fragments. Tracker failures never interrupt the contact journey.

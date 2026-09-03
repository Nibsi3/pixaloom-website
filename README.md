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

The crawl checks all sitemap pages, internal links, metadata, canonicals, H1s and JSON-LD syntax. Tests cover input validation, safe article rendering, estimator handoff, gallery descriptions, sitemap dates, paused projects and indexability policies. Email delivery is mocked; tests do not send messages.

If a local installation only has Next.js WASM bindings and lacks native SWC, use `npm run build -- --webpack` locally. Hosting still uses the normal `npm run build`; validate that build separately.

## Email and operational events

Set `RESEND_API_KEY` in the hosting environment and verify the sender domain with Resend. Optional `RESEND_FROM` defaults to `Pixaloom Website <website@pixaloom.co.za>`. Enquiries go to `info@pixaloom.co.za`; the visitor's email is the reply-to address.

`GET /api/contact` is a non-sending configuration check: `200 {"available":true}` or `503 {"available":false}`. A configured key is not proof of provider acceptance or inbox delivery. When unconfigured, the form shows email/phone/WhatsApp alternatives and disables sending. Invalid JSON or fields return 400 before configuration is checked; provider failures return a generic 502. Production readiness requires an authorised synthetic enquiry and confirmation in the receiving inbox.

Application logs contain allowlisted action names only. `enquiry_accepted` means provider acceptance, not that the recipient read it. `enquiry_failed` and `enquiry_unavailable` record operational failures without form contents. Browser events include contact-link clicks, form starts/attempts/errors and estimator handoffs. They are **not** durable analytics, unique visitors, attribution, verified delivery or qualified leads. Select an owner-approved analytics/alerting destination before making those claims.

## Content and search maintenance

- Homepage selection remains NORDflam, BuildVolume, then Illumi. George Herald remains paused.
- Published work is filtered in `components/work-items.ts`; every rendered gallery image needs a visually checked entry in `lib/project-evidence.ts`.
- Current journal copy lives in `lib/journal-revisions.ts`. Render only `publishedBlogPosts`. Preserve original publication dates; update the modification date only after a substantive revision.
- Update only relevant entries in `lib/content-dates.ts`. Do not refresh every sitemap date on deploy.
- `/os` and `/jokes` are crawlable but noindexed. Vercel hosts receive `X-Robots-Tag: noindex, nofollow`; the production canonical is `https://www.pixaloom.co.za`.
- Retired CAPS Tutor and George Herald URLs return 404. Do not redirect unrelated case studies or restore paused work to eliminate an exclusion report.
- Fingerprinted Next.js assets use framework-managed immutable caching. HTML, APIs, sitemap and robots have separate policies.

See [SEO maintenance and owner checklist](docs/seo-maintenance.md) for completion gates and release acceptance.

## Production release

Production is a Hostinger Node.js application, not a static export. Deploy a source-only archive from the exact reviewed Git commit, excluding `.next`, `node_modules`, ignored files and secrets. Confirm the hosting build completes, then crawl production and check headers, enquiry readiness, navigation, representative images and estimator handoff. A successful upload is not a successful deployment.

Browser tests should cover a narrow viewport, keyboard navigation, pause/play, a readable first frame, and reduced-motion preferences. Reset temporary viewport overrides after testing.

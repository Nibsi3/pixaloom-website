# Pixaloom bug, SEO and speed audit — 6 November 2026

## Commercial search follow-up

A second pass used authenticated Search Console query/page evidence and mobile
landing-page inspection. The pricing page was already receiving relevant price
queries, but its opening mobile viewport showed neither a price nor an in-content
action. George's intended landing page was appearing for local searches; there
was no reason to replace its URL or create more town pages.

The follow-up makes the five-page allowance and estimator links immediately
available, adds three scope examples calculated from existing prices, and carries
each example into the enquiry brief. George now shows a dated, verified Paws On
Route services screenshot with an explanation of its actual enquiry prompt.
Garden Route adds opening enquiry/pricing actions and practical booking-provider
and content-ownership guidance. Existing titles, prices and canonical addresses
are retained. Only the three substantively updated pages have new sitemap dates.

The clean build and lint pass. All 90 tests pass after updating the two existing
date expectations for changed pages. The local Worker crawl covers 65 pages,
66 destinations, 729 image variants and one PDF canonical, with no failures or
warnings. Independent review matched every visible local FAQ to its structured
data and verified the project claims against the actual screenshot.

The follow-up was pushed as `7bbec58` (application changes) and `b91a28d`
(date expectations), then deployed to the existing production Worker as version
`a7e9da66-d21d-43b1-ad0f-f32e1ba79ab5`. The production crawl also passed all
65 pages, 66 destinations, 729 image variants and the PDF canonical with zero
failures or warnings. Local browser checks at 390×844 and 1440×900 verified
opening prices/actions, working section jumps, all three calculator-derived
brief handoffs, responsive project evidence, FAQ consistency and no horizontal
overflow. Local pages also retained their content and actions without JavaScript.
Post-deployment browser checks confirmed the pricing behavior on both sizes and
the George/Garden Route content on mobile. All six pricing example handoffs
retained the correct amounts/features; no forms or WhatsApp messages were sent.
Reports: `audits/seo-live-growth-20261106.json`,
`audits/pricing-growth-live-verification.json` and
`audits/2026-11-06/live-local-pages/smoke.json`.

No post-release ranking gain is yet measurable. The precise private baseline and
query pairs are retained in `audits/search-console-2026-11-06.md`; the comparable
measurement window is 7 November–4 December, once Google has processed it. See
[SEO maintenance](seo-maintenance.md) for the measurement plan and outstanding
owner-dependent work.

This pass also confirmed the existing Plausible script fails with HTTP 502. Its
proxy is running, but the analytics application and original deployment
configuration are absent. Retained data volumes remain intact. Safe recovery
requires the trusted original configuration; no tracker replacement, data reset
or unverified reconstruction was attempted. Google Search Console remains usable.

## Scope and verified repairs

Audited the public Pixaloom website, contact workflow, estimator handoff, mobile
navigation, public API error handling, crawl metadata, redirects, downloads,
responsive media, motion preferences and dependencies. This is a bounded audit,
not a claim that all possible bugs or Google ranking factors have been tested.
The release preserves the newer production content from commit `4190e92` and
leaves the pre-existing capabilities-page working changes outside this release.

| Area | Verified problem | Repair |
| --- | --- | --- |
| Enquiries | Three rapid submit events could create three requests; malformed responses could expose parser errors or claim success | Synchronous submission guard, strict boolean acceptance, retained brief and clear failure messages |
| Mobile menu | Short landscape screens hid final links; Escape, outside clicks and same-page links left the menu open | Scrollable viewport-bounded menu, dismissal and restored keyboard focus |
| Request handling | Stalled uploads and external services could leave requests open; malformed provider responses were accepted or crashed | Byte-limited uploads with a five-second deadline; eight-second provider deadlines and safe validation/errors |
| Screenshot loading | Small capability previews downloaded full-resolution PNGs | Responsive WebP previews; original screenshots load when visitors enlarge them |
| Motion | Video autoplay ignored reduced-motion and data-saving preferences; hidden hero links remained interactive | Preference-aware loading, pause/play controls, offscreen pausing and hidden-frame visibility |
| Search canonicalization | Downloadable CV PDF lacked a preferred HTML URL | HTTP `Link: rel=canonical` on the PDF in both Next.js and Cloudflare asset headers |
| Dependencies | npm reported 23 affected dependency entries, including a critical Next.js advisory | Updated patched framework/image/hosting packages and compatible transitive dependencies |
| Validation scope | Unrelated local site drafts caused 36 lint failures | Excluded scratch/output projects from the Pixaloom validation configuration |

## Evidence before release

The initial public crawl passed its existing checks across 65 sitemap pages,
66 unique internal destinations and 115 image URLs. Expanding it to cover PDF
HTTP canonicals reproduced the missing header. The local production crawl then
passed 65 pages, 66 destinations, 729 responsive image URLs and the PDF canonical,
with no failures or warnings. Checks include titles/descriptions, canonicals,
headings, JSON-LD syntax and dates, links and fragments, image availability,
redirects, preview/noindex policies and real missing-page responses.

The 390px, DPR 1 browser scroll test measured capabilities image response bodies
at 13,403,815 bytes before and 68,908 bytes after locally: a 99.49% reduction.
The same 68,908-byte result was verified on production after deployment.
Original images remain accessible through the screenshot viewer. This measures
that browser scenario, not every device or all transferred traffic.

| Homepage lab run | Performance | LCP | FCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- |
| Public mobile baseline | 88 | 3.6 s | 2.0 s | 30 ms | 0 |
| Public desktop baseline | 98 | 1.0 s | 0.5 s | 0 ms | 0 |
| Local mobile after fixes | 97 | 2.5 s | 0.9 s | 30 ms | 0 |
| Public mobile after fixes, serial run 1 | 93 | 3.10 s | 1.61 s | 63 ms | 0 |
| Public mobile after fixes, serial run 2 | 90 | 3.34 s | 1.60 s | 138 ms | 0 |
| Public desktop after fixes | 99 | 0.91 s | 0.52 s | 0 ms | 0 |

All listed runs scored 100 for Lighthouse accessibility, best practices and SEO.
Local and hosted timings are not a controlled comparison. Lighthouse is a lab
sample, not field Core Web Vitals, real-user INP or Google indexing evidence.
An initial post-release mobile run overlapped other audit work and scored 67
(LCP 5.14 s, TBT 328 ms); it is retained in the evidence rather than discarded.
Subsequent serial runs scored 90–93. Mobile LCP remains above the 2.5-second good
threshold. Remaining unused CSS and framework JavaScript had estimated LCP savings
of 170 ms and 50 ms in the follow-up run; those estimates are not guaranteed gains
and did not justify an unverified broad stylesheet or framework rewrite.

90 automated tests, lint, TypeScript with generated Worker types, and the clean
Next.js and OpenNext production builds passed.
Isolated browser tests covered short/mobile/tablet menus, keyboard dismissal,
estimator pricing and complete handoff, duplicate submits and failure retention,
reduced motion, data saving, pause/resume, offscreen pausing and screenshot zoom.
The contact API reported configuration available on production. All submissions
were mocked; no email was sent and inbox delivery was not tested.

## Dependency maintenance

The patched versions are Next.js 16.4.5, Sharp 0.35.5, OpenNext Cloudflare 1.20.16
and Wrangler 4.158.0. The lockfile also updates affected compatible dependencies.
Build-only upstream constraints still selected vulnerable glob/minimatch versions,
so the package overrides select glob 14.0.4 and minimatch 11.0.5. Installed callers
were checked against the removed minimatch APIs; lint/typecheck/tests and the
OpenNext build passed. File discovery matched the generated trace/manifests.
Remove the overrides when upstream package constraints include patched versions.
The updated adapter also requires exact-path static asset handling when the
Worker runs first. Both asset handling options are explicitly `none`, preserving
Next.js routing, preview noindex and host redirects through the Worker.
The complete npm audit and dependency-tree validation now pass with zero known
vulnerabilities; this does not establish absence of undisclosed vulnerabilities.

## Search growth and limits

Google does not offer a way to guarantee a first-place ranking. The site already
has focused George/Garden Route service pages, pricing, project evidence and
buyer guides. This release corrects technical issues without inventing reviews,
client results, office locations or keyword-stuffed pages.

Search Console performance, indexing, sitemap, manual-action and security reports
were reviewed in the authenticated property. Private observations are recorded in
ignored `audits/search-console-2026-11-06.md`. Its indexing overview lags the live
site. One article's older Google-selected canonical was unrelated to its current
content; source/HTTP checks and Google's live test passed, and Google confirmed a
single indexing request. Reprocessing and canonical selection remain pending.
No field Core Web Vitals data was available.

Business Profile eligibility/status remains unverified. Further growth work is to
verify that profile, compare equal complete reporting windows for relevant South
African queries, and obtain permissioned local client evidence and relevant
business mentions. No external outreach or directory submission was performed.
Changes can take time to be reflected in search results.

## Production release acceptance

Source commit `f92556d` was pushed to `codex/local-search-growth` and deployed to
the existing `pixaloom-website` Worker, version
`b4fc5b73-978d-4a72-a255-1bfc66655d81`. Existing account authentication, custom
domains, variables and secrets were retained. Release source was isolated from
the two pre-existing capabilities-page edits.

The post-deployment crawl passed 65 sitemap pages, 66 internal destinations,
729 image variants and the PDF canonical with zero failures/warnings. Production
assets use immutable caching without noindex; preview pages and assets retain
noindex. Contact readiness passed without sending email. Production browser
checks confirmed the responsive images, motion preferences and controls, with no
observed script errors, overflow or layout shift. The local final build also
passed eight desktop/mobile homepage/project control-layout checks.

## Sources and private evidence

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Non-HTML canonical headers](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls#rel-canonical-header)
- [Core Web Vitals](https://web.dev/articles/vitals)
- [Next.js advisory](https://github.com/advisories/GHSA-673q-mjm6-r5xr)
- [Sharp advisory](https://github.com/advisories/GHSA-wq5f-xc86-pv6w)
- [Minimatch migration notes](https://github.com/isaacs/minimatch/blob/main/changelog.md)

Raw crawl, Lighthouse, browser, build and dependency reports are stored locally
under ignored `audits/`, including `2026-11-06/` browser interaction reports.
Keep raw search-performance exports and account data out of version control.

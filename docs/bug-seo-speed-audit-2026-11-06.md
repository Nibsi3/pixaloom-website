# Pixaloom bug, SEO and speed audit — 6–7 November 2026

## Additional isolated review integration — 7 November

Eleven of fifteen new reviews completed; four remain paused for approval in their
original chats. The accepted changes add two contextual links, direct primary
citations in two articles and root Twitter-image alternative text. Source
`3d6315d` is live as Worker `44494a3b-7fac-4bfe-8adf-b3c1c4ccb755`.
All 107 existing tests, lint, TypeScript, clean production build, twelve local
browser checks and six bounded live checks pass. No new ranking or speed gain is
claimed. See the [candidate-by-candidate decisions, pending actions and release
evidence](batch30-integration-2026-11-07.md).

## Deeper failure, accessibility and boundary review — completed 7 November

The next pass confirmed the latest public content and contact readiness, then
used a clean local Worker and synthetic fixtures. It avoided production stress,
real enquiries, paid services, credential changes and analytics data recovery.

| Reproduced issue | Change |
| --- | --- |
| `/os` accepted a message locally, showed a sending state and erased it without any network submission | Replaced the simulated form with a keyboard-accessible link to the real enquiry form, retaining direct email and WhatsApp options |
| Before hydration or with JavaScript disabled, the enquiry form could fall back to a native GET containing personal fields in the URL | Initial inputs and submission stay disabled until the client handler is ready; explicit POST semantics and no-JavaScript contact alternatives prevent the native GET fallback |
| A lost or malformed provider response was described as a temporarily unavailable form, although acceptance could already have happened | API and browser consistently say delivery is unconfirmed and ask the visitor to contact the studio before resending |
| Double-click protection did not cover later retries of the same request | Added an opaque, validated per-enquiry key using ByteSend's published idempotency contract; unchanged in-page retries keep the same key/body, with no automatic retry |
| Editable fields could change while an earlier submission was pending, and replacing the form removed keyboard focus | Snapshot before disabling fields; preserve values after errors; focus error/success feedback and the Name field after an explicit new-enquiry action |
| The homepage work link scrolled a relative distance instead of reaching its declared target, leaving focus behind | Native fragment navigation to a named, focusable selected-work section, with normal URL history and no forced animation |
| The demo's cached server clock and visitor clock could disagree during hydration, causing React to regenerate the page | A shared initial placeholder remains until the browser starts its local clock after hydration |
| The local audit could contact another origin through special paths, image URLs or redirects, and misreported repeated query values | Explicit origin confinement, validated/bounded redirects and ordered comparison of all repeated query values |

The contact boundary now matches JSON media types exactly and rejects control
characters in header-bound name/email fields before provider submission. Synthetic
event checks reject forged origins and malformed/prototype-shaped/oversized
payloads, and verify that only approved event names and a fixed source are logged.
Those event controls already worked; no unnecessary production change was made.

All 107 automated checks and configured repository lint pass. Native HTTP
fixtures verify the existing provider abort signal covers both stalled headers
and stalled JSON bodies, using shortened timers on loopback. The crawler fixture
uses two loopback servers and proves no request reaches the second origin.
Independent review confirmed stable email payloads and diagnostics without
enquiry data, credentials or retry keys.

The final clean Next.js/OpenNext build passes. In an isolated browser, both
standard and rescue forms were checked with JavaScript disabled and before
hydration: clicks created no submission, native forced submission used POST
without enquiry fields, and direct contact alternatives remained available.
The original native-GET behavior was intercepted before any network request.

Final source release: `fcd9974`, incorporating `8303fa1` and `cf30331`, pushed to
`codex/local-search-growth` and deployed to the existing Worker as version
`96c4dc9e-b213-405e-a9bf-9d684fa7a239`. The clean checkout excludes the owner's
pre-existing capabilities-page edits. All 107 tests, configured lint, TypeScript
and the final production build passed. The final local crawl passed 65 pages,
66 destinations, 729 image variants and the PDF canonical with no issues.

Browser verification covered standard desktop and rescue mobile enquiry flows:
pending edits, duplicate submit, failed/malformed responses, identical retry keys,
key rotation after edits/new enquiries, retained input and focus transitions.
All eight synthetic submissions were intercepted. Live verification was bounded:
seven representative GET/HEAD checks, contact hydration/no-JavaScript behavior,
the hero fragment keyboard/history journey and the demo's real-form handoff.
No load test or real form submission ran against production. The final demo clock
passed local browser tests in Johannesburg, Los Angeles and Auckland, then passed
on production without the prior React hydration error.

Key evidence: `audits/deep-tests-clock-20261107.txt`,
`audits/deep-build-clock-20261107.log`,
`audits/seo-local-deep-final-20261106.json`,
`audits/2026-11-06/contact-final-browser.json`,
`audits/2026-11-06/contact-live-browser.json`,
`audits/hero-fragment-live-cf30331.json`,
`audits/deep-live-check-20261106.json` and
`audits/deep-os-contact-live-Africa-Johannesburg.json`.

Coverage limits: these are selected realistic browser and local security-boundary
tests, not an exhaustive penetration test, accessibility certification or audit
of every experimental game/terminal feature. Existing lint configuration excludes
legacy demo files and test scripts; modified demo behavior was checked through
TypeScript/build and browser runs, while scripts were syntax-checked/executed.
Previous Lighthouse results remain dated samples; no new lab-score improvement
is claimed for this pass.

Additional browser coverage found no new defect in image zoom/panning, Escape
and opener-focus restoration in Chrome and Firefox, 320px estimator reflow,
keyboard selection, or video pause/resume across background tabs and navigation.
Local query canonicals, trailing-slash redirects, missing assets/pages, experiment
noindex, PDF canonical query variants and unsupported page methods also passed.
Local preview-host evaluation is not proof of a newly deployed edge response.

See [enquiry reliability](contact-reliability.md) for the pinned provider contract
and exact limits: same-form memory only, provider-version dependency, no protection
across reloads/new tabs, legacy callers without keys, no guaranteed inbox delivery
and no live-email test. Search Console's earlier indexing request remains pending;
no new ranking claim, repeated submission or content churn was introduced.
Plausible's retained data remains untouched; recovery still requires its missing
trusted deployment configuration.

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

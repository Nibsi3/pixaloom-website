# Pixaloom bug, SEO and speed audit — 6 November 2026

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
Original images remain accessible through the screenshot viewer. This measures
that browser scenario, not every device or all transferred traffic.

| Homepage lab run | Performance | LCP | FCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- |
| Public mobile baseline | 88 | 3.6 s | 2.0 s | 30 ms | 0 |
| Public desktop baseline | 98 | 1.0 s | 0.5 s | 0 ms | 0 |
| Local mobile after fixes | 97 | 2.5 s | 0.9 s | 30 ms | 0 |

All three runs scored 100 for Lighthouse accessibility, best practices and SEO.
Local and hosted timings are not a controlled comparison. Lighthouse is a lab
sample, not field Core Web Vitals, real-user INP or Google indexing evidence.

88 automated tests, lint, TypeScript and the first production build passed.
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
were checked against the removed minimatch APIs; lint/typecheck/tests must keep
passing and the OpenNext build must validate file discovery before release.
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

Current Search Console query performance, Google indexing status and Business
Profile eligibility/status were not verified in this audit. The next evidence-led
growth work is to verify those accounts, compare equal complete reporting windows
for relevant South African queries, and obtain permissioned local client evidence
and relevant business mentions. No external outreach or directory submission was
performed. Changes can take time to be reflected in search results.

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

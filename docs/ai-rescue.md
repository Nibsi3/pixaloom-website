# AI Website & App Rescue

Fiverr and Upwork are the primary acquisition channels. This website is the supporting reference, not a replacement brand or a broader redesign.

Route: `/ai-website-app-rescue`. The homepage, services index and web app/care pages link to it. Copy and packages live in `lib/ai-rescue.ts`; scoped presentation lives in the route's `rescue.css`.

`InquiryForm` accepts a `rescue` flag. It collects name/email, tool, optional app URL, reported issue, expected behaviour, optional error/screenshot link, private/public repository URL and deadline. It reuses `/api/contact`, whose recipient remains `info@pixaloom.co.za`. The generic enquiry flow remains supported. `lib/contact.ts` validates types, sizes and the additional diagnosis fields; links must be HTTP(S), without embedded credentials. No file upload, public-repository requirement or secret field is added.

`GET /api/contact` indicates readiness. Without configured email delivery the form displays working mailto and WhatsApp links and does not claim a successful submission. The production endpoint returned `503 {"available":false}` during launch checks on 14 September 2026. The authorised hosting operator must configure `RESEND_API_KEY` and an authorised `RESEND_FROM` as documented in `.env.example` before form delivery can be enabled. Do not put the key in source control. After configuration, make a labelled synthetic submission and confirm receipt in the destination inbox. A provider success response alone is not inbox receipt.

Website starting prices: Quick Fix R1,490; Ship It R3,990; Full Rescue from R8,900. Monthly maintenance is enquiry-only: R1,490 for 1.5 hours or R2,990 for 3 hours, with explicit response windows, non-rollover and exclusions. No purchase or recurring billing is enabled.

Validation: `npm test`, `npm run typecheck`, `npm run lint`, `npm run build`. This machine requires the documented webpack fallback (`npm run build -- --webpack`) because the native SWC binding is unavailable. Browser QA covers the service page, diagnosis anchor, mobile widths, links, metadata and honest email-unavailable state. Regression tests cover malformed diagnostic fields, credential-bearing URLs and complete email context with a mocked provider.

The repository's Vercel integration builds `main`, but the actual custom domain uses a separate Hostinger Node.js deployment. A Vercel build does not publish changes to pixaloom.co.za. Deploy a source-only archive of the reviewed commit to the existing Hostinger application, preserving its environment configuration, and verify the custom domain afterward. Base release before this change: `97b1e4badd9e11d702b19f09019ddd380c10af11`. Use a reviewed revert of the rescue release to recover; never reset unrelated subsequent work. Marketplace launch assets and internal delivery templates are maintained separately in the local workspace's `launch/ai-rescue` directory, not served as public website content.

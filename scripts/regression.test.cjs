const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const root = path.resolve(__dirname, '..');

// Use the project's existing TypeScript compiler; no runtime dependency or generated files.
const resolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, ...rest) {
  return resolve.call(this, request.startsWith('@/') ? path.join(root, request.slice(2)) : request, parent, ...rest);
};
for (const extension of ['.ts', '.tsx']) require.extensions[extension] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText, filename);
};
let providerResult = { data: { id: 'test-message-id' }, error: null };
let sent = [];
require.cache[require.resolve('resend')] = { exports: { Resend: class { emails = { send: async message => { sent.push(message); return providerResult; } }; } } };
const { validateContact, escapeHtml } = require('../lib/contact.ts');
const { ArticleContent, safeHref } = require('../components/article-content.tsx');
const { estimateWebsiteCost, estimateContactUrl, estimateBriefFromParams } = require('../lib/website-cost.ts');
const { POST, GET } = require('../app/api/contact/route.ts');
const events = require('../app/api/events/route.ts');
const { workItems } = require('../components/work-items.ts');
const { publishedBlogPosts } = require('../components/blog-posts.ts');
const { services } = require('../lib/services.ts');
const { provinces } = require('../lib/locations.ts');
const { regionalBriefs } = require('../lib/regional-briefs.ts');
const { serviceEvidence } = require('../lib/service-evidence.ts');
const { verifiedDescriptions, projectMediaDescription } = require('../lib/project-evidence.ts');
const sitemap = require('../app/sitemap.ts').default;
const robots = require('../app/robots.ts').default;
const valid = { name: 'Test Person', email: 'test@example.com', message: 'This is a synthetic unit test, not a real enquiry.' };
test('new supporting text uses a readable colour on the dark content surfaces', () => {
  const css = fs.readFileSync(path.join(root, 'app/globals.css'), 'utf8');
  const luminance = hex => {
    const rgb = hex.match(/[a-f\d]{2}/gi).map(value => parseInt(value, 16) / 255).map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  };
  for (const selector of ['.service-budget,.project-provenance', '.article-project-evidence figcaption']) {
    const rule = css.slice(css.indexOf(selector)).split('}')[0];
    const color = rule.match(/color:\s*(#[a-f\d]{6})/i)?.[1];
    assert.ok(color, `${selector} needs an explicit dark-surface colour`);
    for (const background of ['#030303', '#080808', '#151515']) assert.ok((luminance(color) + 0.05) / (luminance(background) + 0.05) >= 4.5);
  }
});
test('every published gallery capture has a visually reviewed description and a real asset', () => {
  const images = workItems.flatMap(item => (item.gallery?.length ? item.gallery.slice(0, 6) : [item.png]).map(src => ({ item, src })));
  assert.equal(images.length, 63);
  for (const { item, src } of images) {
    assert.ok(verifiedDescriptions[src], `Review the image before publishing: ${src}`);
    assert.ok(fs.existsSync(path.join(root, 'public', src)));
    assert.doesNotMatch(projectMediaDescription(item, src), /screen \d|archived .* interface capture/i);
  }
});
const request = (body, type = 'application/json', origin = 'https://www.pixaloom.co.za') => new Request('https://www.pixaloom.co.za/api/contact', { method: 'POST', headers: { 'Content-Type': type, Origin: origin }, body: typeof body === 'string' ? body : JSON.stringify(body) });

test('contact validates unknown input and field limits without throwing', () => {
  for (const value of [null, [], 7, 'hello', {}, { ...valid, name: 5 }, { ...valid, email: 'a@b@c.d' }, { ...valid, message: 'short' }, { ...valid, message: 'x'.repeat(3001) }, { ...valid, name: 'header\ninjection' }]) assert.equal(validateContact(value).ok, false);
  assert.equal(validateContact(valid).ok, true);
  assert.equal(validateContact({ website: 'bot.example' }).bot, true);
  assert.equal(escapeHtml('<script>"&'), '&lt;script&gt;&quot;&amp;');
});
test('readiness and invalid requests never send mail or expose a secret name', async () => {
  delete process.env.RESEND_API_KEY;
  assert.equal((await GET()).status, 503);
  assert.equal((await POST(request('{}'))).status, 400);
  assert.equal((await POST(request('{'))).status, 400);
  assert.equal((await POST(request(null))).status, 400);
  assert.equal((await POST(request(valid, 'text/plain'))).status, 415);
  assert.equal((await POST(request(valid, 'application/json', 'https://other.example'))).status, 403);
  assert.equal((await POST(request('x'.repeat(25000)))).status, 413);
  assert.equal((await POST(request({ website: 'bot.example' }))).status, 200);
  const unavailable = await POST(request(valid));
  assert.equal(unavailable.status, 503);
  assert.doesNotMatch(await unavailable.text(), /RESEND|API_KEY|process\.env/);
  assert.equal(sent.length, 0);
});
test('only provider acceptance is success; failures are generic and logs contain no PII', async () => {
  process.env.RESEND_API_KEY = 'unit-test-only';
  const originalInfo = console.info, originalError = console.error; const logs = [];
  console.info = console.error = value => logs.push(value);
  try {
    assert.equal((await GET()).status, 200);
    assert.equal((await POST(request({ ...valid, message: '<script>alert(1)</script> Test a real-looking message.' }))).status, 200);
    assert.equal(sent.length, 1); assert.equal(sent[0].replyTo, valid.email);
    assert.doesNotMatch(sent[0].html, /<script>/);
    providerResult = { data: null, error: { message: 'SECRET_PROVIDER_DETAIL' } };
    const failure = await POST(request(valid)); assert.equal(failure.status, 502);
    assert.doesNotMatch(await failure.text(), /SECRET_PROVIDER_DETAIL/);
    assert.doesNotMatch(logs.join(' '), /test@example|Test Person|unit-test-only|SECRET_PROVIDER_DETAIL/);
  } finally { console.info = originalInfo; console.error = originalError; delete process.env.RESEND_API_KEY; }
});
test('safe markdown renders links, headings and mixed lists without executing HTML', () => {
  const html = renderToStaticMarkup(React.createElement(ArticleContent, { content: '## Planning\nText **with emphasis** and [a service](/services/seo).\n- First\n- Second\n\n### Details\n1. One\n2. Two\n\n<script>alert(1)</script>\n[Unsafe](javascript:evil)' }));
  assert.match(html, /<h2>Planning<\/h2>/); assert.match(html, /<h3>Details<\/h3>/);
  assert.match(html, /href="\/services\/seo"/); assert.match(html, /<ul>/); assert.match(html, /<ol>/);
  assert.match(html, /<strong>with emphasis<\/strong>/);
  assert.doesNotMatch(html, /<script>|href="javascript/);
  for (const href of ['javascript:evil', 'data:text/html,test', '//other.example', '/\\other.example', 'https://x.example/\n']) assert.equal(safeHref(href), undefined);
});
test('ecommerce payments are included once and estimate context round-trips safely', () => {
  assert.deepEqual(estimateWebsiteCost('ecommerce', 'focused', ['payments']), estimateWebsiteCost('ecommerce', 'focused', []));
  assert.equal(estimateWebsiteCost('business', 'focused', ['payments', 'payments']).min, 43000);
  const url = estimateContactUrl('ecommerce', 'growing', ['payments', 'cms']);
  const brief = estimateBriefFromParams(new URL(url, 'https://example.com').searchParams);
  assert.match(brief, /Ecommerce store/); assert.match(brief, /Editable CMS/); assert.match(brief, /Standard hosted payment integration included/);
  assert.equal(estimateBriefFromParams(new URLSearchParams('kind=__proto__&scale=focused')), '');
  assert.doesNotMatch(estimateBriefFromParams(new URLSearchParams('kind=business&scale=focused&extras=<script>')), /<script>/);
});
test('published content is revised, linked and dates agree with sitemap', () => {
  assert.equal(publishedBlogPosts.length, 16);
  const entries = sitemap();
  for (const post of publishedBlogPosts) {
    assert.ok(post.content.split(/\s+/).length >= 250, post.slug);
    assert.ok(post.modified >= post.date); assert.equal(post.modified, entries.find(item => item.url.endsWith(`/blog/${post.slug}`)).lastModified);
    assert.ok(services.some(service => service.slug === post.service));
    assert.ok(post.content.includes('/services/')); assert.ok(post.sources.length);
    if (post.project) assert.ok(workItems.some(item => item.slug === post.project));
    assert.doesNotMatch(post.content, /build exclusively|53%|70%|no database to hack/i);
  }
  for (const service of services) { assert.ok(serviceEvidence[service.slug]); for (const slug of serviceEvidence[service.slug].projects) assert.ok(workItems.some(item => item.slug === slug)); }
  for (const province of provinces) assert.ok(regionalBriefs[province.slug]);
});
test('paused work and experiments stay out of sitemap; robots permits noindex discovery', () => {
  assert.equal(sitemap().length, 57);
  assert.equal(workItems.length, 16);
  assert.ok(!workItems.some(item => item.slug === 'george-herald'));
  assert.ok(!sitemap().some(item => /george-herald|caps-tutor|\/os$|\/jokes$/.test(item.url)));
  assert.deepEqual(robots().rules[0].disallow, ['/api/']);
  const home = fs.readFileSync(path.join(root, 'app/page.tsx'), 'utf8');
  assert.match(home, /\['nordflam', 'buildvolume', 'illumi'\]/);
});
test('first-party events reject arbitrary messages and log only allowlisted names', async () => {
  const info = console.info; const logs = []; console.info = value => logs.push(value);
  try {
    assert.equal((await events.POST(request({ event: 'email_click', secret: 'PRIVATE' }, 'text/plain'))).status, 204);
    assert.equal((await events.POST(request({ event: 'PRIVATE' }, 'text/plain'))).status, 400);
    assert.equal((await events.POST(request('x'.repeat(200), 'text/plain'))).status, 413);
    assert.equal((await events.POST(request({ event: 'email_click' }, 'text/plain', 'https://other.example'))).status, 403);
    assert.doesNotMatch(logs.join(' '), /PRIVATE/);
  } finally { console.info = info; }
});
test('host policies avoid unrelated redirects and broadly cacheable API responses', async () => {
  const config = require('../next.config.js');
  assert.ok(!(await config.redirects()).some(item => item.source === '/work/caps-tutor'));
  const headers = await config.headers();
  assert.ok(headers.some(item => item.source === '/api/:path*' && item.headers.some(header => header.value === 'no-store')));
  const preview = headers.find(item => item.has?.some(rule => rule.type === 'host' && rule.value.includes('vercel')));
  const pattern = new RegExp(`^${preview.has[0].value}$`);
  assert.ok(pattern.test('pixaloom-website.vercel.app')); assert.ok(!pattern.test('www.pixaloom.co.za'));
});

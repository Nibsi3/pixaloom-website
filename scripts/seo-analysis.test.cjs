const { test } = require('node:test');
const assert = require('node:assert/strict');
const analysis = import('./seo-analysis.mjs');
const url = path => new URL(path, 'https://www.pixaloom.co.za');
test('graph detects isolated cycles and counts referring pages, not duplicate anchors', async () => {
  const { linkGraph } = await analysis;
  const rows = linkGraph([
    { path: '/', internalLinks: [url('/services'), url('/services')], contentLinks: ['/services', '/services'] },
    { path: '/services', internalLinks: [url('/article')], contentLinks: ['/article'] },
    { path: '/article', internalLinks: [], contentLinks: [] },
    { path: '/orphan', internalLinks: [url('/orphan-two')], contentLinks: [] },
    { path: '/orphan-two', internalLinks: [url('/orphan')], contentLinks: [] },
  ]);
  assert.equal(rows[2].depth, 2);
  assert.equal(rows[1].incoming.length, 1);
  assert.equal(rows[1].contextualIncoming.length, 1);
  assert.equal(rows[3].depth, null);
  assert.equal(rows[4].depth, null);
});
test('fragment validation catches broken CTAs and accepts encoded IDs and text fragments', async () => {
  const { brokenFragments } = await analysis;
  const failures = brokenFragments([
    { path: '/', ids: ['main-content'], internalLinks: [url('/about#missing'), url('/about#caf%C3%A9'), url('/about#:~:text=words'), url('/#main-content')] },
    { path: '/about', ids: ['café'], internalLinks: [] },
  ]);
  assert.deepEqual(failures, ['/: missing fragment target /about#missing']);
});
test('content diagnostics exclude executable payloads and find nested schema dates', async () => {
  const { mainContent, plainText, schemaDates } = await analysis;
  assert.equal(plainText(mainContent('<header>Navigation</header><main><script>secret</script><h1>Useful title</h1><p>Words.</p></main>')), 'Useful title Words.');
  assert.deepEqual(schemaDates({ '@graph': [{ url: 'https://example.com/', dateModified: '2026-10-13' }, { name: 'Undated' }] }), [{ url: 'https://example.com/', modified: '2026-10-13' }]);
});

test('canonical checks reject duplicates and changed resource URLs without hiding query or fragment errors', async () => {
  const { canonicalProblems } = await analysis;
  const expected = 'https://www.pixaloom.co.za/about';
  assert.deepEqual(canonicalProblems([expected], expected), []);
  assert.deepEqual(canonicalProblems(['https://www.pixaloom.co.za/'], 'https://www.pixaloom.co.za'), []);
  for (const values of [[], [expected, expected], ['/about'], [`${expected}?preview=true`], [`${expected}#main`], [`${expected}/`], [expected.replace('www.', '')], ['javascript:void(0)']]) {
    assert.ok(canonicalProblems(values, expected).length, JSON.stringify(values));
  }
});

test('robots checks honour Googlebot groups, repeated groups and longest matching allow rules', async () => {
  const { robotsAllows } = await analysis;
  const rules = 'User-agent: *\nDisallow: /\nUser-agent: Googlebot\nDisallow: /services\nAllow: /services/seo\nDisallow: /*?private=\nUser-agent: googlebot\nDisallow: /os$\nAllow: /services/seo';
  assert.equal(robotsAllows(rules, '/about'), true);
  assert.equal(robotsAllows(rules, '/services/website-design'), false);
  assert.equal(robotsAllows(rules, '/services/seo'), true);
  assert.equal(robotsAllows(rules, '/about?private=yes'), false);
  assert.equal(robotsAllows(rules, '/os'), false);
  assert.equal(robotsAllows(rules, '/os/details'), true);
  assert.equal(robotsAllows(rules, '/about', 'Otherbot'), false);
  assert.equal(robotsAllows('User-agent: *\nDisallow: /blog\nAllow: /blog', '/blog'), true);
  assert.equal(robotsAllows('User-agent: *\nDisallow:\nUser-agent: Googlebot\nDisallow: /blog', '/blog', 'Otherbot'), true);
  assert.equal(robotsAllows('User-agent: *\nAllow: /\nDisallow: /api/ # private handlers', '/api/contact'), false);
});

test('rendered image checks include every responsive candidate and poster but exclude inline placeholders', async () => {
  const { renderedImageSources } = await analysis;
  assert.deepEqual(renderedImageSources({ src: '/optimized/cover-1080.webp', srcset: '/optimized/cover-640.webp 640w, /optimized/cover-1080.webp 1080w, /optimized/cover-1920.webp 1920w' }), ['/optimized/cover-1080.webp', '/optimized/cover-640.webp', '/optimized/cover-1920.webp']);
  assert.deepEqual(renderedImageSources({ src: 'data:image/gif;base64,ABC', srcset: '/logo.png 1x,/logo-large.png 2x' }), ['/logo.png', '/logo-large.png']);
  assert.deepEqual(renderedImageSources({ poster: '/poster.webp' }), ['/poster.webp']);
  assert.deepEqual(renderedImageSources({ srcset: 'data:image/gif;base64,ABC 1x, /image.webp 2x' }), ['/image.webp']);
});

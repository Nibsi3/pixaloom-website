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

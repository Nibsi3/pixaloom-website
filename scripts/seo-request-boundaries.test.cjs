const { test } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const { spawn } = require('node:child_process');
const path = require('node:path');

test('page URL mapping preserves path and query without interpreting a leading double slash as a host', async () => {
  const { crawlPageUrl } = await import('./seo-analysis.mjs');
  const options = { canonicalOrigin: 'https://www.pixaloom.co.za', crawlOrigin: 'http://127.0.0.1:3101' };
  assert.equal(crawlPageUrl('https://www.pixaloom.co.za//example.test/page?x=1&x=2#section', options).href,
    'http://127.0.0.1:3101//example.test/page?x=1&x=2');
  assert.equal(crawlPageUrl('/blog/a%2Fb/?query=web%20design', options).href,
    'http://127.0.0.1:3101/blog/a%2Fb/?query=web%20design');
  for (const source of ['//example.test/page', 'https://example.test/image.png', 'http://127.0.0.1:9999/page', 'https://user:password@www.pixaloom.co.za/page', 'file:///page']) {
    assert.throws(() => crawlPageUrl(source, options), /outside the audit origins/);
  }
});

test('a local crawl cannot escape through sitemap paths, images or redirect chains', { timeout: 15000 }, async t => {
  const escapedRequests = [];
  // Both destinations are controlled loopback fixtures, including the mock
  // canonical origin. A regression must never send a request to a real site.
  const other = http.createServer((request, response) => {
    escapedRequests.push(request.url);
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end('<html><body><main><h1>Other origin</h1></main></body></html>');
  });
  await new Promise(resolve => other.listen(0, '127.0.0.1', resolve));
  t.after(() => { other.closeAllConnections(); other.close(); });
  const externalOrigin = `http://127.0.0.1:${other.address().port}`;
  const canonicalOrigin = `http://localhost:${other.address().port}`;
  const unusualPath = `//127.0.0.1:${other.address().port}/escaped-page`;
  const localRequests = [];
  const audited = http.createServer((request, response) => {
    localRequests.push(request.url);
    if (request.url === '/robots.txt') {
      response.end(`User-agent: *\nAllow: /\nSitemap: ${canonicalOrigin}/sitemap.xml`);
    } else if (request.url === '/sitemap.xml') {
      response.setHeader('Content-Type', 'application/xml');
      response.end(`<urlset><url><loc>${canonicalOrigin}/</loc></url><url><loc>${canonicalOrigin}${unusualPath}</loc><image:image><image:loc>${externalOrigin}/image-escape.png</image:loc></image:image></url></urlset>`);
    } else if (request.url === '/' || request.url === unusualPath) {
      response.setHeader('Content-Type', 'text/html');
      response.end(`<html lang="en-ZA"><head><title>Local audit fixture</title></head><body><main><h1>Local audit fixture</h1><a href="${canonicalOrigin}/redirect-escape">External redirect</a><a href="${canonicalOrigin}/canonical-redirect">Canonical redirect</a><a href="${canonicalOrigin}/redirect-loop">Loop</a></main></body></html>`);
    } else if (request.url === '/redirect-escape') {
      response.writeHead(302, { Location: `${externalOrigin}/redirect-escape` });
      response.end();
    } else if (request.url === '/canonical-redirect') {
      response.writeHead(308, { Location: `${canonicalOrigin}/resolved-probe?x=1&x=2` });
      response.end();
    } else if (request.url === '/redirect-loop') {
      response.writeHead(302, { Location: '/redirect-loop' });
      response.end();
    } else if (request.url === '/resolved-probe?x=1&x=2') {
      response.end('Resolved within the local audit');
    } else {
      response.writeHead(404, { 'Content-Type': 'text/html' });
      response.end('<html><head><meta name="robots" content="noindex"></head><body><main><h1>Missing fixture</h1></main></body></html>');
    }
  });
  await new Promise(resolve => audited.listen(0, '127.0.0.1', resolve));
  t.after(() => { audited.closeAllConnections(); audited.close(); });
  const child = spawn(process.execPath, ['scripts/seo-audit.mjs', `http://127.0.0.1:${audited.address().port}`], {
    cwd: path.resolve(__dirname, '..'),
    env: { ...process.env, CANONICAL_ORIGIN: canonicalOrigin },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  t.after(() => child.kill());
  let output = '';
  child.stdout.on('data', chunk => { output += chunk; });
  child.stderr.on('data', chunk => { output += chunk; });
  const code = await new Promise((resolve, reject) => {
    child.on('error', reject);
    child.on('exit', resolve);
  });
  assert.equal(code, 1, 'The deliberately invalid fixtures must fail the audit');
  assert.deepEqual(escapedRequests, [], 'No fetch may leave the chosen crawl origin');
  assert.ok(localRequests.includes(unusualPath), 'The double-slash pathname must remain a local path');
  assert.ok(localRequests.includes('/resolved-probe?x=1&x=2'), 'Canonical redirects must be checked locally with all query values');
  assert.equal(localRequests.filter(value => value === '/redirect-loop').length, 1);
  assert.match(output, /redirect leaves the audit origins/);
  assert.match(output, /image URL uses a noncanonical origin/);
  assert.match(output, /redirect loop or more than five redirects/);
});

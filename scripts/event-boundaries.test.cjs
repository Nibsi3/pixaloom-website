const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const resolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, ...rest) {
  return resolve.call(this, request.startsWith('@/') ? path.join(root, request.slice(2)) : request, parent, ...rest);
};
require.extensions['.ts'] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText, filename);
};
const { POST } = require('../app/api/events/route.ts');
const { conversionEvents } = require('../lib/events.ts');
const request = (body, origin = 'https://www.pixaloom.co.za') => new Request('https://www.pixaloom.co.za/api/events', {
  method: 'POST', body, duplex: 'half', headers: origin === null ? {} : { origin },
});

test('untrusted event origins are rejected before waiting for an unreadable body', async t => {
  const logs = [];
  t.mock.method(console, 'info', value => logs.push(value));
  for (const origin of [null, 'null', 'https://www.pixaloom.co.za.evil.invalid', 'https://evil.invalid', 'http://www.pixaloom.co.za', 'https://www.pixaloom.co.za, https://evil.invalid']) {
    const stream = new ReadableStream({ start(controller) { controller.error(new Error('PRIVATE_BODY')); } });
    const result = await POST(request(stream, origin));
    assert.equal(result.status, 403, String(origin));
    assert.equal(result.headers.get('cache-control'), 'no-store');
    assert.equal(await result.text(), '');
  }
  assert.deepEqual(logs, []);
});

test('every allowed event logs only its fixed name and source, never extra input', async t => {
  const logs = [];
  t.mock.method(console, 'info', value => logs.push(value));
  for (const event of conversionEvents) {
    const result = await POST(request(JSON.stringify({ event, email: 'PRIVATE@example.invalid', message: 'PRIVATE' })));
    assert.equal(result.status, 204);
    assert.equal(await result.text(), '');
  }
  assert.deepEqual(logs.map(JSON.parse), conversionEvents.map(event => ({ event, source: 'website_action' })));
  assert.doesNotMatch(logs.join(''), /PRIVATE|@|message/);
});

test('structured, prototype-shaped and oversized event inputs never become log entries', async t => {
  const logs = [];
  t.mock.method(console, 'info', value => logs.push(value));
  for (const body of ['null', 'true', '1', '[]', '{}', '"email_click"', '{"event":{}}', '{"event":["email_click"]}', '{"__proto__":{"event":"email_click"}}', '{"event":"constructor"}', '{"event":"EMAIL_CLICK"}', '{"event":"email_click\\nPRIVATE"}']) {
    const result = await POST(request(body));
    assert.equal(result.status, 400, body);
    assert.equal(await result.text(), '');
  }
  const oversized = await POST(request(JSON.stringify({ event: 'email_click', private: 'é'.repeat(128) })));
  assert.equal(oversized.status, 413);
  assert.deepEqual(logs, []);
});

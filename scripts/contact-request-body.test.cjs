const { test, after } = require('node:test');
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
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText, filename);
};
const originalFetch = globalThis.fetch;
globalThis.fetch = async () => { throw new Error('No live requests are permitted in contact tests'); };
after(() => { globalThis.fetch = originalFetch; });
const email = require('../lib/email.ts');
const { POST } = require('../app/api/contact/route.ts');

test('a stalled contact upload times out without sending, even if cancellation also stalls', { timeout: 15000 }, async t => {
  let cancelled = false;
  const config = t.mock.method(email, 'getEmailConfig', () => undefined);
  const send = t.mock.method(email, 'sendEmail', async () => { throw new Error('Mail must never be sent'); });
  const stream = new ReadableStream({ cancel() { cancelled = true; return new Promise(() => {}); } });
  const response = await POST(new Request('https://www.pixaloom.co.za/api/contact', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://www.pixaloom.co.za' }, body: stream, duplex: 'half',
  }));
  assert.equal(response.status, 408);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), { ok: false, error: 'The upload took too long. Please try again or contact us directly.' });
  assert.equal(cancelled, true);
  assert.equal(config.mock.calls.length, 0);
  assert.equal(send.mock.calls.length, 0);
});

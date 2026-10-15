import apiWorker from './.open-next/worker.js';
export * from './.open-next/worker.js';

// Keep existing Cloudflare API bindings while serving the same reviewed frontend
// release from the project's existing production Vercel deployment.
export default {
  async fetch(request, env, ctx) {
    const publicUrl = new URL(request.url);
    if (publicUrl.hostname === 'pixaloom.co.za') {
      publicUrl.hostname = 'www.pixaloom.co.za';
      return Response.redirect(publicUrl.toString(), 308);
    }
    if (publicUrl.pathname.startsWith('/api/') || !['GET', 'HEAD'].includes(request.method)) {
      return apiWorker.fetch(request, env, ctx);
    }
    const upstream = new URL(request.url);
    upstream.hostname = 'pixaloom-website.vercel.app';
    upstream.port = '';
    const headers = new Headers(request.headers);
    for (const name of ['host', 'cookie', 'authorization']) headers.delete(name);
    const response = await fetch(upstream, { method: request.method, headers, redirect: 'manual' });
    const responseHeaders = new Headers(response.headers);
    const location = responseHeaders.get('location');
    if (location) {
      const destination = new URL(location, upstream);
      if (destination.hostname === upstream.hostname) {
        destination.hostname = publicUrl.hostname;
        responseHeaders.set('location', destination.toString());
      }
    }
    if (publicUrl.hostname === 'www.pixaloom.co.za') responseHeaders.delete('x-robots-tag');
    else responseHeaders.set('x-robots-tag', 'noindex, nofollow');
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  },
};

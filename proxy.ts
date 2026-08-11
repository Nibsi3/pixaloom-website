import type { NextRequest } from 'next/server';

const METHOD_NOT_ALLOWED = `<!doctype html>
<html lang="en-ZA"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>Request not supported | Pixaloom</title>
<style>
*{box-sizing:border-box}html,body{margin:0;background:#080808;color:#f2efe7;font-family:Arial,sans-serif}a{color:inherit;text-decoration:none}
header{height:76px;padding:0 clamp(20px,4vw,44px);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #272727;font-size:11px;letter-spacing:.16em;text-transform:uppercase}
header strong{font:400 24px Georgia,serif;letter-spacing:-.04em;text-transform:none}main{position:relative;min-height:calc(100vh - 76px);overflow:hidden;display:grid;align-items:center;padding:clamp(100px,14vw,180px) clamp(24px,7vw,110px);isolation:isolate}
main:before{content:'';position:absolute;width:min(42vw,540px);aspect-ratio:1;right:9%;top:50%;transform:translateY(-50%);border:1px solid #363636;border-radius:50%;background:radial-gradient(circle at 38% 35%,#201d20,#0a0a0a 68%);z-index:-1}
.copy{width:min(680px,62vw)}p{margin:0;color:#92918c;font-size:10px;line-height:1.8;letter-spacing:.14em;text-transform:uppercase}h1{margin:32px 0;font:400 clamp(64px,9vw,136px)/.84 Georgia,serif;letter-spacing:-.07em}h1 em{color:#aaa8a1}a{display:inline-flex;margin-top:28px;padding:16px 20px;border:1px solid #4a4a4a;font-size:10px;letter-spacing:.14em;text-transform:uppercase}
@media(max-width:720px){main{align-items:end;padding:110px 20px 80px}main:before{width:76vw;right:-20%;top:30%}.copy{width:100%}h1{font-size:21vw}}
</style></head><body><header><strong>Pixaloom</strong><span>Digital studio</span></header><main><div class="copy"><p>Error · 405</p><h1>This request<br><em>doesn’t fit.</em></h1><p>The page is available, but not through this request method. Return to the website and continue normally.</p><a href="/">Return home</a></div></main></body></html>`;

export function proxy(request: NextRequest) {
  if (request.method === 'GET' || request.method === 'HEAD' || request.method === 'OPTIONS') return;

  return new Response(METHOD_NOT_ALLOWED, {
    status: 405,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
      Allow: 'GET, HEAD, OPTIONS',
    },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.[a-zA-Z0-9]+$).*)'],
};

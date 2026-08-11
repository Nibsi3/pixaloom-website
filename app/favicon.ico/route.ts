import { NextResponse } from 'next/server';

export function GET(request: Request) {
  const url = new URL(request.url);
  return NextResponse.redirect(new URL('/favicon-32.png', url.origin), 308);
}

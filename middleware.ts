import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware runs on edge — no Firebase Admin here.
// Auth gating happens client-side in layout/page components.
// This middleware only handles simple redirects.

export function middleware(request: NextRequest) {
  // Allow all API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next()
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

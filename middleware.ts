import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Intha function ovvoru request-kum run aagum
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Request/Response vechu oru Supabase client-a create panrom
  const supabase = createMiddlewareClient({ req, res });

  // User session-a refresh panrom (session expire aagama iruka)
  await supabase.auth.getSession();

  return res;
}

// Middleware-a endha endha path-ku run pannanum-nu solrom
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

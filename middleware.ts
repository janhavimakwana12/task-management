import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value
  const publicPaths = ['/login', '/signup', '/api/login', '/api/signup', '/api/sync-token']
  const pathname = request.nextUrl.pathname

  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/tasks/:path*', '/dashboard/:path*', '/'],
}
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isApiRoute = pathname.startsWith('/api');

    if(isApiRoute){
        return NextResponse.next();
    }

    const token = request.cookies.get('token')?.value || await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const isAuthenticated = !!token;

    if (pathname === '/') {
        if(!isAuthenticated){
            return NextResponse.redirect(new URL('/login', request.url))
        }else{
            return NextResponse.redirect(new URL('/tasks', request.url))
        }
    }

    const protectedPaths = ['/tasks', '/profile']
    const isProtected = protectedPaths.some((path) => pathname.startsWith(path))

    if (isProtected && !isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

  return NextResponse.next();
}
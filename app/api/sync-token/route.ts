import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { token } = await req.json()

  const res = NextResponse.json({ message: 'Token set in cookie' })
  res.cookies.set('auth_token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24,
  })

  return res
}
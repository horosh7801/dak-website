import { NextResponse } from 'next/server'

export function middleware(request) {
	const response = NextResponse.next()
	console.log(request.nextUrl.href)
	const localeCookie = request.cookies.get('NEXT_LOCALE')
	if (localeCookie === undefined) {
	}
  return response

}

export const config = {
  matcher: ['/', '/cart', '/products/:path*'],
}

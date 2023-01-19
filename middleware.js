import { NextResponse } from 'next/server'

export function middleware(request) {
	const response = NextResponse.next()
	const localeCookie = request.cookies.get('NEXT_LOCALE')
	if (localeCookie === undefined) {
		response.cookies.set('NEXT_LOCALE', 'ru')
	}
  return response

}

export const config = {
  matcher: ['/', '/cart', '/products/:path*'],
}

import { NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/


export function middleware(request) {


	const { nextUrl, headers, cookies } = request

	const NEXT_LOCALE = cookies.get('NEXT_LOCALE')?.value.toLowerCase()

	const locale = nextUrl.locale.toLowerCase()

	const url = nextUrl.clone()

  const language =
    headers
      .get('accept-language')
      ?.split(',')?.[0]
      .split('-')?.[0]
      .toLowerCase() || 'en'

//	console.log({nextLocale: nextUrl.locale, pathname: nextUrl.pathname, cookie: cookies.NEXT_LOCALE, clientLanguage: language,})

  if (
  	PUBLIC_FILE.test(nextUrl.pathname) ||
  	nextUrl.pathname.includes('/api') ||
  	nextUrl.pathname.startsWith('/_next')
  ) {
    return undefined
  }

  if (nextUrl.pathname === '/admin') {
  	return NextResponse.redirect(new URL(`http://45.93.138.174:1337/admin`))
  }

//console.log(nextUrl.pathname)

	if (NEXT_LOCALE) {
		if (NEXT_LOCALE === locale) {
			return
		}
		return NextResponse.redirect(new URL(`/${NEXT_LOCALE}${nextUrl.pathname}`, nextUrl.origin))
	}

	if (nextUrl.locale !== language) {
		return NextResponse.redirect(new URL(`/${language}${nextUrl.pathname}`, nextUrl.origin))
	}

  return undefined

}


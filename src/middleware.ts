import { NextRequest, NextResponse } from 'next/server';
import { locales, isValidLocale } from './i18n';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if the pathname already has a valid locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect if there is no locale
  const locale = request.headers.get('accept-language')?.split(',')[0].split('-')[0] || 'en';
  const defaultLocale = isValidLocale(locale) ? locale : 'en';
  
  // Special case for root path
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }
  
  // Rewrite for all other paths
  return NextResponse.rewrite(
    new URL(`/${defaultLocale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\.svg$).*)'],
};
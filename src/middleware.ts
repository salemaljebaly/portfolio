import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const locales = ["en", "ar"];

// Get the preferred locale, similar to the above or using a different method
function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");
  return acceptLanguage?.split(",")?.[0]?.split("-")?.[0] || "en";
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;

  // Check if the pathname starts with /en or /ar
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = pathname === "/" ? "en" : getLocale(request);
  request.nextUrl.pathname =
    pathname === "/" ? pathname : `/${locale}${pathname}`;

  // e.g. incoming request is /products
  // The new URL is now /en/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico).*)",
  ],
};

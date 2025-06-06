import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const locales = ["en", "ar"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the pathname starts with /en or /ar
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  // If pathname has locale, allow the request to continue
  if (pathnameHasLocale) return;

  // Skip API routes and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // Files with extensions
  ) {
    return;
  }

  // For root path, let the page.tsx handle the redirect
  if (pathname === "/") {
    return;
  }

  // For all other paths without locale, redirect to /en version
  const newUrl = new URL(`/en${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico).*)",
  ],
};

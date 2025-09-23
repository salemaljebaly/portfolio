import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip API routes and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return;
  }

  // Redirect any /en or /en/* to the non-prefixed path
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const newPath = pathname.replace(/^\/en(\/|$)/, "/");
    const newUrl = new URL(newPath, request.url);
    return NextResponse.redirect(newUrl);
  }

  // Temporarily disable Arabic: redirect /ar/* to non-prefixed path
  if (pathname === "/ar" || pathname.startsWith("/ar/")) {
    const newPath = pathname.replace(/^\/ar(\/|$)/, "/");
    const newUrl = new URL(newPath, request.url);
    return NextResponse.redirect(newUrl);
  }

  // All other paths are default English without prefix; allow
  return;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico).*)",
  ],
};

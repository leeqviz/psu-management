import { i18nConfig } from "@/lib/i18n/utils";
import { i18nRouter } from "next-i18n-router";
import { NextRequest } from "next/server";

//response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
export const config = {
  matcher: [
    //"/((?!api|static|.*\\..*|_next).*)",
    // This regex excludes:
    // 1. /api/ (API routes)
    // 2. /_next/static/ (static files)
    // 3. /_next/image/ (image optimization files)
    // 4. Any path that contains a dot (e.g., .png, .ico, .json, .svg)
    "/((?!api|_next/static|_next/image|.*\\.[^/?]+$).*)",
  ],
};

export function middleware(request: NextRequest) {
  // The i18nRouter will handle all the logic:
  // - Language detection
  // - Redirects
  // - Ignoring paths
  return i18nRouter(request, i18nConfig);
}

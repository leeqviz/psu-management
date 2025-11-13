import { cookieName, fallbackLng, languages } from "@/lib/i18n/settings";
import acceptLanguage from "accept-language";
import { NextRequest, NextResponse } from "next/server";

acceptLanguage.languages(languages);

export const config = {
  matcher: [
    // This regex excludes:
    // 1. /api/ (API routes)
    // 2. /_next/static/ (static files)
    // 3. /_next/image/ (image optimization files)
    // 4. Any path that contains a dot (e.g., .png, .ico, .json, .svg)
    "/((?!api|_next/static|_next/image|.*\\.[^/?]+$).*)",
  ],
};

// ... the rest of your middleware function should be fine ...
export function middleware(req: NextRequest) {
  let lng;
  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  }
  if (!lng) {
    lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  }
  if (!lng) {
    lng = fallbackLng;
  }

  const pathname = req.nextUrl.pathname;

  // Check if the path is missing a language prefix
  const pathnameIsMissingLocale = !languages.some(
    (loc) => pathname.startsWith(`/${loc}`) || pathname === `/${loc}`
  );

  if (pathnameIsMissingLocale) {
    // e.g. / -> /en
    return NextResponse.redirect(
      new URL(
        `/${lng}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        req.url
      )
    );
  }

  // Set the cookie for the current language
  const response = NextResponse.next();
  const lngInPath = languages.find((l) => pathname.startsWith(`/${l}`));

  if (lngInPath) {
    response.cookies.set(cookieName, lngInPath);
  }

  return response;
}

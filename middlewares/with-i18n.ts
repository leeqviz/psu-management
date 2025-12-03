import { COOKIE_NAME } from "@/constants/cookies";
import {
  getLocaleFromPath,
  i18nConfig,
  removeLocaleFromPath,
} from "@/lib/i18n";
import acceptLanguage from "accept-language";
import {
  NextResponse,
  type NextFetchEvent,
  type NextMiddleware,
  type NextRequest,
} from "next/server";

// For The Browser Header (Accept-Language) Parsing
acceptLanguage.languages(i18nConfig.locales);

function getLocale(request: NextRequest): string {
  // We always check this manually first because it represents a user's explicit choice.
  const cookieLocale = request.cookies.get(COOKIE_NAME.Language)?.value;
  if (cookieLocale && i18nConfig.locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // The library parses the header and returns the best match from your config.
  // If the header is missing or no match is found, it returns null.
  const headerLocale = acceptLanguage.get(
    request.headers.get("accept-language")
  );

  // If the library returns null, use your default.
  return headerLocale || i18nConfig.defaultLocale;
}

function createUrl(pathname: string, request: NextRequest): URL {
  const url = new URL(pathname, request.url);
  url.search = request.nextUrl.search;
  return url;
}

export function withI18n(next: NextMiddleware): NextMiddleware {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;

    console.log("We check the locale for: " + pathname);
    const localeFromPath = getLocaleFromPath(pathname);

    // SCENARIO 1: The URL already contains a locale (e.g. /es/about)
    if (localeFromPath) {
      console.log("Locale from path: " + localeFromPath);
      // Rule: If the URL has the DEFAULT locale (e.g. /en/about),
      // we must strip it and redirect to the clean URL (/about) for SEO.
      if (localeFromPath === i18nConfig.defaultLocale) {
        const newPath = removeLocaleFromPath(pathname);
        const response = NextResponse.redirect(createUrl(newPath, request));
        response.cookies.set(COOKIE_NAME.Language, localeFromPath);
        return response;
      }

      // Otherwise, the URL is valid (e.g. /es/about). Continue chain.
      const response = await next(request, event);
      if (response && response instanceof NextResponse)
        response.cookies.set(COOKIE_NAME.Language, localeFromPath);
      return response;
    } else {
      // SCENARIO 2: The URL has NO locale (e.g. /about)
      const detectedLocale = getLocale(request);
      const newPath = `/${detectedLocale}${pathname === "/" ? "" : pathname}`;

      // Rule: If the user wants the DEFAULT locale, we keep the URL clean (/about)
      // but internally rewrite it so Next.js renders the correct folder.
      if (detectedLocale === i18nConfig.defaultLocale) {
        console.log("REWRITE FOR: " + pathname);
        return NextResponse.rewrite(createUrl(newPath, request));
      }

      // Rule: If the user wants a DIFFERENT locale, redirect them (e.g. /about -> /es/about)
      return NextResponse.redirect(createUrl(newPath, request));
    }
  };
}

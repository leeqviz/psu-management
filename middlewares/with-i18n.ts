import { COOKIE_NAME } from "@/constants/cookies";
import {
  getLocaleFromPath,
  i18nConfig,
  removeLocaleFromPath,
} from "@/lib/i18n/utils";
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
  const localePrefix = request.cookies.get(COOKIE_NAME.Language)?.value;
  if (localePrefix && i18nConfig.locales.includes(localePrefix)) {
    return localePrefix;
  }

  // The library parses the header and returns the best match from your config.
  // If the header is missing or no match is found, it returns null.
  const languageHeader = request.headers.get("accept-language");
  console.log("Accept-Language Header: " + languageHeader);
  const detectedLocale = acceptLanguage.get(languageHeader);

  // If the library returns null, use your default.
  return detectedLocale || i18nConfig.defaultLocale;
}

function createUrl(pathname: string, request: NextRequest): URL {
  const url = new URL(pathname, request.url);
  url.search = request.nextUrl.search;
  return url;
}

export function withI18n(next: NextMiddleware): NextMiddleware {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    const currentLocale = getLocaleFromPath(pathname);

    // ---------------------------------------------------------------
    // SCENARIO 1: The URL already contains a locale (e.g. /es/about)
    // ---------------------------------------------------------------
    if (currentLocale) {
      // Rule: If the URL has the DEFAULT locale (e.g. /en/about),
      // we must strip it and redirect to the clean URL (/about) for SEO.
      if (currentLocale === i18nConfig.defaultLocale) {
        const newPath = removeLocaleFromPath(pathname, currentLocale);
        console.log("Redirection for: " + pathname);
        return NextResponse.redirect(createUrl(newPath, request));
      }

      // Otherwise, the URL is valid (e.g. /es/about). Continue chain.
      return next(request, _next);
    }

    // ---------------------------------------------------------------
    // SCENARIO 2: The URL has NO locale (e.g. /about)
    // ---------------------------------------------------------------
    const detectedLocale = getLocale(request);
    const newPath = `/${detectedLocale}${pathname === "/" ? "" : pathname}`;

    // Rule: If the user wants the DEFAULT locale, we keep the URL clean (/about)
    // but internally rewrite it so Next.js renders the correct folder.
    if (detectedLocale === i18nConfig.defaultLocale) {
      console.log("Rewriting for: " + pathname);
      return NextResponse.rewrite(createUrl(newPath, request));
    }

    // Rule: If the user wants a DIFFERENT locale, redirect them (e.g. /about -> /es/about)
    console.log("Redirection for: " + pathname);
    return NextResponse.redirect(createUrl(newPath, request));
  };
}

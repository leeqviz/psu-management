import { parsePath } from "@/utils/string-mapper";
import { createInstance, i18n } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";

// config from next-i18next-router
/* export interface Config {
  locales: readonly string[];
  defaultLocale: string;
  localeCookie?: string;
  localeDetector?: ((request: NextRequest, config: Config) => string) | false;
  prefixDefault?: boolean;
  noPrefix?: boolean;
  basePath?: string;
  serverSetCookie?: 'if-empty' | 'always' | 'never';
  cookieOptions?: Partial<ResponseCookie>;
} */

export const i18nConfig = {
  locales: ["en", "ru", "ar"],
  defaultLocale: "en",
  localeCookie: "lang",
  //prefixDefault: true, //show all locales in the URL path, even the default one
  //noPrefix: true //disable all locale prefixes in the URL path
};

export const createI18nInstance = () =>
  createInstance()
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`../../public/locales/${language}/${namespace}.json`)
      )
    );

export const initI18nInstance = async (
  instance: i18n,
  lng: string,
  ns: string | readonly string[] = i18nConfig.defaultLocale
) =>
  await instance.init({
    debug: false,
    preload: i18nConfig.locales,

    supportedLngs: i18nConfig.locales,
    fallbackLng: i18nConfig.defaultLocale,
    lng,
    ns,
    fallbackNS: i18nConfig.defaultLocale,
    defaultNS: i18nConfig.defaultLocale,
  });

export const getDirection = (locale: string) =>
  ["ar", "he", "fa", "ur"].includes(locale) ? "rtl" : "ltr";

/**
 * Extracts the locale prefix from a URL path if it exists.
 *
 * Example: "/en/about" -> "en"
 *
 * @param path - the current path (e.g. "/en/about", "/ru", "/about")
 * @returns the locale (e.g. "en", "ru", undefined)
 */
export function getLocaleFromPath(path: string): string | undefined {
  const { pathname } = parsePath(path);

  const segments = pathname.split("/");
  const locale = segments[1];

  if (locale && i18nConfig.locales.includes(locale)) {
    return locale;
  }

  return;
}

/**
 * Removes the locale prefix from the given URL path. Or just returns the path if the locale is not found in the path.
 *
 * Example: "/en/about" -> "/about"
 *
 * @param path - the current path (e.g. "/en/about", "/ru", "/about")
 * @returns the path without the locale (e.g. "/about", "/", "/about")
 */
export function removeLocaleFromPath(path: string): string {
  const { pathname, search } = parsePath(path);

  const segments = pathname.split("/");
  const locale = segments[1];

  if (locale && i18nConfig.locales.includes(locale)) {
    // Remove locale
    segments.splice(1, 1);
    const newPath = segments.join("/");
    const cleanPath = newPath === "" ? "/" : newPath; // Handle root path
    return `${cleanPath}${search}`;
  }

  return path; // Locale not found in path
}

/**
 * Adds the locale prefix to the given URL path.
 * If the locale is the default locale, the prefix is not added.
 *
 * Example: "/about" -> "/ru/about"
 *
 * @param path - the current path (e.g. "/about", "/ru", "/")
 * @param locale - the locale to add (e.g. "ru", "en")
 * @returns the path with the locale prefix (e.g. "/ru/about", "/", "/ru")
 */
export function addLocaleToPath(
  path: string,
  locale: string = i18nConfig.defaultLocale
): string {
  const { pathname, search } = parsePath(path);

  if (locale === i18nConfig.defaultLocale) {
    return path; // No prefix for default locale
  }

  if (pathname === "/" || pathname === "") {
    return `/${locale}${search}`; // Add prefix for root path
  }

  // Add prefix for other paths
  const normalizedPathname = pathname.startsWith("/")
    ? pathname
    : `/${pathname}`;
  return `/${locale}${normalizedPathname}${search}`;
}

/**
 * Normalizes the path for SEO.
 * Removes locale if it is the default one. Adds it otherwise.
 *
 * @param path - the current path (e.g. "/en/about", "/ru", "/about")
 * @param locale - the locale to add (e.g. "ru", "en")
 * @returns the path with the locale prefix (e.g. "/about", "/ru", "/about")
 */
export function getCanonicalPath(
  path: string,
  locale: string = i18nConfig.defaultLocale
): string {
  // 1. Always start with a clean path
  const cleanPath = removeLocaleFromPath(path);

  // 2. If it's the default locale, return clean path (e.g. "/about")
  if (locale === i18nConfig.defaultLocale) {
    return cleanPath;
  }

  // 3. Otherwise, force the prefix (e.g. "/fr/about")
  return addLocaleToPath(cleanPath, locale);
}

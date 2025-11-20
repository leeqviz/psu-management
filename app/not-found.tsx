import { COOKIE_NAME } from "@/constants/cookies";
import { i18nConfig } from "@/lib/i18n/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * This root not-found component is a simple fallback.
 * It just redirects the user to the "not found" page
 * for their default language.
 */
export default async function RootNotFound() {
  // 1. Try to get the language from the cookie
  const cookieStore = cookies();
  const localeCookie = (await cookieStore).get(COOKIE_NAME.Language);

  // 2. Validate the cookie value (ensure it's a supported language)
  const cookieLang = localeCookie?.value;
  const isValidLang = cookieLang && i18nConfig.locales.includes(cookieLang);

  // 3. Decide which language to use
  const langToUse = isValidLang ? cookieLang : i18nConfig.defaultLocale;

  // 4. Redirect to the localized 404 page
  // We redirect to `/${langToUse}/404`. Since this page likely
  // doesn't exist, it will trigger the app/[lng]/not-found.tsx
  redirect(`/${langToUse}/404`);
}

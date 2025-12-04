import { routingManifest } from "@/constants/routing";
import { addLocaleToPath } from "@/lib/i18n";
import { getCurrentLocale } from "@/lib/i18n/server";
import { redirect } from "next/navigation";

/**
 * This root not-found component is a simple fallback.
 * It just redirects the user to the "not found" page
 * for their default language.
 */
export default async function RootNotFound() {
  // 1. Try to get the language from the cookie
  // 2. Validate the cookie value (ensure it's a supported language)
  // 3. Decide which language to use
  // 4. Redirect to the localized 404 page
  const langToUse = await getCurrentLocale();
  const notFoundPath = addLocaleToPath(
    routingManifest.public.notFound,
    langToUse
  );
  redirect(notFoundPath);
}

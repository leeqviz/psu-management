import { i18nConfig } from "@/lib/i18n/utils";
import { redirect } from "next/navigation";

/**
 * This root not-found component is a simple fallback.
 * It just redirects the user to the "not found" page
 * for their default language.
 */
export default function RootNotFound() {
  // Redirect to the language-specific 404 page
  // This ensures the user always sees a styled, translated 404 page.
  redirect(`/${i18nConfig.defaultLocale}/404`);
}

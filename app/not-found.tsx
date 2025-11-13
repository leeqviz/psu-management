import { fallbackLng } from "@/lib/i18n/settings"; // 👈 Adjust path if needed
import { redirect } from "next/navigation";

/**
 * This root not-found component is a simple fallback.
 * It just redirects the user to the "not found" page
 * for their default language.
 */
export default async function RootNotFound() {
  // Redirect to the language-specific 404 page
  // This ensures the user always sees a styled, translated 404 page.
  redirect(`/${fallbackLng}/404`);
}

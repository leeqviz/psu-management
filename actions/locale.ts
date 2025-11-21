"use server";

import { COOKIE_NAME } from "@/constants/cookies";
import { i18nConfig } from "@/lib/i18n/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function switchLocaleAction(
  newLocale: string,
  currentPath: string
) {
  const days = 30;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

  // 2. Set the cookie securely on the server
  (await cookies()).set(COOKIE_NAME.Language, newLocale, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    // Set a long expiration (e.g., 30 days)
    expires: date,
  });

  // 2. Calculate the new path
  let newPath = currentPath;

  // A. Find if the current path already has a locale prefix
  const currentLocalePrefix = i18nConfig.locales.find(
    (locale) =>
      currentPath.startsWith(`/${locale}/`) || currentPath === `/${locale}`
  );

  // B. Remove existing prefix if present
  if (currentLocalePrefix) {
    newPath = newPath.replace(`/${currentLocalePrefix}`, "");
    // If path became empty string (it was just /en), make it /
    if (newPath === "") newPath = "/";
  }

  // C. If we are NOT switching to the default locale, add the new prefix
  if (newLocale !== i18nConfig.defaultLocale) {
    if (newPath === "/") {
      newPath = `/${newLocale}`;
    } else {
      newPath = `/${newLocale}${newPath}`;
    }
  }

  // 3. Redirect
  redirect(newPath); //refresh
}

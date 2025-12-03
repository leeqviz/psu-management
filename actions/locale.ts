"use server";

import { COOKIE_NAME } from "@/constants/cookies";
import { addLocaleToPath, removeLocaleFromPath } from "@/lib/i18n";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function switchLocaleAction(
  newLocale: string,
  currentPath: string,
  currentSearchParams: string
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

  // A. Find if the current path already has a locale prefix
  // B. Remove existing prefix if present
  const cleanPath = removeLocaleFromPath(currentPath);

  // C. If we are NOT switching to the default locale, add the new prefix
  let newPath = addLocaleToPath(cleanPath, newLocale);

  if (currentSearchParams) newPath += `?${currentSearchParams}`;

  // 3. Redirect
  redirect(newPath); //refresh
}

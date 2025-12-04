"use server";

import { COOKIE_NAME } from "@/constants/cookies";
import { routingManifest } from "@/constants/routing";
import { isPrivatePath } from "@/lib/auth";
import { addLocaleToPath, getLocaleFromPath } from "@/lib/i18n";
import { userDataMock, userTokenMock } from "@/mocks/user";
import { User } from "@/types/access-control";
import { appendQueryParams } from "@/utils/string-mapper";
import { revalidatePath } from "next/cache"; // or redirect
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(user: User, currentPath?: string) {
  // Or just plain objects
  // 1. Validate and Check DB
  // const user = await db.user.find(...)
  if (!user.email || !user.password)
    return { success: false, error: "Invalid credentials" };

  // 2. Set Cookie (Easy!)
  (await cookies()).set({
    name: COOKIE_NAME.AuthToken,
    value: userTokenMock, // Store the token, not the full user object
    httpOnly: true, // Client-side JS cannot access this cookie
    secure: process.env.NODE_ENV === "production",
    path: routingManifest.public.home,
    maxAge: 60 * 60 * 24, // 1 day
  });

  // 3. Revalidate
  if (currentPath) revalidatePath(currentPath);

  // 4. Return serializable data for Zustand
  return { success: true, user: userDataMock };
}

export async function logoutAction(currentPath?: string) {
  // Destroy Cookie
  (await cookies()).delete(COOKIE_NAME.AuthToken);

  if (!currentPath) return;

  // Redirect or revalidate if path is provided
  if (isPrivatePath(currentPath)) {
    const locale = getLocaleFromPath(currentPath);
    const forbiddenPath = addLocaleToPath(
      routingManifest.public.forbidden,
      locale
    );
    const pathToRedirect = appendQueryParams(forbiddenPath, {
      callbackUrl: currentPath,
    });
    redirect(pathToRedirect);
  } else {
    revalidatePath(currentPath);
  }
}

export async function meAction() {
  const token = (await cookies()).get(COOKIE_NAME.AuthToken)?.value;

  if (!token) {
    return { success: false, error: "Not authenticated" };
  }

  // Verify token and fetch user from DB...
  // const user = await verify(token);

  (await cookies()).set({
    name: COOKIE_NAME.AuthToken,
    value: userTokenMock, // Store the token, not the full user object
    httpOnly: true, // Client-side JS cannot access this cookie
    secure: process.env.NODE_ENV === "production",
    path: routingManifest.public.home,
    maxAge: 60 * 60 * 24, // 1 day
  });

  return { success: true, user: userDataMock };
}

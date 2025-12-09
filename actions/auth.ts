"use server";

import { COOKIE_NAME } from "@/constants/cookies";
import { APP_ROUTING } from "@/constants/routing";
import { isPrivatePath } from "@/lib/auth";
import { addLocaleToPath, getLocaleFromPath } from "@/lib/i18n";
import { loginSchema, registerSchema } from "@/lib/zod";
import { mockDb } from "@/mocks/in-memory-db";
import { User } from "@/types/access-control";
import { addSearchParams } from "@/utils/string-mapper";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function registerAction(data: User, currentPath?: string) {
  const parsed = registerSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.message };
  }

  const { login, password, fio } = parsed.data;

  const check = await mockDb.getUserByCredentials({ login, password });
  if (check) {
    return { success: false, error: "User already exists" };
  }

  const user = await mockDb.createUser({ login, password, fio });
  if (!user || !user.id) {
    return { success: false, error: "Failed to create user" };
  }

  (await cookies()).set({
    name: COOKIE_NAME.AuthToken,
    value: user.id, // Store the token, not the full user object
    httpOnly: true, // Client-side JS cannot access this cookie
    secure: process.env.NODE_ENV === "production",
    path: APP_ROUTING.home.build(),
    maxAge: 60 * 60 * 24, // 1 day
  });
  if (currentPath) revalidatePath(currentPath);

  return { success: true, user };
}

export async function loginAction(data: User, currentPath?: string) {
  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.message };
  }

  const { login, password } = parsed.data;
  const user = await mockDb.getUserByCredentials({ login, password });
  if (!user || !user.id) {
    return { success: false, error: "User not found" };
  }

  // 2. Set Cookie (Easy!)
  (await cookies()).set({
    name: COOKIE_NAME.AuthToken,
    value: user.id, // Store the token, not the full user object
    httpOnly: true, // Client-side JS cannot access this cookie
    secure: process.env.NODE_ENV === "production",
    path: APP_ROUTING.home.build(),
    maxAge: 60 * 60 * 24, // 1 day
  });

  // 3. Revalidate
  if (currentPath) {
    revalidatePath(currentPath);
  }

  // 4. Return serializable data for Zustand
  return { success: true, user };
}

export async function logoutAction(currentPath?: string) {
  // Destroy Cookie
  (await cookies()).delete(COOKIE_NAME.AuthToken);

  if (!currentPath) return;

  // Redirect or revalidate if path is provided
  if (isPrivatePath(currentPath)) {
    const locale = getLocaleFromPath(currentPath);
    const forbiddenPath = addLocaleToPath(
      APP_ROUTING.forbidden.build(),
      locale
    );
    const pathToRedirect = addSearchParams(forbiddenPath, {
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
  const user = await mockDb.getUserById(token);
  if (!user || !user.id) {
    return { success: false, error: "User not found" };
  }

  (await cookies()).set({
    name: COOKIE_NAME.AuthToken,
    value: user.id, // Store the token, not the full user object
    httpOnly: true, // Client-side JS cannot access this cookie
    secure: process.env.NODE_ENV === "production",
    path: APP_ROUTING.home.build(),
    maxAge: 60 * 60 * 24, // 1 day
  });

  return { success: true, user };
}

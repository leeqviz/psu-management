"use server";
import { CookieName } from "#types/cookies";
import { APP_ROUTING } from "@/constants/routing";
import { cookies } from "next/headers";

/**
 * A reusable Server Action to create or update a cookie.
 * @param name The name of the cookie (from our enum).
 * @param value The value to store.
 *A* @param options Optional settings like httpOnly, secure, maxAge.
 */
export async function setCookie(
  name: CookieName,
  value: string,
  options: {
    httpOnly?: boolean;
    secure?: boolean;
    maxAge?: number;
    expires?: Date;
  } = {}
) {
  const { httpOnly = true, secure = true, maxAge = 60 * 60 * 24 } = options;

  (await cookies()).set(name, value, {
    httpOnly,
    secure,
    maxAge, // 1 day by default
    path: APP_ROUTING.home.build(), // Make it available site-wide
    expires: options.expires,
  });
}

/**
 * A reusable Server Action to delete a cookie.
 * @param name The name of the cookie (from our enum).
 */
export async function deleteCookie(name: CookieName) {
  // Deleting a cookie is done by setting its value to empty
  // and its maxAge to 0.
  //(await cookies()).delete(name);
  (await cookies()).set(name, "", {
    maxAge: 0,
    path: APP_ROUTING.home.build(),
  });
}

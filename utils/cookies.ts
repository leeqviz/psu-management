"use server";
import { COOKIE_NAME } from "#constants/cookies";
// This is our server-side function to get the user from the cookie

import { userDataMock } from "#mocks/user";
import { CookieName } from "#types/cookies";
import { User } from "@/types/access-control";
import { cookies } from "next/headers";

export async function getAuthUser(): Promise<User | null> {
  const sessionCookie = (await cookies()).get(COOKIE_NAME.AuthToken);
  if (!sessionCookie?.value) return null;

  // In a real app, you'd verify the token and fetch the user
  // const user = await verifyTokenAndGetUser(sessionCookie.value);
  // For this demo, we'll return a mock user if the cookie exists
  return userDataMock;
}

// --- REUSABLE "WRITE" FUNCTIONS (SERVER ACTIONS) ---

/**
 * A reusable Server Action to create or update a cookie.
 * @param name The name of the cookie (from our enum).
 * @param value The value to store.
 *A* @param options Optional settings like httpOnly, secure, maxAge.
 */
export async function setCookie(
  name: CookieName,
  value: string,
  options: { httpOnly?: boolean; secure?: boolean; maxAge?: number } = {}
) {
  const { httpOnly = true, secure = true, maxAge = 60 * 60 * 24 } = options;

  (await cookies()).set(name, value, {
    httpOnly,
    secure,
    maxAge, // 1 day by default
    path: "/", // Make it available site-wide
  });
}

/**
 * A reusable Server Action to delete a cookie.
 * @param name The name of the cookie (from our enum).
 */
export async function deleteCookie(name: CookieName) {
  // Deleting a cookie is done by setting its value to empty
  // and its maxAge to 0.
  (await cookies()).set(name, "", {
    maxAge: 0,
    path: "/",
  });
}

// --- REUSABLE "READ" FUNCTIONS ---

/**
 * A reusable function to get a cookie's value.
 * This can be called from Server Component or Route Handler.
 * @param name The name of the cookie (from our enum).
 */
export async function getCookie(name: CookieName) {
  return (await cookies()).get(name);
}

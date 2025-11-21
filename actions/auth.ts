"use server";

import { COOKIE_NAME } from "@/constants/cookies";
import { userDataMock, userTokenMock } from "@/mocks/user";
import { User } from "@/types/access-control";
import { revalidatePath } from "next/cache"; // or redirect
import { cookies } from "next/headers";

export async function loginAction(user: User) {
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
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  // 3. Revalidate
  // This tells the Client Router: "The data on the page changed, update Server Components now."
  // This REPLACES your manual router.refresh()
  revalidatePath("/");

  // 4. Return serializable data for Zustand
  return { success: true, user: userDataMock };
}

export async function logoutAction() {
  // 1. Destroy Cookie
  (await cookies()).delete(COOKIE_NAME.AuthToken);

  // 2. Revalidate to clear cached user data from Server Components
  revalidatePath("/");

  // 3. Redirect (optional, or handle in client)
  // redirect('/login');
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
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return { success: true, user: userDataMock };
}

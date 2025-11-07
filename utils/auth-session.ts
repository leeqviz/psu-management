"use server";
// This is our server-side function to get the user from the cookie

import { userDataMock } from "@/mocks/user";
import { User } from "@/types/accessControl";
import { cookies } from "next/headers";

// (This is from our previous example)
export async function getAuthSession(): Promise<User | null> {
  const sessionCookie = (await cookies()).get("session");
  if (!sessionCookie?.value) return null;

  // In a real app, you'd verify the token and fetch the user
  // const user = await verifyTokenAndGetUser(sessionCookie.value);
  // For this demo, we'll return a mock user if the cookie exists
  return userDataMock;
}

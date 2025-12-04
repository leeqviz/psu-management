import { COOKIE_NAME } from "@/constants/cookies";
import { mockDb } from "@/mocks/in-memory-db";
import { User } from "@/types/access-control";
import { cookies } from "next/headers";
import "server-only";

export async function getCurrentUser(): Promise<User | undefined> {
  const token = (await cookies()).get(COOKIE_NAME.AuthToken)?.value;
  if (!token) return;

  // In a real app, you'd verify the token and fetch the user
  // const user = await verifyTokenAndGetUser(sessionCookie.value);
  // For this demo, we'll return a mock user if the cookie exists
  const user = await mockDb.getUserById(token);
  if (!user) return;

  return user;
}

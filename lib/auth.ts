import { COOKIE_NAME } from "@/constants/cookies";
import { userDataMock } from "@/mocks/user";
import { User } from "@/types/access-control";
import { cookies } from "next/headers";
import "server-only";

export async function getCurrentUser(): Promise<User | null> {
  const token = (await cookies()).get(COOKIE_NAME.AuthToken)?.value;
  if (!token) return null;

  // In a real app, you'd verify the token and fetch the user
  // const user = await verifyTokenAndGetUser(sessionCookie.value);
  // For this demo, we'll return a mock user if the cookie exists
  return userDataMock;
}

import { COOKIE_NAME } from "@/constants/cookies";
import { PROTECTED_ROUTE_PATHS } from "@/constants/routing";
import { userDataMock } from "@/mocks/user";
import { User } from "@/types/access-control";
import { cookies } from "next/headers";
import "server-only";
import { getLocaleFromPath, removeLocaleFromPath } from "./i18n/utils";

export async function getCurrentUser(): Promise<User | null> {
  const token = (await cookies()).get(COOKIE_NAME.AuthToken)?.value;
  if (!token) return null;

  // In a real app, you'd verify the token and fetch the user
  // const user = await verifyTokenAndGetUser(sessionCookie.value);
  // For this demo, we'll return a mock user if the cookie exists
  return userDataMock;
}

export function isProtectedRoute(pathname: string): boolean {
  const currentLocale = getLocaleFromPath(pathname);

  let newPath = pathname;
  if (currentLocale) {
    newPath = removeLocaleFromPath(pathname, currentLocale);
  }

  newPath = newPath === "/" ? "" : newPath.slice(1); // Remove leading slash for comparison
  return PROTECTED_ROUTE_PATHS.some((path) => {
    return newPath === path || newPath.startsWith(`${path}/`);
  });
}

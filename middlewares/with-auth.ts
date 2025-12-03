import { COOKIE_NAME } from "@/constants/cookies";
import { RoutePathPart } from "@/constants/routing";
import { isProtectedPath } from "@/lib/auth";
import { addLocaleToPath, getLocaleFromPath } from "@/lib/i18n";
import type { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function withAuth(next: NextMiddleware): NextMiddleware {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    console.log("We accessed the path: " + pathname);
    const token = request.cookies.get(COOKIE_NAME.AuthToken)?.value;

    const locale = getLocaleFromPath(pathname);

    // 1. Define protected routes
    // (Adjust this regex to match your actual protected paths)
    if (isProtectedPath(pathname)) {
      // 2. Check Token
      if (!token) {
        const forbiddenPath = addLocaleToPath(
          `/${RoutePathPart.Forbidden}?callbackUrl=${encodeURIComponent(
            pathname
          )}`,
          locale
        );
        const url = new URL(forbiddenPath, request.url);
        return NextResponse.redirect(url);
      }
    } else {
      if (token) {
        const loginPath = addLocaleToPath(`/${RoutePathPart.Login}`, locale);
        if (pathname.startsWith(loginPath)) {
          // If logged in user tries to access login page, redirect to home
          const url = new URL("/", request.url);
          return NextResponse.redirect(url);
        }
      }
    }

    // 3. If not protected or token exists, continue the chain
    return next(request, event);
  };
}

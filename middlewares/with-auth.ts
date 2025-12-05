import { COOKIE_NAME } from "@/constants/cookies";
import { APP_ROUTING } from "@/constants/routing";
import { isPrivatePath } from "@/lib/auth";
import { addLocaleToPath, getLocaleFromPath } from "@/lib/i18n";
import { appendQueryParams } from "@/utils/string-mapper";
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
    if (isPrivatePath(pathname)) {
      // 2. Check Token
      if (!token) {
        const forbiddenPath = addLocaleToPath(
          APP_ROUTING.forbidden.path,
          locale
        );
        const pathToRedirect = appendQueryParams(forbiddenPath, {
          callbackUrl: pathname,
        });
        const url = new URL(pathToRedirect, request.url);
        return NextResponse.redirect(url);
      }
    } else {
      if (token) {
        const loginPath = addLocaleToPath(APP_ROUTING.login.path, locale);
        if (pathname.startsWith(loginPath)) {
          // If logged in user tries to access login page, redirect to home
          const url = new URL(APP_ROUTING.home.path, request.url);
          return NextResponse.redirect(url);
        }
      }
    }

    // 3. If not protected or token exists, continue the chain
    return next(request, event);
  };
}

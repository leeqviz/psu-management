import { COOKIE_NAME } from "@/constants/cookies";
import type { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function withAuth(next: NextMiddleware): NextMiddleware {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;

    // 1. Define protected routes
    // (Adjust this regex to match your actual protected paths)
    if (
      ["/users", "/todos", "/settings"].some((path) => pathname.includes(path))
    ) {
      const token = request.cookies.get(COOKIE_NAME.AuthToken)?.value;

      // 2. Check Token
      if (!token) {
        const url = new URL("/login", request.url);
        // Optional: Save the URL they were trying to visit to redirect back later
        url.searchParams.set("callbackUrl", encodeURI(pathname));

        return NextResponse.redirect(url);
      }
    }
    console.log("withAuth middleware executed for:", request.url);

    // 3. If not protected or token exists, continue the chain
    return next(request, _next);
  };
}

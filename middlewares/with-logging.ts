import type { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";

export function withLogging(next: NextMiddleware): NextMiddleware {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;

    // 1. Define protected routes
    // (Adjust this regex to match your actual protected paths)
    console.log("Route accessed: " + pathname);

    // 3. If not protected or token exists, continue the chain
    return next(request, _next);
  };
}

import type { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";

export function withLogger(next: NextMiddleware): NextMiddleware {
  return async (request: NextRequest, event: NextFetchEvent) => {
    console.log("Log for: " + request.nextUrl.pathname);
    return next(request, event);
  };
}

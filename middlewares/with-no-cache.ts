import {
  NextResponse,
  type NextFetchEvent,
  type NextMiddleware,
  type NextRequest,
} from "next/server";

export function withNoCache(next: NextMiddleware): NextMiddleware {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const response = NextResponse.next();
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );

    return next(request, _next);
  };
}

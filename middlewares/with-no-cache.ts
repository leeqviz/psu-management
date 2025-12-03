import {
  type NextFetchEvent,
  type NextMiddleware,
  type NextRequest,
} from "next/server";

export function withNoCache(next: NextMiddleware): NextMiddleware {
  return async (request: NextRequest, event: NextFetchEvent) => {
    console.log("We are adding no-cache to: " + request.nextUrl.pathname);
    // on request
    request.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    // proceed to next middleware or handler
    const response = await next(request, event);
    // on response
    if (response) {
      response.headers.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate"
      );
    }

    return response;
  };
}

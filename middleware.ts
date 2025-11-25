import {
  chainMiddlewares,
  withAuth,
  withI18n,
  withLogging,
  withNoCache,
  withRateLimit,
} from "./middlewares";

export const config = {
  matcher: [
    //"/((?!api|static|.*\\..*|_next).*)",
    // This regex excludes:
    // 1. /api/ (API routes)
    // 2. /_next/static/ (static files)
    // 3. /_next/image/ (image optimization files)
    // 4. Any path that contains a dot (e.g., .png, .ico, .json, .svg)
    //"/((?!api|_next/static|_next/image|.*\\.[^/?]+$).*)",
    "/((?!api|static|.*\\..*|_next).*)",
  ],
};

export default chainMiddlewares([
  withLogging,
  withRateLimit,
  withNoCache,
  withAuth,
  withI18n,
]);

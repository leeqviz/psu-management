import { stackMiddlewares, withAuth, withI18n } from "./middlewares";

//response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
export const config = {
  matcher: [
    //"/((?!api|static|.*\\..*|_next).*)",
    // This regex excludes:
    // 1. /api/ (API routes)
    // 2. /_next/static/ (static files)
    // 3. /_next/image/ (image optimization files)
    // 4. Any path that contains a dot (e.g., .png, .ico, .json, .svg)
    "/((?!api|_next/static|_next/image|.*\\.[^/?]+$).*)",
  ],
};

export default stackMiddlewares([withAuth, withI18n]);

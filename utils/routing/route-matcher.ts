import { ALL_ROUTES } from "@/constants/routing";
import { RouteConfig } from "@/types/routing";

/**
 * CACHE:
 * We convert the route patterns to Regex once and store them.
 * This prevents re-compiling Regex on every single request.
 */
const routesCache: Array<{
  route: RouteConfig;
  regex: RegExp;
  isDynamic: boolean;
}> = [];

/**
 * INITIALIZATION:
 * Prepare the routes by sorting them and generating Regex patterns.
 */
function initializeRouteCache() {
  if (routesCache.length > 0) return; // Already initialized

  // 1. SORTING PRIORITY
  // We must check specific static paths (e.g., /users/settings)
  // BEFORE dynamic paths (e.g., /users/[id]).
  ALL_ROUTES.sort((a, b) => {
    const aIsDynamic = a.path.includes("[");
    const bIsDynamic = b.path.includes("[");

    // Static paths always come first
    if (aIsDynamic && !bIsDynamic) return 1;
    if (!aIsDynamic && bIsDynamic) return -1;

    // If both are same type, deeper/longer paths come first
    // e.g. /users/[id]/settings > /users/[id]
    return b.path.length - a.path.length;
  });

  // 2. REGEX GENERATION
  ALL_ROUTES.forEach((route) => {
    // Escape forward slashes
    let pattern = route.path.replace(/\//g, "\\/");

    // Replace Next.js dynamic params [id] with Regex Capture Groups ([^/]+)
    // This matches any character EXCEPT a forward slash
    pattern = pattern.replace(/\[.*?\]/g, "([^/]+)");

    // Handle Catch-all segments [...slug] if you use them
    // pattern = pattern.replace(/\[\.\.\..*?\]/g, '(.*)');

    routesCache.push({
      route,
      isDynamic: route.path.includes("["),
      // Create a strict match from start (^) to end ($)
      regex: new RegExp(`^${pattern}$`),
    });
  });
}

/**
 * THE MATCHER FUNCTION
 * Takes a URL pathname and returns the matching Route Config Object
 */
export function matchRoute(path: string) {
  // Ensure cache is built (runs once)
  initializeRouteCache();

  // Find the first matching route (respecting the sort order)
  const match = routesCache.find((item) => {
    // Fast path: Exact string match for static routes
    if (!item.isDynamic) {
      return item.route.path === path;
    }

    // Slow path: Regex match for dynamic routes
    return item.regex.test(path);
  });

  return match ? match.route : null;
}

export function matchRouteWithParams(path: string) {
  initializeRouteCache();

  for (const item of routesCache) {
    const match = path.match(item.regex);
    if (match) {
      return {
        route: item.route,
        // The first match is the full string, subsequent matches are groups
        params: match.slice(1),
      };
    }
  }
  return null;
}

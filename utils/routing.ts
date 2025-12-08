// src/utils/routeMatcher.ts

import { ALL_ROUTES } from "@/constants/routing";
import {
  RouteBuildFn,
  RouteConfig,
  UrlParams,
  UrlSearchParams,
} from "@/types/routing";
import { z } from "zod";

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

export type RouteOptions<P extends z.ZodType, S extends z.ZodType> =
  // INHERITANCE
  // Inherit everything from AppRoute (schemas, label, icon, roles, etc.)
  // EXCEPT:
  // - 'build': Because in options, it is optional (the override), not required.
  // - 'isPrivate': Because in options, it is optional (defaults to false).
  Omit<RouteConfig<P, S>, "build"> & {
    // OVERRIDE
    // Optional custom build function.
    // If provided, it MUST match the strict signature enforced by the schemas.
    build?: RouteBuildFn<P, S>;
  };

interface BuildArgs {
  params?: UrlParams;
  searchParams?: UrlSearchParams;
}
/**
 * Factory function to create a fully typed AppRoute.
 * Automatically generates the 'build' function based on schemas.
 */
export function createRoute<
  P extends z.ZodType = z.ZodVoid, // Default to void if no params
  S extends z.ZodType = z.ZodVoid // Default to void if no search
>(options: RouteOptions<P, S>): RouteConfig<P, S> {
  const {
    path,
    paramsSchema,
    searchParamsSchema,
    build: customBuild,
    ...rest
  } = options;

  // The Magic Build Function
  const generatedBuild = (args: BuildArgs = {}) => {
    let url = path;
    const { params, searchParams } = args;

    // 1. Replace Path Params (e.g., [id] -> 123)
    if (params && paramsSchema) {
      // Validate inputs strictly before building URL (Optional safety layer)
      // const safeParams = paramsSchema.parse(params);

      Object.entries(params as UrlParams).forEach(([key, value]) => {
        url = url.replace(`[${key}]`, String(value));
      });
    }

    // 2. Append Search Params (e.g., ?page=1)
    if (searchParams && searchParamsSchema) {
      const urlSearchParams = new URLSearchParams();

      Object.entries(searchParams as UrlSearchParams).forEach(
        ([key, value]) => {
          if (value === undefined || value === null || value === "") return;

          if (Array.isArray(value)) {
            value.forEach((v) => urlSearchParams.append(key, String(v)));
          } else if (typeof value === "object") {
            urlSearchParams.set(key, JSON.stringify(value));
          } else {
            urlSearchParams.set(key, String(value));
          }
        }
      );

      const queryString = urlSearchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    return url;
  };

  return {
    path,
    paramsSchema,
    searchParamsSchema,
    ...rest,
    build: customBuild || generatedBuild,
  };
}

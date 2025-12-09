// src/utils/routeMatcher.ts

import {
  RouteBuildFn,
  RouteConfig,
  UrlParams,
  UrlSearchParams,
} from "@/types/routing";
import { z } from "zod";

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

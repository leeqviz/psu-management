// src/hooks/useRouteParams.ts
import { RouteConfig } from "@/types/routing";
import { notFound, useParams } from "next/navigation";
import { z } from "zod";

/**
 * A hook that strictly validates URL parameters against the Route Config.
 * If validation fails, it automatically triggers a Next.js 404 (notFound).
 */
export function useParsedParams<T extends z.ZodType>(
  route: RouteConfig<T>
): z.infer<T> {
  // 1. Get raw params from Next.js (returns generic string object)
  const rawParams = useParams();

  // 2. If route has no schema, return empty (or raw)
  if (!route.paramsSchema) {
    return rawParams as z.infer<T>;
  }

  // 3. Validate
  const result = route.paramsSchema.safeParse(rawParams);

  // 4. Handle Failure (Fail Fast)
  if (!result.success) {
    /* console.error(
      `Route Param Validation Failed for ${route.path}:`,
      result.error
    ); */
    // If the URL params don't match the schema, the page doesn't exist.
    notFound();
  }

  // 5. Return typed data
  return result.data;
}

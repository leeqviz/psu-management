/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouteConfig } from "@/types/routing";
import { useSearchParams } from "next/navigation";
import { z } from "zod";

export function useParsedSearchParams<T extends z.ZodType>(
  route: RouteConfig<any, T>
): z.infer<T> {
  const searchParams = useSearchParams();

  if (!route.searchParamsSchema) {
    return {} as z.infer<T>;
  }

  // 1. Convert ReadonlyURLSearchParams to a plain object
  const rawParams: Record<string, any> = {};
  searchParams.forEach((value, key) => {
    // Handle arrays if needed (e.g. ?tags=a&tags=b)
    if (key in rawParams) {
      if (!Array.isArray(rawParams[key])) {
        rawParams[key] = [rawParams[key]];
      }
      rawParams[key].push(value);
    } else {
      rawParams[key] = value;
    }
  });

  // 2. Validate using Zod (Safe Parse)
  const result = route.searchParamsSchema.safeParse(rawParams);

  if (result.success) {
    return result.data;
  }

  // 3. Graceful Fallback
  // If validation fails (rare, because we used .catch),
  // return a default structure or empty object so the UI doesn't crash.
  console.warn("Invalid Query Params:", result.error);
  return {} as z.infer<T>;
}

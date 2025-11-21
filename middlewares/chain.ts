import { NextMiddleware, NextResponse } from "next/server";

export function stackMiddlewares(
  functions: ((middleware: NextMiddleware) => NextMiddleware)[] = [],
  index = 0
): NextMiddleware {
  const current = functions[index];

  if (current) {
    const next = stackMiddlewares(functions, index + 1);
    return current(next);
  }

  console.log("All middlewares executed.");
  // Default fallback if no middleware handles the request
  return () => NextResponse.next();
}

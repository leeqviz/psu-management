import { i18nConfig } from "@/lib/i18n/utils";
import { i18nRouter } from "next-i18n-router";
import type { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";

export function withI18n(next: NextMiddleware): NextMiddleware {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    // 1. Run the i18n router logic
    // This function handles language detection and URL rewrites
    const response = i18nRouter(request, i18nConfig);
    console.log("withI18n middleware executed for:", request.url);

    // 2. Return the response
    // Since i18nRouter returns a response (rewrite or redirect),
    // we usually return it directly and end the chain here.
    return response;
  };
}

import { RouteConfig } from "@/types/routing";
import { renderHook } from "@testing-library/react";
import { notFound } from "next/navigation";
import { z } from "zod";
import { useParsedParams } from "../use-parsed-params";

// 1. Mock Next.js navigation
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  notFound: jest.fn(), // We want to spy on this
}));

// 2. Define a Test Route Config on the fly to isolate logic
const TEST_ROUTE: RouteConfig = createRoute({
  path: "/test/[id]",
  isPrivate: false,
  // Expect a number
  paramsSchema: z.object({
    id: z.coerce.number(),
  }),
});

import { createRoute } from "@/utils/routing";
import { useParams } from "next/navigation";

describe("useParsedParams Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns parsed data when params are valid", () => {
    // Mock URL params as string (what Next.js returns)
    (useParams as jest.Mock).mockReturnValue({ id: "123" });

    const { result } = renderHook(() => useParsedParams(TEST_ROUTE));

    // Should return number 123 (coerced)
    expect(result.current).toEqual({ id: 123 });
    expect(notFound).not.toHaveBeenCalled();
  });

  it("calls notFound() when params are invalid", () => {
    // Mock invalid param (string "apple" cannot be coerced to number)
    (useParams as jest.Mock).mockReturnValue({ id: "apple" });

    renderHook(() => useParsedParams(TEST_ROUTE));

    expect(notFound).toHaveBeenCalled();
  });

  it("returns raw params if route has no schema", () => {
    const NO_SCHEMA_ROUTE = { ...TEST_ROUTE, paramsSchema: undefined };
    (useParams as jest.Mock).mockReturnValue({ id: "any-string" });

    const { result } = renderHook(() => useParsedParams(NO_SCHEMA_ROUTE));

    expect(result.current).toEqual({ id: "any-string" });
  });
});

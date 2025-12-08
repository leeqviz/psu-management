import { RouteConfig } from "@/types/routing";
import { renderHook } from "@testing-library/react";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { useParsedSearchParams } from "../use-parsed-search-params";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

// Test Route with Query Schema
const QUERY_ROUTE: RouteConfig = {
  path: "/list",
  isPrivate: false,
  build: () => "/list",
  searchParamsSchema: z.object({
    page: z.coerce.number().default(1),
    tags: z.union([z.string(), z.array(z.string())]).optional(),
  }),
};

describe("useParsedSearchParams Hook", () => {
  it("parses and coerces valid params", () => {
    // Mock Next.js ReadonlyURLSearchParams
    const mockMap = new Map([["page", "5"]]);
    (useSearchParams as jest.Mock).mockReturnValue({
      forEach: (cb: any) => mockMap.forEach(cb),
    });

    const { result } = renderHook(() => useParsedSearchParams(QUERY_ROUTE));

    expect(result.current).toEqual({ page: 5 });
  });

  it("handles array parameters (duplicate keys)", () => {
    // Simulate ?tags=react&tags=vue
    const mockEntries = [
      ["tags", "react"],
      ["tags", "vue"],
    ];
    (useSearchParams as jest.Mock).mockReturnValue({
      forEach: (cb: (val: string, key: string) => void) => {
        mockEntries.forEach(([k, v]) => cb(v, k));
      },
    });

    const { result } = renderHook(() => useParsedSearchParams(QUERY_ROUTE));

    // Should detect array
    expect(result.current.tags).toEqual(["react", "vue"]);
  });

  it("uses default values when params are missing/invalid", () => {
    // Empty map
    (useSearchParams as jest.Mock).mockReturnValue({
      forEach: () => {},
    });

    const { result } = renderHook(() => useParsedSearchParams(QUERY_ROUTE));

    // Should fall back to default(1)
    expect(result.current.page).toBe(1);
  });
});

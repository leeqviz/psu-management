// 1. Define specific test scenarios to cover all logic branches
// We use 'as const' to ensure deep immutability for the test data

// 2. Mock the configuration module
// This intercepts the import inside routeMatcher.ts
jest.mock("@/constants/routing", () => ({
  ALL_ROUTES: Object.values(mockRoutes),
}));
import { mockRoutes } from "@/mocks/test-routes";
import { matchRoute, matchRouteWithParams } from "../routing";

describe("Route Matcher", () => {
  // Optional: Reset internal cache if your matcher keeps state
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --- TESTS ---

  it("matches the root path", () => {
    expect(matchRoute("/")).toBe(mockRoutes.HOME);
  });

  it("matches a dynamic path", () => {
    // Logic: The matcher converts "/users/[id]" -> Regex -> Matches "/users/123"
    expect(matchRoute("/users/123")).toBe(mockRoutes.USER_DETAILS);
  });

  it("Correctly prioritizes Static Routes over Dynamic Routes", () => {
    // Even though /users/settings technically fits the /users/[id] pattern,
    // the matcher must prioritize the exact static string.
    expect(matchRoute("/users/settings")).toBe(mockRoutes.USER_SETTINGS);
  });

  it("Correctly prioritizes Deep paths over Shallow paths", () => {
    // /users/123/edit fits /users/[id] (technically), but is more specific.
    expect(matchRoute("/users/123/edit")).toBe(mockRoutes.USER_EDIT);
  });

  // --- PARAM EXTRACTION TESTS ---

  it("extracts parameters from dynamic routes", () => {
    const result = matchRouteWithParams("/org/google/inv/999");

    expect(result?.route).toBe(mockRoutes.INVOICE);
    // The matcher extracts string segments regardless of Zod types
    expect(result?.params).toEqual(["google", "999"]);
  });
});

import { appRoutingMock } from "@/mocks/routing";
import { matchRoute, matchRouteWithParams } from "../routing";

// 1. Define specific test scenarios to cover all logic branches
// We use 'as const' to ensure deep immutability for the test data

// 2. Mock the configuration module
// This intercepts the import inside routeMatcher.ts
jest.mock("@/constants/routing", () => ({
  APP_ROUTING: appRoutingMock,
}));

describe("Route Matcher Utility", () => {
  // We don't need beforeEach/afterEach because the cache logic
  // in your utility is designed to be built once.
  // Since we mocked the module, it will build based on appRoutingMock.

  describe("matchRoute", () => {
    it("matches the root path", () => {
      const result = matchRoute("/");
      expect(result).toBe(appRoutingMock.HOME);
    });

    it("matches a simple static path", () => {
      const result = matchRoute("/dashboard");
      expect(result).toBe(appRoutingMock.DASHBOARD);
    });

    it("returns null for unknown paths", () => {
      const result = matchRoute("/unknown/path");
      expect(result).toBeNull();
    });

    it("matches a dynamic path", () => {
      const result = matchRoute("/users/123");
      expect(result).toBe(appRoutingMock.USER_DETAILS);
    });

    // CRITICAL: Priority Test
    it("prioritizes specific static paths over dynamic paths (Sort Logic)", () => {
      // /users/settings fits the pattern /users/[id] (where id="settings")
      // But it should match the explicit USER_SETTINGS route.
      const result = matchRoute("/users/settings");
      expect(result).toBe(appRoutingMock.USER_SETTINGS);
    });

    // CRITICAL: Depth Test
    it("prioritizes longer/deeper paths over shorter dynamic parents", () => {
      // /users/123/edit starts with /users/123,
      // but should match the specific EDIT route, not DETAILS.
      const result = matchRoute("/users/123/edit");
      expect(result).toBe(appRoutingMock.USER_EDIT);
    });

    it("handles multiple dynamic parameters", () => {
      const result = matchRoute("/org/apple/invoice/inv_999");
      expect(result).toBe(appRoutingMock.INVOICE);
    });
  });

  describe("matchRouteWithParams", () => {
    it("extracts single parameter correctly", () => {
      const result = matchRouteWithParams("/users/888");

      expect(result).not.toBeNull();
      expect(result?.route).toBe(appRoutingMock.USER_DETAILS);
      expect(result?.params).toEqual(["888"]);
    });

    it("extracts multiple parameters in correct order", () => {
      const result = matchRouteWithParams("/org/google/invoice/inv_555");

      expect(result).not.toBeNull();
      expect(result?.route).toBe(appRoutingMock.INVOICE);
      // Order matters: [orgId, invId]
      expect(result?.params).toEqual(["google", "inv_555"]);
    });

    it("returns empty params array for static routes", () => {
      const result = matchRouteWithParams("/dashboard");

      expect(result).not.toBeNull();
      expect(result?.route).toBe(appRoutingMock.DASHBOARD);
      expect(result?.params).toEqual([]);
    });

    it("returns null for non-matching routes", () => {
      const result = matchRouteWithParams("/does/not/exist");
      expect(result).toBeNull();
    });
  });
});

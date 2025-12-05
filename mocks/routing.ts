import { RouteConfig } from "@/types/routing";

export const appRoutingMock = {
  // Simple Static
  HOME: { path: "/", private: false, build: () => "/" },

  // Nested Static
  DASHBOARD: { path: "/dashboard", private: true, build: () => "/dashboard" },

  // Conflict Case 1: Static sibling of a dynamic route
  // Should match this, NOT /users/[id]
  USER_SETTINGS: {
    path: "/users/settings",
    private: true,
    build: () => "/users/settings",
  },

  // Dynamic
  USER_DETAILS: {
    path: "/users/[id]",
    private: true,
    build: (id: string) => `/users/${id}`,
  },

  // Conflict Case 2: Deep nesting vs Parent
  // Should match this, NOT /users/[id]
  USER_EDIT: {
    path: "/users/[id]/edit",
    private: true,
    build: (id: string) => `/users/${id}/edit`,
  },

  // Multiple Parameters
  INVOICE: {
    path: "/org/[orgId]/invoice/[invId]",
    private: true,
    build: () => "",
  },
} as const satisfies Record<string, RouteConfig>;

import { RouteConfig } from "@/types/routing";
import { createRoute } from "@/utils/routing";
import z from "zod";

export const appRoutingMock = {
  LOGIN: createRoute({ path: "/login", isPrivate: false }),
  // Simple Static
  HOME: createRoute({ path: "/", isPrivate: false }),

  // Nested Static
  DASHBOARD: createRoute({ path: "/dashboard", isPrivate: true }),

  // Conflict Case 1: Static sibling of a dynamic route
  // Should match this, NOT /users/[id]
  USER_SETTINGS: createRoute({
    path: "/users/settings",
    isPrivate: true,
  }),

  // Dynamic
  USER_DETAILS: createRoute({
    path: "/users/[id]",
    isPrivate: true,

    // 1. Define the Schema
    // We expect 'id' to be a string that looks like a UUID (or just a number)
    paramsSchema: z.object({
      id: z.coerce.number(), // Automatically converts string "123" to number 123
    }),
  }),

  // Conflict Case 2: Deep nesting vs Parent
  // Should match this, NOT /users/[id]
  USER_EDIT: createRoute({
    path: "/users/[id]/edit",
    isPrivate: true,
  }),

  USER_LIST: createRoute({
    path: "/users",
    isPrivate: true,

    // Define the shape of your filters
    searchParamsSchema: z.object({
      // If ?page=abc, coerce to number, if fail, default to 1
      page: z.coerce.number().min(1).catch(1),

      // If ?sort=random, fallback to 'desc'
      sort: z.enum(["asc", "desc"]).catch("desc"),

      // Optional search string
      q: z.string().optional(),
    }),
  }),

  // Multiple Parameters
  INVOICE: createRoute({
    path: "/org/[orgId]/invoice/[invId]",
    isPrivate: true,
    build: () => "",
  }),

  INVOICE_EDIT: createRoute({
    path: "/invoices/[invoiceId]/versions/[version]",
    isPrivate: true,
    paramsSchema: z.object({
      invoiceId: z.string().min(5),
      version: z.coerce.number().int().positive(),
    }),
  }),
} as const satisfies Record<string, RouteConfig>;

export const ALL_ROUTES_MOCK = Object.values(appRoutingMock);

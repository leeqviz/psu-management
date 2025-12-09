/**
 * 1. DEFINE THE MOCK DATA
 * * NOTE: We do NOT use 'createRoute' or 'Zod' here.
 * We only simulate the *shape* of the object that 'createRoute' produces.
 * The matcher only needs 'path'.
 * We add 'build: jest.fn()' just to satisfy the AppRoute type definition.
 */
export const mockRoutes = {
  // 1. Static Route
  HOME: {
    path: "/",
    isPrivate: false,
    build: jest.fn(),
  },

  // 2. Static Nested
  DASHBOARD: {
    path: "/dashboard",
    isPrivate: true,
    build: jest.fn(),
  },

  // 3. The "Priority" Conflict Check
  // This needs to match BEFORE /users/[id]
  USER_SETTINGS: {
    path: "/users/settings",
    isPrivate: true,
    build: jest.fn(),
  },

  // 4. Dynamic Route (Simulating what createRoute produces)
  // We don't need paramsSchema here; the matcher uses regex on the path string.
  USER_DETAILS: {
    path: "/users/[id]",
    isPrivate: true,
    build: jest.fn(),
  },

  // 5. Deep Dynamic Route
  // Should match BEFORE /users/[id]
  USER_EDIT: {
    path: "/users/[id]/edit",
    isPrivate: true,
    build: jest.fn(),
  },

  // 6. Complex Route (Simulating Zod schemas without writing them)
  INVOICE: {
    path: "/org/[orgId]/inv/[invId]",
    isPrivate: true,
    build: jest.fn(),
  },
};

export const mockRoutesArray = Object.values(mockRoutes);

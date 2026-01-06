import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/client";

// Factory function
function createPrismaClient() {
  return new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    }),
  });
}

// globalThis object (Node.js's global scope).
// This object sits outside of the Next.js reload cycle, so it survives when files are refreshed
// We declare that prisma is a global variable
declare global {
  var prisma: ReturnType<typeof createPrismaClient> | undefined;
}

// Singleton to prevent multiple instances on HMR
// Reuse client instance on HMR if already created or create ones (first load)
export const prisma = global.prisma ?? createPrismaClient();

// For HMR in dev mode
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

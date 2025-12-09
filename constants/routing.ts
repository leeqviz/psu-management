import { RouteConfig } from "@/types/routing";
import { createRoute } from "@/utils/routing";
import z from "zod";

const pathPart = {
  //protected routes
  specialities: "specialities",
  students: "students",
  postgraduateStudents: "postgraduate-students",
  halfYearAttestation: "half-year-attestation",
  finalAttestation: "final-attestation",
  annualAttestation: "annual-attestation",
  individualPlan: "individual-plan",
  orders: "orders",
  handbooks: "handbooks",
  groups: "groups",
  foreignStudents: "foreign-students",
  companies: "companies",
  graduation: "graduation",
  admin: "admin",
  auditoriums: "auditoriums",

  //test routes
  users: "users",
  todos: "todos",
  posts: "posts",

  //public routes
  home: "",
  login: "login",
  register: "register",
  notFound: "not-found",
  unauthorized: "unauthorized",
  forbidden: "forbidden",
} as const;

/**
 * App routes without locale
 */
export const APP_ROUTING = {
  home: createRoute({
    path: `/${pathPart.home}`,
  }),
  login: createRoute({
    path: `/${pathPart.login}`,
    searchParamsSchema: z.object({
      callbackUrl: z.string().optional(),
    }),
  }),
  register: createRoute({
    path: `/${pathPart.register}`,
    searchParamsSchema: z.object({
      callbackUrl: z.string().optional(),
    }),
  }),
  notFound: createRoute({
    path: `/${pathPart.notFound}`,
    searchParamsSchema: z.object({
      callbackUrl: z.string().optional(),
    }),
  }),
  unauthorized: createRoute({
    path: `/${pathPart.unauthorized}`,
    searchParamsSchema: z.object({
      callbackUrl: z.string().optional(),
    }),
  }),
  forbidden: createRoute({
    path: `/${pathPart.forbidden}`,
    searchParamsSchema: z.object({
      callbackUrl: z.string().optional(),
    }),
  }),

  // protected routes
  students: createRoute({
    path: `/${pathPart.students}`,
    isPrivate: true,
  }),
  students_slug: createRoute({
    path: `/${pathPart.students}/[id]`,
    isPrivate: true,
    paramsSchema: z.object({ id: z.coerce.number() }),
  }),

  // test
  users: createRoute({
    path: `/${pathPart.users}`,
    isPrivate: true,
  }),
  users_slug: createRoute({
    path: `/${pathPart.users}/[id]`,
    isPrivate: true,
    paramsSchema: z.object({ id: z.coerce.number() }),
  }),
  todos: createRoute({
    path: `/${pathPart.todos}`,
    isPrivate: true,
  }),
  todos_slug: createRoute({
    path: `/${pathPart.todos}/[id]`,
    isPrivate: true,
    paramsSchema: z.object({ id: z.coerce.number() }),
  }),
  posts: createRoute({
    path: `/${pathPart.posts}`,
    isPrivate: true,
  }),
  posts_slug: createRoute({
    path: `/${pathPart.posts}/[id]`,
    isPrivate: true,
    paramsSchema: z.object({ id: z.coerce.number() }),
  }),
} as const satisfies Record<string, RouteConfig>;

export const ALL_ROUTES: RouteConfig[] = Object.values(APP_ROUTING);
export const PRIVATE_ROUTES = ALL_ROUTES.filter((e) => e.isPrivate);
export const PUBLIC_ROUTES = ALL_ROUTES.filter((e) => !e.isPrivate);
export const HIDDEN_ROUTES = ALL_ROUTES.filter((e) => e.isHidden);
export const AVAILABLE_ROUTES = ALL_ROUTES.filter((e) => !e.isHidden);

import { RouteConfig } from "@/types/routing";

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
  home: {
    path: `/${pathPart.home}`,
  },
  login: {
    path: `/${pathPart.login}`,
  },
  register: {
    path: `/${pathPart.register}`,
  },
  notFound: {
    path: `/${pathPart.notFound}`,
  },
  unauthorized: {
    path: `/${pathPart.unauthorized}`,
  },
  forbidden: {
    path: `/${pathPart.forbidden}`,
  },

  // protected routes
  students: {
    path: `/${pathPart.students}`,
    private: true,
  },
  students_slug: {
    path: `/${pathPart.students}/[id]`,
    build: (id) => `/${pathPart.students}/${id}`,
    private: true,
  },

  // test
  users: {
    path: `/${pathPart.users}`,
    private: true,
  },
  users_slug: {
    path: `/${pathPart.users}/[id]`,
    build: (id) => `/${pathPart.users}/${id}`,
    private: true,
  },
  todos: {
    path: `/${pathPart.todos}`,
    private: true,
  },
  todos_slug: {
    path: `/${pathPart.todos}/[id]`,
    build: (id) => `/${pathPart.todos}/${id}`,
    private: true,
  },
  posts: {
    path: `/${pathPart.posts}`,
    private: true,
  },
  posts_slug: {
    path: `/${pathPart.posts}/[id]`,
    build: (id) => `/${pathPart.posts}/${id}`,
    private: true,
  },
} as const satisfies Record<string, RouteConfig>;

export const ALL_ROUTES: RouteConfig[] = Object.values(APP_ROUTING);
export const PRIVATE_ROUTES = ALL_ROUTES.filter((e) => e.private);
export const PUBLIC_ROUTES = ALL_ROUTES.filter((e) => !e.private);
export const HIDDEN_ROUTES = ALL_ROUTES.filter((e) => e.hidden);
export const AVAILABLE_ROUTES = ALL_ROUTES.filter((e) => !e.hidden);
export const DYNAMIC_ROUTES = ALL_ROUTES.filter((e) => e.build);
export const STATIC_ROUTES = ALL_ROUTES.filter((e) => !e.build);

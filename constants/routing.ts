export const RoutePathPart = {
  //protected routes
  Specialities: "specialities",
  Students: "students",
  PostgraduateStudents: "postgraduate-students",
  HalfYearAttestation: "half-year-attestation",
  FinalAttestation: "final-attestation",
  AnnualAttestation: "annual-attestation",
  IndividualPlan: "individual-plan",
  Orders: "orders",
  Handbooks: "handbooks",
  Groups: "groups",
  ForeignStudents: "foreign-students",
  Companies: "companies",
  Graduation: "graduation",
  Admin: "admin",
  Auditoriums: "auditoriums",

  //test routes
  Users: "users",
  Todos: "todos",
  Posts: "posts",
  Settings: "settings",

  //public routes
  Home: "",
  Login: "login",
  Register: "register",
  ResetPassword: "reset-password",
  ForgotPassword: "forgot-password",
  NotFound: "not-found",
  Unauthorized: "unauthorized",
  Forbidden: "forbidden",
} as const;

export const routingManifest = {
  //public paths
  public: {
    home: "/",
    login: `/${RoutePathPart.Login}`,
    register: `/${RoutePathPart.Register}`,
    resetPassword: `/${RoutePathPart.ResetPassword}`,
    forgotPassword: `/${RoutePathPart.ForgotPassword}`,
    notFound: `/${RoutePathPart.NotFound}`,
    unauthorized: `/${RoutePathPart.Unauthorized}`,
    forbidden: `/${RoutePathPart.Forbidden}`,
  },
  private: {
    //test paths
    users: `/${RoutePathPart.Users}`,
    usersSlug: (slug: string) => `/${RoutePathPart.Users}/${slug}`,
    todos: `/${RoutePathPart.Todos}`,
    posts: `/${RoutePathPart.Posts}`,
    postsSlug: (slug: string) => `/${RoutePathPart.Posts}/${slug}`,
    settings: `/${RoutePathPart.Settings}`,

    //protected paths
    students: `/${RoutePathPart.Students}`,
  },
} as const;

export const PRIVATE_PATHS = Array.from(
  Object.entries(routingManifest.private),
  ([_, value]) => value
).filter((e) => typeof e === "string");

export const PUBLIC_PATHS = Array.from(
  Object.entries(routingManifest.public),
  ([_, value]) => value
).filter((e) => typeof e === "string");

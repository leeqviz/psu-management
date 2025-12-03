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

export const PUBLIC_ROUTE_PATHS = [
  RoutePathPart.Home,
  RoutePathPart.Login,
  RoutePathPart.Register,
  RoutePathPart.NotFound,
  RoutePathPart.Forbidden,
  RoutePathPart.Unauthorized,
  RoutePathPart.ResetPassword,
  RoutePathPart.ForgotPassword,
];

export const PROTECTED_ROUTE_PATHS = [
  RoutePathPart.Users,
  RoutePathPart.Todos,
  RoutePathPart.Settings,
  RoutePathPart.Posts,

  RoutePathPart.Specialities,
  RoutePathPart.Students,
  RoutePathPart.PostgraduateStudents,
  RoutePathPart.HalfYearAttestation,
  RoutePathPart.FinalAttestation,
  RoutePathPart.AnnualAttestation,
  RoutePathPart.IndividualPlan,
  RoutePathPart.Orders,
  RoutePathPart.Handbooks,
  RoutePathPart.Groups,
  RoutePathPart.ForeignStudents,
  RoutePathPart.Companies,
  RoutePathPart.Graduation,
  RoutePathPart.Admin,
  RoutePathPart.Auditoriums,
];

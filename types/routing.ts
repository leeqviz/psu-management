export interface RouteConfig {
  path: string; // path representation (dynamic path must be wrapped into [])
  build?: (...args: string[]) => string; // path builder usually for dynamic routes
  private?: boolean; // private route. Redirects to login if not logged in
  roles?: string[]; // roles required to access
  hidden?: boolean; // hidden from redirecting or unavailable
  title?: (...args: string[]) => string; // title of the page with arguments
  icon?: string; // icon of the page
  sitemap?: {
    // sitemap options
    priority?: number;
    changefreq?:
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never";
    exclude?: boolean;
  };
}

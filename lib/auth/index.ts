import { matchRoute } from "@/utils/routing";
import { removeLocaleFromPath } from "../i18n";

export function isPrivatePath(path: string): boolean {
  const newPath = removeLocaleFromPath(path);
  const match = matchRoute(newPath);

  return match?.private ?? false;
  // this approach does not work for dynamic router
  /* return privateRoutes.some((route) => {
    return (
      newPath === route.path || // Exact match
      newPath.startsWith(`/${route.path}/`) || // Detect nested routes
      newPath.startsWith(`/${route.path}?`) // Detect route with query parameters
    );
  }); */
}

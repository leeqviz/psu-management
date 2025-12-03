import { PROTECTED_ROUTE_PATHS } from "@/constants/routing";
import { removeLocaleFromPath } from "../i18n";

export function isProtectedPath(path: string): boolean {
  let newPath = removeLocaleFromPath(path);
  newPath = newPath === "/" ? "" : newPath.slice(1); // Remove leading slash for comparison
  return PROTECTED_ROUTE_PATHS.some((path) => {
    return (
      newPath === path || // Exact match
      newPath.startsWith(`${path}/`) || // Detect nested routes
      newPath.startsWith(`${path}?`) // Detect route with query parameters
    );
  });
}

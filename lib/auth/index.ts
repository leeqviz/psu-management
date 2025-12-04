import { PRIVATE_PATHS } from "@/constants/routing";
import { removeLocaleFromPath } from "../i18n";

export function isPrivatePath(path: string): boolean {
  const newPath = removeLocaleFromPath(path);
  return PRIVATE_PATHS.some((path) => {
    return (
      newPath === path || // Exact match
      newPath.startsWith(`/${path}/`) || // Detect nested routes
      newPath.startsWith(`/${path}?`) // Detect route with query parameters
    );
  });
}

import { matchRoute } from "@/utils/routing";
import { removeLocaleFromPath } from "../i18n";

export function isPrivatePath(path: string): boolean {
  const newPath = removeLocaleFromPath(path);
  const match = matchRoute(newPath);

  return match?.isPrivate ?? false;
}

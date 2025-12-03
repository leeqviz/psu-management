import { RoutePathPart } from "@/constants/routing";
import { getCanonicalPath, i18nConfig } from "@/lib/i18n";

export default function sitemap() {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  // TODO: use a constant array with all possible paths
  const routes = Array.from(
    Object.entries(RoutePathPart),
    ([_, value]) => `/${value}`
  );
  const locales = i18nConfig.locales;

  return routes.flatMap((route) => {
    return locales.map((locale) => {
      // Ensure we generate "/about" for en, and "/fr/about" for fr
      const path = getCanonicalPath(route, locale);

      return {
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
      };
    });
  });
}

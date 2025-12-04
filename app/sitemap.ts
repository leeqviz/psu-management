import { PRIVATE_PATHS, PUBLIC_PATHS } from "@/constants/routing";
import { getCanonicalPath, i18nConfig } from "@/lib/i18n";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  // TODO: use a constant array with all possible paths
  const routes = PUBLIC_PATHS.concat(PRIVATE_PATHS);
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

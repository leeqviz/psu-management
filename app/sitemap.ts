import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "@/constants/routing";
import { getCanonicalPath, i18nConfig } from "@/lib/i18n";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  // TODO: use a constant array with all possible paths
  const routes = PUBLIC_ROUTES.concat(PRIVATE_ROUTES);
  const locales = i18nConfig.locales;

  return routes.flatMap((route) => {
    return locales.map((locale) => {
      // Ensure we generate "/about" for en, and "/fr/about" for fr
      const path = getCanonicalPath(route.path, locale);

      return {
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
      };
    });
  });
}

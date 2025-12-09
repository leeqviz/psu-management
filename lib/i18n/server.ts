import { COOKIE_NAME } from "@/constants/cookies";
import { cookies } from "next/headers";
import "server-only";
import { createI18nInstance, i18nConfig, initI18nInstance } from ".";

// This function is similar to useTranslation hook but runs on the server
export async function getTranslation(
  lng: string,
  ns: string | readonly string[] = i18nConfig.defaultLocale,
  options: { keyPrefix?: string } = {}
) {
  // Create and initialize i18next instance on each request to avoid state leakage
  const instance = createI18nInstance();
  await initI18nInstance(instance, lng, ns);

  return {
    t: instance.getFixedT(
      lng,
      Array.isArray(ns) ? ns[0] : ns,
      options.keyPrefix
    ),
    i18n: instance,
  };
}

export async function getCurrentLocale(): Promise<string | undefined> {
  const locale = (await cookies()).get(COOKIE_NAME.Language)?.value;
  return locale && i18nConfig.locales.includes(locale) ? locale : undefined;
}

export const fallbackLng = "en";
export const languages = [fallbackLng, "ru"];
export const defaultNS = "common";
export const cookieName = "i18next";
export const headerName = "x-i18next-current-language";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}

export const importResources = (language: string, namespace: string) =>
  import(`../../public/locales/${language}/${namespace}.json`);

import { createInstance, i18n } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { Config } from "next-i18n-router/dist/types";
import { initReactI18next } from "react-i18next/initReactI18next";

export const i18nConfig: Config = {
  locales: ["en", "ru", "ar"],
  defaultLocale: "en",
  localeCookie: "lang",
  //prefixDefault: true, //show all locales in the URL path, even the default one
  //noPrefix: true //disable all locale prefixes in the URL path
};

export const createI18nInstance = () =>
  createInstance()
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`../../public/locales/${language}/${namespace}.json`)
      )
    );

export const initI18nInstance = async (
  instance: i18n,
  lng: string,
  ns: string | readonly string[] = i18nConfig.defaultLocale
) =>
  await instance.init({
    debug: false,
    preload: i18nConfig.locales,

    supportedLngs: i18nConfig.locales,
    fallbackLng: i18nConfig.defaultLocale,
    lng,
    ns,
    fallbackNS: i18nConfig.defaultLocale,
    defaultNS: i18nConfig.defaultLocale,
  });

export const getDirection = (locale: string) =>
  ["ar", "he", "fa", "ur"].includes(locale) ? "rtl" : "ltr";

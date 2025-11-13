import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { importResources } from "./settings";

// Run i18next.init() only on the client
export const i18nInstance = i18next
  .use(initReactI18next)
  .use(resourcesToBackend(importResources));

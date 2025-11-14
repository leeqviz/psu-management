import "client-only";
import { createI18nInstance } from "../utils";

// Create once and export the i18next instance for client provider only
export const i18nInstance = createI18nInstance();

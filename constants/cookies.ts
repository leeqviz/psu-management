/**
 * A type-safe enum for all your cookie names.
 * This prevents typos and keeps all your cookie names in one place.
 */
export const COOKIE_NAME = {
  AuthToken: "session",
  Language: "lang", //NEXT_LOCALE
  Theme: "theme",
  Sounds: "sounds",
  Notifications: "notifications",
} as const;

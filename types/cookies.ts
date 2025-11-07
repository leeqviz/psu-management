import { COOKIE_NAME } from "@/constants/cookies";

export type CookieName = (typeof COOKIE_NAME)[keyof typeof COOKIE_NAME];

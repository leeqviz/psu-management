import { z } from "zod";

export const isNumber = <TValue = unknown>(value: TValue) =>
  typeof value === "number"
    ? !isNaN(value) && isFinite(value)
    : typeof value === "string"
    ? value !== "" && !isNaN(parseFloat(value)) && isFinite(parseFloat(value))
    : false;
/**
 * this will show you an error if you have not handled all the cases in a switch statement
 */
export const exhaustiveCheck = (value: never) => value;

/**
 * to determine if a value is not nullish (undefined or null)
 */
export const isNotNullable = <TValue = unknown>(value: TValue) =>
  value !== null && value !== undefined;

export const canBeRendered = <TValue = unknown>(value: TValue) =>
  typeof value === "string" ||
  typeof value === "number" ||
  typeof value === "boolean";

export const isServer = () => typeof window === "undefined";

export const jsonParam = <T extends z.ZodType>(schema: T) =>
  z
    .string()
    .transform((str, ctx) => {
      try {
        return JSON.parse(str);
      } catch {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid JSON" });
        return z.NEVER;
      }
    })
    .pipe(schema);

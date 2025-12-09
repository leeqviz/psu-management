import { Faculty, FacultyAbbreviationRU } from "#constants/faculty";
import { FacultyValuesAlias } from "#types/faculty";
import { UrlSearchParams } from "@/types/routing";

export const getFacultyAbbreviation = (faculty: string) =>
  FacultyAbbreviationRU[faculty as FacultyValuesAlias] ??
  FacultyAbbreviationRU[Faculty.UND];

export const numCase = (num: number, words: string[]) => {
  num = Math.abs(num) % 100;
  const lastDigit = num % 10;
  if (num > 10 && num < 20) return words[2];
  if (lastDigit > 1 && lastDigit < 5) return words[1];
  if (lastDigit == 1) return words[0];
  return words[2];
};

export const joinNonEmptyValues = (arr: unknown[], separator: string = " ") =>
  arr.filter(Boolean).join(separator);

export const getBearerToken = (accessToken?: string | null) =>
  `Bearer ${accessToken?.replaceAll('"', "")}`;

export function addSearchParams(
  path: string,
  searchParams?: UrlSearchParams
): string {
  if (!searchParams) return path;

  const urlSearchParams = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    if (Array.isArray(value)) {
      // Handle arrays: ?tags=red&tags=blue
      value.forEach((item) => urlSearchParams.append(key, String(item)));
    } else if (typeof value === "object") {
      urlSearchParams.set(key, JSON.stringify(value));
    } else {
      urlSearchParams.set(key, String(value));
    }
  });

  const queryString = urlSearchParams.toString();
  return queryString ? `${path}?${queryString}` : path;
}

export function parsePath(fullPath: string) {
  const [pathname, search] = fullPath.split("?");
  return { pathname, search: search ? `?${search}` : "" };
}

import { Faculty, FacultyAbbreviationRU } from "#constants/faculty";
import { FacultyValuesAlias } from "#types/faculty";

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

export function appendQueryParams(
  path: string,
  params?: {
    [key: string]: string | string[] | number | boolean | undefined | null;
  }
): string {
  if (!params) return path;

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    if (Array.isArray(value)) {
      // Handle arrays: ?tags=red&tags=blue
      value.forEach((item) => searchParams.append(key, String(item)));
    } else {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${path}?${queryString}` : path;
}

export function parsePath(fullPath: string) {
  const [pathname, search] = fullPath.split("?");
  return { pathname, search: search ? `?${search}` : "" };
}

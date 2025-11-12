import { SelectOption } from "@/types/select-option";
import { numCase } from "./string-mapper";

export function formatDate(
  dateString: string | Date | number | null | undefined,
  options: Intl.DateTimeFormatOptions
) {
  if (!dateString) return "";
  const { format } = new Intl.DateTimeFormat("en-US", options);
  return format(new Date(dateString));
}

export const getISODate = (date: Date, isShort: boolean = true) =>
  isShort ? date.toISOString().split("T")[0] : date.toISOString();

export const getNextMonthISODate = (date: Date, isShort: boolean = true) =>
  getISODate(new Date(date.setMonth(date.getMonth() + 1)), isShort);

export const getStartMonthISODate = (date: Date, isShort: boolean = true) =>
  getISODate(new Date(date.setDate(1)), isShort);

export const getLocaleDate = (date: string = "01.01.1970") => {
  const dateParts = date.split(".");

  if (date.split(".").length === 3)
    return new Date(
      `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
    ).toLocaleDateString();
  else return new Date(date).toLocaleDateString();
};

export const getISODateFromLocaleDate = (
  date?: string | null,
  isShort: boolean = true
) => {
  const dateParts = date?.split(".");

  if (dateParts && date?.split(".").length === 3)
    return getISODate(
      new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`),
      isShort
    );
  else {
    const tryDate = date ? new Date(date) : null;
    return tryDate && !isNaN(tryDate.getTime())
      ? getISODate(tryDate, isShort)
      : null;
  }
};

export const getAge = (birthDate: string) => {
  const currentTimestamp = new Date().getTime(),
    birthTimestamp = new Date(birthDate).getTime();

  const age = Math.floor(
    (currentTimestamp - birthTimestamp) / (1000 * 60 * 60 * 24 * 365)
  );

  return `${age} ${numCase(age, ["год", "года", "лет"])}`;
};

export const getCurrentStudyYear = (): SelectOption<number> => {
  const currentYear = new Date().getFullYear();

  let studyYear: string;
  let lastTwoDigits: number;
  if (new Date().getMonth() >= 8) {
    studyYear = currentYear + "-" + (currentYear + 1);
    lastTwoDigits = Number(currentYear.toString().slice(-2));
  } else {
    studyYear = currentYear - 1 + "-" + currentYear;
    lastTwoDigits = Number((currentYear - 1).toString().slice(-2));
  }

  return { label: studyYear, value: lastTwoDigits };
};

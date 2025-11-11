import { SelectOption } from "@/types/select-option";

export const DEFAULT_STUDENT_STATUS_OPTION: SelectOption<number> = {
  value: 1,
  label: "Обучающийся",
};

export const DEFAULT_FOREIGN_STUDENT_ACTUALITY_OPTION: SelectOption<number> = {
  value: 1,
  label: "Активен",
};

export const COURSES: SelectOption<number>[] = [
  { label: "1 курс", value: 1 },
  { label: "2 курс", value: 2 },
  { label: "3 курс", value: 3 },
  { label: "4 курс", value: 4 },
  { label: "5 курс", value: 5 },
  { label: "6 курс", value: 6 },
];

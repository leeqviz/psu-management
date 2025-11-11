import { FacultyBackgroundOpacityClass } from "#constants/faculty";
import { FacultyAbbreviationENValuesAlias } from "#types/faculty";

export const getBackgroundFacultyColorOpacity = (
  facultyAbb: FacultyAbbreviationENValuesAlias
) => FacultyBackgroundOpacityClass[facultyAbb];

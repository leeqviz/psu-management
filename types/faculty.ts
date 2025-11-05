import {
  Faculty,
  FacultyAbbreviationEN,
  FacultyAbbreviationRU,
} from "#constants/faculty";
import { ValuesAliasFrom } from "./utilityTypes";

export type FacultyAbbreviationENValuesAlias = ValuesAliasFrom<
  typeof FacultyAbbreviationEN
>;
export type FacultyAbbreviationRUValuesAlias = ValuesAliasFrom<
  typeof FacultyAbbreviationRU
>;
export type FacultyValuesAlias = ValuesAliasFrom<typeof Faculty>;

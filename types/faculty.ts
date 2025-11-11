import {
  Faculty,
  FacultyAbbreviationEN,
  FacultyAbbreviationRU,
} from "#constants/faculty";
<<<<<<< HEAD
import { ValuesAliasFrom } from "./utilityTypes";
=======
import { ValuesAliasFrom } from "./utility-types";
>>>>>>> dev

export type FacultyAbbreviationENValuesAlias = ValuesAliasFrom<
  typeof FacultyAbbreviationEN
>;
export type FacultyAbbreviationRUValuesAlias = ValuesAliasFrom<
  typeof FacultyAbbreviationRU
>;
export type FacultyValuesAlias = ValuesAliasFrom<typeof Faculty>;

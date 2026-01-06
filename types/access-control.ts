import {
  ApplicationModuleName,
  ApplicationPageName,
} from "@/constants/access-control";
import { ComponentContentTypeValuesAlias } from "./component";
import { ValuesAliasFrom } from "./utility-types";

export type RoleName = "Admin" | "User" | "Guest" | string;

export interface User {
  id?: number | null;
  fio?: string | null;
  email?: string | null;
  fioShort?: string | null;
  position?: string | null;
  department?: string | null;
  isEmployee?: boolean | null;
  roles?: RoleName[] | null;
  assignedId?: number | null;
  assignedAt?: string | null;

  login?: string | null;
  password?: string | null;
}

export type ApplicationModuleNameValuesAlias = ValuesAliasFrom<
  typeof ApplicationModuleName
>;
export type ApplicationPageNameValuesAlias = ValuesAliasFrom<
  typeof ApplicationPageName
>;

export interface ApplicationModule {
  name: ApplicationModuleNameValuesAlias;
  link?: string;
  isExternal?: boolean;
  roles?: RoleName[];
  tags?: string[];
  svgIcon?: string;
  modal?: ApplicationModuleModal;
  pages?: ApplicationPage[];
}

export interface ApplicationModuleModal {
  src?: string;
  title?: string;
  subtitle?: string;
  type?: ComponentContentTypeValuesAlias;
}

export interface ApplicationPage {
  name: ApplicationPageNameValuesAlias;
  link?: string;
  roles?: string[];
}

export interface ApplicationRole {
  id: number;
  name: string;
  permittedModules?: PermittedApplicationModule[];
}

export interface PermittedApplicationModule {
  name: ApplicationModuleNameValuesAlias;
  isExternal?: boolean;
  permissions?: string[];
  permittedPages?: PermittedApplicationPage[];
}

export interface PermittedApplicationPage {
  name: ApplicationPageNameValuesAlias;
  permissions?: string[];
  //permittedAreas?: PermittedApplicationArea[];
}

/* export interface PermittedApplicationArea {
  name: string;
  permissions?: string[];
} */

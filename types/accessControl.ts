import {
  ApplicationModuleName,
  ApplicationPageName,
} from "#constants/accessControl";
import { FunctionComponent, SVGProps } from "react";
import { ComponentContentTypeValuesAlias } from "./component";
import { ValuesAliasFrom } from "./utilityTypes";

export interface User {
  id?: string | null;
  fio?: string | null;
  email?: string | null;
  fioShort?: string | null;
  position?: string | null;
  department?: string | null;
  isEmployee?: boolean | null;
  roles?: string[] | null;
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
  roles?: string[];
  tags?: string[];
  Svg?: FunctionComponent<SVGProps<SVGSVGElement>>;
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

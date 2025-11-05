import { APPLICATION_ROLES } from "#constants/accessControl";
import { User } from "#types/accessControl";

export const userHasRoles = (user?: User | null, roleNames?: string[] | null) =>
  !!roleNames?.some((roleName) => roleName && user?.roles?.includes(roleName));

export const roleIsReserved = (roleName?: string | null) =>
  roleName
    ? APPLICATION_ROLES.map((role) => role.name).includes(roleName)
    : false;

export const isStudentEmail = (email?: string | null) =>
  !!email?.includes("@students.psu.by");

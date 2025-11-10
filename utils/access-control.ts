import { APPLICATION_ROLES } from "@/constants/access-control";
import { User } from "@/types/access-control";

export const userHasRoles = (user?: User | null, roleNames?: string[] | null) =>
  !!roleNames?.some((roleName) => roleName && user?.roles?.includes(roleName));

export const roleIsReserved = (roleName?: string | null) =>
  roleName
    ? APPLICATION_ROLES.map((role) => role.name).includes(roleName)
    : false;

export const isStudentEmail = (email?: string | null) =>
  !!email?.includes("@students.psu.by");

import studentsIcon from "#assets/svg/students.svg";
import { routingManifest } from "#constants/routing";
import {
  ACCOUNTING_MEMBER_ROLE,
  ADMIN_ROLE,
  ApplicationModuleName,
  ApplicationPageName,
  DO_SECRETARY_ROLE,
  DORMITORY_MEMBER_ROLE,
  FOREIGN_STUDENTS_SECRETARY_ROLE,
  GROUP_MENTOR_ROLE,
  MLT_SECRETARY_ROLE,
  ORDERS_SECRETARY_ROLE,
  POSTGRADUATE_STUDENTS_SECRETARY_ROLE,
  RECTORATE_MEMBER_ROLE,
  SECRETARY_DEP_MILITARY_ROLE,
  SECRETARY_ROLE,
  STUDENT_ROLE,
  UMO_SECRETARY_ROLE,
  VISITOR_ROLE,
} from "@/constants/access-control";
import { ApplicationModule, ApplicationPage } from "@/types/access-control";

export const STUDENTS_PAGE: ApplicationPage = {
  name: ApplicationPageName.Students,
  roles: [
    ADMIN_ROLE.name,
    SECRETARY_ROLE.name,
    SECRETARY_DEP_MILITARY_ROLE.name,
    VISITOR_ROLE.name,
    DO_SECRETARY_ROLE.name,
    FOREIGN_STUDENTS_SECRETARY_ROLE.name,
    MLT_SECRETARY_ROLE.name,
    ORDERS_SECRETARY_ROLE.name,
    POSTGRADUATE_STUDENTS_SECRETARY_ROLE.name,
    UMO_SECRETARY_ROLE.name,
    RECTORATE_MEMBER_ROLE.name,
    DORMITORY_MEMBER_ROLE.name,
    ACCOUNTING_MEMBER_ROLE.name,
  ],
};

export const STUDENT_PAGE: ApplicationPage = {
  name: ApplicationPageName.Student,
  roles: [
    ADMIN_ROLE.name,
    SECRETARY_ROLE.name,
    SECRETARY_DEP_MILITARY_ROLE.name,
    VISITOR_ROLE.name,
    DO_SECRETARY_ROLE.name,
    FOREIGN_STUDENTS_SECRETARY_ROLE.name,
    MLT_SECRETARY_ROLE.name,
    ORDERS_SECRETARY_ROLE.name,
    POSTGRADUATE_STUDENTS_SECRETARY_ROLE.name,
    UMO_SECRETARY_ROLE.name,
    GROUP_MENTOR_ROLE.name,
    STUDENT_ROLE.name,
    RECTORATE_MEMBER_ROLE.name,
    DORMITORY_MEMBER_ROLE.name,
    ACCOUNTING_MEMBER_ROLE.name,
  ],
};

export const SECRETARY_MODULE: ApplicationModule = {
  name: ApplicationModuleName.Students,
  svgIcon: studentsIcon,
  link: routingManifest.private.students,
  tags: [
    "Контингент студентов",
    "Заказ платных услуг",
    "Статистика платных услуг",
  ],
  roles: [
    ADMIN_ROLE.name,
    SECRETARY_ROLE.name,
    SECRETARY_DEP_MILITARY_ROLE.name,
    VISITOR_ROLE.name,
    DO_SECRETARY_ROLE.name,
    FOREIGN_STUDENTS_SECRETARY_ROLE.name,
    MLT_SECRETARY_ROLE.name,
    ORDERS_SECRETARY_ROLE.name,
    POSTGRADUATE_STUDENTS_SECRETARY_ROLE.name,
    UMO_SECRETARY_ROLE.name,
    RECTORATE_MEMBER_ROLE.name,
    DORMITORY_MEMBER_ROLE.name,
    ACCOUNTING_MEMBER_ROLE.name,
  ],
  pages: [STUDENTS_PAGE, STUDENT_PAGE],
};

export const APP_MODULES: ApplicationModule[] = [
  SECRETARY_MODULE,
  SECRETARY_MODULE,
  SECRETARY_MODULE,
  SECRETARY_MODULE,
  SECRETARY_MODULE,
  SECRETARY_MODULE,
  SECRETARY_MODULE,
  SECRETARY_MODULE,
  SECRETARY_MODULE,
  SECRETARY_MODULE,
  SECRETARY_MODULE,
  SECRETARY_MODULE,
];

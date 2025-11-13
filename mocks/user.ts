import { User } from "@/types/access-control";

export const userDataMock: User = {
  id: "1",
  fio: "Полотский Е.В.",
  fioShort: "Полотский Е.В.",
  email: "1@1.1",
  position: "Профессор",
  department: "Факультет информационных технологий",
  isEmployee: true,
  roles: ["Admin"],
  assignedId: 1,
  assignedAt: "2023-01-01",
  login: "admin",
  password: "admin",
};

export const userTokenMock = "your-secure-jwt-or-session-token";

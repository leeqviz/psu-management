import { z } from "zod";

export const loginSchema = z.object({
  login: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  fio: z.string().min(2, "Name is too short"),
  login: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // 1. In a real app, you'd verify username/password here
  // const { email, password } = await request.json();
  // const user = await loginUser(email, password);

  // 2. For this demo, we'll just get the user data
  const userData = {
    id: "1",
    fio: "Полотский Е.В.",
    fioShort: "Полотский Е.В.",
    email: "1@1.1",
    position: "Профессор",
    department: "Факультет информационных технологий",
    isEmployee: true,
    roles: ["admin"],
    assignedId: 1,
    assignedAt: "2023-01-01",
    login: "admin",
    password: "admin",
  };
  const userToken = "your-secure-jwt-or-session-token"; // This would come from your auth logic

  // 3. Set the secure cookie
  (await cookies()).set({
    name: "session",
    value: userToken, // Store the token, not the full user object
    httpOnly: true, // Client-side JS cannot access this cookie
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return NextResponse.json({ user: userData });
}

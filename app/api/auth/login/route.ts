import { userDataMock, userTokenMock } from "#mocks/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  // In a real app, you'd verify username/password here
  // const { email, password } = await request.json();
  // const user = await loginUser(email, password);
  // Set the secure cookie
  (await cookies()).set({
    name: "session",
    value: userTokenMock, // Store the token, not the full user object
    httpOnly: true, // Client-side JS cannot access this cookie
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return NextResponse.json({ user: userDataMock });
}

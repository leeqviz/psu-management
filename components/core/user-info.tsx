import { userDataMock } from "@/mocks/user";
import { User } from "@/types/accessControl";
import { cookies } from "next/headers";

// This is our server-side function to get the user from the cookie
// (This is from our previous example)
async function getAuthedUser(): Promise<User | null> {
  const sessionCookie = (await cookies()).get("session");
  if (!sessionCookie?.value) return null;

  // In a real app, you'd verify the token and fetch the user
  // const user = await verifyTokenAndGetUser(sessionCookie.value);
  // For this demo, we'll return a mock user if the cookie exists
  return userDataMock;
}

// This IS a Server Component
export async function UserInfo() {
  // 1. We read the cookie on the server before any render.
  const user = await getAuthedUser();

  return user ? (
    <div
      className={"flex flex-col text-gray-700 text-right break-words-anywhere"}
    >
      <span className="text-sm sm:text-base lg:text-lg tracking-wide leading-4 sm:leading-5 lg:leading-6">
        {user?.fio
          ? user?.fio + (user?.email ? ` - ${user?.email}` : "")
          : user?.email}
      </span>
      <span className="text-xs sm:text-sm lg:text-base font-light leading-4 sm:leading-5 lg:leading-6">
        {user?.department
          ? user?.department + (user?.position ? ` - ${user?.position}` : "")
          : user?.position}
      </span>
    </div>
  ) : null;
}

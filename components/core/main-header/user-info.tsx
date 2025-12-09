import { getCurrentUser } from "@/lib/auth/server";

// This IS a Server Component
export async function UserInfo() {
  // 1. We read the cookie on the server before render.
  const user = await getCurrentUser();

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

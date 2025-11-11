"use client";
import { cn } from "#lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainLink() {
  const pathname = usePathname();

  return (
    <Link
      href={pathname !== "/" ? "/" : ""}
      onClick={() => {
        if (pathname !== "/") {
        }
      }}
      onNavigate={(e) => {
        if (pathname === "/") {
          // prevent navigation if we're already on the home page
          e.preventDefault();
        }
      }}
      className={cn(
        "flex flex-col text-center md:text-left break-words-anywhere",
        {
          "cursor-default": pathname === "/",
          "text-red-500": process.env.NEXT_PUBLIC_APP_ENV === "test",
          "text-gray-700": process.env.NEXT_PUBLIC_APP_ENV !== "test",
        }
      )}
    >
      <span className="text-sm sm:text-base lg:text-lg tracking-wide">
        {"Euphrosyne Polotskaya State University of Polotsk © 2025"}
      </span>
      <span className="text-xs sm:text-sm lg:text-base font-light">
        {process.env.NEXT_PUBLIC_APP_VERSION
          ? "version - " +
            process.env.NEXT_PUBLIC_APP_VERSION +
            (process.env.NEXT_PUBLIC_APP_ENV === "test" ? " (test)" : "")
          : process.env.NEXT_PUBLIC_APP_ENV === "test"
          ? "Test system"
          : ""}
      </span>
    </Link>
  );
}

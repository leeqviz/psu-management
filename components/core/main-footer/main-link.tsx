import { cn } from "#lib/utils";
import { APP_ROUTING } from "@/constants/routing";
import { ConditionalLink } from "../conditional-link";

export function MainLink() {
  return (
    <ConditionalLink
      href={APP_ROUTING.home.path}
      className={cn(
        "flex flex-col text-center md:text-left break-words-anywhere",
        {
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
    </ConditionalLink>
  );
}

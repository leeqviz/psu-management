"use client";
import fb from "#assets/svg/facebook-link.svg";
import inst from "#assets/svg/instagram-link.svg";
import tg from "#assets/svg/telegram-link.svg";
import vk from "#assets/svg/vkontakte-link.svg";
import yt from "#assets/svg/youtube-link.svg";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Anchor } from "./anchor";
import { Picture } from "./picture";

function MainFooter() {
  const pathname = usePathname();

  return (
    <footer
      className={`mx-auto flex flex-col-reverse justify-between md:flex-row md:w-full md:items-center gap-4 sm:gap-5 lg:gap-6 py-4 sm:py-5 lg:py-6`}
    >
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
      <div className={"flex justify-center gap-2 sm:gap-2.5 lg:gap-3"}>
        <Anchor
          display="inline-block"
          tooltip="telegram"
          target="_blank"
          href={"https://t.me/psu_by"}
          className="group p-1"
        >
          <Picture
            src={tg}
            className="group-hover:scale-[1.1] group-active:scale-[0.9] duration-200"
          />
        </Anchor>

        <Anchor
          display="inline-block"
          tooltip="instagram"
          target="_blank"
          href={"https://www.instagram.com/psu.by/"}
          className="group p-1"
        >
          <Picture
            src={inst}
            className="group-hover:scale-[1.1] group-active:scale-[0.9] duration-200"
          />
        </Anchor>

        <Anchor
          display="inline-block"
          tooltip="vk"
          target="_blank"
          href={"https://vk.com/polotsk_university"}
          className="group p-1"
        >
          <Picture
            src={vk}
            className="group-hover:scale-[1.1] group-active:scale-[0.9] duration-200"
          />
        </Anchor>

        <Anchor
          display="inline-block"
          tooltip="youtube"
          target="_blank"
          href={"https://www.youtube.com/user/psutvby"}
          className="group p-1"
        >
          <Picture
            src={yt}
            className="group-hover:scale-[1.1] group-active:scale-[0.9] duration-200"
          />
        </Anchor>

        <Anchor
          display="inline-block"
          tooltip="facebook"
          target="_blank"
          href={"https://www.facebook.com/wwwpsuby"}
          className="group p-1"
        >
          <Picture
            src={fb}
            className="group-hover:scale-[1.1] group-active:scale-[0.9] duration-200"
          />
        </Anchor>
      </div>
    </footer>
  );
}

export { MainFooter };

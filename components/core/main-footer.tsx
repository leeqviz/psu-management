"use client";
import fb from "#assets/svg/facebook-link.svg";
import inst from "#assets/svg/instagram-link.svg";
import tg from "#assets/svg/telegram-link.svg";
import vk from "#assets/svg/vkontakte-link.svg";
import yt from "#assets/svg/youtube-link.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
        className={`flex flex-col text-center md:text-left break-words-anywhere ${
          process.env.REACT_APP_ENV === "test"
            ? "text-red-500"
            : "text-gray-700"
        }`}
      >
        <span className="text-sm sm:text-base lg:text-lg tracking-wide">
          {"Euphrosyne Polotskaya State University of Polotsk © 2025"}
        </span>
        <span className="text-xs sm:text-sm lg:text-base font-light">
          {process.env.REACT_APP_VERSION
            ? "version - " +
              process.env.REACT_APP_VERSION +
              (process.env.REACT_APP_ENV === "test" ? " (test)" : "")
            : process.env.REACT_APP_ENV === "test"
            ? "Test system"
            : ""}
        </span>
      </Link>
      <div className={"flex justify-center gap-2 sm:gap-2.5 lg:gap-3"}>
        <Image
          alt={""}
          src={tg}
          width={30}
          height={30}
          className="group-hover:scale-[1.1] group-active:scale-[0.9] duration-200"
        />
        <Image
          alt={""}
          src={inst}
          width={30}
          height={30}
          className="group-hover:scale-[1.1] group-active:scale-[0.9] duration-200"
        />
        <Image
          alt={""}
          src={vk}
          width={30}
          height={30}
          className="group-hover:scale-[1.1] group-active:scale-[0.9] duration-200"
        />
        <Image
          alt={""}
          src={yt}
          width={30}
          height={30}
          className="group-hover:scale-[1.1] group-active:scale-[0.9] duration-200"
        />
        <Image
          alt={""}
          src={fb}
          width={30}
          height={30}
          className="group-hover:scale-[1.1] group-active:scale-[0.9] duration-200"
        />
      </div>
    </footer>
  );
}

export { MainFooter };

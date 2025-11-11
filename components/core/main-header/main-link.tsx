"use client";
import { LogoSvg } from "#components/core/svgs";
import { useFacultyAbbreviation } from "#hooks/routing";
import { useAudio, useLocalStorage } from "#hooks/window";
import { SOUNDS_ARE_ON_KEY } from "@/constants/local-storage";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainLink() {
  const pathname = usePathname();
  const facultyAbb = useFacultyAbbreviation();
  const [soundValue] = useLocalStorage<boolean>(SOUNDS_ARE_ON_KEY, false);
  const tap2Audio = useAudio(soundValue ? "/sounds/tap2.mp3" : undefined);

  return (
    <Link
      href={"/"}
      onClick={() => {
        if (pathname !== "/") {
          tap2Audio.reset();
          tap2Audio.play();
          alert("Переход на главную");
        }
      }}
      onNavigate={(e) => {
        if (pathname === "/") {
          // prevent navigation if we're already on the home page
          e.preventDefault();
        }
      }}
      className={`flex flex-row items-center gap-1.5 md:gap-2 ${
        pathname !== "/" ? "group" : "cursor-default"
      }`}
    >
      <LogoSvg
        className={`hidden xxs:block w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ${
          process.env.NEXT_PUBLIC_APP_ENV === "test"
            ? "fill-red-500"
            : "fill-gray-700"
        } group-hover:fill-${facultyAbb} group-hover:scale-[1.1] group-active:scale-[0.9] duration-200 shrink-0`}
      />
      <div
        className={`flex flex-col ${
          process.env.NEXT_PUBLIC_APP_ENV === "test"
            ? "text-red-500"
            : "text-gray-700"
        } group-hover:text-${facultyAbb} duration-200 break-words-anywhere`}
      >
        <span className="text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wide leading-4 sm:leading-5 lg:leading-6">
          {"Полоцкий Государственный Университет"}
        </span>
        <span className="text-xs sm:text-sm lg:text-base leading-4 sm:leading-5 lg:leading-6">
          {"имени Евфросинии Полоцкой" +
            (process.env.NEXT_PUBLIC_APP_ENV === "test"
              ? " (Тестовая система)"
              : "")}
        </span>
      </div>
    </Link>
  );
}

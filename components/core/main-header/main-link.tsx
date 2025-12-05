"use client";
import { LogoSvg } from "#components/core/svgs";
import { useAudio, useLocalStorage } from "#hooks/window";
import { DEFAULT_COLOR } from "@/constants/faculty";
import { SOUNDS_ARE_ON_KEY } from "@/constants/local-storage";
import { APP_ROUTING } from "@/constants/routing";
import { ConditionalLink } from "../conditional-link";

export function MainLink() {
  const [soundValue] = useLocalStorage<boolean>(SOUNDS_ARE_ON_KEY, false);
  const tap2Audio = useAudio(soundValue ? "/sounds/tap2.mp3" : undefined);

  return (
    <ConditionalLink
      href={APP_ROUTING.home.path}
      onClick={() => {
        tap2Audio.reset();
        tap2Audio.play();
      }}
      className={`flex flex-row items-center gap-1.5 md:gap-2 group`}
    >
      <LogoSvg
        className={`hidden xxs:block w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ${
          process.env.NEXT_PUBLIC_APP_ENV === "test"
            ? "fill-red-500"
            : "fill-gray-700"
        } group-hover:fill-${DEFAULT_COLOR} group-hover:scale-[1.1] group-active:scale-[0.9] duration-200 shrink-0`}
      />
      <div
        className={`flex flex-col ${
          process.env.NEXT_PUBLIC_APP_ENV === "test"
            ? "text-red-500"
            : "text-gray-700"
        } group-hover:text-${DEFAULT_COLOR} duration-200 break-words-anywhere`}
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
    </ConditionalLink>
  );
}

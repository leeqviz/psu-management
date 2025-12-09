"use client";

import logo from "#assets/svg/filled-logo.svg";
import { Picture } from "#components/core/picture";
import { useAudio, useLocalStorage } from "#hooks/window";
import { DEFAULT_COLOR } from "@/constants/faculty";
import { SOUNDS_ARE_ON_KEY } from "@/constants/local-storage";
import Link from "next/link";

export function MainLink() {
  const [flag] = useLocalStorage<boolean>(SOUNDS_ARE_ON_KEY, false);
  const tap2Audio = useAudio(flag ? "/sounds/tap2.mp3" : undefined);

  return (
    <Link
      className={`hover:bg-${DEFAULT_COLOR} ring-2 shadow ring-${DEFAULT_COLOR} duration-200 bg-gray-700 flex items-center justify-center w-8 sm:w-10 lg:w-12`}
      href="https://www.psu.by/ru/"
      target="_blank"
      rel="noreferrer"
      onClick={() => {
        tap2Audio.reset();
        tap2Audio.play();
      }}
    >
      <div className="-rotate-90 flex flex-row items-center justify-center gap-1 sm:gap-1.5 lg:gap-2">
        <Picture src={logo} />
        <span className="text-sm sm:text-base lg:text-lg font-medium text-white">
          {"psu.by"}
        </span>
      </div>
    </Link>
  );
}

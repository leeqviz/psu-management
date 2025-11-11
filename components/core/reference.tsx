"use client";
import link from "#assets/svg/link.svg";
import { ComponentSize } from "#constants/component";
<<<<<<< HEAD
import { SOUNDS_ARE_ON_KEY } from "#constants/localStorageKeys";
=======
>>>>>>> dev
import { useFacultyAbbreviation } from "#hooks/routing";
import { useAudio, useLocalStorage } from "#hooks/window";
import { ComponentSizeValuesAlias } from "#types/component";
import { isNotNullable } from "#utils/validator";
<<<<<<< HEAD
=======
import { SOUNDS_ARE_ON_KEY } from "@/constants/local-storage";
>>>>>>> dev
import {
  CSSProperties,
  HTMLAttributeAnchorTarget,
  MouseEvent,
  ReactNode,
} from "react";
import { Picture } from "./picture";

interface ReferenceProps {
  isDisabled?: boolean;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
  size?: ComponentSizeValuesAlias | null;
  onClick?: (e?: MouseEvent<HTMLElement>) => void;
  src?: string;
  text?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

function Reference({
  isDisabled = false,
  href,
  target = "_self",
  rel = "noreferrer",
  size = ComponentSize.ExtraSmall,
  src = link,
  text,
  onClick,
  className = "",
  style,
}: ReferenceProps) {
  const facultyAbb = useFacultyAbbreviation();
  const [flag] = useLocalStorage<boolean>(SOUNDS_ARE_ON_KEY, false);
  const tap2Audio = useAudio(flag ? "/sounds/tap2.mp3" : undefined);

  return (
    <a
      href={!isDisabled ? href : undefined}
      target={target}
      rel={rel}
      onClick={(e) => {
        if (!isDisabled) {
          tap2Audio.reset();
          tap2Audio.play();
          onClick?.(e);
        }
      }}
      style={{ marginRight: "auto", ...style }}
      className={`inline-flex gap-1 sm:gap-1.5 lg:gap-2 items-center ${
        !isDisabled
          ? "group growing-inline-background-group cursor-pointer"
          : "cursor-default"
      } ${className}`}
    >
      <Picture src={src} size={size} />
      {isNotNullable(text) && (
        <span className={"text-left"}>
          <span
            className={`text-gray-700 ${
              !isDisabled
                ? `hover:text-${facultyAbb} group-hover:text-${facultyAbb} underline decoration-${facultyAbb} underline-offset-4 growing-inline-background`
                : ""
            }`}
          >
            {text}
          </span>
        </span>
      )}
    </a>
  );
}

export { Reference };

"use client";

import { AbsoluteTooltip } from "#components/core/tooltip";
import { useAudio, useLocalStorage } from "#hooks/window";
import { isNotNullable } from "#utils/validator";
import { DEFAULT_COLOR } from "@/constants/faculty";
import { SOUNDS_ARE_ON_KEY } from "@/constants/local-storage";
import { CSSProperties, MouseEvent, ReactNode, useState } from "react";

interface IconButtonProps {
  tooltip?: ReactNode;
  text?: ReactNode;
  isDisabled?: boolean;
  isScalable?: boolean;
  isReversed?: boolean;
  onClick?: (e?: MouseEvent<HTMLElement>) => void;
  className?: string;
  style?: CSSProperties;
  renderSvg: (svgProps?: React.SVGProps<SVGSVGElement>) => ReactNode;
}

function IconButton({
  tooltip,
  isDisabled = false,
  isScalable = true,
  isReversed = false,
  text,
  onClick,
  className = "",
  style,
  renderSvg,
}: IconButtonProps) {
  const [showText, setShowText] = useState(false);

  const [flag] = useLocalStorage<boolean>(SOUNDS_ARE_ON_KEY, false);
  const tap2Audio = useAudio(flag ? "/sounds/click.mp3" : undefined);

  return (
    <div className="relative">
      {isNotNullable(tooltip) && (
        <AbsoluteTooltip isVisible={showText}>{tooltip}</AbsoluteTooltip>
      )}
      <button
        type="button"
        disabled={isDisabled ?? undefined}
        className={`p-0.5 group growing-inline-underline-group flex items-center rounded-lg gap-0.5 sm:gap-1 lg:gap-1.5 duration-200 text-${DEFAULT_COLOR} ${
          isReversed ? "flex-row-reverse" : "flex-row"
        } ${!isDisabled ? "cursor-pointer bg-current-opacity" : ""}`}
        onClick={(e) => {
          if (!isDisabled) {
            tap2Audio.reset();
            tap2Audio.play();
            onClick?.(e);
          }
        }}
        onMouseEnter={() => isNotNullable(tooltip) && setShowText(true)}
        onMouseUp={() => isNotNullable(tooltip) && setShowText(false)}
        onMouseLeave={() => isNotNullable(tooltip) && setShowText(false)}
      >
        {renderSvg({
          className: `w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 shrink-0 group-disabled:stroke-gray-300 group-disabled:group-hover:stroke-gray-300 duration-200 stroke-${DEFAULT_COLOR} ${
            !isDisabled
              ? `group-hover:stroke-[1.5px] ${
                  isScalable
                    ? "group-hover:scale-[1.1] group-active:scale-[0.9]"
                    : ""
                }`
              : ""
          } ${className}`,
          style,
        })}

        {isNotNullable(text) && (
          <span className={"text-left"}>
            <span
              className={`text-${DEFAULT_COLOR} group-disabled:text-gray-300 duration-200 text-sm sm:text-base lg:text-lg growing-inline-underline`}
            >
              {text}
            </span>
          </span>
        )}
      </button>
    </div>
  );
}

export { IconButton };

"use client";
import { FixedTooltip } from "#components/core/fixed-tooltip";
import { ComponentSize } from "#constants/component";
import { SOUNDS_ARE_ON_KEY } from "#constants/localStorageKeys";
import { useFacultyAbbreviation } from "#hooks/routing";
import { useAudio, useLocalStorage } from "#hooks/window";
import { ComponentSizeValuesAlias } from "#types/component";
import { isNotNullable } from "#utils/validator";
import {
  CSSProperties,
  HTMLAttributeAnchorTarget,
  MouseEvent,
  PropsWithChildren,
  ReactNode,
  useState,
} from "react";

interface AnchorProps extends PropsWithChildren {
  isDisabled?: boolean;
  tooltip?: ReactNode;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
  onClick?: (e?: MouseEvent<HTMLElement>) => void;
  className?: string;
  title?: string;
  size?: ComponentSizeValuesAlias | null;
  style?: CSSProperties;
  display?: "inline" | "inline-block";
}

function Anchor({
  isDisabled = false,
  href,
  size = ComponentSize.Medium,
  tooltip,
  target = "_self",
  rel = "noreferrer",
  children,
  onClick,
  title,
  className = "",
  style,
  display = "inline",
}: AnchorProps) {
  const facultyAbb = useFacultyAbbreviation();

  const [flag] = useLocalStorage<boolean>(SOUNDS_ARE_ON_KEY, false);
  const tap2Audio = useAudio(flag ? "/sounds/tap2.mp3" : undefined);

  const [showText, setShowText] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const sizeClassNames =
    size === ComponentSize.SuperExtraSmall
      ? "text-[0.5rem]/[0.625rem] sm:text-xxs lg:text-xs"
      : size === ComponentSize.ExtraSmall
      ? "text-xxs sm:text-xs lg:text-sm"
      : size === ComponentSize.Small
      ? "text-xs sm:text-sm lg:text-base"
      : size === ComponentSize.Medium
      ? "text-sm sm:text-base lg:text-lg"
      : size === ComponentSize.Long
      ? "text-base sm:text-lg lg:text-xl"
      : size === ComponentSize.ExtraLong
      ? "text-lg sm:text-xl lg:text-2xl"
      : size === ComponentSize.SuperExtraLong
      ? "text-xl sm:text-2xl lg:text-3xl"
      : "";

  return (
    <>
      {href ? (
        <a
          title={title}
          style={style}
          href={href}
          target={!isDisabled ? target : undefined}
          rel={rel}
          onClick={(e) => {
            if (!isDisabled) {
              tap2Audio.reset();
              tap2Audio.play();
              onClick?.(e);
            }
          }}
          onMouseMove={(e) =>
            isNotNullable(tooltip) &&
            setTooltipPosition({ x: e?.clientX ?? 0, y: e?.clientY ?? 0 })
          }
          onMouseEnter={() => isNotNullable(tooltip) && setShowText(true)}
          onMouseUp={() => isNotNullable(tooltip) && setShowText(false)}
          onMouseLeave={() => isNotNullable(tooltip) && setShowText(false)}
          className={`${display} relative text-gray-700 ${sizeClassNames} ${
            !isDisabled
              ? `cursor-pointer hover:text-${facultyAbb} ${
                  display === "inline"
                    ? `underline decoration-${facultyAbb} underline-offset-4 growing-inline-background`
                    : "growing-block-underline"
                }`
              : "cursor-default"
          } ${className}`}
        >
          {isNotNullable(tooltip) && (
            <FixedTooltip isVisible={showText} position={tooltipPosition}>
              {tooltip}
            </FixedTooltip>
          )}
          {children}
        </a>
      ) : display === "inline" ? (
        <span
          title={title}
          style={style}
          onClick={(e) => {
            if (!isDisabled) {
              tap2Audio.reset();
              tap2Audio.play();
              onClick?.(e);
            }
          }}
          onMouseMove={(e) =>
            isNotNullable(tooltip) &&
            setTooltipPosition({ x: e?.clientX ?? 0, y: e?.clientY ?? 0 })
          }
          onMouseEnter={() => isNotNullable(tooltip) && setShowText(true)}
          onMouseUp={() => isNotNullable(tooltip) && setShowText(false)}
          onMouseLeave={() => isNotNullable(tooltip) && setShowText(false)}
          className={`inline relative text-gray-700 ${sizeClassNames} ${
            !isDisabled
              ? `cursor-pointer hover:text-${facultyAbb} underline decoration-${facultyAbb} underline-offset-4 growing-inline-background`
              : "cursor-default"
          } ${className}`}
        >
          {isNotNullable(tooltip) && (
            <FixedTooltip isVisible={showText} position={tooltipPosition}>
              {tooltip}
            </FixedTooltip>
          )}
          {children}
        </span>
      ) : (
        <div
          title={title}
          style={style}
          onClick={(e) => {
            if (!isDisabled) {
              tap2Audio.reset();
              tap2Audio.play();
              onClick?.(e);
            }
          }}
          onMouseMove={(e) =>
            isNotNullable(tooltip) &&
            setTooltipPosition({ x: e?.clientX ?? 0, y: e?.clientY ?? 0 })
          }
          onMouseEnter={() => isNotNullable(tooltip) && setShowText(true)}
          onMouseUp={() => isNotNullable(tooltip) && setShowText(false)}
          onMouseLeave={() => isNotNullable(tooltip) && setShowText(false)}
          className={`inline-block relative text-gray-700 ${sizeClassNames} ${
            !isDisabled
              ? `cursor-pointer hover:text-${facultyAbb} growing-block-underline`
              : "cursor-default"
          } ${className}`}
        >
          {isNotNullable(tooltip) && (
            <FixedTooltip isVisible={showText} position={tooltipPosition}>
              {tooltip}
            </FixedTooltip>
          )}
          {children}
        </div>
      )}
    </>
  );
}

export { Anchor };

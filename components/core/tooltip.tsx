"use client";
import { ANIMATION_TIME } from "#constants/time";
import { useDelayedToggle } from "#hooks/delay";
import { Property } from "csstype";
import { CSSProperties, PropsWithChildren } from "react";

interface TooltipProps extends PropsWithChildren {
  isVisible?: boolean | null;
  className?: string;
  animationTime?: number;
  width?: Property.Width;
  style?: CSSProperties;
  position?: "fixed" | "absolute" | "relative";
}

function Tooltip({
  isVisible = false,
  children,
  animationTime = ANIMATION_TIME,
  className = "",
  width,
  style,
  position = "absolute",
}: TooltipProps) {
  const isMountedDelayed = useDelayedToggle(!!isVisible, {
    exitDelay: animationTime,
  });
  const isVisibleDelayed = useDelayedToggle(!!isVisible, {
    enterDelay: animationTime,
  });

  return isMountedDelayed ? (
    <div
      className={`flex z-50 justify-center items-center ${position} ${className}`}
      style={{
        transitionProperty: "transform",
        transitionDuration: animationTime + "ms",
        transform: isVisibleDelayed ? "scale(1)" : "scale(0)",
        ...style,
      }}
    >
      <div
        className={`break-words-anywhere normal-case font-normal text-gray-700 text-xxs sm:text-xs lg:text-sm px-1.5 py-1 bg-white rounded-lg shadow-xl ring-1 ring-inset ring-gray-200`}
        style={width ? { width } : { whiteSpace: "nowrap" }}
      >
        {children}
      </div>
    </div>
  ) : null;
}

export { Tooltip };

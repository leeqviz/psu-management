"use client";
import { ComponentContentType, ComponentSize } from "#constants/component";
import { DELAY_TIME } from "#constants/time";
import { useDelayedToggle } from "#hooks/delay";
import { useFacultyAbbreviation } from "#hooks/routing";
import {
  ComponentContentTypeValuesAlias,
  ComponentSizeValuesAlias,
} from "#types/component";
import { isNotNullable } from "#utils/validator";
import { CSSProperties, ReactNode } from "react";

interface MessageProps {
  title?: ReactNode;
  subTitle?: ReactNode;
  type?: ComponentContentTypeValuesAlias | null;
  size?: ComponentSizeValuesAlias | null;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

function Message({
  type = ComponentContentType.DEFAULT,
  size = ComponentSize.Medium,
  delay = DELAY_TIME,
  title,
  subTitle,
  className = "",
  style,
}: MessageProps) {
  const facultyAbb = useFacultyAbbreviation();
  const isShownDelayed = useDelayedToggle(true, { enterDelay: delay });

  return (
    <div
      style={style}
      className={`flex gap-1 sm:gap-1.5 lg:gap-2 transition-opacity duration-700 ${
        !isShownDelayed ? "opacity-0" : `opacity-100`
      } ${
        type === ComponentContentType.SUCCESS
          ? "text-emerald-500"
          : type === ComponentContentType.WARNING
          ? "text-amber-500"
          : type === ComponentContentType.ERROR
          ? "text-red-500"
          : type === ComponentContentType.INFO
          ? `text-${facultyAbb}`
          : type === ComponentContentType.DEFAULT
          ? "text-gray-700"
          : ""
      } ${className}`}
    >
      <svg
        className={`${
          size === ComponentSize.SuperExtraSmall
            ? "w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4"
            : size === ComponentSize.ExtraSmall
            ? "w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
            : size === ComponentSize.Small
            ? "w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
            : size === ComponentSize.Medium
            ? "w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7"
            : size === ComponentSize.Long
            ? "w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
            : size === ComponentSize.ExtraLong
            ? "w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9"
            : size === ComponentSize.SuperExtraLong
            ? "w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10"
            : ""
        } stroke-current shrink-0 rotate-180`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#374151"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10m0-14v5m-.005 3h.009" />
      </svg>

      {(isNotNullable(title) || isNotNullable(subTitle)) && (
        <div
          className={`flex flex-col grow break-words-anywhere ${
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
              : ""
          }`}
        >
          {isNotNullable(title) && (
            <div className={`uppercase-first-letter`}>{title}</div>
          )}
          {isNotNullable(subTitle) && (
            <div className="font-light">{subTitle}</div>
          )}
        </div>
      )}
    </div>
  );
}

export { Message };

"se client";
import { ComponentColor, ComponentSize } from "#constants/component";
import { DELAY_TIME } from "#constants/time";
import { useDelayedToggle } from "#hooks/delay";
import { useFacultyAbbreviation } from "#hooks/routing";
import {
  ComponentColorValuesAlias,
  ComponentSizeValuesAlias,
} from "#types/component";
import { isNotNullable } from "#utils/validator";
import { CSSProperties, ReactNode } from "react";
import { Picture } from "./picture";

interface ChipProps {
  isDisabled?: boolean;
  text?: ReactNode;
  color?: ComponentColorValuesAlias | null;
  size?: ComponentSizeValuesAlias | null;
  src?: string;
  delay?: number;
  className?: string;
  isOutlined?: boolean;
  isFilled?: boolean;
  indicator?: ReactNode;
  style?: CSSProperties;
}

export function Chip({
  isDisabled = false,
  color = ComponentColor.Default,
  delay = DELAY_TIME,
  text,
  className = "",
  isOutlined = true,
  isFilled = true,
  size = ComponentSize.ExtraSmall,
  indicator = <>&#x25CF;&nbsp;</>,
  src,
  style,
}: ChipProps) {
  const facultyAbb = useFacultyAbbreviation();
  const isShownDelayed = useDelayedToggle(true, { enterDelay: delay });

  return (
    <span
      className={`${
        !isDisabled
          ? `${
              color === ComponentColor.Sky
                ? "text-sky-500"
                : color === ComponentColor.Red
                ? "text-red-500"
                : color === ComponentColor.Gray
                ? "text-gray-500"
                : color === ComponentColor.Amber
                ? "text-amber-500"
                : color === ComponentColor.Violet
                ? "text-violet-500"
                : color === ComponentColor.Emerald
                ? "text-emerald-500"
                : color === ComponentColor.Default
                ? "text-gray-500"
                : color === ComponentColor.Current
                ? `text-${facultyAbb}`
                : ""
            }`
          : "text-gray-300"
      } ${src ? "inline-flex gap-1 sm:gap-1.5 lg:gap-2 items-center " : ""} ${
        !isShownDelayed ? "opacity-0" : `opacity-100`
      } transition-opacity duration-700 rounded-xl px-2 break-words-anywhere ${className}`}
      style={{
        boxShadow: isOutlined
          ? "inset 0 0 0 1px color-mix(in srgb, currentColor 10%, transparent)"
          : undefined,
        background: isFilled
          ? "color-mix(in srgb, currentColor 5%, transparent)"
          : undefined,
        marginRight: "auto",
        ...style,
      }}
    >
      {isNotNullable(indicator) && indicator}
      {src ? (
        <>
          <Picture src={src} size={size} />
          <span className={"text-left"}>
            <span>{text}</span>
          </span>
        </>
      ) : (
        text
      )}
    </span>
  );
}

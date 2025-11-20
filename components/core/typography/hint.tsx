import { ComponentTextOverflow } from "#constants/component";
import { ComponentTextOverflowValuesAlias } from "#types/component";
import { isNotNullable } from "#utils/validator";
import { CSSProperties, ReactNode } from "react";

interface HintProps {
  text?: ReactNode;
  className?: string;
  heightMultiplier?: number | null;
  textOverflow?: ComponentTextOverflowValuesAlias | null;
  indicatorBefore?: ReactNode;
  indicatorAfter?: ReactNode;
  style?: CSSProperties;
}

export function Hint({
  text,
  className = "",
  style,
  heightMultiplier = null,
  indicatorBefore = "(",
  indicatorAfter = ")",
  textOverflow = null,
}: HintProps) {
  return (
    <span
      style={
        textOverflow === ComponentTextOverflow.LineClamp && heightMultiplier
          ? {
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: heightMultiplier,
              ...style,
            }
          : style
      }
      className={`italic text-xxs sm:text-xs lg:text-sm font-light break-words-anywhere ${
        textOverflow !== ComponentTextOverflow.LineClamp &&
        textOverflow !== null
          ? textOverflow
          : ""
      } ${className}`}
    >
      {isNotNullable(indicatorBefore) && indicatorBefore}
      {text}
      {isNotNullable(indicatorAfter) && indicatorAfter}
    </span>
  );
}

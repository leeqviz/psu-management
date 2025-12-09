import { ComponentTextOverflow } from "#constants/component";
import { ComponentTextOverflowValuesAlias } from "#types/component";
import { isNotNullable } from "#utils/validator";
import { CSSProperties, ReactNode } from "react";
import { Gap } from "./gap";
import { Hint } from "./hint";
import { Required } from "./required";

interface LabelProps {
  text?: ReactNode;
  className?: string;
  heightMultiplier?: number | null;
  textOverflow?: ComponentTextOverflowValuesAlias | null;
  style?: CSSProperties;
  isRequired?: boolean;
  hint?: ReactNode;
  forId?: string | null;
}

export function Label({
  forId,
  text,
  hint,
  className = "",
  style,
  heightMultiplier = null,
  textOverflow = null,
  isRequired = false,
}: LabelProps) {
  return forId ? (
    <label
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
      className={`text-gray-500 break-words-anywhere ${
        textOverflow !== ComponentTextOverflow.LineClamp &&
        textOverflow !== null
          ? textOverflow
          : ""
      } ${className}`}
    >
      {text}
      {isRequired && (
        <>
          <Gap />
          <Required />
        </>
      )}
      {isNotNullable(hint) && (
        <>
          <Gap />
          <Hint text={hint} />
        </>
      )}
    </label>
  ) : (
    <div
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
      className={`text-gray-500 break-words-anywhere ${
        textOverflow !== ComponentTextOverflow.LineClamp &&
        textOverflow !== null
          ? textOverflow
          : ""
      } ${className}`}
    >
      {text}
      {isRequired && (
        <>
          <Gap />
          <Required />
        </>
      )}
      {isNotNullable(hint) && (
        <>
          <Gap />
          <Hint text={hint} />
        </>
      )}
    </div>
  );
}

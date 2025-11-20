import {
  ComponentColor,
  ComponentFontWeight,
  ComponentOrientation,
  ComponentTextOverflow,
  ComponentTextTransform,
} from "#constants/component";
import {
  ComponentColorValuesAlias,
  ComponentFontWeightValuesAlias,
  ComponentOrientationValuesAlias,
  ComponentTextOverflowValuesAlias,
  ComponentTextTransformValuesAlias,
} from "#types/component";
import { DEFAULT_COLOR } from "@/constants/faculty";
import { CSSProperties, PropsWithChildren } from "react";

interface DividerProps extends PropsWithChildren {
  orientation?: ComponentOrientationValuesAlias;
  color?: ComponentColorValuesAlias | null;
  textTransform?: ComponentTextTransformValuesAlias;
  fontWeight?: ComponentFontWeightValuesAlias;
  textOverflow?: ComponentTextOverflowValuesAlias;
  className?: string;
  heightMultiplier?: number | null;
  style?: CSSProperties;
}

function Divider({
  orientation = ComponentOrientation.Horizontal,
  color = ComponentColor.Default,
  className = "",
  textTransform = ComponentTextTransform.Uppercase,
  fontWeight = ComponentFontWeight.Medium,
  textOverflow = ComponentTextOverflow.LineClamp,
  heightMultiplier = 3,
  children,
  style,
}: DividerProps) {
  const colorClassNames =
    color === ComponentColor.Sky
      ? "bg-sky-500 border-sky-500"
      : color === ComponentColor.Red
      ? "bg-red-500 border-red-500"
      : color === ComponentColor.Gray
      ? "bg-gray-500 border-gray-500"
      : color === ComponentColor.Amber
      ? "bg-amber-500 border-amber-500"
      : color === ComponentColor.Violet
      ? "bg-violet-500 border-violet-500"
      : color === ComponentColor.Emerald
      ? "bg-emerald-500 border-emerald-500"
      : color === ComponentColor.Default
      ? "bg-gray-300 border-gray-300"
      : color === ComponentColor.Current
      ? `bg-${DEFAULT_COLOR} border-${DEFAULT_COLOR}`
      : "";

  return children ? (
    <div
      style={style}
      className={`flex items-center gap-2 sm:gap-3 lg:gap-4 transition-opacity duration-500 ${
        orientation === ComponentOrientation.Horizontal
          ? "flex-row"
          : "flex-col"
      } content-appearance ${className}`}
    >
      <div
        className={`grow shadow rounded-full border ${
          orientation === ComponentOrientation.Horizontal ? "h-px" : "w-px"
        } ${colorClassNames}`}
      />
      <div
        className={`text-center break-words-anywhere ${
          textOverflow !== ComponentTextOverflow.LineClamp &&
          textOverflow !== undefined
            ? textOverflow
            : ""
        } ${textTransform} ${fontWeight}`}
        style={
          textOverflow === ComponentTextOverflow.LineClamp && heightMultiplier
            ? {
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: heightMultiplier,
              }
            : undefined
        }
      >
        {children}
      </div>
      <div
        className={`grow shadow rounded-full border ${
          orientation === ComponentOrientation.Horizontal ? "h-px" : "w-px"
        } ${colorClassNames}`}
      />
    </div>
  ) : (
    <div
      style={style}
      className={`transition-opacity shadow duration-500 rounded-full border ${
        orientation === ComponentOrientation.Horizontal ? "h-px" : "w-px"
      } content-appearance ${colorClassNames} ${className}`}
    />
  );
}

export { Divider };

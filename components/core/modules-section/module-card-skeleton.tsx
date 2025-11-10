import { ComponentSize } from "#constants/component";
import { ComponentSizeValuesAlias } from "#types/component";
import { Property } from "csstype";
import { CSSProperties, PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
  size?: ComponentSizeValuesAlias | null;
  height?: Property.Height;
  width?: Property.Width;
  className?: string;
  style?: CSSProperties;
}

export function ModuleCardSkeleton({
  size = ComponentSize.Medium,
  height = "auto",
  width = "auto",
  className = "",
  style,
}: CardProps) {
  return (
    <div
      className={`cursor-default animate-pulse relative overflow-hidden bg-gray-300 rounded-xl flex flex-col ring-1 ring-inset ring-gray-300 duration-200 ${
        size === ComponentSize.SuperExtraSmall
          ? "p-0.5 sm:p-1 lg:p-1.5 gap-0.5 sm:gap-1 lg:gap-1.5"
          : size === ComponentSize.ExtraSmall
          ? "p-1 sm:p-1.5 lg:p-2 gap-1 sm:gap-1.5 lg:gap-2"
          : size === ComponentSize.Small
          ? "p-1.5 sm:p-2 lg:p-2.5 gap-1.5 sm:gap-2 lg:gap-2.5"
          : size === ComponentSize.Medium
          ? "p-2 sm:p-3 lg:p-4 gap-2 sm:gap-3 lg:gap-4"
          : size === ComponentSize.Long
          ? "p-3 sm:p-4 lg:p-5 gap-3 sm:gap-4 lg:gap-5"
          : size === ComponentSize.ExtraLong
          ? "p-4 sm:p-5 lg:p-6 gap-4 sm:gap-5 lg:gap-6"
          : size === ComponentSize.SuperExtraLong
          ? "p-6 sm:p-7 lg:p-8 gap-5 sm:gap-6 lg:gap-7"
          : ""
      } ${className}`}
      style={{
        height,
        width,
        ...style,
      }}
    ></div>
  );
}

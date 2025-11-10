import { ComponentSize } from "#constants/component";
import { ComponentSizeValuesAlias } from "#types/component";
import Image from "next/image";
import { CSSProperties } from "react";

interface PictureProps {
  src: string;
  alt?: string;
  className?: string;
  size?: ComponentSizeValuesAlias | null;
  isShrinkable?: boolean;
  style?: CSSProperties;
}

function Picture({
  src,
  alt = "",
  className = "",
  size = ComponentSize.Medium,
  isShrinkable = false,
  style,
}: PictureProps) {
  return (
    <Image
      src={src}
      alt={alt}
      style={style}
      className={`${
        size === ComponentSize.SuperExtraSmall
          ? "w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
          : size === ComponentSize.ExtraSmall
          ? "w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
          : size === ComponentSize.Small
          ? "w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7"
          : size === ComponentSize.Medium
          ? "w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
          : size === ComponentSize.Long
          ? "w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9"
          : size === ComponentSize.ExtraLong
          ? "w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10"
          : size === ComponentSize.SuperExtraLong
          ? "w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11"
          : ""
      } ${isShrinkable ? "shrink" : "shrink-0"} ${className}`}
    />
  );
}

export { Picture };

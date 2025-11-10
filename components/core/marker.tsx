"use client";
import { ComponentContentType, ComponentPlacement } from "#constants/component";
import { useFacultyAbbreviation } from "#hooks/routing";
import {
  ComponentContentTypeValuesAlias,
  ComponentPlacementValuesAlias,
} from "#types/component";
import { CSSProperties } from "react";

interface MarkerProps {
  isDisabled?: boolean;
  placement?: ComponentPlacementValuesAlias; // Omit extra types
  type?: ComponentContentTypeValuesAlias | null;
  className?: string;
  style?: CSSProperties;
}

export function Marker({
  isDisabled = false,
  placement = ComponentPlacement.Left,
  type = ComponentContentType.INFO,
  className = "",
  style,
}: MarkerProps) {
  const facultyAbb = useFacultyAbbreviation();

  return (
    <div
      style={style}
      className={`absolute transition-all duration-300 opacity-0 group-hover:opacity-100 ${
        placement === ComponentPlacement.Top
          ? "top-0 left-0 right-0"
          : placement === ComponentPlacement.Bottom
          ? "bottom-0 left-0 right-0"
          : placement === ComponentPlacement.Right
          ? "right-0 bottom-0 top-0"
          : "left-0 bottom-0 top-0"
      } ${
        placement === ComponentPlacement.Top ||
        placement === ComponentPlacement.Bottom
          ? "w-full h-0 group-hover:h-1.5 group-hover:md:h-2"
          : "h-full w-0 group-hover:w-1.5 group-hover:md:w-2"
      } ${
        !isDisabled
          ? `${
              type === ComponentContentType.SUCCESS
                ? "group-hover:bg-emerald-500"
                : type === ComponentContentType.WARNING
                ? "group-hover:bg-amber-500"
                : type === ComponentContentType.ERROR
                ? "group-hover:bg-red-500"
                : type === ComponentContentType.INFO
                ? `group-hover:bg-${facultyAbb}`
                : type === ComponentContentType.DEFAULT
                ? "group-hover:bg-gray-500"
                : ""
            }`
          : ""
      } ${className}`}
    />
  );
}

"use client";
import { ComponentPlacement } from "#constants/component";
import { ComponentPlacementValuesAlias } from "#types/component";
import { Property } from "csstype";
import { CSSProperties, PropsWithChildren } from "react";
import { Tooltip } from "./tooltip";

interface AbsoluteTooltipProps extends PropsWithChildren {
  isVisible?: boolean | null;
  placement?: ComponentPlacementValuesAlias | null;
  className?: string;
  width?: Property.Width;
  style?: CSSProperties;
}

function AbsoluteTooltip({
  isVisible = false,
  placement = ComponentPlacement.Left,
  children,
  className = "",
  width,
  style,
}: AbsoluteTooltipProps) {
  return (
    <Tooltip
      isVisible={isVisible}
      position={"absolute"}
      width={width}
      style={style}
      className={`${
        placement === ComponentPlacement.LeftTop
          ? "right-[125%] bottom-[125%]"
          : placement === ComponentPlacement.Top
          ? "inset-x-0 bottom-[125%]"
          : placement === ComponentPlacement.RightTop
          ? "bottom-[125%] left-[125%]"
          : placement === ComponentPlacement.Left
          ? "inset-y-0 right-[125%]"
          : placement === ComponentPlacement.Center
          ? "inset-0"
          : placement === ComponentPlacement.Right
          ? "inset-y-0 left-[125%]"
          : placement === ComponentPlacement.LeftBottom
          ? "top-[125%] right-[125%]"
          : placement === ComponentPlacement.Bottom
          ? "inset-x-0 top-[125%]"
          : placement === ComponentPlacement.RightBottom
          ? "top-[125%] left-[125%]"
          : ""
      } ${className}`}
    >
      {children}
    </Tooltip>
  );
}

export { AbsoluteTooltip };

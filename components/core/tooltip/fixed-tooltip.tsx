"use client";
import { ComponentPlacement } from "#constants/component";
import { useWindowSize } from "#hooks/window";
import { ComponentPlacementValuesAlias } from "#types/component";
import { Property } from "csstype";
import { CSSProperties, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { Tooltip } from "./tooltip";

interface FixedTooltipProps extends PropsWithChildren {
  isVisible?: boolean | null;
  placement?: ComponentPlacementValuesAlias | null;
  className?: string;
  width?: Property.Width;
  style?: CSSProperties;
  position?: { x?: number; y?: number };
  approximation?: number | null;
}

// TODO: use 'ref' as a prop of 'Tooltip' component in React v19 to get access to the tooltip width and do the calculation with placement
function FixedTooltip({
  isVisible = false,
  placement = ComponentPlacement.Left,
  children,
  className = "",
  width,
  style,
  position,
  approximation = 16,
}: FixedTooltipProps) {
  const windowSize = useWindowSize();

  return createPortal(
    <Tooltip
      isVisible={isVisible}
      width={width}
      position={"fixed"}
      className={className}
      style={
        placement === ComponentPlacement.LeftTop
          ? {
              top: (position?.y ?? 0) - (approximation ?? 0) * 3,
              right:
                windowSize.width -
                (position?.x ?? 0) +
                (approximation ?? 0) * 2,
              ...style,
            }
          : placement === ComponentPlacement.Top
          ? {
              top: (position?.y ?? 0) - (approximation ?? 0) * 3,
              left: position?.x ?? 0,
              ...style,
            }
          : placement === ComponentPlacement.RightTop
          ? {
              top: (position?.y ?? 0) - (approximation ?? 0) * 3,
              left: (position?.x ?? 0) + (approximation ?? 0) * 3,
              ...style,
            }
          : placement === ComponentPlacement.Left
          ? {
              top: (position?.y ?? 0) - 4,
              right:
                windowSize.width -
                (position?.x ?? 0) +
                (approximation ?? 0) * 2,
              ...style,
            }
          : placement === ComponentPlacement.Center
          ? {
              top: position?.y ?? 0,
              left: position?.x ?? 0,
              ...style,
            }
          : placement === ComponentPlacement.Right
          ? {
              top: (position?.y ?? 0) - 4,
              left: (position?.x ?? 0) + (approximation ?? 0) * 3,
              ...style,
            }
          : placement === ComponentPlacement.LeftBottom
          ? {
              top: (position?.y ?? 0) + (approximation ?? 0) * 3,
              right:
                windowSize.width -
                (position?.x ?? 0) +
                (approximation ?? 0) * 2,
              ...style,
            }
          : placement === ComponentPlacement.Bottom
          ? {
              top: (position?.y ?? 0) + (approximation ?? 0) * 3,
              left: position?.x ?? 0,
              ...style,
            }
          : placement === ComponentPlacement.RightBottom
          ? {
              top: (position?.y ?? 0) + (approximation ?? 0) * 3,
              left: (position?.x ?? 0) + (approximation ?? 0) * 3,
              ...style,
            }
          : style
      }
    >
      {children}
    </Tooltip>,
    document.body
  );
}

export { FixedTooltip };

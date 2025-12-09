"use client";
import { ComponentPlacement, ComponentSize } from "#constants/component";
import { useAudio, useLocalStorage } from "#hooks/window";
import {
  ComponentPlacementValuesAlias,
  ComponentSizeValuesAlias,
} from "#types/component";
import { DEFAULT_COLOR } from "@/constants/faculty";
import { SOUNDS_ARE_ON_KEY } from "@/constants/local-storage";
import { getBackgroundFacultyColorOpacity } from "@/utils/color-mapper";
import { Property } from "csstype";
import {
  CSSProperties,
  HTMLAttributeAnchorTarget,
  MouseEvent,
  PropsWithChildren,
} from "react";
import { ConditionalLink } from "./conditional-link";
import { Marker } from "./marker";

interface CardProps extends PropsWithChildren {
  isDisabled?: boolean;
  to?: string;
  target?: HTMLAttributeAnchorTarget;
  size?: ComponentSizeValuesAlias | null;
  marker?: ComponentPlacementValuesAlias | null;
  height?: Property.Height;
  width?: Property.Width;
  className?: string;
  onClick?: (e?: MouseEvent<HTMLElement>) => void;
  style?: CSSProperties;
}

export function Card({
  isDisabled = false,
  to,
  target,
  children,
  size = ComponentSize.Medium,
  marker = ComponentPlacement.Left,
  height = "auto",
  width = "auto",
  className = "",
  onClick,
  style,
}: CardProps) {
  const [flag] = useLocalStorage<boolean>(SOUNDS_ARE_ON_KEY, false);
  const tapAudio = useAudio(flag ? "/sounds/tap.mp3" : undefined);

  return (
    <ConditionalLink
      href={to ? to : ""}
      isDisabled={isDisabled}
      target={target}
      className={`relative overflow-hidden bg-white rounded-xl flex flex-col ring-1 ring-inset ring-gray-200 duration-200 ${
        !isDisabled
          ? `shadow-md hover:shadow-lg group cursor-pointer hover:scale-[1.025] active:scale-[0.975] hover:ring-${DEFAULT_COLOR} ${getBackgroundFacultyColorOpacity(
              DEFAULT_COLOR
            )}`
          : "cursor-default "
      } ${
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
      onClick={(e) => {
        tapAudio.reset();
        tapAudio.play();
        onClick?.(e);
      }}
      style={{
        height,
        width,
        ...style,
      }}
    >
      {marker && <Marker isDisabled={isDisabled} placement={marker} />}
      {children}
    </ConditionalLink>
  );
}

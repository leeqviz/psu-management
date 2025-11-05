export const ComponentContentType = {
  INFO: "info",
  ERROR: "error",
  WARNING: "warning",
  SUCCESS: "success",
  DEFAULT: "default",
} as const;

export const ComponentSize = {
  SuperExtraSmall: "xxs",
  ExtraSmall: "xs",
  Small: "sm",
  Medium: "md",
  Long: "lg",
  ExtraLong: "xl",
  SuperExtraLong: "2xl",
} as const;

export const ComponentColor = {
  Sky: "sky",
  Red: "red",
  Gray: "gray",
  Amber: "amber",
  Violet: "violet",
  Emerald: "emerald",
  Default: "default",
  Current: "current",
} as const;

export const ComponentPlacement = {
  LeftTop: "left-top",
  Top: "top",
  RightTop: "right-top",
  Left: "left",
  Center: "center",
  Right: "right",
  LeftBottom: "left-bottom",
  Bottom: "bottom",
  RightBottom: "right-bottom",
} as const;

export const ComponentDirection = {
  Left: "left",
  Right: "right",
  Bottom: "bottom",
  Top: "top",
} as const;

export const ComponentFontWeight = {
  Thin: "font-thin",
  Extralight: "font-extralight",
  Light: "font-light",
  Normal: "font-normal",
  Medium: "font-medium",
  Semibold: "font-semibold",
  Bold: "font-bold",
  Extrabold: "font-extrabold",
  Black: "font-black",
} as const;

export const ComponentTextTransform = {
  Uppercase: "uppercase",
  Lowercase: "lowercase",
  Capitalize: "capitalize",
  NormalCase: "normal-case",
} as const;

export const ComponentTextOverflow = {
  Truncate: "truncate",
  TextEllipsis: "text-ellipsis",
  TextClip: "text-clip",
  LineClamp: "line-clamp",
} as const;

export const ComponentOrientation = {
  Both: "both",
  Horizontal: "horizontal",
  Vertical: "vertical",
} as const;

export const ComponentOverflowIndicator = {
  Scrollbars: "scrollbars",
  Shadows: "shadows",
  Both: "both",
} as const;

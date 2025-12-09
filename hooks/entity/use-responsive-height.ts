import { ScreenWidth } from "#constants/screen";
import { useWindowSize } from "#hooks/window";
import { ScreenBreakpoints } from "#types/screen";
import { useMemo } from "react";

interface ResponsiveHeightOptions {
  heightMultiplier?: number | null;
  paddingHeightBreakpoints?: ScreenBreakpoints | null;
  lineHeightBreakpoints?: ScreenBreakpoints | null;
}

export const useResponsiveHeight = ({
  heightMultiplier = 1,
  paddingHeightBreakpoints = {
    lg: 16,
    md: 16,
    sm: 12,
    xs: 12,
  },
  lineHeightBreakpoints = {
    lg: 28,
    md: 24,
    sm: 24,
    xs: 20,
  },
}: ResponsiveHeightOptions) => {
  const windowSize = useWindowSize();

  return useMemo(
    () =>
      windowSize.width >= ScreenWidth.Long
        ? (paddingHeightBreakpoints?.lg ?? 0) +
          (heightMultiplier ?? 0) * (lineHeightBreakpoints?.lg ?? 0)
        : windowSize.width >= ScreenWidth.Medium
        ? (paddingHeightBreakpoints?.md ?? 0) +
          (heightMultiplier ?? 0) * (lineHeightBreakpoints?.md ?? 0)
        : windowSize.width >= ScreenWidth.Small
        ? (paddingHeightBreakpoints?.sm ?? 0) +
          (heightMultiplier ?? 0) * (lineHeightBreakpoints?.sm ?? 0)
        : (paddingHeightBreakpoints?.xs ?? 0) +
          (heightMultiplier ?? 0) * (lineHeightBreakpoints?.xs ?? 0),
    [
      windowSize.width,
      heightMultiplier,
      lineHeightBreakpoints,
      paddingHeightBreakpoints,
    ]
  );
};

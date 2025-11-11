import { CSSProperties, MouseEvent, ReactNode } from "react";
import { IconButton } from "./icon-button";

interface SoundIconButtonProps {
  soundsAreOn?: boolean;
  tooltipBefore?: ReactNode;
  tooltipAfter?: ReactNode;
  text?: ReactNode;
  isDisabled?: boolean;
  isScalable?: boolean;
  isReversed?: boolean;
  onClick?: (e?: MouseEvent<HTMLElement>) => void;
  className?: string;
  style?: CSSProperties;
}

function SoundIconButton({
  soundsAreOn = false,
  isDisabled = false,
  isScalable = true,
  isReversed = false,
  tooltipBefore = "Звук выключен",
  tooltipAfter = "Звук включен",
  text,
  onClick,
  className = "",
}: SoundIconButtonProps) {
  return (
    <IconButton
      isDisabled={isDisabled}
      isScalable={isScalable}
      isReversed={isReversed}
      tooltip={soundsAreOn ? tooltipAfter : tooltipBefore}
      text={text}
      onClick={onClick}
      className={className}
      renderSvg={(svgProps?: React.SVGProps<SVGSVGElement>) => (
        <svg
          {...svgProps}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#374151"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={
              soundsAreOn
                ? "M2 10v4q0 3 3 3h1.43c.37 0 .74.11 1.06.3l2.92 1.83c2.52 1.58 4.59.43 4.59-2.54V7.41c0-2.98-2.07-4.12-4.59-2.54L7.49 6.7c-.32.19-.69.3-1.06.3H5q-3 0-3 3m16-2a6.66 6.66 0 0 1 0 8m1.83-10.5a10.83 10.83 0 0 1 0 13"
                : "M15 8.37v-.96c0-2.98-2.07-4.12-4.59-2.54L7.49 6.7c-.32.19-.69.3-1.06.3H5q-3 0-3 3v4q0 3 3 3h2m3.41 2.13c2.52 1.58 4.59.43 4.59-2.54v-3.64m3.81-3.53c.9 2.15.63 4.66-.81 6.58m3.15-8.2a10.82 10.82 0 0 1-1.32 10.7M22 2 2 22"
            }
          />
        </svg>
      )}
    />
  );
}

export { SoundIconButton };

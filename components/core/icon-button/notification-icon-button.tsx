import { CSSProperties, MouseEvent, ReactNode } from "react";
import { IconButton } from "./icon-button";

interface NotificationIconButtonProps {
  notificationsAreOn?: boolean;
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

function NotificationIconButton({
  notificationsAreOn = false,
  isDisabled = false,
  isScalable = true,
  isReversed = false,
  tooltipBefore = "Уведомления выключены",
  tooltipAfter = "Уведомления включены",
  text,
  onClick,
  className = "",
  style,
}: NotificationIconButtonProps) {
  return (
    <IconButton
      isDisabled={isDisabled}
      isScalable={isScalable}
      isReversed={isReversed}
      tooltip={notificationsAreOn ? tooltipAfter : tooltipBefore}
      text={text}
      onClick={onClick}
      className={className}
      style={style}
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
          {notificationsAreOn ? (
            <path d="M9.5 19H5.617a1 1 0 0 1-.893-1.447l.854-1.708A4 4 0 0 0 6 14.056V11c0-2 1-6 6-6s6 4 6 6v3.056c0 .621.145 1.233.422 1.789l.854 1.708A1 1 0 0 1 18.382 19H14.5m-5 0c0 2 1 3 2.5 3s2.5-1 2.5-3m-5 0h5M12 5V3" />
          ) : (
            <>
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M6 15v-4c0-2 1-6 6-6 1.572 0 2.749.396 3.624 1M9.5 19c0 2 1 3 2.5 3s2.5-1 2.5-3m-5 0h5m-5 0h-2m7 0h3.882a1 1 0 0 0 .894-1.447L18 15v-4c0-.624-.098-1.444-.384-2.276M12 5V3m9 0L3 21" />
            </>
          )}
        </svg>
      )}
    />
  );
}

export { NotificationIconButton };

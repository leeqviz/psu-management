"use client";
import { DELAY_TIME } from "#constants/time";
import { useFacultyAbbreviation } from "#hooks/routing";
import { isNotNullable } from "#utils/validator";
import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

interface RefreshIndicatorProps {
  trigger?: unknown | null;
  delay?: number;
  text?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

function RefreshIndicator({
  trigger = null,
  text,
  delay = DELAY_TIME,
  className = "",
  style,
}: RefreshIndicatorProps) {
  const facultyAbb = useFacultyAbbreviation();
  const [isUpdated, setIsUpdated] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setTimeout(() => setIsUpdated(true), DELAY_TIME);
  }, [trigger]);

  useEffect(() => {
    if (isUpdated)
      timer.current = setTimeout(() => setIsUpdated(false), delay * 10);

    return () => clearTimeout(timer.current);
  }, [isUpdated, delay]);

  return (
    <div
      className={`${
        isUpdated ? "opacity-100 animate-pulse" : "opacity-0"
      } transition-opacity duration-300 bg-gray-50 rounded ${className}`}
      style={{ animationDuration: "1s", ...style }}
    >
      {isNotNullable(text) ? (
        <span className={`text-xxs sm:text-xs lg:text-sm text-${facultyAbb}`}>
          {text}
        </span>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#374151"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 stroke-${facultyAbb}`}
        >
          <path d="M16 21v-2c0-1.886 0-2.828-.586-3.414S13.886 15 12 15h-1c-1.886 0-2.828 0-3.414.586S7 17.114 7 19v2M7 8h5" />
          <path d="M3 9c0-2.828 0-4.243.879-5.121C4.757 3 6.172 3 9 3h7.172c.408 0 .613 0 .796.076s.329.22.618.51l2.828 2.828c.29.29.434.434.51.618.076.183.076.388.076.796V15c0 2.828 0 4.243-.879 5.121C19.243 21 17.828 21 15 21H9c-2.828 0-4.243 0-5.121-.879C3 19.243 3 17.828 3 15z" />
        </svg>
      )}
    </div>
  );
}

export { RefreshIndicator };

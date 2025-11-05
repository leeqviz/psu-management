import { useEffect, useRef, useState } from "react";

interface DelayedToggleOptions {
  enterDelay?: number | null;
  exitDelay?: number | null;
}

export const useDelayedToggle = (
  flag: boolean,
  options?: DelayedToggleOptions
) => {
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [delayedFlag, setDelayedFlag] = useState(false);

  useEffect(() => {
    if (flag) {
      if (options?.enterDelay !== undefined)
        timer.current = setTimeout(
          () => setDelayedFlag(flag),
          options.enterDelay ?? 0
        );
      else setDelayedFlag(flag);
    } else {
      if (options?.exitDelay !== undefined)
        timer.current = setTimeout(
          () => setDelayedFlag(flag),
          options.exitDelay ?? 0
        );
      else setDelayedFlag(flag);
    }

    return () => clearTimeout(timer.current);
  }, [flag, options]);

  return delayedFlag;
};

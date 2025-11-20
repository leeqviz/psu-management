import { ComponentOrientation } from "#constants/component";
import { ComponentOrientationValuesAlias } from "#types/component";
import { RefObject, useLayoutEffect, useState } from "react";

export const useElementOverflow = (
  ref: RefObject<HTMLElement>,
  orientation?: ComponentOrientationValuesAlias
) => {
  const [isOverflow, setIsOverflow] = useState(false);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const trigger = () => {
      let hasOverflow = false;

      if (orientation === ComponentOrientation.Vertical) {
        hasOverflow = element.scrollHeight > element.clientHeight;
      } else if (orientation === ComponentOrientation.Horizontal) {
        hasOverflow = element.scrollWidth > element.clientWidth;
      } else {
        hasOverflow =
          element.scrollHeight > element.clientHeight ||
          element.scrollWidth > element.clientWidth;
      }

      setIsOverflow(hasOverflow);
    };

    const resizeObserver = new ResizeObserver(trigger);
    resizeObserver.observe(element);

    trigger(); //first check on first render

    return () => {
      resizeObserver.unobserve(element);
      resizeObserver.disconnect();
    };
  }, [ref, orientation]);

  return isOverflow;
};

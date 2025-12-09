import { RefObject, useEffect, useState } from "react";

export const useElementClickOutside = (ref: RefObject<HTMLElement>) => {
  const [isOutside, setIsOutside] = useState<boolean>(false);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setIsOutside(true);
      else setIsOutside(false);
    };

    document.addEventListener("mousedown", handleClick, true);
    return () => {
      document.removeEventListener("mousedown", handleClick, true);
    };
  }, [ref]);

  return isOutside;
};

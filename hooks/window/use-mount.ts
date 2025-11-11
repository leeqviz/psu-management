import { useEffect, useState } from "react";

export const useMount = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsMounted(true));
  }, []);

  return isMounted;
};

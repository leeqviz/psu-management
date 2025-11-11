import { isServer } from "#utils/window";
import { useCallback, useEffect, useState } from "react";

interface WindowSize {
  width: number;
  height: number;
}

/**
 * Get the current window dimensions in a Next.js safe way.
 * - Returns {width: 0, height: 0} during SSR
 * - Updates with real values after hydration
 * - Responds to window resize events
 *
 * Usage:
 * ```tsx
 * const MyComponent = () => {
 *   const { width, height } = useWindowSize();
 *
 *   // Optional: Only render content after hydration
 *   if (width === 0 && height === 0) {
 *     return null; // or loading state
 *   }
 *
 *   return (
 *     <div>
 *       Window size: {width} x {height}
 *     </div>
 *   );
 * };
 * ```
 */
export const useWindowSize = () => {
  // Initialize with SSR-safe values
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  // Memoize the getWindowSize function
  const getWindowSize = useCallback((): WindowSize => {
    if (isServer()) return { width: 0, height: 0 };
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }, []);

  useEffect(() => {
    // Skip effects during SSR
    if (isServer()) return;

    // Update size after hydration (deferred to avoid lint warning)
    requestAnimationFrame(() => {
      setWindowSize(getWindowSize());
    });

    const handleResize = () => {
      // Debounce resize updates
      requestAnimationFrame(() => {
        setWindowSize(getWindowSize());
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [getWindowSize]); // Only depend on the memoized getter

  return windowSize;
};

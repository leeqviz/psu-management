import { useCallback, useMemo } from "react";

/**
 *
 * @param src
 * @returns audio controls object
 */
//TODO: rewrite it in function
export const useAudio = (src?: string) => {
  const sound = useMemo(() => {
    return src ? new Audio(src) : null;
  }, [src]);

  const reset = useCallback(() => {
    if (sound && !sound.paused) {
      sound.pause();
      sound.currentTime = 0;
    }
  }, [sound]);

  const play = useCallback(() => {
    if (sound) sound.play().catch((e) => console.error(e));
  }, [sound]);

  const pause = useCallback(() => {
    if (sound) sound.pause();
  }, [sound]);

  return { reset, play, pause };
};

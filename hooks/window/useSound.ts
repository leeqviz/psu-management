import { RefObject, useCallback } from "react";

export const useSound = (ref: RefObject<HTMLAudioElement | null>) => {
  const reset = useCallback(() => {
    if (ref.current && !ref.current.paused) {
      ref.current.pause();
      ref.current.currentTime = 0;
    }
  }, [ref]);

  const play = useCallback(() => {
    if (ref.current) ref.current.play().catch((e) => console.error(e));
  }, [ref]);

  const pause = useCallback(() => {
    if (ref.current) ref.current.pause();
  }, [ref]);

  return { reset, play, pause };
};

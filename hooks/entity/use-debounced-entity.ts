import { DELAY_TIME } from "#constants/time";
import { useEffect, useRef, useState } from "react";

export const useDebouncedEntity = <TEntity = unknown>(
  entity: TEntity,
  delay: number = DELAY_TIME * 2
) => {
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [debouncedEntity, setDebouncedEntity] = useState(entity);

  useEffect(() => {
    timer.current = setTimeout(() => setDebouncedEntity(entity), delay);

    return () => clearTimeout(timer.current);
  }, [entity, delay]);

  return debouncedEntity;
};

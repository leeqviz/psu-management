import { useEffect, useState } from "react";

export const useMemorizedEntity = <TEntity = unknown>(entity: TEntity) => {
  const [memorizedEntity, setMemorizedEntity] = useState<TEntity | null>(null);

  useEffect(() => {
    if (entity) setMemorizedEntity(entity);
  }, [entity]);

  return memorizedEntity;
};

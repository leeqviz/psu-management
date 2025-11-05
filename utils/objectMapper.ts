import { DynamicEntity } from "#types/utilityTypes";

/**
 * Compares each property of two objects and returns an object with different properties.
 * If there are no changes, an empty object will be returned
 */
export const getChangedProperties = <
  TFirst extends DynamicEntity = DynamicEntity,
  TSecond extends DynamicEntity = DynamicEntity
>(
  first: TFirst,
  second: TSecond
) => {
  const changedProperties: DynamicEntity = {};

  for (const key in second) {
    const initialKey = key as unknown as keyof typeof first;
    if (
      (second[initialKey as unknown as keyof typeof second] as unknown) !==
      (first[initialKey as unknown as keyof typeof first] as unknown) //will be 'true' if first prop or second prop types are different (for example 'number' and 'string')
    )
      changedProperties[initialKey] =
        second[initialKey as unknown as keyof typeof second];
  }

  return changedProperties;
};

export const deleteUndefinedProperties = <
  TEntity extends DynamicEntity = DynamicEntity
>(
  obj: TEntity
) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined)
  );
};

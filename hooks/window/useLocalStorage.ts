import { localStorageService } from "#services";
import { Nullable } from "#types/utilityTypes";
import { objectsAreEqual } from "#utils/comparator";
import { tryParseJson, tryStringifyJson } from "#utils/safeJson";
import { isServer } from "@/utils/window";
import { useCallback, useEffect, useState } from "react";

export const useLocalStorage = <TValue = unknown>(
  key: string,
  defaultValue: TValue,
  isJson: boolean = true
): [TValue | string, (value: TValue) => void, () => void] => {
  if (isServer()) console.error("useLocalStorage is not supported on server");
  //get value from local storage
  const getStoredValue: () => Nullable<TValue | string> = useCallback(() => {
    if (isServer()) return null;
    const value = localStorageService.getItem(key);
    if (isJson) return value ? tryParseJson<TValue>(value) : null;
    else return value;
  }, [key, isJson]);

  //set default value
  const [storedValue, setStoredValue] = useState<TValue | string>(() => {
    return getStoredValue() ?? defaultValue;
  });

  //manual local storage value update
  const setValue = (value: TValue) => {
    if (isServer()) return;
    const oldValue = localStorageService.getItem(key);
    //check if value exists in local storage
    if (oldValue) {
      //update local storage value only if old and new values are not equal

      if (!objectsAreEqual(value, isJson ? tryParseJson(oldValue) : oldValue)) {
        const newValue = isJson ? tryStringifyJson(value) : value;
        if (typeof newValue === "string") {
          localStorageService.setItem(key, newValue);
          setStoredValue(value);
        }
      }
      //if value does not exist in local storage, then create it
    } else {
      const newValue = isJson ? tryStringifyJson(value) : value;
      if (typeof newValue === "string") {
        localStorageService.setItem(key, newValue);
        setStoredValue(value);
      }
    }
  };

  //remove local storage value and set state to default
  const removeValue = () => {
    if (isServer()) return;
    const oldValue = localStorageService.getItem(key);
    //check if value exists in local storage
    if (oldValue) {
      localStorageService.removeItem(key);
      setStoredValue(defaultValue);
    }
  };

  //just a safe
  useEffect(() => {
    setStoredValue(getStoredValue() ?? defaultValue);
  }, [key, getStoredValue, defaultValue]);

  //update state if local storage value has changed
  const handleStorageChange = useCallback(
    (e: StorageEvent) => {
      if (isServer()) return;
      //compare keys
      if (e.key === key) {
        setStoredValue(getStoredValue() ?? defaultValue);
      }
    },
    [key, getStoredValue, defaultValue]
  );

  useEffect(() => {
    if (!isServer()) window.addEventListener("storage", handleStorageChange);
    return () => {
      if (!isServer())
        window.removeEventListener("storage", handleStorageChange);
    };
  }, [handleStorageChange]);

  return [storedValue, setValue, removeValue];
};

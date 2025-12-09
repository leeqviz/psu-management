import { objectsAreEqual } from "#utils/comparator";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "#utils/local-storage";
import { tryParseJson, tryStringifyJson } from "#utils/safeJson";
import { isServer } from "#utils/validator";
import { Nullable } from "@/types/utility-types";
import { useCallback, useEffect, useState } from "react";

export const useLocalStorage = <TValue = unknown>(
  key: string,
  defaultValue: TValue,
  isJson: boolean = true
): [TValue | string, (value: TValue) => void, () => void] => {
  //get value from local storage
  const getStoredValue: () => Nullable<TValue | string> = useCallback(() => {
    if (isServer()) return null;
    const value = getLocalStorageItem(key);
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

    function setNewValue() {
      const newValue = isJson ? tryStringifyJson(value) : value;
      if (typeof newValue === "string") {
        setLocalStorageItem(key, newValue);
        setStoredValue(value);
      }
    }

    const oldValue = getLocalStorageItem(key);

    //if value does not exist in local storage, then create it
    if (!oldValue) {
      setNewValue();
      return;
    }

    //update local storage value only if old and new values are not equal
    if (!objectsAreEqual(value, isJson ? tryParseJson(oldValue) : oldValue)) {
      setNewValue();
    }
  };

  //remove local storage value and set state to default
  const removeValue = () => {
    if (isServer()) return;
    const oldValue = getLocalStorageItem(key);
    //check if value exists in local storage
    if (oldValue) {
      removeLocalStorageItem(key);
      setStoredValue(defaultValue);
    }
  };

  //just a safe
  useEffect(() => {
    requestAnimationFrame(() =>
      setStoredValue(getStoredValue() ?? defaultValue)
    );
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
    if (isServer()) return;
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [handleStorageChange]);

  return [storedValue, setValue, removeValue];
};

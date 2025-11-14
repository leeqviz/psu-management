import {
  AUTH_ACCESS_TOKEN_KEY,
  AUTH_REFRESH_TOKEN_KEY,
  UPBE_TOKEN_KEY,
  UPBE_TOKEN_V2_KEY,
  USER_KEY,
} from "@/constants/local-storage";
import { decrypt, encrypt } from "@/lib/crypto";
import { User } from "@/types/access-control";
import { isServer } from "@/utils/validator";
import "client-only";

/** Dispatch storage event to track value changes in event listener */
export function dispatchLocalStorageEvent(
  key: string,
  oldValue?: string | null,
  newValue?: string | null
) {
  if (isServer()) return;
  window.dispatchEvent(
    new StorageEvent("storage", {
      key,
      newValue,
      oldValue,
      storageArea: localStorage,
      url: window.location.href,
    })
  );
}

export function getLocalStorageItem(key: string) {
  if (isServer()) return null;

  return localStorage.getItem(key);
}
export function setLocalStorageItem(key: string, value: string) {
  if (isServer()) return;

  const oldValue = getLocalStorageItem(key);
  localStorage.setItem(key, value);
  dispatchLocalStorageEvent(key, oldValue, value);
}
export function removeLocalStorageItem(key: string) {
  if (isServer()) return;

  const oldValue = getLocalStorageItem(key);
  localStorage.removeItem(key);
  dispatchLocalStorageEvent(key, oldValue, null);
}
export function clearLocalStorage() {
  if (isServer()) return;

  // TODO: add event listener to clear method
  //removeItem(key);
  //...
  localStorage.clear();
}

export function getAccessToken() {
  return getLocalStorageItem(AUTH_ACCESS_TOKEN_KEY);
}
export function setAccessToken(value: string) {
  setLocalStorageItem(AUTH_ACCESS_TOKEN_KEY, value);
}

export function getRefreshToken() {
  return getLocalStorageItem(AUTH_REFRESH_TOKEN_KEY);
}
export function setRefreshToken(value: string) {
  setLocalStorageItem(AUTH_REFRESH_TOKEN_KEY, value);
}

export function getUPBEToken() {
  return getLocalStorageItem(UPBE_TOKEN_KEY);
}
export function setUPBEToken(value: string) {
  setLocalStorageItem(UPBE_TOKEN_KEY, value);
}

export function getUPBETokenV2() {
  return getLocalStorageItem(UPBE_TOKEN_V2_KEY);
}
export function setUPBETokenV2(value: string) {
  setLocalStorageItem(UPBE_TOKEN_V2_KEY, value);
}

export function getUser() {
  const encrypted = getLocalStorageItem(USER_KEY);
  return encrypted ? decrypt<User>(encrypted) ?? null : null;
}
export function setUser(value: User) {
  const encrypted = encrypt(value) ?? "";
  setLocalStorageItem(USER_KEY, encrypted);
}

export function clearUser() {
  removeLocalStorageItem(AUTH_ACCESS_TOKEN_KEY);
  removeLocalStorageItem(AUTH_REFRESH_TOKEN_KEY);
  removeLocalStorageItem(UPBE_TOKEN_KEY);
  removeLocalStorageItem(UPBE_TOKEN_V2_KEY);
  removeLocalStorageItem(USER_KEY);
}

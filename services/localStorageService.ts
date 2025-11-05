import {
  AUTH_ACCESS_TOKEN_KEY,
  AUTH_REFRESH_TOKEN_KEY,
  UPBE_TOKEN_KEY,
  UPBE_TOKEN_V2_KEY,
  USER_KEY,
} from "#constants/localStorageKeys";
import { User } from "#types/accessControl";
import { decrypt, encrypt } from "#utils/cryptography";

class LocalStorageService {
  /** Dispatch storage event to track value changes in event listener */
  _createStorageEvent = (
    key: string,
    oldValue?: string | null,
    newValue?: string | null
  ) => {
    window.dispatchEvent(
      new StorageEvent("storage", {
        key,
        newValue,
        oldValue,
        storageArea: localStorage,
        url: window.location.href,
      })
    );
  };

  getAccessToken = () => localStorage.getItem(AUTH_ACCESS_TOKEN_KEY);
  setAccessToken = (value: string) => {
    const oldValue = localStorage.getItem(AUTH_ACCESS_TOKEN_KEY);
    localStorage.setItem(AUTH_ACCESS_TOKEN_KEY, value);
    this._createStorageEvent(AUTH_ACCESS_TOKEN_KEY, oldValue, value);
  };

  getRefreshToken = () => localStorage.getItem(AUTH_REFRESH_TOKEN_KEY);
  setRefreshToken = (value: string) => {
    const oldValue = localStorage.getItem(AUTH_REFRESH_TOKEN_KEY);
    localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, value);
    this._createStorageEvent(AUTH_REFRESH_TOKEN_KEY, oldValue, value);
  };

  getUPBEToken = () => localStorage.getItem(UPBE_TOKEN_KEY);
  setUPBEToken = (value: string) => {
    const oldValue = localStorage.getItem(UPBE_TOKEN_KEY);
    localStorage.setItem(UPBE_TOKEN_KEY, value);
    this._createStorageEvent(UPBE_TOKEN_KEY, oldValue, value);
  };

  getUPBETokenV2 = () => localStorage.getItem(UPBE_TOKEN_V2_KEY);
  setUPBETokenV2 = (value: string) => {
    const oldValue = localStorage.getItem(UPBE_TOKEN_V2_KEY);
    localStorage.setItem(UPBE_TOKEN_V2_KEY, value);
    this._createStorageEvent(UPBE_TOKEN_V2_KEY, oldValue, value);
  };

  getUser = () => {
    const encrypted = localStorage.getItem(USER_KEY);
    return encrypted ? decrypt<User>(encrypted) ?? null : null;
  };

  setUser = (value: User) => {
    const oldValue = localStorage.getItem(USER_KEY);
    const encrypted = encrypt(value) ?? "";
    localStorage.setItem(USER_KEY, encrypted);
    this._createStorageEvent(USER_KEY, oldValue, encrypted);
  };

  clearUserCredentials = () => {
    localStorage.removeItem(AUTH_ACCESS_TOKEN_KEY);
    localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY);
    localStorage.removeItem(UPBE_TOKEN_KEY);
    localStorage.removeItem(UPBE_TOKEN_V2_KEY);
    localStorage.removeItem(USER_KEY);
  };

  getItem = (key: string) => localStorage.getItem(key);
  setItem = (key: string, value: string) => {
    const oldValue = localStorage.getItem(key);
    localStorage.setItem(key, value);
    this._createStorageEvent(key, oldValue, value);
  };
  removeItem = (key: string) => {
    const oldValue = localStorage.getItem(key);
    localStorage.removeItem(key);
    this._createStorageEvent(key, oldValue, null);
  };
  clear = () => {
    // TODO: add event listener to clear method
    //localStorage.removeItem(key);
    //...
    localStorage.clear();
  };
}

export const localStorageService = new LocalStorageService();

import { AuthStoreContext } from "#components/core/providers/auth-store-provider";
import { AuthStore } from "#stores/auth-store";
import { useContext } from "react";
import { useStore } from "zustand";

export const useAuthStore = <T>(selector: (store: AuthStore) => T): T => {
  const authStoreContext = useContext(AuthStoreContext);

  if (!authStoreContext) {
    throw new Error("useAuthStore must be used within a UserStoreProvider");
  }

  // Connect the store from context to React's rendering system
  // zustand alternative for useSyncExternalStore
  return useStore(authStoreContext, selector);
};

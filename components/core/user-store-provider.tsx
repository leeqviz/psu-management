"use client";

import { createUserStore } from "@/stores/auth-store";
import { createContext, useRef } from "react";

export type UserStoreApi = ReturnType<typeof createUserStore>;
export const UserStoreContext = createContext<UserStoreApi | null>(null);
interface UserStoreProviderProps {
  children: React.ReactNode;
}
function UserStoreProvider({ children }: UserStoreProviderProps) {
  const storeRef = useRef<UserStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createUserStore();
  }

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  );
}

export { UserStoreProvider };

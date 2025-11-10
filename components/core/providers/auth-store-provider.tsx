"use client";

import { createAuthStore } from "#stores/auth-store";
import { createContext, useRef } from "react";

export type AuthStoreApi = ReturnType<typeof createAuthStore>;
export const AuthStoreContext = createContext<AuthStoreApi | null>(null);

interface AuthStoreProviderProps {
  children: React.ReactNode;
}

function AuthStoreProvider({ children }: AuthStoreProviderProps) {
  const storeRef = useRef<AuthStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createAuthStore();
  }

  return (
    // eslint-disable-next-line react-hooks/refs
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  );
}

export { AuthStoreProvider };

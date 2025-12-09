"use client";

import { createAuthStore } from "#stores/auth-store";
import { User } from "@/types/access-control";
import { createContext, useRef } from "react";

export type AuthStoreApi = ReturnType<typeof createAuthStore>;
export const AuthStoreContext = createContext<AuthStoreApi | null>(null);

interface AuthStoreProviderProps {
  children: React.ReactNode;
  initialUser?: User;
}

// The Provider creates the store just ONCE with provided initial state
export function AuthStoreProvider({
  children,
  initialUser,
}: AuthStoreProviderProps) {
  // Use Ref to keep the store instance stable (avoid re-creation)
  const storeRef = useRef<AuthStoreApi | null>(null);
  // Create store ONLY once
  if (storeRef.current === null) {
    storeRef.current = createAuthStore({
      user: initialUser || null,
      isHydrated: true,
      error: null,
      isLoading: false,
    });
  }

  return (
    // ref instance to avoid re-renders
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  );
}

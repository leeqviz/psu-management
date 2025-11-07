"use client";

import { useAuthStore } from "@/hooks/stateManagement/useAuthStore";
import { User } from "@/types/accessControl";
import { useRef } from "react";

interface StoreInitializerProps {
  user: User | null;
}

// This component is responsible for "hydrating" the store
function AuthStoreInitializer({ user }: StoreInitializerProps) {
  // Use a ref to ensure this runs only once
  const initialized = useRef(false);
  const { hydrate } = useAuthStore((state) => state);

  // eslint-disable-next-line react-hooks/refs
  if (!initialized.current) {
    // On the very first render, call the `hydrate` action
    hydrate(user);
    initialized.current = true;
  }

  return null; // This component renders nothing
}

export { AuthStoreInitializer };

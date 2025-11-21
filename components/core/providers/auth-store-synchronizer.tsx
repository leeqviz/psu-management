"use client";

import { useAuthStore } from "@/hooks/state-management";
import { User } from "@/types/access-control";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

interface Props {
  user: User | null;
}

// This component is responsible for "hydrating" and synchronizing the store
export function AuthStoreSynchronizer({ user }: Props) {
  const { hydrate, me } = useAuthStore((state) => state);

  // Use a ref to ensure this runs only once
  const hydrated = useRef(false);
  if (!hydrated.current) {
    // On the very first render, call the `hydrate` action
    hydrate(user);
    hydrated.current = true;
  }

  const pathname = usePathname();
  useEffect(() => {
    me();
  }, [pathname, me]);

  return null; // This component renders nothing
}

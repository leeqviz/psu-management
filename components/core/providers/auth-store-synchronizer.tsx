"use client";

import { useAuthStore } from "@/hooks/state-management";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function AuthStoreSynchronizer() {
  const { me } = useAuthStore((state) => state);

  const pathname = usePathname();
  useEffect(() => {
    me();
  }, [pathname, me]);

  return null; // This component renders nothing
}

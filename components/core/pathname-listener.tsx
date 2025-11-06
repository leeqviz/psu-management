"use client"; // This must be a Client Component

import { useUserStore } from "@/hooks/stateManagement/useUserStore";
import { usePathname } from "next/navigation"; // Import from 'next/navigation'
import { useEffect } from "react";

export function PathnameListener() {
  const pathname = usePathname();

  // We get the action from the store's API
  // This is a "non-reactive" way to get the action
  const { me } = useUserStore((state) => state);

  useEffect(() => {
    // Call the action on every pathname change
    me();
  }, [pathname, me]);

  return null; // This component doesn't render anything
}

"use client";

import { useEffect, useState } from "react";
import { LoadingContent } from "./loading-content";

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate hydration, asset loading, etc.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Show for 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
          color: "white",
          zIndex: 9999,
        }}
      >
        <LoadingContent />
      </div>
    );
  }

  // Once loading is false, render the actual app
  return <>{children}</>;
}

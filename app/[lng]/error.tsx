"use client"; // This is required

import { Button } from "@/components/ui/button";
import { APP_ROUTING } from "@/constants/routing";
import { useTranslation } from "@/hooks/routing";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Use the client hook for translations
  const { t } = useTranslation("common"); // 'common' or a dedicated 'error' namespace

  useEffect(() => {
    // You can log the error to a service like Sentry
    console.error(error);
  }, [error]);

  return (
    <div
      className="flex flex-col gap-2"
      style={{ textAlign: "center", marginTop: "50px" }}
    >
      <h2>{t("error.title", "Something went wrong!")}</h2>
      <p>{t("error.message", "An unexpected error occurred.")}</p>
      <Button
        onClick={
          // Attempt to recover by re-rendering the segment
          () => reset()
        }
      >
        {t("error.retry", "Try again")}
      </Button>
      <Link href={APP_ROUTING.home.path}>Or go home</Link>
    </div>
  );
}

"use client";

import { useTranslation } from "@/hooks/routing";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";

export function LanguageSwitcher() {
  // 1. Call the client-side hook
  const { i18n } = useTranslation("common");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const changeLanguage = () => {
    const newLng = i18n.language === "en" ? "ru" : "en";

    // Replace the language in the URL
    const newPath = pathname.replace(`/${i18n.language}`, `/${newLng}`);

    // Set cookie and navigate
    document.cookie = `${"i18next"}=${newLng}; path=/`;
    startTransition(() => {
      router.push(newPath);
    });
  };
  return (
    <Button loading={isPending} onClick={changeLanguage}>
      {i18n.language}
    </Button>
  );
}

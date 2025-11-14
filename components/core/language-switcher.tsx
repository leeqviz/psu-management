"use client";

import { useTranslation } from "@/hooks/routing";
import { i18nConfig } from "@/lib/i18n/utils";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useTransition } from "react";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      startTransition(() => {
        router.push("/" + newLocale + currentPathname);
      });
    } else {
      startTransition(() => {
        router.push(
          currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
        );
      });
    }

    router.refresh();
  };

  return (
    <select
      className="border-2 border-gray-500"
      onChange={handleChange}
      value={currentLocale}
    >
      {i18nConfig.locales.map((lng) => (
        <option
          key={lng}
          value={lng}
          disabled={isPending || currentLocale === lng}
          style={{
            fontWeight: currentLocale === lng ? "bold" : "normal",
            cursor: isPending ? "wait" : "pointer",
          }}
        >
          {lng}
        </option>
      ))}
    </select>
  );
}

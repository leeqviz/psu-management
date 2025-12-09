"use client";

import { switchLocaleAction } from "@/actions/locale";
import { useFullPath, useTranslation } from "@/hooks/routing";
import { i18nConfig } from "@/lib/i18n";
import { SelectOption } from "@/types/select-option";
import { useTransition } from "react";
import { Select } from "./select";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const pathname = useFullPath();
  const [isPending, startTransition] = useTransition();

  const handleChange = async (option: SelectOption<string> | null) => {
    if (!option) return;
    startTransition(async () => {
      await switchLocaleAction(option.value, pathname);
    });
  };

  return (
    <Select
      isClearable={false}
      isDisabled={isPending}
      onChange={handleChange}
      value={{ value: currentLocale, label: currentLocale }}
      isOptionDisabled={(option) => currentLocale === option?.value}
      options={i18nConfig.locales.map((lng) => ({ value: lng, label: lng }))}
    />
  );
}

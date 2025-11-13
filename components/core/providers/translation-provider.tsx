"use client";

import { i18nInstance } from "@/lib/i18n/client";
import { cookieName, getOptions, languages } from "@/lib/i18n/settings";
import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";

// This is the provider component
export function TranslationProvider({
  children,
  lng,
}: {
  children: React.ReactNode;
  lng: string;
}) {
  const [isInitialized, setIsInitialized] = useState(
    i18nInstance.isInitialized
  );

  useEffect(() => {
    // This effect runs *only on the client*
    if (!i18nInstance.isInitialized) {
      // Run init() inside the effect
      i18nInstance
        .init({
          ...getOptions(),
          lng, // Use the language from the URL
          detection: {
            order: ["cookie", "htmlTag", "path"],
            caches: ["cookie"],
            lookupCookie: cookieName,
          },
          preload: languages,
        })
        .then(() => {
          // Set state to true when init is complete
          setIsInitialized(true);
        });
    } else {
      // If already initialized, just change the language
      if (i18nInstance.resolvedLanguage !== lng) {
        i18nInstance.changeLanguage(lng);
      }
    }
  }, [lng]); // Re-run if the language in the URL changes

  // --- 3. Prevent rendering until i18next is ready ---
  // This prevents a "flash" of untranslated content
  if (!isInitialized) {
    console.log("i18next is not initialized yet");
    return null; // Or you can return a <LoadingSpinner />
  }

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}

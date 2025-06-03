"use client";

import { createContext, useContext } from "react";
import { Locale } from "@/i18n";

type TranslationsContextType = {
  locale: Locale;
  translations: Record<string, any>;
};

const TranslationsContext = createContext<TranslationsContextType | null>(null);

export function TranslationProvider({
  children,
  locale,
  translations,
}: {
  children: React.ReactNode;
  locale: Locale;
  translations: Record<string, any>;
}) {
  return (
    <TranslationsContext.Provider value={{ locale, translations }}>
      {children}
    </TranslationsContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(TranslationsContext);
  if (!context) {
    throw new Error("useTranslations must be used within a TranslationProvider");
  }
  
  const { translations, locale } = context;
  
  function t(key: string) {
    const keys = key.split(".");
    let value = translations;
    
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key; // Fallback to key if translation not found
      }
    }
    
    return value;
  }
  
  return { t, locale, isRtl: locale === "ar" };
}
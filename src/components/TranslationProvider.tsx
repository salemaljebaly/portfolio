"use client";

import { Locale } from "@/i18n";
import { createContext, useContext } from "react";

type TranslationValue = string | number | boolean | null | undefined | { [key: string]: TranslationValue };
type Translations = Record<string, TranslationValue>;

interface TranslationContextType {
  locale: Locale;
  translations: Translations;
  isRtl: boolean;
  t: (key: string) => string;
}

interface TranslationProviderProps {
  children: React.ReactNode;
  locale: Locale;
  translations: Translations;
}

const TranslationsContext = createContext<TranslationContextType | null>(null);

export function TranslationProvider({
  children,
  locale,
  translations,
}: TranslationProviderProps) {
  const t = (key: string): string => {
    const value = key.split('.').reduce<TranslationValue>((obj, k) => {
      if (obj && typeof obj === 'object' && k in obj) {
        return obj[k];
      }
      return undefined;
    }, translations);
    return String(value ?? key);
  };

  return (
    <TranslationsContext.Provider value={{ locale, translations, isRtl: locale === "ar", t }}>
      {children}
    </TranslationsContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(TranslationsContext);
  if (!context) {
    throw new Error("useTranslations must be used within a TranslationProvider");
  }
  return context;
}

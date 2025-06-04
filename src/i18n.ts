import { notFound } from 'next/navigation';

export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];

// We can use this function to assert that a locale is valid
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// This function can be used to get translations
export async function getTranslations(locale: Locale) {
  try {
    return (await import(`./messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}
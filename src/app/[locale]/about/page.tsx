import { TranslationProvider } from "@/components/TranslationProvider";
import { Locale, getTranslations, isValidLocale } from "@/i18n";
import AboutClient from "./AboutClient";

export default async function AboutPage(props: {
  params: Promise<{ locale: Promise<string> }>;
}) {
  const params = await props.params;
  const locale = await params.locale;

  if (!isValidLocale(locale)) {
    return null;
  }

  const translations = await getTranslations(locale as Locale);

  return (
    <TranslationProvider locale={locale as Locale} translations={translations}>
      <AboutClient locale={locale} />
    </TranslationProvider>
  );
}

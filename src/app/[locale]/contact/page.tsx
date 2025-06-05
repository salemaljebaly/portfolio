import { TranslationProvider } from "@/components/TranslationProvider";
import { Locale, getTranslations, isValidLocale } from "@/i18n";
import ContactClient from "./ContactClient";

export default async function ContactPage(props: {
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
      <ContactClient locale={locale} />
    </TranslationProvider>
  );
}

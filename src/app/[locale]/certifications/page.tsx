import { TranslationProvider } from "@/components/TranslationProvider";
import { Locale, getTranslations, isValidLocale } from "@/i18n";
import CertificationsClient from "./CertificationsClient";

export default async function CertificationsPage(
  props: {
    params: Promise<{ locale: Promise<string> }>;
  }
) {
  const params = await props.params;
  const locale = await params.locale;

  if (!isValidLocale(locale)) {
    return null;
  }

  const translations = await getTranslations(locale as Locale);

  return (
    <TranslationProvider locale={locale as Locale} translations={translations}>
      <CertificationsClient locale={locale} />
    </TranslationProvider>
  );
}

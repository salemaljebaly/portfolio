import { isValidLocale } from "@/i18n";
import { notFound } from "next/navigation";
import ContactClient from "./ContactClient";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <ContactClient locale={locale} />;
}

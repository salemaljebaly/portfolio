import { isValidLocale } from "@/i18n";
import { notFound } from "next/navigation";
import AboutClient from "./AboutClient";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <AboutClient locale={locale} />;
}

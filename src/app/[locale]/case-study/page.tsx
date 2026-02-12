import { getCaseStudies } from "@/data/caseStudies";
import { isValidLocale } from "@/i18n";
import { notFound } from "next/navigation";
import CaseStudyListClient from "./CaseStudyListClient";

interface CaseStudyPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <CaseStudyListClient locale={locale} studies={getCaseStudies()} />;
}

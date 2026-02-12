import { getCaseStudies, getCaseStudyById } from "@/data/caseStudies";
import { isValidLocale } from "@/i18n";
import { notFound } from "next/navigation";
import CaseStudyDetailClient from "./CaseStudyDetailClient";

interface CaseStudyDetailPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function CaseStudyDetailPage({
  params,
}: CaseStudyDetailPageProps) {
  const { locale, id } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const study = getCaseStudyById(id);
  if (!study) {
    notFound();
  }

  return <CaseStudyDetailClient locale={locale} study={study} />;
}

export function generateStaticParams() {
  return getCaseStudies().map((study) => ({ id: study.id }));
}

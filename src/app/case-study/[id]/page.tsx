import { getCaseStudies, getCaseStudyById } from "@/data/caseStudies";
import { notFound } from "next/navigation";
import CaseStudyDetailClient from "../../[locale]/case-study/[id]/CaseStudyDetailClient";

interface CaseStudyDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CaseStudyDetailPage({
  params,
}: CaseStudyDetailPageProps) {
  const { id } = await params;
  const study = getCaseStudyById(id);

  if (!study) {
    notFound();
  }

  return <CaseStudyDetailClient locale="en" study={study} />;
}

export function generateStaticParams() {
  return getCaseStudies().map((study) => ({ id: study.id }));
}

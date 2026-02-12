import { getCaseStudies } from "@/data/caseStudies";
import CaseStudyListClient from "../[locale]/case-study/CaseStudyListClient";

export default function CaseStudyPage() {
  return <CaseStudyListClient locale="en" studies={getCaseStudies()} />;
}

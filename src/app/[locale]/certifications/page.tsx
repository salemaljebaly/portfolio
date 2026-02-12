import { isValidLocale } from "@/i18n";
import { getRelevantCertifications } from "@/utils/loadData";
import { notFound } from "next/navigation";
import CertificationsClient from "./CertificationsClient";

interface CertificationsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CertificationsPage({
  params,
}: CertificationsPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const certifications = getRelevantCertifications(locale);
  const categories = [
    "All",
    ...new Set(certifications.map((cert) => cert.category)),
  ];

  return (
    <CertificationsClient
      certifications={certifications}
      categories={categories}
      locale={locale}
    />
  );
}

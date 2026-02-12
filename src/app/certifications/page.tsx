import { getRelevantCertifications } from "@/utils/loadData";
import CertificationsClient from "../[locale]/certifications/CertificationsClient";

export default function CertificationsPage() {
  const locale = "en" as const;
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

import { loadCertifications } from "@/utils/loadData";
import CertificationsClient from "./CertificationsClient";

interface CertificationsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function CertificationsPage(
  props: CertificationsPageProps,
) {
  const params = await props.params;
  const certifications = loadCertifications(params.locale);
  const categories = [
    "All",
    ...new Set(certifications.map((cert) => cert.category)),
  ];

  return (
    <CertificationsClient
      certifications={certifications}
      categories={categories}
      locale={params.locale}
    />
  );
}

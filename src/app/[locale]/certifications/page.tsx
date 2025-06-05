import { loadCertifications } from '@/utils/loadData';
import CertificationsClient from './CertificationsClient';

interface CertificationsPageProps {
  params: {
    locale: string;
  };
}

export default function CertificationsPage({ params }: CertificationsPageProps) {
  const certifications = loadCertifications(params.locale);
  const categories = ['All', ...new Set(certifications.map(cert => cert.category))];

  return <CertificationsClient certifications={certifications} categories={categories} locale={params.locale} />;
}

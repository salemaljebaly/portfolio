import Footer from "@/components/Footer";
import CaseStudyPreview from "@/components/home/CaseStudyPreview";
import CTASection from "@/components/home/CTASection";
import CertificationsCarousel from "@/components/home/CertificationsCarousel";
import DevOpsAnimation from "@/components/home/DevOpsAnimation";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import Navigation from "@/components/Navigation";
import { isValidLocale } from "@/i18n";
import { notFound } from "next/navigation";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        <HeroSection />
        <StatsSection />
        <CaseStudyPreview />
        <FeaturedProjects />
        <CertificationsCarousel />
        <DevOpsAnimation />
        <CTASection locale={locale} />
      </main>

      <Footer />
    </div>
  );
}

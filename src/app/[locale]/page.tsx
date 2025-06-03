import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import CertificationsCarousel from "@/components/home/CertificationsCarousel";
import DevOpsAnimation from "@/components/home/DevOpsAnimation";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import { TranslationProvider } from "@/components/TranslationProvider";
import { Locale, getTranslations, isValidLocale } from "@/i18n";

export default async function Home({
  params,
}: {
  params: { locale: Promise<string> };
}) {
  const locale = await params.locale;
  
  if (!isValidLocale(locale)) {
    return null;
  }
  
  const translations = await getTranslations(locale as Locale);
  
  return (
    <TranslationProvider locale={locale as Locale} translations={translations}>
      <div className="min-h-screen bg-background">
        <Navigation />

        <main>
          {/* Hero Section with Particles Background */}
          <HeroSection />

          {/* Quick Stats Counter */}
          <StatsSection />

          {/* Featured Projects */}
          <FeaturedProjects />

          {/* Certifications Carousel */}
          <CertificationsCarousel />

          {/* DevOps Automation Diagram */}
          <DevOpsAnimation />

          {/* Call to Action */}
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-4">
                {translations.home.ctaTitle}
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                {translations.home.ctaDescription}
              </p>
              <a
                href={`/${locale}/contact`}
                className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {translations.home.ctaButton}
              </a>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </TranslationProvider>
  );
}
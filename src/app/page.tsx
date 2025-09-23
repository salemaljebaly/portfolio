"use client";

import Footer from "@/components/Footer";
import CertificationsCarousel from "@/components/home/CertificationsCarousel";
import DevOpsAnimation from "@/components/home/DevOpsAnimation";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import Navigation from "@/components/Navigation";
import { useTranslations } from "@/components/TranslationProvider";
import Link from "next/link";

export default function Home() {
  const { t } = useTranslations();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        <HeroSection />
        <StatsSection />
        <FeaturedProjects />
        <CertificationsCarousel />
        <DevOpsAnimation />

        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">{t("home.ctaTitle")}</h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t("home.ctaDescription")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {t("home.ctaButton")}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

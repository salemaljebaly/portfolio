import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import CertificationsCarousel from "@/components/home/CertificationsCarousel";
import DevOpsAnimation from "@/components/home/DevOpsAnimation";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import Link from "next/link";

export default function Home() {
  return (
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
              Interested in transforming your tech infrastructure?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let&apos;s discuss how I can help your organization achieve its
              goals.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

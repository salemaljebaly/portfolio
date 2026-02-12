"use client";

import Footer from "@/components/Footer";
import { AnimatedList } from "@/components/magicui/animated-list";
import Navigation from "@/components/Navigation";
import { useTranslations } from "@/components/TranslationProvider";
import { Award, Calendar, ExternalLink, Filter, Shield } from "lucide-react";
import { useState } from "react";

interface CertificationsClientProps {
  certifications: {
    id: number;
    name: string;
    issuer: string;
    category: string;
    date: string;
    expiryDate?: string;
    credentialId: string;
    credlyUrl: string;
    logo: string;
    skills: string[];
    description: string;
  }[];
  categories: string[];
  locale: string;
}

export default function CertificationsClient({
  certifications,
  categories,
}: CertificationsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { t } = useTranslations();

  const filteredCertifications =
    selectedCategory === "All"
      ? certifications
      : certifications.filter((cert) => cert.category === selectedCategory);

  const certificationsByCategory = categories
    .filter((category) => category !== "All")
    .map((category) => ({
      category,
      count: certifications.filter((cert) => cert.category === category).length,
    }));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
              {String(t("certifications.title"))}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              {String(t("certifications.description"))}
            </p>
            <p className="text-sm text-muted-foreground mt-3">
              Certifications are de-duplicated and prioritized by role
              relevance.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {certifications.length}
                </div>
                <div className="text-muted-foreground">
                  {String(t("certifications.stats.total"))}
                </div>
              </div>
              {certificationsByCategory
                .filter((c) => c.count > 0)
                .map((cat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-primary">
                      {cat.count}
                    </div>
                    <div className="text-muted-foreground">{cat.category}</div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 flex-wrap">
              <Filter className="w-5 h-5 text-muted-foreground" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-accent text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications List */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-6">
              <AnimatedList>
                {filteredCertifications.map((cert, index) => (
                  <div
                    key={cert.id}
                    className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-6">
                        {/* Badge Placeholder */}
                        <div className="flex-shrink-0 w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
                          <Award className="w-12 h-12 text-primary" />
                        </div>

                        {/* Certification Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-semibold text-foreground">
                              {cert.name}
                            </h3>
                            <a
                              href={cert.credlyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-sm text-primary hover:underline"
                            >
                              {String(t("certifications.verify"))}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>

                          <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Shield className="w-4 h-4" />
                                {cert.issuer}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {cert.date}
                              </span>
                              {cert.expiryDate && (
                                <span>
                                  {String(t("certifications.expires"))}:{" "}
                                  {cert.expiryDate}
                                </span>
                              )}
                            </div>
                            <div>
                              <span className="font-medium">
                                {String(t("certifications.credentialId"))}:
                              </span>{" "}
                              {cert.credentialId}
                            </div>
                          </div>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {cert.skills.map((skill, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          {/* Description */}
                          <p className="text-sm text-muted-foreground">
                            {cert.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </AnimatedList>
            </div>
          </div>
        </section>
        {/* Credly Integration Notice */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              {String(t("certifications.verifiedCredentials.title"))}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {String(t("certifications.verifiedCredentials.description"))}
            </p>
            <a
              href="https://www.credly.com/users/salem-aljebaly"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Award className="w-5 h-5" />
              {String(t("certifications.verifiedCredentials.viewBadges"))}
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

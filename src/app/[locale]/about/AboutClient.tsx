"use client";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { useTranslations } from "@/components/TranslationProvider";
import { loadTimeline } from "@/utils/loadData";
import { Briefcase, Code, Download, Rocket } from "lucide-react";
import Link from "next/link";

interface AboutClientProps {
  locale: string;
}

const skills = [
  {
    category: "Platform Engineering",
    items: [
      "Kubernetes",
      "Infrastructure as Code",
      "CI/CD",
      "Linux",
      "Docker",
      "Monitoring",
      "Incident Response",
    ],
  },
  {
    category: "Cloud & FinOps",
    items: [
      "AWS",
      "Hetzner",
      "Cloud Migration",
      "Cost Optimization",
      "Cloud Security",
      "Service Reliability",
    ],
  },
  {
    category: "Development",
    items: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Flutter",
      "REST APIs",
      "Technical Leadership",
    ],
  },
];

const getTimelineIcon = (type: string) => {
  switch (type) {
    case "Full-time":
      return <Briefcase className="w-6 h-6" />;
    case "Contract":
      return <Code className="w-6 h-6" />;
    case "Project-based":
      return <Rocket className="w-6 h-6" />;
    default:
      return <Briefcase className="w-6 h-6" />;
  }
};

export default function AboutClient({ locale }: AboutClientProps) {
  const { t } = useTranslations();
  const isRTL = locale === "ar";
  const timeline = loadTimeline(locale);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
              {String(t("about.title"))}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              {String(t("about.description"))}
            </p>
            <div className="mt-6 max-w-4xl space-y-3 text-muted-foreground">
              <p>
                I led a cloud migration from AWS to Hetzner that reduced
                infrastructure spend by more than 90% and introduced an
                automated disaster recovery workflow with RTO under 30 minutes.
              </p>
              <p>
                My focus is measurable platform outcomes: lower cost, safer
                releases, and faster recovery.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
              {String(t("about.professionalJourney"))}
            </h2>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div
                  className={`absolute ${
                    isRTL ? "right-8" : "left-8"
                  } top-0 bottom-0 w-0.5 bg-border`}
                />

                <div className="space-y-12">
                  {timeline.map((item, index) => (
                    <div
                      key={index}
                      className={`relative flex gap-8 group ${
                        isRTL ? "flex-row-reverse" : ""
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-background border-2 border-primary shadow-lg group-hover:shadow-xl transition-shadow">
                        <div className="text-primary">
                          {getTimelineIcon(item.type)}
                        </div>
                      </div>

                      <div className="flex-1 pb-8">
                        <div className="bg-card p-6 rounded-lg border shadow-sm group-hover:shadow-md transition-shadow">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-primary">
                              {item.period}
                            </span>
                            {item.company && (
                              <>
                                <span className="text-muted-foreground">•</span>
                                <span className="text-sm text-muted-foreground">
                                  {item.company}
                                </span>
                              </>
                            )}
                          </div>
                          <h3 className="text-xl font-semibold mb-2 text-foreground">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {item.description}
                          </p>
                          {item.achievements && (
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-primary">
                                Key Achievements
                              </h4>
                              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                {item.achievements.map((achievement, i) => (
                                  <li key={i}>{achievement}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {item.skills && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {item.skills.map((skill, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
              {String(t("about.technicalExpertise"))}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {skills.map((skillGroup, index) => (
                <div
                  key={index}
                  className="bg-background rounded-lg border p-6 hover:shadow-lg transition-shadow"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-lg font-semibold mb-4 text-primary">
                    {skillGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-sm bg-muted rounded-md text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-8 text-foreground">
              {String(t("about.myPhilosophy.title"))}
            </h2>
            <blockquote className="text-2xl font-light text-muted-foreground max-w-4xl mx-auto">
              {String(t("about.myPhilosophy.quote"))}
            </blockquote>
            <p className="mt-4 text-lg text-foreground">
              - {String(t("about.myPhilosophy.author"))}
            </p>
          </div>
        </section>

        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              {String(t("about.cta.title"))}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {String(t("about.cta.description"))}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/SalemAljebalyCV.pdf"
                download
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Download className="w-5 h-5" />
                {String(t("about.cta.downloadCV"))}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg border border-border hover:bg-accent text-foreground transition-colors"
              >
                {String(t("about.cta.contactMe"))}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

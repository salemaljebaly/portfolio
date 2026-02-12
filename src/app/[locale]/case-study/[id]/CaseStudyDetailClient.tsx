"use client";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { CaseStudy } from "@/data/caseStudies";
import Link from "next/link";

interface CaseStudyDetailClientProps {
  locale: string;
  study: CaseStudy;
}

export default function CaseStudyDetailClient({
  locale,
  study,
}: CaseStudyDetailClientProps) {
  const getLocalizedPath = (path: string) => {
    if (locale === "en") return path;
    return `/ar${path === "/" ? "" : path}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
              {study.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl">
              {study.summary}
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              Business Problem
            </h2>
            <ul className="max-w-4xl list-disc list-inside space-y-2 text-muted-foreground">
              {study.businessProblem.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              Technical Solution
            </h2>
            <ul className="max-w-4xl list-disc list-inside space-y-2 text-muted-foreground">
              {study.technicalSolution.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              Measurable Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl">
              {study.measurableResults.map((result) => (
                <div
                  key={result.label}
                  className="border rounded-xl p-5 bg-card"
                >
                  <p className="text-3xl font-bold text-primary">
                    {result.value}
                  </p>
                  <p className="text-muted-foreground">{result.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              Migration & Recovery Timeline
            </h2>
            <div className="space-y-3 max-w-5xl">
              {study.timeline.map((item) => (
                <div
                  key={item.title}
                  className="border rounded-xl p-4 bg-background"
                >
                  <p className="text-sm text-primary font-medium">
                    {item.phase}
                  </p>
                  <h3 className="text-lg font-semibold text-foreground mt-1">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mt-1">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 border rounded-xl bg-card p-5 max-w-5xl">
              <p className="text-sm text-muted-foreground mb-2">
                Process visualization
              </p>
              <p className="text-foreground font-medium">
                {study.visualization}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl flex flex-wrap gap-4">
              <Link
                href={getLocalizedPath("/case-study")}
                className="inline-flex items-center px-6 py-3 text-base font-medium rounded-lg border border-border bg-background text-foreground hover:bg-accent transition-colors"
              >
                Back to Case Studies
              </Link>
              <Link
                href={getLocalizedPath("/projects")}
                className="inline-flex items-center px-6 py-3 text-base font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                See Projects
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

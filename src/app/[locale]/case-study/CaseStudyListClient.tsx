"use client";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { CaseStudy } from "@/data/caseStudies";
import Link from "next/link";

interface CaseStudyListClientProps {
  locale: string;
  studies: CaseStudy[];
}

export default function CaseStudyListClient({
  locale,
  studies,
}: CaseStudyListClientProps) {
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
              Case Studies
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl">
              Metric-driven platform engineering work. Click a case study to
              open the full implementation story.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6 max-w-5xl">
              {studies.map((study) => (
                <article
                  key={study.id}
                  className="border rounded-2xl bg-card p-8"
                >
                  <h2 className="text-2xl font-bold text-foreground mb-3">
                    <Link
                      href={getLocalizedPath(`/case-study/${study.id}`)}
                      className="hover:text-primary transition-colors"
                    >
                      {study.title}
                    </Link>
                  </h2>
                  <p className="text-muted-foreground mb-5">{study.summary}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    {study.measurableResults.map((result) => (
                      <div
                        key={result.label}
                        className="border rounded-lg p-4 bg-background"
                      >
                        <p className="text-xl font-bold text-primary">
                          {result.value}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {result.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={getLocalizedPath(`/case-study/${study.id}`)}
                    className="inline-flex items-center px-6 py-3 text-base font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Open Full Study
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

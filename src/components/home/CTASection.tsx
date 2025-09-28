"use client";

import { useTranslations } from "@/components/TranslationProvider";

interface CTASectionProps {
  locale: string;
}

export default function CTASection({ locale }: CTASectionProps) {
  const { t } = useTranslations();
  const contactHref = `/${locale}/contact`;

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">
          {String(t("home.ctaTitle"))}
        </h2>
        <p className="text-xl text-muted-foreground mb-8">
          {String(t("home.ctaDescription"))}
        </p>
        <a
          href={contactHref}
          className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          {String(t("home.ctaButton"))}
        </a>
      </div>
    </section>
  );
}

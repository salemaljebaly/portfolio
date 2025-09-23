"use client";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { useTranslations } from "@/components/TranslationProvider";

export default function BookPage() {
  const { t } = useTranslations();

  const calLink = process.env.NEXT_PUBLIC_CAL_LINK;
  const calUsername = process.env.NEXT_PUBLIC_CAL_USERNAME;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
              {t("contact.info.schedule.title")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              {t("contact.info.schedule.description")}
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            {calLink ? (
              <div className="rounded-lg overflow-hidden border bg-background">
                <iframe
                  src={`${calLink}?hide_event_type_details=1&embed_source=portfolio`}
                  className="w-full h-[760px] bg-background"
                  loading="lazy"
                  title="Schedule a meeting"
                />
              </div>
            ) : (
              <div className="text-center">
                <a
                  href={`https://cal.com/${calUsername ?? ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Schedule a meeting on Cal.com
                </a>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

"use client";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { useTranslations } from "@/components/TranslationProvider";

export default function BookPage() {
  const { t } = useTranslations();

  const rawCalLink = process.env.NEXT_PUBLIC_CAL_LINK;
  const calUsername = process.env.NEXT_PUBLIC_CAL_USERNAME;

  // Build a robust Cal embed URL when a full link is provided.
  // If the link is invalid, fall back to the simple profile button.
  const siteDomain = process.env.NEXT_PUBLIC_DOMAIN;
  let embedDomain = "";
  if (siteDomain) {
    try {
      embedDomain = new URL(siteDomain).hostname;
    } catch {
      embedDomain = "";
    }
  }
  if (!embedDomain && typeof window !== "undefined") {
    embedDomain = window.location.hostname;
  }

  let calEmbedSrc: string | null = null;
  if (rawCalLink) {
    try {
      const u = new URL(rawCalLink);
      if (embedDomain) u.searchParams.set("embed_domain", embedDomain);
      u.searchParams.set("embed_type", "inline");
      u.searchParams.set("hide_event_type_details", "1");
      u.searchParams.set("embed_source", "portfolio");
      calEmbedSrc = u.toString();
    } catch {
      calEmbedSrc = null;
    }
  }

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
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {calEmbedSrc ? (
              <div className="rounded-lg overflow-hidden border bg-background">
                <iframe
                  src={calEmbedSrc}
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

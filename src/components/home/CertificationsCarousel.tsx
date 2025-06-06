"use client";

import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
// Import MagicUI components after installation
// import { Marquee } from "@/components/magicui/marquee";
import { loadCertifications } from "@/utils/loadData";
import { useParams } from "next/navigation";

interface Certification {
  id: number;
  name: string;
  issuer: string;
  logo: string;
  date: string;
  credlyUrl: string;
  category: string;
  credentialId: string;
  skills: string[];
  description: string;
  expiryDate?: string;
}

export default function CertificationsCarousel() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const certifications: Certification[] = loadCertifications(locale);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % certifications.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % certifications.length);
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? certifications.length - 1 : prev - 1
    );
  };

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Professional Certifications
          </h2>
          <p className="text-lg text-muted-foreground">
            Continuously learning and staying updated with the latest
            technologies
          </p>
        </div>

        {/* Manual Carousel - Replace with MagicUI Marquee for auto-scroll */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {certifications.map((cert, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-background rounded-lg border border-border p-8 text-center">
                    {/* Logo placeholder */}
                    <div className="w-32 h-32 mx-auto mb-6 bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-4xl font-bold text-muted-foreground">
                        {cert.issuer.charAt(0)}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold mb-2">{cert.name}</h3>
                    <p className="text-muted-foreground mb-2">{cert.issuer}</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Achieved: {cert.date}
                      {cert.expiryDate && ` • Expires: ${cert.expiryDate}`}
                    </p>

                    {cert.credlyUrl && (
                      <div className="space-y-2">
                        <a
                          href={cert.credlyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
                        >
                          Verify Certificate
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow text-foreground"
            aria-label="Previous certification"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow text-foreground"
            aria-label="Next certification"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {certifications.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-primary w-8"
                  : "bg-muted-foreground/30"
              }`}
              aria-label={`Go to certification ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

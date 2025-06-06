"use client";

import { Marquee } from "@/components/magicui/marquee";
import { loadCertifications } from "@/utils/loadData";
import { ExternalLink, Shield } from "lucide-react";
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

        <div className="max-w-6xl mx-auto">
          <Marquee className="py-4" pauseOnHover>
            {certifications.map((cert) => (
              <div key={cert.id} className="mx-4">
                <div className="bg-background rounded-lg border border-border p-8 text-center w-[300px] h-[380] ">
                  {/* Logo placeholder */}
                  <div className="w-32 h-32 mx-auto mb-6 bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-4xl font-bold text-muted-foreground">
                      <Shield className="w-20 h-10" />
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
          </Marquee>
        </div>
      </div>
    </section>
  );
}

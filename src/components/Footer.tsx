"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "./TranslationProvider";

export default function Footer() {
  const { t, locale } = useTranslations();
  const getLocalizedPath = (path: string) => {
    const basePath = path === "/" ? "" : path;
    if (locale === "en") return path;
    return `/ar${basePath}`;
  };
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Updated to use center alignment for the grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {/* About */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-lg mb-4">
              {String(t("common.name"))}
            </h3>
            <p className="text-muted-foreground mb-4">
              CTO & DevOps Architect specializing in transforming businesses through automation, cloud infrastructure, and technical leadership.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://github.com/salemaljebaly"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/salemaljebaly"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@docker.com.ly"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">
              {String(t("footer.quickLinks"))}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={getLocalizedPath("/about")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {String(t("nav.about"))}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPath("/projects")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {String(t("nav.projects"))}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPath("/certifications")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {String(t("nav.certifications"))}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPath("/contact")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {String(t("nav.contact"))}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">
              {String(t("footer.contactInfo"))}
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>{String(t("footer.location"))}</li>
              <li>
                <a
                  href="mailto:contact@docker.com.ly"
                  className="hover:text-primary transition-colors"
                >
                  salemaljebaly@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Already centered */}
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>
            &copy; {currentYear} {String(t("common.name"))}.{" "}
            {String(t("common.allRightsReserved"))}
          </p>
        </div>
      </div>
    </footer>
  );
}

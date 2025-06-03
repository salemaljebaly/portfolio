"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isArabic = pathname.startsWith("/ar");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-lg mb-4">
              {isArabic ? "سالم الجبالي" : "Salem Aljebaly"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {isArabic
                ? "مدير تقني وخبير DevOps متخصص في تحويل الأعمال من خلال الأتمتة والبنية التحتية السحابية والقيادة التقنية."
                : "CTO & DevOps Architect specializing in transforming businesses through automation, cloud infrastructure, and technical leadership."}
            </p>
            <div className="flex gap-4">
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
              {isArabic ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={isArabic ? "/ar/about" : "/about"}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {isArabic ? "حول" : "About"}
                </Link>
              </li>
              <li>
                <Link
                  href={isArabic ? "/ar/projects" : "/projects"}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {isArabic ? "المشاريع" : "Projects"}
                </Link>
              </li>
              <li>
                <Link
                  href={isArabic ? "/ar/certifications" : "/certifications"}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {isArabic ? "الشهادات" : "Certifications"}
                </Link>
              </li>
              <li>
                <Link
                  href={isArabic ? "/ar/contact" : "/contact"}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {isArabic ? "تواصل" : "Contact"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">
              {isArabic ? "معلومات التواصل" : "Contact Info"}
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>{isArabic ? "ليبيا" : "Libya"}</li>
              <li>
                <a
                  href="mailto:contact@docker.com.ly"
                  className="hover:text-primary transition-colors"
                >
                  contact@docker.com.ly
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>
            &copy; {currentYear} {isArabic ? "سالم الجبالي" : "Salem Aljebaly"}.{" "}
            {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
}

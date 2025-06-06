"use client";

import { cn } from "@/lib/utils";
import { Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "./TranslationProvider";

interface NavLink {
  href: string;
  labelKey: string;
}

const navLinks: NavLink[] = [
  { href: "/", labelKey: "nav.home" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/projects", labelKey: "nav.projects" },
  { href: "/certifications", labelKey: "nav.certifications" },
  { href: "/contact", labelKey: "nav.contact" },
];

export default function Navigation() {
  const { t, locale, isRtl } = useTranslations();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getLocalizedPath = (path: string) => {
    // Remove current locale prefix if present
    // const pathWithoutLocale = pathname
    //   .split("/")
    //   .filter((segment, index) => index === 0 || segment !== locale)
    //   .join("/");

    // Get the path without the locale prefix
    const basePath = path === "/" ? "" : path;

    return `/${locale}${basePath}`;
  };

  // Commented out for now - can be re-enabled when Arabic translation is ready
  // const toggleLanguage = () => {
  //   if (isArabic) {
  //     window.location.href = pathname.replace("/ar", "") || "/";
  //   } else {
  //     window.location.href = `/ar${pathname}`;
  //   }
  // };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-md"
          : "bg-transparent",
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={getLocalizedPath("/")}
            className="font-bold text-xl hover:text-primary transition-colors text-foreground"
          >
            {String(t("common.name"))}
          </Link>

          {/* Desktop Navigation */}
          <div
            className={`hidden md:flex items-center ${
              isRtl ? "space-x-reverse" : ""
            } space-x-8`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={getLocalizedPath(link.href)}
                className={cn(
                  "text-md font-medium transition-colors hover:text-primary",
                  pathname === getLocalizedPath(link.href)
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                {String(t(link.labelKey))}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div
            className={`flex items-center ${
              isRtl ? "space-x-reverse" : ""
            } space-x-4`}
          >
            {/* Language Toggle */}
            {/* <button
              onClick={toggleLanguage}
              className="text-sm font-medium px-3 py-1 rounded-md hover:bg-accent transition-colors"
              aria-label={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
            >
              {isArabic ? "EN" : "AR"}
            </button> */}

            {/* CV Download */}
            <a
              href="/SalemAljebalyCV.pdf"
              download
              className="hidden sm:flex items-center gap-2 text-sm font-medium px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              aria-label={
                locale === "ar" ? "تحميل السيرة الذاتية" : "Download CV"
              }
            >
              <Download className="w-4 h-4" />
              {String(t("common.downloadCV"))}
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-accent transition-colors text-foreground"
              aria-label={locale === "ar" ? "قائمة التنقل" : "Navigation menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t mt-2 py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getLocalizedPath(link.href)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-sm font-medium px-4 py-2 rounded-md transition-colors hover:bg-accent",
                    pathname === getLocalizedPath(link.href)
                      ? "bg-accent text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {String(t(link.labelKey))}
                </Link>
              ))}
              <a
                href="/SalemAljebalyCV.pdf"
                download
                className="sm:hidden flex items-center gap-2 text-sm font-medium px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                <Download className="w-4 h-4" />
                {String(t("common.downloadCV"))}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavLink {
  href: string;
  label: string;
  arLabel: string;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home", arLabel: "الرئيسية" },
  { href: "/about", label: "About", arLabel: "حول" },
  { href: "/projects", label: "Projects", arLabel: "المشاريع" },
  { href: "/certifications", label: "Certifications", arLabel: "الشهادات" },
  { href: "/contact", label: "Contact", arLabel: "تواصل" },
];

export default function Navigation() {
  const pathname = usePathname();
  const isArabic = pathname.startsWith("/ar");
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
    if (isArabic) {
      return path === "/" ? "/ar" : `/ar${path}`;
    }
    return path;
  };

  const toggleLanguage = () => {
    if (isArabic) {
      window.location.href = pathname.replace("/ar", "") || "/";
    } else {
      window.location.href = `/ar${pathname}`;
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={getLocalizedPath("/")}
            className="font-bold text-xl hover:text-primary transition-colors"
          >
            {isArabic ? "سالم الجبالي" : "Salem Aljebaly"}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={getLocalizedPath(link.href)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === getLocalizedPath(link.href)
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {isArabic ? link.arLabel : link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="text-sm font-medium px-3 py-1 rounded-md hover:bg-accent transition-colors"
              aria-label={
                isArabic ? "Switch to English" : "التبديل إلى العربية"
              }
            >
              {isArabic ? "EN" : "AR"}
            </button>

            {/* CV Download */}
            <a
              href="/SalemAljebalyCV.pdf"
              download
              className="hidden sm:flex items-center gap-2 text-sm font-medium px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              aria-label={isArabic ? "تحميل السيرة الذاتية" : "Download CV"}
            >
              <Download className="w-4 h-4" />
              {isArabic ? "السيرة الذاتية" : "CV"}
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
              aria-label={isArabic ? "قائمة التنقل" : "Navigation menu"}
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
                      : "text-muted-foreground"
                  )}
                >
                  {isArabic ? link.arLabel : link.label}
                </Link>
              ))}
              <a
                href="/SalemAljebalyCV.pdf"
                download
                className="sm:hidden flex items-center gap-2 text-sm font-medium px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                <Download className="w-4 h-4" />
                {isArabic ? "تحميل السيرة الذاتية" : "Download CV"}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

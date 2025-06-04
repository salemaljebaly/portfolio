import type { Metadata } from "next";
import { Zain } from "next/font/google";
import "../globals.css";
import { Locale, isValidLocale } from "@/i18n";
import { use } from "react";

const zain = Zain({
  subsets: ["latin", "arabic"],
  variable: "--font-zain",
  display: "swap",
  weight: ["300", "400", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Salem Aljebaly - CTO & DevOps Architect",
  description:
    "Transforming businesses through automation, cloud infrastructure & technical leadership",
  metadataBase: new URL("https://docker.com.ly"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      ar: "/ar",
    },
  },
  openGraph: {
    title: "Salem Aljebaly - CTO & DevOps Architect Portfolio",
    description:
      "Transforming businesses through automation, cloud infrastructure & technical leadership",
    url: "https://docker.com.ly",
    siteName: "Salem Aljebaly Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Salem Aljebaly - CTO & DevOps Architect",
      },
    ],
  },
};

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Use React.use to unwrap the params.locale promise
  const locale = params.locale;
  
  if (!isValidLocale(locale)) {
    // Handle invalid locale
    return null;
  }
  
  const isRtl = locale === "ar";
  
  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"} className={zain.variable}>
      <body className="font-zain antialiased">{children}</body>
    </html>
  );
}
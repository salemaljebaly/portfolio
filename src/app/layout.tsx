import type { Metadata } from "next";
import { TranslationProvider } from "@/components/TranslationProvider";
import { getTranslations, type Locale } from "@/i18n";
import { Zain } from "next/font/google";
import "./globals.css";

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
      en: "/",
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
  twitter: {
    card: "summary_large_image",
    title: "Salem Aljebaly - CTO & DevOps Architect",
    description:
      "Transforming businesses through automation, cloud infrastructure & technical leadership",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale: Locale = "en";
  const translations = await getTranslations(locale);

  return (
    <html lang="en" className={zain.variable} suppressHydrationWarning>
      <body className="font-zain antialiased" suppressHydrationWarning>
        <TranslationProvider locale={locale} translations={translations}>
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}

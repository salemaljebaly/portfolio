import type { Metadata } from "next";
import { TranslationProvider } from "@/components/TranslationProvider";
import { getTranslations, type Locale } from "@/i18n";
import { Zain } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const zain = Zain({
  subsets: ["latin", "arabic"],
  variable: "--font-zain",
  display: "swap",
  weight: ["300", "400", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Salem Aljebaly - Senior Platform Engineer",
  description:
    "Senior Platform Engineer and Cloud & FinOps Specialist. Reduced infrastructure costs by 96% with automated disaster recovery (RTO < 25 min).",
  metadataBase: new URL("https://docker.com.ly"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
    },
  },
  openGraph: {
    title: "Salem Aljebaly - Senior Platform Engineer Portfolio",
    description:
      "Senior Platform Engineer and Cloud & FinOps Specialist. Reduced infrastructure costs by 96% with automated disaster recovery (RTO < 25 min).",
    url: "https://docker.com.ly",
    siteName: "Salem Aljebaly Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Salem Aljebaly - Senior Platform Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salem Aljebaly - Senior Platform Engineer",
    description:
      "Senior Platform Engineer and Cloud & FinOps Specialist. Reduced infrastructure costs by 96% with automated disaster recovery (RTO < 25 min).",
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
        <SpeedInsights />
      </body>
    </html>
  );
}

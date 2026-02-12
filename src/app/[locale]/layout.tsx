import { TranslationProvider } from "@/components/TranslationProvider";
import { Locale, getTranslations, isValidLocale, locales } from "@/i18n";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Inter, Zain } from "next/font/google";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const zain = Zain({
  subsets: ["latin", "arabic"],
  variable: "--font-zain",
  display: "swap",
  weight: ["300", "400", "700", "800", "900"],
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Salem Aljebaly - Portfolio",
    description:
      "Senior Platform Engineer and Cloud & FinOps Specialist with proven cost optimization and reliability outcomes.",
  };
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { children } = props;
  const { locale } = await props.params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const normalizedLocale = locale as Locale;
  const translations = await getTranslations(normalizedLocale);
  // Arabic temporarily disabled; force LTR
  const isRTL = false;

  return (
    <html
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
      className={`${isRTL ? zain.variable : inter.variable} ${isRTL ? "rtl" : "ltr"}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body suppressHydrationWarning>
        <TranslationProvider
          locale={normalizedLocale}
          translations={translations}
        >
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

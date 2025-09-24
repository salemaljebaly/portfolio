import { TranslationProvider } from "@/components/TranslationProvider";
import { Locale, getTranslations, isValidLocale } from "@/i18n";
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
    description: "Full Stack Developer & DevOps Engineer",
  };
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { children } = props;

  const { locale } = await props.params;

  if (!isValidLocale(locale)) {
    return null;
  }

  const translations = await getTranslations(locale as Locale);
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
          locale={locale as Locale}
          translations={translations}
        >
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}

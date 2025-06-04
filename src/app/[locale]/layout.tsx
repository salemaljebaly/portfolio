import { TranslationProvider } from "@/components/TranslationProvider";
import { Locale, getTranslations, isValidLocale } from "@/i18n";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

export async function generateMetadata({ 
  params,
}: { 
  params: { locale: Promise<string> } 
}): Promise<Metadata> {
  const locale = await params.locale;
  return {
    title: "Salem Aljebaly - Portfolio",
    description: "Full Stack Developer & DevOps Engineer",
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Promise<string> };
}) {
  const locale = await params.locale;
  
  if (!isValidLocale(locale)) {
    return null;
  }
  
  const translations = await getTranslations(locale as Locale);
  const isRTL = locale === "ar";

  return (
    <html 
      lang={locale} 
      className={`${inter.variable} ${isRTL ? 'rtl' : 'ltr'}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body suppressHydrationWarning>
        <TranslationProvider locale={locale as Locale} translations={translations}>
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}
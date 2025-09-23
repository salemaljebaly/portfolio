import AboutClient from "../[locale]/about/AboutClient";

export default function AboutPage() {
  const locale = "en" as const;
  return <AboutClient locale={locale} />;
}

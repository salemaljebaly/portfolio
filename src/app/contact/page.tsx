import ContactClient from "../[locale]/contact/ContactClient";

export default function ContactPage() {
  const locale = "en" as const;
  return <ContactClient locale={locale} />;
}


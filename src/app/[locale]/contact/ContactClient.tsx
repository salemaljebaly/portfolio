"use client";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { useTranslations } from "@/components/TranslationProvider";
import { Clock, Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";

interface ContactClientProps {
  locale: string;
}

export default function ContactClient({ locale }: ContactClientProps) {
  const { t } = useTranslations();
  const isRTL = locale === "ar";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    inquiryType: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          inquiryType: "general",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
              {String(t("contact.title"))}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              {String(t("contact.description"))}
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-foreground">
                  {String(t("contact.form.title"))}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2 text-foreground"
                      >
                        {String(t("contact.form.name"))}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border bg-background hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors placeholder:text-muted-foreground"
                        placeholder={String(t("contact.form.name"))}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2 text-foreground"
                      >
                        {String(t("contact.form.email"))}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border bg-background hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors placeholder:text-muted-foreground"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium mb-2 text-foreground"
                      >
                        {String(t("contact.form.company"))}
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border bg-background hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors placeholder:text-muted-foreground"
                        placeholder={String(
                          t("contact.form.companyPlaceholder")
                        )}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="inquiryType"
                        className="block text-sm font-medium mb-2 text-foreground"
                      >
                        {String(t("contact.form.inquiryType"))}
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border bg-background hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors text-foreground"
                      >
                        <option value="general">
                          {String(t("contact.form.inquiryTypes.general"))}
                        </option>
                        <option value="consulting">
                          {String(t("contact.form.inquiryTypes.consulting"))}
                        </option>
                        <option value="collaboration">
                          {String(t("contact.form.inquiryTypes.collaboration"))}
                        </option>
                        <option value="other">
                          {String(t("contact.form.inquiryTypes.other"))}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2 text-foreground"
                    >
                      {String(t("contact.form.message"))}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border bg-background hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors resize-none placeholder:text-muted-foreground"
                      placeholder={String(t("contact.form.messagePlaceholder"))}
                    />
                  </div>

                  {/* Honeypot field for spam protection */}
                  <input
                    type="text"
                    name="website"
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 text-lg font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        {String(t("contact.form.sending"))}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {String(t("contact.form.send"))}
                      </>
                    )}
                  </button>

                  {/* Status Messages */}
                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 dark:text-green-400">
                      {String(t("contact.form.success"))}
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 dark:text-red-400">
                      {String(t("contact.form.error"))}
                    </div>
                  )}
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-foreground">
                    {String(t("contact.info.title"))}
                  </h2>

                  <div className={`space-y-4 ${isRTL ? "[direction:rtl]" : ""}`}>
                    <a
                      href="mailto:contact@docker.com.ly"
                      className="flex items-center gap-4 p-4 rounded-lg border hover:border-primary/50 transition-colors group"
                    >
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {String(t("contact.info.email"))}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          contact@docker.com.ly
                        </div>
                      </div>
                    </a>

                    <a
                      href="https://github.com/salemaljebaly"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg border hover:border-primary/50 transition-colors group"
                    >
                      <Github className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {String(t("contact.info.github"))}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          @salemaljebaly
                        </div>
                      </div>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/salemaljebaly"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg border hover:border-primary/50 transition-colors group"
                    >
                      <Linkedin className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {String(t("contact.info.linkedin"))}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          @salemaljebaly
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">
                    {String(t("contact.info.additional.title"))}
                  </h3>

                  <div className="space-y-3 text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span>
                        {String(t("contact.info.additional.location"))}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>
                        {String(t("contact.info.additional.availability"))}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2 text-foreground">
                    {String(t("contact.info.schedule.title"))}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {String(t("contact.info.schedule.description"))}
                  </p>
                  <div className="text-sm text-muted-foreground">
                    {String(t("contact.info.schedule.note"))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

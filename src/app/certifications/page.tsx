"use client";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Award, Calendar, ExternalLink, Filter, Shield } from "lucide-react";
import { useState } from "react";
// Import MagicUI components after installation
// import { AnimatedList } from "@/components/magicui/animated-list";

interface Certification {
  id: number;
  name: string;
  issuer: string;
  category: string;
  date: string;
  expiryDate?: string;
  credentialId: string;
  credlyUrl: string;
  logo: string;
  skills: string[];
  description: string;
}

const certifications: Certification[] = [
  {
    id: 1,
    name: "AWS Certified Solutions Architect - Associate",
    issuer: "Amazon Web Services",
    category: "AWS",
    date: "March 2023",
    expiryDate: "March 2026",
    credentialId: "AWS-SAA-123456",
    credlyUrl: "https://www.credly.com/badges/123456",
    logo: "/certifications/aws-sa-associate.png",
    skills: [
      "AWS Architecture",
      "Cloud Design",
      "Security",
      "Cost Optimization",
    ],
    description:
      "Validates ability to design distributed systems on AWS platform",
  },
  {
    id: 2,
    name: "AWS Certified DevOps Engineer - Professional",
    issuer: "Amazon Web Services",
    category: "AWS",
    date: "June 2023",
    expiryDate: "June 2026",
    credentialId: "AWS-DOP-789012",
    credlyUrl: "https://www.credly.com/badges/789012",
    logo: "/certifications/aws-devops-pro.png",
    skills: ["CI/CD", "Automation", "Monitoring", "Security"],
    description:
      "Advanced certification for implementing and managing continuous delivery systems on AWS",
  },
  {
    id: 3,
    name: "AWS Certified SysOps Administrator - Associate",
    issuer: "Amazon Web Services",
    category: "AWS",
    date: "January 2022",
    expiryDate: "January 2025",
    credentialId: "AWS-SOA-345678",
    credlyUrl: "https://www.credly.com/badges/345678",
    logo: "/certifications/aws-sysops.png",
    skills: ["Operations", "Deployment", "Management", "Troubleshooting"],
    description:
      "Demonstrates expertise in deploying, managing, and operating workloads on AWS",
  },
  {
    id: 4,
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    category: "AWS",
    date: "September 2021",
    expiryDate: "September 2024",
    credentialId: "AWS-CCP-901234",
    credlyUrl: "https://www.credly.com/badges/901234",
    logo: "/certifications/aws-cloud-practitioner.png",
    skills: ["Cloud Concepts", "AWS Services", "Security", "Billing"],
    description:
      "Foundational understanding of AWS Cloud concepts and services",
  },
  {
    id: 5,
    name: "GitHub Actions",
    issuer: "GitHub",
    category: "GitHub",
    date: "November 2023",
    credentialId: "GH-ACTIONS-567890",
    credlyUrl: "https://www.credly.com/badges/567890",
    logo: "/certifications/github-actions.png",
    skills: ["CI/CD", "Automation", "Workflows", "DevOps"],
    description: "Proficiency in automating workflows with GitHub Actions",
  },
];

const categories = ["All", "AWS", "GitHub", "Google Cloud", "Other"];

export default function CertificationsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedCert, setExpandedCert] = useState<number | null>(null);

  const filteredCertifications =
    selectedCategory === "All"
      ? certifications
      : certifications.filter((cert) => cert.category === selectedCategory);

  const certificationsByCategory = categories.slice(1).map((category) => ({
    category,
    count: certifications.filter((cert) => cert.category === category).length,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Professional Certifications
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Continuously learning and validating expertise in cloud
              technologies, DevOps practices, and modern software development.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {certifications.length}
                </div>
                <div className="text-muted-foreground">
                  Total Certifications
                </div>
              </div>
              {certificationsByCategory
                .filter((c) => c.count > 0)
                .map((cat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-primary">
                      {cat.count}
                    </div>
                    <div className="text-muted-foreground">{cat.category}</div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 flex-wrap">
              <Filter className="w-5 h-5 text-muted-foreground" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-accent"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications List */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-6">
              {filteredCertifications.map((cert, index) => (
                <div
                  key={cert.id}
                  className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-6">
                      {/* Badge Placeholder */}
                      <div className="flex-shrink-0 w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
                        <Award className="w-12 h-12 text-primary" />
                      </div>

                      {/* Certification Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold">{cert.name}</h3>
                          <a
                            href={cert.credlyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-primary hover:underline"
                          >
                            Verify
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>

                        <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Shield className="w-4 h-4" />
                              {cert.issuer}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {cert.date}
                            </span>
                            {cert.expiryDate && (
                              <span>Expires: {cert.expiryDate}</span>
                            )}
                          </div>
                          <div>
                            <span className="font-medium">Credential ID:</span>{" "}
                            {cert.credentialId}
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {cert.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground">
                          {cert.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Credly Integration Notice */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Verified Credentials</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              All certifications are verified and can be validated through
              Credly's digital badge platform
            </p>
            <a
              href="https://www.credly.com/users/salem-aljebaly"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Award className="w-5 h-5" />
              View All Badges on Credly
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

import { TranslationProvider } from "@/components/TranslationProvider";
import { Locale, getTranslations, isValidLocale } from "@/i18n";
import ProjectsClient from "./ProjectsClient";
// Import MagicUI components after installation
// import { BentoGrid, BentoGridItem } from "@/components/magicui/bento-grid";
// import { BoxReveal } from "@/components/magicui/box-reveal";

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  tech: string[];
  image?: string;
  links: {
    github?: string;
    live?: string;
  };
  impact: string;
  problem: string;
  solution: string;
}

const projects = [
  {
    id: 1,
    title: "ThingsBoard Mobile App Localization",
    description: "Added Arabic language support to ThingsBoard Flutter app",
    longDescription:
      "Contributed to the open-source ThingsBoard IoT platform by implementing complete Arabic localization for their mobile application. This enhancement made the platform accessible to millions of Arabic-speaking users in the IoT industry.",
    category: "Open Source",
    tech: ["Flutter", "Dart", "IoT", "Localization", "Git"],
    links: {
      github: "https://github.com/thingsboard/flutter_thingsboard_app",
    },
    impact:
      "Enabled Arabic-speaking users to utilize the platform, expanding market reach by 25%",
    problem:
      "The ThingsBoard mobile app lacked Arabic language support, limiting its adoption in Middle Eastern markets",
    solution:
      "Implemented comprehensive RTL support and translated all UI elements, ensuring cultural and linguistic accuracy",
  },
  {
    id: 2,
    title: "Enterprise CI/CD Pipeline Automation",
    description: "Automated deployment pipeline reducing release time by 80%",
    longDescription:
      "Designed and implemented a comprehensive CI/CD pipeline for a large enterprise, automating the entire software delivery process from code commit to production deployment.",
    category: "DevOps Tools",
    tech: ["Jenkins", "Docker", "Kubernetes", "Terraform", "AWS", "Python"],
    links: {
      github: "https://github.com/salemaljebaly/cicd-automation",
    },
    impact:
      "Reduced deployment time from 4 hours to 45 minutes, eliminated 95% of manual errors",
    problem:
      "Manual deployment processes were slow, error-prone, and required significant developer time",
    solution:
      "Built automated pipelines with comprehensive testing, rollback capabilities, and monitoring integration",
  },
  {
    id: 3,
    title: "Multi-Cloud Infrastructure Management Platform",
    description: "Unified platform for managing AWS, Azure, and GCP resources",
    longDescription:
      "Developed a centralized platform that provides a single interface for managing infrastructure across multiple cloud providers, with cost optimization and security compliance features.",
    category: "Cloud/DevOps",
    tech: ["Go", "React", "Terraform", "AWS SDK", "Azure SDK", "GCP SDK"],
    links: {
      live: "https://demo.example.com",
    },
    impact:
      "Reduced cloud costs by 40% through intelligent resource management and optimization",
    problem:
      "Managing resources across multiple cloud providers was complex and led to cost overruns",
    solution:
      "Created a unified dashboard with automated cost optimization and compliance checking",
  },
  {
    id: 4,
    title: "Kubernetes Auto-Scaling Solution",
    description:
      "Intelligent auto-scaling for Kubernetes workloads based on custom metrics",
    longDescription:
      "Built a custom auto-scaling solution for Kubernetes that uses machine learning to predict traffic patterns and scale applications proactively.",
    category: "Cloud/DevOps",
    tech: ["Kubernetes", "Python", "Prometheus", "TensorFlow", "Go"],
    links: {
      github: "https://github.com/salemaljebaly/k8s-smart-scaler",
    },
    impact:
      "Improved application performance by 35% while reducing infrastructure costs by 25%",
    problem:
      "Standard Kubernetes auto-scaling was reactive, causing performance issues during traffic spikes",
    solution:
      "Implemented ML-based predictive scaling that anticipates load changes before they occur",
  },
  {
    id: 5,
    title: "Security Compliance Automation Framework",
    description:
      "Automated security scanning and compliance reporting for cloud infrastructure",
    longDescription:
      "Created a framework that continuously scans cloud infrastructure for security vulnerabilities and compliance violations, automatically generating reports and remediation suggestions.",
    category: "Security",
    tech: ["Python", "AWS Security Hub", "Terraform", "Docker", "GitLab CI"],
    links: {
      github: "https://github.com/salemaljebaly/security-compliance",
    },
    impact:
      "Reduced time to identify and fix security issues by 90%, achieved 100% compliance rate",
    problem:
      "Manual security audits were time-consuming and often missed critical vulnerabilities",
    solution:
      "Automated continuous security scanning with real-time alerts and auto-remediation capabilities",
  },
  {
    id: 6,
    title: "Microservices Migration Tool",
    description:
      "Tool for analyzing and migrating monolithic applications to microservices",
    longDescription:
      "Developed a tool that analyzes monolithic applications, identifies service boundaries, and assists in breaking them down into microservices architecture.",
    category: "Web Applications",
    tech: ["Java", "Spring Boot", "Docker", "Kubernetes", "PostgreSQL"],
    links: {
      github: "https://github.com/salemaljebaly/mono2micro",
    },
    impact:
      "Accelerated migration projects by 60%, reduced architectural debt significantly",
    problem:
      "Migrating monolithic applications to microservices was complex and error-prone",
    solution:
      "Built automated analysis tools that identify service boundaries and generate migration plans",
  },
];

const categories = [
  "All",
  "Cloud/DevOps",
  "DevOps Tools",
  "Open Source",
  "Web Applications",
  "Security",
];

export default async function ProjectsPage({
  params,
}: {
  params: { locale: Promise<string> };
}) {
  const locale = await params.locale;
  
  if (!isValidLocale(locale)) {
    return null;
  }
  
  const translations = await getTranslations(locale as Locale);
  
  return (
    <TranslationProvider locale={locale as Locale} translations={translations}>
      <ProjectsClient 
        projects={projects} 
        categories={categories}
        locale={locale}
      />
    </TranslationProvider>
  );
}

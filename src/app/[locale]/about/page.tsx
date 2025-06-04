import { TranslationProvider } from "@/components/TranslationProvider";
import { Locale, getTranslations, isValidLocale } from "@/i18n";
import { Briefcase, GraduationCap, Rocket, Users } from "lucide-react";
import AboutClient from "./AboutClient";

// Define the timeline data
const timeline = [
  {
    year: "2023 - Present",
    title: "CTO & DevOps Architect",
    company: "Your Current Company",
    description: "Leading technical strategy and implementing DevOps practices across the organization.",
    icon: <Rocket className="w-6 h-6" />
  },
  {
    year: "2020 - 2023",
    title: "Lead DevOps Engineer",
    company: "Previous Company",
    description: "Established CI/CD pipelines and cloud infrastructure that reduced deployment time by 70%.",
    icon: <Briefcase className="w-6 h-6" />
  },
  {
    year: "2018 - 2020",
    title: "Senior Software Engineer",
    company: "Tech Company",
    description: "Developed and maintained microservices architecture for high-traffic applications.",
    icon: <Users className="w-6 h-6" />
  },
  {
    year: "2016 - 2018",
    title: "Software Developer",
    company: "First Tech Job",
    description: "Built and deployed web applications using modern JavaScript frameworks.",
    icon: <GraduationCap className="w-6 h-6" />
  }
];

// Define the skills data
const skills = [
  {
    category: "Cloud & Infrastructure",
    items: ["AWS", "Azure", "GCP", "Kubernetes", "Docker", "Terraform", "Serverless"]
  },
  {
    category: "DevOps & CI/CD",
    items: ["GitHub Actions", "Jenkins", "CircleCI", "ArgoCD", "Ansible", "Prometheus", "Grafana"]
  },
  {
    category: "Programming & Frameworks",
    items: ["JavaScript/TypeScript", "Python", "Go", "React", "Node.js", "Next.js", "Express"]
  },
  {
    category: "Database & Storage",
    items: ["PostgreSQL", "MongoDB", "Redis", "DynamoDB", "S3", "ElasticSearch"]
  },
  {
    category: "Security & Compliance",
    items: ["IAM", "OWASP", "SSL/TLS", "VPC", "WAF", "Security Groups", "Compliance Frameworks"]
  },
  {
    category: "Methodologies",
    items: ["Agile", "Scrum", "Kanban", "TDD", "BDD", "GitOps", "Infrastructure as Code"]
  }
];

export default async function AboutPage(
  props: {
    params: Promise<{ locale: Promise<string> }>;
  }
) {
  const params = await props.params;
  const locale = await params.locale;

  if (!isValidLocale(locale)) {
    return null;
  }

  const translations = await getTranslations(locale as Locale);

  return (
    <TranslationProvider locale={locale as Locale} translations={translations}>
      <AboutClient locale={locale} />
    </TranslationProvider>
  );
}

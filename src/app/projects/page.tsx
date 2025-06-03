"use client";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { ChevronRight, ExternalLink, Filter, Github } from "lucide-react";
import { useState } from "react";
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

const projects: Project[] = [
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

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Projects Portfolio
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Showcasing innovative solutions in DevOps, cloud architecture, and
              automation that have delivered real business value.
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 border-b">
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

        {/* Projects Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-card rounded-lg border overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Project Header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold">{project.title}</h3>
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {project.category}
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-4">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs bg-muted rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="px-2 py-1 text-xs text-muted-foreground">
                          +{project.tech.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4">
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          Source Code
                        </a>
                      )}
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}

                      <button
                        onClick={() =>
                          setExpandedProject(
                            expandedProject === project.id ? null : project.id
                          )
                        }
                        className="ml-auto flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        {expandedProject === project.id
                          ? "Show Less"
                          : "Learn More"}
                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${
                            expandedProject === project.id ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedProject === project.id && (
                    <div className="border-t bg-muted/50 p-6 space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Overview</h4>
                        <p className="text-sm text-muted-foreground">
                          {project.longDescription}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Problem</h4>
                          <p className="text-sm text-muted-foreground">
                            {project.problem}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Solution</h4>
                          <p className="text-sm text-muted-foreground">
                            {project.solution}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Impact & Results</h4>
                        <p className="text-sm text-muted-foreground">
                          {project.impact}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Full Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs bg-background rounded-md border"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GitHub Integration Notice */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Open Source Contributions
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Check out my latest open source work and contributions on GitHub
            </p>
            <a
              href="https://github.com/salemaljebaly"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Github className="w-5 h-5" />
              View GitHub Profile
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

"use client";

import { ArrowRight, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
// Import MagicUI components after installation
// import { MagicCard } from "@/components/magicui/magic-card";
// import { BoxReveal } from "@/components/magicui/box-reveal";

interface Project {
  title: string;
  description: string;
  image?: string;
  tech: string[];
  links: {
    github?: string;
    live?: string;
  };
}

const featuredProjects: Project[] = [
  {
    title: "IoT Platform Localization (ThingsBoard)",
    description:
      "Contributed to ThingsBoard's mobile app by adding Arabic locale support, enhancing accessibility for Arabic-speaking users in IoT domain.",
    tech: ["Flutter", "Dart", "IoT", "Localization"],
    links: {
      github: "https://github.com/thingsboard/flutter_thingsboard_app",
    },
  },
  {
    title: "Infrastructure Automation Tool",
    description:
      "Built a comprehensive CI/CD pipeline automation tool that reduced deployment time by 80% and improved system reliability.",
    tech: ["Jenkins", "Docker", "Kubernetes", "Terraform"],
    links: {
      github: "https://github.com/salemaljebaly",
    },
  },
  {
    title: "Cloud Architecture Migration",
    description:
      "Led the migration of a monolithic application to microservices architecture on AWS, resulting in 60% cost reduction.",
    tech: ["AWS", "Docker", "ECS", "RDS"],
    links: {
      live: "https://example.com",
    },
  },
];

export default function FeaturedProjects() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing innovative solutions in DevOps, cloud architecture, and
            automation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <div
      className="group relative bg-background rounded-lg border border-border p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Replace with MagicUI MagicCard for hover effects */}
      {/* <MagicCard className="p-6"> */}

      {/* Spotlight effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300" />

      <div className="relative z-10">
        <h3 className="text-xl font-semibold mb-3">{project.title}</h3>

        <p className="text-muted-foreground mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
              Code
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
        </div>
      </div>
      {/* </MagicCard> */}
    </div>
  );
}

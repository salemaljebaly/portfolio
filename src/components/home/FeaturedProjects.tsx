"use client";

import projectsData from "@/data/projects.en.json";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { BorderBeam } from "../magicui/border-beam";

interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  tech: string[];
  links: {
    github?: string;
    live?: string;
    contribution?: string;
    package?: string;
  };
  featured: boolean;
}

// Filter featured projects from the projects data
const featuredProjects: Project[] = projectsData.projects.filter(
  (project) => project.featured,
);

export default function FeaturedProjects() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Selected highlights from 43 delivered projects across cloud, DevOps,
            mobile/IoT, and tooling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={project.id}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            View All 43 Projects
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
      className="group relative bg-background rounded-lg border border-border p-6  transition-all duration-300 hover:border-primary/50"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
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
          {project.links.contribution && (
            <a
              href={project.links.contribution}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Contribution
            </a>
          )}
          {project.links.package && (
            <a
              href={project.links.package}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Package
            </a>
          )}
        </div>
      </div>
      <BorderBeam duration={8} size={100} />
    </div>
  );
}

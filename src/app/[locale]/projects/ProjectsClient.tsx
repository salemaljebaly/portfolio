"use client";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { useTranslations } from "@/components/TranslationProvider";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Filter,
  Github,
} from "lucide-react";
import { useState } from "react";

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

interface ProjectsClientProps {
  projects: Project[];
  categories: string[];
  locale: string;
}

export default function ProjectsClient({
  projects,
  categories,
  locale,
}: ProjectsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const { t } = useTranslations();

  const isRTL = locale === "ar";

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
              {String(t("projects.title"))}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              {String(t("projects.description"))}
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`flex items-center gap-4 flex-wrap ${
                isRTL ? "flex-row-reverse justify-end" : ""
              }`}
            >
              <Filter className="w-5 h-5 text-muted-foreground" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-accent text-foreground"
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
                    <div
                      className={`flex items-start justify-between mb-4 ${
                        isRTL ? "flex-row-reverse" : ""
                      }`}
                    >
                      <h3 className="text-xl font-semibold text-foreground">
                        {project.title}
                      </h3>
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {project.category}
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-4">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div
                      className={`flex flex-wrap gap-2 mb-4 ${
                        isRTL ? "flex-row-reverse" : ""
                      }`}
                    >
                      {project.tech.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="px-2 py-1 text-xs text-muted-foreground">
                          +{project.tech.length - 4}{" "}
                          {String(t("projects.more"))}
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div
                      className={`flex items-center gap-4 ${
                        isRTL ? "flex-row-reverse" : ""
                      }`}
                    >
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors ${
                            isRTL ? "flex-row-reverse" : ""
                          }`}
                        >
                          <Github className="w-4 h-4" />
                          {String(t("projects.sourceCode"))}
                        </a>
                      )}
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors ${
                            isRTL ? "flex-row-reverse" : ""
                          }`}
                        >
                          <ExternalLink className="w-4 h-4" />
                          {String(t("projects.liveDemo"))}
                        </a>
                      )}

                      <button
                        onClick={() =>
                          setExpandedProject(
                            expandedProject === project.id ? null : project.id
                          )
                        }
                        className={`${
                          isRTL ? "mr-auto" : "ml-auto"
                        } flex items-center gap-1 text-sm text-primary hover:underline ${
                          isRTL ? "flex-row-reverse" : ""
                        }`}
                      >
                        {isRTL ? (
                          <ChevronLeft
                            className={`w-4 h-4 transition-transform ${
                              expandedProject === project.id ? "-rotate-90" : ""
                            }`}
                          />
                        ) : null}
                        {expandedProject === project.id
                          ? String(t("projects.showLess"))
                          : String(t("projects.learnMore"))}
                        {!isRTL ? (
                          <ChevronRight
                            className={`w-4 h-4 transition-transform ${
                              expandedProject === project.id ? "rotate-90" : ""
                            }`}
                          />
                        ) : null}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedProject === project.id && (
                    <div className="border-t bg-muted/50 p-6 space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-foreground">
                          {String(t("projects.overview"))}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {project.longDescription}
                        </p>
                      </div>

                      <div
                        className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${
                          isRTL ? "[direction:rtl]" : ""
                        }`}
                      >
                        <div>
                          <h4 className="font-semibold mb-2 text-foreground">
                            {String(t("projects.problem"))}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {project.problem}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 text-foreground">
                            {String(t("projects.solution"))}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {project.solution}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-foreground">
                          {String(t("projects.impact"))}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {project.impact}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-foreground">
                          {String(t("projects.techStack"))}
                        </h4>
                        <div
                          className={`flex flex-wrap gap-2 ${
                            isRTL ? "flex-row-reverse" : ""
                          }`}
                        >
                          {project.tech.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
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
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              {String(t("projects.openSource.title"))}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {String(t("projects.openSource.description"))}
            </p>
            <a
              href="https://github.com/salemaljebaly"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-8 py-4 text-lg font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <Github className="w-5 h-5" />
              {String(t("projects.openSource.viewProfile"))}
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

import { loadProjects } from "@/utils/loadData";
import ProjectsClient from "../[locale]/projects/ProjectsClient";

export default function ProjectsPage() {
  const locale = "en" as const;
  const projects = loadProjects(locale);
  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  return (
    <ProjectsClient projects={projects} categories={categories} locale={locale} />
  );
}


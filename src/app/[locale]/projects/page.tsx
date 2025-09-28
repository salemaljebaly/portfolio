import { isValidLocale } from "@/i18n";
import { loadProjects } from "@/utils/loadData";
import { notFound } from "next/navigation";
import ProjectsClient from "./ProjectsClient";

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const projects = loadProjects(locale);
  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];

  return (
    <ProjectsClient
      projects={projects}
      categories={categories}
      locale={locale}
    />
  );
}

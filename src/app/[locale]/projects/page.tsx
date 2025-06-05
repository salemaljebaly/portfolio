import { loadProjects } from "@/utils/loadData";
import ProjectsClient from "./ProjectsClient";
interface ProjectsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function ProjectsPage(props: ProjectsPageProps) {
  const params = await props.params;
  const projects = loadProjects(params.locale);
  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];

  return (
    <ProjectsClient
      projects={projects}
      categories={categories}
      locale={params.locale}
    />
  );
}

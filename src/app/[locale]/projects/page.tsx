import { loadProjects } from '@/utils/loadData';
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

interface ProjectsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function ProjectsPage(props: ProjectsPageProps) {
  const params = await props.params;
  const projects = loadProjects(params.locale);
  const categories = ['All', ...new Set(projects.map(project => project.category))];

  return <ProjectsClient projects={projects} categories={categories} locale={params.locale} />;
}

import { loadProjects } from "@/utils/loadData";
import ProjectsClient from "../[locale]/projects/ProjectsClient";

export default function ProjectsPage() {
  const locale = "en" as const;
  const projects = loadProjects(locale);

  // Priority order: show these first in this specific order
  const priority = [
    "mstore-api-optimizer",
    "EnvSeeder",
    "mac-dev-setup",
    "bulk-image-importer",
  ];
  const titleRank = new Map(priority.map((t, i) => [t.toLowerCase(), i]));
  const sorted = [...projects].sort((a, b) => {
    const ra = titleRank.get(a.title.toLowerCase());
    const rb = titleRank.get(b.title.toLowerCase());
    if (ra !== undefined && rb !== undefined) return ra - rb;
    if (ra !== undefined) return -1;
    if (rb !== undefined) return 1;
    return a.id - b.id;
  });

  const categoryOrder = [
    "Cloud & DevOps",
    "Mobile & IoT",
    "Design Tools",
    "Web Development",
  ];
  const categorySet = new Set(sorted.map((p) => p.category));
  const categories = [
    "All",
    ...categoryOrder.filter((category) => categorySet.has(category)),
    ...[...categorySet].filter((category) => !categoryOrder.includes(category)),
  ];
  return (
    <ProjectsClient projects={sorted} categories={categories} locale={locale} />
  );
}

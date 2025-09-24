import certificationsAr from "@/data/certifications.ar.json";
import certificationsEn from "@/data/certifications.en.json";
import projectsAr from "@/data/projects.ar.json";
import projectsEn from "@/data/projects.en.json";
import timelineAr from "@/data/timeline.ar.json";
import timelineEn from "@/data/timeline.en.json";

function normalizeCategory(category: string): string {
  const map: Record<string, string> = {
    "Development Tools": "Developer Tools",
    "Developer Tools": "Developer Tools",
    DevOps: "Developer Tools",
    Utilities: "Developer Tools",
    Performance: "Developer Tools",
    Documentation: "Developer Tools",
  };
  return map[category] ?? category;
}

export function loadProjects(locale: string) {
  const data = locale === "ar" ? projectsAr.projects : projectsEn.projects;
  return data.map((p) => ({ ...p, category: normalizeCategory(p.category) }));
}

export function loadCertifications(locale: string) {
  return locale === "ar"
    ? certificationsAr.certifications
    : certificationsEn.certifications;
}

export function loadTimeline(locale: string) {
  return locale === "ar" ? timelineAr.timeline : timelineEn.timeline;
}

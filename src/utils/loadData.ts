import certificationsAr from "@/data/certifications.ar.json";
import certificationsEn from "@/data/certifications.en.json";
import projectsAr from "@/data/projects.ar.json";
import projectsEn from "@/data/projects.en.json";
import timelineAr from "@/data/timeline.ar.json";
import timelineEn from "@/data/timeline.en.json";

export function normalizeCategory(category: string): string {
  const map: Record<string, string> = {
    DevOps: "Cloud & DevOps",
    "Development Tools": "Cloud & DevOps",
    "Developer Tools": "Cloud & DevOps",
    Utilities: "Cloud & DevOps",
    Performance: "Cloud & DevOps",
    Documentation: "Cloud & DevOps",
    IoT: "Mobile & IoT",
    "Mobile Development": "Mobile & IoT",
    "Design Tools": "Design Tools",
    "Web Development": "Web Development",
  };
  return map[category] ?? category;
}

export function loadProjects(locale: string) {
  const data = locale === "ar" ? projectsAr.projects : projectsEn.projects;
  return data.map((p) => ({ ...p, category: normalizeCategory(p.category) }));
}

export function parseMonthYear(value: string): number {
  const parsed = Date.parse(`${value} 1`);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function normalizeCertificationName(name: string): string {
  return name
    .replace(/early adopter/gi, "")
    .replace(/[–—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function getRelevantCertifications(locale: string) {
  const certifications = loadCertifications(locale);
  const seen = new Set<string>();

  const deduplicated = certifications.filter((cert) => {
    const key = normalizeCertificationName(cert.name);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const relevanceOrder = [
    "aws certified solutions architect associate",
    "aws certified developer associate",
    "aws certified cloud practitioner",
    "github foundations",
    "aws certified ai practitioner",
  ];

  const rank = (name: string) => {
    const normalized = normalizeCertificationName(name);
    const idx = relevanceOrder.findIndex((token) => normalized.includes(token));
    return idx === -1 ? relevanceOrder.length : idx;
  };

  return [...deduplicated]
    .sort((a, b) => {
      const byRelevance = rank(a.name) - rank(b.name);
      if (byRelevance !== 0) return byRelevance;
      return parseMonthYear(b.date) - parseMonthYear(a.date);
    })
    .slice(0, 6);
}

export function loadCertifications(locale: string) {
  return locale === "ar"
    ? certificationsAr.certifications
    : certificationsEn.certifications;
}

export function loadTimeline(locale: string) {
  return locale === "ar" ? timelineAr.timeline : timelineEn.timeline;
}

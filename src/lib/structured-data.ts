export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Salem Aljebaly",
    alternateName: "سالم الجبالي",
    jobTitle: "Senior Platform Engineer",
    description:
      "Senior Platform Engineer and Cloud & FinOps Specialist focused on cloud migration, cost optimization, and automated disaster recovery.",
    url: "https://docker.com.ly",
    image: "https://docker.com.ly/salem-aljebaly.jpg",
    sameAs: [
      "https://linkedin.com/in/salemaljebaly",
      "https://github.com/salemaljebaly",
      "https://www.credly.com/users/salem-aljebaly",
    ],
    knowsAbout: [
      "DevOps",
      "Cloud Architecture",
      "AWS",
      "Hetzner",
      "FinOps",
      "Kubernetes",
      "Docker",
      "CI/CD",
      "Infrastructure as Code",
      "Automation",
    ],
    alumniOf: {
      "@type": "Organization",
      name: "University Name",
    },
    award: [
      "AWS Certified Solutions Architect - Associate",
      "AWS Certified DevOps Engineer - Professional",
      "AWS Certified SysOps Administrator",
      "AWS Certified Cloud Practitioner",
      "GitHub Actions Certified",
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Salem Aljebaly Portfolio",
    alternateName: "ملف سالم الجبالي",
    url: "https://docker.com.ly",
    description:
      "Professional portfolio of Salem Aljebaly - Senior Platform Engineer and Cloud & FinOps Specialist",
    author: {
      "@type": "Person",
      name: "Salem Aljebaly",
    },
    inLanguage: ["en", "ar"],
    potentialAction: {
      "@type": "SearchAction",
      target: "https://docker.com.ly/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateProjectSchema(project: {
  name: string;
  description: string;
  url?: string;
  dateCreated?: string;
  programmingLanguage?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.description,
    url: project.url,
    dateCreated: project.dateCreated,
    programmingLanguage: project.programmingLanguage,
    creator: {
      "@type": "Person",
      name: "Salem Aljebaly",
    },
  };
}

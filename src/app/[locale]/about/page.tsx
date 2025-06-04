import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { TranslationProvider } from "@/components/TranslationProvider";
import { Locale, getTranslations, isValidLocale } from "@/i18n";
import { Briefcase, Download, GraduationCap, Rocket, Users } from "lucide-react";

// Define the timeline data
const timeline = [
  {
    year: "2023 - Present",
    title: "CTO & DevOps Architect",
    company: "Your Current Company",
    description: "Leading technical strategy and implementing DevOps practices across the organization.",
    icon: <Rocket className="w-6 h-6" />
  },
  {
    year: "2020 - 2023",
    title: "Lead DevOps Engineer",
    company: "Previous Company",
    description: "Established CI/CD pipelines and cloud infrastructure that reduced deployment time by 70%.",
    icon: <Briefcase className="w-6 h-6" />
  },
  {
    year: "2018 - 2020",
    title: "Senior Software Engineer",
    company: "Tech Company",
    description: "Developed and maintained microservices architecture for high-traffic applications.",
    icon: <Users className="w-6 h-6" />
  },
  {
    year: "2016 - 2018",
    title: "Software Developer",
    company: "First Tech Job",
    description: "Built and deployed web applications using modern JavaScript frameworks.",
    icon: <GraduationCap className="w-6 h-6" />
  }
];

// Define the skills data
const skills = [
  {
    category: "Cloud & Infrastructure",
    items: ["AWS", "Azure", "GCP", "Kubernetes", "Docker", "Terraform", "Serverless"]
  },
  {
    category: "DevOps & CI/CD",
    items: ["GitHub Actions", "Jenkins", "CircleCI", "ArgoCD", "Ansible", "Prometheus", "Grafana"]
  },
  {
    category: "Programming & Frameworks",
    items: ["JavaScript/TypeScript", "Python", "Go", "React", "Node.js", "Next.js", "Express"]
  },
  {
    category: "Database & Storage",
    items: ["PostgreSQL", "MongoDB", "Redis", "DynamoDB", "S3", "ElasticSearch"]
  },
  {
    category: "Security & Compliance",
    items: ["IAM", "OWASP", "SSL/TLS", "VPC", "WAF", "Security Groups", "Compliance Frameworks"]
  },
  {
    category: "Methodologies",
    items: ["Agile", "Scrum", "Kanban", "TDD", "BDD", "GitOps", "Infrastructure as Code"]
  }
];

export default async function AboutPage({
  params,
}: {
  params: { locale: Promise<string> };
}) {
  const locale = await params.locale;
  
  if (!isValidLocale(locale)) {
    return null;
  }
  
  const translations = await getTranslations(locale as Locale);
  
  return (
    <TranslationProvider locale={locale as Locale} translations={translations}>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Rest of your about page content */}
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">About Me</h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                From optimizing assembly lines to optimizing cloud pipelines - my
                journey has been about continuous improvement and technological
                innovation.
              </p>
            </div>
          </section>
        
          {/* Professional Journey */}
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold mb-12 text-center">
                Professional Journey
              </h2>
        
              <div className="max-w-4xl mx-auto">
                {/* Timeline */}
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
        
                  {/* Timeline items */}
                  <div className="space-y-12">
                    {timeline.map((item, index) => (
                      <div
                        key={index}
                        className="relative flex gap-8 group"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {/* Icon */}
                        <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-background border-2 border-primary shadow-lg group-hover:shadow-xl transition-shadow">
                          <div className="text-primary">{item.icon}</div>
                        </div>
        
                        {/* Content */}
                        <div className="flex-1 pb-8">
                          <div className="bg-card p-6 rounded-lg border shadow-sm group-hover:shadow-md transition-shadow">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="text-sm font-medium text-primary">
                                {item.year}
                              </span>
                              {item.company && (
                                <>
                                  <span className="text-muted-foreground">•</span>
                                  <span className="text-sm text-muted-foreground">
                                    {item.company}
                                  </span>
                                </>
                              )}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                              {item.title}
                            </h3>
                            <p className="text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        
          {/* Skills Matrix */}
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold mb-12 text-center">
                Technical Expertise
              </h2>
        
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {skills.map((skillGroup, index) => (
                  <div
                    key={index}
                    className="bg-background rounded-lg border p-6 hover:shadow-lg transition-shadow"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <h3 className="text-lg font-semibold mb-4 text-primary">
                      {skillGroup.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        
          {/* Personal Philosophy */}
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-8">My Philosophy</h2>
              <blockquote className="text-2xl font-light text-muted-foreground max-w-4xl mx-auto">
                "DevOps isn't just about tools and automation - it's about
                creating a culture of continuous improvement, collaboration, and
                delivering value to users faster and more reliably."
              </blockquote>
              <p className="mt-4 text-lg">- Salem Aljebaly</p>
            </div>
          </section>
        
          {/* CTA Section */}
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Want to Know More?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Download my detailed CV or get in touch to discuss how I can help
                your organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/SalemAljebalyCV.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download CV
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg border border-border hover:bg-accent transition-colors"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </TranslationProvider>
  );
}

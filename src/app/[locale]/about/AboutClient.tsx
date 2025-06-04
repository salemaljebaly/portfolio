"use client";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Briefcase, Download, GraduationCap, Rocket, Users } from "lucide-react";

interface AboutClientProps {
  locale: string;
}

const timeline = [
  {
    year: "2023",
    title: "DevOps Engineer",
    company: "Freelance",
    description:
      "Leading DevOps transformations and implementing cloud-native solutions for various clients.",
    icon: <Rocket className="w-6 h-6" />,
  },
  {
    year: "2021-2023",
    title: "Full Stack Developer",
    company: "Various Projects",
    description:
      "Developed and deployed full-stack applications using modern technologies.",
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    year: "2020",
    title: "Bachelor's in Computer Science",
    company: "University",
    description:
      "Graduated with honors, focusing on software engineering and cloud computing.",
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    year: "2019",
    title: "First Tech Role",
    company: "Tech Startup",
    description:
      "Started career in technology, working on web development projects.",
    icon: <Users className="w-6 h-6" />,
  },
];

const skills = [
  {
    category: "Cloud & DevOps",
    items: [
      "AWS",
      "Azure",
      "Docker",
      "Kubernetes",
      "Terraform",
      "CI/CD",
      "Jenkins",
      "GitLab",
    ],
  },
  {
    category: "Backend Development",
    items: [
      "Node.js",
      "Python",
      "Java",
      "Go",
      "REST APIs",
      "GraphQL",
      "MongoDB",
      "PostgreSQL",
    ],
  },
  {
    category: "Frontend Development",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Material-UI",
      "Redux",
      "Testing",
    ],
  },
];

export default function AboutClient({ locale }: AboutClientProps) {
  const isRTL = locale === "ar";
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <main className="pt-20">
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">About Me</h1>
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
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
              Professional Journey
            </h2>

            <div className="max-w-4xl mx-auto">
              {/* Timeline */}
              <div className="relative">
                {/* Timeline line */}
                <div className={`absolute ${isRTL ? 'right-8' : 'left-8'} top-0 bottom-0 w-0.5 bg-border`} />

                {/* Timeline items */}
                <div className="space-y-12">
                  {timeline.map((item, index) => (
                    <div
                      key={index}
                      className={`relative flex gap-8 group ${isRTL ? 'flex-row-reverse' : ''}`}
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
                          <h3 className="text-xl font-semibold mb-2 text-foreground">
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
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
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
            <h2 className="text-3xl font-bold mb-8 text-foreground">My Philosophy</h2>
            <blockquote className="text-2xl font-light text-muted-foreground max-w-4xl mx-auto">
              "DevOps isn't just about tools and automation - it's about
              creating a culture of continuous improvement, collaboration, and
              delivering value to users faster and more reliably."
            </blockquote>
            <p className="mt-4 text-lg text-foreground">- Salem Aljebaly</p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Want to Know More?</h2>
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
  );
} 
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GithubIcon } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

export function Projects() {
  const { t } = useTranslation();

  const projects = [
    {
      title: t('projects.thingsboard.title'),
      description: t('projects.thingsboard.description'),
      link: t('projects.thingsboard.link')
    },
    {
      title: t('projects.thingsboardPE.title'),
      description: t('projects.thingsboardPE.description'),
      link: t('projects.thingsboardPE.link')
    },
    {
      title: t('projects.docViewer.title'),
      description: t('projects.docViewer.description'),
      link: t('projects.docViewer.link')
    }
  ];

  return (
    <AnimatedSection className="py-20 px-4 bg-gradient-to-b from-background to-muted/50">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('projects.title')}
        </motion.h2>
        
        <div className="grid gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <GithubIcon className="h-5 w-5 text-primary" />
                    <span className="group-hover:text-primary transition-colors">
                      {project.title}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-2"
                  >
                    View Project
                    <motion.span
                      className="inline-block"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      →
                    </motion.span>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
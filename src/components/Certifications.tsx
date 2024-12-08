import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, ExternalLink } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

export function Certifications() {
  const { t } = useTranslation();

  const certifications = [
    {
      title: t('certifications.aws_cloud_guest.title'),
      issuer: t('certifications.aws_cloud_guest.issuer'),
      date: t('certifications.aws_cloud_guest.date'),
      link: t('certifications.aws_cloud_guest.link')
    },
    {
      title: t('certifications.udacity.title'),
      issuer: t('certifications.udacity.issuer'),
      date: t('certifications.udacity.date'),
      link: t('certifications.udacity.link')
    },
    {
      title: t('certifications.github.title'),
      issuer: t('certifications.github.issuer'),
      date: t('certifications.github.date'),
      link: t('certifications.github.link')
    },
    {
      title: t('certifications.CLF_C02.title'),
      issuer: t('certifications.CLF_C02.issuer'),
      date: t('certifications.CLF_C02.date'),
      link: t('certifications.CLF_C02.link')
    }
  ];

  return (
    <AnimatedSection className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('certifications.title')}
        </motion.h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="h-full group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-primary" />
                    <span className="group-hover:text-primary transition-colors">
                      {cert.title}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">{cert.issuer}</p>
                  <p className="text-sm text-muted-foreground mb-4">{cert.date}</p>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-2"
                  >
                    View Certificate
                    <ExternalLink className="h-4 w-4" />
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
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Users, GitBranchIcon, Workflow, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Users,
      title: t('features.collaboration.title'),
      description: t('features.collaboration.description')
    },
    {
      icon: GitBranchIcon,
      title: t('features.versionControl.title'),
      description: t('features.versionControl.description')
    },
    {
      icon: Workflow,
      title: t('features.automation.title'),
      description: t('features.automation.description')
    },
    {
      icon: Zap,
      title: t('features.performance.title'),
      description: t('features.performance.description')
    }
  ];

  return (
    <section className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {t('features.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <feature.icon className="h-12 w-12 mb-4 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
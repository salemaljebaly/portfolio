import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Code2Icon, SmartphoneIcon, ServerIcon, WrenchIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedSection } from "./AnimatedSection";

export function Skills() {
  const { t } = useTranslation();

  const skills = [
    { icon: SmartphoneIcon, title: t('skills.mobile') },
    { icon: Code2Icon, title: t('skills.web') },
    { icon: ServerIcon, title: t('skills.devops') },
    { icon: WrenchIcon, title: t('skills.automation') },
  ];

  return (
    <AnimatedSection className="py-20 px-4">
      <h2 className="text-3xl font-bold text-center mb-12">{t('skills.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card className="relative overflow-hidden">
              <CardHeader className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="mx-auto"
                >
                  <skill.icon className="h-12 w-12 mb-4" />
                </motion.div>
                <CardTitle className="text-xl">{skill.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div
                  className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity"
                  whileHover={{ opacity: 1 }}
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}
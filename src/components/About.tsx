import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "./AnimatedSection";

export function About() {
  const { t } = useTranslation();

  return (
    <AnimatedSection className="py-20 px-4 bg-muted/50">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('about.title')}
        </motion.h2>
        <Card>
          <CardContent className="pt-6">
            <motion.p 
              className="text-lg leading-relaxed text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {t('about.description')}
            </motion.p>
          </CardContent>
        </Card>
      </div>
    </AnimatedSection>
  );
}
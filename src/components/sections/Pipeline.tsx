import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Card } from "../ui/card";

export function Pipeline() {
  const { t } = useTranslation();

  const steps = [
    { title: 'Commit', color: 'from-green-500/20 to-green-500/10' },
    { title: 'Build', color: 'from-blue-500/20 to-blue-500/10' },
    { title: 'Test', color: 'from-purple-500/20 to-purple-500/10' },
    { title: 'Deploy', color: 'from-orange-500/20 to-orange-500/10' }
  ];

  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          {t('pipeline.title')}
        </motion.h2>

        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-primary/20 -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className={`p-6 relative bg-gradient-to-br ${step.color}`}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary" />
                  <h3 className="text-xl font-semibold text-center mb-4">{step.title}</h3>
                  <p className="text-muted-foreground text-center">
                    {t(`pipeline.steps.${step.title.toLowerCase()}`)}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
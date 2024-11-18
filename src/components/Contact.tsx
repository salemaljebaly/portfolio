import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

export function Contact() {
  const { t } = useTranslation();

  const contactInfo = [
    { icon: Mail, value: t('contact.email'), href: `mailto:${t('contact.email')}` },
    { icon: Phone, value: t('contact.phone'), href: `tel:${t('contact.phone')}` },
    { icon: MapPin, value: t('contact.location'), href: null }
  ];

  return (
    <AnimatedSection className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('contact.title')}
        </motion.h2>
        
        <Card>
          <CardContent className="grid gap-6 pt-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <info.icon className="h-5 w-5 text-primary" />
                {info.href ? (
                  <a
                    href={info.href}
                    className="text-primary hover:underline"
                  >
                    {info.value}
                  </a>
                ) : (
                  <span className="text-muted-foreground">{info.value}</span>
                )}
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AnimatedSection>
  );
}
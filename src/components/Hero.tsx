import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon, Mail, MailIcon, Space } from "lucide-react";
import { Button } from "./ui/button";
import { GitHubLogoIcon, PaddingIcon } from "@radix-ui/react-icons";

export function Hero() {
  const { t } = useTranslation();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
      </motion.div>

      <motion.h1
        variants={item}
        className="text-4xl md:text-6xl font-bold mb-4"
      >
        {t('hero.greeting')}
      </motion.h1>
      
      <motion.h2
        variants={item}
        className="text-2xl md:text-3xl text-muted-foreground mb-6"
      >
        {t('hero.title')}
      </motion.h2>
      
      <motion.p
        variants={item}
        className="text-lg text-muted-foreground max-w-2xl mb-8"
      >
        {t('hero.description')}
      </motion.p>

      <motion.div
        variants={item}
        className="flex gap-4 flex-wrap justify-center"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/salemaljebaly" target="_blank" rel="noopener noreferrer">
              <GitHubLogoIcon className="mr-2 h-5 w-5" style={
                {
                  padding: '2px'
                }
              } /> 
              GitHub
            </a>
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outline" size="lg" asChild>
            <a href="https://www.linkedin.com/in/salemaljebaly/" target="_blank" rel="noopener noreferrer">
              <LinkedinIcon className="mr-2 h-5 w-5" style={
                {
                  padding: '2px'
                }
              }  />
              LinkedIn
            </a>
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outline" size="lg" asChild>
            <a href="mailto:salemaljebaly@gmail.com">
              <MailIcon className="mr-2 h-5 w-5" style={
                {
                  padding: '2px'
                }
              } />
              Email
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
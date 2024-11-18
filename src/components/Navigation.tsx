import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

export function Navigation() {
  const { t } = useTranslation();

  const navItems = [
    'nav.features',
    'nav.pipeline',
    'nav.metrics',
    'nav.tools',
    'nav.insights'
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b"
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-bold"
        >
          DevOps Hub
        </motion.div>

        <ul className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button variant="ghost" className="text-sm">
                {t(item)}
              </Button>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
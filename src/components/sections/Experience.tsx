import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ContainerIcon, CloudIcon, GithubIcon, UsersIcon } from "lucide-react";

export function Experience() {
  const { t } = useTranslation();

  const experiences = [
    {
      icon: ContainerIcon,
      title: "Docker",
      description: "Container orchestration and microservices architecture",
      color: "from-blue-500/20 to-blue-500/10"
    },
    {
      icon: CloudIcon,
      title: "AWS",
      description: "Cloud infrastructure and serverless applications",
      color: "from-orange-500/20 to-orange-500/10"
    },
    {
      icon: GithubIcon,
      title: "Git/GitHub",
      description: "Version control and collaborative development",
      color: "from-purple-500/20 to-purple-500/10"
    },
    {
      icon: UsersIcon,
      title: "Team Management",
      description: "Leading and mentoring development teams",
      color: "from-green-500/20 to-green-500/10"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Professional Experience
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className={`h-full bg-gradient-to-br ${exp.color}`}>
                <CardHeader>
                  <exp.icon className="h-12 w-12 mb-4" />
                  <CardTitle>{exp.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{exp.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
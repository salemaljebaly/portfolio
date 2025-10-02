"use client";

import { motion } from "framer-motion";
import { Cloud, Cpu, GitBranch, Github, Server } from "lucide-react";
import { useRef } from "react";

interface PipelineStep {
  icon: React.ReactNode;
  label: string;
  description: string;
}

const pipelineSteps: PipelineStep[] = [
  {
    icon: <GitBranch className="w-8 h-8" />,
    label: "Git Commit",
    description: "Code changes pushed",
  },
  {
    icon: <Github className="w-8 h-8" />,
    label: "GitHub",
    description: "Version control",
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    label: "CI/CD Pipeline",
    description: "Automated testing & building",
  },
  {
    icon: <Cloud className="w-8 h-8" />,
    label: "Cloud Deploy",
    description: "Cloud deployment",
  },
  {
    icon: <Server className="w-8 h-8" />,
    label: "Production",
    description: "Live application",
  },
];

export default function DevOpsAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setStepRef = (index: number) => (el: HTMLDivElement | null) => {
    stepRefs.current[index] = el;
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            End-to-End DevOps Automation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Streamlining development workflows from code commit to production
            deployment
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div ref={containerRef} className="relative">
            {/* Pipeline steps */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 relative min-h-[200px]">
              {pipelineSteps.map((step, index) => (
                <motion.div
                  key={index}
                  ref={setStepRef(index)}
                  className="pipeline-step flex flex-col items-center text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="w-20 h-20 rounded-full bg-background border-2 border-border flex items-center justify-center mb-4 group-hover:border-primary group-hover:shadow-lg transition-all duration-300">
                    <div className="text-primary">{step.icon}</div>
                  </div>
                  <h3 className="font-semibold mb-1 text-foreground">
                    {step.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Animated Beams */}
            {/* {pipelineSteps.map((_, index) => {
              if (index === pipelineSteps.length - 1) return null;
              return (
                <AnimatedBeam
                  key={index}
                  containerRef={containerRef}
                  fromRef={{ current: stepRefs.current[index] }}
                  toRef={{ current: stepRefs.current[index + 1] }}
                  className="opacity-50"
                  gradientStartColor="#3b82f6"
                  gradientStopColor="#60a5fa"
                  duration={1000}
                  delay={index * 0.2}
                  pathWidth={10}
                  pathOpacity={0.8}
                  curvature={0}
                />
              );
            })} */}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Automated pipeline reduces deployment time by{" "}
            <span className="font-semibold text-primary">80%</span> and ensures{" "}
            <span className="font-semibold text-primary">99.9%</span>{" "}
            reliability
          </p>
        </div>
      </div>
    </section>
  );
}

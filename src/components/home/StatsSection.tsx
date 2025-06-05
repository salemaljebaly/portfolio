"use client";

import { NumberTicker } from "@/components/magicui/number-ticker";
import { Award, Briefcase, Code } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Stat {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  {
    icon: <Briefcase className="w-8 h-8" />,
    value: 10,
    suffix: "+",
    label: "Years Experience",
  },
  {
    icon: <Code className="w-8 h-8" />,
    value: 20,
    suffix: "+",
    label: "Projects Delivered",
  },
  {
    icon: <Award className="w-8 h-8" />,
    value: 5,
    suffix: "x",
    label: "Certified (AWS, GitHub)",
  },
];

export default function StatsSection() {
  const [, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-8 rounded-lg bg-background shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-primary mb-4">{stat.icon}</div>
              <div className="text-4xl font-bold mb-2 text-foreground">
                <NumberTicker value={stat.value} />
                <span className="text-primary">{stat.suffix}</span>
              </div>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

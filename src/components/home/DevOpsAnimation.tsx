"use client";

import { Cloud, Cpu, GitBranch, Github, Server } from "lucide-react";
import { useEffect, useRef } from "react";
// Import MagicUI AnimatedBeam after installation
// import { AnimatedBeam } from "@/components/magicui/animated-beam";

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
    description: "AWS deployment",
  },
  {
    icon: <Server className="w-8 h-8" />,
    label: "Production",
    description: "Live application",
  },
];

export default function DevOpsAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const steps = stepsRef.current;
    if (!canvas || !steps) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const rect = steps.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Animation variables
    let progress = 0;
    const speed = 0.01;

    // Get step positions
    const getStepPositions = () => {
      const stepElements = steps.querySelectorAll(".pipeline-step");
      return Array.from(stepElements).map((el) => {
        const rect = el.getBoundingClientRect();
        const stepsRect = steps.getBoundingClientRect();
        return {
          x: rect.left - stepsRect.left + rect.width / 2,
          y: rect.top - stepsRect.top + rect.height / 2,
        };
      });
    };

    // Draw animated beam
    const drawBeam = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const positions = getStepPositions();
      if (positions.length < 2) return;

      // Draw connections
      ctx.strokeStyle = "rgba(59, 130, 246, 0.3)";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);

      for (let i = 0; i < positions.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(positions[i].x, positions[i].y);
        ctx.lineTo(positions[i + 1].x, positions[i + 1].y);
        ctx.stroke();
      }

      // Draw animated beam
      const totalLength = positions.length - 1;
      const currentSegment = Math.floor(progress * totalLength);
      const segmentProgress = (progress * totalLength) % 1;

      if (currentSegment < totalLength) {
        const start = positions[currentSegment];
        const end = positions[currentSegment + 1];

        const beamX = start.x + (end.x - start.x) * segmentProgress;
        const beamY = start.y + (end.y - start.y) * segmentProgress;

        // Draw beam gradient
        const gradient = ctx.createRadialGradient(
          beamX,
          beamY,
          0,
          beamX,
          beamY,
          20
        );
        gradient.addColorStop(0, "rgba(59, 130, 246, 1)");
        gradient.addColorStop(1, "rgba(59, 130, 246, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(beamX, beamY, 20, 0, Math.PI * 2);
        ctx.fill();

        // Draw beam core
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        ctx.arc(beamX, beamY, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      progress += speed;
      if (progress > 1) progress = 0;

      requestAnimationFrame(drawBeam);
    };

    drawBeam();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

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
          {/* Canvas for animated beams */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-10"
          />

          {/* Pipeline steps */}
          <div
            ref={stepsRef}
            className="grid grid-cols-2 md:grid-cols-5 gap-8 relative"
          >
            {pipelineSteps.map((step, index) => (
              <div
                key={index}
                className="pipeline-step flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 rounded-full bg-background border-2 border-border flex items-center justify-center mb-4 group-hover:border-primary group-hover:shadow-lg transition-all duration-300">
                  <div className="text-primary">{step.icon}</div>
                </div>
                <h3 className="font-semibold mb-1">{step.label}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
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

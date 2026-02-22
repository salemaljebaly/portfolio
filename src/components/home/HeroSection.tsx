"use client";

import { Particles } from "@/components/magicui/particles";
import { Download } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { ShimmerButton } from "../magicui/shimmer-button";
import { TypingAnimation } from "../magicui/typing-animation";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particles Background - Replace with MagicUI Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0.3 }}
      />
      <Particles
        className="absolute inset-0"
        quantity={50}
        ease={80}
        color="#3B82F6"
        refresh
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          Senior Platform Engineer
        </h1>
        <div className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          <TypingAnimation
            className="text-lg sm:text-xl lg:text-2xl text-muted-foreground"
            duration={100}
          >
            {
              "Cloud migration & infrastructure optimization 90% cost reduction • <30 min recovery."
            }
          </TypingAnimation>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/SalemResume.pdf"
            download
            className="inline-flex items-center justify-center gap-2 px-0 py-1 text-lg font-medium  text-primary-foreground transition-all hover:scale-105"
          >
            <ShimmerButton className="gap-2">
              <Download href="/SalemResume.pdf" />
              Download CV
            </ShimmerButton>
          </a>

          <Link
            href="/case-study"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-lg border border-border hover:bg-accent transition-all hover:scale-105 text-foreground"
          >
            Case Study
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-muted-foreground"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div> */}
    </section>
  );
}

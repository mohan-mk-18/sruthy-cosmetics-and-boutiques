"use client";

import { motion } from "framer-motion";
import { MessageSquare, Ruler, Shirt, CheckCircle2 } from "lucide-react";
import { slideUp, staggerContainer, viewportOnce } from "@/lib/animations";

const steps = [
  {
    icon: MessageSquare,
    title: "Consultation",
    description: "Share your fabric, occasion, and inspiration — we scope the design together.",
  },
  {
    icon: Ruler,
    title: "Measurement",
    description: "In-store measurement session, guided by our tailoring team.",
  },
  {
    icon: Shirt,
    title: "Sample",
    description: "A trial fitting so adjustments happen before the final stitch.",
  },
  {
    icon: CheckCircle2,
    title: "Final Stitch",
    description: "Finishing touches, quality check, and your piece is ready to collect.",
  },
];

export default function ProcessTimeline() {
  return (
    <motion.div
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="relative grid grid-cols-1 gap-8 sm:grid-cols-4 sm:gap-4"
    >
      <div
        aria-hidden="true"
        className="absolute left-6 top-6 hidden h-px w-[calc(100%-3rem)] bg-blush sm:block"
      />
      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <motion.div key={step.title} variants={slideUp} className="relative text-center sm:text-left">
            <div className="relative z-10 mx-auto grid h-12 w-12 place-items-center rounded-full bg-white shadow-soft-sm sm:mx-0">
              <Icon size={20} className="text-rose-gold" aria-hidden="true" />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-charcoal/50">
              Step {i + 1}
            </p>
            <p className="mt-1 font-display text-lg text-charcoal">{step.title}</p>
            <p className="mt-1.5 text-sm text-charcoal/65">{step.description}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

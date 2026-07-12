"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { prefersReducedMotion } from "@/lib/animations";

interface CountUpStatProps {
  value: number;
  suffix?: string;
  label: string;
  durationMs?: number;
}

/** Animates 0 → value once the stat scrolls into view. Skips the count for reduced-motion users. */
export default function CountUpStat({ value, suffix = "", label, durationMs = 1400 }: CountUpStatProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setDisplay(value);
      return;
    }
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, durationMs]);

  return (
    <div className="text-center sm:text-left">
      <motion.p
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.3 }}
        className="font-display text-4xl text-charcoal sm:text-5xl"
      >
        {display.toLocaleString("en-IN")}
        {suffix}
      </motion.p>
      <p className="mt-1 text-sm text-charcoal/60">{label}</p>
    </div>
  );
}

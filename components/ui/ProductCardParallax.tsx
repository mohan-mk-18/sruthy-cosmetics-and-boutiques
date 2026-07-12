"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import ProductCard from "./ProductCard";
import type { Product } from "@/types";
import { prefersReducedMotion } from "@/lib/animations";

/**
 * Wraps ProductCard with a subtle cursor-tracked tilt/parallax — desktop only.
 * Falls back to a static card on touch devices and when the user prefers
 * reduced motion, per the brief's performance/accessibility rules.
 */
export default function ProductCardParallax({ product }: { product: Product }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-40, 40], [4, -4]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-40, 40], [-4, 4]), { stiffness: 200, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion()) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="h-full"
    >
      <ProductCard product={product} />
    </motion.div>
  );
}

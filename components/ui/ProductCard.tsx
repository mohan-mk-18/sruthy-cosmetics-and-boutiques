"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  /** Visual variant so no two sections on a page reuse the exact same card look. */
  variant?: "default" | "compact" | "editorial";
  priority?: boolean;
}

/**
 * Catalog/showcase card — a non-clickable overview only: image, category,
 * name, and a one-line description. No price, no ratings/reviews/cart, and
 * no per-card link/CTA — the section that renders these supplies a single
 * shared "Visit Store" / "Book Consultation" CTA once for the whole group.
 *
 * `h-full flex flex-col` keeps every card in a row the same height — CSS
 * Grid stretches each card to match the tallest one in its row, so cards
 * with less text simply show blank space below rather than text being
 * clamped/cut off. The parent grid renders each card inside a wrapper with
 * `className="h-full"` for this to take effect.
 */
export default function ProductCard({ product, variant = "default", priority = false }: ProductCardProps) {
  const isEditorial = variant === "editorial";

  return (
    <motion.article
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={`group relative flex h-full flex-col overflow-hidden rounded-card bg-white shadow-soft-sm transition-shadow duration-300 hover:shadow-soft ${
        isEditorial ? "sm:col-span-2 sm:row-span-2" : ""
      }`}
    >
      <div className={`media-frame shrink-0 ${isEditorial ? "aspect-[4/3]" : "aspect-[4/5]"}`}>
        <motion.div
          variants={{ rest: { scale: 1 }, hover: { scale: 1.03 } }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full w-full"
        >
          <Image
            src={product.images[0] ?? "/images/gallery-1.jpg"}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 25vw"
            className="object-cover"
          />
        </motion.div>
        {/* Glass highlight sweep on hover */}
        <motion.span
          variants={{
            rest: { x: "-120%", opacity: 0 },
            hover: { x: "120%", opacity: 0.5 },
          }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 skew-x-[-20deg] bg-white/40 blur-md"
          aria-hidden="true"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-charcoal/70">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <h3 className="font-display text-lg text-charcoal">{product.name}</h3>
        <p className="text-sm text-charcoal/65">{product.description}</p>
      </div>
    </motion.article>
  );
}
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Category } from "@/types";

/**
 * Large editorial tile used in the Featured Categories marquee/grid.
 * Deliberately different shape/interaction from ProductCard (image-led,
 * text overlays on hover) so cards never feel repeated across the page.
 */
export default function CategoryCard({ category }: { category: Category }) {
  const href = category.linkHref ?? `/products/${category.slug}`;
  return (
    <Link
      href={href}
      data-cursor-hover
      className="group relative block h-80 w-full overflow-hidden rounded-card shadow-soft-sm sm:h-[420px]"
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        sizes="(max-width: 640px) 90vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
      <motion.div
        initial={{ y: 8, opacity: 0.9 }}
        whileHover={{ y: 0 }}
        className="absolute inset-x-0 bottom-0 p-5"
      >
        <p className="font-display text-xl text-luxury-white">{category.name}</p>
        <span className="mt-1 inline-block text-xs font-medium uppercase tracking-widest text-luxury-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Explore Collection →
        </span>
      </motion.div>
    </Link>
  );
}
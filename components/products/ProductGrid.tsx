"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ProductOverviewCard from "@/components/products/ProductOverviewCard";
import type { Product } from "@/types";
import { slideUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

const PAGE_SIZE = 8;

interface ProductGridProps {
  products: Product[];
  /** Heading shown above the filter bar — usually the resolved category label. */
  heading: string;
}

/**
 * Catalog overview grid: category filter chips only (no material/occasion/
 * price filters, no sort), simple non-clickable overview cards (image, name,
 * short description — no price), and a single "Visit Store" CTA for the
 * whole page rather than one per card.
 */
export default function ProductGrid({ products, heading }: ProductGridProps) {
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));

    return uniqueCategories.sort((a, b) => {
      const aIsOthers = a.toLowerCase() === "others";
      const bIsOthers = b.toLowerCase() === "others";

      if (aIsOthers && !bIsOthers) return 1;
      if (!aIsOthers && bIsOthers) return -1;

      return a.localeCompare(b);
    });
  }, [products]);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = activeCategory ? products.filter((p) => p.category === activeCategory) : products;
  const visible = filtered.slice(0, visibleCount);

  function toggleCategory(value: string) {
    setActiveCategory((current) => (current === value ? null : value));
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <section className="section-y">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-3xl text-charcoal sm:text-4xl">{heading}</h1>
          <Link
            href="/contact"
            className="rounded-full bg-coral px-6 py-3 text-sm font-semibold text-luxury-white shadow-soft-sm transition-transform hover:-translate-y-0.5"
          >
            {siteConfig.ctas.visitStore}
          </Link>
        </div>

        {categories.length > 1 && (
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            <button
              type="button"
              aria-pressed={activeCategory === null}
              onClick={() => {
                setActiveCategory(null);
                setVisibleCount(PAGE_SIZE);
              }}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
                activeCategory === null
                  ? "border-rose-gold bg-rose-gold text-luxury-white"
                  : "border-charcoal/15 text-charcoal/70 hover:border-rose-gold"
              )}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={activeCategory === c}
                onClick={() => toggleCategory(c)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
                  activeCategory === c
                    ? "border-rose-gold bg-rose-gold text-luxury-white"
                    : "border-charcoal/15 text-charcoal/70 hover:border-rose-gold"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {visible.length > 0 ? (
          <motion.div
            variants={staggerContainer(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {visible.map((product) => (
              <motion.div key={product.id} variants={slideUp} className="h-full">
                <ProductOverviewCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="mt-12 text-sm text-charcoal/60">
            No items in this category yet — contact us and we'll help you find what you're looking
            for.
          </p>
        )}

        {visibleCount < filtered.length && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
              className="rounded-full border border-charcoal/15 px-6 py-3 text-sm font-semibold text-charcoal transition-transform hover:-translate-y-0.5"
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

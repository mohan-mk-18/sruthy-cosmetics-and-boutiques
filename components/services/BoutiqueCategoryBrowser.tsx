"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import ProductOverviewCard from "@/components/products/ProductOverviewCard";
import SectionCta from "@/components/ui/SectionCta";
import type { Product } from "@/types";
import { slideUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * Fixed tab list (not derived from the data) so every boutique category is
 * visible even before it has products — "Stitching Materials" and "Bridal
 * Costume Design" currently have none, and still show as browsable tabs
 * with a friendly empty state rather than disappearing.
 *
 * `key` is what the ?category= query param matches (used for deep-linking
 * from the navbar's Boutique dropdown); `categorySlug` is the actual value
 * stored on each product in data/products.json.
 */
const BOUTIQUE_CATEGORIES: { key: string; label: string; categorySlug: string | null }[] = [
  { key: "all", label: "All", categorySlug: null },
  { key: "stitching-materials", label: "Stitching Materials", categorySlug: "boutique/stitching-materials" },
  { key: "customized-dress-designing", label: "Customized Dress Designing", categorySlug: "boutique/customized-dress-stitching" },
  { key: "bridal-costume-design", label: "Bridal Costume Design", categorySlug: "boutique/bridal-costume-design" },
  { key: "aari-work", label: "Aari Work", categorySlug: "boutique/aari-work" },
  { key: "others", label: "Others", categorySlug: "boutique/others" },
];

export default function BoutiqueCategoryBrowser({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const [activeKey, setActiveKey] = useState("all");

  // Pre-select the tab from ?category=... (set by the navbar's Boutique dropdown links).
  useEffect(() => {
    const param = searchParams.get("category");
    if (param && BOUTIQUE_CATEGORIES.some((c) => c.key === param)) {
      setActiveKey(param);
    }
  }, [searchParams]);

  const active = BOUTIQUE_CATEGORIES.find((c) => c.key === activeKey) ?? BOUTIQUE_CATEGORIES[0]!;
  const filtered = active.categorySlug ? products.filter((p) => p.categorySlug === active.categorySlug) : products;

  return (
    <div id="boutique-categories" className="scroll-mt-28">
      <h2 className="font-display text-3xl text-charcoal sm:text-4xl">Explore by Category</h2>
      <p className="mt-2 max-w-xl text-charcoal/65">
        Browse boutique work by category — every piece here is made to order after a consultation.
      </p>

      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter boutique work by category">
        {BOUTIQUE_CATEGORIES.map((c) => (
          <button
            key={c.key}
            type="button"
            aria-pressed={activeKey === c.key}
            onClick={() => setActiveKey(c.key)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
              activeKey === c.key
                ? "border-rose-gold bg-rose-gold text-luxury-white"
                : "border-charcoal/15 text-charcoal/70 hover:border-rose-gold"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {filtered.map((product) => (
            <motion.div key={product.id} variants={slideUp} className="h-full">
              <ProductOverviewCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="mt-10 text-sm text-charcoal/60">
          No pieces in this category yet — book a consultation and our team will help you find
          what you're looking for.
        </p>
      )}

      <div className="mt-12">
        <SectionCta />
      </div>
    </div>
  );
}

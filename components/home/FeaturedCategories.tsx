"use client";

import { motion } from "framer-motion";
import CategoryCard from "@/components/ui/CategoryCard";
import SectionCta from "@/components/ui/SectionCta";
import { featuredCategories } from "@/data/categories";
import { slideUp, viewportOnce } from "@/lib/animations";

/**
 * Even 3-up grid of category tiles. (Previously a horizontal snap-scroll
 * marquee, built for a longer category list — with the catalog now fixed
 * at 3 top-level departments, a grid fills the row evenly instead of
 * leaving empty space on the right.)
 */
export default function FeaturedCategories() {
  return (
    <section className="section-y" aria-labelledby="featured-categories-heading">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={slideUp}
          className="mb-10 flex items-end justify-between gap-6"
        >
          <div>
            <p className="font-micro text-xs uppercase tracking-[0.25em] text-rose-gold">
              Explore
            </p>
            <h2 id="featured-categories-heading" className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
              Featured Categories
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-charcoal/60 sm:block">
            From everyday jewellery to bridal-ready ensembles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {featuredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        <div className="mt-12">
          <SectionCta />
        </div>
      </div>
    </section>
  );
}
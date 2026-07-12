"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import productsData from "@/data/products.json";
import type { Product } from "@/types";
import ProductCardParallax from "@/components/ui/ProductCardParallax";
import SectionCta from "@/components/ui/SectionCta";
import { slideUp, staggerContainer, viewportOnce } from "@/lib/animations";

const products = productsData as Product[];
const premiumPicks = products.slice(0, 8);

export default function PremiumCollection() {
  return (
    <section className="section-y bg-luxury-white" aria-labelledby="premium-collection-heading">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={slideUp}
          className="mb-10 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="font-micro text-xs uppercase tracking-[0.25em] text-rose-gold">
              Curated
            </p>
            <h2 id="premium-collection-heading" className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
              Premium Collection
            </h2>
          </div>
          <Link
            href="/products/jewellery"
            className="text-sm font-semibold text-rose-gold hover:text-coral"
          >
            View all categories →
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {premiumPicks.map((product) => (
            <motion.div key={product.id} variants={slideUp} className="h-full">
              <ProductCardParallax product={product} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12">
          <SectionCta />
        </div>
      </div>
    </section>
  );
}

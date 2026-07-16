"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import productsData from "@/data/products.json";
import type { Product } from "@/types";
import ProductCardParallax from "@/components/ui/ProductCardParallax";
import SectionCta from "@/components/ui/SectionCta";
import { slideUp, staggerContainer, viewportOnce } from "@/lib/animations";

const products = productsData as Product[];

/**
 * Picks `count` products for a top-level category (e.g. "jewellery"),
 * taking at most one product per subcategory so the grid never shows two
 * items from the same subcategory (e.g. two necklaces back to back).
 *
 * The pick within each subcategory is deterministic (hash of the
 * subcategory slug) rather than Math.random() — this runs in a client
 * component that's also server-rendered, and a true random pick would
 * differ between the server render and the client hydration pass, causing
 * a hydration mismatch/flicker. Hashing keeps the "which one" choice
 * varied across subcategories while staying identical every render.
 */
function pickAcrossSubcategories(rootCategory: string, count: number): Product[] {
  const bySubcategory = new Map<string, Product[]>();
  for (const product of products) {
    if (!product.categorySlug.startsWith(`${rootCategory}/`)) continue;
    const bucket = bySubcategory.get(product.categorySlug) ?? [];
    bucket.push(product);
    bySubcategory.set(product.categorySlug, bucket);
  }

  return [...bySubcategory.entries()].slice(0, count).map(([slug, items]) => {
    const index = Math.abs(hashString(slug)) % items.length;
    return items[index]!;
  });
}

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

const jewelleryPicks = pickAcrossSubcategories("jewellery", 4).filter(
  (product) => product.categorySlug !== "jewellery/others"
);
const beautyPicks = pickAcrossSubcategories("beauty-products", 4);
const weddingSetPick = products.find(
  (product) => product.categorySlug === "jewellery/wedding-jewellery-sets"
);

const premiumJewelleryPicks = jewelleryPicks.some(
  (product) => product.categorySlug === "jewellery/wedding-jewellery-sets"
)
  ? jewelleryPicks
  : weddingSetPick
    ? [weddingSetPick, ...jewelleryPicks.filter((product) => product.id !== weddingSetPick.id)].slice(0, 4)
    : jewelleryPicks;

// Interleave (jewellery, beauty, jewellery, beauty…) so the two categories
// mix across the row instead of sitting in two separate blocks.
const premiumPicks: Product[] = premiumJewelleryPicks
  .flatMap((item, i) => [item, beautyPicks[i]])
  .filter((item): item is Product => Boolean(item));

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
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { slideUp, viewportOnce } from "@/lib/animations";

const slides = [
  { src: "/images/bridal-collection-hero.jpg", alt: "Bridal collection editorial — full look" },
  { src: "/images/jewellery-wedding-set-1.jpg", alt: "Temple wedding jewellery set detail" },
  { src: "/images/boutique-bridal-costume-1.jpg", alt: "Aari work bridal blouse detail" },
];

export default function BridalHighlight() {
  const [active, setActive] = useState(0);

  return (
    <section className="section-y bg-charcoal text-luxury-white" aria-labelledby="bridal-heading">
      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={slideUp}
          className="media-frame aspect-[4/5] rounded-card"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[active]?.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-full w-full"
            >
              <Image
                src={slides[active]?.src ?? slides[0]!.src}
                alt={slides[active]?.alt ?? ""}
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2" role="tablist" aria-label="Bridal collection images">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-label={`Show image ${i + 1} of ${slides.length}`}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all ${
                  active === i ? "w-6 bg-luxury-white" : "w-2 bg-luxury-white/50"
                }`}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={slideUp}
        >
          <p className="font-micro text-xs uppercase tracking-[0.25em] text-soft-gold">
            Bridal Edit
          </p>
          <h2 id="bridal-heading" className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
            One Bridal Look, Built End to End
          </h2>
          <p className="mt-4 max-w-md text-luxury-white/75">
            Jewellery, cosmetics, and Aari-work costume design under one roof — our bridal team
            walks you through the full look in a single guided consultation, from first sketch to
            final fitting.
          </p>
          <Link
            href="/services#bridal-costume-design"
            data-cursor-hover
            className="mt-7 inline-flex rounded-full border border-soft-gold/80 px-7 py-3.5 text-sm font-semibold transition-transform hover:-translate-y-0.5 hover:bg-soft-gold/15"
          >
            Book Bridal Consultation
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { DURATION, EASE, slideUp, viewportOnce, prefersReducedMotion } from "@/lib/animations";

const slides = [
  { src: "/images/bridal-collection-hero.jpg", alt: "Bridal collection editorial — full look" },
  { src: "/images/jewellery-wedding-set-1.jpg", alt: "Temple wedding jewellery set detail" },
  { src: "/images/boutique-bridal-costume-1.jpg", alt: "Aari work bridal blouse detail" },
];

const AUTOPLAY_MS = 4500;
const SWIPE_THRESHOLD_PX = 40;

export default function BridalHighlight() {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  function goTo(index: number) {
    setActive(((index % slides.length) + slides.length) % slides.length);
  }

  // Autoplay — restarts its timer whenever `active` changes, so a manual
  // click/swipe doesn't get immediately overridden by a pending tick.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [active]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0]?.clientX ?? null;
    touchDeltaX.current = 0;
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    touchDeltaX.current = (e.touches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
  }

  function handleTouchEnd() {
    if (touchDeltaX.current > SWIPE_THRESHOLD_PX) goTo(active - 1);
    else if (touchDeltaX.current < -SWIPE_THRESHOLD_PX) goTo(active + 1);
    touchStartX.current = null;
    touchDeltaX.current = 0;
  }

  return (
    <section className="section-y bg-charcoal text-luxury-white" aria-labelledby="bridal-heading">
      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={slideUp}
          className="media-frame aspect-[4/5] touch-pan-y select-none rounded-card"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Sliding track — one slide wide per item, translated by index */}
          <div
            className="flex h-full"
            style={{
              width: `${slides.length * 100}%`,
              transform: `translateX(-${active * (100 / slides.length)}%)`,
              transition: `transform ${DURATION.extended}s cubic-bezier(${EASE.join(",")})`,
            }}
          >
            {slides.map((slide) => (
              <div key={slide.src} className="relative h-full shrink-0" style={{ width: `${100 / slides.length}%` }}>
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  draggable={false}
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Prev/next tap zones — invisible, sit either side of the frame for easy re-tapping on mobile */}
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => goTo(active - 1)}
            className="absolute inset-y-0 left-0 w-1/4"
          />
          <button
            type="button"
            aria-label="Next image"
            onClick={() => goTo(active + 1)}
            className="absolute inset-y-0 right-0 w-1/4"
          />

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2" role="tablist" aria-label="Bridal collection images">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-label={`Show image ${i + 1} of ${slides.length}`}
                onClick={() => goTo(i)}
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
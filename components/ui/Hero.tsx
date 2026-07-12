"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { slideUp, staggerContainer, transition } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface HeroCta {
  label: string;
  href: string;
  variant: "primary" | "secondary";
}

interface HeroProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  ctas?: HeroCta[];
  align?: "left" | "center";
  /** Short animated microcopy line rendered between the subtitle and CTAs. */
  microcopy?: string;
}

/**
 * Full-bleed editorial hero shell. Reused across Home, category landing,
 * and Services pages with different copy/image/CTAs, so the visual language
 * stays consistent without duplicating markup.
 */
export default function Hero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  ctas = [],
  align = "left",
  microcopy,
}: HeroProps) {
  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-charcoal">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-charcoal/10" />

      {/* Floating rose-gold particles — ambient motion, respects reduced-motion via CSS override */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-2 w-2 rounded-full bg-soft-gold/60"
            style={{ left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 20}%` }}
            animate={{ y: [0, -18, 0], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <motion.div
        variants={staggerContainer(0.15, 0.2)}
        initial="hidden"
        animate="visible"
        className={cn(
          "container relative z-10 pb-20 pt-32 text-luxury-white sm:pb-28",
          align === "center" && "text-center mx-auto max-w-3xl"
        )}
      >
        {eyebrow && (
          <motion.p
            variants={slideUp}
            className="font-micro text-xs uppercase tracking-[0.3em] text-soft-gold"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          variants={slideUp}
          className="mt-4 max-w-2xl font-display text-4xl leading-tight text-balance sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={slideUp}
          className="mt-5 max-w-xl text-base text-luxury-white/85 sm:text-lg"
        >
          {subtitle}
        </motion.p>

        {microcopy && (
          <motion.div
            variants={slideUp}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-soft-gold/50 bg-white/10 px-4 py-2 text-xs text-luxury-white/90"
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-soft-gold"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />
            {microcopy}
          </motion.div>
        )}

        {ctas.length > 0 && (
          <motion.div variants={slideUp} className="mt-9 flex flex-wrap gap-4">
            {ctas.map((cta) => (
              <Link
                key={cta.label}
                href={cta.href}
                data-cursor-hover
                className={cn(
                  "rounded-full px-7 py-3.5 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5",
                  cta.variant === "primary"
                    ? "bg-coral text-luxury-white shadow-soft"
                    : "border border-soft-gold/80 text-luxury-white hover:bg-soft-gold/15"
                )}
              >
                {cta.label}
              </Link>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

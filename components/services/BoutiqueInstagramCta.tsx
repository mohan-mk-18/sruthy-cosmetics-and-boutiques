"use client";

import Link from "next/link";
import { Instagram, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";
import { slideUp, viewportOnce } from "@/lib/animations";

/**
 * Replaces the old "Explore by Category" product browser on /services.
 * The client can't share boutique work photos publicly for privacy reasons
 * (bridal fittings, customer garments, etc.), so instead of an empty/thin
 * gallery we point visitors to Instagram, where the full portfolio lives.
 * Copy is written with on-page SEO in mind (keyword-rich H2/H3, descriptive
 * body text) since this section replaces what used to be a keyword-dense
 * filterable product grid.
 */
export default function BoutiqueInstagramCta() {
  return (
    <div id="boutique-instagram" className="scroll-mt-28">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={slideUp}
        className="relative overflow-hidden rounded-card bg-gradient-to-br from-charcoal via-charcoal to-rose-gold/30 px-6 py-14 text-center text-luxury-white sm:px-12 sm:py-16"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-luxury-white/10">
          <Sparkles size={24} className="text-soft-gold" aria-hidden="true" />
        </div>

        <p className="mt-6 font-micro text-xs uppercase tracking-[0.25em] text-soft-gold">
          Boutique Gallery
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl leading-tight sm:text-4xl">
          See Every Aari Work, Bridal Costume &amp; Custom Stitching Design on Instagram
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-luxury-white/75">
          Our boutique work is one-of-a-kind and made for real customers — from hand-embroidered
          Aari blouses to full bridal costume designs and custom-stitched outfits. To respect our
          clients&rsquo; privacy, we showcase the complete, ever-growing collection exclusively on
          our Instagram page instead of here on the website. Follow along for daily uploads of
          finished designs, fabric inspiration, and behind-the-scenes stitching work from our
          Kannumaamoodu atelier — then book a consultation to bring a similar look to life.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="inline-flex items-center gap-2 rounded-full bg-luxury-white px-7 py-3.5 text-sm font-semibold text-charcoal shadow-soft-sm transition-transform hover:-translate-y-0.5"
          >
            <Instagram size={18} aria-hidden="true" />
            {siteConfig.ctas.viewInstagram} for Full Boutique Collection
          </Link>
          <Link
            href="#booking-form"
            className="inline-flex items-center rounded-full border border-luxury-white/40 px-7 py-3.5 text-sm font-semibold transition-transform hover:-translate-y-0.5 hover:bg-luxury-white/10"
          >
            {siteConfig.ctas.bookConsultation}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
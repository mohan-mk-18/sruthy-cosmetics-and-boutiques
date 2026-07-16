"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { slideUp, viewportOnce } from "@/lib/animations";

const featuredPost = {
  src: "/images/instagram-placeholder-1.jpg",
  alt: "Featured Instagram post from Sruthy Cosmetics And Boutiques",
};

export default function InstagramShowcase() {
  return (
    <section className="section-y" aria-labelledby="instagram-heading">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={slideUp}
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="min-w-0">
            <p className="font-micro text-xs uppercase tracking-[0.25em] text-rose-gold">
              Follow Along
            </p>
            <h5
              id="instagram-heading"
              className="mt-2 max-w-full break-words font-display text-2xl leading-tight text-charcoal sm:text-4xl"
            >
              @sruthy.cosmetics.and.boutiques
            </h5>
          </div>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="inline-flex w-fit items-center gap-2 self-start rounded-full bg-charcoal px-5 py-2.5 text-sm font-semibold text-luxury-white transition-transform hover:-translate-y-0.5 sm:self-auto"
          >
            <Instagram size={16} aria-hidden="true" />
            {siteConfig.ctas.viewInstagram}
          </a>
        </motion.div>

        <motion.a
          href={siteConfig.instagram}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={slideUp}
          className="group media-frame mx-auto block aspect-[4/3] max-w-2xl rounded-card"
          aria-label="Open our Instagram page"
        >
          <Image
            src={featuredPost.src}
            alt={featuredPost.alt}
            fill
            sizes="(max-width: 768px) 90vw, 42vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/40">
            <Instagram
              size={28}
              className="text-luxury-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />
          </div>
        </motion.a>
      </div>
    </section>
  );
}
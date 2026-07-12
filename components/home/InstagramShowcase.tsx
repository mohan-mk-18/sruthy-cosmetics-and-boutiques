"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { slideUp, staggerContainer, viewportOnce } from "@/lib/animations";

const posts = Array.from({ length: 6 }, (_, i) => ({
  src: `/images/instagram-placeholder-${i + 1}.jpg`,
  alt: `Sample Instagram post ${i + 1} from Sruthy Cosmetics And Boutiques`,
}));

export default function InstagramShowcase() {
  return (
    <section className="section-y" aria-labelledby="instagram-heading">
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
              Follow Along
            </p>
            <h2 id="instagram-heading" className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
              @sruthycosmetics
            </h2>
          </div>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-2.5 text-sm font-semibold text-luxury-white transition-transform hover:-translate-y-0.5"
          >
            <Instagram size={16} aria-hidden="true" />
            {siteConfig.ctas.viewInstagram}
          </a>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
        >
          {posts.map((post) => (
            <motion.a
              key={post.src}
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              variants={slideUp}
              data-cursor-hover
              className="group media-frame aspect-square rounded-card"
              aria-label="Open this post on Instagram"
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                sizes="(max-width: 768px) 45vw, 30vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/40">
                <Instagram
                  size={22}
                  className="text-luxury-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { siteConfig } from "@/lib/config";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  anchor: string; // e.g. "aari-work" — used for /services#aari-work
  /** Set false when the parent section already renders one shared CTA for the whole group. Defaults to true. */
  showCta?: boolean;
}

/**
 * Icon-led service tile — distinct from ProductCard/CategoryCard: flat panel,
 * no image, gradient-border treatment. Shows its own "Book Consultation"
 * link by default; pass showCta={false} when the parent section already
 * provides one shared CTA for the whole group.
 */
export default function ServiceCard({ icon: Icon, title, description, anchor, showCta = true }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="gradient-border-rose relative flex h-full flex-col rounded-card bg-luxury-white p-7"
    >
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white shadow-soft-sm">
        <Icon size={22} className="text-rose-gold" aria-hidden="true" />
      </div>
      <h3 className="mt-5 font-display text-xl text-charcoal">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal/70">{description}</p>
      {showCta && (
        <Link
          href={`/services#${anchor}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rose-gold hover:text-coral"
        >
          {siteConfig.ctas.bookConsultation}
          <span aria-hidden="true">→</span>
        </Link>
      )}
    </motion.div>
  );
}
"use client";

import { motion } from "framer-motion";
import { Scissors, Shirt, Gem, PenTool } from "lucide-react";
import ServiceCard from "@/components/ui/ServiceCard";
import SectionCta from "@/components/ui/SectionCta";
import { slideUp, staggerContainer, viewportOnce } from "@/lib/animations";

const services = [
  {
    icon: Shirt,
    title: "Dress Stitching",
    description: "Everyday and occasion wear, stitched to your exact measurements.",
    anchor: "dress-stitching",
  },
  {
    icon: Scissors,
    title: "Customized Dress Designing",
    description: "Bring your own fabric and design brief — we tailor it from sketch to fitting.",
    anchor: "customized-stitching",
  },
  {
    icon: Gem,
    title: "Bridal Costume Design",
    description: "Full bridal ensembles designed around your wedding-day palette.",
    anchor: "bridal-costume-design",
  },
  {
    icon: PenTool,
    title: "Aari Work",
    description: "Hand-embroidered Aari work in traditional and contemporary motifs.",
    anchor: "aari-work",
  },
];

export default function BoutiqueServices() {
  return (
    <section className="section-y" aria-labelledby="boutique-services-heading">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={slideUp}
          className="mb-10 max-w-2xl"
        >
          <p className="font-micro text-xs uppercase tracking-[0.25em] text-rose-gold">
            Atelier
          </p>
          <h2 id="boutique-services-heading" className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
            Boutique Services
          </h2>
          <p className="mt-3 text-charcoal/65">
            From everyday stitching to full bridal costume design — book a consultation and our
            team takes it from there.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={slideUp} className="h-full">
              <ServiceCard {...service} showCta={false} />
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

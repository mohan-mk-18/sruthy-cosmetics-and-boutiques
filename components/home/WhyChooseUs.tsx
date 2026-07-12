"use client";

import { motion } from "framer-motion";
import { Award, Heart, Users, Sparkles } from "lucide-react";
import CountUpStat from "@/components/ui/CountUpStat";
import { slideUp, staggerContainer, viewportOnce } from "@/lib/animations";

/** Sample figures — replace with real numbers once available; see README § 9. */
const pillars = [
  { icon: Award, value: 20, suffix: "+", label: "Years of Craftsmanship" },
  { icon: Sparkles, value: 15, suffix: "+", label: "Curated Categories" },
  { icon: Heart, value: 500, suffix: "+", label: "Brides Styled" },
  { icon: Users, value: 1000, suffix: "+", label: "Consultations Given" },
];

export default function WhyChooseUs() {
  return (
    <section className="section-y bg-gradient-editorial" aria-labelledby="why-choose-us-heading">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={slideUp}
          className="mx-auto max-w-xl text-center"
        >
          <p className="font-micro text-xs uppercase tracking-[0.25em] text-rose-gold">
            Why Sruthy
          </p>
          <h2 id="why-choose-us-heading" className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
            Why Choose Us
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4"
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div key={pillar.label} variants={slideUp} className="flex flex-col items-center sm:items-start">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-white shadow-soft-sm">
                  <Icon size={20} className="text-rose-gold" aria-hidden="true" />
                </div>
                <div className="mt-4">
                  <CountUpStat value={pillar.value} suffix={pillar.suffix} label={pillar.label} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

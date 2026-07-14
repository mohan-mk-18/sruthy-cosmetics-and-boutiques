"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Phone, MessageCircle } from "lucide-react";
import MapEmbed from "@/components/ui/MapEmbed";
import { siteConfig } from "@/lib/config";
import { directionsLink, telLink, whatsappLink } from "@/lib/utils";
import { slideUp, viewportOnce } from "@/lib/animations";

export default function LocationStrip() {
  return (
    <section className="section-y" aria-labelledby="location-heading">
      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={slideUp}
        >
          <p className="font-micro text-xs uppercase tracking-[0.25em] text-rose-gold">
            Visit Us
          </p>
          <h2 id="location-heading" className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
            Find Us in Kannumaamoodu
          </h2>

          <ul className="mt-6 space-y-4 text-charcoal/75">
            <li className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-rose-gold" aria-hidden="true" />
              <span>
                {siteConfig.address.line1}, {siteConfig.address.locality},{" "}
                {siteConfig.address.region} {siteConfig.address.postalCode}
              </span>
            </li>
            {siteConfig.hours.map((h) => (
              <li key={h.day} className="flex gap-3">
                <Clock size={18} className="mt-0.5 shrink-0 text-rose-gold" aria-hidden="true" />
                <span>
                  {h.day}: {h.time}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={directionsLink(
                siteConfig.geo.latitude,
                siteConfig.geo.longitude,
                siteConfig.geo.placeId,
                siteConfig.name,
                `${siteConfig.address.line1}, ${siteConfig.address.locality}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-coral px-6 py-3 text-sm font-semibold text-luxury-white shadow-soft-sm transition-transform hover:-translate-y-0.5"
            >
              {siteConfig.ctas.getDirections}
            </a>
            <a
              href={telLink(siteConfig.phone)}
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 px-6 py-3 text-sm font-semibold text-charcoal transition-transform hover:-translate-y-0.5"
            >
              <Phone size={16} aria-hidden="true" />
              {siteConfig.ctas.callNow}
            </a>
            <a
              href={whatsappLink(siteConfig.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 px-6 py-3 text-sm font-semibold text-charcoal transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle size={16} aria-hidden="true" />
              {siteConfig.ctas.whatsapp}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={slideUp}
        >
          <MapEmbed />
        </motion.div>
      </div>
    </section>
  );
}
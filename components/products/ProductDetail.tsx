"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, MessageCircle, Phone, MapPin } from "lucide-react";
import type { Product } from "@/types";
import ImageLightbox from "@/components/ui/ImageLightbox";
import { siteConfig } from "@/lib/config";
import { directionsLink, formatPrice, telLink, whatsappLink } from "@/lib/utils";

export default function ProductDetail({ product }: { product: Product }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const images = product.images.length > 0 ? product.images : ["/images/gallery-1.jpg"];
  const lightboxImages = images.map((src) => ({ src, alt: product.name }));

  return (
    <section className="section-y">
      <div className="container grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Gallery */}
        <div>
          <button
            type="button"
            onClick={() => setActiveIndex(0)}
            data-cursor-hover
            className="media-frame block aspect-[4/5] w-full rounded-card"
            aria-label={`View larger image of ${product.name}`}
          >
            <Image
              src={images[0]!}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover transition-transform duration-500 hover:scale-[1.02]"
            />
          </button>
          {images.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {images.slice(1).map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveIndex(i + 1)}
                  className="media-frame aspect-square rounded-card"
                  aria-label={`View image ${i + 2} of ${product.name}`}
                >
                  <Image src={src} alt="" fill sizes="120px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
          <ImageLightbox
            images={lightboxImages}
            index={activeIndex}
            onClose={() => setActiveIndex(null)}
            onNavigate={setActiveIndex}
          />
        </div>

        {/* Details */}
        <div>
          <p className="font-micro text-xs uppercase tracking-[0.25em] text-rose-gold">
            {product.category}
          </p>
          <h1 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">{product.name}</h1>
          <p className="mt-2 text-lg text-charcoal/60">{formatPrice(product.price)}</p>

          {product.story && (
            <p className="mt-6 max-w-lg leading-relaxed text-charcoal/75">{product.story}</p>
          )}

          {product.materials && product.materials.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/55">
                Materials &amp; Care
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.materials.map((m) => (
                  <span
                    key={m}
                    className="rounded-full bg-blush/50 px-3 py-1 text-xs font-medium text-charcoal/75"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}

          {product.isSample && (
            <p className="mt-4 text-xs text-charcoal/45">
              Sample catalog entry — visit the store to see current pieces in person.
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-coral px-6 py-3 text-sm font-semibold text-luxury-white shadow-soft-sm transition-transform hover:-translate-y-0.5"
            >
              {siteConfig.ctas.visitStore}
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-charcoal/15 px-6 py-3 text-sm font-semibold text-charcoal transition-transform hover:-translate-y-0.5"
            >
              {siteConfig.ctas.bookConsultation}
            </Link>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <a href={telLink(siteConfig.phone)} className="inline-flex items-center gap-1.5 text-charcoal/70 hover:text-rose-gold">
              <Phone size={15} aria-hidden="true" /> {siteConfig.ctas.callNow}
            </a>
            <a
              href={whatsappLink(siteConfig.whatsapp, `Hi Sruthy! I'm interested in the ${product.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-charcoal/70 hover:text-rose-gold"
            >
              <MessageCircle size={15} aria-hidden="true" /> {siteConfig.ctas.whatsapp}
            </a>
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-charcoal/70 hover:text-rose-gold"
            >
              <Instagram size={15} aria-hidden="true" /> {siteConfig.ctas.viewInstagram}
            </a>
            <a
              href={directionsLink(siteConfig.geo.latitude, siteConfig.geo.longitude, siteConfig.geo.placeId, siteConfig.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-charcoal/70 hover:text-rose-gold"
            >
              <MapPin size={15} aria-hidden="true" /> {siteConfig.ctas.getDirections}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
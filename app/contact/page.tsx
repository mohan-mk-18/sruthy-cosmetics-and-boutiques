import type { Metadata } from "next";
import Link from "next/link";
import { Clock, MapPin, Phone, MessageCircle, Instagram } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ContactForm from "@/components/forms/ContactForm";
import MapEmbed from "@/components/ui/MapEmbed";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata, seoExamples } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import { directionsLink, telLink, whatsappLink } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: seoExamples.contact.title,
  description: seoExamples.contact.description,
  path: "/contact",
  image: "/images/store-front.jpg",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumbs items={crumbs} />

      <section className="section-y">
        <div className="container grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-micro text-xs uppercase tracking-[0.25em] text-rose-gold">
              Get In Touch
            </p>
            <h1 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
              Visit Us in Kannumaamoodu
            </h1>
            <p className="mt-4 max-w-md text-charcoal/65">
              Drop by the store, or send us a message and we'll help you plan your visit or
              consultation.
            </p>

            <ul className="mt-8 space-y-4 text-charcoal/75">
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
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 px-6 py-3 text-sm font-semibold text-charcoal transition-transform hover:-translate-y-0.5"
              >
                <Instagram size={16} aria-hidden="true" />
                {siteConfig.ctas.viewInstagram}
              </a>
            </div>

            <div className="mt-10">
              <MapEmbed />
            </div>
          </div>

          <div>
            <div className="rounded-card bg-luxury-white p-7 sm:p-9">
              <h2 className="font-display text-xl text-charcoal">Send a Message</h2>
              <p className="mt-1 text-sm text-charcoal/60">
                Tell us what you're interested in — we'll confirm by phone or WhatsApp.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>

            <p className="mt-4 text-center text-sm text-charcoal/55">
              Prefer to plan a full look?{" "}
              <Link href="/services" className="font-semibold text-rose-gold hover:text-coral">
                Book a boutique consultation
              </Link>{" "}
              instead.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { Scissors, Shirt, Gem, PenTool } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProcessTimeline from "@/components/services/ProcessTimeline";
import BoutiqueCategoryBrowser from "@/components/services/BoutiqueCategoryBrowser";
import BookingForm from "@/components/forms/BookingForm";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { findProductsByCategoryPath } from "@/lib/products";

export const metadata: Metadata = buildMetadata({
  title: "Boutique Services",
  description:
    "Custom dress designing, bridal costume design, and hand Aari work at Sruthy Cosmetics And Boutiques — book a consultation in Kannumaamoodu.",
  path: "/services",
  image: "/images/boutique-stitching-1.jpg",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Boutique Services", href: "/services" },
];

const services = [
  {
    id: "dress-stitching",
    icon: Shirt,
    title: "Dress Stitching",
    description:
      "Everyday and occasion wear, made to your exact measurements — from simple kurtas to layered Anarkalis.",
    image: "/images/boutique-stitching-1.jpg",
  },
  {
    id: "customized-stitching",
    icon: Scissors,
    title: "Customized Dress Designing",
    description:
      "Bring your own fabric and a reference look — our tailoring team takes it from sketch to fitting.",
    image: "/images/category-boutique.jpg",
  },
  {
    id: "bridal-costume-design",
    icon: Gem,
    title: "Bridal Costume Design",
    description:
      "A full bridal ensemble designed around your wedding-day palette, paired with our jewellery and beauty teams.",
    image: "/images/bridal-collection-hero.jpg",
  },
  {
    id: "aari-work",
    icon: PenTool,
    title: "Aari Work",
    description:
      "Hand-embroidered Aari work in traditional and contemporary motifs, worked entirely in-house.",
    image: "/images/boutique-bridal-costume-1.jpg",
  },
];

const boutiqueProducts = findProductsByCategoryPath("boutique");

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumbs items={crumbs} />

      <section className="section-y">
        <div className="container max-w-2xl">
          <p className="font-micro text-xs uppercase tracking-[0.25em] text-rose-gold">Atelier</p>
          <h1 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">Boutique Services</h1>
          <p className="mt-4 text-charcoal/65">
            From everyday stitching to full bridal costume design and hand Aari work — every piece
            starts with a consultation, not a cart. Explore the services below, or jump straight to
            requesting an appointment.
          </p>
        </div>

        <div className="container mt-14 space-y-16">
          {services.map((service, i) => {
            const Icon = service.icon;
            const reverse = i % 2 === 1;
            return (
              <div
                key={service.id}
                id={service.id}
                className={`grid scroll-mt-28 items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="media-frame aspect-[4/3] rounded-card">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 90vw, 45vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-blush/50">
                    <Icon size={20} className="text-rose-gold" aria-hidden="true" />
                  </div>
                  <h2 className="mt-4 font-display text-2xl text-charcoal">{service.title}</h2>
                  <p className="mt-2 max-w-md text-charcoal/65">{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section-y bg-luxury-white">
        <div className="container">
          <h2 className="text-center font-display text-3xl text-charcoal sm:text-4xl">
            How It Works
          </h2>
          <div className="mt-12">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container">
          <Suspense fallback={<div className="h-40" aria-hidden="true" />}>
            <BoutiqueCategoryBrowser products={boutiqueProducts} />
          </Suspense>
        </div>
      </section>

      <section id="booking-form" className="section-y scroll-mt-24 bg-luxury-white">
        <div className="container max-w-xl">
          <h2 className="font-display text-3xl text-charcoal sm:text-4xl">Request an Appointment</h2>
          <p className="mt-2 text-charcoal/65">
            Tell us what you're looking for and preferred dates — we'll confirm your consultation
            slot by phone.
          </p>
          <div className="mt-8">
            <BookingForm />
          </div>
        </div>
      </section>
    </>
  );
}

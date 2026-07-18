import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Gem, Users, Sparkles } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "The story behind Sruthy Cosmetics And Boutiques — a family atelier in Kannumaamoodu built on craftsmanship and personal service.",
  path: "/about",
  image: "/images/store-front.jpg",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

/** Real brand narrative — matches the client's actual growth story. */
const timeline = [
  {
    year: "How It Began",
    milestone:
      "A small fancy jewellery and cosmetics counter in Kannumaamoodu — built one honest recommendation at a time.",
  },
  {
    year: "Growing the Boutique",
    milestone:
      "We opened a boutique wing for customized dress designing and bridal costume work, standing alongside our original fancy and cosmetics counter.",
  },
  {
    year: "Where We Are Today",
    milestone:
      "A complete destination for fancy jewellery, cosmetics, bridal costume design, and hand Aari work — every craft still made in-house, under one roof.",
  },
];

const values = [
  { icon: Gem, title: "Craftsmanship", description: "Every stitched and hand-worked piece is made in-house, not mass-produced." },
  { icon: Heart, title: "Personal Service", description: "Consultations over checkout — we get to know your look before we start." },
  { icon: Sparkles, title: "Curation", description: "A tightly edited catalog, not an endless scroll — everything is chosen deliberately." },
  { icon: Users, title: "Community", description: "Built for Kannumaamoodu's brides, students, and families, one visit at a time." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumbs items={crumbs} />

      <section className="section-y">
        <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-micro text-xs uppercase tracking-[0.25em] text-rose-gold">
              Our Story
            </p>
            <h1 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
              From One Small Counter to a Complete Bridal-to-Boutique Home
            </h1>
            <p className="mt-4 max-w-md text-charcoal/70">
              Sruthy Cosmetics And Boutiques began as a modest fancy jewellery and cosmetics
              counter in Kannumaamoodu — no grand ambitions at the start, just a promise to treat
              every customer like family and get every recommendation right.
            </p>
            <p className="mt-4 max-w-md text-charcoal/70">
              As trust grew, so did we. We opened a boutique wing for customized dress designing
              and bridal costume work, standing alongside our original fancy and cosmetics
              counter — and in time, added hand Aari work to bring even more of the craft
              in-house.
            </p>
            <p className="mt-4 max-w-md text-charcoal/70">
              Today, that same idea still runs the shop: fancy jewellery, cosmetics, bridal
              costume design, and Aari work, all under one roof — every visit still starts with a
              conversation, not a transaction.
            </p>
          </div>
          <div className="media-frame aspect-[4/5] rounded-card">
            <Image
              src="/images/store-front.jpg"
              alt="Sruthy Cosmetics And Boutiques storefront"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section-y bg-luxury-white">
        <div className="container">
          <h2 className="font-display text-3xl text-charcoal sm:text-4xl">Our Journey</h2>
          <div className="relative mt-12 grid gap-8 sm:grid-cols-3 sm:gap-4">
            <div
              aria-hidden="true"
              className="absolute left-0 top-3 hidden h-px w-full bg-blush sm:block"
            />
            {timeline.map((item) => (
              <div key={item.year} className="relative">
                <div className="relative z-10 h-3 w-3 rounded-full bg-rose-gold" />
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-charcoal/50">
                  {item.year}
                </p>
                <p className="mt-1 text-sm text-charcoal/70">{item.milestone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container">
          <h2 className="font-display text-3xl text-charcoal sm:text-4xl">What We Value</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title}>
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-blush/50">
                    <Icon size={20} className="text-rose-gold" aria-hidden="true" />
                  </div>
                  <p className="mt-4 font-display text-lg text-charcoal">{value.title}</p>
                  <p className="mt-1.5 text-sm text-charcoal/65">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </>
  );
}
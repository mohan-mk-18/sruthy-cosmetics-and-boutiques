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
    "The story behind Sruthy Cosmetics And Boutiques — a family atelier in Salem built on craftsmanship and personal service.",
  path: "/about",
  image: "/images/store-front.jpg",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

/** Placeholder brand narrative — replace with the real founder story and milestones before launch. */
const timeline = [
  { year: "Year One", milestone: "Opened as a small boutique counter in Salem, focused on bridal jewellery." },
  { year: "Year Three", milestone: "Added an in-house Aari work and stitching atelier." },
  { year: "Year Five", milestone: "Expanded into cosmetics and everyday beauty essentials." },
  { year: "Today", milestone: "A full bridal-to-boutique destination, still family-run." },
];

const values = [
  { icon: Gem, title: "Craftsmanship", description: "Every stitched and hand-worked piece is made in-house, not mass-produced." },
  { icon: Heart, title: "Personal Service", description: "Consultations over checkout — we get to know your look before we start." },
  { icon: Sparkles, title: "Curation", description: "A tightly edited catalog, not an endless scroll — everything is chosen deliberately." },
  { icon: Users, title: "Community", description: "Built for Salem's brides, students, and families, one visit at a time." },
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
              Built Around One Idea: Know the Person, Not Just the Order
            </h1>
            <p className="mt-4 max-w-md text-charcoal/70">
              Sruthy Cosmetics And Boutiques started as a single counter of bridal jewellery in
              Salem. What kept people coming back wasn't a catalog — it was a team that took the
              time to understand what each customer actually needed, whether that was a full
              bridal look or a single everyday essential.
            </p>
            <p className="mt-4 max-w-md text-charcoal/70">
              Today that same approach runs across jewellery, beauty, and boutique stitching —
              every visit starts with a conversation, not a transaction.
            </p>
            <p className="mt-6 text-xs text-charcoal/40">
              Sample narrative — replace with the real founder story before launch.
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
          <div className="relative mt-12 grid gap-8 sm:grid-cols-4 sm:gap-4">
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

      <section className="section-y bg-luxury-white">
        <div className="container">
          <h2 className="font-display text-3xl text-charcoal sm:text-4xl">Inside the Atelier</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {[
              "/images/gallery-1.jpg",
              "/images/gallery-4.jpg",
              "/images/gallery-6.jpg",
            ].map((src) => (
              <div key={src} className="media-frame aspect-[4/5] rounded-card">
                <Image src={src} alt="Atelier interior" fill sizes="33vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

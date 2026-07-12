import type { Metadata } from "next";
import Hero from "@/components/ui/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import PremiumCollection from "@/components/home/PremiumCollection";
import BoutiqueServices from "@/components/home/BoutiqueServices";
import BridalHighlight from "@/components/home/BridalHighlight";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import InstagramShowcase from "@/components/home/InstagramShowcase";
import InsideAtelier from "@/components/home/InsideAtelier";
import LocationStrip from "@/components/home/LocationStrip";
import { siteConfig } from "@/lib/config";
import { buildMetadata, seoExamples } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: seoExamples.home.title,
  description: seoExamples.home.description,
  path: "/",
  image: "/images/hero-hero-1.jpg",
});

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Salem"
        title={siteConfig.name}
        subtitle={siteConfig.tagline}
        microcopy="Now booking bridal consultations for wedding season"
        image="/images/hero-hero-1.jpg"
        imageAlt="Editorial hero image for Sruthy Cosmetics And Boutiques"
        ctas={[
          { label: siteConfig.ctas.visitStore, href: "/contact", variant: "primary" },
          { label: siteConfig.ctas.bookConsultation, href: "/services", variant: "secondary" },
        ]}
      />

      <FeaturedCategories />
      <PremiumCollection />
      <BoutiqueServices />
      <BridalHighlight />
      <WhyChooseUs />
      <InstagramShowcase />
      <InsideAtelier />
      <LocationStrip />
    </>
  );
}

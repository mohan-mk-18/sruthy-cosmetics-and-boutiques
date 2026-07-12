import type { Metadata } from "next";
import { siteConfig } from "./config";

interface PageSeoInput {
  title: string;
  description: string;
  path?: string; // e.g. "/about" — defaults to "/"
  image?: string; // e.g. "/images/hero-hero-1.jpg"
}

/**
 * Builds a full Next.js Metadata object (title, description, canonical,
 * Open Graph, Twitter card) for a single page. Call this from each page's
 * `export const metadata` or `generateMetadata`.
 */
export function buildMetadata({ title, description, path = "/", image }: PageSeoInput): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? "/images/hero-hero-1.jpg";

  return {
    title: `${title} | ${siteConfig.shortName}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1600, height: 900, alt: title }],
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage],
    },
  };
}

/** Reference copy for the four pages the brief calls out explicitly. */
export const seoExamples = {
  home: {
    title: "Sruthy Cosmetics And Boutiques — Kannumaamoodu",
    description:
      "Premium cosmetics, bridal jewellery, and boutique fashion in Kannumaamoodu. Visit the store or book a consultation with Sruthy.",
  },
  productsCategory: {
    title: "Jewellery Collection",
    description:
      "Explore earrings, necklaces, bangles, and wedding jewellery sets at Sruthy Cosmetics And Boutiques, Kannumaamoodu.",
  },
  productPage: {
    title: "Kundan Bridal Necklace",
    description:
      "Hand-finished Kundan bridal necklace from Sruthy's wedding jewellery collection — visit the store or book a consultation.",
  },
  contact: {
    title: "Visit Us in Kannumaamoodu",
    description:
      "Find directions, store hours, and ways to reach Sruthy Cosmetics And Boutiques — call, WhatsApp, or book a consultation.",
  },
};

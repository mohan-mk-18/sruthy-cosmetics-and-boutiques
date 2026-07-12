import { siteConfig } from "./config";
import type { Product } from "@/types";

/** LocalBusiness JSON-LD — include once, in the root layout. */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    image: `${siteConfig.url}/images/store-front.jpg`,
    "@id": siteConfig.url,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.line1,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: siteConfig.hours
      .filter((h) => !h.time.toLowerCase().includes("closed"))
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.day,
        opens: h.time.split("–")[0]?.trim(),
        closes: h.time.split("–")[1]?.trim(),
      })),
    sameAs: [siteConfig.instagram],
  };
}

/**
 * Product JSON-LD, catalog-style: describes items as "offered" for viewing,
 * with no `offers.availability` purchase semantics — matches the
 * non-ecommerce, visit-in-store business model.
 */
export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    category: product.category,
    description: product.description,
    image: product.images.map((src) => `${siteConfig.url}${src}`),
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    ...(product.price
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: product.price.replace(/[^\d.]/g, ""),
            availability: "https://schema.org/InStoreOnly",
            url: `${siteConfig.url}/products/${product.categorySlug}/${product.slug}`,
          },
        }
      : {}),
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.href}`,
    })),
  };
}
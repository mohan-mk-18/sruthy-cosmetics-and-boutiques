export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  phone: string;
  whatsapp: string; // digits only
  whatsappGroupLink: string;
  email: string;
  instagram: string;
  address: {
    line1: string;
    locality: string;
    region: string;
    postalCode: string;
    country: string;
  };
  geo: {
    latitude: number;
    longitude: number;
    placeId?: string;
  };
  hours: { day: string; time: string }[];
  nav: NavItem[];
  ctas: {
    visitStore: string;
    bookConsultation: string;
    contactUs: string;
    callNow: string;
    whatsapp: string;
    viewInstagram: string;
    getDirections: string;
  };
}

export type TopLevelCategory =
  | "Jewellery"
  | "Beauty Products"
  | "Boutique"
  | "Hair Accessories"
  | "Artificial Jewellery"
  | "Beauty Accessories"
  | "Bridal Accessories"
  | "Fashion Accessories"
  | "Handbags"
  | "Clutches"
  | "Gift Items"
  | "Women's Essentials"
  | "Bindis"
  | "Makeup Essentials"
  | "Cosmetic Accessories";

export interface Category {
  id: string;
  name: TopLevelCategory | string;
  slug: string;
  subcategories?: { name: string; slug: string }[];
  image: string; // path under /public/images
  description?: string;
  /** Overrides the default `/products/[slug]` link — e.g. Boutique routes into /services instead. */
  linkHref?: string;
}

/**
 * Product — catalog/showcase entry only. There is intentionally no `stock`,
 * `sku` inventory count, `rating`, or `reviews` field: this is a non-ecommerce
 * showcase, and the UI must never imply purchase, stock levels, or reviews.
 */
export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Formatted display price, e.g. "₹4,999", or undefined → renders "Price on request". */
  price?: string;
  category: string;
  categorySlug: string;
  /** Max 100 characters — enforced by content review, not by the type system. */
  description: string;
  /** One-paragraph atelier/background story for the product detail page. */
  story?: string;
  materials?: string[];
  images: string[];
  isSample?: boolean; // true for all seed/demo data — flips to false once real photography lands
}
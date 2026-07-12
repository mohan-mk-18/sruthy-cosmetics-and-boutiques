import type { Category } from "@/types";

/**
 * Featured Categories shown on Home — just the 3 top-level departments.
 * Boutique intentionally routes into /services (the Boutique Services page)
 * rather than a /products listing, since boutique work is consultation-led.
 */
export const featuredCategories: Category[] = [
  {
    id: "cat-jewellery",
    name: "Jewellery",
    slug: "jewellery",
    image: "/images/category-jewellery.jpg",
    description: "Earrings, necklaces, bangles, and wedding sets.",
  },
  {
    id: "cat-beauty",
    name: "Beauty Products",
    slug: "beauty-products",
    image: "/images/category-beauty-products.jpg",
    description: "Skincare, serums, and colour cosmetics.",
  },
  {
    id: "cat-boutique",
    name: "Boutique",
    slug: "boutique",
    image: "/images/category-boutique.jpg",
    description: "Stitching, Aari work, and bridal costume design.",
    linkHref: "/services",
  },
];

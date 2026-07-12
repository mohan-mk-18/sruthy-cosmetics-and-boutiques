import productsData from "@/data/products.json";
import type { Product } from "@/types";
import { siteConfig } from "./config";

const products = productsData as Product[];

export function getAllProducts(): Product[] {
  return products;
}

/** Exact product lookup by its full category path + slug, e.g. "jewellery/earrings/rose-gold-drop-earrings". */
export function findProductByFullPath(path: string): Product | undefined {
  return products.find((p) => `${p.categorySlug}/${p.slug}` === path);
}

/** All products whose categorySlug is exactly `path`, or nested one level under it. */
export function findProductsByCategoryPath(path: string): Product[] {
  return products.filter((p) => p.categorySlug === path || p.categorySlug.startsWith(`${path}/`));
}

/** Every distinct category value present in the catalog, for filter chips. */
export function distinctCategories(items: Product[]): string[] {
  return Array.from(new Set(items.map((p) => p.category))).sort();
}

/**
 * Human-readable label for a /products/[...slug] path. Prefers the label
 * already defined in siteConfig.nav (so it matches the navbar exactly);
 * falls back to title-casing the last path segment.
 */
export function categoryLabelForPath(path: string): string {
  const href = `/products/${path}`;
  for (const item of siteConfig.nav) {
    if (item.href === href) return item.label;
    const child = item.children?.find((c) => c.href === href);
    if (child) return child.label;
  }
  const last = path.split("/").pop() ?? path;
  return last
    .split("-")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
}

/** All full product-detail paths, for generateStaticParams. */
export function allProductPaths(): string[][] {
  return products.map((p) => `${p.categorySlug}/${p.slug}`.split("/"));
}

/** All category/subcategory paths declared in the nav, for generateStaticParams. */
export function allCategoryPaths(): string[][] {
  const paths: string[][] = [];
  for (const item of siteConfig.nav) {
    if (item.href.startsWith("/products/")) {
      paths.push(item.href.replace("/products/", "").split("/"));
    }
    for (const child of item.children ?? []) {
      if (child.href.startsWith("/products/")) {
        paths.push(child.href.replace("/products/", "").split("/"));
      }
    }
  }
  return paths;
}

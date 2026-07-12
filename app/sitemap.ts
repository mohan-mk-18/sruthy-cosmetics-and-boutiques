import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import products from "@/data/products.json";

/**
 * Generates sitemap.xml at build/request time. Add new static routes to
 * `staticPaths` below; category/product routes are derived automatically
 * from siteConfig.nav and data/products.json.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/services", "/about", "/contact"];

  const categoryPaths = siteConfig.nav
    .flatMap((item) => [item.href, ...(item.children?.map((c) => c.href) ?? [])])
    .filter((href) => href.startsWith("/products/"));

  const productPaths = (products as { categorySlug: string; slug: string }[]).map(
    (p) => `/products/${p.categorySlug}/${p.slug}`
  );

  const allPaths = Array.from(new Set([...staticPaths, ...categoryPaths, ...productPaths]));

  return allPaths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductGrid from "@/components/products/ProductGrid";
import ProductDetail from "@/components/products/ProductDetail";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, productSchema } from "@/lib/schema";
import { buildMetadata, seoExamples } from "@/lib/seo";
import {
  allCategoryPaths,
  allProductPaths,
  categoryLabelForPath,
  findProductByFullPath,
  findProductsByCategoryPath,
} from "@/lib/products";

interface PageProps {
  params: { slug: string[] };
}

export function generateStaticParams() {
  const paths = [...allCategoryPaths(), ...allProductPaths()];
  const unique = Array.from(new Map(paths.map((p) => [p.join("/"), p])).values());
  return unique.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const path = params.slug.join("/");
  const product = findProductByFullPath(path);

  if (product) {
    return buildMetadata({
      title: product.name,
      description: product.description,
      path: `/products/${path}`,
      image: product.images[0],
    });
  }

  const label = categoryLabelForPath(path);
  return buildMetadata({
    title: `${label} — ${seoExamples.productsCategory.title}`,
    description: seoExamples.productsCategory.description,
    path: `/products/${path}`,
  });
}

export default function ProductsCatchAllPage({ params }: PageProps) {
  const path = params.slug.join("/");
  const product = findProductByFullPath(path);

  if (product) {
    const crumbs = [
      { name: "Home", href: "/" },
      { name: categoryLabelForPath(product.categorySlug), href: `/products/${product.categorySlug}` },
      { name: product.name, href: `/products/${path}` },
    ];
    return (
      <>
        <JsonLd data={breadcrumbSchema(crumbs)} />
        <JsonLd data={productSchema(product)} />
        <Breadcrumbs items={crumbs} />
        <ProductDetail product={product} />
      </>
    );
  }

  const items = findProductsByCategoryPath(path);
  const isKnownCategory = allCategoryPaths().some((p) => p.join("/") === path);
  if (!isKnownCategory && items.length === 0) notFound();

  const label = categoryLabelForPath(path);
  const rootCategory = path.split("/")[0];
  const crumbs = [
    { name: "Home", href: "/" },
    ...path.split("/").map((_, i, arr) => {
      const sub = arr.slice(0, i + 1).join("/");
      return { name: categoryLabelForPath(sub), href: `/products/${sub}` };
    }),
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumbs items={crumbs} />
      <ProductGrid products={items} heading={label} niche={rootCategory} />
    </>
  );
}
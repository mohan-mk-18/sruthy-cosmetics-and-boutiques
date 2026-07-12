import Image from "next/image";
import type { Product } from "@/types";

/**
 * Non-clickable overview card used on category listing pages. Shows only
 * image, category, name, and a short description — intentionally no price
 * and no per-card link/CTA. The single "Visit Store" CTA for the whole page
 * lives once above/below the grid (see ProductGrid).
 *
 * `h-full flex flex-col` keeps every card in a row the same height — CSS
 * Grid stretches each card to match the tallest one in its row, so cards
 * with less text simply show blank space below rather than text being
 * clamped/cut off. The parent grid renders each card inside a wrapper with
 * `className="h-full"` for this to take effect.
 */
export default function ProductOverviewCard({ product }: { product: Product }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card bg-white shadow-soft-sm">
      <div className="media-frame aspect-[4/5] shrink-0">
        <Image
          src={product.images[0] ?? "/images/gallery-1.jpg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 25vw"
          className="object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-charcoal/70">
          {product.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <h3 className="font-display text-lg text-charcoal">{product.name}</h3>
        <p className="text-sm text-charcoal/65">{product.description}</p>
      </div>
    </article>
  );
}
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container pt-28 sm:pt-32">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-charcoal/55">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={12} aria-hidden="true" />}
              {isLast ? (
                <span aria-current="page" className="text-charcoal/80">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-rose-gold">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

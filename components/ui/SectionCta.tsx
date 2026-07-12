import Link from "next/link";
import { siteConfig } from "@/lib/config";

/**
 * One shared CTA pair for a whole section (Featured Categories, Premium
 * Collection, Boutique Services, Gallery Preview, etc.) — used instead of
 * repeating "Visit Store" / "Book Consultation" on every individual card.
 */
export default function SectionCta({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap justify-center gap-4 ${className}`}>
      <Link
        href="/contact"
        className="rounded-full bg-coral px-7 py-3 text-sm font-semibold text-luxury-white shadow-soft-sm transition-transform hover:-translate-y-0.5"
      >
        {siteConfig.ctas.visitStore}
      </Link>
      <Link
        href="/services"
        className="rounded-full border border-charcoal/15 px-7 py-3 text-sm font-semibold text-charcoal transition-transform hover:-translate-y-0.5"
      >
        {siteConfig.ctas.bookConsultation}
      </Link>
    </div>
  );
}

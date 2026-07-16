import Link from "next/link";
import { Instagram, MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-blush/60 bg-luxury-white">
      <div className="container grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div>
          <p className="font-display text-xl text-charcoal">{siteConfig.name}</p>
          <p className="mt-3 max-w-xs text-sm text-charcoal/70">{siteConfig.tagline}</p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Sruthy on Instagram"
              className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-soft-sm transition-transform hover:-translate-y-0.5"
            >
              <Instagram size={18} className="text-rose-gold" aria-hidden="true" />
            </a>
          </div>
        </div>

        <nav aria-label="Quick links">
          <h2 className="font-body text-sm font-semibold uppercase tracking-wide text-charcoal/60">
            Quick Links
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-charcoal/75">
            {siteConfig.nav.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="hover:text-rose-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-body text-sm font-semibold uppercase tracking-wide text-charcoal/60">
            Visit Us
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-charcoal/75">
            <li className="flex gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-rose-gold" aria-hidden="true" />
              <span>
                {siteConfig.address.line1}, {siteConfig.address.locality},{" "}
                {siteConfig.address.region} {siteConfig.address.postalCode}
              </span>
            </li>
            <li className="flex gap-2">
              <Phone size={16} className="mt-0.5 shrink-0 text-rose-gold" aria-hidden="true" />
              <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
            </li>
            <li className="flex gap-2">
              <Mail size={16} className="mt-0.5 shrink-0 text-rose-gold" aria-hidden="true" />
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-body text-sm font-semibold uppercase tracking-wide text-charcoal/60">
            Stay Updated
          </h2>
          <p className="mt-4 text-sm text-charcoal/70">
            Join our WhatsApp group for new arrivals, bridal season updates, and offers.
          </p>
          <a
            href={siteConfig.whatsappGroupLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-luxury-white shadow-soft-sm transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Join WhatsApp Group
          </a>
        </div>
      </div>

      <div className="border-t border-blush/60 py-6">
        <p className="container text-center text-xs text-charcoal/55">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

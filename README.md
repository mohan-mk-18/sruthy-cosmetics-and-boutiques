# Sruthy Cosmetics And Boutiques — Website

Editorial, non-ecommerce marketing/catalog site built with Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion.

This repository currently contains **Step 1: the project skeleton and shared components** — layout, navigation, footer, floating actions, animation system, design tokens, types, and sample data. Individual pages (Home sections, Products listing, Product detail, Gallery, Boutique Services, Contact, About) are generated one at a time after this skeleton is reviewed, per the project brief.

---

## 1. Getting started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build      # production build
npm start          # run the production build
npm run lint        # ESLint
npm run gen:sitemap  # optional standalone sitemap script (App Router also auto-generates /sitemap.xml)
```

Copy `.env.example` to `.env.local` and fill in the real site URL / analytics IDs before deploying.

## 2. File structure

```
app/                    Next.js App Router routes
  layout.tsx            Root layout: fonts, JSON-LD, Navbar/Footer/FloatingActions, providers
  page.tsx               PLACEHOLDER home page (full Home sections generated next)
  globals.css             Base styles, skip-link, focus rings, reduced-motion handling
  loading.tsx             Route-level loading UI
  robots.ts               robots.txt generator
  sitemap.ts              sitemap.xml generator (derives category/product routes automatically)

components/
  layout/                Navbar, Footer, FloatingActions (Instagram/WhatsApp/Call)
  ui/                     Hero, ProductCard, CategoryCard, ServiceCard, GalleryMasonry,
                          ImageLightbox, LoadingScreen
  forms/                  ContactForm, BookingForm
  providers/              AnimationProvider (page transitions), Cursor (desktop custom cursor)
  seo/                    JsonLd (schema.org script injector)

lib/
  config.ts               Site constants: business info, contact, nav structure, CTA copy
  animations.ts           Central Framer Motion variants, durations, easing — import, don't hand-roll
  seo.ts                  buildMetadata() — Next.js Metadata (title/OG/Twitter) per page
  schema.ts               JSON-LD generators: LocalBusiness, Product, Breadcrumb
  utils.ts                cn(), formatPrice(), slugify(), whatsappLink(), telLink(), directionsLink()

types/index.ts            Product, Category, SiteConfig, NavItem
data/products.json         10 sample catalog products (placeholders — see § 6)
public/images/             Placeholder imagery (see § 5)
scripts/gen_placeholders.py Regenerates the placeholder imagery set
design-tokens.json          Same design tokens as tailwind.config.ts, in portable JSON form
```

## 3. Naming & coding conventions

- **Components**: PascalCase file + export name (`ProductCard.tsx` → `export default function ProductCard`).
- **Client vs Server**: components are Server Components by default; add `"use client"` only where interactivity/hooks/Framer Motion require it (already applied where needed).
- **Styling**: Tailwind utility classes only; shared visual patterns (glass panels, gradient borders) are Tailwind plugin utilities in `tailwind.config.ts`, not repeated inline styles.
- **Animation**: always import variants/durations/easing from `lib/animations.ts`. Never hard-code a duration or easing curve in a component.
- **Routes**: category/product URLs follow `/products/[category-slug]/[sub-slug]` and `/products/[category-slug]/[product-slug]`, matching `categorySlug` in `data/products.json`.
- **No e-commerce language or features anywhere**: no "Buy Now", "Add to Cart", "Order Online", cart/checkout, ratings, reviews, or stock counts. Every CTA maps to one of: Visit Store, Book Consultation, Contact Us, Call Now, WhatsApp, View Instagram, Get Directions.

## 4. Design tokens (Tailwind)

| Token | Value |
|---|---|
| `ivory` (page background, 60%) | `#F7E8EC` — Soft Pale Rose |
| `luxury-white` (card/surface contrast) | `#FFFFFF` |
| `charcoal` (text, 30%) | `#1A0B12` — Near-Black Plum |
| `rose-gold` / `coral` (accent + CTA, 10%) | `#C57C8A` — Dusty Mauve / Soft Wine |
| `soft-gold` (hover/secondary accent) | `#A85D6D` |
| `blush` (light tint for badges/borders) | `#F0D3DA` |
| Fonts | `font-display` (Playfair Display), `font-body` (Montserrat), `font-micro` (Manrope) |
| Radius | `rounded-card` = 14px |
| Motion durations | `subtle` 150ms · default 300ms · `extended` 600ms · `slow` 900ms |

Same values are in `design-tokens.json` for design-tool handoff (Figma tokens plugin, etc.).

## 5. Images — automated optimization pipeline

`public/images/` currently holds **generated placeholder imagery** (gradient + label, in the brand palette), each exported as `.jpg` + `.webp`, sized to the aspect ratio the layout expects.

**To swap in the client's real photos, no manual editing required:**

1. `npm install` (this installs `sharp`, used by the pipeline — already in `devDependencies`).
2. Create a `raw-photos/` folder in the project root and drag the client's original photos into it — any subfolder structure, any of `.jpg/.jpeg/.png/.webp/.tiff/.bmp`. (iPhone `.HEIC` photos: export as JPEG first — Photos app → File → Export → Export Photos → JPEG.)
3. Run:
   ```bash
   npm run optimize-images
   ```

For every photo, this automatically:
- **Auto-orients** using the photo's EXIF orientation tag and bakes the correct rotation into the pixels (more reliable across browsers than leaving it to the EXIF tag).
- **Resizes** to a max width of 1600px, preserving aspect ratio, and never upscales a smaller source.
- **Compresses** and exports three formats — `.jpg` (universal fallback), `.webp`, and `.avif` (smallest, modern browsers) — into `public/images/`.
- **Sanitizes the filename** into an SEO-friendly slug: `Bridal Necklace (Final) 2.JPG` → `bridal-necklace-final-2.jpg/.webp/.avif`. If two photos would produce the same slug, the second is automatically suffixed (`-2`, `-3`, …) so nothing gets overwritten.
- Writes a **manifest** to `raw-photos/optimize-manifest.json` listing each original filename → new slug → dimensions → output paths, so you know exactly what to paste into `data/products.json`, `data/categories.ts`, `data/gallery.ts`, or `lib/config.ts`.

**Two ways to wire a processed photo into the site:**
- **Fastest**: name the raw file so it slugifies to an *existing* filename already referenced in the data files (e.g. name a real earrings photo `jewellery-earrings-1.jpg` before dropping it in `raw-photos/`) — it overwrites the matching placeholder with zero code changes.
- **New products**: run the pipeline, open `raw-photos/optimize-manifest.json`, and copy the `slug`'s file paths into the relevant `images` array in `data/products.json` (or `categories.ts`/`gallery.ts`).

`raw-photos/` (originals + manifest) is git-ignored — only the optimized output in `public/images/` should be committed.

**Why three formats?** Every `<Image>` in this codebase is a Next.js `next/image` component (see `next.config.js` → `images.formats: ["image/avif", "image/webp"]`), so in production Next automatically serves each visitor the smallest format their browser supports, at the right size for their viewport, with lazy-loading and no layout shift built in. The pipeline's pre-generated `.avif`/`.webp` files reduce load on Next's on-the-fly optimizer and guarantee a fast, correctly-sized asset exists even for static/OG-image contexts that bypass the optimizer entirely.

Re-run `python3 scripts/gen_placeholders.py` any time you want to regenerate a fresh gradient placeholder set during development (unrelated to the photo pipeline above — this one just makes fake data look presentable before real photos exist).

## 6. Sample data

`data/products.json` contains 10 sample products across Jewellery, Beauty Products, and Boutique, each flagged `"isSample": true`. Prices are illustrative INR amounts or `"Price on request"` — update or replace with real catalog entries when ready. The `Product` type intentionally has no stock, rating, or review fields.

## 7. Accessibility & performance built in

- Skip-to-content link, visible focus rings on every interactive element, `prefers-reduced-motion` respected globally.
- Semantic landmarks (`header`, `nav`, `main`, `footer`), `aria-label`s on all floating/icon-only buttons.
- Lightbox: focus trap, Escape to close, focus returns to the trigger.
- Images use `next/image` with explicit aspect-ratio frames (no layout shift) and responsive `sizes`.
- Fonts loaded via `next/font` (self-hosted, automatic preconnect, `font-display: swap`).

**Lighthouse checklist to hit 95+ (mobile & desktop):**
1. Keep hero image `priority` but everything below the fold lazy (default `next/image` behavior).
2. Confirm no client component renders above the fold unless it needs interactivity (Navbar/Cursor are the exception, both lightweight).
3. Run `npm run build && npx serve .next` locally and audit with Chrome DevTools → Lighthouse.
4. Verify CLS = 0 by checking every image has a fixed aspect-ratio container (`.media-frame`).
5. Confirm `sitemap.xml` and `robots.txt` resolve at `/sitemap.xml` and `/robots.txt`.

## 8. Deployment (Vercel)

1. Push this repo to GitHub.
2. Import into Vercel → Framework preset **Next.js** (auto-detected).
3. Add environment variables from `.env.example` in Vercel's Project Settings.
4. Set the production domain, then update `NEXT_PUBLIC_SITE_URL` / `siteConfig.url` in `lib/config.ts` to match exactly (used for canonical URLs, OG tags, and JSON-LD `@id`).

## 9. Design handoff checklist

- [ ] Replace all `TODO:` markers in `lib/config.ts` (phone, WhatsApp, email, address, geo-coordinates, Instagram URL, store hours).
- [ ] Swap placeholder imagery: drop client photos into `raw-photos/` and run `npm run optimize-images` (see § 5) — no manual editing needed.
- [ ] Replace sample entries in `data/products.json` with the real catalog.
- [ ] Confirm brand colors/fonts in `tailwind.config.ts` match final approved palette (currently locked to the brief's exact hex values).
- [ ] Point `ContactForm` / `BookingForm` submit handlers at a real backend (API route, email service, or CRM).
- [ ] Add real Google Maps embed / static fallback image on the Contact page once the store's Place ID is available.

---

**Next step:** generate the full Home page (Hero, Featured Categories, Premium Collection, Boutique Services, Bridal highlight, Why Choose Us, Instagram Showcase, Gallery preview, Location strip, Footer) — waiting for confirmation to proceed.

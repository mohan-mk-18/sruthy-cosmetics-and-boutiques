import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import AnimationProvider from "@/components/providers/AnimationProvider";
import Cursor from "@/components/providers/Cursor";
import JsonLd from "@/components/seo/JsonLd";
import { localBusinessSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";

// next/font handles preconnect + font-display automatically and self-hosts
// the Google Fonts files, so no manual <link rel="preconnect"> is needed.
// Playfair Display: elegant editorial serif for headings — pairs with
// Montserrat, a clean modern sans-serif, for body copy.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: siteConfig.tagline,
    description: siteConfig.description,
    path: "/",
  }),
  metadataBase: new URL(siteConfig.url),
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} ${manrope.variable}`}>
      <body>
        <JsonLd data={localBusinessSchema()} />
        <Cursor />
        <Navbar />
        <main id="main-content">
          <AnimationProvider>{children}</AnimationProvider>
        </main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}

/**
 * Central site configuration. Update this file when real business details
 * (address, phone, hours, socials) are ready to replace placeholders.
 */
import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Sruthy Cosmetics And Boutiques",
  shortName: "Sruthy",
  tagline: "Where Editorial Elegance Meets Timeless Craftsmanship",
  description:
    "Premium cosmetics, boutique fashion, artificial jewellery, and bridal wear in Kannumaamoodu — visit the store or book a consultation.",
  url: "https://www.sruthycosmetics.example", // TODO: replace with production domain
  phone: "+91 94439 13312",
  whatsapp: "919443913312", // digits only, for wa.me links
  whatsappGroupLink: "https://chat.whatsapp.com/Kw4MqvfVHbWLFZUs0Mks6X",
  email: "sruthysmartlook@gmail.com",
  instagram: "https://www.instagram.com/sruthy.cosmetics.and.boutique",
  address: {
    line1: "Sruthy Smart Look, Moovottukonam Road",
    locality: "Kannumaamoodu",
    region: "Tamil Nadu",
    postalCode: "629170",
    country: "IN",
  },
  geo: {
    latitude: 8.3824921,
    longitude: 77.1704505,
    placeId: "ChIJ13tq312tBTsR7tqcxvdjGRI",
  },
  hours: [
    { day: "Monday – Saturday", time: "9:00 AM – 8:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
  nav: [
    { label: "Home", href: "/" },
    {
      label: "Jewellery",
      href: "/products/jewellery",
      children: [
        { label: "Earrings", href: "/products/jewellery/earrings" },
        { label: "Necklaces", href: "/products/jewellery/necklace" },
        { label: "Gold Covering Jewellery", href: "/products/jewellery/gold-covering-jewellery" },
        { label: "Wedding Jewellery Sets", href: "/products/jewellery/wedding-jewellery-sets" },
        { label: "Bangles", href: "/products/jewellery/bangles" },
        { label: "Others", href: "/products/jewellery/others" },
      ],
    },
    {
      label: "Beauty Products",
      href: "/products/beauty-products",
      children: [
        { label: "Face Wash", href: "/products/beauty-products/face-wash" },
        { label: "Sunscreen", href: "/products/beauty-products/sunscreen" },
        { label: "Serums", href: "/products/beauty-products/serums" },
        { label: "Foundation", href: "/products/beauty-products/foundation" },
        { label: "BB Cream", href: "/products/beauty-products/bb-cream" },
        { label: "Lipsticks", href: "/products/beauty-products/lipsticks" },
        { label: "Others", href: "/products/beauty-products/others" },
      ],
    },
    {
      label: "Boutique",
      href: "/services",
      children: [
        { label: "Services", href: "/services" },
        { label: "Stitching Materials", href: "/services?category=stitching-materials#boutique-categories" },
        { label: "Customized Dress Designing", href: "/services?category=customized-dress-designing#boutique-categories" },
        { label: "Bridal Costume Design", href: "/services?category=bridal-costume-design#boutique-categories" },
        { label: "Aari Work", href: "/services?category=aari-work#boutique-categories" },
      ],
    },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  ctas: {
    visitStore: "Visit Store",
    bookConsultation: "Book Consultation",
    contactUs: "Contact Us",
    callNow: "Call Now",
    whatsapp: "WhatsApp",
    viewInstagram: "View Instagram",
    getDirections: "Get Directions",
  },
};
"use client";

import { useState, type FormEvent } from "react";

/**
 * Client-side accessible contact form. Wire the onSubmit handler to your
 * form backend of choice (e.g. an API route, Formspree, or email service) —
 * this component only handles validation state and UI.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    try {
      // TODO: replace with a real submission endpoint.
      await new Promise((res) => setTimeout(res, 700));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-card bg-blush/40 p-6 text-charcoal">
        <p className="font-display text-lg">Message sent — thank you.</p>
        <p className="mt-1 text-sm text-charcoal/70">
          Our team will get back to you shortly to confirm your visit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
      <div className="grid gap-1.5">
        <label htmlFor="contact-name" className="text-sm font-medium text-charcoal">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="rounded-lg border border-charcoal/15 px-4 py-3 text-sm focus:border-rose-gold"
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="contact-phone" className="text-sm font-medium text-charcoal">
          Phone number
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          className="rounded-lg border border-charcoal/15 px-4 py-3 text-sm focus:border-rose-gold"
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="contact-service" className="text-sm font-medium text-charcoal">
          Service of interest
        </label>
        <select
          id="contact-service"
          name="service"
          className="rounded-lg border border-charcoal/15 px-4 py-3 text-sm focus:border-rose-gold"
        >
          <option value="">Select an option</option>
          <option value="jewellery">Jewellery</option>
          <option value="beauty-products">Beauty Products</option>
          <option value="bridal-boutique">Bridal Boutique</option>
          <option value="dress-stitching">Dress Stitching</option>
          <option value="aari-work">Aari Work</option>
          <option value="general">General Enquiry</option>
        </select>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="contact-message" className="text-sm font-medium text-charcoal">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          className="rounded-lg border border-charcoal/15 px-4 py-3 text-sm focus:border-rose-gold"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 w-full rounded-full bg-coral px-6 py-3.5 text-sm font-semibold text-luxury-white shadow-soft-sm transition-transform hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>

      {status === "error" && (
        <p role="alert" className="text-sm text-coral">
          Something went wrong — please try again, or reach us directly by phone or WhatsApp.
        </p>
      )}
    </form>
  );
}
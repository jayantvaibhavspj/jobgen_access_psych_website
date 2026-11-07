"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MapPin, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type Location = {
  state: string;
  city: string;
};

type FAQ = {
  title: string;
  answer: string;
};

export function AustraliaLocations({ locations }: { locations: Location[] }) {
  const [activeCity, setActiveCity] = useState<string | null>(null);

  return (
    <div className="australia-locations">
      <div className="australia-map-wrap">
        <svg
          className="australia-map"
          viewBox="0 0 420 340"
          role="img"
          aria-label="Map of Australia highlighting Sydney, Melbourne and Brisbane"
        >
          <path
            className="australia-map-shape"
            d="M56 96 71 73 111 64 131 48 163 58 184 45 212 59 241 55 265 71 301 64 319 82 349 87 365 109 356 137 369 156 354 180 360 207 340 226 331 255 308 271 296 302 270 308 252 288 228 295 208 278 185 286 164 268 141 279 119 257 98 253 83 230 66 221 74 197 61 175 70 153 53 130Z"
          />
          <path className="australia-map-tasmania" d="m308 309 11 8 3 14-9 5-10-10Z" />
          {[
            { city: "Brisbane", x: 322, y: 145 },
            { city: "Sydney CBD", x: 319, y: 214 },
            { city: "Melbourne CBD", x: 286, y: 253 },
          ].map((point) => (
            <a
              key={point.city}
              href="/our-locations"
              className={`map-marker${activeCity === point.city ? " is-active" : ""}`}
              aria-label={`View ${point.city} locations`}
              onMouseEnter={() => setActiveCity(point.city)}
              onMouseLeave={() => setActiveCity(null)}
              onFocus={() => setActiveCity(point.city)}
              onBlur={() => setActiveCity(null)}
            >
              <circle className="map-marker-halo" cx={point.x} cy={point.y} r="12" />
              <circle className="map-marker-core" cx={point.x} cy={point.y} r="4.5" />
            </a>
          ))}
        </svg>
        <span className="map-caption">Clinicians across Australia</span>
      </div>
      <div className="locations-preview-list">
        {locations.map((location) => (
          <a
            className={`location-preview-row${activeCity === location.city ? " is-active" : ""}`}
            href="/our-locations"
            key={`${location.state}-${location.city}`}
            onMouseEnter={() => setActiveCity(location.city)}
            onMouseLeave={() => setActiveCity(null)}
            onFocus={() => setActiveCity(location.city)}
            onBlur={() => setActiveCity(null)}
          >
            <MapPin size={19} aria-hidden="true" />
            <span>
              <strong>{location.city}</strong>
              <small>{location.state}</small>
            </span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        ))}
        <a className="text-link" href="/our-locations">
          View all locations <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

export function FAQAccordion({ items }: { items: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div className="faq-preview-list">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const answerId = `homepage-faq-answer-${index}`;

        return (
          <div className="faq-item" key={item.title}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                {item.title}
                <Plus className="faq-toggle-icon" size={22} aria-hidden="true" />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={answerId}
                  className="faq-answer"
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.26, ease: "easeOut" }}
                >
                  <p>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function NewsletterForm() {
  const router = useRouter();

  function continueToNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/newsletter");
  }

  return (
    <form className="newsletter-form" onSubmit={continueToNewsletter}>
      <div className="newsletter-form-fields">
        <label className="sr-only" htmlFor="homepage-newsletter-email">Email address</label>
        <input
          id="homepage-newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="Email address"
          aria-describedby="newsletter-form-note"
          required
        />
        <button className="button button-dark" type="submit">
          Continue <ArrowUpRight size={16} aria-hidden="true" />
        </button>
      </div>
      <p className="newsletter-form-note" id="newsletter-form-note">
        Your email address isn&apos;t saved here. Continue to the newsletter page
        to complete your subscription.
      </p>
    </form>
  );
}

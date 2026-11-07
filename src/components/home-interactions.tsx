"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  MapPin,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FormEvent,
  PointerEvent,
  useRef,
  useState,
} from "react";
import type { ContentCard } from "@/lib/site-data";

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
  const reduceMotion = useReducedMotion();

  return (
    <div className="australia-locations">
      <div className="australia-map-wrap">
        <svg
          className="australia-map"
          viewBox="0 0 420 340"
          role="img"
          aria-label="Map of Australia highlighting Sydney, Melbourne and Brisbane"
        >
          <motion.path
            className="australia-map-shape"
            d="M56 96 71 73 111 64 131 48 163 58 184 45 212 59 241 55 265 71 301 64 319 82 349 87 365 109 356 137 369 156 354 180 360 207 340 226 331 255 308 271 296 302 270 308 252 288 228 295 208 278 185 286 164 268 141 279 119 257 98 253 83 230 66 221 74 197 61 175 70 153 53 130Z"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
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
              <motion.circle
                className="map-marker-halo"
                cx={point.x}
                cy={point.y}
                r="12"
                animate={reduceMotion ? undefined : { scale: [1, 1.08, 1] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              />
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

export function MarqueeTicker() {
  const items = [
    "Telehealth",
    "Face-to-face",
    "Ages 12+",
    "Clinicians across Australia",
    "Medicare rebates available",
    "EAP for workplaces",
  ];

  return (
    <div className="marquee-ticker" aria-label={items.join(" · ")}>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-group" aria-hidden={copy === 1} key={copy}>
            {items.map((item) => (
              <span className="marquee-item" key={`${copy}-${item}`}>
                <span aria-hidden="true">✦</span> {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TrustStrip() {
  const credentials = [
    "Medicare rebates available",
    "Employee Assistance Program",
    "Telehealth appointments",
    "Face-to-face sessions",
  ];

  return (
    <section className="trust-strip" aria-label="Access Psych services">
      <div className="section-container trust-strip-inner">
        <span className="trust-strip-label">Support that meets you where you are</span>
        <div className="trust-chip-list">
          {credentials.map((credential) => (
            <span className="trust-chip" key={credential}>
              <Check size={15} aria-hidden="true" />
              {credential}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const processSteps = [
  { title: "Book online or call", detail: "Choose the way that feels easiest." },
  { title: "Meet your clinician", detail: "Telehealth or in person." },
  { title: "Start feeling supported", detail: "Take the next step at your pace." },
];

export function HowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="how-it-works section-pad" aria-labelledby="how-it-works-title">
      <div className="section-container">
        <div className="how-it-works-heading">
          <span className="section-eyebrow">A clear next step</span>
          <h2 id="how-it-works-title">How it works.</h2>
        </div>
        <div className="process-steps">
          <motion.span
            className="process-progress"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: reduceMotion ? 0 : 1, ease: "easeOut" }}
          />
          {processSteps.map((step, index) => (
            <article className="process-step" key={step.title}>
              <span className="process-step-number">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TechnologyProgressLine() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      className="technology-process-line"
      aria-hidden="true"
      initial={reduceMotion ? false : { scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: reduceMotion ? 0 : 1.1, ease: "easeOut" }}
    />
  );
}

export function MetricsPlaceholder() {
  return (
    <section className="metrics-placeholder" aria-label="Access Psych impact">
      <div className="section-container metrics-placeholder-inner">
        <span className="section-eyebrow">Our reach</span>
        <p>
          TODO: Add verified Access Psych statistics when approved figures are
          available.
        </p>
      </div>
    </section>
  );
}

export function TestimonialSlider() {
  const [active, setActive] = useState(0);
  const pointerStart = useRef<number | null>(null);
  const placeholders = Array.from({ length: 8 }, (_, index) => ({
    quote: "TODO: Add an approved, consented client testimonial.",
    attribution: "TODO: Confirm approved attribution.",
    index,
  }));
  const current = placeholders[active];

  function move(direction: number) {
    setActive((value) => (value + direction + placeholders.length) % placeholders.length);
  }

  function handlePointerDown(event: PointerEvent<HTMLElement>) {
    pointerStart.current = event.clientX;
  }

  function handlePointerUp(event: PointerEvent<HTMLElement>) {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(distance) > 48) move(distance > 0 ? -1 : 1);
  }

  return (
    <section className="testimonial-section section-pad" aria-labelledby="testimonials-title">
      <div className="section-container testimonial-layout">
        <div>
          <span className="section-eyebrow">In their words</span>
          <h2 id="testimonials-title">Stories of support.</h2>
          <p className="testimonial-note">
            Placeholder only. Client testimonials require explicit consent
            before publication.
          </p>
        </div>
        <div
          className="testimonial-card"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => { pointerStart.current = null; }}
          aria-roledescription="carousel"
          aria-label="Client testimonials placeholder"
        >
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current.index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <span aria-hidden="true">“</span>
              <p>{current.quote}</p>
              <footer>{current.attribution}</footer>
            </motion.blockquote>
          </AnimatePresence>
          <div className="testimonial-controls">
            <span aria-live="polite">
              {active + 1}/{placeholders.length}
            </span>
            <button type="button" aria-label="Previous testimonial" onClick={() => move(-1)}>
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Next testimonial" onClick={() => move(1)}>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ValuesStory({ values }: { values: ContentCard[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const nextIndex = Math.min(values.length - 1, Math.floor(progress * values.length));
    setActiveIndex(nextIndex);
  });

  return (
    <section
      className="values-story-section"
      aria-label="Our purpose and values"
      ref={sectionRef}
    >
      <div className="values-story-sticky">
        <div className="section-container values-story-layout">
          <div className="values-story-intro">
            <span className="section-eyebrow">Our purpose</span>
            <h2>Connecting people with the mental health support they need, when they need it.</h2>
            <a className="text-link" href="/vision-purpose-values">
              Vision, purpose &amp; values <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <div className="values-story-steps" aria-label="Values">
              {values.map((value, index) => (
                <button
                  type="button"
                  key={value.title}
                  aria-current={activeIndex === index ? "step" : undefined}
                  onClick={() => setActiveIndex(index)}
                >
                  {value.title}
                </button>
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.article
              className="values-story-card"
              key={values[activeIndex]?.title}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.32 }}
            >
              <h3>{values[activeIndex]?.title}</h3>
              <p>{values[activeIndex]?.text}</p>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
      <div className="values-story-progress" aria-hidden="true">
        <motion.span
          style={{ scaleX: scrollYProgress }}
          transition={{ duration: reduceMotion ? 0 : 0.1 }}
        />
      </div>
    </section>
  );
}

export function ParallaxPhoto({
  src,
  alt,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  className: string;
  sizes: string;
}) {
  const imageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-16, 16]);

  return (
    <motion.div ref={imageRef} className={className} style={{ y }}>
      <Image src={src} alt={alt} fill unoptimized sizes={sizes} />
    </motion.div>
  );
}
